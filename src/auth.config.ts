import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const role = auth?.user?.role;

      const path = nextUrl.pathname;

      // Public routes
      const publicRoutes = ["/", "/login", "/register"];
      if (publicRoutes.includes(path)) return true;

      // Protect admin routes
      if (path.startsWith("/admin")) {
        return isLoggedIn && role === "admin";
      }

      // Protect seller routes
      if (path.startsWith("/seller")) {
        return isLoggedIn && role === "seller";
      }

      // Protect customer routes
      if (path.startsWith("/customer")) {
        return isLoggedIn && role === "customer";
      }

      return isLoggedIn;
    },
  },

  providers: [],
} satisfies NextAuthConfig;