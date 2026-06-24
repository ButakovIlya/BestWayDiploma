import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./landing-motion.css";
import Head from "next/head";
import favicon from "@/public/favicon.ico";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Построение маршрута по описанию - BestWay",
  description: "Генератор маршрутов по описанию пользователя.",
  keywords:
    "городские маршруты, достопримечательности, создать маршрут, прогулки, туристический маршрут, городской туризм, маршрут по описанию, конструктор маршрута",
  metadataBase: new URL("https://best-way-six.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: favicon.src,
  },
  openGraph: {
    title: "BestWay",
    description: "Генератор маршрутов по описанию пользователя.",
    url: "https://best-way-six.vercel.app/",
    siteName: "BestWay",
    type: "website",
  },
  verification: {
    google: "VHtiKE5F-VZvQfEueuyOBKioNDHl7fzehmOHv95EVj8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1, viewport-fit=cover"
        ></meta>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
