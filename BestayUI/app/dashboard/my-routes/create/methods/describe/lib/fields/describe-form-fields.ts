import { Field } from "@/app/types";
import { describeFormSchema } from "../schemas/describe-form-schema";

export const describeFormFields: Field<typeof describeFormSchema>[] = [
  {
    name: "prompt",
    type: "textarea",
    tip: "Подсказка",
    maxLength: 200,
    style: { maxWidth: "400px", minWidth: "200px" },
  },
];
