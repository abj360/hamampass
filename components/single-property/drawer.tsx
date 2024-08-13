"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import React from "react";
import { TProduct } from "@/types";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface DrawerComponentProps {
  trigger: React.ReactNode;
  data: TProduct;
}

const DrawerComponent = ({ trigger, data }: DrawerComponentProps) => {
  const t = useTranslations("product-type");
  const d = useTranslations("product-desc");
  const { locale } = useParams();
  return (
    <Drawer>
      <DrawerTrigger>{trigger}</DrawerTrigger>
      <DrawerContent className="h-[70%]">
        <DrawerHeader>
          <DrawerTitle>{t(data.type.toString())}</DrawerTitle>
          {locale === "en" ? (
            <DrawerDescription>{d(data.type.toString())}</DrawerDescription>
          ) : (
            <DrawerDescription>{data.type.toString()}</DrawerDescription>
          )}
        </DrawerHeader>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
