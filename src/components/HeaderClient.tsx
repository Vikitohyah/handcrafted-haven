"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";

export default function HeaderClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          {/* Logo */}
          <div className="logo">
            <h1>Handcrafted Haven</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/sellers">Sellers</Link>
            <Link href="/about">About</Link>
          </nav>

          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for handcrafted items..."
              className="search-input"
              aria-label="Search products"
            />
            <Search size={20} className="search-icon" />
          </div>

          {/* Auth Buttons (simple version without auth) */}
          <div className="auth-buttons">
            <Link href="/login" className="btn-outline">Log In</Link>
            <Link href="/register" className="btn-primary-small">Sign Up</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="nav-mobile">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/products" onClick={() => setIsMenuOpen(false)}>Products</Link>
            <Link href="/sellers" onClick={() => setIsMenuOpen(false)}>Sellers</Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            <hr />
            <Link href="/login" className="btn-outline-full" onClick={() => setIsMenuOpen(false)}>Log In</Link>
            <Link href="/register" className="btn-primary-full" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
          </nav>
        )}
      </div>

      <style jsx>{`
        .header {
          background-color: #FFFFFF;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
          gap: 20px;
          flex-wrap: wrap;
        }
        .logo h1 {
          font-size: 1.25rem;
          color: #E67E22;
          margin: 0;
        }
        .nav-desktop {
          display: none;
          gap: 24px;
        }
        .nav-desktop a {
          text-decoration: none;
          color: #2C3E50;
          font-weight: 500;
        }
        .nav-desktop a:hover {
          color: #E67E22;
        }
        .search-container {
          flex: 1;
          max-width: 300px;
          position: relative;
        }
        .search-input {
          width: 100%;
          padding: 10px 16px;
          padding-right: 40px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-family: inherit;
        }
        .search-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #7F8C8D;
        }
        .auth-buttons {
          display: none;
          gap: 12px;
        }
        .btn-outline {
          background: transparent;
          border: 1px solid #E67E22;
          color: #E67E22;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
        }
        .btn-primary-small {
          background-color: #E67E22;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
        }
        .mobile-menu-btn {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .nav-mobile {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 20px 0;
          border-top: 1px solid #eee;
        }
        .nav-mobile a {
          text-decoration: none;
          color: #2C3E50;
        }
        .btn-outline-full, .btn-primary-full {
          padding: 10px;
          border-radius: 8px;
          width: 100%;
          text-align: center;
          text-decoration: none;
        }
        .btn-outline-full {
          background: transparent;
          border: 1px solid #E67E22;
          color: #E67E22;
        }
        .btn-primary-full {
          background-color: #E67E22;
          color: white;
          border: none;
        }
        @media (min-width: 768px) {
          .nav-desktop { display: flex; }
          .auth-buttons { display: flex; }
          .mobile-menu-btn { display: none; }
          .search-container { max-width: 400px; }
        }
        @media (max-width: 767px) {
          .search-container { order: 3; width: 100%; max-width: none; }
        }
      `}</style>
    </header>
  );
}