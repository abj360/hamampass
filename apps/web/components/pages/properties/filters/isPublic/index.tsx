"use client";

import SwitchTemplate from "../switch-template";

const buttons = [
  { name: "Any", value: null },
  { name: "Public", value: 1 },
  { name: "Private", value: 0 },
];

const SpaceComponent = () => {
  return (
    <SwitchTemplate buttons={buttons} param="space" title="Type of place" />
  );
};

export default SpaceComponent;
