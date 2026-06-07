"use client";

import Image from "next/image";

interface SellerHeaderProps {
  seller: {
    id: string;
    name: string;
    specialty: string;
    location: string;
    rating: number;
    sales: number;
    bio: string;
    profileImage: string;
    joined: string;
  };
}

export default function SellerHeader({
  seller,
}: SellerHeaderProps) {
  const isOwner = true;

  return (
    <section
      style={{
          background: "linear-gradient(135deg, #FDF8F0 0%, #FFF 100%)",
          padding: "3rem 2rem",
      }}
    >
      <p
        style={{
          marginBottom: "2rem",
          color: "#555",
        }}
      >
        <a href="/" style={{ color: "inherit", textDecoration: "underline", cursor: "pointer"}}>
          ← Back to marketplace
        </a>
      </p>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Image
          src={seller.profileImage}
          alt={seller.name}
          width={140}
          height={140}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        <div>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
            }}
          >
            {seller.name}
          </h1>

          <p
            style={{
              color: "#d97706",
              fontSize: "1.4rem",
              marginTop: "0.5rem",
            }}
          >
            {seller.specialty}
          </p>

          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              marginTop: "1rem",
              flexWrap: "wrap",
            }}
          >
            <span>📍 {seller.location}</span>
            <span>⭐ {seller.rating}</span>
            <span>🏆 {seller.sales} sales</span>
          </div>

          <p
            style={{
              marginTop: "1rem",
              maxWidth: "700px",
              lineHeight: "1.8",
            }}
          >
            {seller.bio}
          </p>

          <p
            style={{
              marginTop: "1rem",
              color: "#666",
            }}
          >
            Member since {seller.joined}
          </p>

          {isOwner && (
            <div
              style={{
                marginTop: "1.5rem",
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <button
                style={{
                  padding: "0.8rem 1.2rem",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#111",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Edit Profile
              </button>

              <button
                style={{
                  padding: "0.8rem 1.2rem",
                  borderRadius: "8px",
                  border: "1px solid #111",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                Add Product
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}