import { ReactNode } from "react";
import styles from "./stage-template.module.css";

interface StageTemplateProps {
  title?: string;
  children?: ReactNode;
}

export function StageTemplate(props: StageTemplateProps) {
  const { title, children } = props;
  return (
    <div className={styles["stage-container"]}>
      <div className={styles["content-container"]}>
        {title && (
          <div className={styles["title-container"]}>
            <p>{title}</p>
          </div>
        )}
        <div className={styles["children-container"]}>{children}</div>
      </div>
    </div>
  );
}
