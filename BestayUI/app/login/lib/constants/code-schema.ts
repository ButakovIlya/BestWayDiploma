import { z } from "zod";

export const CODE_SCHEMA = z.object({
  code: z.string(),
});
