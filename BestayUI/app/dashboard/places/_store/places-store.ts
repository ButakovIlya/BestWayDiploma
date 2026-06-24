import { StateCreator } from "zustand";
import { Place } from "../../types/place";
import { Pagination } from "@/app/types";
import {
  DEFAULT_PAGINATION,
  DEFAULT_ROW_COUNT,
} from "@/app/lib/constants/pagination";

interface PlacesState {
  places: Place[];
  setPlaces: (_: Place[]) => void;
  pagination: Pagination;
  setPagination: (_: Pagination) => void;
  rowCount: number;
  setRowCount: (_: number) => void;
}

export interface PlacesStore {
  placesState: PlacesState;
}

export const createPlacesSlice: StateCreator<PlacesStore> = (set) => ({
  placesState: {
    places: [],
    pagination: DEFAULT_PAGINATION,
    rowCount: DEFAULT_ROW_COUNT,
    setPlaces: (newPlaces) =>
      set(
        (state) => ({
          placesState: { ...state.placesState, places: newPlaces },
        }),
        false,
      ),
    setPagination: (newValue) =>
      set(
        (state) => ({
          placesState: { ...state.placesState, pagination: newValue },
        }),
        false,
      ),
    setRowCount: (newValue) =>
      set(
        (state) => ({
          placesState: { ...state.placesState, rowCount: newValue },
        }),
        false,
      ),
  },
});
