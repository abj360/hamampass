import {
  FaToiletPaper,
  FaSoap,
  FaLock,
  FaShower,
  FaHotjar,
  FaCloudRain,
  FaHotTub,
  FaSwimmingPool,
  FaBed,
  FaCar,
} from "react-icons/fa";
import {
  PiTowelFill,
  PiThermometerColdFill,
  PiTeaBagFill,
} from "react-icons/pi";
import { IoIosWarning } from "react-icons/io";
import { TbMassage } from "react-icons/tb";
import { MdOutlineSevereCold } from "react-icons/md";
import { IoTicketOutline, IoBodyOutline } from "react-icons/io5";
import { BiSolidCoffeeBean } from "react-icons/bi";
import { IoIosMan, IoIosWoman } from "react-icons/io";
import { FaRegCreditCard } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";

const classN = "text-3xl";

const convertPaymentIcon = (id: number, className = classN) => {
  switch (id.toString()) {
    case "0":
      return <GiMoneyStack className={className} />;
    case "1":
      return <FaRegCreditCard className={className} />;

    default:
      return null;
  }
};

const convertGenderIcon = (id: number, className = classN) => {
  switch (id.toString()) {
    case "0":
      return <IoIosWoman className={className} />;
    case "1":
      return <IoIosMan className={className} />;
    case "2":
      return (
        <div className="flex">
          <IoIosMan className={className} />
          <IoIosWoman className={`${className} -ml-1`} />
        </div>
      );

    default:
      return (
        <div className="flex">
          <IoIosMan className={className} />
          <IoIosWoman className={className} />
        </div>
      );
  }
};

const convertAFacilityIcon = (id: number, className = classN) => {
  switch (id.toString()) {
    case "0":
      return <FaToiletPaper className={className} />;
    case "1":
      return <FaBed className={className} />;
    case "2":
      return <FaLock className={className} />;
    case "3":
      return <FaShower className={className} />;
    case "4":
      return <FaHotjar className={className} />;
    case "5":
      return <FaCloudRain className={className} />;
    case "6":
      return <FaHotTub className={className} />;
    case "7":
      return <FaSwimmingPool className={className} />;
    case "8":
      return <TbMassage className={className} />;
    case "9":
      return <MdOutlineSevereCold className={className} />;
    case "10":
      return <PiThermometerColdFill className={className} />;
    case "11":
      return <FaCar className={className} />;
    default:
      return <IoIosWarning className={className} />;
  }
};

const convertAItemIcon = (id: number, className = classN) => {
  switch (id.toString()) {
    case "0":
      return <PiTowelFill className={className} />;
    case "1":
      return <FaSoap className={className} />;
    default:
      return <IoIosWarning className={className} />;
  }
};
const convertAFood_DrinkIcon = (id: number, className = classN) => {
  switch (id.toString()) {
    case "0":
      return <PiTeaBagFill className={className} />;
    case "1":
      return <BiSolidCoffeeBean className={className} />;

    default:
      return <IoIosWarning className={className} />;
  }
};

const convertProductIcon = (type: number, className = classN) => {
  switch (type.toString()) {
    case "0":
      return <IoTicketOutline className={className} />;
    case "1":
      return <IoBodyOutline className={className} />;
  }
};

export {
  convertProductIcon,
  convertAFacilityIcon,
  convertAItemIcon,
  convertAFood_DrinkIcon,
  convertGenderIcon,
  convertPaymentIcon,
};
