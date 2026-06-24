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
import { getPublicPlaces } from "@/app/lib/api/public/places";
import { useTable } from "@/app/hooks/use-table";
import { mapPlaceFromDTO } from "@/app/dashboard/places/lib/map-place-from-dto";
import { useEffect } from "react";
import { Actions, FilterConfig } from "@/app/types";
import { Place } from "@/app/dashboard/types";
import { useDebounce } from "use-debounce";
import { ALLOWED_PLACE_CATEGORIES } from "@/app/lib/constants/place-categories";
import { ALLOWED_PLACE_TYPES } from "@/app/lib/constants/place-types";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "@/app/lib/constants/pagination";
import { addRoutePlace, getMyRoute } from "@/app/lib/api/public/routes";

export function ChooseFromPlacesModal() {
  const {
    publicPlaces,
    myRouteState: { myRoute, setMyRoute },
    ui,
  } = useAppStore((store) => store);
  const {
    pagination,
    rowCount,
    columnFilters,
    setColumnFilters,
    setPagination,
    setRowCount,
  } = useTable();

  const {
    places,
    setPlaces,
    setPagination: setPlacesPagination,
    setRowCount: setPlacesRowCount,
  } = publicPlaces;
  const {
    isAddModalOpened,
    isTableDataLoading,
    setIsAddModalOpened,
    setIsTableDataLoading,
  } = ui;

  const [debouncedFilters] = useDebounce(columnFilters, 1000);

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

    getPublicPlaces(pagination, mappedFilter).then((data) => {
      const { data: places, count } = data;
      const mappedPlaces = places.map(mapPlaceFromDTO);

      setPlaces(mappedPlaces);
      setRowCount(count);

      setPlacesPagination(pagination);
      setPlacesRowCount(count);

      setIsTableDataLoading(false);
    });
  };

  const chosenCustomPlacesIds = (myRoute?.places ?? []).map(
    ({ place }) => place.id,
  );

  const actions: Actions<Place>[] = [
    {
      name: "choose",
      title: "Выбрать",
      onClick(row) {
        addRoutePlace(myRoute?.id ?? -1, row.original.id).then(() => {
          getMyRoute(myRoute?.id ?? -1).then((data) => {
            setMyRoute(data);
            setIsAddModalOpened(false);
          });
        });
      },
      disabled: (row) => chosenCustomPlacesIds.includes(row.original.id),
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
      options: ALLOWED_PLACE_CATEGORIES,
      type: "combobox-with-search",
      placeholder: "Категория",
    },
    {
      name: "type",
      queryParamName: "types",
      options: ALLOWED_PLACE_TYPES,
      type: "combobox-with-search",
      placeholder: "Тип",
    },
  ];

  useEffect(() => {
    updatePlaces();
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
    <Dialog open={isAddModalOpened} onOpenChange={setIsAddModalOpened}>
      <DialogContent className="flex flex-col sm:max-w-[90%] h-[90%] overflow-auto">
        <DialogHeader>
          <DialogTitle>Выбор места из списка</DialogTitle>
        </DialogHeader>
        <DataTable
          columns={columns}
          data={places}
          actions={actions}
          dataLoading={isTableDataLoading}
          pagination={pagination}
          columnFilters={columnFilters}
          filterConfig={filterConfig}
          handleChangeFilters={setColumnFilters}
          handleChangePagination={setPagination}
          rowCount={rowCount}
        />
      </DialogContent>
    </Dialog>
  );
}
