import { Pagination } from "@/app/types";
import { User } from "../types";
import { StateCreator } from "zustand";
import {
  DEFAULT_PAGINATION,
  DEFAULT_ROW_COUNT,
} from "@/app/lib/constants/pagination";

interface UsersState {
  users: User[];
  setUsers: (_: User[]) => void;
  pagination: Pagination;
  setPagination: (_: Pagination) => void;
  rowCount: number;
  setRowCount: (_: number) => void;
}
export interface UsersStore {
  usersState: UsersState;
}

export const createUsersSlice: StateCreator<UsersStore> = (set) => ({
  usersState: {
    users: [],
    pagination: DEFAULT_PAGINATION,
    rowCount: DEFAULT_ROW_COUNT,
    setUsers: (newUsers) =>
      set(
        (state) => ({ usersState: { ...state.usersState, users: newUsers } }),
        false,
      ),
    setPagination: (newValue) =>
      set(
        (state) => ({
          usersState: { ...state.usersState, pagination: newValue },
        }),
        false,
      ),
    setRowCount: (newValue) =>
      set(
        (state) => ({
          usersState: { ...state.usersState, rowCount: newValue },
        }),
        false,
      ),
  },
});
