"use client";

import { useSidebar } from "@/app/components/ui/sidebar";
import styles from "./sidebar-trigger.module.css";
import { useIsMobile } from "@/app/hooks/use-mobile";
import clsx from "clsx";
import { Button } from "@/app/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useAppStore } from "@/app/_store/app-store";

export function SidebarTrigger() {
  const { isSidebarOpened, setIsSidebarOpened } = useAppStore(
    (state) => state.ui,
  );
  const { open, setOpen, openMobile, toggleSidebar, setOpenMobile } =
    useSidebar();
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsSidebarOpened(openMobile);
  }, [openMobile]);

  useEffect(() => {
    setIsSidebarOpened(open);
  }, [open]);

  useEffect(() => {
    setOpen(isSidebarOpened);
    setOpenMobile(isSidebarOpened);
  }, [isSidebarOpened]);

  return (
    <Button
      variant={"outline"}
      onClick={toggleSidebar}
      className={clsx(
        styles["dashboard-sidebar__trigger"],
        !isMobile &&
          (open
            ? styles["dashboard-sidebar__trigger--desktop--opened"]
            : styles["dashboard-sidebar__trigger--desktop--closed"]),
        isMobile &&
          (openMobile
            ? styles["dashboard-sidebar__trigger--mobile--opened"]
            : styles["dashboard-sidebar__trigger--mobile--closed"]),
      )}
    >
      {open && !isMobile ? <ChevronLeft /> : <ChevronRight />}
    </Button>
  );
}
