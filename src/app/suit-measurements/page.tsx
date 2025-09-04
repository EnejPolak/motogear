"use client";

import React from "react";
import Link from "next/link";

import SuitMeasurementsForm from "@/components/SuitMeasurementsForm";

export default function SuitMeasurementsPage() {
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
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Custom Suit Measurements</h1>
          <Link
            href="/suit"
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition"
          >
            Back to Configurator
          </Link>
        </div>

        <p className="text-white/80 mb-8">
          Please enter your body measurements precisely while wearing thin
          technical underwear. Use a soft tape measure. If unsure, add a note in
          the comments. Our tailors will review and confirm fit with you.
        </p>

        <SuitMeasurementsForm />
      </div>
    </div>
  );
}


