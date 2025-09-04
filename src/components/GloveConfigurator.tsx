'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import GloveScene3D from './GloveScene3D';
import TopBar from './TopBar';
import GloveBottomPanel from './GloveBottomPanel';
import { useGloveConfigurator } from '@/hooks/useGloveConfigurator';

const gloveData = {
  racing: {
    name: "Racing Gloves Pro",
    price: "€89",
    description: "Premium racing gloves engineered for maximum grip, protection, and comfort. Built with advanced materials and precision craftsmanship for professional riders."
  }
};

export default function GloveConfigurator() {
  const searchParams = useSearchParams();
  const gloveType = searchParams.get('type') || 'racing';
  const currentGlove = gloveData[gloveType as keyof typeof gloveData] || gloveData.racing;
  
  const { configuration, updateActivePartColor, activePart, activePartIndex, totalParts, navigatePart } = useGloveConfigurator();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Racing Gloves Pro Configuration',
        text: 'Check out my custom racing gloves design!',
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
    // For demo purposes, show an alert
    alert('Configuration saved!');
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
          doneHref="/glove-size"
          suitName={currentGlove.name}
          suitPrice={currentGlove.price}
          suitDescription={currentGlove.description}
        />
      </div>

      {/* Main 3D View */}
      <div className="pt-20 pb-48 h-screen relative z-[1]">
        <GloveScene3D configuration={configuration} />
      </div>

      {/* Bottom Control Panel */}
      <div className="relative z-10">
        <GloveBottomPanel
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