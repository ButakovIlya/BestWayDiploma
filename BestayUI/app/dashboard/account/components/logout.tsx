import { Button } from "@/app/components/ui/button";
import { signOut } from "@/auth";
import { LogOut } from "lucide-react";

export async function Logout() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button variant="destructive">
        <LogOut />
        Выйти из аккаунта
      </Button>
    </form>
  );
}
