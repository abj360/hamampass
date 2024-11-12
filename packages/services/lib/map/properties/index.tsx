"use client";
import React, { useEffect, useRef } from "react";
import Feature from "ol/Feature";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { TProperty } from "@hamampass/db/types";
import { CreateMarker } from "./components/marker";
import { CreateMap } from "./components/mapContainer";
import { updateMarkerState } from "./handler";
import { findProperty } from "./utils/findProperty";
import { set } from "ol/transform";

const PropertiesMapComponent = ({
  properties,
  setSnap,
}: {
  properties: TProperty[];
  setSnap: any;
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const map = CreateMap(mapRef);

    const markerLayer = new VectorLayer({
      source: new VectorSource(),
    });
    map.addLayer(markerLayer);

    properties?.forEach((property) => {
      if (!property?.contact) return;

      CreateMarker({ property, markerLayer });
    });

    map.on("click", (e) => {
      const allMarkers = markerLayer.getSource()?.getFeatures();
      const clickedMarkers = map.getFeaturesAtPixel(e.pixel);

      if (clickedMarkers?.length === 1) {
        const marker = clickedMarkers[0] as Feature; // Cast to Feature
        const data = marker.getProperties();

        if (data.isActive) {
          updateMarkerState({ data, marker, state: false });
          return;
        }

        updateMarkerState({ data, marker, state: true });

        const property = findProperty({
          properties,
          title: data.title,
          sex: data.sex,
        });
        setSnap(1 / 14);
        console.log("selected property:", property);
      }
      if (!clickedMarkers?.length) {
        allMarkers?.forEach((marker) => {
          const data = marker.getProperties();
          updateMarkerState({ data, marker, state: false });
        });
      }
    });

    return () => map.setTarget(undefined);
  }, [properties]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>;
};

export { PropertiesMapComponent };
