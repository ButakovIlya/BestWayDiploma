"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  PaginationState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ActionsDropdownCell } from "../actions-dropdown-cell";
import { Actions, FilterConfig } from "../../types";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";
import { PaginationBar } from "./pagination-bar";
import { FilterPanel } from "./filter-panel";
import { Loading } from "./loading";
import clsx from "clsx";
import { Inbox } from "lucide-react";

interface DataTableProps<TData, TValue>
  extends React.HTMLAttributes<HTMLTableElement> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  dataLoading?: boolean;
  pagination?: { pageIndex: number; pageSize: number };
  columnFilters?: ColumnFiltersState;
  filterConfig?: FilterConfig[];
  rowCount?: number;
  actions?: Actions<TData>[];
  containerClassname?: string;
  handleChangePagination?: Dispatch<SetStateAction<PaginationState>>;
  handleChangeFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
}

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const {
    containerClassname,
    className,
    columns,
    data,
    dataLoading,
    actions,
    pagination,
    columnFilters,
    filterConfig,
    rowCount,
    handleChangePagination,
    handleChangeFilters,
  } = props;

  const actionColumn: ColumnDef<TData, TValue> | null = actions
    ? {
        id: "actions",
        header: "Действия",
        cell: ({ row }) => {
          if (actions.length === 1) {
            const { title, onClick, disabled } = actions[0];
            return (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onClick(row);
                }}
                disabled={
                  typeof disabled === "boolean"
                    ? disabled
                    : disabled && disabled(row)
                }
              >
                {typeof title === "string" ? title : title(row)}
              </Button>
            );
          }
          return <ActionsDropdownCell row={row} actions={actions} />;
        },
      }
    : null;

  const table = useReactTable({
    data: data ?? [],
    columns: actionColumn ? [...columns, actionColumn] : columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: handleChangePagination,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: handleChangeFilters,
    state: {
      pagination,
      columnFilters,
    },
    manualPagination: true,
    rowCount,
  });

  const totalPages =
    pagination && rowCount
      ? Math.max(1, Math.ceil(rowCount / pagination.pageSize))
      : undefined;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      {columnFilters && filterConfig && (
        <FilterPanel filterColumns={filterConfig} getColumn={table.getColumn} />
      )}
      <Table
        containerClassname={cn(
          containerClassname,
          "min-h-[280px] flex-1 overflow-auto rounded-[22px] border border-[#0060961f] bg-white/92 shadow-[0_18px_55px_rgba(0,96,150,0.08)] md:min-h-[320px] md:rounded-[28px]",
        )}
        className={cn(
          className,
          "relative h-full w-full overflow-clip border-separate border-spacing-0",
        )}
      >
        <TableHeader className="sticky top-[-1] z-10 bg-[#eaf5ff]/95 backdrop-blur">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="h-12 px-3 text-xs font-bold tracking-wide text-[#123047] md:h-14 md:px-5 md:text-sm"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-white/90">
          {dataLoading ? (
            <TableRow>
              <TableCell colSpan={99}>
                <Loading />
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="transition-colors hover:bg-[#f5fbff]"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={clsx(
                      "px-3 py-3 text-sm leading-relaxed text-[#1f3344] md:px-5 md:py-4 md:text-[15px]",
                      cell.id.includes("actions") &&
                        "sticky right-0 z-0 bg-white/90 backdrop-blur",
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + (actions ? 1 : 0)}
                className="h-40 text-center"
              >
                <div className="flex flex-col items-center justify-center gap-3 text-[#4a6278]">
                  <Inbox className="opacity-50" size={28} />
                  <span className="text-base font-medium">Нет результатов</span>
                  <span className="text-sm text-[var(--bw-muted)]">
                    Попробуйте изменить фильтры или создайте новую запись
                  </span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <PaginationBar
        pagination={pagination}
        rowCount={rowCount}
        totalPages={totalPages}
        getCanNextPage={table.getCanNextPage}
        nextPage={table.nextPage}
        getCanPreviousPage={table.getCanPreviousPage}
        previousPage={table.previousPage}
      />
    </div>
  );
}
