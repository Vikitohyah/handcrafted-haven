import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing");
}

export async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI!);
}