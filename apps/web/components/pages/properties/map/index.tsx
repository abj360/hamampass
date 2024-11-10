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

interface DrawerComponentProps {
  trigger: React.ReactNode;
}

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
        snapToSequentialPoint
        modal={false}
      >
        <DrawerContent className="h-full  ">
          <DrawerHeader className=" rounded-t-lg flex items-center justify-center h-24 bg-">
            <div className="w-20 h-1 bg-gray-700"></div>
          </DrawerHeader>
          {children}
        </DrawerContent>
      </Drawer>
      <div className="h-svh">
        <GoogleMapComponent />
      </div>
    </div>
  );
};

export default MapDrawerComponent;
