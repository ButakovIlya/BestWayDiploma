import { StateCreator } from "zustand";
import { Place } from "../dashboard/types";
import { Pagination } from "../types";
import {
  DEFAULT_PAGINATION,
  DEFAULT_ROW_COUNT,
} from "../lib/constants/pagination";
import { RouteRead } from "../types/entities";

interface PublicPlaces {
  places: Place[];
  pagination: Pagination;
  rowCount: number;
  setPlaces: (_: Place[]) => void;
  setPagination: (_: Pagination) => void;
  setRowCount: (_: number) => void;
}

interface MyPublicRoutes {
  myPublicRoutes: RouteRead[];
  pagination: Pagination;
  rowCount: number;
  setMyPublicRoutes: (_: RouteRead[]) => void;
  setPagination: (_: Pagination) => void;
  setRowCount: (_: number) => void;
}

export interface PublicStore {
  publicPlaces: PublicPlaces;
  publicMyRoutes: MyPublicRoutes;
}

export const createPublicSlice: StateCreator<PublicStore> = (set) => ({
  publicMyRoutes: {
    myPublicRoutes: [],
    pagination: DEFAULT_PAGINATION,
    rowCount: DEFAULT_ROW_COUNT,
    setMyPublicRoutes: (newPlaces) =>
      set(
        (state) => ({
          publicMyRoutes: {
            ...state.publicMyRoutes,
            myPublicRoutes: newPlaces,
          },
        }),
        false,
      ),
    setPagination: (newValue) =>
      set(
        (state) => ({
          publicMyRoutes: { ...state.publicMyRoutes, pagination: newValue },
        }),
        false,
      ),
    setRowCount: (newValue) =>
      set(
        (state) => ({
          publicMyRoutes: { ...state.publicMyRoutes, rowCount: newValue },
        }),
        false,
      ),
  },
  publicPlaces: {
    places: [],
    pagination: DEFAULT_PAGINATION,
    rowCount: DEFAULT_ROW_COUNT,
    setPlaces: (newPlaces) =>
      set(
        (state) => ({
          publicPlaces: { ...state.publicPlaces, places: newPlaces },
        }),
        false,
      ),
    setPagination: (newValue) =>
      set(
        (state) => ({
          publicPlaces: { ...state.publicPlaces, pagination: newValue },
        }),
        false,
      ),
    setRowCount: (newValue) =>
      set(
        (state) => ({
          publicPlaces: { ...state.publicPlaces, rowCount: newValue },
        }),
        false,
      ),
  },
});
