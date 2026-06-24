import { ColumnDef } from "@tanstack/react-table";
import { Place } from "@/app/dashboard/types";
import { BackendImage } from "@/app/components/backend-image";

export const columns: ColumnDef<Place>[] = [
  {
    accessorKey: "city",
    header: "Город",
  },
  {
    accessorKey: "name",
    header: "Имя",
  },
  {
    accessorKey: "category",
    header: "Категория",
  },
  {
    accessorKey: "type",
    header: "Тип",
  },
  {
    accessorKey: "photo",
    header: "Фото",
    cell: ({ row }) =>
      row.original.photo ? (
        <BackendImage
          src={row.original.photo}
          width={200}
          height={100}
          alt="Фото"
        />
      ) : null,
  },
];
