import { PlaceRead } from "@/app/types/entities";
import { Place } from "@/app/dashboard/types";

export const mapPlaceToDTO = (place: Place) => {
  return {
    ...place,
    coordinates: place.coordinates?.split(",").map((value) => Number(value)),
  } as PlaceRead;
};
