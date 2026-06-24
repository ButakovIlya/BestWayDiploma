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
    <Pagination className="pt-[10px]">
      <PaginationContent>
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
          <PaginationLink>{pagination.pageIndex + 1}</PaginationLink>
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
