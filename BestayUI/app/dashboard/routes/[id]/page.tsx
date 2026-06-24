"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getRoute } from "@/app/lib/api/admin/routes";
import { DataTable } from "@/app/components/table/data-table";
import { Route } from "../../types";

import detailStyles from "../../lib/styles/admin-detail.module.css";
import { columns } from "./lib/constants/columns";
import DashboardHeader from "../../components/dashboard-header/dashboard-header";
import { RouteFields } from "./components/route-fields";
import { useAppStore } from "@/app/_store/app-store";
import { SidebarPages } from "../../types/sidebar-pages";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [route, setRoute] = useState<Route | null>(null);
  const setCurrentPage = useAppStore((state) => state.ui.setCurrentPage);

  useEffect(() => {
    setCurrentPage(SidebarPages.Routes);
    getRoute(Number(id)).then((data) => {
      setRoute(data);
    });
  }, [id, setCurrentPage]);

  return (
    <div className={detailStyles.detail}>
      <DashboardHeader
        badge="Админ"
        title={route?.name ?? "Маршрут"}
        subtitle="Состав маршрута и связанные точки."
        backHref="/dashboard/routes"
      />
      <div className={detailStyles["detail__card"]}>
        <div className={detailStyles["detail__fields"]}>
          <RouteFields route={route} />
        </div>
      </div>
      <div className={detailStyles["detail__section"]}>
        <h2 className={detailStyles["detail__section-title"]}>Точки маршрута</h2>
        <DataTable columns={columns} data={route?.places ?? []} />
      </div>
    </div>
  );
}
