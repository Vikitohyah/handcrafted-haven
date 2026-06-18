"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/header.css";

export default function NewProductPage() {
const router = useRouter();

const [categories, setCategories] = useState<any[]>([]);
const [categoryId, setCategoryId] = useState("");

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [price, setPrice] = useState("");
const [stock, setStock] = useState("");

const [imageUrl, setImageUrl] = useState("");
const [images, setImages] = useState<string[]>([]);

const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
const [error, setError] = useState("");

useEffect(() => {
async function loadCategories() {
try {
const response = await fetch("/api/categories");
const data = await response.json();
setCategories(data);
} catch (error) {
console.error(error);
}
}

loadCategories();

}, []);

function addImage() {
if (!imageUrl.trim()) return;

setImages((prev) => [...prev, imageUrl.trim()]);
setImageUrl("");


}

function removeImage(index: number) {
setImages((prev) => prev.filter((_, i) => i !== index));
}

async function handleSubmit() {
setError("");
setMessage("");

if (!categoryId) {
  setError("Please select a category");
  return;
}

if (!title.trim()) {
  setError("Product title is required");
  return;
}

if (!description.trim()) {
  setError("Product description is required");
  return;
}

if (!price || Number(price) <= 0) {
  setError("Price must be greater than 0");
  return;
}

if (!stock || Number(stock) < 0) {
  setError("Stock cannot be negative");
  return;
}

if (images.length === 0) {
  setError("Please add at least one image");
  return;
}

try {
  setLoading(true);

  const response = await fetch("/api/products/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categoryId,
      title,
      description,
      price: Number(price),
      stock: Number(stock),
      images,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    setError(data.error || "Failed to create product");
    return;
  }

  setMessage("Product created successfully!");

  setCategoryId("");
  setTitle("");
  setDescription("");
  setPrice("");
  setStock("");
  setImageUrl("");
  setImages([]);

  setTimeout(() => {
    router.push("/seller/dashboard");
  }, 1000);
} catch (error) {
  console.error(error);
  setError("Something went wrong");
} finally {
  setLoading(false);
}
}

  return (
    <>
      <Header />
      <main className="product-page">
        <section className="hero">
          <h1>Add New Product</h1>

        <p>
          Showcase your handcrafted products and
          attract more buyers.
        </p>
        </section>

        <div className="product-layout">
          {/* PREVIEW */}
          <aside className="preview-card">
            <h2>Product Preview</h2>

            <div className="preview-images">
              {images.length > 0 ? (
                images.slice(0, 4).map((url, index) => (
                  <Image
                    key={index}
                    src={url}
                    alt="Product"
                    width={120}
                    height={120}
                    className="preview-image"
                  />
                ))
              ) : (
                <div className="placeholder">
                  Product images will appear here
                </div>
              )}
            </div>

            <h3>
              {title || "Product Name"}
            </h3>

            <p className="preview-price">
              {price
                ? `$${price}`
                : "$0.00"}
            </p>

            <p className="preview-description">
              {description ||
                "Your product description will appear here."}
            </p>

            <p className="preview-stock">
              Stock: {stock || 0}
            </p>
          </aside>

          {/* FORM */}
          <section className="form-card">
            <h2>Create Product</h2>

            {message && (
              <div className="success">
                {message}
              </div>
            )}

            {error && (
              <div className="error">
                {error}
              </div>
            )}

            <div className="form-group">
              <label>Category</label>

              <select
                value={categoryId}
                onChange={(e) =>
                  setCategoryId(e.target.value)
                }
              >
                <option value="">
                  Select a Category
                </option>

                {categories.map((category: any) => (
                  <option
                    key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Product Name</label>

              <input
                type="text"
                placeholder="Handwoven Basket"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Price ($)</label>

              <input
                type="number"
                placeholder="25"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Stock Quantity</label>

              <input
                type="number"
                placeholder="10"
                value={stock}
                onChange={(e) =>
                  setStock(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Description</label>

              <textarea
                placeholder="Describe your product..."
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Product Image URL</label>

              <div className="image-input-row">
                <input
                  type="text"
                  placeholder="Paste image URL"
                  value={imageUrl}
                  onChange={(e) =>
                    setImageUrl(e.target.value)
                  }
                />

                <button
                  type="button"
                  className="add-image-btn"
                  onClick={addImage}
                >
                  Add
                </button>
              </div>
            </div>

            {images.length > 0 && (
              <div className="image-list">
                {images.map((url, index) => (
                  <div
                    key={index}
                    className="image-item"
                  >
                    <span>
                      Image {index + 1}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeImage(index)
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              className="submit-btn"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading
                ? "Creating Product..."
                : "Create Product"}
            </button>
          </section>
        </div>

        <style jsx>{`
          .product-page {
            min-height: 100vh;
            padding: 2rem;
            background: #fdf8f0;
          }

          .hero {
            text-align: center;
            margin-bottom: 2rem;
          }

          .hero h1 {
            font-size: 2.5rem;
            color: #6b4f3b;
            margin-bottom: 0.5rem;
          }

          .hero p {
            color: #666;
          }

          .product-layout {
            max-width: 1200px;
            margin: auto;
            display: grid;
            grid-template-columns: 350px 1fr;
            gap: 2rem;
          }

          .preview-card,
          .form-card {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 25px
              rgba(0, 0, 0, 0.08);
          }

          .preview-card {
            height: fit-content;
          }

          .preview-images {
            display: grid;
            grid-template-columns: repeat(
              2,
              1fr
            );
            gap: 0.5rem;
            margin-bottom: 1rem;
          }

          .preview-image {
            width: 100%;
            height: 120px;
            object-fit: cover;
            border-radius: 12px;
          }

          .placeholder {
            padding: 2rem;
            text-align: center;
            background: #f5f5f5;
            border-radius: 12px;
            color: #777;
          }

          .preview-price {
            color: #c78d5d;
            font-size: 1.4rem;
            font-weight: bold;
            margin: 1rem 0;
          }

          .preview-description {
            color: #666;
            line-height: 1.6;
          }

          .preview-stock {
            margin-top: 1rem;
            color: #888;
          }

          .form-group {
            margin-bottom: 1.25rem;
          }

          label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
          }

          input,
          textarea,
          select {
            width: 100%;
            padding: 14px;
            border-radius: 12px;
            border: 1px solid #ddd;
            font-size: 1rem;
          }

          textarea {
            min-height: 140px;
            resize: vertical;
          }

          .image-input-row {
            display: flex;
            gap: 0.75rem;
          }

          .add-image-btn {
            background: #8b5e3c;
            color: white;
            border: none;
            padding: 0 1.2rem;
            border-radius: 12px;
            cursor: pointer;
          }

          .image-list {
            margin-bottom: 1.5rem;
          }

          .image-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f7f7f7;
            padding: 0.75rem 1rem;
            border-radius: 10px;
            margin-bottom: 0.5rem;
          }

          .image-item button {
            background: #dc3545;
            color: white;
            border: none;
            padding: 0.4rem 0.8rem;
            border-radius: 8px;
            cursor: pointer;
          }

          .submit-btn {
            width: 100%;
            background: #8b5e3c;
            color: white;
            border: none;
            padding: 1rem;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
          }

          .submit-btn:disabled {
            background: #ccc;
          }

          .success {
            background: #e8f7ee;
            color: #1e8449;
            padding: 1rem;
            border-radius: 12px;
            margin-bottom: 1rem;
          }

          .error {
            background: #fdecea;
            color: #c0392b;
            padding: 1rem;
            border-radius: 12px;
            margin-bottom: 1rem;
          }

          @media (max-width: 900px) {
            .product-layout {
              grid-template-columns: 1fr;
            }

            .preview-card {
              order: -1;
            }
          }

          @media (max-width: 600px) {
            .product-page {
              padding: 1rem;
            }

            .hero h1 {
              font-size: 2rem;
            }

            .image-input-row {
              flex-direction: column;
            }

            .add-image-btn {
              height: 48px;
            }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}