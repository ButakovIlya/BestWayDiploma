import { Field } from "@/app/types";
import { prepareFormSchema } from "../schemas/prepare-form-schema";
import { ALLOWED_CITIES } from "@/app/lib/constants/allowed-cities";
import { ALLOWED_MOVE_ROUTE_TYPES } from "@/app/lib/constants/allowed-move-route-types";
import {
  WHAT_IMPORTANT_OPTIONS,
  WHAT_IMPORTANT_TITLE,
} from "@/app/lib/constants/survey-questions";

export const prepareFormFields: Field<typeof prepareFormSchema>[] = [
  {
    name: "name",
    title: "Название маршрута",
    type: "string",
  },
  { name: "city", title: "Город", type: "select", options: ALLOWED_CITIES },
  {
    name: "preferredTransport",
    title: "Способ передвижения",
    type: "select",
    options: ALLOWED_MOVE_ROUTE_TYPES,
  },
  { name: "orderMatter", title: "Важность порядка", type: "boolean" },
  {
    name: "whatImportant",
    title: WHAT_IMPORTANT_TITLE,
    type: "select",
    options: WHAT_IMPORTANT_OPTIONS,
  },
];
