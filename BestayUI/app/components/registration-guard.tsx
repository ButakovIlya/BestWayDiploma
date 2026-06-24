"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/loader";
import { isAuthenticated } from "@/app/lib/auth/token-storage";

interface RegistrationGuardProps {
  children: React.ReactNode;
}

export function RegistrationGuard({ children }: RegistrationGuardProps) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }

    setIsReady(true);
  }, [router]);

  if (!isReady) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return children;
}
