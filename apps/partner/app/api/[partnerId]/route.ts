import { NextRequest, NextResponse } from "next/server";
import prisma from "@hamampass/db";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const partnerId = url.pathname.split("/").pop() || "";

    if (!partnerId) {
      console.error("Partner ID is missing.");
      return NextResponse.json(
        { error: "Partner ID is required." },
        { status: 400 }
      );
    }

    console.log("Fetching partner data from database...");
    const fetchedPartner = await prisma.partner.findFirst({
      where: {
        id: partnerId,
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

    if (!fetchedPartner) {
      console.error("No partner found with the provided ID.");
      return NextResponse.json(
        { error: "Partner not found." },
        { status: 404 }
      );
    }

    console.log("Fetched partner data:", fetchedPartner);
    return NextResponse.json(fetchedPartner);
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      { error: "Failed to fetch partner data: " + error },
      { status: 500 }
    );
  }
}
