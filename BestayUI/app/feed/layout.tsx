import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Лента маршрутов по описанию - BestWay",
  description: "Лента c маршрутами пользователей BestWay",
  keywords:
    "городские маршруты, достопримечательности, создать маршрут, прогулки, туристический маршрут, городской туризм, маршрут по описанию, конструктор маршрута",
  metadataBase: new URL("https://best-way-six.vercel.app/"),
  alternates: {
    canonical: "/feed",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
