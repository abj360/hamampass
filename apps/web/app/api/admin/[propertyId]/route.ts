import { getSegregated } from "@/actions/admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { propertyId: string } }
) {
  try {
    const res = await getSegregated(params.propertyId); // Pass the id directly
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create response" },
      { status: 500 }
    );
  }
}
