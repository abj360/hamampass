import { NextRequest } from "next/server";
import prisma from "@hamampass/db";

const getPropertyByTitle = async (req: NextRequest) => {
  const url = new URL(req.url);
  const pre_title = url.pathname.split("/").pop()?.replace(/-/g, " ") || "";
  const title = decodeURI(pre_title);

  // Access the gender query parameter
  const gender = url.searchParams.get("gender");

  // Build the where clause dynamically
  const whereClause: any = { title };
  if (gender) {
    whereClause.sex = +gender;
  }

  const property = await prisma.property.findFirst({
    where: whereClause,
    include: {
      contact: true,
      hour: true,
      products: {
        include: {
          practicioners: true,
        },
      },
      rating: true,
      amenity: true,
    },
  });

  return property;
};

export default getPropertyByTitle;
