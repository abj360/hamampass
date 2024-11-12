import { TProperty } from "@hamampass/db/types";
import Image from "next/image";
import Gender from "@/components/pages/properties/cards/card-item/lib/amenities/gender";
import { IoStar } from "react-icons/io5";
import HeartComponent from "../cards/card-item/heart";
import { useRouter } from "next/navigation";
import { request } from "@hamampass/services";
import useTrack from "@/hooks/useTrack";

const ChoosenPropertyCard = ({ property }: { property: TProperty }) => {
  const router = useRouter();
  const track = useTrack();

  const handleCardClick = async () => {
    track({
      event: "map marker card click",
    });

    const convertedTitle = encodeURIComponent(
      property.title.replace(/ /g, "-")
    );

    try {
      const req = await request({
        type: "get",
        endpoint: `admin/${property?.id}`,
      });

      const newRoute = req.data
        ? `/${router.locale}/${property.sex}${convertedTitle}`
        : `/${router.locale}/${convertedTitle}`;

      router.push(newRoute);
    } catch (error) {
      console.error("Failed to fetch property details:", error);
    }
  };

  if (!property) return null;
  return (
    <button
      onClick={handleCardClick}
      className="shadow-lg z-10 absolute bottom-14 inset-x-1 flex rounded-lg overflow-hidden bg-white"
    >
      <Image
        src={property.photos[0]}
        alt={property.title}
        width={144}
        height={81}
        className="object-cover "
      />

      <div className="flex-1 p-1">
        <h3 className="  text-left  font-semibold">{property.title}</h3>
        <HeartComponent property={property} isSmall={true} />
        <Gender property={property} isSmall={true} />

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <IoStar className="text-primary-500 w-4 h-4" />
            <p className="text-sm">New</p>
          </div>
          <div className="flex gap-1 items-center">
            <span className="text-gray-500">from</span>
            <span className="font-semibold text-slate-800">
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
