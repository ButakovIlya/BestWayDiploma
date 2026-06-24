import { StateCreator } from "zustand";
import { Pagination } from "@/app/types";
import {
  DEFAULT_PAGINATION,
  DEFAULT_ROW_COUNT,
} from "@/app/lib/constants/pagination";
import { PostRead } from "@/app/types/entities";

interface ChosenRouteForPost {
  id: number;
  name: string;
}

interface FeedState {
  posts: PostRead[];
  pagination: Pagination;
  rowCount: number;
  currentPostId?: number;
  currentRouteIdForPost?: ChosenRouteForPost;
  setFeedPosts: (_: PostRead[]) => void;
  pushFeedPosts: (_: PostRead[]) => void;
  setPagination: (_: Pagination) => void;
  setRowCount: (_: number) => void;
  setCurrentPostId: (_: number | undefined) => void;
  setCurrentRouteIdForPost: (_: ChosenRouteForPost | undefined) => void;
}

export interface FeedStore {
  feedState: FeedState;
}

export const createFeedSlice: StateCreator<FeedStore> = (set) => ({
  feedState: {
    posts: [],
    pagination: DEFAULT_PAGINATION,
    rowCount: DEFAULT_ROW_COUNT,
    pushFeedPosts: (newFeedRoutes) =>
      set((state) => {
        const filteredNewRoutes = newFeedRoutes.filter(
          (newRoute) =>
            state.feedState.posts.findIndex(
              (feedRoute) => feedRoute.id === newRoute.id,
            ) === -1,
        );

        return {
          feedState: {
            ...state.feedState,
            posts: [...state.feedState.posts, ...filteredNewRoutes],
          },
        };
      }, false),
    setFeedPosts: (newFeedRoutes) =>
      set((state) => {
        return {
          feedState: {
            ...state.feedState,
            posts: newFeedRoutes,
          },
        };
      }, false),
    setPagination: (newValue) =>
      set(
        (state) => ({
          feedState: { ...state.feedState, pagination: newValue },
        }),
        false,
      ),
    setRowCount: (newValue) =>
      set(
        (state) => ({
          feedState: { ...state.feedState, rowCount: newValue },
        }),
        false,
      ),
    setCurrentPostId: (newValue) =>
      set(
        (state) => ({
          feedState: { ...state.feedState, currentPostId: newValue },
        }),
        false,
      ),
    setCurrentRouteIdForPost: (newValue) =>
      set(
        (state) => ({
          feedState: { ...state.feedState, currentRouteIdForPost: newValue },
        }),
        false,
      ),
  },
});
