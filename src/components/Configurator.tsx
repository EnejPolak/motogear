'use client';

import React from 'react';
import Scene3D from './Scene3D';
import TopBar from './TopBar';
import BottomPanel from './BottomPanel';
import { useConfigurator } from '@/hooks/useConfigurator';

export default function Configurator() {
  const {
    configuration,
    textures,
    activePart,
    activePartIndex,
    activePartColor,
    totalParts,
    updateActivePartColor,
    updatePartTexture,
    navigatePart,
    resetConfiguration
  } = useConfigurator();

  const handleTextureUpload = (part: string, imageUrl: string) => {
    updatePartTexture(part as any, imageUrl);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'MotoSuit Pro Configuration',
        text: 'Check out my custom motorcycle suit design!',
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {
        alert('Unable to copy link');
      });
    }
  };

  const handleDone = () => {
    // Here you would typically redirect to checkout or save the final configuration
    const configString = JSON.stringify(configuration, null, 2);
    
    // For demo purposes, show an alert
    alert('Configuration saved!');
  };

  return (
    <div className="min-h-screen bg-[#0F172A] relative overflow-hidden">
      {/* Top Navigation Bar */}
      <TopBar onShare={handleShare} onDone={handleDone} />

      {/* Main 3D View */}
      <div className="pt-20 pb-48 h-screen">
        <Scene3D configuration={configuration} textures={textures} />
      </div>

      {/* Bottom Control Panel */}
      <BottomPanel
        activePart={activePart}
        activePartIndex={activePartIndex}
        totalParts={totalParts}
        selectedColor={activePartColor}
        onPartChange={navigatePart}
        onColorSelect={updateActivePartColor}
        onTextureUpload={handleTextureUpload}
      />


    </div>
  );
}