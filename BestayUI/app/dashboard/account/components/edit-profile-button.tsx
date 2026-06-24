"use client";
import { useAppStore } from "@/app/_store/app-store";
import { Button } from "@/app/components/ui/button";
import { Edit } from "lucide-react";

export function EditProfileButton() {
  const {
    ui: { setIsRecordModalOpened },
  } = useAppStore((state) => state);

  return (
    <Button variant="outline" onClick={() => setIsRecordModalOpened(true)}>
      <Edit />
      Редактировать
    </Button>
  );
}
