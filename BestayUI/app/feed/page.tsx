"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Post } from "./components/post";
import { Bird } from "lucide-react";
import { getPosts } from "@/app/lib/api/public/posts";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "../lib/constants/pagination";
import { PostRead } from "../types/entities";
import { AlertModal } from "./components/alert-modal";
import { Header } from "../components/header";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostRead[]>([]);
  const [alertModal, setAlertModal] = useState<boolean>(false);

  const fetchFeed = () => {
    setLoading(true);

    getPosts({
      pageIndex: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
    }).then((data) => {
      const { data: feedRoutesData } = data;

      setPosts(feedRoutesData);
      setLoading(false);
    });
  };

  const handleOpenAlertModal = (open: boolean) => {
    setAlertModal(open);
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <>
      <Header />
      <div className={styles["feed-container"]}>
        {loading ? (
          <></>
        ) : posts.length ? (
          posts.map(({ id, description, photo, author, route, route_id }) => {
            if (!route) {
              return null;
            }
            const { city, places, type } = route;
            return (
              <Post
                key={id}
                id={id}
                routeId={route_id}
                text={description ?? ""}
                photo={photo ?? undefined}
                author={author ?? { id: 0, phone: "" }}
                places={places.slice(0, 3)}
                city={String(city)}
                type={String(type)}
                openAlertModal={handleOpenAlertModal}
              />
            );
          })
        ) : (
          <div className="flex flex-col items-center">
            <Bird color="#006096" width={64} height={64} />
            <p>Пока нет постов :(</p>
          </div>
        )}
      </div>
      <AlertModal open={alertModal} setOpen={handleOpenAlertModal} />
    </>
  );
}
