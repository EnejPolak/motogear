'use client';

import React from 'react';

interface MaterialCardProps {
  name: string;
  color: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function MaterialCard({ name, color, isActive = false, onClick }: MaterialCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all
        ${isActive 
          ? 'bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-2 ring-offset-gray-900' 
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }
      `}
    >
      <div
        className="w-6 h-6 rounded border-2 border-gray-600 flex-shrink-0"
        style={{ backgroundColor: color }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{name}</p>
        <p className="text-xs opacity-75 font-mono">{color}</p>
      </div>
    </div>
  );
}
