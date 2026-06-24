import { ViewFields } from "@/app/components/view-fields";
import { Route } from "@/app/dashboard/types";
import { ViewField } from "@/app/types/view-field";

interface RouteFieldsProps {
  route: Route | null;
}

export function RouteFields(props: RouteFieldsProps) {
  const { route } = props;

  const fields: ViewField[] = [{ title: "Город", value: route?.city }];

  return <ViewFields fields={fields} />;
}
