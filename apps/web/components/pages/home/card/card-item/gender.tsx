import { TProperty } from "@hamampass/db/types";
import { useTranslations } from "@hamampass/i18n";
import { convertGenderIcon } from "@/utils/icon_translations";
import useDay from "@/hooks/useDay";

const Gender = ({ property }: { property: TProperty }) => {
  const sex_type = useTranslations("home.filters.sex");
  const sex = useDay({ property }).sex;

  return (
    <div className="text-slate-500 flex gap-1 -ml-1 items-center justify-center">
      <p className="text-sm">{convertGenderIcon(sex, "text-xl text-black")}</p>
      <p className="whitespace-nowrap text-black">{sex_type(sex.toString())}</p>
    </div>
  );
};

export default Gender;
