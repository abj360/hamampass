import { TProperty } from "@hamampass/db/types";
import DisplayAmenityIcon from "@/components/commons/display-amenity-icon";
import Gender from "./gender";
import IsPublic from "./isPublic";

const Amenities = ({ property }: { property: TProperty }) => {
  return (
    <div className="flex items-center justify-between gap-4  ml-1 max-w-[85vw] overflow-x-auto overflow-hidden pb-3">
      <Gender property={property} />
      <IsPublic isPublic={property.isPublic} />
    </div>
  );
};

export default Amenities;
