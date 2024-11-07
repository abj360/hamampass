import { NextRequest } from "next/server";
import prisma from "@hamampass/db";

const createProperty = async (req: NextRequest) => {
  const { title, amenity, photos, contact, products, day } = await req.json();

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

    // create days record

    [0, 1, 2, 3, 4, 5, 6].map(async (dayIndex) => {
      await prisma.day.create({
        data: {
          propertyId: property.id,
          dayIndex,
          sex: day.sex,
          open: day.open,
          close: day.close,
        },
      });
    });

    return property;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create property");
  }
};

export default createProperty;
