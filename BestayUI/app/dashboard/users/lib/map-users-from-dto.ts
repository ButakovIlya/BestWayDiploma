import { UserDTO } from "@/app/types/entities";
import { User } from "../types";
import dayjs from "dayjs";

export const mapUsersFromDTO = (users: UserDTO[]) => {
  return users.map(
    (user) =>
      ({
        id: user.id,
        fio: `${user.last_name ?? ""} ${user.first_name ?? ""} ${user.middle_name ?? ""}`,
        phone: user.phone,
        registrationDate: user.registration_date
          ? dayjs(user.registration_date).format("DD.MM.YYYY")
          : "-",
        birthday: user.birth_date
          ? dayjs(user.birth_date).format("DD.MM.YYYY")
          : "-",
        gender: user.gender,
        photo: user.photo,
        isBanned: user.is_banned,
      }) as User,
  );
};
