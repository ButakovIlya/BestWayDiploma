import {
  MapPinned,
  MessageSquareText,
  Sparkles,
  Waypoints,
} from "lucide-react";
import { Reveal } from "./reveal";
import styles from "./features-section.module.css";

const FEATURES = [
  {
    icon: Sparkles,
    title: "Маршрут по описанию",
    text: "Напишите, куда и как хотите прогуляться — AI подберёт места из базы и выстроит логичный порядок посещения.",
  },
  {
    icon: Waypoints,
    title: "Конструктор маршрута",
    text: "Соберите прогулку вручную: добавляйте точки, меняйте порядок и сохраняйте готовый маршрут в личном кабинете.",
  },
  {
    icon: MapPinned,
    title: "Карта и точки",
    text: "Каждый маршрут отображается на карте с координатами, категориями мест и удобной навигацией по остановкам.",
  },
  {
    icon: MessageSquareText,
    title: "Лента маршрутов",
    text: "Смотрите идеи других путешественников, делитесь своими прогулками и находите вдохновение для следующей поездки.",
  },
];

export function FeaturesSection() {
  return (
    <section className={styles["section-container"]}>
      <div className={styles["section-inner"]}>
        <Reveal>
          <div className={styles["section-header"]}>
            <h2>Что умеет BestWay</h2>
            <p>
              Сервис помогает быстро спланировать городскую прогулку — от
              романтического вечера до насыщенного туристического дня.
            </p>
          </div>
        </Reveal>
        <div className={styles["features-grid"]}>
          {FEATURES.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 100} variant="scale">
              <article className={styles["feature-card"]}>
                <div className={styles["feature-icon"]}>
                  <Icon color="#006096" />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
