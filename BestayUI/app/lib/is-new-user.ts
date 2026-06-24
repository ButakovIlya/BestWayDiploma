import dayjs from "dayjs";
import { User2 } from "../dashboard/account/types";

const DIFF_UP_NEW_USER = 306;

export const checkIsUserRegistrated = (registrationDate: string) => {
  return (
    dayjs(new Date()).diff(dayjs(Date.parse(registrationDate)), "minute") <
    DIFF_UP_NEW_USER
  );
};

export const checkIsUserFioFilled = (user: User2) => {
  return user.firstName !== null && user.lastName !== null;
};
