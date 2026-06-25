"use client";

import { Menu } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useSidebar } from "@/app/components/ui/sidebar";
import styles from "./dashboard-mobile-bar.module.css";

export function DashboardMobileBar() {
  const { toggleSidebar } = useSidebar();

  return (
    <div className={styles.bar}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={styles.menuButton}
        onClick={toggleSidebar}
        aria-label="Открыть меню"
      >
        <Menu size={20} />
      </Button>
      <div className={styles.text}>
        <span className={styles.title}>BestWay</span>
        <span className={styles.subtitle}>Панель управления</span>
      </div>
    </div>
  );
}
