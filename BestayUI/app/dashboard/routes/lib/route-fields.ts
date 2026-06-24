import { Field } from "@/app/types";
import { routeSchema } from "./routeSchema";
import { ALLOWED_CITIES } from "@/app/lib/constants/allowed-cities";

export const routeFields: Field<typeof routeSchema>[] = [
  { name: "name", title: "Имя", type: "string" },
  { name: "city", title: "Город", type: "select", options: ALLOWED_CITIES },
];
