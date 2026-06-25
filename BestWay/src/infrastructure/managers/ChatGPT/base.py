import datetime
import json
import logging
from time import sleep
from typing import Any

import httpx

from openai import OpenAI

from application.use_cases.routes.enums import RouteGenerationMode as Mode
from common.exceptions import APIException, ResponsesLimitExceededException
from config.settings import Settings
from infrastructure.managers.ChatGPT.constants import (
    FULL_MODE_PROMPT,
    GENERATED_ROUTE_RESPONSE_FORMAT,
    PARTIAL_MODE_PROMPT,
)
from infrastructure.managers.ChatGPT.dto import ChatGPTContentData
from infrastructure.managers.ChatGPT.places_tools import OpenAIRoutePlacesTools
from infrastructure.managers.ChatGPT.utils import retry_on_status_code
from infrastructure.managers.proxy_client import ProxyClient
from infrastructure.repositories.interfaces.ChatGPT.base import ClassificationManager

logger = logging.getLogger(__name__)


class BaseClassificationManager(ClassificationManager):
    """
    Базовый класс для работы с OpenAI Responses API и локальными route tools.
    """

    settings = Settings()

    CHATGPT_MODEL = settings.chatgpt.model
    CHATGPT_REQUEST_DELAY = settings.chatgpt.request_delay
    CHATGPT_MAX_REQUEST_RETRIES = settings.chatgpt.max_request_retries
    MAX_RESPONSES_PER_DAY = settings.chatgpt.max_responses_per_day

    def __init__(self):
        self.proxy_client = ProxyClient(
            proxy_host=self.settings.proxy.host,
            proxy_http_port=self.settings.proxy.http_port,
            proxy_username=self.settings.proxy.username,
            proxy_password=self.settings.proxy.password,
        )
        self.proxy_openai_client = OpenAI(
            api_key=self.settings.chatgpt.api_key, http_client=self.proxy_client.client
        )
        self.route_places_tools = OpenAIRoutePlacesTools(self.settings)

        self.responses_count = 0
        self.last_response_date = None

    def _check_daily_limit(self):
        """
        Проверяем, не превышен ли дневной лимит запросов (у наследника).
        """
        self._reset_counter_if_new_day()
        if self.responses_count >= self.MAX_RESPONSES_PER_DAY:
            raise ResponsesLimitExceededException()

    def _increment_response(self):
        """Увеличиваем счётчик обращений на 1."""
        self.responses_count += 1
        logger.info(f"Requests done: {self.responses_count}")

    def _reset_counter_if_new_day(self):
        """
        Обнуляем счётчик, если наступил новый день
        (каждый наследник делает это для своего счётчика).
        """
        current_date = datetime.date.today()
        if self.last_response_date != current_date:
            self.responses_count = 0
            self.last_response_date = current_date

    def is_max_responses_reached(self):
        self._reset_counter_if_new_day()
        return not self.responses_count < self.MAX_RESPONSES_PER_DAY

    def _check_response_availability(self):
        logger.info(f"Current response count from ChatGPT: {self.responses_count}.")
        if self.is_max_responses_reached():
            logger.info(
                f"Response count from ChatGPT ({self.responses_count}) "
                f"equal to daily limit ({self.MAX_RESPONSES_PER_DAY}), "
                f"try increase limits."
            )
            raise ResponsesLimitExceededException()

    def _build_route_payload(
        self,
        content: ChatGPTContentData,
        mode: Mode = Mode.FULL,
    ) -> dict[str, Any]:
        data = content.model_dump(mode="json")

        survey_data = data.get("survey_data") or {}
        user_data = data.get("user_data") or {}
        survey_preferences = survey_data.get("data") or {}

        if mode == Mode.FULL:
            return {
                "user_data": user_data,
                "survey_data": survey_data,
                "places_data": data.get("places_data") or [],
                "city": survey_data.get("city") or "",
                "prompt": survey_data.get("prompt") or "",
                "preferred_transport": survey_preferences.get("preferred_transport") or "",
                "preferences": survey_preferences.get("questions") or {},
                "order_matters": survey_preferences.get("order_matters"),
            }

        route_slots = survey_data.get("places") or {}

        return {
            "mode": "constructor_partial",
            "city": survey_data.get("city") or "",
            "preferred_transport": survey_preferences.get("preferred_transport") or "",
            "preferences": survey_preferences.get("questions") or {},
            "order_matters": survey_preferences.get("order_matters"),
            "route_slots": route_slots,
            "slots_count": len(route_slots),
            "user_profile": user_data,
            "prompt": survey_data.get("prompt") or "",
        }

    def _parse_chatgpt_response(self, response) -> dict[str, Any]:
        """
        Парсит ответ Responses API из SDK.
        Ожидаем JSON-строку в response.output_text.
        """
        logger.info("Received response from OpenAI API: %s", response)

        response_content: str | None = getattr(response, "output_text", None)

        if not response_content:
            parts = []
            for out_item in getattr(response, "output", []) or []:
                content_items = getattr(out_item, "content", None)
                if not content_items and isinstance(out_item, dict):
                    content_items = out_item.get("content", [])

                for c in content_items or []:
                    if hasattr(c, "text"):
                        parts.append(c.text)
                    elif isinstance(c, dict) and "text" in c:
                        parts.append(c["text"])

            response_content = "".join(parts).strip() if parts else None

        if not response_content:
            raise APIException(message=f"Empty response from OpenAI: {response}", code=400)

        response_content = response_content.strip()

        try:
            return json.loads(response_content)
        except Exception as ex:
            raise APIException(
                message=f"OpenAI returned non-JSON content: {response_content}"
            ) from ex

    def _create_request_kwargs(self, content: ChatGPTContentData, mode: Mode = Mode.FULL) -> dict[str, Any]:
        """
        Формирует параметры запроса для Responses API с локальными tools мест.
        """
        prompt = FULL_MODE_PROMPT if mode == Mode.FULL else PARTIAL_MODE_PROMPT
        kwargs: dict[str, Any] = {
            "model": self.CHATGPT_MODEL,
            "input": [
                {
                    "role": "developer",
                    "content": prompt,
                },
                {
                    "role": "user",
                    "content": json.dumps(
                        self._build_route_payload(content, mode),
                        ensure_ascii=False,
                        default=str,
                    ),
                },
            ],
            "tools": self.route_places_tools.definitions,
            "tool_choice": "auto",
            "text": {
                "format": GENERATED_ROUTE_RESPONSE_FORMAT,
            },
            "max_output_tokens": 60000,
            "truncation": "auto",
        }

        return kwargs

    def _extract_tool_calls(self, response) -> list[dict[str, Any]]:
        tool_calls = []
        for item in getattr(response, "output", []) or []:
            item_type = getattr(item, "type", None)
            if item_type is None and isinstance(item, dict):
                item_type = item.get("type")

            if item_type != "function_call":
                continue

            name = getattr(item, "name", None) if not isinstance(item, dict) else item.get("name")
            call_id = getattr(item, "call_id", None) if not isinstance(item, dict) else item.get("call_id")
            raw_arguments = (
                getattr(item, "arguments", "{}") if not isinstance(item, dict) else item.get("arguments", "{}")
            )

            if isinstance(raw_arguments, str):
                arguments = json.loads(raw_arguments or "{}")
            else:
                arguments = raw_arguments or {}

            tool_calls.append(
                {
                    "name": name,
                    "call_id": call_id,
                    "arguments": arguments,
                }
            )

        return tool_calls

    def _run_tool_calls(self, response) -> list[dict[str, Any]]:
        tool_outputs = []
        for tool_call in self._extract_tool_calls(response):
            result = self.route_places_tools.call(tool_call["name"], tool_call["arguments"])
            tool_outputs.append(
                {
                    "type": "function_call_output",
                    "call_id": tool_call["call_id"],
                    "output": self.route_places_tools.dump_tool_output(result),
                }
            )

        return tool_outputs

    def _create_tool_followup_kwargs(self, response, tool_outputs: list[dict[str, Any]]) -> dict[str, Any]:
        return {
            "model": self.CHATGPT_MODEL,
            "previous_response_id": response.id,
            "input": tool_outputs,
            "tools": self.route_places_tools.definitions,
            "tool_choice": "auto",
            "text": {
                "format": GENERATED_ROUTE_RESPONSE_FORMAT,
            },
            "max_output_tokens": 60000,
            "truncation": "auto",
        }

    @retry_on_status_code(
        code=429,
        max_retries=CHATGPT_MAX_REQUEST_RETRIES,
        delay=CHATGPT_REQUEST_DELAY,
    )
    def _send_request(self, content: ChatGPTContentData, mode: Mode = Mode.FULL) -> dict[str, Any]:
        """
        Делает запрос в OpenAI через SDK и выполняет локальные tool calls.
        """
        self._check_response_availability()
        sleep(self.CHATGPT_REQUEST_DELAY)

        kwargs = self._create_request_kwargs(content, mode)

        try:
            response = self.proxy_openai_client.responses.create(**kwargs)
            for _ in range(10):
                tool_outputs = self._run_tool_calls(response)
                if not tool_outputs:
                    return self._parse_chatgpt_response(response)

                response = self.proxy_openai_client.responses.create(
                    **self._create_tool_followup_kwargs(response, tool_outputs)
                )

            return self._parse_chatgpt_response(response)

        except httpx.ReadTimeout as ex:
            logger.error(f"OpenAI ReadTimeout: {str(ex)}")
            raise
        except httpx.HTTPError as ex:
            logger.error(f"HTTP error while sending request to OpenAI: {str(ex)}")
            raise
        except Exception as ex:
            logger.error(f"Error while sending the request to OpenAI: {str(ex)}")
            raise
