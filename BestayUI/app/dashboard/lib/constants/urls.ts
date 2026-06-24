import { BookA, Newspaper, Route, Users, Waypoints } from "lucide-react";
import { SidebarPages } from "../../types/sidebar-pages";

const URL_PREFIX = "/dashboard";

export const URL_ACCOUNT = URL_PREFIX + "/account";

export const ADMIN_URLS = [
  {
    title: "Маршруты",
    url: `${URL_PREFIX}/routes`,
    icon: Route,
    page: SidebarPages.Routes,
  },
  {
    title: "Места",
    url: `${URL_PREFIX}/places`,
    icon: BookA,
    page: SidebarPages.Places,
  },
  {
    title: "Пользователи",
    url: `${URL_PREFIX}/users`,
    icon: Users,
    page: SidebarPages.Users,
  },
];

export const PUBLIC_URLS = [
  {
    title: "Лента",
    url: `${URL_PREFIX}/feed`,
    icon: Newspaper,
    page: SidebarPages.Feed,
  },
  {
    title: "Мои маршруты",
    url: `${URL_PREFIX}/my-routes`,
    icon: Waypoints,
    page: SidebarPages.MyRoutes,
  },
  // {
  //   title: "Подписки",
  //   url: `${URL_PREFIX}/subcriptions`,
  //   icon: Podcast,
  //   page: SidebarPages.Subcriptions,
  // },
  // {
  //   title: "Тематические маршруты",
  //   url: `${URL_PREFIX}/thematic-routes`,
  //   icon: SquarePlay,
  //   page: SidebarPages.ThematicRoutes,
  // },
  // {
  //   title: "Мои опросы",
  //   url: `${URL_PREFIX}/surveys`,
  //   icon: ScrollText,
  //   page: SidebarPages.MySurveys,
  // },
];
