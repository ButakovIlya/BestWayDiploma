"use client";
import { useAppStore } from "@/app/_store/app-store";
import { DataTable } from "@/app/components/table/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { columns } from "../lib/columns";
import { useTable } from "@/app/hooks/use-table";
import { useEffect } from "react";
import { Actions } from "@/app/types";
import { getMyRoutes } from "@/app/lib/api/public/routes";
import { RouteRead } from "@/app/types/entities";

export function ChooseFromMyRoutesModal() {
  const { feedState, publicMyRoutes, ui } = useAppStore((store) => store);
  const { pagination, rowCount, setPagination, setRowCount } = useTable();

  const {
    myPublicRoutes,
    setMyPublicRoutes,
    setPagination: setMyPublicRoutesPagination,
    setRowCount: setMyPublicRoutesRowCount,
  } = publicMyRoutes;
  const {
    isAddModalOpened,
    isTableDataLoading,
    setIsAddModalOpened,
    setIsTableDataLoading,
  } = ui;

  const { currentRouteIdForPost, setCurrentRouteIdForPost } = feedState;

  const updatePlaces = () => {
    setIsTableDataLoading(true);

    getMyRoutes(pagination).then((data) => {
      const { data: routes, count } = data;

      setMyPublicRoutes(routes);
      setRowCount(count);

      setMyPublicRoutesPagination(pagination);
      setMyPublicRoutesRowCount(count);

      setIsTableDataLoading(false);
    });
  };

  const actions: Actions<RouteRead>[] = [
    {
      name: "choose",
      title: "Выбрать",
      onClick: (myRoute) => {
        const { id, name } = myRoute.original;
        setCurrentRouteIdForPost({ id, name });
        setIsAddModalOpened(false);
      },
      disabled: (row) => currentRouteIdForPost?.id === row.original.id,
    },
  ];

  useEffect(() => {
    updatePlaces();
  }, [pagination]);

  return (
    <Dialog open={isAddModalOpened} onOpenChange={setIsAddModalOpened}>
      <DialogContent
        className="flex flex-col sm:max-w-[90%] h-[90%] overflow-auto"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Выбор моего маршрута</DialogTitle>
        </DialogHeader>
        <DataTable
          columns={columns}
          data={myPublicRoutes}
          actions={actions}
          dataLoading={isTableDataLoading}
          pagination={pagination}
          handleChangePagination={setPagination}
          rowCount={rowCount}
        />
      </DialogContent>
    </Dialog>
  );
}
