import {
  CommentRead,
  PaginatedResponseCommentRead,
} from "@/app/types/entities";
import { requestData } from "../request";

export function getComments(postId: number) {
  return requestData<PaginatedResponseCommentRead>(
    `/api/public/comments/?post_id=${postId}&page_size=100`,
    {},
  );
}

export function createComment(postId: number, comment: string) {
  return requestData<CommentRead>("/api/public/comments", {
    method: "POST",
    body: JSON.stringify({
      post_id: postId,
      route_id: null,
      place_id: null,
      comment,
    }),
  });
}
