"use client";

import { useTranslations } from "@hamampass/i18n";
import { FaGreaterThan } from "react-icons/fa";
import DrawerGeneral from "@/components/commons/drawer";
import { TAmenity } from "@hamampass/db/types";
import AmenitiesDrawerContent from "./drawer-content";
import DisplayAmenityIcon from "@/components/commons/display-amenity-icon";
import useTrack from "@/hooks/useTrack";

const AmenityComponent = ({ data }: { data: TAmenity }) => {
  const title = useTranslations("titles");
  const see = useTranslations("home.filters.amenities");
  const firstSix = data.facilities.slice(0, 6);
  const track = useTrack();

  const handleSeeAmenities = () => {
    track({
      event: "see amenities click",
    });
  };

  return (
    <section className="flex flex-col gap-2">
      <hr />
      <h2 className="font-bold text-xl text-gray-600">
        {title("amenity_title")}
      </h2>

      {/* Display first six items in a two-column, three-row grid */}
      <div className="flex flex-wrap gap-4 mt-2 ml-1">
        {firstSix.map((id: any, index: number) => (
          <div key={index} className="flex-1 min-w-[45%]">
            <DisplayAmenityIcon amenity={id} isBig={true} />
          </div>
        ))}
      </div>

      <DrawerGeneral
        trigger={
          <button
            onClick={handleSeeAmenities}
            className="btn btn-primary w-full pr-4 text-xs font-semibold flex items-center gap-2 justify-end mt-5"
          >
            <span>{see("see-all")}</span>
            <FaGreaterThan size={10} />
          </button>
        }
        title={title("amenity_title")}
        fill={false}
        content={<AmenitiesDrawerContent data={data} />}
      />
    </section>
  );
};

export default AmenityComponent;
