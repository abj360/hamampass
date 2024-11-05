import prisma from "@hamampass/db";
import moment from "moment";
import "moment/locale/tr";

const Home = async () => {
  const partnerParam = "0001";

  moment.locale("tr");

  const partner = await prisma.partner.findUnique({
    where: {
      partnerId: partnerParam,
    },
    include: {
      bookings: {
        include: {
          user: true,
          property: true,
        },
      },
    },
  });

  return (
    <main className="flex flex-col items-center mt-2 mx-5">
      <h1 className="text-2xl">{partner?.name}</h1>
      {partner?.bookings.map((booking) => (
        <div
          key={booking.id}
          className="border p-2 m-2 rounded bg-gray-200 w-full flex flex-col items-start"
        >
          <div className="flex items-center justify-between w-full">
            {" "}
            {/* Booking Date */}
            <p className="text-sm mb-1">
              {moment(booking.date).format("D MMMM")}
            </p>
            {/* Booking Status */}
            <p className="bg-red-700 text-white px-2 py-1 rounded text-sm mb-1">
              Ödenmedi
            </p>
          </div>

          <div className="flex items-center justify-between w-full">
            {/* User Information */}
            <div>{booking.property.title}</div>
            <div className=" mb-1">{booking.user?.name}</div>
          </div>

          {/* Total Money */}
          <div className="text-sm mt-2">
            <strong>Toplam Ödeme:</strong> {booking.totalMoney}₺
          </div>
          <div className="mt-2 w-full  flex items-center">
            <strong className="mr-auto">Komisyon miktarı:</strong>{" "}
            <p>
              {" "}
              {booking.totalMoney} x %{partner.commision} ={" "}
              <span className="text-lg font-bold">
                {(booking.totalMoney * partner.commision) / 100}₺
              </span>
            </p>
          </div>
        </div>
      ))}
    </main>
  );
};

export default Home;
