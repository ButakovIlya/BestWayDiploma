import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { formSchema } from "../lib/custom-place-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField } from "@/app/components/ui/form";
import { Button } from "@/app/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { formFields } from "../lib/custom-place-fields";
import FormInput from "@/app/components/form-input";
import { useEffect } from "react";
import { useAppStore } from "@/app/_store/app-store";
import { CustomPlace } from "@/app/dashboard/my-routes/types";
import { AlertCircleIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { isCustomPlace } from "@/app/dashboard/my-routes/types/custom-place";

export function CustomPlaceRecordModal() {
  const {
    ui,
    myRoutesState: { createRoute },
  } = useAppStore((state) => state);
  const {
    pushCustomPlaces,
    customPlaces,
    setCustomPlaces,
    currentEditCustomPlace,
    setCurrentEditCustomPlace,
  } = createRoute;
  const { isRecordModalOpened, setIsRecordModalOpened } = ui;

  const customPlaceIndex = currentEditCustomPlace
    ? customPlaces.findIndex(
        (place) =>
          isCustomPlace(place) && place.key === String(currentEditCustomPlace),
      )
    : -1;

  const customPlace =
    customPlaceIndex > -1
      ? (customPlaces[customPlaceIndex] as CustomPlace)
      : undefined;

  const defaultValue = {
    category: "",
    type: "",
    description: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: customPlace
      ? {
          category: customPlace.category ?? "",
          type: customPlace.type ?? "",
          description: customPlace.description ?? "",
        }
      : { ...defaultValue },
  });

  function onSubmit() {
    const formValues = form.getValues();
    if (customPlace) {
      setCustomPlaces([
        ...customPlaces.map((place) => {
          if (isCustomPlace(place) && place.key === currentEditCustomPlace) {
            return { ...(formValues as CustomPlace), key: place.key };
          }

          return place;
        }),
      ]);
    } else {
      const uuid = uuidv4();
      pushCustomPlaces({ ...formValues, key: uuid } as CustomPlace);
    }
    setCurrentEditCustomPlace(undefined);
    setIsRecordModalOpened(false);
  }

  useEffect(() => {
    if (!isRecordModalOpened) {
      form.reset();
    }
  }, [isRecordModalOpened, form]);

  return (
    <Dialog
      open={isRecordModalOpened}
      onOpenChange={(open) => {
        if (!open) {
          setCurrentEditCustomPlace(undefined);
        }
        setIsRecordModalOpened(open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {customPlace ? "Редактирование места" : "Создание места"}
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
                    maxLength={formField.maxLength}
                    style={formField.style}
                  />
                )}
              />
            ))}
            {
              <div className="flex gap-2 items-center">
                <AlertCircleIcon width={16} />
                <p className="text-xs">
                  Необходимо заполнить минимум одно поле.
                </p>
              </div>
            }
            <Button
              type="submit"
              className="mt-4"
              disabled={!form.formState.isValid}
            >
              {customPlace ? "Применить" : "Создать"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
