"use client";

import React from "react";
import Link from "next/link";

const suitTypes = [
  {
    id: "street",
    name: "Street Level Suit",
    price: "€350",
    originalPrice: "€450",
    icon: "S",
    color: "from-yellow-500 to-yellow-600",
    textColor: "text-yellow-400",
    iconTextColor: "text-white",
    badge: "POPULAR",
    badgeColor: "bg-yellow-500",
    description: "Perfect for casual riders and daily city commuting",
    detailedDescription: "Designed for everyday motorcycle enthusiasts who prioritize comfort and basic protection during city rides and casual touring.",
    features: [
      "Standard Cowhide Leather (1.1-1.2mm thickness)",
      "CE Level 1 Protection on shoulders, elbows, knees", 
      "Basic Screen Printing for custom designs",
      "Standard Nylon Thread Stitching",
      "Standard Metal Zippers with storm flaps",
      "Basic Mesh Lining for breathability",
      "Basic Elastic Panels for flexibility",
      "Simple Branding Options available",
      "Sliders included for knee and elbow protection",
      "Basic stretch panels for comfort"
    ],
    specifications: {
      material: "Standard Cowhide Leather",
      thickness: "1.1 - 1.2mm",
      protection: "CE Level 1",
      stitching: "Standard Nylon Thread",
      zippers: "Standard Metal Zips",
      lining: "Basic Mesh Lining",
      breathability: "Basic ventilation",
      customization: "Simple branding"
    },
    usage: "City riding, daily commuting, casual motorcycle tours, weekend rides",
    homologation: "Basic safety standards - suitable for street use",
    target: "Casual Riders • Street Motorcyclists • Daily Commuters",
    pros: ["Affordable price", "Comfortable for daily use", "Good basic protection", "Easy maintenance"],
    warranty: "1 year standard warranty"
  },
  {
    id: "amateur", 
    name: "Amateur Level Suit",
    price: "€500",
    originalPrice: "€650",
    icon: "A",
    color: "from-blue-500 to-blue-600",
    textColor: "text-blue-400",
    iconTextColor: "text-white",
    badge: "BEST VALUE",
    badgeColor: "bg-blue-500",
    description: "Designed for track learners and amateur racing enthusiasts",
    detailedDescription: "The perfect stepping stone for riders transitioning from street to track, offering enhanced protection and performance features.",
    features: [
      "Premium Cowhide Leather (1.2-1.3mm thickness)",
      "CE Level 2 Protection with additional padding",
      "High-Quality Screen Printing for durability", 
      "Bonded Nylon Stitching for extra strength",
      "YKK Premium Zippers with waterproof coating",
      "Anti-Bacterial Removable Lining",
      "Accordion Elastic Panels for enhanced mobility",
      "Aerodynamic Hump included for track performance",
      "Semi-Custom Branding with sponsor placement",
      "Professional slider system",
      "Enhanced ventilation system",
      "Reinforced impact zones"
    ],
    specifications: {
      material: "Premium Cowhide Leather",
      thickness: "1.2 - 1.3mm",
      protection: "CE Level 2 + Additional Padding",
      stitching: "Bonded Nylon - Enhanced Strength",
      zippers: "YKK Premium Zippers",
      lining: "Anti-Bacterial Removable",
      breathability: "Enhanced ventilation system",
      customization: "Semi-custom with sponsor logos"
    },
    usage: "Track days, racing academies, amateur competitions, advanced street riding",
    homologation: "CE AAA certified - Near professional track standards",
    target: "Track Learners • Amateur Racers • Advanced Street Riders",
    pros: ["CE AAA certification", "Enhanced protection", "Professional features", "Great value for money"],
    warranty: "2 years extended warranty"
  },
  {
    id: "professional",
    name: "Professional Racing Suit", 
    price: "€700",
    originalPrice: "€950",
    icon: "P",
    color: "from-[#FF5E3A] to-[#FF3C00]", 
    textColor: "text-[#FF3C00]",
    iconTextColor: "text-white",
    badge: "PRO GRADE",
    badgeColor: "bg-gradient-to-r from-[#FF5E3A] to-[#FF3C00]",
    description: "Built for professional racers and serious competitors",
    detailedDescription: "The ultimate racing suit engineered for professional competitions, offering maximum protection and performance at the highest level.",
    features: [
      "High-Resistance Cowhide Leather (1.3-1.4mm thickness)",
      "CE Level 2 + Impact Zone Reinforcement",
      "Advanced Digital Printing with UV resistance",
      "Kevlar/Coats Bonded Thread Stitching", 
      "YKK Racing Grade Zippers with titanium coating",
      "3D Mesh Comfort + Anti-Bacterial Lining",
      "Professional Aerodynamic Hump with air channels",
      "Kevlar/Saymtax Stretch Panels for maximum flexibility",
      "Fully Customizable with sponsor logo placement",
      "Competition-grade slider system",
      "Advanced perforated ventilation",
      "Titanium reinforcement in critical areas"
    ],
    specifications: {
      material: "High-Resistance Cowhide Leather",
      thickness: "1.3 - 1.4mm (Maximum Protection)",
      protection: "CE Level 2 + Titanium Reinforcement",
      stitching: "Kevlar/Coats Bonded Thread",
      zippers: "YKK Racing Grade - Titanium",
      lining: "3D Mesh + Anti-Bacterial",
      breathability: "Advanced perforated system",
      customization: "Fully customizable with sponsors"
    },
    usage: "National & international races, professional competitions, MotoGP support classes",
    homologation: "CE AAA & FIM Legal - Full competition approval",
    target: "Professional Racers • Competition Riders • MotoGP Support",
    pros: ["FIM Legal certification", "Maximum protection", "Professional grade", "Competition proven"],
    warranty: "3 years professional warranty + race support"
  }
];

