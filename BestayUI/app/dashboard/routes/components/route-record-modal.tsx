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
import { Route } from "../types";
import { useEffect } from "react";
import { routeSchema } from "../lib/routeSchema";
import { routeFields } from "../lib/route-fields";
import { mapRouteToDTO } from "../lib/map-route-to-dto";
import { addRoute, editRoute, getRoutes } from "@/app/lib/api/admin/routes";
import { mapRouteFromDTO } from "../lib/map-route-from-dto";
import { useAppStore } from "@/app/_store/app-store";

interface RouteRecordModalProps {
  mode: string;
  route?: Route;
}

export function RouteRecordModal(props: RouteRecordModalProps) {
  const { mode, route } = props;

  const { routesState, ui } = useAppStore((state) => state);
  const { setRoutes, pagination } = routesState;
  const { isRecordModalOpened, setIsRecordModalOpened } = ui;

  const defaultValue = {
    city: "",
    name: "",
  };

  const form = useForm<z.infer<typeof routeSchema>>({
    resolver: zodResolver(routeSchema),
    values:
      mode === "edit" && route
        ? {
            name: route.name,
            city: route.city,
          }
        : { ...defaultValue },
  });

  function onSubmit() {
    const formValues = form.getValues();
    const mappedValues = mapRouteToDTO(formValues as Route);

    if (mode === "edit" && route) {
      editRoute(route.id, mappedValues).then(() => {
        getRoutes(pagination).then((data) => {
          const { data: routes } = data;
          const mappedValues = routes.map(mapRouteFromDTO);
          setRoutes(mappedValues);
          setIsRecordModalOpened(false);
        });
      });
      return;
    }

    const formData = new FormData();
    for (const field in mappedValues) {
      const value = mappedValues[field as keyof typeof formValues];
      if (value) {
        formData.append(field, value);
      }
    }
    addRoute(formData).then(() => {
      getRoutes(pagination).then((data) => {
        const { data: routes } = data;
        const mappedValues = routes.map(mapRouteFromDTO);
        setRoutes(mappedValues);
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
            {routeFields.map((formField) => (
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
              {mode === "edit" ? "Применить" : "Создать"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
