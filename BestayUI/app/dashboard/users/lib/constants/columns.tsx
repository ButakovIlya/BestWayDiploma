import { ColumnDef } from "@tanstack/react-table";
import { User } from "../../types";
import { Check, X } from "lucide-react";

export const columns: ColumnDef<User>[] = [
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "fio",
    header: "ФИО",
  },
  {
    accessorKey: "phone",
    header: "Телефон",
  },
  {
    accessorKey: "isBanned",
    header: "Заблокирован",
    cell: ({ row }) => (row.original.isBanned ? <Check /> : <X />),
  },
];
