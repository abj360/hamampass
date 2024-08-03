"use client";

import CheckboxComponent from "../vibe/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useTranslations } from "next-intl";

const amenityData = [
  {
    id: 0,
    name: "Turkish Bath",
    paramName: "amenity",
  },
  {
    id: 1,
    name: "Shower",
    paramName: "amenity",
  },
  {
    id: 2,
    name: "Sauna",
    paramName: "amenity",
  },
  {
    id: 3,
    name: "Steam Room",
    paramName: "amenity",
  },
  {
    id: 4,
    name: "Jacuzzi",
    paramName: "amenity",
  },
  {
    id: 5,
    name: "Pool",
    paramName: "amenity",
  },
  {
    id: 6,
    name: "Shock Pool",
    paramName: "amenity",
  },
];

const AmenityComponent = () => {
  const [openValue, setOpenValue] = useState("amenity");
  const t = useTranslations("filter");
  const a = useTranslations("amenities");
  return (
    <Accordion
      type="single"
      collapsible
      value={openValue}
      onValueChange={setOpenValue}
    >
      <AccordionItem value="amenity">
        <AccordionTrigger className="text-lg font-bold">
          {t("atitle")}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 ">
          {amenityData.map((amenity) => (
            <CheckboxComponent
              key={amenity.id}
              id={amenity.id}
              name={a(amenity.id.toString())}
              paramName="amenity"
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AmenityComponent;
