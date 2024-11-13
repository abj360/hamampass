import { BiSearch } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import { PiPlus } from "react-icons/pi";
import { useState, useEffect } from "react";
import HamburgerDrawerComponent from "@/components/commons/new-header/drawer";

const AbsluteFooter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

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

  return (
    <footer className="bg-black text-white sticky bottom-0 shadow-lg border-t">
      <ul className="flex bg-white text-black items-center justify-between  py-2">
        <li className="flex flex-col items-center justify-center gap-1 flex-1">
          <BiSearch size={22} className="font-light" />
          <span className="text-xs">Discover</span>
        </li>{" "}
        <li className="flex flex-col items-center justify-center gap-1 flex-1 ">
          <BsPerson size={22} className="font-light" />
          <span className="text-xs">Login</span>
        </li>{" "}
        <li className="flex flex-col items-center justify-center gap-1 flex-1">
          <BsWhatsapp size={22} className="font-light" />
          <span className="text-xs">Support</span>
        </li>{" "}
        <li className="flex-1 flex items-center justify-center">
          <HamburgerDrawerComponent
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            cartItemCount={cartItemCount}
            trigger={
              <div className="relative flex flex-col items-center justify-center gap-1">
                <PiPlus size={22} className="font-light" />
                <span className="text-xs">Other</span>
              </div>
            }
          />
        </li>
      </ul>
    </footer>
  );
};

export default AbsluteFooter;
