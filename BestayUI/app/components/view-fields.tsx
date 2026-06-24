import clsx from "clsx";
import { ViewField } from "../types/view-field";
import { Skeleton } from "./ui/skeleton";
import styles from "./view-fields.module.css";

interface ViewFieldsProps {
  fields: ViewField[];
}

export function ViewFields(props: ViewFieldsProps) {
  const { fields } = props;
  return (
    <div>
      {fields.map((field) => (
        <div key={field.title}>
          <p className={styles["field-title"]}>{field.title}:</p>
          {field.value ? (
            field.link ? (
              <a href={field.value as string} target="_target">
                {field.value}
              </a>
            ) : (
              <p>{field.value}</p>
            )
          ) : (
            <Skeleton className={clsx("h-4 w-30")} />
          )}
        </div>
      ))}
    </div>
  );
}
