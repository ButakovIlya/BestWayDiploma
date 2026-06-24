import { z } from "zod";

export const PHONE_SCHEMA = z.object({
  phone: z.string().regex(/^\+7\((\d){3}\)(\d){3}-(\d){2}-(\d){2}$/),
});
