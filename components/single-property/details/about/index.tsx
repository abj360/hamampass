import JsxParser from "react-jsx-parser";
import { MdKeyboardArrowRight } from "react-icons/md";
import AboutDrawerComponent from "./drawer";
import { useTranslations } from "next-intl";

const AboutComponent = ({ desc }: any) => {
  const description = <JsxParser components={{}} jsx={desc} />;

  const t = useTranslations("single");
  const title = useTranslations("home.filters.titles");

  if (!desc) return null;

  return (
    <div>
      <h2 className="font-bold text-xl text-gray-600 mt-5 mb-3">
        {title("about_title")}
      </h2>

      <div className="max-h-40 overflow-hidden">{description}</div>

      <AboutDrawerComponent
        trigger={
          <p className="flex items-center justify-end underline">
            <span>{t("read-more")}</span>
            <MdKeyboardArrowRight size={20} />
          </p>
        }
        description={description}
      />
    </div>
  );
};

export default AboutComponent;
