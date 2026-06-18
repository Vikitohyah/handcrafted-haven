import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { authConfig } from "./auth.config";

import User from "@/models/User";
import { connectDB } from "@/lib/mongoose";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,

  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        try {
          await connectDB();

          const email = credentials?.email as string;
          const password = credentials?.password as string;

          const user = await User.findOne({ email });

          if (!user) {
            throw new Error("Invalid email or password");
          }

          const passwordMatch = await bcrypt.compare(
            password,
            user.password
          );

          if (!passwordMatch) {
            throw new Error("Invalid email or password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            role: user.role,
            image: user.profileImage,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.image = user.image;
        token.name = user.name;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.image = token.image as string;
      }

      return session;
    },
  },
});
