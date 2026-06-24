import { Row } from "@tanstack/react-table";
import { JSX } from "react";

export interface Actions<T> {
  name: string;
  title: string | ((_: Row<T>) => string);
  onClick: (_: Row<T>) => void;
  icon?: JSX.Element;
  disabled?: boolean | ((_: Row<T>) => boolean);
}

export interface FilterConfig {
  name: string;
  type: "string" | "select" | "boolean" | "combobox-with-search";
  queryParamName?: string;
  placeholder?: string;
  options?: string[];
}
