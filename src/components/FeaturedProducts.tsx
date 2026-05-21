"use client";
import { useState } from "react";
import { Heart, Star } from "lucide-react";

// Temporary static data - will be replaced with database later
const products = [
  {
    id: 1,
    name: "Handmade Ceramic Mug",
    price: 34.99,
    rating: 4.8,
    image: "https://placehold.co/300x300/FFE0B5/2C3E50?text=Handmade+Mug",
    category: "Pottery",
  },
  {
    id: 2,
    name: "Woven Wall Hanging",
    price: 89.99,
    rating: 4.9,
    image: "https://placehold.co/300x300/FFD2A5/2C3E50?text=Wall+Hanging",
    category: "Textiles",
  },
  {
    id: 3,
    name: "Leather Journal",
    price: 45.00,
    rating: 4.7,
    image: "https://placehold.co/300x300/FFC890/2C3E50?text=Leather+Journal",
    category: "Paper Goods",
  },
  {
    id: 4,
    name: "Wooden Serving Board",
    price: 59.99,
    rating: 4.9,
    image: "https://placehold.co/300x300/FFBC70/2C3E50?text=Wooden+Board",
    category: "Woodworking",
  },
];

export default function FeaturedProducts() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section className="featured">
      <div className="container">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Discover hand-picked treasures from our talented artisans</p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <button
                  className="favorite-btn"
                  onClick={() => toggleFavorite(product.id)}
                  aria-label={favorites.includes(product.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart
                    size={20}
                    fill={favorites.includes(product.id) ? "#E67E22" : "none"}
                    stroke={favorites.includes(product.id) ? "#E67E22" : "#666"}
                  />
                </button>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <div className="product-rating">
                  <Star size={16} fill="#FFB800" stroke="#FFB800" />
                  <span>{product.rating}</span>
                </div>
                <p className="product-price">${product.price}</p>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all">
          <button className="btn-outline">View All Products →</button>
        </div>
      </div>

      <style jsx>{`
        .featured {
          padding: 60px 0;
        }
        .section-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .section-header h2 {
          font-size: 2rem;
          color: var(--black);
          margin-bottom: 12px;
        }
        .section-header p {
          color: var(--gray);
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 30px;
        }
        .product-card {
          background: var(--white);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .product-image-container {
          position: relative;
          aspect-ratio: 1;
        }
        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .favorite-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: white;
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .product-info {
          padding: 16px;
        }
        .product-name {
          font-size: 1rem;
          margin-bottom: 4px;
        }
        .product-category {
          font-size: 0.8rem;
          color: var(--gray);
          margin-bottom: 8px;
        }
        .product-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 8px;
        }
        .product-price {
          font-weight: 700;
          color: var(--orange);
          font-size: 1.2rem;
          margin-bottom: 12px;
        }
        .add-to-cart {
          width: 100%;
          background: var(--orange);
          color: white;
          border: none;
          padding: 8px;
          border-radius: 6px;
          cursor: pointer;
        }
        .view-all {
          text-align: center;
          margin-top: 48px;
        }
        .btn-outline {
          background: transparent;
          border: 2px solid var(--orange);
          color: var(--orange);
          padding: 12px 32px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .featured { padding: 40px 0; }
          .products-grid { gap: 16px; }
        }
      `}</style>
    </section>
  );
}