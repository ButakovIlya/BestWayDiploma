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
import { isCustomPlace } from "@/app/dashboard/my-routes/types/custom-place";
import { Bird } from "lucide-react";
import styles from "./custom-places-list.module.css";

export function CustomPlacesList() {
  const {
    myRoutesState: { createRoute },
  } = useAppStore((store) => store);
  const { customPlaces, setCustomPlaces } = createRoute;
  const [items, setItems] = useState<(string | number)[]>([]);
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
        const oldIndex = items.indexOf(String(active?.id));
        const newIndex = items.indexOf(String(over?.id));

        return arrayMove(items, oldIndex, newIndex);
      });

      const oldIndex = customPlaces.findIndex((place) =>
        isCustomPlace(place)
          ? place.key === active.id
          : String(place.id) === active.id,
      );
      const newIndex = customPlaces.findIndex((place) =>
        isCustomPlace(place)
          ? place.key === over?.id
          : String(place.id) === over?.id,
      );
      const sortedCustomPlaces = arrayMove(customPlaces, oldIndex, newIndex);
      setCustomPlaces(sortedCustomPlaces);
    }
  };

  useEffect(() => {
    setItems(
      customPlaces.map((place) =>
        isCustomPlace(place) ? String(place.key) : String(place.id),
      ),
    );
  }, [customPlaces]);

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
                item={customPlaces.find((place) =>
                  isCustomPlace(place)
                    ? place.key === String(id)
                    : place.id === Number(id),
                )}
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
