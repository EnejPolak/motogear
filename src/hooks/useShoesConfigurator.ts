'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ShoesConfiguration, DEFAULT_SHOES_CONFIGURATION } from '@/types/shoes';

const STORAGE_KEY = 'shoes-config';
const SHOES_PARTS: Array<keyof ShoesConfiguration> = ['main'];

export function useShoesConfigurator() {
  const [configuration, setConfiguration] = useState<ShoesConfiguration>(DEFAULT_SHOES_CONFIGURATION);
  const [activePart, setActivePart] = useState<keyof ShoesConfiguration>('main');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setConfiguration(parsed);
        } catch {}
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(configuration));
    }
  }, [configuration]);

  const activePartIndex = useMemo(() => SHOES_PARTS.indexOf(activePart), [activePart]);

  const updatePartColor = useCallback((part: keyof ShoesConfiguration, color: string) => {
    setConfiguration(prev => ({ ...prev, [part]: color }));
  }, []);

  const updateActivePartColor = useCallback((color: string) => {
    updatePartColor(activePart, color);
  }, [activePart, updatePartColor]);

  const navigatePart = useCallback((direction: 'prev' | 'next') => {
    const current = SHOES_PARTS.indexOf(activePart);
    let next = current;
    if (direction === 'prev') next = current > 0 ? current - 1 : SHOES_PARTS.length - 1;
    else next = current < SHOES_PARTS.length - 1 ? current + 1 : 0;
    setActivePart(SHOES_PARTS[next]);
  }, [activePart]);

  const reset = useCallback(() => {
    setConfiguration(DEFAULT_SHOES_CONFIGURATION);
    setActivePart('main');
  }, []);

  return { configuration, updatePartColor, updateActivePartColor, reset, activePart, activePartIndex, totalParts: SHOES_PARTS.length, navigatePart };
}
