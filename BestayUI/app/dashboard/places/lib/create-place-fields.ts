import { Field } from "@/app/types";
import { formSchema } from "./create-place-form";
import { ALLOWED_PLACE_CATEGORIES } from "@/app/lib/constants/place-categories";
import { ALLOWED_PLACE_TYPES } from "@/app/lib/constants/place-types";
import { ALLOWED_CITIES } from "@/app/lib/constants/allowed-cities";

export const formFields: Field<typeof formSchema>[] = [
  { name: "name", title: "Имя", type: "string" },
  { name: "description", title: "Описание", type: "string" },
  {
    name: "category",
    title: "Категория",
    type: "combobox-with-search",
    options: ALLOWED_PLACE_CATEGORIES,
  },
  { name: "city", title: "Город", type: "select", options: ALLOWED_CITIES },
  {
    name: "type",
    title: "Тип",
    type: "combobox-with-search",
    options: ALLOWED_PLACE_TYPES,
  },
  { name: "coordinates", title: "Координаты", type: "string" },
  { name: "website_url", title: "Ссылка на бронирование", type: "string" },
];
