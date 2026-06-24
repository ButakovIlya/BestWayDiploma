"use client";

import { Button } from "@/app/components/ui/button";
import DashboardHeader from "../components/dashboard-header/dashboard-header";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { DataTable } from "@/app/components/table/data-table";
import { useEffect, useState } from "react";
import { getMyRoutes, removeMyRoute } from "@/app/lib/api/public/routes";
import { columns } from "./lib/columns";
import { useAppStore } from "@/app/_store/app-store";
import { Actions } from "@/app/types";
import { RouteRead } from "@/app/types/entities";
import { ConfirmModal } from "@/app/components/confirm-modal";
import { SidebarPages } from "../types/sidebar-pages";

export default function Page() {
  const router = useRouter();

  const {
    myRoutesState: { myRoutes, setMyRoutes },
    ui: { setIsRemoveModalOpened, isRemoveModalOpened, setCurrentPage },
  } = useAppStore((state) => state);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [rowCount, setRowCount] = useState(0);

  const [modalRemoveProps, setModalRemoveProps] = useState<{
    name: string;
    id: number;
  }>({ name: "", id: 0 });

  useEffect(() => {
    setCurrentPage(SidebarPages.MyRoutes);
  }, []);

  useEffect(() => {
    getMyRoutes(pagination).then((data) => {
      const { data: dataRoutes, count } = data;
      setRowCount(count);
      setMyRoutes(dataRoutes);
    });
  }, [pagination]);

  const actions: Actions<RouteRead>[] = [
    {
      name: "open",
      title: "Открыть",
      icon: <Eye />,
      onClick(row) {
        router.push(`/dashboard/my-routes/${row.original.id}`);
      },
    },
    {
      name: "edit",
      title: "Редактировать",
      icon: <Edit />,
      onClick(row) {
        router.push(`/dashboard/my-routes/${row.original.id}/edit`);
      },
    },
    {
      name: "remove",
      title: "Удалить",
      icon: <Trash2 />,
      onClick(row) {
        setIsRemoveModalOpened(true);
        setModalRemoveProps({
          name: row.original.name,
          id: row.original.id,
        });
      },
    },
  ];

  return (
    <div className={styles.page}>
      <DashboardHeader
        title="Мои маршруты"
        rightChild={
          <Button
            onClick={() => {
              router.push("/dashboard/my-routes/create/prepare");
            }}
          >
            <Plus />
            Создать новый маршрут
          </Button>
        }
      />
      <DataTable
        containerClassname={styles["table-container"]}
        columns={columns}
        data={myRoutes}
        actions={actions}
        pagination={pagination}
        handleChangePagination={setPagination}
        rowCount={rowCount}
      />
      <ConfirmModal
        title={`Вы действительно хотите удалить запись ${modalRemoveProps.name}?`}
        description={
          "Это действие нельзя отменить. Данные будут удалены безвозвратно."
        }
        onConfirm={() => {
          removeMyRoute(modalRemoveProps.id).then(() => {
            getMyRoutes(pagination).then((data) => {
              const { data: dataRoutes } = data;
              setMyRoutes(dataRoutes);
            });
          });
        }}
        open={isRemoveModalOpened}
        onOpen={setIsRemoveModalOpened}
      />
    </div>
  );
}