export default function SuitShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF3C00]/30 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#FF3C00]/5 to-orange-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-slate-600/8 to-zinc-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-transparent via-slate-800/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative pt-24 pb-20">
        <div className="mx-auto max-w-[1440px] px-8 md:px-16">
          <div className="text-center">
            <div className="inline-block mb-6">
              <div className="bg-gradient-to-r from-[#FF3C00]/20 to-orange-500/10 border border-[#FF3C00]/30 rounded-full px-6 py-2 backdrop-blur-sm">
                <span className="text-[#FF3C00] text-sm font-semibold tracking-wider uppercase">Professional Racing Gear</span>
              </div>
            </div>
            <h1 className="font-bold tracking-tight leading-tight mb-8" style={{ fontFamily: 'Orbitron, system-ui, sans-serif' }}>
              <span className="block text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                CHOOSE YOUR RACING SUIT
              </span>
            </h1>
            <p className="text-[#D1D5DB] text-xl md:text-2xl max-w-5xl mx-auto leading-relaxed font-light">
              Select the perfect racing suit for your experience level. Each suit is engineered with specific 
              materials, protection levels, and features to match your riding style and safety requirements.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-[#FF3C00] to-orange-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Suits Showcase */}
      <div className="relative pb-32">
        <div className="mx-auto max-w-[1440px] px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {suitTypes.map((suit, index) => (
              <div key={suit.id} className="group relative">
                {/* Premium Card Container */}
                <div className="relative bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 rounded-3xl p-6 md:p-8 border border-slate-700/40 shadow-2xl backdrop-blur-xl overflow-hidden h-full">
                  {/* Premium Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#FF3C00] to-transparent rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-slate-500 to-transparent rounded-full blur-2xl" />
                  </div>
                  
                  {/* Premium Border Glow */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${suit.color} opacity-10 blur-sm`} />
                  <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Premium Badge & Price */}
                    <div className="flex justify-between items-start mb-12">
                      <div className="flex items-center gap-4">
                        <div className={`${suit.badgeColor} px-6 py-3 rounded-full text-white text-sm font-bold shadow-xl backdrop-blur-sm border border-white/10`}>
                          {suit.badge}
                        </div>
                        <div className="hidden md:block w-16 h-px bg-gradient-to-r from-slate-600 to-transparent" />
                      </div>
                      <div className="text-right">
                        <div className="text-slate-400 text-sm line-through mb-1">{suit.originalPrice}</div>
                        <div className="text-4xl md:text-5xl font-bold text-white mb-2">{suit.price}</div>
                        <div className="text-[#FF3C00] text-sm font-semibold">Limited Time Offer</div>
                      </div>
                    </div>

                    <div className="flex flex-col h-full">
                      {/* Premium Icon & Title */}
                      <div className="text-center mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-r ${suit.color} rounded-2xl flex items-center justify-center shadow-2xl border border-white/10 mx-auto mb-4`}>
                          <span className={`${suit.iconTextColor} font-bold text-2xl`}>{suit.icon}</span>
                        </div>
                        <h2 className={`text-2xl md:text-3xl font-bold ${suit.textColor} mb-2`}>{suit.name}</h2>
                        <p className="text-[#D1D5DB] text-sm font-medium">{suit.description}</p>
                      </div>

                      {/* Key Specs - Compact */}
                      <div className="mb-6">
                        <h3 className="text-lg font-bold text-slate-100 mb-4 text-center">
                          Key Specifications
                        </h3>
                        <div className="space-y-2">
                          <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/30 flex justify-between items-center">
                            <span className="text-slate-300 text-sm">Material:</span>
                            <span className="text-slate-100 text-sm font-semibold">{suit.specifications.material}</span>
                          </div>
                          <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/30 flex justify-between items-center">
                            <span className="text-slate-300 text-sm">Protection:</span>
                            <span className="text-slate-100 text-sm font-semibold">{suit.specifications.protection}</span>
                          </div>
                          <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/30 flex justify-between items-center">
                            <span className="text-slate-300 text-sm">Thickness:</span>
                            <span className="text-slate-100 text-sm font-semibold">{suit.specifications.thickness}</span>
                          </div>
                        </div>
                      </div>

                      {/* Key Benefits - Compact */}
                      <div className="mb-6">
                        <h3 className="text-lg font-bold text-slate-100 mb-4 text-center">
                          Key Benefits
                        </h3>
                        <div className="space-y-2">
                          {suit.pros.map((pro, i) => (
                            <div key={i} className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/30 flex items-center">
                              <span className={`${suit.textColor} mr-3 text-lg`}>✓</span>
                              <span className="text-slate-200 text-sm font-medium">{pro}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Premium Configure Button */}
                      <div className="relative mt-auto">
                        <Link 
                          href={`/suit?type=${suit.id}`}
                          className={`group relative block w-full text-center px-6 py-4 rounded-2xl text-lg font-bold text-white shadow-2xl bg-gradient-to-r ${suit.color} hover:shadow-3xl hover:scale-105 transition-all duration-500 overflow-hidden`}
                        >
                          {/* Button Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="relative z-10 flex items-center justify-center gap-2">
                            <span>CONFIGURE</span>
                            <div className="group-hover:translate-x-1 transition-transform duration-300">→</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Back Button */}
      <div className="relative text-center pb-20">
        <div className="mx-auto max-w-[1440px] px-8 md:px-16">
          <Link 
            href="/"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-lg font-semibold text-slate-300 border border-slate-600/50 bg-slate-800/30 hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-300 backdrop-blur-sm shadow-xl hover:shadow-2xl"
          >
            <div className="group-hover:-translate-x-1 transition-transform duration-300">←</div>
            <span>BACK TO HOME</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
