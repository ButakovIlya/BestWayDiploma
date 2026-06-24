import { FieldPath } from "react-hook-form";
import { z } from "zod";

export type Type =
  | "string"
  | "select"
  | "multiple-combobox"
  | "file"
  | "boolean"
  | "number"
  | "radio"
  | "textarea"
  | "date"
  | "combobox-with-search";

export type StringOption = string;
export type BaseOption = { value: number; label: string };
export type Option = StringOption | BaseOption;

export type Field<T extends z.ZodType> = {
  name: FieldPath<z.infer<T>>;
  type: Type;
  title?: string;
  disabled?: boolean;
  options?: Option[];
  tip?: string;
  maxLength?: number;
  style?: React.CSSProperties;
};
