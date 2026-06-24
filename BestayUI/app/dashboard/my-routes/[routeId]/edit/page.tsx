"use client";

import { useAppStore } from "@/app/_store/app-store";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { RouteConstruct } from "./components/route-construct";
import { RemoveCustomPlaceModal } from "./components/remove-custom-place-modal";
import { ChooseFromPlacesModal } from "./components/choose-from-places-modal";
import DashboardHeader from "@/app/dashboard/components/dashboard-header/dashboard-header";
import { Button } from "@/app/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useIsMobile } from "@/app/hooks/use-mobile";
import { getMyRoute } from "@/app/lib/api/public/routes";

export default function Page() {
  const { routeId } = useParams<{ routeId: string }>();
  const {
    myRouteState: { setMyRoute },
  } = useAppStore((state) => state);
  const isMobile = useIsMobile();
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(`/dashboard/my-routes/${routeId}`);
  };

  useEffect(() => {
    getMyRoute(Number(routeId)).then((fetchedRoute) => {
      setMyRoute(fetchedRoute);
    });
  }, []);

  return (
    <>
      <DashboardHeader
        title="Редактирование маршрута"
        rightChild={
          <Button variant="secondary" onClick={handleButtonClick}>
            <ChevronLeft />
            {!isMobile && "Назад"}
          </Button>
        }
      />
      <RouteConstruct />
      <ChooseFromPlacesModal />
      <RemoveCustomPlaceModal />
    </>
  );
}
