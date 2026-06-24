import { StateCreator } from "zustand";

interface LoginState {
  phone: string;
  code: string;
  isSentCode: boolean;
  sentTimes: number;
  setPhone: (_: string) => void;
  setCode: (_: string) => void;
  setIsSentCode: (_: boolean) => void;
  increaseSentTimes: () => void;
}

export interface LoginStore {
  login: LoginState;
}

export const createLoginSlice: StateCreator<LoginStore> = (set) => ({
  login: {
    phone: "",
    code: "",
    isSentCode: false,
    sentTimes: 0,
    setPhone: (newPhone) =>
      set((store) => ({ login: { ...store.login, phone: newPhone } }), false),
    setCode: (newCode) =>
      set((store) => ({ login: { ...store.login, code: newCode } }), false),
    setIsSentCode: (newState) =>
      set(
        (store) => ({ login: { ...store.login, isSentCode: newState } }),
        false,
      ),
    increaseSentTimes: () =>
      set(
        (store) => ({
          login: { ...store.login, sentTimes: store.login.sentTimes + 1 },
        }),
        false,
      ),
  },
});
