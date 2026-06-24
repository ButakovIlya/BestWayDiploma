"use client";

import DashboardHeader from "../components/dashboard-header/dashboard-header";
import styles from "./page.module.css";
import { DataTable } from "@/app/components/table/data-table";
import { useEffect, useState } from "react";
import { columns } from "./lib/columns";
import { useAppStore } from "@/app/_store/app-store";
import { getSurveys, removeSurvey } from "@/app/lib/api/public/surveys";
import { SurveyRead } from "@/app/types/entities";
import { Trash2 } from "lucide-react";
import { Actions } from "@/app/types";
import { ConfirmModal } from "@/app/components/confirm-modal";
import { SidebarPages } from "../types/sidebar-pages";

export default function Page() {
  const {
    surveysState: { surveys, setSurveys },
    ui: { setIsRemoveModalOpened, setCurrentPage, isRemoveModalOpened },
  } = useAppStore((state) => state);
  const [modalRemoveProps, setModalRemoveProps] = useState<{
    name: string;
    id: number;
  }>({ name: "", id: 0 });

  const actions: Actions<SurveyRead>[] = [
    {
      name: "remove",
      title: "Удалить",
      icon: <Trash2 />,
      onClick(row) {
        setIsRemoveModalOpened(true);
        setModalRemoveProps({
          name: row.original.name,
          id: row.original.id,
        });
      },
    },
  ];

  useEffect(() => {
    setCurrentPage(SidebarPages.MySurveys);

    getSurveys().then((data) => {
      const mappedData: SurveyRead[] = data.map((survey) => ({
        id: survey.id,
        author_id: survey.author_id,
        created_at: survey.created_at,
        updated_at: survey.updated_at,
        name: survey.name ?? "",
        city: survey.city,
      }));
      setSurveys(mappedData);
    });
  }, []);

  return (
    <div className={styles.page}>
      <DashboardHeader title="Мои опросы" />
      <DataTable
        containerClassname={styles["table-container"]}
        columns={columns}
        data={surveys}
        actions={actions}
      />
      <ConfirmModal
        title={`Вы действительно хотите удалить запись ${modalRemoveProps.name}?`}
        description={
          "Это действие нельзя отменить. Данные будут удалены безвозвратно."
        }
        onConfirm={() => {
          removeSurvey(modalRemoveProps.id).then(() => {
            getSurveys().then((data) => {
              const mappedData: SurveyRead[] = data.map((survey) => ({
                id: survey.id,
                author_id: survey.author_id,
                created_at: survey.created_at,
                updated_at: survey.updated_at,
                name: survey.name ?? "",
                city: survey.city,
              }));
              setSurveys(mappedData);
            });
          });
        }}
        open={isRemoveModalOpened}
        onOpen={setIsRemoveModalOpened}
      />
    </div>
  );
}
