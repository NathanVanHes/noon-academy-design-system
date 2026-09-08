/**
 * Noon Academy — React Native Design Tokens
 * Single source of truth. Import this in every component.
 */

export const color = {
  void: { 50: '#3A3E47', 100: '#2F333B', 200: '#26282E', 300: '#161A21', 400: '#0D1016' },
  chalk: { 100: '#f5f1e8', 200: '#e8e4dc', 300: '#c9c4b8', 400: '#8e8a80' },
  paper: { 100: '#FFFFFF', 200: '#f5f1e8', 300: '#e8e4dc' },
  fog: { 100: '#EFF1EE' },
  plaster: { 100: '#F1EBDD', 200: '#EFE7D5' },
  ink: { 400: '#26282E', 500: '#161A21', 600: '#0D1016' },
  clay: { 200: '#CB7A50', 300: '#BC5A37', 400: '#A94E2A', 500: '#96431F' },
  teal: { 300: '#5E8C7F', 500: '#4F6157' }, // Future teal — the intelligent layer (bright stop on ink / deep on fog)
  water: { 300: '#7C99B4', 500: '#4A6B8A' }, // Water — selection and progression only
  oak: { 200: '#E2D6BE', 400: '#BC9F7B' }, // timber/material only, never a UI surface
  sky: { 300: '#B7CEDD', 400: '#86A7BE', 500: '#5C7E96' },
  saffron: { 300: '#EFD9A0', 400: '#DDBA62', 500: '#A8873E' },
  rose: { 300: '#E7B9B4', 400: '#C98A87', 500: '#9C5F5E' },
  sage: { 300: '#C6CCAA', 400: '#9FAA7D', 500: '#6F7C52' },
  plum: { 300: '#D3B4C4', 400: '#AC7F97', 500: '#7D5468' },
  noon: { 100: '#c8f4e2', 200: '#9EEACB', 300: '#7FE3BE', 400: '#64D8AE', 500: '#3FAE87', 600: '#2A8A6A', 700: '#194d3b', 800: '#0a3326' },
  gold: { 200: '#f0cf5a', 300: '#e0b83a', 400: '#c9a227', 500: '#8e7019', 600: '#5a4610' },
  iris: { 300: '#C7A8FF', 400: '#B08AF9', 500: '#8E63E0', 600: '#6B3FA8', 700: '#5C3D8F', 800: '#3D2460' },
  blue: { 300: '#96BCFF', 400: '#6BA3FF', 500: '#4881E0' },
  danger: { 300: '#e58a7f', 400: '#c55a4e', 500: '#9a4339' },
  warn: { 300: '#F5C456', 400: '#E8A830', 500: '#C48A20' },
  terra: { 200: '#E8B49A', 300: '#D4956E', 400: '#C07A4E', 500: '#A5633A', 600: '#8A4E2A', 700: '#6B3A1E', 800: '#4A2812' },
} as const;

export const voidTheme = {
  bg: color.void[300],
  bgSunken: color.void[400],
  bgRaised: color.void[200],
  bgOverlay: color.void[100],
  fg: 'rgba(241,235,221,1)',
  fgMuted: 'rgba(241,235,221,0.70)',
  fgSubtle: 'rgba(241,235,221,0.55)',
  fgFaint: 'rgba(241,235,221,0.35)',
  fgDisabled: 'rgba(241,235,221,0.45)', // was 0.25, CSS says 0.45
  fgInverse: color.void[300],
  border: 'rgba(241,235,221,0.10)',
  borderStrong: 'rgba(241,235,221,0.22)',
  divider: 'rgba(241,235,221,0.06)',
  hoverOverlay: 'rgba(241,235,221,0.04)',
  activeOverlay: 'rgba(241,235,221,0.08)',
  selectedOverlay: 'rgba(241,235,221,0.06)',
  inputBg: color.void[400], // fields are sunken boxes — the dark counterpart of light mode's white field
  accent: color.noon[400],
  accentHover: color.noon[300],
  accentActive: color.noon[500],
  accentFg: color.ink[500],
  accentSoft: 'rgba(100,216,174,0.14)',
  accentBorder: 'rgba(100,216,174,0.35)',
  accentGlow: 'rgba(100,216,174,0.15)',
  accentText: color.noon[400],
  signal: color.gold[400],
  signalDim: color.gold[500],
  signalBright: color.gold[300],
  signalSoft: 'rgba(201,162,39,0.12)',
  signalBorder: 'rgba(201,162,39,0.35)',
  signalText: color.gold[300],
  danger: color.danger[400],
  dangerSoft: 'rgba(197,90,78,0.10)',
  dangerBorder: 'rgba(197,90,78,0.40)',
  iris: '#9D8CFF',
  irisBright: '#9D8CFF', // graphic/aura purple — luminous in both modes
  irisGlow: 'rgba(157,140,255,0.10)',
  irisSoft: 'rgba(157,140,255,0.10)',
  irisBorder: 'rgba(157,140,255,0.40)',
  irisLabel: 'rgba(157,140,255,0.60)',
  irisDot: 'rgba(157,140,255,0.50)',
  terra: '#E8663A',
  terraSoft: 'rgba(232,102,58,0.10)',
  terraBorder: 'rgba(232,102,58,0.35)',
  intel: color.teal[300], // Intelligence — Future teal's bright stop carries scores and analysis on ink
  intelSoft: 'rgba(94,140,127,0.14)',
  intelBorder: 'rgba(94,140,127,0.40)',
  water: color.water[300], // Water — the path travelled, current position, a chosen answer
  waterSoft: 'rgba(124,153,180,0.14)',
  waterBorder: 'rgba(124,153,180,0.40)',
} as const;

