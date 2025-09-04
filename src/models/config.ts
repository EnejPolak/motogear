export interface MaterialColors {
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

export const DEFAULT_COLORS: MaterialColors = {
  main: '#1a1a1a',
  chest: '#2a2a2a',
  sides: '#3a3a3a',
  arms: '#4a4a4a',
  legs: '#5a5a5a',
  knees: '#6a6a6a',
  sheins: '#7a7a7a',
  logo_leva: '#ff0000',
  logo_chest: '#ff0000',
  logo_desna: '#ff0000',
  logo_back: '#ff0000'
};

export const PRESET_COLORS = {
  classic: {
    main: '#1a1a1a',
    chest: '#2a2a2a',
    sides: '#3a3a3a',
    arms: '#4a4a4a',
    legs: '#5a5a5a',
    knees: '#6a6a6a',
    sheins: '#7a7a7a',
    logo_leva: '#ff0000',
    logo_chest: '#ff0000',
    logo_desna: '#ff0000',
    logo_back: '#ff0000'
  },
  sport: {
    main: '#ff6b35',
    chest: '#f7931e',
    sides: '#ff6b35',
    arms: '#f7931e',
    legs: '#ff6b35',
    knees: '#f7931e',
    sheins: '#ff6b35',
    logo_leva: '#ffffff',
    logo_chest: '#ffffff',
    logo_desna: '#ffffff',
    logo_back: '#ffffff'
  },
  stealth: {
    main: '#000000',
    chest: '#1a1a1a',
    sides: '#000000',
    arms: '#1a1a1a',
    legs: '#000000',
    knees: '#1a1a1a',
    sheins: '#000000',
    logo_leva: '#666666',
    logo_chest: '#666666',
    logo_desna: '#666666',
    logo_back: '#666666'
  }
};

export class ConfigManager {
  private static STORAGE_KEY = 'moto-config';

  static saveConfig(config: MaterialColors): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(config));
    }
  }

  static loadConfig(): MaterialColors {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          console.error('Error parsing saved configuration:', error);
        }
      }
    }
    return { ...DEFAULT_COLORS };
  }

  static resetConfig(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  static exportConfig(config: MaterialColors): string {
    return JSON.stringify(config, null, 2);
  }

  static importConfig(configString: string): MaterialColors | null {
    try {
      const parsed = JSON.parse(configString);
      // Validate the structure
      if (this.isValidConfig(parsed)) {
        return parsed;
      }
    } catch (error) {
      console.error('Error parsing configuration:', error);
    }
    return null;
  }

  private static isValidConfig(config: any): config is MaterialColors {
    return (
      typeof config === 'object' &&
      typeof config.main === 'string' &&
      typeof config.chest === 'string' &&
      typeof config.sides === 'string' &&
      typeof config.arms === 'string' &&
      typeof config.legs === 'string' &&
      typeof config.knees === 'string' &&
      typeof config.sheins === 'string' &&
      typeof config.logo_leva === 'string' &&
      typeof config.logo_chest === 'string' &&
      typeof config.logo_desna === 'string' &&
      typeof config.logo_back === 'string'
    );
  }
}
