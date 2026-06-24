"use client";

import { z } from "zod";

export const userProfileSchema = z.object({
  firstName: z.string().nonempty("Обязательное поле"),
  lastName: z.string().nonempty("Обязательное поле"),
  middleName: z.string().nonempty("Обязательное поле"),
  birthday: z.date().nullish(),
});
