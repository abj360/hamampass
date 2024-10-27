import { TProperty } from "@hamampass/db/types";
import DisplayAmenityIcon from "@/components/commons/display-amenity-icon";
import Gender from "./gender";

const Amenities = ({ property }: { property: TProperty }) => {
  return (
    <div className="flex items-center justify-start gap-4  ml-1 max-w-[85vw] overflow-x-auto overflow-hidden pb-3">
      <Gender property={property} />
      {property?.amenity?.facilities?.map((id: number, index: number) => (
        <DisplayAmenityIcon key={index} amenity={id} />
      ))}
    </div>
  );
};

export default Amenities;
