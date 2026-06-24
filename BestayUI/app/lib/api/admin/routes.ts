import { PaginatedResponseRouteRead, RouteRead } from "@/app/types/entities";
import { requestData } from "../request";
import { Place, Route } from "@/app/dashboard/types";
import { Pagination } from "@/app/types";

export function getRoute(id: number) {
  // TODO: написать мапперы
  return requestData<RouteRead>(`/api/admin/routes/${id}`, {}).then(
    (data) =>
      ({
        id: data.id,
        city: data.city as string,
        duration: data.duration,
        name: data.name,
        places: data.places.map(
          ({ place }) =>
            ({
              id: place.id,
              category: place.category,
              city: place.city,
              name: place.name,
              type: place.type,
              photo: place.photo,
            }) as Place,
        ),
      }) as Route,
  );
}

export function getRoutes(pagination: Pagination) {
  const { pageIndex, pageSize } = pagination;
  return requestData<PaginatedResponseRouteRead>(
    `/api/admin/routes?page=${pageIndex + 1}&page_size=${pageSize}`,
    {},
  );
}

export function addRoute(formData: FormData) {
  return requestData<PaginatedResponseRouteRead>("/api/admin/routes", {
    method: "POST",
    body: formData,
    next: { tags: ["notify"] },
  });
}

export function editRoute(id: number, body: object) {
  return requestData<PaginatedResponseRouteRead>(`/api/admin/routes/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    next: { tags: ["notify"] },
  });
}

export function removeRoute(id: number) {
  return requestData<PaginatedResponseRouteRead>(`/api/admin/routes/${id}`, {
    method: "DELETE",
    next: { tags: ["notify"] },
  });
}
