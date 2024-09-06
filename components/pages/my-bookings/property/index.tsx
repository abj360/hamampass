import { TBooking } from "@/types";
import moment from "moment";
import Image from "next/image";
import { CiCalendar, CiHome, CiMap, CiPhone } from "react-icons/ci";
import { IoLocation } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LuCalendarOff } from "react-icons/lu";
import DrawerGeneral from "@/components/commons/drawer";
import BookingContent from "./booking-drawer-content";

const PropertyPartTrigger = ({ booking }: { booking: TBooking }) => {
  return (
    <div className="flex items-start gap-2 p-2">
      <Image
        src={booking.property.photos[0]}
        alt={booking.property.title}
        width={80}
        height={80}
        className="aspect-square rounded-xl object-cover object-center"
      />
      <div className="text-gray-700 flex flex-col items-start gap-[0.15rem]">
        <h1 className="font-semibold text-lg  ">{booking.property.title}</h1>
        <div className="flex items-center gap-1  ">
          <IoLocation className="text-gray-500" />
          <p className="text-sm">
            {booking.property.contact.district} {" - "}
            {booking.property.contact.city}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <CiCalendar className="text-gray-500" />
          <p className="text-sm">
            {moment(booking.date).format("D MMM, YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
};
const PropertyPartContent = ({ booking }: { booking: TBooking }) => {
  const isPast = moment(booking.date).isBefore(moment(), "day");
  const { locale } = useParams();

  return (
    <div className="flex flex-col gap-2 mb-10">
      <p className="flex ">
        <span className="bg-black -rotate-3 my-1 text-white p-1 font-semibold text-sm ">
          {isPast ? "Past Trip" : "Upcoming Trip"}
        </span>
      </p>
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex items-center gap-2">
          <IoLocation className="text-gray-500" size={32} />
          <p className="text-sm">{booking.property.contact.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <CiCalendar className="text-gray-500" size={24} />
          <p className="text-sm">
            {moment(booking.date).format("D MMMM, YYYY")}
          </p>
        </div>
      </div>
      <Separator />
      <div className="flex gap-3 my-2">
        <div className="flex items-center gap-2 border-2 px-2 rounded-full">
          <CiPhone className="text-gray-500" size={20} />
          <p>Phone</p>
        </div>
        <div className="flex items-center gap-2 border-2 px-2 rounded-full">
          <CiMap className="text-gray-500" size={20} />
          <p>Map</p>
        </div>
      </div>
      <Separator />

      {/* booking details */}
      <div className="flex flex-col gap-2">
        <DrawerGeneral
          fill={true}
          title="Booking Details"
          trigger={
            <div className="flex items-center  py-1 gap-2">
              <CiCalendar className="text-gray-500" size={24} />
              <p className="text-sm">Booking Details</p>
            </div>
          }
          content={<BookingContent booking={booking} />}
        />
        <Link
          href={`/${locale}/${booking.property.title.replace(/\s/g, "-")}`}
          className="flex items-center  py-1 gap-2"
        >
          <CiHome className="text-gray-500" size={24} />
          <p className="text-sm">View Property</p>
        </Link>
        <div className="flex items-center  py-1 gap-2 opacity-50">
          <LuCalendarOff className="text-gray-500" size={22} />
          <p className="text-sm">Cancel Booking</p>
        </div>
      </div>
    </div>
  );
};

export { PropertyPartTrigger, PropertyPartContent };
