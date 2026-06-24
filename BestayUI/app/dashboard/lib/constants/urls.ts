import type { LucideIcon } from "lucide-react";
import {
  BookA,
  Compass,
  Newspaper,
  Route,
  ScrollText,
  Users,
  Waypoints,
} from "lucide-react";
import { SidebarPages } from "../../types/sidebar-pages";

const URL_PREFIX = "/dashboard";

export const URL_ACCOUNT = URL_PREFIX + "/account";

export type NavItem = {
  title: string;
  description?: string;
  url: string;
  icon: LucideIcon;
  page: SidebarPages;
};

export const ADMIN_URLS: NavItem[] = [
  {
    title: "Маршруты",
    description: "Шаблоны и публичные маршруты",
    url: `${URL_PREFIX}/routes`,
    icon: Route,
    page: SidebarPages.Routes,
  },
  {
    title: "Места",
    description: "База точек и достопримечательностей",
    url: `${URL_PREFIX}/places`,
    icon: BookA,
    page: SidebarPages.Places,
  },
  {
    title: "Пользователи",
    description: "Аккаунты, роли и блокировки",
    url: `${URL_PREFIX}/users`,
    icon: Users,
    page: SidebarPages.Users,
  },
  {
    title: "Опросы",
    description: "Контент и модерация опросов",
    url: `${URL_PREFIX}/surveys`,
    icon: ScrollText,
    page: SidebarPages.MySurveys,
  },
];

export const PUBLIC_URLS: NavItem[] = [
  {
    title: "Лента",
    description: "Маршруты сообщества",
    url: `${URL_PREFIX}/feed`,
    icon: Newspaper,
    page: SidebarPages.Feed,
  },
  {
    title: "Мои маршруты",
    description: "Сохранённые и сгенерированные",
    url: `${URL_PREFIX}/my-routes`,
    icon: Waypoints,
    page: SidebarPages.MyRoutes,
  },
];

export const BRAND_ICON = Compass;
