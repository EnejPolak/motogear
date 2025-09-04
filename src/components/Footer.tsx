'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/pictures/ChatGPT%20Image%20Sep%204%2C%202025%2C%2006_21_20%20PM.png"
            alt="GRIT Motorcycle Gear logo"
            className="h-10 w-auto"
          />
          <span className="text-white text-sm">© {new Date().getFullYear()} GRIT Motorcycle Gear</span>
        </div>
        <div className="flex items-center gap-6 text-white text-sm">
          <a href="/suit-selection" className="hover:text-white transition-colors">Suits</a>
          <a href="/gloves" className="hover:text-white transition-colors">Gloves</a>
          <a href="/shoes" className="hover:text-white transition-colors">Boots</a>
          <a href="mailto:info@example.com" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}


