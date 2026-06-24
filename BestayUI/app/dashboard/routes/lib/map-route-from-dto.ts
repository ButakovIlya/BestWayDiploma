import { RouteRead } from "@/app/types/entities";
import { Route } from "../types";

export const mapRouteFromDTO = (route: RouteRead) => {
  return {
    id: route.id,
    city: route.city?.toString(),
    duration: route.duration?.toString(),
    name: route.name,
    places: route.places.map(({ place }) => ({
      value: place.id,
      label: place.name,
    })),
  } as Route;
};
