import { renderToStaticMarkup } from "react-dom/server";
import React from "react";

export const generateIconSvg = ({
  content,
  isActive = false,
}: {
  content: number | string;
  isActive?: boolean;
}) => {
  const svgString = renderToStaticMarkup(
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="40">
      <rect
        x="10"
        y="5"
        width="80"
        height="25"
        fill={isActive ? "black" : "white"}
        stroke={isActive ? "white" : "black"}
        strokeWidth="1" // Corrected 'stroke-width' to 'strokeWidth' for JSX compatibility
        rx="5"
        ry="5"
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle" // Corrected 'dominant-baseline' to 'dominantBaseline' for JSX compatibility
        textAnchor="middle" // Corrected 'text-anchor' to 'textAnchor' for JSX compatibility
        fontSize="18" // Corrected 'font-size' to 'fontSize' for JSX compatibility
        fontWeight="bold" // Corrected 'font-weight' to 'fontWeight' for JSX compatibility
        fill={isActive ? "white" : "black"}
      >
        {content} TL
      </text>
    </svg>
  );
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
};
