"use client";

import { useRef } from "react";
import Slider from "./image-slider";
import { MdLocationOn } from "react-icons/md";
import { TProperty } from "@hamampass/db/types";
import { useTranslations } from "@hamampass/i18n";
import DetailsComponent from "./details";
import { IoStar } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import DrawerGeneral from "@/components/commons/drawer";
import GoogleMapComponent from "@/components/pages/single-property/details/location/map";
import Header from "@/components/commons/new-header";
import Gender from "../properties/cards/card-item/lib/amenities/gender";
import Price from "./lib/price";

const SinglePropertyPage = ({
  data,
  decode_title,
}: {
  data: TProperty;
  decode_title: string;
}) => {
  const reviewRef = useRef<HTMLDivElement>(null);

  const title = useTranslations("titles");
  const view = useTranslations("single");

  const scrollToReview = () => {
    if (reviewRef.current) {
      const headerOffset = window.innerHeight * 0.09;
      const elementPosition = reviewRef.current.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-6">
      <Header variant="white" title={decode_title} />
      <Slider data={data} />

      {/* {data && <BookButton property={data} />} */}

      <div className="pt-2">
        <div className="mx-2 flex flex-col">
          <div className="flex justify-between items-center">
            <DrawerGeneral
              trigger={
                <div className="text-sm flex items-center gap-1">
                  <div className="flex">
                    <MdLocationOn className="text-orange-600" size={18} />
                    {data?.contact.district} / {data?.contact.city}
                  </div>
                  <GoDotFill className="text-gray-500" size={10} />
                  <p className="text-xs">{view("view-map")} </p>
                </div>
              }
              content={
                <div className="h-full">
                  <GoogleMapComponent contact={data?.contact?.location} />
                </div>
              }
              handleOnly={true}
              fullWidth={true}
              title={title("location-title")}
            />

            {/* review star  */}
            {data?.rating && (
              <div
                className="flex items-center gap-1 "
                onClick={scrollToReview}
              >
                <IoStar className="text-primary-500 w-6 h-6" />
                <span className="font-semibold text-xl -mb-1">
                  {(data &&
                    parseFloat(data?.rating?.rate_overall?.toFixed(1)).toFixed(
                      1
                    )) ||
                    ""}
                </span>
              </div>
            )}
          </div>
          <h1 className="font-semibold text-2xl text-slate-700 mb-2">
            {data?.title}
          </h1>
          {data && (
            <div className="flex items-center justify-between w-2/3  text-xs">
              <Gender property={data} />
              <Price id={data?.pay} />
            </div>
          )}
        </div>

        {data && <DetailsComponent data={data} ref={reviewRef} />}
      </div>
    </div>
  );
};

export default SinglePropertyPage;
