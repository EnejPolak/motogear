'use client';

import { useState, useEffect, useCallback } from 'react';
import { SuitConfiguration, SuitPart, SUIT_PARTS, DEFAULT_CONFIGURATION, TextureConfiguration } from '@/types/configurator';

const STORAGE_KEY = 'moto-config';

export function useConfigurator() {
  const [configuration, setConfiguration] = useState<SuitConfiguration>(DEFAULT_CONFIGURATION);
  const [textures, setTextures] = useState<TextureConfiguration>({});
  const [activePart, setActivePart] = useState<SuitPart>('main');

  // Load configuration from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setConfiguration(parsed);
        } catch (error) {
          console.error('Error loading configuration:', error);
        }
      }
      // Load textures (optional persistence)
      const savedTextures = localStorage.getItem('moto-textures');
      if (savedTextures) {
        try {
          const parsedTextures = JSON.parse(savedTextures);
          setTextures(parsedTextures);
        } catch (error) {
          console.error('Error loading textures:', error);
        }
      }
    }
  }, []);

  // Save configuration to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(configuration));
    }
  }, [configuration]);

  // Save textures to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('moto-textures', JSON.stringify(textures));
      } catch (error) {
        console.error('Error saving textures:', error);
      }
    }
  }, [textures]);

  const activePartIndex = SUIT_PARTS.indexOf(activePart);

  const updatePartColor = useCallback((part: SuitPart, color: string) => {
    setConfiguration(prev => ({
      ...prev,
      [part]: color
    }));
  }, []);

  const updateActivePartColor = useCallback((color: string) => {
    updatePartColor(activePart, color);
  }, [activePart, updatePartColor]);

  const updatePartTexture = useCallback((part: SuitPart, textureUrl: string | null) => {
    setTextures(prev => {
      if (textureUrl === null) {
        const { [part]: _removed, ...rest } = prev;
        return rest; // remove key entirely
      }
      return {
        ...prev,
        [part]: textureUrl
      };
    });
  }, []);

  const navigatePart = useCallback((direction: 'prev' | 'next') => {
    const currentIndex = SUIT_PARTS.indexOf(activePart);
    let newIndex: number;

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : SUIT_PARTS.length - 1;
    } else {
      newIndex = currentIndex < SUIT_PARTS.length - 1 ? currentIndex + 1 : 0;
    }

    setActivePart(SUIT_PARTS[newIndex]);
  }, [activePart]);

  const resetConfiguration = useCallback(() => {
    setConfiguration(DEFAULT_CONFIGURATION);
    setActivePart('main');
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        navigatePart('prev');
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        navigatePart('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigatePart]);

  return {
    configuration,
    textures,
    activePart,
    activePartIndex,
    activePartColor: configuration[activePart],
    totalParts: SUIT_PARTS.length,
    updatePartColor,
    updateActivePartColor,
    updatePartTexture,
    navigatePart,
    setActivePart,
    resetConfiguration
  };
}
