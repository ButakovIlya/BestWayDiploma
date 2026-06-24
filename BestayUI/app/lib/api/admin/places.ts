import { PaginatedResponsePlaceRead, PlaceRead } from "@/app/types/entities";
import { requestData } from "../request";
import { Pagination } from "@/app/types";

export function getPlace(id: number) {
  return requestData<PlaceRead>(`/api/admin/places/${id}`);
}

export function getPlaces(
  pagination: Pagination,
  filters?: { id: string; value: unknown }[],
) {
  const { pageIndex, pageSize } = pagination;

  const filterParams = filters?.map(({ id, value }) => `${id}=${value}`);

  return requestData<PaginatedResponsePlaceRead>(
    `/api/admin/places?page=${pageIndex + 1}&page_size=${pageSize}${filterParams?.length ? `&${filterParams.join("&")}` : ""}`,
    {},
  );
}

export function addPlace(formData: FormData) {
  return requestData<PaginatedResponsePlaceRead>("/api/admin/places", {
    method: "POST",
    body: formData,
    next: { tags: ["notify"] },
  });
}

export function editPlace(id: number, body: object) {
  return requestData<PaginatedResponsePlaceRead>(`/api/admin/places/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    next: { tags: ["notify"] },
  });
}

export function removePlace(id: number) {
  return requestData<PaginatedResponsePlaceRead>(`/api/admin/places/${id}`, {
    method: "DELETE",
    next: { tags: ["notify"] },
  });
}

export function uploadPlaceAvatar(id: number, formData: FormData) {
  return requestData<PlaceRead>(`/api/admin/places/${id}/avatar`, {
    method: "POST",
    body: formData,
    next: { tags: ["notify"] },
  });
}

export function uploadPhotoPlace(id: number, formData: FormData) {
  return requestData<PlaceRead>(`/api/admin/places/${id}/photos/add`, {
    method: "POST",
    body: formData,
    next: { tags: ["notify"] },
  });
}

export function removePhotoPlace(placeId: number, photoId: number) {
  return requestData<PlaceRead>(
    `/api/admin/places/${placeId}/photos/${photoId}/delete`,
    {
      method: "DELETE",
      next: { tags: ["notify"] },
    },
  );
}
