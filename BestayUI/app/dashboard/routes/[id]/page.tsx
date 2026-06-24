"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getRoute } from "@/app/lib/api/admin/routes";
import { DataTable } from "@/app/components/table/data-table";
import { Route } from "../../types";

import styles from "./page.module.css";
import { columns } from "./lib/constants/columns";
import DashboardHeader from "../../components/dashboard-header/dashboard-header";
import { RouteFields } from "./components/route-fields";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [route, setRoute] = useState<Route | null>(null);

  useEffect(() => {
    getRoute(Number(id)).then((data) => {
      setRoute(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles["page"]}>
      <DashboardHeader title={route?.name ?? ""} />
      <div className={styles["page__content"]}>
        <div className={styles["content__fields"]}>
          <RouteFields route={route} />
        </div>
        <DataTable columns={columns} data={route?.places ?? []} />
      </div>
    </div>
  );
}
