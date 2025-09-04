"use client";

import React from "react";

export default function SuitIntroduction() {
  return (
    <section id="suit-introduction" className="min-h-screen w-screen bg-black text-white py-20">
      <div className="mx-auto max-w-[1440px] px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-bold tracking-tight leading-tight mb-6" style={{ fontFamily: 'Orbitron, system-ui, sans-serif' }}>
            <span className="block text-4xl md:text-5xl lg:text-6xl">ADVANCED PROTOTYPES</span>
          </h2>
          <p className="text-[#D1D5DB] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Three cutting-edge racing suits, each engineered for maximum performance and protection. 
            Born from advanced materials and precision design.
          </p>
        </div>

        {/* Main Image Section */}
        <div className="relative">
          <div 
            className="w-full h-[600px] md:h-[800px] bg-cover bg-center bg-no-repeat rounded-2xl overflow-hidden"
            style={{
              backgroundImage: "url('/pictures/20250729_1754_Futuristic Racing Suits_remix_01k1be0tc2ezb8hjr5rzzv24h8.png')"
            }}
          />
          
          {/* Overlay gradient for better text readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-black font-bold text-xl">S</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-yellow-400">STREET LEVEL SUIT</h3>
            <p className="text-[#D1D5DB] text-sm leading-relaxed">
              €350 • Standard cowhide leather (1.1-1.2mm) • CE Level 1 protection • Perfect for city riding and daily use.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-slate-500 to-slate-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-200">AMATEUR LEVEL SUIT</h3>
            <p className="text-[#D1D5DB] text-sm leading-relaxed">
              €500 • Premium cowhide leather (1.2-1.3mm) • CE Level 2 + CE AAA homologation • Track days and racing academies.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-red-400">PROFESSIONAL RACING SUIT</h3>
            <p className="text-[#D1D5DB] text-sm leading-relaxed">
              €700 • High-resistance cowhide (1.3-1.4mm) • CE AAA & FIM legal • Kevlar reinforcement for professional racing.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <a
            href="/suit-selection"
            className="inline-block px-8 py-4 rounded-lg text-base md:text-lg font-semibold text-white shadow-[0_10px_30px_-10px_rgba(255,60,0,0.8)] bg-gradient-to-r from-[#FF5E3A] to-[#FF3C00] hover:from-[#FF7A5C] hover:to-[#FF5120] transition-colors"
          >
            EXPLORE SUITS
          </a>
        </div>
      </div>
    </section>
  );
}
