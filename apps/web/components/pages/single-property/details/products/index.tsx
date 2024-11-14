"use client";

import { TProduct, TProperty } from "@hamampass/db/types";
import DrawerComponent from "./drawer";
import { useTranslations } from "@hamampass/i18n";
import { convertProductIcon } from "@/utils/icon_translations";
import useTrack from "@/hooks/useTrack";
import { PlusCircle } from "lucide-react";

interface Props {
  data: TProduct[];
  property: TProperty;
}

const ProductsComponent = ({ data, property }: Props) => {
  data = data.sort((a, b) => (a.type > b.type ? 1 : -1));
  const track = useTrack();

  const t = useTranslations("home.product-type");
  const title = useTranslations("titles");

  const handleProductClick = ({ id }: { id: number }) => {
    track({
      event: `Product with id: ${id} clicked`,
    });
  };

  return (
    <section className="mt-4">
      <h2 className="font-bold text-xl text-gray-600">
        {title("products_title")}
      </h2>
      <div className=" flex flex-col gap-3 my-4">
        {data.map((item) => (
          <DrawerComponent
            key={item.id}
            data={item}
            property={property}
            trigger={
              <div
                key={item.id}
                className="flex justify-between items-center px-5 border  shadow rounded-lg py-3"
                onClick={() => handleProductClick({ id: item.type })}
              >
                <div className="flex gap-1 items-start flex-col text-sm">
                  <div className="flex gap-2 items-center">
                    <h2 className="font-semibold  ">
                      {t(item.type.toString())}
                    </h2>
                    <p className="text-xs">
                      ({" "}
                      {item.type === 0
                        ? "Only Enterance"
                        : "Enterance + Body scrub"}{" "}
                      )
                    </p>
                  </div>
                  <p>₺{item.adult_price} TL</p>
                </div>

                <PlusCircle size={24} className="text-gray-600" />
              </div>
            }
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsComponent;
