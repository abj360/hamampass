"use client";

import { useTranslations } from "@hamampass/i18n";
import { TProperty } from "@hamampass/db/types";
import { FaRegClock } from "react-icons/fa";
import { checkIsWeekDay } from "@/utils/db_translations";
import moment from "moment";
import { use, useEffect, useState } from "react";
import useDay from "@/hooks/useDay";

interface HoursComponentProps {
  property: TProperty;
}

const ClockComponent = ({ desc }: { desc: string }) => {
  return (
    <div className="flex items-center justify-start gap-4">
      <FaRegClock className=" text-gray-500 mt-[3px]" size={20} />

      <div className="flex flex-col  items-start justify-between mr-20">
        <p className="text-slate-500 text-sm">{desc}</p>
      </div>
    </div>
  );
};

const HoursComponent: React.FC<HoursComponentProps> = ({ property }) => {
  const title = useTranslations("titles");

  const [isWeekDay, setIsWeekDay] = useState(false);

  useEffect(() => {
    setIsWeekDay(
      checkIsWeekDay(
        moment(
          JSON.parse(sessionStorage.getItem("selected-date") || "{}")
        ).format("d")
      )
    );
  }, [isWeekDay]);

  const hours = useDay({ property });

  return (
    <section className="my-4 ">
      <hr />
      <h2 className="font-bold text-xl mb-3 mt-4 text-gray-600">
        {title("hours-title")}
      </h2>

      <div className="flex flex-col gap-1">
        <ClockComponent desc={`${hours.open} - ${hours.close}`} />
      </div>
    </section>
  );
};

export default HoursComponent;
