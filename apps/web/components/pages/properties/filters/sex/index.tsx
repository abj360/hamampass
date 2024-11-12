"use client";

import SwitchTemplate from "../switch-template";

const buttons = [
  { name: "Any", value: null },
  { name: "Women", value: 0 },
  { name: "Men ", value: 1 },
  { name: "Unisex", value: 2 },
];

const SpaceComponent = () => {
  return (
    <SwitchTemplate buttons={buttons} param="sex" title="Gender" isSex={true} />
  );
};

export default SpaceComponent;
