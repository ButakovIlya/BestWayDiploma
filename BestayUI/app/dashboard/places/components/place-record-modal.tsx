import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { formSchema } from "../lib/create-place-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField } from "@/app/components/ui/form";
import { Button } from "@/app/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { formFields } from "../lib/create-place-fields";
import FormInput from "@/app/components/form-input";
import { mapPlaceFromDTO } from "../lib/map-place-from-dto";
import { addPlace, editPlace, getPlaces } from "@/app/lib/api/admin/places";
import { useEffect } from "react";
import { mapPlaceToDTO } from "../lib/map-places-to-dto";
import { Place } from "../../types";
import { useAppStore } from "@/app/_store/app-store";

interface PlacesRecordModalProps {
  mode: string;
  place?: Place;
}

export function PlacesRecordModal(props: PlacesRecordModalProps) {
  const { mode, place } = props;

  const { ui, placesState } = useAppStore((state) => state);
  const { isRecordModalOpened, setIsRecordModalOpened } = ui;

  const { setPlaces, pagination } = placesState;

  const defaultValue = {
    city: "",
    name: "",
    description: "",
    category: "",
    type: "",
    coordinates: "",
    website_url: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values:
      mode === "edit" && place
        ? {
            name: place.name,
            description: place.description,
            category: place.category,
            city: place.city,
            type: place.type,
            coordinates: place.coordinates,
            website_url: place.website_url,
          }
        : { ...defaultValue },
  });

  function onSubmit() {
    const formValues = form.getValues();
    const mappedValues = mapPlaceToDTO(formValues as Place);

    if (mode === "edit" && place) {
      editPlace(place.id, mappedValues).then(() => {
        getPlaces(pagination).then((data) => {
          const { data: places } = data;
          const mappedPlaces = places.map(mapPlaceFromDTO);
          setPlaces(mappedPlaces);
          setIsRecordModalOpened(false);
        });
      });
      return;
    }

    const formData = new FormData();
    for (const field in formValues) {
      const value = formValues[field as keyof typeof formValues];
      if (value) {
        formData.append(field, value);
      }
    }

    addPlace(formData).then(() => {
      getPlaces(pagination).then((data) => {
        const { data: places } = data;
        const mappedPlaces = places.map(mapPlaceFromDTO);
        setPlaces(mappedPlaces);
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[70vh] w-full px-2">
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
                    />
                  )}
                />
              ))}
            </div>
            <div className="mt-4 w-full px-2">
              <Button type="submit" className="w-full">
                {mode === "edit" ? "Применить" : "Создать"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
