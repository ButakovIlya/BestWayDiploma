import { useState } from "react";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_ROW_COUNT,
} from "../lib/constants/pagination";
import { ColumnFiltersState } from "@tanstack/react-table";

export function useTable() {
  const [pagination, setPagination] = useState({
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const [rowCount, setRowCount] = useState(DEFAULT_ROW_COUNT);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  return {
    pagination,
    rowCount,
    columnFilters,
    setPagination,
    setRowCount,
    setColumnFilters,
  };
}
