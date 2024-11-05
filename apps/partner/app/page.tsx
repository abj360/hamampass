import prisma from "@hamampass/db";
import moment from "moment";
import "moment/locale/tr";

const Home = async () => {
  moment.locale("tr");

  const partner = await prisma.partner.findUnique({
    where: {
      partnerId: "0001",
    },
    include: {
      bookings: true,
    },
  });
  console.log(partner);

  return (
    <main className="flex flex-col items-center mt-2 mx-5">
      <h1 className="text-2xl">{partner?.name}</h1>
      {partner?.bookings.map((booking) => (
        <div
          key={booking.id}
          className="border p-2 m-2 rounded bg-gray-200 w-full flex items-center justify-between"
        >
          <p className="text-sm">{moment(booking.date).format("D MMMM")}</p>
          <p className="bg-red-700 text-white px-2 py-1 rounded text-sm">
            ödenmedi
          </p>
        </div>
      ))}
    </main>
  );
};

export default Home;
