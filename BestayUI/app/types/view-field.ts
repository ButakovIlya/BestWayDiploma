import { JSX } from "react";

type ViewFieldValue = string | number | JSX.Element | undefined;

export interface ViewField {
  title: string;
  value: ViewFieldValue;
  link?: boolean;
}
