'use client';

import { useCallback, useEffect, useState } from 'react';
import { GloveConfiguration, DEFAULT_GLOVE_CONFIGURATION } from '@/types/glove';

const STORAGE_KEY = 'glove-config';

export function useGloveConfigurator() {
  const [configuration, setConfiguration] = useState<GloveConfiguration>(DEFAULT_GLOVE_CONFIGURATION);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setConfiguration(JSON.parse(saved));
        } catch {}
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(configuration));
    }
  }, [configuration]);

  const updatePartColor = useCallback((part: keyof GloveConfiguration, color: string) => {
    if (part === 'fixed') return; // non-customizable
    setConfiguration(prev => ({ ...prev, [part]: color }));
  }, []);

  const reset = useCallback(() => {
    setConfiguration(DEFAULT_GLOVE_CONFIGURATION);
  }, []);

  return { configuration, updatePartColor, reset };
}
