import datetime
import json
import logging
from time import sleep
from typing import Any

import httpx

from openai import OpenAI

from common.exceptions import APIException, ResponsesLimitExceededException
from config.settings import Settings
from infrastructure.managers.ChatGPT.dto import ChatGPTContentData
from infrastructure.managers.ChatGPT.utils import retry_on_status_code
from infrastructure.managers.proxy_client import ProxyClient
from infrastructure.repositories.interfaces.ChatGPT.base import ClassificationManager
from application.use_cases.routes.enums import RouteGenerationMode as Mode

logger = logging.getLogger(__name__)


class BaseClassificationManager(ClassificationManager):
    """
    Базовый класс для работы с OpenAI Responses API через prompt object.
    """

    settings = Settings()

    CHATGPT_MODEL = settings.chatgpt.model
    CHATGPT_REQUEST_DELAY = settings.chatgpt.request_delay
    CHATGPT_MAX_REQUEST_RETRIES = settings.chatgpt.max_request_retries
    MAX_RESPONSES_PER_DAY = settings.chatgpt.max_responses_per_day

    CHATGPT_FULL_PROMPT_ID = settings.chatgpt.full_mode_prompt_id
    CHATGPT_FULL_PROMPT_VERSION = settings.chatgpt.full_mode_prompt_version

    CHATGPT_PARTIAL_PROMPT_ID = settings.chatgpt.partial_mode_prompt_id
    CHATGPT_PARTIAL_PROMPT_VERSION = settings.chatgpt.partial_mode_prompt_version

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

    def _build_prompt_variables(
        self,
        content: ChatGPTContentData,
        mode: Mode = Mode.FULL,
    ) -> dict[str, Any]:
        data = content.model_dump(mode="json")

        survey_data = data.get("survey_data") or {}
        user_data = data.get("user_data") or {}

        if mode == Mode.FULL:
            return {
                "prompt": survey_data.get("prompt") or "",
            }

        return {
            "payload_json": json.dumps(
                {
                    "places_data": survey_data.get("places") or {},
                    "data_data": user_data,
                    "user_data": survey_data.get("data") or {},
                    "city": survey_data.get("city") or "",
                    "prompt": survey_data.get("prompt") or "",
                },
                ensure_ascii=False,
            ),
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
        Формирует параметры запроса для Responses API через prompt object.
        """
        PROMPT_ID = self.CHATGPT_FULL_PROMPT_ID if mode == Mode.FULL else self.CHATGPT_PARTIAL_PROMPT_ID
        PROMPT_VERSION = self.CHATGPT_FULL_PROMPT_VERSION if mode == Mode.FULL else self.CHATGPT_PARTIAL_PROMPT_VERSION
        logger.info(f"_send_response to ChatGPT with prompt_id: {PROMPT_ID}")
        kwargs: dict[str, Any] = {
            "model": self.CHATGPT_MODEL,
            "input": "",
            "prompt": {
                "id": PROMPT_ID,
                "variables": self._build_prompt_variables(content, mode),
            },
            "max_output_tokens": 60000,
            "truncation": "auto",
        }

        if PROMPT_VERSION:
            kwargs["prompt"]["version"] = str(PROMPT_VERSION)

        return kwargs

    @retry_on_status_code(
        code=429,
        max_retries=CHATGPT_MAX_REQUEST_RETRIES,
        delay=CHATGPT_REQUEST_DELAY,
    )
    def _send_request(self, content: ChatGPTContentData, mode: Mode = Mode.FULL) -> dict[str, Any]:
        """
        Делает запрос в OpenAI через SDK и prompt object.
        """
        self._check_response_availability()
        sleep(self.CHATGPT_REQUEST_DELAY)

        kwargs = self._create_request_kwargs(content, mode)

        try:
            response = self.proxy_openai_client.responses.create(**kwargs)
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
