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
import { formSchema } from "../lib/create-user-form";
import { UserForm } from "../types/user-form";
import { mapUserFormToDTO } from "../lib/map-user-to-dto";
import { addUser, editUser, getUsers } from "@/app/lib/api/admin/users";
import { mapUsersFromDTO } from "../lib/map-users-from-dto";
import { formFields } from "../lib/create-user-fields";
import { useAppStore } from "@/app/_store/app-store";

interface UserRecordModalProps {
  mode: string;
  user?: UserForm;
}

export function UserRecordModal(props: UserRecordModalProps) {
  const { mode, user } = props;

  const { ui, usersState } = useAppStore((state) => state);
  const { isRecordModalOpened, setIsRecordModalOpened } = ui;

  const { setUsers, pagination } = usersState;

  const defaultValue = {
    first_name: "",
    last_name: "",
    middle_name: "",
    phone: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values:
      mode === "edit" && user
        ? {
            first_name: user.first_name,
            last_name: user.last_name,
            middle_name: user.middle_name,
            phone: user.phone,
          }
        : { ...defaultValue },
  });

  function onSubmit() {
    const formValues = form.getValues();
    const mappedValues = mapUserFormToDTO(formValues as UserForm);

    if (mode === "edit" && user) {
      editUser(user.id, mappedValues).then(() => {
        getUsers(pagination).then((data) => {
          const { data: places } = data;
          const mappedPlaces = mapUsersFromDTO(places);
          setUsers(mappedPlaces);
          setIsRecordModalOpened(false);
        });
      });
      return;
    }

    addUser(mappedValues).then(() => {
      getUsers(pagination).then((data) => {
        const { data: places } = data;
        const mappedPlaces = mapUsersFromDTO(places);
        setUsers(mappedPlaces);
        setIsRecordModalOpened(false);
      });
    });
  }

  useEffect(() => {
    if (!isRecordModalOpened) {
      form.reset();
    }
  }, [isRecordModalOpened]);

  return (
    <Dialog open={isRecordModalOpened} onOpenChange={setIsRecordModalOpened}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Редактирование записи" : "Создание записи"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            {formFields.map((formField) => (
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
                    disabled={formField.disabled}
                  />
                )}
              />
            ))}
            <Button type="submit" className="mt-4">
              {mode === "edit" ? "Применить" : "Создать"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
