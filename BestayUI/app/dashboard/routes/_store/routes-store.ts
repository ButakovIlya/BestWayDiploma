import { Pagination } from "@/app/types";
import { Route } from "../types";
import { StateCreator } from "zustand";
import {
  DEFAULT_PAGINATION,
  DEFAULT_ROW_COUNT,
} from "@/app/lib/constants/pagination";

interface RoutesState {
  routes: Route[];
  setRoutes: (_: Route[]) => void;
  pagination: Pagination;
  setPagination: (_: Pagination) => void;
  rowCount: number;
  setRowCount: (_: number) => void;
}

export interface RoutesStore {
  routesState: RoutesState;
}

export const createRoutesSlice: StateCreator<RoutesStore> = (set) => ({
  routesState: {
    routes: [],
    pagination: DEFAULT_PAGINATION,
    rowCount: DEFAULT_ROW_COUNT,
    setRoutes: (newRoutes) =>
      set(
        (state) => ({
          routesState: { ...state.routesState, routes: newRoutes },
        }),
        false,
      ),
    setPagination: (newValue) =>
      set(
        (state) => ({
          routesState: { ...state.routesState, pagination: newValue },
        }),
        false,
      ),
    setRowCount: (newValue) =>
      set(
        (state) => ({
          routesState: { ...state.routesState, rowCount: newValue },
        }),
        false,
      ),
  },
});
