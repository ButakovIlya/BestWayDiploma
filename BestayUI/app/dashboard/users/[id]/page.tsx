"use client";

import { getUser } from "@/app/lib/api/admin/users";
import { UserDTO } from "@/app/types/entities";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import detailStyles from "../../lib/styles/admin-detail.module.css";
import { Check, X } from "lucide-react";
import { BackendImage } from "@/app/components/backend-image";
import DashboardHeader from "../../components/dashboard-header/dashboard-header";
import { Skeleton } from "@/app/components/ui/skeleton";
import { ViewField } from "@/app/types/view-field";
import { ViewFields } from "@/app/components/view-fields";
import { useAppStore } from "@/app/_store/app-store";
import { SidebarPages } from "../../types/sidebar-pages";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserDTO | null>(null);
  const setCurrentPage = useAppStore((state) => state.ui.setCurrentPage);

  useEffect(() => {
    setCurrentPage(SidebarPages.Users);
    getUser(Number(id)).then((data) => setUser(data));
  }, [id, setCurrentPage]);

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

  const fullName = [user?.last_name, user?.first_name, user?.middle_name]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={detailStyles.detail}>
      <DashboardHeader
        badge="Админ"
        title={fullName || "Пользователь"}
        subtitle="Карточка пользователя с основными параметрами доступа."
        backHref="/dashboard/users"
      />
      <div className={detailStyles["detail__card"]}>
        <div className={detailStyles["detail__media"]}>
          {user?.photo ? (
            <div className="relative h-[280px] w-full max-w-[360px] overflow-hidden rounded-[24px] border border-[#00609614]">
              <BackendImage
                className="object-cover"
                fill
                src={user.photo}
                alt="Фото пользователя"
              />
            </div>
          ) : (
            <Skeleton className="h-[280px] w-full max-w-[360px] rounded-[24px]" />
          )}
        </div>
        <div className={detailStyles["detail__fields"]}>
          <ViewFields fields={fields} />
        </div>
      </div>
    </div>
  );
}
