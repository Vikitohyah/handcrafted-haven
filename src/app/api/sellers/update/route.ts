import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function POST(
  request: Request
) {
  try {
    const db = await connectDB();

    const body = await request.json();

    await db.collection("sellers").updateOne(
      {
        userId: "TEMP_USER_ID",
      },
      {
        $set: {
          profileImage:
            body.profileImage,
          bio: body.bio,
          location: body.location,
          specialty:
            body.specialty,
        },
      }
    );

    return NextResponse.json({
      message:
        "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Failed to update profile",
      },
      { status: 500 }
    );
  }
}