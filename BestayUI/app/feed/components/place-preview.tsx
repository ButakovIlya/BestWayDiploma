import Image from "next/image";
import styles from "./place-preview.module.css";
import { MAP_PIN_COLORS, MAP_PIN_LETTERS } from "@/app/lib/constants/map-pin";
import { BASE_COLOR } from "@/app/lib/constants/base-color";

interface PlacePreviewProps {
  name: string;
  description: string;
  photo?: string | null;
  index?: number;
}

export function PlacePreview(props: PlacePreviewProps) {
  const { index, name, description, photo } = props;

  const placeColor =
    index !== undefined
      ? MAP_PIN_COLORS[index % MAP_PIN_COLORS.length]
      : BASE_COLOR;

  return (
    <div className={styles["place-container"]}>
      <div
        className={styles["place-container__info"]}
        style={{
          backgroundColor: placeColor,
        }}
      >
        <div className={styles["info-container"]}>
          {index !== undefined && <p>{MAP_PIN_LETTERS[index]}</p>}
          <div>
            <p>{name}</p>
            <p
              className={styles["info__description"]}
              style={{ color: index !== undefined ? "black" : "gray" }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className={styles["place-container__photo-containter"]}>
        <Image
          src={
            photo ||
            "https://images.unsplash.com/photo-1589370417257-319ba6654bde?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          width={500}
          height={200}
          alt="photo"
          className={styles["photo-containter__photo"]}
        />
        <div
          className={styles["photo-containter__transition"]}
          style={{
            background: `linear-gradient(to left, transparent, ${placeColor})`,
          }}
        />
      </div>
    </div>
  );
}
