'use client';

import React, { Suspense } from 'react';
import ShoesConfigurator from '@/components/ShoesConfigurator';

export default function ShoesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShoesConfigurator />
    </Suspense>
  );
}
