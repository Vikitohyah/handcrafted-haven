"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="auth-buttons">
        <Link href="/login" className="btn-outline">Login</Link>
        <Link href="/register" className="btn-primary">Sign Up</Link>
      </div>
    );
  }

  return (
    <div className="auth-buttons">
      <span className="role-badge">{session.user.name}</span>

      <button
        className="btn-outline"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Logout
      </button>
    </div>
  );
}