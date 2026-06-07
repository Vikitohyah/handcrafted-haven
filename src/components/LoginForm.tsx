"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getDashboardRoute } from "@/app/lib/roleRedirect";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");
    const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await signIn(
      "credentials",
      {
        email,
        password,
        redirect: false,
      }
    );

     setLoading(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    const res = await fetch("/api/auth/session");
       const session = await res.json();
   
       const role = session?.user?.role;
   
       setEmail("");
       setPassword("");
   
       router.push(getDashboardRoute(role));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome</h1>

        <p className="subtitle">
          Login to continue shopping.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

      <button 
        type="submit"
        className="login-btn"
        disabled={loading}
      >
        {loading ? "Logging In..." : "Login"}
      </button>

      {error && <p className="error-message">{error}</p>}
    </form>

      <div className="extra-links">
          
      <p>
        Don't have an account? 
        <Link href="/register">
          Register
        </Link>
      </p>

      <Link href="/">
            ← Back to Home
          </Link>
      </div>
    </div>
    </div>
  );
}