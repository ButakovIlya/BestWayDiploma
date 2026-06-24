import { Field } from "@/app/types";
import { formSchema } from "./custom-place-form";
import { ALLOWED_PLACE_CATEGORIES } from "@/app/lib/constants/place-categories";
import { ALLOWED_PLACE_TYPES } from "@/app/lib/constants/place-types";

export const formFields: Field<typeof formSchema>[] = [
  {
    name: "category",
    title: "Категория",
    type: "combobox-with-search",
    options: ALLOWED_PLACE_CATEGORIES,
  },
  {
    name: "type",
    title: "Тип",
    type: "combobox-with-search",
    options: ALLOWED_PLACE_TYPES,
  },
  {
    name: "description",
    title: "Описание",
    type: "textarea",
    maxLength: 50,
    style: { maxWidth: "332px", minWidth: "200px" },
  },
];
