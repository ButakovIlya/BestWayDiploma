"use client";

import { DataTable } from "@/app/components/table/data-table";
import { columns } from "./lib/constants/columns";
import { useEffect, useState } from "react";
import { mapUsersFromDTO } from "./lib/map-users-from-dto";
import { editUser, getUsers, removeUser } from "@/app/lib/api/admin/users";
import adminStyles from "../lib/styles/admin-page.module.css";
import { Actions } from "@/app/types";
import { User, UserForm } from "./types";
import { Edit, Eye, Lock, Trash2 } from "lucide-react";
import DashboardHeader from "../components/dashboard-header/dashboard-header";
import { UserRecordModal } from "./components/users-record-modal";
import { mapUserToForm } from "./lib/map-user-to-form";
import { ConfirmModal } from "@/app/components/confirm-modal";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/app/_store/app-store";
import { useTable } from "@/app/hooks/use-table";
import { SidebarPages } from "../types/sidebar-pages";

export default function Page() {
  const router = useRouter();
  const {
    usersState,
    account: { user },
    ui,
  } = useAppStore((state) => state);
  const { pagination, rowCount, setPagination, setRowCount } = useTable();

  const [modalEditProps, setModalEditProps] = useState<{
    mode: string;
    user?: UserForm;
  }>({ mode: "new" });

  const [modalRemoveProps, setModalRemoveProps] = useState<{
    name: string;
    id: number;
  }>({ name: "", id: 0 });

  const {
    users,
    setUsers,
    setPagination: setUsersPagination,
    setRowCount: setUsersRowCount,
  } = usersState;
  const {
    isRemoveModalOpened,
    setIsRecordModalOpened,
    setIsRemoveModalOpened,
    setCurrentPage,
  } = ui;

  const updateUsers = () => {
    getUsers(pagination).then((data) => {
      const { data: users, count } = data;
      const mappedUsers = mapUsersFromDTO(users);

      setUsers(mappedUsers);
      setRowCount(count);

      setUsersPagination(pagination);
      setUsersRowCount(count);
    });
  };

  const actions: Actions<User>[] = [
    {
      name: "profile",
      title: "Открыть",
      icon: <Eye />,
      onClick(row) {
        router.push(`/dashboard/users/${row.original.id}`);
      },
    },
    {
      name: "edit",
      title: "Редактировать",
      icon: <Edit />,
      onClick(row) {
        const userForm = mapUserToForm(row.original);
        setModalEditProps({
          mode: "edit",
          user: {
            ...userForm,
          },
        });
        setIsRecordModalOpened(true);
      },
    },
    {
      name: "block",
      title: (row) =>
        row.original.isBanned ? "Разблокировать" : "Заблокировать",
      icon: <Lock />,
      disabled: (row) => row.original.id === user?.id,
      onClick(row) {
        const newState = {
          is_banned: !row.original.isBanned,
        };
        editUser(row.original.id, newState).then(() => {
          getUsers(pagination).then((data) => {
            const { data: places } = data;
            const mappedPlaces = mapUsersFromDTO(places);
            setUsers(mappedPlaces);
            setIsRecordModalOpened(false);
          });
        });
      },
    },
    {
      name: "remove",
      title: "Удалить",
      icon: <Trash2 />,
      onClick(row) {
        setIsRemoveModalOpened(true);
        setModalRemoveProps({
          id: row.original.id,
          name: row.original.phone,
        });
      },
    },
  ];

  useEffect(() => {
    setCurrentPage(SidebarPages.Users);
  }, []);

  useEffect(() => {
    updateUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  return (
    <div className={adminStyles.page}>
      <DashboardHeader
        badge="Админ"
        title="Пользователи"
        subtitle="Управление аккаунтами, ролями администратора и блокировками пользователей платформы."
      />
      <DataTable
        containerClassname={adminStyles["table-container"]}
        columns={columns}
        data={users}
        actions={actions}
        pagination={pagination}
        rowCount={rowCount}
        handleChangePagination={setPagination}
      />
      <UserRecordModal user={modalEditProps.user} mode={modalEditProps.mode} />
      <ConfirmModal
        title={`Вы действительно хотите удалить запись ${modalRemoveProps.name}?`}
        description={
          "Это действие нельзя отменить. Данные будут удалены безвозвратно."
        }
        onConfirm={() => {
          removeUser(modalRemoveProps.id).then(() => {
            updateUsers();
          });
        }}
        open={isRemoveModalOpened}
        onOpen={setIsRemoveModalOpened}
      />
    </div>
  );
}
