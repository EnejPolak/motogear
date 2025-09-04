"use client";

import React, { useEffect, useState } from "react";
import { Cart, CartItem } from "@/components/cart/cartStorage";
import Link from "next/link";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => { setItems(Cart.list()); }, []);

  const total = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <div
      className="min-h-screen relative text-white"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(20,20,20,0.9) 40%), radial-gradient(circle at 80% 20%, rgba(255,60,0,0.15), transparent 40%)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        <h1 className="text-3xl font-bold mb-6">Your Bag</h1>
        {items.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-white/80">
            Your bag is empty. <Link className="text-[#FF3C00]" href="/">Continue shopping</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              {items.map((i) => (
                <div key={i.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold capitalize">{i.kind} — {i.name}</div>
                    <div className="text-white/70 text-sm">Added {new Date(i.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="font-bold">€{i.price.toFixed(0)}</div>
                    <button onClick={() => { Cart.remove(i.id); setItems(Cart.list()); }} className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit">
              <div className="flex items-center justify-between mb-2"><span className="text-white/80">Subtotal</span><span className="font-bold">€{total.toFixed(0)}</span></div>
              <div className="text-white/60 text-sm mb-4">Taxes and shipping calculated at checkout.</div>
              <button className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF5E3A] to-[#FF3C00] font-semibold shadow-2xl hover:from-[#FF7A5C] hover:to-[#FF5120] transition">Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


