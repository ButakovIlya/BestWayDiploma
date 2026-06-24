"use client";
import { useEffect } from "react";
import { DescribeForm } from "./components/describe-form";
import { useAppStore } from "@/app/_store/app-store";
import { useRouter } from "next/navigation";
import { Stages } from "../../lib/constants/stages";

export default function Page() {
  const router = useRouter();
  const {
    myRoutesState: { createRoute },
  } = useAppStore((state) => state);
  const { prepareForm, setCurrentStage } = createRoute;

  useEffect(() => {
    if (!prepareForm) {
      router.push("/dashboard/my-routes/create/prepare");
      return;
    }
    setCurrentStage(Stages.buildWithDescribe);
  }, []);

  return <DescribeForm />;
}
