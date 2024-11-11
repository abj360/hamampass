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
  const snapPoints = [1 / 12, 1 / 2, 50 / 51];
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
        <DrawerContent className="h-full rounded-t-xl">
          <DrawerHeader className="rounded-t-lg flex items-center justify-center h-18 flex-col gap-3">
            <div className="w-14 h-1 bg-gray-400 rounded-xl" />
            <p className="text-sm">2 hamams found</p>
          </DrawerHeader>
          {children}
        </DrawerContent>
      </Drawer>
      <div className="h-svh bg-black">
        <GoogleMapComponent />
      </div>
      {snap === 50 / 51 && (
        <button
          className="fixed bottom-11 left-1/2 transform -translate-x-1/2 z-[51] text-lg bg-primary-10/90 text-white px-4 py-1 rounded-lg"
          onClick={() => setSnap(1 / 12)}
        >
          Map
        </button>
      )}
    </div>
  );
};

export default MapDrawerComponent;
