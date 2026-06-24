import { BodyCreateApiAdminRoutesPost } from "@/app/types/entities";
import { Route } from "../types";

export const mapRouteToDTO = (route: Route) =>
  ({
    name: route.name,
    city: route.city,
  }) as BodyCreateApiAdminRoutesPost;
