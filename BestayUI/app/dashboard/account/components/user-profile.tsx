"use client";

import { getProfile } from "@/app/lib/api/public/profile";
import { useEffect } from "react";

import styles from "../page.module.css";
import { mapUserProfileFromDTO } from "../lib/map-user-profile-from-dto";
import { ViewField } from "@/app/types/view-field";
import { ViewFields } from "@/app/components/view-fields";
import { useAppStore } from "@/app/_store/app-store";
import dayjs from "dayjs";
import { SidebarPages } from "../../types/sidebar-pages";

export function UserProfile() {
  const {
    account: { setUser, user },
    ui: { setCurrentPage },
  } = useAppStore((state) => state);

  useEffect(() => {
    setCurrentPage(SidebarPages.Account);

    getProfile().then((data) => {
      const profile = mapUserProfileFromDTO(data);
      setUser(profile);
    });
  }, []);

  const fields: ViewField[] = [
    {
      title: "ФИО",
      value: user
        ? `${user?.lastName ?? ""} ${user?.firstName ?? ""} ${user?.middleName ?? ""}`
        : undefined,
    },
    { title: "Номер телефона", value: user?.phone },
    {
      title: "Дата регистрации",
      value: dayjs(user?.registrationDate).format("DD.MM.YYYY"),
    },
    { title: "Дата рождения", value: user?.birthday },
    { title: "Пол", value: user?.gender },
  ];

  return (
    <div className={styles["user__info"]}>
      <ViewFields fields={fields} />
    </div>
  );
}
