import type { NextAuthConfig } from "next-auth";
import { ADMIN_ROUTES } from "./app/lib/auth/admin-routes";
import { PUBLIC_ROUTES } from "./app/lib/auth/public-routes";

const DEFAULT_REDIRECT_URL = "/dashboard/feed";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ token, session }) {
      session.user.is_admin = token.is_admin;
      session.user.is_new_user = token.is_new_user;
      return session;
    },
    authorized({ auth, request }) {
      const { nextUrl } = request;
      console.log(nextUrl.pathname);

      const isSEO =
        nextUrl.pathname === "/sitemap.xml" ||
        nextUrl.pathname === "/robots.txt";

      const isSiteUsage = nextUrl.pathname === "/login/site-usage";
      const isLoggedIn = Boolean(auth?.user);
      const isOnRoot = nextUrl.pathname === "/";
      const isOnFeed = nextUrl.pathname === "/feed";
      const isOnRegistration = nextUrl.pathname === "/login/registration";
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const shouldRedirectDashboard = ["/dashboard"].includes(nextUrl.pathname);
      const shouldRedirectCreateMyRoute = [
        "/dashboard/my-routes/create",
      ].includes(nextUrl.pathname);

      if (isOnRoot || (isOnFeed && !isLoggedIn) || isSEO || isSiteUsage) {
        return true;
      }

      if (isLoggedIn) {
        if (isOnRegistration) {
          return true;
        }

        if (isOnDashboard) {
          if (shouldRedirectDashboard) {
            return Response.redirect(new URL(DEFAULT_REDIRECT_URL, nextUrl));
          }

          if (shouldRedirectCreateMyRoute) {
            return Response.redirect(
              new URL("/dashboard/my-routes/create/prepare", nextUrl),
            );
          }

          if (auth?.user?.is_admin) {
            return [...PUBLIC_ROUTES, ...ADMIN_ROUTES].some((route) =>
              nextUrl.pathname.startsWith(route),
            );
          }

          return [...PUBLIC_ROUTES].some((route) =>
            nextUrl.pathname.startsWith(route),
          );
        }

        return Response.redirect(new URL(DEFAULT_REDIRECT_URL, nextUrl));
      }
      return false;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
