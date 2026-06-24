import styles from "./page.module.css";
import { Logout } from "./components/logout";
import { UserProfile } from "./components/user-profile";
import { UserAvatar } from "./components/user-avatar";
import DashboardHeader from "../components/dashboard-header/dashboard-header";
import { UserProfileModal } from "./components/user-profile-modal";
import { EditProfileButton } from "./components/edit-profile-button";
import { ScrollArea } from "@/app/components/ui/scroll-area";

export default function Page() {
  return (
    <div className={styles["page"]}>
      <DashboardHeader title="Мой профиль" rightChild={<Logout />} />
      <ScrollArea className={styles["page__scroll-area"]}>
        <div className={styles["page__content"]}>
          {/* <div className={styles["content__stat"]}>
            <UserStatistic />
          </div> */}
          <div className={styles["content__user"]}>
            <div className={styles["content__user-info"]}>
              <div>
                <UserAvatar />
              </div>
              <div className={styles["user__panel"]}>
                <UserProfile />
              </div>
            </div>
            <div>
              <EditProfileButton />
            </div>
          </div>
        </div>
      </ScrollArea>
      <UserProfileModal />
    </div>
  );
}
