"use client";

import React from "react";

export default function Hero() {
  return (
    <main className="min-h-screen w-screen bg-black text-white">
      {/* Hero Section */}
      <section id="home" className="relative h-screen w-screen overflow-hidden bg-gray-900">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/pictures/hero-suit.png')",
            zIndex: 1
          }}
        />

        {/* Left-to-right dark gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />

        {/* Content */}
        <div className="relative h-full z-20">
          <div className="mx-auto max-w-[1440px] h-full px-16 flex items-center">
            <div className="max-w-xl">
              <h1 className="font-bold tracking-tight leading-tight" style={{ fontFamily: 'Orbitron, system-ui, sans-serif' }}>
                <span className="block text-5xl md:text-7xl lg:text-8xl">BRANFORT // P_301</span>
              </h1>

              <h2 className="mt-6 text-[#FF3C00] uppercase tracking-[0.15em] text-xl md:text-2xl lg:text-3xl font-semibold">
                THE FUTURE OF MOTO GEAR
              </h2>

              <p className="mt-8 text-[#D1D5DB] leading-8 text-base md:text-lg lg:text-xl">
                Premium CE-certified leather.<br />
                Born in the lab. Built for the track.
              </p>

              <div className="mt-12">
                <a
                  href="#suit-introduction"
                  className="inline-block px-8 py-4 rounded-lg text-base md:text-lg font-semibold text-white shadow-[0_10px_30px_-10px_rgba(255,60,0,0.8)] bg-gradient-to-r from-[#FF5E3A] to-[#FF3C00] hover:from-[#FF7A5C] hover:to-[#FF5120] transition-colors"
                >
                  EXPLORE FEATURES
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
