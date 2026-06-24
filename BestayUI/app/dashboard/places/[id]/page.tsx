"use client";

import dynamic from "next/dynamic";

const YMapPlacemark = dynamic(() => import("@/app/components/ymap-placemark"), {
  ssr: false,
});

import {
  getPlace,
  removePhotoPlace,
  uploadPhotoPlace,
  uploadPlaceAvatar,
} from "@/app/lib/api/admin/places";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./page.module.css";
import detailStyles from "../../lib/styles/admin-detail.module.css";
import { ConfirmModal } from "@/app/components/confirm-modal";
import DashboardHeader from "../../components/dashboard-header/dashboard-header";
import { Photo } from "@/app/types";
import { PhotoCarousel } from "@/app/components/photo-carousel";
import { correctUrl } from "@/app/lib/correct-url";
import { PlaceFields } from "./components/place-fields";
import { PlaceRead } from "@/app/types/entities";
import { useAppStore } from "@/app/_store/app-store";
import { SidebarPages } from "../../types/sidebar-pages";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<PlaceRead | null>(null);
  const setCurrentPage = useAppStore((state) => state.ui.setCurrentPage);

  const [modalRemoveProps, setModalRemoveProps] = useState<{
    id: number;
  } | null>(null);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  const photos: Photo[] = [
    { id: 0, url: place && place.photo && correctUrl(place.photo), main: true },
    ...(place?.photos || []).map((photo) => ({
      ...photo,
      url: correctUrl(photo.url),
    })),
  ];

  const handleUploadMain = (file: File) => {
    const formData = new FormData();
    formData.append("photo", file);

    uploadPlaceAvatar(Number(id), formData).then(() => {
      getPlace(Number(id)).then((data) => {
        setPlace(data);
      });
    });
  };

  const handleUploadNew = (file: File) => {
    const formData = new FormData();
    formData.append("photos", file);

    uploadPhotoPlace(Number(id), formData).then(() => {
      getPlace(Number(id)).then((data) => {
        setPlace(data);
      });
    });
  };

  const handleRemove = (photoId: number) => {
    setModalRemoveProps({ id: photoId });
    setOpenRemoveModal(true);
  };

  useEffect(() => {
    setCurrentPage(SidebarPages.Places);
    getPlace(Number(id)).then((data) => setPlace(data));
  }, [id, setCurrentPage]);

  return (
    <div className={detailStyles.detail}>
      <DashboardHeader
        badge="Админ"
        title={place?.name ?? "Место"}
        subtitle="Редактирование карточки места, фотографий и координат на карте."
        backHref="/dashboard/places"
      />
      <div className={detailStyles["detail__card"]}>
        <div className={styles["page__content__photos"]}>
          <PhotoCarousel
            photos={photos}
            onUploadMain={handleUploadMain}
            onUploadNew={handleUploadNew}
            onRemove={handleRemove}
          />
        </div>
        <div className={detailStyles["detail__fields"]}>
          <PlaceFields place={place} />
        </div>
      </div>
      <div className={detailStyles["detail__section"]}>
        <h2 className={detailStyles["detail__section-title"]}>Место на карте</h2>
        <div className={styles["map-card"]}>
          {place?.coordinates ? (
            <YMapPlacemark
              style={{ width: "100%", height: "420px" }}
              title={place.name}
              description={place.description ?? ""}
              placemark={place.coordinates as [number, number]}
            />
          ) : null}
        </div>
      </div>
      <ConfirmModal
        title="Удалить фото?"
        description="Это действие нельзя отменить. Данные будут удалены безвозвратно."
        onConfirm={() => {
          if (modalRemoveProps) {
            removePhotoPlace(Number(id), modalRemoveProps.id).then(() => {
              getPlace(Number(id)).then((data) => {
                setPlace(data);
              });
            });
          }
        }}
        open={openRemoveModal}
        onOpen={setOpenRemoveModal}
      />
    </div>
  );
}
