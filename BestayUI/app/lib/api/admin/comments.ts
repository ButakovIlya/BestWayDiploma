import { CommentRead } from "@/app/types/entities";
import { requestData } from "../request";

export function removeComment(id: number) {
  return requestData<CommentRead>(`/api/admin/comments/${id}`, {
    method: "DELETE",
    next: { tags: ["notify"] },
  });
}
