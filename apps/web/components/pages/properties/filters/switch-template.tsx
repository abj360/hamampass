"use client";

import { useState, useEffect } from "react";
import { Separator } from "@hamampass/ui/primitives/separator.tsx";

// Define prop types for better readability and TypeScript support
interface ButtonProps {
  name: string;
  value: number | null;
}

interface SwitchTemplateProps {
  buttons: ButtonProps[];
  param: string;
  title: string;
}

const SwitchTemplate = ({ buttons, param, title }: SwitchTemplateProps) => {
  const [activeButton, setActiveButton] = useState<ButtonProps>(buttons[0]);

  const handleButtonClick = (button: ButtonProps) => {
    setActiveButton(button);
  };

  useEffect(() => {
    if (activeButton.value !== null) {
      console.log(param, activeButton.value);
    }
  }, [activeButton]);

  const buttonClass = (button: ButtonProps) =>
    `flex-1 text-center p-2 rounded-lg mx-1 ${
      activeButton.name === button.name
        ? "border border-black "
        : "border-transparent"
    }`;

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
    </div>
  );
};

export default SwitchTemplate;
