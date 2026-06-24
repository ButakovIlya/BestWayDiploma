import { CityCategory, RoutePlaceRead } from "@/app/types/entities";

export type RouteForm = {
  id: number;
  name: string;
  city: CityCategory;
  duration: number | null;
  places: RoutePlaceRead[];
};
