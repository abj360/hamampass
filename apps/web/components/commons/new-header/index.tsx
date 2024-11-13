"use client";

import Image from "next/image";
import { Turn as Hamburger } from "hamburger-react";
import { useState, useEffect } from "react";
import HamburgerDrawerComponent from "./drawer";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";

interface HeaderProps {
  variant?: "default" | "sticky" | "white";
  title?: string;
}

const Header = ({ variant = "default", title }: HeaderProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogo = () => {
    router.push(`/`);
  };

  const handleBack = () => {
    router.back();
  };

  // Determine styles and logo based on the variant
  const isSticky = variant === "sticky";
  const isWhite = variant === "white";

  const textColor = isSticky
    ? isOpen
      ? "text-white"
      : "text-primary-10"
    : isWhite
      ? isOpen
        ? "text-white"
        : "text-primary-10"
      : "text-white";

  const logoSrc = isSticky
    ? isOpen
      ? "/longLogo.png"
      : "/darkLongLogo.png"
    : isWhite
      ? isOpen
        ? "/longLogo.png"
        : "/darkLongLogo.png"
      : "/longLogo.png";

  const backgroundColor = isWhite ? "bg-white" : "";

  return (
    <header className={`${textColor} ${backgroundColor} flex `}>
      <button
        onClick={handleLogo}
        className="flex-1 flex items-center justify-center"
      >
        <Image src={logoSrc} width={200} height={200} alt="logo" />
      </button>
    </header>
  );
};

export default Header;
