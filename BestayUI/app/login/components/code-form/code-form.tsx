"use client";

import { Button } from "@/app/components/ui/button";
import clsx from "clsx";
import {
  ChevronLeft,
  Loader2,
  MessageSquareText,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
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
import { useCallback, useEffect, useRef, useState } from "react";
import { CodeSchema } from "../../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CODE_SCHEMA } from "../../lib/constants/code-schema";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/app/components/ui/input";
import { loginWithCode, sendAuthCode } from "@/app/lib/auth/auth-service";
import { getIsNewUser } from "@/app/lib/auth/token-storage";
import styles from "./code-form.module.css";
import { useAppStore } from "@/app/_store/app-store";
import { toast } from "sonner";

const RESEND_COOLDOWN_SEC = 60;

function splitCodeDigits(code: string): string[] {
  const digits = code.replace(/\D/g, "").slice(0, 4);
  return digits.padEnd(4, "•").split("");
}

export default function CodeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard/feed";
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isPending, setIsPending] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_SEC);

  const { login } = useAppStore((state) => state);
  const { isSentCode, setIsSentCode, phone, code: sentCode, setCode, increaseSentTimes } =
    login;

  const form = useForm<CodeSchema>({
    resolver: zodResolver(CODE_SCHEMA),
    defaultValues: { code: "" },
  });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (resendCooldown <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setResendCooldown((value) => Math.max(0, value - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendCooldown]);

  useEffect(() => {
    if (!isPending) {
      form.resetField("code");
      inputRef.current?.focus();
    }
  }, [form, isPending]);

  const handleResend = useCallback(async () => {
    if (resendCooldown > 0 || isResending || !phone) {
      return;
    }

    setErrorMessage(undefined);
    setIsResending(true);
    increaseSentTimes();

    try {
      const data = await sendAuthCode(phone);
      setCode(data.message ?? "");
      setResendCooldown(RESEND_COOLDOWN_SEC);
      toast.success("Новый код отправлен");
    } catch {
      toast.error("Не удалось отправить код повторно");
    } finally {
      setIsResending(false);
    }
  }, [increaseSentTimes, isResending, phone, resendCooldown, setCode]);

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

  const codeDigits = splitCodeDigits(sentCode);

  return (
    <div className={styles.page}>
      {sentCode ? (
        <div className={styles.codeBanner} aria-live="polite">
          <span className={styles.codeBanner__label}>
            <MessageSquareText size={14} />
            Код из SMS
          </span>
          <div className={styles.codeBanner__digits} aria-label={`Код: ${sentCode}`}>
            {codeDigits.map((digit, index) => (
              <span key={`${digit}-${index}`} className={styles.codeBanner__digit}>
                {digit}
              </span>
            ))}
          </div>
          <p className={styles.codeBanner__hint}>
            Отправили сообщение на{" "}
            <span className={styles.codeBanner__phone}>{phone}</span>
          </p>
        </div>
      ) : null}

      <Button
        variant="link"
        className={styles.backButton}
        onClick={() => {
          setIsSentCode(false);
          setCode("");
        }}
      >
        <ChevronLeft />
        Изменить номер
      </Button>

      <div className={styles.hero}>
        <div className={styles.hero__icon}>
          <Smartphone size={24} />
        </div>
        <h1 className={styles.hero__title}>Подтверждение входа</h1>
        <p className={styles.hero__subtitle}>
          Введите 4-значный код из SMS, чтобы войти в BestWay и открыть
          персональные маршруты, ленту и сохранённые места.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={styles.formSection}
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
              <FormItem className={clsx(!isSentCode && "hidden")}>
                <FormLabel className={styles.formLabel}>
                  Код подтверждения
                </FormLabel>
                <FormControl>
                  <InputOTP
                    ref={inputRef}
                    name="code"
                    disabled={isPending}
                    maxLength={4}
                    pattern={REGEXP_ONLY_DIGITS}
                    value={field.value}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                      if (newValue.length === 4) {
                        buttonRef.current?.click();
                      }
                    }}
                  >
                    <InputOTPGroup className={styles.otpGroup}>
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
          <p className={styles.error} aria-live="polite" aria-atomic="true">
            {errorMessage}
          </p>
          {isPending ? (
            <p className={styles.pending}>
              <Loader2 className="animate-spin" size={16} />
              Проверяем код…
            </p>
          ) : null}
        </form>
      </Form>

      <div className={styles.infoBlock}>
        <h2 className={styles.infoBlock__title}>Как войти</h2>
        <ol className={styles.steps}>
          <li>Откройте SMS от BestWay на телефоне с номером {phone || "…"}</li>
          <li>Скопируйте 4 цифры из сообщения или введите их ниже</li>
          <li>После проверки вы попадёте в личный кабинет</li>
        </ol>
      </div>

      <div className={styles.footer}>
        <Button
          type="button"
          variant="outline"
          className={styles.resendButton}
          disabled={resendCooldown > 0 || isResending || isPending}
          onClick={handleResend}
        >
          {isResending ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Отправляем…
            </>
          ) : resendCooldown > 0 ? (
            `Отправить код повторно через ${resendCooldown} с`
          ) : (
            "Отправить код повторно"
          )}
        </Button>
        <p className={styles.securityNote}>
          <ShieldCheck size={14} className="inline align-text-bottom mr-1" />
          Никому не сообщайте код. Сотрудники BestWay никогда не запрашивают
          его по телефону или в мессенджерах.
        </p>
      </div>
    </div>
  );
}
