import { UserDTO } from "@/app/types/entities";
import { User2 } from "../types";
import dayjs from "dayjs";

export const mapUserProfileToDTO = (user: User2) => {
  return {
    first_name: user.firstName,
    last_name: user.lastName,
    middle_name: user.middleName,
    birth_date: user.birthday
      ? dayjs(user.birthday).format("YYYY-MM-DD")
      : undefined,
  } as UserDTO;
};
