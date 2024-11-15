"use client";
import { useTranslations } from "@hamampass/i18n";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import { IoClose } from "react-icons/io5";
import { request } from "@hamampass/services";
import { TApiResponse } from "@hamampass/db/types";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@hamampass/ui/primitives/drawer.tsx";
import AmenityComponent from "@/components/pages/properties/filters/amenity";
import SortComponent from "@/components/pages/properties/filters/sort";
import SexComponent from "@/components/pages/properties/filters/sex";
import PaymentMethodComponent from "@/components/pages/properties/filters/pay";
import RangeComponent from "@/components/pages/properties/filters/range";
import SpaceComponent from "./isPublic";
import { useSelector } from "react-redux";
import { Button } from "@hamampass/ui/primitives/button.tsx";
import { useRouter } from "next/navigation";
import useTrack from "@/hooks/useTrack";

interface DrawerComponentProps {
  trigger: React.ReactNode;
}

const DrawerComponent = ({ trigger }: DrawerComponentProps) => {
  const title = useTranslations("titles");
  const btn = useTranslations("home.filters");
  const searchParams = useSearchParams();
  const router = useRouter();
  const track = useTrack();

  const properties = useSelector(
    (state: any) => state.properties.propertyState
  );

  const handleClear = () => {
    const newUrl = window.location.pathname;
    router.push(newUrl);
  };

  const handleTriggerClick = () => {
    track({
      event: "filter click",
    });
  };

  return (
    <Drawer>
      <DrawerTrigger
        onClick={handleTriggerClick}
        className={` border-l ${searchParams.size && "border-cyan-500"} `}
      >
        {trigger}
      </DrawerTrigger>
      <DrawerContent className="h-full z-[52]">
        <DrawerHeader className="flex items-center   ">
          <DrawerClose className="absolute top-3">
            <IoClose size={18} />
          </DrawerClose>
          <DrawerTitle className="text-md text-center w-full">
            {title("title")}
          </DrawerTitle>
        </DrawerHeader>
        <hr />
        <div className="px-5 overflow-y-auto">
          <SortComponent />
          <PaymentMethodComponent />
          <SpaceComponent />
          <SexComponent />
          <RangeComponent />
          <AmenityComponent />
        </div>
        <DrawerFooter className="flex flex-row items-center justify-between shadow-lg py-1 ">
          <Button onClick={handleClear} className="flex-1" variant="link">
            {btn("clear")}
          </Button>

          <DrawerClose className="bg-primary-10 rounded-md text-white py-2 flex-1">
            {properties && properties.all_items} {btn("show")}
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
