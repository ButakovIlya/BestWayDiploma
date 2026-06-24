"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField } from "@/app/components/ui/form";
import { Button } from "@/app/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import FormInput from "@/app/components/form-input";
import { useEffect } from "react";
import { userProfileSchema } from "../lib/user-profile-schema";
import { userProfileFields } from "../lib/user-profile-fields";
import { User2 } from "../types";
import { mapUserProfileToDTO } from "../lib/map-user-profile-to-dto";
import { getProfile, updateProfile } from "@/app/lib/api/public/profile";
import { mapUserProfileFromDTO } from "../lib/map-user-profile-from-dto";
import { useAppStore } from "@/app/_store/app-store";

export function UserProfileModal() {
  const {
    account: { setUser, user },
    ui: { isRecordModalOpened, setIsRecordModalOpened },
  } = useAppStore((state) => state);

  const form = useForm<z.infer<typeof userProfileSchema>>({
    resolver: zodResolver(userProfileSchema),
    values: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      middleName: user?.middleName ?? "",
      birthday: null,
    },
  });

  function onSubmit() {
    const formValues = form.getValues();
    const mappedValues = mapUserProfileToDTO(formValues as User2);

    updateProfile(mappedValues).then(() => {
      getProfile().then((data) => {
        const user = mapUserProfileFromDTO(data);
        setUser(user);
        setIsRecordModalOpened(false);
      });
    });
  }

  useEffect(() => {
    if (!isRecordModalOpened) {
      form.reset();
    }
  }, [isRecordModalOpened, form]);

  return (
    <Dialog open={isRecordModalOpened} onOpenChange={setIsRecordModalOpened}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование профиля</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            {userProfileFields.map((formField) => (
              <FormField
                key={formField.name}
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormInput
                    field={field as unknown as ControllerRenderProps}
                    title={formField.title}
                    type={formField.type}
                    options={formField.options}
                  />
                )}
              />
            ))}
            <Button type="submit" className="mt-4">
              Применить
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
