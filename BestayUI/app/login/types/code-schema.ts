import { FormSchema } from "@/app/types";
import { CODE_SCHEMA } from "../lib/constants/code-schema";

export type CodeSchema = FormSchema<typeof CODE_SCHEMA>;
