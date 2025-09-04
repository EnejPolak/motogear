// import type { MaterialColors } from './config';

export const MATERIAL_NAMES = {
  main: 'Body',
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
} as const;

export const MATERIAL_DESCRIPTIONS = {
  main: 'Main body color of the suit',
  chest: 'Chest panel color',
  sides: 'Side panel color',
  arms: 'Arm section color',
  legs: 'Leg section color',
  knees: 'Knee area color',
  sheins: 'Sheins area color',
  logo_leva: 'Left logo color',
  logo_chest: 'Chest logo color',
  logo_desna: 'Right logo color',
  logo_back: 'Back logo color'
} as const;

export type MaterialKey = keyof typeof MATERIAL_NAMES;
