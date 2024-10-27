import { useTranslations } from "@hamampass/i18n";
import { FaTurkishLiraSign } from "react-icons/fa6";
import { convertPaymentIcon } from "@/utils/icon_translations";

const Price = ({ id }: { id: number }) => {
  const price = id.toString();
  const payment_details = useTranslations("home.filters.payment_methods");
  return (
    <div className="text-sgray-200 flex gap-1 -ml-1 items-center justify-center">
      <p className="text-sm">
        {convertPaymentIcon(id, "text-2xl text-secondary-10")}
      </p>
      <p className="text-sm whitespace-nowrap">{payment_details(price)}</p>
    </div>
  );
};

export default Price;
