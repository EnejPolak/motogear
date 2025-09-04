'use client';

import React, { useMemo, useState } from 'react';

type MeasurementField = {
  key: string;
  label: string;
  hint?: string;
};

const fields: MeasurementField[] = [
  { key: 'height', label: 'Body height', hint: 'Without shoes' },
  { key: 'weight', label: 'Weight' },
  { key: 'neck', label: 'Neck circumference' },
  { key: 'chest', label: 'Chest circumference', hint: 'At nipples level' },
  { key: 'waist', label: 'Waist circumference' },
  { key: 'abdomen', label: 'Abdomen circumference' },
  { key: 'hips', label: 'Hips circumference' },
  { key: 'shoulders', label: 'Shoulder width', hint: 'Bone to bone' },
  { key: 'sleeve_out', label: 'Sleeve length (outside)', hint: 'From shoulder to wrist over elbow' },
  { key: 'sleeve_in', label: 'Sleeve length (inside)', hint: 'From armpit to wrist' },
  { key: 'bicep', label: 'Bicep circumference' },
  { key: 'forearm', label: 'Forearm circumference' },
  { key: 'wrist', label: 'Wrist circumference' },
  { key: 'thigh', label: 'Thigh circumference (high)' },
  { key: 'knee', label: 'Knee circumference' },
  { key: 'calf', label: 'Calf circumference' },
  { key: 'ankle', label: 'Ankle circumference' },
  { key: 'inseam', label: 'Inseam length', hint: 'From crotch to floor (barefoot)' },
  { key: 'torso', label: 'Torso length', hint: 'Base of neck to crotch through chest' },
];

const unitOptions = [
  { key: 'cm', label: 'cm' },
  { key: 'in', label: 'inch' },
];

import { Cart } from '@/components/cart/cartStorage';

export default function SuitMeasurementsForm() {
  const [units, setUnits] = useState<'cm' | 'in'>('cm');
  const [tightness, setTightness] = useState<'tight' | 'loose'>('tight');
  const [notes, setNotes] = useState('');
  const [values, setValues] = useState<Record<string, string>>({});

  const requiredKeys = useMemo(() => new Set(fields.map(f => f.key)), []);

  const setValue = (key: string, v: string) => {
    if (/^[0-9]*[.,]?[0-9]*$/.test(v) || v === '') {
      setValues(prev => ({ ...prev, [key]: v }));
    }
  };

  const validate = (): string[] => {
    const missing: string[] = [];
    for (const k of requiredKeys) {
      const v = values[k];
      if (!v || v.trim() === '') missing.push(k);
    }
    return missing;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const missing = validate();
    if (missing.length) {
      return;
    }
    const payload = { units, tightness, notes, measurements: values };
    localStorage.setItem('suit-measurements', JSON.stringify(payload));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/80">Units</span>
          <select
            value={units}
            onChange={(e) => setUnits(e.target.value as 'cm' | 'in')}
            className="bg-black/40 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF3C00]/40"
          >
            {unitOptions.map(u => (
              <option key={u.key} value={u.key}>{u.label}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/80">Requested fit</span>
          <select
            value={tightness}
            onChange={(e) => setTightness(e.target.value as 'tight' | 'loose')}
            className="bg-black/40 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF3C00]/40"
          >
            <option value="tight">Tight (race fit)</option>
            <option value="loose">Loose (touring fit)</option>
          </select>
        </label>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-white/80">Notes (optional)</span>
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="E.g. wear back protector size M"
            className="bg-black/40 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF3C00]/40"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {fields.map((f) => (
          <label key={f.key} className="flex flex-col gap-1">
            <span className="text-sm text-white/90">{f.label}</span>
            {f.hint && (
              <span className="text-xs text-white/60">{f.hint}</span>
            )}
            <div className="relative">
              <input
                inputMode="decimal"
                value={values[f.key] ?? ''}
                onChange={(e) => setValue(f.key, e.target.value)}
                placeholder={units}
                className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-[#FF3C00]/40"
                required
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 text-xs">{units}</span>
            </div>
          </label>
        ))}
      </div>

      <div className="flex justify-end mt-8 gap-3">
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 font-semibold hover:bg-white/20 transition"
        >
          Save measurements
        </button>
        <button
          type="button"
          onClick={() => {
            const payload = { units, tightness, notes, measurements: values };
            localStorage.setItem('suit-measurements', JSON.stringify(payload));
            Cart.add({ kind: 'suit', name: 'Custom Racing Suit', price: 700, configuration: undefined, measurements: payload });
            window.location.assign('/cart');
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF5E3A] to-[#FF3C00] font-semibold shadow-2xl hover:from-[#FF7A5C] hover:to-[#FF5120] transition"
        >
          Add to cart
        </button>
      </div>
    </form>
  );
}


