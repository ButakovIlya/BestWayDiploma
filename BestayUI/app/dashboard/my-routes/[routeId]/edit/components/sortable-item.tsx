"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CustomPlace } from "@/app/dashboard/my-routes/types";
import { isCustomPlace } from "@/app/dashboard/my-routes/types/custom-place";
import { GripVertical, MapPinned, Trash, WandSparkles } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useAppStore } from "@/app/_store/app-store";
import { Place } from "@/app/dashboard/types";
import Image from "next/image";
import { useIsMobile } from "@/app/hooks/use-mobile";
import styles from "./sortable-item.module.css";

interface SortableItemProps {
  id: number;
  index: number;
  item?: CustomPlace | Place;
}

export function SortableItem(props: SortableItemProps) {
  const { id, index, item } = props;
  const {
    myRouteState: { setCurrentRemoveCustomPlace },
    ui,
  } = useAppStore((state) => state);
  const { setIsRemoveModalOpened } = ui;
  const isMobile = useIsMobile();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    border: "1px solid rgba(0, 96, 150, 0.12)",
    borderRadius: 26,
    padding: 16,
    minHeight: 100,
    background: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 12px 30px rgba(0, 96, 150, 0.08)",
    touchAction: "auto",
    alignContent: "center",
  };

  const customPlace = item && isCustomPlace(item);

  return (
    <div ref={setNodeRef} style={style}>
      {item ? (
        <div className="flex  h-full gap-5 justify-between items-center">
          {customPlace ? (
            <div className="flex gap-10 flex-wrap items-center">
              {index + 1 + "."}
              <WandSparkles color="purple" />
              <div>
                <p className="text-xs font-bold text-gray-400">Категория:</p>
                <p>{item.category || "-"}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400">Тип:</p>
                <p>{item.type || "-"}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400">Описание:</p>
                <p>
                  {item.description
                    ? `${item.description.substring(0, 25)}${item.description.length > 25 ? "..." : ""}`
                    : "-"}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex gap-10 flex-wrap items-center">
              {index + 1 + "."}
              <MapPinned color="green" />
              <div>
                <p className="text-xs font-bold text-gray-400">Имя:</p>
                <p>{item.name || "-"}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400">Категория:</p>
                <p>{item.category || "-"}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400">Тип:</p>
                <p>{item.type || "-"}</p>
              </div>
              {isMobile && item.photo && (
                <div className={styles["photo"]}>
                  <Image src={item.photo} alt="Фото" width={250} height={100} />
                </div>
              )}
            </div>
          )}
          <div className="flex items-center gap-5">
            {!isMobile && !customPlace && item.photo && (
              <div className={styles["photo"]}>
                <Image src={item.photo} alt="Фото" width={250} height={100} />
              </div>
            )}
            <div className="flex gap-2 flex-wrap justify-end">
              <Button
                onClick={() => {
                  setCurrentRemoveCustomPlace(id);
                  setIsRemoveModalOpened(true);
                }}
                variant="secondary"
              >
                <Trash color="red" />
              </Button>
            </div>
            <div {...attributes} {...listeners}>
              <GripVertical />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
