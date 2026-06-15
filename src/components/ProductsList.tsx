"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Product = {
  _id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  type: string;
};

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/api/products");
      const data = await response.json();

      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <section className="products-page">
      <h1>All Products</h1>

      <div className="products-grid">
        {products.map((product) => (
          <div
            key={product._id}
            className="product-card"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
            />

            <h3>{product.name}</h3>

            <p>{product.description}</p>

            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}