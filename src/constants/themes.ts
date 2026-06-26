export type ThemeMode = 'dark' | 'light' | 'system';

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  darkColors: ThemeColors;
  lightColors: ThemeColors;
}

export interface ThemeColors {
  // Backgrounds
  bg: string;
  surface1: string;
  surface2: string;
  surface3: string;
  
  // Lines/Borders
  line: string;
  lineHi: string;
  
  // Text
  txt1: string;
  txt2: string;
  txt3: string;
  
  // Accents
  accent: string;
  accentDim: string;
  accentBdr: string;
  
  // Secondary accent
  accent2?: string;
  accent2Dim?: string;
  accent2Bdr?: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Classic theme with amber accents',
    darkColors: {
      bg: '#0D0D0F',
      surface1: '#131316',
      surface2: '#1A1A1F',
      surface3: '#222228',
      line: 'rgba(255,255,255,0.07)',
      lineHi: 'rgba(255,255,255,0.13)',
      txt1: '#EEEDF0',
      txt2: '#8E8C9A',
      txt3: '#5A5869',
      accent: '#F59E0B',
      accentDim: 'rgba(245,158,11,0.10)',
      accentBdr: 'rgba(245,158,11,0.22)',
      accent2: '#8B5CF6',
      accent2Dim: 'rgba(139,92,246,0.10)',
      accent2Bdr: 'rgba(139,92,246,0.22)',
    },
    lightColors: {
      bg: '#FFFFFF',
      surface1: '#F8FAFC',
      surface2: '#F1F5F9',
      surface3: '#E2E8F0',
      line: 'rgba(148, 163, 184, 0.15)',
      lineHi: 'rgba(148, 163, 184, 0.25)',
      txt1: '#0F172A',
      txt2: '#475569',
      txt3: '#64748B',
      accent: '#F59E0B',
      accentDim: 'rgba(245,158,11,0.10)',
      accentBdr: 'rgba(245,158,11,0.25)',
      accent2: '#8B5CF6',
      accent2Dim: 'rgba(139,92,246,0.10)',
      accent2Bdr: 'rgba(139,92,246,0.25)',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Blue theme with cyan accents',
    darkColors: {
      bg: '#0A1628',
      surface1: '#0F1F35',
      surface2: '#142842',
      surface3: '#1A3250',
      line: 'rgba(148, 163, 184, 0.08)',
      lineHi: 'rgba(148, 163, 184, 0.15)',
      txt1: '#F1F5F9',
      txt2: '#94A3B8',
      txt3: '#64748B',
      accent: '#06B6D4',
      accentDim: 'rgba(6,182,212,0.10)',
      accentBdr: 'rgba(6,182,212,0.25)',
      accent2: '#3B82F6',
      accent2Dim: 'rgba(59,130,246,0.10)',
      accent2Bdr: 'rgba(59,130,246,0.25)',
    },
    lightColors: {
      bg: '#F0F9FF',
      surface1: '#E0F2FE',
      surface2: '#BAE6FD',
      surface3: '#7DD3FC',
      line: 'rgba(14, 165, 233, 0.15)',
      lineHi: 'rgba(14, 165, 233, 0.25)',
      txt1: '#0C4A6E',
      txt2: '#0369A1',
      txt3: '#0284C7',
      accent: '#06B6D4',
      accentDim: 'rgba(6,182,212,0.10)',
      accentBdr: 'rgba(6,182,212,0.25)',
      accent2: '#3B82F6',
      accent2Dim: 'rgba(59,130,246,0.10)',
      accent2Bdr: 'rgba(59,130,246,0.25)',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Natural green theme',
    darkColors: {
      bg: '#0A1F0A',
      surface1: '#0F2A0F',
      surface2: '#143514',
      surface3: '#1A401A',
      line: 'rgba(134, 239, 172, 0.08)',
      lineHi: 'rgba(134, 239, 172, 0.15)',
      txt1: '#ECFDF5',
      txt2: '#86EFAC',
      txt3: '#4ADE80',
      accent: '#10B981',
      accentDim: 'rgba(16,185,129,0.10)',
      accentBdr: 'rgba(16,185,129,0.25)',
      accent2: '#F59E0B',
      accent2Dim: 'rgba(245,158,11,0.10)',
      accent2Bdr: 'rgba(245,158,11,0.22)',
    },
    lightColors: {
      bg: '#F0FDF4',
      surface1: '#DCFCE7',
      surface2: '#BBF7D0',
      surface3: '#86EFAC',
      line: 'rgba(34, 197, 94, 0.15)',
      lineHi: 'rgba(34, 197, 94, 0.25)',
      txt1: '#14532D',
      txt2: '#166534',
      txt3: '#15803D',
      accent: '#10B981',
      accentDim: 'rgba(16,185,129,0.10)',
      accentBdr: 'rgba(16,185,129,0.25)',
      accent2: '#F59E0B',
      accent2Dim: 'rgba(245,158,11,0.10)',
      accent2Bdr: 'rgba(245,158,11,0.22)',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm theme with orange accents',
    darkColors: {
      bg: '#1A0A0A',
      surface1: '#251010',
      surface2: '#2F1515',
      surface3: '#3A1A1A',
      line: 'rgba(251, 146, 60, 0.08)',
      lineHi: 'rgba(251, 146, 60, 0.15)',
      txt1: '#FFF7ED',
      txt2: '#FDBA74',
      txt3: '#FB923C',
      accent: '#F97316',
      accentDim: 'rgba(249,115,22,0.10)',
      accentBdr: 'rgba(249,115,22,0.25)',
      accent2: '#EC4899',
      accent2Dim: 'rgba(236,72,153,0.10)',
      accent2Bdr: 'rgba(236,72,153,0.25)',
    },
    lightColors: {
      bg: '#FFF7ED',
      surface1: '#FFEDD5',
      surface2: '#FED7AA',
      surface3: '#FDBA74',
      line: 'rgba(249, 115, 22, 0.15)',
      lineHi: 'rgba(249, 115, 22, 0.25)',
      txt1: '#7C2D12',
      txt2: '#9A3412',
      txt3: '#C2410C',
      accent: '#F97316',
      accentDim: 'rgba(249,115,22,0.10)',
      accentBdr: 'rgba(249,115,22,0.25)',
      accent2: '#EC4899',
      accent2Dim: 'rgba(236,72,153,0.10)',
      accent2Bdr: 'rgba(236,72,153,0.25)',
    },
  },
  {
    id: 'lavender',
    name: 'Lavender',
    description: 'Soft purple theme',
    darkColors: {
      bg: '#120A1F',
      surface1: '#1A1028',
      surface2: '#241532',
      surface3: '#2E1A3C',
      line: 'rgba(192, 132, 252, 0.08)',
      lineHi: 'rgba(192, 132, 252, 0.15)',
      txt1: '#FAF5FF',
      txt2: '#D8B4FE',
      txt3: '#C084FC',
      accent: '#A855F7',
      accentDim: 'rgba(168,85,247,0.10)',
      accentBdr: 'rgba(168,85,247,0.25)',
      accent2: '#EC4899',
      accent2Dim: 'rgba(236,72,153,0.10)',
      accent2Bdr: 'rgba(236,72,153,0.25)',
    },
    lightColors: {
      bg: '#FAF5FF',
      surface1: '#F3E8FF',
      surface2: '#E9D5FF',
      surface3: '#D8B4FE',
      line: 'rgba(168, 85, 247, 0.15)',
      lineHi: 'rgba(168, 85, 247, 0.25)',
      txt1: '#581C87',
      txt2: '#6B21A8',
      txt3: '#7E22CE',
      accent: '#A855F7',
      accentDim: 'rgba(168,85,247,0.10)',
      accentBdr: 'rgba(168,85,247,0.25)',
      accent2: '#EC4899',
      accent2Dim: 'rgba(236,72,153,0.10)',
      accent2Bdr: 'rgba(236,72,153,0.25)',
    },
  },
];

export const DEFAULT_THEME = 'midnight';
export const DEFAULT_MODE: ThemeMode = 'system';
