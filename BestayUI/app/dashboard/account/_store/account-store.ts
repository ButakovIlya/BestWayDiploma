import { StateCreator } from "zustand";
import { User2 } from "../types";

interface UserState {
  user: User2 | null;
  setUser: (_: User2) => void;
}
export interface AccountStore {
  account: UserState;
}

export const createAccountSlice: StateCreator<AccountStore> = (set) => ({
  account: {
    user: null,
    setUser: (newUser) =>
      set((state) => ({ account: { ...state.account, user: newUser } }), false),
  },
});
