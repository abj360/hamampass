import { TProperty } from "@hamampass/db/types";
import { useTranslations } from "@hamampass/i18n";
import { convertGenderIcon } from "@/utils/icon_translations";

const Gender = ({ property }: { property: TProperty }) => {
  const sex_type = useTranslations("home.filters.sex");
  return (
    <div className="text-slate-500 flex gap-1 -ml-1 items-center justify-center">
      <p className="text-sm">
        {convertGenderIcon(property.sex, "text-xl text-black")}
      </p>
      <p className="whitespace-nowrap text-black">
        {sex_type(property.sex.toString())}
      </p>
    </div>
  );
};

export default Gender;
