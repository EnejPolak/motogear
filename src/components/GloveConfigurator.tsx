'use client';

import React from 'react';
import GloveScene3D from './GloveScene3D';
import GlovePanel from './GlovePanel';
import { useGloveConfigurator } from '@/hooks/useGloveConfigurator';

export default function GloveConfigurator() {
  const { configuration, updatePartColor, reset } = useGloveConfigurator();

  return (
    <div className="min-h-screen bg-[#0F172A] relative overflow-hidden">
      <div className="pt-16 pb-44 h-screen">
        <GloveScene3D configuration={configuration} />
      </div>
      <GlovePanel configuration={configuration} onColorChange={updatePartColor} onReset={reset} />
    </div>
  );
}
