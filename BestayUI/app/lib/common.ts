import type { LngLat } from "@yandex/ymaps3-types";
import { GEOCODING_URL } from "./variables";

export const fetchGeoObject = async (coordinates: LngLat) => {
  try {
    const response = await fetch(
      `${GEOCODING_URL}&geocode=${coordinates[0]},${coordinates[1]}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const foundGeoObject =
      data.response.GeoObjectCollection.featureMember[0]?.GeoObject;

    if (!foundGeoObject) {
      throw new Error("GeoObject not found");
    }

    return foundGeoObject;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
