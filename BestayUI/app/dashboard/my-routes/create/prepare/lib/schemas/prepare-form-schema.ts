"use client";

import { z } from "zod";

export const prepareFormSchema = z.object({
  name: z.string().nonempty("Обязательное поле"),
  city: z.string().nonempty("Обязательное поле"),
  preferredTransport: z.string().nonempty("Обязательное поле"),
  orderMatter: z.boolean(),
  whatImportant: z.string(),
});
