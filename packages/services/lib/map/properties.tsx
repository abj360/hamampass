"use client";
import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { renderToStaticMarkup } from "react-dom/server";
import { defaults as defaultControls } from "ol/control";
import { data } from "./data";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const PropertiesMapComponent = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initialCenter = fromLonLat([28.954795, 40.996182]);

    // Create the map
    const map = new Map({
      target: mapRef.current || undefined,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: initialCenter,
        zoom: 13,
      }),
      controls: defaultControls({
        zoom: false,
        rotate: false,
        attribution: false,
      }),
    });

    const markerLayer = new VectorLayer({
      source: new VectorSource(),
    });
    map.addLayer(markerLayer);

    const generateIconSvg = (content: string | number) => {
      const svgString = renderToStaticMarkup(
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="40">
          <rect
            x="10"
            y="5"
            width="80"
            height="25"
            fill="white"
            stroke="black"
            stroke-width="1"
            rx="5"
            ry="5"
          />
          <text
            x="50%"
            y="50%"
            dominant-baseline="middle"
            text-anchor="middle"
            font-size="18"
            font-weight="bold"
            fill="black"
          >
            {content} TL
          </text>
        </svg>
      );
      return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
    };

    data?.forEach((property) => {
      const { location } = property.contact;
      if (location) {
        const markerFeature = new Feature({
          geometry: new Point(fromLonLat([location[1], location[0]])),
        });

        markerFeature.setProperties({ mapLink: property.contact.map_link });

        markerFeature.setStyle(
          new Style({
            image: new Icon({
              src: generateIconSvg(property.products[0].adult_price),
              scale: 1,
            }),
          })
        );

        markerLayer.getSource()?.addFeature(markerFeature);
      }
    });

    // Generalized click handler for all markers
    map.on("click", (evt) => {
      const features = map.getFeaturesAtPixel(evt.pixel);
      if (features?.length) {
        const clickedFeature = features[0];
        const googleMapsUrl = clickedFeature.get("mapLink");
        if (googleMapsUrl) window.open(googleMapsUrl, "_blank");
      }
    });

    return () => map.setTarget(undefined);
  }, [data]);

  return <div ref={mapRef} style={containerStyle}></div>;
};

export { PropertiesMapComponent };
