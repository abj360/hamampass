import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "@hamampass/i18n";
import Image from "next/image";
import { TProperty } from "@hamampass/db/types";
import { photos } from "@/mock/photos";
import { IoStar } from "react-icons/io5";
import { Separator } from "@hamampass/ui/primitives/separator.tsx";
import { useState, useEffect, use } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@hamampass/ui/primitives/carousel.tsx";
import HeartComponent from "./heart";
import TitleCard from "./title";
import { MdLocationOn } from "react-icons/md";
import Amenities from "./lib/amenities";
import { request } from "@hamampass/services";
import useDay from "@/hooks/useDay";

const CardItem = ({ property }: { property: TProperty }) => {
  const { locale } = useParams();

  const product_type = useTranslations("home.product-type");

  const [sortedProducts, setSortedProducts] = useState(property.products);
  const [activeSlide, setActiveSlide] = useState(0);
  const router = useRouter();

  const handleCardClick = async () => {
    const convertedTitle = encodeURIComponent(
      property.title.replace(/ /g, "-")
    );

    const req = await request({
      type: "get",
      endpoint: `admin/${property?.id}`,
    });

    if (req.data) {
      router.push(`/${locale}/${property.sex}${convertedTitle}`);
      return;
    }

    router.push(`/${locale}/${convertedTitle}`);
  };

  useEffect(() => {
    if (property.products.length > 1) {
      const count = [...property.products].sort((a, b) =>
        a.type > b.type ? 1 : -1
      );
      setSortedProducts(count);
    }
  }, [property.products]);

  const chose = property.photos.length > 1 ? property.photos : photos;
  const images = chose.slice(0, 3);

  return (
    <button
      onClick={handleCardClick}
      aria-label={`View details of ${property.title}`}
      className="border rounded-lg shadow-sm"
    >
      <Carousel
        setApi={(api) =>
          api?.on("select", () => setActiveSlide(api.selectedScrollSnap()))
        }
        className="relative  "
        opts={{
          align: "start",
          loop: true,
        }}
      >
        {/* wishlist */}
        <HeartComponent property={property} />

        <CarouselContent className="rounded-none -ml-1 aspect-video ">
          {images.map((photo: string, index: number) => (
            <CarouselItem key={photo} className="pl-1">
              <Image
                src={photo}
                alt={property.title || "property"}
                height={900}
                width={1600}
                className="rounded-t-lg"
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(max-width: 800px) 100vw, 800px"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-1 absolute bottom-2 left-1/2 transform -translate-x-1/2 ">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2.5 h-2.5 rounded-full ${
                index === activeSlide
                  ? "bg-secondary-10 border border-white"
                  : "bg-white"
              }`}
            />
          ))}
        </div>
      </Carousel>

      <div className="mx-2">
        <div>
          <div className="flex flex-col items-start">
            <div className="flex  items-end mt-1">
              <MdLocationOn className="text-orange-600 w-5 h-5 -ml-1" />
              <p className="text-sgray-100 text-xs">
                {property.contact.district} / {property.contact.city}
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <TitleCard property={property} />
              {property.rating && (
                <div className="flex items-end justify-center gap-1 mr-2">
                  <IoStar className="text-primary-500 w-6 h-6" />
                  <p className="flex items-end gap-1">
                    <span className="font-semibold text-xl -mb-1">
                      {parseFloat(
                        property?.rating?.rate_overall?.toFixed(1)
                      ).toFixed(1) || ""}
                    </span>
                    <span className="text-sgray-100 text-xs font-normal">
                      {" "}
                      ({property?.rating?.count || 0})
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex h-14">
          {sortedProducts.map((product, index) => (
            <div key={product.id} className="flex items-center">
              <div className="flex-1 flex flex-col items-start justify-between">
                <p className="font-medium text-gray-600">
                  {product_type(product.type.toString())}
                </p>

                <div className="flex gap-1 items-center">
                  <span className="font-semibold text-lg text-slate-800">
                    ₺{product.adult_price}
                  </span>
                  <span className="text-sm text-gray-500">TL</span>
                </div>
              </div>

              {index !== sortedProducts.length - 1 && (
                <Separator className="h-8 mx-7" orientation="vertical" />
              )}
            </div>
          ))}
        </div>

        <Amenities property={property} />
      </div>
    </button>
  );
};

export default CardItem;
