export interface SuitConfiguration {
  main: string;
  chest: string;
  sides: string;
  arms: string;
  legs: string;
  knees: string;
  sheins: string;
  logo_leva: string;
  logo_chest: string;
  logo_desna: string;
  logo_back: string;
}

export interface TextureConfiguration {
  [key: string]: string | null; // URL slike ali null če ni slike
}

export type SuitPart = keyof SuitConfiguration;

export const SUIT_PARTS: SuitPart[] = [
  'main',
  'chest', 
  'sides',
  'arms',
  'legs',
  'knees',
  'sheins',
  'logo_leva',
  'logo_chest',
  'logo_desna',
  'logo_back'
];

export const PART_LABELS: Record<SuitPart, string> = {
  main: 'Main Body',
  chest: 'Chest',
  sides: 'Sides',
  arms: 'Arms',
  legs: 'Legs',
  knees: 'Knees',
  sheins: 'Sheins',
  logo_leva: 'Logo Left',
  logo_chest: 'Logo Chest',
  logo_desna: 'Logo Right',
  logo_back: 'Logo Back'
};

export const COLOR_PALETTE = [
  { name: 'Jet Black', hex: '#0B0B0B' },
  { name: 'Graphite', hex: '#1F2937' },
  { name: 'Charcoal', hex: '#374151' },
  { name: 'Concrete Gray', hex: '#6B7280' },
  { name: 'Silver', hex: '#D1D5DB' },
  { name: 'Arctic White', hex: '#F9FAFB' },
  { name: 'University Red', hex: '#E11D48' },
  { name: 'Signal Yellow', hex: '#F59E0B' },
  { name: 'Racing Green', hex: '#14532D' },
  { name: 'Neon Lime', hex: '#A3E635' },
  { name: 'Royal Blue', hex: '#2563EB' },
  { name: 'Violet', hex: '#7C3AED' }
];

export const DEFAULT_CONFIGURATION: SuitConfiguration = {
  main: '#0B0B0B',
  chest: '#1F2937',
  sides: '#374151',
  arms: '#6B7280',
  legs: '#0B0B0B',
  knees: '#1F2937',
  sheins: '#374151',
  logo_leva: 'transparent',
  logo_chest: 'transparent',
  logo_desna: 'transparent',
  logo_back: 'transparent'
};
