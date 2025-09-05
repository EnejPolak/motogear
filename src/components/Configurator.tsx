'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Scene3D from './Scene3D';
import TopBar from './TopBar';
import BottomPanel from './BottomPanel';
import { useConfigurator } from '@/hooks/useConfigurator';

const suitData = {
  street: {
    name: "Street Level Suit",
    price: "€350",
    description: "Standard cowhide leather (1.1-1.2mm) • CE Level 1 • Perfect for city riding"
  },
  amateur: {
    name: "Amateur Level Suit", 
    price: "€500",
    description: "Premium cowhide leather (1.2-1.3mm) • CE Level 2 + CE AAA • Track days"
  },
  professional: {
    name: "Professional Racing Suit",
    price: "€700", 
    description: "High-resistance cowhide (1.3-1.4mm) • CE AAA & FIM legal • Professional racing"
  }
};

export default function Configurator() {
  const searchParams = useSearchParams();
  const suitType = searchParams.get('type') || 'street';
  const currentSuit = suitData[suitType as keyof typeof suitData] || suitData.street;
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
    resetConfiguration: _resetConfiguration // eslint-disable-line @typescript-eslint/no-unused-vars
  } = useConfigurator();

  const handleTextureUpload = (part: string, imageUrl: string | null) => {
    updatePartTexture(part as keyof typeof configuration, imageUrl);
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
    try {
      localStorage.setItem('suit-config-final', JSON.stringify({ configuration, textures }));
    } catch {}
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: 'url(/pictures/motorcycles-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none z-[1]"></div>
      {/* Top Navigation Bar */}
      <div className="relative z-[2]">
        <TopBar 
          onShare={handleShare} 
          onDone={handleDone}
          doneHref="/suit-measurements"
          suitName={currentSuit.name}
          suitPrice={currentSuit.price}
          suitDescription={currentSuit.description}
        />
      </div>

      {/* Main 3D View - Mobile optimized */}
      <div className="pt-20 pb-48 h-screen relative z-[1] touch-manipulation">
        {/* Professional ambient lighting effects - reduced on mobile */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-gradient-to-r from-[#FF3C00]/8 to-orange-500/6 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-40 md:w-80 h-40 md:h-80 bg-gradient-to-l from-slate-600/10 to-zinc-500/8 rounded-full blur-3xl" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-600/30 to-transparent" />
        </div>
        <Scene3D configuration={configuration} textures={textures} />
      </div>

      {/* Bottom Control Panel - Mobile optimized */}
      <div className="relative z-10">
        <BottomPanel
          activePart={activePart}
          activePartIndex={activePartIndex}
          totalParts={totalParts}
          selectedColor={activePartColor}
          onPartChange={navigatePart}
          onColorSelect={updateActivePartColor}
          onTextureUpload={handleTextureUpload}
          textures={textures}
        />
      </div>


    </div>
  );
}