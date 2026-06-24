"use client";

import { getUser } from "@/app/lib/api/admin/users";
import { UserDTO } from "@/app/types/entities";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { correctUrl } from "@/app/lib/correct-url";
import DashboardHeader from "../../components/dashboard-header/dashboard-header";
import { Skeleton } from "@/app/components/ui/skeleton";
import { ViewField } from "@/app/types/view-field";
import { ViewFields } from "@/app/components/view-fields";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserDTO | null>(null);

  useEffect(() => {
    getUser(Number(id)).then((data) => setUser(data));
  }, []);

  const fields: ViewField[] = [
    { title: "Номер телефона", value: user?.phone },
    {
      title: "Администратор",
      value: user ? user.is_admin ? <Check /> : <X /> : undefined,
    },
    {
      title: "Заблокирован",
      value: user ? user.is_banned ? <Check /> : <X /> : undefined,
    },
  ];

  return (
    <>
      <DashboardHeader
        title={`${user?.last_name ?? ""} ${user?.first_name ?? ""} ${user?.middle_name ?? ""}`}
      />
      <div className={styles["page__content"]}>
        {user?.photo ? (
          <div className="relative w-[350px] h-[250px]">
            <Image
              className="object-cover"
              fill
              src={correctUrl(user.photo)}
              alt="Фото"
            />
          </div>
        ) : (
          <Skeleton className="w-[300px] h-[300px]" />
        )}
        <div className={styles["content__fields"]}>
          <ViewFields fields={fields} />
        </div>
      </div>
    </>
  );
}
