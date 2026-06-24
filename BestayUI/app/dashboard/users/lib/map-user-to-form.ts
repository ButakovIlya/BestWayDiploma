import { User, UserForm } from "../types";

export const mapUserToForm = (user: User) => {
  const fio = new Array(3).fill(" ");
  const splittedFio = user.fio.split(" ");

  for (let index = 0; index < splittedFio.length; index++) {
    fio[index] = splittedFio[index];
  }

  return {
    id: user.id,
    first_name: fio[1],
    last_name: fio[0],
    middle_name: fio[2],
    phone: user.phone,
  } as UserForm;
};
