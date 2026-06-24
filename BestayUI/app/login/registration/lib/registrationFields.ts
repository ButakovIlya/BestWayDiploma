import { Field } from "@/app/types";
import { registrationSchema } from "./registrationSchema";

export const registrationFields: Field<typeof registrationSchema>[] = [
  {
    name: "lastName",
    title: "Фамилия",
    type: "string",
  },
  { name: "firstName", title: "Имя", type: "string" },
  {
    name: "middleName",
    title: "Отчество",
    type: "string",
  },
  {
    name: "birthday",
    title: "Дата рождения",
    type: "date",
  },
];
