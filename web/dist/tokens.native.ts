/**
 * Noon Academy — Design Tokens for React Native
 * Generated from tokens/design-tokens.json
 * Usage: import { tokens, voidTheme, paperTheme } from './tokens.native';
 */

export const color = {
  void: {
    '50': '#232c43',
    '100': '#1a2236',
    '200': '#10172a',
    '300': '#0a0f1a',
    '400': '#060913',
  },
  chalk: {
    '100': '#f5f1e8',
    '200': '#e8e4dc',
    '300': '#c9c4b8',
    '400': '#8e8a80',
  },
  paper: {
    '100': '#fbf8ef',
    '200': '#f2ece0',
    '300': '#e8e1d2',
  },
  noon: {
    '100': '#c8f4e2',
    '200': '#9EEACB',
    '300': '#7FE3BE',
    '400': '#64D8AE',
    '500': '#3FAE87',
    '600': '#2A8A6A',
    '700': '#194d3b',
    '800': '#0a3326',
  },
  gold: {
    '200': '#f0cf5a',
    '300': '#e0b83a',
    '400': '#c9a227',
    '500': '#8e7019',
    '600': '#5a4610',
  },
  iris: {
    '300': '#C7A8FF',
    '400': '#B08AF9',
    '500': '#8E63E0',
  },
  blue: {
    '300': '#96BCFF',
    '400': '#6BA3FF',
    '500': '#4881E0',
  },
  danger: {
    '300': '#e58a7f',
    '400': '#c55a4e',
    '500': '#9a4339',
  },
  warn: {
    '400': '#d9a74a',
  },
  ok: {
    '300': '#a9bc91',
    '400': '#7a8e64',
    '500': '#566648',
  },
} as const;

export const voidTheme = {
  bg: '#0a0f1a',
  bgSunken: '#060913',
  bgRaised: '#10172a',
  bgOverlay: '#1a2236',
  bgPopover: '#1a2236',
  scrim: 'rgba(6, 9, 19, 0.72)',
  fg: 'rgba(232, 228, 220, 1.00)',
  fgMuted: 'rgba(232, 228, 220, 0.70)',
  fgSubtle: 'rgba(232, 228, 220, 0.55)',
  fgFaint: 'rgba(232, 228, 220, 0.35)',
  fgDisabled: 'rgba(232, 228, 220, 0.25)',
  fgInverse: '#0a0f1a',
  border: 'rgba(232, 228, 220, 0.10)',
  borderStrong: 'rgba(232, 228, 220, 0.22)',
  borderFocus: '#6BA3FF',
  divider: 'rgba(232, 228, 220, 0.06)',
  accent: '#64D8AE',
  accentHover: '#7FE3BE',
  accentActive: '#3FAE87',
  accentFg: '#0a3326',
  accentSoft: 'rgba(100, 216, 174, 0.14)',
  accentSoftHv: 'rgba(100, 216, 174, 0.22)',
  accentBorder: 'rgba(100, 216, 174, 0.35)',
  signal: '#c9a227',
  signalBright: '#e0b83a',
  signalFg: '#0a0f1a',
  signalSoft: 'rgba(201, 162, 39, 0.12)',
  signalBorder: 'rgba(201, 162, 39, 0.35)',
  danger: '#c55a4e',
  dangerFg: '#f5f1e8',
  dangerSoft: 'rgba(197, 90, 78, 0.10)',
  dangerBorder: 'rgba(197, 90, 78, 0.40)',
  warn: '#d9a74a',
  warnSoft: 'rgba(217, 167, 74, 0.12)',
  ok: '#7a8e64',
  okSoft: 'rgba(122, 142, 100, 0.14)',
  okBorder: 'rgba(122, 142, 100, 0.40)',
} as const;

