"use client";

import { useTranslations } from "@hamampass/i18n";

import {
  convertAFacilityIcon,
  convertAFood_DrinkIcon,
  convertAItemIcon,
} from "@/utils/icon_translations";

const DisplayAmenityIcon = ({
  amenity,
  isBig = false,
  type = "facilities",
}: {
  amenity: number;
  isBig?: boolean;
  type?: "facilities" | "items" | "foods_drinks";
}) => {
  const facilities = useTranslations("home.filters.amenities.facilities");
  const items = useTranslations("home.filters.amenities.items");
  const foods_drinks = useTranslations("home.filters.amenities.foods_drinks");

  let convertIcon;
  let translateDesc;

  switch (type) {
    case "facilities":
      convertIcon = convertAFacilityIcon;
      translateDesc = facilities;
      break;
    case "items":
      convertIcon = convertAItemIcon;
      translateDesc = items;
      break;
    case "foods_drinks":
      convertIcon = convertAFood_DrinkIcon;
      translateDesc = foods_drinks;
      break;
    default:
      convertIcon = convertAFacilityIcon;
      translateDesc = facilities;
      break;
  }

  return (
    <div className="text-slate-500 flex gap-2 items-center ">
      <p>{convertIcon(amenity, isBig ? "text-xl" : "")}</p>
      <p className="text-sm whitespace-nowrap">
        {translateDesc(amenity.toString())}
      </p>
    </div>
  );
};

export default DisplayAmenityIcon;
