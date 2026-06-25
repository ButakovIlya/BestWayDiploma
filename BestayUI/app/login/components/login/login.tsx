"use client";

import clsx from "clsx";
import styles from "./login.module.css";
import { useIsMobile } from "@/app/hooks/use-mobile";
import PhoneForm from "../phone-form/phone-form";
import CodeForm from "../code-form/code-form";
import { useEffect } from "react";
import { useAppStore } from "@/app/_store/app-store";
import { SYSTEM_COLOR, THEME_COLOR } from "@/app/lib/constants/base-color";

export default function Login() {
  const { login } = useAppStore((state) => state);
  const { isSentCode, setIsSentCode } = login;
  const isMobile = useIsMobile();

  useEffect(() => {
    return () => {
      setIsSentCode(false);
      document.documentElement.style.backgroundColor = SYSTEM_COLOR;
      document.body.style.backgroundColor = SYSTEM_COLOR;
    };
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = isMobile ? THEME_COLOR : "#ffffff";
    document.body.style.backgroundColor = isMobile ? THEME_COLOR : "#ffffff";
  }, [isMobile]);

  return (
    <div
      className={clsx(
        styles["form__centered"],
        !isMobile && styles["form__desktop"],
        isSentCode && styles["form__code-step"],
      )}
    >
      {isSentCode ? <CodeForm /> : <PhoneForm />}
    </div>
  );
}