export const paperTheme = {
  bg: '#f2ece0',
  bgSunken: '#e8e1d2',
  bgRaised: '#fbf8ef',
  bgOverlay: '#fbf8ef',
  bgPopover: '#fbf8ef',
  fg: '#0a0f1a',
  fgMuted: 'rgba(10, 15, 26, 0.72)',
  fgSubtle: 'rgba(10, 15, 26, 0.55)',
  fgFaint: 'rgba(10, 15, 26, 0.38)',
  fgDisabled: 'rgba(10, 15, 26, 0.25)',
  fgInverse: '#f5f1e8',
  border: 'rgba(10, 15, 26, 0.10)',
  borderStrong: 'rgba(10, 15, 26, 0.22)',
  divider: 'rgba(10, 15, 26, 0.06)',
} as const;

export const voidInteraction = {
  hoverOverlay: 'rgba(232,228,220,0.04)',
  activeOverlay: 'rgba(232,228,220,0.08)',
  selectedOverlay: 'rgba(232,228,220,0.06)',
  subtleOverlay: 'rgba(232,228,220,0.02)',
  faintOverlay: 'rgba(232,228,220,0.03)',
  accentDisabledBg: 'rgba(100,216,174,0.18)',
  accentDisabledFg: 'rgba(10,51,38,0.5)',
  accentGlow: 'rgba(100,216,174,0.15)',
  accentTint: 'rgba(100,216,174,0.06)',
  dangerHover: '#b84e43',
  dangerGlow: 'rgba(197,90,78,0.18)',
  signalGlow: 'rgba(224,184,58,0.2)',
  infoBorder: 'rgba(107,163,255,0.3)',
  warnBorder: 'rgba(217,167,74,0.35)',
} as const;

export const paperInteraction = {
  hoverOverlay: 'rgba(10,15,26,0.04)',
  activeOverlay: 'rgba(10,15,26,0.08)',
  selectedOverlay: 'rgba(10,15,26,0.06)',
  subtleOverlay: 'rgba(10,15,26,0.02)',
  faintOverlay: 'rgba(10,15,26,0.03)',
  accentDisabledBg: 'rgba(42,138,106,0.15)',
  accentDisabledFg: 'rgba(10,51,38,0.5)',
  accentGlow: 'rgba(42,138,106,0.12)',
  accentTint: 'rgba(42,138,106,0.06)',
  dangerHover: '#b84e43',
  dangerGlow: 'rgba(197,90,78,0.15)',
  signalGlow: 'rgba(201,162,39,0.15)',
  infoBorder: 'rgba(107,163,255,0.25)',
  warnBorder: 'rgba(217,167,74,0.30)',
} as const;

export const typography = {
  fontFamily: {
    $description: 'undefined',
    serif: 'CrimsonPro',
    sans: 'WorkSans',
    mono: 'JetBrainsMono',
    arabic: 'NotoNaskhArabic',
  },
  fontSize: {
    '9': 9,
    '10': 10,
    '11': 11,
    '12': 12,
    '13': 13,
    '14': 14,
    '15': 15,
    '16': 16,
    '18': 18,
    '20': 20,
    '22': 22,
    '24': 24,
    '28': 28,
    '32': 32,
    '40': 40,
    '48': 48,
    '64': 64,
    '80': 80,
  },
  fontWeight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    tight: 1.05,
    snug: 1.2,
    normal: 1.5,
    loose: 1.7,
  },
  letterSpacing: {
    tight: -0.24,
    caps: 2.24,
  },
} as const;

export const spacing = {
  '0': 0,
  '1': 4,
  '2': 8,
  '3': 12,
  '4': 16,
  '5': 20,
  '6': 24,
  '7': 32,
  '8': 40,
  '9': 48,
  '10': 64,
  '11': 80,
  '12': 96,
  '0h': 2,
} as const;

export const radius = {
  '0': 0,
  '1': 2,
  '2': 4,
  '3': 6,
  '4': 8,
  'pill': 999,
} as const;

export const size = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
} as const;

export const elevation = {
  z0: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  z1: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  z2: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  z3: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 28,
    elevation: 10,
  },
  z4: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.55,
    shadowRadius: 44,
    elevation: 16,
  },
} as const;

export const motion = {
  duration: {
    fast: 120,
    normal: 200,
    slow: 320,
  },
} as const;

export const tokens = { color, voidTheme, paperTheme, voidInteraction, paperInteraction, typography, spacing, radius, size, elevation, motion } as const;
export type NoonTokens = typeof tokens;