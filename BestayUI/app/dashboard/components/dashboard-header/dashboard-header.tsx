"use client";
import { useIsMobile } from "@/app/hooks/use-mobile";
import styles from "./dashboard.module.css";
import clsx from "clsx";

interface DashboardHeaderProps {
  title: string;
  rightChild?: React.ReactNode;
}

export default function DashboardHeader(props: DashboardHeaderProps) {
  const { title, rightChild } = props;
  const isMobile = useIsMobile();

  return (
    <div className={styles["dashboard-header"]}>
      <h1
        className={clsx(
          isMobile
            ? styles["dashboard-header__title--mobile"]
            : styles["dashboard-header__title"],
        )}
      >
        {title}
      </h1>
      {rightChild}
    </div>
  );
}
