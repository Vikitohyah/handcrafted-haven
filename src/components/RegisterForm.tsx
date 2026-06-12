"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterForm() {
  const [formData, setFormData] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "customer",
    });

  const [message, setMessage] =
    useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<
  "success" | "error" | ""
>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    setLoading(true);
    setMessage("");

    const response = await fetch(
      "/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setStatus("error");

      setMessage(
        data.message ||
          Object.values(data.errors || {})
            .flat()
            .join(", ")
      );
      return;
    }

    setStatus("success");
    setMessage(
      data.message ||
        "Registration successful!"
    );
  } catch (error) {
    setStatus("error");
    setMessage(
      "Something went wrong. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="register-form"
    >
      <h2>Create Account</h2>
      <div className="register-links">
  <Link href="/">
    ← Back to Home
  </Link>

  <Link href="/login">
    Already have an account? Login
  </Link>
</div>
      <input
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
        required
      />

      <input
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      <select
        name="role"
        onChange={handleChange}
      >
        <option value="customer">
          Customer
        </option>

        <option value="seller">
          Seller
        </option>
      </select>

      <button
  type="submit"
  disabled={loading}
>
  {loading
    ? "Creating Account..."
    : "Register"}
</button>

     {message && (
  <p
    className={`message ${
      status === "success"
        ? "success-message"
        : "error-message"
    }`}
  >
    {message}
  </p>
)}
    </form>
  );
}