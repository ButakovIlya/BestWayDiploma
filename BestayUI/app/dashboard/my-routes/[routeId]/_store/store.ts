import { StateCreator } from "zustand";
import { RouteRead } from "@/app/types/entities";

interface MyRouteState {
  myRoute: RouteRead | null;
  currentRemoveCustomPlace?: number;
  setMyRoute: (_: RouteRead | null) => void;
  setCurrentRemoveCustomPlace: (_?: number) => void;
}

export interface MyRouteStore {
  myRouteState: MyRouteState;
}

export const createMyRouteSlice: StateCreator<MyRouteStore> = (set) => ({
  myRouteState: {
    myRoute: null,
    setMyRoute: (newRoute) =>
      set(
        (state) => ({
          myRouteState: {
            ...state.myRouteState,
            myRoute: newRoute,
          },
        }),
        false,
      ),
    setCurrentRemoveCustomPlace: (placeId) =>
      set(
        (state) => ({
          myRouteState: {
            ...state.myRouteState,
            currentRemoveCustomPlace: placeId,
          },
        }),
        false,
      ),
  },
});
