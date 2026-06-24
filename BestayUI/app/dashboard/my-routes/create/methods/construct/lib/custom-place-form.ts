"use client";

import { PlaceCategory, PlaceType } from "@/app/types/entities";
import { z } from "zod";

export const formSchema = z
  .object({
    category: z.union([z.nativeEnum(PlaceCategory), z.string()]),
    type: z.union([z.nativeEnum(PlaceType), z.string()]),
    description: z.string(),
  })
  .refine(
    ({ category, description, type }) =>
      category?.length || type?.length || description.length,
    "Необходимо заполнить минимум одно поле",
  );
