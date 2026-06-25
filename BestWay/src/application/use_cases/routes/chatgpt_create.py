import logging
from asyncio import sleep
from typing import List

from pydantic import ValidationError

from application.events import EventType
from application.use_cases.base import UseCase
from application.use_cases.routes.enums import RouteGenerationMode as Mode
from common.dto import RouteRead
from common.exceptions import APIException
from domain.entities.route import Route
from domain.entities.route_places import RoutePlaces
from domain.entities.survey import Survey
from domain.entities.user import User
from infrastructure.managers.ChatGPT.dto import (
    ChatGPTContentData,
    ChatGPTPlaceData,
    ChatGPTRouteData,
    ChatGPTSurveyData,
    ChatGPTUserData,
)
from infrastructure.notifications.notifier import PusherNotifier
from infrastructure.redis.base import AbstractRedisCache
from infrastructure.repositories.interfaces.ChatGPT.base import ClassificationManager
from infrastructure.uow import UnitOfWork

logger = logging.getLogger(__name__)


class ChatGPTRouteGenerateUseCase(UseCase):
    def __init__(
        self,
        uow: UnitOfWork,
        notifier: PusherNotifier,
        redis_client: AbstractRedisCache,
        route_generate_gpt_manager: ClassificationManager,
    ) -> None:
        self._uow = uow
        self._redis_cache = redis_client
        self._notifier = notifier

        self._route_generate_gpt_manager = route_generate_gpt_manager

    async def execute(self, user_id: int, survey_id: int, mode: str = Mode.FULL.value) -> Route:
        logger.info(
            f"Start route GPT generate use case for user: {user_id} with survey: {survey_id} in {mode} mode"
        )
        try:
            await self._notifier.notify_user(user_id, EventType.ROUTE_GENERATION_STARTED.value)
            data = await self._create_content(user_id, survey_id)
            logger.info(f"Content data: {data}")
            route_data = self._route_generate_gpt_manager.generate_route(data, Mode(mode))
            validated_route_data = await self._validate_generated_route(route_data, user_id)
            self._validate_partial_route_slots(data, Mode(mode), validated_route_data)
            logger.info(f"validated_route_data: {validated_route_data}")
            if not validated_route_data.places:
                raise APIException(
                    code=400,
                    message="Не удалось подобрать места по вашему запросу. Уточните пожелания.",
                )
            route = await self._create_route(validated_route_data, survey_id)
            logger.info("Finish route chatgpt generate use case")
            route_data = RouteRead.model_validate(route).model_dump(mode="json")
            data = {
                "id": route_data.get("id"),
                "author_id": route_data.get("author_id"),
                "created_at": route_data.get("created_at"),
                "author_id": route_data.get("author_id"),
                "author": route_data.get("author"),
            }
            await self._notifier.notify_user(user_id, EventType.ROUTE_GENERATION_SUCCEDED.value, data)
            return route

        except Exception as e:
            logger.info(
                f"Route GPT generate use case failed for user: {user_id} with survey: {survey_id} in {mode} mode\n"
                f"Exception: {e}"
            )
            await self._notifier.notify_user(user_id, EventType.ROUTE_GENERATION_FAILED.value)
            raise

        finally:
            self._redis_cache.unset_active_route_geration(user_id)

            async with self._uow(autocommit=True):
                await self._uow.surveys.delete_by_id(survey_id)

    async def _create_content(self, user_id: int, survey_id: int) -> ChatGPTContentData:
        async with self._uow(autocommit=True):
            user: User = await self._uow.users.get_by_id(user_id)
            survey: Survey = await self._uow.surveys.get_by_id(survey_id)
            places_result = await self._uow.places.get_list_models(city=survey.city)
            place_models = places_result.scalars().all()

            user_dto = ChatGPTUserData(
                first_name=user.first_name,
                last_name=user.last_name,
                middle_name=user.middle_name,
                description=user.description,
                gender=user.gender,
                birth_date=user.birth_date,
            )

            survey_dto = ChatGPTSurveyData(city=survey.city, data=survey.data, places=survey.places, prompt=survey.prompt)

            places_dto = [
                ChatGPTPlaceData(
                    id=place.id,
                    name=place.name or "",
                    category=self._enum_value(place.category),
                    type=self._enum_value(place.type),
                    tags=place.tags,
                    coordinates=place.coordinates,
                    map_name=place.map_name,
                )
                for place in (self._uow.places.convert_to_entity(model) for model in place_models)
            ]

            return ChatGPTContentData(
                user_data=user_dto,
                survey_data=survey_dto,
                places_data=places_dto,
            )

    @staticmethod
    def _enum_value(value):
        if value is None:
            return None
        return value.value if hasattr(value, "value") else str(value)

    @staticmethod
    def _validate_partial_route_slots(
        content: ChatGPTContentData,
        mode: Mode,
        route_data: ChatGPTRouteData,
    ) -> None:
        if mode != Mode.PARTIAL:
            return

        slots = content.survey_data.places or {}
        if not slots:
            return

        expected_count = len(slots)
        actual_count = len(route_data.places)

        if actual_count < expected_count:
            raise APIException(
                code=400,
                message=(
                    f"Маршрут собран не полностью: ожидалось {expected_count} мест "
                    f"(по числу слотов конструктора), получено {actual_count}. "
                    "Попробуйте сформировать маршрут ещё раз."
                ),
            )

        fixed_ids = []
        for slot in slots.values():
            if isinstance(slot, dict):
                place_id = slot.get("place_id")
            else:
                place_id = getattr(slot, "place_id", None)
            if place_id is not None:
                fixed_ids.append(place_id)
        missing_fixed = [place_id for place_id in fixed_ids if place_id not in route_data.places]
        if missing_fixed:
            raise APIException(
                code=400,
                message=(
                    "В сгенерированном маршруте отсутствуют места, "
                    f"выбранные вручную: {missing_fixed}."
                ),
            )

    async def _validate_generated_route(self, route_data: dict, author_id: int) -> ChatGPTRouteData:
        try:
            return ChatGPTRouteData(**route_data, author_id=author_id)
        except ValidationError as e:
            logger.warning(f"ChatGPT responded with invalid route_data: {route_data}. Errors: {e}")
            raise APIException(
                code=400, message=(f"ChatGPT responded with invalid route_data: {route_data}. Errors: {e}")
            )

    async def _create_route(self, validated_route_data: ChatGPTRouteData, survey_id: int) -> Route:
        async with self._uow(autocommit=False):
            try:
                await self._validate_places_data(places=validated_route_data.places)

                survey: Survey = await self._uow.surveys.get_by_id(survey_id)

                route_name = (survey.prompt or survey.name or validated_route_data.name or "").strip()
                if len(route_name) > 200:
                    route_name = f"{route_name[:197]}..."

                route: Route = await self._uow.routes.create(
                    Route(
                        **validated_route_data.model_dump(exclude={"name"}),
                        city=survey.city,
                        name=route_name or validated_route_data.name,
                        description=survey.prompt,
                    )
                )

                route_places: List[RoutePlaces] = await self._uow.route_places.bulk_create(
                    RoutePlaces(route_id=route.id, place_id=place_id, order=index)
                    for index, place_id in enumerate(validated_route_data.places, start=1)
                )

                await self._uow.commit()

                logger.info(f"Created route: {route}")
                logger.info(f"Created route_places: {route_places}")

                route: Route = await self._uow.routes.get_by_id(route.id)
                return route

            except APIException as message:
                await self._uow.rollback()
                logger.error(f"Error occurred during route validation: {message}", exc_info=True)
                raise Exception(f"Произошла ошибка валидации сгенерированного маршрута: {message}")

            except Exception as e:
                await self._uow.rollback()
                logger.error(f"Error occurred during route creation: {e}", exc_info=True)
                raise Exception("Не удалось создать маршрут. Попробуйте позже.")

    async def _validate_places_data(self, places: List[int]) -> None:
        if not places:
            raise APIException(
                code=400,
                message="Не удалось подобрать места по вашему запросу. Уточните пожелания.",
            )
        if not await self._uow.places.all_exist_by_id_list(places):
            logger.error(f"Some place IDs are invalid or missing in DB. Given: {places}", exc_info=True)
            raise APIException(code=500, message="Некоторые места не невалидны или не существуют.")
