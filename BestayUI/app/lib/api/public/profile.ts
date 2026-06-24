import { UserDTO } from "@/app/types/entities";
import { requestData } from "../request";

export function getProfile() {
  return requestData<UserDTO>("/api/public/profile", {});
}

export function updateProfile(user: UserDTO) {
  return requestData<UserDTO>("/api/public/profile", {
    method: "PUT",
    body: JSON.stringify(user),
    next: { tags: ["notify"] },
  });
}

export function updateProfileAvatar(formData: FormData) {
  return requestData<UserDTO>("/api/public/profile/photo", {
    method: "POST",
    body: formData,
    next: { tags: ["notify"] },
  });
}
