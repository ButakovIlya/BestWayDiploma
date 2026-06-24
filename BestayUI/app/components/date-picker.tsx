"use client";

import * as React from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { ru } from "date-fns/locale";

interface DatePickerProps {
  value: Date;
  onChange: (_: Date | undefined) => void;
}

export function DatePicker(props: DatePickerProps) {
  const { value, onChange } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!value}
          className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal w-full"
        >
          <CalendarIcon />
          {value ? (
            format(value, "PPP", { locale: ru })
          ) : (
            <span>Выберите дату</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={value}
          onSelect={(value) => {
            onChange(value);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
