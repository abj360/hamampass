import { NextRequest } from "next/server";
import prisma from "@hamampass/db";

const getSegregated = async (propertyId: string) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property?.adminId?.startsWith("s")) return null;

  return property.sex;
};

export default getSegregated;
