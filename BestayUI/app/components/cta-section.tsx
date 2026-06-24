import Link from "next/link";
import { ChevronRight } from "lucide-react";
import styles from "./cta-section.module.css";

export function CtaSection() {
  return (
    <section className={styles["section-container"]}>
      <div className={styles["section-inner"]}>
        <div className={styles["cta-card"]}>
          <div>
            <p className={styles["cta-label"]}>Готовы к прогулке?</p>
            <h2>Создайте маршрут за пару минут</h2>
            <p className={styles["cta-text"]}>
              Авторизуйтесь по номеру телефона, опишите желаемую прогулку или
              соберите маршрут вручную — и отправляйтесь исследовать город.
            </p>
          </div>
          <div className={styles["cta-actions"]}>
            <Link href="/login" className={styles["cta-primary"]}>
              Войти и создать маршрут
              <ChevronRight color="white" size={18} />
            </Link>
            <Link href="/feed" className={styles["cta-secondary"]}>
              Смотреть ленту маршрутов
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
