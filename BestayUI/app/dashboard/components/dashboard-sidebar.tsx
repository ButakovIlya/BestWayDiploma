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
import { URL_ACCOUNT, ADMIN_URLS, PUBLIC_URLS } from "../lib/constants/urls";
import { Skeleton } from "@/app/components/ui/skeleton";
import { useAppStore } from "@/app/_store/app-store";
import clsx from "clsx";
import styles from "./dashboard-sidebar.module.css";
import { SidebarPages } from "../types/sidebar-pages";
import Image from "next/image";

export function DashboardSidebar() {
  const {
    account: { user },
    ui: { currentPage, setIsSidebarOpened },
  } = useAppStore((state) => state);

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarContent style={{ overflowX: "hidden" }}>
        <SidebarGroup>
          <SidebarGroupLabel>Разделы</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {user
                ? PUBLIC_URLS.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className={clsx(
                            currentPage === item.page && styles["selected"],
                          )}
                          onClick={() => {
                            setIsSidebarOpened(false);
                          }}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                : Array.from(Array(5).keys()).map((key) => (
                    <Skeleton key={key} className="h-8 w-full" />
                  ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {user && user.isAdmin ? (
          <SidebarGroup>
            <SidebarGroupLabel>Администрирование</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {ADMIN_URLS.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={clsx(
                          currentPage === item.page && styles["selected"],
                        )}
                        onClick={() => {
                          setIsSidebarOpened(false);
                        }}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : null}
      </SidebarContent>
      <Separator orientation="horizontal" />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href={URL_ACCOUNT}
                className={clsx(
                  currentPage === SidebarPages.Account && styles["selected"],
                )}
                onClick={() => {
                  setIsSidebarOpened(false);
                }}
              >
                <Image
                  alt="avatar"
                  src={
                    user?.photo ||
                    "https://images.unsplash.com/vector-1754045222115-3153d64c522a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  width={240}
                  height={140}
                  className={styles["header__user-avatar"]}
                />
                <span>{user?.firstName ?? "Аккаунт"}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
