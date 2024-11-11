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
import { IoHome } from "react-icons/io5";
import { defaults as defaultControls } from "ol/control";
import { TContact } from "@hamampass/db/types";

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface MapComponentProps {
  data: TContact;
}

const MapComponent: React.FC<MapComponentProps> = ({ data }) => {
  const contact = data?.location;
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const center = contact
      ? fromLonLat([contact[1], contact[0]])
      : fromLonLat([43.37828351185324, 38.513499459864306]);

    // Create the map
    const map = new Map({
      target: mapRef.current || undefined,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: center,
        zoom: 13,
      }),
      controls: defaultControls({
        zoom: false,
        rotate: false,
        attribution: false,
      }),
    });

    // Create the marker icon as an SVG string
    const iconSvgString = renderToStaticMarkup(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width="64"
        height="64"
      >
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="purple"
          stroke="white"
          strokeWidth="2"
        />
        <g transform="translate(16, 16)">
          <IoHome size={32} color="#FFFFFF" />
        </g>
      </svg>
    );
    const iconUrl = `data:image/svg+xml;utf8,${encodeURIComponent(iconSvgString)}`;

    // Create the marker feature
    const marker = new Feature({
      geometry: new Point(center),
    });
    marker.setStyle(
      new Style({
        image: new Icon({
          src: iconUrl,
          scale: 0.75,
        }),
      })
    );

    // Add marker to a vector layer
    const markerLayer = new VectorLayer({
      source: new VectorSource({
        features: [marker],
      }),
    });
    map.addLayer(markerLayer);

    // Click handler for marker
    map.on("click", (evt) => {
      const features = map.getFeaturesAtPixel(evt.pixel);
      if (features && features.includes(marker)) {
        const googleMapsUrl = data.map_link;
        window.open(googleMapsUrl, "_blank");
      }
    });

    return () => map.setTarget(undefined);
  }, [contact]);

  return <div ref={mapRef} style={containerStyle}></div>;
};

export { MapComponent };
