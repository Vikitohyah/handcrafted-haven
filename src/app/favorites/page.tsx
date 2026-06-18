"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HeaderClient from "@/components/HeaderClient";
import Footer from "@/components/Footer";
import { Heart, Star, ShoppingCart, Trash2 } from "lucide-react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  review: string;
  image: string;
  category: string;
  type: string;
};

// Same products data
const products: Product[] = [
  {
    id: 1,
    name: "Handmade Ceramic Mug",
    description: "Beautiful handcrafted ceramic mug perfect for coffee and tea.",
    price: 34.99,
    rating: 4.8,
    review: "Excellent quality",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80",
    category: "Pottery",
    type: "Kitchen",
  },
  {
    id: 2,
    name: "Macrame Wall Hanging",
    description: "Handmade wall decoration that brings warmth to your room.",
    price: 89.99,
    rating: 4.9,
    review: "Very beautiful",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80",
    category: "Textiles",
    type: "Decor",
  },
  {
    id: 3,
    name: "Leather Journal",
    description: "Premium handmade leather journal for notes and sketches.",
    price: 45.0,
    rating: 4.7,
    review: "Perfect gift",
    image: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?auto=format&fit=crop&w=600&q=80",
    category: "Paper Goods",
    type: "Stationery",
  },
  {
    id: 4,
    name: "Wooden Serving Board",
    description: "Handcrafted wooden board for serving snacks and meals.",
    price: 59.99,
    rating: 4.9,
    review: "Lovely finish",
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=600&q=80",
    category: "Woodworking",
    type: "Kitchen",
  },
  {
    id: 5,
    name: "Handmade Scented Candle",
    description: "Natural scented candle made with care for a relaxing home feeling.",
    price: 22.99,
    rating: 4.8,
    review: "Smells amazing",
    image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=600&q=80",
    category: "Home Decor",
    type: "Decor",
  },
  {
    id: 6,
    name: "Woven Storage Basket",
    description: "Stylish woven basket for organizing blankets, toys, or home items.",
    price: 38.5,
    rating: 4.6,
    review: "Very practical",
    image: "https://images.unsplash.com/photo-1595351298020-038700609878?auto=format&fit=crop&w=600&q=80",
    category: "Basketry",
    type: "Storage",
  },
  {
    id: 7,
    name: "Handcrafted Beaded Necklace",
    description: "Unique handmade necklace with colorful artisan beads.",
    price: 29.99,
    rating: 4.9,
    review: "Beautiful craftsmanship",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=600&q=80",
    category: "Jewelry",
    type: "Accessories",
  },
  {
    id: 8,
    name: "Knitted Throw Blanket",
    description: "Soft knitted blanket designed for warmth, comfort, and style.",
    price: 64.99,
    rating: 4.8,
    review: "Very cozy",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80",
    category: "Home Decor",
    type: "Decor",
  },
];

const getStoredFavorites = (): number[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

const saveFavorites = (favorites: number[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

type CartItem = Product & { quantity: number };

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  useEffect(() => {
    const favIds = getStoredFavorites();
    setFavorites(favIds);
    const favProds = products.filter((p) => favIds.includes(p.id));
    setFavoriteProducts(favProds);
  }, []);

  const removeFromFavorites = (id: number) => {
    const newFavorites = favorites.filter((favId) => favId !== id);
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
    setFavoriteProducts(favoriteProducts.filter((p) => p.id !== id));
  };

  const addToCart = (product: Product) => {
    const savedCart = localStorage.getItem("cart");
    const currentCart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];

    const existingItem = currentCart.find((item) => item.id === product.id);

    const updatedCart = existingItem
      ? currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...currentCart, { ...product, quantity: 1 }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <main>
      <HeaderClient />

      <section className="favorites-page">
        <div className="container">
          <div className="favorites-header">
            <h1>My Favorites</h1>
            <p>{favoriteProducts.length} saved items</p>
          </div>

          {favoriteProducts.length === 0 ? (
            <div className="empty-favorites">
              <Heart size={64} stroke="#ccc" />
              <h2>No favorites yet</h2>
              <p>Start adding items you love by clicking the heart icon on any product.</p>
              <Link href="/" className="shop-now-btn">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="favorites-grid">
              {favoriteProducts.map((product) => (
                <div key={product.id} className="favorite-card">
                  <div className="favorite-image-container">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="favorite-image"
                    />
                    <button
                      className="remove-favorite-btn"
                      onClick={() => removeFromFavorites(product.id)}
                      aria-label="Remove from favorites"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="favorite-info">
                    <h3>{product.name}</h3>
                    <p className="favorite-category">
                      {product.category} • {product.type}
                    </p>
                    <p className="favorite-description">{product.description}</p>

                    <div className="favorite-rating">
                      <Star size={16} fill="#FFB800" stroke="#FFB800" />
                      <span>{product.rating}</span>
                      <small>({product.review})</small>
                    </div>

                    <p className="favorite-price">${product.price.toFixed(2)}</p>

                    <div className="favorite-actions">
                      <button
                        className="add-to-cart-btn"
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromFavorites(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .favorites-page {
          padding: 60px 0;
          min-height: 60vh;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .favorites-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .favorites-header h1 {
          font-size: 2.5rem;
          color: #2C3E50;
          margin-bottom: 8px;
        }
        .favorites-header p {
          color: #7F8C8D;
          font-size: 1.1rem;
        }
        .empty-favorites {
          text-align: center;
          padding: 80px 20px;
        }
        .empty-favorites h2 {
          margin: 20px 0 10px;
          color: #2C3E50;
        }
        .empty-favorites p {
          color: #7F8C8D;
          margin-bottom: 30px;
        }
        .shop-now-btn {
          display: inline-block;
          background-color: #E67E22;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
        }
        .favorites-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }
        .favorite-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
        }
        .favorite-image-container {
          position: relative;
          aspect-ratio: 1;
        }
        .favorite-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .remove-favorite-btn {
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
          color: #e74c3c;
        }
        .favorite-info {
          padding: 16px;
          flex: 1;
        }
        .favorite-info h3 {
          margin-bottom: 4px;
        }
        .favorite-category {
          font-size: 0.8rem;
          color: #7F8C8D;
          margin-bottom: 8px;
        }
        .favorite-description {
          font-size: 0.85rem;
          color: #5D6D7E;
          margin-bottom: 12px;
          line-height: 1.4;
        }
        .favorite-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 8px;
        }
        .favorite-price {
          font-weight: 700;
          color: #E67E22;
          font-size: 1.2rem;
          margin-bottom: 12px;
        }
        .favorite-actions {
          display: flex;
          gap: 10px;
        }
        .add-to-cart-btn {
          flex: 1;
          background-color: #E67E22;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .remove-btn {
          background: transparent;
          border: 1px solid #e74c3c;
          color: #e74c3c;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .favorites-grid {
            grid-template-columns: 1fr;
          }
          .favorites-header h1 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </main>
  );
}