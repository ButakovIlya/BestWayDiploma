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
}

export function PaginationBar(props: PaginationProps) {
  const {
    pagination,
    getCanNextPage,
    getCanPreviousPage,
    nextPage,
    previousPage,
  } = props;

  if (!pagination) {
    return null;
  }

  return (
    <Pagination className="pt-4">
      <PaginationContent className="rounded-full border border-[#00609614] bg-white/80 px-3 py-2 shadow-[0_10px_30px_rgba(0,96,150,0.06)]">
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
          <PaginationLink className="rounded-full font-semibold text-[#006096]">
            {pagination.pageIndex + 1}
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
  );
}
