"use client";

import { useState } from "react";
import { Heart, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import "./FeaturedProducts.css";
const products = [
  {
    id: 1,
    name: "Handmade Ceramic Mug",
    description: "Beautiful handcrafted ceramic mug perfect for coffee and tea.",
    price: 34.99,
    rating: 4.8,
    review: "Excellent quality",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80",
    category: "Pottery",
    type: "Kitchen",
  },
  {
    id: 2,
    name: "Macrame Wall Hanging",
    description: "Handmade wall decoration that brings beauty and warmth to your room.",
    price: 89.99,
    rating: 4.9,
    review: "Very beautiful",
    image:
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80",
    category: "Textiles",
    type: "Decor",
  },
  {
    id: 3,
    name: "Leather Journal",
    description: "Premium handmade leather journal for notes, sketches, and ideas.",
    price: 45.0,
    rating: 4.7,
    review: "Perfect gift",
    image:
      "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?auto=format&fit=crop&w=600&q=80",
    category: "Paper Goods",
    type: "Stationery",
  },
  {
    id: 4,
    name: "Wooden Serving Board",
    description: "Handcrafted wooden board for serving snacks, cheese, and meals.",
    price: 59.99,
    rating: 4.9,
    review: "Lovely finish",
    image:
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=600&q=80",
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
    image:
      "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=600&q=80",
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
    image:
      "https://images.unsplash.com/photo-1595351298020-038700609878?auto=format&fit=crop&w=600&q=80",
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
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=600&q=80",
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
    image:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80",
    category: "Home Decor",
    type: "Decor",
  },
];

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
const types = ["All", ...Array.from(new Set(products.map((p) => p.type)))];

export default function FeaturedProducts() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;

    const typeMatch =
      selectedType === "All" || product.type === selectedType;

    const priceMatch =
      selectedPrice === "All" ||
      (selectedPrice === "Under $30" && product.price < 30) ||
      (selectedPrice === "$30 - $60" && product.price >= 30 && product.price <= 60) ||
      (selectedPrice === "Over $60" && product.price > 60);

    return categoryMatch && typeMatch && priceMatch;
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const addToCart = (id: number) => {
    setCart((prev) => [...prev, id]);
  };

  return (
    <section className="featured">
      <div className="container">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Discover hand-picked treasures from our talented artisans</p>

          <p className="cart-count">
            <ShoppingCart size={18} /> Cart: {cart.length} item(s)
          </p>
        </div>

        <div className="filters">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>
                Category: {category}
              </option>
            ))}
          </select>

          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            {types.map((type) => (
              <option key={type} value={type}>
                Type: {type}
              </option>
            ))}
          </select>

          <select value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
            <option value="All">Price: All</option>
            <option value="Under $30">Under $30</option>
            <option value="$30 - $60">$30 - $60</option>
            <option value="Over $60">Over $60</option>
          </select>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
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
                >
                  <Heart
                    size={20}
                    fill={favorites.includes(product.id) ? "#E67E22" : "none"}
                    stroke={favorites.includes(product.id) ? "#E67E22" : "#666"}
                  />
                </button>
              </div>

              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-category">
                  {product.category} • {product.type}
                </p>

                <p className="product-description">{product.description}</p>

                <div className="product-rating">
                  <Star size={16} fill="#FFB800" stroke="#FFB800" />
                  <span>{product.rating}</span>
                  <small>({product.review})</small>
                </div>

                <p className="product-price">${product.price.toFixed(2)}</p>

                <button className="add-to-cart" onClick={() => addToCart(product.id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="no-products">No products found.</p>
        )}
      </div>
    </section>
  );
}
