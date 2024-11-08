// app/api/track/route.js
import { NextResponse } from "next/server";
import Mixpanel from "mixpanel";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// Initialize Mixpanel with your project token
const mixpanel = Mixpanel.init("9e19fc53611a15c21d79e7cd2d38ad09");

export async function POST(req: NextRequest) {
  // Extract request data
  const { event, properties } = await req.json();

  // Set up cookies to manage user ID
  const cookieStore = cookies();
  let userId = cookieStore.get("user_id")?.value;

  // If user_id cookie is missing, generate and set a new one
  if (!userId) {
    userId = uuidv4();
    cookieStore.set("user_id", userId, {
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1-year expiration
    });
    mixpanel.people.set(userId, {});
  }

  // Track the event in Mixpanel with the user's unique ID
  try {
    mixpanel.track(event, {
      distinct_id: userId,
      ...properties,
    });
    return NextResponse.json(
      { message: "Event tracked successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error tracking event:", error);
    return NextResponse.json(
      { message: "Error tracking event" },
      { status: 500 }
    );
  }
}
