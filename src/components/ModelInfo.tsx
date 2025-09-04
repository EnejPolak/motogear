'use client';

import React from 'react';

interface ModelInfoProps {
  modelPath: string;
  isVisible: boolean;
}

export default function ModelInfo({ modelPath, isVisible }: ModelInfoProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 bg-gray-800 bg-opacity-95 backdrop-blur-sm text-white p-4 rounded-lg text-xs max-w-xs z-50 border border-gray-700">
      <h3 className="font-bold mb-2 text-green-400">Model Info</h3>
      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-300">Path:</span>
          <span className="text-white font-mono">{modelPath}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Format:</span>
          <span className="text-white">GLB</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Materials:</span>
          <span className="text-white">11</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Status:</span>
          <span className="text-green-400">Loaded</span>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-600">
        <div className="text-gray-400 text-xs">
          Material names should contain: main, chest, sides, arms, legs, knees, sheins, logo_leva, logo_chest, logo_desna, logo_back
        </div>
      </div>
    </div>
  );
}
