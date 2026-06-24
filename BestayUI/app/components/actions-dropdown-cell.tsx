import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import { Actions } from "../types";

interface ActionsDropdownCellProps<T> {
  row: Row<T>;
  actions: Actions<T>[];
}

export function ActionsDropdownCell<T>(props: ActionsDropdownCellProps<T>) {
  const { row, actions } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Открыть меню</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action) => {
          const { name, onClick, disabled, title, icon } = action;
          return (
            <DropdownMenuItem
              key={`${name}_${row.id}`}
              onClick={() => {
                onClick(row);
              }}
              disabled={
                typeof disabled === "boolean"
                  ? disabled
                  : disabled && disabled(row)
              }
            >
              <div className="flex flex-row gap-2 items-center w-full justify-between">
                {typeof title === "string" ? title : title(row)}
                {icon}
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
