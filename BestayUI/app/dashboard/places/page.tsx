"use client";
import { DataTable } from "@/app/components/table/data-table";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { columns } from "./lib/constants/columns";
import DashboardHeader from "../components/dashboard-header/dashboard-header";
import { Button } from "@/app/components/ui/button";
import { PlacesRecordModal } from "./components/place-record-modal";
import { mapPlaceFromDTO } from "./lib/map-place-from-dto";
import { getPlaces, removePlace } from "@/app/lib/api/admin/places";
import { ArchiveRestore, Edit, Eye, Plus, Trash2 } from "lucide-react";
import { Actions, FilterConfig } from "@/app/types";
import { ConfirmModal } from "@/app/components/confirm-modal";
import { useRouter } from "next/navigation";
import { Place } from "@/app/dashboard/types";
import { useAppStore } from "@/app/_store/app-store";
import { useTable } from "@/app/hooks/use-table";
import { useDebounce } from "use-debounce";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "@/app/lib/constants/pagination";
import { SidebarPages } from "../types/sidebar-pages";
import { ALLOWED_PLACE_CATEGORIES } from "@/app/lib/constants/place-categories";
import { ALLOWED_PLACE_TYPES } from "@/app/lib/constants/place-types";

export default function Page() {
  const router = useRouter();
  const { placesState, ui } = useAppStore((state) => state);
  const {
    pagination,
    rowCount,
    columnFilters,
    setColumnFilters,
    setPagination,
    setRowCount,
  } = useTable();

  const [modalEditProps, setModalEditProps] = useState<{
    mode: string;
    place?: Place;
  }>({ mode: "new" });

  const [modalRemoveProps, setModalRemoveProps] = useState<{
    name: string;
    id: number;
  }>({ name: "", id: 0 });

  const [debouncedFilters] = useDebounce(columnFilters, 1000);

  const {
    places,
    setPlaces,
    setPagination: setPlacesPagination,
    setRowCount: setPlacesRowCount,
  } = placesState;
  const {
    isRemoveModalOpened,
    isTableDataLoading,
    setIsTableDataLoading,
    setIsRecordModalOpened,
    setIsRemoveModalOpened,
    setCurrentPage,
  } = ui;

  const updatePlaces = () => {
    setIsTableDataLoading(true);

    const mappedFilter = debouncedFilters.map((filter) => {
      const initialFilterIndex = filterConfig.findIndex(
        (columnFilter) => columnFilter.name === filter.id,
      );
      const paramName =
        filterConfig[initialFilterIndex].queryParamName ??
        filterConfig[initialFilterIndex].name;

      return { id: paramName, value: filter.value };
    });

    getPlaces(pagination, mappedFilter).then((data) => {
      const { data: places, count } = data;
      const mappedPlaces = places.map(mapPlaceFromDTO);

      setPlaces(mappedPlaces);
      setRowCount(count);

      setPlacesPagination(pagination);
      setPlacesRowCount(count);

      setIsTableDataLoading(false);
    });
  };

  const actions: Actions<Place>[] = [
    {
      name: "profile",
      title: "Открыть",
      icon: <Eye />,
      onClick(row) {
        router.push(`/dashboard/places/${row.original.id}`);
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
          place: {
            id: row.original.id,
            name: row.original.name,
            description: row.original.description,
            category: row.original.category,
            city: row.original.city,
            type: row.original.type,
            coordinates: row.original.coordinates,
            website_url: row.original.website_url,
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
    {
      name: "archive",
      title: "Архивировать",
      icon: <ArchiveRestore />,
      onClick(row) {
        console.log(row);
      },
    },
  ];

  const filterConfig: FilterConfig[] = [
    {
      name: "name",
      type: "string",
      placeholder: "Имя...",
    },
    {
      name: "category",
      queryParamName: "categories",
      type: "combobox-with-search",
      options: ALLOWED_PLACE_CATEGORIES,
      placeholder: "Категория",
    },
    {
      name: "type",
      queryParamName: "types",
      type: "combobox-with-search",
      options: ALLOWED_PLACE_TYPES,
      placeholder: "Тип",
    },
  ];

  useEffect(() => {
    setCurrentPage(SidebarPages.Places);
  }, []);

  useEffect(() => {
    updatePlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  useEffect(() => {
    setPagination({
      pageIndex: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
    });
    updatePlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilters]);

  return (
    <div className={styles.page}>
      <DashboardHeader
        title="База знаний мест"
        rightChild={
          <Button
            onClick={() => {
              setModalEditProps({ mode: "new" });
              setIsRecordModalOpened(true);
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
        data={places}
        dataLoading={isTableDataLoading}
        actions={actions}
        pagination={pagination}
        rowCount={rowCount}
        columnFilters={columnFilters}
        filterConfig={filterConfig}
        handleChangeFilters={setColumnFilters}
        handleChangePagination={setPagination}
      />
      <PlacesRecordModal
        mode={modalEditProps.mode}
        place={modalEditProps.place}
      />
      <ConfirmModal
        title={`Вы действительно хотите удалить запись ${modalRemoveProps.name}?`}
        description={
          "Это действие нельзя отменить. Данные будут удалены безвозвратно."
        }
        onConfirm={() => {
          removePlace(modalRemoveProps.id).then(() => {
            updatePlaces();
          });
        }}
        open={isRemoveModalOpened}
        onOpen={setIsRemoveModalOpened}
      />
    </div>
  );
}
