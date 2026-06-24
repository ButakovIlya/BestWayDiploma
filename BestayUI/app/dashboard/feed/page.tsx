"use client";
import { useEffect, useRef, useState } from "react";
import DashboardHeader from "../components/dashboard-header/dashboard-header";
import styles from "./page.module.css";
import { Post } from "./components/post";
import { useAppStore } from "@/app/_store/app-store";
import { SidebarPages } from "../types/sidebar-pages";
import { Bird } from "lucide-react";
import Loader from "@/app/components/loader";
import { CommentsModal } from "./components/comments-modal";
import { getPosts, removePost } from "@/app/lib/api/public/posts";
import CreatePost from "./components/create-post";
import { ChooseFromMyRoutesModal } from "./components/choose-from-routes-modal";
import { ConfirmModal } from "@/app/components/confirm-modal";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "@/app/lib/constants/pagination";

export default function Page() {
  const { feedState, ui } = useAppStore((state) => state);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);
  const containerRef = useRef(null);

  const {
    posts,
    pagination,
    rowCount,
    currentPostId,
    setFeedPosts,
    pushFeedPosts,
    setPagination,
    setRowCount,
    setCurrentPostId,
  } = feedState;
  const { setCurrentPage, isRemoveModalOpened, setIsRemoveModalOpened } = ui;

  const fetchFeed = () => {
    setLoading(true);

    getPosts({ pageIndex: pagination.pageIndex, pageSize: 10 }).then((data) => {
      const { data: feedRoutesData, count, page } = data;

      pushFeedPosts(feedRoutesData);
      setRowCount(count);
      setPagination({ pageIndex: page, pageSize: 10 });

      setLoading(false);
    });
  };

  const fetchRefreshedFeed = () => {
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

  useEffect(() => {
    setCurrentPage(SidebarPages.Feed);
    fetchFeed();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && posts.length < rowCount) {
          fetchFeed();
        }
      },
      {
        threshold: 1,
        root: containerRef.current,
      },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading]);

  return (
    <div>
      <DashboardHeader title="Лента" />
      <div ref={containerRef} className={styles["feed-container"]}>
        <CreatePost />
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
              />
            );
          })
        ) : (
          <div className="flex flex-col items-center">
            <Bird color="#006096" width={64} height={64} />
            <p>Пока нет постов :(</p>
          </div>
        )}
        <div ref={loaderRef} className="flex justify-center p-4">
          {loading && (
            <div className="flex flex-col items-center gap-2">
              Загрузка постов
              <Loader />
            </div>
          )}
        </div>
      </div>
      <CommentsModal />
      <ChooseFromMyRoutesModal />
      <ConfirmModal
        title={`Вы действительно хотите удалить запись?`}
        description={
          "Это действие нельзя отменить. Данные будут удалены безвозвратно."
        }
        onConfirm={() => {
          removePost(Number(currentPostId)).then(() => {
            fetchRefreshedFeed();
          });
        }}
        open={isRemoveModalOpened}
        onOpen={(open) => {
          setIsRemoveModalOpened(open);
          if (!open) {
            setCurrentPostId(undefined);
          }
        }}
      />
    </div>
  );
}
