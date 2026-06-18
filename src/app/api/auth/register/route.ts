import { connectDB } from "@/lib/mongoose";
import { RegisterSchema } from "@/app/lib/validations/registerSchema";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    console.log("REGISTER BODY:", body);

    const validated =
      RegisterSchema.safeParse(body);

    if (!validated.success) {
      console.log(
        validated.error.flatten().fieldErrors
      );

      return NextResponse.json(
        {
          success: false,
          errors:
            validated.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      firstName,
      lastName,
      email,
      password,
      role,
    } = validated.data;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      console.log("Email already exists");
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Registration failed",
      },
      { status: 500 }
    );
  }
}