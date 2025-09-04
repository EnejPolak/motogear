'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { GloveConfiguration, DEFAULT_GLOVE_CONFIGURATION, GLOVE_PARTS } from '@/types/glove';

const STORAGE_KEY = 'glove-config';

export function useGloveConfigurator() {
  const [configuration, setConfiguration] = useState<GloveConfiguration>(DEFAULT_GLOVE_CONFIGURATION);
  const [activePart, setActivePart] = useState<keyof GloveConfiguration>('main');

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

  const activePartIndex = useMemo(() => GLOVE_PARTS.indexOf(activePart), [activePart]);

  const updatePartColor = useCallback((part: keyof GloveConfiguration, color: string) => {
    if (part === 'fixed') return; // non-customizable
    setConfiguration(prev => ({ ...prev, [part]: color }));
  }, []);

  const updateActivePartColor = useCallback((color: string) => {
    updatePartColor(activePart, color);
  }, [activePart, updatePartColor]);

  const navigatePart = useCallback((direction: 'prev' | 'next') => {
    const current = GLOVE_PARTS.indexOf(activePart);
    let next = current;
    if (direction === 'prev') next = current > 0 ? current - 1 : GLOVE_PARTS.length - 1;
    else next = current < GLOVE_PARTS.length - 1 ? current + 1 : 0;
    setActivePart(GLOVE_PARTS[next]);
  }, [activePart]);

  const reset = useCallback(() => {
    setConfiguration(DEFAULT_GLOVE_CONFIGURATION);
    setActivePart('main');
  }, []);

  return { configuration, updatePartColor, updateActivePartColor, reset, activePart, activePartIndex, totalParts: GLOVE_PARTS.length, navigatePart };
}
