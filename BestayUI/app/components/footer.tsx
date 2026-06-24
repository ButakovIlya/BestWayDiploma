"use client";

import fsiLogo from "@/public/fsi-logo.svg";
import Image from "next/image";
import { Reveal } from "./reveal";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles["footer-container"]}>
      <Reveal variant="fade" className={styles["footer-content"]}>
        <p>© 2026 BestWay</p>
        <div className={styles["info-container"]}>
          <div className={styles["fsi-container"]}>
            <Image src={fsiLogo} width={100} height={50} alt="" />
            <div>
              Проект создан при поддержке Федерального государственного
              бюджетного учреждения &quot;Фонд содействия развитию малых форм
              предприятий в научно-технической сфере&quot; в рамках программы
              &quot;Студенческий стартап&quot; федерального проекта
              &quot;Платформа университетского технологического
              предпринимательства&quot;
            </div>
          </div>
          <div className={styles["contacts-container"]}>
            <p>Контакты</p>
            <div>
              <span>ООО «ИОНИКА»</span>
              <p>
                Юр. адрес: <span>г. Пермь, ул. Косякова, д. 16 </span>
              </p>
              <p>
                Email: <span> ionovanata27@icloud.com</span>
              </p>
              <p>
                Телефон: <span>89194728827 </span>
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
