import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import HoverComponent from "./hover";
import { FaTurkishLiraSign } from "react-icons/fa6";
import { TProperty } from "@/types";
import { useTranslations } from "next-intl";

interface CardProps {
  property: TProperty;
}

const Card = ({ property }: CardProps) => {
  const t = useTranslations("card");
  const s = useTranslations("sex");
  const v = useTranslations("vibe");
  return (
    <div className=" mb-2 m-1">
      <Carousel>
        <CarouselContent>
          {property.photos.map((photo: string) => (
            <CarouselItem key={photo}>
              <Image
                src={photo}
                alt={property.title}
                width={400}
                height={400}
                className="rounded-xl"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div>
        <h2 className="text-xl font-bold text-slate-700 my-2">
          {property.title}
        </h2>
        <div>
          <span className="bg-emerald-500 text-white px-2 py-[.1rem] rounded-xl">
            {v(property.vibe)}
          </span>
          {property.sex === 1 ? (
            <span className="bg-blue-500 text-white px-2 py-[.1rem] rounded-xl ml-2">
              {s("men")}
            </span>
          ) : property.sex === 2 ? (
            <span className="bg-red-500 text-white px-2 py-[.1rem] rounded-xl ml-2">
              {s("women")}
            </span>
          ) : null}
        </div>

        <p className="flex gap-4 mt-2 ml-1">
          {property.amenities.map((amenity: any, index: number) => (
            <HoverComponent key={index} amenity={amenity} />
          ))}
        </p>
      </div>

      <div className=" flex h-16 mt-2 ">
        <div className=" flex-1 flex flex-col items-center justify-center">
          <p className="font-bold">{t("adult")}</p>

          <p>
            {property.price.adult}{" "}
            <FaTurkishLiraSign className="inline-block pb-1 " />
          </p>
        </div>
        <div className="w-[.1rem] flex items-center">
          <div className="bg-black w-[.1rem] h-8 "></div>
        </div>

        <div className=" flex-1 flex flex-col items-center justify-center">
          <p className="font-bold">{t("child")}</p>
          <p>
            {property.price.adult}{" "}
            <FaTurkishLiraSign className="inline-block pb-1" />
          </p>
        </div>
        <div className="w-[.1rem] flex items-center">
          <div className="bg-black w-[.1rem] h-8 "></div>
        </div>
        <div className=" flex-1 flex flex-col items-center justify-center">
          <p className="font-bold">{t("scrub")}</p>
          <p>
            {property.price.adult}
            <FaTurkishLiraSign className="inline-block pb-1" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
