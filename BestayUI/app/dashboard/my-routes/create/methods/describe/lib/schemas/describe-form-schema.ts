"use client";

import { z } from "zod";

export const describeFormSchema = z.object({
  prompt: z.string().nonempty("Обязательное поле"),
});
