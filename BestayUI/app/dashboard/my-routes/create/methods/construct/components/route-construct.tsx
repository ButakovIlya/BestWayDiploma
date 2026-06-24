import styles from "./route-construct.module.css";
import { CustomPlacesList } from "./custom-places-list";
import { AddPlaceMenu } from "./add-place-menu";
import { CreateButton } from "./create-button";

export function RouteConstruct() {
  return (
    <div className={styles["construct-container"]}>
      <div className={styles["construct-container__panel"]}>
        <AddPlaceMenu />
      </div>
      <div className={styles["construct-container__constructor"]}>
        <CustomPlacesList />
      </div>
      <div className={styles["construct-container__buttons"]}>
        <CreateButton />
      </div>
    </div>
  );
}
