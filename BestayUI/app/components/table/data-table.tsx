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
        cell: ({ row }) => {
          if (actions.length === 1) {
            const { title, onClick, disabled } = actions[0];
            return (
              <Button
                variant="outline"
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

  return (
    <>
      {columnFilters && filterConfig && (
        <FilterPanel filterColumns={filterConfig} getColumn={table.getColumn} />
      )}
      <Table
        containerClassname={cn(
          containerClassname,
          "h-[80vh] overflow-auto rounded-[28px] border border-[#0060961f] bg-white/90 shadow-[0_18px_55px_rgba(0,96,150,0.08)]",
        )}
        className={cn(
          className,
          "w-full h-full overflow-clip relative border-separate border-spacing-0",
        )}
      >
        <TableHeader className="sticky top-[-1] bg-[#eaf5ff]/95 backdrop-blur z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="h-12 px-4 font-bold text-[#123047]">
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
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={clsx(
                      "px-4 py-3",
                      cell.id.includes("actions") &&
                        "sticky right-0 z-0 bg-white/85 backdrop-blur",
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Нет результатов.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <PaginationBar
        pagination={pagination}
        getCanNextPage={table.getCanNextPage}
        nextPage={table.nextPage}
        getCanPreviousPage={table.getCanPreviousPage}
        previousPage={table.previousPage}
      />
    </>
  );
}
