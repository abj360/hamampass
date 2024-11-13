import { BiSearch } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import { PiPlus } from "react-icons/pi";

const AbsluteFooter = () => {
  return (
    <footer className="bg-black text-white sticky bottom-0 shadow-lg border-t">
      <ul className="flex bg-white text-black items-center justify-between  py-2">
        <li className="flex flex-col items-center justify-center gap-1   flex-1">
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
        <li className="flex flex-col items-center justify-center gap-1 flex-1">
          <PiPlus size={22} className="font-light" />
          <span className="text-xs">Other</span>
        </li>
      </ul>
    </footer>
  );
};

export default AbsluteFooter;
