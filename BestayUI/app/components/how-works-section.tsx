import { Bot, Route, User } from "lucide-react";
import styles from "./how-works-section.module.css";

export function HowWorksSection() {
  return (
    <div className={styles["section-container"]}>
      <div className={styles["section-inner"]}>
        <h2>Как работает AI помощник-путеводитель?</h2>
        <p className={styles["section-intro"]}>
          Всего три шага — от вашего запроса до готового маршрута с точками на
          карте и возможностью редактирования.
        </p>
        <div className={styles["steps-container"]}>
          <div className={styles["step-content"]}>
            <div>
              <User color="#006096" fill="#006096" />
            </div>
            <div className={styles["step-text"]}>
              <h3>1. Пользователь</h3>
              <p>
                заполняет анкету в профиле, затем пишет место, время <br /> и
                продолжительность маршрута.
              </p>
            </div>
          </div>
          <div className={styles["step-content"]}>
            <div>
              <Bot color="purple" />
            </div>
            <div className={styles["step-text"]}>
              <h3>2. AI-технология</h3>
              <p>
                генерирует из своей базы знаний подходящий маршрут <br /> по 10
                параметрам.
              </p>
            </div>
          </div>
          <div className={styles["step-content"]}>
            <div>
              <Route color="green" />
            </div>
            <div className={styles["step-text"]}>
              <h3>3. В итоге</h3>
              <p>
                вы получаете нужный и подходящий вам маршрут, <br /> в
                необходимости меняете точки.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
