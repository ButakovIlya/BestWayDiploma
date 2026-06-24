import { useAppStore } from "@/app/_store/app-store";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { createComment, getComments } from "@/app/lib/api/public/comments";
import { CommentRead } from "@/app/types/entities";
import { Bird, SendHorizontal } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Comment } from "./comment";
import { removeComment } from "@/app/lib/api/admin/comments";

export function CommentsModal() {
  const {
    feedState: { currentPostId, setCurrentPostId },
    ui: { isRecordModalOpened, setIsRecordModalOpened },
  } = useAppStore((state) => state);
  const [comments, setComments] = useState<CommentRead[]>([]);
  const [comment, setComment] = useState("");

  const updateComments = useCallback(() => {
    if (isRecordModalOpened && currentPostId) {
      getComments(currentPostId).then((data) => {
        setComments(data.data);
      });
    }
  }, [isRecordModalOpened, currentPostId]);

  const handleSendComment = () => {
    createComment(Number(currentPostId), comment).then(() => {
      updateComments();
      setComment("");
    });
  };
  const sendDisabled = !comment.length;

  useEffect(() => {
    updateComments();
  }, [isRecordModalOpened]);

  return (
    <Dialog
      open={isRecordModalOpened}
      onOpenChange={(open) => {
        setIsRecordModalOpened(open);

        if (!open) {
          setCurrentPostId(undefined);
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Комментарии</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-2 max-h-[500px] overflow-y-auto">
          {comments.length ? (
            comments.map(({ id, author, comment, timestamp }) => (
              <Comment
                key={id}
                id={id}
                author={author?.first_name ?? ""}
                avatar={author?.photo}
                comment={comment}
                timestamp={timestamp ?? ""}
                handleRemove={(id) => {
                  removeComment(id).then(() => {
                    updateComments();
                  });
                }}
              />
            ))
          ) : (
            <div className="w-full flex flex-col items-center">
              <Bird color="#006096" width={32} height={32} />
              <p className="text-sm text-gray-500">
                Пока нет комментариев. Будьте первыми!
              </p>
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-start">
          <div className="flex gap-1 w-full items-center">
            <Input
              value={comment}
              onChange={(event) => {
                setComment(event.target.value);
              }}
            />
            <Button
              variant="secondary"
              disabled={sendDisabled}
              onClick={handleSendComment}
            >
              <SendHorizontal color="#006096" />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
