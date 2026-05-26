"use client";

import { useState } from "react";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
const products = [
  {
    id: 1,
    name: "Handmade Ceramic Mug",
    price: 34.99,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80",
    category: "Pottery",
  },
  {
    id: 2,
    name: "Macrame Wall Hanging",
    price: 89.99,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80",
    category: "Textiles",
  },
  {
    id: 3,
    name: "Leather Journal",
    price: 45.0,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?auto=format&fit=crop&w=600&q=80",
    category: "Paper Goods",
  },
  {
    id: 4,
    name: "Wooden Serving Board",
    price: 59.99,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=600&q=80",
    category: "Woodworking",
  },
  {
    id: 5,
    name: "Handmade Scented Candle",
    price: 22.99,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=600&q=80",
    category: "Home Decor",
  },
  {
    id: 6,
    name: "Woven Storage Basket",
    price: 38.5,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1595351298020-038700609878?auto=format&fit=crop&w=600&q=80",
    category: "Basketry",
  },
  {
  id: 7,
  name: "Handcrafted Beaded Necklace",
  price: 29.99,
  rating: 4.9,
  image:
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=600&q=80",
  category: "Jewelry",
},
{
  id: 8,
  name: "Knitted Throw Blanket",
  price: 64.99,
  rating: 4.8,
  image:
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80",
  category: "Home Decor",
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
          <p>Discover beautiful handmade products from talented artisans.</p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="product-image"
                />
                

                <button
                  className="favorite-btn"
                  onClick={() => toggleFavorite(product.id)}
                  aria-label={
                    favorites.includes(product.id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
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

                <p className="product-price">${product.price.toFixed(2)}</p>

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
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.14);
        }

        .product-image-container {
          position: relative;
          aspect-ratio: 1;
          background: #f7f2ed;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .favorite-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: white;
          border: none;
          border-radius: 50%;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .product-info {
          padding: 18px;
        }

        .product-name {
          font-size: 1rem;
          margin-bottom: 4px;
          color: var(--black);
        }

        .product-category {
          font-size: 0.85rem;
          color: var(--gray);
          margin-bottom: 8px;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 8px;
          font-size: 0.9rem;
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
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }

        .add-to-cart:hover {
          opacity: 0.9;
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
          .featured {
            padding: 40px 0;
          }

          .products-grid {
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}