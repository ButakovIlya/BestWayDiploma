"use client";
import { useParams } from "next/navigation";
import DashboardHeader from "../../components/dashboard-header/dashboard-header";
import { useEffect } from "react";
import { getMyRoute } from "@/app/lib/api/public/routes";
import YMapRoute from "@/app/components/ymap-route";
import { useAppStore } from "@/app/_store/app-store";
import { PlacePreview } from "../../feed/components/place-preview";
import styles from "./page.module.css";
import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";
import { useIsMobile } from "@/app/hooks/use-mobile";
import { ViewFields } from "@/app/components/view-fields";
import { ViewField } from "@/app/types/view-field";
import dayjs from "dayjs";

export default function Page() {
  const router = useRouter();
  const isMobile = useIsMobile();

  const { routeId } = useParams<{ routeId: string }>();
  const {
    myRouteState: { myRoute, setMyRoute },
  } = useAppStore((state) => state);

  useEffect(() => {
    getMyRoute(Number(routeId)).then((fetchedRoute) => {
      setMyRoute(fetchedRoute);
    });

    return () => {
      setMyRoute(null);
    };
  }, []);

  const placesCoords = myRoute
    ? myRoute.places
        .sort((a, b) => a.order - b.order)
        .map((place) => (place.place.coordinates as [number, number]) ?? null)
    : null;

  const fields: ViewField[] = [
    { title: "Город", value: myRoute?.city ?? undefined },
    {
      title: "Дата создания",
      value: myRoute?.created_at
        ? dayjs(myRoute?.created_at).format("DD.MM.YYYY")
        : undefined,
    },
  ];

  return (
    <>
      <DashboardHeader title={myRoute?.name ?? ""} />
      <div className={styles["content-container"]}>
        <div className={styles["map-container"]}>
          {placesCoords && <YMapRoute places={placesCoords} />}
        </div>
        <div className={styles["places-container"]}>
          <div className={styles["info-container"]}>
            <ViewFields fields={fields} />
            <Button
              onClick={() => {
                router.push(`/dashboard/my-routes/${myRoute?.id}/edit`);
              }}
            >
              <Edit />
              {isMobile ? "" : "Редактировать маршрут"}
            </Button>
          </div>
          {myRoute?.places
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
