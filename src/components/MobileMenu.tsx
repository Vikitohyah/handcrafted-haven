"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>

      {/* Dropdown */}
      {open && (
        <nav className="nav-mobile">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
          <Link href="/sellers" onClick={() => setOpen(false)}>Sellers</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
        </nav>
      )}
    </>
  );
}