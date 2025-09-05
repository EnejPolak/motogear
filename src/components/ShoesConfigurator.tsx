'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import ShoesScene3D from './ShoesScene3D';
import TopBar from './TopBar';
import ShoesBottomPanel from './ShoesBottomPanel';
import { useShoesConfigurator } from '@/hooks/useShoesConfigurator';

const shoesData = {
  racing: {
    name: "Racing Boots Pro",
    price: "€199",
    description: "High-performance racing boots designed for maximum protection and comfort. Engineered with advanced materials and precision construction for professional riders."
  }
};

export default function ShoesConfigurator() {
  const searchParams = useSearchParams();
  const shoesType = searchParams.get('type') || 'racing';
  const currentShoes = shoesData[shoesType as keyof typeof shoesData] || shoesData.racing;
  
  const { configuration, updateActivePartColor, activePart, activePartIndex, totalParts, navigatePart } = useShoesConfigurator();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Racing Boots Pro Configuration',
        text: 'Check out my custom racing boots design!',
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {
        alert('Unable to copy link');
      });
    }
  };

  const handleDone = () => {
    try {
      localStorage.setItem('shoes-config-final', JSON.stringify({ configuration }));
    } catch {}
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: 'url(/pictures/ChatGPT%20Image%20Sep%204%2C%202025%2C%2003_55_51%20PM.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none z-[1]"></div>
      
      {/* Top Navigation Bar */}
      <div className="relative z-[2]">
        <TopBar 
          onShare={handleShare} 
          onDone={handleDone} 
          doneHref="/shoe-size"
          suitName={currentShoes.name}
          suitPrice={currentShoes.price}
          suitDescription={currentShoes.description}
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
        <ShoesScene3D configuration={configuration} />
      </div>

      {/* Bottom Control Panel - Mobile optimized */}
      <div className="relative z-10">
        <ShoesBottomPanel
          activePart={activePart}
          activePartIndex={activePartIndex}
          totalParts={totalParts}
          selectedColor={configuration[activePart]}
          onPartChange={navigatePart}
          onColorSelect={updateActivePartColor}
        />
      </div>
    </div>
  );
}