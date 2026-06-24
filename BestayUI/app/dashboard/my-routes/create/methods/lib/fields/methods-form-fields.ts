import { Field } from "@/app/types";
import { methodsFormSchema } from "../schemas/methods-form-schema";

export const methodsFormFields: Field<typeof methodsFormSchema>[] = [
  {
    name: "method",
    type: "radio",
    options: [
      { value: 0, label: "Напишу описание маршрута" },
      { value: 1, label: "Выберу из предложенных мест с предложениями ИИ" },
    ],
  },
];
