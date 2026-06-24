import { Field } from "@/app/types";
import { userProfileSchema } from "./user-profile-schema";

export const userProfileFields: Field<typeof userProfileSchema>[] = [
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