export const paperTheme = {
  bg: color.paper[200],
  bgSunken: color.paper[300],
  bgRaised: color.paper[100],
  bgOverlay: color.paper[100],
  fg: color.ink[400],
  fgMuted: 'rgba(38,40,46,0.72)',
  fgSubtle: 'rgba(38,40,46,0.55)',
  fgFaint: 'rgba(38,40,46,0.38)',
  fgDisabled: 'rgba(38,40,46,0.45)',
  fgInverse: color.plaster[100],
  border: 'rgba(38,40,46,0.10)',
  borderStrong: 'rgba(38,40,46,0.22)',
  divider: 'rgba(38,40,46,0.06)',
  hoverOverlay: 'rgba(38,40,46,0.04)',
  activeOverlay: 'rgba(38,40,46,0.08)',
  selectedOverlay: 'rgba(38,40,46,0.06)',
  inputBg: '#FFFFFF', // fields are white boxes on the chalk ground — same surface as raised cards
  accent: '#6BAE93',
  accentHover: '#61A188',
  accentActive: '#54927A',
  accentFg: color.ink[400],
  accentSoft: 'rgba(107,174,147,0.14)',
  accentBorder: 'rgba(107,174,147,0.35)',
  accentGlow: 'rgba(107,174,147,0.15)',
  accentText: '#1F6B52',
  signal: color.gold[400],
  signalDim: 'rgba(201,162,39,0.70)',
  signalBright: color.gold[400],
  signalSoft: 'rgba(201,162,39,0.12)',
  signalBorder: 'rgba(201,162,39,0.30)',
  signalText: '#7A6414',
  danger: '#9a4339',
  dangerSoft: 'rgba(154,67,57,0.10)',
  dangerBorder: 'rgba(154,67,57,0.30)',
  iris: '#5A4A7D',
  irisBright: color.iris[500], // graphic/aura purple — luminous in both modes
  irisGlow: 'rgba(142,99,224,0.14)',
  irisSoft: 'rgba(90,74,125,0.10)',
  irisBorder: 'rgba(90,74,125,0.35)',
  irisLabel: 'rgba(90,74,125,0.55)',
  irisDot: 'rgba(90,74,125,0.45)',
  terra: color.clay[300], // Heat · Signal on fog — #BC5A37, split out of terracotta
  terraSoft: 'rgba(188,90,55,0.12)',
  terraBorder: 'rgba(188,90,55,0.35)',
  intel: color.teal[500], // Intelligence — Future teal anchors the intelligent layer
  intelSoft: 'rgba(79,97,87,0.12)',
  intelBorder: 'rgba(79,97,87,0.35)',
  water: color.water[500], // Water — selection and progression only
  waterSoft: 'rgba(74,107,138,0.12)',
  waterBorder: 'rgba(74,107,138,0.35)',
} as const;

export type Theme = { [K in keyof typeof voidTheme]: string };

