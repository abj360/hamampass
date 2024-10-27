"use client";

import Image from "next/image";
import InfoComponent from "./info";
import { TSessionUser, TUser } from "@hamampass/db/types";
import { useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useTranslations } from "@hamampass/i18n";

const ProfilePageComponent = () => {
  const [user, setUser] = useState<TUser | TSessionUser>();
  const { data, status } = useSession();
  const t = useTranslations("profile");

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session?.user) {
        setUser(session.user as TUser);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    if (data?.user) {
      setUser(data?.user as TUser);
    }
  }, [data]);

  if (status === "loading") return <div>{t("loading")}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div className="mx-3 min-h-screen mt-4">
      {/* <h1 className="text-center font-bold text-lg my-5 text-gray-700">
        {t("title")}
      </h1> */}

      <div className="flex items-center gap-3 mb-8 ">
        <Image
          src={user.image}
          alt={user.name}
          width={80}
          height={80}
          className="rounded-full"
        />
        <p className="text-2xl text-primary-10 font-semibold"> {user.name}</p>
      </div>
      <InfoComponent user={user as TUser} />
    </div>
  );
};

export default ProfilePageComponent;
