"use client";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/tr";
import { TPartner, TBooking } from "@hamampass/db/types";
import { useRouter } from "next/navigation";

const Home = () => {
  const [partner, setPartner] = useState<TPartner | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Only run this in the client environment
    if (typeof window !== "undefined") {
      const partnerId = sessionStorage.getItem("partnerId");

      if (!partnerId) {
        router.push("/login");
        return;
      }

      moment.locale("tr");

      const fetchPartnerData = async () => {
        const response = await fetch(`/api/${partnerId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch partner data");
        }
        const fetchedPartner = await response.json();
        setPartner(fetchedPartner as TPartner);
      };

      fetchPartnerData().catch(console.error); // Handle potential errors
    }
  }, [router]);

  return (
    <main className="flex flex-col items-center mt-2 mx-5">
      <h1 className="text-2xl">{partner?.name}</h1>

      <h2 className="my-4">Rezervasyonlar</h2>
      {partner?.bookings.map((booking: TBooking) => (
        <div
          key={booking.id}
          className="border p-2 m-2 rounded bg-gray-200 w-full flex flex-col items-start"
        >
          <div className="flex items-center justify-between w-full">
            <p className="text-sm mb-1">
              {moment(booking.date).format("D MMMM")}
            </p>
            <p className="bg-red-700 text-white px-2 py-1 rounded text-sm mb-1">
              Ödenmedi
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            <div>{booking.property.title}</div>
            <div className="mb-1">{booking.user?.name}</div>
          </div>
          <div className="text-sm mt-2">
            <strong>Toplam Ödeme:</strong> {booking.totalMoney}₺
          </div>
          {partner.commision && (
            <div className="mt-2 w-full flex items-center">
              <strong className="mr-auto">Komisyon miktarı:</strong>
              <p>
                {booking.totalMoney} x %{partner.commision} ={" "}
                <span className="text-lg font-bold">
                  {(booking.totalMoney * partner.commision) / 100}₺
                </span>
              </p>
            </div>
          )}
        </div>
      ))}
    </main>
  );
};

export default Home;
