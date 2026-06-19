"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, ShoppingCart } from "lucide-react";
import "./FeaturedProducts.css";
import "@/app/header.css";

type Product = {
  _id: string;
  sellerId?: string;
  categoryId?: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  stock?: number;
  averageRating?: number;
  reviewCount?: number;
  category?: string;
  type?: string;
};

type CartItem = Product & {
  quantity: number;
};

type FeaturedProductsProps = {
  showAll?: boolean;
};

export default function FeaturedProducts({
  showAll = false,
}: FeaturedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const price = Number(product.price) || 0;

    const matchesPrice =
      selectedPrice === "All" ||
      (selectedPrice === "Under $100" && price < 100) ||
      (selectedPrice === "$100 - $300" && price >= 100 && price <= 300) ||
      (selectedPrice === "Over $300" && price > 300);

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesType =
      selectedType === "All" || product.type === selectedType;

    return matchesPrice && matchesCategory && matchesType;
  });

  const displayProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 4);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product: Product) => {
    const savedCart = localStorage.getItem("cart");
    const currentCart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];

    const updatedCart = currentCart.some((item) => item._id === product._id)
      ? currentCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...currentCart, { ...product, quantity: 1 }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.title} added to cart!`);
  };

  const favoriteCount = favorites.length;

  return (
    <section className="featured">
      <div className="container">
        <div className="section-header">
          <h2>{showAll ? "All Products" : "Featured Products"}</h2>

          <p>
            {showAll
              ? "Browse all handmade products from our artisans"
              : "Discover hand-picked treasures from our talented artisans"}
          </p>

          <div className="header-buttons">
            <Link href="/favorites" className="favorites-link">
              <button className="favorites-summary" type="button">
                <Heart size={20} fill={favoriteCount > 0 ? "#E67E22" : "none"} stroke="#E67E22" />
                <span>Favorites ({favoriteCount})</span>
                <span className="favorites-arrow"></span>
              </button>
            </Link>

            <Link href="/cart" className="cart-link">
              <button className="cart-summary" type="button">
                <span className="cart-icon-circle">
                  <ShoppingCart size={20} />
                </span>
                <span>View Cart</span>
                <span className="cart-arrow">→</span>
              </button>
            </Link>
          </div>
        </div>

        {showAll && (
          <div className="filters">
            <select
              value={selectedPrice}
              onChange={(event) => setSelectedPrice(event.target.value)}
            >
              <option value="All">Price: All</option>
              <option value="Under $100">Under $100</option>
              <option value="$100 - $300">$100 - $300</option>
              <option value="Over $300">Over $300</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              <option value="All">Category: All</option>
              <option value="Arts">Arts</option>
              <option value="Accessories">Accessories</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Shoes">Shoes</option>
              <option value="Woodwork">Woodwork</option>
              <option value="Leather">Leather</option>
              <option value="Bags">Bags</option>
              <option value="Candles">Candles</option>
            </select>

            <select
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
            >
              <option value="All">Type: All</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Accessories">Accessories</option>
              <option value="Furniture">Furniture</option>
              <option value="Clothing">Clothing</option>
              <option value="Footwear">Footwear</option>
            </select>
          </div>
        )}

        <div className="products-grid">
          {displayProducts.map((product) => {
            const price = Number(product.price) || 0;
            const rating = Number(product.averageRating) || 0;
            const reviewCount = Number(product.reviewCount) || 0;
            const stock = Number(product.stock) || 0;
            const imageUrl =
              product.images?.[0] ||
              "https://placehold.co/400x400?text=Product+Image";

            return (
              <div key={product._id} className="product-card">
                <div className="product-image-container">
                  <Image
                    src={imageUrl}
                    alt={product.title}
                    width={400}
                    height={400}
                    className="product-image"
                    unoptimized
                  />

                  <button
                    className="favorite-btn"
                    type="button"
                    onClick={() => toggleFavorite(product._id)}
                    aria-label="Add product to favorites"
                  >
                    <Heart
                      size={20}
                      fill={favorites.includes(product._id) ? "#E67E22" : "none"}
                      stroke={
                        favorites.includes(product._id) ? "#E67E22" : "#666"
                      }
                    />
                  </button>
                </div>

                <div className="product-info">
                  <h3>{product.title}</h3>

                  <p className="product-stock">
                    {stock > 0 ? `${stock} items available` : "Out of stock"}
                  </p>

                  <p className="product-description">
                    {product.description.length > 80
                      ? `${product.description.substring(0, 80)}...`
                      : product.description}
                  </p>

                  <div className="product-rating">
                    <Star size={16} fill="#FFB800" stroke="#FFB800" />
                    <span>{rating.toFixed(1)}</span>
                    <small>({reviewCount} reviews)</small>
                  </div>

                  <p className="product-price">${price.toFixed(2)}</p>

                  <button
                    className="add-to-cart"
                    type="button"
                    onClick={() => addToCart(product)}
                    disabled={stock === 0}
                  >
                    {stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {!showAll && (
          <div className="view-all-container">
            <Link href="/products">
              <button className="view-all-btn" type="button">
                View All Products
              </button>
            </Link>
          </div>
        )}

        {displayProducts.length === 0 && (
          <p className="no-products">No products found.</p>
        )}
      </div>
    </section>
  );
}