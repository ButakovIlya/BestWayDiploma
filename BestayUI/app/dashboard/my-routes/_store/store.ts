import { StateCreator } from "zustand";
import { RouteRead } from "@/app/types/entities";
import { Stages } from "../create/lib/constants/stages";
import { CustomPlace } from "../types";
import { Place } from "../../types";

interface PrepareForm {
  name: string;
  city: string;
  preferredTransport: string;
  orderMatter: boolean;
  whatImportant: string;
}

interface CreateRouteState {
  prepareForm?: PrepareForm;
  chosenMethod?: number;
  currentStage?: Stages;
  customPlaces: (CustomPlace | Place)[];
  currentEditCustomPlace?: string;
  currentRemoveCustomPlace?: number | string;
  setPrepareForm: (_?: PrepareForm) => void;
  setChosenMethod: (_: number) => void;
  setCurrentStage: (_: Stages) => void;
  pushCustomPlaces: (_: CustomPlace | Place) => void;
  setCustomPlaces: (_: (CustomPlace | Place)[]) => void;
  setCurrentEditCustomPlace: (_?: string) => void;
  setCurrentRemoveCustomPlace: (_?: number | string) => void;
}

interface MyRoutesState {
  myRoutes: RouteRead[];
  setMyRoutes: (_: RouteRead[]) => void;
  createRoute: CreateRouteState;
}

export interface MyRoutesStore {
  myRoutesState: MyRoutesState;
}

export const createMyRoutesSlice: StateCreator<MyRoutesStore> = (set) => ({
  myRoutesState: {
    myRoutes: [],
    setMyRoutes: (newRoutes) =>
      set(
        (state) => ({
          myRoutesState: { ...state.myRoutesState, myRoutes: newRoutes },
        }),
        false,
      ),
    createRoute: {
      chosenMethod: 0,
      customPlaces: [],
      setPrepareForm: (newValue) =>
        set((state) => ({
          myRoutesState: {
            ...state.myRoutesState,
            createRoute: {
              ...state.myRoutesState.createRoute,
              prepareForm: newValue,
            },
          },
        })),
      setChosenMethod: (newValue) =>
        set((state) => ({
          myRoutesState: {
            ...state.myRoutesState,
            createRoute: {
              ...state.myRoutesState.createRoute,
              chosenMethod: newValue,
            },
          },
        })),
      setCurrentStage: (newValue) =>
        set((state) => ({
          myRoutesState: {
            ...state.myRoutesState,
            createRoute: {
              ...state.myRoutesState.createRoute,
              currentStage: newValue,
            },
          },
        })),
      pushCustomPlaces: (item) =>
        set((state) => ({
          myRoutesState: {
            ...state.myRoutesState,
            createRoute: {
              ...state.myRoutesState.createRoute,
              customPlaces: [
                ...state.myRoutesState.createRoute.customPlaces,
                item,
              ],
            },
          },
        })),
      setCustomPlaces: (newValue) =>
        set((state) => ({
          myRoutesState: {
            ...state.myRoutesState,
            createRoute: {
              ...state.myRoutesState.createRoute,
              customPlaces: [...newValue],
            },
          },
        })),
      setCurrentEditCustomPlace: (newValue) =>
        set((state) => ({
          myRoutesState: {
            ...state.myRoutesState,
            createRoute: {
              ...state.myRoutesState.createRoute,
              currentEditCustomPlace: newValue,
            },
          },
        })),
      setCurrentRemoveCustomPlace: (newValue) =>
        set((state) => ({
          myRoutesState: {
            ...state.myRoutesState,
            createRoute: {
              ...state.myRoutesState.createRoute,
              currentRemoveCustomPlace: newValue,
            },
          },
        })),
    },
  },
});
