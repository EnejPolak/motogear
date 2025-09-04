'use client';

import React from 'react';
import { MaterialColors, PRESET_COLORS, ConfigManager } from '@/models/config';
import { MATERIAL_NAMES, MATERIAL_DESCRIPTIONS } from '@/models/materialNames';

interface ConfigPanelProps {
  materialColors: MaterialColors;
  onColorChange: (material: keyof MaterialColors, color: string) => void;
  onReset: () => void;
  onToggleDebug: () => void;
  onToggleModelInfo: () => void;
  showDebug: boolean;
  showModelInfo: boolean;
}

export default function ConfigPanel({ 
  materialColors, 
  onColorChange, 
  onReset, 
  onToggleDebug, 
  onToggleModelInfo,
  showDebug,
  showModelInfo
}: ConfigPanelProps) {
  const handlePresetSelect = (presetName: keyof typeof PRESET_COLORS) => {
    const preset = PRESET_COLORS[presetName];
    Object.entries(preset).forEach(([key, value]) => {
      onColorChange(key as keyof MaterialColors, value);
    });
  };

  const handleExport = () => {
    const configString = ConfigManager.exportConfig(materialColors);
    const blob = new Blob([configString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'motogear-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const config = ConfigManager.importConfig(content);
        if (config) {
          Object.entries(config).forEach(([key, value]) => {
            onColorChange(key as keyof MaterialColors, value);
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const ColorInput = ({ 
    label, 
    material, 
    value 
  }: { 
    label: string; 
    material: keyof MaterialColors; 
    value: string; 
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        {label}
        <span 
          className="ml-2 text-xs text-gray-500 cursor-help"
          title={MATERIAL_DESCRIPTIONS[material]}
        >
          ℹ️
        </span>
      </label>
      <div className="flex items-center space-x-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onColorChange(material, e.target.value)}
          className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onColorChange(material, e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
          placeholder="#000000"
        />
      </div>
    </div>
  );

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Suit Configuration</h2>
      
      {/* Preset Colors */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Preset Colors</h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handlePresetSelect('classic')}
            className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded border"
          >
            Classic
          </button>
          <button
            onClick={() => handlePresetSelect('sport')}
            className="px-3 py-2 text-xs bg-orange-100 hover:bg-orange-200 rounded border"
          >
            Sport
          </button>
          <button
            onClick={() => handlePresetSelect('stealth')}
            className="px-3 py-2 text-xs bg-gray-800 text-white hover:bg-gray-900 rounded border"
          >
            Stealth
          </button>
        </div>
      </div>

      {/* Color Controls */}
      <div className="space-y-6 mb-6">
        {Object.entries(MATERIAL_NAMES).map(([key, label]) => (
          <ColorInput 
            key={key}
            label={`${label} Color`} 
            material={key as keyof MaterialColors} 
            value={materialColors[key as keyof MaterialColors]} 
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onReset}
          className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Reset to Default
        </button>
        
        <button
          onClick={handleExport}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Export Configuration
        </button>
        
        <div className="relative">
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="import-config"
          />
          <label
            htmlFor="import-config"
            className="block w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-center cursor-pointer"
          >
            Import Configuration
          </label>
        </div>

        {/* Debug Toggle */}
        <button
          onClick={onToggleDebug}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          {showDebug ? 'Hide Debug' : 'Show Debug'}
        </button>

        {/* Model Info Toggle */}
        <button
          onClick={onToggleModelInfo}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          {showModelInfo ? 'Hide Model Info' : 'Show Model Info'}
        </button>
      </div>
    </div>
  );
}
