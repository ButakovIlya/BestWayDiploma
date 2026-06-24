import { UserDTO } from "@/app/types/entities";
import { UserForm } from "../types";

export const mapUserFormToDTO = (user: UserForm) => {
  return {
    first_name: user.first_name,
    last_name: user.last_name,
    middle_name: user.middle_name,
    phone: user.phone,
  } as UserDTO;
};
