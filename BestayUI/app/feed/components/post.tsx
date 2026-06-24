"use client";

import styles from "./post.module.css";
import { BackendImage } from "@/app/components/backend-image";
import { PlacePreview } from "./place-preview";
import { Heart, MessageCircle, Plus } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { RoutePlaceRead, UserRead } from "@/app/types/entities";

interface PostProps {
  id: number;
  routeId: number;
  text: string;
  places: RoutePlaceRead[];
  city: string;
  type: string;
  author: UserRead;
  openAlertModal: (_: boolean) => void;
  photo?: string;
}

export const Post = (props: PostProps) => {
  const { text, photo, author, places, openAlertModal } = props;

  const handleOpenAlert = () => {
    openAlertModal(true);
  };

  return (
    <div className={styles.post}>
      <div className={styles["post__header"]}>
        <BackendImage
          alt="avatar"
          src={
            author.photo ||
            "https://images.unsplash.com/vector-1754045222115-3153d64c522a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          width={240}
          height={140}
          className={styles["header__user-avatar"]}
        />
        <div className={styles["header__user-container"]}>
          <p>{author.first_name}</p>
          <span>Пользователь</span>
        </div>
      </div>
      <div className={styles["post__text"]}>{text}</div>
      {photo && (
        <BackendImage
          alt="avatar"
          src={photo}
          width={700}
          height={340}
          className={styles["post__photo"]}
        />
      )}
      <div className={styles["post__content"]}>
        {places.length &&
          places
            .sort((a, b) => a.order - b.order)
            .map(({ place }, index) => {
              if (places.length > 1 && index === places.length - 1) {
                return (
                  <div
                    className={styles["content__post-with-blur"]}
                    key={place.id}
                  >
                    <PlacePreview
                      name={place.name}
                      description={place.description ?? ""}
                      photo={place.photo}
                    />
                  </div>
                );
              }
              return (
                <PlacePreview
                  key={place.id}
                  name={place.name}
                  description={place.description ?? ""}
                  photo={place.photo}
                />
              );
            })}
      </div>
      <Button
        className={styles["post__open"]}
        variant="link"
        onClick={handleOpenAlert}
      >
        Открыть полный маршрут
        <Plus />
      </Button>
      <div className={styles["post__footer"]}>
        <Button
          className="flex items-center"
          variant="outline"
          onClick={handleOpenAlert}
        >
          <Heart color="red" fill="red" />
        </Button>
        <Button
          className="flex items-center"
          variant="link"
          onClick={handleOpenAlert}
        >
          <MessageCircle color="#aed2e6" fill="#dbf1fd" />
        </Button>
      </div>
    </div>
  );
};
