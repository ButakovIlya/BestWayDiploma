"use client";

import { z } from "zod";

export const routeSchema = z.object({
  name: z.string().nonempty("Обязательное поле"),
  city: z.string().nonempty("Обязательное поле"),
});
