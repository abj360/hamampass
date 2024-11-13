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
                <DialogContent className="p-0 border-none overflow-hidden touch-none">
                  <Image
                    src={photo}
                    width={1600}
                    height={900}
                    alt="photo"
                    className="object-cover w-full h-full "
                  />
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
