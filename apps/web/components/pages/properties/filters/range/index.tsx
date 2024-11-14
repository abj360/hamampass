"use client";

import { useTranslations } from "@hamampass/i18n";
import Chart from "./chart";
import React, { useState } from "react";
import { Separator } from "@hamampass/ui/primitives/separator.tsx";

const RangeComponent = () => {
  const title = useTranslations("titles");

  return (
    <div>
      <h3 className="font-semibold">Price Range</h3>
      <Chart />
      <Separator orientation="horizontal" />
    </div>
  );
};

export default RangeComponent;
