import styles from "./interesting-places-section.module.css";
import route1 from "@/public/places/1.png";
import route2 from "@/public/places/2.png";
import route3 from "@/public/places/3.png";
import route4 from "@/public/places/4.png";
import route5 from "@/public/places/5.jpg";
import route6 from "@/public/places/6.png";
import { ChevronRight, MapPin } from "lucide-react";

export function InterestingPlacesSection() {
  return (
    <div className={styles["section-container"]}>
      <div className={styles["title"]}>
        <h2>Интересные маршруты</h2>
        <p className={styles["title-description"]}>
          Подборки прогулок по Перми и области — от кофеен и набережной до
          культурных мест и горных маршрутов.
        </p>
      </div>
      <div className={styles["section-inner"]}>
        <div>
          <p>Запоминающиеся городские маршруты:</p>
          <div className={styles["routes-container"]}>
            <div
              className={styles["route-card"]}
              style={{ backgroundImage: `url(${route1.src})` }}
            >
              <div>
                <div>
                  <p>Пермь</p>
                </div>
                <a className={styles["pill-button"]} href="/feed">
                  <ChevronRight color="#006096" />
                </a>
              </div>
              <div>
                <div>
                  <p>Самые эстетичные кофейни</p>
                  <p>10 мест</p>
                </div>
                <div>
                  <div className={styles["pin-route"]}>
                    <MapPin color="#4A4A6A" />
                    <div className={styles["route-line"]} />
                  </div>
                  <p>Monkey Grinder</p>
                </div>
              </div>
            </div>
            <div
              className={styles["route-card"]}
              style={{ backgroundImage: `url(${route2.src})` }}
            >
              <div>
                <div>
                  <p>Пермь</p>
                </div>
                <a className={styles["pill-button"]} href="/feed">
                  <ChevronRight color="#006096" />
                </a>
              </div>
              <div>
                <div>
                  <p>Прогулка до набережной</p>
                  <p>8 мест</p>
                </div>
                <div>
                  <div className={styles["pin-route"]}>
                    <MapPin color="#4A4A6A" />
                    <div className={styles["route-line"]} />
                  </div>
                  <p>Смотровая площадка</p>
                </div>
              </div>
            </div>
            <div
              className={styles["route-card"]}
              style={{ backgroundImage: `url(${route3.src})` }}
            >
              <div>
                <div>
                  <p>Пермь</p>
                </div>
                <a className={styles["pill-button"]} href="/feed">
                  <ChevronRight color="#006096" />
                </a>
              </div>
              <div>
                <div>
                  <p>{'Горнолыжный курорт "Губаха"'}</p>
                  <p>5 мест</p>
                </div>
                <div>
                  <div className={styles["pin-route"]}>
                    <MapPin color="#4A4A6A" />
                    <div className={styles["route-line"]} />
                  </div>
                  <p>Гора Крестовая</p>
                </div>
              </div>
            </div>
            <div
              className={styles["route-card"]}
              style={{ backgroundImage: `url(${route4.src})` }}
            >
              <div>
                <div>
                  <p>Пермь</p>
                </div>
                <a className={styles["pill-button"]} href="/feed">
                  <ChevronRight color="#006096" />
                </a>
              </div>
              <div>
                <div>
                  <p>Прогулка по городу</p>
                  <p>11 мест</p>
                </div>
                <div>
                  <div className={styles["pin-route"]}>
                    <MapPin color="#4A4A6A" />
                    <div className={styles["route-line"]} />
                  </div>
                  <p>Мишка-Солёные уши</p>
                </div>
              </div>
            </div>
            <div
              className={styles["route-card"]}
              style={{ backgroundImage: `url(${route5.src})` }}
            >
              <div>
                <div>
                  <p>Пермь</p>
                </div>
                <a className={styles["pill-button"]} href="/feed">
                  <ChevronRight color="#006096" />
                </a>
              </div>
              <div>
                <div>
                  <p>Главные достопримечательности Перми</p>
                  <p>9 мест</p>
                </div>
                <div>
                  <div className={styles["pin-route"]}>
                    <MapPin color="#4A4A6A" />
                    <div className={styles["route-line"]} />
                  </div>
                  <p>Церковь Вознесения Господня</p>
                </div>
              </div>
            </div>
            <div
              className={styles["route-card"]}
              style={{ backgroundImage: `url(${route6.src})` }}
            >
              <div>
                <div>
                  <p>Пермь</p>
                </div>
                <a className={styles["pill-button"]} href="/feed">
                  <ChevronRight color="#006096" />
                </a>
              </div>
              <div>
                <div>
                  <p>Культурное времяпрепроводждение</p>
                  <p>7 мест</p>
                </div>
                <div>
                  <div className={styles["pin-route"]}>
                    <MapPin color="#4A4A6A" />
                    <div className={styles["route-line"]} />
                  </div>
                  <p>Театр оперы и балета имени П. И. Чайковского</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
