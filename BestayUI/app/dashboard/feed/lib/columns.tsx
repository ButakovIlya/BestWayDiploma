import { ColumnDef } from "@tanstack/react-table";
import { RoutePlaceRead, RouteRead } from "@/app/types/entities";

export const columns: ColumnDef<RouteRead>[] = [
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
    cell: (row) => {
      const rowValue = row.getValue() as RoutePlaceRead[];
      const joinedStr = rowValue.map((row) => row.place.name).join(", ");
      const formattedStr = joinedStr.slice(0, 50);

      return `${formattedStr}${joinedStr.length > 50 ? "..." : ""}`;
    },
  },
];
