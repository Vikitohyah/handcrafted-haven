import { NextResponse } from "next/server";
import { auth } from "@/auth";
import User from "@/models/User";
import { connectDB } from "@/lib/mongoose";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const {
      profileImage,
      bio,
      location,
    } = await req.json();

    await User.findByIdAndUpdate(
      session.user.id,
      {
        profileImage,
        bio,
        location,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return NextResponse.json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}