"use client";

import { useIsMobile } from "@/app/hooks/use-mobile";

import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import RegistrationForm from "./components/registration-form";
import {
  checkIsUserFioFilled,
  checkIsUserRegistrated,
} from "@/app/lib/is-new-user";
import { useAppStore } from "@/app/_store/app-store";
import { mapUserProfileFromDTO } from "@/app/dashboard/account/lib/map-user-profile-from-dto";
import { getProfile } from "@/app/lib/api/public/profile";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/loader";
import { RegistrationGuard } from "@/app/components/registration-guard";

export default function Page() {
  const isMobile = useIsMobile();
  const {
    account: { setUser },
  } = useAppStore((state) => state);
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    getProfile().then((data) => {
      const profile = mapUserProfileFromDTO(data);
      setUser(profile);

      if (
        !checkIsUserRegistrated(profile.registrationDate) ||
        checkIsUserFioFilled(profile)
      ) {
        router.push("/dashboard/my-routes");
        return;
      }

      setIsNewUser(true);
    });
  }, []);

  if (typeof isNewUser !== "boolean") {
    return (
      <div className="h-full w-full  flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <RegistrationGuard>
      <div
        className={clsx(
          styles["form__centered"],
          !isMobile && styles["form__desktop"],
        )}
      >
        <RegistrationForm />
      </div>
    </RegistrationGuard>
  );
}
