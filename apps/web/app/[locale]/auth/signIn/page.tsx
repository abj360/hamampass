"use client";

import FormComponent from "@/components/pages/profile/form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "@hamampass/i18n";

const SignIn = () => {
  const { data } = useSession();
  const router = useRouter();
  const t = useTranslations("profile.complete");

  if (data?.user?.id) {
    router.push("/");
    return <div>Already signed in</div>;
  }
  return (
    <div className="min-h-screen flex flex-col gap-12">
      <h1 className="text-xl font-semibold text-primary-10  py-2 text-center  border-b border-sgray-100">
        {t("title")}
      </h1>

      <FormComponent />
    </div>
  );
};

export default SignIn;
