"use client";

import { Button } from "@/app/components/ui/button";
import { logout } from "@/app/lib/auth/auth-service";
import { LogOut } from "lucide-react";

export function Logout() {
  return (
    <Button variant="destructive" onClick={logout}>
      <LogOut />
      Выйти из аккаунта
    </Button>
  );
}
