import { ViewFields } from "@/app/components/view-fields";
import { PlaceRead } from "@/app/types/entities";
import { ViewField } from "@/app/types/view-field";

interface PlaceFieldsProps {
  place: PlaceRead | null;
}

export function PlaceFields(props: PlaceFieldsProps) {
  const { place } = props;

  const fields: ViewField[] = [
    { title: "Город", value: place?.city ?? "-" },
    { title: "Описание", value: place?.description ?? "-" },
    { title: "Категория", value: place?.category },
    { title: "Тип", value: place?.type ?? "-" },
    {
      title: "Ссылка на бронирование",
      value: place?.website_url ?? "-",
      link: true,
    },
  ];

  return <ViewFields fields={fields} />;
}
