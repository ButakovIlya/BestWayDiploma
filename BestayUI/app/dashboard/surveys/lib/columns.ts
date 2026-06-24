import { ColumnDef } from "@tanstack/react-table";
import { SurveyRead } from "@/app/types/entities";
import dayjs from "dayjs";

export const columns: ColumnDef<SurveyRead>[] = [
  {
    accessorKey: "city",
    header: "Город",
  },
  {
    accessorKey: "name",
    header: "Имя",
  },
  {
    accessorKey: "created_at",
    header: "Дата создания",
    cell: ({ row }) => dayjs(row.original.created_at).format("DD.MM.YYYY"),
  },
];
