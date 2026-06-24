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
    <div className={styles["field-grid"]}>
      {fields.map((field) => (
        <div key={field.title} className={styles.field}>
          <p className={styles["field-title"]}>{field.title}</p>
          {field.value ? (
            field.link ? (
              <a
                href={field.value as string}
                target="_blank"
                rel="noreferrer"
                className={styles["field-value"]}
              >
                {field.value}
              </a>
            ) : (
              <p className={styles["field-value"]}>{field.value}</p>
            )
          ) : (
            <Skeleton className={clsx("h-5 w-32")} />
          )}
        </div>
      ))}
    </div>
  );
}
