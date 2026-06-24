"use client";
import { useAppStore } from "@/app/_store/app-store";
import { ConfirmModal } from "@/app/components/confirm-modal";
import { isCustomPlace } from "@/app/dashboard/my-routes/types/custom-place";

export function RemoveCustomPlaceModal() {
  const {
    myRoutesState: { createRoute },
    ui,
  } = useAppStore((store) => store);
  const {
    currentRemoveCustomPlace,
    customPlaces,
    setCustomPlaces,
    setCurrentRemoveCustomPlace,
  } = createRoute;
  const { isRemoveModalOpened, setIsRemoveModalOpened } = ui;

  return (
    <ConfirmModal
      title={`Вы действительно хотите удалить место из списка?`}
      onConfirm={() => {
        const filteredCustomPlaces = customPlaces.filter((place) => {
          return isCustomPlace(place)
            ? place.key !== String(currentRemoveCustomPlace)
            : place.id !== Number(currentRemoveCustomPlace);
        });
        setCustomPlaces(filteredCustomPlaces);
      }}
      open={isRemoveModalOpened}
      onOpen={(open) => {
        if (!open) {
          setCurrentRemoveCustomPlace(undefined);
        }
        setIsRemoveModalOpened(open);
      }}
    />
  );
}
