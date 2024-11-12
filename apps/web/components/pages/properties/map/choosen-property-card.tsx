import { TProperty } from "@hamampass/db/types";
import Image from "next/image";
import Gender from "@/components/pages/properties/cards/card-item/lib/amenities/gender";
import { IoStar } from "react-icons/io5";
import HeartComponent from "../cards/card-item/heart";

const ChoosenPropertyCard = ({ property }: { property: TProperty }) => {
  if (!property) return null;

  const handleCardClick = () => {
    console.log("clicked heheh");
  };

  return (
    <button
      onClick={handleCardClick}
      className="shadow z-10 absolute bottom-14 inset-x-1 text-center rounded-lg flex "
    >
      <Image
        src={property.photos[0]}
        alt={property.title}
        width={16 * 9}
        height={9 * 9}
        objectFit="cover"
        className="rounded-l-lg aspect-video"
      />
      <div className="flex-1 bg-white rounded-r-lg flex flex-col items-start px-2 py-1 justify-between">
        <h3>{property.title}</h3>
        <HeartComponent property={property} isSmall={true} />

        <Gender property={property} isSmall={true} />
        <div className=" w-full flex items-center justify-between">
          <div className="flex items-center gap-1 ">
            <IoStar className="text-primary-500 w-4 h-4" />
            <p className="text-sm">New</p>
          </div>
          <div className="flex gap-1 items-center ">
            <span className=" text-gray-500">from</span>
            <span className="font-semibold  text-slate-800">
              ₺{property.products[0].adult_price}
            </span>
            <span className="text-sm text-gray-500">TL</span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ChoosenPropertyCard;
