"use client";

import { z } from "zod";

export const formSchema = z.object({
  first_name: z.string().nonempty("Обязательное поле"),
  last_name: z.string().nonempty("Обязательное поле"),
  middle_name: z.string().nonempty("Обязательное поле"),
  phone: z
    .string()
    .nonempty("Обязательное поле")
    .refine((value) => /^(\d){10,11}$/.test(value), "Введите от 10 до 11 цифр"),
});
