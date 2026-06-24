import { FormSchema } from "@/app/types";
import { PHONE_SCHEMA } from "../lib/constants/phone-schema";

export type PhoneSchema = FormSchema<typeof PHONE_SCHEMA>;
