import { BackendImage } from "@/app/components/backend-image";
import { PlaceRead } from "@/app/types/entities";
import { ExternalLink, MapPin } from "lucide-react";
import { MAP_PIN_COLORS, MAP_PIN_LETTERS } from "@/app/lib/constants/map-pin";
import styles from "./feed-route-place-card.module.css";

interface FeedRoutePlaceCardProps {
  place: PlaceRead;
  order: number;
  index: number;
}

export function FeedRoutePlaceCard({
  place,
  order,
  index,
}: FeedRoutePlaceCardProps) {
  const placeColor = MAP_PIN_COLORS[index % MAP_PIN_COLORS.length];

  return (
    <article className={styles.card}>
      <div className={styles.timeline}>
        <span
          className={styles.marker}
          style={{ backgroundColor: placeColor }}
        >
          {MAP_PIN_LETTERS[index] ?? order}
        </span>
        <span className={styles.line} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <p className={styles.order}>Остановка {order}</p>
            <h3>{place.name}</h3>
          </div>
          {place.website_url && (
            <a
              href={place.website_url}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              <ExternalLink size={16} />
              Сайт
            </a>
          )}
        </div>

        <div className={styles.meta}>
          {place.category && <span className={styles.chip}>{place.category}</span>}
          {place.type && <span className={styles.chip}>{place.type}</span>}
          {place.city && <span className={styles.chip}>{place.city}</span>}
        </div>

        {place.description && (
          <p className={styles.description}>{place.description}</p>
        )}

        {place.tags && <p className={styles.tags}>Теги: {place.tags}</p>}

        {place.coordinates && place.coordinates.length >= 2 && (
          <p className={styles.coords}>
            <MapPin size={14} />
            {place.coordinates[1].toFixed(5)}, {place.coordinates[0].toFixed(5)}
          </p>
        )}

        {place.photo && (
          <div className={styles.photoWrap}>
            <BackendImage
              src={place.photo}
              alt={place.name}
              className={styles.photo}
            />
          </div>
        )}
      </div>
    </article>
  );
}
