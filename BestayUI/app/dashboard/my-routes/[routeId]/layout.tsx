"use client";

import { useAppStore } from "@/app/_store/app-store";
import { useEffect } from "react";
import styles from "./layout.module.css";

export default function Layout(props: React.PropsWithChildren) {
  const { children } = props;
  const {
    myRoutesState: { createRoute },
  } = useAppStore((state) => state);
  const { setPrepareForm, setCustomPlaces } = createRoute;

  useEffect(() => {
    return () => {
      setPrepareForm(undefined);
      setCustomPlaces([]);
    };
  }, []);

  return <div className={styles.page}>{children}</div>;
}
