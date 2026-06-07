"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

function getSavedCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  const savedCart = localStorage.getItem("cart");
  if (!savedCart) return [];

  try {
    return JSON.parse(savedCart);
  } catch {
    return [];
  }
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(getSavedCart);

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const increaseQuantity = (id: number) => {
    const updated = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Number(item.quantity || 1) + 1 }
        : item
    );

    saveCart(updated);
  };

  const decreaseQuantity = (id: number) => {
    const updated = cartItems
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Number(item.quantity || 1) - 1 }
          : item
      )
      .filter((item) => Number(item.quantity) > 0);

    saveCart(updated);
  };

  const removeItem = (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id);
    saveCart(updated);
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return sum + price * quantity;
  }, 0);

  const shipping = cartItems.length > 0 ? 8.99 : 0;
  const total = subtotal + shipping;

  return (
    <main className="cart-page">
      <h1>Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>

          <Link href="/products">
            <button type="button">Continue Shopping</button>
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <section>
            {cartItems.map((item) => {
              const price = Number(item.price) || 0;
              const quantity = Number(item.quantity) || 1;

              return (
                <div key={item.id} className="cart-item">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={110}
                    height={110}
                    className="cart-image"
                  />

                  <div>
                    <h3>{item.name}</h3>
                    <p>${price.toFixed(2)}</p>

                    <div className="quantity-box">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>

                      <span>{quantity}</span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </section>

          <aside className="summary-card">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <strong>${shipping.toFixed(2)}</strong>
            </div>

            <hr />

            <div className="summary-row total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>

            <Link href="/checkout">
              <button type="button" className="checkout-btn">
                Secure Checkout →
              </button>
            </Link>
          </aside>
        </div>
      )}

      <style jsx>{`
        .cart-page {
          min-height: 100vh;
          background: #fff8f1;
          padding: 50px 20px;
        }

        h1 {
          text-align: center;
          margin-bottom: 35px;
        }

        .cart-layout {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
        }

        .cart-item {
          background: white;
          display: grid;
          grid-template-columns: 110px 1fr auto;
          gap: 20px;
          align-items: center;
          padding: 18px;
          margin-bottom: 18px;
          border-radius: 18px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
        }

        .cart-image {
          object-fit: cover;
          border-radius: 14px;
        }

        .quantity-box {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .quantity-box button {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 50%;
          background: #fff3e6;
          color: #e67e22;
          cursor: pointer;
          font-weight: bold;
        }

        .remove-btn {
          background: #ffe5e5;
          color: #c0392b;
          border: none;
          padding: 10px 16px;
          border-radius: 10px;
          cursor: pointer;
        }

        .summary-card,
        .empty-cart {
          background: white;
          padding: 25px;
          border-radius: 18px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .checkout-btn,
        .empty-cart button {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 12px;
          border: none;
          background: #e67e22;
          color: white;
        }

        @media (max-width: 800px) {
          .cart-layout {
            grid-template-columns: 1fr;
          }

          .cart-item {
            grid-template-columns: 90px 1fr;
          }
        }
      `}</style>
    </main>
  );
}