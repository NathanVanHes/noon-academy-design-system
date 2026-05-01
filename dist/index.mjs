// rn/ThemeContext.tsx
import { createContext, useContext, useState } from "react";

// rn/tokens.ts
var color = {
  void: { 50: "#232c43", 100: "#1a2236", 200: "#10172a", 300: "#0a0f1a", 400: "#060913" },
  chalk: { 100: "#f5f1e8", 200: "#e8e4dc", 300: "#c9c4b8", 400: "#8e8a80" },
  paper: { 100: "#fbf8ef", 200: "#f2ece0", 300: "#e8e1d2" },
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
  fg: "rgba(232,228,220,1)",
  fgMuted: "rgba(232,228,220,0.70)",
  fgSubtle: "rgba(232,228,220,0.55)",
  fgFaint: "rgba(232,228,220,0.35)",
  fgDisabled: "rgba(232,228,220,0.45)",
  // was 0.25, CSS says 0.45
  fgInverse: color.void[300],
  border: "rgba(232,228,220,0.10)",
  borderStrong: "rgba(232,228,220,0.22)",
  divider: "rgba(232,228,220,0.06)",
  hoverOverlay: "rgba(232,228,220,0.04)",
  activeOverlay: "rgba(232,228,220,0.08)",
  selectedOverlay: "rgba(232,228,220,0.06)",
  inputBg: "rgba(232,228,220,0.03)",
  accent: color.noon[400],
  accentHover: color.noon[300],
  accentActive: color.noon[500],
  accentFg: color.noon[800],
  accentSoft: "rgba(100,216,174,0.14)",
  accentBorder: "rgba(100,216,174,0.35)",
  accentGlow: "rgba(100,216,174,0.15)",
  signal: color.gold[400],
  signalDim: color.gold[500],
  signalBright: color.gold[300],
  signalSoft: "rgba(201,162,39,0.12)",
  signalBorder: "rgba(201,162,39,0.35)",
  danger: color.danger[400],
  dangerSoft: "rgba(197,90,78,0.10)",
  dangerBorder: "rgba(197,90,78,0.40)",
  iris: color.iris[400],
  irisSoft: "rgba(176,138,249,0.10)",
  irisBorder: "rgba(176,138,249,0.40)",
  irisLabel: "rgba(176,138,249,0.60)",
  irisDot: "rgba(176,138,249,0.50)",
  terra: color.terra[600],
  terraSoft: "rgba(138,78,42,0.10)",
  terraBorder: "rgba(138,78,42,0.35)"
};
var paperTheme = {
  bg: color.paper[200],
  bgSunken: color.paper[300],
  bgRaised: color.paper[100],
  bgOverlay: color.paper[100],
  fg: color.void[300],
  fgMuted: "rgba(10,15,26,0.72)",
  fgSubtle: "rgba(10,15,26,0.55)",
  fgFaint: "rgba(10,15,26,0.38)",
  fgDisabled: "rgba(10,15,26,0.45)",
  fgInverse: color.chalk[100],
  border: "rgba(10,15,26,0.10)",
  borderStrong: "rgba(10,15,26,0.22)",
  divider: "rgba(10,15,26,0.06)",
  hoverOverlay: "rgba(10,15,26,0.04)",
  activeOverlay: "rgba(10,15,26,0.08)",
  selectedOverlay: "rgba(10,15,26,0.06)",
  inputBg: "rgba(10,15,26,0.02)",
  accent: "#2A8A6A",
  accentHover: "#238060",
  accentActive: "#1a6048",
  accentFg: color.paper[100],
  accentSoft: "rgba(25,110,82,0.10)",
  accentBorder: "rgba(25,110,82,0.30)",
  accentGlow: "rgba(25,110,82,0.12)",
  signal: color.gold[400],
  signalDim: "rgba(201,162,39,0.70)",
  signalBright: color.gold[400],
  signalSoft: "rgba(201,162,39,0.12)",
  signalBorder: "rgba(201,162,39,0.30)",
  danger: "#9a4339",
  dangerSoft: "rgba(154,67,57,0.10)",
  dangerBorder: "rgba(154,67,57,0.30)",
  iris: color.iris[500],
  irisSoft: "rgba(142,99,224,0.10)",
  irisBorder: "rgba(142,99,224,0.35)",
  irisLabel: "rgba(142,99,224,0.55)",
  irisDot: "rgba(142,99,224,0.45)",
  terra: color.terra[400],
  terraSoft: "rgba(192,122,78,0.12)",
  terraBorder: "rgba(192,122,78,0.35)"
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
var voidElevation = {
  0: {},
  1: { borderWidth: 1, borderColor: "rgba(232,228,220,0.08)" },
  2: {
    borderWidth: 1,
    borderColor: "rgba(232,228,220,0.12)",
    shadowColor: "rgba(232,228,220,1)",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1,
    shadowOpacity: 0.06,
    elevation: 2
  },
  3: {
    borderWidth: 1,
    borderColor: "rgba(232,228,220,0.16)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    shadowOpacity: 0.5,
    elevation: 6
  },
  4: {
    borderWidth: 1,
    borderColor: "rgba(232,228,220,0.22)",
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
    shadowColor: "rgba(10,15,26,1)",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.06,
    borderWidth: 1,
    borderColor: "rgba(10,15,26,0.08)",
    elevation: 1
  },
  2: {
    shadowColor: "rgba(10,15,26,1)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.08,
    borderWidth: 1,
    borderColor: "rgba(10,15,26,0.06)",
    elevation: 3
  },
  3: {
    shadowColor: "rgba(10,15,26,1)",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    shadowOpacity: 0.1,
    borderWidth: 1,
    borderColor: "rgba(10,15,26,0.05)",
    elevation: 8
  },
  4: {
    shadowColor: "rgba(10,15,26,1)",
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 32,
    shadowOpacity: 0.14,
    borderWidth: 1,
    borderColor: "rgba(10,15,26,0.04)",
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
  ] })
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
  const { theme } = useTheme();
  const bgMap = {
    primary: theme.accent,
    secondary: "transparent",
    ghost: "transparent",
    danger: "transparent",
    "danger-solid": color.danger[400],
    signal: color.gold[400]
  };
  const fgMap = {
    primary: theme.accentFg,
    secondary: theme.fg,
    ghost: theme.fgMuted,
    danger: color.danger[300],
    "danger-solid": color.chalk[100],
    signal: theme.bg
  };
  const isOutline = variant === "secondary" || variant === "danger";
  const borderColor2 = variant === "secondary" ? theme.borderStrong : variant === "danger" ? theme.dangerBorder : "transparent";
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
    ...isOutline && !disabled ? { borderWidth: 1, borderColor: borderColor2 } : {}
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
  const borderColor2 = error ? theme.danger : focused ? theme.accent : theme.borderStrong;
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
    borderColor: borderColor2,
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

// rn/Textarea.tsx
import { forwardRef as forwardRef2, useState as useState3 } from "react";
import { View as View4, TextInput as TextInput2, Text as Text3 } from "react-native";
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var Textarea = forwardRef2(({ label, error, helper, rows = 4, disabled, ...rest }, ref) => {
  const { theme } = useTheme();
  const [focused, setFocused] = useState3(false);
  const borderColor2 = error ? theme.danger : focused ? theme.accent : theme.borderStrong;
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
    borderColor: borderColor2,
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
  return /* @__PURE__ */ jsxs4(View4, { style: containerStyle, children: [
    label && /* @__PURE__ */ jsx6(Text3, { style: labelStyle, children: label }),
    /* @__PURE__ */ jsx6(
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
    (error || helper) && /* @__PURE__ */ jsx6(Text3, { style: helperStyle, children: error || helper })
  ] });
});

// rn/Switch.tsx
import { useEffect } from "react";
import { Pressable as Pressable3, View as View5, Text as Text4, Platform as Platform3 } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor, Easing } from "react-native-reanimated";
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
var TRACK_W = 36;
var TRACK_H = 20;
var THUMB_SIZE = 16;
var THUMB_TRAVEL = TRACK_W - THUMB_SIZE - 4;
function Switch({ value, onValueChange, disabled, label }) {
  const { theme } = useTheme();
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
    backgroundColor: interpolateColor(trackColor.value, [0, 1], [color.chalk[100], theme.accentFg]),
    transform: [{ translateX: thumbX.value }]
  }));
  const track = /* @__PURE__ */ jsx7(View5, { ...Platform3.OS === "web" ? { dataSet: { ltr: "" } } : {}, style: { width: TRACK_W }, children: /* @__PURE__ */ jsx7(Animated.View, { style: [{
    width: TRACK_W,
    height: TRACK_H,
    borderRadius: r.pill,
    justifyContent: "center",
    paddingHorizontal: 2,
    opacity: disabled ? 0.4 : 1
  }, trackStyle], children: /* @__PURE__ */ jsx7(Animated.View, { style: [{
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2
  }, thumbStyle] }) }) });
  return /* @__PURE__ */ jsxs5(Pressable3, { onPress: () => !disabled && onValueChange(!value), accessibilityRole: "switch", accessibilityState: { checked: value, disabled }, style: label ? { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: sp[3], width: "100%" } : void 0, children: [
    label && /* @__PURE__ */ jsx7(Text4, { style: { fontFamily: font.sans, fontSize: fs[14], color: disabled ? theme.fgFaint : theme.fg, flex: 1 }, children: label }),
    track
  ] });
}

// rn/Checkbox.tsx
import { Pressable as Pressable4, View as View6, Text as Text5 } from "react-native";
import { jsx as jsx8, jsxs as jsxs6 } from "react/jsx-runtime";
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
  const box = /* @__PURE__ */ jsxs6(View6, { style: boxStyle, children: [
    checked && !indeterminate && /* @__PURE__ */ jsx8(View6, { style: checkmarkStyle }),
    indeterminate && /* @__PURE__ */ jsx8(View6, { style: dashStyle })
  ] });
  return /* @__PURE__ */ jsxs6(Pressable4, { onPress: () => !disabled && onValueChange(!checked), accessibilityRole: "checkbox", accessibilityState: { checked, disabled }, style: label ? { flexDirection: "row", alignItems: "center", gap: sp[3] } : void 0, children: [
    box,
    label && /* @__PURE__ */ jsx8(Text5, { style: { fontFamily: font.sans, fontSize: fs[14], color: disabled ? theme.fgFaint : theme.fg }, children: label })
  ] });
}

