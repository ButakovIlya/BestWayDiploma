import { LikeRead, PaginatedResponseLikeRead } from "@/app/types/entities";
import { requestData } from "../request";

export function getLikes(postId: number) {
  return requestData<PaginatedResponseLikeRead>(
    `/api/public/likes?post_id=${postId}&page_size=100`,
    {},
  );
}

export function createLike(postId: number) {
  return requestData<LikeRead>("/api/public/likes", {
    method: "POST",
    body: JSON.stringify({ post_id: postId, route_id: null, place_id: null }),
  });
}

export function removeLike(likeId: number) {
  return requestData<LikeRead>(`/api/public/likes/${likeId}`, {
    method: "DELETE",
  });
}
