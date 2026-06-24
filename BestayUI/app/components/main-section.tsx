import Image from "next/image";
import styles from "./main-section.module.css";
import go from "@/public/go.svg";
import left from "@/public/main-left.svg";
import right from "@/public/main-right.jpg";
import people from "@/public/people.png";
import { ChevronRight } from "lucide-react";

export function MainSection() {
  return (
    <div className={styles["section-container"]}>
      <div className={styles["section-inner"]}>
        <div className={styles["title-container"]}>
          <h1 className={styles["title-part"]}>СОЗДАЛ</h1>
          <div className={styles["title-part-image"]}>
            <Image src={go} width={300} height={50} alt="" />
          </div>
          <p className={styles["title-part"]}>УЕХАЛ</p>
        </div>
        <div className={styles["sides-container"]}>
          <div className={styles["left-block"]}>
            <Image src={left} width={600} height={600} alt="" />
            <h2>
              <span className={styles["main-text-bold"]}>Планируй свои</span>
              <span className={styles["main-text-light"]}> путешествия </span>
              <span className={styles["main-text-bold"]}>легко</span> <br />
              <span className={styles["main-text"]}>
                — просто опиши маршрут <br /> и мы все сделаем!
              </span>
            </h2>
            <div className={styles["pill"]}>
              <div>
                <Image
                  className="object-fill"
                  src={people}
                  width={200}
                  height={200}
                  alt="people"
                />
                <p>
                  Уже более 1000+ людей путешествуют по России <br /> с нами!
                </p>
                <a className={styles["pill-button"]} href="/feed">
                  <ChevronRight color="white" />
                </a>
              </div>
            </div>
          </div>
          <div>
            <Image
              className={styles["right-image"]}
              src={right}
              width={600}
              height={500}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
