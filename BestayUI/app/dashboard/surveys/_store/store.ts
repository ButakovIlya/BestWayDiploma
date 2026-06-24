import { StateCreator } from "zustand";
import { SurveyRead } from "@/app/types/entities";

interface SurveysState {
  surveys: SurveyRead[];
  setSurveys: (_: SurveyRead[]) => void;
}

export interface SurveysStore {
  surveysState: SurveysState;
}

export const createSurveysSlice: StateCreator<SurveysStore> = (set) => ({
  surveysState: {
    surveys: [],
    setSurveys: (newSurveys) =>
      set(
        (state) => ({
          surveysState: { ...state.surveysState, surveys: newSurveys },
        }),
        false,
      ),
  },
});
