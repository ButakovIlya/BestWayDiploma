import { Pagination } from "@/app/types";
import { PaginatedResponsePostRead, PostRead } from "@/app/types/entities";
import { requestData } from "../request";

export function getPosts(pagination: Pagination) {
  const { pageIndex, pageSize } = pagination;
  return requestData<PaginatedResponsePostRead>(
    `/api/public/posts/all?page=${pageIndex + 1}&page_size=${pageSize}`,
    {},
  );
}

export function getPost(id: number) {
  return requestData<PostRead>(`/api/public/posts/all/${id}`);
}

export function createPost(formData: FormData) {
  return requestData<PostRead>(`/api/public/posts`, {
    body: formData,
    method: "POST",
  });
}

export function removePost(id: number) {
  return requestData<string>(`/api/admin/posts/${id}`, {
    method: "DELETE",
    next: { tags: ["notify"] },
  });
}
