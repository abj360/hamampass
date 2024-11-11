"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "@hamampass/i18n";

import { request } from "@hamampass/services";
import { TProperty } from "@hamampass/db/types";

import { Button } from "@hamampass/ui/primitives/button.tsx";
import CardItem from "@/components/pages/properties/cards/card-item";

// const [page, setPage] = useState({
//   page: 1,
//   max_page: 1,
// });

const Cards = ({
  properties,
  page,
  handleLoadMore,
}: {
  properties: TProperty[];
  page: {
    page: number;
    max_page: number;
  };
  handleLoadMore: () => void;
}) => {
  const c = useTranslations("home");

  return (
    <div className="flex flex-col items-center px-2 py-4 gap-6 overflow-y-auto ">
      <div aria-live="polite" className="flex flex-col gap-6 mb-5">
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
