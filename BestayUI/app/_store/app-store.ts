import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  createUsersSlice,
  UsersStore,
} from "../dashboard/users/_store/users-store";
import {
  createPlacesSlice,
  PlacesStore,
} from "../dashboard/places/_store/places-store";
import {
  createRoutesSlice,
  RoutesStore,
} from "../dashboard/routes/_store/routes-store";
import {
  AccountStore,
  createAccountSlice,
} from "../dashboard/account/_store/account-store";
import {
  createMyRoutesSlice,
  MyRoutesStore,
} from "../dashboard/my-routes/_store/store";
import { createLoginSlice, LoginStore } from "../login/_store/login-store";
import { createUISlice, UIStore } from "./ui-store";
import {
  createSurveysSlice,
  SurveysStore,
} from "../dashboard/surveys/_store/store";
import { createPublicSlice, PublicStore } from "./public-store";
import { createFeedSlice, FeedStore } from "../dashboard/feed/_store/store";
import {
  createMyRouteSlice,
  MyRouteStore,
} from "../dashboard/my-routes/[routeId]/_store/store";

export const useAppStore = create(
  devtools<
    UsersStore &
      PlacesStore &
      RoutesStore &
      AccountStore &
      MyRoutesStore &
      LoginStore &
      SurveysStore &
      FeedStore &
      MyRouteStore &
      PublicStore &
      UIStore
  >(
    (...a) => {
      return {
        ...createUsersSlice(...a),
        ...createPlacesSlice(...a),
        ...createRoutesSlice(...a),
        ...createAccountSlice(...a),
        ...createMyRoutesSlice(...a),
        ...createLoginSlice(...a),
        ...createSurveysSlice(...a),
        ...createFeedSlice(...a),
        ...createMyRouteSlice(...a),
        ...createPublicSlice(...a),
        ...createUISlice(...a),
      };
    },
    { name: "app-store" },
  ),
);
