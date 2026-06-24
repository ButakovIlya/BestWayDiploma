"use client";

import { useAppStore } from "@/app/_store/app-store";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { useState } from "react";

export function AddPlaceMenu() {
  const { ui } = useAppStore((state) => state);
  const { setIsAddModalOpened } = ui;
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Plus />
          Добавить место
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            setOpen(false);
            setIsAddModalOpened(true);
          }}
        >
          Из списка
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
