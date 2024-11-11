"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
} from "@hamampass/ui/primitives/drawer.tsx";
import { useState, useEffect } from "react";
import FilterComponent from "@/components/pages/properties/filters";
import GoogleMapComponent from "./map";

const MapDrawerComponent = ({ children }: { children?: React.ReactNode }) => {
  const snapPoints = [1 / 12, 1 / 2, 15 / 16];
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  useEffect(() => {
    setSnap(snapPoints[1]);
  }, []);

  return (
    <div>
      <header className="fixed top-0 left-0 w-full bg-black z-[51]">
        <FilterComponent />
      </header>
      <Drawer
        open={true}
        snapPoints={snapPoints}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
        modal={false}
        snapToSequentialPoint
      >
        <DrawerContent className="h-full">
          <DrawerHeader className="rounded-t-lg flex items-center justify-center h-18">
            <div className="w-20 h-1 bg-gray-700 mt-6"></div>
          </DrawerHeader>
          {children}
        </DrawerContent>
      </Drawer>
      <div className="h-svh bg-black">{/* <GoogleMapComponent /> */}</div>
      {snap === 15 / 16 && (
        <button
          className="fixed bottom-11 left-1/2 transform -translate-x-1/2 z-[51] text-lg bg-primary-10 text-white px-4 py-1 rounded-lg"
          onClick={() => setSnap(1 / 12)}
        >
          Map
        </button>
      )}
    </div>
  );
};

export default MapDrawerComponent;
