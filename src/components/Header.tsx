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

      
    </header>
  );
}