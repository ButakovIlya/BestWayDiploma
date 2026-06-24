"use client";

import * as React from "react";

import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { BaseOption } from "../types/form";

interface DropdownMenuCheckboxesProps {
  options: BaseOption[];
  onChange: (_: BaseOption[]) => void;
  value?: BaseOption[];
}

export function DropdownMenuCheckboxes(props: DropdownMenuCheckboxesProps) {
  const { options, onChange, value } = props;
  const [selected, setSelected] = React.useState<BaseOption[]>(value || []);
  const selectedDisplay =
    React.useMemo(() => {
      return selected.map((item) => item.label).join(", ");
    }, [selected]) || "Выбрать";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{selectedDisplay}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {options.map(({ value: optionValue, label }) => (
          <DropdownMenuCheckboxItem
            key={optionValue}
            checked={!!selected.find((item) => item.value === optionValue)}
            onCheckedChange={(checked) => {
              if (checked) {
                onChange([...selected, { value: optionValue, label }]);
                setSelected((prev) => [...prev, { value: optionValue, label }]);
              } else {
                onChange([
                  ...selected.filter((item) => item.value !== optionValue),
                ]);
                setSelected((prev) => [
                  ...prev.filter((item) => item.value !== optionValue),
                ]);
              }
            }}
          >
            {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
