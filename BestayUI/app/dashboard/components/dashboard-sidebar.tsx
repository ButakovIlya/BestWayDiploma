"use client";
import { Separator } from "@/app/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/components/ui/sidebar";
import Link from "next/link";
import {
  URL_ACCOUNT,
  ADMIN_URLS,
  PUBLIC_URLS,
  BRAND_ICON,
} from "../lib/constants/urls";
import { Skeleton } from "@/app/components/ui/skeleton";
import { useAppStore } from "@/app/_store/app-store";
import clsx from "clsx";
import styles from "./dashboard-sidebar.module.css";
import { SidebarPages } from "../types/sidebar-pages";
import { BackendImage } from "@/app/components/backend-image";
import { ShieldCheck } from "lucide-react";
import { useSidebar } from "@/app/components/ui/sidebar";
import { useIsMobile } from "@/app/hooks/use-mobile";

function NavLink({
  item,
  isActive,
}: {
  item: (typeof PUBLIC_URLS)[number];
  isActive: boolean;
}) {
  const { setOpenMobile, isMobile } = useSidebar();

  return (
    <SidebarMenuButton asChild tooltip={item.title}>
      <Link
        href={item.url}
        className={clsx(isActive && styles["selected"])}
        onClick={() => {
          if (isMobile) {
            setOpenMobile(false);
          }
        }}
      >
        <item.icon />
        <span className={styles["nav-item"]}>
          <span className={styles["nav-item__title"]}>{item.title}</span>
          {item.description ? (
            <span className={styles["nav-item__description"]}>
              {item.description}
            </span>
          ) : null}
        </span>
      </Link>
    </SidebarMenuButton>
  );
}

export function DashboardSidebar() {
  const {
    account: { user },
    ui: { currentPage },
  } = useAppStore((state) => state);
  const isMobile = useIsMobile();
  const { setOpenMobile } = useSidebar();

  const BrandIcon = BRAND_ICON;

  const closeMobileSidebar = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar
      variant="sidebar"
      collapsible={isMobile ? "offcanvas" : "none"}
      className={styles.sidebar}
    >
      <SidebarContent style={{ overflowX: "hidden" }}>
        <div className={styles.brand}>
          <div className={styles["brand__icon"]}>
            <BrandIcon />
          </div>
          <div className={styles["brand__text"]}>
            <span className={styles["brand__title"]}>BestWay</span>
            <span className={styles["brand__subtitle"]}>Панель управления</span>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Разделы</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {user
                ? PUBLIC_URLS.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <NavLink
                        item={item}
                        isActive={currentPage === item.page}
                      />
                    </SidebarMenuItem>
                  ))
                : Array.from(Array(5).keys()).map((key) => (
                    <Skeleton key={key} className="h-12 w-full rounded-2xl" />
                  ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user && user.isAdmin ? (
          <>
            <Separator orientation="horizontal" className={styles.separator} />
            <div className={styles["admin-badge"]}>
              <ShieldCheck size={14} />
              <span className={styles["admin-badge__text"]}>Администрирование</span>
            </div>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {ADMIN_URLS.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <NavLink
                        item={item}
                        isActive={currentPage === item.page}
                      />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        ) : null}
      </SidebarContent>
      <Separator orientation="horizontal" />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Аккаунт">
              <Link
                href={URL_ACCOUNT}
                className={clsx(
                  currentPage === SidebarPages.Account && styles["selected"],
                )}
                onClick={closeMobileSidebar}
              >
                <BackendImage
                  alt="avatar"
                  src={
                    user?.photo ||
                    "https://images.unsplash.com/vector-1754045222115-3153d64c522a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  width={240}
                  height={140}
                  className={styles["header__user-avatar"]}
                />
                <span className={styles["footer-user"]}>
                  <span className={styles["footer-user__name"]}>
                    {user?.firstName ?? "Аккаунт"}
                  </span>
                  <span className={styles["footer-user__role"]}>
                    {user?.isAdmin ? "Администратор" : "Пользователь"}
                  </span>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
