"use client";

import React, { useEffect, useState } from "react";
import styles from "./post.module.css";
import Image from "next/image";
import { PlacePreview } from "./place-preview";
import { Heart, MessageCircle, Plus, Trash } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { LikeRead, RoutePlaceRead, UserRead } from "@/app/types/entities";
import { createLike, getLikes, removeLike } from "@/app/lib/api/public/likes";
import { useAppStore } from "@/app/_store/app-store";
import { useRouter } from "next/navigation";

interface PostProps {
  id: number;
  routeId: number;
  text: string;
  places: RoutePlaceRead[];
  city: string;
  type: string;
  author: UserRead;
  photo?: string;
}

export const Post = (props: PostProps) => {
  const { id, routeId, text, photo, author, places } = props;

  const router = useRouter();
  const {
    account: { user },
    feedState: { setCurrentPostId },
    ui: { setIsRecordModalOpened, setIsRemoveModalOpened },
  } = useAppStore((state) => state);

  const [likes, setLikes] = useState<LikeRead[]>([]);
  const [like, setLike] = useState<LikeRead | null>(null);

  const updateLikes = () => {
    getLikes(id).then((data) => {
      setLikes(data.data);

      const likeIndex = data.data.findIndex(
        (like) => like.author_id === user?.id,
      );

      setLike(likeIndex === -1 ? null : data.data[likeIndex]);
    });
  };

  const handleLikeChange = () => {
    const likeAction = like ? removeLike(like.id) : createLike(id);

    likeAction.then(() => {
      updateLikes();
    });
  };

  const handleCommentsOpen = () => {
    setCurrentPostId(id);
    setIsRecordModalOpened(true);
  };

  const handleOpenRoute = () => {
    router.push(`/dashboard/feed/${routeId}`);
  };

  useEffect(() => {
    updateLikes();
  }, []);

  return (
    <div className={styles.post}>
      <div className={styles["post__header"]}>
        <div>
          <Image
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
        {user?.isAdmin && (
          <Button
            variant="destructive"
            onClick={() => {
              setIsRemoveModalOpened(true);
              setCurrentPostId(id);
            }}
          >
            <Trash />
          </Button>
        )}
      </div>
      <div className={styles["post__text"]}>{text}</div>
      {photo && (
        <Image
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
        onClick={handleOpenRoute}
        variant="link"
      >
        Открыть полный маршрут
        <Plus />
      </Button>
      <div className={styles["post__footer"]}>
        <Button
          className="flex items-center"
          variant="outline"
          onClick={handleLikeChange}
        >
          <span>{likes.length}</span>
          <Heart color="red" fill={like ? "red" : "#ffffff"} />
        </Button>
        <Button
          className="flex items-center"
          variant="link"
          onClick={handleCommentsOpen}
        >
          <MessageCircle color="#aed2e6" fill="#dbf1fd" />
        </Button>
      </div>
    </div>
  );
};
