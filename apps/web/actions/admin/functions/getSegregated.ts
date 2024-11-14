import prisma from "@hamampass/db";

const isSegregated = async (propertyId: string) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    include: {
      days: true,
    },
  });

  if (!property?.adminId?.startsWith("s")) return false;

  return true;
};

export default isSegregated;
