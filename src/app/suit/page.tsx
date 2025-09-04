import { Suspense } from 'react';
import Configurator from '@/components/Configurator';

export default function SuitPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Configurator />
    </Suspense>
  );
}
