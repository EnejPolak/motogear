'use client';

import React from 'react';
import { GloveConfiguration } from '@/types/glove';
import { COLOR_PALETTE } from '@/types/configurator';

interface GlovePanelProps {
  configuration: GloveConfiguration;
  onColorChange: (part: keyof GloveConfiguration, color: string) => void;
  onReset: () => void;
}

export default function GlovePanel({ configuration, onColorChange, onReset }: GlovePanelProps) {
  const parts: Array<{ key: keyof GloveConfiguration; label: string; editable: boolean }> = [
    { key: 'main', label: 'Main', editable: true },
    { key: 'paddings', label: 'Paddings', editable: true },
    { key: 'fixed', label: 'Fixed (locked black)', editable: false },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0B1220]/90 backdrop-blur-md border-t border-[#1F2937]">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#E5E7EB] font-semibold">Glove Colors</h3>
          <button onClick={onReset} className="px-3 py-2 bg-[#1F2937] text-white rounded border border-[#374151] text-sm">Reset</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {parts.map(part => (
            <div key={part.key} className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#E5E7EB]">{part.label}</span>
                <div className="w-6 h-6 rounded border border-[#374151]" style={{ background: part.key === 'fixed' ? '#000' : configuration[part.key] }} />
              </div>
              {part.editable ? (
                <div className="flex gap-3 overflow-x-auto">
                  {COLOR_PALETTE.map(c => (
                    <button
                      key={c.hex}
                      className="w-8 h-8 rounded border border-[#374151] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                      style={{ background: c.hex }}
                      onClick={() => onColorChange(part.key, c.hex)}
                      aria-label={`Set ${part.label} color to ${c.name}`}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-[#9CA3AF] text-sm">Locked. Always black.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
