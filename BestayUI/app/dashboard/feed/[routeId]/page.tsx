"use client";

import { useParams, useRouter } from "next/navigation";
import DashboardHeader from "../../components/dashboard-header/dashboard-header";
import { useEffect, useMemo, useState } from "react";
import { RouteRead } from "@/app/types/entities";
import { copyRoute, getFeedRoute } from "@/app/lib/api/public/routes";
import YMapRoute from "@/app/components/ymap-route";
import styles from "./page.module.css";
import dayjs from "dayjs";
import { Button } from "@/app/components/ui/button";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Navigation,
  Plus,
  Route as RouteIcon,
  UserRound,
} from "lucide-react";
import Loader from "@/app/components/loader";
import { BackendImage } from "@/app/components/backend-image";
import { FeedRoutePlaceCard } from "./components/feed-route-place-card";

function formatDuration(minutes: number | null | undefined) {
  if (!minutes) {
    return "—";
  }

  if (minutes < 60) {
    return `${minutes} мин`;
  }

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} ч ${rest} мин` : `${hours} ч`;
}

function formatDistance(meters: number | null | undefined) {
  if (!meters) {
    return "—";
  }

  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} км`;
  }

  return `${meters} м`;
}

function getAuthorName(route: RouteRead) {
  const author = route.author;
  if (!author) {
    return "Автор маршрута";
  }

  const fullName = [author.first_name, author.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();

  return fullName || author.phone || "Автор маршрута";
}

export default function Page() {
  const router = useRouter();
  const { routeId } = useParams<{ routeId: string }>();
  const [route, setRoute] = useState<RouteRead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopying, setIsCopying] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getFeedRoute(Number(routeId))
      .then((fetchedRoute) => {
        setRoute(fetchedRoute);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [routeId]);

  const sortedPlaces = useMemo(
    () => route?.places.slice().sort((a, b) => a.order - b.order) ?? [],
    [route],
  );

  const placesCoords = useMemo(
    () =>
      sortedPlaces.map(
        (item) => (item.place.coordinates as [number, number]) ?? null,
      ),
    [sortedPlaces],
  );

  const handleCopyRoute = async () => {
    setIsCopying(true);
    try {
      const copiedRoute = await copyRoute(routeId);
      router.push(`/dashboard/my-routes/${copiedRoute.id}`);
    } finally {
      setIsCopying(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loaderWrap}>
        <Loader />
      </div>
    );
  }

  if (!route) {
    return (
      <div className={styles.loaderWrap}>
        <p>Маршрут не найден</p>
      </div>
    );
  }

  return (
    <>
      <DashboardHeader title={route.name} />
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroMedia}>
            {route.photo ? (
              <BackendImage
                src={route.photo}
                alt={route.name}
                className={styles.heroImage}
              />
            ) : (
              <div className={styles.heroFallback}>
                <RouteIcon size={42} color="#006096" />
              </div>
            )}
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroTop}>
              <div className={styles.author}>
                {route.author?.photo ? (
                  <BackendImage
                    src={route.author.photo}
                    alt={getAuthorName(route)}
                    className={styles.authorAvatar}
                  />
                ) : (
                  <div className={styles.authorFallback}>
                    <UserRound size={18} />
                  </div>
                )}
                <div>
                  <p className={styles.authorLabel}>Автор маршрута</p>
                  <p className={styles.authorName}>{getAuthorName(route)}</p>
                </div>
              </div>

              <Button onClick={handleCopyRoute} disabled={isCopying}>
                <Plus />
                {isCopying ? "Копируем..." : "Добавить в свои маршруты"}
              </Button>
            </div>

            {route.description && (
              <p className={styles.description}>{route.description}</p>
            )}

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <MapPin size={18} color="#006096" />
                <div>
                  <p>Город</p>
                  <strong>{route.city ?? "—"}</strong>
                </div>
              </div>
              <div className={styles.statCard}>
                <Navigation size={18} color="#006096" />
                <div>
                  <p>Транспорт</p>
                  <strong>{route.type ?? "—"}</strong>
                </div>
              </div>
              <div className={styles.statCard}>
                <Clock3 size={18} color="#006096" />
                <div>
                  <p>Длительность</p>
                  <strong>{formatDuration(route.duration)}</strong>
                </div>
              </div>
              <div className={styles.statCard}>
                <RouteIcon size={18} color="#006096" />
                <div>
                  <p>Дистанция</p>
                  <strong>{formatDistance(route.distance)}</strong>
                </div>
              </div>
              <div className={styles.statCard}>
                <CalendarDays size={18} color="#006096" />
                <div>
                  <p>Создан</p>
                  <strong>
                    {route.created_at
                      ? dayjs(route.created_at).format("DD.MM.YYYY")
                      : "—"}
                  </strong>
                </div>
              </div>
              <div className={styles.statCard}>
                <MapPin size={18} color="#006096" />
                <div>
                  <p>Точек</p>
                  <strong>{sortedPlaces.length}</strong>
                </div>
              </div>
            </div>

            {route.yandex_maps_url && (
              <a
                href={route.yandex_maps_url}
                target="_blank"
                rel="noreferrer"
                className={styles.yandexLink}
              >
                Открыть маршрут в Яндекс.Картах
              </a>
            )}
          </div>
        </section>

        <section className={styles.mainGrid}>
          <div className={styles.mapCard}>
            <div className={styles.sectionHeader}>
              <h2>Карта маршрута</h2>
              <p>Последовательность точек на карте</p>
            </div>
            <div className={styles.mapContainer}>
              {placesCoords.length ? (
                <YMapRoute places={placesCoords} />
              ) : (
                <div className={styles.mapEmpty}>Координаты точек недоступны</div>
              )}
            </div>
          </div>

          <div className={styles.placesCard}>
            <div className={styles.sectionHeader}>
              <h2>Точки маршрута</h2>
              <p>{sortedPlaces.length} остановок по порядку</p>
            </div>
            <div className={styles.placesList}>
              {sortedPlaces.map(({ place, order }, index) => (
                <FeedRoutePlaceCard
                  key={place.id}
                  place={place}
                  order={order}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
