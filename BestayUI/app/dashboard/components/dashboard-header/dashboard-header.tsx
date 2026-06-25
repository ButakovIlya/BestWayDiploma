"use client";
import { useIsMobile } from "@/app/hooks/use-mobile";
import styles from "./dashboard.module.css";
import clsx from "clsx";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  backHref?: string;
  rightChild?: React.ReactNode;
}

export default function DashboardHeader(props: DashboardHeaderProps) {
  const { title, subtitle, badge, backHref, rightChild } = props;
  const isMobile = useIsMobile();

  return (
    <div className={styles["dashboard-header"]}>
      <div className={styles["dashboard-header__main"]}>
        {backHref ? (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={styles["dashboard-header__back"]}
          >
            <Link href={backHref}>
              <ArrowLeft />
              {!isMobile ? "Назад" : null}
            </Link>
          </Button>
        ) : null}
        <div className={styles["dashboard-header__text"]}>
          {badge ? (
            <span className={styles["dashboard-header__badge"]}>{badge}</span>
          ) : null}
          <h1
            className={clsx(
              isMobile
                ? styles["dashboard-header__title--mobile"]
                : styles["dashboard-header__title"],
            )}
          >
            {title}
          </h1>
          {subtitle ? (
            <p className={styles["dashboard-header__subtitle"]}>{subtitle}</p>
          ) : null}
        </div>
      </div>
      {rightChild ? (
        <div className={styles["dashboard-header__actions"]}>{rightChild}</div>
      ) : null}
    </div>
  );
}
