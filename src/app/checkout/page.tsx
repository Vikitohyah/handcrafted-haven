"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSubmitted(true);
  };

  return (
    <main className="checkout-page">
      <div className="checkout-card">
        <h1>Checkout</h1>

        {orderSubmitted ? (
          <div className="success-message">
            <h2>🎉 Thank You for Shopping with Us!</h2>
            <p>
              Your order has been received successfully.
            </p>
            <p>
              We appreciate your support of our artisans and handcrafted products.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              required
            />

            <input
              type="text"
              placeholder="Delivery Address"
              required
            />

            <input
              type="text"
              placeholder="City"
              required
            />

            <button type="submit">
              Complete Order
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        .checkout-page {
          min-height: 100vh;
          background: #fff8f1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .checkout-card {
          background: white;
          padding: 40px;
          border-radius: 20px;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        input {
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        button {
          background: #e67e22;
          color: white;
          border: none;
          padding: 14px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
        }

        .success-message {
          text-align: center;
          color: #2c3e50;
        }

        .success-message h2 {
          color: #e67e22;
          margin-bottom: 15px;
        }

        .success-message p {
          margin-bottom: 10px;
        }
      `}</style>
    </main>
  );
}