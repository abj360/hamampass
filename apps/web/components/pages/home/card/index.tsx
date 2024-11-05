"use client";

import CardItem from "./card-item";
import { TProperty } from "@hamampass/db/types";
import { request } from "@hamampass/services";
import { useEffect, useState } from "react";

const CardSection = () => {
  const [properties, setProperties] = useState<TProperty[]>();

  useEffect(() => {
    const fetchProperties = async () => {
      const req = await request({
        type: "get",
        endpoint: "property",
        params: {
          limit: 3,
        },
      });
      setProperties(req.data.data);
    };

    fetchProperties();
  }, []);

  return (
    <div className="mt-6 mx-3 flex flex-col gap-10">
      {properties?.map((property) => (
        <CardItem key={property.id} property={property} />
      ))}
    </div>
  );
};

export default CardSection;
