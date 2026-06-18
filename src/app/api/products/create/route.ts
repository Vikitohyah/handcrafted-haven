import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Products";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    if (session.user.role !== "seller") {
      return NextResponse.json(
        {
          error: "Only sellers can create products",
        },
        {
          status: 403,
        }
      );
    }

    const body = await req.json();

    const {
      categoryId,
      title,
      description,
      price,
      stock,
      images,
    } = body;

    if (!categoryId) {
      return NextResponse.json(
        {
          error: "Please select a category",
        },
        {
          status: 400,
        }
      );
    }

    if (!title?.trim()) {
      return NextResponse.json(
        {
          error: "Product title is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!description?.trim()) {
      return NextResponse.json(
        {
          error: "Description is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!price || price <= 0) {
      return NextResponse.json(
        {
          error: "Price must be greater than 0",
        },
        {
          status: 400,
        }
      );
    }

    if (stock < 0) {
      return NextResponse.json(
        {
          error: "Invalid stock quantity",
        },
        {
          status: 400,
        }
      );
    }

    if (!images || images.length === 0) {
      return NextResponse.json(
        {
          error: "At least one product image is required",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const product = await Product.create({
      sellerId: session.user.id,
      categoryId,
      title,
      description,
      price,
      stock,
      images,
      averageRating: 0,
      reviewCount: 0,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        product,
      },
      {
        status: 201,
      }
      
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}