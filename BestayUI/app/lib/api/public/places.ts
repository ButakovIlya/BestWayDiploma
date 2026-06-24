import { Pagination } from "@/app/types";
import { requestData } from "../request";
import { PaginatedResponsePlaceRead } from "@/app/types/entities";

export function getPublicPlaces(
  pagination: Pagination,
  filters?: { id: string; value: unknown }[],
) {
  const { pageIndex, pageSize } = pagination;

  const filterParams = filters?.map(({ id, value }) => `${id}=${value}`);

  return requestData<PaginatedResponsePlaceRead>(
    `/api/public/places?page=${pageIndex + 1}&page_size=${pageSize}${filterParams?.length ? `&${filterParams.join("&")}` : ""}`,
    {},
  );
}
