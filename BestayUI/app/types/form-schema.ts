import { z, ZodType } from "zod";

export type FormSchema<T extends ZodType> = z.infer<T>;
