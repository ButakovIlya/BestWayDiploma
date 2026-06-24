import { Button } from "@/app/components/ui/button";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import styles from "./create-post.module.css";
import Image from "next/image";
import { useAppStore } from "@/app/_store/app-store";
import { Input } from "@/app/components/ui/input";
import { createPost, getPosts } from "@/app/lib/api/public/posts";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "@/app/lib/constants/pagination";

export default function CreatePost() {
  const {
    feedState: {
      currentRouteIdForPost,
      setFeedPosts,
      setPagination,
      setRowCount,
      setCurrentRouteIdForPost,
    },
    ui: { isAddModalOpened, setIsAddModalOpened },
    account: { user },
  } = useAppStore((state) => state);
  const [focused, setFocused] = useState(false);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handleChooseRoute = () => {
    setIsAddModalOpened(true);
  };

  const handleUploadPhoto = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setPhoto(event.target.files[0]);
      }
      event.target.value = "";
    },
    [],
  );

  const fetchFeed = () => {
    getPosts({
      pageIndex: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
    }).then((data) => {
      const { data: feedRoutesData, count, page } = data;

      setFeedPosts(feedRoutesData);
      setRowCount(count);
      setPagination({ pageIndex: page, pageSize: 10 });
    });
  };

  const handleCreatePost = () => {
    const formData = new FormData();
    formData.append("title", "");
    formData.append("description", description);

    if (currentRouteIdForPost) {
      formData.append("route_id", String(currentRouteIdForPost.id));
    }

    if (photo) {
      formData.append("photo", photo);
    }
    createPost(formData).then(() => {
      fetchFeed();
      setDescription("");
      setCurrentRouteIdForPost(undefined);
      if (photoInputRef.current) {
        photoInputRef.current.value = "";
        setPhoto(null);
      }

      setFocused(false);
    });
  };

  const isCreatePostDisabled = !currentRouteIdForPost || !description.length;

  useEffect(() => {
    setFocused(true);
  }, [isAddModalOpened]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles["container"]}>
      <div className="flex flex-col gap-3">
        <div className={styles["input-container"]}>
          <Image
            alt="avatar"
            src={
              user?.photo ??
              "https://images.unsplash.com/vector-1754045222115-3153d64c522a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            width={240}
            height={140}
            className={styles["user-avatar"]}
          />
          <textarea
            placeholder="Рассказать про свой маршрут..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={() => setFocused(true)}
            className="resize-none flex-1 border-0 focus:outline-none focus:ring-0 text-base leading-relaxed p-1"
          />
        </div>

        {focused && (
          <div className="flex justify-between gap-2 animate-fadeIn flex-wrap">
            <div className="flex gap-1">
              <div className="flex flex-col gap-1">
                <Button
                  variant="outline"
                  onClick={() => {
                    photoInputRef?.current?.click();
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  📷 Добавить фото
                </Button>
                <Input
                  ref={photoInputRef}
                  className={"hidden"}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleUploadPhoto}
                />
                {photo ? (
                  <div className="flex gap-2 items-center ">
                    <p className="text-xs text-gray-400">Фото:</p>
                    {`${photo.name.slice(0, 10)}${photo.name.length > 10 ? "..." : ""}`}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-1">
                <Button
                  variant="outline"
                  onClick={handleChooseRoute}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  🗺️ Приложить маршрут
                </Button>
                {currentRouteIdForPost ? (
                  <div className="flex gap-2 items-center ">
                    <p className="text-xs text-gray-400">Выбран:</p>
                    {`${currentRouteIdForPost.name.slice(0, 15)}${currentRouteIdForPost.name.length > 15 ? "..." : ""}`}
                  </div>
                ) : null}
              </div>
            </div>
            <div>
              <Button
                disabled={isCreatePostDisabled}
                onClick={handleCreatePost}
              >
                Выложить
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
