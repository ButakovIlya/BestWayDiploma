import dayjs from "dayjs";
import styles from "./comment.module.css";
import { BackendImage } from "@/app/components/backend-image";
import { useAppStore } from "@/app/_store/app-store";
import { Trash } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface CommentProps {
  id: number;
  author: string;
  comment: string;
  timestamp: string;
  handleRemove: (_: number) => void;
  avatar?: string | null;
}

export function Comment(props: CommentProps) {
  const { account } = useAppStore((state) => state);
  const { id, author, avatar, comment, timestamp, handleRemove } = props;

  return (
    <div className={styles["container"]}>
      <div>
        <div>
          <BackendImage
            alt="avatar"
            src={
              avatar ||
              "https://images.unsplash.com/vector-1754045222115-3153d64c522a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            width={240}
            height={140}
            className={styles["user-avatar"]}
          />
        </div>
        <div className={styles["comment-container"]}>
          <p>{author}</p>
          <p>{comment}</p>
          <p>{dayjs(timestamp).format("DD.MM.YYYY HH:mm")}</p>
        </div>
      </div>
      {account.user?.isAdmin && (
        <Button
          variant="destructive"
          onClick={() => {
            handleRemove(id);
          }}
        >
          <Trash />
        </Button>
      )}
    </div>
  );
}
