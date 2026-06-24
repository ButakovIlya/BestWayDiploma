import { PaginatedResponseUserDTO, UserDTO } from "@/app/types/entities";
import { requestData } from "../request";
import { Pagination } from "@/app/types";

export function getUser(id: number) {
  return requestData<UserDTO>(`/api/admin/users/${id}`);
}

export function getUsers(pagination: Pagination) {
  const { pageIndex, pageSize } = pagination;

  return requestData<PaginatedResponseUserDTO>(
    `/api/admin/users?page=${pageIndex + 1}&page_size=${pageSize}`,
    {},
  );
}

export function addUser(body: object) {
  return requestData<PaginatedResponseUserDTO>("/api/admin/users", {
    method: "POST",
    body: JSON.stringify(body),
    next: { tags: ["notify"] },
  });
}

export function editUser(id: number, body: object) {
  return requestData<PaginatedResponseUserDTO>(`/api/admin/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    next: { tags: ["notify"] },
  });
}

export function removeUser(id: number) {
  return requestData<PaginatedResponseUserDTO>(`/api/admin/users/${id}`, {
    method: "DELETE",
    next: { tags: ["notify"] },
  });
}
