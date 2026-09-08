var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// rn/ThemeContext.tsx
import { createContext, useContext, useState } from "react";

// rn/tokens.ts
var color = {
  void: { 50: "#3A3E47", 100: "#2F333B", 200: "#26282E", 300: "#161A21", 400: "#0D1016" },
  chalk: { 100: "#f5f1e8", 200: "#e8e4dc", 300: "#c9c4b8", 400: "#8e8a80" },
  paper: { 100: "#FFFFFF", 200: "#f5f1e8", 300: "#e8e4dc" },
  fog: { 100: "#EFF1EE" },
  plaster: { 100: "#F1EBDD", 200: "#EFE7D5" },
  ink: { 400: "#26282E", 500: "#161A21", 600: "#0D1016" },
  clay: { 200: "#CB7A50", 300: "#BC5A37", 400: "#A94E2A", 500: "#96431F" },
  teal: { 300: "#5E8C7F", 500: "#4F6157" },
  // Future teal — the intelligent layer (bright stop on ink / deep on fog)
  water: { 300: "#7C99B4", 500: "#4A6B8A" },
  // Water — selection and progression only
  oak: { 200: "#E2D6BE", 400: "#BC9F7B" },
  // timber/material only, never a UI surface
  sky: { 300: "#B7CEDD", 400: "#86A7BE", 500: "#5C7E96" },
  saffron: { 300: "#EFD9A0", 400: "#DDBA62", 500: "#A8873E" },
  rose: { 300: "#E7B9B4", 400: "#C98A87", 500: "#9C5F5E" },
  sage: { 300: "#C6CCAA", 400: "#9FAA7D", 500: "#6F7C52" },
  plum: { 300: "#D3B4C4", 400: "#AC7F97", 500: "#7D5468" },
  noon: { 100: "#c8f4e2", 200: "#9EEACB", 300: "#7FE3BE", 400: "#64D8AE", 500: "#3FAE87", 600: "#2A8A6A", 700: "#194d3b", 800: "#0a3326" },
  gold: { 200: "#f0cf5a", 300: "#e0b83a", 400: "#c9a227", 500: "#8e7019", 600: "#5a4610" },
  iris: { 300: "#C7A8FF", 400: "#B08AF9", 500: "#8E63E0", 600: "#6B3FA8", 700: "#5C3D8F", 800: "#3D2460" },
  blue: { 300: "#96BCFF", 400: "#6BA3FF", 500: "#4881E0" },
  danger: { 300: "#e58a7f", 400: "#c55a4e", 500: "#9a4339" },
  warn: { 300: "#F5C456", 400: "#E8A830", 500: "#C48A20" },
  terra: { 200: "#E8B49A", 300: "#D4956E", 400: "#C07A4E", 500: "#A5633A", 600: "#8A4E2A", 700: "#6B3A1E", 800: "#4A2812" }
};
var voidTheme = {
  bg: color.void[300],
  bgSunken: color.void[400],
  bgRaised: color.void[200],
  bgOverlay: color.void[100],
  fg: "rgba(241,235,221,1)",
  fgMuted: "rgba(241,235,221,0.70)",
  fgSubtle: "rgba(241,235,221,0.55)",
  fgFaint: "rgba(241,235,221,0.35)",
  fgDisabled: "rgba(241,235,221,0.45)",
  // was 0.25, CSS says 0.45
  fgInverse: color.void[300],
  border: "rgba(241,235,221,0.10)",
  borderStrong: "rgba(241,235,221,0.22)",
  divider: "rgba(241,235,221,0.06)",
  hoverOverlay: "rgba(241,235,221,0.04)",
  activeOverlay: "rgba(241,235,221,0.08)",
  selectedOverlay: "rgba(241,235,221,0.06)",
  inputBg: color.void[400],
  // fields are sunken boxes — the dark counterpart of light mode's white field
  accent: color.noon[400],
  accentHover: color.noon[300],
  accentActive: color.noon[500],
  accentFg: color.ink[500],
  accentSoft: "rgba(100,216,174,0.14)",
  accentBorder: "rgba(100,216,174,0.35)",
  accentGlow: "rgba(100,216,174,0.15)",
  accentText: color.noon[400],
  signal: color.gold[400],
  signalDim: color.gold[500],
  signalBright: color.gold[300],
  signalSoft: "rgba(201,162,39,0.12)",
  signalBorder: "rgba(201,162,39,0.35)",
  signalText: color.gold[300],
  danger: color.danger[400],
  dangerSoft: "rgba(197,90,78,0.10)",
  dangerBorder: "rgba(197,90,78,0.40)",
  iris: "#9D8CFF",
  irisBright: "#9D8CFF",
  // graphic/aura purple — luminous in both modes
  irisGlow: "rgba(157,140,255,0.10)",
  irisSoft: "rgba(157,140,255,0.10)",
  irisBorder: "rgba(157,140,255,0.40)",
  irisLabel: "rgba(157,140,255,0.60)",
  irisDot: "rgba(157,140,255,0.50)",
  terra: "#E8663A",
  terraSoft: "rgba(232,102,58,0.10)",
  terraBorder: "rgba(232,102,58,0.35)",
  intel: color.teal[300],
  // Intelligence — Future teal's bright stop carries scores and analysis on ink
  intelSoft: "rgba(94,140,127,0.14)",
  intelBorder: "rgba(94,140,127,0.40)",
  water: color.water[300],
  // Water — the path travelled, current position, a chosen answer
  waterSoft: "rgba(124,153,180,0.14)",
  waterBorder: "rgba(124,153,180,0.40)"
};
var paperTheme = {
  bg: color.paper[200],
  bgSunken: color.paper[300],
  bgRaised: color.paper[100],
  bgOverlay: color.paper[100],
  fg: color.ink[400],
  fgMuted: "rgba(38,40,46,0.72)",
  fgSubtle: "rgba(38,40,46,0.55)",
  fgFaint: "rgba(38,40,46,0.38)",
  fgDisabled: "rgba(38,40,46,0.45)",
  fgInverse: color.plaster[100],
  border: "rgba(38,40,46,0.10)",
  borderStrong: "rgba(38,40,46,0.22)",
  divider: "rgba(38,40,46,0.06)",
  hoverOverlay: "rgba(38,40,46,0.04)",
  activeOverlay: "rgba(38,40,46,0.08)",
  selectedOverlay: "rgba(38,40,46,0.06)",
  inputBg: "#FFFFFF",
  // fields are white boxes on the chalk ground — same surface as raised cards
  accent: "#6BAE93",
  accentHover: "#61A188",
  accentActive: "#54927A",
  accentFg: color.ink[400],
  accentSoft: "rgba(107,174,147,0.14)",
  accentBorder: "rgba(107,174,147,0.35)",
  accentGlow: "rgba(107,174,147,0.15)",
  accentText: "#1F6B52",
  signal: color.gold[400],
  signalDim: "rgba(201,162,39,0.70)",
  signalBright: color.gold[400],
  signalSoft: "rgba(201,162,39,0.12)",
  signalBorder: "rgba(201,162,39,0.30)",
  signalText: "#7A6414",
  danger: "#9a4339",
  dangerSoft: "rgba(154,67,57,0.10)",
  dangerBorder: "rgba(154,67,57,0.30)",
  iris: "#5A4A7D",
  irisBright: color.iris[500],
  // graphic/aura purple — luminous in both modes
  irisGlow: "rgba(142,99,224,0.14)",
  irisSoft: "rgba(90,74,125,0.10)",
  irisBorder: "rgba(90,74,125,0.35)",
  irisLabel: "rgba(90,74,125,0.55)",
  irisDot: "rgba(90,74,125,0.45)",
  terra: color.clay[300],
  // Heat · Signal on fog — #BC5A37, split out of terracotta
  terraSoft: "rgba(188,90,55,0.12)",
  terraBorder: "rgba(188,90,55,0.35)",
  intel: color.teal[500],
  // Intelligence — Future teal anchors the intelligent layer
  intelSoft: "rgba(79,97,87,0.12)",
  intelBorder: "rgba(79,97,87,0.35)",
  water: color.water[500],
  // Water — selection and progression only
  waterSoft: "rgba(74,107,138,0.12)",
  waterBorder: "rgba(74,107,138,0.35)"
};
var sp = {
  0: 0,
  0.5: 2,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 32,
  8: 40,
  9: 48,
  10: 64,
  11: 80,
  12: 96
};
var icon = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 20,
  tab: 22,
  "2xl": 28
};
var r = {
  0: 0,
  1: 2,
  2: 4,
  3: 6,
  4: 8,
  pill: 999
};
var h = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56
};
var fs = {
  9: 9,
  10: 10,
  11: 11,
  12: 12,
  13: 13,
  14: 14,
  15: 15,
  16: 16,
  18: 18,
  20: 20,
  22: 22,
  24: 24,
  28: 28,
  32: 32,
  40: 40,
  48: 48
};
var fw = {
  300: "300",
  400: "400",
  500: "500",
  600: "600",
  700: "700"
};
var lh = {
  tight: 1.05,
  snug: 1.2,
  normal: 1.5,
  loose: 1.7
};
var font = {
  serif: "CrimsonPro",
  sans: "Vazirmatn",
  mono: "JetBrainsMono",
  arabic: "NotoNaskhArabic"
};
var dur = {
  1: 120,
  2: 200,
  3: 320
};
var bp = { tablet: 768, desktop: 1024 };
var layout = {
  containerMax: 1200,
  // centered content container cap (desktop)
  readingMax: 720,
  // long-form text measure cap
  cols: { mobile: 1, tablet: 8, desktop: 12 },
  gutter: { mobile: sp[5], tablet: sp[7], desktop: sp[8] },
  // screen edge padding
  colGap: sp[4]
};
var voidElevation = {
  0: {},
  1: { borderWidth: 1, borderColor: "rgba(241,235,221,0.08)" },
  2: {
    borderWidth: 1,
    borderColor: "rgba(241,235,221,0.12)",
    shadowColor: "rgba(241,235,221,1)",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1,
    shadowOpacity: 0.06,
    elevation: 2
  },
  3: {
    borderWidth: 1,
    borderColor: "rgba(241,235,221,0.16)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    shadowOpacity: 0.5,
    elevation: 6
  },
  4: {
    borderWidth: 1,
    borderColor: "rgba(241,235,221,0.22)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 32,
    shadowOpacity: 0.6,
    elevation: 12
  }
};
var paperElevation = {
  0: {},
  1: {
    shadowColor: "rgba(38,40,46,1)",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.06,
    borderWidth: 1,
    borderColor: "rgba(38,40,46,0.08)",
    elevation: 1
  },
  2: {
    shadowColor: "rgba(38,40,46,1)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.08,
    borderWidth: 1,
    borderColor: "rgba(38,40,46,0.06)",
    elevation: 3
  },
  3: {
    shadowColor: "rgba(38,40,46,1)",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    shadowOpacity: 0.1,
    borderWidth: 1,
    borderColor: "rgba(38,40,46,0.05)",
    elevation: 8
  },
  4: {
    shadowColor: "rgba(38,40,46,1)",
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 32,
    shadowOpacity: 0.14,
    borderWidth: 1,
    borderColor: "rgba(38,40,46,0.04)",
    elevation: 16
  }
};

// rn/ThemeContext.tsx
import { jsx } from "react/jsx-runtime";
var ThemeContext = createContext({
  mode: "void",
  theme: voidTheme,
  elevation: voidElevation,
  setMode: () => {
  }
});
function ThemeProvider({ children, initial = "void" }) {
  const [mode, setMode] = useState(initial);
  const theme = mode === "void" ? voidTheme : paperTheme;
  const elevation = mode === "void" ? voidElevation : paperElevation;
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { mode, theme, elevation, setMode }, children });
}
function useTheme() {
  return useContext(ThemeContext);
}

// rn/Icon.tsx
import Svg, { Path, Circle, Line, Rect } from "react-native-svg";
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
var paths = {
  "chevron-left": (s) => /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.6} ${s * 0.2}L${s * 0.3} ${s * 0.5}L${s * 0.6} ${s * 0.8}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }),
  "chevron-right": (s) => /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.4} ${s * 0.2}L${s * 0.7} ${s * 0.5}L${s * 0.4} ${s * 0.8}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }),
  "chevron-down": (s) => /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.2} ${s * 0.4}L${s * 0.5} ${s * 0.7}L${s * 0.8} ${s * 0.4}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }),
  "chevron-up": (s) => /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.2} ${s * 0.6}L${s * 0.5} ${s * 0.3}L${s * 0.8} ${s * 0.6}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }),
  "arrow-left": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.55} ${s * 0.2}L${s * 0.25} ${s * 0.5}L${s * 0.55} ${s * 0.8}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.25, y1: s * 0.5, x2: s * 0.8, y2: s * 0.5, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "arrow-right": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.45} ${s * 0.2}L${s * 0.75} ${s * 0.5}L${s * 0.45} ${s * 0.8}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.2, y1: s * 0.5, x2: s * 0.75, y2: s * 0.5, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "close": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.25, y1: s * 0.25, x2: s * 0.75, y2: s * 0.75, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.75, y1: s * 0.25, x2: s * 0.25, y2: s * 0.75, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "plus": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.5, y1: s * 0.2, x2: s * 0.5, y2: s * 0.8, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.2, y1: s * 0.5, x2: s * 0.8, y2: s * 0.5, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "minus": (s) => /* @__PURE__ */ jsx2(Line, { x1: s * 0.2, y1: s * 0.5, x2: s * 0.8, y2: s * 0.5, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
  "check": (s) => /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.2} ${s * 0.5}L${s * 0.4} ${s * 0.7}L${s * 0.8} ${s * 0.25}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }),
  "search": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Circle, { cx: s * 0.42, cy: s * 0.42, r: s * 0.22, fill: "none", stroke: "currentColor", strokeWidth: 1.5 }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.58, y1: s * 0.58, x2: s * 0.78, y2: s * 0.78, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "menu": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.2, y1: s * 0.3, x2: s * 0.8, y2: s * 0.3, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.2, y1: s * 0.5, x2: s * 0.8, y2: s * 0.5, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.2, y1: s * 0.7, x2: s * 0.6, y2: s * 0.7, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "more": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Circle, { cx: s * 0.25, cy: s * 0.5, r: s * 0.06, fill: "currentColor" }),
    /* @__PURE__ */ jsx2(Circle, { cx: s * 0.5, cy: s * 0.5, r: s * 0.06, fill: "currentColor" }),
    /* @__PURE__ */ jsx2(Circle, { cx: s * 0.75, cy: s * 0.5, r: s * 0.06, fill: "currentColor" })
  ] }),
  "more-vertical": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Circle, { cx: s * 0.5, cy: s * 0.25, r: s * 0.06, fill: "currentColor" }),
    /* @__PURE__ */ jsx2(Circle, { cx: s * 0.5, cy: s * 0.5, r: s * 0.06, fill: "currentColor" }),
    /* @__PURE__ */ jsx2(Circle, { cx: s * 0.5, cy: s * 0.75, r: s * 0.06, fill: "currentColor" })
  ] }),
  "play": (s) => /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.3} ${s * 0.2}L${s * 0.8} ${s * 0.5}L${s * 0.3} ${s * 0.8}Z`, fill: "currentColor" }),
  "pause": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Rect, { x: s * 0.25, y: s * 0.2, width: s * 0.15, height: s * 0.6, rx: s * 0.04, fill: "currentColor" }),
    /* @__PURE__ */ jsx2(Rect, { x: s * 0.6, y: s * 0.2, width: s * 0.15, height: s * 0.6, rx: s * 0.04, fill: "currentColor" })
  ] }),
  "expand": (s) => /* @__PURE__ */ jsx2(Fragment, { children: /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.2} ${s * 0.4}L${s * 0.5} ${s * 0.65}L${s * 0.8} ${s * 0.4}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }) }),
  "collapse": (s) => /* @__PURE__ */ jsx2(Fragment, { children: /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.2} ${s * 0.6}L${s * 0.5} ${s * 0.35}L${s * 0.8} ${s * 0.6}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }) }),
  "document": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.25} ${s * 0.15}L${s * 0.55} ${s * 0.15}L${s * 0.75} ${s * 0.35}L${s * 0.75} ${s * 0.85}L${s * 0.25} ${s * 0.85}Z`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.55} ${s * 0.15}L${s * 0.55} ${s * 0.35}L${s * 0.75} ${s * 0.35}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" })
  ] }),
  "link": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.45} ${s * 0.55}L${s * 0.55} ${s * 0.45}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.35} ${s * 0.5}L${s * 0.25} ${s * 0.6}A${s * 0.14} ${s * 0.14} 0 0 0 ${s * 0.4} ${s * 0.75}L${s * 0.5} ${s * 0.65}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.65} ${s * 0.5}L${s * 0.75} ${s * 0.4}A${s * 0.14} ${s * 0.14} 0 0 0 ${s * 0.6} ${s * 0.25}L${s * 0.5} ${s * 0.35}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "info": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Circle, { cx: s * 0.5, cy: s * 0.5, r: s * 0.38, fill: "none", stroke: "currentColor", strokeWidth: 1.5 }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.5, y1: s * 0.42, x2: s * 0.5, y2: s * 0.68, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ jsx2(Circle, { cx: s * 0.5, cy: s * 0.32, r: s * 0.04, fill: "currentColor" })
  ] }),
  "warning": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.5} ${s * 0.15}L${s * 0.88} ${s * 0.8}L${s * 0.12} ${s * 0.8}Z`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.5, y1: s * 0.4, x2: s * 0.5, y2: s * 0.58, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ jsx2(Circle, { cx: s * 0.5, cy: s * 0.68, r: s * 0.04, fill: "currentColor" })
  ] }),
  "error": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Circle, { cx: s * 0.5, cy: s * 0.5, r: s * 0.38, fill: "none", stroke: "currentColor", strokeWidth: 1.5 }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.35, y1: s * 0.35, x2: s * 0.65, y2: s * 0.65, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.65, y1: s * 0.35, x2: s * 0.35, y2: s * 0.65, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "keyboard": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Rect, { x: s * 0.12, y: s * 0.25, width: s * 0.76, height: s * 0.5, rx: s * 0.06, fill: "none", stroke: "currentColor", strokeWidth: 1.5 }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.25, y1: s * 0.4, x2: s * 0.35, y2: s * 0.4, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.45, y1: s * 0.4, x2: s * 0.55, y2: s * 0.4, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.65, y1: s * 0.4, x2: s * 0.75, y2: s * 0.4, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.35, y1: s * 0.6, x2: s * 0.65, y2: s * 0.6, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "bell": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.3} ${s * 0.62}L${s * 0.3} ${s * 0.42}A${s * 0.2} ${s * 0.2} 0 0 1 ${s * 0.7} ${s * 0.42}L${s * 0.7} ${s * 0.62}L${s * 0.78} ${s * 0.72}L${s * 0.22} ${s * 0.72}Z`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.42} ${s * 0.8}A${s * 0.09} ${s * 0.09} 0 0 0 ${s * 0.58} ${s * 0.8}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "mic": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Rect, { x: s * 0.4, y: s * 0.12, width: s * 0.2, height: s * 0.38, rx: s * 0.1, fill: "none", stroke: "currentColor", strokeWidth: 1.5 }),
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.28} ${s * 0.42}L${s * 0.28} ${s * 0.47}A${s * 0.22} ${s * 0.22} 0 0 0 ${s * 0.72} ${s * 0.47}L${s * 0.72} ${s * 0.42}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.5, y1: s * 0.69, x2: s * 0.5, y2: s * 0.84, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "mic-off": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Rect, { x: s * 0.4, y: s * 0.12, width: s * 0.2, height: s * 0.38, rx: s * 0.1, fill: "none", stroke: "currentColor", strokeWidth: 1.5 }),
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.28} ${s * 0.42}L${s * 0.28} ${s * 0.47}A${s * 0.22} ${s * 0.22} 0 0 0 ${s * 0.72} ${s * 0.47}L${s * 0.72} ${s * 0.42}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.5, y1: s * 0.69, x2: s * 0.5, y2: s * 0.84, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.18, y1: s * 0.15, x2: s * 0.82, y2: s * 0.85, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "camera": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Rect, { x: s * 0.1, y: s * 0.28, width: s * 0.5, height: s * 0.44, rx: s * 0.08, fill: "none", stroke: "currentColor", strokeWidth: 1.5 }),
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.6} ${s * 0.44}L${s * 0.86} ${s * 0.32}L${s * 0.86} ${s * 0.68}L${s * 0.6} ${s * 0.56}Z`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" })
  ] }),
  "camera-off": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Rect, { x: s * 0.1, y: s * 0.28, width: s * 0.5, height: s * 0.44, rx: s * 0.08, fill: "none", stroke: "currentColor", strokeWidth: 1.5 }),
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.6} ${s * 0.44}L${s * 0.86} ${s * 0.32}L${s * 0.86} ${s * 0.68}L${s * 0.6} ${s * 0.56}Z`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.14, y1: s * 0.14, x2: s * 0.86, y2: s * 0.86, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "hand": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.32} ${s * 0.52}L${s * 0.32} ${s * 0.28}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.46} ${s * 0.48}L${s * 0.46} ${s * 0.16}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.6} ${s * 0.52}L${s * 0.6} ${s * 0.22}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.32} ${s * 0.5}L${s * 0.32} ${s * 0.62}A${s * 0.19} ${s * 0.19} 0 0 0 ${s * 0.7} ${s * 0.62}L${s * 0.7} ${s * 0.4}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "send": (s) => /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.15} ${s * 0.5}L${s * 0.85} ${s * 0.18}L${s * 0.62} ${s * 0.85}L${s * 0.46} ${s * 0.58}Z`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" }),
  "chat": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Rect, { x: s * 0.15, y: s * 0.18, width: s * 0.7, height: s * 0.48, rx: s * 0.1, fill: "none", stroke: "currentColor", strokeWidth: 1.5 }),
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.32} ${s * 0.66}L${s * 0.32} ${s * 0.82}L${s * 0.48} ${s * 0.66}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" })
  ] }),
  "leave": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.45} ${s * 0.15}L${s * 0.18} ${s * 0.15}L${s * 0.18} ${s * 0.85}L${s * 0.45} ${s * 0.85}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.38, y1: s * 0.5, x2: s * 0.8, y2: s * 0.5, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.65} ${s * 0.35}L${s * 0.8} ${s * 0.5}L${s * 0.65} ${s * 0.65}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" })
  ] }),
  "home": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.2} ${s * 0.45}L${s * 0.5} ${s * 0.2}L${s * 0.8} ${s * 0.45}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.28} ${s * 0.42}V${s * 0.78}H${s * 0.72}V${s * 0.42}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" })
  ] }),
  "user": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Circle, { cx: s * 0.5, cy: s * 0.36, r: s * 0.16, fill: "none", stroke: "currentColor", strokeWidth: 1.5 }),
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.22} ${s * 0.8}C${s * 0.22} ${s * 0.63} ${s * 0.34} ${s * 0.58} ${s * 0.5} ${s * 0.58}C${s * 0.66} ${s * 0.58} ${s * 0.78} ${s * 0.63} ${s * 0.78} ${s * 0.8}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "book": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.5} ${s * 0.28}C${s * 0.42} ${s * 0.2} ${s * 0.28} ${s * 0.2} ${s * 0.2} ${s * 0.24}V${s * 0.74}C${s * 0.28} ${s * 0.7} ${s * 0.42} ${s * 0.7} ${s * 0.5} ${s * 0.78}C${s * 0.58} ${s * 0.7} ${s * 0.72} ${s * 0.7} ${s * 0.8} ${s * 0.74}V${s * 0.24}C${s * 0.72} ${s * 0.2} ${s * 0.58} ${s * 0.2} ${s * 0.5} ${s * 0.28}Z`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.5, y1: s * 0.28, x2: s * 0.5, y2: s * 0.78, stroke: "currentColor", strokeWidth: 1.5 })
  ] }),
  "globe": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Circle, { cx: s * 0.5, cy: s * 0.5, r: s * 0.3, fill: "none", stroke: "currentColor", strokeWidth: 1.5 }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.2, y1: s * 0.5, x2: s * 0.8, y2: s * 0.5, stroke: "currentColor", strokeWidth: 1.5 }),
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.5} ${s * 0.2}C${s * 0.62} ${s * 0.32} ${s * 0.62} ${s * 0.68} ${s * 0.5} ${s * 0.8}C${s * 0.38} ${s * 0.68} ${s * 0.38} ${s * 0.32} ${s * 0.5} ${s * 0.2}Z`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" })
  ] }),
  "volume": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.2} ${s * 0.4}H${s * 0.34}L${s * 0.5} ${s * 0.25}V${s * 0.75}L${s * 0.34} ${s * 0.6}H${s * 0.2}Z`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.62} ${s * 0.38}C${s * 0.68} ${s * 0.44} ${s * 0.68} ${s * 0.56} ${s * 0.62} ${s * 0.62}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.7} ${s * 0.3}C${s * 0.8} ${s * 0.4} ${s * 0.8} ${s * 0.6} ${s * 0.7} ${s * 0.7}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "map": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.2} ${s * 0.28}L${s * 0.4} ${s * 0.2}L${s * 0.6} ${s * 0.28}L${s * 0.8} ${s * 0.2}V${s * 0.72}L${s * 0.6} ${s * 0.8}L${s * 0.4} ${s * 0.72}L${s * 0.2} ${s * 0.8}Z`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.4, y1: s * 0.2, x2: s * 0.4, y2: s * 0.72, stroke: "currentColor", strokeWidth: 1.5 }),
    /* @__PURE__ */ jsx2(Line, { x1: s * 0.6, y1: s * 0.28, x2: s * 0.6, y2: s * 0.8, stroke: "currentColor", strokeWidth: 1.5 })
  ] }),
  "video": (s) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Rect, { x: s * 0.18, y: s * 0.3, width: s * 0.42, height: s * 0.4, rx: s * 0.06, fill: "none", stroke: "currentColor", strokeWidth: 1.5 }),
    /* @__PURE__ */ jsx2(Path, { d: `M${s * 0.6} ${s * 0.45}L${s * 0.82} ${s * 0.33}V${s * 0.67}L${s * 0.6} ${s * 0.55}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" })
  ] }),
  "tutor": (s) => /* @__PURE__ */ jsx2(Fragment, { children: /* @__PURE__ */ jsx2(Circle, { cx: s * 0.5, cy: s * 0.5, r: s * 0.38, fill: "#B08AF9" }) })
};
function Icon({ name, size = icon.md, color: colorProp }) {
  const { theme } = useTheme();
  const c = colorProp || theme.fg;
  return /* @__PURE__ */ jsx2(Svg, { width: size, height: size, viewBox: `0 0 ${size} ${size}`, color: c, children: paths[name](size) });
}
var iconNames = Object.keys(paths);

// rn/Button.tsx
import { Pressable, View, Text, ActivityIndicator, Platform } from "react-native";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var heights = { sm: h.sm, md: h.md, lg: h.lg };
var paddings = { sm: sp[3], md: sp[5], lg: sp[6] };
var fontSizes = { sm: fs[13], md: fs[14], lg: fs[15] };
var iconSizes = { sm: 14, md: 16, lg: 18 };
function Button({ children, variant = "primary", size = "md", disabled, loading, fullWidth, leadingIcon, trailingIcon, onPress }) {
  const { theme, mode } = useTheme();
  const bgMap = {
    primary: theme.accent,
    secondary: "transparent",
    ghost: "transparent",
    danger: "transparent",
    "danger-solid": color.danger[400],
    signal: color.gold[400],
    tutor: theme.iris
  };
  const fgMap = {
    primary: theme.accentFg,
    secondary: theme.fg,
    ghost: theme.fgMuted,
    danger: color.danger[300],
    "danger-solid": color.chalk[100],
    signal: theme.bg,
    // Void iris is light purple → deep purple text; paper iris is deep plum → cream text.
    tutor: mode === "void" ? color.iris[800] : theme.fgInverse
  };
  const isOutline = variant === "secondary" || variant === "danger";
  const borderColor = variant === "secondary" ? theme.borderStrong : variant === "danger" ? theme.dangerBorder : "transparent";
  const containerStyle = {
    height: heights[size],
    paddingHorizontal: variant === "ghost" ? sp[3] : paddings[size],
    borderRadius: r[2],
    // Disabled: grey bg + grey text for ALL variants
    backgroundColor: disabled ? theme.border : bgMap[variant],
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: sp[2],
    ...fullWidth ? { width: "100%" } : {},
    ...isOutline && !disabled ? { borderWidth: 1, borderColor } : {}
  };
  const textStyle = {
    fontFamily: font.sans,
    fontSize: fontSizes[size],
    fontWeight: fw[600],
    letterSpacing: -0.07,
    color: loading ? "transparent" : disabled ? theme.fgFaint : fgMap[variant],
    ...Platform.OS === "web" ? { cursor: "inherit" } : {}
  };
  return /* @__PURE__ */ jsxs2(
    Pressable,
    {
      onPress,
      accessibilityRole: "button",
      accessibilityState: { disabled: disabled || loading },
      disabled: disabled || loading,
      style: ({ pressed, hovered }) => [
        containerStyle,
        pressed && !disabled && { opacity: 0.9, transform: [{ translateY: 0.5 }] },
        Platform.OS === "web" && { cursor: disabled || loading ? "not-allowed" : "pointer" }
      ],
      children: [
        loading && /* @__PURE__ */ jsx3(
          ActivityIndicator,
          {
            size: "small",
            color: disabled ? theme.fgFaint : fgMap[variant],
            style: { position: "absolute" }
          }
        ),
        leadingIcon && !loading && /* @__PURE__ */ jsx3(View, { style: { width: iconSizes[size], height: iconSizes[size], alignItems: "center", justifyContent: "center", overflow: "hidden" }, children: leadingIcon }),
        /* @__PURE__ */ jsx3(Text, { style: textStyle, children }),
        trailingIcon && !loading && /* @__PURE__ */ jsx3(View, { style: { width: iconSizes[size], height: iconSizes[size], alignItems: "center", justifyContent: "center", overflow: "hidden" }, children: trailingIcon })
      ]
    }
  );
}

// rn/IconButton.tsx
import { Pressable as Pressable2, View as View2, Platform as Platform2 } from "react-native";
import { jsx as jsx4 } from "react/jsx-runtime";
var sizes = { sm: h.sm, md: h.md, lg: h.lg };
function IconButton({ children, variant = "default", size = "md", disabled, onPress, accessibilityLabel }) {
  const { theme } = useTheme();
  const dim = sizes[size];
  const hasBorder = variant === "default" || variant === "danger";
  const style = {
    width: dim,
    height: dim,
    borderRadius: r[2],
    backgroundColor: disabled ? theme.border : variant === "primary" ? theme.accent : "transparent",
    ...hasBorder && !disabled ? {
      borderWidth: 1,
      borderColor: variant === "danger" ? theme.dangerBorder : theme.border
    } : {},
    alignItems: "center",
    justifyContent: "center"
  };
  return /* @__PURE__ */ jsx4(
    Pressable2,
    {
      onPress,
      accessibilityRole: "button",
      accessibilityLabel,
      accessibilityState: disabled ? { disabled: true } : void 0,
      disabled,
      style: ({ pressed }) => [
        style,
        pressed && !disabled && { opacity: 0.9, transform: [{ translateY: 0.5 }] },
        Platform2.OS === "web" && { cursor: disabled ? "not-allowed" : "pointer" }
      ],
      children: disabled ? /* @__PURE__ */ jsx4(View2, { style: { opacity: 0.3 }, children }) : children
    }
  );
}

// rn/Input.tsx
import { forwardRef, useState as useState2 } from "react";
import { View as View3, TextInput, Text as Text2 } from "react-native";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var Input = forwardRef(({ label, error, helper, disabled, ...rest }, ref) => {
  const { theme } = useTheme();
  const [focused, setFocused] = useState2(false);
  const borderColor = error ? theme.danger : focused ? theme.accent : theme.borderStrong;
  const containerStyle = { opacity: disabled ? 0.4 : 1 };
  const labelStyle = {
    fontFamily: font.sans,
    fontSize: fs[12],
    fontWeight: fw[500],
    color: theme.fgMuted,
    marginBottom: sp[1]
  };
  const inputStyle = {
    fontFamily: font.sans,
    fontSize: fs[16],
    color: theme.fg,
    backgroundColor: theme.inputBg,
    borderWidth: 1,
    borderColor,
    borderRadius: r[2],
    paddingHorizontal: sp[3],
    paddingVertical: sp[2],
    minHeight: 40
  };
  const helperStyle = {
    fontFamily: font.sans,
    fontSize: fs[12],
    color: error ? theme.danger : theme.fgFaint,
    marginTop: sp[1]
  };
  return /* @__PURE__ */ jsxs3(View3, { style: containerStyle, children: [
    label && /* @__PURE__ */ jsx5(Text2, { style: labelStyle, children: label }),
    /* @__PURE__ */ jsx5(
      TextInput,
      {
        ref,
        ...rest,
        editable: !disabled,
        accessibilityLabel: label,
        placeholderTextColor: theme.fgFaint,
        onFocus: (e) => {
          setFocused(true);
          rest.onFocus?.(e);
        },
        onBlur: (e) => {
          setFocused(false);
          rest.onBlur?.(e);
        },
        style: inputStyle
      }
    ),
    (error || helper) && /* @__PURE__ */ jsx5(Text2, { style: helperStyle, children: error || helper })
  ] });
});

// rn/Select.tsx
import { useState as useState3 } from "react";
import { View as View5, Text as Text4, Pressable as Pressable4 } from "react-native";

// rn/BottomSheet.tsx
import React3 from "react";
import { View as View4, Pressable as Pressable3, Text as Text3, Modal, KeyboardAvoidingView, Platform as Platform3 } from "react-native";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
function BottomSheet({ visible, onClose, title, children, actions, full }) {
  const { theme } = useTheme();
  const insets = React3.useContext(SafeAreaInsetsContext) || { bottom: 0 };
  const scrimStyle = {
    flex: 1,
    backgroundColor: "rgba(6,9,19,0.5)",
    justifyContent: "flex-end"
  };
  const sheetStyle = {
    backgroundColor: theme.bgOverlay,
    borderTopLeftRadius: r[4],
    borderTopRightRadius: r[4],
    maxHeight: full ? "90%" : void 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8
  };
  const handleStyle = {
    alignSelf: "center",
    width: 32,
    height: sp[1],
    borderRadius: r.pill,
    backgroundColor: theme.fgFaint,
    opacity: 0.3,
    marginTop: sp[3],
    marginBottom: sp[2]
  };
  return /* @__PURE__ */ jsx6(Modal, { visible, transparent: true, animationType: "slide", onRequestClose: onClose, children: /* @__PURE__ */ jsx6(KeyboardAvoidingView, { style: { flex: 1 }, behavior: Platform3.OS === "ios" ? "padding" : void 0, children: /* @__PURE__ */ jsx6(Pressable3, { style: scrimStyle, onPress: onClose, accessibilityRole: "none", children: /* @__PURE__ */ jsxs4(Pressable3, { style: sheetStyle, onPress: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsx6(View4, { style: handleStyle }),
    title && /* @__PURE__ */ jsx6(View4, { style: { paddingHorizontal: sp[6], paddingBottom: sp[2] }, children: /* @__PURE__ */ jsx6(Text3, { style: { fontFamily: font.serif, fontSize: fs[18], color: theme.fg }, children: title }) }),
    /* @__PURE__ */ jsx6(View4, { style: { paddingHorizontal: sp[6], paddingBottom: actions ? sp[5] : Math.max(sp[5], insets.bottom), ...full ? { flex: 1 } : {} }, children }),
    actions && /* @__PURE__ */ jsx6(View4, { style: { borderTopWidth: 1, borderTopColor: theme.border, padding: sp[4], paddingBottom: Math.max(sp[4], insets.bottom), paddingHorizontal: sp[6] }, children: actions })
  ] }) }) }) });
}

// rn/Select.tsx
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
function Select({ options, value, onChange, label, placeholder = "Select\u2026", error, helper, disabled, sheetTitle }) {
  const { theme } = useTheme();
  const [open, setOpen] = useState3(false);
  const selected = options.find((o) => o.value === value);
  const borderColor = error ? theme.danger : open ? theme.accent : theme.borderStrong;
  const labelStyle = {
    fontFamily: font.sans,
    fontSize: fs[12],
    fontWeight: fw[500],
    color: theme.fgMuted,
    marginBottom: sp[1]
  };
  const helperStyle = {
    fontFamily: font.sans,
    fontSize: fs[12],
    color: error ? theme.danger : theme.fgFaint,
    marginTop: sp[1]
  };
  return /* @__PURE__ */ jsxs5(View5, { style: { opacity: disabled ? 0.4 : 1 }, children: [
    label && /* @__PURE__ */ jsx7(Text4, { style: labelStyle, children: label }),
    /* @__PURE__ */ jsxs5(
      Pressable4,
      {
        accessibilityRole: "button",
        accessibilityLabel: label || placeholder,
        accessibilityValue: selected ? { text: selected.label } : void 0,
        accessibilityState: { disabled, expanded: open },
        disabled,
        onPress: () => setOpen(true),
        style: {
          flexDirection: "row",
          alignItems: "center",
          gap: sp[2],
          backgroundColor: theme.inputBg,
          borderWidth: 1,
          borderColor,
          borderRadius: r[2],
          paddingHorizontal: sp[3],
          paddingVertical: sp[2],
          minHeight: 40
        },
        children: [
          /* @__PURE__ */ jsx7(
            Text4,
            {
              numberOfLines: 1,
              style: {
                flex: 1,
                fontFamily: font.sans,
                fontSize: fs[16],
                color: selected ? theme.fg : theme.fgFaint
              },
              children: selected ? selected.label : placeholder
            }
          ),
          /* @__PURE__ */ jsx7(Icon, { name: "chevron-down", size: 16, color: theme.fgMuted })
        ]
      }
    ),
    (error || helper) && /* @__PURE__ */ jsx7(Text4, { style: helperStyle, children: error || helper }),
    /* @__PURE__ */ jsx7(BottomSheet, { visible: open, onClose: () => setOpen(false), title: sheetTitle || label, children: options.map((option) => {
      const isSelected = option.value === value;
      return /* @__PURE__ */ jsxs5(
        Pressable4,
        {
          accessibilityRole: "menuitem",
          accessibilityState: { selected: isSelected },
          onPress: () => {
            onChange(option.value);
            setOpen(false);
          },
          style: ({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            gap: sp[3],
            minHeight: 48,
            paddingVertical: sp[3],
            backgroundColor: pressed ? theme.activeOverlay : "transparent"
          }),
          children: [
            /* @__PURE__ */ jsx7(Text4, { style: {
              flex: 1,
              fontFamily: font.sans,
              fontSize: fs[15],
              fontWeight: isSelected ? fw[600] : fw[400],
              color: theme.fg
            }, children: option.label }),
            isSelected && /* @__PURE__ */ jsx7(Icon, { name: "check", size: 18, color: theme.accentText })
          ]
        },
        option.value
      );
    }) })
  ] });
}

// rn/Textarea.tsx
import { forwardRef as forwardRef2, useState as useState4 } from "react";
import { View as View6, TextInput as TextInput2, Text as Text5 } from "react-native";
import { jsx as jsx8, jsxs as jsxs6 } from "react/jsx-runtime";
var Textarea = forwardRef2(({ label, error, helper, rows = 4, disabled, ...rest }, ref) => {
  const { theme } = useTheme();
  const [focused, setFocused] = useState4(false);
  const borderColor = error ? theme.danger : focused ? theme.accent : theme.borderStrong;
  const containerStyle = { opacity: disabled ? 0.4 : 1 };
  const labelStyle = {
    fontFamily: font.sans,
    fontSize: fs[12],
    fontWeight: fw[500],
    color: theme.fgMuted,
    marginBottom: sp[1]
  };
  const inputStyle = {
    fontFamily: font.sans,
    fontSize: fs[14],
    color: theme.fg,
    backgroundColor: theme.inputBg,
    borderWidth: 1,
    borderColor,
    borderRadius: r[2],
    paddingHorizontal: sp[3],
    paddingVertical: sp[2],
    minHeight: rows * 24,
    textAlignVertical: "top"
  };
  const helperStyle = {
    fontFamily: font.sans,
    fontSize: fs[12],
    color: error ? theme.danger : theme.fgFaint,
    marginTop: sp[1]
  };
  return /* @__PURE__ */ jsxs6(View6, { style: containerStyle, children: [
    label && /* @__PURE__ */ jsx8(Text5, { style: labelStyle, children: label }),
    /* @__PURE__ */ jsx8(
      TextInput2,
      {
        ref,
        ...rest,
        multiline: true,
        numberOfLines: rows,
        editable: !disabled,
        accessibilityLabel: label,
        placeholderTextColor: theme.fgFaint,
        onFocus: (e) => {
          setFocused(true);
          rest.onFocus?.(e);
        },
        onBlur: (e) => {
          setFocused(false);
          rest.onBlur?.(e);
        },
        style: inputStyle
      }
    ),
    (error || helper) && /* @__PURE__ */ jsx8(Text5, { style: helperStyle, children: error || helper })
  ] });
});

// rn/Switch.tsx
import { useEffect } from "react";
import { Pressable as Pressable5, View as View7, Text as Text6, Platform as Platform4 } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor, Easing } from "react-native-reanimated";
import { jsx as jsx9, jsxs as jsxs7 } from "react/jsx-runtime";
var TRACK_W = 36;
var TRACK_H = 20;
var THUMB_SIZE = 16;
var THUMB_TRAVEL = TRACK_W - THUMB_SIZE - 4;
function Switch({ value, onValueChange, disabled, label }) {
  const { theme, mode } = useTheme();
  const thumbOn = mode === "paper" ? "#FFFFFF" : theme.accentFg;
  const thumbX = useSharedValue(value ? THUMB_TRAVEL : 0);
  const trackColor = useSharedValue(value ? 1 : 0);
  useEffect(() => {
    const config = { duration: dur[1], easing: Easing.bezier(0.22, 0.61, 0.36, 1) };
    thumbX.value = withTiming(value ? THUMB_TRAVEL : 0, config);
    trackColor.value = withTiming(value ? 1 : 0, config);
  }, [value]);
  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(trackColor.value, [0, 1], [theme.borderStrong, theme.accent])
  }));
  const thumbStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(trackColor.value, [0, 1], [color.chalk[100], thumbOn]),
    transform: [{ translateX: thumbX.value }]
  }));
  const track = /* @__PURE__ */ jsx9(View7, { ...Platform4.OS === "web" ? { dataSet: { ltr: "" } } : {}, style: { width: TRACK_W }, children: /* @__PURE__ */ jsx9(Animated.View, { style: [{
    width: TRACK_W,
    height: TRACK_H,
    borderRadius: r.pill,
    justifyContent: "center",
    paddingHorizontal: 2,
    opacity: disabled ? 0.4 : 1
  }, trackStyle], children: /* @__PURE__ */ jsx9(Animated.View, { style: [{
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2
  }, thumbStyle] }) }) });
  return /* @__PURE__ */ jsxs7(Pressable5, { onPress: () => !disabled && onValueChange(!value), accessibilityRole: "switch", accessibilityState: { checked: value, disabled }, style: label ? { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: sp[3], width: "100%" } : void 0, children: [
    label && /* @__PURE__ */ jsx9(Text6, { style: { fontFamily: font.sans, fontSize: fs[14], color: disabled ? theme.fgFaint : theme.fg, flex: 1 }, children: label }),
    track
  ] });
}

// rn/Checkbox.tsx
import { Pressable as Pressable6, View as View8, Text as Text7 } from "react-native";
import { jsx as jsx10, jsxs as jsxs8 } from "react/jsx-runtime";
var SIZE = 18;
function Checkbox({ checked, onValueChange, disabled, indeterminate, label }) {
  const { theme } = useTheme();
  const boxStyle = {
    width: SIZE,
    height: SIZE,
    borderRadius: r[1],
    borderWidth: checked || indeterminate ? 0 : 1.5,
    borderColor: theme.borderStrong,
    backgroundColor: checked || indeterminate ? theme.accent : theme.bg,
    alignItems: "center",
    justifyContent: "center",
    opacity: disabled ? 0.4 : 1
  };
  const checkmarkStyle = {
    width: icon.sm,
    height: icon.xs,
    borderStartWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: theme.accentFg,
    transform: [{ rotate: "-45deg" }, { translateY: -1 }]
  };
  const dashStyle = {
    width: sp[2],
    height: sp[0.5],
    backgroundColor: theme.accentFg
  };
  const box = /* @__PURE__ */ jsxs8(View8, { style: boxStyle, children: [
    checked && !indeterminate && /* @__PURE__ */ jsx10(View8, { style: checkmarkStyle }),
    indeterminate && /* @__PURE__ */ jsx10(View8, { style: dashStyle })
  ] });
  return /* @__PURE__ */ jsxs8(Pressable6, { onPress: () => !disabled && onValueChange(!checked), accessibilityRole: "checkbox", accessibilityState: { checked, disabled }, style: label ? { flexDirection: "row", alignItems: "center", gap: sp[3] } : void 0, children: [
    box,
    label && /* @__PURE__ */ jsx10(Text7, { style: { fontFamily: font.sans, fontSize: fs[14], color: disabled ? theme.fgFaint : theme.fg }, children: label })
  ] });
}

// rn/CheckboxGroup.tsx
import { View as View9, Text as Text8 } from "react-native";
import { jsx as jsx11, jsxs as jsxs9 } from "react/jsx-runtime";
function CheckboxGroup({ values, onChange, options, title, disabled }) {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsxs9(View9, { accessibilityRole: "none", style: { gap: sp[3] }, children: [
    title && /* @__PURE__ */ jsx11(Text8, { style: { fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: theme.fgMuted, marginBottom: sp[2] }, children: title }),
    options.map((opt) => /* @__PURE__ */ jsx11(
      Checkbox,
      {
        checked: values.includes(opt.value),
        onValueChange: (checked) => {
          onChange(checked ? [...values, opt.value] : values.filter((v) => v !== opt.value));
        },
        label: opt.label,
        disabled
      },
      opt.value
    ))
  ] });
}

// rn/Radio.tsx
import { Pressable as Pressable7, View as View10, Text as Text9 } from "react-native";
import { jsx as jsx12, jsxs as jsxs10 } from "react/jsx-runtime";
var SIZE2 = 18;
function Radio({ selected, onSelect, disabled, label }) {
  const { theme } = useTheme();
  const outerStyle = {
    width: SIZE2,
    height: SIZE2,
    borderRadius: SIZE2 / 2,
    borderWidth: selected ? 5 : 1,
    borderColor: selected ? theme.accent : theme.borderStrong,
    backgroundColor: selected ? "transparent" : theme.inputBg,
    opacity: disabled ? 0.4 : 1
  };
  return /* @__PURE__ */ jsxs10(Pressable7, { onPress: () => !disabled && onSelect(), accessibilityRole: "radio", accessibilityState: { selected, disabled }, style: label ? { flexDirection: "row", alignItems: "center", gap: sp[3] } : void 0, children: [
    /* @__PURE__ */ jsx12(View10, { style: outerStyle }),
    label && /* @__PURE__ */ jsx12(Text9, { style: { fontFamily: font.sans, fontSize: fs[14], color: disabled ? theme.fgFaint : theme.fg }, children: label })
  ] });
}

// rn/RadioGroup.tsx
import { View as View11, Text as Text10 } from "react-native";
import { jsx as jsx13, jsxs as jsxs11 } from "react/jsx-runtime";
function RadioGroup({ value, onChange, options, title, disabled }) {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsxs11(View11, { accessibilityRole: "radiogroup", style: { gap: sp[3] }, children: [
    title && /* @__PURE__ */ jsx13(Text10, { style: { fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: theme.fgMuted, marginBottom: sp[2] }, children: title }),
    options.map((opt) => /* @__PURE__ */ jsx13(
      Radio,
      {
        selected: value === opt.value,
        onSelect: () => onChange(opt.value),
        label: opt.label,
        disabled
      },
      opt.value
    ))
  ] });
}

// rn/Stepper.tsx
import { View as View12, Pressable as Pressable8, Text as Text11, Platform as Platform5 } from "react-native";
import { jsx as jsx14, jsxs as jsxs12 } from "react/jsx-runtime";
function Stepper({ value, min = 0, max = 100, step = 1, onChange, disabled }) {
  const { theme } = useTheme();
  const canDec = value > min;
  const canInc = value < max;
  const btnStyle = (enabled) => ({
    width: h.sm,
    height: h.sm,
    borderRadius: r[2],
    backgroundColor: theme.bgOverlay,
    borderWidth: 1,
    borderColor: theme.border,
    alignItems: "center",
    justifyContent: "center",
    opacity: enabled && !disabled ? 1 : 0.4
  });
  const btnText = {
    fontFamily: font.mono,
    fontSize: fs[16],
    color: theme.fg
  };
  const valueStyle = {
    fontFamily: font.mono,
    fontSize: fs[16],
    fontWeight: fw[600],
    color: theme.fg,
    minWidth: h.md,
    textAlign: "center",
    ...Platform5.OS === "web" ? { userSelect: "none" } : {}
  };
  return /* @__PURE__ */ jsxs12(View12, { style: { flexDirection: "row", alignItems: "center", gap: sp[2] }, children: [
    /* @__PURE__ */ jsx14(Pressable8, { onPress: () => canDec && !disabled && onChange(value - step), style: btnStyle(canDec), accessibilityRole: "button", accessibilityLabel: "Decrease", accessibilityState: { disabled: !canDec || !!disabled }, children: /* @__PURE__ */ jsx14(Text11, { style: btnText, children: "\u2212" }) }),
    /* @__PURE__ */ jsx14(Text11, { style: valueStyle, accessibilityRole: "text", children: value }),
    /* @__PURE__ */ jsx14(Pressable8, { onPress: () => canInc && !disabled && onChange(value + step), style: btnStyle(canInc), accessibilityRole: "button", accessibilityLabel: "Increase", accessibilityState: { disabled: !canInc || !!disabled }, children: /* @__PURE__ */ jsx14(Text11, { style: btnText, children: "+" }) })
  ] });
}

// rn/Segmented.tsx
import { View as View13, Pressable as Pressable9, Text as Text12, Platform as Platform6 } from "react-native";
import { jsx as jsx15 } from "react/jsx-runtime";
function Segmented({ options, selected, onSelect, size = "md" }) {
  const { theme } = useTheme();
  const sm = size === "sm";
  const trackStyle = {
    flexDirection: "row",
    backgroundColor: theme.inputBg,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: r[sm ? 1 : 2],
    padding: 2,
    ...Platform6.OS === "web" ? { direction: "ltr" } : {}
  };
  return /* @__PURE__ */ jsx15(View13, { accessibilityRole: "radiogroup", style: trackStyle, children: options.map((opt, i) => {
    const isOn = i === selected;
    const btnStyle = {
      flex: sm ? void 0 : 1,
      paddingVertical: sm ? 3 : 6,
      paddingHorizontal: sm ? 8 : 14,
      borderRadius: r[1],
      backgroundColor: isOn ? theme.bgOverlay : "transparent",
      borderWidth: isOn ? 1 : 0,
      borderColor: isOn ? theme.borderStrong : "transparent",
      alignItems: "center"
    };
    const txtStyle = {
      fontFamily: font.mono,
      fontSize: sm ? fs[10] : fs[13],
      fontWeight: fw[sm ? 600 : 500],
      color: isOn ? theme.fg : theme.fgSubtle
    };
    return /* @__PURE__ */ jsx15(Pressable9, { onPress: () => onSelect(i), style: btnStyle, accessibilityRole: "radio", accessibilityState: { selected: isOn }, children: /* @__PURE__ */ jsx15(Text12, { style: txtStyle, children: opt }) }, i);
  }) });
}

// rn/SearchInput.tsx
import { forwardRef as forwardRef3, useState as useState5 } from "react";
import { View as View14, TextInput as TextInput3, Pressable as Pressable10 } from "react-native";
import { jsx as jsx16, jsxs as jsxs13 } from "react/jsx-runtime";
var SearchInput = forwardRef3(
  ({ value, onChangeText, disabled, placeholder = "Search", ...rest }, ref) => {
    const { theme } = useTheme();
    const [focused, setFocused] = useState5(false);
    return /* @__PURE__ */ jsxs13(View14, { style: {
      flexDirection: "row",
      alignItems: "center",
      gap: sp[2],
      backgroundColor: theme.inputBg,
      borderWidth: 1,
      borderColor: focused ? theme.accent : theme.borderStrong,
      borderRadius: 999,
      paddingHorizontal: sp[3],
      minHeight: 40,
      opacity: disabled ? 0.4 : 1
    }, children: [
      /* @__PURE__ */ jsx16(Icon, { name: "search", size: icon.lg, color: theme.fgFaint }),
      /* @__PURE__ */ jsx16(
        TextInput3,
        {
          ref,
          ...rest,
          value,
          onChangeText,
          editable: !disabled,
          placeholder,
          placeholderTextColor: theme.fgFaint,
          accessibilityRole: "search",
          returnKeyType: "search",
          onFocus: (e) => {
            setFocused(true);
            rest.onFocus?.(e);
          },
          onBlur: (e) => {
            setFocused(false);
            rest.onBlur?.(e);
          },
          style: { flex: 1, fontFamily: font.sans, fontSize: fs[16], color: theme.fg, paddingVertical: sp[2] }
        }
      ),
      value.length > 0 && /* @__PURE__ */ jsx16(
        Pressable10,
        {
          onPress: () => onChangeText(""),
          accessibilityRole: "button",
          accessibilityLabel: "Clear search",
          hitSlop: 8,
          style: ({ pressed }) => ({
            width: 20,
            height: 20,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pressed ? theme.hoverOverlay : theme.bgSunken
          }),
          children: /* @__PURE__ */ jsx16(Icon, { name: "close", size: icon.sm, color: theme.fgMuted })
        }
      )
    ] });
  }
);

// rn/PinInput.tsx
import { useRef, useState as useState6 } from "react";
import { View as View15, Text as Text13, TextInput as TextInput4, Pressable as Pressable11, I18nManager } from "react-native";
import { jsx as jsx17, jsxs as jsxs14 } from "react/jsx-runtime";
function PinInput({ length = 6, value, onChange, onComplete, error, disabled, autoFocus }) {
  const { theme } = useTheme();
  const inputRef = useRef(null);
  const [focused, setFocused] = useState6(false);
  const isRTL = I18nManager.isRTL;
  const handleChange = (raw) => {
    const next = raw.replace(/[^0-9]/g, "").slice(0, length);
    onChange(next);
    if (next.length === length && value.length !== length) onComplete?.(next);
  };
  const activeIndex = Math.min(value.length, length - 1);
  return /* @__PURE__ */ jsxs14(
    Pressable11,
    {
      onPress: () => inputRef.current?.focus(),
      disabled,
      accessibilityLabel: `${length} digit code, ${value.length} of ${length} entered`,
      style: { opacity: disabled ? 0.4 : 1 },
      children: [
        /* @__PURE__ */ jsx17(View15, { style: { flexDirection: isRTL ? "row-reverse" : "row", gap: sp[2] }, children: Array.from({ length }).map((_, i) => {
          const filled = i < value.length;
          const isActive = focused && !disabled && i === activeIndex && value.length < length;
          return /* @__PURE__ */ jsx17(View15, { style: {
            flex: 1,
            maxWidth: 52,
            height: 56,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.inputBg,
            borderWidth: isActive ? 1.5 : 1,
            borderColor: error ? theme.danger : isActive ? theme.water : filled ? theme.borderStrong : theme.border,
            borderRadius: r[2]
          }, children: /* @__PURE__ */ jsx17(Text13, { style: { fontFamily: font.mono, fontSize: fs[22], fontWeight: fw[600], color: theme.fg, fontVariant: ["tabular-nums"] }, children: value[i] ?? "" }) }, i);
        }) }),
        /* @__PURE__ */ jsx17(
          TextInput4,
          {
            ref: inputRef,
            value,
            onChangeText: handleChange,
            editable: !disabled,
            autoFocus,
            keyboardType: "number-pad",
            textContentType: "oneTimeCode",
            autoComplete: "sms-otp",
            caretHidden: true,
            onFocus: () => setFocused(true),
            onBlur: () => setFocused(false),
            style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.01 }
          }
        )
      ]
    }
  );
}

// rn/PhoneInput.tsx
import { forwardRef as forwardRef4, useState as useState7 } from "react";
import { View as View16, TextInput as TextInput5, Text as Text14, I18nManager as I18nManager2 } from "react-native";
import { jsx as jsx18, jsxs as jsxs15 } from "react/jsx-runtime";
var PhoneInput = forwardRef4(({
  value,
  onChangeText,
  label,
  error,
  helper,
  disabled,
  countryCode = "+966",
  ...rest
}, ref) => {
  const { theme } = useTheme();
  const [focused, setFocused] = useState7(false);
  const isRTL = I18nManager2.isRTL;
  const borderColor = error ? theme.danger : focused ? theme.accent : theme.borderStrong;
  return /* @__PURE__ */ jsxs15(View16, { style: { opacity: disabled ? 0.4 : 1 }, children: [
    label && /* @__PURE__ */ jsx18(Text14, { style: { fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: theme.fgMuted, marginBottom: sp[1] }, children: label }),
    /* @__PURE__ */ jsxs15(View16, { style: {
      // Phone numbers read LTR everywhere — reverse the row in RTL so prefix stays leading.
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      backgroundColor: theme.inputBg,
      borderWidth: 1,
      borderColor,
      borderRadius: r[2],
      minHeight: 40
    }, children: [
      /* @__PURE__ */ jsx18(View16, { style: { paddingHorizontal: sp[3], alignSelf: "stretch", justifyContent: "center", borderRightWidth: isRTL ? 0 : 1, borderLeftWidth: isRTL ? 1 : 0, borderColor: theme.divider }, children: /* @__PURE__ */ jsx18(Text14, { style: { fontFamily: font.mono, fontSize: fs[14], color: theme.fgMuted }, children: countryCode }) }),
      /* @__PURE__ */ jsx18(
        TextInput5,
        {
          ref,
          ...rest,
          value,
          onChangeText: (t) => onChangeText(t.replace(/\D/g, "").slice(0, 12)),
          editable: !disabled,
          keyboardType: "phone-pad",
          textContentType: "telephoneNumber",
          autoComplete: "tel",
          accessibilityLabel: label || "Phone number",
          placeholderTextColor: theme.fgFaint,
          onFocus: (e) => {
            setFocused(true);
            rest.onFocus?.(e);
          },
          onBlur: (e) => {
            setFocused(false);
            rest.onBlur?.(e);
          },
          style: {
            flex: 1,
            fontFamily: font.sans,
            fontSize: fs[16],
            color: theme.fg,
            paddingHorizontal: sp[3],
            paddingVertical: sp[2],
            textAlign: "left",
            writingDirection: "ltr"
          }
        }
      )
    ] }),
    (error || helper) && /* @__PURE__ */ jsx18(Text14, { style: { fontFamily: font.sans, fontSize: fs[12], color: error ? theme.danger : theme.fgFaint, marginTop: sp[1] }, children: error || helper })
  ] });
});

// rn/ListRow.tsx
import { View as View17, Text as Text15, Pressable as Pressable12, I18nManager as I18nManager3 } from "react-native";
import { Fragment as Fragment2, jsx as jsx19, jsxs as jsxs16 } from "react/jsx-runtime";
function ListRow({ label, icon: icon3, value, right, danger, chevron = true, divider = true, disabled, onPress }) {
  const { theme } = useTheme();
  const isRTL = I18nManager3.isRTL;
  const fg = danger ? theme.danger : theme.fg;
  const content = /* @__PURE__ */ jsxs16(Fragment2, { children: [
    icon3 && /* @__PURE__ */ jsx19(Icon, { name: icon3, size: icon.lg, color: danger ? theme.danger : theme.fgMuted }),
    /* @__PURE__ */ jsx19(Text15, { style: { fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: fg, flex: 1 }, numberOfLines: 1, children: label }),
    right ?? /* @__PURE__ */ jsxs16(Fragment2, { children: [
      value && /* @__PURE__ */ jsx19(Text15, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }, numberOfLines: 1, children: value }),
      onPress && chevron && /* @__PURE__ */ jsx19(Icon, { name: isRTL ? "chevron-left" : "chevron-right", size: icon.md, color: theme.fgFaint })
    ] })
  ] });
  const rowStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: sp[3],
    minHeight: 52,
    paddingVertical: sp[3],
    borderBottomWidth: divider ? 1 : 0,
    borderBottomColor: theme.divider,
    opacity: disabled ? 0.4 : 1
  };
  if (onPress) {
    return /* @__PURE__ */ jsx19(
      Pressable12,
      {
        onPress,
        disabled,
        accessibilityRole: "button",
        accessibilityLabel: label,
        style: ({ pressed }) => [rowStyle, pressed && { backgroundColor: theme.hoverOverlay }],
        children: content
      }
    );
  }
  return /* @__PURE__ */ jsx19(View17, { style: rowStyle, children: content });
}

// rn/UploadTile.tsx
import { View as View19, Text as Text17, Pressable as Pressable13 } from "react-native";

// rn/Progress.tsx
import { View as View18, Text as Text16 } from "react-native";
import Svg2, { Circle as Circle2 } from "react-native-svg";
import { jsx as jsx20, jsxs as jsxs17 } from "react/jsx-runtime";
function LinearProgress({ value, height = sp[1], color: color6 }) {
  const { theme } = useTheme();
  const pct = Math.max(0, Math.min(100, value));
  return /* @__PURE__ */ jsx20(View18, { accessibilityRole: "progressbar", accessibilityValue: { now: pct, min: 0, max: 100 }, style: { height, borderRadius: r.pill, backgroundColor: theme.border, overflow: "hidden" }, children: /* @__PURE__ */ jsx20(View18, { style: { height: "100%", width: `${pct}%`, borderRadius: r.pill, backgroundColor: color6 || theme.accent } }) });
}
function CircularProgress({ value, size = sp[9], strokeWidth = 3, showValue, color: color6 }) {
  const { theme } = useTheme();
  const pct = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - pct / 100);
  return /* @__PURE__ */ jsxs17(View18, { style: { width: size, height: size, alignItems: "center", justifyContent: "center" }, children: [
    /* @__PURE__ */ jsxs17(Svg2, { width: size, height: size, style: { position: "absolute", transform: [{ rotate: "-90deg" }] }, children: [
      /* @__PURE__ */ jsx20(Circle2, { cx: size / 2, cy: size / 2, r: radius, stroke: theme.border, strokeWidth, fill: "none" }),
      /* @__PURE__ */ jsx20(Circle2, { cx: size / 2, cy: size / 2, r: radius, stroke: color6 || theme.accent, strokeWidth, fill: "none", strokeLinecap: "round", strokeDasharray: circumference, strokeDashoffset })
    ] }),
    showValue && /* @__PURE__ */ jsxs17(Text16, { style: { fontFamily: font.mono, fontSize: fs[13], fontWeight: fw[500], color: theme.fg }, children: [
      Math.round(pct),
      "%"
    ] })
  ] });
}

// rn/UploadTile.tsx
import { jsx as jsx21, jsxs as jsxs18 } from "react/jsx-runtime";
function UploadTile({
  state = "idle",
  label = "Add a file",
  hint,
  fileName,
  fileMeta,
  progress = 0,
  errorMessage = "Upload failed",
  onPress,
  onRemove,
  onRetry,
  disabled
}) {
  const { theme } = useTheme();
  if (state === "idle") {
    return /* @__PURE__ */ jsxs18(
      Pressable13,
      {
        onPress,
        disabled,
        accessibilityRole: "button",
        accessibilityLabel: label,
        style: ({ pressed }) => ({
          alignItems: "center",
          gap: sp[2],
          padding: sp[6],
          borderWidth: 1.5,
          borderStyle: "dashed",
          borderColor: theme.borderStrong,
          borderRadius: r[3],
          backgroundColor: pressed ? theme.hoverOverlay : "transparent",
          opacity: disabled ? 0.4 : 1
        }),
        children: [
          /* @__PURE__ */ jsx21(View19, { style: {
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.bgSunken
          }, children: /* @__PURE__ */ jsx21(Icon, { name: "plus", size: icon.lg, color: theme.fgMuted }) }),
          /* @__PURE__ */ jsx21(Text17, { style: { fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: theme.fg }, children: label }),
          hint ? /* @__PURE__ */ jsx21(Text17, { style: { fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint }, children: hint }) : null
        ]
      }
    );
  }
  const isError = state === "error";
  return /* @__PURE__ */ jsxs18(View19, { style: {
    gap: sp[3],
    padding: sp[4],
    backgroundColor: theme.bgRaised,
    borderWidth: 1,
    borderColor: isError ? theme.dangerBorder : theme.border,
    borderRadius: r[3]
  }, children: [
    /* @__PURE__ */ jsxs18(View19, { style: { flexDirection: "row", alignItems: "center", gap: sp[3] }, children: [
      /* @__PURE__ */ jsx21(View19, { style: {
        width: 36,
        height: 36,
        borderRadius: r[2],
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isError ? theme.dangerSoft : theme.bgSunken
      }, children: /* @__PURE__ */ jsx21(Icon, { name: isError ? "warning" : "document", size: icon.lg, color: isError ? theme.danger : theme.fgMuted }) }),
      /* @__PURE__ */ jsxs18(View19, { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsx21(Text17, { numberOfLines: 1, style: { fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: theme.fg }, children: fileName ?? "File" }),
        /* @__PURE__ */ jsx21(Text17, { style: { fontFamily: font.mono, fontSize: fs[10], color: isError ? theme.danger : theme.fgFaint, marginTop: 2 }, children: state === "uploading" ? `Uploading\u2026 ${Math.round(progress)}%` : state === "uploaded" ? fileMeta ?? "Uploaded" : errorMessage })
      ] }),
      state === "uploaded" && /* @__PURE__ */ jsx21(View19, { style: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.accentSoft
      }, children: /* @__PURE__ */ jsx21(Icon, { name: "check", size: icon.md, color: theme.accentText }) }),
      onRemove && state !== "uploading" && /* @__PURE__ */ jsx21(
        Pressable13,
        {
          onPress: onRemove,
          accessibilityRole: "button",
          accessibilityLabel: "Remove file",
          hitSlop: 8,
          style: ({ pressed }) => ({
            width: 28,
            height: 28,
            borderRadius: 14,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pressed ? theme.hoverOverlay : "transparent"
          }),
          children: /* @__PURE__ */ jsx21(Icon, { name: "close", size: icon.md, color: theme.fgMuted })
        }
      )
    ] }),
    state === "uploading" && /* @__PURE__ */ jsx21(LinearProgress, { value: progress }),
    isError && onRetry && /* @__PURE__ */ jsx21(Button, { variant: "secondary", size: "sm", onPress: onRetry, children: "Try again" })
  ] });
}

// rn/Rating.tsx
import { View as View20, Pressable as Pressable14 } from "react-native";
import Svg3, { Path as Path2 } from "react-native-svg";
import { jsx as jsx22 } from "react/jsx-runtime";
var DIMS = { sm: 16, md: 24, lg: 32 };
function starPath(s) {
  const cx = s / 2, cy = s / 2, R = s * 0.46, ri = R * 0.42;
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5;
    const rr = i % 2 === 0 ? R : ri;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}
function Rating({ value, onChange, max = 5, size = "md" }) {
  const { theme } = useTheme();
  const dim = DIMS[size];
  const d = starPath(dim);
  return /* @__PURE__ */ jsx22(
    View20,
    {
      style: { flexDirection: "row", gap: sp[1] },
      accessibilityRole: onChange ? void 0 : "text",
      accessibilityLabel: `${value} of ${max} stars`,
      children: Array.from({ length: max }).map((_, i) => {
        const filled = i < value;
        const star = /* @__PURE__ */ jsx22(Svg3, { width: dim, height: dim, viewBox: `0 0 ${dim} ${dim}`, children: /* @__PURE__ */ jsx22(
          Path2,
          {
            d,
            fill: filled ? theme.signalBright : "none",
            stroke: filled ? theme.signalBright : theme.borderStrong,
            strokeWidth: 1.5,
            strokeLinejoin: "round"
          }
        ) });
        return onChange ? /* @__PURE__ */ jsx22(
          Pressable14,
          {
            onPress: () => onChange(i + 1),
            accessibilityRole: "button",
            accessibilityLabel: `${i + 1} star${i === 0 ? "" : "s"}`,
            hitSlop: 4,
            style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }),
            children: star
          },
          i
        ) : /* @__PURE__ */ jsx22(View20, { children: star }, i);
      })
    }
  );
}

// rn/Card.tsx
import { useState as useState8, useRef as useRef2, useCallback, useMemo } from "react";
import { View as View22, Text as Text19, Image, Pressable as Pressable16, I18nManager as I18nManager5 } from "react-native";
import Svg4, { Path as Path3 } from "react-native-svg";

// rn/Menu.tsx
import { View as View21, Text as Text18, Pressable as Pressable15, Modal as Modal2, I18nManager as I18nManager4, Dimensions } from "react-native";
import { jsx as jsx23, jsxs as jsxs19 } from "react/jsx-runtime";
function Menu({ visible, onClose, items, anchor }) {
  const { theme } = useTheme();
  const isRTL = I18nManager4.isRTL;
  const screenWidth = Dimensions.get("window").width;
  const positionStyle = anchor ? { top: anchor.y, right: screenWidth - anchor.x - sp[4] } : { top: 100, ...isRTL ? { left: sp[5] } : { right: sp[5] } };
  return /* @__PURE__ */ jsx23(Modal2, { transparent: true, visible, animationType: "fade", onRequestClose: onClose, children: /* @__PURE__ */ jsxs19(Pressable15, { style: { flex: 1 }, onPress: onClose, children: [
    /* @__PURE__ */ jsx23(View21, { style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(6,9,19,0.5)" } }),
    /* @__PURE__ */ jsx23(View21, { accessibilityRole: "menu", style: {
      position: "absolute",
      ...positionStyle,
      backgroundColor: theme.bgOverlay,
      borderRadius: r[3],
      borderWidth: 1,
      borderColor: theme.borderStrong,
      minWidth: 180,
      paddingVertical: sp[1],
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 16,
      shadowOpacity: 0.3,
      elevation: 8
    }, children: items.map((item, i) => /* @__PURE__ */ jsxs19(
      Pressable15,
      {
        accessibilityRole: "menuitem",
        onPress: () => {
          item.onPress();
          onClose();
        },
        style: ({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          gap: sp[3],
          paddingVertical: sp[3],
          paddingHorizontal: sp[4],
          backgroundColor: pressed ? theme.activeOverlay : "transparent"
        }),
        children: [
          item.icon,
          /* @__PURE__ */ jsx23(Text18, { style: {
            fontFamily: font.sans,
            fontSize: fs[14],
            fontWeight: fw[500],
            color: item.danger ? color.danger[300] : theme.fg
          }, children: item.label })
        ]
      },
      i
    )) })
  ] }) });
}

// rn/Card.tsx
import { Fragment as Fragment3, jsx as jsx24, jsxs as jsxs20 } from "react/jsx-runtime";
var CHECKBOX_SIZE = 20;
var fract = (n) => n - Math.floor(n);
var hash2 = (i, j, k) => fract(Math.abs(Math.sin(i * 127.1 + j * 311.7 + k * 74.7) * 43758.5453));
function FacetSpot({ w, h: h3, tint }) {
  const tris = useMemo(() => {
    const cell = 34;
    const cols = Math.ceil(w / cell);
    const rows = Math.ceil(h3 / cell);
    const f = (n) => Math.round(n * 10) / 10;
    const vx = (i, j) => {
      const px = i === 0 || i === cols ? i * cell : i * cell + (hash2(i, j, 1) - 0.5) * cell * 0.55;
      const py = j === 0 || j === rows ? j * cell : j * cell + (hash2(i, j, 2) - 0.5) * cell * 0.55;
      return [px, py];
    };
    const out = [];
    for (let i = 0; i < cols; i++) {
      const fade = Math.pow((i + 1) / cols, 2);
      for (let j = 0; j < rows; j++) {
        const a = vx(i, j), b = vx(i + 1, j), c = vx(i, j + 1), d = vx(i + 1, j + 1);
        const flip = hash2(i, j, 3) > 0.5;
        const t1 = flip ? [a, b, c] : [a, b, d];
        const t2 = flip ? [b, d, c] : [a, d, c];
        for (const [tri, k] of [[t1, 4], [t2, 5]]) {
          const shade = 0.05 + hash2(i, j, k) * 0.13;
          out.push({
            d: `M${f(tri[0][0])} ${f(tri[0][1])}L${f(tri[1][0])} ${f(tri[1][1])}L${f(tri[2][0])} ${f(tri[2][1])}Z`,
            o: shade * fade
          });
        }
      }
    }
    return out;
  }, [w, h3]);
  return /* @__PURE__ */ jsx24(Svg4, { width: w, height: h3, children: tris.map((t, i) => /* @__PURE__ */ jsx24(Path3, { d: t.d, fill: tint, fillOpacity: t.o }, i)) });
}
function KhatamSpot({ w, h: h3, tint }) {
  const columns = useMemo(() => {
    const tile = 48;
    const k = tile / 96;
    const f = (n) => Math.round(n * 10) / 10;
    const cols = Math.ceil(w / tile) + 1;
    const rows = Math.ceil(h3 / tile) + 1;
    const out = [];
    for (let i = 0; i < cols; i++) {
      let d = "";
      const tx = i * tile;
      for (let j = 0; j < rows; j++) {
        const ty = j * tile;
        d += `M${f(tx + 14 * k)} ${f(ty + 14 * k)}h${f(68 * k)}v${f(68 * k)}h${f(-68 * k)}Z`;
        d += `M${f(tx + 48 * k)} ${f(ty)}L${f(tx + 96 * k)} ${f(ty + 48 * k)}L${f(tx + 48 * k)} ${f(ty + 96 * k)}L${f(tx)} ${f(ty + 48 * k)}Z`;
      }
      const t = (i + 1) / cols;
      out.push({ d, o: t * t * 0.45 });
    }
    return out;
  }, [w, h3]);
  return /* @__PURE__ */ jsx24(Svg4, { width: w, height: h3, children: columns.map((c, i) => /* @__PURE__ */ jsx24(Path3, { d: c.d, fill: "none", stroke: tint, strokeOpacity: c.o, strokeWidth: 1.1, strokeLinejoin: "round" }, i)) });
}
function Card({ title, subtitle, meta, thumbnail, thumbnailRatio = "16:9", actions, selectable, selected: selectedProp, loading, spotlight, pattern, sizing = "auto", onPress, style }) {
  const { theme, mode } = useTheme();
  const spot = spotlight ? {
    // Terra spotlight fills use the clay ramp — Heat (#BC5A37) is a signal, not a surface.
    // Teal = Future teal (theme.intel), the brand's intelligent layer — not noon green.
    bg: spotlight === "terra" ? mode === "void" ? theme.terra : color.clay[400] : theme.intel,
    // Void surfaces (bright orange / mid teal) take ink; paper surfaces (deep clay / deep teal) take cream.
    fg: mode === "void" ? theme.accentFg : theme.fgInverse
  } : null;
  const selected = selectable ? !!selectedProp : false;
  const indent = selectable ? CHECKBOX_SIZE + sp[3] : 0;
  const [menuOpen, setMenuOpen] = useState8(false);
  const [menuAnchor, setMenuAnchor] = useState8({ x: sp[4], y: 100 });
  const moreRef = useRef2(null);
  const handleMorePress = useCallback(() => {
    moreRef.current?.measureInWindow((x, y, width, height) => {
      setMenuAnchor({ x, y: y + height + sp[1] });
      setMenuOpen(true);
    });
  }, []);
  const containerStyle = {
    backgroundColor: spot ? spot.bg : theme.bgRaised,
    borderRadius: r[2],
    borderWidth: 1,
    borderColor: spot ? selected ? spot.fg : "rgba(0,0,0,0.08)" : selected ? theme.accentBorder : theme.border,
    overflow: "hidden",
    opacity: loading ? 0.4 : 1,
    ...sizing === "fill" ? { flex: 1 } : sizing === "hug" ? { alignSelf: "flex-start" } : null,
    ...style
  };
  const showPattern = !!(spot && pattern);
  const [box, setBox] = useState8(null);
  const onLayout = showPattern ? (e) => {
    const { width, height } = e.nativeEvent.layout;
    setBox((prev) => prev && prev.w === width && prev.h === height ? prev : { w: width, h: height });
  } : void 0;
  const content = /* @__PURE__ */ jsxs20(Fragment3, { children: [
    showPattern && box && /* @__PURE__ */ jsx24(
      View22,
      {
        style: {
          position: "absolute",
          top: 0,
          bottom: 0,
          width: box.w * 0.6,
          [I18nManager5.isRTL ? "left" : "right"]: 0,
          // Mirror in RTL so the fade still runs away from the text side.
          transform: I18nManager5.isRTL ? [{ scaleX: -1 }] : void 0
        },
        pointerEvents: "none",
        children: spotlight === "terra" ? /* @__PURE__ */ jsx24(FacetSpot, { w: box.w * 0.6, h: box.h, tint: spot.fg }) : /* @__PURE__ */ jsx24(KhatamSpot, { w: box.w * 0.6, h: box.h, tint: spot.fg })
      }
    ),
    thumbnail && // Ratio lives on the wrapper — aspectRatio directly on Image loses to
    // the image's intrinsic size on react-native-web.
    /* @__PURE__ */ jsx24(View22, { style: { width: "100%", aspectRatio: thumbnailRatio === "1:1" ? 1 : 16 / 9, backgroundColor: theme.hoverOverlay }, children: /* @__PURE__ */ jsx24(
      Image,
      {
        source: thumbnail,
        style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" },
        resizeMode: "cover"
      }
    ) }),
    /* @__PURE__ */ jsxs20(View22, { style: { padding: sp[4], gap: sp[1] }, children: [
      /* @__PURE__ */ jsxs20(View22, { style: { flexDirection: "row", alignItems: "flex-start", gap: sp[3] }, children: [
        selectable && /* @__PURE__ */ jsx24(View22, { style: {
          width: CHECKBOX_SIZE,
          height: CHECKBOX_SIZE,
          borderRadius: r[1],
          borderWidth: 1.5,
          marginTop: 1,
          borderColor: spot ? spot.fg : selected ? theme.accent : theme.borderStrong,
          backgroundColor: selected ? spot ? spot.fg : theme.accent : "transparent",
          alignItems: "center",
          justifyContent: "center"
        }, children: selected && /* @__PURE__ */ jsx24(Icon, { name: "check", size: icon.sm, color: spot ? spot.bg : theme.accentFg }) }),
        /* @__PURE__ */ jsx24(Text19, { style: { fontFamily: font.sans, fontSize: fs[15], fontWeight: fw[600], color: spot ? spot.fg : theme.fg, flex: 1 }, numberOfLines: 2, children: title }),
        actions && actions.length > 0 && /* @__PURE__ */ jsx24(
          Pressable16,
          {
            onPress: (e) => {
              e.stopPropagation?.();
              handleMorePress();
            },
            hitSlop: 8,
            accessibilityRole: "button",
            accessibilityLabel: "More actions",
            style: { padding: sp[1] },
            children: /* @__PURE__ */ jsx24(View22, { ref: moreRef, collapsable: false, children: /* @__PURE__ */ jsx24(Icon, { name: "more-vertical", size: icon.lg, color: spot ? spot.fg : theme.fgMuted }) })
          }
        )
      ] }),
      subtitle && /* @__PURE__ */ jsx24(Text19, { style: { fontFamily: font.sans, fontSize: fs[13], color: spot ? spot.fg : theme.fgMuted, opacity: spot ? 0.85 : 1, marginStart: indent }, numberOfLines: 1, children: subtitle }),
      meta && /* @__PURE__ */ jsx24(Text19, { style: { fontFamily: font.mono, fontSize: fs[11], color: spot ? spot.fg : theme.fgFaint, opacity: spot ? 0.7 : 1, marginTop: sp[1], marginStart: indent }, children: meta })
    ] }),
    actions && actions.length > 0 && /* @__PURE__ */ jsx24(Menu, { visible: menuOpen, onClose: () => setMenuOpen(false), anchor: menuAnchor, items: actions.map((a) => ({ label: a.label, danger: a.danger, onPress: a.onPress })) })
  ] });
  if (onPress) {
    return /* @__PURE__ */ jsx24(
      Pressable16,
      {
        onPress,
        onLayout,
        accessibilityRole: selectable ? "checkbox" : "button",
        accessibilityState: selectable ? { checked: selected, disabled: !!loading } : loading ? { disabled: true } : void 0,
        accessibilityLabel: title,
        disabled: loading,
        style: ({ pressed }) => [containerStyle, pressed && { borderColor: theme.borderStrong }],
        children: content
      }
    );
  }
  return /* @__PURE__ */ jsx24(View22, { style: containerStyle, onLayout, children: content });
}

// rn/HeroCard.tsx
import { Text as Text20, Pressable as Pressable17, View as View23 } from "react-native";
import { Fragment as Fragment4, jsx as jsx25, jsxs as jsxs21 } from "react/jsx-runtime";
function HeroCard({ title, kicker, subtitle, meta, tone = "raised", sizing = "auto", onPress, style }) {
  const { theme, mode } = useTheme();
  const surface = {
    terra: {
      // Hero fills use the clay ramp, not the Heat signal — cream stays AA on the deep clay.
      bg: mode === "void" ? theme.terra : color.clay[400],
      fg: mode === "void" ? theme.accentFg : theme.fgInverse,
      border: "rgba(0,0,0,0.08)"
    },
    // Teal = Future teal (theme.intel), the brand's intelligent layer — not noon green.
    teal: {
      bg: theme.intel,
      fg: mode === "void" ? theme.accentFg : theme.fgInverse,
      // mid teal on ink → ink text; deep teal on fog → cream
      border: "rgba(0,0,0,0.08)"
    },
    raised: { bg: theme.bgRaised, fg: theme.fg, border: theme.border },
    sunken: { bg: theme.bgSunken, fg: theme.fg, border: theme.border }
  }[tone];
  const muted = tone === "raised" || tone === "sunken";
  const body = /* @__PURE__ */ jsxs21(Fragment4, { children: [
    kicker && /* @__PURE__ */ jsx25(Text20, { style: { fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], letterSpacing: 1, textTransform: "uppercase", color: surface.fg, opacity: muted ? 0.55 : 0.75 }, children: kicker }),
    /* @__PURE__ */ jsx25(Text20, { style: { fontFamily: font.serif, fontSize: fs[22], fontWeight: fw[600], color: surface.fg, marginTop: kicker ? sp[2] : 0 }, numberOfLines: 2, children: title }),
    subtitle && /* @__PURE__ */ jsx25(Text20, { style: { fontFamily: font.sans, fontSize: fs[13], color: muted ? theme.fgMuted : surface.fg, opacity: muted ? 1 : 0.85, marginTop: sp[1] }, numberOfLines: 2, children: subtitle }),
    meta && /* @__PURE__ */ jsx25(Text20, { style: { fontFamily: font.mono, fontSize: fs[11], color: muted ? theme.fgFaint : surface.fg, opacity: muted ? 1 : 0.7, marginTop: "auto", paddingTop: sp[3] }, children: meta })
  ] });
  const containerStyle = {
    backgroundColor: surface.bg,
    borderRadius: r[3],
    borderWidth: 1,
    borderColor: surface.border,
    padding: sp[5],
    minHeight: 140,
    ...sizing === "fill" ? { flex: 1 } : sizing === "hug" ? { alignSelf: "flex-start" } : null,
    ...style
  };
  if (onPress) {
    return /* @__PURE__ */ jsx25(
      Pressable17,
      {
        onPress,
        accessibilityRole: "button",
        accessibilityLabel: title,
        style: ({ pressed }) => [containerStyle, pressed && { borderColor: theme.borderStrong }],
        children: body
      }
    );
  }
  return /* @__PURE__ */ jsx25(View23, { style: containerStyle, children: body });
}

// rn/Chip.tsx
import { View as View24, Text as Text21, Pressable as Pressable18 } from "react-native";
import { Fragment as Fragment5, jsx as jsx26, jsxs as jsxs22 } from "react/jsx-runtime";
function Chip({ children, variant = "default", dismissable, dot, disabled, onPress, onDismiss }) {
  const { theme } = useTheme();
  const isAccent = variant === "accent";
  const containerStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: sp[2],
    height: 28,
    paddingHorizontal: sp[3],
    borderRadius: r[1],
    backgroundColor: isAccent ? theme.accentSoft : theme.selectedOverlay,
    borderWidth: 1,
    borderColor: isAccent ? theme.accentBorder : theme.border,
    opacity: disabled ? 0.4 : 1
  };
  const textColor = isAccent ? theme.accent : theme.fg;
  const textStyle = {
    fontFamily: font.sans,
    fontSize: fs[12],
    fontWeight: fw[500],
    color: textColor
  };
  const dotStyle = {
    width: icon.xs,
    height: icon.xs,
    borderRadius: icon.xs / 2,
    backgroundColor: textColor
  };
  const content = /* @__PURE__ */ jsxs22(Fragment5, { children: [
    dot && /* @__PURE__ */ jsx26(View24, { style: dotStyle }),
    /* @__PURE__ */ jsx26(Text21, { style: textStyle, children }),
    dismissable && !disabled && /* @__PURE__ */ jsx26(Pressable18, { onPress: onDismiss, hitSlop: 4, style: { marginLeft: sp[0.5], opacity: 0.6 }, accessibilityRole: "button", accessibilityLabel: `Remove ${children}`, children: /* @__PURE__ */ jsx26(Icon, { name: "close", size: icon.sm, color: textColor }) })
  ] });
  if (onPress && !disabled) {
    return /* @__PURE__ */ jsx26(Pressable18, { onPress, accessibilityRole: "button", style: ({ pressed }) => [containerStyle, pressed && { backgroundColor: theme.border }], children: content });
  }
  return /* @__PURE__ */ jsx26(View24, { style: containerStyle, children: content });
}

// rn/Avatar.tsx
import { View as View25, Text as Text22, Image as Image2 } from "react-native";
import { jsx as jsx27, jsxs as jsxs23 } from "react/jsx-runtime";
var sizes2 = { xs: 24, sm: 32, md: 40, lg: 56, xl: 72 };
var fontSizes2 = { xs: fs[11], sm: fs[13], md: fs[16], lg: fs[22], xl: fs[28] };
function Avatar({ initials, imageUri, size = "sm", color: color6 = "default", status }) {
  const { theme } = useTheme();
  const dim = sizes2[size];
  const bgMap = {
    default: theme.bgOverlay,
    noon: theme.accent,
    blue: color.blue[400]
  };
  const fgMap = {
    default: theme.fgMuted,
    noon: theme.accentFg,
    blue: color.chalk[100]
  };
  const containerStyle = {
    width: dim,
    height: dim,
    borderRadius: dim / 2,
    backgroundColor: bgMap[color6],
    alignItems: "center",
    justifyContent: "center",
    // CSS: box-shadow: inset 0 0 0 1px — approximated as borderWidth
    borderWidth: 1,
    borderColor: color6 === "default" ? theme.borderStrong : bgMap[color6],
    position: "relative"
  };
  const textStyle = {
    fontFamily: font.serif,
    fontSize: fontSizes2[size],
    fontWeight: fw[500],
    color: fgMap[color6]
  };
  const statusDim = Math.max(8, Math.round(dim * 0.28));
  const statusBorder = Math.max(2, Math.round(dim * 0.06));
  const statusStyle = {
    position: "absolute",
    right: -Math.round(statusBorder / 2),
    bottom: -Math.round(statusBorder / 2),
    width: statusDim,
    height: statusDim,
    borderRadius: statusDim / 2,
    backgroundColor: status === "online" ? theme.accent : color.danger[400],
    borderWidth: statusBorder,
    borderColor: theme.bg
  };
  return /* @__PURE__ */ jsxs23(View25, { style: containerStyle, children: [
    imageUri ? /* @__PURE__ */ jsx27(Image2, { source: { uri: imageUri }, style: { width: dim - 2, height: dim - 2, borderRadius: (dim - 2) / 2 } }) : /* @__PURE__ */ jsx27(Text22, { style: textStyle, children: initials }),
    status && /* @__PURE__ */ jsx27(View25, { style: statusStyle })
  ] });
}

// rn/AvatarGroup.tsx
import { View as View26, Text as Text23 } from "react-native";
import { jsx as jsx28, jsxs as jsxs24 } from "react/jsx-runtime";
var DIMS2 = { xs: 24, sm: 32, md: 40 };
var COUNT_FONT = { xs: fs[9], sm: fs[10], md: fs[11] };
function AvatarGroup({ items, max = 4, size = "sm", total }) {
  const { theme } = useTheme();
  const dim = DIMS2[size];
  const headcount = total ?? items.length;
  const shown = items.slice(0, headcount > max ? max - 1 : max);
  const rest = headcount - shown.length;
  const overlap = Math.round(dim / 3);
  const ring = { borderWidth: 2, borderColor: theme.bg, borderRadius: 999 };
  return /* @__PURE__ */ jsxs24(View26, { style: { flexDirection: "row", alignItems: "center" }, accessibilityLabel: `${headcount} people`, children: [
    shown.map((it, i) => /* @__PURE__ */ jsx28(View26, { style: [ring, { marginStart: i === 0 ? 0 : -overlap, zIndex: i + 1 }], children: /* @__PURE__ */ jsx28(Avatar, { initials: it.initials, imageUri: it.imageUri, size }) }, i)),
    rest > 0 && /* @__PURE__ */ jsx28(View26, { style: [ring, {
      marginStart: shown.length === 0 ? 0 : -overlap,
      zIndex: shown.length + 1,
      width: dim + 4,
      height: dim + 4,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.bgSunken
    }], children: /* @__PURE__ */ jsxs24(Text23, { style: { fontFamily: font.mono, fontSize: COUNT_FONT[size], fontWeight: fw[600], color: theme.fgMuted }, children: [
      "+",
      rest
    ] }) })
  ] });
}

// rn/StatCard.tsx
import { View as View27, Text as Text24, Pressable as Pressable19 } from "react-native";
import { Fragment as Fragment6, jsx as jsx29, jsxs as jsxs25 } from "react/jsx-runtime";
function StatCard({ label, value, unit, delta, deltaDirection = "flat", meta, sizing = "auto", onPress, style }) {
  const { theme } = useTheme();
  const deltaColor = deltaDirection === "up" ? theme.accentText : deltaDirection === "down" ? theme.terra : theme.fgMuted;
  const arrow = deltaDirection === "up" ? "\u2191 " : deltaDirection === "down" ? "\u2193 " : "";
  const body = /* @__PURE__ */ jsxs25(Fragment6, { children: [
    /* @__PURE__ */ jsx29(Text24, { style: { fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], letterSpacing: 1, textTransform: "uppercase", color: theme.fgFaint }, children: label }),
    /* @__PURE__ */ jsxs25(View27, { style: { flexDirection: "row", alignItems: "baseline", gap: sp[1], marginTop: sp[2] }, children: [
      /* @__PURE__ */ jsx29(Text24, { style: { fontFamily: font.serif, fontSize: fs[32], fontWeight: fw[600], color: theme.fg }, children: value }),
      unit ? /* @__PURE__ */ jsx29(Text24, { style: { fontFamily: font.sans, fontSize: fs[14], color: theme.fgMuted }, children: unit }) : null
    ] }),
    delta ? /* @__PURE__ */ jsxs25(Text24, { style: { fontFamily: font.mono, fontSize: fs[11], color: deltaColor, marginTop: sp[1] }, children: [
      arrow,
      delta
    ] }) : null,
    meta ? /* @__PURE__ */ jsx29(Text24, { style: { fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, marginTop: sp[2] }, children: meta }) : null
  ] });
  const base = {
    backgroundColor: theme.bgRaised,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: r[3],
    padding: sp[4],
    ...sizing === "fill" ? { flex: 1 } : sizing === "hug" ? { alignSelf: "flex-start" } : null
  };
  if (onPress) {
    return /* @__PURE__ */ jsx29(
      Pressable19,
      {
        onPress,
        accessibilityRole: "button",
        style: ({ pressed }) => [base, pressed && { backgroundColor: theme.hoverOverlay }, style],
        children: body
      }
    );
  }
  return /* @__PURE__ */ jsx29(View27, { style: [base, style], children: body });
}

// rn/Badge.tsx
import { View as View28, Text as Text25 } from "react-native";
import { jsx as jsx30 } from "react/jsx-runtime";
function Badge({ children, variant = "default" }) {
  const { theme } = useTheme();
  if (variant === "dot") {
    return /* @__PURE__ */ jsx30(View28, { style: { width: sp[2], height: sp[2], borderRadius: r.pill, backgroundColor: theme.fg } });
  }
  const bgMap = {
    default: theme.fg,
    accent: theme.accent,
    danger: color.danger[400]
  };
  const fgMap = {
    default: theme.fgInverse,
    accent: theme.accentFg,
    danger: color.chalk[100]
  };
  const containerStyle = {
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: r[4],
    backgroundColor: bgMap[variant],
    alignItems: "center",
    justifyContent: "center"
  };
  const textStyle = {
    fontFamily: font.mono,
    fontSize: fs[10],
    fontWeight: fw[500],
    color: fgMap[variant],
    lineHeight: 18
  };
  return /* @__PURE__ */ jsx30(View28, { style: containerStyle, children: /* @__PURE__ */ jsx30(Text25, { style: textStyle, children }) });
}

// rn/Table.tsx
import { useState as useState9, useMemo as useMemo2 } from "react";
import { View as View29, Text as Text26, ScrollView, Pressable as Pressable20 } from "react-native";
import { jsx as jsx31, jsxs as jsxs26 } from "react/jsx-runtime";
function normalizeColumns(cols) {
  if (cols.length === 0) return [];
  if (typeof cols[0] === "string") return cols.map((label, i) => ({ key: String(i), label }));
  return cols;
}
function normalizeRows(rows, cols) {
  if (rows.length === 0) return [];
  if (Array.isArray(rows[0])) return rows.map((row) => {
    const obj = {};
    cols.forEach((col, i) => {
      obj[col.key] = row[i] ?? "";
    });
    return obj;
  });
  return rows;
}
function Table({
  columns: columnsProp,
  rows: rowsProp,
  selectable,
  selected: selectedProp,
  onSelectionChange,
  onRowPress,
  sortKey: sortKeyProp,
  sortDir: sortDirProp,
  onSort,
  minWidth,
  actionBar
}) {
  const { theme } = useTheme();
  const columns = useMemo2(() => normalizeColumns(columnsProp), [columnsProp]);
  const rawRows = useMemo2(() => normalizeRows(rowsProp, columns), [rowsProp, columns]);
  const [intSortKey, setIntSortKey] = useState9();
  const [intSortDir, setIntSortDir] = useState9("asc");
  const sortKey = sortKeyProp ?? intSortKey;
  const sortDir = sortDirProp ?? intSortDir;
  const [intSelected, setIntSelected] = useState9([]);
  const selected = selectedProp ?? intSelected;
  const setSelected = onSelectionChange ?? setIntSelected;
  const rows = useMemo2(() => {
    if (!sortKey) return rawRows;
    const sorted = [...rawRows].sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      const numA = Number(av), numB = Number(bv);
      const cmp = !isNaN(numA) && !isNaN(numB) ? numA - numB : av.localeCompare(bv);
      return sortDir === "desc" ? -cmp : cmp;
    });
    return sorted;
  }, [rawRows, sortKey, sortDir]);
  function handleSort(key) {
    const newDir = sortKey === key && sortDir === "asc" ? "desc" : "asc";
    if (onSort) {
      onSort(key, newDir);
    } else {
      setIntSortKey(key);
      setIntSortDir(newDir);
    }
  }
  function toggleRow(idx) {
    const next = selected.includes(idx) ? selected.filter((i) => i !== idx) : [...selected, idx];
    setSelected(next);
  }
  function toggleAll() {
    setSelected(selected.length === rows.length ? [] : rows.map((_, i) => i));
  }
  const allSelected = rows.length > 0 && selected.length === rows.length;
  const cellPad = { paddingVertical: sp[3], paddingHorizontal: sp[3] };
  const headerTextStyle = { fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: theme.fgFaint, letterSpacing: 0.8, textTransform: "uppercase" };
  const bodyTextStyle = { fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted };
  const tableContent = /* @__PURE__ */ jsxs26(View29, { style: { minWidth }, children: [
    /* @__PURE__ */ jsxs26(View29, { style: { flexDirection: "row", backgroundColor: theme.bgOverlay, borderBottomWidth: 1, borderBottomColor: theme.border }, children: [
      selectable && /* @__PURE__ */ jsx31(View29, { style: { ...cellPad, width: 44, alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsx31(Checkbox, { checked: allSelected, indeterminate: selected.length > 0 && !allSelected, onValueChange: toggleAll }) }),
      columns.map((col) => {
        const isSorted = sortKey === col.key;
        const arrow = isSorted ? sortDir === "asc" ? " \u2191" : " \u2193" : "";
        return /* @__PURE__ */ jsx31(
          Pressable20,
          {
            onPress: col.sortable ? () => handleSort(col.key) : void 0,
            style: { ...cellPad, flex: col.width ? void 0 : 1, width: col.width, flexDirection: "row", alignItems: "center" },
            children: /* @__PURE__ */ jsxs26(Text26, { style: { ...headerTextStyle, textAlign: col.align || "left", color: isSorted ? theme.fg : theme.fgFaint }, children: [
              col.label,
              arrow
            ] })
          },
          col.key
        );
      })
    ] }),
    rows.map((row, ri) => {
      const isSelected = selected.includes(ri);
      return /* @__PURE__ */ jsxs26(
        Pressable20,
        {
          onPress: onRowPress ? () => onRowPress(row, ri) : void 0,
          style: {
            flexDirection: "row",
            borderBottomWidth: ri < rows.length - 1 ? 1 : 0,
            borderBottomColor: theme.divider,
            backgroundColor: isSelected ? theme.selectedOverlay : "transparent"
          },
          children: [
            selectable && /* @__PURE__ */ jsx31(View29, { style: { ...cellPad, width: 44, alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsx31(Checkbox, { checked: isSelected, onValueChange: () => toggleRow(ri) }) }),
            columns.map((col) => /* @__PURE__ */ jsx31(View29, { style: { ...cellPad, flex: col.width ? void 0 : 1, width: col.width }, children: col.render ? col.render(row[col.key] ?? "", row, ri) : /* @__PURE__ */ jsx31(Text26, { style: { ...bodyTextStyle, textAlign: col.align || "left" }, children: row[col.key] }) }, col.key))
          ]
        },
        ri
      );
    })
  ] });
  return /* @__PURE__ */ jsxs26(View29, { style: { borderRadius: r[2], borderWidth: 1, borderColor: theme.border, overflow: "hidden" }, children: [
    minWidth ? /* @__PURE__ */ jsx31(ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: { flexGrow: 0 }, children: tableContent }) : tableContent,
    selectable && selected.length > 0 && actionBar && /* @__PURE__ */ jsxs26(View29, { style: {
      flexDirection: "row",
      alignItems: "center",
      gap: sp[3],
      paddingVertical: sp[2],
      paddingHorizontal: sp[4],
      backgroundColor: theme.bgOverlay,
      borderTopWidth: 1,
      borderTopColor: theme.border
    }, children: [
      /* @__PURE__ */ jsxs26(Text26, { style: { fontFamily: font.mono, fontSize: fs[10], color: theme.fgMuted }, children: [
        selected.length,
        " selected"
      ] }),
      /* @__PURE__ */ jsx31(View29, { style: { flex: 1 } }),
      actionBar(selected.length)
    ] })
  ] });
}

// rn/Pagination.tsx
import { View as View30, Text as Text27 } from "react-native";
import { jsx as jsx32, jsxs as jsxs27 } from "react/jsx-runtime";
var BUFFER = 2;
var JUMP = 5;
function buildSlots(total, current) {
  if (total <= 3 + BUFFER * 2) {
    return Array.from({ length: total }, (_, i) => ({ type: "page", page: i + 1 }));
  }
  let left = Math.max(1, current - BUFFER);
  let right = Math.min(current + BUFFER, total);
  if (current - 1 <= BUFFER) right = 1 + BUFFER * 2;
  if (total - current <= BUFFER) left = total - BUFFER * 2;
  const slots = [];
  if (left > 1) slots.push({ type: "page", page: 1 });
  if (left > 2) slots.push({ type: "jump", dir: "prev" });
  for (let i = left; i <= right; i++) slots.push({ type: "page", page: i });
  if (right < total - 1) slots.push({ type: "jump", dir: "next" });
  if (right < total) slots.push({ type: "page", page: total });
  return slots;
}
function Pagination({ total, current, onPageChange }) {
  const { theme } = useTheme();
  if (total <= 1) return null;
  const slots = buildSlots(total, current);
  return /* @__PURE__ */ jsxs27(View30, { style: { flexDirection: "row", alignItems: "center", gap: sp[1] }, children: [
    current > 1 && /* @__PURE__ */ jsx32(IconButton, { variant: "ghost", size: "sm", onPress: () => onPageChange(current - 1), accessibilityLabel: "Previous page", children: /* @__PURE__ */ jsx32(Icon, { name: "chevron-left", size: 16, color: theme.fgMuted }) }),
    slots.map((slot, i) => {
      if (slot.type === "jump") {
        return /* @__PURE__ */ jsx32(
          IconButton,
          {
            variant: "ghost",
            size: "sm",
            onPress: () => onPageChange(Math.max(1, Math.min(total, current + (slot.dir === "prev" ? -JUMP : JUMP)))),
            accessibilityLabel: slot.dir === "prev" ? `Back ${JUMP} pages` : `Forward ${JUMP} pages`,
            children: /* @__PURE__ */ jsx32(Text27, { style: { fontFamily: font.mono, fontSize: fs[12], color: theme.fgFaint }, children: "\xB7\xB7\xB7" })
          },
          `j${slot.dir}`
        );
      }
      const active = slot.page === current;
      return /* @__PURE__ */ jsx32(
        IconButton,
        {
          variant: active ? "primary" : "ghost",
          size: "sm",
          onPress: () => onPageChange(slot.page),
          accessibilityLabel: `Page ${slot.page}`,
          children: /* @__PURE__ */ jsx32(Text27, { style: { fontFamily: font.mono, fontSize: fs[12], fontWeight: active ? fw[700] : fw[500], color: active ? theme.accentFg : theme.fgMuted }, children: slot.page })
        },
        slot.page
      );
    }),
    current < total && /* @__PURE__ */ jsx32(IconButton, { variant: "ghost", size: "sm", onPress: () => onPageChange(current + 1), accessibilityLabel: "Next page", children: /* @__PURE__ */ jsx32(Icon, { name: "chevron-right", size: 16, color: theme.fgMuted }) })
  ] });
}

// rn/Breadcrumbs.tsx
import { View as View31, Text as Text28, Pressable as Pressable21 } from "react-native";
import { jsx as jsx33, jsxs as jsxs28 } from "react/jsx-runtime";
function Breadcrumbs({ items }) {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsx33(View31, { style: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" }, accessibilityRole: "none", children: items.map((item, i) => {
    const isLast = i === items.length - 1;
    return /* @__PURE__ */ jsxs28(View31, { style: { flexDirection: "row", alignItems: "center" }, children: [
      i > 0 && /* @__PURE__ */ jsx33(Text28, { style: { fontFamily: font.mono, fontSize: fs[11], color: theme.fgFaint, marginHorizontal: sp[2] }, children: "/" }),
      isLast ? /* @__PURE__ */ jsx33(Text28, { style: { fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fg }, children: item.label }) : /* @__PURE__ */ jsx33(Pressable21, { onPress: item.onPress, hitSlop: 4, children: /* @__PURE__ */ jsx33(Text28, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }, children: item.label }) })
    ] }, i);
  }) });
}

// rn/Divider.tsx
import { View as View32 } from "react-native";
import { jsx as jsx34 } from "react/jsx-runtime";
function Divider() {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsx34(View32, { style: { height: 1, backgroundColor: theme.divider } });
}

// rn/Skeleton.tsx
import { useEffect as useEffect2 } from "react";
import Animated2, { useSharedValue as useSharedValue2, useAnimatedStyle as useAnimatedStyle2, withRepeat, withSequence, withTiming as withTiming2, cancelAnimation } from "react-native-reanimated";
import { jsx as jsx35 } from "react/jsx-runtime";
function Skeleton({ width = "100%", height = sp[4], circle, style }) {
  const { theme } = useTheme();
  const opacity = useSharedValue2(0.3);
  useEffect2(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming2(0.6, { duration: 800 }),
        withTiming2(0.3, { duration: 800 })
      ),
      -1
    );
    return () => cancelAnimation(opacity);
  }, []);
  const animatedStyle = useAnimatedStyle2(() => ({
    opacity: opacity.value
  }));
  const dim = circle ? typeof height === "number" ? height : 40 : void 0;
  return /* @__PURE__ */ jsx35(
    Animated2.View,
    {
      style: [
        {
          width: circle ? dim : width,
          height: circle ? dim : height,
          borderRadius: circle ? dim / 2 : r[2],
          backgroundColor: theme.border
        },
        animatedStyle,
        style
      ]
    }
  );
}

// rn/EmptyState.tsx
import { View as View33, Text as Text29 } from "react-native";
import { jsx as jsx36, jsxs as jsxs29 } from "react/jsx-runtime";
function EmptyState({ icon: icon3, title, body, actionLabel, onAction }) {
  const { theme } = useTheme();
  const containerStyle = {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: sp[10],
    paddingHorizontal: sp[6]
  };
  const titleStyle = {
    fontFamily: font.serif,
    fontSize: fs[18],
    fontWeight: fw[500],
    color: theme.fg,
    marginTop: icon3 ? sp[4] : 0,
    marginBottom: sp[2],
    textAlign: "center"
  };
  const bodyStyle = {
    fontFamily: font.sans,
    fontSize: fs[14],
    color: theme.fgMuted,
    lineHeight: fs[14] * 1.5,
    textAlign: "center",
    maxWidth: 280
  };
  return /* @__PURE__ */ jsxs29(View33, { style: containerStyle, children: [
    icon3,
    /* @__PURE__ */ jsx36(Text29, { style: titleStyle, children: title }),
    /* @__PURE__ */ jsx36(Text29, { style: bodyStyle, children: body }),
    actionLabel && onAction && /* @__PURE__ */ jsx36(View33, { style: { marginTop: sp[5] }, children: /* @__PURE__ */ jsx36(Button, { variant: "primary", onPress: onAction, children: actionLabel }) })
  ] });
}

// rn/StreakTracker.tsx
import { View as View34, Text as Text30 } from "react-native";
import { jsx as jsx37, jsxs as jsxs30 } from "react/jsx-runtime";
var D = 10;
function StreakTracker({ count, days, labels }) {
  const { theme } = useTheme();
  const diamond = (day) => {
    const base = { width: D, height: D, transform: [{ rotate: "45deg" }] };
    switch (day) {
      case "done":
        return { ...base, backgroundColor: theme.signal };
      case "today":
        return { ...base, borderWidth: 1.5, borderColor: theme.water };
      case "missed":
        return { ...base, borderWidth: 1, borderColor: theme.fgFaint, opacity: 0.5 };
      case "upcoming":
        return { ...base, borderWidth: 1, borderColor: theme.border, borderStyle: "dashed" };
    }
  };
  return /* @__PURE__ */ jsxs30(View34, { style: {
    flexDirection: "row",
    alignItems: "center",
    gap: sp[5],
    backgroundColor: theme.bgRaised,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: r[3],
    padding: sp[4]
  }, children: [
    /* @__PURE__ */ jsxs30(View34, { children: [
      /* @__PURE__ */ jsx37(Text30, { style: { fontFamily: font.serif, fontSize: fs[28], fontWeight: fw[600], color: theme.signalText }, children: count }),
      /* @__PURE__ */ jsx37(Text30, { style: { fontFamily: font.mono, fontSize: fs[9], letterSpacing: 1, textTransform: "uppercase", color: theme.fgFaint }, children: "day streak" })
    ] }),
    /* @__PURE__ */ jsx37(View34, { style: { flex: 1, flexDirection: "row", justifyContent: "space-between" }, children: days.map((day, i) => /* @__PURE__ */ jsxs30(View34, { style: { alignItems: "center", gap: sp[2], width: 20 }, children: [
      /* @__PURE__ */ jsx37(View34, { style: { height: D + 4, justifyContent: "center" }, children: /* @__PURE__ */ jsx37(View34, { style: diamond(day) }) }),
      labels?.[i] ? /* @__PURE__ */ jsx37(Text30, { style: { fontFamily: font.mono, fontSize: fs[9], color: theme.fgFaint }, children: labels[i] }) : null
    ] }, i)) })
  ] });
}

// rn/Calendar.tsx
import React14, { useState as useState10, useMemo as useMemo3, useRef as useRef3 } from "react";
import { View as View36, Text as Text32, Pressable as Pressable22, PanResponder, LayoutAnimation, Platform as Platform7, UIManager, I18nManager as I18nManager6 } from "react-native";

// rn/Waypoints.tsx
import React13, { useEffect as useEffect3 } from "react";
import { View as View35, Text as Text31 } from "react-native";
import Animated3, {
  useSharedValue as useSharedValue3,
  useAnimatedStyle as useAnimatedStyle3,
  withTiming as withTiming3,
  withRepeat as withRepeat2,
  withSequence as withSequence2,
  withDelay,
  Easing as Easing2,
  interpolate,
  cancelAnimation as cancelAnimation2
} from "react-native-reanimated";
import Svg5, { Path as Path4 } from "react-native-svg";
import { jsx as jsx38, jsxs as jsxs31 } from "react/jsx-runtime";
var DIAMOND_SIZE = 10;
function WaypointMarker({ state }) {
  const { theme } = useTheme();
  const isDone = state === "done" || state === "passed";
  const isCurrent = state === "current";
  const isArrived = state === "arrived";
  const isComplete = isDone || isArrived;
  const S2 = DIAMOND_SIZE;
  const ping = useSharedValue3(0);
  useEffect3(() => {
    if (!isCurrent) return;
    ping.value = withRepeat2(
      withSequence2(
        withTiming3(1, { duration: 1500, easing: Easing2.out(Easing2.ease) }),
        withTiming3(0, { duration: 0 }),
        withDelay(1e3, withTiming3(0, { duration: 0 }))
      ),
      -1
    );
    return () => {
      cancelAnimation2(ping);
    };
  }, [isCurrent]);
  const pingAnimStyle = useAnimatedStyle3(() => ({
    transform: [
      { rotate: "45deg" },
      { scale: interpolate(ping.value, [0, 1], [1, 2.8]) }
    ],
    opacity: interpolate(ping.value, [0, 0.2, 1], [0.6, 0.25, 0])
  }));
  return /* @__PURE__ */ jsxs31(View35, { style: { width: S2, height: S2, alignItems: "center", justifyContent: "center" }, children: [
    isCurrent && /* @__PURE__ */ jsx38(Animated3.View, { style: [{
      position: "absolute",
      width: S2,
      height: S2,
      backgroundColor: theme.signalBright
    }, pingAnimStyle] }),
    /* @__PURE__ */ jsxs31(View35, { style: {
      width: S2,
      height: S2,
      transform: [{ rotate: "45deg" }],
      backgroundColor: isArrived ? theme.accent : isDone ? theme.signalDim : isCurrent ? theme.signalBright : "transparent",
      borderWidth: !isComplete && !isCurrent ? 1 : 0,
      borderColor: theme.fgMuted,
      opacity: !isComplete && !isCurrent ? 0.55 : 1,
      alignItems: "center",
      justifyContent: "center"
    }, children: [
      isDone && /* @__PURE__ */ jsx38(View35, { style: { width: 4, height: 4, borderRadius: 2, backgroundColor: theme.bg } }),
      isArrived && /* @__PURE__ */ jsx38(View35, { style: { width: 0, height: 0, borderLeftWidth: 3, borderRightWidth: 3, borderBottomWidth: 5, borderLeftColor: "transparent", borderRightColor: "transparent", borderBottomColor: theme.bg, transform: [{ rotate: "-45deg" }], marginBottom: 1 } })
    ] })
  ] });
}
function Waypoints({ steps: stepsProp, labels, layout: layout2 = "horizontal" }) {
  const { theme } = useTheme();
  const steps = stepsProp.map((s, i) => i === stepsProp.length - 1 && (s === "done" || s === "passed") ? "arrived" : s);
  const n = steps.length;
  {
    let stepState2 = function(step) {
      const isDone = step === "done" || step === "passed";
      const isCurrent = step === "current";
      const isArrived = step === "arrived";
      return { isDone, isCurrent, isArrived, isComplete: isDone || isArrived };
    }, renderDiamond2 = function(step) {
      return /* @__PURE__ */ jsx38(WaypointMarker, { state: step });
    }, renderLine2 = function(prevDone, isVertical) {
      const lineColor = prevDone ? theme.signalDim : theme.signalBorder;
      if (prevDone) {
        return /* @__PURE__ */ jsx38(View35, { style: isVertical ? { width: 1, flex: 1, backgroundColor: lineColor } : { height: 1, width: "100%", backgroundColor: lineColor } });
      }
      return /* @__PURE__ */ jsx38(View35, { style: isVertical ? { width: 0, flex: 1, borderLeftWidth: 1, borderLeftColor: lineColor, borderStyle: "dashed" } : { height: 0, width: "100%", borderTopWidth: 1, borderTopColor: lineColor, borderStyle: "dashed" } });
    };
    var stepState = stepState2, renderDiamond = renderDiamond2, renderLine = renderLine2;
    const S2 = 10;
    if (layout2 === "horizontal" || !layout2) {
      const showAllLabels = labels && n <= 5;
      return /* @__PURE__ */ jsxs31(View35, { children: [
        /* @__PURE__ */ jsx38(View35, { style: { flexDirection: "row", alignItems: "flex-start", width: "100%", gap: 2, flexWrap: "nowrap", marginBottom: showAllLabels ? sp[5] : 0 }, children: steps.map((step, i) => {
          const prevDone = i > 0 && (steps[i - 1] === "done" || steps[i - 1] === "passed" || steps[i - 1] === "arrived");
          const { isDone, isCurrent, isArrived } = stepState2(step);
          const col = isArrived ? theme.accentText : isCurrent || isDone ? theme.signalText : theme.fgSubtle;
          return /* @__PURE__ */ jsxs31(React13.Fragment, { children: [
            i > 0 && (() => {
              return /* @__PURE__ */ jsx38(View35, { style: { flex: 1, justifyContent: "center", height: S2, paddingHorizontal: 2 }, children: renderLine2(prevDone) });
            })(),
            /* @__PURE__ */ jsxs31(View35, { style: { alignItems: "center", width: S2, overflow: "visible" }, children: [
              renderDiamond2(step),
              showAllLabels && /* @__PURE__ */ jsx38(Text31, { style: { fontFamily: font.mono, fontSize: fs[9], color: col, textAlign: "center", position: "absolute", top: S2 + sp[3] }, children: labels[i] })
            ] })
          ] }, i);
        }) }),
        labels && n > 5 && (() => {
          const idx = steps.findIndex((s) => s === "current" || s === "arrived");
          const pos = idx >= 0 ? idx + 1 : 1;
          const label = labels[idx >= 0 ? idx : 0] || "";
          return /* @__PURE__ */ jsxs31(Text31, { style: { fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, marginTop: sp[3] }, children: [
            "Step ",
            pos,
            " of ",
            n,
            " \xB7 ",
            /* @__PURE__ */ jsx38(Text31, { style: { color: theme.signalText }, children: label })
          ] });
        })()
      ] });
    }
    if (layout2 === "vertical") {
      const lineGap = 44;
      return /* @__PURE__ */ jsx38(View35, { children: steps.map((step, i) => {
        const prevDone = i > 0 && (steps[i - 1] === "done" || steps[i - 1] === "passed" || steps[i - 1] === "arrived");
        const { isDone, isCurrent, isArrived } = stepState2(step);
        const col = isArrived ? theme.accentText : isCurrent || isDone ? theme.signalText : theme.fgSubtle;
        return /* @__PURE__ */ jsxs31(React13.Fragment, { children: [
          i > 0 && (() => {
            return /* @__PURE__ */ jsx38(View35, { style: { height: lineGap, alignItems: "center", marginLeft: S2 / 2 - 0.5, width: 1, paddingVertical: 3 }, children: renderLine2(prevDone, true) });
          })(),
          /* @__PURE__ */ jsxs31(View35, { style: { flexDirection: "row", alignItems: "center", gap: sp[4] }, children: [
            renderDiamond2(step),
            labels && labels[i] && /* @__PURE__ */ jsx38(Text31, { style: { fontFamily: font.mono, fontSize: fs[10], color: col }, children: labels[i] })
          ] })
        ] }, i);
      }) });
    }
    if (layout2 === "path") {
      const w = 280, padY = 30;
      const totalH = n * 56;
      const pts = [];
      for (let i = 0; i < n; i++) {
        const t = n > 1 ? i / (n - 1) : 0;
        const y = totalH - padY - t * (totalH - padY * 2);
        const sway = Math.sin(t * Math.PI * 2) * 60;
        const x = w / 2 + sway;
        pts.push([x, y]);
      }
      return /* @__PURE__ */ jsxs31(View35, { style: { width: w }, children: [
        /* @__PURE__ */ jsx38(Svg5, { width: w, height: totalH, children: pts.map(([x1, y1], i) => {
          if (i >= n - 1) return null;
          const [x2, y2] = pts[i + 1];
          const dist = Math.hypot(x2 - x1, y2 - y1);
          const ux = (x2 - x1) / dist, uy = (y2 - y1) / dist;
          const gap = 12;
          const sx = x1 + ux * gap, sy = y1 + uy * gap;
          const ex = x2 - ux * gap, ey = y2 - uy * gap;
          const cpx1 = x1 + (x2 - x1) * 0.1, cpy1 = y1 + (y2 - y1) * 0.5;
          const cpx2 = x2 - (x2 - x1) * 0.1, cpy2 = y2 - (y2 - y1) * 0.5;
          const done = steps[i] === "passed" || steps[i] === "done" || steps[i] === "arrived";
          const d = `M${sx},${sy} C${cpx1},${cpy1} ${cpx2},${cpy2} ${ex},${ey}`;
          return done ? /* @__PURE__ */ jsx38(Path4, { d, fill: "none", stroke: theme.signal, strokeWidth: 1, strokeLinecap: "round" }, `p${i}`) : /* @__PURE__ */ jsx38(Path4, { d, fill: "none", stroke: theme.signalBorder, strokeWidth: 1, strokeDasharray: "4 3", strokeLinecap: "round" }, `p${i}`);
        }) }),
        pts.map(([x, y], i) => /* @__PURE__ */ jsx38(View35, { style: { position: "absolute", left: x - S2 / 2, top: y - S2 / 2 }, children: renderDiamond2(steps[i]) }, `d${i}`)),
        labels && pts.map(([x, y], i) => {
          const { isDone, isCurrent, isArrived } = stepState2(steps[i]);
          const col = isArrived ? theme.accentText : isCurrent || isDone ? theme.signalText : theme.fgSubtle;
          const onLeft = x > w / 2;
          return /* @__PURE__ */ jsx38(View35, { style: {
            position: "absolute",
            top: y - 7,
            left: onLeft ? void 0 : x + S2 + 6,
            right: onLeft ? w - x + S2 + 6 : void 0,
            flexDirection: "row",
            alignItems: "center",
            height: 14
          }, children: /* @__PURE__ */ jsx38(Text31, { style: { fontFamily: font.mono, fontSize: fs[10], color: col }, children: labels[i] }) }, `l${i}`);
        })
      ] });
    }
  }
  return null;
}

// rn/Calendar.tsx
import { jsx as jsx39, jsxs as jsxs32 } from "react/jsx-runtime";
if (Platform7.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
var EN_DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var EN_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var EN_FULL_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var AR_DAY_NAMES = ["\u0623\u062D\u062F", "\u0625\u062B\u0646", "\u062B\u0644\u0627", "\u0623\u0631\u0628", "\u062E\u0645\u064A", "\u062C\u0645\u0639", "\u0633\u0628\u062A"];
var AR_MONTHS = ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"];
var AR_FULL_DAYS = ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"];
var EN_LOCALE = { dayNames: EN_DAY_NAMES, months: EN_MONTHS, fullDays: EN_FULL_DAYS, weekStart: 0, today: "Today" };
var AR_LOCALE = { dayNames: AR_DAY_NAMES, months: AR_MONTHS, fullDays: AR_FULL_DAYS, weekStart: 0, today: "\u0627\u0644\u064A\u0648\u0645" };
var DAY_SIZE = 40;
function buildGrid(year, month, weekStart = 0) {
  const firstDow = new Date(year, month, 1).getDay();
  const offset = (firstDow - weekStart + 7) % 7;
  const dim = new Date(year, month + 1, 0).getDate();
  const prevDim = new Date(year, month, 0).getDate();
  const days = [];
  for (let i = offset - 1; i >= 0; i--) days.push({ d: prevDim - i, m: month - 1, y: year, outside: true });
  for (let d = 1; d <= dim; d++) days.push({ d, m: month, y: year, outside: false });
  while (days.length % 7 !== 0) days.push({ d: days.length - offset - dim + 1, m: month + 1, y: year, outside: true });
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return weeks;
}
function dateKey(d, m, y) {
  return `${y}-${m}-${d}`;
}
function Calendar({ selected: selectedProp, onSelect, events, expanded: expandedProp, onToggle, backIcon, onBack, rightAction, locale: localeProp, hideHeader }) {
  const { theme } = useTheme();
  const isRTL = I18nManager6.isRTL;
  const loc = localeProp === "ar" ? AR_LOCALE : localeProp || (isRTL ? AR_LOCALE : EN_LOCALE);
  const reorderedDayNames = useMemo3(() => {
    const arr = [...loc.dayNames];
    const start = loc.weekStart;
    return [...arr.slice(start), ...arr.slice(0, start)];
  }, [loc.dayNames, loc.weekStart]);
  const now = /* @__PURE__ */ new Date();
  const [internalSelected, setInternalSelected] = useState10(selectedProp || now);
  const [internalExpanded, setInternalExpanded] = useState10(false);
  const [viewMonth, setViewMonth] = useState10((selectedProp || now).getMonth());
  const [viewYear, setViewYear] = useState10((selectedProp || now).getFullYear());
  const sel = selectedProp || internalSelected;
  const isExpanded = expandedProp !== void 0 ? expandedProp : internalExpanded;
  React14.useEffect(() => {
    if (selectedProp) {
      setViewMonth(selectedProp.getMonth());
      setViewYear(selectedProp.getFullYear());
    }
  }, [selectedProp && selectedProp.getMonth(), selectedProp && selectedProp.getFullYear()]);
  const weeks = useMemo3(() => buildGrid(viewYear, viewMonth, loc.weekStart), [viewYear, viewMonth, loc.weekStart]);
  const activeWeekIdx = weeks.findIndex(
    (w) => w.some((d) => !d.outside && d.d === sel.getDate() && d.m === sel.getMonth() && d.y === sel.getFullYear())
  );
  const todayWeekIdx = weeks.findIndex(
    (w) => w.some((d) => !d.outside && d.d === now.getDate() && d.m === now.getMonth() && d.y === now.getFullYear())
  );
  const shownWeekIdx = Math.max(0, activeWeekIdx >= 0 ? activeWeekIdx : todayWeekIdx);
  const isToday = (d, m) => d === now.getDate() && m === now.getMonth() && viewYear === now.getFullYear();
  const isSelected = (d, m) => d === sel.getDate() && m === sel.getMonth() && viewYear === sel.getFullYear();
  function handleSelect(d, m) {
    const date = new Date(viewYear, m, d);
    if (onSelect) onSelect(date);
    else setInternalSelected(date);
    if (m < viewMonth) prev();
    else if (m > viewMonth) next();
  }
  function prev() {
    if (isExpanded) {
      const newMonth = viewMonth === 0 ? 11 : viewMonth - 1;
      const newYear = viewMonth === 0 ? viewYear - 1 : viewYear;
      setViewMonth(newMonth);
      setViewYear(newYear);
      const d = new Date(newYear, newMonth, 1);
      if (onSelect) onSelect(d);
      else setInternalSelected(d);
    } else {
      const d = new Date(sel.getFullYear(), sel.getMonth(), sel.getDate() - 1);
      if (onSelect) onSelect(d);
      else setInternalSelected(d);
      setViewMonth(d.getMonth());
      setViewYear(d.getFullYear());
    }
  }
  function next() {
    if (isExpanded) {
      const newMonth = viewMonth === 11 ? 0 : viewMonth + 1;
      const newYear = viewMonth === 11 ? viewYear + 1 : viewYear;
      setViewMonth(newMonth);
      setViewYear(newYear);
      const d = new Date(newYear, newMonth, 1);
      if (onSelect) onSelect(d);
      else setInternalSelected(d);
    } else {
      const d = new Date(sel.getFullYear(), sel.getMonth(), sel.getDate() + 1);
      if (onSelect) onSelect(d);
      else setInternalSelected(d);
      setViewMonth(d.getMonth());
      setViewYear(d.getFullYear());
    }
  }
  function goToday() {
    setViewMonth(now.getMonth());
    setViewYear(now.getFullYear());
    if (onSelect) onSelect(now);
    else setInternalSelected(now);
  }
  function toggle() {
    LayoutAnimation.configureNext(LayoutAnimation.create(200, "easeInEaseOut", "opacity"));
    if (onToggle) onToggle();
    else setInternalExpanded(!internalExpanded);
  }
  const panResponder = useRef3(PanResponder.create({
    onMoveShouldSetPanResponder: (_, gs) => Math.abs(gs.dy) > 5,
    onPanResponderRelease: (_, gs) => {
      if (gs.dy > 20) {
        LayoutAnimation.configureNext(LayoutAnimation.create(200, "easeInEaseOut", "opacity"));
        if (onToggle) onToggle();
        else setInternalExpanded(true);
      } else if (gs.dy < -20) {
        LayoutAnimation.configureNext(LayoutAnimation.create(200, "easeInEaseOut", "opacity"));
        if (onToggle) onToggle();
        else setInternalExpanded(false);
      }
    }
  })).current;
  const title = isExpanded ? `${loc.months[viewMonth]} ${viewYear}` : `${loc.fullDays[sel.getDay()]}, ${loc.months[sel.getMonth()]} ${sel.getDate()}`;
  const isTodaySelected = sel.getDate() === now.getDate() && sel.getMonth() === now.getMonth() && sel.getFullYear() === now.getFullYear();
  function renderDay(day, di) {
    const today = isToday(day.d, day.m);
    const selected = isSelected(day.d, day.m);
    const evt = events?.[dateKey(day.d, day.m, day.y)];
    const evtCount = evt?.count || 0;
    const isAssessment = evt?.assessment || false;
    const dayBg = selected ? theme.accent : today ? theme.accentSoft : "transparent";
    const dayFg = selected ? theme.accentFg : day.outside ? theme.fgFaint : today ? theme.accent : theme.fg;
    return /* @__PURE__ */ jsx39(
      Pressable22,
      {
        onPress: () => handleSelect(day.d, day.m),
        accessibilityRole: "button",
        accessibilityState: { selected },
        style: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          height: DAY_SIZE + sp[2]
        },
        children: /* @__PURE__ */ jsxs32(View36, { style: {
          width: DAY_SIZE,
          height: DAY_SIZE,
          borderRadius: DAY_SIZE / 2,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: dayBg,
          overflow: "visible"
        }, children: [
          /* @__PURE__ */ jsx39(Text32, { style: {
            fontFamily: font.sans,
            fontSize: fs[14],
            fontWeight: selected || today ? fw[600] : fw[400],
            color: dayFg
          }, children: day.d }),
          evtCount > 0 && (() => {
            const dayDate = new Date(day.y, day.m, day.d);
            const isPast = dayDate < new Date(now.getFullYear(), now.getMonth(), now.getDate());
            return /* @__PURE__ */ jsx39(View36, { style: { position: "absolute", top: 0, right: 0, overflow: "visible", zIndex: 10 }, children: /* @__PURE__ */ jsx39(WaypointMarker, { state: isPast ? "done" : "current" }) });
          })()
        ] })
      },
      di
    );
  }
  return /* @__PURE__ */ jsxs32(View36, { style: { borderBottomWidth: 1, borderBottomColor: theme.border }, children: [
    !hideHeader && /* @__PURE__ */ jsxs32(View36, { style: { flexDirection: "row", alignItems: "center", paddingHorizontal: sp[5], paddingVertical: sp[3], minHeight: 56, gap: sp[3] }, children: [
      onBack && /* @__PURE__ */ jsx39(Pressable22, { onPress: onBack, hitSlop: 8, accessibilityRole: "button", accessibilityLabel: "Back", children: backIcon || /* @__PURE__ */ jsx39(Icon, { name: isRTL ? "chevron-right" : "chevron-left", size: icon.lg, color: theme.fgMuted }) }),
      /* @__PURE__ */ jsx39(Text32, { style: { fontFamily: font.sans, fontSize: fs[16], fontWeight: fw[600], color: theme.fg, flex: 1 }, numberOfLines: 1, children: title }),
      /* @__PURE__ */ jsxs32(View36, { style: { flexDirection: "row", alignItems: "center", gap: sp[2] }, children: [
        !isTodaySelected && /* @__PURE__ */ jsx39(Button, { variant: "ghost", size: "sm", onPress: goToday, children: loc.today }),
        /* @__PURE__ */ jsx39(IconButton, { variant: "ghost", size: "sm", onPress: prev, accessibilityLabel: isExpanded ? "Previous month" : "Previous day", children: /* @__PURE__ */ jsx39(Icon, { name: isRTL ? "chevron-right" : "chevron-left", size: icon.md, color: theme.fgMuted }) }),
        /* @__PURE__ */ jsx39(IconButton, { variant: "ghost", size: "sm", onPress: next, accessibilityLabel: isExpanded ? "Next month" : "Next day", children: /* @__PURE__ */ jsx39(Icon, { name: isRTL ? "chevron-left" : "chevron-right", size: icon.md, color: theme.fgMuted }) }),
        rightAction
      ] })
    ] }),
    /* @__PURE__ */ jsx39(View36, { style: { flexDirection: "row", paddingHorizontal: sp[4] }, children: reorderedDayNames.map((d) => /* @__PURE__ */ jsx39(View36, { style: { flex: 1, alignItems: "center", paddingVertical: sp[1] }, children: /* @__PURE__ */ jsx39(Text32, { style: { fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, textTransform: "uppercase" }, children: d }) }, d)) }),
    /* @__PURE__ */ jsx39(View36, { style: { paddingHorizontal: sp[4], overflow: "visible", zIndex: 5 }, children: weeks.map((week, wi) => {
      if (!isExpanded && wi !== shownWeekIdx) return null;
      return /* @__PURE__ */ jsx39(View36, { style: { flexDirection: "row" }, children: week.map((day, di) => renderDay(day, di)) }, wi);
    }) }),
    /* @__PURE__ */ jsx39(View36, { ...panResponder.panHandlers, children: /* @__PURE__ */ jsx39(Pressable22, { onPress: toggle, style: { alignItems: "center", paddingVertical: sp[3] }, accessibilityRole: "button", accessibilityLabel: "Toggle calendar view", children: /* @__PURE__ */ jsx39(View36, { style: { width: sp[7], height: 3, borderRadius: 1.5, backgroundColor: theme.fgFaint, opacity: 0.4 } }) }) })
  ] });
}

// rn/Tabs.tsx
import { View as View37, Pressable as Pressable23, Text as Text33, ScrollView as ScrollView2 } from "react-native";
import { jsx as jsx40 } from "react/jsx-runtime";
function Tabs({ tabs, selected, onSelect }) {
  const { theme } = useTheme();
  const containerStyle = {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: theme.border
  };
  return /* @__PURE__ */ jsx40(ScrollView2, { horizontal: true, showsHorizontalScrollIndicator: false, children: /* @__PURE__ */ jsx40(View37, { accessibilityRole: "tablist", style: containerStyle, children: tabs.map((tab, i) => {
    const isOn = i === selected;
    const tabStyle = {
      paddingVertical: sp[3],
      paddingHorizontal: sp[4],
      borderBottomWidth: 2,
      borderBottomColor: isOn ? theme.accent : "transparent"
    };
    const txtStyle = {
      fontFamily: font.sans,
      fontSize: fs[12],
      fontWeight: fw[600],
      letterSpacing: 2,
      textTransform: "uppercase",
      color: isOn ? theme.fg : theme.fgSubtle
    };
    return /* @__PURE__ */ jsx40(Pressable23, { onPress: () => onSelect(i), style: tabStyle, accessibilityRole: "tab", accessibilityState: { selected: isOn }, children: /* @__PURE__ */ jsx40(Text33, { style: txtStyle, children: tab }) }, i);
  }) }) });
}

// rn/BottomAction.tsx
import { useContext as useContext2 } from "react";
import { View as View38, Text as Text34 } from "react-native";
import { SafeAreaInsetsContext as SafeAreaInsetsContext2 } from "react-native-safe-area-context";
import { jsx as jsx41, jsxs as jsxs33 } from "react/jsx-runtime";
function BottomAction({ icon: icon3, message, submessage, messageVariant = "default", primary, secondary }) {
  const { theme } = useTheme();
  const insets = useContext2(SafeAreaInsetsContext2) || { bottom: 0 };
  const verdict = messageVariant === "accent" || messageVariant === "danger";
  const messageColor = messageVariant === "accent" ? theme.accentText : messageVariant === "danger" ? theme.danger : theme.fg;
  return /* @__PURE__ */ jsx41(View38, { style: {
    paddingTop: sp[4],
    paddingBottom: Math.max(sp[4], insets.bottom),
    borderTopWidth: 1,
    borderTopColor: theme.border,
    backgroundColor: theme.bgOverlay,
    alignItems: "center"
  }, children: /* @__PURE__ */ jsxs33(View38, { style: { width: "100%", maxWidth: 600, paddingHorizontal: sp[5], gap: sp[3] }, children: [
    message && /* @__PURE__ */ jsxs33(View38, { style: { flexDirection: "row", alignItems: "flex-start", gap: sp[3] }, children: [
      icon3 && (verdict ? /* @__PURE__ */ jsx41(View38, { style: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: messageVariant === "accent" ? theme.accent : theme.danger
      }, children: /* @__PURE__ */ jsx41(Icon, { name: icon3, size: icon.lg, color: messageVariant === "accent" ? theme.accentFg : color.chalk[100] }) }) : /* @__PURE__ */ jsx41(Icon, { name: icon3, size: icon.lg, color: messageColor })),
      /* @__PURE__ */ jsxs33(View38, { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsx41(Text34, { style: { fontFamily: font.sans, fontSize: verdict ? fs[16] : fs[14], fontWeight: fw[600], color: messageColor, marginTop: verdict && icon3 ? 3 : 0 }, children: message }),
        submessage && /* @__PURE__ */ jsx41(Text34, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginTop: sp[0.5], lineHeight: fs[13] * 1.5 }, children: submessage })
      ] })
    ] }),
    /* @__PURE__ */ jsxs33(View38, { style: { gap: sp[3] }, children: [
      primary && /* @__PURE__ */ jsx41(Button, { variant: primary.variant || "primary", fullWidth: true, disabled: primary.disabled, onPress: primary.onPress, children: primary.label }),
      secondary && /* @__PURE__ */ jsx41(Button, { variant: secondary.variant || "secondary", fullWidth: true, disabled: secondary.disabled, onPress: secondary.onPress, children: secondary.label })
    ] })
  ] }) });
}

// rn/BottomNav.tsx
import React16, { useState as useState11 } from "react";
import { View as View39, Pressable as Pressable24, Text as Text35 } from "react-native";
import { SafeAreaInsetsContext as SafeAreaInsetsContext3 } from "react-native-safe-area-context";
import { Fragment as Fragment7, jsx as jsx42, jsxs as jsxs34 } from "react/jsx-runtime";
function BottomNav({ items, selected, onSelect, maxVisible = 4 }) {
  const { theme } = useTheme();
  const insets = React16.useContext(SafeAreaInsetsContext3) || { bottom: 0 };
  const [moreOpen, setMoreOpen] = useState11(false);
  const needsMore = items.length > maxVisible;
  const visibleItems = needsMore ? items.slice(0, maxVisible - 1) : items;
  const overflowItems = needsMore ? items.slice(maxVisible - 1) : [];
  const isOverflowSelected = needsMore && selected >= maxVisible - 1;
  const barPaddingBottom = Math.max(sp[4], insets.bottom);
  function renderIcon(item, clr) {
    return typeof item.icon === "string" ? /* @__PURE__ */ jsx42(Icon, { name: item.icon, size: icon.tab, color: clr }) : item.icon(clr, icon.tab);
  }
  function renderTab(item, index, isOn) {
    const iconColor = isOn ? theme.accent : theme.fgSubtle;
    return /* @__PURE__ */ jsxs34(Pressable24, { onPress: () => onSelect(index), style: { alignItems: "center", gap: sp[1], minWidth: 56, position: "relative" }, accessibilityRole: "tab", accessibilityState: { selected: isOn }, children: [
      isOn && /* @__PURE__ */ jsx42(View39, { style: { position: "absolute", top: -sp[3] - sp[1], width: sp[6], height: sp[0.5], backgroundColor: theme.accent, borderBottomLeftRadius: r[1], borderBottomRightRadius: r[1], alignSelf: "center" } }),
      renderIcon(item, iconColor),
      /* @__PURE__ */ jsx42(Text35, { style: { fontFamily: font.sans, fontSize: fs[11], fontWeight: fw[500], color: isOn ? theme.accent : theme.fgSubtle }, children: item.label }),
      item.badge != null && item.badge > 0 && /* @__PURE__ */ jsx42(View39, { style: { position: "absolute", top: 0, right: sp[1], minWidth: 16, height: 16, borderRadius: 8, backgroundColor: theme.danger, alignItems: "center", justifyContent: "center", paddingHorizontal: 4 }, children: /* @__PURE__ */ jsx42(Text35, { style: { fontFamily: font.mono, fontSize: fs[9], fontWeight: fw[500], color: color.chalk[100] }, children: item.badge }) })
    ] }, index);
  }
  return /* @__PURE__ */ jsxs34(View39, { style: { position: "relative" }, children: [
    moreOpen && needsMore && /* @__PURE__ */ jsxs34(Fragment7, { children: [
      /* @__PURE__ */ jsx42(Pressable24, { onPress: () => setMoreOpen(false), style: { position: "absolute", top: -9999, left: 0, right: 0, bottom: 0, height: 1e4 } }),
      /* @__PURE__ */ jsx42(View39, { style: {
        position: "absolute",
        bottom: "100%",
        left: 0,
        right: 0,
        backgroundColor: theme.bgOverlay,
        borderTopWidth: 1,
        borderTopColor: theme.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 8
      }, children: overflowItems.map((item, i) => {
        const realIndex = maxVisible - 1 + i;
        const isOn = realIndex === selected;
        return /* @__PURE__ */ jsxs34(
          Pressable24,
          {
            onPress: () => {
              onSelect(realIndex);
              setMoreOpen(false);
            },
            style: ({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              gap: sp[3],
              paddingVertical: sp[3],
              paddingHorizontal: sp[4],
              backgroundColor: isOn ? theme.activeOverlay : pressed ? theme.hoverOverlay : "transparent",
              borderBottomWidth: i < overflowItems.length - 1 ? 1 : 0,
              borderBottomColor: theme.divider
            }),
            children: [
              renderIcon(item, isOn ? theme.accent : theme.fgMuted),
              /* @__PURE__ */ jsx42(Text35, { style: { fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: isOn ? theme.accent : theme.fg, flex: 1 }, children: item.label }),
              item.badge != null && item.badge > 0 && /* @__PURE__ */ jsx42(View39, { style: { minWidth: 20, height: 20, borderRadius: 10, backgroundColor: theme.danger, alignItems: "center", justifyContent: "center", paddingHorizontal: 4 }, children: /* @__PURE__ */ jsx42(Text35, { style: { fontFamily: font.mono, fontSize: fs[9], color: color.chalk[100] }, children: item.badge }) })
            ]
          },
          realIndex
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs34(View39, { accessibilityRole: "tablist", style: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "flex-start",
      paddingTop: sp[3],
      paddingBottom: barPaddingBottom,
      backgroundColor: theme.bgOverlay,
      borderTopWidth: 1,
      borderTopColor: theme.border
    }, children: [
      visibleItems.map((item, i) => renderTab(item, i, i === selected)),
      needsMore && /* @__PURE__ */ jsxs34(Pressable24, { onPress: () => setMoreOpen(!moreOpen), style: { alignItems: "center", gap: sp[1], minWidth: 56, position: "relative" }, children: [
        isOverflowSelected && /* @__PURE__ */ jsx42(View39, { style: { position: "absolute", top: -sp[3] - sp[1], width: sp[6], height: sp[0.5], backgroundColor: theme.accent, borderBottomLeftRadius: r[1], borderBottomRightRadius: r[1], alignSelf: "center" } }),
        /* @__PURE__ */ jsx42(Icon, { name: "more", size: icon.tab, color: isOverflowSelected ? theme.accent : theme.fgSubtle }),
        /* @__PURE__ */ jsx42(Text35, { style: { fontFamily: font.sans, fontSize: fs[11], fontWeight: fw[500], color: isOverflowSelected ? theme.accent : theme.fgSubtle }, children: "More" }),
        overflowItems.some((it) => it.badge && it.badge > 0) && !moreOpen && /* @__PURE__ */ jsx42(View39, { style: { position: "absolute", top: 0, right: sp[1], width: 8, height: 8, borderRadius: 4, backgroundColor: theme.danger } })
      ] })
    ] })
  ] });
}

// rn/NavRail.tsx
import { View as View40, Text as Text36, Pressable as Pressable25, I18nManager as I18nManager7 } from "react-native";
import { jsx as jsx43, jsxs as jsxs35 } from "react/jsx-runtime";
function NavRail({ items, selected, onSelect, labels = true, header, footer }) {
  const { theme } = useTheme();
  const isRTL = I18nManager7.isRTL;
  return /* @__PURE__ */ jsxs35(View40, { style: {
    width: labels ? 84 : 64,
    backgroundColor: theme.bgRaised,
    [isRTL ? "borderLeftWidth" : "borderRightWidth"]: 1,
    [isRTL ? "borderLeftColor" : "borderRightColor"]: theme.border,
    alignItems: "center",
    paddingVertical: sp[5],
    gap: sp[2]
  }, children: [
    header && /* @__PURE__ */ jsx43(View40, { style: { marginBottom: sp[4] }, children: header }),
    /* @__PURE__ */ jsx43(View40, { accessibilityRole: "tablist", style: { flex: 1, alignItems: "center", gap: sp[1] }, children: items.map((item, i) => {
      const on = i === selected;
      const c = on ? theme.accent : theme.fgSubtle;
      return /* @__PURE__ */ jsxs35(
        Pressable25,
        {
          onPress: () => onSelect(i),
          accessibilityRole: "tab",
          accessibilityState: { selected: on },
          style: {
            alignItems: "center",
            justifyContent: "center",
            gap: sp[2],
            paddingVertical: sp[2],
            width: labels ? 68 : 44,
            height: labels ? void 0 : 44,
            borderRadius: r[2],
            backgroundColor: on ? theme.selectedOverlay : "transparent"
          },
          children: [
            typeof item.icon === "string" ? /* @__PURE__ */ jsx43(Icon, { name: item.icon, size: icon.tab, color: c }) : item.icon(c, icon.tab),
            labels && /* @__PURE__ */ jsx43(Text36, { style: { fontFamily: font.sans, fontSize: fs[11], fontWeight: fw[500], color: c }, children: item.label })
          ]
        },
        item.label
      );
    }) }),
    footer && /* @__PURE__ */ jsx43(View40, { style: { marginTop: sp[4] }, children: footer })
  ] });
}

// rn/NotificationBell.tsx
import { View as View41, Text as Text37, Pressable as Pressable26 } from "react-native";
import { jsx as jsx44, jsxs as jsxs36 } from "react/jsx-runtime";
function NotificationBell({ count = 0, onPress }) {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsxs36(
    Pressable26,
    {
      onPress,
      hitSlop: 8,
      accessibilityRole: "button",
      accessibilityLabel: count > 0 ? `Notifications \u2014 ${count} new` : "Notifications",
      style: { padding: sp[1] },
      children: [
        /* @__PURE__ */ jsx44(Icon, { name: "bell", size: icon.tab, color: theme.fgMuted }),
        count > 0 && /* @__PURE__ */ jsx44(View41, { style: {
          position: "absolute",
          top: -2,
          right: -4,
          minWidth: 16,
          height: 16,
          borderRadius: 8,
          backgroundColor: theme.danger,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 4
        }, children: /* @__PURE__ */ jsx44(Text37, { style: { fontFamily: font.mono, fontSize: fs[9], fontWeight: fw[500], color: color.chalk[100] }, children: count > 9 ? "9+" : count }) })
      ]
    }
  );
}

// rn/BackButton.tsx
import { Pressable as Pressable27, I18nManager as I18nManager8 } from "react-native";
import { jsx as jsx45 } from "react/jsx-runtime";
function BackButton({ onPress }) {
  const { theme } = useTheme();
  const isRTL = I18nManager8.isRTL;
  return /* @__PURE__ */ jsx45(
    Pressable27,
    {
      onPress,
      hitSlop: 8,
      accessibilityRole: "button",
      accessibilityLabel: "Back",
      style: ({ pressed }) => ({
        alignItems: "center",
        justifyContent: "center",
        minWidth: 40,
        minHeight: 40,
        borderRadius: r[2],
        backgroundColor: pressed ? theme.hoverOverlay : "transparent"
      }),
      children: /* @__PURE__ */ jsx45(Icon, { name: isRTL ? "chevron-right" : "chevron-left", size: icon.lg, color: theme.fg })
    }
  );
}

// rn/NoonMark.tsx
import Svg6, { Path as Path5 } from "react-native-svg";
import { jsx as jsx46, jsxs as jsxs37 } from "react/jsx-runtime";
function NoonMark({ size = 36 }) {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsxs37(Svg6, { width: size, height: size, viewBox: "46.2 20.7 23.2 23.2", fill: "none", children: [
    /* @__PURE__ */ jsx46(
      Path5,
      {
        d: "M57.2692 21.2108C51.415 21.2108 46.6638 25.962 46.6638 31.8162C46.6638 37.6704 51.415 42.4217 57.2692 42.4217C63.1234 42.4217 67.8747 37.6704 67.8747 31.8162C67.8747 25.962 63.1234 21.2108 57.2692 21.2108Z",
        fill: theme.accent
      }
    ),
    /* @__PURE__ */ jsx46(
      Path5,
      {
        d: "M57.0995 36.9068C60.3236 40.046 65.6263 40.046 68.8503 36.9068C69.3594 36.3978 68.511 35.7614 68.0868 36.2281C65.2869 38.9855 60.7478 38.9855 57.9056 36.2281C57.4389 35.7614 56.5905 36.3978 57.0995 36.9068Z",
        fill: theme.fg
      }
    )
  ] });
}

// rn/TitleBar.tsx
import { View as View42, Text as Text38, Pressable as Pressable28, I18nManager as I18nManager9 } from "react-native";
import { Fragment as Fragment8, jsx as jsx47, jsxs as jsxs38 } from "react/jsx-runtime";
function TitleBar({ title, subtitle, variant = "default", backIcon, onBack, rightAction }) {
  const { theme } = useTheme();
  const isLarge = variant === "large";
  const isTransparent = variant === "transparent" || variant === "overlay";
  const barStyle = {
    flexDirection: isLarge ? "column" : "row",
    alignItems: isLarge ? "flex-start" : "center",
    paddingHorizontal: sp[5],
    paddingVertical: sp[3],
    minHeight: isLarge ? 64 : 56,
    backgroundColor: isTransparent ? "transparent" : theme.bgOverlay,
    borderBottomWidth: isTransparent ? 0 : 1,
    borderBottomColor: theme.border,
    gap: isLarge ? sp[1] : sp[3]
  };
  const titleStyle = {
    fontFamily: isLarge ? font.serif : font.sans,
    fontSize: isLarge ? fs[20] : fs[16],
    fontWeight: isLarge ? fw[500] : fw[600],
    color: theme.fg,
    flex: isLarge ? void 0 : 1
  };
  const subStyle = {
    fontFamily: font.sans,
    fontSize: fs[12],
    color: theme.fgMuted
  };
  return /* @__PURE__ */ jsxs38(View42, { style: barStyle, children: [
    !isLarge && /* @__PURE__ */ jsxs38(Fragment8, { children: [
      onBack && /* @__PURE__ */ jsx47(Pressable28, { onPress: onBack, hitSlop: 8, accessibilityRole: "button", accessibilityLabel: "Back", children: backIcon || /* @__PURE__ */ jsx47(Icon, { name: I18nManager9.isRTL ? "chevron-right" : "chevron-left", size: icon.lg, color: theme.fgMuted }) }),
      /* @__PURE__ */ jsx47(Text38, { style: titleStyle, numberOfLines: 1, children: title }),
      rightAction
    ] }),
    isLarge && /* @__PURE__ */ jsxs38(Fragment8, { children: [
      /* @__PURE__ */ jsxs38(View42, { style: { flexDirection: "row", alignItems: "center", gap: sp[3], width: "100%" }, children: [
        onBack && /* @__PURE__ */ jsx47(Pressable28, { onPress: onBack, hitSlop: 8, accessibilityRole: "button", accessibilityLabel: "Back", children: backIcon || /* @__PURE__ */ jsx47(Icon, { name: I18nManager9.isRTL ? "chevron-right" : "chevron-left", size: icon.lg, color: theme.fgMuted }) }),
        /* @__PURE__ */ jsx47(View42, { style: { flex: 1 } }),
        rightAction
      ] }),
      /* @__PURE__ */ jsx47(Text38, { style: titleStyle, children: title }),
      subtitle && /* @__PURE__ */ jsx47(Text38, { style: subStyle, children: subtitle })
    ] })
  ] });
}

// rn/FilterBar.tsx
import { ScrollView as ScrollView3 } from "react-native";
import { jsx as jsx48 } from "react/jsx-runtime";
function FilterBar({ items, onToggle }) {
  return /* @__PURE__ */ jsx48(ScrollView3, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: sp[2], paddingHorizontal: sp[4] }, children: items.map((item, i) => /* @__PURE__ */ jsx48(
    Chip,
    {
      variant: item.active ? "accent" : "default",
      onPress: () => onToggle(i),
      children: item.label
    },
    i
  )) });
}

// rn/Alert.tsx
import { View as View43, Text as Text39 } from "react-native";
import { jsx as jsx49, jsxs as jsxs39 } from "react/jsx-runtime";
var VARIANT_ICON = {
  info: "info",
  success: "check",
  warn: "warning",
  danger: "error"
};
function Alert({ title, children, variant = "info", icon: icon3 }) {
  const { theme } = useTheme();
  const styles = {
    info: { bg: theme.bgRaised, border: theme.borderStrong, titleColor: theme.fg, iconColor: theme.fgMuted },
    success: { bg: theme.bgRaised, border: theme.accentBorder, titleColor: color.noon[400], iconColor: color.noon[400] },
    warn: { bg: theme.bgRaised, border: theme.signalBorder, titleColor: color.gold[300], iconColor: color.gold[300] },
    danger: { bg: theme.bgRaised, border: theme.dangerBorder, titleColor: color.danger[400], iconColor: color.danger[400] }
  };
  const s = styles[variant];
  return /* @__PURE__ */ jsxs39(View43, { accessibilityRole: "alert", style: {
    flexDirection: "row",
    gap: sp[3],
    paddingVertical: sp[4],
    paddingHorizontal: sp[4],
    borderRadius: r[2],
    backgroundColor: s.bg,
    borderWidth: 1,
    borderColor: s.border
  }, children: [
    /* @__PURE__ */ jsx49(Icon, { name: icon3 || VARIANT_ICON[variant], size: icon.lg, color: s.iconColor }),
    /* @__PURE__ */ jsxs39(View43, { style: { flex: 1 }, children: [
      title && /* @__PURE__ */ jsx49(Text39, { style: { fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[600], color: s.titleColor }, children: title }),
      /* @__PURE__ */ jsx49(Text39, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginTop: title ? sp[0.5] : 0, lineHeight: fs[13] * 1.5 }, children })
    ] })
  ] });
}

// rn/Toast.tsx
import React17, { useEffect as useEffect4, useRef as useRef4, useCallback as useCallback3 } from "react";
import { Text as Text40, Pressable as Pressable29 } from "react-native";
import Animated4, { useSharedValue as useSharedValue4, useAnimatedStyle as useAnimatedStyle4, withTiming as withTiming4, Easing as Easing3, runOnJS } from "react-native-reanimated";
import { SafeAreaInsetsContext as SafeAreaInsetsContext4 } from "react-native-safe-area-context";
import { jsx as jsx50, jsxs as jsxs40 } from "react/jsx-runtime";
function Toast({ message, variant = "info", visible, onDismiss, duration = 4e3 }) {
  const { theme } = useTheme();
  const insets = React17.useContext(SafeAreaInsetsContext4) || { top: 0 };
  const translateY = useSharedValue4(-40);
  const opacity = useSharedValue4(0);
  const shown = useRef4(false);
  const dismiss = useCallback3(() => {
    const config = { duration: dur[1], easing: Easing3.bezier(0.4, 0, 1, 1) };
    translateY.value = withTiming4(-40, config);
    opacity.value = withTiming4(0, config, () => {
      runOnJS(onDismiss)();
    });
  }, [onDismiss]);
  useEffect4(() => {
    if (visible && !shown.current) {
      shown.current = true;
      const config = { duration: dur[2], easing: Easing3.bezier(0.22, 0.61, 0.36, 1) };
      translateY.value = withTiming4(0, config);
      opacity.value = withTiming4(1, config);
      const timer = setTimeout(() => dismiss(), duration);
      return () => clearTimeout(timer);
    }
    if (!visible && shown.current) {
      shown.current = false;
      translateY.value = -40;
      opacity.value = 0;
    }
  }, [visible]);
  const animatedStyle = useAnimatedStyle4(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value
  }));
  if (!visible && !shown.current) return null;
  const styles = {
    info: { bg: theme.bgRaised, border: theme.borderStrong, iconCol: theme.fgMuted },
    success: { bg: theme.bgRaised, border: theme.accentBorder, iconCol: color.noon[400] },
    warn: { bg: theme.bgRaised, border: theme.signalBorder, iconCol: color.gold[300] },
    danger: { bg: theme.bgRaised, border: theme.dangerBorder, iconCol: color.danger[400] }
  };
  const s = styles[variant];
  const iconMap = { info: "info", success: "check", warn: "warning", danger: "error" };
  return /* @__PURE__ */ jsx50(Animated4.View, { accessibilityRole: "alert", accessibilityLiveRegion: "polite", style: [{
    position: "absolute",
    top: insets.top + sp[4],
    left: sp[4],
    right: sp[4],
    backgroundColor: s.bg,
    borderRadius: r[2],
    borderWidth: 1,
    borderColor: s.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    zIndex: 999
  }, animatedStyle], children: /* @__PURE__ */ jsxs40(
    Pressable29,
    {
      onPress: dismiss,
      accessibilityRole: "button",
      accessibilityLabel: "Dismiss",
      style: { flexDirection: "row", alignItems: "center", gap: sp[3], padding: sp[4] },
      children: [
        /* @__PURE__ */ jsx50(Icon, { name: iconMap[variant], size: icon.lg, color: s.iconCol }),
        /* @__PURE__ */ jsx50(Text40, { style: { fontFamily: font.sans, fontSize: fs[14], color: theme.fg, flex: 1 }, children: message })
      ]
    }
  ) });
}

// rn/ToastProvider.tsx
import { createContext as createContext2, useContext as useContext3, useState as useState12, useCallback as useCallback4, useRef as useRef5 } from "react";
import { jsx as jsx51, jsxs as jsxs41 } from "react/jsx-runtime";
var ToastContext = createContext2({ show: () => {
} });
function useToast() {
  return useContext3(ToastContext);
}
function ToastProvider({ children }) {
  const [current, setCurrent] = useState12(null);
  const [visible, setVisible] = useState12(false);
  const queue = useRef5([]);
  const showNext = useCallback4(() => {
    if (queue.current.length > 0) {
      const next = queue.current.shift();
      setCurrent(next);
      setVisible(true);
    }
  }, []);
  const show = useCallback4((options) => {
    if (visible) {
      queue.current.push(options);
    } else {
      setCurrent(options);
      setVisible(true);
    }
  }, [visible]);
  const handleDismiss = useCallback4(() => {
    setVisible(false);
    setCurrent(null);
    setTimeout(showNext, dur[1]);
  }, [showNext]);
  return /* @__PURE__ */ jsxs41(ToastContext.Provider, { value: { show }, children: [
    children,
    current && /* @__PURE__ */ jsx51(
      Toast,
      {
        message: current.message,
        variant: current.variant,
        duration: current.duration,
        visible,
        onDismiss: handleDismiss
      }
    )
  ] });
}

// rn/Dialog.tsx
import { useEffect as useEffect5 } from "react";
import { View as View45, Text as Text41, Modal as Modal3, Pressable as Pressable30, KeyboardAvoidingView as KeyboardAvoidingView2, Platform as Platform8 } from "react-native";
import Animated5, { useSharedValue as useSharedValue5, useAnimatedStyle as useAnimatedStyle5, withTiming as withTiming5, Easing as Easing4 } from "react-native-reanimated";
import { jsx as jsx52, jsxs as jsxs42 } from "react/jsx-runtime";
function Dialog({ visible, onClose, title, body, primaryLabel = "Confirm", secondaryLabel = "Cancel", onPrimary, onSecondary, danger }) {
  const { theme } = useTheme();
  const scale = useSharedValue5(0.92);
  const contentOpacity = useSharedValue5(0);
  useEffect5(() => {
    if (visible) {
      scale.value = 0.92;
      contentOpacity.value = 0;
      const config = { duration: dur[2], easing: Easing4.bezier(0.22, 0.61, 0.36, 1) };
      scale.value = withTiming5(1, config);
      contentOpacity.value = withTiming5(1, config);
    }
  }, [visible]);
  const animatedStyle = useAnimatedStyle5(() => ({
    transform: [{ scale: scale.value }],
    opacity: contentOpacity.value
  }));
  return /* @__PURE__ */ jsx52(Modal3, { visible, transparent: true, animationType: "fade", onRequestClose: onClose, accessibilityViewIsModal: true, children: /* @__PURE__ */ jsx52(KeyboardAvoidingView2, { style: { flex: 1 }, behavior: Platform8.OS === "ios" ? "padding" : void 0, children: /* @__PURE__ */ jsx52(Pressable30, { style: { flex: 1, backgroundColor: "rgba(6,9,19,0.75)", justifyContent: "center", alignItems: "center", padding: sp[7] }, onPress: onClose, children: /* @__PURE__ */ jsx52(Animated5.View, { style: [{ width: "100%", maxWidth: 360 }, animatedStyle], children: /* @__PURE__ */ jsxs42(
    Pressable30,
    {
      accessibilityRole: "none",
      style: {
        backgroundColor: theme.bgRaised,
        borderRadius: r[3],
        padding: sp[7],
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 24,
        elevation: 8
      },
      onPress: (e) => e.stopPropagation(),
      children: [
        /* @__PURE__ */ jsx52(Text41, { style: { fontFamily: font.serif, fontSize: fs[24], fontWeight: fw[500], color: theme.fg, marginBottom: sp[2] }, children: title }),
        body && /* @__PURE__ */ jsx52(Text41, { style: { fontFamily: font.sans, fontSize: fs[14], color: theme.fgMuted, lineHeight: fs[14] * 1.5, marginBottom: sp[5] }, children: body }),
        /* @__PURE__ */ jsxs42(View45, { style: { gap: sp[3] }, children: [
          /* @__PURE__ */ jsx52(Button, { fullWidth: true, variant: danger ? "danger" : "primary", onPress: onPrimary || onClose, children: primaryLabel }),
          /* @__PURE__ */ jsx52(Button, { fullWidth: true, variant: "ghost", onPress: onSecondary || onClose, children: secondaryLabel })
        ] })
      ]
    }
  ) }) }) }) });
}

// rn/FullSheet.tsx
import React20 from "react";
import { View as View46, Text as Text42, Pressable as Pressable31, Modal as Modal4, ScrollView as ScrollView4 } from "react-native";
import { SafeAreaProvider, SafeAreaInsetsContext as SafeAreaInsetsContext5 } from "react-native-safe-area-context";
import { jsx as jsx53, jsxs as jsxs43 } from "react/jsx-runtime";
function FullSheetContent({ onClose, title, closeLabel, children, footer }) {
  const { theme } = useTheme();
  const insets = React20.useContext(SafeAreaInsetsContext5) || { top: 0, bottom: 0 };
  return /* @__PURE__ */ jsxs43(View46, { style: { flex: 1, backgroundColor: theme.bg, paddingTop: insets.top }, children: [
    /* @__PURE__ */ jsxs43(View46, { style: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: sp[5], paddingVertical: sp[3], borderBottomWidth: 1, borderBottomColor: theme.divider }, children: [
      /* @__PURE__ */ jsx53(Text42, { style: { fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: theme.fg, flex: 1 }, numberOfLines: 1, children: title }),
      /* @__PURE__ */ jsx53(Pressable31, { onPress: onClose, hitSlop: 8, accessibilityRole: "button", accessibilityLabel: "Close", children: /* @__PURE__ */ jsx53(Text42, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgSubtle }, children: closeLabel || "Close" }) })
    ] }),
    /* @__PURE__ */ jsx53(ScrollView4, { style: { flex: 1 }, contentContainerStyle: { paddingHorizontal: sp[5], paddingTop: sp[5], paddingBottom: footer ? sp[10] : sp[5] + insets.bottom }, children }),
    footer
  ] });
}
function FullSheet({ visible, onClose, title, closeLabel, children, footer }) {
  if (!visible) return null;
  return /* @__PURE__ */ jsx53(Modal4, { visible, animationType: "slide", onRequestClose: onClose, children: /* @__PURE__ */ jsx53(SafeAreaProvider, { children: /* @__PURE__ */ jsx53(FullSheetContent, { onClose, title, closeLabel, footer, children }) }) });
}

// rn/Tooltip.tsx
import { useState as useState13, useRef as useRef6, useCallback as useCallback5 } from "react";
import { View as View47, Text as Text43, Pressable as Pressable32, Platform as Platform9 } from "react-native";
import { jsx as jsx54, jsxs as jsxs44 } from "react/jsx-runtime";
function Tooltip({ text, children }) {
  const { theme } = useTheme();
  const [visible, setVisible] = useState13(false);
  const [triggerWidth, setTriggerWidth] = useState13(0);
  const tipWidth = Math.max(100, Math.min(200, text.length * 7 + 24));
  const hideTimer = useRef6(null);
  const onLayout = useCallback5((e) => {
    setTriggerWidth(e.nativeEvent.layout.width);
  }, []);
  const show = useCallback5(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setVisible(true);
  }, []);
  const hide = useCallback5(() => {
    hideTimer.current = setTimeout(() => setVisible(false), 150);
  }, []);
  const autoHide = useCallback5(() => {
    hideTimer.current = setTimeout(() => setVisible(false), 3e3);
  }, []);
  const webHover = Platform9.OS === "web" ? {
    onMouseEnter: show,
    onMouseLeave: hide
  } : {};
  return /* @__PURE__ */ jsxs44(View47, { style: { position: "relative" }, onLayout, ...webHover, children: [
    /* @__PURE__ */ jsx54(
      Pressable32,
      {
        onLongPress: () => {
          show();
          autoHide();
        },
        onPressOut: Platform9.OS !== "web" ? () => setVisible(false) : void 0,
        accessibilityRole: "button",
        children
      }
    ),
    visible && /* @__PURE__ */ jsxs44(
      View47,
      {
        accessibilityRole: "tooltip",
        ...Platform9.OS === "web" ? { onMouseEnter: show, onMouseLeave: hide } : {},
        style: {
          position: "absolute",
          bottom: "100%",
          left: (triggerWidth - tipWidth) / 2,
          marginBottom: sp[2],
          backgroundColor: theme.fg,
          borderRadius: r[2],
          paddingVertical: sp[2],
          paddingHorizontal: sp[3],
          width: tipWidth,
          alignItems: "center",
          zIndex: 100
        },
        children: [
          /* @__PURE__ */ jsx54(Text43, { style: { fontFamily: font.mono, fontSize: fs[11], color: theme.bg, textAlign: "center" }, children: text }),
          /* @__PURE__ */ jsx54(View47, { style: { position: "absolute", bottom: -sp[1], alignSelf: "center", width: sp[2], height: sp[2], backgroundColor: theme.fg, transform: [{ rotate: "45deg" }] } })
        ]
      }
    )
  ] });
}

// rn/SessionBar.tsx
import { useMemo as useMemo4, useState as useState14, useEffect as useEffect6 } from "react";
import { View as View48, Text as Text44 } from "react-native";
import { jsx as jsx55, jsxs as jsxs45 } from "react/jsx-runtime";
var heights2 = { sm: sp[1], md: sp[1], lg: sp[2] };
function SessionBar({ segments, size = "md", pageSize = 10 }) {
  const { theme } = useTheme();
  const totalPages = Math.ceil(segments.length / pageSize);
  const needsPaging = totalPages > 1;
  const currentIdx = segments.indexOf("current");
  const autoPage = currentIdx >= 0 ? Math.floor(currentIdx / pageSize) : 0;
  const [page, setPage] = useState14(autoPage);
  useEffect6(() => {
    setPage(autoPage);
  }, [autoPage]);
  const start = page * pageSize;
  const visibleSegs = useMemo4(() => segments.slice(start, start + pageSize), [segments, start, pageSize]);
  const canPrev = page > 0;
  const canNext = page < totalPages - 1;
  function segColor(state) {
    switch (state) {
      case "correct":
        return theme.accent;
      case "incorrect":
        return theme.danger;
      case "current":
        return theme.water;
      default:
        return theme.border;
    }
  }
  const h3 = heights2[size];
  const questionLabel = currentIdx >= 0 ? `${currentIdx + 1} of ${segments.length}` : `${segments.length}`;
  return /* @__PURE__ */ jsx55(View48, { children: /* @__PURE__ */ jsxs45(View48, { style: { flexDirection: "row", alignItems: "center", gap: sp[2] }, children: [
    needsPaging && canPrev && /* @__PURE__ */ jsx55(IconButton, { variant: "ghost", size: "sm", onPress: () => setPage((p) => p - 1), accessibilityLabel: "Previous questions", children: /* @__PURE__ */ jsx55(Icon, { name: "chevron-left", size: 14, color: theme.fgMuted }) }),
    /* @__PURE__ */ jsx55(View48, { style: { flex: 1, flexDirection: "row", gap: sp[0.5], height: h3 }, children: visibleSegs.map((s, i) => /* @__PURE__ */ jsx55(View48, { style: { flex: 1, borderRadius: r[1], backgroundColor: segColor(s) } }, start + i)) }),
    needsPaging && canNext && /* @__PURE__ */ jsx55(IconButton, { variant: "ghost", size: "sm", onPress: () => setPage((p) => p + 1), accessibilityLabel: "Next questions", children: /* @__PURE__ */ jsx55(Icon, { name: "chevron-right", size: 14, color: theme.fgMuted }) }),
    /* @__PURE__ */ jsx55(Text44, { style: { fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: theme.fgFaint, minWidth: 28, textAlign: "right" }, children: questionLabel })
  ] }) });
}

// rn/Timer.tsx
import { useEffect as useEffect7, useRef as useRef7, useState as useState15 } from "react";
import { View as View49, Text as Text45 } from "react-native";
import { jsx as jsx56 } from "react/jsx-runtime";
var FONT = { sm: fs[13], md: fs[18], lg: fs[28] };
function fmt(total) {
  const t = Math.max(0, total);
  const h3 = Math.floor(t / 3600);
  const m = Math.floor(t % 3600 / 60);
  const s = t % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h3 > 0 ? `${h3}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}
function Timer({ seconds, running = true, warnAt = 10, onComplete, size = "md", variant = "plain" }) {
  const { theme } = useTheme();
  const [remaining, setRemaining] = useState15(seconds);
  const done = useRef7(false);
  useEffect7(() => {
    setRemaining(seconds);
    done.current = false;
  }, [seconds]);
  useEffect7(() => {
    if (!running || remaining <= 0) return;
    const id = setInterval(() => setRemaining((v) => v - 1), 1e3);
    return () => clearInterval(id);
  }, [running, remaining > 0]);
  useEffect7(() => {
    if (remaining <= 0 && !done.current) {
      done.current = true;
      onComplete?.();
    }
  }, [remaining]);
  const warn = remaining <= warnAt;
  const digits = /* @__PURE__ */ jsx56(Text45, { style: {
    fontFamily: font.mono,
    fontSize: FONT[size],
    fontWeight: fw[600],
    color: warn ? theme.terra : theme.fg,
    fontVariant: ["tabular-nums"]
  }, children: fmt(remaining) });
  if (variant === "pill") {
    return /* @__PURE__ */ jsx56(View49, { style: {
      flexDirection: "row",
      paddingHorizontal: sp[3],
      paddingVertical: sp[1],
      borderRadius: 999,
      borderWidth: 1,
      backgroundColor: warn ? theme.terraSoft : theme.bgSunken,
      borderColor: warn ? theme.terraBorder : theme.border
    }, children: digits });
  }
  return digits;
}

// rn/SessionCard.tsx
import { View as View50, Text as Text46, Pressable as Pressable33 } from "react-native";
import { jsx as jsx57, jsxs as jsxs46 } from "react/jsx-runtime";
function SessionCard({ time, title, meta, state = "upcoming", statusText, assessment, onPress }) {
  const { theme } = useTheme();
  const indicatorColor = {
    upcoming: theme.border,
    soon: theme.signalBright,
    live: theme.accent,
    done: theme.fgFaint,
    cancelled: theme.danger
  };
  const containerStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: sp[4],
    paddingVertical: sp[4],
    paddingHorizontal: sp[5],
    borderBottomWidth: 1,
    borderBottomColor: theme.divider
  };
  const timeStyle = {
    fontFamily: font.mono,
    fontSize: fs[12],
    color: theme.fgFaint,
    minWidth: 40
  };
  const isDoneAssessment = assessment && (state === "done" || state === "cancelled");
  function renderIndicator() {
    if (assessment) {
      return /* @__PURE__ */ jsx57(WaypointMarker, { state: isDoneAssessment ? "done" : "current" });
    }
    return /* @__PURE__ */ jsx57(View50, { style: {
      width: sp[1],
      height: sp[1],
      borderRadius: r.pill,
      backgroundColor: indicatorColor[state]
    } });
  }
  const titleStyle = {
    fontFamily: font.sans,
    fontSize: fs[14],
    fontWeight: fw[500],
    color: state === "done" ? theme.fgMuted : theme.fg
  };
  const metaStyle = {
    fontFamily: font.sans,
    fontSize: fs[12],
    color: theme.fgFaint,
    marginTop: sp[0.5]
  };
  function renderStatus() {
    if (state === "live") return /* @__PURE__ */ jsxs46(View50, { style: { flexDirection: "row", alignItems: "center", gap: sp[2], height: 28, paddingHorizontal: sp[3], borderRadius: r[1], backgroundColor: theme.signalSoft, borderWidth: 1, borderColor: theme.signalBorder }, children: [
      /* @__PURE__ */ jsx57(View50, { style: { width: icon.xs, height: icon.xs, borderRadius: icon.xs / 2, backgroundColor: theme.signalBright } }),
      /* @__PURE__ */ jsx57(Text46, { style: { fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: theme.signalText }, children: "Live" })
    ] });
    if (state === "soon") return /* @__PURE__ */ jsx57(Text46, { style: { fontFamily: font.mono, fontSize: fs[12], color: theme.signalText }, children: "Soon" });
    if (state === "done") return /* @__PURE__ */ jsx57(Text46, { style: { fontFamily: font.mono, fontSize: fs[12], color: theme.fgMuted }, children: "Ended" });
    if (state === "cancelled") return /* @__PURE__ */ jsx57(Text46, { style: { fontFamily: font.mono, fontSize: fs[12], color: theme.danger }, children: "Cancelled" });
    return /* @__PURE__ */ jsx57(Text46, { style: { fontFamily: font.mono, fontSize: fs[12], color: theme.fgMuted }, children: statusText || "" });
  }
  return /* @__PURE__ */ jsxs46(Pressable33, { onPress, accessibilityRole: "button", style: ({ pressed }) => [containerStyle, pressed && { backgroundColor: theme.hoverOverlay }], children: [
    /* @__PURE__ */ jsx57(Text46, { style: timeStyle, children: time }),
    assessment && renderIndicator(),
    /* @__PURE__ */ jsxs46(View50, { style: { flex: 1 }, children: [
      /* @__PURE__ */ jsx57(Text46, { style: titleStyle, children: title }),
      /* @__PURE__ */ jsx57(Text46, { style: metaStyle, children: meta })
    ] }),
    /* @__PURE__ */ jsx57(View50, { style: { minWidth: sp[9], alignItems: "flex-end" }, children: renderStatus() })
  ] });
}

// rn/HomeworkCard.tsx
import { View as View51, Text as Text47, Pressable as Pressable34 } from "react-native";
import { jsx as jsx58, jsxs as jsxs47 } from "react/jsx-runtime";
function HomeworkCard({ title, subject, due, questions = 10, status = "due-soon", onPress }) {
  const { theme } = useTheme();
  const statusColor = {
    "due-soon": theme.signalBright,
    complete: theme.accent,
    overdue: theme.danger
  };
  const statusLabel = {
    "due-soon": due,
    complete: "Complete",
    overdue: due
  };
  const isDone = status === "complete";
  const isOverdue = status === "overdue";
  return /* @__PURE__ */ jsxs47(Pressable34, { onPress, accessibilityRole: "button", style: ({ pressed }) => [{
    flexDirection: "row",
    alignItems: "center",
    gap: sp[4],
    paddingVertical: sp[4],
    paddingHorizontal: sp[5],
    borderBottomWidth: 1,
    borderBottomColor: theme.divider
  }, pressed && { backgroundColor: theme.hoverOverlay }], children: [
    /* @__PURE__ */ jsxs47(View51, { style: { flex: 1 }, children: [
      /* @__PURE__ */ jsx58(Text47, { style: { fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: isDone ? theme.fgMuted : theme.fg }, children: title }),
      /* @__PURE__ */ jsxs47(Text47, { style: { fontFamily: font.sans, fontSize: fs[12], color: theme.fgFaint, marginTop: sp[0.5] }, children: [
        subject,
        " \xB7 ",
        questions,
        " questions"
      ] })
    ] }),
    /* @__PURE__ */ jsx58(Text47, { style: { fontFamily: font.mono, fontSize: fs[11], color: statusColor[status], fontWeight: isOverdue ? fw[600] : fw[500] }, children: statusLabel[status] })
  ] });
}

// rn/QuizOption.tsx
import { Pressable as Pressable35, View as View52, Text as Text48, Image as Image3 } from "react-native";
import { jsx as jsx59, jsxs as jsxs48 } from "react/jsx-runtime";
function QuizOption({ label, text, image, state = "default", onPress }) {
  const { theme } = useTheme();
  const borderColorMap = {
    default: theme.border,
    selected: theme.water,
    correct: theme.accent,
    incorrect: theme.danger,
    disabled: theme.border
  };
  const bgMap = {
    default: "transparent",
    selected: "rgba(107,163,255,0.14)",
    correct: theme.accentSoft,
    incorrect: theme.dangerSoft,
    disabled: "transparent"
  };
  const containerStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: sp[3],
    padding: sp[3],
    paddingEnd: sp[4],
    borderRadius: r[2],
    borderWidth: 1,
    borderColor: borderColorMap[state],
    backgroundColor: bgMap[state],
    opacity: state === "disabled" ? 0.4 : 1
  };
  const labelStyle = {
    width: icon["2xl"],
    height: icon["2xl"],
    borderRadius: r[1],
    backgroundColor: state === "default" ? theme.hoverOverlay : bgMap[state],
    alignItems: "center",
    justifyContent: "center"
  };
  const labelTextStyle = {
    fontFamily: font.mono,
    fontSize: fs[13],
    fontWeight: fw[600],
    color: state === "default" ? theme.fgMuted : borderColorMap[state]
  };
  const optionTextStyle = {
    fontFamily: font.sans,
    fontSize: fs[15],
    color: theme.fg,
    lineHeight: fs[15] * 1.5
  };
  return /* @__PURE__ */ jsxs48(
    Pressable35,
    {
      onPress,
      disabled: state === "disabled" || state === "correct" || state === "incorrect",
      accessibilityRole: "button",
      accessibilityState: { selected: state === "selected", disabled: state === "disabled" },
      style: ({ pressed }) => [containerStyle, pressed && { backgroundColor: theme.hoverOverlay }],
      children: [
        /* @__PURE__ */ jsx59(View52, { style: labelStyle, children: /* @__PURE__ */ jsx59(Text48, { style: labelTextStyle, children: label }) }),
        /* @__PURE__ */ jsxs48(View52, { style: { flex: 1 }, children: [
          image && /* @__PURE__ */ jsx59(View52, { style: { width: 120, height: 120, borderRadius: r[1], overflow: "hidden", marginBottom: text ? sp[2] : 0 }, children: /* @__PURE__ */ jsx59(Image3, { source: image, style: { width: "100%", height: "100%" }, resizeMode: "cover" }) }),
          text ? /* @__PURE__ */ jsx59(Text48, { style: optionTextStyle, children: text }) : null
        ] })
      ]
    }
  );
}

// rn/Question.tsx
import { View as View61, Text as Text56, Image as Image6 } from "react-native";

// rn/MatchQuestion.tsx
import React27 from "react";
import { View as View56, Text as Text52 } from "react-native";

// rn/DragItem.tsx
import { useRef as useRef8 } from "react";
import { View as View53, Image as Image4, Text as Text49, Platform as Platform10 } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated6, { useSharedValue as useSharedValue6, useAnimatedStyle as useAnimatedStyle6, withTiming as withTiming6, Easing as Easing5, runOnJS as runOnJS2 } from "react-native-reanimated";
import { jsx as jsx60 } from "react/jsx-runtime";
var TIMING_CONFIG = { duration: dur[2], easing: Easing5.bezier(0.22, 0.61, 0.36, 1) };
var IMG_DEFAULT = 90;
function DragItemContent({ item, fontSize = fs[14] }) {
  const { theme } = useTheme();
  if (item.image) {
    const size = item.imageSize || IMG_DEFAULT;
    return /* @__PURE__ */ jsx60(View53, { style: { width: size, height: size, borderRadius: r[1], overflow: "hidden" }, children: /* @__PURE__ */ jsx60(Image4, { source: item.image, style: { width: "100%", height: "100%" }, resizeMode: "cover" }) });
  }
  return /* @__PURE__ */ jsx60(Text49, { style: { fontFamily: font.sans, fontSize, fontWeight: fw[500], color: theme.fg, ...Platform10.OS === "web" ? { userSelect: "none" } : {} }, children: item.label });
}
function DragItem({ item, state = "idle", onDragStart, onDragMove, onDragEnd }) {
  const { theme } = useTheme();
  const translateX = useSharedValue6(0);
  const translateY = useSharedValue6(0);
  const scale = useSharedValue6(1);
  const zIdx = useSharedValue6(1);
  const isDragging = state === "dragging";
  const isPlaced = state === "placed" || state === "correct" || state === "incorrect";
  const isDisabled = state === "disabled";
  const isLocked = state === "correct" || state === "incorrect";
  const canDrag = !isDisabled && !isLocked;
  const cbRef = useRef8({ onDragStart, onDragMove, onDragEnd });
  cbRef.current = { onDragStart, onDragMove, onDragEnd };
  const gesture = Gesture.Pan().enabled(canDrag).onStart(() => {
    zIdx.value = 100;
    scale.value = withTiming6(1.05, TIMING_CONFIG);
    if (cbRef.current.onDragStart) runOnJS2(cbRef.current.onDragStart)(item.id);
  }).onUpdate((e) => {
    translateX.value = e.translationX;
    translateY.value = e.translationY;
    if (cbRef.current.onDragMove) runOnJS2(cbRef.current.onDragMove)(item.id, e.absoluteX, e.absoluteY);
  }).onEnd((e) => {
    if (cbRef.current.onDragEnd) runOnJS2(cbRef.current.onDragEnd)(item.id, e.absoluteX, e.absoluteY);
    translateX.value = withTiming6(0, TIMING_CONFIG);
    translateY.value = withTiming6(0, TIMING_CONFIG);
    scale.value = withTiming6(1, TIMING_CONFIG);
    zIdx.value = 1;
  }).onFinalize(() => {
    translateX.value = withTiming6(0, TIMING_CONFIG);
    translateY.value = withTiming6(0, TIMING_CONFIG);
    scale.value = withTiming6(1, TIMING_CONFIG);
    zIdx.value = 1;
  });
  const animatedStyle = useAnimatedStyle6(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value }
    ],
    zIndex: zIdx.value,
    shadowOpacity: zIdx.value > 1 ? 0.25 : 0
  }));
  const bgMap = {
    idle: theme.bgRaised,
    dragging: theme.bgOverlay,
    placed: theme.bgRaised,
    correct: theme.bgRaised,
    incorrect: theme.bgRaised,
    disabled: theme.bgRaised
  };
  const borderMap = {
    idle: theme.borderStrong,
    dragging: theme.accent,
    placed: theme.borderStrong,
    correct: theme.accent,
    incorrect: theme.danger,
    disabled: theme.border
  };
  const containerStyle = {
    backgroundColor: bgMap[state],
    borderRadius: r[2],
    borderWidth: 1.5,
    borderColor: borderMap[state],
    paddingVertical: item.image ? 0 : sp[2],
    paddingHorizontal: item.image ? 0 : sp[3],
    overflow: "hidden",
    opacity: isDisabled ? 0.4 : 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 8,
    ...Platform10.OS === "web" ? { userSelect: "none", cursor: canDrag ? "grab" : "default" } : {}
  };
  return /* @__PURE__ */ jsx60(GestureDetector, { gesture, children: /* @__PURE__ */ jsx60(Animated6.View, { style: [containerStyle, animatedStyle], children: /* @__PURE__ */ jsx60(DragItemContent, { item }) }) });
}

// rn/DropZone.tsx
import React25, { useRef as useRef9, useCallback as useCallback6 } from "react";
import { View as View54, Text as Text50 } from "react-native";
import { jsx as jsx61 } from "react/jsx-runtime";
function DropZone({ id, label, state = "empty", children, onMeasure, minWidth, minHeight, inline, neutral }) {
  const { theme } = useTheme();
  const ref = useRef9(null);
  const onMeasureRef = useRef9(onMeasure);
  onMeasureRef.current = onMeasure;
  const measure = useCallback6(() => {
    setTimeout(() => {
      ref.current?.measureInWindow((x, y, width, height) => {
        if (width > 0 && height > 0) {
          onMeasureRef.current?.(id, { x, y, width, height });
        }
      });
    }, 50);
  }, [id]);
  React25.useEffect(() => {
    measure();
  }, [children, state]);
  const handleLayout = measure;
  const bgMap = {
    empty: "transparent",
    hovering: theme.accentSoft,
    filled: theme.selectedOverlay,
    correct: theme.accentSoft,
    incorrect: theme.dangerSoft
  };
  const borderMap = {
    empty: theme.border,
    hovering: theme.accent,
    filled: theme.borderStrong,
    correct: theme.accentBorder,
    incorrect: theme.dangerBorder
  };
  const hasContent = !!children;
  const showChrome = !inline || !hasContent;
  const isHovering = state === "hovering";
  const style = {
    minWidth: minWidth || 80,
    minHeight: showChrome ? minHeight || 44 : void 0,
    backgroundColor: neutral ? isHovering ? theme.accentSoft : "transparent" : showChrome ? bgMap[state] : "transparent",
    borderRadius: r[2],
    borderWidth: showChrome ? 1 : 0,
    borderStyle: neutral ? "dashed" : state === "empty" || isHovering ? "dashed" : "solid",
    borderColor: neutral ? isHovering ? theme.accent : theme.border : showChrome ? borderMap[state] : "transparent",
    alignItems: "center",
    justifyContent: "center",
    padding: showChrome ? sp[2] : 0
  };
  return /* @__PURE__ */ jsx61(View54, { ref, onLayout: handleLayout, style, collapsable: false, children: children || (label ? /* @__PURE__ */ jsx61(Text50, { style: { fontFamily: font.sans, fontSize: fs[12], color: theme.fgFaint }, children: label }) : null) });
}

// rn/PlacedItem.tsx
import { useRef as useRef10 } from "react";
import { Platform as Platform11 } from "react-native";
import { Gesture as Gesture2, GestureDetector as GestureDetector2 } from "react-native-gesture-handler";
import Animated7, { useSharedValue as useSharedValue7, useAnimatedStyle as useAnimatedStyle7, withTiming as withTiming7, Easing as Easing6, runOnJS as runOnJS3 } from "react-native-reanimated";
import { jsx as jsx62 } from "react/jsx-runtime";
var TIMING = { duration: dur[2], easing: Easing6.bezier(0.22, 0.61, 0.36, 1) };
function PlacedItem({ item, itemState, zoneState, onDragStart, onDragMove, onDragEnd, theme, fontSize, compact }) {
  const tx = useSharedValue7(0);
  const ty = useSharedValue7(0);
  const scale = useSharedValue7(1);
  const zIdx = useSharedValue7(1);
  const isLocked = itemState === "correct" || itemState === "incorrect";
  const cbRef = useRef10({ onDragStart, onDragMove, onDragEnd });
  cbRef.current = { onDragStart, onDragMove, onDragEnd };
  const gesture = Gesture2.Pan().enabled(!isLocked).onStart(() => {
    zIdx.value = 100;
    scale.value = withTiming7(1.05, TIMING);
    if (cbRef.current.onDragStart) runOnJS3(cbRef.current.onDragStart)(item.id);
  }).onUpdate((e) => {
    tx.value = e.translationX;
    ty.value = e.translationY;
    if (cbRef.current.onDragMove) runOnJS3(cbRef.current.onDragMove)(item.id, e.absoluteX, e.absoluteY);
  }).onEnd((e) => {
    if (cbRef.current.onDragEnd) runOnJS3(cbRef.current.onDragEnd)(item.id, e.absoluteX, e.absoluteY);
    tx.value = withTiming7(0, TIMING);
    ty.value = withTiming7(0, TIMING);
    scale.value = withTiming7(1, TIMING);
    zIdx.value = 1;
  }).onFinalize(() => {
    tx.value = withTiming7(0, TIMING);
    ty.value = withTiming7(0, TIMING);
    scale.value = withTiming7(1, TIMING);
    zIdx.value = 1;
  });
  const animStyle = useAnimatedStyle7(() => ({
    transform: [{ translateX: tx.value }, { translateY: ty.value }, { scale: scale.value }],
    zIndex: zIdx.value
  }));
  const isHovered = zoneState === "hovering";
  const isDrag = itemState === "dragging";
  const bg = isHovered ? theme.accentSoft : theme.bgRaised;
  const border = itemState === "correct" ? theme.accent : itemState === "incorrect" ? theme.danger : isDrag ? theme.accent : isHovered ? theme.accent : theme.borderStrong;
  const borderStyle = isHovered ? "dashed" : "solid";
  return /* @__PURE__ */ jsx62(GestureDetector2, { gesture, children: /* @__PURE__ */ jsx62(Animated7.View, { style: [{
    backgroundColor: bg,
    borderRadius: r[2],
    borderWidth: 1.5,
    borderStyle,
    borderColor: border,
    paddingVertical: item.image ? 0 : compact ? sp[0.5] : sp[2],
    paddingHorizontal: item.image ? 0 : compact ? sp[2] : sp[3],
    alignItems: "center",
    overflow: "hidden",
    ...Platform11.OS === "web" ? { userSelect: "none", cursor: isLocked ? "default" : "grab" } : {}
  }, animStyle], children: /* @__PURE__ */ jsx62(DragItemContent, { item, fontSize }) }) });
}

// rn/useDragDrop.ts
import { useState as useState16, useCallback as useCallback7, useRef as useRef11 } from "react";
function useDragDrop({ items, zones, correctMapping, allowMultiplePerZone, showZoneResults, onAnswer }) {
  const onAnswerRef = useRef11(onAnswer);
  onAnswerRef.current = onAnswer;
  const zoneBounds = useRef11({});
  const [draggingId, setDraggingId] = useState16(null);
  const [hoveringZone, setHoveringZone] = useState16(null);
  const [state, setState] = useState16(() => ({
    itemStates: Object.fromEntries(items.map((i) => [i.id, "idle"])),
    zoneStates: Object.fromEntries(zones.map((z) => [z, "empty"])),
    placements: {},
    submitted: false
  }));
  const registerZone = useCallback7((id, bounds) => {
    zoneBounds.current[id] = bounds;
  }, []);
  const findZoneAt = useCallback7((x, y) => {
    for (const [id, b] of Object.entries(zoneBounds.current)) {
      if (x >= b.x && x <= b.x + b.width && y >= b.y && y <= b.y + b.height) {
        return id;
      }
    }
    return null;
  }, []);
  const onDragStart = useCallback7((id) => {
    if (state.submitted) return;
    setDraggingId(id);
    setState((prev) => ({
      ...prev,
      itemStates: { ...prev.itemStates, [id]: "dragging" }
    }));
  }, [state.submitted]);
  const onDragMove = useCallback7((id, x, y) => {
    if (state.submitted) return;
    const zone = findZoneAt(x, y);
    setHoveringZone(zone);
    setState((prev) => {
      const nextZoneStates = { ...prev.zoneStates };
      const draggingFromZone = prev.placements[id];
      for (const zid of zones) {
        if (zid === draggingFromZone) {
          nextZoneStates[zid] = "filled";
        } else if (Object.values(prev.placements).some((pzid) => pzid === zid)) {
          nextZoneStates[zid] = "filled";
        } else {
          nextZoneStates[zid] = "empty";
        }
      }
      if (zone && zone !== draggingFromZone) {
        nextZoneStates[zone] = "hovering";
      }
      return { ...prev, zoneStates: nextZoneStates };
    });
  }, [findZoneAt, zones, state.submitted, allowMultiplePerZone]);
  const onDragEnd = useCallback7((id, x, y) => {
    if (state.submitted) return;
    const zone = findZoneAt(x, y);
    setDraggingId(null);
    setHoveringZone(null);
    setState((prev) => {
      const next = { ...prev };
      next.itemStates = { ...prev.itemStates };
      next.zoneStates = { ...prev.zoneStates };
      next.placements = { ...prev.placements };
      const oldZone = prev.placements[id];
      if (oldZone) {
        delete next.placements[id];
      }
      if (zone) {
        if (!allowMultiplePerZone) {
          const existingItem = Object.entries(prev.placements).find(([iid, zid]) => zid === zone && iid !== id);
          if (existingItem) {
            if (oldZone) {
              next.placements[existingItem[0]] = oldZone;
              next.itemStates[existingItem[0]] = "placed";
              next.zoneStates[oldZone] = "filled";
            } else {
              next.itemStates[existingItem[0]] = "idle";
              delete next.placements[existingItem[0]];
            }
          }
        }
        next.placements[id] = zone;
        next.itemStates[id] = "placed";
        next.zoneStates[zone] = "filled";
      } else {
        next.itemStates[id] = "idle";
        delete next.placements[id];
      }
      for (const zid of zones) {
        if (!Object.values(next.placements).includes(zid)) {
          next.zoneStates[zid] = "empty";
        }
      }
      onAnswerRef.current?.(next.placements);
      return next;
    });
  }, [findZoneAt, zones, state.submitted, allowMultiplePerZone]);
  const reveal = useCallback7((results) => {
    setState((prev) => {
      const nextItemStates = { ...prev.itemStates };
      for (const [itemId, isCorrect] of Object.entries(results)) {
        nextItemStates[itemId] = isCorrect ? "correct" : "incorrect";
      }
      return { ...prev, itemStates: nextItemStates, submitted: true };
    });
  }, []);
  const submit = useCallback7(() => {
    if (!correctMapping) return;
    setState((prev) => {
      const nextItemStates = { ...prev.itemStates };
      const nextZoneStates = showZoneResults ? { ...prev.zoneStates } : prev.zoneStates;
      for (const [itemId, zoneId] of Object.entries(prev.placements)) {
        const isCorrect = correctMapping[itemId] === zoneId;
        nextItemStates[itemId] = isCorrect ? "correct" : "incorrect";
        if (showZoneResults) nextZoneStates[zoneId] = isCorrect ? "correct" : "incorrect";
      }
      for (const item of items) {
        if (!prev.placements[item.id]) {
          nextItemStates[item.id] = "incorrect";
        }
      }
      return { ...prev, itemStates: nextItemStates, ...showZoneResults ? { zoneStates: nextZoneStates } : {}, submitted: true };
    });
  }, [correctMapping, items, showZoneResults]);
  const reset = useCallback7(() => {
    setState({
      itemStates: Object.fromEntries(items.map((i) => [i.id, "idle"])),
      zoneStates: Object.fromEntries(zones.map((z) => [z, "empty"])),
      placements: {},
      submitted: false
    });
  }, [items, zones]);
  const allPlaced = items.length > 0 && items.every((i) => state.placements[i.id]);
  return {
    ...state,
    draggingId,
    hoveringZone,
    allPlaced,
    registerZone,
    onDragStart,
    onDragMove,
    onDragEnd,
    submit,
    reveal,
    reset
  };
}

// rn/QuestionFrame.tsx
import { View as View55, Text as Text51 } from "react-native";
import { jsx as jsx63, jsxs as jsxs49 } from "react/jsx-runtime";
function QuestionFrame({ instruction, children, options, optionsPosition = "bottom", showButtons = true, submitted, allPlaced, onSubmit, onReset }) {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsxs49(View55, { style: { gap: sp[4], overflow: "visible" }, children: [
    instruction && /* @__PURE__ */ jsx63(Text51, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }, children: instruction }),
    optionsPosition === "top" && options,
    children,
    optionsPosition === "bottom" && options,
    showButtons && /* @__PURE__ */ jsxs49(View55, { style: { flexDirection: "row", gap: sp[3] }, children: [
      !submitted && onSubmit && /* @__PURE__ */ jsx63(Button, { variant: "primary", size: "sm", disabled: !allPlaced, onPress: onSubmit, children: "Check" }),
      submitted && onReset && /* @__PURE__ */ jsx63(Button, { variant: "secondary", size: "sm", onPress: onReset, children: "Try again" })
    ] })
  ] });
}

// rn/MatchQuestion.tsx
import { jsx as jsx64, jsxs as jsxs50 } from "react/jsx-runtime";
function MatchQuestion({ items, targets, correctMapping, instruction, optionsPosition, showButtons, onAnswer, onReady }) {
  const { theme } = useTheme();
  const dd = useDragDrop({ items, zones: targets.map((t) => t.id), correctMapping, onAnswer });
  const onReadyRef = React27.useRef(onReady);
  onReadyRef.current = onReady;
  React27.useEffect(() => {
    onReadyRef.current?.({ submit: dd.submit, reset: dd.reset, allPlaced: dd.allPlaced, submitted: dd.submitted });
  }, [dd.allPlaced, dd.submitted]);
  const itemInZone = (zoneId) => {
    const entry = Object.entries(dd.placements).find(([_, zid]) => zid === zoneId);
    return entry ? items.find((i) => i.id === entry[0]) : void 0;
  };
  const sourceItems = !dd.submitted ? /* @__PURE__ */ jsx64(View56, { style: { flexDirection: "row", flexWrap: "wrap", gap: sp[2], alignItems: "flex-start", minHeight: sp[2], overflow: "visible" }, children: items.filter((item) => !dd.placements[item.id]).map((item) => /* @__PURE__ */ jsx64(DragItem, { item, state: dd.itemStates[item.id], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd }, item.id)) }) : null;
  return /* @__PURE__ */ jsx64(QuestionFrame, { instruction: instruction || "Drag each item to its match", optionsPosition, options: sourceItems, showButtons, submitted: dd.submitted, allPlaced: dd.allPlaced, onSubmit: dd.submit, onReset: dd.reset, children: /* @__PURE__ */ jsx64(View56, { style: { gap: sp[3], overflow: "visible" }, children: targets.map((target) => {
    const placed = itemInZone(target.id);
    const isActive = placed && dd.itemStates[placed.id] === "dragging";
    return /* @__PURE__ */ jsxs50(View56, { style: { flexDirection: "row", alignItems: "center", gap: sp[3], overflow: "visible", zIndex: isActive ? 100 : 1 }, children: [
      /* @__PURE__ */ jsx64(Text52, { style: { fontFamily: font.sans, fontSize: fs[14], color: theme.fg, flex: 1 }, children: target.label }),
      /* @__PURE__ */ jsx64(DropZone, { id: target.id, state: dd.zoneStates[target.id], onMeasure: dd.registerZone, minWidth: 100, inline: true, children: placed && /* @__PURE__ */ jsx64(PlacedItem, { item: placed, itemState: dd.itemStates[placed.id], zoneState: dd.zoneStates[target.id], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd, theme }) })
    ] }, target.id);
  }) }) });
}

// rn/CategorizeQuestion.tsx
import React28 from "react";
import { View as View57, Text as Text53 } from "react-native";
import { jsx as jsx65, jsxs as jsxs51 } from "react/jsx-runtime";
function CategorizeQuestion({ items, categories, correctMapping, instruction, optionsPosition, showButtons, onAnswer, onReady }) {
  const { theme } = useTheme();
  const dd = useDragDrop({ items, zones: categories.map((c) => c.id), correctMapping, allowMultiplePerZone: true, onAnswer });
  const onReadyRef = React28.useRef(onReady);
  onReadyRef.current = onReady;
  React28.useEffect(() => {
    onReadyRef.current?.({ submit: dd.submit, reset: dd.reset, allPlaced: dd.allPlaced, submitted: dd.submitted });
  }, [dd.allPlaced, dd.submitted]);
  const itemsInZone = (zoneId) => {
    return Object.entries(dd.placements).filter(([_, zid]) => zid === zoneId).map(([iid]) => items.find((i) => i.id === iid)).filter(Boolean);
  };
  const sourceItems = !dd.submitted ? /* @__PURE__ */ jsx65(View57, { style: { flexDirection: "row", flexWrap: "wrap", gap: sp[2], alignItems: "flex-start", minHeight: sp[2], overflow: "visible" }, children: items.filter((item) => !dd.placements[item.id]).map((item) => /* @__PURE__ */ jsx65(DragItem, { item, state: dd.itemStates[item.id], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd }, item.id)) }) : null;
  return /* @__PURE__ */ jsx65(QuestionFrame, { instruction: instruction || "Drag each item into the correct category", optionsPosition, options: sourceItems, showButtons, submitted: dd.submitted, allPlaced: dd.allPlaced, onSubmit: dd.submit, onReset: dd.reset, children: /* @__PURE__ */ jsx65(View57, { style: { flexDirection: "row", gap: sp[3], overflow: "visible" }, children: categories.map((cat) => {
    const placed = itemsInZone(cat.id);
    return /* @__PURE__ */ jsxs51(View57, { style: { flex: 1, overflow: "visible" }, children: [
      /* @__PURE__ */ jsx65(Text53, { style: { fontFamily: font.mono, fontSize: fs[11], fontWeight: fw[600], color: theme.fgMuted, marginBottom: sp[2], textAlign: "center" }, children: cat.label }),
      /* @__PURE__ */ jsx65(DropZone, { id: cat.id, state: dd.zoneStates[cat.id], onMeasure: dd.registerZone, minHeight: 80, neutral: true, children: placed.length > 0 && /* @__PURE__ */ jsx65(View57, { style: { flexDirection: "row", flexWrap: "wrap", gap: sp[2], alignItems: "flex-start", padding: sp[1] }, children: placed.map((p) => /* @__PURE__ */ jsx65(DragItem, { item: p, state: dd.itemStates[p.id], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd }, p.id)) }) })
    ] }, cat.id);
  }) }) });
}

// rn/OrderQuestion.tsx
import React29 from "react";
import { View as View58, Text as Text54 } from "react-native";
import { jsx as jsx66, jsxs as jsxs52 } from "react/jsx-runtime";
function OrderQuestion({ items, correctOrder, instruction, optionsPosition, showButtons, onAnswer, onReady }) {
  const { theme } = useTheme();
  const zones = correctOrder.map((_, i) => `slot-${i}`);
  const correctMapping = Object.fromEntries(correctOrder.map((id, i) => [id, `slot-${i}`]));
  const dd = useDragDrop({ items, zones, correctMapping, showZoneResults: true, onAnswer });
  const onReadyRef = React29.useRef(onReady);
  onReadyRef.current = onReady;
  React29.useEffect(() => {
    onReadyRef.current?.({ submit: dd.submit, reset: dd.reset, allPlaced: dd.allPlaced, submitted: dd.submitted });
  }, [dd.allPlaced, dd.submitted]);
  const itemInZone = (zoneId) => {
    const entry = Object.entries(dd.placements).find(([_, zid]) => zid === zoneId);
    return entry ? items.find((i) => i.id === entry[0]) : void 0;
  };
  const sourceItems = !dd.submitted ? /* @__PURE__ */ jsx66(View58, { style: { flexDirection: "row", flexWrap: "wrap", gap: sp[2], alignItems: "flex-start", minHeight: sp[2], overflow: "visible" }, children: items.filter((item) => !dd.placements[item.id]).map((item) => /* @__PURE__ */ jsx66(DragItem, { item, state: dd.itemStates[item.id], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd }, item.id)) }) : null;
  return /* @__PURE__ */ jsx66(QuestionFrame, { instruction: instruction || "Drag items into the correct order", optionsPosition, options: sourceItems, showButtons, submitted: dd.submitted, allPlaced: dd.allPlaced, onSubmit: dd.submit, onReset: dd.reset, children: /* @__PURE__ */ jsx66(View58, { style: { gap: sp[2], overflow: "visible" }, children: zones.map((zoneId, i) => {
    const placed = itemInZone(zoneId);
    const isActive = placed && dd.itemStates[placed.id] === "dragging";
    return /* @__PURE__ */ jsxs52(View58, { style: { flexDirection: "row", alignItems: "center", gap: sp[3], overflow: "visible", zIndex: isActive ? 100 : 1 }, children: [
      /* @__PURE__ */ jsx66(Text54, { style: { fontFamily: font.mono, fontSize: fs[13], fontWeight: fw[600], color: theme.fgFaint, minWidth: 24, textAlign: "center" }, children: i + 1 }),
      /* @__PURE__ */ jsx66(View58, { style: { flex: 1, overflow: "visible" }, children: /* @__PURE__ */ jsx66(DropZone, { id: zoneId, state: dd.zoneStates[zoneId], onMeasure: dd.registerZone, minHeight: 40, inline: true, children: placed && /* @__PURE__ */ jsx66(PlacedItem, { item: placed, itemState: dd.itemStates[placed.id], zoneState: dd.zoneStates[zoneId], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd, theme, fontSize: fs[13] }) }) })
    ] }, zoneId);
  }) }) });
}

// rn/FillBlanksQuestion.tsx
import React30 from "react";
import { View as View59, Text as Text55 } from "react-native";
import { jsx as jsx67 } from "react/jsx-runtime";
function FillBlanksQuestion({ sentence, items, correctMapping, instruction, optionsPosition, showButtons, onAnswer, onReady }) {
  const { theme } = useTheme();
  const blankIds = sentence.match(/\{\{(\w+)\}\}/g)?.map((m) => m.slice(2, -2)) || [];
  const dd = useDragDrop({ items, zones: blankIds, correctMapping, onAnswer });
  const onReadyRef = React30.useRef(onReady);
  onReadyRef.current = onReady;
  React30.useEffect(() => {
    onReadyRef.current?.({ submit: dd.submit, reset: dd.reset, allPlaced: dd.allPlaced, submitted: dd.submitted });
  }, [dd.allPlaced, dd.submitted]);
  const itemInZone = (zoneId) => {
    const entry = Object.entries(dd.placements).find(([_, zid]) => zid === zoneId);
    return entry ? items.find((i) => i.id === entry[0]) : void 0;
  };
  const parts = sentence.split(/(\{\{\w+\}\})/g);
  const sourceItems = !dd.submitted ? /* @__PURE__ */ jsx67(View59, { style: { flexDirection: "row", flexWrap: "wrap", gap: sp[2], alignItems: "flex-start", minHeight: sp[2], overflow: "visible" }, children: items.filter((item) => !dd.placements[item.id]).map((item) => /* @__PURE__ */ jsx67(DragItem, { item, state: dd.itemStates[item.id], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd }, item.id)) }) : null;
  return /* @__PURE__ */ jsx67(QuestionFrame, { instruction: instruction || "Drag words into the blanks", optionsPosition, options: sourceItems, showButtons, submitted: dd.submitted, allPlaced: dd.allPlaced, onSubmit: dd.submit, onReset: dd.reset, children: /* @__PURE__ */ jsx67(View59, { style: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: sp[1], overflow: "visible" }, children: parts.map((part, i) => {
    const blankMatch = part.match(/^\{\{(\w+)\}\}$/);
    if (blankMatch) {
      const blankId = blankMatch[1];
      const placed = itemInZone(blankId);
      return /* @__PURE__ */ jsx67(DropZone, { id: blankId, state: dd.zoneStates[blankId], onMeasure: dd.registerZone, minWidth: 60, minHeight: 32, inline: true, children: placed && /* @__PURE__ */ jsx67(PlacedItem, { item: placed, itemState: dd.itemStates[placed.id], zoneState: dd.zoneStates[blankId], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd, theme }) }, i);
    }
    if (!part) return null;
    return /* @__PURE__ */ jsx67(Text55, { style: { fontFamily: font.sans, fontSize: fs[14], color: theme.fg, lineHeight: sp[7] }, children: part }, i);
  }) }) });
}

// rn/HotspotQuestion.tsx
import React31 from "react";
import { View as View60, Image as Image5 } from "react-native";
import Animated8, { useSharedValue as useSharedValue8, useAnimatedStyle as useAnimatedStyle8, withTiming as withTiming8, Easing as Easing7 } from "react-native-reanimated";
import { jsx as jsx68, jsxs as jsxs53 } from "react/jsx-runtime";
var TIMING2 = { duration: dur[2], easing: Easing7.bezier(0.22, 0.61, 0.36, 1) };
var MARKER_SIZE = 12;
var MARKER_ACTIVE = 28;
var MARKER_HOVER = 48;
function HotspotMarker({ state, isDragging, theme }) {
  const isHovering = state === "hovering";
  const scale = useSharedValue8(1);
  React31.useEffect(() => {
    const target = isHovering ? MARKER_HOVER / MARKER_SIZE : isDragging ? MARKER_ACTIVE / MARKER_SIZE : 1;
    scale.value = withTiming8(target, TIMING2);
  }, [isHovering, isDragging]);
  const ringStyle = useAnimatedStyle8(() => ({
    transform: [{ scale: scale.value }]
  }));
  return /* @__PURE__ */ jsx68(View60, { style: { alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }, children: /* @__PURE__ */ jsx68(Animated8.View, { style: [{
    width: MARKER_SIZE,
    height: MARKER_SIZE,
    borderRadius: MARKER_SIZE / 2,
    backgroundColor: isHovering ? theme.accent : theme.bgRaised,
    borderWidth: 2,
    borderColor: theme.accent,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4
  }, ringStyle] }) });
}
function HotspotQuestion({ image, imageAspectRatio = 16 / 9, zones, items, correctMapping, instruction, optionsPosition, showButtons, onAnswer, onReady }) {
  const { theme } = useTheme();
  const dd = useDragDrop({ items, zones: zones.map((z) => z.id), correctMapping, onAnswer });
  const onReadyRef = React31.useRef(onReady);
  onReadyRef.current = onReady;
  React31.useEffect(() => {
    onReadyRef.current?.({ submit: dd.submit, reset: dd.reset, allPlaced: dd.allPlaced, submitted: dd.submitted });
  }, [dd.allPlaced, dd.submitted]);
  const itemInZone = (zoneId) => {
    const entry = Object.entries(dd.placements).find(([_, zid]) => zid === zoneId);
    return entry ? items.find((i) => i.id === entry[0]) : void 0;
  };
  const sourceItems = !dd.submitted ? /* @__PURE__ */ jsx68(View60, { style: { flexDirection: "row", flexWrap: "wrap", gap: sp[2], alignItems: "flex-start", minHeight: sp[2], overflow: "visible" }, children: items.filter((item) => !dd.placements[item.id]).map((item) => /* @__PURE__ */ jsx68(DragItem, { item, state: dd.itemStates[item.id], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd }, item.id)) }) : null;
  return /* @__PURE__ */ jsx68(QuestionFrame, { instruction: instruction || "Drag items to the correct regions", optionsPosition, options: sourceItems, showButtons, submitted: dd.submitted, allPlaced: dd.allPlaced, onSubmit: dd.submit, onReset: dd.reset, children: /* @__PURE__ */ jsxs53(View60, { style: { width: "100%", aspectRatio: imageAspectRatio, borderRadius: r[2], overflow: "visible", borderWidth: 1, borderColor: theme.border }, children: [
    /* @__PURE__ */ jsx68(Image5, { source: image, style: { width: "100%", height: "100%", borderRadius: r[2] - 1 }, resizeMode: "cover" }),
    zones.map((zone) => {
      const placed = itemInZone(zone.id);
      return /* @__PURE__ */ jsx68(View60, { style: { position: "absolute", left: `${zone.x}%`, top: `${zone.y}%`, width: `${zone.width}%`, height: `${zone.height}%`, overflow: "visible", zIndex: placed && dd.itemStates[placed.id] === "dragging" ? 100 : 1 }, children: /* @__PURE__ */ jsx68(DropZone, { id: zone.id, state: dd.zoneStates[zone.id], onMeasure: dd.registerZone, minWidth: 0, minHeight: 0, inline: true, children: placed ? /* @__PURE__ */ jsx68(
        PlacedItem,
        {
          item: placed,
          itemState: dd.itemStates[placed.id],
          zoneState: dd.zoneStates[zone.id],
          onDragStart: dd.onDragStart,
          onDragMove: dd.onDragMove,
          onDragEnd: dd.onDragEnd,
          theme,
          fontSize: fs[13]
        }
      ) : /* @__PURE__ */ jsx68(HotspotMarker, { state: dd.zoneStates[zone.id], isDragging: !!dd.draggingId, theme }) }) }, zone.id);
    })
  ] }) });
}

// rn/Question.tsx
import { jsx as jsx69, jsxs as jsxs54 } from "react/jsx-runtime";
var TYPE_INSTRUCTIONS = {
  choice: "Select the correct answer",
  match: "Drag each item to its match",
  categorize: "Drag each item into the correct category",
  order: "Drag items into the correct order",
  fillblanks: "Drag words into the blanks",
  hotspot: "Drag items to the correct regions"
};
function ChoiceAnswer({ options, selected, correctIndex, submitted, onSelect }) {
  return /* @__PURE__ */ jsx69(View61, { style: { gap: sp[2] }, children: options.map((opt, i) => {
    let state = "default";
    if (submitted && correctIndex !== void 0) {
      if (i === correctIndex) state = "correct";
      else if (i === selected) state = "incorrect";
      else state = "disabled";
    } else if (i === selected) {
      state = "selected";
    }
    return /* @__PURE__ */ jsx69(
      QuizOption,
      {
        label: opt.label,
        text: opt.text,
        image: opt.image,
        state,
        onPress: () => onSelect?.(i)
      },
      i
    );
  }) });
}
function Question({ text, image, imageAspectRatio = 16 / 9, instruction, optionsPosition, showButtons, onAnswer, onReady, type, choiceProps, matchProps, categorizeProps, orderProps, fillBlanksProps, hotspotProps }) {
  const { theme } = useTheme();
  const inst = instruction || TYPE_INSTRUCTIONS[type];
  return /* @__PURE__ */ jsxs54(View61, { style: { gap: sp[4] }, children: [
    (text || image) && /* @__PURE__ */ jsxs54(View61, { style: { gap: sp[3] }, children: [
      image && /* @__PURE__ */ jsx69(
        Image6,
        {
          source: image,
          style: { width: "100%", aspectRatio: imageAspectRatio, borderRadius: r[2], backgroundColor: theme.hoverOverlay },
          resizeMode: "cover"
        }
      ),
      text && /* @__PURE__ */ jsx69(Text56, { style: { fontFamily: font.sans, fontSize: fs[16], fontWeight: fw[600], color: theme.fg }, children: text }),
      /* @__PURE__ */ jsx69(Text56, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }, children: inst })
    ] }),
    type === "choice" && choiceProps && /* @__PURE__ */ jsx69(ChoiceAnswer, { ...choiceProps }),
    type === "match" && matchProps && /* @__PURE__ */ jsx69(MatchQuestion, { optionsPosition, showButtons, onAnswer, onReady, ...matchProps }),
    type === "categorize" && categorizeProps && /* @__PURE__ */ jsx69(CategorizeQuestion, { optionsPosition, showButtons, onAnswer, onReady, ...categorizeProps }),
    type === "order" && orderProps && /* @__PURE__ */ jsx69(OrderQuestion, { optionsPosition, showButtons, onAnswer, onReady, ...orderProps }),
    type === "fillblanks" && fillBlanksProps && /* @__PURE__ */ jsx69(FillBlanksQuestion, { optionsPosition, showButtons, onAnswer, onReady, ...fillBlanksProps }),
    type === "hotspot" && hotspotProps && /* @__PURE__ */ jsx69(HotspotQuestion, { optionsPosition, showButtons, onAnswer, onReady, ...hotspotProps })
  ] });
}

// rn/Interstitial.tsx
import { useEffect as useEffect8, useRef as useRef12 } from "react";
import { View as View62, Text as Text57 } from "react-native";
import Animated9, {
  useSharedValue as useSharedValue9,
  useAnimatedStyle as useAnimatedStyle9,
  withTiming as withTiming9,
  withDelay as withDelay2,
  withRepeat as withRepeat3,
  withSequence as withSequence3,
  cancelAnimation as cancelAnimation3,
  Easing as Easing8
} from "react-native-reanimated";
import { Fragment as Fragment9, jsx as jsx70, jsxs as jsxs55 } from "react/jsx-runtime";
var CONFETTI_COLORS = [color.noon[400], color.gold[200], color.gold[400], color.noon[200], color.chalk[100]];
function ConfettiParticle({ delay, color: c }) {
  const left = useRef12(Math.random() * 100).current;
  const size = useRef12(3 + Math.random() * 5).current;
  const isRect = useRef12(Math.random() > 0.5).current;
  const duration = useRef12(1500 + Math.random() * 1500).current;
  const translateY = useSharedValue9(-10);
  const opacity = useSharedValue9(1);
  useEffect8(() => {
    translateY.value = withDelay2(delay, withTiming9(700, { duration }));
    opacity.value = withDelay2(delay + duration * 0.5, withTiming9(0, { duration: duration * 0.5 }));
    return () => {
      cancelAnimation3(translateY);
      cancelAnimation3(opacity);
    };
  }, []);
  const style = useAnimatedStyle9(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }]
  }));
  return /* @__PURE__ */ jsx70(Animated9.View, { style: [{
    position: "absolute",
    left: `${left}%`,
    top: -10,
    width: size,
    height: isRect ? size * 0.4 : size,
    borderRadius: isRect ? 1 : size / 2,
    backgroundColor: c
  }, style] });
}
function MasteryHero() {
  const { theme } = useTheme();
  const rotation = useSharedValue9(0);
  const scale = useSharedValue9(0);
  const opacity = useSharedValue9(0);
  useEffect8(() => {
    opacity.value = withTiming9(1, { duration: 400 });
    rotation.value = withTiming9(360, { duration: 600, easing: Easing8.out(Easing8.cubic) });
    scale.value = withTiming9(1, { duration: 500, easing: Easing8.out(Easing8.cubic) });
    const timeout = setTimeout(() => {
      scale.value = withRepeat3(withSequence3(
        withTiming9(1.03, { duration: 1500 }),
        withTiming9(1, { duration: 1500 })
      ), -1);
    }, 700);
    return () => {
      cancelAnimation3(rotation);
      cancelAnimation3(scale);
      cancelAnimation3(opacity);
      clearTimeout(timeout);
    };
  }, []);
  const style = useAnimatedStyle9(() => ({
    opacity: opacity.value,
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }]
  }));
  return /* @__PURE__ */ jsx70(Animated9.View, { style: [{ marginBottom: sp[6], zIndex: 2 }, style], children: /* @__PURE__ */ jsx70(Text57, { style: { fontSize: 72, color: theme.signalBright }, children: "\u2605" }) });
}
function ExamHero({ score }) {
  const { theme } = useTheme();
  const dim = 72;
  const scale = useSharedValue9(0.85);
  const opacity = useSharedValue9(0);
  const waterPct = useSharedValue9(0);
  useEffect8(() => {
    opacity.value = withTiming9(1, { duration: 300 });
    scale.value = withTiming9(1, { duration: 400, easing: Easing8.out(Easing8.cubic) });
    waterPct.value = withDelay2(400, withTiming9(score, { duration: 1200, easing: Easing8.out(Easing8.cubic) }));
    return () => {
      cancelAnimation3(scale);
      cancelAnimation3(opacity);
      cancelAnimation3(waterPct);
    };
  }, []);
  const containerStyle = useAnimatedStyle9(() => ({ opacity: opacity.value, transform: [{ scale: scale.value }] }));
  const waterStyle = useAnimatedStyle9(() => ({ height: `${waterPct.value}%` }));
  return /* @__PURE__ */ jsx70(Animated9.View, { style: [{ marginBottom: sp[6], zIndex: 2, alignItems: "center" }, containerStyle], children: /* @__PURE__ */ jsxs55(View62, { style: {
    width: dim,
    height: dim,
    transform: [{ rotate: "45deg" }],
    borderWidth: 2,
    borderColor: theme.accent,
    borderRadius: r[2],
    backgroundColor: theme.bg,
    overflow: "hidden",
    shadowColor: theme.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 12
  }, children: [
    /* @__PURE__ */ jsx70(View62, { style: { position: "absolute", top: -(dim * 0.25), left: -(dim * 0.25), width: dim * 1.5, height: dim * 1.5, transform: [{ rotate: "-45deg" }], justifyContent: "flex-end" }, children: /* @__PURE__ */ jsx70(Animated9.View, { style: [{ backgroundColor: theme.water, opacity: 0.3 }, waterStyle] }) }),
    /* @__PURE__ */ jsx70(View62, { style: { flex: 1, alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsxs55(Text57, { style: { transform: [{ rotate: "-45deg" }], fontFamily: font.mono, fontSize: fs[18], fontWeight: fw[700], color: theme.accentText }, children: [
      score,
      "%"
    ] }) })
  ] }) });
}
function ProgressHero() {
  const opacity = useSharedValue9(0);
  const translateY = useSharedValue9(12);
  useEffect8(() => {
    opacity.value = withTiming9(1, { duration: 400, easing: Easing8.out(Easing8.cubic) });
    translateY.value = withTiming9(0, { duration: 400, easing: Easing8.out(Easing8.cubic) });
    return () => {
      cancelAnimation3(opacity);
      cancelAnimation3(translateY);
    };
  }, []);
  const style = useAnimatedStyle9(() => ({ opacity: opacity.value, transform: [{ translateY: translateY.value }] }));
  return /* @__PURE__ */ jsx70(Animated9.View, { style: [{ marginBottom: sp[6], zIndex: 2, width: 220 }, style], children: /* @__PURE__ */ jsx70(Waypoints, { steps: ["done", "done", "done", "current", "incomplete"] }) });
}
function CompleteHero() {
  const scale = useSharedValue9(0.9);
  const opacity = useSharedValue9(0);
  useEffect8(() => {
    opacity.value = withTiming9(1, { duration: 400 });
    scale.value = withTiming9(1, { duration: 400, easing: Easing8.out(Easing8.cubic) });
    return () => {
      cancelAnimation3(scale);
      cancelAnimation3(opacity);
    };
  }, []);
  const style = useAnimatedStyle9(() => ({ opacity: opacity.value, transform: [{ scale: scale.value }] }));
  return /* @__PURE__ */ jsx70(Animated9.View, { style: [{ marginBottom: sp[6], zIndex: 2, width: 220 }, style], children: /* @__PURE__ */ jsx70(Waypoints, { steps: ["done", "done", "done", "done", "arrived"] }) });
}
function Interstitial({ title, body, buttonLabel, onPress, variant = "mastery", score = 91, hero, confetti: confettiProp }) {
  const { theme } = useTheme();
  const showConfetti = confettiProp ?? (variant === "mastery" || variant === "complete");
  return /* @__PURE__ */ jsxs55(View62, { style: { flex: 1, backgroundColor: theme.bg, alignItems: "center", justifyContent: "center", padding: sp[6] }, children: [
    showConfetti && /* @__PURE__ */ jsx70(View62, { style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden", zIndex: 1 }, pointerEvents: "none", children: Array.from({ length: 60 }, (_, i) => /* @__PURE__ */ jsx70(ConfettiParticle, { delay: Math.random() * 2500, color: CONFETTI_COLORS[i % CONFETTI_COLORS.length] }, i)) }),
    /* @__PURE__ */ jsx70(View62, { style: { flex: 1 } }),
    hero ? /* @__PURE__ */ jsx70(View62, { style: { marginBottom: sp[6], zIndex: 2 }, children: hero }) : /* @__PURE__ */ jsxs55(Fragment9, { children: [
      variant === "mastery" && /* @__PURE__ */ jsx70(MasteryHero, {}),
      variant === "exam" && /* @__PURE__ */ jsx70(ExamHero, { score }),
      variant === "progress" && /* @__PURE__ */ jsx70(ProgressHero, {}),
      variant === "complete" && /* @__PURE__ */ jsx70(CompleteHero, {})
    ] }),
    /* @__PURE__ */ jsx70(Text57, { style: { fontFamily: font.serif, fontSize: fs[32], fontWeight: fw[500], color: theme.fg, textAlign: "center", marginBottom: sp[3], zIndex: 2 }, children: title }),
    /* @__PURE__ */ jsx70(Text57, { style: { fontFamily: font.sans, fontSize: fs[15], color: theme.fgSubtle, textAlign: "center", maxWidth: 280, lineHeight: fs[15] * 1.5, zIndex: 2 }, children: body }),
    /* @__PURE__ */ jsx70(View62, { style: { flex: 1 } }),
    /* @__PURE__ */ jsx70(View62, { style: { width: "100%", maxWidth: 280, zIndex: 2, paddingBottom: sp[6] }, children: /* @__PURE__ */ jsx70(Button, { variant: "primary", fullWidth: true, onPress, children: buttonLabel }) })
  ] });
}

// rn/ResultReview.tsx
import { View as View63, Text as Text58, Pressable as Pressable36, I18nManager as I18nManager10 } from "react-native";
import { Fragment as Fragment10, jsx as jsx71, jsxs as jsxs56 } from "react/jsx-runtime";
function ResultReview({ items, onPressItem }) {
  const { theme } = useTheme();
  const isRTL = I18nManager10.isRTL;
  return /* @__PURE__ */ jsx71(View63, { style: { backgroundColor: theme.bgRaised, borderWidth: 1, borderColor: theme.border, borderRadius: r[3], overflow: "hidden" }, children: items.map((it, i) => {
    const row = /* @__PURE__ */ jsxs56(Fragment10, { children: [
      /* @__PURE__ */ jsxs56(Text58, { style: { fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, width: 24 }, children: [
        "Q",
        i + 1
      ] }),
      /* @__PURE__ */ jsx71(View63, { style: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: it.correct ? theme.accentSoft : theme.dangerSoft
      }, children: /* @__PURE__ */ jsx71(Icon, { name: it.correct ? "check" : "close", size: icon.md, color: it.correct ? theme.accentText : theme.danger }) }),
      /* @__PURE__ */ jsxs56(View63, { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsx71(Text58, { style: { fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: theme.fg }, numberOfLines: 2, children: it.question }),
        it.meta ? /* @__PURE__ */ jsx71(Text58, { style: { fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, marginTop: 2 }, children: it.meta }) : null
      ] }),
      onPressItem && /* @__PURE__ */ jsx71(Icon, { name: isRTL ? "chevron-left" : "chevron-right", size: icon.md, color: theme.fgFaint })
    ] });
    const rowStyle = {
      flexDirection: "row",
      alignItems: "center",
      gap: sp[3],
      padding: sp[4],
      borderBottomWidth: i < items.length - 1 ? 1 : 0,
      borderBottomColor: theme.divider
    };
    return onPressItem ? /* @__PURE__ */ jsx71(
      Pressable36,
      {
        onPress: () => onPressItem(i),
        accessibilityRole: "button",
        style: ({ pressed }) => [rowStyle, pressed && { backgroundColor: theme.hoverOverlay }],
        children: row
      },
      i
    ) : /* @__PURE__ */ jsx71(View63, { style: rowStyle, children: row }, i);
  }) });
}

// rn/VideoTile.tsx
import { View as View64, Text as Text59 } from "react-native";
import { jsx as jsx72, jsxs as jsxs57 } from "react/jsx-runtime";
var CREAM = color.chalk[100];
function VideoTile({ name, role, state = "live", initials, children, aspectRatio = 16 / 9, style }) {
  const { theme } = useTheme();
  const showVideo = state !== "audio-only" && children;
  return /* @__PURE__ */ jsxs57(View64, { style: [{
    aspectRatio,
    borderRadius: r[3],
    overflow: "hidden",
    backgroundColor: color.void[400],
    alignItems: "center",
    justifyContent: "center"
  }, style], children: [
    showVideo && /* @__PURE__ */ jsx72(View64, { style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }, children }),
    state === "audio-only" && /* @__PURE__ */ jsx72(Avatar, { initials: initials || name.slice(0, 2).toUpperCase(), size: "lg" }),
    state === "reconnecting" && /* @__PURE__ */ jsx72(View64, { style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(13,16,22,0.7)", alignItems: "center", justifyContent: "center", gap: sp[2] }, children: /* @__PURE__ */ jsx72(Text59, { style: { fontFamily: font.mono, fontSize: fs[11], letterSpacing: 1, textTransform: "uppercase", color: "rgba(241,235,221,0.7)" }, children: "Reconnecting\u2026" }) }),
    /* @__PURE__ */ jsxs57(View64, { style: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      alignItems: "center",
      gap: sp[2],
      paddingHorizontal: sp[3],
      paddingVertical: sp[2],
      backgroundColor: "rgba(13,16,22,0.72)"
    }, children: [
      state === "muted" ? /* @__PURE__ */ jsx72(Icon, { name: "mic-off", size: icon.md, color: theme.terra }) : state === "live" ? /* @__PURE__ */ jsx72(View64, { style: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.accent } }) : null,
      /* @__PURE__ */ jsx72(Text59, { style: { fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: CREAM, flex: 1 }, numberOfLines: 1, children: name }),
      role ? /* @__PURE__ */ jsx72(Text59, { style: { fontFamily: font.mono, fontSize: fs[9], letterSpacing: 1, textTransform: "uppercase", color: "rgba(241,235,221,0.55)" }, children: role }) : null
    ] })
  ] });
}

// rn/ClassToolbar.tsx
import { View as View65, Pressable as Pressable37 } from "react-native";
import { jsx as jsx73, jsxs as jsxs58 } from "react/jsx-runtime";
function ClassToolbar({ items, onPress }) {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsx73(View65, { style: {
    alignSelf: "center",
    flexDirection: "row",
    gap: sp[2],
    padding: sp[2],
    borderRadius: 999,
    backgroundColor: theme.bgOverlay,
    borderWidth: 1,
    borderColor: theme.borderStrong,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8
  }, children: items.map((it) => {
    const danger = it.variant === "danger";
    const bg = danger ? theme.danger : it.active ? theme.accent : "transparent";
    const fg = danger ? color.chalk[100] : it.active ? theme.accentFg : theme.fgMuted;
    return /* @__PURE__ */ jsxs58(
      Pressable37,
      {
        onPress: () => onPress(it.id),
        accessibilityRole: "button",
        accessibilityLabel: it.label,
        accessibilityState: { selected: !!it.active },
        style: ({ pressed }) => ({
          width: 48,
          height: 48,
          borderRadius: 24,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: pressed && bg === "transparent" ? theme.hoverOverlay : bg
        }),
        children: [
          /* @__PURE__ */ jsx73(Icon, { name: it.icon, size: icon["2xl"] - 6, color: fg }),
          it.badge && /* @__PURE__ */ jsx73(View65, { style: { position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: theme.danger } })
        ]
      },
      it.id
    );
  }) });
}

// rn/LivePrompt.tsx
import { View as View66, Text as Text60 } from "react-native";
import { jsx as jsx74, jsxs as jsxs59 } from "react/jsx-runtime";
function LivePrompt({ question, seconds, onExpire, kicker = "Live question", children }) {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsxs59(View66, { style: {
    backgroundColor: theme.bgRaised,
    borderWidth: 1,
    borderColor: theme.accentBorder,
    borderRadius: r[3],
    padding: sp[4],
    gap: sp[3],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 10
  }, children: [
    /* @__PURE__ */ jsxs59(View66, { style: { flexDirection: "row", alignItems: "center", gap: sp[2] }, children: [
      /* @__PURE__ */ jsx74(View66, { style: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.accent } }),
      /* @__PURE__ */ jsx74(Text60, { style: { fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], letterSpacing: 1, textTransform: "uppercase", color: theme.accentText, flex: 1 }, children: kicker }),
      seconds != null && /* @__PURE__ */ jsx74(Timer, { seconds, size: "sm", variant: "pill", onComplete: onExpire })
    ] }),
    /* @__PURE__ */ jsx74(Text60, { style: { fontFamily: font.serif, fontSize: fs[18], fontWeight: fw[500], color: theme.fg, lineHeight: fs[18] * 1.4 }, children: question }),
    /* @__PURE__ */ jsx74(View66, { style: { gap: sp[2] }, children })
  ] });
}

// rn/ChatComposer.tsx
import { View as View67, TextInput as TextInput6, Pressable as Pressable38, I18nManager as I18nManager11 } from "react-native";
import { jsx as jsx75, jsxs as jsxs60 } from "react/jsx-runtime";
function ChatComposer({ value, onChangeText, onSend, placeholder = "Message\u2026", disabled }) {
  const { theme } = useTheme();
  const canSend = !disabled && value.trim().length > 0;
  const send = () => {
    if (canSend) onSend(value.trim());
  };
  return /* @__PURE__ */ jsxs60(View67, { style: { flexDirection: "row", alignItems: "flex-end", gap: sp[2] }, children: [
    /* @__PURE__ */ jsx75(
      TextInput6,
      {
        value,
        onChangeText,
        placeholder,
        placeholderTextColor: theme.fgFaint,
        editable: !disabled,
        multiline: true,
        style: {
          flex: 1,
          minHeight: 40,
          maxHeight: 104,
          paddingHorizontal: sp[3],
          paddingVertical: sp[2] + 1,
          backgroundColor: theme.inputBg,
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: r[3],
          fontFamily: font.sans,
          fontSize: fs[14],
          color: theme.fg,
          textAlignVertical: "center"
        }
      }
    ),
    /* @__PURE__ */ jsx75(
      Pressable38,
      {
        onPress: send,
        disabled: !canSend,
        accessibilityRole: "button",
        accessibilityLabel: "Send",
        style: {
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: canSend ? theme.accent : theme.bgSunken
        },
        children: /* @__PURE__ */ jsx75(View67, { style: { transform: I18nManager11.isRTL ? [{ scaleX: -1 }] : void 0 }, children: /* @__PURE__ */ jsx75(Icon, { name: "send", size: icon.lg, color: canSend ? theme.accentFg : theme.fgFaint }) })
      }
    )
  ] });
}

// rn/Oasis.tsx
import { View as View68, Text as Text61 } from "react-native";
import { jsx as jsx76, jsxs as jsxs61 } from "react/jsx-runtime";
var SIZES = { sm: 28, md: 40, lg: 56, xl: 72 };
var FONT_SIZES = { sm: fs[9], md: fs[11], lg: fs[14], xl: fs[16] };
function borderCol(status, theme) {
  switch (status) {
    case "complete":
    case "strong":
      return theme.accent;
    case "weak":
      return theme.terra;
    case "current":
      return theme.signalBright;
    case "upcoming":
      return theme.fgFaint;
    case "locked":
      return theme.border;
  }
}
function Oasis({ level, status = "upcoming", label, size = "md", meta }) {
  const { theme } = useTheme();
  const dim = SIZES[size];
  const isCurrent = status === "current";
  const isDashed = status === "upcoming" || status === "locked";
  const isPast = status === "complete" || status === "strong" || status === "weak";
  const border = borderCol(status, theme);
  const clampedLevel = Math.max(0, Math.min(100, level));
  const displayLabel = label ?? (clampedLevel > 0 ? `${clampedLevel}%` : "\u2014");
  const labelColor = isCurrent ? theme.signalText : status === "complete" || status === "strong" ? theme.accentText : status === "weak" ? theme.terra : theme.fgFaint;
  return /* @__PURE__ */ jsxs61(View68, { style: { alignItems: "center" }, children: [
    /* @__PURE__ */ jsxs61(View68, { style: {
      width: dim,
      height: dim,
      transform: [{ rotate: "45deg" }],
      borderWidth: isCurrent ? 2.5 : 1.5,
      borderColor: border,
      borderStyle: isDashed ? "dashed" : "solid",
      backgroundColor: theme.bg,
      overflow: "hidden",
      ...isCurrent ? {
        shadowColor: theme.signalBright,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 6
      } : {}
    }, children: [
      clampedLevel > 0 && /* @__PURE__ */ jsx76(View68, { style: {
        position: "absolute",
        top: -(dim * 0.25),
        left: -(dim * 0.25),
        width: dim * 1.5,
        height: dim * 1.5,
        transform: [{ rotate: "-45deg" }],
        justifyContent: "flex-end"
      }, children: /* @__PURE__ */ jsx76(View68, { style: { height: `${clampedLevel}%`, backgroundColor: theme.water, opacity: 0.3 } }) }),
      /* @__PURE__ */ jsx76(View68, { style: { flex: 1, alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsx76(Text61, { style: {
        transform: [{ rotate: "-45deg" }],
        fontFamily: font.mono,
        fontSize: FONT_SIZES[size],
        fontWeight: fw[600],
        color: labelColor
      }, children: displayLabel }) })
    ] }),
    meta && /* @__PURE__ */ jsx76(Text61, { style: {
      fontFamily: font.mono,
      fontSize: fs[9],
      color: isCurrent ? theme.signalText : isPast ? theme.fgMuted : theme.fgFaint,
      marginTop: dim * 0.2 + sp[2],
      textAlign: "center"
    }, children: meta })
  ] });
}

// rn/RouteMap.tsx
import { View as View69, Text as Text62, Pressable as Pressable39 } from "react-native";
import { Fragment as Fragment11, jsx as jsx77, jsxs as jsxs62 } from "react/jsx-runtime";
function mc(s) {
  return s === "mapped" ? color.noon[400] : s === "exploring" ? color.gold[300] : s === "needs-attention" ? color.terra[300] : "rgba(241,235,221,0.35)";
}
function mb(s) {
  return s === "mapped" ? color.noon[400] : s === "needs-attention" ? "rgba(212,149,110,0.18)" : "transparent";
}
function ml(s) {
  return s === "mapped" ? "Mastered" : s === "exploring" ? "Exploring" : s === "not-started" ? "Not started" : s === "needs-attention" ? "Still uncertain" : "Not started";
}
var CW = 24;
var EP = 16;
function RouteMap({ chapters, currentChapter, onChapterPress, onMarkerPress }) {
  const { theme, mode } = useTheme();
  const isPast = (ch) => ch.status === "complete" || ch.status === "strong" || ch.status === "weak";
  const isCurr = (ch) => ch.id === currentChapter;
  const currentIdx = chapters.findIndex((ch) => ch.id === currentChapter);
  const progressPct = currentIdx >= 0 ? Math.round((chapters.length - currentIdx) / chapters.length * 100) : 0;
  return /* @__PURE__ */ jsxs62(View69, { style: { position: "relative" }, children: [
    /* @__PURE__ */ jsx77(View69, { style: { position: "absolute", top: 0, bottom: 0, left: "50%", width: 1, marginLeft: -0.5, backgroundColor: "rgba(241,235,221,0.06)" } }),
    progressPct > 0 && /* @__PURE__ */ jsx77(View69, { style: { position: "absolute", bottom: 0, left: "50%", marginLeft: -0.5, width: 1, height: `${progressPct}%`, backgroundColor: color.noon[400], opacity: 0.25 } }),
    chapters.map((ch, ci) => {
      const past = isPast(ch);
      const current = isCurr(ch);
      const future = ch.status === "upcoming" || ch.status === "locked";
      const distant = ch.status === "locked";
      const dimSize = current ? 44 : 36;
      const mapped = ch.markers.filter((m) => m.status === "mapped").length;
      const total = ch.markers.length;
      const hdrColor = current ? color.gold[300] : ch.status === "weak" ? color.terra[300] : past ? color.noon[400] : theme.fgFaint;
      return /* @__PURE__ */ jsxs62(View69, { style: { paddingTop: ci === 0 ? sp[2] : sp[6] }, children: [
        /* @__PURE__ */ jsx77(Pressable39, { onPress: () => onChapterPress?.(ch), style: { alignItems: "center", zIndex: 5 }, children: /* @__PURE__ */ jsx77(View69, { style: {
          width: dimSize,
          height: dimSize,
          transform: [{ rotate: "45deg" }],
          borderWidth: current ? 2.5 : 1.5,
          borderColor: hdrColor,
          borderStyle: future ? "dashed" : "solid",
          backgroundColor: color.void[300],
          ...current ? { shadowColor: color.gold[300], shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 14, elevation: 6 } : {},
          ...distant ? { opacity: 0.5 } : {}
        }, children: /* @__PURE__ */ jsx77(View69, { style: { flex: 1, alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsx77(Text62, { style: {
          transform: [{ rotate: "-45deg" }],
          fontFamily: font.mono,
          fontSize: fs[11],
          fontWeight: fw[600],
          color: current ? color.gold[300] : past ? hdrColor : theme.fgFaint
        }, children: past ? `${ch.level}%` : "\u2014" }) }) }) }),
        /* @__PURE__ */ jsxs62(View69, { style: { alignItems: "center", marginTop: sp[4], marginBottom: sp[3], paddingHorizontal: sp[4] }, children: [
          /* @__PURE__ */ jsx77(Text62, { style: {
            fontFamily: font.serif,
            fontSize: current ? fs[18] : fs[15],
            fontWeight: fw[500],
            textAlign: "center",
            color: current ? theme.fg : distant ? theme.fgSubtle : theme.fgMuted,
            ...distant ? { opacity: 0.5 } : {}
          }, children: ch.title }),
          past && /* @__PURE__ */ jsxs62(Text62, { style: { fontFamily: font.mono, fontSize: fs[9], color: mapped === total ? theme.accentText : theme.terra, marginTop: sp[1] }, children: [
            mapped,
            "/",
            total,
            " mastered"
          ] }),
          current && /* @__PURE__ */ jsx77(Text62, { style: { fontFamily: font.mono, fontSize: fs[9], color: theme.signalText, marginTop: sp[1] }, children: "Next exam \xB7 9 days" })
        ] }),
        ch.markers.map((marker, mi) => {
          const isLeft = mi % 2 === 0;
          const mCol = mc(marker.status);
          const mBgCol = mb(marker.status);
          const dashed = marker.status === "unmapped" || marker.status === "not-started";
          const isCurrCh = current;
          const sub = marker.sublabel || ml(marker.status);
          const bdr = marker.status === "mapped" ? "rgba(100,216,174,0.2)" : marker.status === "needs-attention" ? "rgba(212,149,110,0.25)" : marker.status === "exploring" ? "rgba(201,162,39,0.2)" : isCurrCh ? "rgba(100,216,174,0.15)" : theme.border;
          const bg = isCurrCh && marker.status !== "mapped" ? "rgba(100,216,174,0.03)" : "rgba(16,23,42,0.55)";
          const connCol = marker.status === "mapped" ? color.noon[400] : theme.fgFaint;
          const connOp = marker.status === "mapped" ? 0.3 : 0.3;
          return /* @__PURE__ */ jsxs62(View69, { style: { flexDirection: "row", marginTop: sp[1], alignItems: "center" }, children: [
            /* @__PURE__ */ jsx77(View69, { style: { width: "50%", flexDirection: "row", alignItems: "center" }, children: isLeft && /* @__PURE__ */ jsxs62(Fragment11, { children: [
              /* @__PURE__ */ jsxs62(
                Pressable39,
                {
                  onPress: () => onMarkerPress?.(marker, ch),
                  style: { flex: 1, marginLeft: EP, flexDirection: "row-reverse", alignItems: "center", gap: sp[2], paddingVertical: sp[2], paddingHorizontal: sp[3], backgroundColor: bg, borderWidth: 1, borderColor: bdr, borderRadius: r[2] },
                  children: [
                    /* @__PURE__ */ jsx77(View69, { style: {
                      width: 10,
                      height: 10,
                      transform: [{ rotate: "45deg" }],
                      borderWidth: 1.5,
                      borderColor: mCol,
                      borderStyle: dashed ? "dashed" : "solid",
                      backgroundColor: mBgCol,
                      ...marker.status === "mapped" ? { shadowColor: color.noon[400], shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 4 } : {}
                    } }),
                    /* @__PURE__ */ jsxs62(View69, { style: { flex: 1 }, children: [
                      /* @__PURE__ */ jsx77(Text62, { style: { fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: dashed ? theme.fgMuted : theme.fg, textAlign: "right" }, numberOfLines: 1, children: marker.label }),
                      /* @__PURE__ */ jsx77(Text62, { style: { fontFamily: font.mono, fontSize: fs[9], color: mCol, letterSpacing: 1, textTransform: "uppercase", marginTop: 2, textAlign: "right" }, children: sub })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsx77(View69, { style: { width: CW, height: 1, backgroundColor: connCol, opacity: connOp } })
            ] }) }),
            /* @__PURE__ */ jsx77(View69, { style: { width: "50%", flexDirection: "row", alignItems: "center" }, children: !isLeft && /* @__PURE__ */ jsxs62(Fragment11, { children: [
              /* @__PURE__ */ jsx77(View69, { style: { width: CW, height: 1, backgroundColor: connCol, opacity: connOp } }),
              /* @__PURE__ */ jsxs62(
                Pressable39,
                {
                  onPress: () => onMarkerPress?.(marker, ch),
                  style: { flex: 1, marginRight: EP, flexDirection: "row", alignItems: "center", gap: sp[2], paddingVertical: sp[2], paddingHorizontal: sp[3], backgroundColor: bg, borderWidth: 1, borderColor: bdr, borderRadius: r[2] },
                  children: [
                    /* @__PURE__ */ jsx77(View69, { style: {
                      width: 10,
                      height: 10,
                      transform: [{ rotate: "45deg" }],
                      borderWidth: 1.5,
                      borderColor: mCol,
                      borderStyle: dashed ? "dashed" : "solid",
                      backgroundColor: mBgCol,
                      ...marker.status === "mapped" ? { shadowColor: color.noon[400], shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 4 } : {}
                    } }),
                    /* @__PURE__ */ jsxs62(View69, { style: { flex: 1 }, children: [
                      /* @__PURE__ */ jsx77(Text62, { style: { fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: dashed ? theme.fgMuted : theme.fg }, numberOfLines: 1, children: marker.label }),
                      /* @__PURE__ */ jsx77(Text62, { style: { fontFamily: font.mono, fontSize: fs[9], color: mCol, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }, children: sub })
                    ] })
                  ]
                }
              )
            ] }) })
          ] }, marker.id);
        }),
        current && /* @__PURE__ */ jsxs62(View69, { style: { alignItems: "center", marginTop: sp[4] }, children: [
          /* @__PURE__ */ jsx77(View69, { style: { width: 28, height: 28, borderRadius: 14, backgroundColor: "rgba(107,163,255,0.12)", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsx77(View69, { style: { width: 12, height: 12, borderRadius: 6, backgroundColor: theme.water, borderWidth: 2, borderColor: color.chalk[100], shadowColor: theme.water, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 6 } }) }),
          /* @__PURE__ */ jsx77(Text62, { style: { fontFamily: font.mono, fontSize: fs[9], fontWeight: fw[600], color: theme.water, letterSpacing: 1.5, textTransform: "uppercase", marginTop: sp[1] }, children: "You are here" })
        ] })
      ] }, ch.id);
    })
  ] });
}

// rn/GridPaper.tsx
import { View as View70 } from "react-native";
import Svg7, { Line as Line2 } from "react-native-svg";
import { jsx as jsx78 } from "react/jsx-runtime";
function GridPaper({ variant = "standard", width, height, style }) {
  const { theme, mode } = useTheme();
  const isVoid = mode === "void";
  const lineColor = isVoid ? "rgba(241,235,221,0.08)" : "rgba(38,40,46,0.08)";
  const goldColor = isVoid ? "rgba(201,162,39,0.10)" : "rgba(122,96,20,0.10)";
  const canvasColor = isVoid ? "rgba(241,235,221,0.025)" : "rgba(38,40,46,0.03)";
  const lines = [];
  if (variant === "standard") {
    const step = 16;
    for (let x = 0; x <= width; x += step) {
      lines.push(/* @__PURE__ */ jsx78(Line2, { x1: x, y1: 0, x2: x, y2: height, stroke: lineColor, strokeWidth: 0.5 }, `v${x}`));
    }
    for (let y = 0; y <= height; y += step) {
      lines.push(/* @__PURE__ */ jsx78(Line2, { x1: 0, y1: y, x2: width, y2: y, stroke: lineColor, strokeWidth: 0.5 }, `h${y}`));
    }
  } else if (variant === "major") {
    const minor = 8;
    const major = 64;
    for (let x = 0; x <= width; x += minor) {
      const isMajor = x % major === 0;
      lines.push(/* @__PURE__ */ jsx78(Line2, { x1: x, y1: 0, x2: x, y2: height, stroke: isMajor ? goldColor : lineColor, strokeWidth: 0.5 }, `v${x}`));
    }
    for (let y = 0; y <= height; y += minor) {
      const isMajor = y % major === 0;
      lines.push(/* @__PURE__ */ jsx78(Line2, { x1: 0, y1: y, x2: width, y2: y, stroke: isMajor ? goldColor : lineColor, strokeWidth: 0.5 }, `h${y}`));
    }
  } else {
    const step = 24;
    for (let x = 0; x <= width; x += step) {
      lines.push(/* @__PURE__ */ jsx78(Line2, { x1: x, y1: 0, x2: x, y2: height, stroke: canvasColor, strokeWidth: 0.5 }, `v${x}`));
    }
    for (let y = 0; y <= height; y += step) {
      lines.push(/* @__PURE__ */ jsx78(Line2, { x1: 0, y1: y, x2: width, y2: y, stroke: canvasColor, strokeWidth: 0.5 }, `h${y}`));
    }
  }
  return /* @__PURE__ */ jsx78(View70, { style: [{ width, height, backgroundColor: theme.bg }, style], children: /* @__PURE__ */ jsx78(Svg7, { width, height, style: { position: "absolute" }, children: lines }) });
}

// rn/TerrainPattern.tsx
import { useMemo as useMemo5 } from "react";
import { View as View71 } from "react-native";
import Svg8, { Path as Path6 } from "react-native-svg";
import { jsx as jsx79 } from "react/jsx-runtime";
function seeded(s) {
  return () => {
    s = Math.sin(s) * 1e4;
    return s - Math.floor(s);
  };
}
function generateContours(w, h3, variant, isVoid, seed) {
  const gaps = variant === "dense" ? [4, 4, 3, 3, 3, 3, 4, 5, 7, 10, 7, 5, 3, 3, 3, 4, 5, 8, 12, 8, 5, 3, 3, 3, 4, 5, 7, 10, 14, 10, 7, 4, 3, 3, 3, 4, 5] : [7, 9, 6, 5, 4, 3, 3, 3, 4, 5, 7, 10, 16, 24, 18, 12, 8, 6, 4, 3, 3, 4, 6, 9, 14, 20, 14, 8, 5, 4, 3, 3, 4, 6, 9];
  const maxGap = variant === "dense" ? 14 : 24;
  const baseOpacity = isVoid ? 0.05 : 0.06;
  const opacityRange = isVoid ? 0.2 : 0.24;
  const pts = 20;
  const step = w / (pts - 1);
  const rng = seeded(seed);
  let baseShape = [];
  for (let p = 0; p < pts; p++) {
    const s1 = Math.sin(p * 0.18 + 1.2) * 8;
    const s2 = Math.sin(p * 0.42 + 3.8) * 4;
    const s3 = Math.sin(p * 0.85 + 0.5) * 2;
    baseShape.push(s1 + s2 + s3 + (rng() - 0.5) * 5);
  }
  for (let pass = 0; pass < 2; pass++) {
    const smoothed = [];
    for (let p = 0; p < pts; p++) {
      const prev = p > 0 ? baseShape[p - 1] : baseShape[p];
      const next = p < pts - 1 ? baseShape[p + 1] : baseShape[p];
      smoothed.push(prev * 0.25 + baseShape[p] * 0.5 + next * 0.25);
    }
    baseShape = smoothed;
  }
  const mean = baseShape.reduce((a, b) => a + b, 0) / baseShape.length;
  baseShape = baseShape.map((v) => v - mean);
  const extGaps = [];
  let total = 0;
  while (total < h3 + 80) {
    for (const g of gaps) {
      extGaps.push(g);
      total += g;
    }
  }
  const paths2 = [];
  let y = 0;
  for (let i = 0; i < extGaps.length && y < h3 + 10; i++) {
    const nextGap = extGaps[Math.min(i + 1, extGaps.length - 1)];
    const a = baseOpacity + nextGap / maxGap * opacityRange;
    const lineRng = seeded(seed + i * 3.7);
    const drift = (lineRng() - 0.5) * 3;
    const coords = [];
    for (let p = 0; p < pts; p++) {
      const x = p * step;
      const lineNoise = (lineRng() - 0.5) * 1.5;
      const diverge = Math.sin(p * 0.3 + i * 0.4) * (1.5 + i * 0.12);
      coords.push([Math.round(x * 10) / 10, Math.round((y + baseShape[p] + diverge + drift + lineNoise) * 10) / 10]);
    }
    let d = `M${coords[0][0]},${coords[0][1]}`;
    for (let j = 1; j < coords.length; j++) {
      const cpx = (coords[j - 1][0] + coords[j][0]) / 2;
      d += ` C${cpx},${coords[j - 1][1]} ${cpx},${coords[j][1]} ${coords[j][0]},${coords[j][1]}`;
    }
    const strokeColor = isVoid ? `rgba(241,235,221,${a.toFixed(3)})` : `rgba(38,40,46,${a.toFixed(3)})`;
    paths2.push(`${d}|${strokeColor}`);
    y += extGaps[i];
  }
  return paths2;
}
function TerrainPattern({ width, height, variant = "standard", opacity = 1, style }) {
  const { theme, mode } = useTheme();
  const isVoid = mode === "void";
  const paths2 = useMemo5(
    () => generateContours(width, height, variant, isVoid, 42),
    [width, height, variant, isVoid]
  );
  return /* @__PURE__ */ jsx79(View71, { style: [{ width, height, backgroundColor: theme.bg, overflow: "hidden" }, style], children: /* @__PURE__ */ jsx79(Svg8, { width, height, style: { position: "absolute", opacity }, children: paths2.map((entry, i) => {
    const [d, stroke] = entry.split("|");
    return /* @__PURE__ */ jsx79(Path6, { d, stroke, strokeWidth: 0.8, fill: "none" }, i);
  }) }) });
}

// rn/DunePattern.tsx
import React34 from "react";
import { View as View72 } from "react-native";
import Svg9, { Path as Path7 } from "react-native-svg";
import { jsx as jsx80, jsxs as jsxs63 } from "react/jsx-runtime";
function DunePattern({ width: w, height: h3, opacity = 1, style }) {
  const { mode } = useTheme();
  const v = mode === "void";
  const B = h3 + 10;
  const layers = [
    // Layer 1 — farthest, high gentle ridge
    {
      ridge: `M0,${h3 * 0.55} Q${w * 0.25},${h3 * 0.28} ${w * 0.5},${h3 * 0.38} Q${w * 0.75},${h3 * 0.48} ${w},${h3 * 0.42}`,
      shadow: `M0,${h3 * 0.55} Q${w * 0.25},${h3 * 0.28} ${w * 0.5},${h3 * 0.38} L${w * 0.5},${B} L0,${B} Z`,
      lit: `M${w * 0.5},${h3 * 0.38} Q${w * 0.75},${h3 * 0.48} ${w},${h3 * 0.42} L${w},${B} L${w * 0.5},${B} Z`,
      sCol: v ? color.void[100] : color.chalk[300],
      sOp: v ? 0.06 : 0.03,
      lCol: color.gold[400],
      lOp: v ? 0.05 : 0.03
    },
    // Layer 2 — mid-far, sweeps left
    {
      ridge: `M0,${h3 * 0.5} Q${w * 0.15},${h3 * 0.35} ${w * 0.35},${h3 * 0.42} Q${w * 0.6},${h3 * 0.52} ${w},${h3 * 0.55}`,
      shadow: `M0,${h3 * 0.5} Q${w * 0.15},${h3 * 0.35} ${w * 0.35},${h3 * 0.42} L${w * 0.35},${B} L0,${B} Z`,
      lit: `M${w * 0.35},${h3 * 0.42} Q${w * 0.6},${h3 * 0.52} ${w},${h3 * 0.55} L${w},${B} L${w * 0.35},${B} Z`,
      sCol: v ? color.terra[800] : color.terra[200],
      sOp: v ? 0.08 : 0.04,
      lCol: color.gold[300],
      lOp: v ? 0.08 : 0.05
    },
    // Layer 3 — middle, bold peak right of center
    {
      ridge: `M0,${h3 * 0.7} Q${w * 0.3},${h3 * 0.4} ${w * 0.58},${h3 * 0.48} Q${w * 0.8},${h3 * 0.55} ${w},${h3 * 0.52}`,
      shadow: `M0,${h3 * 0.7} Q${w * 0.3},${h3 * 0.4} ${w * 0.58},${h3 * 0.48} L${w * 0.58},${B} L0,${B} Z`,
      lit: `M${w * 0.58},${h3 * 0.48} Q${w * 0.8},${h3 * 0.55} ${w},${h3 * 0.52} L${w},${B} L${w * 0.58},${B} Z`,
      sCol: v ? color.void[200] : color.terra[300],
      sOp: v ? 0.1 : 0.06,
      lCol: color.gold[200],
      lOp: v ? 0.12 : 0.07
    },
    // Layer 4 — near, wide dune sweeping right
    {
      ridge: `M0,${h3 * 0.75} Q${w * 0.2},${h3 * 0.55} ${w * 0.45},${h3 * 0.62} Q${w * 0.7},${h3 * 0.68} ${w},${h3 * 0.6}`,
      shadow: `M0,${h3 * 0.75} Q${w * 0.2},${h3 * 0.55} ${w * 0.45},${h3 * 0.62} L${w * 0.45},${B} L0,${B} Z`,
      lit: `M${w * 0.45},${h3 * 0.62} Q${w * 0.7},${h3 * 0.68} ${w},${h3 * 0.6} L${w},${B} L${w * 0.45},${B} Z`,
      sCol: v ? color.terra[700] : color.terra[400],
      sOp: v ? 0.1 : 0.06,
      lCol: color.gold[300],
      lOp: v ? 0.14 : 0.08
    },
    // Layer 5 — nearest, low foreground ridge
    {
      ridge: `M0,${h3 * 0.88} Q${w * 0.35},${h3 * 0.72} ${w * 0.65},${h3 * 0.78} Q${w * 0.85},${h3 * 0.82} ${w},${h3 * 0.76}`,
      shadow: `M0,${h3 * 0.88} Q${w * 0.35},${h3 * 0.72} ${w * 0.65},${h3 * 0.78} L${w * 0.65},${B} L0,${B} Z`,
      lit: `M${w * 0.65},${h3 * 0.78} Q${w * 0.85},${h3 * 0.82} ${w},${h3 * 0.76} L${w},${B} L${w * 0.65},${B} Z`,
      sCol: v ? color.void[100] : color.chalk[300],
      sOp: v ? 0.08 : 0.04,
      lCol: color.gold[400],
      lOp: v ? 0.1 : 0.06
    }
  ];
  return /* @__PURE__ */ jsx80(View72, { style: [{ width: w, height: h3, overflow: "hidden" }, style], children: /* @__PURE__ */ jsx80(Svg9, { width: w, height: h3, style: { position: "absolute", opacity }, children: layers.map((l, i) => /* @__PURE__ */ jsxs63(React34.Fragment, { children: [
    /* @__PURE__ */ jsx80(Path7, { d: l.shadow, fill: l.sCol, fillOpacity: l.sOp }),
    /* @__PURE__ */ jsx80(Path7, { d: l.lit, fill: l.lCol, fillOpacity: l.lOp })
  ] }, i)) }) });
}

// rn/Facet.tsx
import { useEffect as useEffect9, useMemo as useMemo6 } from "react";
import { View as View73 } from "react-native";
import Svg10, { Path as Path8 } from "react-native-svg";
import Animated10, {
  useSharedValue as useSharedValue10,
  useAnimatedStyle as useAnimatedStyle10,
  withRepeat as withRepeat4,
  withTiming as withTiming10,
  Easing as Easing9,
  cancelAnimation as cancelAnimation4,
  useReducedMotion
} from "react-native-reanimated";

// rn/labNoise.ts
function makeNoise2D(seed = 1) {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let s = seed || 1;
  const rng = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = p[i];
    p[i] = p[j];
    p[j] = tmp;
  }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a, b, t) => a + t * (b - a);
  const grad = (hash, x, y) => {
    const h3 = hash & 7;
    const u = h3 < 4 ? x : y;
    const v = h3 < 4 ? y : x;
    return (h3 & 1 ? -u : u) + (h3 & 2 ? -2 * v : 2 * v);
  };
  return (x, y) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const u = fade(x);
    const v = fade(y);
    const aa = perm[perm[X] + Y];
    const ab = perm[perm[X] + Y + 1];
    const ba = perm[perm[X + 1] + Y];
    const bb = perm[perm[X + 1] + Y + 1];
    return lerp(
      lerp(grad(aa, x, y), grad(ba, x - 1, y), u),
      lerp(grad(ab, x, y - 1), grad(bb, x - 1, y - 1), u),
      v
    );
  };
}
var noise = makeNoise2D(42);
var noise2 = makeNoise2D(7);
var pathNoise = makeNoise2D(123);

// rn/Facet.tsx
import { jsx as jsx81, jsxs as jsxs64 } from "react/jsx-runtime";
var SCALES = {
  lg: { cell: 72, sw: 1.4 },
  md: { cell: 44, sw: 1 },
  sm: { cell: 26, sw: 0.7 }
};
var RAMPS = {
  dunes: { fills: ["#CB7A50", "#BC5A37", "#A94E2A", "#96431F"], stroke: "rgba(241,235,221,0.35)" },
  plaster: { fills: ["#F5EFE3", "#F1EBDD", "#EFE7D5", "#E9DFC9"], stroke: "rgba(255,255,255,0.5)" }
};
function Facet({
  width: w,
  height: h3,
  voice = "dunes",
  scale = "md",
  seed = 7,
  animated = true,
  style
}) {
  const reducedMotion = useReducedMotion();
  const effective = animated && !reducedMotion;
  const S2 = SCALES[scale];
  const ramp = RAMPS[voice];
  const { shadeDs, allD } = useMemo6(() => {
    const jitterNoise = makeNoise2D(seed);
    const shadeNoise = makeNoise2D(seed + 101);
    const cols = Math.max(1, Math.round(w / S2.cell));
    const rows = Math.max(1, Math.round(h3 / S2.cell));
    const cw = w / cols;
    const ch = h3 / rows;
    const amp = Math.min(cw, ch) * 0.36;
    const vx = [];
    const vy = [];
    for (let j = 0; j <= rows; j++) {
      for (let i = 0; i <= cols; i++) {
        let x = i * cw;
        let y = j * ch;
        if (i > 0 && i < cols) x += jitterNoise(i * 0.83 + 11.3, j * 0.71 + 5.7) * amp;
        if (j > 0 && j < rows) y += jitterNoise(i * 0.67 + 41.9, j * 0.91 + 23.1) * amp;
        vx.push(x);
        vy.push(y);
      }
    }
    const ds = ["", "", "", ""];
    const stride = cols + 1;
    const f = (n) => Math.round(n * 10) / 10;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const a = j * stride + i;
        const b = a + 1;
        const c = a + stride;
        const d = c + 1;
        const flip = jitterNoise(i * 0.53 + 91.7, j * 0.59 + 67.3) > 0;
        const tris = flip ? [[a, b, d], [a, d, c]] : [[a, b, c], [b, d, c]];
        for (const t2 of tris) {
          const cx = (vx[t2[0]] + vx[t2[1]] + vx[t2[2]]) / 3;
          const cy = (vy[t2[0]] + vy[t2[1]] + vy[t2[2]]) / 3;
          const n = shadeNoise(cx / S2.cell * 0.7, cy / S2.cell * 0.7);
          const idx = Math.min(3, Math.max(0, Math.floor((n * 0.5 + 0.5) * 4)));
          ds[idx] += `M${f(vx[t2[0]])} ${f(vy[t2[0]])}L${f(vx[t2[1]])} ${f(vy[t2[1]])}L${f(vx[t2[2]])} ${f(vy[t2[2]])}Z`;
        }
      }
    }
    return { shadeDs: ds, allD: ds.join("") };
  }, [w, h3, scale, seed]);
  const t = useSharedValue10(0);
  useEffect9(() => {
    if (!effective) {
      t.value = 0;
      return;
    }
    t.value = withRepeat4(
      withTiming10(1, { duration: 6e3, easing: Easing9.linear }),
      -1
    );
    return () => {
      cancelAnimation4(t);
    };
  }, [effective]);
  const g0 = useAnimatedStyle10(() => ({
    opacity: effective ? 0.9 + 0.1 * Math.sin(2 * Math.PI * t.value) : 1
  }));
  const g1 = useAnimatedStyle10(() => ({
    opacity: effective ? 0.9 + 0.1 * Math.sin(2 * Math.PI * (t.value + 0.25)) : 1
  }));
  const g2 = useAnimatedStyle10(() => ({
    opacity: effective ? 0.9 + 0.1 * Math.sin(2 * Math.PI * (t.value + 0.5)) : 1
  }));
  const g3 = useAnimatedStyle10(() => ({
    opacity: effective ? 0.9 + 0.1 * Math.sin(2 * Math.PI * (t.value + 0.75)) : 1
  }));
  const groupStyles = [g0, g1, g2, g3];
  const fill = { position: "absolute", top: 0, left: 0 };
  return /* @__PURE__ */ jsxs64(View73, { style: [{ width: w, height: h3, overflow: "hidden", backgroundColor: ramp.fills[1] }, style], pointerEvents: "none", children: [
    shadeDs.map((d, i) => /* @__PURE__ */ jsx81(Animated10.View, { style: [fill, groupStyles[i]], children: /* @__PURE__ */ jsx81(Svg10, { width: w, height: h3, children: /* @__PURE__ */ jsx81(Path8, { d, fill: ramp.fills[i] }) }) }, i)),
    /* @__PURE__ */ jsx81(Svg10, { width: w, height: h3, style: fill, children: /* @__PURE__ */ jsx81(Path8, { d: allD, fill: "none", stroke: ramp.stroke, strokeWidth: S2.sw, strokeLinejoin: "round" }) })
  ] });
}

// rn/Khatam.tsx
import { useMemo as useMemo7 } from "react";
import { View as View74 } from "react-native";
import Svg11, { Path as Path9 } from "react-native-svg";
import { jsx as jsx82, jsxs as jsxs65 } from "react/jsx-runtime";
var SCALES2 = {
  lg: { tile: 132, sw: 1.2 },
  md: { tile: 88, sw: 1 },
  sm: { tile: 48, sw: 0.8 }
};
function Khatam({
  width: w,
  height: h3,
  scale = "md",
  style
}) {
  const { mode } = useTheme();
  const S2 = SCALES2[scale];
  const stroke = mode === "void" ? "rgba(241,235,221,0.18)" : "rgba(38,40,46,0.22)";
  const { squaresD, diamondsD } = useMemo7(() => {
    const k = S2.tile / 96;
    const cols = Math.ceil(w / S2.tile) + 1;
    const rows = Math.ceil(h3 / S2.tile) + 1;
    let sq = "";
    let di = "";
    const f = (n) => Math.round(n * 10) / 10;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const tx = i * S2.tile;
        const ty = j * S2.tile;
        const x = tx + 14 * k;
        const y = ty + 14 * k;
        const s = 68 * k;
        sq += `M${f(x)} ${f(y)}h${f(s)}v${f(s)}h${f(-s)}Z`;
        di += `M${f(tx + 48 * k)} ${f(ty)}L${f(tx + 96 * k)} ${f(ty + 48 * k)}L${f(tx + 48 * k)} ${f(ty + 96 * k)}L${f(tx)} ${f(ty + 48 * k)}Z`;
      }
    }
    return { squaresD: sq, diamondsD: di };
  }, [w, h3, scale]);
  return /* @__PURE__ */ jsx82(View74, { style: [{ width: w, height: h3, overflow: "hidden" }, style], pointerEvents: "none", children: /* @__PURE__ */ jsxs65(Svg11, { width: w, height: h3, children: [
    /* @__PURE__ */ jsx82(Path9, { d: squaresD, fill: "none", stroke, strokeWidth: S2.sw }),
    /* @__PURE__ */ jsx82(Path9, { d: diamondsD, fill: "none", stroke, strokeWidth: S2.sw, strokeLinejoin: "round" })
  ] }) });
}

// rn/Pinboard.tsx
import { useEffect as useEffect10, useMemo as useMemo8 } from "react";
import { View as View75 } from "react-native";
import Svg12, { Circle as Circle3, Path as Path10 } from "react-native-svg";
import Animated11, {
  useSharedValue as useSharedValue11,
  useAnimatedStyle as useAnimatedStyle11,
  withRepeat as withRepeat5,
  withTiming as withTiming11,
  withDelay as withDelay3,
  interpolate as interpolate2,
  Easing as Easing10,
  cancelAnimation as cancelAnimation5,
  useReducedMotion as useReducedMotion2
} from "react-native-reanimated";
import { jsx as jsx83, jsxs as jsxs66 } from "react/jsx-runtime";
var SCALES3 = {
  xs: { r: 1.1, gap: 9 },
  sm: { r: 1.9, gap: 15 },
  md: { r: 2.2, gap: 17 },
  lg: { r: 3.2, gap: 26 }
};
var ACTIVE = "#6BAE93";
var BLINK_COUNT = 22;
function BlinkDot({ spec, r: r10, color: color6 }) {
  const p = useSharedValue11(0);
  useEffect10(() => {
    p.value = 0;
    p.value = withDelay3(
      spec.delay,
      withRepeat5(withTiming11(1, { duration: spec.period, easing: Easing10.linear }), -1)
    );
    return () => {
      cancelAnimation5(p);
    };
  }, [spec]);
  const ramp = Math.min(0.06, 150 / spec.period);
  const animStyle = useAnimatedStyle11(() => ({
    opacity: interpolate2(
      p.value,
      [0, spec.onStart, spec.onStart + ramp, spec.onEnd - ramp, spec.onEnd, 1],
      [0, 0, 1, 1, 0, 0]
    )
  }));
  return /* @__PURE__ */ jsx83(
    Animated11.View,
    {
      style: [
        {
          position: "absolute",
          left: spec.x - r10,
          top: spec.y - r10,
          width: r10 * 2,
          height: r10 * 2,
          borderRadius: r10,
          backgroundColor: color6
        },
        animStyle
      ]
    }
  );
}
function Pinboard({
  width: w,
  height: h3,
  scale = "md",
  active = [],
  seed = 3,
  animated = true,
  style
}) {
  const { mode } = useTheme();
  const reducedMotion = useReducedMotion2();
  const effective = animated && !reducedMotion;
  const S2 = SCALES3[scale];
  const isVoid = mode === "void";
  const dotColor = isVoid ? "rgba(241,235,221,0.35)" : "rgba(188,90,55,0.38)";
  const { staticD, activeDots, blinkDots } = useMemo8(() => {
    const noise3 = makeNoise2D(seed);
    const cols = Math.floor(w / S2.gap);
    const rows = Math.floor(h3 / S2.gap);
    const activeKeys = new Set(active.map(([c, rw]) => `${c},${rw}`));
    const blinks = [];
    if (effective) {
      const candidates = [];
      for (let rw = 0; rw < rows; rw++) {
        for (let c = 0; c < cols; c++) {
          const key = `${c},${rw}`;
          if (activeKeys.has(key)) continue;
          candidates.push({
            key,
            x: S2.gap / 2 + c * S2.gap,
            y: S2.gap / 2 + rw * S2.gap,
            v: noise3(c * 0.73 + 3.1, rw * 0.67 + 8.9)
          });
        }
      }
      candidates.sort((a, b) => b.v - a.v);
      candidates.slice(0, BLINK_COUNT).forEach((cand, i) => {
        const r1 = noise3(i * 1.37 + 51.2, 17.9) * 0.5 + 0.5;
        const r22 = noise3(i * 2.11 + 93.4, 71.3) * 0.5 + 0.5;
        const r32 = noise3(i * 3.71 + 29.8, 43.7) * 0.5 + 0.5;
        const onStart = 0.05 + r32 * 0.3;
        blinks.push({
          x: cand.x,
          y: cand.y,
          delay: Math.round(i / BLINK_COUNT * 1800 + r1 * 600),
          period: Math.round(1800 + r22 * 2200),
          // 1.8–4s cycles
          onStart,
          onEnd: onStart + 0.35 + r1 * 0.25
          // lit 35–60% of the cycle
        });
      });
    }
    let d = "";
    const acts = [];
    const f = (n) => Math.round(n * 10) / 10;
    const r10 = S2.r;
    for (let rw = 0; rw < rows; rw++) {
      for (let c = 0; c < cols; c++) {
        const key = `${c},${rw}`;
        const x = S2.gap / 2 + c * S2.gap;
        const y = S2.gap / 2 + rw * S2.gap;
        if (activeKeys.has(key)) {
          acts.push({ x, y });
          continue;
        }
        d += `M${f(x - r10)} ${f(y)}a${r10} ${r10} 0 1 0 ${r10 * 2} 0a${r10} ${r10} 0 1 0 ${-r10 * 2} 0`;
      }
    }
    return { staticD: d, activeDots: acts, blinkDots: blinks };
  }, [w, h3, scale, seed, active, effective]);
  return /* @__PURE__ */ jsxs66(View75, { style: [{ width: w, height: h3, overflow: "hidden" }, style], pointerEvents: "none", children: [
    /* @__PURE__ */ jsxs66(Svg12, { width: w, height: h3, children: [
      /* @__PURE__ */ jsx83(Path10, { d: staticD, fill: dotColor }),
      activeDots.map((dot, i) => /* @__PURE__ */ jsx83(Circle3, { cx: dot.x, cy: dot.y, r: S2.r * 1.4, fill: ACTIVE }, `a${i}`))
    ] }),
    blinkDots.map((spec, i) => /* @__PURE__ */ jsx83(BlinkDot, { spec, r: S2.r * 1.4, color: ACTIVE }, `b${i}`))
  ] });
}

// rn/ConstellationPattern.tsx
import React38 from "react";
import { View as View76 } from "react-native";
import Svg13, { Path as Path11, Line as Line3, Circle as Circle4 } from "react-native-svg";
import { jsx as jsx84, jsxs as jsxs67 } from "react/jsx-runtime";
function ConstellationPattern({ width: w, height: h3, opacity = 1, style }) {
  const { theme, mode } = useTheme();
  const isVoid = mode === "void";
  const hubs = [
    { x: w * 0.72, y: h3 * 0.62, r: 3.5, bright: true },
    { x: w * 0.32, y: h3 * 0.58, r: 3, bright: true }
  ];
  const secondaryNodes = [
    { x: w * 0.95, y: h3 * 0.45 },
    { x: w * 0.88, y: h3 * 0.78 },
    { x: w * 0.6, y: h3 * 0.42 },
    { x: w * 0.82, y: h3 * 0.35 },
    { x: w * 0.55, y: h3 * 0.75 },
    { x: w * 0.98, y: h3 * 0.62 },
    { x: w * 0.75, y: h3 * 0.88 },
    { x: w * 0.65, y: h3 * 0.52 },
    { x: w * 0.08, y: h3 * 0.48 },
    { x: w * 0.15, y: h3 * 0.72 },
    { x: w * 0.42, y: h3 * 0.4 },
    { x: w * 0.2, y: h3 * 0.38 },
    { x: w * 0.05, y: h3 * 0.65 },
    { x: w * 0.38, y: h3 * 0.82 },
    { x: w * 0.48, y: h3 * 0.68 },
    { x: w * 0.5, y: h3 * 0.55 }
  ];
  const allNodes = [...hubs, ...secondaryNodes.map((n) => ({ ...n, r: 1 + Math.random() * 1.5, bright: Math.random() > 0.5 }))];
  const connections = [];
  for (let i = 2; i <= 9; i++) connections.push([0, i]);
  for (let i = 10; i <= 16; i++) connections.push([1, i]);
  connections.push([0, 17], [1, 17], [0, 1]);
  connections.push([4, 7], [5, 6], [10, 12], [11, 14], [2, 3], [6, 16], [9, 15]);
  const triangles = [
    [0, 2, 3],
    [0, 3, 7],
    [0, 7, 5],
    [0, 5, 6],
    [1, 10, 11],
    [1, 11, 14],
    [1, 14, 16],
    [0, 17, 7],
    [1, 17, 14],
    [0, 1, 17],
    [1, 10, 12],
    [0, 2, 5]
  ];
  const triOpacity = [0.35, 0.2, 0.28, 0.15, 0.3, 0.18, 0.25, 0.22, 0.2, 0.32, 0.12, 0.18];
  return /* @__PURE__ */ jsx84(View76, { style: [{ width: w, height: h3, backgroundColor: theme.bg }, style], children: /* @__PURE__ */ jsxs67(Svg13, { width: w, height: h3, style: { opacity }, children: [
    Array.from({ length: 40 }, (_, i) => {
      const sx = (i * 97.3 + 13) % w;
      const sy = (i * 53.7 + 7) % (h3 * 0.5);
      const sr = 0.4 + i % 3 * 0.3;
      return /* @__PURE__ */ jsx84(Circle4, { cx: sx, cy: sy, r: sr, fill: color.gold[300], opacity: 0.1 + i % 4 * 0.08 }, `s${i}`);
    }),
    triangles.map((t, i) => {
      const a = allNodes[t[0]], b = allNodes[t[1]], c = allNodes[t[2]];
      const op = (triOpacity[i] || 0.2) * (isVoid ? 1 : 0.6);
      const isTerra = i === 2 || i === 6 || i === 9;
      return /* @__PURE__ */ jsx84(Path11, { d: `M${a.x},${a.y} L${b.x},${b.y} L${c.x},${c.y} Z`, fill: isTerra ? theme.terra : theme.iris, fillOpacity: isTerra ? op * 0.7 : op }, `t${i}`);
    }),
    connections.map(([a, b], i) => /* @__PURE__ */ jsx84(
      Line3,
      {
        x1: allNodes[a].x,
        y1: allNodes[a].y,
        x2: allNodes[b].x,
        y2: allNodes[b].y,
        stroke: color.gold[400],
        strokeWidth: 0.75,
        strokeOpacity: isVoid ? 0.45 : 0.25
      },
      `c${i}`
    )),
    allNodes.map((n, i) => /* @__PURE__ */ jsxs67(React38.Fragment, { children: [
      n.bright && /* @__PURE__ */ jsx84(Circle4, { cx: n.x, cy: n.y, r: n.r + 8, fill: color.gold[300], opacity: isVoid ? 0.06 : 0.04 }),
      n.bright && /* @__PURE__ */ jsx84(Circle4, { cx: n.x, cy: n.y, r: n.r + 4, fill: color.gold[300], opacity: isVoid ? 0.12 : 0.08 }),
      /* @__PURE__ */ jsx84(Circle4, { cx: n.x, cy: n.y, r: n.r, fill: n.bright ? color.gold[300] : color.gold[400], opacity: n.bright ? isVoid ? 0.85 : 0.6 : isVoid ? 0.45 : 0.3 })
    ] }, `n${i}`))
  ] }) });
}

// rn/Slider.tsx
import { useRef as useRef13, useCallback as useCallback8 } from "react";
import { View as View77, Text as Text63, Platform as Platform12, Pressable as Pressable40 } from "react-native";
import { jsx as jsx85, jsxs as jsxs68 } from "react/jsx-runtime";
function Slider({ value, min, max, step = 0.01, label, showValue = true, onValueChange }) {
  const { theme } = useTheme();
  const trackRef = useRef13(null);
  const widthRef = useRef13(0);
  const pct = Math.max(0, Math.min(100, (value - min) / (max - min) * 100));
  const onLayout = useCallback8((e) => {
    widthRef.current = e.nativeEvent.layout.width;
  }, []);
  if (Platform12.OS === "web") {
    return /* @__PURE__ */ jsxs68(View77, { style: { gap: sp[2] }, children: [
      (label || showValue) && /* @__PURE__ */ jsxs68(View77, { style: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, children: [
        label && /* @__PURE__ */ jsx85(Text63, { style: { fontFamily: font.mono, fontSize: fs[10], color: theme.fgSubtle, letterSpacing: 0.8, textTransform: "uppercase" }, children: label }),
        showValue && /* @__PURE__ */ jsx85(Text63, { style: { fontFamily: font.mono, fontSize: fs[10], color: theme.fg }, children: value.toFixed(step < 1 ? 2 : 0) })
      ] }),
      /* @__PURE__ */ jsx85(
        "input",
        {
          type: "range",
          min,
          max,
          step,
          value,
          onChange: (e) => onValueChange(parseFloat(e.target.value)),
          style: {
            width: "100%",
            height: 1,
            appearance: "none",
            WebkitAppearance: "none",
            background: theme.borderStrong,
            outline: "none",
            cursor: "pointer",
            accentColor: theme.accent
          }
        }
      )
    ] });
  }
  const handlePress = useCallback8((e) => {
    const w = widthRef.current;
    if (w <= 0) return;
    const x = e.nativeEvent.locationX;
    const raw = min + x / w * (max - min);
    const stepped = Math.round(raw / step) * step;
    onValueChange(Math.max(min, Math.min(max, stepped)));
  }, [min, max, step, onValueChange]);
  return /* @__PURE__ */ jsxs68(View77, { style: { gap: sp[2] }, children: [
    (label || showValue) && /* @__PURE__ */ jsxs68(View77, { style: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, children: [
      label && /* @__PURE__ */ jsx85(Text63, { style: { fontFamily: font.mono, fontSize: fs[10], color: theme.fgSubtle, letterSpacing: 0.8, textTransform: "uppercase" }, children: label }),
      showValue && /* @__PURE__ */ jsx85(Text63, { style: { fontFamily: font.mono, fontSize: fs[10], color: theme.fg }, children: value.toFixed(step < 1 ? 2 : 0) })
    ] }),
    /* @__PURE__ */ jsxs68(
      Pressable40,
      {
        onPress: handlePress,
        onLayout,
        ref: trackRef,
        style: { height: 24, justifyContent: "center" },
        children: [
          /* @__PURE__ */ jsx85(View77, { style: { height: 2, backgroundColor: theme.borderStrong, borderRadius: 1 }, children: /* @__PURE__ */ jsx85(View77, { style: { height: 2, width: `${pct}%`, backgroundColor: theme.accent, borderRadius: 1 } }) }),
          /* @__PURE__ */ jsx85(View77, { style: {
            position: "absolute",
            left: `${pct}%`,
            marginLeft: -6,
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: theme.accent,
            shadowColor: theme.accent,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 4
          } })
        ]
      }
    )
  ] });
}

// rn/DuneDynamic.tsx
import React40, { useMemo as useMemo9, useRef as useRef14, useEffect as useEffect11, useState as useState17 } from "react";
import { View as View78, Platform as Platform13 } from "react-native";
import { jsx as jsx86, jsxs as jsxs69 } from "react/jsx-runtime";
var SkiaAvailable = false;
var S = null;
try {
  S = __require("@shopify/react-native-skia");
  SkiaAvailable = true;
} catch (e) {
  console.warn("[DuneDynamic] Skia load failed:", e?.message);
}
var TAU = Math.PI * 2;
var ALPHA_BUCKETS = 10;
var INK = { r: 232, g: 228, b: 220 };
function buildDunes(count) {
  const yMin = Math.max(0.1, 0.34 - count * 0.022);
  const yMax = 0.78;
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const y = yMin + (yMax - yMin) * (t * t * 0.6 + t * 0.4);
    return {
      y,
      amp: 12 + t * 72,
      freq: 38e-4 - t * 18e-4,
      phase: (i * 1.731 + 0.4) % TAU,
      density: 0.65 + t * 1.55,
      drift: 0.18 + t * 0.85,
      alphaMul: 0.18 + Math.pow(t, 0.85) * 0.55,
      sizeMul: 0.8 + t * 0.32
    };
  });
}
function ridgeY(x, dune, H) {
  let y = dune.y * H;
  y += Math.sin(x * dune.freq + dune.phase) * dune.amp;
  y += Math.sin(x * dune.freq * 2.3 + dune.phase * 1.5) * dune.amp * 0.36;
  y += Math.sin(x * dune.freq * 5.7 + dune.phase * 0.4) * dune.amp * 0.13;
  return y;
}
function ridgeTangent(x, dune, H) {
  const dx = 4;
  return Math.atan2(ridgeY(x + dx, dune, H) - ridgeY(x - dx, dune, H), dx * 2);
}
function clusterField(x, y) {
  return 0.5 + (Math.sin(x * 0.018 + y * 0.014 + 1.3) * 0.5 + Math.sin(x * 0.061 + y * 0.047 + 4.2) * 0.32 + Math.sin(x * 0.157 + y * 0.121 + 0.9) * 0.18) * 0.5;
}
function densityProfile(t) {
  if (t < 0 || t > 1) return 0;
  const shadow = Math.exp(-Math.pow((t - 0.07) / 0.045, 2)) * 1.25;
  const mid = Math.exp(-Math.pow((t - 0.28) / 0.14, 2)) * 0.45;
  const highlight = Math.exp(-Math.pow((t - 0.5) / 0.18, 2)) * 0.5;
  const bottom = Math.pow(Math.max(0, t - 0.55), 1.4) * 1.45;
  return Math.max(0.05, shadow + mid + bottom - highlight);
}
function generateParticles(W, H, dunes, densityMul) {
  const particles = [];
  const buckets = Array.from({ length: ALPHA_BUCKETS }, () => []);
  const baseCount = Math.min(Math.floor(W * H / 64), 4e4);
  for (let li = 0; li < dunes.length; li++) {
    const dune = dunes[li];
    const next = dunes[li + 1] || null;
    const attempts = Math.floor(baseCount * dune.density * densityMul);
    for (let i = 0; i < attempts; i++) {
      const x = Math.random() * W;
      const y0 = ridgeY(x, dune, H);
      const y1 = next ? ridgeY(x, next, H) : H + 60;
      if (y1 <= y0) continue;
      const local = Math.random() * (y1 - y0);
      const y = y0 + local;
      const t = local / (y1 - y0);
      const baseD = densityProfile(t);
      const cluster = clusterField(x, y);
      if (Math.random() > baseD * (0.55 + cluster * 0.7)) continue;
      const shadowness = Math.exp(-Math.pow((t - 0.07) / 0.1, 2));
      const alpha = Math.min(0.98, (0.22 + Math.random() * 0.45 + shadowness * 0.15) * dune.alphaMul);
      const r10 = (0.26 + Math.random() * 0.55 + shadowness * 0.18) * dune.sizeMul;
      const tang = ridgeTangent(x, dune, H);
      const ang = tang + (Math.random() - 0.5) * 1.3;
      const p = {
        bx: x,
        by: y,
        r: r10,
        alpha,
        layer: li,
        ph: Math.random() * TAU,
        ph2: Math.random() * TAU,
        phP: Math.random() * TAU,
        freqA: 1e-4 + Math.random() * 22e-5,
        freqB: 18e-5 + Math.random() * 32e-5,
        freqP: 14e-5 + Math.random() * 24e-5,
        ax: 0.4 + Math.random() * 1.3,
        ay: 0.18 + Math.random() * 0.6,
        cosA: Math.cos(ang),
        sinA: Math.sin(ang)
      };
      particles.push(p);
      buckets[Math.min(ALPHA_BUCKETS - 1, Math.floor(alpha * ALPHA_BUCKETS))].push(p);
    }
  }
  return { particles, buckets };
}
function DuneCanvasWeb({ width: W, height: H, layers, wind, density, shimmer, contrast }) {
  const canvasRef = React40.useRef(null);
  const frameRef = React40.useRef(0);
  const dataRef = React40.useRef(null);
  const ctrlRef = React40.useRef({ wind, shimmer, contrast });
  ctrlRef.current = { wind, shimmer, contrast };
  React40.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const dunes = buildDunes(layers);
    dunes.forEach((d) => {
      d.density = d.density * density;
    });
    const { particles, buckets } = generateParticles(W, H, dunes, 1);
    dataRef.current = { dunes, particles, buckets };
    function draw(t) {
      if (!dataRef.current) return;
      const { dunes: dd, buckets: bb } = dataRef.current;
      ctx.fillStyle = "#161A21";
      ctx.fillRect(0, 0, W, H);
      const { wind: w2, shimmer: sh2, contrast: c2 } = ctrlRef.current;
      const windPulse = w2 * (0.75 + Math.sin(t * 1e-4) * 0.35);
      for (let bi = 0; bi < ALPHA_BUCKETS; bi++) {
        const bucket = bb[bi];
        if (!bucket.length) continue;
        const baseA = (bi + 0.5) / ALPHA_BUCKETS;
        const a = Math.max(0.02, Math.min(1, 0.5 + (baseA - 0.5) * c2));
        ctx.fillStyle = `rgba(${INK.r},${INK.g},${INK.b},${a.toFixed(3)})`;
        ctx.beginPath();
        for (let i = 0, n = bucket.length; i < n; i++) {
          const p = bucket[i];
          const dune = dd[p.layer];
          const driftMag = (Math.sin(t * p.freqA + p.ph) + Math.sin(t * p.freqB + p.ph2) * 0.45) * p.ax * windPulse * dune.drift * 5.5;
          const perpMag = Math.sin(t * p.freqP + p.phP) * p.ay * sh2 * 0.5;
          const dx = p.cosA * driftMag - p.sinA * perpMag;
          const dy = p.sinA * driftMag + p.cosA * perpMag;
          const x = p.bx + dx;
          const y = p.by + dy;
          ctx.moveTo(x + p.r, y);
          ctx.arc(x, y, p.r, 0, TAU);
        }
        ctx.fill();
      }
      frameRef.current = requestAnimationFrame(draw);
    }
    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [W, H, layers, density]);
  return /* @__PURE__ */ jsx86("canvas", { ref: canvasRef, style: { width: W, height: H, display: "block" } });
}
function DuneCanvasNative({ width: W, height: H, layers, wind, density, shimmer, contrast, style }) {
  const dunesData = useMemo9(() => {
    const dunes = buildDunes(layers);
    dunes.forEach((d) => {
      d.density = d.density * density;
    });
    const { buckets } = generateParticles(W, H, dunes, 1);
    return { dunes, buckets };
  }, [W, H, layers, density]);
  const ctrlRef = useRef14({ wind, shimmer, contrast });
  ctrlRef.current = { wind, shimmer, contrast };
  const [paths2, setPaths] = useState17([]);
  useEffect11(() => {
    if (!S) return;
    const start = Date.now();
    let raf = 0;
    const FRAME_INTERVAL = 50;
    let lastFrame = 0;
    function tick() {
      const now = Date.now();
      if (now - lastFrame < FRAME_INTERVAL) {
        raf = requestAnimationFrame(tick);
        return;
      }
      lastFrame = now;
      const t = now - start;
      const { wind: w2, shimmer: sh2, contrast: c2 } = ctrlRef.current;
      const windPulse = w2 * (0.75 + Math.sin(t * 1e-4) * 0.35);
      const { dunes, buckets } = dunesData;
      const newPaths = [];
      for (let bi = 0; bi < ALPHA_BUCKETS; bi++) {
        const bucket = buckets[bi];
        if (!bucket.length) continue;
        const baseA = (bi + 0.5) / ALPHA_BUCKETS;
        const a = Math.max(0.02, Math.min(1, 0.5 + (baseA - 0.5) * c2));
        const col = `rgba(${INK.r},${INK.g},${INK.b},${a.toFixed(3)})`;
        const path = S.Skia.Path.Make();
        for (let i = 0, n = bucket.length; i < n; i++) {
          const p = bucket[i];
          const dune = dunes[p.layer];
          if (!dune) continue;
          const driftMag = (Math.sin(t * p.freqA + p.ph) + Math.sin(t * p.freqB + p.ph2) * 0.45) * p.ax * windPulse * dune.drift * 5.5;
          const perpMag = Math.sin(t * p.freqP + p.phP) * p.ay * sh2 * 0.5;
          const dx = p.cosA * driftMag - p.sinA * perpMag;
          const dy = p.sinA * driftMag + p.cosA * perpMag;
          path.addCircle(p.bx + dx, p.by + dy, p.r);
        }
        newPaths.push({ path, color: col });
      }
      setPaths(newPaths);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [dunesData]);
  if (!S) return null;
  return /* @__PURE__ */ jsx86(View78, { style: [{ width: W, height: H, backgroundColor: color.void[300] }, style], children: /* @__PURE__ */ jsxs69(S.Canvas, { style: { width: W, height: H }, children: [
    /* @__PURE__ */ jsx86(S.Fill, { color: "#161A21" }),
    paths2.map((p, i) => /* @__PURE__ */ jsx86(S.Path, { path: p.path, color: p.color }, i))
  ] }) });
}
function DuneDynamic({
  width,
  height,
  layers = 4,
  wind = 3,
  density = 1,
  shimmer = 1,
  contrast = 1,
  style
}) {
  if (Platform13.OS === "web") {
    return /* @__PURE__ */ jsx86(View78, { style: [{ width, height, overflow: "hidden" }, style], children: /* @__PURE__ */ jsx86(DuneCanvasWeb, { width, height, layers, wind, density, shimmer, contrast }) });
  }
  if (!SkiaAvailable) {
    const Text74 = __require("react-native").Text;
    return /* @__PURE__ */ jsx86(View78, { style: [{ width, height, backgroundColor: color.void[300], alignItems: "center", justifyContent: "center" }, style], children: /* @__PURE__ */ jsx86(Text74, { style: { color: "rgba(232,228,220,0.5)", textAlign: "center", padding: 20 }, children: "Requires @shopify/react-native-skia \u2014 rebuild with native modules." }) });
  }
  return /* @__PURE__ */ jsx86(DuneCanvasNative, { width, height, layers, wind, density, shimmer, contrast, style });
}

// rn/StarsDynamic.tsx
import React41, { useMemo as useMemo10, useRef as useRef15, useEffect as useEffect12, useState as useState18 } from "react";
import { View as View79, Platform as Platform14 } from "react-native";
import { jsx as jsx87, jsxs as jsxs70 } from "react/jsx-runtime";
var SkiaAvailable2 = false;
var SK = null;
try {
  SK = __require("@shopify/react-native-skia");
  SkiaAvailable2 = true;
} catch (e) {
  console.warn("[StarsDynamic] Skia load failed:", e?.message);
}
var TAU2 = Math.PI * 2;
var ALPHA_BUCKETS2 = 12;
var INK2 = { r: 232, g: 228, b: 220 };
function sizeFromMag(mag) {
  return 0.3 + 2.3 * Math.exp(-mag * 0.5);
}
function alphaFromMag(mag) {
  return Math.min(0.95, 0.18 + 0.78 * Math.exp(-mag * 0.55));
}
function mst(stars) {
  if (stars.length < 2) return [];
  const inTree = /* @__PURE__ */ new Set([0]);
  const edges = [];
  while (inTree.size < stars.length) {
    let bi = -1, bj = -1, bd = Infinity;
    for (const i of inTree) {
      for (let j = 0; j < stars.length; j++) {
        if (inTree.has(j)) continue;
        const d = Math.hypot(stars[j].x - stars[i].x, stars[j].y - stars[i].y);
        if (d < bd) {
          bd = d;
          bi = i;
          bj = j;
        }
      }
    }
    if (bj === -1) break;
    edges.push([stars[bi], stars[bj]]);
    inTree.add(bj);
  }
  return edges;
}
function generateStars(W, H, density) {
  const particles = [];
  const buckets = Array.from({ length: ALPHA_BUCKETS2 }, () => []);
  const count = Math.floor(W * H / 380 * density);
  for (let i = 0; i < count; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const mag = Math.pow(Math.random(), 0.45) * 7.5;
    const r10 = sizeFromMag(mag);
    const a = alphaFromMag(mag);
    const isBright = mag < 2.5;
    const star = {
      x,
      y,
      r: r10,
      alpha: a,
      mag,
      freq: isBright ? 2e-4 + Math.random() * 4e-4 : 5e-4 + Math.random() * 2e-3,
      phase: Math.random() * TAU2,
      twinkleAmt: isBright ? 0.06 + Math.random() * 0.1 : 0.12 + Math.random() * 0.28
    };
    particles.push(star);
    buckets[Math.min(ALPHA_BUCKETS2 - 1, Math.floor(a * ALPHA_BUCKETS2))].push(star);
  }
  return { particles, buckets };
}
function StarsCanvasWeb({ width: W, height: H, density, twinkle, halo: haloI, lines: linesI }) {
  const canvasRef = React41.useRef(null);
  const frameRef = React41.useRef(0);
  const ctrlRef = React41.useRef({ twinkle, haloI, linesI });
  ctrlRef.current = { twinkle, haloI, linesI };
  React41.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const { particles, buckets } = generateStars(W, H, density);
    const halos = [];
    let clusters = [];
    let spikes = [];
    const bright = particles.filter((p) => p.mag < 2.2);
    if (bright.length >= 8) {
      const cols = 3, rows = 2;
      const seeds = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const xMin = col / cols * W, xMax = (col + 1) / cols * W;
          const yMin = row / rows * H, yMax = (row + 1) / rows * H;
          const region = bright.filter((s) => s.x >= xMin && s.x < xMax && s.y >= yMin && s.y < yMax);
          if (!region.length) continue;
          region.sort((a, b) => a.mag - b.mag);
          seeds.push(region[0]);
        }
      }
      for (const seed of seeds) {
        const k = 3 + Math.floor(Math.random() * 3);
        const pool = bright.filter((s) => s !== seed).map((s) => ({ s, d: Math.hypot(s.x - seed.x, s.y - seed.y) })).sort((a, b) => a.d - b.d).slice(0, k * 2).filter(() => Math.random() > 0.3).slice(0, k).map((o) => o.s);
        if (!pool.length) continue;
        const stars = [seed, ...pool];
        const edges = mst(stars);
        clusters.push({ stars, edges });
        for (const s of stars) {
          halos.push({ x: s.x, y: s.y, r: s.r * 4.5, baseA: 0.07 });
          halos.push({ x: s.x, y: s.y, r: s.r * 10, baseA: 0.025 });
        }
      }
    }
    const sorted = [...particles].sort((a, b) => a.mag - b.mag);
    spikes = sorted.slice(0, 8);
    function draw(t) {
      ctx.fillStyle = "#161A21";
      ctx.fillRect(0, 0, W, H);
      if (ctrlRef.current.linesI > 1e-3) {
        ctx.lineWidth = 0.7;
        ctx.lineCap = "round";
        for (const cl of clusters) {
          for (const [a, b] of cl.edges) {
            const dist = Math.hypot(b.x - a.x, b.y - a.y);
            const peak = 0.34 * ctrlRef.current.linesI * Math.exp(-dist / 320);
            if (peak < 5e-3) continue;
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, `rgba(${INK2.r},${INK2.g},${INK2.b},0)`);
            grad.addColorStop(0.18, `rgba(${INK2.r},${INK2.g},${INK2.b},${(peak * 0.85).toFixed(3)})`);
            grad.addColorStop(0.5, `rgba(${INK2.r},${INK2.g},${INK2.b},${peak.toFixed(3)})`);
            grad.addColorStop(0.82, `rgba(${INK2.r},${INK2.g},${INK2.b},${(peak * 0.85).toFixed(3)})`);
            grad.addColorStop(1, `rgba(${INK2.r},${INK2.g},${INK2.b},0)`);
            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      if (ctrlRef.current.haloI > 1e-3) {
        for (const h3 of halos) {
          const a = h3.baseA * ctrlRef.current.haloI;
          if (a < 2e-3) continue;
          const grad = ctx.createRadialGradient(h3.x, h3.y, 0, h3.x, h3.y, h3.r);
          grad.addColorStop(0, `rgba(${INK2.r},${INK2.g},${INK2.b},${a.toFixed(3)})`);
          grad.addColorStop(0.55, `rgba(${INK2.r},${INK2.g},${INK2.b},${(a * 0.35).toFixed(3)})`);
          grad.addColorStop(1, `rgba(${INK2.r},${INK2.g},${INK2.b},0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(h3.x, h3.y, h3.r, 0, TAU2);
          ctx.fill();
        }
      }
      if (ctrlRef.current.haloI > 1e-3) {
        ctx.lineWidth = 0.5;
        ctx.lineCap = "round";
        for (const p of spikes) {
          const len = p.r * 9;
          const peak = 0.22 * ctrlRef.current.haloI;
          let grad = ctx.createLinearGradient(p.x, p.y - len, p.x, p.y + len);
          grad.addColorStop(0, `rgba(${INK2.r},${INK2.g},${INK2.b},0)`);
          grad.addColorStop(0.5, `rgba(${INK2.r},${INK2.g},${INK2.b},${peak.toFixed(3)})`);
          grad.addColorStop(1, `rgba(${INK2.r},${INK2.g},${INK2.b},0)`);
          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - len);
          ctx.lineTo(p.x, p.y + len);
          ctx.stroke();
          grad = ctx.createLinearGradient(p.x - len, p.y, p.x + len, p.y);
          grad.addColorStop(0, `rgba(${INK2.r},${INK2.g},${INK2.b},0)`);
          grad.addColorStop(0.5, `rgba(${INK2.r},${INK2.g},${INK2.b},${peak.toFixed(3)})`);
          grad.addColorStop(1, `rgba(${INK2.r},${INK2.g},${INK2.b},0)`);
          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(p.x - len, p.y);
          ctx.lineTo(p.x + len, p.y);
          ctx.stroke();
        }
      }
      for (let bi = 0; bi < ALPHA_BUCKETS2; bi++) {
        const bucket = buckets[bi];
        if (!bucket.length) continue;
        const a = (bi + 0.5) / ALPHA_BUCKETS2;
        ctx.fillStyle = `rgba(${INK2.r},${INK2.g},${INK2.b},${a.toFixed(3)})`;
        ctx.beginPath();
        for (const p of bucket) {
          const pulse = 1 + Math.sin(t * p.freq + p.phase) * p.twinkleAmt * ctrlRef.current.twinkle;
          const r10 = p.r * pulse;
          ctx.moveTo(p.x + r10, p.y);
          ctx.arc(p.x, p.y, r10, 0, TAU2);
        }
        ctx.fill();
      }
      frameRef.current = requestAnimationFrame(draw);
    }
    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [W, H, density]);
  return /* @__PURE__ */ jsx87("canvas", { ref: canvasRef, style: { width: W, height: H, display: "block" } });
}
function StarsCanvasNative({ width: W, height: H, density, twinkle, style }) {
  const ctrlRef = useRef15({ twinkle });
  ctrlRef.current = { twinkle };
  const data = useMemo10(() => generateStars(W, H, density), [W, H, density]);
  const [paths2, setPaths] = useState18([]);
  useEffect12(() => {
    if (!SK) return;
    const start = Date.now();
    let raf = 0;
    const FRAME_INTERVAL = 50;
    let lastFrame = 0;
    function tick() {
      const now = Date.now();
      if (now - lastFrame < FRAME_INTERVAL) {
        raf = requestAnimationFrame(tick);
        return;
      }
      lastFrame = now;
      const t = now - start;
      const { twinkle: tw } = ctrlRef.current;
      const { buckets } = data;
      const newPaths = [];
      for (let bi = 0; bi < ALPHA_BUCKETS2; bi++) {
        const bucket = buckets[bi];
        if (!bucket.length) continue;
        const a = (bi + 0.5) / ALPHA_BUCKETS2;
        const col = `rgba(${INK2.r},${INK2.g},${INK2.b},${a.toFixed(3)})`;
        const path = SK.Skia.Path.Make();
        for (const p of bucket) {
          const pulse = 1 + Math.sin(t * p.freq + p.phase) * p.twinkleAmt * tw;
          const r10 = p.r * pulse;
          path.addCircle(p.x, p.y, r10);
        }
        newPaths.push({ path, color: col });
      }
      setPaths(newPaths);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [data]);
  if (!SK) return null;
  return /* @__PURE__ */ jsx87(View79, { style: [{ width: W, height: H, backgroundColor: color.void[300] }, style], children: /* @__PURE__ */ jsxs70(SK.Canvas, { style: { width: W, height: H }, children: [
    /* @__PURE__ */ jsx87(SK.Fill, { color: "#161A21" }),
    paths2.map((p, i) => /* @__PURE__ */ jsx87(SK.Path, { path: p.path, color: p.color }, i))
  ] }) });
}
function StarsDynamic({ width, height, density = 1, twinkle = 1, halo = 1, lines = 1, style }) {
  if (Platform14.OS === "web") {
    return /* @__PURE__ */ jsx87(View79, { style: [{ width, height, overflow: "hidden" }, style], children: /* @__PURE__ */ jsx87(StarsCanvasWeb, { width, height, density, twinkle, halo, lines }) });
  }
  if (!SkiaAvailable2) {
    const Text74 = __require("react-native").Text;
    return /* @__PURE__ */ jsx87(View79, { style: [{ width, height, backgroundColor: color.void[300], alignItems: "center", justifyContent: "center" }, style], children: /* @__PURE__ */ jsx87(Text74, { style: { color: "rgba(232,228,220,0.5)", textAlign: "center", padding: 20 }, children: "Requires @shopify/react-native-skia \u2014 rebuild with native modules." }) });
  }
  return /* @__PURE__ */ jsx87(StarsCanvasNative, { width, height, density, twinkle, halo, lines, style });
}

// rn/TerrainDynamic.tsx
import React42, { useMemo as useMemo11 } from "react";
import { View as View80, Platform as Platform15 } from "react-native";
import { jsx as jsx88, jsxs as jsxs71 } from "react/jsx-runtime";
var SkiaAvailable3 = false;
try {
  __require("@shopify/react-native-skia");
  SkiaAvailable3 = true;
} catch {
}
var INK3 = { r: 232, g: 228, b: 220 };
function TerrainCanvasWeb({ width: W, height: H, scale, detail, relief, contrast, tilt, showRoute }) {
  const canvasRef = React42.useRef(null);
  const frameRef = React42.useRef(0);
  React42.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const GRID = 11;
    const MAJOR_EVERY = 5;
    const BASE_INTERVAL = 0.045;
    const MAX_CONTOURS = 80;
    const ALPHA_MINOR = 0.16;
    const ALPHA_MAJOR = 0.5;
    const WIDTH_MINOR = 0.55;
    const WIDTH_MAJOR = 1.1;
    function height(x, y) {
      const sx = x / W, sy = y / H, s = scale;
      let h3 = 0;
      h3 += Math.sin(sx * 2.5 * s + 0.4) * Math.cos(sy * 2 * s + 1.2) * 0.55;
      h3 += Math.sin(sx * 5.5 * s + 1.7) * Math.cos(sy * 4.5 * s + 0.4) * 0.35;
      h3 += Math.sin(sx * 10 * s + 2.3) * Math.cos(sy * 8.5 * s + 3.1) * 0.18;
      h3 += Math.sin(sx * 18 * s + 0.9) * Math.cos(sy * 15 * s + 1.4) * 0.07;
      h3 += Math.sin(sx * 32 * s + 1.5) * Math.cos(sy * 28 * s + 2.7) * 0.03;
      h3 += Math.sin((sx + sy * 0.35) * 5 * s + 0.5) * 0.13;
      h3 += Math.sin((sx - sy * 0.45) * 11 * s + 1.9) * 0.06;
      return h3 * relief;
    }
    const gs = GRID;
    const gw = Math.ceil(W / gs) + 2;
    const gh = Math.ceil(H / gs) + 2;
    const heights3 = new Float32Array(gw * gh);
    let hMin = Infinity, hMax = -Infinity;
    for (let j = 0; j < gh; j++) {
      for (let i = 0; i < gw; i++) {
        const v = height(i * gs, j * gs);
        heights3[j * gw + i] = v;
        if (v < hMin) hMin = v;
        if (v > hMax) hMax = v;
      }
    }
    const range = hMax - hMin;
    if (range < 1e-3) return;
    const baseInterval = BASE_INTERVAL / detail;
    const minInterval = range / MAX_CONTOURS;
    const interval = Math.max(baseInterval, minInterval);
    const startLevel = Math.ceil(hMin / interval) * interval;
    const contours = [];
    let levelIdx = 0;
    for (let level = startLevel; level <= hMax; level += interval) {
      const normH = (level - hMin) / range;
      const isMajor = levelIdx % MAJOR_EVERY === 0;
      levelIdx++;
      const segs = [];
      for (let j = 0; j < gh - 1; j++) {
        for (let i = 0; i < gw - 1; i++) {
          const tl = heights3[j * gw + i];
          const tr = heights3[j * gw + i + 1];
          const br = heights3[(j + 1) * gw + i + 1];
          const bl = heights3[(j + 1) * gw + i];
          let idx = 0;
          if (tl > level) idx |= 1;
          if (tr > level) idx |= 2;
          if (br > level) idx |= 4;
          if (bl > level) idx |= 8;
          if (idx === 0 || idx === 15) continue;
          const x0 = i * gs, y0 = j * gs, x1 = x0 + gs, y1 = y0 + gs;
          const lerp = (a, b) => {
            const d = b - a;
            return Math.abs(d) < 1e-6 ? 0.5 : (level - a) / d;
          };
          const xt = x0 + lerp(tl, tr) * gs;
          const yr = y0 + lerp(tr, br) * gs;
          const xb = x0 + lerp(bl, br) * gs;
          const yl = y0 + lerp(tl, bl) * gs;
          switch (idx) {
            case 1:
            case 14:
              segs.push(x0, yl, xt, y0);
              break;
            case 2:
            case 13:
              segs.push(xt, y0, x1, yr);
              break;
            case 3:
            case 12:
              segs.push(x0, yl, x1, yr);
              break;
            case 4:
            case 11:
              segs.push(x1, yr, xb, y1);
              break;
            case 6:
            case 9:
              segs.push(xt, y0, xb, y1);
              break;
            case 7:
            case 8:
              segs.push(x0, yl, xb, y1);
              break;
            case 5: {
              const avg = (tl + tr + br + bl) * 0.25;
              if (avg > level) {
                segs.push(x0, yl, xt, y0);
                segs.push(x1, yr, xb, y1);
              } else {
                segs.push(x0, yl, xb, y1);
                segs.push(xt, y0, x1, yr);
              }
              break;
            }
            case 10: {
              const avg = (tl + tr + br + bl) * 0.25;
              if (avg > level) {
                segs.push(xt, y0, x1, yr);
                segs.push(x0, yl, xb, y1);
              } else {
                segs.push(x0, yl, xt, y0);
                segs.push(x1, yr, xb, y1);
              }
              break;
            }
          }
        }
      }
      if (segs.length > 0) contours.push({ normH, isMajor, segs });
    }
    let route = [];
    {
      const idx = (x, y) => y * gw + x;
      let cx = Math.floor(gw * 0.08), cy = Math.floor(gh * 0.2);
      const endX = Math.floor(gw * 0.92), endY = Math.floor(gh * 0.8);
      const visited = new Uint8Array(gw * gh);
      const grid = [];
      visited[idx(cx, cy)] = 1;
      grid.push([cx, cy]);
      for (let step = 0; step < (gw + gh) * 2; step++) {
        const dx = endX - cx, dy = endY - cy, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1.5) break;
        const tx = dx / dist, ty = dy / dist;
        let bx = -1, by = -1, bs = Infinity;
        for (let oy = -1; oy <= 1; oy++) for (let ox = -1; ox <= 1; ox++) {
          if (!ox && !oy) continue;
          const nx = cx + ox, ny = cy + oy;
          if (nx < 0 || nx >= gw || ny < 0 || ny >= gh || visited[idx(nx, ny)]) continue;
          const dot = (ox * tx + oy * ty) / Math.sqrt(ox * ox + oy * oy);
          if (dot < -0.1) continue;
          const score = heights3[idx(nx, ny)] * 5 - dot;
          if (score < bs) {
            bs = score;
            bx = nx;
            by = ny;
          }
        }
        if (bx === -1) break;
        cx = bx;
        cy = by;
        visited[idx(cx, cy)] = 1;
        grid.push([cx, cy]);
      }
      let path = grid.map(([gx, gy]) => ({ x: gx * gs, y: gy * gs, normH: (heights3[idx(gx, gy)] - hMin) / range }));
      for (let pass = 0; pass < 3; pass++) {
        if (path.length < 3) break;
        const next = [path[0]];
        for (let i = 1; i < path.length - 1; i++) next.push({ x: (path[i - 1].x + path[i].x * 2 + path[i + 1].x) / 4, y: (path[i - 1].y + path[i].y * 2 + path[i + 1].y) / 4, normH: (path[i - 1].normH + path[i].normH * 2 + path[i + 1].normH) / 4 });
        next.push(path[path.length - 1]);
        path = next;
      }
      route = path;
    }
    function drawRoute(yCompress, yShift, elevLift) {
      if (!showRoute || route.length < 2) return;
      ctx.strokeStyle = "rgba(201,162,39,0.85)";
      ctx.lineWidth = 1.6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (let i = 0; i < route.length; i++) {
        const p = route[i];
        const yProj = p.y * yCompress + yShift - p.normH * elevLift;
        if (i === 0) ctx.moveTo(p.x, yProj);
        else ctx.lineTo(p.x, yProj);
      }
      ctx.stroke();
      ctx.fillStyle = "rgba(201,162,39,0.95)";
      for (const i of [0, route.length - 1]) {
        const p = route[i];
        const yProj = p.y * yCompress + yShift - p.normH * elevLift;
        ctx.beginPath();
        ctx.arc(p.x, yProj, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "rgba(201,162,39,0.18)";
      for (const i of [0, route.length - 1]) {
        const p = route[i];
        const yProj = p.y * yCompress + yShift - p.normH * elevLift;
        ctx.beginPath();
        ctx.arc(p.x, yProj, 9, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    function strokePass(isMajor, baseAlpha, lineWidth, yCompress, yShift, elevLift) {
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (const c of contours) {
        if (c.isMajor !== isMajor) continue;
        const elevAlpha = 0.3 + 0.7 * c.normH;
        const alpha = baseAlpha * elevAlpha;
        ctx.strokeStyle = `rgba(${INK3.r},${INK3.g},${INK3.b},${alpha.toFixed(3)})`;
        ctx.beginPath();
        const yOffset = yShift - c.normH * elevLift;
        const s = c.segs;
        for (let i = 0, n = s.length; i < n; i += 4) {
          ctx.moveTo(s[i], s[i + 1] * yCompress + yOffset);
          ctx.lineTo(s[i + 2], s[i + 3] * yCompress + yOffset);
        }
        ctx.stroke();
      }
    }
    function draw(t) {
      ctx.fillStyle = "#161A21";
      ctx.fillRect(0, 0, W, H);
      const breath = 0.93 + Math.sin(t * 1e-4) * 0.07;
      const cMin = ALPHA_MINOR * (1 / Math.sqrt(contrast)) * breath;
      const cMaj = ALPHA_MAJOR * Math.sqrt(contrast) * breath;
      const yCompress = 1 - tilt * 0.5;
      const yShift = tilt * H * 0.25;
      const elevLift = tilt * H * 0.35 * relief;
      strokePass(false, cMin, WIDTH_MINOR, yCompress, yShift, elevLift);
      strokePass(true, cMaj, WIDTH_MAJOR, yCompress, yShift, elevLift);
      drawRoute(yCompress, yShift, elevLift);
      frameRef.current = requestAnimationFrame(draw);
    }
    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [W, H, scale, detail, relief, contrast, tilt, showRoute]);
  return /* @__PURE__ */ jsx88("canvas", { ref: canvasRef, style: { width: W, height: H, display: "block" } });
}
function TerrainDynamic({ width, height, scale = 0.7, detail = 1, relief = 1, contrast = 1, tilt = 0, showRoute = false, style }) {
  if (Platform15.OS === "web") {
    return /* @__PURE__ */ jsx88(View80, { style: [{ width, height, overflow: "hidden" }, style], children: /* @__PURE__ */ jsx88(TerrainCanvasWeb, { width, height, scale, detail, relief, contrast, tilt, showRoute }) });
  }
  if (!SkiaAvailable3) {
    const Text74 = __require("react-native").Text;
    return /* @__PURE__ */ jsx88(View80, { style: [{ width, height, backgroundColor: color.void[300], alignItems: "center", justifyContent: "center" }, style], children: /* @__PURE__ */ jsx88(Text74, { style: { color: "rgba(232,228,220,0.5)", textAlign: "center", padding: 20 }, children: "Requires @shopify/react-native-skia \u2014 rebuild with native modules." }) });
  }
  return /* @__PURE__ */ jsx88(TerrainCanvasNative, { width, height, scale, detail, relief, contrast, tilt, showRoute, style });
}
function TerrainCanvasNative({ width: W, height: H, scale, detail, relief, contrast, tilt, showRoute, style }) {
  const S2 = __require("@shopify/react-native-skia");
  const [breath, setBreath] = React42.useState(1);
  React42.useEffect(() => {
    const start = Date.now();
    let raf = 0;
    function tick() {
      const t = Date.now() - start;
      setBreath(0.93 + Math.sin(t * 1e-4) * 0.07);
      raf = requestAnimationFrame(tick);
    }
    const iv = setInterval(() => {
      const t = Date.now() - start;
      setBreath(0.93 + Math.sin(t * 1e-4) * 0.07);
    }, 100);
    return () => clearInterval(iv);
  }, []);
  const INK_COL = { r: 232, g: 228, b: 220 };
  const GRID = 11;
  const MAJOR_EVERY = 5;
  const BASE_INTERVAL = 0.045;
  const MAX_CONTOURS = 80;
  const contourData = useMemo11(() => {
    function heightFn(x, y) {
      const sx = x / W, sy = y / H, s = scale;
      let h3 = 0;
      h3 += Math.sin(sx * 2.5 * s + 0.4) * Math.cos(sy * 2 * s + 1.2) * 0.55;
      h3 += Math.sin(sx * 5.5 * s + 1.7) * Math.cos(sy * 4.5 * s + 0.4) * 0.35;
      h3 += Math.sin(sx * 10 * s + 2.3) * Math.cos(sy * 8.5 * s + 3.1) * 0.18;
      h3 += Math.sin(sx * 18 * s + 0.9) * Math.cos(sy * 15 * s + 1.4) * 0.07;
      h3 += Math.sin(sx * 32 * s + 1.5) * Math.cos(sy * 28 * s + 2.7) * 0.03;
      h3 += Math.sin((sx + sy * 0.35) * 5 * s + 0.5) * 0.13;
      h3 += Math.sin((sx - sy * 0.45) * 11 * s + 1.9) * 0.06;
      return h3 * relief;
    }
    const gs = GRID;
    const gw = Math.ceil(W / gs) + 2;
    const gh = Math.ceil(H / gs) + 2;
    const heights3 = new Float32Array(gw * gh);
    let hMin = Infinity, hMax = -Infinity;
    for (let j = 0; j < gh; j++) {
      for (let i = 0; i < gw; i++) {
        const v = heightFn(i * gs, j * gs);
        heights3[j * gw + i] = v;
        if (v < hMin) hMin = v;
        if (v > hMax) hMax = v;
      }
    }
    const range = hMax - hMin;
    if (range < 1e-3) return [];
    const baseInterval = BASE_INTERVAL / detail;
    const minInterval = range / MAX_CONTOURS;
    const interval = Math.max(baseInterval, minInterval);
    const startLevel = Math.ceil(hMin / interval) * interval;
    const result = [];
    let levelIdx = 0;
    for (let level = startLevel; level <= hMax; level += interval) {
      const normH = (level - hMin) / range;
      const isMajor = levelIdx % MAJOR_EVERY === 0;
      levelIdx++;
      const segs = [];
      for (let j = 0; j < gh - 1; j++) {
        for (let i = 0; i < gw - 1; i++) {
          const tl = heights3[j * gw + i];
          const tr = heights3[j * gw + i + 1];
          const br = heights3[(j + 1) * gw + i + 1];
          const bl = heights3[(j + 1) * gw + i];
          let idx = 0;
          if (tl > level) idx |= 1;
          if (tr > level) idx |= 2;
          if (br > level) idx |= 4;
          if (bl > level) idx |= 8;
          if (idx === 0 || idx === 15) continue;
          const x0 = i * gs, y0 = j * gs, x1 = x0 + gs, y1 = y0 + gs;
          const lerp = (a, b) => {
            const d = b - a;
            return Math.abs(d) < 1e-6 ? 0.5 : (level - a) / d;
          };
          const xt = x0 + lerp(tl, tr) * gs;
          const yr = y0 + lerp(tr, br) * gs;
          const xb = x0 + lerp(bl, br) * gs;
          const yl = y0 + lerp(tl, bl) * gs;
          switch (idx) {
            case 1:
            case 14:
              segs.push(x0, yl, xt, y0);
              break;
            case 2:
            case 13:
              segs.push(xt, y0, x1, yr);
              break;
            case 3:
            case 12:
              segs.push(x0, yl, x1, yr);
              break;
            case 4:
            case 11:
              segs.push(x1, yr, xb, y1);
              break;
            case 6:
            case 9:
              segs.push(xt, y0, xb, y1);
              break;
            case 7:
            case 8:
              segs.push(x0, yl, xb, y1);
              break;
            case 5: {
              const avg = (tl + tr + br + bl) * 0.25;
              if (avg > level) {
                segs.push(x0, yl, xt, y0);
                segs.push(x1, yr, xb, y1);
              } else {
                segs.push(x0, yl, xb, y1);
                segs.push(xt, y0, x1, yr);
              }
              break;
            }
            case 10: {
              const avg = (tl + tr + br + bl) * 0.25;
              if (avg > level) {
                segs.push(xt, y0, x1, yr);
                segs.push(x0, yl, xb, y1);
              } else {
                segs.push(x0, yl, xt, y0);
                segs.push(x1, yr, xb, y1);
              }
              break;
            }
          }
        }
      }
      if (segs.length > 0) result.push({ normH, isMajor, segs });
    }
    return result;
  }, [W, H, scale, detail, relief]);
  const lines = useMemo11(() => {
    const ALPHA_MINOR = 0.16;
    const ALPHA_MAJOR = 0.5;
    const WIDTH_MINOR = 0.55;
    const WIDTH_MAJOR = 1.1;
    const yCompress = 1 - tilt * 0.5;
    const yShift = tilt * H * 0.25;
    const elevLift = tilt * H * 0.35 * relief;
    const out = [];
    for (const c of contourData) {
      const baseAlpha = c.isMajor ? ALPHA_MAJOR : ALPHA_MINOR;
      const lineWidth = c.isMajor ? WIDTH_MAJOR : WIDTH_MINOR;
      const elevAlpha = 0.3 + 0.7 * c.normH;
      const alpha = baseAlpha * elevAlpha * Math.sqrt(contrast) * breath;
      const col = `rgba(${INK_COL.r},${INK_COL.g},${INK_COL.b},${alpha.toFixed(3)})`;
      const yOffset = yShift - c.normH * elevLift;
      const s = c.segs;
      for (let i = 0; i < s.length; i += 4) {
        out.push({
          p1x: s[i],
          p1y: s[i + 1] * yCompress + yOffset,
          p2x: s[i + 2],
          p2y: s[i + 3] * yCompress + yOffset,
          color: col,
          width: lineWidth
        });
      }
    }
    return out;
  }, [contourData, contrast, tilt, H, relief, breath]);
  return /* @__PURE__ */ jsx88(View80, { style: [{ width: W, height: H, backgroundColor: color.void[300] }, style], children: /* @__PURE__ */ jsxs71(S2.Canvas, { style: { width: W, height: H }, children: [
    /* @__PURE__ */ jsx88(S2.Fill, { color: "#161A21" }),
    lines.map((l, i) => /* @__PURE__ */ jsx88(S2.Line, { p1: { x: l.p1x, y: l.p1y }, p2: { x: l.p2x, y: l.p2y }, color: l.color, strokeWidth: l.width }, i))
  ] }) });
}

// rn/VoiceTutor.tsx
import { useEffect as useEffect13, useRef as useRef16 } from "react";
import { View as View81, Text as Text64, Animated as Animated12, Easing as Easing11 } from "react-native";
import { jsx as jsx89, jsxs as jsxs72 } from "react/jsx-runtime";
function VoiceTutor({ state = "idle", size = 160, hideLabel }) {
  const { theme } = useTheme();
  const anim = useRef16(new Animated12.Value(0)).current;
  const orbit = useRef16(new Animated12.Value(0)).current;
  const errorAura = useRef16(new Animated12.Value(0)).current;
  useEffect13(() => {
    anim.stopAnimation();
    orbit.stopAnimation();
    errorAura.stopAnimation();
    anim.setValue(0);
    orbit.setValue(0);
    errorAura.setValue(0);
    let animation;
    if (state === "idle") {
      animation = Animated12.loop(
        Animated12.sequence([
          Animated12.timing(anim, { toValue: 1, duration: 2e3, easing: Easing11.inOut(Easing11.sin), useNativeDriver: true }),
          Animated12.timing(anim, { toValue: 0, duration: 2e3, easing: Easing11.inOut(Easing11.sin), useNativeDriver: true })
        ])
      );
      animation.start();
    } else if (state === "listening") {
      animation = Animated12.loop(
        Animated12.sequence([
          Animated12.timing(anim, { toValue: 1, duration: 1500, easing: Easing11.inOut(Easing11.sin), useNativeDriver: true }),
          Animated12.timing(anim, { toValue: 0, duration: 1500, easing: Easing11.inOut(Easing11.sin), useNativeDriver: true })
        ])
      );
      animation.start();
    } else if (state === "thinking") {
      animation = Animated12.loop(
        Animated12.sequence([
          Animated12.timing(anim, { toValue: 1, duration: 1e3, easing: Easing11.inOut(Easing11.sin), useNativeDriver: true }),
          Animated12.timing(anim, { toValue: 0, duration: 1e3, easing: Easing11.inOut(Easing11.sin), useNativeDriver: true })
        ])
      );
      animation.start();
      Animated12.loop(
        Animated12.timing(orbit, { toValue: 1, duration: 2e3, easing: Easing11.linear, useNativeDriver: true })
      ).start();
    } else if (state === "speaking") {
      animation = Animated12.loop(
        Animated12.sequence([
          Animated12.timing(anim, { toValue: 1, duration: 200, easing: Easing11.inOut(Easing11.sin), useNativeDriver: true }),
          Animated12.timing(anim, { toValue: 0, duration: 200, easing: Easing11.inOut(Easing11.sin), useNativeDriver: true })
        ])
      );
      animation.start();
    } else if (state === "error") {
      animation = Animated12.loop(
        Animated12.sequence([
          Animated12.timing(anim, { toValue: 1, duration: 100, useNativeDriver: true }),
          Animated12.timing(anim, { toValue: 0, duration: 100, useNativeDriver: true }),
          Animated12.timing(anim, { toValue: 0.7, duration: 80, useNativeDriver: true }),
          Animated12.timing(anim, { toValue: 0, duration: 200, useNativeDriver: true }),
          Animated12.delay(1500)
        ])
      );
      animation.start();
      Animated12.sequence([
        Animated12.timing(errorAura, { toValue: 1, duration: 80, useNativeDriver: true }),
        Animated12.timing(errorAura, { toValue: 0.5, duration: 60, useNativeDriver: true }),
        Animated12.timing(errorAura, { toValue: 0.8, duration: 80, useNativeDriver: true }),
        Animated12.timing(errorAura, { toValue: 0, duration: 300, easing: Easing11.bezier(0.4, 0, 1, 1), useNativeDriver: true })
      ]).start();
    }
    return () => {
      anim.stopAnimation();
      orbit.stopAnimation();
      errorAura.stopAnimation();
    };
  }, [state]);
  const isError = state === "error";
  const core = { idle: 32, listening: 44, thinking: 24, speaking: 44, error: 22 }[state];
  const auraBase = { idle: 0, listening: 80, thinking: 50, speaking: 90, error: 50 }[state];
  const coreColor = isError ? color.danger[300] : theme.irisBright;
  const auraColor = isError ? "rgba(249,176,138,0.12)" : theme.irisGlow;
  const coreScale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: state === "listening" ? [0.9, 1.12] : state === "speaking" ? [0.94, 1.06] : state === "thinking" ? [0.96, 1.04] : [0.92, 1.08]
  });
  const coreOpacity = isError ? anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.4] }) : 1;
  const auraScale = isError ? 1 : anim.interpolate({
    inputRange: [0, 1],
    outputRange: state === "listening" ? [0.85, 1.15] : state === "speaking" ? [0.9, 1.1] : [0.95, 1.05]
  });
  const auraOpacity = isError ? errorAura : 1;
  const orbitRotate = orbit.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });
  return /* @__PURE__ */ jsxs72(View81, { style: { alignItems: "center" }, children: [
    /* @__PURE__ */ jsxs72(View81, { style: { width: size, height: size, alignItems: "center", justifyContent: "center" }, children: [
      auraBase > 0 && /* @__PURE__ */ jsx89(Animated12.View, { style: {
        position: "absolute",
        width: auraBase,
        height: auraBase,
        borderRadius: auraBase / 2,
        backgroundColor: auraColor,
        transform: [{ scale: auraScale }],
        opacity: auraOpacity
      } }),
      state === "thinking" && /* @__PURE__ */ jsxs72(Animated12.View, { style: { position: "absolute", width: 70, height: 70, transform: [{ rotate: orbitRotate }] }, children: [
        /* @__PURE__ */ jsx89(View81, { style: { position: "absolute", top: 0, left: 32, width: 5, height: 5, borderRadius: 2.5, backgroundColor: theme.irisDot } }),
        /* @__PURE__ */ jsx89(View81, { style: { position: "absolute", bottom: 0, left: 32, width: 4, height: 4, borderRadius: 2, backgroundColor: theme.irisBorder } }),
        /* @__PURE__ */ jsx89(View81, { style: { position: "absolute", top: 32, right: 0, width: 3, height: 3, borderRadius: 1.5, backgroundColor: theme.irisBorder } })
      ] }),
      /* @__PURE__ */ jsx89(Animated12.View, { style: {
        width: core,
        height: core,
        borderRadius: core / 2,
        backgroundColor: coreColor,
        shadowColor: coreColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: state === "speaking" ? 0.6 : state === "listening" ? 0.4 : 0.2,
        shadowRadius: state === "speaking" ? 30 : state === "listening" ? 20 : 12,
        elevation: 6,
        transform: [{ scale: coreScale }],
        opacity: coreOpacity
      } })
    ] }),
    !hideLabel && /* @__PURE__ */ jsx89(Text64, { style: {
      marginTop: sp[5],
      fontFamily: font.mono,
      fontSize: fs[10],
      fontWeight: fw[600],
      letterSpacing: 2,
      textTransform: "uppercase",
      color: isError ? color.danger[300] : theme.iris
    }, children: state })
  ] });
}

// rn/VideoCard.tsx
import { useState as useState19 } from "react";
import { View as View82, Text as Text65, Image as Image7, Pressable as Pressable41, Linking, Platform as Platform16 } from "react-native";
import { jsx as jsx90, jsxs as jsxs73 } from "react/jsx-runtime";
function getYouTubeId(url) {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}
function VideoCard({ title, attribution, duration, uri, thumbnail, onPress }) {
  const { theme } = useTheme();
  const [playing, setPlaying] = useState19(false);
  const videoId = uri ? getYouTubeId(uri) : null;
  const autoThumb = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
  const thumbSource = thumbnail || (autoThumb ? { uri: autoThumb } : null);
  const handlePress = () => {
    if (onPress) return onPress();
    if (Platform16.OS === "web" && videoId) {
      setPlaying(true);
      return;
    }
    if (uri) Linking.openURL(uri);
  };
  return /* @__PURE__ */ jsxs73(
    View82,
    {
      accessibilityLabel: title,
      style: {
        backgroundColor: theme.bgRaised,
        borderRadius: r[2],
        borderWidth: 1,
        borderColor: theme.border,
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ jsx90(View82, { style: {
          aspectRatio: 16 / 9,
          backgroundColor: theme.hoverOverlay,
          alignItems: "center",
          justifyContent: "center"
        }, children: playing && videoId && Platform16.OS === "web" ? /* @__PURE__ */ jsx90(
          "iframe",
          {
            src: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
            style: { width: "100%", height: "100%", border: "none" },
            allow: "autoplay; encrypted-media",
            allowFullScreen: true
          }
        ) : /* @__PURE__ */ jsxs73(Pressable41, { onPress: handlePress, style: { width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }, children: [
          thumbSource && /* @__PURE__ */ jsx90(Image7, { source: thumbSource, style: { position: "absolute", width: "100%", height: "100%" }, resizeMode: "cover" }),
          /* @__PURE__ */ jsx90(View82, { style: {
            width: sp[9],
            height: sp[9],
            borderRadius: sp[9] / 2,
            backgroundColor: theme.accent,
            alignItems: "center",
            justifyContent: "center"
          }, children: /* @__PURE__ */ jsx90(Icon, { name: "play", size: icon.lg, color: theme.accentFg }) }),
          duration && /* @__PURE__ */ jsx90(View82, { style: {
            position: "absolute",
            bottom: sp[2],
            right: sp[2],
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: r[1],
            paddingHorizontal: sp[1],
            paddingVertical: 1
          }, children: /* @__PURE__ */ jsx90(Text65, { style: { fontFamily: font.mono, fontSize: fs[10], color: color.chalk[100] }, children: duration }) })
        ] }) }),
        (title || attribution) && /* @__PURE__ */ jsxs73(View82, { style: { padding: sp[3], paddingHorizontal: sp[4] }, children: [
          title ? /* @__PURE__ */ jsx90(Text65, { style: { fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fg }, children: title }) : null,
          attribution && /* @__PURE__ */ jsx90(Text65, { style: { fontFamily: font.sans, fontSize: fs[11], color: theme.fgFaint, marginTop: sp[0.5] }, children: attribution })
        ] })
      ]
    }
  );
}

// rn/ChatMessage.tsx
import { View as View84, Text as Text66, I18nManager as I18nManager12 } from "react-native";

// rn/TypingIndicator.tsx
import { useEffect as useEffect14 } from "react";
import { View as View83 } from "react-native";
import Animated13, { useSharedValue as useSharedValue12, useAnimatedStyle as useAnimatedStyle12, withRepeat as withRepeat6, withSequence as withSequence4, withTiming as withTiming12, withDelay as withDelay4, cancelAnimation as cancelAnimation6, Easing as Easing12 } from "react-native-reanimated";
import { jsx as jsx91, jsxs as jsxs74 } from "react/jsx-runtime";
var DOT_SIZE = sp[1];
var DOT_BOUNCE = -sp[1];
var DOT_DURATION = 300;
var DOT_STAGGER = 150;
function Dot({ index }) {
  const { theme } = useTheme();
  const translateY = useSharedValue12(0);
  useEffect14(() => {
    translateY.value = withDelay4(
      index * DOT_STAGGER,
      withRepeat6(
        withSequence4(
          withTiming12(DOT_BOUNCE, { duration: DOT_DURATION, easing: Easing12.inOut(Easing12.sin) }),
          withTiming12(0, { duration: DOT_DURATION, easing: Easing12.inOut(Easing12.sin) }),
          withDelay4((2 - index) * DOT_STAGGER, withTiming12(0, { duration: 0 }))
        ),
        -1
      )
    );
    return () => cancelAnimation6(translateY);
  }, []);
  const animStyle = useAnimatedStyle12(() => ({
    transform: [{ translateY: translateY.value }]
  }));
  return /* @__PURE__ */ jsx91(Animated13.View, { style: [{
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: theme.irisDot
  }, animStyle] });
}
function TypingIndicator() {
  return /* @__PURE__ */ jsxs74(View83, { style: { flexDirection: "row", gap: sp[1], paddingVertical: sp[1], alignSelf: "flex-start" }, children: [
    /* @__PURE__ */ jsx91(Dot, { index: 0 }),
    /* @__PURE__ */ jsx91(Dot, { index: 1 }),
    /* @__PURE__ */ jsx91(Dot, { index: 2 })
  ] });
}

// rn/ChatMessage.tsx
import { jsx as jsx92, jsxs as jsxs75 } from "react/jsx-runtime";
function ChatMessage({ children, from, confirmed = true, thinking, revealedLength, rtl }) {
  const { theme, mode } = useTheme();
  const isVoid = mode === "void";
  const isRTL = rtl ?? I18nManager12.isRTL;
  const writingDirection = isRTL ? "rtl" : "ltr";
  if (from === "tutor" && thinking) {
    return /* @__PURE__ */ jsx92(View84, { style: { alignSelf: "flex-start", [isRTL ? "paddingRight" : "paddingLeft"]: sp[4] }, children: /* @__PURE__ */ jsx92(TypingIndicator, {}) });
  }
  if (from === "tutor") {
    let splitAt = revealedLength !== void 0 ? revealedLength : children.length;
    if (splitAt < children.length) {
      const nextSpace = children.indexOf(" ", splitAt);
      const prevSpace = children.lastIndexOf(" ", splitAt);
      splitAt = prevSpace > 0 ? prevSpace : 0;
    }
    const revealed = children.slice(0, splitAt);
    const unrevealed = children.slice(splitAt);
    return /* @__PURE__ */ jsx92(View84, { style: {
      [isRTL ? "borderRightWidth" : "borderLeftWidth"]: 2,
      [isRTL ? "borderRightColor" : "borderLeftColor"]: theme.irisBorder,
      [isRTL ? "paddingRight" : "paddingLeft"]: sp[4],
      alignSelf: "flex-start",
      maxWidth: "80%"
    }, children: /* @__PURE__ */ jsxs75(Text66, { style: { fontFamily: font.sans, fontSize: fs[14], lineHeight: fs[14] * 1.5, writingDirection }, children: [
      /* @__PURE__ */ jsx92(Text66, { style: { color: theme.fg }, children: revealed }),
      unrevealed ? /* @__PURE__ */ jsx92(Text66, { style: { color: theme.fgFaint }, children: unrevealed }) : null
    ] }) });
  }
  const accentRGB = isVoid ? "rgba(100,216,174," : "rgba(42,138,106,";
  const chalkRGB = isVoid ? "rgba(241,235,221," : "rgba(38,40,46,";
  return /* @__PURE__ */ jsx92(View84, { style: {
    [isRTL ? "borderLeftWidth" : "borderRightWidth"]: 2,
    [isRTL ? "borderLeftColor" : "borderRightColor"]: confirmed ? `${accentRGB}0.4)` : `${accentRGB}0.1)`,
    paddingVertical: sp[3],
    paddingHorizontal: sp[4],
    backgroundColor: confirmed ? theme.hoverOverlay : `${chalkRGB}0.02)`,
    [isRTL ? "borderTopRightRadius" : "borderTopLeftRadius"]: r[2],
    [isRTL ? "borderBottomRightRadius" : "borderBottomLeftRadius"]: r[2],
    alignSelf: "flex-end",
    maxWidth: "80%"
  }, children: /* @__PURE__ */ jsx92(Text66, { style: {
    fontFamily: font.sans,
    fontSize: fs[14],
    color: confirmed ? theme.fg : theme.fgFaint,
    lineHeight: fs[14] * 1.5,
    fontStyle: confirmed ? "normal" : "italic",
    writingDirection
  }, children }) });
}

// rn/BreakdownCard.tsx
import { View as View85, Text as Text67 } from "react-native";
import { jsx as jsx93, jsxs as jsxs76 } from "react/jsx-runtime";
function BreakdownCard({ title, points }) {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsxs76(View85, { style: { backgroundColor: theme.inputBg, borderRadius: r[2], padding: sp[4] }, children: [
    /* @__PURE__ */ jsx93(Text67, { style: { fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[600], color: theme.fg, marginBottom: sp[3] }, children: title }),
    points.map((point, i) => /* @__PURE__ */ jsxs76(View85, { style: { flexDirection: "row", gap: sp[2], marginBottom: sp[2] }, children: [
      /* @__PURE__ */ jsx93(View85, { style: { width: 4, height: 4, borderRadius: 1, backgroundColor: theme.irisDot, marginTop: 6, flexShrink: 0 } }),
      /* @__PURE__ */ jsx93(Text67, { style: { flex: 1, fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5 }, children: point })
    ] }, i))
  ] });
}

// rn/ActivityCard.tsx
import { View as View86, Text as Text68 } from "react-native";
import { jsx as jsx94, jsxs as jsxs77 } from "react/jsx-runtime";
function ActivityCard({ title, description, buttonLabel = "Start", complete, score, onPress }) {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsxs77(View86, { accessibilityRole: "none", style: { backgroundColor: theme.inputBg, borderRadius: r[2], borderWidth: 1, borderColor: complete ? theme.accentBorder : theme.border, padding: sp[4] }, children: [
    /* @__PURE__ */ jsx94(Text68, { style: { fontFamily: font.mono, fontSize: fs[10], letterSpacing: 1, textTransform: "uppercase", fontWeight: fw[600], color: theme.irisLabel, marginBottom: sp[2] }, children: "Activity" }),
    /* @__PURE__ */ jsx94(Text68, { style: { fontFamily: font.serif, fontSize: fs[15], color: theme.fg, marginBottom: description ? sp[1] : sp[3] }, children: title }),
    description && /* @__PURE__ */ jsx94(Text68, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgSubtle, marginBottom: sp[3] }, children: description }),
    complete ? /* @__PURE__ */ jsxs77(View86, { style: { flexDirection: "row", alignItems: "center", gap: sp[2], marginTop: description ? 0 : sp[2] }, children: [
      /* @__PURE__ */ jsx94(Text68, { style: { fontFamily: font.mono, fontSize: fs[11], fontWeight: fw[600], color: theme.accentText }, children: "Complete" }),
      score && /* @__PURE__ */ jsx94(Text68, { style: { fontFamily: font.mono, fontSize: fs[11], color: theme.accentText }, children: score })
    ] }) : /* @__PURE__ */ jsx94(Button, { variant: "primary", size: "sm", onPress, children: buttonLabel })
  ] });
}

// rn/ResourceList.tsx
import { useState as useState20 } from "react";
import { View as View87, Text as Text69, Pressable as Pressable42 } from "react-native";
import { Fragment as Fragment12, jsx as jsx95, jsxs as jsxs78 } from "react/jsx-runtime";
function ResourceList({ title = "Resources", links }) {
  const { theme } = useTheme();
  const [openIdx, setOpenIdx] = useState20(null);
  return /* @__PURE__ */ jsxs78(Fragment12, { children: [
    /* @__PURE__ */ jsxs78(View87, { style: { backgroundColor: theme.inputBg, borderRadius: r[2], padding: sp[4] }, children: [
      /* @__PURE__ */ jsx95(Text69, { style: { fontFamily: font.mono, fontSize: fs[10], letterSpacing: 1, textTransform: "uppercase", fontWeight: fw[600], color: theme.fgFaint, marginBottom: sp[3] }, children: title }),
      links.map((link, i) => /* @__PURE__ */ jsx95(Pressable42, { accessibilityRole: "link", onPress: () => {
        if (link.onPress) return link.onPress();
        if (link.content) setOpenIdx(i);
      }, children: /* @__PURE__ */ jsx95(Text69, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.accentText, marginBottom: sp[2] }, children: link.label }) }, i))
    ] }),
    openIdx !== null && links[openIdx]?.content && /* @__PURE__ */ jsx95(FullSheet, { visible: true, onClose: () => setOpenIdx(null), title: links[openIdx].label, children: links[openIdx].content })
  ] });
}

// rn/SlidesCard.tsx
import { useState as useState21 } from "react";
import { View as View88, Text as Text70, Pressable as Pressable43, Image as Image8 } from "react-native";
import { Fragment as Fragment13, jsx as jsx96, jsxs as jsxs79 } from "react/jsx-runtime";
function SlidesCard({ title, attribution, slides, onPress }) {
  const { theme } = useTheme();
  const [open, setOpen] = useState21(false);
  const [current, setCurrent] = useState21(0);
  const handlePress = () => {
    if (onPress) return onPress();
    if (slides.length) setOpen(true);
  };
  return /* @__PURE__ */ jsxs79(Fragment13, { children: [
    /* @__PURE__ */ jsx96(
      Pressable43,
      {
        onPress: handlePress,
        accessibilityRole: "button",
        accessibilityLabel: `${title} \u2014 ${slides.length} slide${slides.length !== 1 ? "s" : ""}`,
        style: ({ pressed }) => ({
          backgroundColor: theme.bgRaised,
          borderRadius: r[2],
          borderWidth: 1,
          borderColor: theme.border,
          overflow: "hidden",
          opacity: pressed ? 0.9 : 1
        }),
        children: /* @__PURE__ */ jsxs79(View88, { style: { flexDirection: "row", padding: sp[3], gap: sp[3], alignItems: "center" }, children: [
          slides.length > 0 && /* @__PURE__ */ jsx96(
            Image8,
            {
              source: slides[0],
              style: { width: 56, height: 36, borderRadius: r[1], backgroundColor: theme.hoverOverlay },
              resizeMode: "cover"
            }
          ),
          /* @__PURE__ */ jsxs79(View88, { style: { flex: 1 }, children: [
            /* @__PURE__ */ jsx96(Text70, { style: { fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fg }, children: title }),
            /* @__PURE__ */ jsxs79(Text70, { style: { fontFamily: font.sans, fontSize: fs[11], color: theme.fgFaint, marginTop: sp[0.5] }, children: [
              attribution ? `${attribution} \xB7 ` : "",
              slides.length,
              " slide",
              slides.length !== 1 ? "s" : ""
            ] })
          ] })
        ] })
      }
    ),
    slides.length > 0 && /* @__PURE__ */ jsxs79(FullSheet, { visible: open, onClose: () => setOpen(false), title: `${title} \xB7 ${current + 1}/${slides.length}`, children: [
      /* @__PURE__ */ jsx96(
        Image8,
        {
          source: slides[current],
          style: { width: "100%", aspectRatio: 16 / 9, borderRadius: r[2], marginBottom: sp[5] },
          resizeMode: "contain"
        }
      ),
      slides.length > 1 && /* @__PURE__ */ jsxs79(View88, { style: { flexDirection: "row", gap: sp[3] }, children: [
        /* @__PURE__ */ jsx96(Button, { variant: "secondary", size: "sm", disabled: current === 0, onPress: () => setCurrent(current - 1), children: "Prev" }),
        /* @__PURE__ */ jsx96(Button, { variant: "secondary", size: "sm", disabled: current === slides.length - 1, onPress: () => setCurrent(current + 1), children: "Next" })
      ] })
    ] })
  ] });
}

// rn/WorkedExampleCard.tsx
import { useState as useState22 } from "react";
import { View as View89, Text as Text71, Pressable as Pressable44 } from "react-native";
import { Fragment as Fragment14, jsx as jsx97, jsxs as jsxs80 } from "react/jsx-runtime";
function WorkedExampleCard({ title, steps, onPress }) {
  const { theme } = useTheme();
  const [open, setOpen] = useState22(false);
  const handlePress = () => {
    if (onPress) return onPress();
    if (steps?.length) setOpen(true);
  };
  return /* @__PURE__ */ jsxs80(Fragment14, { children: [
    /* @__PURE__ */ jsx97(
      Pressable44,
      {
        onPress: handlePress,
        accessibilityRole: "button",
        accessibilityLabel: `${title} \u2014 ${steps?.length || 0} step worked example`,
        style: ({ pressed }) => ({
          backgroundColor: theme.bgRaised,
          borderRadius: r[2],
          borderWidth: 1,
          borderColor: theme.border,
          overflow: "hidden",
          opacity: pressed ? 0.9 : 1
        }),
        children: /* @__PURE__ */ jsxs80(View89, { style: { flexDirection: "row", padding: sp[4], gap: sp[3], alignItems: "center" }, children: [
          /* @__PURE__ */ jsx97(View89, { style: {
            width: 32,
            height: 32,
            borderRadius: r[1],
            backgroundColor: theme.irisSoft,
            borderWidth: 1,
            borderColor: theme.irisBorder,
            alignItems: "center",
            justifyContent: "center"
          }, children: /* @__PURE__ */ jsx97(Text71, { style: { fontFamily: font.mono, fontSize: fs[12], fontWeight: fw[600], color: theme.iris }, children: steps?.length || "?" }) }),
          /* @__PURE__ */ jsxs80(View89, { style: { flex: 1 }, children: [
            /* @__PURE__ */ jsx97(Text71, { style: { fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fg }, children: title }),
            /* @__PURE__ */ jsxs80(Text71, { style: { fontFamily: font.sans, fontSize: fs[11], color: theme.fgFaint, marginTop: sp[0.5] }, children: [
              steps?.length || 0,
              " step worked example"
            ] })
          ] })
        ] })
      }
    ),
    steps && steps.length > 0 && /* @__PURE__ */ jsx97(FullSheet, { visible: open, onClose: () => setOpen(false), title: "Worked example", children: steps.map((step, i) => /* @__PURE__ */ jsxs80(View89, { style: { flexDirection: "row", gap: sp[4], marginBottom: sp[6] }, children: [
      /* @__PURE__ */ jsx97(View89, { style: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: theme.irisSoft,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: 2
      }, children: /* @__PURE__ */ jsx97(Text71, { style: { fontFamily: font.mono, fontSize: fs[11], fontWeight: fw[600], color: theme.iris }, children: i + 1 }) }),
      /* @__PURE__ */ jsxs80(View89, { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsx97(Text71, { style: { fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[600], color: theme.fg, marginBottom: sp[2] }, children: step.title }),
        /* @__PURE__ */ jsx97(Text71, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.6 }, children: step.content })
      ] })
    ] }, i)) })
  ] });
}

// rn/Identity.tsx
import { View as View90, Text as Text72 } from "react-native";
import { jsx as jsx98, jsxs as jsxs81 } from "react/jsx-runtime";
function Identity({
  initials,
  imageUri,
  name,
  role,
  meta,
  avatarColor,
  status,
  badge,
  right,
  size = "md"
}) {
  const { theme } = useTheme();
  const avatarSize = size === "sm" ? "sm" : size === "lg" ? "lg" : "md";
  const nameFs = size === "sm" ? fs[13] : size === "lg" ? fs[16] : fs[14];
  return /* @__PURE__ */ jsxs81(View90, { style: { flexDirection: "row", alignItems: "center", gap: sp[3] }, children: [
    /* @__PURE__ */ jsx98(Avatar, { initials, imageUri, size: avatarSize, color: avatarColor, status }),
    /* @__PURE__ */ jsxs81(View90, { style: { flex: 1 }, children: [
      /* @__PURE__ */ jsxs81(View90, { style: { flexDirection: "row", alignItems: "center", gap: sp[2] }, children: [
        /* @__PURE__ */ jsx98(Text72, { style: { fontFamily: font.sans, fontSize: nameFs, fontWeight: fw[600], color: theme.fg }, numberOfLines: 1, children: name }),
        badge !== void 0 && /* @__PURE__ */ jsx98(Badge, { variant: "accent", children: String(badge) })
      ] }),
      role && /* @__PURE__ */ jsx98(Text72, { style: { fontFamily: font.mono, fontSize: fs[11], color: theme.fgSubtle, marginTop: sp[0.5] }, children: role }),
      meta && /* @__PURE__ */ jsx98(Text72, { style: { fontFamily: font.sans, fontSize: fs[12], color: theme.fgFaint, marginTop: sp[0.5] }, children: meta })
    ] }),
    right
  ] });
}

// rn/CardGrid.tsx
import React49 from "react";
import { View as View91 } from "react-native";
import { jsx as jsx99, jsxs as jsxs82 } from "react/jsx-runtime";
function CardGrid({ children, columns = 2 }) {
  const items = React49.Children.toArray(children);
  const rows = [];
  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns));
  }
  return /* @__PURE__ */ jsx99(View91, { style: { gap: sp[4] }, children: rows.map((row, ri) => /* @__PURE__ */ jsxs82(View91, { style: { flexDirection: "row", gap: sp[4] }, children: [
    row.map((item, ci) => /* @__PURE__ */ jsx99(View91, { style: { flex: 1 }, children: item }, ci)),
    row.length < columns && Array.from({ length: columns - row.length }).map((_, fi) => /* @__PURE__ */ jsx99(View91, { style: { flex: 1 } }, `fill-${fi}`))
  ] }, ri)) });
}

// rn/Leaderboard.tsx
import { useCallback as useCallback9 } from "react";
import { View as View92, Text as Text73, FlatList } from "react-native";
import { jsx as jsx100, jsxs as jsxs83 } from "react/jsx-runtime";
function Leaderboard({ entries, label = "Rank", unit = "jugs" }) {
  const { theme } = useTheme();
  const renderItem = useCallback9(({ item, index }) => {
    const rank = index + 1;
    const isTop3 = rank <= 3;
    const rankColors = [color.gold[400], color.chalk[300], color.gold[500]];
    return /* @__PURE__ */ jsxs83(View92, { style: {
      flexDirection: "row",
      alignItems: "center",
      gap: sp[3],
      paddingVertical: sp[3],
      paddingHorizontal: sp[3],
      borderBottomWidth: 1,
      borderBottomColor: theme.divider,
      backgroundColor: item.isCurrent ? theme.selectedOverlay : "transparent",
      borderRadius: item.isCurrent ? r[2] : 0
    }, children: [
      /* @__PURE__ */ jsx100(Text73, { style: {
        fontFamily: font.mono,
        fontSize: fs[12],
        fontWeight: fw[700],
        color: isTop3 ? rankColors[rank - 1] : theme.fgFaint,
        minWidth: 20,
        textAlign: "center"
      }, children: rank }),
      /* @__PURE__ */ jsx100(Avatar, { initials: item.initials, size: "sm", color: item.avatarColor }),
      /* @__PURE__ */ jsx100(Text73, { style: {
        fontFamily: font.sans,
        fontSize: fs[14],
        fontWeight: item.isCurrent ? fw[600] : fw[400],
        color: theme.fg,
        flex: 1
      }, numberOfLines: 1, children: item.name }),
      /* @__PURE__ */ jsx100(Text73, { style: {
        fontFamily: font.mono,
        fontSize: fs[13],
        fontWeight: fw[600],
        color: isTop3 ? rankColors[rank - 1] : theme.fgMuted
      }, children: item.score })
    ] });
  }, [theme]);
  const keyExtractor = useCallback9((_, i) => String(i), []);
  return /* @__PURE__ */ jsx100(
    FlatList,
    {
      data: entries,
      renderItem,
      keyExtractor,
      scrollEnabled: false
    }
  );
}
export {
  ActivityCard,
  Alert,
  Avatar,
  AvatarGroup,
  BackButton,
  Badge,
  BottomAction,
  BottomNav,
  BottomSheet,
  Breadcrumbs,
  BreakdownCard,
  Button,
  Calendar,
  Card,
  CardGrid,
  CategorizeQuestion,
  ChatComposer,
  ChatMessage,
  Checkbox,
  CheckboxGroup,
  Chip,
  CircularProgress,
  ClassToolbar,
  ConstellationPattern,
  Dialog,
  Divider,
  DragItem,
  DragItemContent,
  DropZone,
  DuneDynamic,
  DunePattern,
  EmptyState,
  Facet,
  FillBlanksQuestion,
  FilterBar,
  FullSheet,
  GridPaper,
  HeroCard,
  HomeworkCard,
  HotspotQuestion,
  Icon,
  IconButton,
  Identity,
  Input,
  Interstitial,
  Khatam,
  Leaderboard,
  LinearProgress,
  ListRow,
  LivePrompt,
  MatchQuestion,
  Menu,
  NavRail,
  NoonMark,
  NotificationBell,
  Oasis,
  OrderQuestion,
  Pagination,
  PhoneInput,
  PinInput,
  Pinboard,
  PlacedItem,
  Question,
  QuestionFrame,
  QuizOption,
  Radio,
  RadioGroup,
  Rating,
  ResourceList,
  ResultReview,
  RouteMap,
  SearchInput,
  Segmented,
  Select,
  SessionBar,
  SessionCard,
  Skeleton,
  Slider,
  SlidesCard,
  StarsDynamic,
  StatCard,
  Stepper,
  StreakTracker,
  Switch,
  Table,
  Tabs,
  TerrainDynamic,
  TerrainPattern,
  Textarea,
  ThemeProvider,
  Timer,
  TitleBar,
  Toast,
  ToastProvider,
  Tooltip,
  TypingIndicator,
  UploadTile,
  VideoCard,
  VideoTile,
  VoiceTutor,
  WaypointMarker,
  Waypoints,
  WorkedExampleCard,
  bp,
  color,
  dur,
  font,
  fs,
  fw,
  h,
  icon,
  iconNames,
  layout,
  lh,
  paperElevation,
  paperTheme,
  r,
  sp,
  useDragDrop,
  useTheme,
  useToast,
  voidElevation,
  voidTheme
};
//# sourceMappingURL=index.mjs.map