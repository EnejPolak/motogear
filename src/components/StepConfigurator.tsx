'use client';

import React, { useState } from 'react';
import { MATERIAL_NAMES } from '@/models/materialNames';
import { MaterialColors } from '@/models/config';

interface StepConfiguratorProps {
  materialColors: MaterialColors;
  onColorChange: (material: keyof MaterialColors, color: string) => void;
  currentStep: number;
  onStepChange: (step: number) => void;
}

// Osnovne barve kot pri Nike
const BASIC_COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Red', value: '#DC2626' },
  { name: 'Blue', value: '#2563EB' },
  { name: 'Green', value: '#16A34A' },
  { name: 'Orange', value: '#EA580C' },
  { name: 'Purple', value: '#9333EA' },
  { name: 'Gray', value: '#6B7280' },
];

const STEP_ORDER: (keyof MaterialColors)[] = [
  'main', 'chest', 'sides', 'arms', 'legs', 'knees', 'sheins', 
  'logo_leva', 'logo_chest', 'logo_desna', 'logo_back'
];

export default function StepConfigurator({ 
  materialColors, 
  onColorChange, 
  currentStep,
  onStepChange 
}: StepConfiguratorProps) {
  const [customColor, setCustomColor] = useState('#000000');
  
  const currentMaterial = STEP_ORDER[currentStep];
  const currentMaterialName = MATERIAL_NAMES[currentMaterial];
  const currentColor = materialColors[currentMaterial];

  const handleColorSelect = (color: string) => {
    onColorChange(currentMaterial, color);
  };

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color);
    onColorChange(currentMaterial, color);
  };

  const nextStep = () => {
    if (currentStep < STEP_ORDER.length - 1) {
      onStepChange(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-90 backdrop-blur-sm z-50">
      <div className="max-w-full mx-auto px-4 py-3">
        {/* Current Material Name - Minimal */}
        <div className="text-center mb-3">
          <h2 className="text-white font-medium">
            {currentMaterialName}
          </h2>
        </div>

        {/* Basic Colors - Horizontal Scroll */}
        <div className="mb-4">
          <div className="flex space-x-3 overflow-x-auto pb-2 px-2 scrollbar-hide">
            {BASIC_COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorSelect(color.value)}
                className={`flex-shrink-0 w-12 h-12 rounded-full border-4 transition-all ${
                  currentColor === color.value
                    ? 'border-white scale-110'
                    : 'border-gray-600 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                {currentColor === color.value && (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
            
            {/* Custom Color in the row */}
            <div className="flex-shrink-0 flex items-center space-x-2">
              <input
                type="color"
                value={customColor}
                onChange={(e) => handleCustomColorChange(e.target.value)}
                className="w-12 h-12 rounded-full border-4 border-gray-600 cursor-pointer"
                title="Custom Color"
              />
              <input
                type="text"
                value={customColor}
                onChange={(e) => handleCustomColorChange(e.target.value)}
                className="w-20 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>

        {/* Material Selector - Horizontal Scroll */}
        <div className="flex space-x-2 overflow-x-auto pb-2 px-2 scrollbar-hide">
          {STEP_ORDER.map((material, index) => (
            <button
              key={material}
              onClick={() => onStepChange(index)}
              className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-full transition-all ${
                index === currentStep 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div
                className="w-3 h-3 rounded-full border border-gray-600"
                style={{ backgroundColor: materialColors[material] }}
              />
              <span className="text-sm whitespace-nowrap">
                {MATERIAL_NAMES[material]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
