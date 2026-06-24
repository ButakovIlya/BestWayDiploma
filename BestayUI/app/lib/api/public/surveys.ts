import {
  SurveyCreateDTO,
  SurveyDTO,
  SurveyUpdateDTO,
} from "@/app/types/entities";
import { requestData } from "../request";

export function getSurveys() {
  return requestData<SurveyDTO[]>("/api/public/surveys", {});
}

export function createSurvey(survey: SurveyCreateDTO) {
  return requestData<SurveyDTO>("/api/public/surveys", {
    method: "POST",
    body: JSON.stringify(survey),
  });
}

export function updateSurvey(id: number, survey: SurveyUpdateDTO) {
  return requestData<SurveyDTO>(`/api/public/surveys/${id}`, {
    method: "PUT",
    body: JSON.stringify(survey),
  });
}

export function removeSurvey(id: number) {
  return requestData<SurveyDTO>(`/api/public/surveys/${id}`, {
    method: "DELETE",
    next: { tags: ["notify"] },
  });
}
