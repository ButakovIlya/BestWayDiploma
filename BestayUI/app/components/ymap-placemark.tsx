"use client";

import { useEffect, useRef } from "react";

interface YMapProps {
  style: React.CSSProperties;
  title: string;
  placemark: [number, number];
  description?: string;
}

const YMapPlacemark = (props: YMapProps) => {
  const { style, title, placemark, description } = props;

  const mapRef = useRef<unknown>(null); // для хранения карты
  const initializedRef = useRef(false); // чтобы карта инициализировалась один раз

  useEffect(() => {
    if (!window.ymaps || initializedRef.current) return;

    window.ymaps.ready(() => {
      if (!initializedRef.current) {
        const map = (mapRef.current = new window.ymaps.Map("map", {
          center: placemark,
          zoom: 15,
        }));

        const myPlacemark = new window.ymaps.Placemark(
          placemark,
          {
            balloonContentHeader: `<a href = "#">${title}</a><br>`,
          },
          {
            // Запретим замену обычного балуна на балун-панель.
            balloonPanelMaxMapArea: 0,
            draggable: false,
            preset: "islands#redStretchyIcon",
            // Заставляем балун открываться даже если в нем нет содержимого.
            openEmptyBalloon: true,
          },
        );

        myPlacemark.events.add("balloonopen", function () {
          myPlacemark.properties.set(
            "balloonContent",
            "Идет загрузка данных...",
          );

          // Имитация задержки при загрузке данных (для демонстрации примера).
          window.ymaps
            .geocode(myPlacemark.geometry.getCoordinates(), {
              results: 1,
            })
            .then(function (res: {
              geoObjects: {
                get: (_: number) => {
                  properties: { get: (_: string) => void };
                };
              };
            }) {
              const newContent = res.geoObjects.get(0)
                ? res.geoObjects.get(0).properties.get("name")
                : "Не удалось определить адрес.";

              // Задаем новое содержимое балуна в соответствующее свойство метки.
              myPlacemark.properties.set(
                "balloonContent",
                `<p>${description}</p></br><p>${newContent}</p>`,
              );
            });
        });

        map.geoObjects.add(myPlacemark);

        map.controls.remove("searchControl");

        initializedRef.current = true;
      }
    });
  }, []);

  return <div id="map" style={style} />;
};

export default YMapPlacemark;
