'use client';

import React from 'react';

interface TopBarProps {
  onShare: () => void;
  onDone: () => void;
}

export default function TopBar({ onShare, onDone }: TopBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#111827]/75 backdrop-blur-sm border-b border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Product Info */}
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-[#E5E7EB]">
              MotoSuit Pro
            </h1>
            <span className="text-lg font-semibold text-[#CBD5E1]">
              $399
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onShare}
              className="px-4 py-2 bg-[#0B1220] border border-[#1F2937] text-[#E5E7EB] rounded-lg hover:bg-[#1F2937] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2 focus:ring-offset-[#111827]"
            >
              Share
            </button>
            <button
              onClick={onDone}
              className="px-6 py-2 bg-[#7C3AED] text-[#0B0F1A] font-semibold rounded-lg hover:bg-[#8B5CF6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2 focus:ring-offset-[#111827]"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
