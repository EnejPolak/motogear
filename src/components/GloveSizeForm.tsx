'use client';

import React, { useMemo, useState } from 'react';
import MeasurementModal from './MeasurementModal';

type Unit = 'cm' | 'in';

const sizeChart = [
  { size: 'XS', width: [7.0, 7.6], length: [16.5, 17.8] },
  { size: 'S',  width: [7.6, 8.3], length: [17.8, 19.0] },
  { size: 'M',  width: [8.3, 8.9], length: [19.0, 20.3] },
  { size: 'L',  width: [8.9, 9.5], length: [20.3, 21.6] },
  { size: 'XL', width: [9.5,10.2], length: [21.6, 22.9] },
  { size: 'XXL',width: [10.2,10.8],length: [22.9, 24.1] },
];

function convertToCm(value: number, unit: Unit) {
  return unit === 'cm' ? value : value * 2.54;
}

import { Cart } from './cart/cartStorage';

export default function GloveSizeForm() {
  const [unit, setUnit] = useState<Unit>('cm');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recommendation = useMemo(() => {
    const w = parseFloat(width.replace(',', '.'));
    const l = parseFloat(length.replace(',', '.'));
    if (isNaN(w) || isNaN(l)) return null;
    const wCm = convertToCm(w, unit);
    const lCm = convertToCm(l, unit);
    for (const row of sizeChart) {
      const withinW = wCm >= row.width[0] && wCm <= row.width[1];
      const withinL = lCm >= row.length[0] && lCm <= row.length[1];
      if (withinW && withinL) return row.size;
    }
    // fallback: closest by width
    let closest = sizeChart[0];
    let diff = Math.abs(wCm - (closest.width[0] + closest.width[1]) / 2);
    for (const row of sizeChart) {
      const mid = (row.width[0] + row.width[1]) / 2;
      const d = Math.abs(wCm - mid);
      if (d < diff) { closest = row; diff = d; }
    }
    return closest.size;
  }, [width, length, unit]);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { unit, width, length, recommendation };
    localStorage.setItem('glove-size', JSON.stringify(payload));
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
            📏 See How to Measure Gloves
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
        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/80">Palm width</span>
          <input value={width} onChange={(e) => setWidth(e.target.value)} inputMode="decimal" placeholder={unit} className="bg-black/40 border border-white/20 rounded-lg px-3 py-2" />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/80">Palm length</span>
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
            const payload = { unit, width, length, recommendation };
            localStorage.setItem('glove-size', JSON.stringify(payload));
            Cart.add({ kind: 'glove', name: 'Racing Gloves Pro', price: 89, sizeInfo: payload });
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
      imageSrc="/pictures/gloveMesurment.jpg"
      title="How to Measure for Racing Gloves"
    />
  </>
  );
}


