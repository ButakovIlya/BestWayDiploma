import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import { Button } from "../ui/button";

interface PaginationProps {
  previousPage: () => void;
  getCanPreviousPage: () => boolean;
  nextPage: () => void;
  getCanNextPage: () => boolean;
  pagination?: { pageIndex: number; pageSize: number };
  rowCount?: number;
  totalPages?: number;
}

export function PaginationBar(props: PaginationProps) {
  const {
    pagination,
    rowCount,
    totalPages,
    getCanNextPage,
    getCanPreviousPage,
    nextPage,
    previousPage,
  } = props;

  if (!pagination) {
    return null;
  }

  const currentPage = pagination.pageIndex + 1;
  const pagesTotal = totalPages ?? currentPage;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
      <p className="text-sm text-[var(--bw-muted)]">
        {typeof rowCount === "number" ? (
          <>
            Всего записей: <span className="font-semibold text-[#123047]">{rowCount}</span>
          </>
        ) : (
          "Страница данных"
        )}
      </p>
      <Pagination>
        <PaginationContent className="rounded-full border border-[#00609614] bg-white/85 px-3 py-2 shadow-[0_10px_30px_rgba(0,96,150,0.06)]">
          <PaginationItem>
            <Button
              variant="outline"
              size="sm"
              onClick={() => previousPage()}
              disabled={!getCanPreviousPage()}
            >
              <ChevronLeft />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink className="min-w-16 rounded-full px-4 font-semibold text-[#006096]">
              {currentPage} / {pagesTotal}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="outline"
              size="sm"
              onClick={() => nextPage()}
              disabled={!getCanNextPage()}
            >
              <ChevronRight />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
