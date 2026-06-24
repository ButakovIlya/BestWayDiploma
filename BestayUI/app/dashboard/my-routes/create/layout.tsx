"use client";

import { Button } from "@/app/components/ui/button";
import DashboardHeader from "../../components/dashboard-header/dashboard-header";
import { ChevronLeft } from "lucide-react";
import styles from "./layout.module.css";
import { useAppStore } from "@/app/_store/app-store";
import { useCallback, useEffect } from "react";
import { Stages } from "./lib/constants/stages";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/app/hooks/use-mobile";

export default function Layout(props: React.PropsWithChildren) {
  const { children } = props;
  const {
    myRoutesState: { createRoute },
  } = useAppStore((state) => state);
  const { currentStage, setPrepareForm, setCustomPlaces } = createRoute;
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleButtonClick = useCallback(() => {
    switch (currentStage) {
      case Stages.prepare:
        router.push("/dashboard/my-routes");
        break;
      case Stages.chooseMethod:
        router.push("/dashboard/my-routes/create/prepare");
        break;
      case Stages.buildWithDescribe:
      case Stages.buildManually:
        router.push("/dashboard/my-routes/create/methods");
        break;
      default:
        break;
    }
  }, [currentStage]);

  useEffect(() => {
    return () => {
      setPrepareForm(undefined);
      setCustomPlaces([]);
    };
  }, []);

  return (
    <div className={styles.page}>
      <DashboardHeader
        title="Формирование маршрута"
        rightChild={
          <Button onClick={handleButtonClick} variant="secondary">
            <ChevronLeft />
            {!isMobile && "Назад"}
          </Button>
        }
      />
      {children}
    </div>
  );
}
