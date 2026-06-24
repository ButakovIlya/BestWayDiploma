import { Bell, CircleCheck, CircleX } from "lucide-react";
import { ReactNode } from "react";
import { toast } from "sonner";

export const successToast = () =>
  toast("Успешно", {
    description: "Изменения успешно сохранены",
    icon: <CircleCheck color="green" />,
    style: { display: "flex", gap: "12px" },
    duration: 5000,
  });

export const errorToast = (message: string) =>
  toast("Произошла ошибка", {
    description: message,
    icon: <CircleX color="red" />,
    style: { display: "flex", gap: "12px" },
    duration: 5000,
  });

export const notifyToast = (title: string, message: string | ReactNode) =>
  toast(title, {
    description: message,
    icon: <Bell color="gold" />,
    style: { display: "flex", gap: "12px" },
    duration: 5000,
  });
