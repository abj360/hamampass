"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "@hamampass/i18n";

import { request } from "@hamampass/services";
import { TProperty } from "@hamampass/db/types";

import { Button } from "@hamampass/ui/primitives/button.tsx";
import CardItem from "@/components/pages/properties/cards/card-item";
import { useSelector } from "react-redux";
import { useFetchProperties } from "@/hooks/useFetchProperties";

const Cards = ({ serverProperties }: { serverProperties: TProperty[] }) => {
  useFetchProperties();
  const res = useSelector((state: any) => state.properties.propertyState);

  const [properties, setProperties] = useState<TProperty[]>(
    serverProperties || []
  );
  const [page, setPage] = useState({
    page: 1,
    max_page: 1,
  });

  useEffect(() => {
    setProperties(Array.isArray(res.data) ? res.data : []);

    setPage({
      page: res.page,
      max_page: res.max_page,
    });
  }, [res]);

  const handleLoadMore = async () => {
    try {
      const response = await request({
        type: "get",
        endpoint: "property",
        params: {
          page: page.page + 1,
        },
      });

      setProperties([...properties, ...response.data.data]);

      setPage({
        page: response.data.page,
        max_page: response.data.max_page,
      });
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const c = useTranslations("home");

  return (
    <div className="flex flex-col items-center px-2 py-4 gap-6 overflow-y-auto ">
      <div aria-live="polite" className="flex flex-col gap-6 mb-5">
        {properties.map((property: TProperty) => (
          <CardItem key={property.id} property={property} />
        ))}
        {properties.map((property: TProperty) => (
          <CardItem key={property.id} property={property} />
        ))}
        {properties.map((property: TProperty) => (
          <CardItem key={property.id} property={property} />
        ))}
        {properties.map((property: TProperty) => (
          <CardItem key={property.id} property={property} />
        ))}
        {properties.map((property: TProperty) => (
          <CardItem key={property.id} property={property} />
        ))}
      </div>

      {page.max_page > page.page && (
        <Button
          className="bg-primary-10 w-4/5 mt-2 mb-4"
          onClick={handleLoadMore}
        >
          {c("load-btn")}
        </Button>
      )}
    </div>
  );
};

export default Cards;
