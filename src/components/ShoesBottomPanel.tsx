'use client';

import React from 'react';
import { COLOR_PALETTE } from '@/types/configurator';
import ColorSwatch from './ColorSwatch';

interface ShoesBottomPanelProps {
  activePart: string;
  activePartIndex: number;
  totalParts: number;
  selectedColor: string;
  onPartChange: (direction: 'prev' | 'next') => void;
  onColorSelect: (color: string) => void;
}

export default function ShoesBottomPanel({
  activePart: _activePart, // eslint-disable-line @typescript-eslint/no-unused-vars
  activePartIndex,
  totalParts,
  selectedColor,
  onPartChange,
  onColorSelect
}: ShoesBottomPanelProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/5 backdrop-blur-2xl border-t border-white/20 shadow-2xl shadow-black/50">
      <div className="max-w-7xl mx-auto px-6 py-8"> 
        {/* Navigation Header */}
        <div className="flex items-center justify-center mb-8">
          {/* Navigation Arrows */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onPartChange('prev')}
              disabled={activePartIndex === 0}
              className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 hover:border-white/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
              aria-label="Previous part"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Part Name in Center */}
            <div className="flex items-center gap-3 px-8">
              <h3 className="text-xl font-semibold text-slate-100">Main Body</h3>
            </div>
            
            <button
              onClick={() => onPartChange('next')}
              disabled={activePartIndex === totalParts - 1}
              className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 hover:border-white/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
              aria-label="Next part"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="flex justify-center mt-8 px-8">
          <div className="flex space-x-6 overflow-x-auto pb-4 max-w-full">
            {COLOR_PALETTE.map((color) => (
              <div key={color.hex} className="flex-shrink-0">
                <ColorSwatch
                  color={color.hex}
                  name={color.name}
                  isSelected={selectedColor === color.hex}
                  onClick={() => onColorSelect(color.hex)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
