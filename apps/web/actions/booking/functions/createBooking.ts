import { NextRequest } from "next/server";
import prisma from "@hamampass/db";
import { sendNotification } from "@/actions/push";
import moment from "moment";
import "moment/locale/tr";

const convertKey = (key: number) => {
  switch (key) {
    case 0:
      return "Basit";
    case 1:
      return "standart";
    default:
      return "bilinmiyor";
  }
};

const createBooking = async (req: NextRequest) => {
  moment.locale("tr");

  const { date, propertyId, adminId, userId, products, totalMoney, partnerId } =
    await req.json();

  const partner =
    partnerId &&
    (await prisma.partner.findUnique({
      where: {
        partnerId,
      },
    }));

  const booking = await prisma.booking.create({
    data: {
      date: new Date(date),
      propertyId,
      userId,
      totalMoney,
      products,
      ...(partnerId && { partnerId: partner?.id }),
    },
  });

  console.log("booking", booking);

  const desc = `${moment(new Date(date)).format("DD MMMM dddd")}, ${Object.keys(
    products
  ).reduce((acc, key) => acc + products[key].count, 0)} kişi ( ${Object.keys(
    products
  )
    .map((key) => `${products[key].count} ${convertKey(+key)}`)
    .join(" ")} ), Toplam ${totalMoney} TL`;

  await sendNotification({
    adminId,
    desc,
    redirectUrl: `/tr/admin/${booking.id}`,
  });

  return booking;
};

export default createBooking;
