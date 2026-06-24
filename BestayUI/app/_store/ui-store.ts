import { StateCreator } from "zustand";

interface UIState {
  isRecordModalOpened: boolean;
  isRemoveModalOpened: boolean;
  isAddModalOpened: boolean;
  isTableDataLoading: boolean;
  isSidebarOpened: boolean;
  currentPage: number;
  setIsRecordModalOpened: (_: boolean) => void;
  setIsRemoveModalOpened: (_: boolean) => void;
  setIsAddModalOpened: (_: boolean) => void;
  setIsTableDataLoading: (_: boolean) => void;
  setIsSidebarOpened: (_: boolean) => void;
  setCurrentPage: (_: number) => void;
}

export interface UIStore {
  ui: UIState;
}

export const createUISlice: StateCreator<UIStore> = (set) => ({
  ui: {
    isRecordModalOpened: false,
    isRemoveModalOpened: false,
    isAddModalOpened: false,
    isTableDataLoading: false,
    isSidebarOpened: true,
    currentPage: 0,
    setIsRecordModalOpened: (newState) =>
      set(
        (state) => ({ ui: { ...state.ui, isRecordModalOpened: newState } }),
        false,
      ),
    setIsRemoveModalOpened: (newState) =>
      set(
        (state) => ({ ui: { ...state.ui, isRemoveModalOpened: newState } }),
        false,
      ),
    setIsAddModalOpened: (newState) =>
      set(
        (state) => ({ ui: { ...state.ui, isAddModalOpened: newState } }),
        false,
      ),
    setIsTableDataLoading: (newState) =>
      set(
        (state) => ({ ui: { ...state.ui, isTableDataLoading: newState } }),
        false,
      ),
    setIsSidebarOpened: (newState) =>
      set(
        (state) => ({ ui: { ...state.ui, isSidebarOpened: newState } }),
        false,
      ),
    setCurrentPage: (newState) =>
      set((state) => ({ ui: { ...state.ui, currentPage: newState } }), false),
  },
});
