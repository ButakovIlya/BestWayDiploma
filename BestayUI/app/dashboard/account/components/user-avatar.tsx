"use client";
import { BackendImage } from "@/app/components/backend-image";
import { Button } from "@/app/components/ui/button";
import { Plus } from "lucide-react";
import { ChangeEvent, useCallback, useRef } from "react";
import { Input } from "@/app/components/ui/input";
import { getProfile, updateProfileAvatar } from "@/app/lib/api/public/profile";
import { mapUserProfileFromDTO } from "../lib/map-user-profile-from-dto";
import { useAppStore } from "@/app/_store/app-store";

export function UserAvatar() {
  const {
    account: { setUser, user },
  } = useAppStore((state) => state);

  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleUploadAvatar = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("photo", file);

        updateProfileAvatar(formData).then(() => {
          getProfile().then((data) => {
            const user = mapUserProfileFromDTO(data);
            setUser(user);
          });
        });
      }

      event.target.value = "";
    },
    [],
  );

  return (
    <div>
      {user?.photo ? (
        <div className="relative w-[350px] h-[250px]">
          <BackendImage className="object-cover" src={user.photo} alt="photo" fill />
          <Button
            variant="outline"
            className="relative top-[10px] left-[300px]"
            onClick={() => {
              avatarInputRef?.current?.click();
            }}
          >
            <Plus />
          </Button>
        </div>
      ) : (
        <Button
          className="w-[350px] h-[250px] border-2"
          variant={"ghost"}
          onClick={() => {
            avatarInputRef?.current?.click();
          }}
        >
          <Plus />
          Добавить фото профиля
        </Button>
      )}
      <Input
        ref={avatarInputRef}
        className={"hidden"}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleUploadAvatar}
      />
    </div>
  );
}
