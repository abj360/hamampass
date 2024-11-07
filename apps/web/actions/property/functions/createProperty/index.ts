import { NextRequest } from "next/server";
import prisma from "@hamampass/db";

const createProperty = async (req: NextRequest) => {
  const { title, amenity, photos, contact, products } = await req.json();

  try {
    const contactRecord = await prisma.contact.create({
      data: {
        city: contact.city,
        district: contact.district,
        address: contact.address,
        location: contact.location,
        phone: contact.phone,
        map_link: contact.map_link,
      },
    });

    const amenityRecord = await prisma.amenity.create({
      data: {
        facilities: amenity.facilities,
        items: amenity.items,
        foods_drinks: amenity.foods_drinks,
      },
    });

    const admin = await prisma.admin.create({
      data: {
        password: "1234",
      },
    });

    const property = await prisma.property.create({
      data: {
        title,
        amenityId: amenityRecord.id,
        photos,
        contactId: contactRecord.id,
        products: {
          create: products,
        },
        adminId: admin.id,
      },
    });

    return property;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create property");
  }
};

export default createProperty;