// rn/CheckboxGroup.tsx
import { View as View7, Text as Text6 } from "react-native";
import { jsx as jsx9, jsxs as jsxs7 } from "react/jsx-runtime";
function CheckboxGroup({ values, onChange, options, title, disabled }) {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsxs7(View7, { accessibilityRole: "none", style: { gap: sp[3] }, children: [
    title && /* @__PURE__ */ jsx9(Text6, { style: { fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: theme.fgMuted, marginBottom: sp[2] }, children: title }),
    options.map((opt) => /* @__PURE__ */ jsx9(
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
import { Pressable as Pressable5, View as View8, Text as Text7 } from "react-native";
import { jsx as jsx10, jsxs as jsxs8 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs8(Pressable5, { onPress: () => !disabled && onSelect(), accessibilityRole: "radio", accessibilityState: { selected, disabled }, style: label ? { flexDirection: "row", alignItems: "center", gap: sp[3] } : void 0, children: [
    /* @__PURE__ */ jsx10(View8, { style: outerStyle }),
    label && /* @__PURE__ */ jsx10(Text7, { style: { fontFamily: font.sans, fontSize: fs[14], color: disabled ? theme.fgFaint : theme.fg }, children: label })
  ] });
}

// rn/RadioGroup.tsx
import { View as View9, Text as Text8 } from "react-native";
import { jsx as jsx11, jsxs as jsxs9 } from "react/jsx-runtime";
function RadioGroup({ value, onChange, options, title, disabled }) {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsxs9(View9, { accessibilityRole: "radiogroup", style: { gap: sp[3] }, children: [
    title && /* @__PURE__ */ jsx11(Text8, { style: { fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: theme.fgMuted, marginBottom: sp[2] }, children: title }),
    options.map((opt) => /* @__PURE__ */ jsx11(
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
import { View as View10, Pressable as Pressable6, Text as Text9, Platform as Platform4 } from "react-native";
import { jsx as jsx12, jsxs as jsxs10 } from "react/jsx-runtime";
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
    ...Platform4.OS === "web" ? { userSelect: "none" } : {}
  };
  return /* @__PURE__ */ jsxs10(View10, { style: { flexDirection: "row", alignItems: "center", gap: sp[2] }, children: [
    /* @__PURE__ */ jsx12(Pressable6, { onPress: () => canDec && !disabled && onChange(value - step), style: btnStyle(canDec), accessibilityRole: "button", accessibilityLabel: "Decrease", accessibilityState: { disabled: !canDec || !!disabled }, children: /* @__PURE__ */ jsx12(Text9, { style: btnText, children: "\u2212" }) }),
    /* @__PURE__ */ jsx12(Text9, { style: valueStyle, accessibilityRole: "text", children: value }),
    /* @__PURE__ */ jsx12(Pressable6, { onPress: () => canInc && !disabled && onChange(value + step), style: btnStyle(canInc), accessibilityRole: "button", accessibilityLabel: "Increase", accessibilityState: { disabled: !canInc || !!disabled }, children: /* @__PURE__ */ jsx12(Text9, { style: btnText, children: "+" }) })
  ] });
}

// rn/Segmented.tsx
import { View as View11, Pressable as Pressable7, Text as Text10, Platform as Platform5 } from "react-native";
import { jsx as jsx13 } from "react/jsx-runtime";
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
    ...Platform5.OS === "web" ? { direction: "ltr" } : {}
  };
  return /* @__PURE__ */ jsx13(View11, { accessibilityRole: "radiogroup", style: trackStyle, children: options.map((opt, i) => {
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
    return /* @__PURE__ */ jsx13(Pressable7, { onPress: () => onSelect(i), style: btnStyle, accessibilityRole: "radio", accessibilityState: { selected: isOn }, children: /* @__PURE__ */ jsx13(Text10, { style: txtStyle, children: opt }) }, i);
  }) });
}

// rn/Card.tsx
import { useState as useState4, useRef, useCallback } from "react";
import { View as View13, Text as Text12, Image, Pressable as Pressable9 } from "react-native";

// rn/Menu.tsx
import { View as View12, Text as Text11, Pressable as Pressable8, Modal, I18nManager, Dimensions } from "react-native";
import { jsx as jsx14, jsxs as jsxs11 } from "react/jsx-runtime";
function Menu({ visible, onClose, items, anchor }) {
  const { theme } = useTheme();
  const isRTL = I18nManager.isRTL;
  const screenWidth = Dimensions.get("window").width;
  const positionStyle = anchor ? { top: anchor.y, right: screenWidth - anchor.x - sp[4] } : { top: 100, ...isRTL ? { left: sp[5] } : { right: sp[5] } };
  return /* @__PURE__ */ jsx14(Modal, { transparent: true, visible, animationType: "fade", onRequestClose: onClose, children: /* @__PURE__ */ jsxs11(Pressable8, { style: { flex: 1 }, onPress: onClose, children: [
    /* @__PURE__ */ jsx14(View12, { style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(6,9,19,0.5)" } }),
    /* @__PURE__ */ jsx14(View12, { accessibilityRole: "menu", style: {
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
    }, children: items.map((item, i) => /* @__PURE__ */ jsxs11(
      Pressable8,
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
          /* @__PURE__ */ jsx14(Text11, { style: {
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
import { Fragment as Fragment2, jsx as jsx15, jsxs as jsxs12 } from "react/jsx-runtime";
var CHECKBOX_SIZE = 20;
function Card({ title, subtitle, meta, thumbnail, actions, selectable, selected: selectedProp, loading, onPress, style }) {
  const { theme } = useTheme();
  const selected = selectable ? !!selectedProp : false;
  const indent = selectable ? CHECKBOX_SIZE + sp[3] : 0;
  const [menuOpen, setMenuOpen] = useState4(false);
  const [menuAnchor, setMenuAnchor] = useState4({ x: sp[4], y: 100 });
  const moreRef = useRef(null);
  const handleMorePress = useCallback(() => {
    moreRef.current?.measureInWindow((x, y, width, height) => {
      setMenuAnchor({ x, y: y + height + sp[1] });
      setMenuOpen(true);
    });
  }, []);
  const containerStyle = {
    backgroundColor: theme.bgRaised,
    borderRadius: r[2],
    borderWidth: 1,
    borderColor: selected ? theme.accentBorder : theme.border,
    overflow: "hidden",
    opacity: loading ? 0.4 : 1,
    ...style
  };
  const content = /* @__PURE__ */ jsxs12(Fragment2, { children: [
    thumbnail && /* @__PURE__ */ jsx15(
      Image,
      {
        source: thumbnail,
        style: { width: "100%", aspectRatio: 16 / 9, backgroundColor: theme.hoverOverlay },
        resizeMode: "cover"
      }
    ),
    /* @__PURE__ */ jsxs12(View13, { style: { padding: sp[4], gap: sp[1] }, children: [
      /* @__PURE__ */ jsxs12(View13, { style: { flexDirection: "row", alignItems: "flex-start", gap: sp[3] }, children: [
        selectable && /* @__PURE__ */ jsx15(View13, { style: {
          width: CHECKBOX_SIZE,
          height: CHECKBOX_SIZE,
          borderRadius: r[1],
          borderWidth: 1.5,
          marginTop: 1,
          borderColor: selected ? theme.accent : theme.borderStrong,
          backgroundColor: selected ? theme.accent : "transparent",
          alignItems: "center",
          justifyContent: "center"
        }, children: selected && /* @__PURE__ */ jsx15(Icon, { name: "check", size: icon.sm, color: theme.accentFg }) }),
        /* @__PURE__ */ jsx15(Text12, { style: { fontFamily: font.sans, fontSize: fs[15], fontWeight: fw[600], color: theme.fg, flex: 1 }, numberOfLines: 2, children: title }),
        actions && actions.length > 0 && /* @__PURE__ */ jsx15(
          Pressable9,
          {
            onPress: (e) => {
              e.stopPropagation?.();
              handleMorePress();
            },
            hitSlop: 8,
            accessibilityRole: "button",
            accessibilityLabel: "More actions",
            style: { padding: sp[1] },
            children: /* @__PURE__ */ jsx15(View13, { ref: moreRef, collapsable: false, children: /* @__PURE__ */ jsx15(Icon, { name: "more-vertical", size: icon.lg, color: theme.fgMuted }) })
          }
        )
      ] }),
      subtitle && /* @__PURE__ */ jsx15(Text12, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginStart: indent }, numberOfLines: 1, children: subtitle }),
      meta && /* @__PURE__ */ jsx15(Text12, { style: { fontFamily: font.mono, fontSize: fs[11], color: theme.fgFaint, marginTop: sp[1], marginStart: indent }, children: meta })
    ] }),
    actions && actions.length > 0 && /* @__PURE__ */ jsx15(Menu, { visible: menuOpen, onClose: () => setMenuOpen(false), anchor: menuAnchor, items: actions.map((a) => ({ label: a.label, danger: a.danger, onPress: a.onPress })) })
  ] });
  if (onPress) {
    return /* @__PURE__ */ jsx15(
      Pressable9,
      {
        onPress,
        accessibilityRole: selectable ? "checkbox" : "button",
        accessibilityState: selectable ? { checked: selected, disabled: !!loading } : loading ? { disabled: true } : void 0,
        accessibilityLabel: title,
        disabled: loading,
        style: ({ pressed }) => [containerStyle, pressed && { borderColor: theme.borderStrong }],
        children: content
      }
    );
  }
  return /* @__PURE__ */ jsx15(View13, { style: containerStyle, children: content });
}

// rn/Chip.tsx
import { View as View14, Text as Text13, Pressable as Pressable10 } from "react-native";
import { Fragment as Fragment3, jsx as jsx16, jsxs as jsxs13 } from "react/jsx-runtime";
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
  const content = /* @__PURE__ */ jsxs13(Fragment3, { children: [
    dot && /* @__PURE__ */ jsx16(View14, { style: dotStyle }),
    /* @__PURE__ */ jsx16(Text13, { style: textStyle, children }),
    dismissable && !disabled && /* @__PURE__ */ jsx16(Pressable10, { onPress: onDismiss, hitSlop: 4, style: { marginLeft: sp[0.5], opacity: 0.6 }, accessibilityRole: "button", accessibilityLabel: `Remove ${children}`, children: /* @__PURE__ */ jsx16(Icon, { name: "close", size: icon.sm, color: textColor }) })
  ] });
  if (onPress && !disabled) {
    return /* @__PURE__ */ jsx16(Pressable10, { onPress, accessibilityRole: "button", style: ({ pressed }) => [containerStyle, pressed && { backgroundColor: theme.border }], children: content });
  }
  return /* @__PURE__ */ jsx16(View14, { style: containerStyle, children: content });
}

// rn/Avatar.tsx
import { View as View15, Text as Text14 } from "react-native";
import { jsx as jsx17, jsxs as jsxs14 } from "react/jsx-runtime";
var sizes2 = { xs: 24, sm: 32, md: 40, lg: 56, xl: 72 };
var fontSizes2 = { xs: fs[11], sm: fs[13], md: fs[16], lg: fs[22], xl: fs[28] };
function Avatar({ initials, size = "sm", color: color3 = "default", star, status }) {
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
    backgroundColor: bgMap[color3],
    alignItems: "center",
    justifyContent: "center",
    // CSS: box-shadow: inset 0 0 0 1px — approximated as borderWidth
    borderWidth: 1,
    borderColor: color3 === "default" ? theme.borderStrong : bgMap[color3],
    position: "relative"
  };
  const textStyle = {
    fontFamily: font.serif,
    fontSize: fontSizes2[size],
    fontWeight: fw[500],
    color: fgMap[color3]
  };
  const starStyle = {
    position: "absolute",
    right: -sp[0.5],
    bottom: -sp[0.5],
    width: icon.md,
    height: icon.md,
    backgroundColor: theme.signalBright,
    transform: [{ rotate: "45deg" }]
  };
  const statusStyle = {
    position: "absolute",
    right: -1,
    bottom: -1,
    width: icon.sm,
    height: icon.sm,
    borderRadius: icon.sm / 2,
    backgroundColor: status === "online" ? theme.accent : color.danger[400],
    borderWidth: sp[0.5],
    borderColor: theme.bg
  };
  return /* @__PURE__ */ jsxs14(View15, { style: containerStyle, children: [
    /* @__PURE__ */ jsx17(Text14, { style: textStyle, children: initials }),
    star && /* @__PURE__ */ jsx17(View15, { style: starStyle }),
    status && /* @__PURE__ */ jsx17(View15, { style: statusStyle })
  ] });
}

// rn/Badge.tsx
import { View as View16, Text as Text15 } from "react-native";
import { jsx as jsx18 } from "react/jsx-runtime";
function Badge({ children, variant = "default" }) {
  const { theme } = useTheme();
  if (variant === "dot") {
    return /* @__PURE__ */ jsx18(View16, { style: { width: sp[2], height: sp[2], borderRadius: r.pill, backgroundColor: theme.fg } });
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
  return /* @__PURE__ */ jsx18(View16, { style: containerStyle, children: /* @__PURE__ */ jsx18(Text15, { style: textStyle, children }) });
}

// rn/Table.tsx
import { useCallback as useCallback2 } from "react";
import { View as View17, Text as Text16, FlatList } from "react-native";
import { jsx as jsx19, jsxs as jsxs15 } from "react/jsx-runtime";
function Table({ columns, rows }) {
  const { theme } = useTheme();
  const cellStyle = { flex: 1, paddingVertical: sp[2], paddingHorizontal: sp[3] };
  const headerText = { fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: theme.fgFaint, letterSpacing: 0.8, textTransform: "uppercase" };
  const bodyText = { fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted };
  const renderRow = useCallback2(({ item, index }) => /* @__PURE__ */ jsx19(View17, { style: { flexDirection: "row", borderBottomWidth: index < rows.length - 1 ? 1 : 0, borderBottomColor: theme.divider }, children: item.map((cell, ci) => /* @__PURE__ */ jsx19(View17, { style: cellStyle, children: /* @__PURE__ */ jsx19(Text16, { style: bodyText, children: cell }) }, ci)) }), [theme, rows.length]);
  const keyExtractor = useCallback2((_, i) => String(i), []);
  const header = /* @__PURE__ */ jsx19(View17, { style: { flexDirection: "row", backgroundColor: theme.bgOverlay, borderBottomWidth: 1, borderBottomColor: theme.border }, children: columns.map((col, i) => /* @__PURE__ */ jsx19(View17, { style: cellStyle, children: /* @__PURE__ */ jsx19(Text16, { style: headerText, children: col }) }, i)) });
  return /* @__PURE__ */ jsxs15(View17, { style: { borderRadius: r[2], borderWidth: 1, borderColor: theme.border, overflow: "hidden" }, children: [
    header,
    /* @__PURE__ */ jsx19(
      FlatList,
      {
        data: rows,
        renderItem: renderRow,
        keyExtractor,
        scrollEnabled: false
      }
    )
  ] });
}

// rn/Divider.tsx
import { View as View18 } from "react-native";
import { jsx as jsx20 } from "react/jsx-runtime";
function Divider() {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsx20(View18, { style: { height: 1, backgroundColor: theme.divider } });
}

// rn/Skeleton.tsx
import { useEffect as useEffect2 } from "react";
import Animated2, { useSharedValue as useSharedValue2, useAnimatedStyle as useAnimatedStyle2, withRepeat, withSequence, withTiming as withTiming2, cancelAnimation } from "react-native-reanimated";
import { jsx as jsx21 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx21(
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
import { View as View19, Text as Text17 } from "react-native";
import { jsx as jsx22, jsxs as jsxs16 } from "react/jsx-runtime";
function EmptyState({ icon: icon2, title, body, actionLabel, onAction }) {
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
    marginTop: icon2 ? sp[4] : 0,
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
  return /* @__PURE__ */ jsxs16(View19, { style: containerStyle, children: [
    icon2,
    /* @__PURE__ */ jsx22(Text17, { style: titleStyle, children: title }),
    /* @__PURE__ */ jsx22(Text17, { style: bodyStyle, children: body }),
    actionLabel && onAction && /* @__PURE__ */ jsx22(View19, { style: { marginTop: sp[5] }, children: /* @__PURE__ */ jsx22(Button, { variant: "primary", onPress: onAction, children: actionLabel }) })
  ] });
}

// rn/Calendar.tsx
import { useState as useState5, useMemo, useRef as useRef2 } from "react";
import { View as View21, Text as Text19, Pressable as Pressable11, PanResponder, LayoutAnimation, Platform as Platform6, UIManager, I18nManager as I18nManager2 } from "react-native";

// rn/Waypoints.tsx
import React8, { useEffect as useEffect3 } from "react";
import { View as View20, Text as Text18 } from "react-native";
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
import Svg2, { Path as Path2 } from "react-native-svg";
import { jsx as jsx23, jsxs as jsxs17 } from "react/jsx-runtime";
var DIAMOND_SIZE = 10;
function WaypointMarker({ state }) {
  const { theme } = useTheme();
  const isDone = state === "done" || state === "passed";
  const isCurrent = state === "current";
  const isArrived = state === "arrived";
  const isComplete = isDone || isArrived;
  const S = DIAMOND_SIZE;
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
  return /* @__PURE__ */ jsxs17(View20, { style: { width: S, height: S, alignItems: "center", justifyContent: "center" }, children: [
    isCurrent && /* @__PURE__ */ jsx23(Animated3.View, { style: [{
      position: "absolute",
      width: S,
      height: S,
      backgroundColor: theme.signalBright
    }, pingAnimStyle] }),
    /* @__PURE__ */ jsxs17(View20, { style: {
      width: S,
      height: S,
      transform: [{ rotate: "45deg" }],
      backgroundColor: isArrived ? theme.accent : isDone ? theme.signalDim : isCurrent ? theme.signalBright : "transparent",
      borderWidth: !isComplete && !isCurrent ? 1 : 0,
      borderColor: theme.fgMuted,
      opacity: !isComplete && !isCurrent ? 0.55 : 1,
      alignItems: "center",
      justifyContent: "center"
    }, children: [
      isDone && /* @__PURE__ */ jsx23(View20, { style: { width: 4, height: 4, borderRadius: 2, backgroundColor: theme.bg } }),
      isArrived && /* @__PURE__ */ jsx23(View20, { style: { width: 0, height: 0, borderLeftWidth: 3, borderRightWidth: 3, borderBottomWidth: 5, borderLeftColor: "transparent", borderRightColor: "transparent", borderBottomColor: theme.bg, transform: [{ rotate: "-45deg" }], marginBottom: 1 } })
    ] })
  ] });
}
function Waypoints({ steps: stepsProp, labels, layout = "horizontal" }) {
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
      return /* @__PURE__ */ jsx23(WaypointMarker, { state: step });
    }, renderLine2 = function(prevDone, isVertical) {
      const lineColor = prevDone ? theme.signalDim : theme.signalBorder;
      if (prevDone) {
        return /* @__PURE__ */ jsx23(View20, { style: isVertical ? { width: 1, flex: 1, backgroundColor: lineColor } : { height: 1, width: "100%", backgroundColor: lineColor } });
      }
      return /* @__PURE__ */ jsx23(View20, { style: isVertical ? { width: 0, flex: 1, borderLeftWidth: 1, borderLeftColor: lineColor, borderStyle: "dashed" } : { height: 0, width: "100%", borderTopWidth: 1, borderTopColor: lineColor, borderStyle: "dashed" } });
    };
    var stepState = stepState2, renderDiamond = renderDiamond2, renderLine = renderLine2;
    const S = 10;
    if (layout === "horizontal" || !layout) {
      const showAllLabels = labels && n <= 5;
      return /* @__PURE__ */ jsxs17(View20, { children: [
        /* @__PURE__ */ jsx23(View20, { style: { flexDirection: "row", alignItems: "flex-start", width: "100%", gap: 2, flexWrap: "nowrap", marginBottom: showAllLabels ? sp[5] : 0 }, children: steps.map((step, i) => {
          const prevDone = i > 0 && (steps[i - 1] === "done" || steps[i - 1] === "passed" || steps[i - 1] === "arrived");
          const { isDone, isCurrent, isArrived } = stepState2(step);
          const col = isArrived ? theme.accent : isCurrent ? theme.signalBright : isDone ? theme.signalDim : theme.fgFaint;
          return /* @__PURE__ */ jsxs17(React8.Fragment, { children: [
            i > 0 && (() => {
              return /* @__PURE__ */ jsx23(View20, { style: { flex: 1, justifyContent: "center", height: S, paddingHorizontal: 2 }, children: renderLine2(prevDone) });
            })(),
            /* @__PURE__ */ jsxs17(View20, { style: { alignItems: "center", width: S, overflow: "visible" }, children: [
              renderDiamond2(step),
              showAllLabels && /* @__PURE__ */ jsx23(Text18, { style: { fontFamily: font.mono, fontSize: fs[9], color: col, textAlign: "center", position: "absolute", top: S + sp[3] }, children: labels[i] })
            ] })
          ] }, i);
        }) }),
        labels && n > 5 && (() => {
          const idx = steps.findIndex((s) => s === "current" || s === "arrived");
          const pos = idx >= 0 ? idx + 1 : 1;
          const label = labels[idx >= 0 ? idx : 0] || "";
          return /* @__PURE__ */ jsxs17(Text18, { style: { fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, marginTop: sp[3] }, children: [
            "Step ",
            pos,
            " of ",
            n,
            " \xB7 ",
            /* @__PURE__ */ jsx23(Text18, { style: { color: theme.signalBright }, children: label })
          ] });
        })()
      ] });
    }
    if (layout === "vertical") {
      const lineGap = 44;
      return /* @__PURE__ */ jsx23(View20, { children: steps.map((step, i) => {
        const prevDone = i > 0 && (steps[i - 1] === "done" || steps[i - 1] === "passed" || steps[i - 1] === "arrived");
        const { isDone, isCurrent, isArrived } = stepState2(step);
        const col = isArrived ? theme.accent : isCurrent ? theme.signalBright : isDone ? theme.signalDim : theme.fgFaint;
        return /* @__PURE__ */ jsxs17(React8.Fragment, { children: [
          i > 0 && (() => {
            return /* @__PURE__ */ jsx23(View20, { style: { height: lineGap, alignItems: "center", marginLeft: S / 2 - 0.5, width: 1, paddingVertical: 3 }, children: renderLine2(prevDone, true) });
          })(),
          /* @__PURE__ */ jsxs17(View20, { style: { flexDirection: "row", alignItems: "center", gap: sp[4] }, children: [
            renderDiamond2(step),
            labels && labels[i] && /* @__PURE__ */ jsx23(Text18, { style: { fontFamily: font.mono, fontSize: fs[10], color: col }, children: labels[i] })
          ] })
        ] }, i);
      }) });
    }
    if (layout === "path") {
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
      return /* @__PURE__ */ jsxs17(View20, { style: { width: w }, children: [
        /* @__PURE__ */ jsx23(Svg2, { width: w, height: totalH, children: pts.map(([x1, y1], i) => {
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
          return done ? /* @__PURE__ */ jsx23(Path2, { d, fill: "none", stroke: theme.signal, strokeWidth: 1, strokeLinecap: "round" }, `p${i}`) : /* @__PURE__ */ jsx23(Path2, { d, fill: "none", stroke: theme.signalBorder, strokeWidth: 1, strokeDasharray: "4 3", strokeLinecap: "round" }, `p${i}`);
        }) }),
        pts.map(([x, y], i) => /* @__PURE__ */ jsx23(View20, { style: { position: "absolute", left: x - S / 2, top: y - S / 2 }, children: renderDiamond2(steps[i]) }, `d${i}`)),
        labels && pts.map(([x, y], i) => {
          const { isDone, isCurrent, isArrived } = stepState2(steps[i]);
          const col = isArrived ? theme.accent : isCurrent ? theme.signalBright : isDone ? theme.signalDim : theme.fgFaint;
          const onLeft = x > w / 2;
          return /* @__PURE__ */ jsx23(View20, { style: {
            position: "absolute",
            top: y - 7,
            left: onLeft ? void 0 : x + S + 6,
            right: onLeft ? w - x + S + 6 : void 0,
            flexDirection: "row",
            alignItems: "center",
            height: 14
          }, children: /* @__PURE__ */ jsx23(Text18, { style: { fontFamily: font.mono, fontSize: fs[10], color: col }, children: labels[i] }) }, `l${i}`);
        })
      ] });
    }
  }
  return null;
}

// rn/Calendar.tsx
import { jsx as jsx24, jsxs as jsxs18 } from "react/jsx-runtime";
if (Platform6.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
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
function Calendar({ selected: selectedProp, onSelect, events, expanded: expandedProp, onToggle, backIcon, onBack, rightAction, locale: localeProp }) {
  const { theme } = useTheme();
  const isRTL = I18nManager2.isRTL;
  const loc = localeProp === "ar" ? AR_LOCALE : localeProp || (isRTL ? AR_LOCALE : EN_LOCALE);
  const reorderedDayNames = useMemo(() => {
    const arr = [...loc.dayNames];
    const start = loc.weekStart;
    return [...arr.slice(start), ...arr.slice(0, start)];
  }, [loc.dayNames, loc.weekStart]);
  const now = /* @__PURE__ */ new Date();
  const [internalSelected, setInternalSelected] = useState5(selectedProp || now);
  const [internalExpanded, setInternalExpanded] = useState5(false);
  const [viewMonth, setViewMonth] = useState5((selectedProp || now).getMonth());
  const [viewYear, setViewYear] = useState5((selectedProp || now).getFullYear());
  const sel = selectedProp || internalSelected;
  const isExpanded = expandedProp !== void 0 ? expandedProp : internalExpanded;
  const weeks = useMemo(() => buildGrid(viewYear, viewMonth, loc.weekStart), [viewYear, viewMonth, loc.weekStart]);
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
  const panResponder = useRef2(PanResponder.create({
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
    return /* @__PURE__ */ jsx24(
      Pressable11,
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
        children: /* @__PURE__ */ jsxs18(View21, { style: {
          width: DAY_SIZE,
          height: DAY_SIZE,
          borderRadius: DAY_SIZE / 2,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: dayBg,
          overflow: "visible"
        }, children: [
          /* @__PURE__ */ jsx24(Text19, { style: {
            fontFamily: font.sans,
            fontSize: fs[14],
            fontWeight: selected || today ? fw[600] : fw[400],
            color: dayFg
          }, children: day.d }),
          evtCount > 0 && (() => {
            const dayDate = new Date(day.y, day.m, day.d);
            const isPast = dayDate < new Date(now.getFullYear(), now.getMonth(), now.getDate());
            return /* @__PURE__ */ jsx24(View21, { style: { position: "absolute", top: 0, right: 0, overflow: "visible", zIndex: 10 }, children: /* @__PURE__ */ jsx24(WaypointMarker, { state: isPast ? "done" : "current" }) });
          })()
        ] })
      },
      di
    );
  }
  return /* @__PURE__ */ jsxs18(View21, { style: { borderBottomWidth: 1, borderBottomColor: theme.border }, children: [
    /* @__PURE__ */ jsxs18(View21, { style: { flexDirection: "row", alignItems: "center", paddingHorizontal: sp[5], paddingVertical: sp[3], minHeight: 56, gap: sp[3] }, children: [
      onBack && /* @__PURE__ */ jsx24(Pressable11, { onPress: onBack, hitSlop: 8, accessibilityRole: "button", accessibilityLabel: "Back", children: backIcon || /* @__PURE__ */ jsx24(Icon, { name: isRTL ? "chevron-right" : "chevron-left", size: icon.lg, color: theme.fgMuted }) }),
      /* @__PURE__ */ jsx24(Text19, { style: { fontFamily: font.sans, fontSize: fs[16], fontWeight: fw[600], color: theme.fg, flex: 1 }, numberOfLines: 1, children: title }),
      /* @__PURE__ */ jsxs18(View21, { style: { flexDirection: "row", alignItems: "center", gap: sp[2] }, children: [
        !isTodaySelected && /* @__PURE__ */ jsx24(Button, { variant: "ghost", size: "sm", onPress: goToday, children: loc.today }),
        /* @__PURE__ */ jsx24(IconButton, { variant: "ghost", size: "sm", onPress: prev, accessibilityLabel: isExpanded ? "Previous month" : "Previous day", children: /* @__PURE__ */ jsx24(Icon, { name: isRTL ? "chevron-right" : "chevron-left", size: icon.md, color: theme.fgMuted }) }),
        /* @__PURE__ */ jsx24(IconButton, { variant: "ghost", size: "sm", onPress: next, accessibilityLabel: isExpanded ? "Next month" : "Next day", children: /* @__PURE__ */ jsx24(Icon, { name: isRTL ? "chevron-left" : "chevron-right", size: icon.md, color: theme.fgMuted }) }),
        rightAction
      ] })
    ] }),
    /* @__PURE__ */ jsx24(View21, { style: { flexDirection: "row", paddingHorizontal: sp[4] }, children: reorderedDayNames.map((d) => /* @__PURE__ */ jsx24(View21, { style: { flex: 1, alignItems: "center", paddingVertical: sp[1] }, children: /* @__PURE__ */ jsx24(Text19, { style: { fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, textTransform: "uppercase" }, children: d }) }, d)) }),
    /* @__PURE__ */ jsx24(View21, { style: { paddingHorizontal: sp[4], overflow: "visible", zIndex: 5 }, children: weeks.map((week, wi) => {
      if (!isExpanded && wi !== shownWeekIdx) return null;
      return /* @__PURE__ */ jsx24(View21, { style: { flexDirection: "row" }, children: week.map((day, di) => renderDay(day, di)) }, wi);
    }) }),
    /* @__PURE__ */ jsx24(View21, { ...panResponder.panHandlers, children: /* @__PURE__ */ jsx24(Pressable11, { onPress: toggle, style: { alignItems: "center", paddingVertical: sp[3] }, accessibilityRole: "button", accessibilityLabel: "Toggle calendar view", children: /* @__PURE__ */ jsx24(View21, { style: { width: sp[7], height: 3, borderRadius: 1.5, backgroundColor: theme.fgFaint, opacity: 0.4 } }) }) })
  ] });
}

// rn/Tabs.tsx
import { View as View22, Pressable as Pressable12, Text as Text20, ScrollView } from "react-native";
import { jsx as jsx25 } from "react/jsx-runtime";
function Tabs({ tabs, selected, onSelect }) {
  const { theme } = useTheme();
  const containerStyle = {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: theme.border
  };
  return /* @__PURE__ */ jsx25(ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, children: /* @__PURE__ */ jsx25(View22, { accessibilityRole: "tablist", style: containerStyle, children: tabs.map((tab, i) => {
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
    return /* @__PURE__ */ jsx25(Pressable12, { onPress: () => onSelect(i), style: tabStyle, accessibilityRole: "tab", accessibilityState: { selected: isOn }, children: /* @__PURE__ */ jsx25(Text20, { style: txtStyle, children: tab }) }, i);
  }) }) });
}

// rn/BottomAction.tsx
import { useContext as useContext2 } from "react";
import { View as View23, Text as Text21 } from "react-native";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import { jsx as jsx26, jsxs as jsxs19 } from "react/jsx-runtime";
function BottomAction({ icon: icon2, message, submessage, messageVariant = "default", primary, secondary }) {
  const { theme } = useTheme();
  const insets = useContext2(SafeAreaInsetsContext) || { bottom: 0 };
  const messageColor = messageVariant === "accent" ? theme.accent : messageVariant === "danger" ? theme.danger : theme.fg;
  return /* @__PURE__ */ jsxs19(View23, { style: {
    paddingHorizontal: sp[5],
    paddingTop: sp[4],
    paddingBottom: Math.max(sp[4], insets.bottom),
    borderTopWidth: 1,
    borderTopColor: theme.border,
    backgroundColor: theme.bgOverlay,
    gap: sp[3]
  }, children: [
    message && /* @__PURE__ */ jsxs19(View23, { style: { flexDirection: "row", alignItems: "flex-start", gap: sp[3] }, children: [
      icon2 && /* @__PURE__ */ jsx26(Icon, { name: icon2, size: icon.lg, color: messageColor }),
      /* @__PURE__ */ jsxs19(View23, { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsx26(Text21, { style: { fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[600], color: messageColor }, children: message }),
        submessage && /* @__PURE__ */ jsx26(Text21, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginTop: sp[0.5] }, children: submessage })
      ] })
    ] }),
    /* @__PURE__ */ jsxs19(View23, { style: { flexDirection: "row", gap: sp[3] }, children: [
      secondary && /* @__PURE__ */ jsx26(View23, { style: { flex: 1 }, children: /* @__PURE__ */ jsx26(Button, { variant: secondary.variant || "secondary", fullWidth: true, disabled: secondary.disabled, onPress: secondary.onPress, children: secondary.label }) }),
      primary && /* @__PURE__ */ jsx26(View23, { style: { flex: 1 }, children: /* @__PURE__ */ jsx26(Button, { variant: primary.variant || "primary", fullWidth: true, disabled: primary.disabled, onPress: primary.onPress, children: primary.label }) })
    ] })
  ] });
}

// rn/BottomNav.tsx
import React11 from "react";
import { View as View24, Pressable as Pressable13, Text as Text22 } from "react-native";
import { SafeAreaInsetsContext as SafeAreaInsetsContext2 } from "react-native-safe-area-context";
import { jsx as jsx27, jsxs as jsxs20 } from "react/jsx-runtime";
function BottomNav({ items, selected, onSelect }) {
  const { theme } = useTheme();
  const insets = React11.useContext(SafeAreaInsetsContext2) || { bottom: 0 };
  const barStyle = {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    paddingTop: sp[3],
    paddingBottom: Math.max(sp[4], insets.bottom),
    backgroundColor: theme.bgOverlay,
    borderTopWidth: 1,
    borderTopColor: theme.border
  };
  return /* @__PURE__ */ jsx27(View24, { accessibilityRole: "tablist", style: barStyle, children: items.map((item, i) => {
    const isOn = i === selected;
    const iconColor = isOn ? theme.accent : theme.fgSubtle;
    const itemStyle = {
      alignItems: "center",
      gap: sp[1],
      minWidth: 56,
      position: "relative"
    };
    const indicatorStyle = {
      position: "absolute",
      top: -sp[3] - sp[1],
      width: sp[6],
      height: sp[0.5],
      backgroundColor: theme.accent,
      borderBottomLeftRadius: r[1],
      borderBottomRightRadius: r[1],
      alignSelf: "center"
    };
    const labelStyle = {
      fontFamily: font.sans,
      fontSize: fs[10],
      fontWeight: fw[600],
      letterSpacing: 0.8,
      textTransform: "uppercase",
      color: isOn ? theme.accent : theme.fgSubtle
    };
    return /* @__PURE__ */ jsxs20(Pressable13, { onPress: () => onSelect(i), style: itemStyle, accessibilityRole: "tab", accessibilityState: { selected: isOn }, children: [
      isOn && /* @__PURE__ */ jsx27(View24, { style: indicatorStyle }),
      typeof item.icon === "string" ? /* @__PURE__ */ jsx27(Icon, { name: item.icon, size: icon.tab, color: iconColor }) : item.icon(iconColor, icon.tab),
      /* @__PURE__ */ jsx27(Text22, { style: labelStyle, children: item.label }),
      item.badge != null && item.badge > 0 && /* @__PURE__ */ jsx27(View24, { style: {
        position: "absolute",
        top: 0,
        right: sp[1],
        minWidth: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: theme.danger,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 4
      }, children: /* @__PURE__ */ jsx27(Text22, { style: { fontFamily: font.mono, fontSize: fs[9], fontWeight: fw[500], color: color.chalk[100] }, children: item.badge }) })
    ] }, i);
  }) });
}

// rn/TitleBar.tsx
import { View as View25, Text as Text23, Pressable as Pressable14, I18nManager as I18nManager3 } from "react-native";
import { Fragment as Fragment4, jsx as jsx28, jsxs as jsxs21 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs21(View25, { style: barStyle, children: [
    !isLarge && /* @__PURE__ */ jsxs21(Fragment4, { children: [
      onBack && /* @__PURE__ */ jsx28(Pressable14, { onPress: onBack, hitSlop: 8, accessibilityRole: "button", accessibilityLabel: "Back", children: backIcon || /* @__PURE__ */ jsx28(Icon, { name: I18nManager3.isRTL ? "chevron-right" : "chevron-left", size: icon.lg, color: theme.fgMuted }) }),
      /* @__PURE__ */ jsx28(Text23, { style: titleStyle, numberOfLines: 1, children: title }),
      rightAction
    ] }),
    isLarge && /* @__PURE__ */ jsxs21(Fragment4, { children: [
      /* @__PURE__ */ jsxs21(View25, { style: { flexDirection: "row", alignItems: "center", gap: sp[3], width: "100%" }, children: [
        onBack && /* @__PURE__ */ jsx28(Pressable14, { onPress: onBack, hitSlop: 8, accessibilityRole: "button", accessibilityLabel: "Back", children: backIcon || /* @__PURE__ */ jsx28(Icon, { name: I18nManager3.isRTL ? "chevron-right" : "chevron-left", size: icon.lg, color: theme.fgMuted }) }),
        /* @__PURE__ */ jsx28(View25, { style: { flex: 1 } }),
        rightAction
      ] }),
      /* @__PURE__ */ jsx28(Text23, { style: titleStyle, children: title }),
      subtitle && /* @__PURE__ */ jsx28(Text23, { style: subStyle, children: subtitle })
    ] })
  ] });
}

// rn/FilterBar.tsx
import { ScrollView as ScrollView2 } from "react-native";
import { jsx as jsx29 } from "react/jsx-runtime";
function FilterBar({ items, onToggle }) {
  return /* @__PURE__ */ jsx29(ScrollView2, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: sp[2], paddingHorizontal: sp[4] }, children: items.map((item, i) => /* @__PURE__ */ jsx29(
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
import { View as View26, Text as Text24 } from "react-native";
import { jsx as jsx30, jsxs as jsxs22 } from "react/jsx-runtime";
function Alert({ title, children, variant = "info" }) {
  const { theme } = useTheme();
  const borderMap = {
    info: theme.borderStrong,
    success: theme.accentBorder,
    warn: theme.signalBorder,
    danger: theme.dangerBorder
  };
  const containerStyle = {
    flexDirection: "row",
    gap: sp[3],
    paddingVertical: sp[4],
    paddingHorizontal: sp[5],
    borderRadius: r[2],
    backgroundColor: theme.bgRaised,
    borderWidth: 1,
    borderColor: borderMap[variant]
  };
  const titleStyle = {
    fontFamily: font.sans,
    fontSize: fs[14],
    fontWeight: fw[600],
    color: theme.fg
  };
  const bodyStyle = {
    fontFamily: font.sans,
    fontSize: fs[13],
    color: theme.fgMuted,
    marginTop: sp[0.5],
    lineHeight: fs[13] * 1.5
  };
  return /* @__PURE__ */ jsx30(View26, { accessibilityRole: "alert", style: containerStyle, children: /* @__PURE__ */ jsxs22(View26, { style: { flex: 1 }, children: [
    title && /* @__PURE__ */ jsx30(Text24, { style: titleStyle, children: title }),
    /* @__PURE__ */ jsx30(Text24, { style: bodyStyle, children })
  ] }) });
}

// rn/Toast.tsx
import React12, { useEffect as useEffect4, useRef as useRef3, useCallback as useCallback3 } from "react";
import { Text as Text25, Pressable as Pressable15 } from "react-native";
import Animated4, { useSharedValue as useSharedValue4, useAnimatedStyle as useAnimatedStyle4, withTiming as withTiming4, Easing as Easing3, runOnJS } from "react-native-reanimated";
import { SafeAreaInsetsContext as SafeAreaInsetsContext3 } from "react-native-safe-area-context";
import { jsx as jsx31 } from "react/jsx-runtime";
function Toast({ message, variant = "info", visible, onDismiss, duration = 4e3 }) {
  const { theme } = useTheme();
  const insets = React12.useContext(SafeAreaInsetsContext3) || { top: 0 };
  const translateY = useSharedValue4(-40);
  const opacity = useSharedValue4(0);
  const shown = useRef3(false);
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
  const bgMap = {
    info: theme.bgOverlay,
    success: theme.accentSoft,
    warn: theme.signalSoft,
    danger: theme.dangerSoft
  };
  return /* @__PURE__ */ jsx31(Animated4.View, { accessibilityRole: "alert", accessibilityLiveRegion: "polite", style: [{
    position: "absolute",
    top: insets.top + sp[4],
    left: sp[4],
    right: sp[4],
    backgroundColor: bgMap[variant],
    borderRadius: r[2],
    padding: sp[4],
    borderWidth: 1,
    borderColor: theme.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    zIndex: 999
  }, animatedStyle], children: /* @__PURE__ */ jsx31(Pressable15, { onPress: dismiss, accessibilityRole: "button", accessibilityLabel: "Dismiss", children: /* @__PURE__ */ jsx31(Text25, { style: { fontFamily: font.sans, fontSize: fs[14], color: theme.fg }, children: message }) }) });
}

// rn/ToastProvider.tsx
import { createContext as createContext2, useContext as useContext3, useState as useState6, useCallback as useCallback4, useRef as useRef4 } from "react";
import { jsx as jsx32, jsxs as jsxs23 } from "react/jsx-runtime";
var ToastContext = createContext2({ show: () => {
} });
function useToast() {
  return useContext3(ToastContext);
}
function ToastProvider({ children }) {
  const [current, setCurrent] = useState6(null);
  const [visible, setVisible] = useState6(false);
  const queue = useRef4([]);
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
  return /* @__PURE__ */ jsxs23(ToastContext.Provider, { value: { show }, children: [
    children,
    current && /* @__PURE__ */ jsx32(
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
import { View as View27, Text as Text26, Modal as Modal2, Pressable as Pressable16, KeyboardAvoidingView, Platform as Platform7 } from "react-native";
import Animated5, { useSharedValue as useSharedValue5, useAnimatedStyle as useAnimatedStyle5, withTiming as withTiming5, Easing as Easing4 } from "react-native-reanimated";
import { jsx as jsx33, jsxs as jsxs24 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx33(Modal2, { visible, transparent: true, animationType: "fade", onRequestClose: onClose, accessibilityViewIsModal: true, children: /* @__PURE__ */ jsx33(KeyboardAvoidingView, { style: { flex: 1 }, behavior: Platform7.OS === "ios" ? "padding" : void 0, children: /* @__PURE__ */ jsx33(Pressable16, { style: { flex: 1, backgroundColor: "rgba(6,9,19,0.5)", justifyContent: "center", alignItems: "center", padding: sp[7] }, onPress: onClose, children: /* @__PURE__ */ jsx33(Animated5.View, { style: [{ width: "100%", maxWidth: 320 }, animatedStyle], children: /* @__PURE__ */ jsxs24(
    Pressable16,
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
        /* @__PURE__ */ jsx33(Text26, { style: { fontFamily: font.serif, fontSize: fs[24], fontWeight: fw[500], color: theme.fg, marginBottom: sp[2] }, children: title }),
        body && /* @__PURE__ */ jsx33(Text26, { style: { fontFamily: font.sans, fontSize: fs[14], color: theme.fgMuted, lineHeight: fs[14] * 1.5, marginBottom: sp[5] }, children: body }),
        /* @__PURE__ */ jsxs24(View27, { style: { flexDirection: "row", gap: sp[3] }, children: [
          /* @__PURE__ */ jsx33(View27, { style: { flex: 1 }, children: /* @__PURE__ */ jsx33(Button, { variant: "ghost", onPress: onSecondary || onClose, children: secondaryLabel }) }),
          /* @__PURE__ */ jsx33(View27, { style: { flex: 1 }, children: /* @__PURE__ */ jsx33(Button, { variant: danger ? "danger" : "primary", onPress: onPrimary || onClose, children: primaryLabel }) })
        ] })
      ]
    }
  ) }) }) }) });
}

// rn/BottomSheet.tsx
import React15 from "react";
import { View as View28, Pressable as Pressable17, Text as Text27, Modal as Modal3, KeyboardAvoidingView as KeyboardAvoidingView2, Platform as Platform8 } from "react-native";
import { SafeAreaInsetsContext as SafeAreaInsetsContext4 } from "react-native-safe-area-context";
import { jsx as jsx34, jsxs as jsxs25 } from "react/jsx-runtime";
function BottomSheet({ visible, onClose, title, children, actions, full }) {
  const { theme } = useTheme();
  const insets = React15.useContext(SafeAreaInsetsContext4) || { bottom: 0 };
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
  return /* @__PURE__ */ jsx34(Modal3, { visible, transparent: true, animationType: "slide", onRequestClose: onClose, children: /* @__PURE__ */ jsx34(KeyboardAvoidingView2, { style: { flex: 1 }, behavior: Platform8.OS === "ios" ? "padding" : void 0, children: /* @__PURE__ */ jsx34(Pressable17, { style: scrimStyle, onPress: onClose, accessibilityRole: "none", children: /* @__PURE__ */ jsxs25(Pressable17, { style: sheetStyle, onPress: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsx34(View28, { style: handleStyle }),
    title && /* @__PURE__ */ jsx34(View28, { style: { paddingHorizontal: sp[6], paddingBottom: sp[2] }, children: /* @__PURE__ */ jsx34(Text27, { style: { fontFamily: font.serif, fontSize: fs[18], color: theme.fg }, children: title }) }),
    /* @__PURE__ */ jsx34(View28, { style: { paddingHorizontal: sp[6], paddingBottom: actions ? sp[5] : Math.max(sp[5], insets.bottom), ...full ? { flex: 1 } : {} }, children }),
    actions && /* @__PURE__ */ jsx34(View28, { style: { borderTopWidth: 1, borderTopColor: theme.border, padding: sp[4], paddingBottom: Math.max(sp[4], insets.bottom), paddingHorizontal: sp[6] }, children: actions })
  ] }) }) }) });
}

// rn/FullSheet.tsx
import React16 from "react";
import { View as View29, Text as Text28, Pressable as Pressable18, Modal as Modal4, ScrollView as ScrollView3 } from "react-native";
import { SafeAreaProvider, SafeAreaInsetsContext as SafeAreaInsetsContext5 } from "react-native-safe-area-context";
import { jsx as jsx35, jsxs as jsxs26 } from "react/jsx-runtime";
function FullSheetContent({ onClose, title, children }) {
  const { theme } = useTheme();
  const insets = React16.useContext(SafeAreaInsetsContext5) || { top: 0, bottom: 0 };
  return /* @__PURE__ */ jsxs26(View29, { style: { flex: 1, backgroundColor: theme.bg, paddingTop: insets.top }, children: [
    /* @__PURE__ */ jsxs26(View29, { style: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: sp[5], paddingVertical: sp[3], borderBottomWidth: 1, borderBottomColor: theme.divider }, children: [
      /* @__PURE__ */ jsx35(Text28, { style: { fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: theme.fg, flex: 1 }, numberOfLines: 1, children: title }),
      /* @__PURE__ */ jsx35(Pressable18, { onPress: onClose, hitSlop: 8, accessibilityRole: "button", accessibilityLabel: "Close", children: /* @__PURE__ */ jsx35(Text28, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgSubtle }, children: "Close" }) })
    ] }),
    /* @__PURE__ */ jsx35(ScrollView3, { style: { flex: 1 }, contentContainerStyle: { padding: sp[5], paddingBottom: sp[5] + insets.bottom }, children })
  ] });
}
function FullSheet({ visible, onClose, title, children }) {
  if (!visible) return null;
  return /* @__PURE__ */ jsx35(Modal4, { visible, animationType: "slide", onRequestClose: onClose, children: /* @__PURE__ */ jsx35(SafeAreaProvider, { children: /* @__PURE__ */ jsx35(FullSheetContent, { onClose, title, children }) }) });
}

// rn/Tooltip.tsx
import { useState as useState7 } from "react";
import { View as View30, Text as Text29, Pressable as Pressable19 } from "react-native";
import { jsx as jsx36, jsxs as jsxs27 } from "react/jsx-runtime";
var TIP_WIDTH = 120;
function Tooltip({ text, children }) {
  const { theme } = useTheme();
  const [visible, setVisible] = useState7(false);
  const [triggerWidth, setTriggerWidth] = useState7(0);
  function onLayout(e) {
    setTriggerWidth(e.nativeEvent.layout.width);
  }
  const tipStyle = {
    position: "absolute",
    bottom: "100%",
    left: (triggerWidth - TIP_WIDTH) / 2,
    marginBottom: sp[2],
    backgroundColor: theme.fg,
    borderRadius: r[2],
    paddingVertical: sp[1],
    paddingHorizontal: sp[2],
    width: TIP_WIDTH,
    alignItems: "center",
    zIndex: 100
  };
  const arrowStyle = {
    position: "absolute",
    bottom: -sp[1],
    alignSelf: "center",
    width: sp[2],
    height: sp[2],
    backgroundColor: theme.fg,
    transform: [{ rotate: "45deg" }]
  };
  const textStyle = {
    fontFamily: font.mono,
    fontSize: fs[11],
    color: theme.bg,
    textAlign: "center"
  };
  return /* @__PURE__ */ jsxs27(View30, { style: { position: "relative" }, onLayout, children: [
    /* @__PURE__ */ jsx36(Pressable19, { onLongPress: () => setVisible(true), onPressOut: () => setVisible(false), accessibilityRole: "button", children }),
    visible && /* @__PURE__ */ jsxs27(View30, { style: tipStyle, accessibilityRole: "tooltip", children: [
      /* @__PURE__ */ jsx36(Text29, { style: textStyle, children: text }),
      /* @__PURE__ */ jsx36(View30, { style: arrowStyle })
    ] })
  ] });
}

// rn/SessionBar.tsx
import { View as View31 } from "react-native";
import { jsx as jsx37 } from "react/jsx-runtime";
var heights2 = { sm: sp[1], md: sp[1], lg: sp[2] };
function SessionBar({ segments, size = "md" }) {
  const { theme } = useTheme();
  const barStyle = {
    flexDirection: "row",
    gap: sp[0.5],
    height: heights2[size]
  };
  function segColor(state) {
    switch (state) {
      case "correct":
        return theme.accent;
      case "incorrect":
        return theme.danger;
      case "current":
        return theme.signalBright;
      default:
        return theme.border;
    }
  }
  return /* @__PURE__ */ jsx37(View31, { style: barStyle, children: segments.map((s, i) => /* @__PURE__ */ jsx37(
    View31,
    {
      style: {
        flex: 1,
        borderRadius: r[1],
        backgroundColor: segColor(s)
      }
    },
    i
  )) });
}

// rn/Progress.tsx
import { View as View32, Text as Text30 } from "react-native";
import Svg3, { Circle as Circle2 } from "react-native-svg";
import { jsx as jsx38, jsxs as jsxs28 } from "react/jsx-runtime";
function LinearProgress({ value, height = sp[1], color: color3 }) {
  const { theme } = useTheme();
  const pct = Math.max(0, Math.min(100, value));
  return /* @__PURE__ */ jsx38(View32, { accessibilityRole: "progressbar", accessibilityValue: { now: pct, min: 0, max: 100 }, style: { height, borderRadius: r.pill, backgroundColor: theme.border, overflow: "hidden" }, children: /* @__PURE__ */ jsx38(View32, { style: { height: "100%", width: `${pct}%`, borderRadius: r.pill, backgroundColor: color3 || theme.accent } }) });
}
function CircularProgress({ value, size = sp[9], strokeWidth = 3, showValue, color: color3 }) {
  const { theme } = useTheme();
  const pct = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - pct / 100);
  return /* @__PURE__ */ jsxs28(View32, { style: { width: size, height: size, alignItems: "center", justifyContent: "center" }, children: [
    /* @__PURE__ */ jsxs28(Svg3, { width: size, height: size, style: { position: "absolute", transform: [{ rotate: "-90deg" }] }, children: [
      /* @__PURE__ */ jsx38(Circle2, { cx: size / 2, cy: size / 2, r: radius, stroke: theme.border, strokeWidth, fill: "none" }),
      /* @__PURE__ */ jsx38(Circle2, { cx: size / 2, cy: size / 2, r: radius, stroke: color3 || theme.accent, strokeWidth, fill: "none", strokeLinecap: "round", strokeDasharray: circumference, strokeDashoffset })
    ] }),
    showValue && /* @__PURE__ */ jsxs28(Text30, { style: { fontFamily: font.mono, fontSize: fs[13], fontWeight: fw[500], color: theme.fg }, children: [
      Math.round(pct),
      "%"
    ] })
  ] });
}

// rn/SessionCard.tsx
import { View as View33, Text as Text31, Pressable as Pressable20 } from "react-native";
import { jsx as jsx39, jsxs as jsxs29 } from "react/jsx-runtime";
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
      return /* @__PURE__ */ jsx39(WaypointMarker, { state: isDoneAssessment ? "done" : "current" });
    }
    return /* @__PURE__ */ jsx39(View33, { style: {
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
    if (state === "live") return /* @__PURE__ */ jsxs29(View33, { style: { flexDirection: "row", alignItems: "center", gap: sp[2], height: 28, paddingHorizontal: sp[3], borderRadius: r[1], backgroundColor: theme.signalSoft, borderWidth: 1, borderColor: theme.signalBorder }, children: [
      /* @__PURE__ */ jsx39(View33, { style: { width: icon.xs, height: icon.xs, borderRadius: icon.xs / 2, backgroundColor: theme.signalBright } }),
      /* @__PURE__ */ jsx39(Text31, { style: { fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: theme.signalBright }, children: "Live" })
    ] });
    if (state === "soon") return /* @__PURE__ */ jsx39(Text31, { style: { fontFamily: font.mono, fontSize: fs[12], color: theme.signalBright }, children: "Soon" });
    if (state === "done") return /* @__PURE__ */ jsx39(Text31, { style: { fontFamily: font.mono, fontSize: fs[12], color: theme.fgMuted }, children: "Ended" });
    if (state === "cancelled") return /* @__PURE__ */ jsx39(Text31, { style: { fontFamily: font.mono, fontSize: fs[12], color: theme.danger }, children: "Cancelled" });
    return /* @__PURE__ */ jsx39(Text31, { style: { fontFamily: font.mono, fontSize: fs[12], color: theme.fgMuted }, children: statusText || "" });
  }
  return /* @__PURE__ */ jsxs29(Pressable20, { onPress, accessibilityRole: "button", style: ({ pressed }) => [containerStyle, pressed && { backgroundColor: theme.hoverOverlay }], children: [
    /* @__PURE__ */ jsx39(Text31, { style: timeStyle, children: time }),
    assessment && renderIndicator(),
    /* @__PURE__ */ jsxs29(View33, { style: { flex: 1 }, children: [
      /* @__PURE__ */ jsx39(Text31, { style: titleStyle, children: title }),
      /* @__PURE__ */ jsx39(Text31, { style: metaStyle, children: meta })
    ] }),
    /* @__PURE__ */ jsx39(View33, { style: { minWidth: sp[9], alignItems: "flex-end" }, children: renderStatus() })
  ] });
}

// rn/HomeworkCard.tsx
import { View as View34, Text as Text32, Pressable as Pressable21 } from "react-native";
import { jsx as jsx40, jsxs as jsxs30 } from "react/jsx-runtime";
function HomeworkCard({ title, subject, dueDate, questions, status = "pending", score, onPress }) {
  const { theme } = useTheme();
  const statusColor2 = {
    pending: theme.fgFaint,
    "in-progress": theme.signalBright,
    submitted: theme.accent,
    overdue: theme.danger,
    graded: theme.accent
  };
  const statusLabel2 = {
    pending: "Pending",
    "in-progress": "In progress",
    submitted: "Submitted",
    overdue: "Overdue",
    graded: score ? `Graded \xB7 ${score}` : "Graded"
  };
  const isOverdue = status === "overdue";
  const isDone = status === "submitted" || status === "graded";
  const containerStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: sp[4],
    paddingVertical: sp[4],
    paddingHorizontal: sp[5],
    borderBottomWidth: 1,
    borderBottomColor: theme.divider
  };
  return /* @__PURE__ */ jsxs30(Pressable21, { onPress, accessibilityRole: "button", style: ({ pressed }) => [containerStyle, pressed && { backgroundColor: theme.hoverOverlay }], children: [
    /* @__PURE__ */ jsx40(View34, { style: { minWidth: 40 }, children: /* @__PURE__ */ jsx40(Text32, { style: { fontFamily: font.mono, fontSize: fs[12], color: isOverdue ? theme.danger : theme.fgFaint }, children: dueDate }) }),
    /* @__PURE__ */ jsxs30(View34, { style: { flex: 1 }, children: [
      /* @__PURE__ */ jsx40(Text32, { style: { fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: isDone ? theme.fgMuted : theme.fg }, children: title }),
      /* @__PURE__ */ jsxs30(Text32, { style: { fontFamily: font.sans, fontSize: fs[12], color: theme.fgFaint, marginTop: sp[0.5] }, children: [
        subject,
        " \xB7 ",
        questions,
        " question",
        questions !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsx40(Text32, { style: { fontFamily: font.mono, fontSize: fs[11], color: statusColor2[status] }, children: statusLabel2[status] })
  ] });
}

// rn/QuizOption.tsx
import { Pressable as Pressable22, View as View35, Text as Text33, Image as Image2 } from "react-native";
import { jsx as jsx41, jsxs as jsxs31 } from "react/jsx-runtime";
function QuizOption({ label, text, image, state = "default", onPress }) {
  const { theme } = useTheme();
  const borderColorMap = {
    default: theme.border,
    selected: theme.accent,
    correct: theme.accent,
    incorrect: theme.danger,
    disabled: theme.border
  };
  const bgMap = {
    default: "transparent",
    selected: theme.accentSoft,
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
  return /* @__PURE__ */ jsxs31(
    Pressable22,
    {
      onPress,
      disabled: state === "disabled" || state === "correct" || state === "incorrect",
      accessibilityRole: "button",
      accessibilityState: { selected: state === "selected", disabled: state === "disabled" },
      style: ({ pressed }) => [containerStyle, pressed && { backgroundColor: theme.hoverOverlay }],
      children: [
        /* @__PURE__ */ jsx41(View35, { style: labelStyle, children: /* @__PURE__ */ jsx41(Text33, { style: labelTextStyle, children: label }) }),
        /* @__PURE__ */ jsxs31(View35, { style: { flex: 1 }, children: [
          image && /* @__PURE__ */ jsx41(View35, { style: { width: 120, height: 120, borderRadius: r[1], overflow: "hidden", marginBottom: text ? sp[2] : 0 }, children: /* @__PURE__ */ jsx41(Image2, { source: image, style: { width: "100%", height: "100%" }, resizeMode: "cover" }) }),
          text ? /* @__PURE__ */ jsx41(Text33, { style: optionTextStyle, children: text }) : null
        ] })
      ]
    }
  );
}

// rn/Question.tsx
import { View as View44, Text as Text41, Image as Image5 } from "react-native";

// rn/MatchQuestion.tsx
import React21 from "react";
import { View as View39, Text as Text37 } from "react-native";

// rn/DragItem.tsx
import { useRef as useRef6 } from "react";
import { View as View36, Image as Image3, Text as Text34, Platform as Platform9 } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated6, { useSharedValue as useSharedValue6, useAnimatedStyle as useAnimatedStyle6, withTiming as withTiming6, Easing as Easing5, runOnJS as runOnJS2 } from "react-native-reanimated";
import { jsx as jsx42 } from "react/jsx-runtime";
var TIMING_CONFIG = { duration: dur[2], easing: Easing5.bezier(0.22, 0.61, 0.36, 1) };
var IMG_DEFAULT = 90;
function DragItemContent({ item, fontSize = fs[14] }) {
  const { theme } = useTheme();
  if (item.image) {
    const size = item.imageSize || IMG_DEFAULT;
    return /* @__PURE__ */ jsx42(View36, { style: { width: size, height: size, borderRadius: r[1], overflow: "hidden" }, children: /* @__PURE__ */ jsx42(Image3, { source: item.image, style: { width: "100%", height: "100%" }, resizeMode: "cover" }) });
  }
  return /* @__PURE__ */ jsx42(Text34, { style: { fontFamily: font.sans, fontSize, fontWeight: fw[500], color: theme.fg, ...Platform9.OS === "web" ? { userSelect: "none" } : {} }, children: item.label });
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
  const cbRef = useRef6({ onDragStart, onDragMove, onDragEnd });
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
    ...Platform9.OS === "web" ? { userSelect: "none", cursor: canDrag ? "grab" : "default" } : {}
  };
  return /* @__PURE__ */ jsx42(GestureDetector, { gesture, children: /* @__PURE__ */ jsx42(Animated6.View, { style: [containerStyle, animatedStyle], children: /* @__PURE__ */ jsx42(DragItemContent, { item }) }) });
}

// rn/DropZone.tsx
import React19, { useRef as useRef7, useCallback as useCallback5 } from "react";
import { View as View37, Text as Text35 } from "react-native";
import { jsx as jsx43 } from "react/jsx-runtime";
function DropZone({ id, label, state = "empty", children, onMeasure, minWidth, minHeight, inline, neutral }) {
  const { theme } = useTheme();
  const ref = useRef7(null);
  const onMeasureRef = useRef7(onMeasure);
  onMeasureRef.current = onMeasure;
  const measure = useCallback5(() => {
    setTimeout(() => {
      ref.current?.measureInWindow((x, y, width, height) => {
        if (width > 0 && height > 0) {
          onMeasureRef.current?.(id, { x, y, width, height });
        }
      });
    }, 50);
  }, [id]);
  React19.useEffect(() => {
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
  return /* @__PURE__ */ jsx43(View37, { ref, onLayout: handleLayout, style, collapsable: false, children: children || (label ? /* @__PURE__ */ jsx43(Text35, { style: { fontFamily: font.sans, fontSize: fs[12], color: theme.fgFaint }, children: label }) : null) });
}

// rn/PlacedItem.tsx
import { useRef as useRef8 } from "react";
import { Platform as Platform10 } from "react-native";
import { Gesture as Gesture2, GestureDetector as GestureDetector2 } from "react-native-gesture-handler";
import Animated7, { useSharedValue as useSharedValue7, useAnimatedStyle as useAnimatedStyle7, withTiming as withTiming7, Easing as Easing6, runOnJS as runOnJS3 } from "react-native-reanimated";
import { jsx as jsx44 } from "react/jsx-runtime";
var TIMING = { duration: dur[2], easing: Easing6.bezier(0.22, 0.61, 0.36, 1) };
function PlacedItem({ item, itemState, zoneState, onDragStart, onDragMove, onDragEnd, theme, fontSize, compact }) {
  const tx = useSharedValue7(0);
  const ty = useSharedValue7(0);
  const scale = useSharedValue7(1);
  const zIdx = useSharedValue7(1);
  const isLocked = itemState === "correct" || itemState === "incorrect";
  const cbRef = useRef8({ onDragStart, onDragMove, onDragEnd });
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
  return /* @__PURE__ */ jsx44(GestureDetector2, { gesture, children: /* @__PURE__ */ jsx44(Animated7.View, { style: [{
    backgroundColor: bg,
    borderRadius: r[2],
    borderWidth: 1.5,
    borderStyle,
    borderColor: border,
    paddingVertical: item.image ? 0 : compact ? sp[0.5] : sp[2],
    paddingHorizontal: item.image ? 0 : compact ? sp[2] : sp[3],
    alignItems: "center",
    overflow: "hidden",
    ...Platform10.OS === "web" ? { userSelect: "none", cursor: isLocked ? "default" : "grab" } : {}
  }, animStyle], children: /* @__PURE__ */ jsx44(DragItemContent, { item, fontSize }) }) });
}

// rn/useDragDrop.ts
import { useState as useState8, useCallback as useCallback6, useRef as useRef9 } from "react";
function useDragDrop({ items, zones, correctMapping, allowMultiplePerZone, showZoneResults, onAnswer }) {
  const onAnswerRef = useRef9(onAnswer);
  onAnswerRef.current = onAnswer;
  const zoneBounds = useRef9({});
  const [draggingId, setDraggingId] = useState8(null);
  const [hoveringZone, setHoveringZone] = useState8(null);
  const [state, setState] = useState8(() => ({
    itemStates: Object.fromEntries(items.map((i) => [i.id, "idle"])),
    zoneStates: Object.fromEntries(zones.map((z) => [z, "empty"])),
    placements: {},
    submitted: false
  }));
  const registerZone = useCallback6((id, bounds) => {
    zoneBounds.current[id] = bounds;
  }, []);
  const findZoneAt = useCallback6((x, y) => {
    for (const [id, b] of Object.entries(zoneBounds.current)) {
      if (x >= b.x && x <= b.x + b.width && y >= b.y && y <= b.y + b.height) {
        return id;
      }
    }
    return null;
  }, []);
  const onDragStart = useCallback6((id) => {
    if (state.submitted) return;
    setDraggingId(id);
    setState((prev) => ({
      ...prev,
      itemStates: { ...prev.itemStates, [id]: "dragging" }
    }));
  }, [state.submitted]);
  const onDragMove = useCallback6((id, x, y) => {
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
  const onDragEnd = useCallback6((id, x, y) => {
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
  const reveal = useCallback6((results) => {
    setState((prev) => {
      const nextItemStates = { ...prev.itemStates };
      for (const [itemId, isCorrect] of Object.entries(results)) {
        nextItemStates[itemId] = isCorrect ? "correct" : "incorrect";
      }
      return { ...prev, itemStates: nextItemStates, submitted: true };
    });
  }, []);
  const submit = useCallback6(() => {
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
  const reset = useCallback6(() => {
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
import { View as View38, Text as Text36 } from "react-native";
import { jsx as jsx45, jsxs as jsxs32 } from "react/jsx-runtime";
function QuestionFrame({ instruction, children, options, optionsPosition = "bottom", showButtons = true, submitted, allPlaced, onSubmit, onReset }) {
  return /* @__PURE__ */ jsxs32(View38, { style: { gap: sp[4], overflow: "visible" }, children: [
    instruction && /* @__PURE__ */ jsx45(Text36, { style: { fontFamily: font.sans, fontSize: fs[13] }, children: instruction }),
    optionsPosition === "top" && options,
    children,
    optionsPosition === "bottom" && options,
    showButtons && /* @__PURE__ */ jsxs32(View38, { style: { flexDirection: "row", gap: sp[3] }, children: [
      !submitted && onSubmit && /* @__PURE__ */ jsx45(Button, { variant: "primary", size: "sm", disabled: !allPlaced, onPress: onSubmit, children: "Check" }),
      submitted && onReset && /* @__PURE__ */ jsx45(Button, { variant: "secondary", size: "sm", onPress: onReset, children: "Try again" })
    ] })
  ] });
}

// rn/MatchQuestion.tsx
import { jsx as jsx46, jsxs as jsxs33 } from "react/jsx-runtime";
function MatchQuestion({ items, targets, correctMapping, instruction, optionsPosition, showButtons, onAnswer, onReady }) {
  const { theme } = useTheme();
  const dd = useDragDrop({ items, zones: targets.map((t) => t.id), correctMapping, onAnswer });
  const onReadyRef = React21.useRef(onReady);
  onReadyRef.current = onReady;
  React21.useEffect(() => {
    onReadyRef.current?.({ submit: dd.submit, reset: dd.reset, allPlaced: dd.allPlaced, submitted: dd.submitted });
  }, [dd.allPlaced, dd.submitted]);
  const itemInZone = (zoneId) => {
    const entry = Object.entries(dd.placements).find(([_, zid]) => zid === zoneId);
    return entry ? items.find((i) => i.id === entry[0]) : void 0;
  };
  const sourceItems = !dd.submitted ? /* @__PURE__ */ jsx46(View39, { style: { flexDirection: "row", flexWrap: "wrap", gap: sp[2], alignItems: "flex-start", minHeight: sp[2], overflow: "visible" }, children: items.filter((item) => !dd.placements[item.id]).map((item) => /* @__PURE__ */ jsx46(DragItem, { item, state: dd.itemStates[item.id], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd }, item.id)) }) : null;
  return /* @__PURE__ */ jsx46(QuestionFrame, { instruction: instruction || "Drag each item to its match", optionsPosition, options: sourceItems, showButtons, submitted: dd.submitted, allPlaced: dd.allPlaced, onSubmit: dd.submit, onReset: dd.reset, children: /* @__PURE__ */ jsx46(View39, { style: { gap: sp[3], overflow: "visible" }, children: targets.map((target) => {
    const placed = itemInZone(target.id);
    const isActive = placed && dd.itemStates[placed.id] === "dragging";
    return /* @__PURE__ */ jsxs33(View39, { style: { flexDirection: "row", alignItems: "center", gap: sp[3], overflow: "visible", zIndex: isActive ? 100 : 1 }, children: [
      /* @__PURE__ */ jsx46(Text37, { style: { fontFamily: font.sans, fontSize: fs[14], color: theme.fg, flex: 1 }, children: target.label }),
      /* @__PURE__ */ jsx46(DropZone, { id: target.id, state: dd.zoneStates[target.id], onMeasure: dd.registerZone, minWidth: 100, inline: true, children: placed && /* @__PURE__ */ jsx46(PlacedItem, { item: placed, itemState: dd.itemStates[placed.id], zoneState: dd.zoneStates[target.id], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd, theme }) })
    ] }, target.id);
  }) }) });
}

// rn/CategorizeQuestion.tsx
import React22 from "react";
import { View as View40, Text as Text38 } from "react-native";
import { jsx as jsx47, jsxs as jsxs34 } from "react/jsx-runtime";
function CategorizeQuestion({ items, categories, correctMapping, instruction, optionsPosition, showButtons, onAnswer, onReady }) {
  const { theme } = useTheme();
  const dd = useDragDrop({ items, zones: categories.map((c) => c.id), correctMapping, allowMultiplePerZone: true, onAnswer });
  const onReadyRef = React22.useRef(onReady);
  onReadyRef.current = onReady;
  React22.useEffect(() => {
    onReadyRef.current?.({ submit: dd.submit, reset: dd.reset, allPlaced: dd.allPlaced, submitted: dd.submitted });
  }, [dd.allPlaced, dd.submitted]);
  const itemsInZone = (zoneId) => {
    return Object.entries(dd.placements).filter(([_, zid]) => zid === zoneId).map(([iid]) => items.find((i) => i.id === iid)).filter(Boolean);
  };
  const sourceItems = !dd.submitted ? /* @__PURE__ */ jsx47(View40, { style: { flexDirection: "row", flexWrap: "wrap", gap: sp[2], alignItems: "flex-start", minHeight: sp[2], overflow: "visible" }, children: items.filter((item) => !dd.placements[item.id]).map((item) => /* @__PURE__ */ jsx47(DragItem, { item, state: dd.itemStates[item.id], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd }, item.id)) }) : null;
  return /* @__PURE__ */ jsx47(QuestionFrame, { instruction: instruction || "Drag each item into the correct category", optionsPosition, options: sourceItems, showButtons, submitted: dd.submitted, allPlaced: dd.allPlaced, onSubmit: dd.submit, onReset: dd.reset, children: /* @__PURE__ */ jsx47(View40, { style: { flexDirection: "row", gap: sp[3], overflow: "visible" }, children: categories.map((cat) => {
    const placed = itemsInZone(cat.id);
    return /* @__PURE__ */ jsxs34(View40, { style: { flex: 1, overflow: "visible" }, children: [
      /* @__PURE__ */ jsx47(Text38, { style: { fontFamily: font.mono, fontSize: fs[11], fontWeight: fw[600], color: theme.fgMuted, marginBottom: sp[2], textAlign: "center" }, children: cat.label }),
      /* @__PURE__ */ jsx47(DropZone, { id: cat.id, state: dd.zoneStates[cat.id], onMeasure: dd.registerZone, minHeight: 80, neutral: true, children: placed.length > 0 && /* @__PURE__ */ jsx47(View40, { style: { flexDirection: "row", flexWrap: "wrap", gap: sp[2], alignItems: "flex-start", padding: sp[1] }, children: placed.map((p) => /* @__PURE__ */ jsx47(DragItem, { item: p, state: dd.itemStates[p.id], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd }, p.id)) }) })
    ] }, cat.id);
  }) }) });
}

// rn/OrderQuestion.tsx
import React23 from "react";
import { View as View41, Text as Text39 } from "react-native";
import { jsx as jsx48, jsxs as jsxs35 } from "react/jsx-runtime";
function OrderQuestion({ items, correctOrder, instruction, optionsPosition, showButtons, onAnswer, onReady }) {
  const { theme } = useTheme();
  const zones = correctOrder.map((_, i) => `slot-${i}`);
  const correctMapping = Object.fromEntries(correctOrder.map((id, i) => [id, `slot-${i}`]));
  const dd = useDragDrop({ items, zones, correctMapping, showZoneResults: true, onAnswer });
  const onReadyRef = React23.useRef(onReady);
  onReadyRef.current = onReady;
  React23.useEffect(() => {
    onReadyRef.current?.({ submit: dd.submit, reset: dd.reset, allPlaced: dd.allPlaced, submitted: dd.submitted });
  }, [dd.allPlaced, dd.submitted]);
  const itemInZone = (zoneId) => {
    const entry = Object.entries(dd.placements).find(([_, zid]) => zid === zoneId);
    return entry ? items.find((i) => i.id === entry[0]) : void 0;
  };
  const sourceItems = !dd.submitted ? /* @__PURE__ */ jsx48(View41, { style: { flexDirection: "row", flexWrap: "wrap", gap: sp[2], alignItems: "flex-start", minHeight: sp[2], overflow: "visible" }, children: items.filter((item) => !dd.placements[item.id]).map((item) => /* @__PURE__ */ jsx48(DragItem, { item, state: dd.itemStates[item.id], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd }, item.id)) }) : null;
  return /* @__PURE__ */ jsx48(QuestionFrame, { instruction: instruction || "Drag items into the correct order", optionsPosition, options: sourceItems, showButtons, submitted: dd.submitted, allPlaced: dd.allPlaced, onSubmit: dd.submit, onReset: dd.reset, children: /* @__PURE__ */ jsx48(View41, { style: { gap: sp[2], overflow: "visible" }, children: zones.map((zoneId, i) => {
    const placed = itemInZone(zoneId);
    const isActive = placed && dd.itemStates[placed.id] === "dragging";
    return /* @__PURE__ */ jsxs35(View41, { style: { flexDirection: "row", alignItems: "center", gap: sp[3], overflow: "visible", zIndex: isActive ? 100 : 1 }, children: [
      /* @__PURE__ */ jsx48(Text39, { style: { fontFamily: font.mono, fontSize: fs[13], fontWeight: fw[600], color: theme.fgFaint, minWidth: 24, textAlign: "center" }, children: i + 1 }),
      /* @__PURE__ */ jsx48(View41, { style: { flex: 1, overflow: "visible" }, children: /* @__PURE__ */ jsx48(DropZone, { id: zoneId, state: dd.zoneStates[zoneId], onMeasure: dd.registerZone, minHeight: 40, inline: true, children: placed && /* @__PURE__ */ jsx48(PlacedItem, { item: placed, itemState: dd.itemStates[placed.id], zoneState: dd.zoneStates[zoneId], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd, theme, fontSize: fs[13] }) }) })
    ] }, zoneId);
  }) }) });
}

// rn/FillBlanksQuestion.tsx
import React24 from "react";
import { View as View42, Text as Text40 } from "react-native";
import { jsx as jsx49 } from "react/jsx-runtime";
function FillBlanksQuestion({ sentence, items, correctMapping, instruction, optionsPosition, showButtons, onAnswer, onReady }) {
  const { theme } = useTheme();
  const blankIds = sentence.match(/\{\{(\w+)\}\}/g)?.map((m) => m.slice(2, -2)) || [];
  const dd = useDragDrop({ items, zones: blankIds, correctMapping, onAnswer });
  const onReadyRef = React24.useRef(onReady);
  onReadyRef.current = onReady;
  React24.useEffect(() => {
    onReadyRef.current?.({ submit: dd.submit, reset: dd.reset, allPlaced: dd.allPlaced, submitted: dd.submitted });
  }, [dd.allPlaced, dd.submitted]);
  const itemInZone = (zoneId) => {
    const entry = Object.entries(dd.placements).find(([_, zid]) => zid === zoneId);
    return entry ? items.find((i) => i.id === entry[0]) : void 0;
  };
  const parts = sentence.split(/(\{\{\w+\}\})/g);
  const sourceItems = !dd.submitted ? /* @__PURE__ */ jsx49(View42, { style: { flexDirection: "row", flexWrap: "wrap", gap: sp[2], alignItems: "flex-start", minHeight: sp[2], overflow: "visible" }, children: items.filter((item) => !dd.placements[item.id]).map((item) => /* @__PURE__ */ jsx49(DragItem, { item, state: dd.itemStates[item.id], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd }, item.id)) }) : null;
  return /* @__PURE__ */ jsx49(QuestionFrame, { instruction: instruction || "Drag words into the blanks", optionsPosition, options: sourceItems, showButtons, submitted: dd.submitted, allPlaced: dd.allPlaced, onSubmit: dd.submit, onReset: dd.reset, children: /* @__PURE__ */ jsx49(View42, { style: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: sp[1], overflow: "visible" }, children: parts.map((part, i) => {
    const blankMatch = part.match(/^\{\{(\w+)\}\}$/);
    if (blankMatch) {
      const blankId = blankMatch[1];
      const placed = itemInZone(blankId);
      return /* @__PURE__ */ jsx49(DropZone, { id: blankId, state: dd.zoneStates[blankId], onMeasure: dd.registerZone, minWidth: 60, minHeight: 32, inline: true, children: placed && /* @__PURE__ */ jsx49(PlacedItem, { item: placed, itemState: dd.itemStates[placed.id], zoneState: dd.zoneStates[blankId], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd, theme }) }, i);
    }
    if (!part) return null;
    return /* @__PURE__ */ jsx49(Text40, { style: { fontFamily: font.sans, fontSize: fs[14], color: theme.fg, lineHeight: sp[7] }, children: part }, i);
  }) }) });
}

// rn/HotspotQuestion.tsx
import React25 from "react";
import { View as View43, Image as Image4 } from "react-native";
import Animated8, { useSharedValue as useSharedValue8, useAnimatedStyle as useAnimatedStyle8, withTiming as withTiming8, Easing as Easing7 } from "react-native-reanimated";
import { jsx as jsx50, jsxs as jsxs36 } from "react/jsx-runtime";
var TIMING2 = { duration: dur[2], easing: Easing7.bezier(0.22, 0.61, 0.36, 1) };
var MARKER_SIZE = 12;
var MARKER_ACTIVE = 28;
var MARKER_HOVER = 48;
function HotspotMarker({ state, isDragging, theme }) {
  const isHovering = state === "hovering";
  const scale = useSharedValue8(1);
  React25.useEffect(() => {
    const target = isHovering ? MARKER_HOVER / MARKER_SIZE : isDragging ? MARKER_ACTIVE / MARKER_SIZE : 1;
    scale.value = withTiming8(target, TIMING2);
  }, [isHovering, isDragging]);
  const ringStyle = useAnimatedStyle8(() => ({
    transform: [{ scale: scale.value }]
  }));
  return /* @__PURE__ */ jsx50(View43, { style: { alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }, children: /* @__PURE__ */ jsx50(Animated8.View, { style: [{
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
  const onReadyRef = React25.useRef(onReady);
  onReadyRef.current = onReady;
  React25.useEffect(() => {
    onReadyRef.current?.({ submit: dd.submit, reset: dd.reset, allPlaced: dd.allPlaced, submitted: dd.submitted });
  }, [dd.allPlaced, dd.submitted]);
  const itemInZone = (zoneId) => {
    const entry = Object.entries(dd.placements).find(([_, zid]) => zid === zoneId);
    return entry ? items.find((i) => i.id === entry[0]) : void 0;
  };
  const sourceItems = !dd.submitted ? /* @__PURE__ */ jsx50(View43, { style: { flexDirection: "row", flexWrap: "wrap", gap: sp[2], alignItems: "flex-start", minHeight: sp[2], overflow: "visible" }, children: items.filter((item) => !dd.placements[item.id]).map((item) => /* @__PURE__ */ jsx50(DragItem, { item, state: dd.itemStates[item.id], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd }, item.id)) }) : null;
  return /* @__PURE__ */ jsx50(QuestionFrame, { instruction: instruction || "Drag items to the correct regions", optionsPosition, options: sourceItems, showButtons, submitted: dd.submitted, allPlaced: dd.allPlaced, onSubmit: dd.submit, onReset: dd.reset, children: /* @__PURE__ */ jsxs36(View43, { style: { width: "100%", aspectRatio: imageAspectRatio, borderRadius: r[2], overflow: "visible", borderWidth: 1, borderColor: theme.border }, children: [
    /* @__PURE__ */ jsx50(Image4, { source: image, style: { width: "100%", height: "100%", borderRadius: r[2] - 1 }, resizeMode: "cover" }),
    zones.map((zone) => {
      const placed = itemInZone(zone.id);
      return /* @__PURE__ */ jsx50(View43, { style: { position: "absolute", left: `${zone.x}%`, top: `${zone.y}%`, width: `${zone.width}%`, height: `${zone.height}%`, overflow: "visible", zIndex: placed && dd.itemStates[placed.id] === "dragging" ? 100 : 1 }, children: /* @__PURE__ */ jsx50(DropZone, { id: zone.id, state: dd.zoneStates[zone.id], onMeasure: dd.registerZone, minWidth: 0, minHeight: 0, inline: true, children: placed ? /* @__PURE__ */ jsx50(
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
      ) : /* @__PURE__ */ jsx50(HotspotMarker, { state: dd.zoneStates[zone.id], isDragging: !!dd.draggingId, theme }) }) }, zone.id);
    })
  ] }) });
}

// rn/Question.tsx
import { jsx as jsx51, jsxs as jsxs37 } from "react/jsx-runtime";
var TYPE_INSTRUCTIONS = {
  choice: "Select the correct answer",
  match: "Drag each item to its match",
  categorize: "Drag each item into the correct category",
  order: "Drag items into the correct order",
  fillblanks: "Drag words into the blanks",
  hotspot: "Drag items to the correct regions"
};
function ChoiceAnswer({ options, selected, correctIndex, submitted, onSelect }) {
  return /* @__PURE__ */ jsx51(View44, { style: { gap: sp[2] }, children: options.map((opt, i) => {
    let state = "default";
    if (submitted && correctIndex !== void 0) {
      if (i === correctIndex) state = "correct";
      else if (i === selected) state = "incorrect";
      else state = "disabled";
    } else if (i === selected) {
      state = "selected";
    }
    return /* @__PURE__ */ jsx51(
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
  return /* @__PURE__ */ jsxs37(View44, { style: { gap: sp[4] }, children: [
    (text || image) && /* @__PURE__ */ jsxs37(View44, { style: { gap: sp[3] }, children: [
      image && /* @__PURE__ */ jsx51(
        Image5,
        {
          source: image,
          style: { width: "100%", aspectRatio: imageAspectRatio, borderRadius: r[2], backgroundColor: theme.hoverOverlay },
          resizeMode: "cover"
        }
      ),
      text && /* @__PURE__ */ jsx51(Text41, { style: { fontFamily: font.sans, fontSize: fs[16], fontWeight: fw[600], color: theme.fg }, children: text }),
      /* @__PURE__ */ jsx51(Text41, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }, children: inst })
    ] }),
    type === "choice" && choiceProps && /* @__PURE__ */ jsx51(ChoiceAnswer, { ...choiceProps }),
    type === "match" && matchProps && /* @__PURE__ */ jsx51(MatchQuestion, { optionsPosition, showButtons, onAnswer, onReady, ...matchProps }),
    type === "categorize" && categorizeProps && /* @__PURE__ */ jsx51(CategorizeQuestion, { optionsPosition, showButtons, onAnswer, onReady, ...categorizeProps }),
    type === "order" && orderProps && /* @__PURE__ */ jsx51(OrderQuestion, { optionsPosition, showButtons, onAnswer, onReady, ...orderProps }),
    type === "fillblanks" && fillBlanksProps && /* @__PURE__ */ jsx51(FillBlanksQuestion, { optionsPosition, showButtons, onAnswer, onReady, ...fillBlanksProps }),
    type === "hotspot" && hotspotProps && /* @__PURE__ */ jsx51(HotspotQuestion, { optionsPosition, showButtons, onAnswer, onReady, ...hotspotProps })
  ] });
}

// rn/Interstitial.tsx
import { useEffect as useEffect6, useRef as useRef10 } from "react";
import { View as View45, Text as Text42 } from "react-native";
import Animated9, { useSharedValue as useSharedValue9, useAnimatedStyle as useAnimatedStyle9, withTiming as withTiming9, withDelay as withDelay2, withRepeat as withRepeat3, withSequence as withSequence3, cancelAnimation as cancelAnimation3 } from "react-native-reanimated";
import { jsx as jsx52, jsxs as jsxs38 } from "react/jsx-runtime";
var CONFETTI_COLORS = [color.noon[400], color.gold[200], color.gold[400], color.noon[200], color.chalk[100]];
var PARTICLE_COUNT = 80;
function ConfettiParticle({ delay, color: c }) {
  const left = useRef10(Math.random() * 100).current;
  const size = useRef10(3 + Math.random() * 5).current;
  const isRect = useRef10(Math.random() > 0.5).current;
  const duration = useRef10(1500 + Math.random() * 1500).current;
  const translateY = useSharedValue9(-10);
  const opacity = useSharedValue9(1);
  useEffect6(() => {
    translateY.value = withDelay2(delay, withTiming9(700, { duration }));
    opacity.value = withDelay2(delay + duration * 0.5, withTiming9(0, { duration: duration * 0.5 }));
    return () => {
      cancelAnimation3(translateY);
      cancelAnimation3(opacity);
    };
  }, []);
  const animatedStyle = useAnimatedStyle9(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }]
  }));
  return /* @__PURE__ */ jsx52(
    Animated9.View,
    {
      style: [{
        position: "absolute",
        left: `${left}%`,
        top: -10,
        width: size,
        height: isRect ? size * 0.4 : size,
        borderRadius: isRect ? 1 : size / 2,
        backgroundColor: c
      }, animatedStyle]
    }
  );
}
function Interstitial({ title, body, buttonLabel, onPress }) {
  const { theme } = useTheme();
  const pulseScale = useSharedValue9(1);
  useEffect6(() => {
    pulseScale.value = withRepeat3(
      withSequence3(
        withTiming9(1.06, { duration: 1e3 }),
        withTiming9(1, { duration: 1e3 })
      ),
      -1
    );
    return () => cancelAnimation3(pulseScale);
  }, []);
  const pulseStyle = useAnimatedStyle9(() => ({
    transform: [{ scale: pulseScale.value }]
  }));
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => /* @__PURE__ */ jsx52(ConfettiParticle, { delay: Math.random() * 3e3, color: CONFETTI_COLORS[i % CONFETTI_COLORS.length] }, i));
  return /* @__PURE__ */ jsxs38(View45, { style: { flex: 1, backgroundColor: theme.bg, alignItems: "center", justifyContent: "center", padding: sp[6] }, children: [
    /* @__PURE__ */ jsx52(View45, { style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden", zIndex: 1 }, pointerEvents: "none", children: particles }),
    /* @__PURE__ */ jsx52(View45, { style: { flex: 1 } }),
    /* @__PURE__ */ jsx52(Animated9.View, { style: [{
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.accentSoft,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: sp[6],
      zIndex: 2
    }, pulseStyle], children: /* @__PURE__ */ jsx52(Text42, { style: { fontSize: fs[48] }, children: "\u2605" }) }),
    /* @__PURE__ */ jsx52(Text42, { style: { fontFamily: font.serif, fontSize: fs[32], fontWeight: fw[500], color: theme.fg, textAlign: "center", marginBottom: sp[3], zIndex: 2 }, children: title }),
    /* @__PURE__ */ jsx52(Text42, { style: { fontFamily: font.sans, fontSize: fs[15], color: theme.fgSubtle, textAlign: "center", maxWidth: 280, lineHeight: fs[15] * 1.5, zIndex: 2 }, children: body }),
    /* @__PURE__ */ jsx52(View45, { style: { flex: 1 } }),
    /* @__PURE__ */ jsx52(View45, { style: { width: "100%", maxWidth: 280, zIndex: 2, paddingBottom: sp[6] }, children: /* @__PURE__ */ jsx52(Button, { variant: "primary", fullWidth: true, onPress, children: buttonLabel }) })
  ] });
}

// rn/Oasis.tsx
import { View as View46, Text as Text43 } from "react-native";
import { jsx as jsx53, jsxs as jsxs39 } from "react/jsx-runtime";
var SIZES = { sm: 36, md: 48, lg: 64 };
function borderColor(status, theme) {
  switch (status) {
    case "complete":
      return color.noon[400];
    case "strong":
      return color.noon[400];
    case "weak":
      return color.terra[400];
    case "current":
      return theme.accent;
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
  const border = borderColor(status, theme);
  const clampedLevel = Math.max(0, Math.min(100, level));
  return /* @__PURE__ */ jsxs39(View46, { style: { alignItems: "center" }, children: [
    /* @__PURE__ */ jsxs39(View46, { style: {
      width: dim,
      height: dim,
      borderRadius: dim / 2,
      borderWidth: isCurrent ? 2 : 1.5,
      borderColor: border,
      borderStyle: isDashed ? "dashed" : "solid",
      overflow: "hidden",
      backgroundColor: theme.bg,
      ...isCurrent ? {
        shadowColor: theme.accent,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6
      } : {}
    }, children: [
      clampedLevel > 0 && /* @__PURE__ */ jsxs39(View46, { style: { position: "absolute", bottom: 0, left: 0, right: 0, height: `${clampedLevel}%` }, children: [
        /* @__PURE__ */ jsx53(View46, { style: { flex: 1, backgroundColor: color.blue[400], opacity: 0.35 } }),
        /* @__PURE__ */ jsx53(View46, { style: { position: "absolute", top: 0, left: 0, right: 0, height: 1, backgroundColor: color.chalk[100], opacity: 0.2 } })
      ] }),
      label && /* @__PURE__ */ jsx53(View46, { style: { flex: 1, alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsx53(Text43, { style: {
        fontFamily: font.mono,
        fontSize: size === "lg" ? fs[16] : size === "md" ? fs[13] : fs[11],
        fontWeight: fw[700],
        color: isCurrent ? theme.accent : isPast ? theme.fg : theme.fgFaint
      }, children: label }) })
    ] }),
    /* @__PURE__ */ jsx53(View46, { style: { marginTop: sp[1], paddingHorizontal: sp[2], paddingVertical: 1, borderRadius: r[1], backgroundColor: theme.bgRaised }, children: /* @__PURE__ */ jsx53(Text43, { style: {
      fontFamily: font.mono,
      fontSize: fs[9],
      fontWeight: fw[600],
      color: clampedLevel >= 90 ? theme.accent : clampedLevel > 0 ? theme.fgMuted : theme.fgFaint
    }, children: clampedLevel >= 90 ? "FULL" : clampedLevel === 0 ? "EMPTY" : `${clampedLevel}%` }) }),
    meta && /* @__PURE__ */ jsx53(Text43, { style: { fontFamily: font.mono, fontSize: fs[9], color: isCurrent ? theme.accent : isPast ? theme.fgMuted : theme.fgFaint, marginTop: sp[0.5] }, children: meta })
  ] });
}

// rn/RouteMap.tsx
import { View as View47, Text as Text44, Pressable as Pressable23 } from "react-native";
import { Fragment as Fragment5, jsx as jsx54, jsxs as jsxs40 } from "react/jsx-runtime";
function markerToWaypoint(status) {
  switch (status) {
    case "mapped":
      return "done";
    case "exploring":
      return "current";
    case "needs-attention":
      return "passed";
    default:
      return "incomplete";
  }
}
function statusColor(status) {
  switch (status) {
    case "mapped":
      return color.noon[400];
    case "exploring":
      return color.gold[400];
    case "needs-attention":
      return color.terra[400];
    default:
      return "rgba(232,228,220,0.35)";
  }
}
function statusLabel(status) {
  switch (status) {
    case "mapped":
      return "Mapped";
    case "exploring":
      return "Exploring";
    case "not-started":
      return "Not started";
    case "needs-attention":
      return "Needs attention";
    case "unmapped":
      return "Unmapped";
  }
}
var SPINE_LINE_H = 6;
var CONNECTOR_W = 16;
function SpineLine({ done, height, gap }) {
  const { theme } = useTheme();
  const col = done ? theme.signalDim : theme.border;
  return /* @__PURE__ */ jsx54(View47, { style: { width: 1, height: gap ? sp[7] : height || SPINE_LINE_H, alignSelf: "center", backgroundColor: done ? col : void 0, borderLeftWidth: done ? 0 : 1, borderLeftColor: col, borderStyle: done ? void 0 : "dashed" } });
}
function ConnectorLine({ done, side }) {
  const { theme } = useTheme();
  const col = done ? theme.signalDim : theme.border;
  return /* @__PURE__ */ jsx54(View47, { style: { width: CONNECTOR_W, height: 1, backgroundColor: done ? col : void 0, borderTopWidth: done ? 0 : 1, borderTopColor: col, borderStyle: done ? void 0 : "dashed" } });
}
function RouteMap({ chapters, currentChapter, onChapterPress, onMarkerPress }) {
  const { theme } = useTheme();
  const isPast = (ch) => ch.status === "complete" || ch.status === "strong" || ch.status === "weak";
  const isCurrent = (ch) => ch.id === currentChapter;
  return /* @__PURE__ */ jsxs40(View47, { style: { alignItems: "center" }, children: [
    chapters.map((ch, ci) => {
      const chPast = isPast(ch);
      const chCurrent = isCurrent(ch);
      return /* @__PURE__ */ jsxs40(View47, { style: { alignItems: "center", width: "100%" }, children: [
        ci > 0 && /* @__PURE__ */ jsx54(SpineLine, { done: chPast || chCurrent, height: sp[5] }),
        /* @__PURE__ */ jsxs40(Pressable23, { onPress: () => onChapterPress?.(ch), accessibilityRole: "button", accessibilityLabel: ch.title, style: { alignItems: "center" }, children: [
          /* @__PURE__ */ jsx54(Oasis, { level: ch.level, status: ch.status, label: ch.label, size: chCurrent ? "lg" : "md", meta: ch.result || ch.date }),
          /* @__PURE__ */ jsx54(Text44, { style: { fontFamily: font.serif, fontSize: chCurrent ? fs[16] : fs[14], fontWeight: fw[500], color: chCurrent ? theme.fg : chPast ? theme.fgMuted : theme.fgSubtle, marginTop: sp[2], textAlign: "center" }, children: ch.title })
        ] }),
        ch.markers.map((marker, mi) => {
          const isLeft = mi % 2 === 0;
          const wpState = markerToWaypoint(marker.status);
          const col = statusColor(marker.status);
          const markerDone = marker.status === "mapped";
          const lineDone = chPast || chCurrent && mi === 0;
          return /* @__PURE__ */ jsxs40(View47, { style: { width: "100%" }, children: [
            /* @__PURE__ */ jsx54(SpineLine, { done: lineDone || markerDone, height: SPINE_LINE_H }),
            /* @__PURE__ */ jsxs40(View47, { style: { flexDirection: "row", alignItems: "center", width: "100%", paddingHorizontal: sp[4] }, children: [
              /* @__PURE__ */ jsx54(View47, { style: { flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }, children: isLeft && /* @__PURE__ */ jsxs40(Fragment5, { children: [
                /* @__PURE__ */ jsxs40(
                  Pressable23,
                  {
                    onPress: () => onMarkerPress?.(marker, ch),
                    accessibilityRole: "button",
                    accessibilityLabel: `${marker.label} \u2014 ${statusLabel(marker.status)}`,
                    style: {
                      flex: 1,
                      maxWidth: 160,
                      paddingVertical: sp[2],
                      paddingHorizontal: sp[3],
                      backgroundColor: marker.status === "exploring" ? "rgba(100,216,174,0.05)" : theme.bgRaised,
                      borderWidth: 1,
                      borderColor: marker.status === "exploring" ? "rgba(100,216,174,0.25)" : theme.border,
                      borderRadius: r[2],
                      alignItems: "flex-end"
                    },
                    children: [
                      /* @__PURE__ */ jsx54(Text44, { style: { fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: marker.status === "unmapped" || marker.status === "not-started" ? theme.fgMuted : theme.fg, textAlign: "right" }, numberOfLines: 1, children: marker.label }),
                      /* @__PURE__ */ jsx54(Text44, { style: { fontFamily: font.mono, fontSize: fs[9], color: col, letterSpacing: 0.8, textTransform: "uppercase", marginTop: 2, textAlign: "right" }, children: statusLabel(marker.status) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx54(ConnectorLine, { done: markerDone, side: "left" })
              ] }) }),
              /* @__PURE__ */ jsx54(WaypointMarker, { state: wpState }),
              /* @__PURE__ */ jsx54(View47, { style: { flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }, children: !isLeft && /* @__PURE__ */ jsxs40(Fragment5, { children: [
                /* @__PURE__ */ jsx54(ConnectorLine, { done: markerDone, side: "right" }),
                /* @__PURE__ */ jsxs40(
                  Pressable23,
                  {
                    onPress: () => onMarkerPress?.(marker, ch),
                    accessibilityRole: "button",
                    accessibilityLabel: `${marker.label} \u2014 ${statusLabel(marker.status)}`,
                    style: {
                      flex: 1,
                      maxWidth: 160,
                      paddingVertical: sp[2],
                      paddingHorizontal: sp[3],
                      backgroundColor: marker.status === "exploring" ? "rgba(100,216,174,0.05)" : theme.bgRaised,
                      borderWidth: 1,
                      borderColor: marker.status === "exploring" ? "rgba(100,216,174,0.25)" : theme.border,
                      borderRadius: r[2]
                    },
                    children: [
                      /* @__PURE__ */ jsx54(Text44, { style: { fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: marker.status === "unmapped" || marker.status === "not-started" ? theme.fgMuted : theme.fg }, numberOfLines: 1, children: marker.label }),
                      /* @__PURE__ */ jsx54(Text44, { style: { fontFamily: font.mono, fontSize: fs[9], color: col, letterSpacing: 0.8, textTransform: "uppercase", marginTop: 2 }, children: statusLabel(marker.status) })
                    ]
                  }
                )
              ] }) })
            ] })
          ] }, marker.id);
        })
      ] }, ch.id);
    }),
    /* @__PURE__ */ jsx54(SpineLine, { done: false })
  ] });
}

// rn/GridPaper.tsx
import { View as View48 } from "react-native";
import Svg4, { Line as Line2 } from "react-native-svg";
import { jsx as jsx55 } from "react/jsx-runtime";
function GridPaper({ variant = "standard", width, height, style }) {
  const { theme, mode } = useTheme();
  const isVoid = mode === "void";
  const lineColor = isVoid ? "rgba(232,228,220,0.08)" : "rgba(10,15,26,0.08)";
  const goldColor = isVoid ? "rgba(201,162,39,0.10)" : "rgba(122,96,20,0.10)";
  const canvasColor = isVoid ? "rgba(232,228,220,0.025)" : "rgba(10,15,26,0.03)";
  const lines = [];
  if (variant === "standard") {
    const step = 16;
    for (let x = 0; x <= width; x += step) {
      lines.push(/* @__PURE__ */ jsx55(Line2, { x1: x, y1: 0, x2: x, y2: height, stroke: lineColor, strokeWidth: 0.5 }, `v${x}`));
    }
    for (let y = 0; y <= height; y += step) {
      lines.push(/* @__PURE__ */ jsx55(Line2, { x1: 0, y1: y, x2: width, y2: y, stroke: lineColor, strokeWidth: 0.5 }, `h${y}`));
    }
  } else if (variant === "major") {
    const minor = 8;
    const major = 64;
    for (let x = 0; x <= width; x += minor) {
      const isMajor = x % major === 0;
      lines.push(/* @__PURE__ */ jsx55(Line2, { x1: x, y1: 0, x2: x, y2: height, stroke: isMajor ? goldColor : lineColor, strokeWidth: 0.5 }, `v${x}`));
    }
    for (let y = 0; y <= height; y += minor) {
      const isMajor = y % major === 0;
      lines.push(/* @__PURE__ */ jsx55(Line2, { x1: 0, y1: y, x2: width, y2: y, stroke: isMajor ? goldColor : lineColor, strokeWidth: 0.5 }, `h${y}`));
    }
  } else {
    const step = 24;
    for (let x = 0; x <= width; x += step) {
      lines.push(/* @__PURE__ */ jsx55(Line2, { x1: x, y1: 0, x2: x, y2: height, stroke: canvasColor, strokeWidth: 0.5 }, `v${x}`));
    }
    for (let y = 0; y <= height; y += step) {
      lines.push(/* @__PURE__ */ jsx55(Line2, { x1: 0, y1: y, x2: width, y2: y, stroke: canvasColor, strokeWidth: 0.5 }, `h${y}`));
    }
  }
  return /* @__PURE__ */ jsx55(View48, { style: [{ width, height, backgroundColor: theme.bg }, style], children: /* @__PURE__ */ jsx55(Svg4, { width, height, style: { position: "absolute" }, children: lines }) });
}

// rn/WaterVessel.tsx
import { View as View49, Text as Text45 } from "react-native";
import Svg5, { Path as Path3, Rect as Rect2, Line as Line3, Circle as Circle3, ClipPath, Defs } from "react-native-svg";
import { Fragment as Fragment6, jsx as jsx56, jsxs as jsxs41 } from "react/jsx-runtime";
var VESSEL_PATH = "M15,4 L25,4 C27,4 28,5 28,7 L28,12 C28,13 27,14 26,14 L26,18 C32,20 34,26 34,34 C34,42 34,48 32,51 C30,54 26,55 20,55 C14,55 10,54 8,51 C6,48 6,42 6,34 C6,26 8,20 14,18 L14,14 C13,14 12,13 12,12 L12,7 C12,5 13,4 15,4 Z";
var SIZES2 = { sm: 40, md: 72, lg: 110 };
function WaterVessel({ fill, capacity = 18, minimum = 12, size = "lg" }) {
  const { theme } = useTheme();
  const dim = SIZES2[size];
  const h3 = Math.round(dim * 1.4);
  const pct = Math.min(fill / capacity, 1);
  const met = fill >= minimum;
  const overflow = pct >= 1;
  const wc = met ? color.blue[400] : color.danger[400];
  const fillRange = 32;
  const waterTop = 52 - pct * fillRange;
  const status = fill >= capacity ? "Overflowing" : met ? "Minimum met" : `${minimum - fill} more needed`;
  return /* @__PURE__ */ jsxs41(View49, { style: { flexDirection: "row", alignItems: "center", gap: sp[5] }, children: [
    /* @__PURE__ */ jsxs41(Svg5, { width: dim, height: h3, viewBox: "0 0 40 56", children: [
      /* @__PURE__ */ jsx56(Defs, { children: /* @__PURE__ */ jsx56(ClipPath, { id: "vc", children: /* @__PURE__ */ jsx56(Path3, { d: VESSEL_PATH }) }) }),
      pct > 0 && /* @__PURE__ */ jsx56(Rect2, { x: 4, y: waterTop, width: 32, height: 57 - waterTop, fill: wc, opacity: 0.45, clipPath: "url(#vc)" }),
      pct > 0 && !overflow && /* @__PURE__ */ jsx56(Line3, { x1: 6, y1: waterTop, x2: 34, y2: waterTop, stroke: wc, strokeWidth: 1.5, opacity: 0.7, clipPath: "url(#vc)" }),
      /* @__PURE__ */ jsx56(Path3, { d: VESSEL_PATH, stroke: theme.fgMuted, strokeWidth: 1.5, strokeLinejoin: "round", fill: "none" }),
      overflow && /* @__PURE__ */ jsxs41(Fragment6, { children: [
        /* @__PURE__ */ jsx56(Circle3, { cx: 36, cy: 10, r: 1.5, fill: wc, opacity: 0.5 }),
        /* @__PURE__ */ jsx56(Circle3, { cx: 38, cy: 16, r: 1, fill: wc, opacity: 0.4 })
      ] })
    ] }),
    /* @__PURE__ */ jsxs41(View49, { children: [
      /* @__PURE__ */ jsxs41(View49, { style: { flexDirection: "row", alignItems: "baseline", gap: sp[2] }, children: [
        /* @__PURE__ */ jsx56(Text45, { style: { fontFamily: font.serif, fontSize: size === "lg" ? fs[32] : fs[24], fontWeight: fw[500], color: theme.fg }, children: fill }),
        /* @__PURE__ */ jsxs41(Text45, { style: { fontFamily: font.mono, fontSize: fs[11], color: theme.fgFaint }, children: [
          "/ ",
          capacity
        ] })
      ] }),
      /* @__PURE__ */ jsx56(Text45, { style: { fontFamily: font.mono, fontSize: fs[11], color: wc, marginTop: sp[1] }, children: status })
    ] })
  ] });
}

// rn/TerrainPattern.tsx
import { useMemo as useMemo2 } from "react";
import { View as View50 } from "react-native";
import Svg6, { Path as Path4 } from "react-native-svg";
import { jsx as jsx57 } from "react/jsx-runtime";
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
    const strokeColor = isVoid ? `rgba(232,228,220,${a.toFixed(3)})` : `rgba(10,15,26,${a.toFixed(3)})`;
    paths2.push(`${d}|${strokeColor}`);
    y += extGaps[i];
  }
  return paths2;
}
function TerrainPattern({ width, height, variant = "standard", opacity = 1, style }) {
  const { theme, mode } = useTheme();
  const isVoid = mode === "void";
  const paths2 = useMemo2(
    () => generateContours(width, height, variant, isVoid, 42),
    [width, height, variant, isVoid]
  );
  return /* @__PURE__ */ jsx57(View50, { style: [{ width, height, backgroundColor: theme.bg, overflow: "hidden" }, style], children: /* @__PURE__ */ jsx57(Svg6, { width, height, style: { position: "absolute", opacity }, children: paths2.map((entry, i) => {
    const [d, stroke] = entry.split("|");
    return /* @__PURE__ */ jsx57(Path4, { d, stroke, strokeWidth: 0.8, fill: "none" }, i);
  }) }) });
}

// rn/DunePattern.tsx
import React28 from "react";
import { View as View51 } from "react-native";
import Svg7, { Defs as Defs2, LinearGradient, Stop, Path as Path5, Line as Line4, Circle as Circle4 } from "react-native-svg";
import { jsx as jsx58, jsxs as jsxs42 } from "react/jsx-runtime";
function DunePattern({ width, height, variant = "constellation", style }) {
  const { theme, mode } = useTheme();
  const isVoid = mode === "void";
  if (variant === "constellation") {
    const w2 = width, h4 = height;
    const hubs = [
      { x: w2 * 0.72, y: h4 * 0.62, r: 3.5, bright: true },
      // right hub
      { x: w2 * 0.32, y: h4 * 0.58, r: 3, bright: true }
      // left hub
    ];
    const secondaryNodes = [
      // Spokes from right hub
      { x: w2 * 0.95, y: h4 * 0.45 },
      { x: w2 * 0.88, y: h4 * 0.78 },
      { x: w2 * 0.6, y: h4 * 0.42 },
      { x: w2 * 0.82, y: h4 * 0.35 },
      { x: w2 * 0.55, y: h4 * 0.75 },
      { x: w2 * 0.98, y: h4 * 0.62 },
      { x: w2 * 0.75, y: h4 * 0.88 },
      { x: w2 * 0.65, y: h4 * 0.52 },
      // Spokes from left hub
      { x: w2 * 0.08, y: h4 * 0.48 },
      { x: w2 * 0.15, y: h4 * 0.72 },
      { x: w2 * 0.42, y: h4 * 0.4 },
      { x: w2 * 0.2, y: h4 * 0.38 },
      { x: w2 * 0.05, y: h4 * 0.65 },
      { x: w2 * 0.38, y: h4 * 0.82 },
      { x: w2 * 0.48, y: h4 * 0.68 },
      // Cross connections
      { x: w2 * 0.5, y: h4 * 0.55 }
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
      // right hub fan
      [1, 10, 11],
      [1, 11, 14],
      [1, 14, 16],
      // left hub fan
      [0, 17, 7],
      [1, 17, 14],
      [0, 1, 17],
      // bridge
      [1, 10, 12],
      [0, 2, 5]
      // extra depth
    ];
    const triOpacity = [0.35, 0.2, 0.28, 0.15, 0.3, 0.18, 0.25, 0.22, 0.2, 0.32, 0.12, 0.18];
    return /* @__PURE__ */ jsx58(View51, { style: [{ width: w2, height: h4, backgroundColor: theme.bg }, style], children: /* @__PURE__ */ jsxs42(Svg7, { width: w2, height: h4, children: [
      Array.from({ length: 40 }, (_, i) => {
        const sx = (i * 97.3 + 13) % w2;
        const sy = (i * 53.7 + 7) % (h4 * 0.5);
        const sr = 0.4 + i % 3 * 0.3;
        return /* @__PURE__ */ jsx58(Circle4, { cx: sx, cy: sy, r: sr, fill: color.gold[300], opacity: 0.1 + i % 4 * 0.08 }, `s${i}`);
      }),
      triangles.map((t, i) => {
        const a = allNodes[t[0]], b = allNodes[t[1]], c = allNodes[t[2]];
        const op = (triOpacity[i] || 0.2) * (isVoid ? 1 : 0.6);
        const isTerra = i === 2 || i === 6 || i === 9;
        return /* @__PURE__ */ jsx58(Path5, { d: `M${a.x},${a.y} L${b.x},${b.y} L${c.x},${c.y} Z`, fill: isTerra ? theme.terra : theme.iris, fillOpacity: isTerra ? op * 0.7 : op }, `t${i}`);
      }),
      connections.map(([a, b], i) => /* @__PURE__ */ jsx58(
        Line4,
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
      allNodes.map((n, i) => /* @__PURE__ */ jsxs42(React28.Fragment, { children: [
        n.bright && /* @__PURE__ */ jsx58(Circle4, { cx: n.x, cy: n.y, r: n.r + 8, fill: color.gold[300], opacity: isVoid ? 0.06 : 0.04 }),
        n.bright && /* @__PURE__ */ jsx58(Circle4, { cx: n.x, cy: n.y, r: n.r + 4, fill: color.gold[300], opacity: isVoid ? 0.12 : 0.08 }),
        /* @__PURE__ */ jsx58(Circle4, { cx: n.x, cy: n.y, r: n.r, fill: n.bright ? color.gold[300] : color.gold[400], opacity: n.bright ? isVoid ? 0.85 : 0.6 : isVoid ? 0.45 : 0.3 })
      ] }, `n${i}`))
    ] }) });
  }
  const w = width, h3 = height;
  const cx = w * 0.45;
  const cy = h3 * 0.5;
  return /* @__PURE__ */ jsx58(View51, { style: [{ width: w, height: h3, backgroundColor: theme.bg }, style], children: /* @__PURE__ */ jsxs42(Svg7, { width: w, height: h3, children: [
    /* @__PURE__ */ jsxs42(Defs2, { children: [
      /* @__PURE__ */ jsxs42(LinearGradient, { id: "hGoldBright", x1: "0.4", y1: "0.3", x2: "1", y2: "0.7", children: [
        /* @__PURE__ */ jsx58(Stop, { offset: "0", stopColor: color.gold[200], stopOpacity: isVoid ? 0.95 : 0.7 }),
        /* @__PURE__ */ jsx58(Stop, { offset: "0.5", stopColor: color.gold[300], stopOpacity: isVoid ? 0.8 : 0.55 }),
        /* @__PURE__ */ jsx58(Stop, { offset: "1", stopColor: color.gold[400], stopOpacity: isVoid ? 0.5 : 0.35 })
      ] }),
      /* @__PURE__ */ jsxs42(LinearGradient, { id: "hGoldWarm", x1: "0.3", y1: "0.5", x2: "0.8", y2: "1", children: [
        /* @__PURE__ */ jsx58(Stop, { offset: "0", stopColor: color.terra[isVoid ? 500 : 300], stopOpacity: isVoid ? 0.4 : 0.3 }),
        /* @__PURE__ */ jsx58(Stop, { offset: "0.5", stopColor: color.gold[300], stopOpacity: isVoid ? 0.5 : 0.35 }),
        /* @__PURE__ */ jsx58(Stop, { offset: "1", stopColor: color.gold[500], stopOpacity: isVoid ? 0.15 : 0.08 })
      ] }),
      /* @__PURE__ */ jsxs42(LinearGradient, { id: "hShadowL", x1: "0", y1: "0", x2: "0.6", y2: "1", children: [
        /* @__PURE__ */ jsx58(Stop, { offset: "0", stopColor: isVoid ? color.void[100] : color.terra[200], stopOpacity: isVoid ? 0.5 : 0.2 }),
        /* @__PURE__ */ jsx58(Stop, { offset: "1", stopColor: theme.bg, stopOpacity: 0 })
      ] }),
      /* @__PURE__ */ jsxs42(LinearGradient, { id: "hShadowDeep", x1: "0.2", y1: "0", x2: "0.5", y2: "1", children: [
        /* @__PURE__ */ jsx58(Stop, { offset: "0", stopColor: isVoid ? color.void[200] : color.paper[300], stopOpacity: isVoid ? 0.35 : 0.15 }),
        /* @__PURE__ */ jsx58(Stop, { offset: "1", stopColor: theme.bg, stopOpacity: 0 })
      ] }),
      /* @__PURE__ */ jsxs42(LinearGradient, { id: "hGlow", x1: "0.5", y1: "0.5", x2: "0.5", y2: "0", children: [
        /* @__PURE__ */ jsx58(Stop, { offset: "0", stopColor: color.gold[200], stopOpacity: isVoid ? 0.3 : 0.2 }),
        /* @__PURE__ */ jsx58(Stop, { offset: "1", stopColor: color.gold[300], stopOpacity: 0 })
      ] })
    ] }),
    /* @__PURE__ */ jsx58(Circle4, { cx, cy, r: h3 * 0.4, fill: "url(#hGlow)" }),
    /* @__PURE__ */ jsx58(Path5, { d: `M0,${h3 * 0.35} L${cx},${cy} L0,${h3 * 0.75} Z`, fill: "url(#hShadowL)" }),
    /* @__PURE__ */ jsx58(Path5, { d: `M0,${h3 * 0.55} L${cx},${cy} L0,${h3 * 0.9} Z`, fill: "url(#hShadowDeep)" }),
    /* @__PURE__ */ jsx58(Path5, { d: `M${w},${h3 * 0.2} L${cx},${cy} L${w},${h3 * 0.7} Z`, fill: "url(#hGoldBright)" }),
    /* @__PURE__ */ jsx58(Path5, { d: `M0,${h3} L${cx},${cy} L${w},${h3} Z`, fill: "url(#hGoldWarm)" }),
    /* @__PURE__ */ jsx58(Path5, { d: `M0,${h3 * 0.75} L${cx},${cy} L0,${h3} Z`, fill: color.terra[isVoid ? 600 : 400], fillOpacity: isVoid ? 0.12 : 0.1 }),
    /* @__PURE__ */ jsx58(Path5, { d: `M0,${h3 * 0.8} Q${w * 0.2},${h3 * 0.65} ${cx},${cy}`, fill: "none", stroke: color.gold[400], strokeWidth: 1, strokeOpacity: isVoid ? 0.35 : 0.2 }),
    /* @__PURE__ */ jsx58(Line4, { x1: 0, y1: h3 * 0.35, x2: cx, y2: cy, stroke: theme.borderStrong, strokeWidth: 0.75 }),
    /* @__PURE__ */ jsx58(Line4, { x1: cx, y1: cy, x2: w, y2: h3 * 0.2, stroke: color.gold[300], strokeWidth: 1.5, strokeOpacity: isVoid ? 0.5 : 0.35 }),
    /* @__PURE__ */ jsx58(Line4, { x1: cx, y1: cy, x2: w, y2: h3 * 0.7, stroke: color.gold[400], strokeWidth: 0.75, strokeOpacity: isVoid ? 0.3 : 0.2 }),
    /* @__PURE__ */ jsx58(Line4, { x1: 0, y1: h3 * 0.75, x2: cx, y2: cy, stroke: theme.border, strokeWidth: 0.5 }),
    /* @__PURE__ */ jsx58(Circle4, { cx, cy, r: 2.5, fill: color.gold[200], opacity: isVoid ? 0.8 : 0.5 })
  ] }) });
}

// rn/VoiceTutor.tsx
import { useEffect as useEffect7 } from "react";
import { View as View52, Text as Text46 } from "react-native";
import Animated10, {
  useSharedValue as useSharedValue10,
  useAnimatedStyle as useAnimatedStyle10,
  withTiming as withTiming10,
  withRepeat as withRepeat4,
  withSequence as withSequence4,
  withDelay as withDelay3,
  Easing as Easing8,
  interpolate as interpolate2,
  cancelAnimation as cancelAnimation4
} from "react-native-reanimated";
import { jsx as jsx59, jsxs as jsxs43 } from "react/jsx-runtime";
function VoiceTutor({ state = "idle", size = 160 }) {
  const { theme } = useTheme();
  const anim = useSharedValue10(0);
  const orbit = useSharedValue10(0);
  const errorAura = useSharedValue10(0);
  useEffect7(() => {
    cancelAnimation4(anim);
    cancelAnimation4(orbit);
    cancelAnimation4(errorAura);
    anim.value = 0;
    orbit.value = 0;
    errorAura.value = 0;
    if (state === "idle") {
      anim.value = withRepeat4(
        withTiming10(1, { duration: 4e3, easing: Easing8.inOut(Easing8.sin) }),
        -1
      );
    } else if (state === "listening") {
      anim.value = withRepeat4(
        withTiming10(1, { duration: 3e3, easing: Easing8.inOut(Easing8.sin) }),
        -1
      );
    } else if (state === "thinking") {
      anim.value = withRepeat4(
        withTiming10(1, { duration: 2e3, easing: Easing8.inOut(Easing8.sin) }),
        -1
      );
      orbit.value = withRepeat4(
        withTiming10(1, { duration: 2e3, easing: Easing8.linear }),
        -1
      );
    } else if (state === "speaking") {
      anim.value = withRepeat4(
        withTiming10(1, { duration: 400, easing: Easing8.inOut(Easing8.sin) }),
        -1
      );
    } else if (state === "error") {
      anim.value = withRepeat4(
        withSequence4(
          withTiming10(1, { duration: 100 }),
          withTiming10(0, { duration: 100 }),
          withTiming10(0.7, { duration: 80 }),
          withTiming10(0, { duration: 200 }),
          withDelay3(1500, withTiming10(0, { duration: 0 }))
        ),
        -1
      );
      errorAura.value = withSequence4(
        withTiming10(1, { duration: 80 }),
        withTiming10(0.5, { duration: 60 }),
        withTiming10(0.8, { duration: 80 }),
        withTiming10(0, { duration: 300, easing: Easing8.bezier(0.4, 0, 1, 1) })
      );
    }
    return () => {
      cancelAnimation4(anim);
      cancelAnimation4(orbit);
      cancelAnimation4(errorAura);
    };
  }, [state]);
  const isError = state === "error";
  const core = { idle: 32, listening: 44, thinking: 24, speaking: 44, error: 22 }[state];
  const auraBase = { idle: 0, listening: 80, thinking: 50, speaking: 90, error: 50 }[state];
  const coreAnimStyle = useAnimatedStyle10(() => {
    const coreScale = state === "listening" ? interpolate2(anim.value, [0, 0.5, 1], [0.9, 1.12, 0.9]) : state === "speaking" ? interpolate2(anim.value, [0, 0.5, 1], [0.94, 1.06, 0.94]) : state === "thinking" ? interpolate2(anim.value, [0, 0.5, 1], [0.96, 1.04, 0.96]) : interpolate2(anim.value, [0, 0.5, 1], [0.92, 1.08, 0.92]);
    const errorFlash = interpolate2(anim.value, [0, 1], [1, 0.4]);
    return {
      transform: [{ scale: coreScale }],
      opacity: isError ? errorFlash : 1
    };
  });
  const auraAnimStyle = useAnimatedStyle10(() => {
    const auraScale = state === "listening" ? interpolate2(anim.value, [0, 0.5, 1], [0.85, 1.15, 0.85]) : state === "speaking" ? interpolate2(anim.value, [0, 0.5, 1], [0.9, 1.1, 0.9]) : interpolate2(anim.value, [0, 0.5, 1], [0.95, 1.05, 0.95]);
    return {
      transform: [{ scale: isError ? 1 : auraScale }],
      opacity: isError ? errorAura.value : 1
    };
  });
  const orbitAnimStyle = useAnimatedStyle10(() => {
    const rotate = interpolate2(orbit.value, [0, 1], [0, 360]);
    return {
      transform: [{ rotate: `${rotate}deg` }]
    };
  });
  const coreColor = isError ? color.danger[300] : theme.iris;
  const auraColor = isError ? "rgba(249,176,138,0.12)" : theme.irisSoft;
  return /* @__PURE__ */ jsxs43(View52, { style: { alignItems: "center" }, children: [
    /* @__PURE__ */ jsxs43(View52, { style: { width: size, height: size, alignItems: "center", justifyContent: "center" }, children: [
      auraBase > 0 && /* @__PURE__ */ jsx59(Animated10.View, { style: [{
        position: "absolute",
        width: auraBase,
        height: auraBase,
        borderRadius: auraBase / 2,
        backgroundColor: auraColor
      }, auraAnimStyle] }),
      state === "thinking" && /* @__PURE__ */ jsxs43(Animated10.View, { style: [{ position: "absolute", width: 70, height: 70 }, orbitAnimStyle], children: [
        /* @__PURE__ */ jsx59(View52, { style: { position: "absolute", top: 0, left: 32, width: 5, height: 5, borderRadius: 2.5, backgroundColor: theme.irisDot } }),
        /* @__PURE__ */ jsx59(View52, { style: { position: "absolute", bottom: 0, left: 32, width: 4, height: 4, borderRadius: 2, backgroundColor: theme.irisBorder } }),
        /* @__PURE__ */ jsx59(View52, { style: { position: "absolute", top: 32, right: 0, width: 3, height: 3, borderRadius: 1.5, backgroundColor: theme.irisBorder } })
      ] }),
      /* @__PURE__ */ jsx59(Animated10.View, { style: [{
        width: core,
        height: core,
        borderRadius: core / 2,
        backgroundColor: coreColor,
        shadowColor: coreColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: state === "speaking" ? 0.6 : state === "listening" ? 0.4 : 0.2,
        shadowRadius: state === "speaking" ? 30 : state === "listening" ? 20 : 12,
        elevation: 6
      }, coreAnimStyle] })
    ] }),
    /* @__PURE__ */ jsx59(Text46, { style: {
      marginTop: sp[3],
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
import { View as View53, Text as Text47, Image as Image6, Pressable as Pressable24, Linking } from "react-native";
import { jsx as jsx60, jsxs as jsxs44 } from "react/jsx-runtime";
function getYouTubeThumbnail(url) {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : null;
}
function VideoCard({ title, attribution, duration, uri, thumbnail, onPress }) {
  const { theme } = useTheme();
  const autoThumb = uri ? getYouTubeThumbnail(uri) : null;
  const thumbSource = thumbnail || (autoThumb ? { uri: autoThumb } : null);
  const handlePress = () => {
    if (onPress) return onPress();
    if (uri) Linking.openURL(uri);
  };
  return /* @__PURE__ */ jsxs44(
    Pressable24,
    {
      onPress: handlePress,
      accessibilityRole: "button",
      accessibilityLabel: title,
      style: ({ pressed }) => ({
        backgroundColor: theme.bgRaised,
        borderRadius: r[2],
        borderWidth: 1,
        borderColor: theme.border,
        overflow: "hidden",
        opacity: pressed ? 0.9 : 1
      }),
      children: [
        /* @__PURE__ */ jsxs44(View53, { style: {
          aspectRatio: 16 / 9,
          backgroundColor: theme.hoverOverlay,
          alignItems: "center",
          justifyContent: "center"
        }, children: [
          thumbSource && /* @__PURE__ */ jsx60(Image6, { source: thumbSource, style: { position: "absolute", width: "100%", height: "100%" }, resizeMode: "cover" }),
          /* @__PURE__ */ jsx60(View53, { style: {
            width: sp[9],
            height: sp[9],
            borderRadius: sp[9] / 2,
            backgroundColor: theme.accent,
            alignItems: "center",
            justifyContent: "center"
          }, children: /* @__PURE__ */ jsx60(Icon, { name: "play", size: icon.lg, color: theme.accentFg }) }),
          duration && /* @__PURE__ */ jsx60(View53, { style: {
            position: "absolute",
            bottom: sp[2],
            right: sp[2],
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: r[1],
            paddingHorizontal: sp[1],
            paddingVertical: 1
          }, children: /* @__PURE__ */ jsx60(Text47, { style: { fontFamily: font.mono, fontSize: fs[10], color: color.chalk[100] }, children: duration }) })
        ] }),
        (title || attribution) && /* @__PURE__ */ jsxs44(View53, { style: { padding: sp[3], paddingHorizontal: sp[4] }, children: [
          title ? /* @__PURE__ */ jsx60(Text47, { style: { fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fg }, children: title }) : null,
          attribution && /* @__PURE__ */ jsx60(Text47, { style: { fontFamily: font.sans, fontSize: fs[11], color: theme.fgFaint, marginTop: sp[0.5] }, children: attribution })
        ] })
      ]
    }
  );
}

// rn/ChatMessage.tsx
import { View as View55, Text as Text48 } from "react-native";

// rn/TypingIndicator.tsx
import { useEffect as useEffect8 } from "react";
import { View as View54 } from "react-native";
import Animated11, { useSharedValue as useSharedValue11, useAnimatedStyle as useAnimatedStyle11, withRepeat as withRepeat5, withSequence as withSequence5, withTiming as withTiming11, withDelay as withDelay4, cancelAnimation as cancelAnimation5, Easing as Easing9 } from "react-native-reanimated";
import { jsx as jsx61, jsxs as jsxs45 } from "react/jsx-runtime";
var DOT_SIZE = sp[1];
var DOT_BOUNCE = -sp[1];
var DOT_DURATION = 300;
var DOT_STAGGER = 150;
function Dot({ index }) {
  const { theme } = useTheme();
  const translateY = useSharedValue11(0);
  useEffect8(() => {
    translateY.value = withDelay4(
      index * DOT_STAGGER,
      withRepeat5(
        withSequence5(
          withTiming11(DOT_BOUNCE, { duration: DOT_DURATION, easing: Easing9.inOut(Easing9.sin) }),
          withTiming11(0, { duration: DOT_DURATION, easing: Easing9.inOut(Easing9.sin) }),
          withDelay4((2 - index) * DOT_STAGGER, withTiming11(0, { duration: 0 }))
        ),
        -1
      )
    );
    return () => cancelAnimation5(translateY);
  }, []);
  const animStyle = useAnimatedStyle11(() => ({
    transform: [{ translateY: translateY.value }]
  }));
  return /* @__PURE__ */ jsx61(Animated11.View, { style: [{
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: theme.irisDot
  }, animStyle] });
}
function TypingIndicator() {
  return /* @__PURE__ */ jsxs45(View54, { style: { flexDirection: "row", gap: sp[1], paddingVertical: sp[1], alignSelf: "flex-start" }, children: [
    /* @__PURE__ */ jsx61(Dot, { index: 0 }),
    /* @__PURE__ */ jsx61(Dot, { index: 1 }),
    /* @__PURE__ */ jsx61(Dot, { index: 2 })
  ] });
}

// rn/ChatMessage.tsx
import { jsx as jsx62, jsxs as jsxs46 } from "react/jsx-runtime";
function ChatMessage({ children, from, confirmed = true, thinking, revealedLength }) {
  const { theme, mode } = useTheme();
  const isVoid = mode === "void";
  if (from === "tutor" && thinking) {
    return /* @__PURE__ */ jsx62(View55, { style: { alignSelf: "flex-start", paddingStart: sp[4] }, children: /* @__PURE__ */ jsx62(TypingIndicator, {}) });
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
    return /* @__PURE__ */ jsx62(View55, { style: { borderStartWidth: 2, borderStartColor: theme.irisBorder, paddingStart: sp[4], alignSelf: "flex-start", maxWidth: "80%" }, children: /* @__PURE__ */ jsxs46(Text48, { style: { fontFamily: font.sans, fontSize: fs[14], lineHeight: fs[14] * 1.5 }, children: [
      /* @__PURE__ */ jsx62(Text48, { style: { color: theme.fg }, children: revealed }),
      unrevealed ? /* @__PURE__ */ jsx62(Text48, { style: { color: theme.fgFaint }, children: unrevealed }) : null
    ] }) });
  }
  const accentRGB = isVoid ? "rgba(100,216,174," : "rgba(42,138,106,";
  const chalkRGB = isVoid ? "rgba(232,228,220," : "rgba(10,15,26,";
  return /* @__PURE__ */ jsx62(View55, { style: {
    borderEndWidth: 2,
    borderEndColor: confirmed ? `${accentRGB}0.4)` : `${accentRGB}0.1)`,
    paddingVertical: sp[3],
    paddingHorizontal: sp[4],
    backgroundColor: confirmed ? theme.hoverOverlay : `${chalkRGB}0.02)`,
    borderTopStartRadius: r[2],
    borderBottomStartRadius: r[2],
    alignSelf: "flex-end",
    maxWidth: "80%"
  }, children: /* @__PURE__ */ jsx62(Text48, { style: {
    fontFamily: font.sans,
    fontSize: fs[14],
    color: confirmed ? theme.fg : theme.fgFaint,
    lineHeight: fs[14] * 1.5,
    textAlign: "right",
    fontStyle: confirmed ? "normal" : "italic"
  }, children }) });
}

// rn/BreakdownCard.tsx
import { View as View56, Text as Text49 } from "react-native";
import { jsx as jsx63, jsxs as jsxs47 } from "react/jsx-runtime";
function BreakdownCard({ title, points }) {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsxs47(View56, { style: { backgroundColor: theme.inputBg, borderRadius: r[2], padding: sp[4] }, children: [
    /* @__PURE__ */ jsx63(Text49, { style: { fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[600], color: theme.fg, marginBottom: sp[3] }, children: title }),
    points.map((point, i) => /* @__PURE__ */ jsxs47(View56, { style: { flexDirection: "row", gap: sp[2], marginBottom: sp[2] }, children: [
      /* @__PURE__ */ jsx63(View56, { style: { width: 4, height: 4, borderRadius: 1, backgroundColor: theme.irisDot, marginTop: 6, flexShrink: 0 } }),
      /* @__PURE__ */ jsx63(Text49, { style: { flex: 1, fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5 }, children: point })
    ] }, i))
  ] });
}

// rn/ActivityCard.tsx
import { View as View57, Text as Text50 } from "react-native";
import { jsx as jsx64, jsxs as jsxs48 } from "react/jsx-runtime";
function ActivityCard({ title, description, buttonLabel = "Start", complete, score, onPress }) {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsxs48(View57, { accessibilityRole: "none", style: { backgroundColor: theme.inputBg, borderRadius: r[2], borderWidth: 1, borderColor: complete ? theme.accentBorder : theme.border, padding: sp[4] }, children: [
    /* @__PURE__ */ jsx64(Text50, { style: { fontFamily: font.mono, fontSize: fs[10], letterSpacing: 1, textTransform: "uppercase", fontWeight: fw[600], color: theme.irisLabel, marginBottom: sp[2] }, children: "Activity" }),
    /* @__PURE__ */ jsx64(Text50, { style: { fontFamily: font.serif, fontSize: fs[15], color: theme.fg, marginBottom: description ? sp[1] : sp[3] }, children: title }),
    description && /* @__PURE__ */ jsx64(Text50, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgSubtle, marginBottom: sp[3] }, children: description }),
    complete ? /* @__PURE__ */ jsxs48(View57, { style: { flexDirection: "row", alignItems: "center", gap: sp[2], marginTop: description ? 0 : sp[2] }, children: [
      /* @__PURE__ */ jsx64(Text50, { style: { fontFamily: font.mono, fontSize: fs[11], fontWeight: fw[600], color: theme.accent }, children: "Complete" }),
      score && /* @__PURE__ */ jsx64(Text50, { style: { fontFamily: font.mono, fontSize: fs[11], color: theme.accent }, children: score })
    ] }) : /* @__PURE__ */ jsx64(Button, { variant: "primary", size: "sm", onPress, children: buttonLabel })
  ] });
}

// rn/ResourceList.tsx
import { useState as useState9 } from "react";
import { View as View58, Text as Text51, Pressable as Pressable25 } from "react-native";
import { Fragment as Fragment7, jsx as jsx65, jsxs as jsxs49 } from "react/jsx-runtime";
function ResourceList({ title = "Resources", links }) {
  const { theme } = useTheme();
  const [openIdx, setOpenIdx] = useState9(null);
  return /* @__PURE__ */ jsxs49(Fragment7, { children: [
    /* @__PURE__ */ jsxs49(View58, { style: { backgroundColor: theme.inputBg, borderRadius: r[2], padding: sp[4] }, children: [
      /* @__PURE__ */ jsx65(Text51, { style: { fontFamily: font.mono, fontSize: fs[10], letterSpacing: 1, textTransform: "uppercase", fontWeight: fw[600], color: theme.fgFaint, marginBottom: sp[3] }, children: title }),
      links.map((link, i) => /* @__PURE__ */ jsx65(Pressable25, { accessibilityRole: "link", onPress: () => {
        if (link.onPress) return link.onPress();
        if (link.content) setOpenIdx(i);
      }, children: /* @__PURE__ */ jsx65(Text51, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.accent, marginBottom: sp[2] }, children: link.label }) }, i))
    ] }),
    openIdx !== null && links[openIdx]?.content && /* @__PURE__ */ jsx65(FullSheet, { visible: true, onClose: () => setOpenIdx(null), title: links[openIdx].label, children: links[openIdx].content })
  ] });
}

// rn/SlidesCard.tsx
import { useState as useState10 } from "react";
import { View as View59, Text as Text52, Pressable as Pressable26, Image as Image7 } from "react-native";
import { Fragment as Fragment8, jsx as jsx66, jsxs as jsxs50 } from "react/jsx-runtime";
function SlidesCard({ title, attribution, slides, onPress }) {
  const { theme } = useTheme();
  const [open, setOpen] = useState10(false);
  const [current, setCurrent] = useState10(0);
  const handlePress = () => {
    if (onPress) return onPress();
    if (slides.length) setOpen(true);
  };
  return /* @__PURE__ */ jsxs50(Fragment8, { children: [
    /* @__PURE__ */ jsx66(
      Pressable26,
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
        children: /* @__PURE__ */ jsxs50(View59, { style: { flexDirection: "row", padding: sp[3], gap: sp[3], alignItems: "center" }, children: [
          slides.length > 0 && /* @__PURE__ */ jsx66(
            Image7,
            {
              source: slides[0],
              style: { width: 56, height: 36, borderRadius: r[1], backgroundColor: theme.hoverOverlay },
              resizeMode: "cover"
            }
          ),
          /* @__PURE__ */ jsxs50(View59, { style: { flex: 1 }, children: [
            /* @__PURE__ */ jsx66(Text52, { style: { fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fg }, children: title }),
            /* @__PURE__ */ jsxs50(Text52, { style: { fontFamily: font.sans, fontSize: fs[11], color: theme.fgFaint, marginTop: sp[0.5] }, children: [
              attribution ? `${attribution} \xB7 ` : "",
              slides.length,
              " slide",
              slides.length !== 1 ? "s" : ""
            ] })
          ] })
        ] })
      }
    ),
    slides.length > 0 && /* @__PURE__ */ jsxs50(FullSheet, { visible: open, onClose: () => setOpen(false), title: `${title} \xB7 ${current + 1}/${slides.length}`, children: [
      /* @__PURE__ */ jsx66(
        Image7,
        {
          source: slides[current],
          style: { width: "100%", aspectRatio: 16 / 9, borderRadius: r[2], marginBottom: sp[5] },
          resizeMode: "contain"
        }
      ),
      slides.length > 1 && /* @__PURE__ */ jsxs50(View59, { style: { flexDirection: "row", gap: sp[3] }, children: [
        /* @__PURE__ */ jsx66(Button, { variant: "secondary", size: "sm", disabled: current === 0, onPress: () => setCurrent(current - 1), children: "Prev" }),
        /* @__PURE__ */ jsx66(Button, { variant: "secondary", size: "sm", disabled: current === slides.length - 1, onPress: () => setCurrent(current + 1), children: "Next" })
      ] })
    ] })
  ] });
}

// rn/WorkedExampleCard.tsx
import { useState as useState11 } from "react";
import { View as View60, Text as Text53, Pressable as Pressable27 } from "react-native";
import { Fragment as Fragment9, jsx as jsx67, jsxs as jsxs51 } from "react/jsx-runtime";
function WorkedExampleCard({ title, steps, onPress }) {
  const { theme } = useTheme();
  const [open, setOpen] = useState11(false);
  const handlePress = () => {
    if (onPress) return onPress();
    if (steps?.length) setOpen(true);
  };
  return /* @__PURE__ */ jsxs51(Fragment9, { children: [
    /* @__PURE__ */ jsx67(
      Pressable27,
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
        children: /* @__PURE__ */ jsxs51(View60, { style: { flexDirection: "row", padding: sp[4], gap: sp[3], alignItems: "center" }, children: [
          /* @__PURE__ */ jsx67(View60, { style: {
            width: 32,
            height: 32,
            borderRadius: r[1],
            backgroundColor: theme.irisSoft,
            borderWidth: 1,
            borderColor: theme.irisBorder,
            alignItems: "center",
            justifyContent: "center"
          }, children: /* @__PURE__ */ jsx67(Text53, { style: { fontFamily: font.mono, fontSize: fs[12], fontWeight: fw[600], color: theme.iris }, children: steps?.length || "?" }) }),
          /* @__PURE__ */ jsxs51(View60, { style: { flex: 1 }, children: [
            /* @__PURE__ */ jsx67(Text53, { style: { fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fg }, children: title }),
            /* @__PURE__ */ jsxs51(Text53, { style: { fontFamily: font.sans, fontSize: fs[11], color: theme.fgFaint, marginTop: sp[0.5] }, children: [
              steps?.length || 0,
              " step worked example"
            ] })
          ] })
        ] })
      }
    ),
    steps && steps.length > 0 && /* @__PURE__ */ jsx67(FullSheet, { visible: open, onClose: () => setOpen(false), title: "Worked example", children: steps.map((step, i) => /* @__PURE__ */ jsxs51(View60, { style: { flexDirection: "row", gap: sp[4], marginBottom: sp[6] }, children: [
      /* @__PURE__ */ jsx67(View60, { style: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: theme.irisSoft,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: 2
      }, children: /* @__PURE__ */ jsx67(Text53, { style: { fontFamily: font.mono, fontSize: fs[11], fontWeight: fw[600], color: theme.iris }, children: i + 1 }) }),
      /* @__PURE__ */ jsxs51(View60, { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsx67(Text53, { style: { fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[600], color: theme.fg, marginBottom: sp[2] }, children: step.title }),
        /* @__PURE__ */ jsx67(Text53, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.6 }, children: step.content })
      ] })
    ] }, i)) })
  ] });
}

// rn/Identity.tsx
import { View as View61, Text as Text54 } from "react-native";
import { jsx as jsx68, jsxs as jsxs52 } from "react/jsx-runtime";
function Identity({
  initials,
  name,
  role,
  meta,
  avatarColor,
  star,
  status,
  badge,
  right,
  size = "md"
}) {
  const { theme } = useTheme();
  const avatarSize = size === "sm" ? "sm" : size === "lg" ? "lg" : "md";
  const nameFs = size === "sm" ? fs[13] : size === "lg" ? fs[16] : fs[14];
  return /* @__PURE__ */ jsxs52(View61, { style: { flexDirection: "row", alignItems: "center", gap: sp[3] }, children: [
    /* @__PURE__ */ jsx68(Avatar, { initials, size: avatarSize, color: avatarColor, star, status }),
    /* @__PURE__ */ jsxs52(View61, { style: { flex: 1 }, children: [
      /* @__PURE__ */ jsxs52(View61, { style: { flexDirection: "row", alignItems: "center", gap: sp[2] }, children: [
        /* @__PURE__ */ jsx68(Text54, { style: { fontFamily: font.sans, fontSize: nameFs, fontWeight: fw[600], color: theme.fg }, numberOfLines: 1, children: name }),
        badge !== void 0 && /* @__PURE__ */ jsx68(Badge, { variant: "accent", children: String(badge) })
      ] }),
      role && /* @__PURE__ */ jsx68(Text54, { style: { fontFamily: font.mono, fontSize: fs[11], color: theme.fgSubtle, marginTop: sp[0.5] }, children: role }),
      meta && /* @__PURE__ */ jsx68(Text54, { style: { fontFamily: font.sans, fontSize: fs[12], color: theme.fgFaint, marginTop: sp[0.5] }, children: meta })
    ] }),
    right
  ] });
}

// rn/CardGrid.tsx
import React34 from "react";
import { View as View62 } from "react-native";
import { jsx as jsx69, jsxs as jsxs53 } from "react/jsx-runtime";
function CardGrid({ children, columns = 2 }) {
  const items = React34.Children.toArray(children);
  const rows = [];
  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns));
  }
  return /* @__PURE__ */ jsx69(View62, { style: { gap: sp[4] }, children: rows.map((row, ri) => /* @__PURE__ */ jsxs53(View62, { style: { flexDirection: "row", gap: sp[4] }, children: [
    row.map((item, ci) => /* @__PURE__ */ jsx69(View62, { style: { flex: 1 }, children: item }, ci)),
    row.length < columns && Array.from({ length: columns - row.length }).map((_, fi) => /* @__PURE__ */ jsx69(View62, { style: { flex: 1 } }, `fill-${fi}`))
  ] }, ri)) });
}

// rn/Leaderboard.tsx
import { useCallback as useCallback7 } from "react";
import { View as View63, Text as Text55, FlatList as FlatList2 } from "react-native";
import { jsx as jsx70, jsxs as jsxs54 } from "react/jsx-runtime";
function Leaderboard({ entries, label = "Rank", unit = "jugs" }) {
  const { theme } = useTheme();
  const renderItem = useCallback7(({ item, index }) => {
    const rank = index + 1;
    const isTop3 = rank <= 3;
    const rankColors = [color.gold[400], color.chalk[300], color.gold[500]];
    return /* @__PURE__ */ jsxs54(View63, { style: {
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
      /* @__PURE__ */ jsx70(Text55, { style: {
        fontFamily: font.mono,
        fontSize: fs[12],
        fontWeight: fw[700],
        color: isTop3 ? rankColors[rank - 1] : theme.fgFaint,
        minWidth: 20,
        textAlign: "center"
      }, children: rank }),
      /* @__PURE__ */ jsx70(Avatar, { initials: item.initials, size: "sm", color: item.avatarColor, star: isTop3 && rank === 1 }),
      /* @__PURE__ */ jsx70(Text55, { style: {
        fontFamily: font.sans,
        fontSize: fs[14],
        fontWeight: item.isCurrent ? fw[600] : fw[400],
        color: theme.fg,
        flex: 1
      }, numberOfLines: 1, children: item.name }),
      /* @__PURE__ */ jsx70(Text55, { style: {
        fontFamily: font.mono,
        fontSize: fs[13],
        fontWeight: fw[600],
        color: isTop3 ? rankColors[rank - 1] : theme.fgMuted
      }, children: item.score })
    ] });
  }, [theme]);
  const keyExtractor = useCallback7((_, i) => String(i), []);
  return /* @__PURE__ */ jsx70(
    FlatList2,
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
  Badge,
  BottomAction,
  BottomNav,
  BottomSheet,
  BreakdownCard,
  Button,
  Calendar,
  Card,
  CardGrid,
  CategorizeQuestion,
  ChatMessage,
  Checkbox,
  CheckboxGroup,
  Chip,
  CircularProgress,
  Dialog,
  Divider,
  DragItem,
  DragItemContent,
  DropZone,
  DunePattern,
  EmptyState,
  FillBlanksQuestion,
  FilterBar,
  FullSheet,
  GridPaper,
  HomeworkCard,
  HotspotQuestion,
  Icon,
  IconButton,
  Identity,
  Input,
  Interstitial,
  Leaderboard,
  LinearProgress,
  MatchQuestion,
  Menu,
  Oasis,
  OrderQuestion,
  PlacedItem,
  Question,
  QuestionFrame,
  QuizOption,
  Radio,
  RadioGroup,
  ResourceList,
  RouteMap,
  Segmented,
  SessionBar,
  SessionCard,
  Skeleton,
  SlidesCard,
  Stepper,
  Switch,
  Table,
  Tabs,
  TerrainPattern,
  Textarea,
  ThemeProvider,
  TitleBar,
  Toast,
  ToastProvider,
  Tooltip,
  TypingIndicator,
  VideoCard,
  VoiceTutor,
  WaterVessel,
  WaypointMarker,
  Waypoints,
  WorkedExampleCard,
  color,
  dur,
  font,
  fs,
  fw,
  h,
  icon,
  iconNames,
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