"use client";

import { z } from "zod";

export const methodsFormSchema = z.object({
  method: z.string().nonempty("Обязательное поле"),
});