export const sp = {
  0: 0, 0.5: 2, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 32, 8: 40, 9: 48, 10: 64, 11: 80, 12: 96,
} as const;

export const icon = {
  xs: 6, sm: 10, md: 14, lg: 18, xl: 20, tab: 22, '2xl': 28,
} as const;

export const r = {
  0: 0, 1: 2, 2: 4, 3: 6, 4: 8, pill: 999,
} as const;

export const h = {
  xs: 24, sm: 32, md: 40, lg: 48, xl: 56,
} as const;

export const fs = {
  9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16,
  18: 18, 20: 20, 22: 22, 24: 24, 28: 28, 32: 32, 40: 40, 48: 48,
} as const;

export const fw = {
  300: '300' as const, 400: '400' as const, 500: '500' as const, 600: '600' as const, 700: '700' as const,
};

export const lh = {
  tight: 1.05, snug: 1.2, normal: 1.5, loose: 1.7,
} as const;

export const font = {
  serif: 'CrimsonPro',
  sans: 'Vazirmatn',
  mono: 'JetBrainsMono',
  arabic: 'NotoNaskhArabic',
} as const;

export const dur = {
  1: 120, 2: 200, 3: 320,
} as const;

/**
 * Breakpoints — device classes for cross-device layout.
 * mobile < 768 ≤ tablet < 1024 ≤ desktop (window width, dp).
 */
export const bp = { tablet: 768, desktop: 1024 } as const;

/**
 * Screen layout — container and column rules per device class.
 * Content lives in a centered container capped at containerMax; inside it,
 * desktop uses 12 columns, tablet 8, mobile a single column.
 * Navigation: bottom bar on mobile, left rail on tablet, left sidebar on desktop.
 */
export const layout = {
  containerMax: 1200, // centered content container cap (desktop)
  readingMax: 720, // long-form text measure cap
  cols: { mobile: 1, tablet: 8, desktop: 12 },
  gutter: { mobile: sp[5], tablet: sp[7], desktop: sp[8] }, // screen edge padding
  colGap: sp[4],
} as const;

/**
 * Elevation — platform-aware depth tokens.
 * Void: depth via brighter borders (inset borders in CSS → borderWidth/borderColor in RN).
 * Paper: depth via real drop shadows (iOS shadowX props, Android elevation).
 * Each level returns a style object spread-compatible with View style.
 */

export const voidElevation: Record<number, Record<string, any>> = {
  0: {},
  1: { borderWidth: 1, borderColor: 'rgba(241,235,221,0.08)' },
  2: { borderWidth: 1, borderColor: 'rgba(241,235,221,0.12)',
       shadowColor: 'rgba(241,235,221,1)', shadowOffset: { width: 0, height: 0 }, shadowRadius: 1, shadowOpacity: 0.06,
       elevation: 2 },
  3: { borderWidth: 1, borderColor: 'rgba(241,235,221,0.16)',
       shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowRadius: 16, shadowOpacity: 0.5,
       elevation: 6 },
  4: { borderWidth: 1, borderColor: 'rgba(241,235,221,0.22)',
       shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowRadius: 32, shadowOpacity: 0.6,
       elevation: 12 },
};

export const paperElevation: Record<number, Record<string, any>> = {
  0: {},
  1: { shadowColor: 'rgba(38,40,46,1)', shadowOffset: { width: 0, height: 1 }, shadowRadius: 2, shadowOpacity: 0.06,
       borderWidth: 1, borderColor: 'rgba(38,40,46,0.08)',
       elevation: 1 },
  2: { shadowColor: 'rgba(38,40,46,1)', shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, shadowOpacity: 0.08,
       borderWidth: 1, borderColor: 'rgba(38,40,46,0.06)',
       elevation: 3 },
  3: { shadowColor: 'rgba(38,40,46,1)', shadowOffset: { width: 0, height: 4 }, shadowRadius: 16, shadowOpacity: 0.10,
       borderWidth: 1, borderColor: 'rgba(38,40,46,0.05)',
       elevation: 8 },
  4: { shadowColor: 'rgba(38,40,46,1)', shadowOffset: { width: 0, height: 8 }, shadowRadius: 32, shadowOpacity: 0.14,
       borderWidth: 1, borderColor: 'rgba(38,40,46,0.04)',
       elevation: 16 },
};
