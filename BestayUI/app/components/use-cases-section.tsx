import { Backpack, Building2, Heart } from "lucide-react";
import styles from "./use-cases-section.module.css";

const USE_CASES = [
  {
    icon: Building2,
    title: "Гости города",
    text: "Быстро собрать маршрут по ключевым местам, не тратя время на поиск информации в разных источниках.",
  },
  {
    icon: Heart,
    title: "Местные жители",
    text: "Открыть новые кафе, парки и локации рядом с домом — для прогулок в выходные и необычных вечеров.",
  },
  {
    icon: Backpack,
    title: "Студенты и компании",
    text: "Спланировать маршрут на день, поделиться им с друзьями и сохранить удачные идеи для будущих поездок.",
  },
];

export function UseCasesSection() {
  return (
    <section className={styles["section-container"]}>
      <div className={styles["section-inner"]}>
        <div className={styles["section-header"]}>
          <h2>Кому подойдёт сервис</h2>
          <p>
            BestWay одинаково удобен и для первого визита в город, и для тех,
            кто хочет увидеть привычные места с новой стороны.
          </p>
        </div>
        <div className={styles["cases-grid"]}>
          {USE_CASES.map(({ icon: Icon, title, text }) => (
            <article key={title} className={styles["case-card"]}>
              <div className={styles["case-icon"]}>
                <Icon color="#006096" />
              </div>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
