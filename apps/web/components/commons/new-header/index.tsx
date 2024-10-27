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
  const [cartItemCount, setCartItemCount] = useState(0);

  const handleLogo = () => {
    !title ? router.push(`/`) : window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const handleCartUpdated = () => {
      setCartItemCount(
        Object.values(
          JSON.parse(localStorage.getItem("cart") || "{}")?.products || {}
        ).reduce((acc: number, item: any) => acc + item.count, 0)
      );
    };

    // Initial load
    handleCartUpdated();

    // Add event listener
    window.addEventListener("cartUpdated", handleCartUpdated);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
    };
  }, []);

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
    <header
      className={`flex justify-between items-center ${title && "border-b border-sgray-100 sticky top-0 z-30"} ${textColor} ${backgroundColor}   `}
    >
      {title && (
        <IoChevronBack size={24} className="ml-2" onClick={handleBack} />
      )}
      <button onClick={handleLogo} className="z-40 w-full">
        {title ? (
          <p className="text-xl w-full">{title}</p>
        ) : (
          <Image src={logoSrc} width={200} height={200} alt="logo" />
        )}
      </button>

      <HamburgerDrawerComponent
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        cartItemCount={cartItemCount}
        trigger={
          <div className="relative">
            <Hamburger
              toggled={isOpen}
              size={24}
              aria-expanded={isOpen}
              aria-controls="drawer-content"
            />
            {cartItemCount > 0 && (
              <span className="absolute top-2 right-1 text-xs bg-secondary-700 text-center border text-white aspect-square rounded-full px-1">
                {cartItemCount}
              </span>
            )}
          </div>
        }
      />
    </header>
  );
};

export default Header;
