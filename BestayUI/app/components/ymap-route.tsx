"use client";

import { useEffect, useRef } from "react";
import { MAP_PIN_COLORS } from "../lib/constants/map-pin";

interface YMapRouteProps {
  places: [number, number][];
}

const YMapRoute = (props: YMapRouteProps) => {
  const { places } = props;

  const mapRef = useRef<unknown>(null); // для хранения карты
  const initializedRef = useRef(false); // чтобы карта инициализировалась один раз

  useEffect(() => {
    if (!window.ymaps || initializedRef.current) return;

    window.ymaps.ready(() => {
      if (initializedRef.current) return;

      const map = new window.ymaps.Map("map", {
        center: [55.751574, 37.573856], // Москва
        zoom: 10,
      });
      mapRef.current = map;

      const multiRoute = new window.ymaps.multiRouter.MultiRoute(
        {
          referencePoints: places,
          params: {
            routingMode: "auto",
          },
        },
        {
          boundsAutoApply: true,
          routeActiveStrokeColor: "#006096",
          routeActiveStrokeWidth: 4,
          routeActiveStrokeStyle: "solid",
        },
      );

      multiRoute.model.events.add("requestsuccess", function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        multiRoute.getWayPoints().each(function (point: any, index: number) {
          point.options.set({
            iconLayout: "default#imageWithContent",
            iconContentLayout: window.ymaps.templateLayoutFactory.createClass(
              `<div style="
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: ${MAP_PIN_COLORS[index % MAP_PIN_COLORS.length]};
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 14px;
        box-shadow: 0 0 4px rgba(0,0,0,0.3);
    ">
      ${String.fromCharCode(65 + index)}
    </div>`,
            ),
          });
        });
      });

      map.geoObjects.add(multiRoute);

      map.controls.remove("searchControl");

      initializedRef.current = true;
    });
  }, []);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
};

export default YMapRoute;
