import { Field } from "@/app/types";
import { formSchema } from "./create-user-form";

export const formFields: Field<typeof formSchema>[] = [
  { name: "first_name", title: "Имя", type: "string" },
  { name: "last_name", title: "Фамилия", type: "string" },
  { name: "middle_name", title: "Отчество", type: "string" },
  {
    name: "phone",
    title: "Телефон",
    disabled: true,
    type: "string",
  },
];
