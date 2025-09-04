'use client';

import React from 'react';

interface ColorSwatchProps {
  color: string;
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function ColorSwatch({ color, name, isSelected, onClick }: ColorSwatchProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative w-10 h-10 rounded-full transition-all duration-200 hover:scale-105
        ${isSelected 
          ? 'ring-2 ring-[#7C3AED] ring-offset-1 ring-offset-[#111827]' 
          : 'hover:ring-2 hover:ring-white hover:ring-opacity-10'
        }
      `}
      style={{ 
        backgroundColor: color === 'transparent' ? 'rgba(255,255,255,0.1)' : color,
        border: color === 'transparent' ? '2px dashed #6B7280' : 'none'
      }}
      title={name}
      aria-label={`Select ${name} color`}
    >
      {isSelected && (
        <div className="absolute inset-0 rounded-full ring-2 ring-[#111827] ring-inset" />
      )}
    </button>
  );
}
