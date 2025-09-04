'use client';

import React from 'react';
// import Link from 'next/link';

interface TopBarProps {
  onShare: () => void;
  onDone: () => void;
  doneHref?: string;
  suitName?: string;
  suitPrice?: string;
  suitDescription?: string;
}

export default function TopBar({ onShare, onDone, doneHref, suitName = "MotoSuit Pro", suitPrice = "$399", suitDescription }: TopBarProps) {
  const handleDoneClick = () => {
    try {
      console.log('[TopBar] Done clicked');
    } catch {}
    onDone();
    if (doneHref) {
      try {
        window.location.assign(doneHref);
      } catch {
        // ignore
      }
    }
  };
  return (
    <div className="fixed top-0 left-0 right-0 z-[999] bg-white/5 backdrop-blur-2xl border-b border-white/20 shadow-xl shadow-black/50 pointer-events-auto">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-white">
                {suitName}
              </h1>
              <span className="text-lg font-semibold text-white/90">
                {suitPrice}
              </span>
            </div>
            {suitDescription && (
              <p className="text-sm text-white/70 mt-1 max-w-lg">
                {suitDescription}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onShare}
              className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-lg hover:bg-white/20 hover:border-white/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF3C00]/50 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg"
            >
              Share
            </button>
            <button
              onClick={handleDoneClick}
              className="px-6 py-2 bg-gradient-to-r from-[#FF5E3A] to-[#FF3C00] text-white font-semibold rounded-lg hover:from-[#FF7A5C] hover:to-[#FF5120] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF3C00]/50 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg shadow-[#FF3C00]/25"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
