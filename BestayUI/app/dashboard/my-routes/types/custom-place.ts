import { PlaceInfo } from "@/app/types/entities";
import { Place } from "../../types";

export interface CustomPlace extends PlaceInfo {
  key?: string;
}

export const isCustomPlace = (
  place: CustomPlace | Place,
): place is CustomPlace => {
  if ((place as CustomPlace).key) {
    return true;
  }

  return false;
};

export const isPublicPlace = (place: CustomPlace | Place): place is Place => {
  if ((place as Place).id) {
    return true;
  }

  return false;
};
