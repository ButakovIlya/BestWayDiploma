import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { SORT_OPTIONS } from "../lib/constants/sorting";

export default function Toolbar() {
  return (
    <>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Сортировка" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map(({ title, value }) => (
            <SelectItem key={value} value={value}>
              {title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
