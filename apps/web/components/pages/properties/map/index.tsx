"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@hamampass/ui/primitives/drawer.tsx";
import { useState } from "react";
import FilterComponent from "@/components/pages/properties/filters";
import GoogleMapComponent from "./map";

const MapDrawerComponent = ({ children }: { children: React.ReactNode }) => {
  const snapPoints = [1 / 2, 1 / 12, 1];
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  return (
    <div>
      <header className="fixed top-0 left-0 w-full bg-black  z-[51]">
        <FilterComponent />
      </header>
      <Drawer
        open={true}
        snapPoints={snapPoints}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
        modal={false}
      >
        <DrawerContent className="h-full">
          <DrawerHeader className=" rounded-t-lg flex items-center justify-center h-18 bg-">
            <div className="w-20 h-1 bg-gray-700 mt-6"></div>
          </DrawerHeader>
          {children}
        </DrawerContent>
      </Drawer>
      <div className="h-svh bg-black">{/* <GoogleMapComponent /> */}</div>
      {/* <div className=" fixed bottom-0   z-[51] bg-red-600">
        <p className="bg-white border border-black rounded px-3 py-1 ">Map</p>
      </div> */}
      {snap === 1 && (
        <button
          className="fixed bottom-11 left-1/2 transform -translate-x-1/2 z-[51] text-lg bg-primary-10  text-white px-4 py-1 rounded-lg"
          onClick={() => setSnap(1 / 12)}
        >
          Map
        </button>
      )}
    </div>
  );
};

export default MapDrawerComponent;
