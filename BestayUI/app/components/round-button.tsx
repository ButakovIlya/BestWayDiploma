import { MouseEventHandler } from "react";
import styles from "./round-button.module.css";

interface RoundButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}
export function RoundButton(props: RoundButtonProps) {
  const { text, onClick } = props;
  return (
    <div className={styles.button} onClick={onClick}>
      {text}
    </div>
  );
}
