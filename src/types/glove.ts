export interface GloveConfiguration {
  main: string;
  paddings: string;
  fixed: string; // non-customizable (always black)
}

export const GLOVE_PARTS: Array<keyof GloveConfiguration> = ['main', 'paddings', 'fixed'];

export const GLOVE_PART_LABELS: Record<keyof GloveConfiguration, string> = {
  main: 'Main',
  paddings: 'Paddings',
  fixed: 'Fixed',
};

export const DEFAULT_GLOVE_CONFIGURATION: GloveConfiguration = {
  main: '#6B7280', // slate-500
  paddings: '#374151', // gray-700
  fixed: '#000000', // enforced as black in scene
};
