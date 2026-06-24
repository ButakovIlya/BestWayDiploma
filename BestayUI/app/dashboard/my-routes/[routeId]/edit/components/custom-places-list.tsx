"use client";

import { useAppStore } from "@/app/_store/app-store";
import { useEffect, useState } from "react";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./sortable-item";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Bird } from "lucide-react";
import { PlaceRead } from "@/app/types/entities";
import styles from "./custom-places-list.module.css";
import { getMyRoute, updateRouteOrder } from "@/app/lib/api/public/routes";

export function CustomPlacesList() {
  const {
    myRouteState: { myRoute },
  } = useAppStore((state) => state);

  const [places, setPlaces] = useState<PlaceRead[]>([]);
  const [items, setItems] = useState<number[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(Number(active?.id));
        const newIndex = items.indexOf(Number(over?.id));

        return arrayMove(items, oldIndex, newIndex);
      });
      const oldIndex = places.findIndex((place) => place.id === active.id);
      const newIndex = places.findIndex((place) => place.id === over?.id);
      const sortedCustomPlaces = arrayMove(places, oldIndex, newIndex);

      const orderDict: Record<string, number> = {};

      sortedCustomPlaces.forEach((item, index) => {
        orderDict[String(item.id)] = index + 1;
      });

      updateRouteOrder(myRoute?.id ?? -1, orderDict).then(() => {
        getMyRoute(myRoute?.id ?? -1).then((data) => {
          setPlaces(
            data.places
              .sort((a, b) => a.order - b.order)
              .map((place) => place.place),
          );
        });
      });
    }
  };

  useEffect(() => {
    const places =
      myRoute?.places
        .sort((a, b) => a.order - b.order)
        .map((place) => place.place) ?? [];
    setPlaces(places);

    const items = places.map((place) => Number(place.id));
    setItems(items);
  }, [myRoute]);

  return (
    <DndContext
      id="list"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.length ? (
          <div className={styles["sortable-items-container"]}>
            {items.map((id, index) => (
              <SortableItem
                key={id}
                id={id}
                index={index}
                item={places.find((place) => place.id === id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-full gap-2 min-h-fit">
            <Bird color="#006096" width={64} height={64} />
            <p>Список пуст, добавьте первое место!</p>
          </div>
        )}
      </SortableContext>
    </DndContext>
  );
}
