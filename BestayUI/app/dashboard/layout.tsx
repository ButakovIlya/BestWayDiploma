"use client";
import styles from "./layout.module.css";
import { DashboardSidebar } from "./components/dashboard-sidebar";
// написать свою реализацию
import { SidebarProvider } from "../components/ui/sidebar";
import { SidebarTrigger } from "./components/sidebar-trigger/sidebar-trigger";
import { Toaster } from "../components/ui/sonner";
import { useEffect, useState } from "react";
import { getProfile } from "../lib/api/public/profile";
import { mapUserProfileFromDTO } from "./account/lib/map-user-profile-from-dto";
import { useAppStore } from "../_store/app-store";
import pusherClient from "../lib/pusher";
import { errorToast, notifyToast } from "../lib/toasts";
import { useIsMobile } from "../hooks/use-mobile";
import { cn } from "../lib/utils";
import {
  checkIsUserFioFilled,
  checkIsUserRegistrated,
} from "../lib/is-new-user";
import { useRouter } from "next/navigation";
import Loader from "../components/loader";
import Script from "next/script";
import { RouteRead } from "../types/entities";
import { Button } from "../components/ui/button";

export default function Layout(props: React.PropsWithChildren) {
  const { children } = props;
  const {
    account: { setUser },
    ui: { isSidebarOpened },
  } = useAppStore((state) => state);
  const [channelName, setChannelName] = useState("");
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null);
  const isMobile = useIsMobile();
  const router = useRouter();

  const handleOpenRoute = (id: number) => {
    router.push(`/dashboard/my-routes/${id}`);
  };

  useEffect(() => {
    getProfile().then((data) => {
      const profile = mapUserProfileFromDTO(data);
      setUser(profile);

      if (
        checkIsUserRegistrated(profile.registrationDate) &&
        !checkIsUserFioFilled(profile)
      ) {
        router.push("/login/registration");
        return;
      }

      setIsNewUser(false);
      setChannelName(`personal-${profile.id}`);
    });
  }, []);

  useEffect(() => {
    if (channelName.length) {
      const channel = pusherClient.subscribe(channelName);
      console.info("pusher subscribed");
      channel.bind("event", (data: { type: string; data: RouteRead }) => {
        switch (data.type) {
          case "ROUTE_GENERATION_STARTED":
            notifyToast(
              "Запущена генерация маршрута",
              "Вам придет уведомление после окончания процесса",
            );
            break;
          case "ROUTE_GENERATION_SUCCEDED":
            notifyToast(
              "Маршрут построен",
              <div className="flex justify-between">
                {'Он будет храниться в разделе "Мои маршруты"'}
                <Button
                  variant="outline"
                  onClick={() => {
                    handleOpenRoute(data.data.id);
                  }}
                >
                  Открыть
                </Button>
              </div>,
            );
            break;
          case "ROUTE_GENERATION_FAILED":
            errorToast(
              "Возникла ошибка при построении маршрута. Пожалуйста, попробуйте повторить генерацию",
            );
            break;
          default:
            break;
        }
      });
      const onBeforeUnload = () => {
        console.info("pusher unsubscribed");
        pusherClient.unsubscribe(channelName);
      };
      window.addEventListener("beforeunload", onBeforeUnload);
      return () => {
        window.removeEventListener("beforeunload", onBeforeUnload);
      };
    }
  }, [channelName]);

  if (typeof isNewUser !== "boolean") {
    return (
      <div className="h-full w-full  flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Script
        src={`https://api-maps.yandex.ru/2.1/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_KEY}&lang=ru_RU`}
        strategy="afterInteractive"
      />
      <div className={styles.layout}>
        <SidebarProvider defaultOpen={isSidebarOpened}>
          <DashboardSidebar />
          <div className={styles["layout__trigger-wrapper"]}>
            <SidebarTrigger />
          </div>
          <div
            className={cn(
              isMobile
                ? styles["layout__children--mobile"]
                : styles["layout__children--desktop"],
            )}
          >
            <div className={styles["layout__content-card"]}>{children}</div>
          </div>
        </SidebarProvider>
        <Toaster theme="light" />
      </div>
    </>
  );
}
