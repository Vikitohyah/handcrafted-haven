import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },

    title: String,
    description: String,
    price: Number,
    images: [String],
    stock: Number,

    averageRating: {
      type: Number,
      default: 0,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default models.Product || model("Product", ProductSchema);