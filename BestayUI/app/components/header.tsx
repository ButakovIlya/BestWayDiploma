"use client";
import Image from "next/image";
import styles from "./header.module.css";
import { RoundButton } from "./round-button";
import { useRouter } from "next/navigation";
import bw from "@/public/bw.svg";

export function Header() {
  const router = useRouter();

  const handlePushLanding = () => {
    router.push("/");
  };

  const handlePushLogin = () => {
    router.push("/login");
  };

  return (
    <header className={styles["header"]}>
      <div className={styles["header-container"]}>
        <Image
          src={bw}
          alt="Description of my image"
          width={175}
          className={styles["banner"]}
          onClick={handlePushLanding}
        />
        <RoundButton text="Войти" onClick={handlePushLogin} />
      </div>
    </header>
  );
}
