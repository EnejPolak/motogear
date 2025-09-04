'use client';

import React from 'react';
import { SuitPart, PART_LABELS, COLOR_PALETTE } from '@/types/configurator';
import ColorSwatch from './ColorSwatch';

interface BottomPanelProps {
  activePart: SuitPart;
  activePartIndex: number;
  totalParts: number;
  selectedColor: string;
  onPartChange: (direction: 'prev' | 'next') => void;
  onColorSelect: (color: string) => void;
  onTextureUpload?: (part: string, imageUrl: string) => void;
}

export default function BottomPanel({
  activePart,
  activePartIndex,
  totalParts,
  selectedColor,
  onPartChange,
  onColorSelect,
  onTextureUpload
}: BottomPanelProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0B1220]/90 backdrop-blur-md border-t border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-6 py-8"> 
        {/* Navigation Header */}
        <div className="flex items-center justify-center mb-8">
          {/* Navigation Arrows */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onPartChange('prev')}
              disabled={activePartIndex === 0}
              className="p-3 rounded-full bg-[#0B1220] border border-[#1F2937] text-[#E5E7EB] hover:bg-[#1F2937] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Previous part"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Part Name in Center */}
            <h3 className="text-xl font-semibold text-[#E5E7EB] px-8">
              {PART_LABELS[activePart]}
            </h3>
            
            <button
              onClick={() => onPartChange('next')}
              disabled={activePartIndex === totalParts - 1}
              className="p-3 rounded-full bg-[#0B1220] border border-[#1F2937] text-[#E5E7EB] hover:bg-[#1F2937] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Next part"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Color Swatches - Only show for non-logo parts */}
        {!activePart.startsWith('logo') && (
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
        )}

        {/* Texture Upload Section - Only show for logo parts */}
        {activePart.startsWith('logo') && (
          <div className="flex justify-center mt-8 px-8">
            <div className="bg-[#1F2937] rounded-lg p-4 border border-[#374151] max-w-md">
              <h4 className="text-[#E5E7EB] text-base font-medium mb-3 text-center">Upload Logo Image</h4>
              <div className="space-y-3">
                <div className="text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && onTextureUpload) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const imageUrl = event.target?.result as string;
                          onTextureUpload(activePart, imageUrl);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                    id={`texture-upload-${activePart}`}
                  />
                  <label
                    htmlFor={`texture-upload-${activePart}`}
                    className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg cursor-pointer transition-colors text-sm font-medium inline-block"
                  >
                    Choose Image File
                  </label>
                </div>
                <div className="text-center text-[#9CA3AF] text-xs">
                  <p>PNG, JPG • Any size • Will auto-fit to body</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
