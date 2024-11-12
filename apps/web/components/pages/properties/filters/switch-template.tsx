"use client";

import { useState, useEffect, use } from "react";
import { Separator } from "@hamampass/ui/primitives/separator.tsx";
import { useSearchParams } from "next/navigation";
import getDayIndexFromSession from "@/utils/getDayIndextFromSession";

// Define prop types for better readability and TypeScript support
interface ButtonProps {
  name: string;
  value: number | null;
}

interface SwitchTemplateProps {
  buttons: ButtonProps[];
  param: string;
  title: string;
  isSex?: boolean;
}

const SwitchTemplate = ({
  buttons,
  param,
  title,
  isSex,
}: SwitchTemplateProps) => {
  const searchParams = useSearchParams();

  const [activeButton, setActiveButton] = useState<ButtonProps>(buttons[0]);

  const handleButtonClick = (button: ButtonProps) => {
    setActiveButton(button);

    const urlParams = new URLSearchParams(window.location.search);

    if (button.value !== null) {
      urlParams.set(param, button.value.toString());
      isSex && urlParams.set("day", getDayIndexFromSession()?.toString());

      window.history.replaceState(null, "", `?${urlParams.toString()}`);
    } else {
      urlParams.delete(param);
      isSex && urlParams.delete("day");
      window.history.replaceState(null, "", `?${urlParams.toString()}`);
    }
  };

  const buttonClass = (button: ButtonProps) =>
    `flex-1 text-center p-2 rounded-lg mx-1 ${
      activeButton.name === button.name
        ? "border border-black "
        : "border-transparent"
    }`;

  useEffect(() => {
    const paramValue = searchParams.get(param);

    paramValue
      ? setActiveButton(
          buttons.find((button) => button.value === +paramValue) || buttons[0]
        )
      : setActiveButton(
          buttons.find((button) => button.value == null) || buttons[0]
        );
  }, [searchParams]);

  return (
    <div className="flex flex-col my-4 gap-2">
      <h3 className=" font-semibold">{title}</h3>
      <div className="border w-full rounded-xl  flex items-center justify-between p-2">
        {buttons.map((button, index) => (
          <div key={button.name} className="flex items-center flex-1">
            <button
              className={buttonClass(button)}
              onClick={() => handleButtonClick(button)}
            >
              {button.name}
            </button>
            {/* Add a separator between buttons except for the last one */}
            {index < buttons.length - 1 && (
              <Separator orientation="vertical" className="h-5" />
            )}
          </div>
        ))}
      </div>
      <Separator orientation="horizontal" className="text-gray-900 mt-4" />
    </div>
  );
};

export default SwitchTemplate;
