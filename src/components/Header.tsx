import MobileMenu from "./MobileMenu";
import { Search } from "lucide-react";
import AuthButtons from "./AuthButtons";

export default function Header() {
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
            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="/sellers">Sellers</a>
            <a href="/about">About</a>
          </nav>

          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search handcrafted items..."
              className="search-input"
              aria-label="Search products"
            />
            <Search size={20} className="search-icon" />
          </div>

          <AuthButtons />

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}