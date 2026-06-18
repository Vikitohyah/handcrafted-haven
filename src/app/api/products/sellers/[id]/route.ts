import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Products";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  
  const { id } = await params;
  await connectDB();

  const products = await Product.find({
    sellerId: id,
  });

  return NextResponse.json(products);
}