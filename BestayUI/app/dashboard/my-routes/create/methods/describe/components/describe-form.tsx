"use client";

import { Form, FormField } from "@/app/components/ui/form";
import { StageTemplate } from "../../../components/stage-template";
import FormInput from "@/app/components/form-input";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { Button } from "@/app/components/ui/button";
import { describeFormFields } from "../lib/fields/describe-form-fields";
import styles from "./choose-method-form.module.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { describeFormSchema } from "../lib/schemas/describe-form-schema";
import { createSurvey, updateSurvey } from "@/app/lib/api/public/surveys";
import { useAppStore } from "@/app/_store/app-store";
import { generateMyRoute } from "@/app/lib/api/public/routes";
import { Methods } from "../../../lib/constants/methods";
import { useRouter } from "next/navigation";
import { CityCategory, RouteType } from "@/app/types/entities";

export function DescribeForm() {
  const router = useRouter();
  const {
    myRoutesState: { createRoute },
  } = useAppStore((state) => state);
  const { prepareForm, chosenMethod } = createRoute;

  const form = useForm<z.infer<typeof describeFormSchema>>({
    resolver: zodResolver(describeFormSchema),
    values: {
      prompt: "",
    },
  });

  const onSubmit = () => {
    const formValues = form.getValues();
    if (prepareForm) {
      const surveyData = {
        preferred_transport: prepareForm.preferredTransport as RouteType,
        order_matters: prepareForm.orderMatter,
        questions: {
          "Что для вас важнее?": prepareForm.whatImportant,
        },
      };

      createSurvey({
        name: prepareForm.name,
        city: prepareForm.city as CityCategory,
      }).then((data) => {
        updateSurvey(data.id, {
          data: surveyData,
          prompt: formValues.prompt,
        }).then(() => {
          const methodName =
            chosenMethod === Methods.describe ? "Свободный" : "Частичный";
          generateMyRoute(data.id, methodName).then(() => {
            router.push("/dashboard/my-routes");
          });
        });
      });
    }
  };

  return (
    <StageTemplate title="Опишите свой идеальный маршрут">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={styles["form-container"]}
        >
          <div className={styles["form-container__fields"]}>
            {describeFormFields.map((formField) => (
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
                    tip={formField.tip}
                    maxLength={200}
                    style={formField.style}
                  />
                )}
              />
            ))}
          </div>
          <div className={styles["form-container__control"]}>
            <Button type="submit" className={styles["form-button"]}>
              Сформировать
            </Button>
          </div>
        </form>
      </Form>
    </StageTemplate>
  );
}
