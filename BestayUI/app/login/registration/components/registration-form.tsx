import { Button } from "@/app/components/ui/button";
import { Form, FormField } from "@/app/components/ui/form";
import clsx from "clsx";

import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../lib/registrationSchema";
import { registrationFields } from "../lib/registrationFields";
import FormInput from "@/app/components/form-input";
import { z } from "zod";
import { MoveRight } from "lucide-react";
import { mapUserProfileToDTO } from "@/app/dashboard/account/lib/map-user-profile-to-dto";
import { User2 } from "@/app/dashboard/account/types";
import { updateProfile } from "@/app/lib/api/public/profile";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export default function RegistrationForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    values: {
      firstName: "",
      lastName: "",
      middleName: "",
    },
  });

  function onSubmit() {
    const formValues = form.getValues();
    const mappedValues = mapUserProfileToDTO({
      ...formValues,
      birthday:
        formValues.birthday && dayjs(formValues.birthday).format("YYYY-MM-DD"),
    } as User2);

    updateProfile(mappedValues).then(() => {
      router.push("/dashboard/my-routes");
    });
  }

  return (
    <>
      <h1 className={clsx("text-center text-xl font-bold")}>
        Похоже, вы новый пользователь!
      </h1>
      <div>
        <p className="text-sm text-gray-600 mb-5">
          Заполните личные данные, пожалуйста
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            {registrationFields.map((formField) => (
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
            <Button
              type="submit"
              className="mt-10 rounded-3xl bg-[#006096] cursor-pointer w-full"
            >
              Заполнить и перейти в сервис
              <MoveRight />
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
