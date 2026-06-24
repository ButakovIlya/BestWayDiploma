import { Metadata } from "next";
import Login from "./components/login/login";

export const metadata: Metadata = {
  title: "Вход в BestWay",
  description: "Авторизация для доступа к персональным маршрутам BestWay",
  alternates: {
    canonical: "/login",
  },
  metadataBase: new URL("https://best-way-six.vercel.app/"),
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <Login />
    </>
  );
}
