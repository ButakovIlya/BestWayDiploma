"use client";

import { useAppStore } from "@/app/_store/app-store";
import { Button } from "@/app/components/ui/button";
import { isCustomPlace } from "@/app/dashboard/my-routes/types/custom-place";
import { createSurvey, updateSurvey } from "@/app/lib/api/public/surveys";
import { CityCategory, PlaceInfo, RouteType } from "@/app/types/entities";
import { Methods } from "../../../lib/constants/methods";
import { generateMyRoute } from "@/app/lib/api/public/routes";
import { useRouter } from "next/navigation";

export function CreateButton() {
  const router = useRouter();
  const {
    myRoutesState: { createRoute },
  } = useAppStore((store) => store);
  const { prepareForm, setPrepareForm, customPlaces, chosenMethod } =
    createRoute;

  const handleButtonClick = () => {
    if (prepareForm) {
      const mappedPlaces: PlaceInfo[] = customPlaces.map((place) => {
        if (isCustomPlace(place)) {
          return {
            category: place.category?.length ? place.category : null,
            type: place.type?.length ? place.type : null,
            description: place.description?.length ? place.description : null,
          };
        }

        return {
          place_id: place.id,
        };
      });

      const mapFromPlaces = new Map();
      mappedPlaces.forEach((value, index) => {
        mapFromPlaces.set(String(index + 1), value);
      });

      const entriesObj = Object.fromEntries(mapFromPlaces.entries());

      const surveyData = {
        preferred_transport: prepareForm.preferredTransport as RouteType,
        order_matters: prepareForm.orderMatter,
        questions: {
          "Что для вас важнее?": prepareForm.whatImportant,
        },
      };

      createSurvey({
        name: prepareForm.name,
        city: prepareForm.city as CityCategory,
      }).then((data) => {
        updateSurvey(data.id, { data: surveyData, places: entriesObj }).then(
          () => {
            const methodName =
              chosenMethod === Methods.describe ? "Свободный" : "Частичный";
            generateMyRoute(data.id, methodName).then(() => {
              setPrepareForm(undefined);
              router.push("/dashboard/my-routes");
            });
          },
        );
      });
    }
  };

  return (
    <Button onClick={handleButtonClick} disabled={!customPlaces.length}>
      Сформировать
    </Button>
  );
}
