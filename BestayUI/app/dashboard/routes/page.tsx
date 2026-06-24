"use client";
import { Button } from "@/app/components/ui/button";
import DashboardHeader from "../components/dashboard-header/dashboard-header";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Route } from "./types";
import { DataTable } from "@/app/components/table/data-table";
import { columns } from "./lib/constants/columns";
import { getRoutes, removeRoute } from "@/app/lib/api/admin/routes";
import { mapRouteFromDTO } from "./lib/map-route-from-dto";
import { Actions } from "@/app/types";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { ConfirmModal } from "@/app/components/confirm-modal";
import { RouteRecordModal } from "./components/route-record-modal";
import { getPlaces } from "@/app/lib/api/admin/places";
import { mapPlaceFromDTO } from "../places/lib/map-place-from-dto";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/app/_store/app-store";
import { useTable } from "@/app/hooks/use-table";
import { SidebarPages } from "../types/sidebar-pages";

export default function Page() {
  const router = useRouter();
  const { routesState, placesState, ui } = useAppStore((state) => state);
  const { pagination, rowCount, setPagination, setRowCount } = useTable();

  const [modalEditProps, setModalEditProps] = useState<{
    mode: string;
    route?: Route;
  }>({ mode: "new" });

  const [modalRemoveProps, setModalRemoveProps] = useState<{
    name: string;
    id: number;
  }>({ name: "", id: 0 });

  const { setPlaces, pagination: placePagination } = placesState;
  const {
    setRoutes,
    routes,
    setPagination: setRoutesPagination,
    setRowCount: setRoutesRowCount,
  } = routesState;
  const {
    isRecordModalOpened,
    isRemoveModalOpened,
    setIsRecordModalOpened,
    setIsRemoveModalOpened,
    setCurrentPage,
  } = ui;

  const updateRoutes = () => {
    getRoutes(pagination).then((data) => {
      const { data: routes, count } = data;
      const mappedPlaces = routes.map(mapRouteFromDTO);

      setRoutes(mappedPlaces);
      setRowCount(count);

      setRoutesPagination(pagination);
      setRoutesRowCount(count);
    });
  };

  const updatePlaces = () => {
    getPlaces(placePagination).then((data) => {
      // другая логика выбора?
      const { data: places } = data;
      const mappedPlaces = places.map(mapPlaceFromDTO);

      setPlaces(mappedPlaces);
    });
  };

  const actions: Actions<Route>[] = [
    {
      name: "open",
      title: "Открыть",
      icon: <Eye />,
      onClick(row) {
        router.push(`/dashboard/routes/${row.original.id}`);
      },
    },
    {
      name: "edit",
      title: "Редактировать",
      icon: <Edit />,
      onClick(row) {
        setIsRecordModalOpened(true);
        setModalEditProps({
          mode: "edit",
          route: {
            id: row.original.id,
            name: row.original.name,
            city: row.original.city,
          },
        });
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

  useEffect(() => {
    setCurrentPage(SidebarPages.Routes);
  }, []);

  useEffect(() => {
    updateRoutes();
    updatePlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  return (
    <div className={styles.page}>
      <DashboardHeader
        title="База знаний маршрутов"
        rightChild={
          <Button
            onClick={() => {
              setModalEditProps({ mode: "new" });
              setIsRecordModalOpened(!isRecordModalOpened);
            }}
          >
            <Plus />
            Создать запись
          </Button>
        }
      />
      <DataTable
        containerClassname={styles["table-container"]}
        columns={columns}
        data={routes}
        actions={actions}
        pagination={pagination}
        handleChangePagination={setPagination}
        rowCount={rowCount}
      />
      <RouteRecordModal
        mode={modalEditProps.mode}
        route={modalEditProps.route}
      />
      <ConfirmModal
        title={`Вы действительно хотите удалить запись ${modalRemoveProps.name}?`}
        description={
          "Это действие нельзя отменить. Данные будут удалены безвозвратно."
        }
        onConfirm={() => {
          removeRoute(modalRemoveProps.id).then(() => {
            updateRoutes();
          });
        }}
        open={isRemoveModalOpened}
        onOpen={setIsRemoveModalOpened}
      />
    </div>
  );
}
