import { PaginatedResponseRouteRead, RouteRead } from "@/app/types/entities";
import { requestData } from "../request";
import { Pagination } from "@/app/types";

export function getMyRoutes(pagination: Pagination) {
  const { pageIndex, pageSize } = pagination;
  return requestData<PaginatedResponseRouteRead>(
    `/api/public/routes/my?page=${pageIndex + 1}&page_size=${pageSize}`,
    {},
  );
}

export function generateMyRoute(surveyId: number, method: string) {
  return requestData<string>(
    `/api/public/routes/generate/${surveyId}?mode=${method}`,
    {
      method: "POST",
    },
  );
}

export function removeMyRoute(id: number) {
  return requestData<string>(`/api/public/routes/my/${id}/delete`, {
    method: "DELETE",
    next: { tags: ["notify"] },
  });
}

export function getMyRoute(id: number) {
  return requestData<RouteRead>(`/api/public/routes/my/${id}`);
}

export function getFeedRoutes(pagination: Pagination) {
  const { pageIndex, pageSize } = pagination;
  return requestData<PaginatedResponseRouteRead>(
    `/api/public/routes/feed?page=${pageIndex + 1}&page_size=${pageSize}`,
    {},
  );
}

export function getFeedRoute(id: number) {
  return requestData<RouteRead>(`/api/public/routes/feed/${id}`);
}

export function addRoutePlace(routeId: number, placeId: number) {
  return requestData<string>(
    `/api/public/routes/${routeId}/places/add/${placeId}`,
    {
      method: "POST",
      next: { tags: ["notify"] },
    },
  );
}

export function removeRoutePlace(routeId: number, placeId: number) {
  return requestData<string>(
    `/api/public/routes/${routeId}/places/remove?route_place_id=${placeId}`,
    {
      method: "DELETE",
      next: { tags: ["notify"] },
    },
  );
}

export function updateRouteOrder(
  routeId: number,
  orderDict: {
    [key: string]: number;
  },
) {
  return requestData<string>(
    `/api/public/routes/${routeId}/places/update_order`,
    {
      method: "POST",
      body: JSON.stringify({
        order_dict: {
          ...orderDict,
        },
      }),
      next: { tags: ["notify"] },
    },
  );
}

export function copyRoute(routeId: string) {
  return requestData<RouteRead>(`/api/public/routes/copy/${routeId}`, {
    method: "POST",
    next: { tags: ["notify"] },
  });
}
