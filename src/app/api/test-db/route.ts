import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find({}).limit(5);

    return NextResponse.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Database error",
      },
      { status: 500 }
    );
  }
}