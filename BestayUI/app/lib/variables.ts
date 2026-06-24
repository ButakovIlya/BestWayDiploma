import { LngLat, type YMapLocationRequest } from "@yandex/ymaps3-types";

export const LOCATION: YMapLocationRequest = {
  center: [39.904858, 57.618943], // starting position [lng, lat]
  zoom: 18, // starting zoom
};

export const MARKER_LOCATION: LngLat = [39.9046, 57.6186];

export const GEOCODING_URL = `https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_KEY}&format=json&lang=ru_RU`;

export const TRANSLATIONS = {
  infoText: "Нажмите иконку «Парк Стрелка»",
  balloonTitle: "Парк «Стрелка»",
  balloonDescription:
    "Одна из главных достопримечательностей Ярославля. Он расположен на стрелке рек Волги и Которосли.",
  address: "Адрес",
};
