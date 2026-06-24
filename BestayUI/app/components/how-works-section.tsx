"use client";

import { Bot, Route, User } from "lucide-react";
import { Reveal } from "./reveal";
import styles from "./how-works-section.module.css";

const STEPS = [
  {
    icon: User,
    iconColor: "#006096",
    iconFill: "#006096",
    title: "1. Пользователь",
    text: "заполняет анкету в профиле, затем пишет место, время и продолжительность маршрута.",
  },
  {
    icon: Bot,
    iconColor: "purple",
    iconFill: undefined,
    title: "2. AI-технология",
    text: "генерирует из своей базы знаний подходящий маршрут по 10 параметрам.",
  },
  {
    icon: Route,
    iconColor: "green",
    iconFill: undefined,
    title: "3. В итоге",
    text: "вы получаете нужный и подходящий вам маршрут, в необходимости меняете точки.",
  },
];

export function HowWorksSection() {
  return (
    <div className={styles["section-container"]}>
      <div className={styles["section-inner"]}>
        <Reveal>
          <h2>Как работает AI помощник-путеводитель?</h2>
          <p className={styles["section-intro"]}>
            Всего три шага — от вашего запроса до готового маршрута с точками на
            карте и возможностью редактирования.
          </p>
        </Reveal>
        <div className={styles["steps-container"]}>
          {STEPS.map(({ icon: Icon, iconColor, iconFill, title, text }, index) => (
            <Reveal key={title} delay={index * 120} variant="left">
              <div className={styles["step-content"]}>
                <div className={styles["step-icon"]}>
                  <Icon color={iconColor} fill={iconFill} />
                </div>
                <div className={styles["step-text"]}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
