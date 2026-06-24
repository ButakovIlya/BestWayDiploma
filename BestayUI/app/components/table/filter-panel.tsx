"use client";

import { Column } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { FilterConfig } from "@/app/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useIsMobile } from "@/app/hooks/use-mobile";
import { useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { CheckIcon, ChevronsUpDownIcon, ListFilter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/app/lib/utils";

interface FilterPanelProps<TData> {
  filterColumns: FilterConfig[];
  getColumn: (columnId: string) => Column<TData, unknown> | undefined;
}

export function FilterPanel<TData>(props: FilterPanelProps<TData>) {
  const { filterColumns, getColumn } = props;
  const isMobile = useIsMobile();

  const filters = useMemo(() => {
    return filterColumns.map(({ name, type, placeholder, options }) => {
      switch (type) {
        case "select":
          return (
            <Select
              key={name}
              onValueChange={(value) => getColumn(name)?.setFilterValue(value)}
              value={(getColumn(name)?.getFilterValue() as string) ?? ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите вариант" />
              </SelectTrigger>
              <SelectContent>
                <Button
                  className="w-full mb-2"
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    getColumn(name)?.setFilterValue(undefined);
                  }}
                >
                  Очистить
                </Button>
                <SelectGroup>
                  {options?.length &&
                    options.map((option) =>
                      typeof option === "string" ? (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ) : null,
                    )}
                </SelectGroup>
              </SelectContent>
            </Select>
          );
        case "combobox-with-search":
          const value = getColumn(name)?.getFilterValue() as string;
          const valueFromOptions = options?.find((option) => option === value);
          const displayedValue = value ? valueFromOptions : placeholder;

          return (
            <Popover key={name} modal>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox">
                  {displayedValue as string}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Поиск" />
                  <CommandList>
                    <CommandEmpty>Не найдено.</CommandEmpty>
                    <CommandGroup>
                      {options?.map((option) => (
                        <CommandItem
                          key={option as string}
                          value={option as string}
                          onSelect={(currentValue) => {
                            getColumn(name)?.setFilterValue(
                              currentValue === value ? "" : currentValue,
                            );
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === option ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {option as string}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          );
        default:
          return (
            <Input
              key={name}
              placeholder={placeholder}
              value={(getColumn(name)?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                getColumn(name)?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          );
      }
    });
  }, [filterColumns]);

  return isMobile ? (
    <>
      <Sheet>
        <SheetTrigger className="flex items-center pb-4 gap-2">
          <ListFilter />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Фильтр</SheetTitle>
            <SheetDescription className="flex flex-col gap-4">
              {filters}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  ) : (
    <div className="flex items-center pb-4 gap-2">{filters}</div>
  );
}
