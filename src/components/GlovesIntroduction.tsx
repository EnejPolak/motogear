"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
// import * as THREE from 'three';

// 3D Model Component
function GlovesModel() {
  const { scene } = useGLTF('/models/gloves2.glb');
  
  // Responsive scale based on screen size
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const scale = isMobile ? [1.2, 1.2, 1.2] : [1.8, 1.8, 1.8];
  
  return (
    <primitive 
      object={scene} 
      scale={scale} 
      position={[0, -0.2, 0]}
      rotation={[0, Math.PI / 4, 0]}
    />
  );
}

export default function GlovesIntroduction() {
  return (
    <section id="gloves-introduction" className="min-h-screen w-screen bg-black text-white py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#FF3C00]/5 to-orange-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-slate-600/8 to-zinc-500/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1440px] px-8 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - 3D Model */}
          <div className="order-2 lg:order-1">
            <div className="h-[600px] md:h-[700px]">
              <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ background: 'transparent' }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5, 3]} intensity={1.2} />
                <pointLight position={[-5, -5, 5]} intensity={0.5} color="#FF3C00" />
                <Suspense fallback={null}>
                  <GlovesModel />
                </Suspense>
                <OrbitControls 
                  enablePan={false}
                  enableZoom={false}
                  enableRotate={false}
                />
              </Canvas>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2">
            <div className="max-w-lg">
              {/* Badge */}
              <div className="inline-block mb-6">
                <div className="bg-gradient-to-r from-[#FF3C00]/20 to-orange-500/10 border border-[#FF3C00]/30 rounded-full px-6 py-2 backdrop-blur-sm">
                  <span className="text-[#FF3C00] text-sm font-semibold tracking-wider uppercase">Professional Racing Gloves</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-bold tracking-tight leading-tight mb-6" style={{ fontFamily: 'Orbitron, system-ui, sans-serif' }}>
                <span className="block text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  RACING GLOVES PRO
                </span>
              </h2>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl md:text-5xl font-bold text-white">€89</span>
                <span className="text-slate-400 text-lg ml-2 line-through">€120</span>
              </div>

              {/* Description */}
              <p className="text-[#D1D5DB] text-lg md:text-xl leading-relaxed mb-8">
                Premium racing gloves engineered for maximum grip, protection, and comfort. 
                Built with advanced materials and precision craftsmanship for professional riders.
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <span className="text-[#FF3C00] mr-3 text-xl">✓</span>
                  <span className="text-slate-200">Kangaroo leather palm for superior grip</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#FF3C00] mr-3 text-xl">✓</span>
                  <span className="text-slate-200">CE Level 2 protection on knuckles</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#FF3C00] mr-3 text-xl">✓</span>
                  <span className="text-slate-200">Reinforced stitching for durability</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#FF3C00] mr-3 text-xl">✓</span>
                  <span className="text-slate-200">Touchscreen compatible fingertips</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#FF3C00] mr-3 text-xl">✓</span>
                  <span className="text-slate-200">Ventilated design for breathability</span>
                </div>
              </div>

              {/* Specifications */}
              <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30 backdrop-blur-sm mb-8">
                <h3 className="text-lg font-bold text-slate-100 mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Material:</span>
                    <span className="text-slate-100">Kangaroo Leather</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Protection:</span>
                    <span className="text-slate-100">CE Level 2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Sizes:</span>
                    <span className="text-slate-100">Custom</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Weight:</span>
                    <span className="text-slate-100">180g</span>
                  </div>
                </div>
              </div>

              {/* Configure Button */}
              <div className="relative">
                <a
                  href="/gloves"
                  className="group relative inline-flex items-center gap-3 px-10 py-6 rounded-2xl text-xl font-bold text-white shadow-2xl bg-gradient-to-r from-[#FF5E3A] to-[#FF3C00] hover:shadow-3xl hover:scale-105 transition-all duration-500 overflow-hidden"
                >
                  {/* Button Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <span>CONFIGURE YOURS</span>
                    <div className="group-hover:translate-x-1 transition-transform duration-300">→</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
