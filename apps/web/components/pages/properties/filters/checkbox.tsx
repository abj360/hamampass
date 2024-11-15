"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { Checkbox } from "@hamampass/ui/primitives/checkbox.tsx";
import { Label } from "@hamampass/ui/primitives/label.tsx";

import DisplayAmenityIcon from "@/components/commons/display-amenity-icon";

interface CheckboxProps {
  id: number;
  name: string;
  paramName: string;
  isIcon?: boolean;
}

const CheckboxComponent = ({ id, name, paramName, isIcon }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const searchParams = useSearchParams();

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    // Update URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    let vibeArray: number[] = urlParams.has(paramName)
      ? JSON.parse(urlParams.get(paramName) || "[]")
      : [];

    if (newCheckedState) {
      // Add value to the array
      vibeArray.push(id);
    } else {
      // Remove value from the array
      vibeArray = vibeArray.filter((vibe: number) => vibe !== id);
    }

    if (vibeArray.length > 0) {
      urlParams.set(paramName, JSON.stringify(vibeArray));
    } else {
      urlParams.delete(paramName);
    }

    window.history.replaceState(null, "", `?${urlParams.toString()}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const vibeParam = urlParams.get(paramName);
    const vibeArray: number[] = vibeParam ? JSON.parse(vibeParam) : [];

    searchParams.get(paramName)
      ? setIsChecked(vibeArray.includes(id))
      : setIsChecked(false);
  }, [searchParams]);

  return (
    <Label className="flex items-center gap-2 justify-between ">
      {isIcon ? (
        <div className="flex gap-4 items-center">
          <DisplayAmenityIcon isBig={true} amenity={id} />
        </div>
      ) : (
        <span>{name}</span>
      )}

      <Checkbox
        checked={isChecked}
        onClick={handleCheckboxChange}
        className="w-6 h-6"
      />
    </Label>
  );
};

export default CheckboxComponent;
