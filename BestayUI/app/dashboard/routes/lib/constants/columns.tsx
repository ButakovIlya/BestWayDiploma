import { ColumnDef } from "@tanstack/react-table";
import { Route } from "../../types";
import { BaseOption } from "@/app/types/form";

export const columns: ColumnDef<Route>[] = [
  {
    accessorKey: "city",
    header: "Город",
  },
  {
    accessorKey: "name",
    header: "Имя",
  },
  {
    accessorKey: "places",
    header: "Места",
    cell: (value) => {
      const rowValue = value.getValue() as BaseOption[];
      const joinedStr = rowValue.map((row) => row.label).join(", ");
      const formattedStr = joinedStr.slice(0, 50);

      return `${formattedStr}${joinedStr.length > 50 ? "..." : ""}`;
    },
  },
];
