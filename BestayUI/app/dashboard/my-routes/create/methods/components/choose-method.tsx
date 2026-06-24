"use client";

import { StageTemplate } from "../../components/stage-template";
import { methodsFormSchema } from "../lib/schemas/methods-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./choose-method-form.module.css";
import { Form, FormField } from "@/app/components/ui/form";
import { methodsFormFields } from "../lib/fields/methods-form-fields";
import FormInput from "@/app/components/form-input";
import { Button } from "@/app/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { useAppStore } from "@/app/_store/app-store";
import { Methods } from "../../lib/constants/methods";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Stages } from "../../lib/constants/stages";

export function ChooseMethod() {
  const {
    myRoutesState: { createRoute },
  } = useAppStore((state) => state);
  const { prepareForm, chosenMethod, setChosenMethod, setCurrentStage } =
    createRoute;
  const router = useRouter();

  const form = useForm<z.infer<typeof methodsFormSchema>>({
    resolver: zodResolver(methodsFormSchema),
    values: {
      method: chosenMethod ? String(chosenMethod) : "0",
    },
  });

  useEffect(() => {
    if (!prepareForm) {
      router.push("/dashboard/my-routes/create/prepare");
      return;
    }
    setCurrentStage(Stages.chooseMethod);
  }, []);

  const onSubmit = () => {
    const formValues = form.getValues();
    const chosenMethod = Number(formValues.method);
    setChosenMethod(chosenMethod);

    const nextStageUrl =
      chosenMethod === Methods.describe
        ? "/dashboard/my-routes/create/methods/describe"
        : "/dashboard/my-routes/create/methods/construct";

    router.push(nextStageUrl);
  };

  return (
    <StageTemplate title="Как вы хотите построить маршрут?">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={styles["form-container"]}
        >
          <div className={styles["form-container__fields"]}>
            {methodsFormFields.map((formField) => (
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
          <div className={styles["form-container__control"]}>
            <Button type="submit" className={styles["form-button"]}>
              Далее
              <ChevronRight />
            </Button>
          </div>
        </form>
      </Form>
    </StageTemplate>
  );
}
