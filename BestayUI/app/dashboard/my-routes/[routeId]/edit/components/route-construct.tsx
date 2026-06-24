import { CustomPlacesList } from "./custom-places-list";
import { AddPlaceMenu } from "./add-place-menu";
import styles from "./route-contruct.module.css";

export function RouteConstruct() {
  return (
    <div className={styles["construct-container"]}>
      <div className={styles["construct-container__panel"]}>
        <AddPlaceMenu />
      </div>
      <div className={styles["construct-container__constructor"]}>
        <CustomPlacesList />
      </div>
    </div>
  );
}
