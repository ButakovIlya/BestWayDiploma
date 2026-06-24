from __future__ import annotations

import json
import math
from typing import Any

import psycopg2
from psycopg2.extras import RealDictCursor

from config.settings import Settings


class OpenAIRoutePlacesTools:
    def __init__(self, settings: Settings | None = None) -> None:
        self._settings = settings or Settings()

    @property
    def definitions(self) -> list[dict[str, Any]]:
        return [
            {
                "type": "function",
                "name": "describe_places_schema",
                "description": "Read public.places schema from PostgreSQL. Call this first to understand the exact response shape.",
                "parameters": {
                    "type": "object",
                    "properties": {},
                    "additionalProperties": False,
                },
            },
            {
                "type": "function",
                "name": "get_all_places",
                "description": "Return raw places rows available for route generation. Filter by city when provided.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "limit": {
                            "anyOf": [{"type": "integer", "minimum": 1}, {"type": "null"}],
                            "description": "Optional maximum number of rows to return.",
                        },
                        "city": {
                            "anyOf": [{"type": "string"}, {"type": "null"}],
                            "description": "Optional city filter, e.g. Пермь.",
                        },
                    },
                    "additionalProperties": False,
                },
            },
            {
                "type": "function",
                "name": "get_places_by_ids",
                "description": "Fetch concrete places from public.places by id and preserve requested order.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "place_ids": {
                            "type": "array",
                            "items": {"anyOf": [{"type": "integer"}, {"type": "string"}]},
                        }
                    },
                    "required": ["place_ids"],
                    "additionalProperties": False,
                },
            },
            {
                "type": "function",
                "name": "build_ordered_route_candidates",
                "description": "Order selected places by nearest-neighbor using the raw coordinates field.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "place_ids": {
                            "type": "array",
                            "items": {"anyOf": [{"type": "integer"}, {"type": "string"}]},
                        },
                        "start_place_id": {
                            "anyOf": [{"type": "integer"}, {"type": "string"}, {"type": "null"}],
                            "description": "Optional id of the fixed starting place.",
                        },
                    },
                    "required": ["place_ids"],
                    "additionalProperties": False,
                },
            },
        ]

    def call(self, name: str, arguments: dict[str, Any] | None = None) -> dict[str, Any]:
        arguments = arguments or {}
        if name == "describe_places_schema":
            return self.describe_places_schema()
        if name == "get_all_places":
            return self.get_all_places(limit=arguments.get("limit"), city=arguments.get("city"))
        if name == "get_places_by_ids":
            return self.get_places_by_ids(place_ids=arguments["place_ids"])
        if name == "build_ordered_route_candidates":
            return self.build_ordered_route_candidates(
                place_ids=arguments["place_ids"],
                start_place_id=arguments.get("start_place_id"),
            )

        raise ValueError(f"Unknown OpenAI route tool: {name}")

    def describe_places_schema(self) -> dict[str, Any]:
        columns = self._get_columns()
        column_names = [column["column_name"] for column in columns]

        return {
            "table": "public.places",
            "raw_sql": "SELECT * FROM public.places ORDER BY 1",
            "columns": columns,
            "response_shape": {
                "type": "object",
                "properties": {
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "description": "Raw PostgreSQL row from public.places",
                        },
                    },
                },
            },
            "column_hints": {
                "id": [name for name in ["id", "place_id"] if name in column_names],
                "name": [name for name in ["name", "title", "place_name"] if name in column_names],
                "category": [name for name in ["category", "place_category"] if name in column_names],
                "type": [name for name in ["type", "place_type", "subcategory"] if name in column_names],
                "city": [name for name in ["city", "city_name"] if name in column_names],
                "description": [name for name in ["description", "descr", "details"] if name in column_names],
                "coordinates": [name for name in ["coordinates", "location", "geo"] if name in column_names],
            },
        }

    def get_all_places(self, limit: int | None = None, city: str | None = None) -> dict[str, Any]:
        sql = (
            "SELECT id, name, category, type, tags, map_name, city, coordinates, description "
            "FROM public.places"
        )
        params: list[Any] = []

        if city:
            sql += " WHERE city = %s"
            params.append(city)

        sql += " ORDER BY 1"

        if limit is not None:
            sql += " LIMIT %s"
            params.append(limit)

        with self._connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(sql, tuple(params))
                rows = [dict(row) for row in cur.fetchall()]

        return {
            "table": "public.places",
            "row_count": len(rows),
            "raw_sql": sql,
            "items": rows,
        }

    def get_places_by_ids(self, place_ids: list[int | str]) -> dict[str, Any]:
        if not place_ids:
            return {
                "table": "public.places",
                "row_count": 0,
                "raw_sql": "SELECT * FROM public.places WHERE FALSE",
                "items": [],
            }

        id_column = self._resolve_id_column()
        sql = f"SELECT * FROM public.places WHERE {id_column} = ANY(%s)"

        with self._connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(sql, (place_ids,))
                rows = [dict(row) for row in cur.fetchall()]

        order = {str(place_id): idx for idx, place_id in enumerate(place_ids)}
        rows.sort(key=lambda row: order.get(str(row.get(id_column)), 10**9))

        return {
            "table": "public.places",
            "row_count": len(rows),
            "raw_sql": sql,
            "items": rows,
        }

    def build_ordered_route_candidates(
        self,
        place_ids: list[int | str],
        start_place_id: int | str | None = None,
    ) -> dict[str, Any]:
        rows = self.get_places_by_ids(place_ids)["items"]
        id_column = self._resolve_id_column()

        candidates = []
        for row in rows:
            coords = self._extract_coordinates(row)
            if coords is None:
                continue

            lat, lon = coords
            candidates.append(
                {
                    "id": row.get(id_column),
                    "latitude": lat,
                    "longitude": lon,
                    "row": row,
                }
            )

        if not candidates:
            return {
                "ordered_place_ids": [row.get(id_column) for row in rows],
                "distance_km": None,
                "warning": "No usable coordinates found in raw places rows.",
            }

        remaining = {str(item["id"]): item for item in candidates}

        if start_place_id is not None and str(start_place_id) in remaining:
            current = remaining.pop(str(start_place_id))
        else:
            first_key = next(iter(remaining))
            current = remaining.pop(first_key)

        ordered = [current]
        total_distance = 0.0

        while remaining:
            next_key, next_item = min(
                remaining.items(),
                key=lambda item: self._distance_km(
                    current["latitude"],
                    current["longitude"],
                    item[1]["latitude"],
                    item[1]["longitude"],
                ),
            )

            total_distance += self._distance_km(
                current["latitude"],
                current["longitude"],
                next_item["latitude"],
                next_item["longitude"],
            )

            ordered.append(next_item)
            remaining.pop(next_key)
            current = next_item

        return {
            "ordered_place_ids": [item["id"] for item in ordered],
            "distance_km": round(total_distance, 2),
        }

    def _get_columns(self) -> list[dict[str, Any]]:
        sql = """
        SELECT
            column_name,
            data_type,
            udt_name,
            is_nullable,
            ordinal_position
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'places'
        ORDER BY ordinal_position
        """
        with self._connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(sql)
                return [dict(row) for row in cur.fetchall()]

    def _resolve_id_column(self) -> str:
        column_names = [column["column_name"] for column in self._get_columns()]
        for candidate in ["id", "place_id"]:
            if candidate in column_names:
                return candidate

        raise ValueError(
            "Could not find an id column in public.places. "
            f"Expected one of: id, place_id. Actual columns: {column_names}"
        )

    def _connection(self):
        db = self._settings.db
        return psycopg2.connect(
            dbname=db.name,
            user=db.user,
            password=db.password,
            host=db.host,
            port=db.port,
        )

    @staticmethod
    def dump_tool_output(value: dict[str, Any]) -> str:
        return json.dumps(value, ensure_ascii=False, default=str)

    @staticmethod
    def _extract_coordinates(row: dict[str, Any]) -> tuple[float, float] | None:
        coords = row.get("coordinates")

        if coords is None:
            return None

        if isinstance(coords, str):
            try:
                coords = json.loads(coords)
            except json.JSONDecodeError:
                return None

        if isinstance(coords, (list, tuple)) and len(coords) >= 2:
            try:
                return float(coords[0]), float(coords[1])
            except (TypeError, ValueError):
                return None

        if isinstance(coords, dict):
            lat = coords.get("lat") or coords.get("latitude")
            lon = coords.get("lon") or coords.get("lng") or coords.get("longitude")
            if lat is None or lon is None:
                return None
            try:
                return float(lat), float(lon)
            except (TypeError, ValueError):
                return None

        return None

    @staticmethod
    def _distance_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        radius_km = 6371.0
        phi_1 = math.radians(lat1)
        phi_2 = math.radians(lat2)
        delta_phi = math.radians(lat2 - lat1)
        delta_lambda = math.radians(lon2 - lon1)

        a = (
            math.sin(delta_phi / 2) ** 2
            + math.cos(phi_1) * math.cos(phi_2) * math.sin(delta_lambda / 2) ** 2
        )
        return 2 * radius_km * math.atan2(math.sqrt(a), math.sqrt(1 - a))
