import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import LocaleSwitcher from "./locale-switcher";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useTranslations } from "@hamampass/i18n";
import { useState, useEffect } from "react";
import { request } from "@hamampass/services";
import moment from "moment";
import "moment/locale/tr";
import "moment/locale/en-gb";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

const HamburgerContent = ({ setOpen, cartItemCount }: any) => {
  const { locale } = useParams();
  const router = useRouter();
  const t = useTranslations("hamburger");

  useEffect(() => {
    if (locale === "tr") {
      moment.locale("tr");
    } else {
      moment.locale("en-gb");
    }
  }, [locale]);

  const { data } = useSession();
  const handleProfileClick = () => {
    router.push(`/${locale}/profile`);
    setOpen(false);
  };

  const handleLoginClick = async () => {
    await signIn("google", { callbackUrl: `/${locale}/auth/signIn` });
  };

  const handleShoppingCard = () => {
    router.push(`/${locale}/shopping-card`);
    setOpen(false);
  };

  const [myBookings, setMyBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        if (data?.user?.id === undefined) return;
        const req = await request({
          type: "get",
          endpoint: `booking/${data?.user?.id}`,
        });

        setMyBookings(req.data);
      } catch (error) {
        console.error("Error fetching my bookings:", error);
      }
    };

    fetchMyBookings();
  }, [data?.user?.id]);

  return (
    <div className="flex flex-col items-start gap-6 font-bold text-sgray-10 h-full pb-[20vh]">
      <div className="flex items-center justify-between mb-auto w-full">
        <Image src="/longLogo.png" width={200} height={200} alt="logo" />
        <button className="text-white mr-3 " onClick={() => setOpen(false)}>
          <IoClose size={26} />
        </button>
      </div>

      <button
        className="text-2xl scale-x-115  w-full text-left py-2"
        onClick={() => router.push(`/${locale}/wishlist`)}
      >
        My Favorites
      </button>
      {localStorage.getItem("cart") && (
        <button
          className="text-2xl scale-x-115  w-full text-left py-2  flex items-start gap-2"
          onClick={handleShoppingCard}
        >
          <span> {t("shopping-cart")}</span>

          {cartItemCount > 0 && (
            <p className=" text-xs bg-cyan-950  text-center border font-bold  text-white aspect-square rounded-full px-[.4rem] py-[.1rem]">
              {cartItemCount}
            </p>
          )}
        </button>
      )}

      {myBookings.length > 0 && (
        <button
          className="text-2xl scale-x-115  w-full text-left py-2"
          onClick={() => router.push(`/${locale}/my-bookings`)}
        >
          {t("my_bookings")}
        </button>
      )}

      {data?.user ? (
        <button
          className="text-2xl scale-x-115  w-full text-left py-2"
          onClick={handleProfileClick}
        >
          {t("profile")}
        </button>
      ) : (
        <button
          className="text-2xl scale-x-115  w-full text-left py-2"
          onClick={handleLoginClick}
        >
          {t("login")}
        </button>
      )}

      <button
        className="text-2xl scale-x-115  w-full text-left py-2"
        onClick={() => router.push(`/${locale}/help`)}
      >
        Help
      </button>

      <div className="flex items-center gap-2 absolute bottom-0 mb-2">
        <p className="w-52 text-lg">{t("language")} </p>
        <LocaleSwitcher />
      </div>
    </div>
  );
};

export default HamburgerContent;
