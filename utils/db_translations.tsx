import { FaShower } from "react-icons/fa6";
import { FaHotTub } from "react-icons/fa";
import { FaCloudRain } from "react-icons/fa";
import { FaHotjar } from "react-icons/fa6";
import { FaSwimmingPool } from "react-icons/fa";
import { MdOutlineSevereCold } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { TbMassage } from "react-icons/tb";
import { PiThermometerColdFill } from "react-icons/pi";

const convertAgeRange = (n: number) => {
  switch (n) {
    case 0:
      return "0-17";
    case 1:
      return "18-24";
    case 2:
      return "25-30";
    case 3:
      return "31-40";
    case 4:
      return "41+";
    default:
      return "Invalid age range";
  }
};

const convertAmenityIcon = (id: number) => {
  switch (id.toString()) {
    case "0":
      return <FaShower />;
    case "1":
      return <FaHotjar />;
    case "2":
      return <FaCloudRain />;
    case "3":
      return <FaHotTub />;
    case "4":
      return <FaSwimmingPool />;
    case "5":
      return <TbMassage />;
    case "6":
      return <MdOutlineSevereCold />;
    case "7":
      return <PiThermometerColdFill />;
    default:
      return <IoIosWarning />;
  }
};

export { convertAgeRange, convertAmenityIcon };
