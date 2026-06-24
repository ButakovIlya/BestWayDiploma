import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/components/ui/form";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

import { useState } from "react";
import { IMaskInput } from "react-imask";
import { useForm } from "react-hook-form";
import { PhoneSchema } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { PHONE_SCHEMA } from "../../lib/constants/phone-schema";
import { toast } from "sonner";
import { useAppStore } from "@/app/_store/app-store";
import Link from "next/link";

export default function PhoneForm() {
  const { login } = useAppStore((state) => state);
  const { isSentCode, setIsSentCode, setPhone, increaseSentTimes } = login;
  const form = useForm<PhoneSchema>({
    resolver: zodResolver(PHONE_SCHEMA),
    defaultValues: { phone: "" },
  });

  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(values: PhoneSchema) {
    const { phone } = values;

    setPhone(phone);
    increaseSentTimes();
    setIsLoading(true);

    fetch(
      "/api/public/auth/send-code?" +
        new URLSearchParams({
          phone,
        }).toString(),
    )
      .then((res) => res.json())
      .then((data) => {
        toast(`Код для номера ${phone}`, {
          description: data.message,
          duration: 5000,
        });
        setIsSentCode(true);
        setIsLoading(false);
      });
  }

  return (
    <>
      <h1
        className={clsx(
          isSentCode && "hidden",
          "text-center text-xl font-bold",
        )}
      >
        Добро пожаловать!
      </h1>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="text-center"
          >
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => {
                const { value, onChange } = field;

                return (
                  <FormItem className={clsx(isSentCode && "hidden", "mt-15")}>
                    <FormLabel>Введите ваш номер телефона</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2 relative">
                        <IMaskInput
                          autoFocus
                          name="phone"
                          className="rounded-3xl bg-white py-[10px] pl-10 w-full"
                          mask={"+{7}(000)000-00-00"}
                          placeholder="+7(123)456-78-90"
                          disabled={isLoading}
                          radix="."
                          value={value}
                          onAccept={onChange}
                        />
                        <div
                          className="pointer-events-none absolute left-3 top-[21px] -translate-y-1/2"
                          style={{ filter: "drop-shadow(0 0 0.05rem gray)" }}
                        >
                          <ReactCountryFlag countryCode="RU" svg title="RU" />
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <p className="mt-4 text-xs text-left text-gray-400">
              {`Нажимая на кнопку "Получить код", вы соглашаетесь с условиями `}
              <Link className="!text-blue-500" href={"/login/site-usage"}>
                политики конфидециальности
              </Link>
            </p>
            <Button
              disabled={isLoading}
              type="submit"
              className="mt-2 rounded-3xl bg-[#006096] cursor-pointer w-full"
            >
              <Loader2
                className={clsx(!isLoading && "hidden", "animate-spin")}
              />
              Получить код
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
