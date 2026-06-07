import { auth } from "@/auth";
import MobileMenu from "./MobileMenu";
import AuthButtons from "./AuthButtons";
import { Search, Menu, X } from "lucide-react";
import Link from "next/link";
// import "./header.css"

export default async function Header() {
  const session = await auth();

  const user = session?.user;

  // const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              placeholder="Search for handcrafted items..."
              className="search-input"
              aria-label="Search products"
            />
            <Search size={20} className="search-icon" />
          </div>

           {/* Auth Buttons (login/logout logic lives inside) */}
          <AuthButtons />

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      
      </div>

      <style jsx>{`
        .header {
          background-color: var(--white);
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          position: sticky;
          top: 0;
          z-index: 100;
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
          color: var(--orange);
          margin: 0;
        }
        .nav-desktop {
          display: none;
          gap: 24px;
        }
        .nav-desktop a {
          text-decoration: none;
          color: var(--black);
          font-weight: 500;
        }
        .nav-desktop a:hover {
          color: var(--orange);
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
          color: var(--gray);
        }
        .auth-buttons {
          display: none;
          gap: 12px;
        }
        .btn-outline {
          background: transparent;
          border: 1px solid var(--orange);
          color: var(--orange);
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
        }
        .btn-primary-small {
          background-color: var(--orange);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
        }
        .btn-primary-small:hover {
          background-color: #D35400;
          text-decoration: underline;
        }

        .btn-outline:hover {
          text-decoration: underline;
        }
        .mobile-menu-btn {
          background: none;
          border: none;
          cursor: pointer;
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
          color: var(--black);
        }
        .btn-outline-full, .btn-primary-full {
          padding: 10px;
          border-radius: 8px;
          width: 100%;
        }
        .btn-outline-full {
          background: transparent;
          border: 1px solid var(--orange);
          color: var(--orange);
        }
        .btn-primary-full {
          background-color: var(--orange);
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