"use client";

import { useEffect } from "react";
import { RouteConstruct } from "./components/route-construct";
import { useAppStore } from "@/app/_store/app-store";
import { Stages } from "../../lib/constants/stages";
import { CustomPlaceRecordModal } from "./components/custom-place-record-modal";
import { RemoveCustomPlaceModal } from "./components/remove-custom-place-modal";
import { ChooseFromPlacesModal } from "./components/choose-from-places-modal";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const {
    myRoutesState: { createRoute },
  } = useAppStore((state) => state);
  const { setCurrentStage, prepareForm } = createRoute;

  useEffect(() => {
    if (!prepareForm) {
      router.push("/dashboard/my-routes/create/prepare");
      return;
    }

    setCurrentStage(Stages.buildManually);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <RouteConstruct />
      <CustomPlaceRecordModal />
      <RemoveCustomPlaceModal />
      <ChooseFromPlacesModal />
    </>
  );
}
