"use client";
import { useAppStore } from "@/app/_store/app-store";
import { ConfirmModal } from "@/app/components/confirm-modal";
import { getMyRoute, removeRoutePlace } from "@/app/lib/api/public/routes";

export function RemoveCustomPlaceModal() {
  const {
    myRouteState: {
      myRoute,
      setMyRoute,
      currentRemoveCustomPlace,
      setCurrentRemoveCustomPlace,
    },
    ui,
  } = useAppStore((store) => store);
  const { isRemoveModalOpened, setIsRemoveModalOpened } = ui;

  return (
    <ConfirmModal
      title={`Вы действительно хотите удалить место из списка?`}
      onConfirm={() => {
        removeRoutePlace(
          myRoute?.id ?? -1,
          currentRemoveCustomPlace ?? -1,
        ).then(() => {
          getMyRoute(myRoute?.id ?? -1).then((data) => {
            setMyRoute(data);
          });
        });
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
