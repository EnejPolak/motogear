'use client';

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none">
      <nav className="pointer-events-auto bg-black/50 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl px-6 py-3 min-w-[320px]">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/pictures/ChatGPT%20Image%20Sep%204%2C%202025%2C%2006_21_20%20PM.png"
              alt="GRIT logo"
              className="h-10 w-auto"
            />
          </Link>

          {/* Center link */}
          <Link href="/" className="text-white font-medium tracking-wide">
            Home
          </Link>

          {/* Bag icon */}
          <Link href="/cart" aria-label="Shopping bag" className="relative text-white/90 hover:text-white transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 8H18L19.5 20.5C19.5 21.328 18.828 22 18 22H6C5.172 22 4.5 21.328 4.5 20.5L6 8Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M9 8V6C9 4.343 10.343 3 12 3C13.657 3 15 4.343 15 6V8" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span id="cart-badge" className="absolute -top-2 -right-3 text-[10px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[#FF5E3A] to-[#FF3C00] text-white hidden">0</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}


