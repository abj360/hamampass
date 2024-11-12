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

const PropertiesMapComponent = ({
  properties,
  setSnap,
}: {
  properties: TProperty[];
  setSnap: (value: number) => void;
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null); // To store the map instance
  const markerLayerRef = useRef<VectorLayer<any> | null>(null); // To store marker layer

  useEffect(() => {
    // Initialize the map only once
    if (!mapInstanceRef.current && mapRef.current) {
      const map = CreateMap(mapRef);
      mapInstanceRef.current = map;

      // Create and add the marker layer only once
      const markerLayer = new VectorLayer({
        source: new VectorSource(),
      });
      map.addLayer(markerLayer);
      markerLayerRef.current = markerLayer;

      // Handle map click events
      map.on("click", (e) => {
        const allMarkers = markerLayer.getSource()?.getFeatures();
        const clickedMarkers = map.getFeaturesAtPixel(e.pixel);

        if (clickedMarkers?.length === 1) {
          const marker = clickedMarkers[0] as Feature;
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
    }

    // Update markers only when properties change
    if (markerLayerRef.current && properties) {
      const source = markerLayerRef.current.getSource();
      const existingMarkers = source.getFeatures();

      // Check if properties have actually changed to avoid unnecessary re-renders
      if (existingMarkers.length !== properties.length) {
        source.clear(); // Clear only if there's a change in properties

        properties.forEach((property) => {
          if (property?.contact) {
            CreateMarker({ property, markerLayer: markerLayerRef.current! });
          }
        });
      }
    }
  }, [properties]); // Only re-run when properties changes, not setSnap

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>;
};

export { PropertiesMapComponent };
