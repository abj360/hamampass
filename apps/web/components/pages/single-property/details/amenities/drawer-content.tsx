import { TAmenity } from "@hamampass/db/types";
import DisplayAmenityIcon from "@/components/commons/display-amenity-icon";

const AmenitiesDrawerContent = ({ data }: { data: TAmenity }) => {
  return (
    <div className="flex flex-col gap-4 mt-2 ml-1 mb-5">
      <div className="flex flex-col gap-3">
        <h1>Facilities</h1>

        <div className="flex flex-wrap gap-4 mt-2 ml-1">
          {data &&
            data.facilities.map((id: any, index: number) => (
              <div key={index} className="flex-1 min-w-[45%]">
                <DisplayAmenityIcon amenity={id} isBig={true} />
              </div>
            ))}
        </div>
      </div>{" "}
      <div className="flex flex-col gap-3">
        <h1>items</h1>
        <div className="flex flex-wrap gap-4 mt-2 ml-1">
          {data &&
            data.items.map((id: any, index: number) => (
              <div key={index} className="flex-1 min-w-[45%]">
                <DisplayAmenityIcon amenity={id} isBig={true} type="items" />
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1>Foods and Drinks</h1>

        <div className="flex flex-wrap gap-4 mt-2 ml-1">
          {data &&
            data.foods_drinks.map((id: any, index: number) => (
              <div key={index} className="flex-1 min-w-[45%]">
                <DisplayAmenityIcon
                  amenity={id}
                  isBig={true}
                  type="foods_drinks"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AmenitiesDrawerContent;
