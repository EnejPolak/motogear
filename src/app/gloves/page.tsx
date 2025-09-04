'use client';

import React, { Suspense } from 'react';
import GloveConfigurator from '@/components/GloveConfigurator';

export default function GlovesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GloveConfigurator />
    </Suspense>
  );
}
