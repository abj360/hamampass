"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@hamampass/ui/primitives/drawer.tsx";
import Image from "next/image";
import { useTranslations } from "@hamampass/i18n";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@hamampass/ui/primitives/dialog.tsx";
import React, { useState } from "react";

interface GaleryDrawerProps {
  trigger: React.ReactNode;
  data: string[];
}

const GaleryDrawer: React.FC<GaleryDrawerProps> = ({ trigger, data }) => {
  const s = useTranslations("titles");
  const [scale, setScale] = useState(1); // Scale for zoom

  // Handle mouse wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    let newScale = scale + e.deltaY * -0.01;
    newScale = Math.min(Math.max(1, newScale), 3); // Limit scale between 1x and 3x
    setScale(newScale);
  };

  // Handle pinch zoom
  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.pageX - touch1.pageX, 2) +
          Math.pow(touch2.pageY - touch1.pageY, 2)
      );
      setScale(distance / 100); // Adjust 100 to fit your needs
    }
  };

  return (
    <Drawer>
      <DrawerTrigger className="w-full">{trigger}</DrawerTrigger>
      <DrawerContent className="max-h-full">
        <DrawerHeader className="flex justify-between items-center mt-2">
          <DrawerTitle className="text-center mb-2">
            {s("gallery-title")}
          </DrawerTitle>
          <DrawerClose className="text-xl">X</DrawerClose>
        </DrawerHeader>
        <div className="flex-1 px-4 flex flex-col gap-3 pb-6 overflow-y-auto">
          {data.map((photo) => (
            <div key={photo} className="relative w-full h-96 cursor-pointer">
              <Dialog>
                <DialogTrigger>
                  <Image
                    src={photo}
                    width={1600}
                    height={900}
                    alt="photo"
                    className="object-cover w-full h-full touch-auto overflow-auto"
                  />
                </DialogTrigger>
                <DialogContent
                  className="p-0 border-none overflow-hidden"
                  onWheel={handleWheel}
                  onTouchMove={handleTouchMove}
                >
                  <div
                    style={{
                      transform: `scale(${scale})`,
                      transformOrigin: "center center",
                      transition: "transform 0.2s ease",
                    }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={photo}
                      width={1600}
                      height={900}
                      alt="photo"
                      className="object-cover w-full h-full touch-auto"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default GaleryDrawer;
