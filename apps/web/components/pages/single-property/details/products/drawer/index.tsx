"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerClose,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@hamampass/ui/primitives/drawer.tsx";
import React from "react";
import { TProduct, TProperty } from "@hamampass/db/types";
import { useTranslations } from "@hamampass/i18n";
import { useParams } from "next/navigation";
import { GoDotFill } from "react-icons/go";
import { productPrototypes } from "@/utils/prototypes";
import moment from "moment";
import { useEffect } from "react";
import "moment/locale/tr";
import "moment/locale/en-gb";
import { Separator } from "@hamampass/ui/primitives/separator.tsx";
import CounterComponent from "../counter";
import { Button } from "@hamampass/ui/primitives/button.tsx";
import { useState } from "react";
import Practicioner from "./practicioner";
import { toast } from "@hamampass/ui/primitives/hooks/use-toast.ts";

interface DrawerComponentProps {
  trigger: React.ReactNode;
  data: TProduct;
  property: TProperty;
}

const DrawerComponent = ({ trigger, property, data }: DrawerComponentProps) => {
  const t = useTranslations("home.product-type");
  const p = useTranslations("single.products");
  const { locale } = useParams();
  const [count, setCount] = useState(1);
  //practicioner
  const [selectedPracticioner, setSelectedPracticioner] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (locale === "tr") {
      moment.locale("tr");
    } else {
      moment.locale("en-gb");
    }
  }, [locale]);

  const handleAddToCard = () => {
    if (data.practicioners.length > 0 && !selectedPracticioner) {
      toast({
        title: "Choose a practicioner please ",
        duration: 500,
      });
      return;
    }

    const localItem = JSON.parse(localStorage.getItem("cart") ?? "{}");
    const existingPropertyId = localItem?.property?.id;

    // Check if the cart already contains products and compare property IDs
    if (existingPropertyId && existingPropertyId !== property.id) {
      // Clear the cart if the property ID is different
      localStorage.setItem(
        "cart",
        JSON.stringify({
          property: {
            id: property.id,
            title: property.title,
            img: property.photos[0],
            date: JSON.parse(sessionStorage.getItem("selected-date") ?? "{}"),
          },
          products: {
            [data.type]: {
              count: count,
              price: data.adult_price,
              practicionerId: selectedPracticioner,
            },
          },
        })
      );
    } else {
      // Update the existing cart
      const existingProducts = localItem?.products || {};

      const existingCount = existingProducts[data.type]?.count || 0;

      const updatedProducts = {
        ...existingProducts,
        [data.type]: {
          count: existingCount + count,
          price: data.adult_price,
          practicionerId: selectedPracticioner,
        },
      };

      localStorage.setItem(
        "cart",
        JSON.stringify({
          property: {
            id: property.id,
            title: property.title,
            img: property.photos[0],
            date: JSON.parse(sessionStorage.getItem("selected-date") ?? "{}"),
          },
          products: updatedProducts,
        })
      );
    }

    setCount(0);
    window.location.reload();
  };

  return (
    <Drawer>
      <DrawerTrigger>{trigger}</DrawerTrigger>
      <DrawerContent className="max-h-[90%] ">
        <DrawerHeader>
          <DrawerTitle className="flex flex-col gap-2">
            <span> {t(data.type.toString())}</span>
            <span className="text-xs text-gray-400">
              {moment(
                JSON.parse(sessionStorage.getItem("selected-date") ?? "{}")
              ).format("D MMMM YYYY")}
            </span>
          </DrawerTitle>
          <DrawerClose className="absolute top-2 right-5">X</DrawerClose>
        </DrawerHeader>

        <div className="px-2">
          <div className="text-left">
            <Separator />
            <div className="my-2 flex items-center justify-between">
              <div className="flex flex-col  ">
                <p>
                  <span className="font-medium mr-1">{p("adult")}</span>

                  <span className="text-xs text-gray-400 font-light">
                    ({p("older")} {data.age ?? productPrototypes[data.type].age}
                    )
                  </span>
                </p>
                <p className="font-semibo">
                  ₺{data.adult_price}
                  <span className="text-sm ml-1">TL</span>
                </p>
              </div>

              <CounterComponent count={count} setCount={setCount} />
            </div>

            <Separator />

            {/* {data.child_price ? (
            <div className="flex items-center gap-2 justify-between ">
              <p>
                {p("child")} :{" "}
                <span className="text-xs">
                  (0 - {data.age ?? productPrototypes[data.type].age} )
                </span>
              </p>
              <p className="font-bold">
                ₺{data.child_price}
                <span className="text-sm ml-1">TL</span>
              </p>
            </div>
          ) : null} */}
          </div>

          <div className="border border-secondary-10 bg-secondary-10/20 rounded-lg flex items-center justify-center text-secondary-700  mt-2">
            Towels are included
          </div>

          <Practicioner
            count={count}
            data={data.practicioners}
            selectedPracticioner={selectedPracticioner}
            setSelectedPracticioner={setSelectedPracticioner}
          />

          <div className="overflow-y-auto mt-5">
            {(data[`detail_${locale}`].length > 0
              ? data[`detail_${locale}`]
              : productPrototypes[data.type][`detail_${locale}`]
            ).map((item: string) => (
              <DrawerDescription
                key={item}
                className="flex items-center gap-1 text-black text-md"
              >
                <GoDotFill size={10} />
                <span>{item}</span>
              </DrawerDescription>
            ))}
          </div>
          <div>
            {data[`desc_${locale}`] ??
              productPrototypes[data.type][`desc_${locale}`]}
          </div>
        </div>

        <DrawerFooter className=" px-3 py-2 border-t mt-4 shadow-xl flex-row items-center  ">
          <div className="flex flex-1 flex-col">
            <p className="text-xs text-gray-600">{p("total")}</p>
            <p className="font-bold text-xl">
              ₺{data.adult_price * count}
              <span className="text-sm ml-1">TL</span>
            </p>
            <p className="text-xs">{p("no_credit")}</p>
          </div>

          <Button
            className={`rounded-xl px-8 bg-primary-500 ${
              count === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleAddToCard}
          >
            {p("add")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
