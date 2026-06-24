import { PlaceRead } from "@/app/types/entities";
import { Place } from "@/app/dashboard/types";

export const mapPlaceFromDTO = (place: PlaceRead) => {
  return {
    ...place,
    coordinates: place.coordinates?.join(","),
  } as Place;
};
