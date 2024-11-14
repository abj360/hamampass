import { TProperty } from "@hamampass/db/types";
import { useTranslations } from "@hamampass/i18n";
import { convertGenderIcon } from "@/utils/icon_translations";
import useDay from "@/hooks/useDay";

const Gender = ({
  property,
  isSmall = false,
}: {
  property: TProperty;
  isSmall?: boolean;
}) => {
  const sex_type = useTranslations("home.filters.sex");
  const sex = useDay({ property }).sex;
  return (
    <div className="text-slate-500 flex gap-1 -ml-1 items-center ">
      <p className="text-sm">
        {convertGenderIcon(
          sex,
          ` ${isSmall ? "text-lg text-secondary-10" : "text-xl text-secondary-10"}   `
        )}
      </p>
      <p
        className={
          isSmall ? "text-xs whitespace-nowrap" : "text-sm whitespace-nowrap"
        }
      >
        {sex_type(sex.toString())}
      </p>
    </div>
  );
};

export default Gender;
