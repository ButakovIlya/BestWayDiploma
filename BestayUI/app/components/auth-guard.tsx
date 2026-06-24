"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/app/components/loader";
import { ADMIN_ROUTES } from "@/app/lib/auth/admin-routes";
import { PUBLIC_ROUTES } from "@/app/lib/auth/public-routes";
import { getIsAdmin, isAuthenticated } from "@/app/lib/auth/token-storage";

const DEFAULT_REDIRECT_URL = "/dashboard/feed";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    const isAdmin = getIsAdmin();
    const allowedRoutes = isAdmin
      ? [...PUBLIC_ROUTES, ...ADMIN_ROUTES]
      : PUBLIC_ROUTES;

    if (pathname === "/dashboard") {
      router.replace(DEFAULT_REDIRECT_URL);
      return;
    }

    if (pathname === "/dashboard/my-routes/create") {
      router.replace("/dashboard/my-routes/create/prepare");
      return;
    }

    if (
      pathname.startsWith("/dashboard") &&
      !allowedRoutes.some((route) => pathname.startsWith(route))
    ) {
      router.replace(DEFAULT_REDIRECT_URL);
      return;
    }

    setIsReady(true);
  }, [pathname, router]);

  if (!isReady) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return children;
}
