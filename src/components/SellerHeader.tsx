"use client";

import Image from "next/image";
import Link from "next/link";
import "@/app/header.css";

interface SellerHeaderProps {
  seller: {
    firstName: string;
    lastName: string;
    location: string;
    bio: string;
    profileImage: string;
    createdAt?: string;
  };
  isOwner?: boolean;
}

export default function SellerHeader({
  seller,
  isOwner = false,
}: SellerHeaderProps) {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #FDF8F0 0%, #FFF 100%)",
        padding: "3rem 2rem",
      }}
    >
      <p style={{ marginBottom: "2rem", color: "#555" }}>
        <Link href="/products" style={{ textDecoration: "underline" }}>
          ← Back to marketplace
        </Link>
      </p>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "center" }}>
        <Image
          src={
            seller.profileImage ||
            "https://placehold.co/300x300?text=Seller"
          }
          alt={`${seller.firstName} ${seller.lastName}`}
          width={140}
          height={140}
          style={{ borderRadius: "50%" }}
        />

        <div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
            {seller.firstName} {seller.lastName}
          </h1>

          <p style={{ color: "#d97706", fontSize: "1.2rem" }}>
            Artisan Seller
          </p>

          <p>📍 {seller.location}</p>

          <p style={{ marginTop: "1rem", maxWidth: "600px" }}>
            {seller.bio || "Handcrafted artisan on Handcrafted Haven."}
          </p>

          <p style={{ color: "#666", marginTop: "1rem" }}>
            Member since{" "}
            {seller.createdAt
              ? new Date(seller.createdAt).getFullYear()
              : "Recently"}
          </p>

          {/* ONLY SHOW IF OWNER */}
          {isOwner && (
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
              <Link href="/seller/dashboard">
                <button
                  style={{
                    padding: "0.8rem 1.2rem",
                    background: "#111",
                    color: "#fff",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Go To Dashboard
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}