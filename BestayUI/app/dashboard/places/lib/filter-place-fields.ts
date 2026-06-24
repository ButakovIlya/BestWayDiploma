import { Field } from "@/app/types";
import { formSchema } from "./create-place-form";
import { ALLOWED_PLACE_CATEGORIES } from "@/app/lib/constants/place-categories";
import { ALLOWED_PLACE_TYPES } from "@/app/lib/constants/place-types";

export const filterFields: Field<typeof formSchema>[] = [
  { name: "name", title: "Имя", type: "string" },
  {
    name: "category",
    title: "Категория",
    type: "select",
    options: ALLOWED_PLACE_CATEGORIES,
  },
  { name: "type", title: "Тип", type: "select", options: ALLOWED_PLACE_TYPES },
  { name: "coordinates", title: "Координаты", type: "string" },
];
