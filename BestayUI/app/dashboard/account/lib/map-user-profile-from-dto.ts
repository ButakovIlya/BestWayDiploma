import { UserDTO } from "@/app/types/entities";
import { User2 } from "../types";
import dayjs from "dayjs";

export const mapUserProfileFromDTO = (user: UserDTO) => {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    middleName: user.middle_name,
    phone: user.phone,
    registrationDate: user.registration_date ?? "-",
    birthday: user.birth_date
      ? dayjs(user.birth_date).format("DD.MM.YYYY")
      : "-",
    gender: user.gender,
    photo: user.photo,
    isBanned: user.is_banned,
    isAdmin: user.is_admin,
  } as User2;
};
