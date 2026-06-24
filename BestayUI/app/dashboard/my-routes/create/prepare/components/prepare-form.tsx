"use client";
import { Form, FormField } from "@/app/components/ui/form";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "@/app/components/form-input";
import { Button } from "@/app/components/ui/button";
import { prepareFormSchema } from "../lib/schemas/prepare-form-schema";
import { prepareFormFields } from "../lib/fields/prepare-form-fields";
import styles from "./prepare-form.module.css";
import { ChevronRight } from "lucide-react";
import { StageTemplate } from "../../components/stage-template";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/app/_store/app-store";
import { useEffect } from "react";
import { Stages } from "../../lib/constants/stages";
import { ScrollArea } from "@/app/components/ui/scroll-area";

export function PrepareForm() {
  const {
    myRoutesState: { createRoute },
  } = useAppStore((state) => state);
  const { prepareForm, setPrepareForm, setCurrentStage } = createRoute;

  const router = useRouter();
  const form = useForm<z.infer<typeof prepareFormSchema>>({
    resolver: zodResolver(prepareFormSchema),
    values: {
      name: prepareForm?.name ?? "",
      city: prepareForm?.city ?? "",
      preferredTransport: prepareForm?.preferredTransport ?? "",
      orderMatter: prepareForm?.orderMatter ?? false,
      whatImportant: prepareForm?.whatImportant ?? "",
    },
  });

  const onSubmit = () => {
    const formValues = form.getValues();

    setPrepareForm({
      ...formValues,
    });
    router.push("/dashboard/my-routes/create/methods");
    return;
  };

  useEffect(() => {
    setCurrentStage(Stages.prepare);
  }, []);

  return (
    <StageTemplate title="Заполните данные для более точного построения маршрута">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={styles["form-container"]}
        >
          <ScrollArea className={styles["form-container__scroll-area"]}>
            <div className={styles["form-container__fields"]}>
              {prepareFormFields.map((formField) => (
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
            </div>
          </ScrollArea>
          <div className={styles["form-container__control"]}>
            <Button type="submit" className={styles["form-button"]}>
              Заполнить <br /> и перейти далее
              <ChevronRight />
            </Button>
          </div>
        </form>
      </Form>
    </StageTemplate>
  );
}
