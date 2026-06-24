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
import { ConfirmModal } from "@/app/components/confirm-modal";
import DashboardHeader from "../../components/dashboard-header/dashboard-header";
import { Photo } from "@/app/types";
import { PhotoCarousel } from "@/app/components/photo-carousel";
import { correctUrl } from "@/app/lib/correct-url";
import { PlaceFields } from "./components/place-fields";
import { PlaceRead } from "@/app/types/entities";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<PlaceRead | null>(null);

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

  const handleRemove = (id: number) => {
    setModalRemoveProps({ id });
    setOpenRemoveModal(true);
  };

  useEffect(() => {
    getPlace(Number(id)).then((data) => setPlace(data));
  }, []);

  return (
    <>
      <DashboardHeader title={place?.name ?? ""} />
      <div className="page__content-container">
        <div className={styles["page__content"]}>
          <div className={styles["page__content__photos"]}>
            <PhotoCarousel
              photos={photos}
              onUploadMain={handleUploadMain}
              onUploadNew={handleUploadNew}
              onRemove={handleRemove}
            />
          </div>
          <div className={styles["content__fields"]}>
            <PlaceFields place={place} />
          </div>
        </div>
        <div>
          <p className="font-medium text-sm">Место на карте:</p>
          {place?.coordinates && (
            <YMapPlacemark
              style={{ width: "100%", height: "calc(100dvh - 350px)" }}
              title={place.name}
              description={place.description ?? ""}
              placemark={place.coordinates as [number, number]}
            />
          )}
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
    </>
  );
}
