import { TProperty } from "@hamampass/db/types";
import getDayIndexFromSession from "@/utils/getDayIndextFromSession";
import { TDayInfo } from "@/types";

const useDay = ({ property }: { property: TProperty }): TDayInfo => {
  const days = property.days;
  let dayIndex = getDayIndexFromSession();

  if (!dayIndex) {
    dayIndex = new Date().getDay();
  }

  const day = days.find((day) => day.dayIndex === dayIndex)!!;

  return {
    sex: day?.sex,
    open: day?.open,
    close: day?.close,
  };
};

export default useDay;
