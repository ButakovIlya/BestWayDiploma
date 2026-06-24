import { Button } from "@/app/components/ui/button";
import clsx from "clsx";
import { ChevronLeft } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/app/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useEffect, useRef, useState } from "react";
import { CodeSchema } from "../../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CODE_SCHEMA } from "../../lib/constants/code-schema";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/app/components/ui/input";
import { loginWithCode } from "@/app/lib/auth/auth-service";
import { getIsNewUser } from "@/app/lib/auth/token-storage";

import styles from "./code-form.module.css";
import { useAppStore } from "@/app/_store/app-store";

export default function CodeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard/feed";
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isPending, setIsPending] = useState(false);

  const { login } = useAppStore((state) => state);
  const { isSentCode, setIsSentCode, phone } = login;
  const form = useForm<CodeSchema>({
    resolver: zodResolver(CODE_SCHEMA),
    defaultValues: { code: "" },
  });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isPending) {
      form.resetField("code");
      inputRef.current?.focus();
    }
  }, [form, isPending]);

  async function handleSubmit(values: CodeSchema) {
    setErrorMessage(undefined);
    setIsPending(true);

    const result = await loginWithCode(phone, values.code);

    if (!result.ok) {
      setErrorMessage(result.error);
      setIsPending(false);
      return;
    }

    if (getIsNewUser()) {
      router.push("/login/registration");
      return;
    }

    router.push(callbackUrl);
  }

  return (
    <>
      <Button
        variant="link"
        className={styles["code-form__back-button"]}
        onClick={() => setIsSentCode(false)}
      >
        <ChevronLeft />
        Вернуться назад
      </Button>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="text-center"
          >
            <FormField
              name="phone"
              render={() => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input name="phone" defaultValue={phone} readOnly />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem className={clsx(!isSentCode && "hidden", "mt-15")}>
                  <FormLabel>Введите код из сообщения</FormLabel>
                  <FormControl>
                    <InputOTP
                      ref={inputRef}
                      name="code"
                      disabled={isPending}
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                      value={field.value}
                      onChange={(newValue) => {
                        field.onChange(newValue);
                        if (newValue.length === 4) {
                          buttonRef.current?.click();
                        }
                      }}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot className="bg-white" index={0} />
                        <InputOTPSlot className="bg-white" index={1} />
                        <InputOTPSlot className="bg-white" index={2} />
                        <InputOTPSlot className="bg-white" index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button ref={buttonRef} type="submit" className="hidden" />
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
