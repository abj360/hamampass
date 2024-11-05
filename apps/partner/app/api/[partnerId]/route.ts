import { NextRequest, NextResponse } from "next/server";
import prisma from "@hamampass/db";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const partnerId = url.pathname.split("/").pop() || "";

    const fetchedPartner = await prisma.partner.findUnique({
      where: {
        partnerId: partnerId,
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

    return NextResponse.json(fetchedPartner);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch property" },
      { status: 500 }
    );
  }
}
