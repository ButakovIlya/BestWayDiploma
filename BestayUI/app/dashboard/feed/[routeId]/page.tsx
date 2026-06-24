"use client";
import { useParams } from "next/navigation";
import DashboardHeader from "../../components/dashboard-header/dashboard-header";
import { useEffect, useState } from "react";
import { RouteRead } from "@/app/types/entities";
import { copyRoute, getFeedRoute } from "@/app/lib/api/public/routes";
import YMapRoute from "@/app/components/ymap-route";
import { PlacePreview } from "../components/place-preview";
import styles from "./page.module.css";
import { ViewField } from "@/app/types/view-field";
import { ViewFields } from "@/app/components/view-fields";
import dayjs from "dayjs";
import { Button } from "@/app/components/ui/button";
import { Plus } from "lucide-react";

export default function Page() {
  const { routeId } = useParams<{ routeId: string }>();
  const [route, setRoute] = useState<RouteRead | null>(null);

  useEffect(() => {
    getFeedRoute(Number(routeId)).then((fetchedRoute) => {
      setRoute(fetchedRoute);
    });
  }, []);

  const placesCoords = route
    ? route.places
        .sort((a, b) => a.order - b.order)
        .map((place) => (place.place.coordinates as [number, number]) ?? null)
    : null;

  const fields: ViewField[] = [
    { title: "Город", value: route?.city ?? undefined },
    {
      title: "Дата создания",
      value: route?.created_at
        ? dayjs(route?.created_at).format("DD.MM.YYYY")
        : undefined,
    },
  ];

  const handleCopyRoute = () => {
    copyRoute(routeId);
  };

  return (
    <>
      <DashboardHeader title={route?.name ?? ""} />
      <div className={styles["content-container"]}>
        <div className={styles["map-container"]}>
          {placesCoords && <YMapRoute places={placesCoords} />}
        </div>
        <div className={styles["places-container"]}>
          <div className={styles["info-container"]}>
            <ViewFields fields={fields} />
            <Button onClick={handleCopyRoute}>
              <Plus />
              Добавить в свои маршруты
            </Button>
          </div>
          {route?.places
            .sort((a, b) => a.order - b.order)
            .map(({ place }, index) => (
              <PlacePreview
                index={index}
                key={place.id}
                name={place.name}
                description={place.description ?? ""}
                photo={place.photo}
                websiteUrl={place.website_url}
              />
            ))}
        </div>
      </div>
    </>
  );
}
