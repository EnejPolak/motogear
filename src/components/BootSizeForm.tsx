'use client';

import React, { useMemo, useState } from 'react';
import MeasurementModal from './MeasurementModal';

type Unit = 'cm' | 'in';

// Simplified mapping by foot length in cm to EU size range
const chart = [
  { cm: 22.0, eu: 36 },
  { cm: 22.5, eu: 37 },
  { cm: 23.1, eu: 38 },
  { cm: 23.8, eu: 39 },
  { cm: 24.1, eu: 40 },
  { cm: 24.5, eu: 41 },
  { cm: 25.1, eu: 42 },
  { cm: 25.4, eu: 43 },
  { cm: 25.7, eu: 44 },
  { cm: 26.0, eu: 45 },
  { cm: 26.7, eu: 46 },
  { cm: 27.3, eu: 47 },
  { cm: 27.9, eu: 48 },
  { cm: 28.6, eu: 49 },
];

function toCm(v: number, unit: Unit) { return unit === 'cm' ? v : v * 2.54; }

import { Cart } from './cart/cartStorage';

export default function BootSizeForm() {
  const [unit, setUnit] = useState<Unit>('cm');
  const [length, setLength] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recommendation = useMemo(() => {
    const l = parseFloat(length.replace(',', '.'));
    if (isNaN(l)) return null;
    const lcm = toCm(l, unit);
    // find first chart.row with cm >= lcm
    for (const row of chart) {
      if (lcm <= row.cm + 0.05) return `EU ${row.eu}`;
    }
    return `EU ${chart[chart.length - 1].eu}`;
  }, [length, unit]);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('boot-size', JSON.stringify({ unit, length, recommendation }));
  };

  return (
    <>
      <form onSubmit={save} className="bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
        {/* See How Button */}
        <div className="mb-6 text-center">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg touch-manipulation"
          >
            📏 See How to Measure Shoes
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/80">Units</span>
          <select value={unit} onChange={(e) => setUnit(e.target.value as Unit)} className="bg-black/40 border border-white/20 rounded-lg px-3 py-2">
            <option value="cm">cm</option>
            <option value="in">inch</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-sm text-white/80">Foot length (heel → big toe)</span>
          <input value={length} onChange={(e) => setLength(e.target.value)} inputMode="decimal" placeholder={unit} className="bg-black/40 border border-white/20 rounded-lg px-3 py-2" />
        </label>
      </div>

      <div className="mb-6">
        <div className="text-white/80 text-sm mb-2">Recommendation</div>
        <div className="text-2xl font-bold">{recommendation ?? '—'}</div>
      </div>

      <div className="flex justify-end gap-3">
        <button type="submit" className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 font-semibold hover:bg-white/20 transition">Save size</button>
        <button
          type="button"
          onClick={() => {
            const payload = { unit, length, recommendation };
            localStorage.setItem('boot-size', JSON.stringify(payload));
            Cart.add({ kind: 'boot', name: 'Racing Boots Pro', price: 199, sizeInfo: payload });
            window.location.assign('/cart');
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF5E3A] to-[#FF3C00] font-semibold shadow-2xl hover:from-[#FF7A5C] hover:to-[#FF5120] transition"
        >
          Add to cart
        </button>
      </div>
    </form>

    {/* Measurement Modal */}
    <MeasurementModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      imageSrc="/pictures/shoesMesurment.jpg"
      title="How to Measure for Racing Shoes"
    />
  </>
  );
}


