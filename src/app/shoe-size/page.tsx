"use client";

import React from "react";
import Link from "next/link";
import BootSizeForm from "@/components/BootSizeForm";

export default function ShoeSizePage() {
  return (
    <div
      className="min-h-screen relative overflow-auto text-white"
      style={{
        backgroundImage:
          "url(/pictures/ChatGPT%20Image%20Sep%204%2C%202025%2C%2003_55_51%20PM.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Boot Size Finder</h1>
          <Link href="/shoes" className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition">Back</Link>
        </div>
        <p className="text-white/80 mb-8">Measure foot length (heel to big toe). We’ll recommend the right size.</p>
        <BootSizeForm />
      </div>
    </div>
  );
}


