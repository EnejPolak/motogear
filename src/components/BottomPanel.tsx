'use client';

import React, { useMemo, useRef, useState } from 'react';
import { SuitPart, PART_LABELS, COLOR_PALETTE } from '@/types/configurator';
import ColorSwatch from './ColorSwatch';

interface BottomPanelProps {
  activePart: SuitPart;
  activePartIndex: number;
  totalParts: number;
  selectedColor: string;
  onPartChange: (direction: 'prev' | 'next') => void;
  onColorSelect: (color: string) => void;
  onTextureUpload?: (part: string, imageUrl: string | null) => void;
  textures?: { [key: string]: string | null };
}

export default function BottomPanel({
  activePart,
  activePartIndex,
  totalParts,
  selectedColor,
  onPartChange,
  onColorSelect,
  onTextureUpload,
  textures
}: BottomPanelProps) {
  const activeIsLogo = activePart.startsWith('logo');
  const activeTexture = textures?.[activePart] ?? null;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [statusMsg, setStatusMsg] = useState('');

  const slotSize = useMemo(() => {
    // Logical square side per logo part (px)
    if (activePart === 'logo_back') return 1024;
    if (activePart === 'logo_chest') return 768;
    return 512; // logo_leva, logo_desna
  }, [activePart]);

  const processImageToSquare = async (file: File, targetSize: number): Promise<string> => {
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = dataUrl;
    });

    // Downscale large images to max 2048 on the longest side before fitting
    const maxSource = 2048;
    let srcW = img.width;
    let srcH = img.height;
    if (Math.max(srcW, srcH) > maxSource) {
      const scale = maxSource / Math.max(srcW, srcH);
      srcW = Math.round(srcW * scale);
      srcH = Math.round(srcH * scale);
      const tmp = document.createElement('canvas');
      tmp.width = srcW;
      tmp.height = srcH;
      const tctx = tmp.getContext('2d');
      if (!tctx) return dataUrl;
      tctx.clearRect(0, 0, srcW, srcH);
      tctx.drawImage(img, 0, 0, srcW, srcH);
      // replace img with downscaled
      const scaled = new Image();
      await new Promise<void>((res) => {
        scaled.onload = () => res();
        scaled.src = tmp.toDataURL('image/png');
      });
      img.src = scaled.src;
    }

    // Create square canvas and fit contain
    const side = targetSize;
    const canvas = document.createElement('canvas');
    canvas.width = side;
    canvas.height = side;
    const ctx = canvas.getContext('2d');
    if (!ctx) return dataUrl;
    ctx.clearRect(0, 0, side, side);

    const scale = Math.min(1, Math.min(side / img.width, side / img.height));
    const drawW = Math.round(img.width * scale);
    const drawH = Math.round(img.height * scale);
    const dx = Math.round((side - drawW) / 2);
    const dy = Math.round((side - drawH) / 2);
    ctx.drawImage(img, dx, dy, drawW, drawH);

    // Always output PNG to preserve transparency
    return canvas.toDataURL('image/png');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0B1220]/90 backdrop-blur-md border-t border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-6 py-8"> 
        {/* Live status for screen readers */}
        <div className="sr-only" role="status" aria-live="polite">{statusMsg}</div>

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
            
            {/* Part Name in Center with optional thumbnail */}
            <div className="flex items-center gap-3 px-8">
              {activeIsLogo && activeTexture && (
                <img
                  src={activeTexture}
                  alt={`Preview of uploaded logo for ${PART_LABELS[activePart]}`}
                  className="w-10 h-10 rounded-sm object-contain bg-[#0B1220] border border-[#374151]"
                />
              )}
              <h3 className="text-xl font-semibold text-[#E5E7EB]">{PART_LABELS[activePart]}</h3>
            </div>
            
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
        {!activeIsLogo && (
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

        {/* Logo Upload UI - Only show for logo parts */}
        {activeIsLogo && (
          <div className="flex justify-center mt-8 px-8">
            <div className="bg-[#1F2937] rounded-lg p-4 border border-[#374151] max-w-md w-full">
              <h4 className="text-[#E5E7EB] text-base font-medium mb-3 text-center">Upload Logo</h4>
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file && onTextureUpload) {
                        const processed = await processImageToSquare(file, slotSize);
                        onTextureUpload(activePart, processed);
                        // Clear input so same file can be re-uploaded
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }
                    }}
                    className="hidden"
                    id={`texture-upload-${activePart}`}
                    aria-label={`Upload logo for ${PART_LABELS[activePart]}`}
                  />
                  <label
                    htmlFor={`texture-upload-${activePart}`}
                    className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg cursor-pointer transition-colors text-sm font-medium inline-block"
                  >
                    Upload Logo
                  </label>
                </div>

                {activeTexture && (
                  <div className="flex items-center gap-3">
                    <img
                      src={activeTexture}
                      alt={`Preview of uploaded logo for ${PART_LABELS[activePart]}`}
                      className="w-20 h-20 object-contain rounded bg-[#0B1220] border border-[#374151]"
                    />
                    <button
                      onClick={() => {
                        onTextureUpload && onTextureUpload(activePart, null);
                        setStatusMsg(`Logo removed from ${PART_LABELS[activePart]}`);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="px-3 py-2 text-sm bg-[#0B1220] hover:bg-[#111827] text-[#E5E7EB] border border-[#374151] rounded"
                      aria-label={`Remove logo from ${PART_LABELS[activePart]}`}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              <p className="text-[#9CA3AF] text-xs text-center mt-3">PNG with transparency works best</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
