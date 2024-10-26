import { TProperty } from "@hamampass/db/types";
import DisplayAmenityIcon from "@/components/commons/display-amenity-icon";

const Amenities = ({ property }: { property: TProperty }) => {
  return (
    <div className="flex items-center justify-start gap-4 mb-2 ml-1 max-w-[85vw] overflow-x-auto overflow-hidden pb-1">
      {property?.amenity?.facilities?.map((id: number, index: number) => (
        <DisplayAmenityIcon key={index} amenity={id} />
      ))}
    </div>
  );
};

export default Amenities;
