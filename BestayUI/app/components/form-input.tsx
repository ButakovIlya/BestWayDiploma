import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { ControllerRenderProps } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { BaseOption, Option, Type } from "../types/form";
import { DropdownMenuCheckboxes } from "./combobox";
import { Switch } from "./ui/switch";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { DatePicker } from "./date-picker";
import { Button } from "./ui/button";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ChevronsUpDownIcon, CheckIcon } from "lucide-react";
import { cn } from "../lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

export default function FormInput(props: {
  field: ControllerRenderProps;
  title?: string;
  type?: Type;
  disabled?: boolean;
  options?: Option[];
  tip?: string;
  maxLength?: number;
  style?: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);

  const { type, title, field, options, disabled, maxLength, style } = props;

  const renderField = () => {
    switch (type) {
      case "multiple-combobox":
        return (
          <DropdownMenuCheckboxes
            onChange={(val) => field.onChange(val)}
            options={options as BaseOption[]}
            value={field.value}
          />
        );
      case "select":
        return (
          <Select
            onValueChange={(val) => field.onChange(val)}
            value={field.value}
            disabled={disabled}
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
                  field.onChange(null);
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
      case "file":
        return <Input {...field} type="file" />;
      case "boolean":
        return (
          <Switch checked={field.value} onCheckedChange={field.onChange} />
        );
      case "number":
        return (
          <Input
            {...field}
            onChange={(event) => field.onChange(Number(event.target.value))}
            type="number"
            disabled={disabled}
          />
        );
      case "radio":
        return (
          <RadioGroup defaultValue={field.value} onValueChange={field.onChange}>
            {options?.length
              ? options.map((option) =>
                  typeof option === "object" ? (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={String(option.value)}
                        id="option-one"
                      />
                      <Label htmlFor={String(option.value)}>
                        {option.label}
                      </Label>
                    </div>
                  ) : null,
                )
              : null}
          </RadioGroup>
        );
      case "textarea":
        return (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Textarea
              {...field}
              style={{ ...style, resize: "none" }}
              maxLength={maxLength ?? 9999}
              rows={4}
            />
            {maxLength && (
              <p className="text-sm text-muted-foreground mt-2">
                {field.value.length} / {maxLength} символов
              </p>
            )}
          </div>
        );
      case "date":
        return <DatePicker value={field.value} onChange={field.onChange} />;
      case "combobox-with-search":
        const valueFromOptions = options?.find(
          (option) => option === field.value,
        );
        const displayedValue = field.value
          ? valueFromOptions
          : "Выберите вариант";

        return (
          <Popover open={open} onOpenChange={setOpen} modal>
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
                          field.onChange(
                            currentValue === field.value ? "" : currentValue,
                          );
                          setOpen(false);
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === option
                              ? "opacity-100"
                              : "opacity-0",
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
        return <Input {...field} className="bg-white" disabled={disabled} />;
    }
  };

  return (
    <FormItem>
      {title ? <FormLabel>{title}</FormLabel> : null}
      <FormControl>{renderField()}</FormControl>
      <FormMessage />
    </FormItem>
  );
}
