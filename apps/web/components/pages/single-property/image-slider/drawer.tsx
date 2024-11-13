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
import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface GaleryDrawerProps {
  trigger: React.ReactNode;
  data: string[];
}

const GaleryDrawer: React.FC<GaleryDrawerProps> = ({ trigger, data }) => {
  const s = useTranslations("titles");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Open modal with selected image
  const openImageModal = (photo: string) => {
    setSelectedImage(photo);
  };

  // Close modal
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent closing the drawer when clicking on the overlay
    closeImageModal(); // Close the zoom modal
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
              <Zoom>
                <Image
                  src={photo}
                  width={1600}
                  height={900}
                  alt="photo"
                  className="object-cover w-full h-full"
                  onClick={() => openImageModal(photo)}
                />
              </Zoom>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default GaleryDrawer;
