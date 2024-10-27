import { TUser } from "@hamampass/db/types";
import { signOut } from "next-auth/react";
import { Button } from "@hamampass/ui/primitives/button.tsx";
import { convertAgeRange } from "@/utils/db_translations";
import { useTranslations } from "@hamampass/i18n";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { request } from "@hamampass/services";
import { T } from "ramda";

const Template = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="flex flex-col">
      <p className="text-lg text-primary-800 font-semibold">{title}</p>
      <p className="text-sgray-100 font-semibold">{desc}</p>
    </div>
  );
};

const InfoComponent = ({ user }: { user: TUser }) => {
  const t = useTranslations("single.review.gender");
  const p = useTranslations("profile");
  const { locale } = useParams();
  const [country, setCountry] = useState<string>();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    async function fetchCountry() {
      const res = await request({
        type: "get",
        endpoint: `country/${user?.nationality}`,
      });
      setCountry(res?.data[`name_${locale}`]);
    }

    fetchCountry();
  }, [user]);

  return (
    <div>
      <div className="m-3 flex-1 flex flex-col gap-4">
        <Template title={p("nationality")} desc={country || ""} />
        <Template
          title={p("age")}
          desc={convertAgeRange(user?.age_range) || ""}
        />
        <Template title={p("gender")} desc={t(user?.gender?.toString())} />

        <Template title="Email" desc={user?.email || ""} />
        <Button
          className="absolute bottom-10 right-5 bg-primary-10"
          onClick={handleSignOut}
        >
          {p("logout")}
        </Button>
      </div>
    </div>
  );
};

export default InfoComponent;
