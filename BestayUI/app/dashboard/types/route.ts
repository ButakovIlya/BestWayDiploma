import { Place } from "./place";

export type Route = {
  id: number;
  name: string;
  city: string;
  duration: number;
  places: Place[];
};
