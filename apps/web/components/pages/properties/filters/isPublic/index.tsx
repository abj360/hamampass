"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@hamampass/ui/primitives/accordion.tsx";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Item from "./item";

const SortComponent = () => {
  const searchParams = useSearchParams();
  const [isPublic, setIsPublic] = useState(searchParams.get("space") || "");

  useEffect(() => {
    setIsPublic(searchParams.get("space") || "");
  }, [searchParams]);

  const handleGeneral = (
    paramValue: string,
    setParamValue: (a: string) => void,
    paramName: string
  ) => {
    return (value: string) => {
      if (paramValue === value) {
        setParamValue("");
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.delete(paramName);
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}?${newParams.toString()}`
        );
        return;
      }

      setParamValue(value);
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set(paramName, value);

      // Update the URL with the new query parameter
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?${newParams.toString()}`
      );
    };
  };

  const handleSpace = handleGeneral(isPublic, setIsPublic, "space");

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="sort">
        <AccordionTrigger className="text-lg font-bold">Space</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          <Item
            label="Public Hamams"
            checked={isPublic === "1"}
            onClick={() => handleSpace("1")}
          />
          <Item
            label="Private Hamams"
            checked={isPublic === "0"}
            onClick={() => handleSpace("0")}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SortComponent;
