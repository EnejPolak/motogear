'use client';

import React from 'react';
import NextImage from 'next/image';

interface MeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
}

export default function MeasurementModal({ isOpen, onClose, imageSrc, title }: MeasurementModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative max-w-4xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#FF5E3A] to-[#FF3C00]">
          <h2 className="text-white text-lg md:text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Image */}
        <div className="p-4">
          <NextImage
            src={imageSrc}
            alt={title}
            width={800}
            height={600}
            className="w-full h-auto rounded-lg"
          />
        </div>
        
        {/* Footer */}
        <div className="p-4 bg-gray-50 text-center">
          <p className="text-gray-600 text-sm">Follow these guidelines for accurate measurements</p>
        </div>
      </div>
    </div>
  );
}
