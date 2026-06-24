"use client";

import { z } from "zod";

export const formSchema = z.object({
  name: z.string().nonempty("Обязательное поле"),
  description: z.string().nonempty("Обязательное поле"),
  category: z.string().nonempty("Обязательное поле"),
  type: z.string().nonempty("Обязательное поле"),
  city: z.string().nonempty("Обязательное поле"),
  website_url: z
    .string()
    .refine(
      (val) => val === "" || /^(http|https):\/\/[^\s/$.?#].[^\s]*$/.test(val),
      "Неверный формат ссылки",
    )
    .optional(),
  coordinates: z
    .string()
    .nonempty("Обязательное поле")
    .refine(
      (value) =>
        /^[-]?([0-9]*[.])?[0-9]+[\ ]*,[\ ]*[-]?([0-9]*[.])?[0-9]+$/.test(value),
      "Введите координаты через запятую",
    ),
});
