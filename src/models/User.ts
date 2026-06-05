import mongoose, { Schema, model, models } from "mongoose";
import { minLength } from "zod";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "seller", "customer"],
      default: "customer",
    },

    profileImage: {
      type: String,
      default:
        "https://res.cloudinary.com/demo/image/upload/default-profile.jpg",
    },

    bio: {
      type: String,
      default: "",
    },

    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;