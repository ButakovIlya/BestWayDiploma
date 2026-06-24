"use client";

import styles from "./interesting-places-section.module.css";
import route1 from "@/public/places/1.png";
import route2 from "@/public/places/2.png";
import route3 from "@/public/places/3.png";
import route4 from "@/public/places/4.png";
import route5 from "@/public/places/5.jpg";
import route6 from "@/public/places/6.png";
import { ChevronRight, MapPin } from "lucide-react";
import { Reveal } from "./reveal";

const ROUTES = [
  {
    image: route1.src,
    city: "Пермь",
    title: "Самые эстетичные кофейни",
    places: "10 мест",
    highlight: "Monkey Grinder",
  },
  {
    image: route2.src,
    city: "Пермь",
    title: "Прогулка до набережной",
    places: "8 мест",
    highlight: "Смотровая площадка",
  },
  {
    image: route3.src,
    city: "Пермь",
    title: 'Горнолыжный курорт "Губаха"',
    places: "5 мест",
    highlight: "Гора Крестовая",
  },
  {
    image: route4.src,
    city: "Пермь",
    title: "Прогулка по городу",
    places: "11 мест",
    highlight: "Мишка-Солёные уши",
  },
  {
    image: route5.src,
    city: "Пермь",
    title: "Главные достопримечательности Перми",
    places: "9 мест",
    highlight: "Церковь Вознесения Господня",
  },
  {
    image: route6.src,
    city: "Пермь",
    title: "Культурное времяпрепроводждение",
    places: "7 мест",
    highlight: "Театр оперы и балета имени П. И. Чайковского",
  },
];

export function InterestingPlacesSection() {
  return (
    <div className={styles["section-container"]}>
      <Reveal className={styles["title"]}>
        <h2>Интересные маршруты</h2>
        <p className={styles["title-description"]}>
          Подборки прогулок по Перми и области — от кофеен и набережной до
          культурных мест и горных маршрутов.
        </p>
      </Reveal>
      <Reveal delay={120}>
        <div className={styles["section-inner"]}>
          <div>
            <p>Запоминающиеся городские маршруты:</p>
            <div className={styles["routes-container"]}>
              {ROUTES.map((route, index) => (
                <Reveal key={route.title} delay={index * 90} variant="scale">
                  <div
                    className={styles["route-card"]}
                    style={{ backgroundImage: `url(${route.image})` }}
                  >
                    <div>
                      <div>
                        <p>{route.city}</p>
                      </div>
                      <a className={styles["pill-button"]} href="/feed">
                        <ChevronRight color="#006096" />
                      </a>
                    </div>
                    <div>
                      <div>
                        <p>{route.title}</p>
                        <p>{route.places}</p>
                      </div>
                      <div>
                        <div className={styles["pin-route"]}>
                          <MapPin color="#4A4A6A" />
                          <div className={styles["route-line"]} />
                        </div>
                        <p>{route.highlight}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
