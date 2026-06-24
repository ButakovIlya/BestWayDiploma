import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

interface AlertModalProps {
  open: boolean;
  setOpen: (_: boolean) => void;
}

export function AlertModal(props: AlertModalProps) {
  const { open, setOpen } = props;
  const router = useRouter();

  const handlePushLogin = () => {
    router.push("/login");
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Войдите, чтобы просматривать посты
          </AlertDialogTitle>
          <AlertDialogDescription>
            Оставляйте лайки, комментируйте, а так же просматривайте всю ленту с
            полными маршрутами пользователей.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Не сейчас</AlertDialogCancel>
          <AlertDialogAction onClick={handlePushLogin}>Войти</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
