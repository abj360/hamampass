"use client";

import Image from "next/image";
import moment from "moment";
import { Button } from "@hamampass/ui/primitives/button.tsx";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { Separator } from "@hamampass/ui/primitives/separator.tsx";
import { useTranslations } from "@hamampass/i18n";
import { useSession } from "next-auth/react";
import { request } from "@hamampass/services";
import { toast } from "@hamampass/ui/primitives/hooks/use-toast.ts";
import { useTransition, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@hamampass/ui/primitives/dialog.tsx";
import { signIn } from "next-auth/react";

interface TStorage {
  property: {
    id: string;
    adminId: string;
    title: string;
    date: string;
    img: string;
  };
  products: Record<
    string,
    { count: number; price: number; practicionerId: string }
  >;
}

const ShoppingCardPage = () => {
  const storage = JSON.parse(localStorage.getItem("cart") || "[]") as TStorage;
  const { property } = storage;
  const { products } = storage;
  const t = useTranslations("single.review.drawer.package");
  const shop = useTranslations("shopping-cart");
  const [isLogin, setIsLogin] = useState(false);

  const { locale } = useParams();
  const router = useRouter();
  const { data } = useSession();

  const [isPending, startTransition] = useTransition(); // useTransition hook

  if (!property) {
    return <div>No property found in the cart.</div>;
  }

  if (Object.keys(products).length === 0) {
    return <div className="text-center mt-5">Your cart is empty</div>;
  }

  const formattedDate = moment(property?.date ?? null).format("dddd,  D MMMM ");

  const totalMoney = Object.entries(products).reduce(
    (acc, [, product]) => acc + product.price * product.count,
    0
  );

  const handleGoBack = () => {
    router.push(`/${locale}/${property.title.replace(/\s+/g, "-")}`);
  };

  const deleteProduct = (key: string) => {
    const newProducts = products;
    delete newProducts[key];
    localStorage.setItem(
      "cart",
      JSON.stringify({ property, products: newProducts })
    );
    window.location.reload();
  };

  const handleCheckOut = async () => {
    if (!data?.user?.id) {
      setIsLogin(true);
      return toast({
        title: "Log in",
        description: "You need to log in to make a booking",
        duration: 1000,
      });
    }

    startTransition(async () => {
      try {
        await request({
          type: "post",
          endpoint: "/booking",
          payload: {
            date: property.date,
            propertyId: property.id,
            adminId: property.adminId,
            userId: data?.user?.id,
            products,
            totalMoney,
            partnerId: sessionStorage.getItem("partnerId"),
          },
        });

        localStorage.removeItem("cart");
        toast({
          title: "Success",
          description: "Your booking is successful",
          duration: 1000,
        });
        router.push(`/${locale}`);
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong with the booking",
          duration: 1000,
        });
      }
    });
  };

  const handleLoginClick = async () => {
    await signIn("google", { callbackUrl: `/${locale}/auth/signIn` });
  };

  return (
    <div className="pt-4 h-full flex flex-col  ">
      <div className="mx-4">
        <Button
          variant="none"
          onClick={handleGoBack}
          className=" flex items-center px-0 gap-2 font-light"
        >
          <FaArrowLeft className="text-gray-500" />
          <span>
            {" "}
            {shop("back")} {property.title}
          </span>
        </Button>

        <div className="flex items-center justify-between ">
          <div>
            <h1 className="text-sm text-primary-10 font-semibold">
              {property.title}
            </h1>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
          <Image
            src={property.img}
            alt={property.title}
            width={90 * 1.4}
            height={160 * 1.4}
            className="rounded-xl aspect-video"
          />
        </div>
        <div className="mt-5">
          {Object.entries(products).map(
            ([key, product]: [
              string,
              { count: number; price: number; practicionerId: string },
            ]) => (
              <div className="flex flex-col my-1" key={key}>
                <Separator />
                <div className="my-2 flex items-center justify-between">
                  <div>
                    <p className="font-medium  text-primary-10">
                      {t(key.toString())}
                    </p>
                    <div className="text-gray-500 text-sm">
                      ₺{product.price} x {product.count}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p> ₺{product.price * product.count} TL</p>
                    <button
                      className="border px-2 rounded-full"
                      onClick={() => deleteProduct(key)}
                    >
                      x
                    </button>
                  </div>
                </div>
                <div className="text-xs">
                  {product.practicionerId &&
                    "practicioner id:" + product.practicionerId}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <Dialog open={isLogin}>
        <DialogContent
          onClick={() => setIsLogin(false)}
          className="border-none flex items-center justify-center w-full h-full bg-black/20"
        >
          <DialogHeader className="bg-white px-6 py-3 rounded-xl">
            <button onClick={handleLoginClick}>Login</button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className=" mt-auto w-full px-4 pb-4 border-t border-sgray-100 flex flex-col items-center">
        <div className="flex items-center justify-between w-full my-3 text-primary-10">
          <p className="font-semibold text-2xl">{shop("total")}</p>
          <p className="font-bold text-xl">
            ₺{totalMoney}
            <span className="text-sm ml-1 font-normal">TL</span>
          </p>
        </div>

        <Button
          className="rounded-xl px-8 bg-primary-10 w-full"
          onClick={handleCheckOut}
          disabled={isPending}
        >
          {isPending ? shop("processing") : shop("complete")}
        </Button>
      </div>
    </div>
  );
};

export default ShoppingCardPage;
