"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// rn/index.ts
var rn_exports = {};
__export(rn_exports, {
  ActivityCard: () => ActivityCard,
  Alert: () => Alert,
  Avatar: () => Avatar,
  Badge: () => Badge,
  BottomAction: () => BottomAction,
  BottomNav: () => BottomNav,
  BottomSheet: () => BottomSheet,
  Breadcrumbs: () => Breadcrumbs,
  BreakdownCard: () => BreakdownCard,
  Button: () => Button,
  Calendar: () => Calendar,
  Card: () => Card,
  CardGrid: () => CardGrid,
  CategorizeQuestion: () => CategorizeQuestion,
  ChatMessage: () => ChatMessage,
  Checkbox: () => Checkbox,
  CheckboxGroup: () => CheckboxGroup,
  Chip: () => Chip,
  CircularProgress: () => CircularProgress,
  ConstellationPattern: () => ConstellationPattern,
  Dialog: () => Dialog,
  Divider: () => Divider,
  DragItem: () => DragItem,
  DragItemContent: () => DragItemContent,
  DropZone: () => DropZone,
  DuneDynamic: () => DuneDynamic,
  DunePattern: () => DunePattern,
  EmptyState: () => EmptyState,
  FillBlanksQuestion: () => FillBlanksQuestion,
  FilterBar: () => FilterBar,
  FullSheet: () => FullSheet,
  GridPaper: () => GridPaper,
  HomeworkCard: () => HomeworkCard,
  HotspotQuestion: () => HotspotQuestion,
  Icon: () => Icon,
  IconButton: () => IconButton,
  Identity: () => Identity,
  Input: () => Input,
  Interstitial: () => Interstitial,
  Leaderboard: () => Leaderboard,
  LinearProgress: () => LinearProgress,
  MatchQuestion: () => MatchQuestion,
  Menu: () => Menu,
  Oasis: () => Oasis,
  OrderQuestion: () => OrderQuestion,
  Pagination: () => Pagination,
  PlacedItem: () => PlacedItem,
  Question: () => Question,
  QuestionFrame: () => QuestionFrame,
  QuizOption: () => QuizOption,
  Radio: () => Radio,
  RadioGroup: () => RadioGroup,
  ResourceList: () => ResourceList,
  RouteMap: () => RouteMap,
  Segmented: () => Segmented,
  SessionBar: () => SessionBar,
  SessionCard: () => SessionCard,
  Skeleton: () => Skeleton,
  Slider: () => Slider,
  SlidesCard: () => SlidesCard,
  StarsDynamic: () => StarsDynamic,
  Stepper: () => Stepper,
  Switch: () => Switch,
  Table: () => Table,
  Tabs: () => Tabs,
  TerrainDynamic: () => TerrainDynamic,
  TerrainPattern: () => TerrainPattern,
  Textarea: () => Textarea,
  ThemeProvider: () => ThemeProvider,
  TitleBar: () => TitleBar,
  Toast: () => Toast,
  ToastProvider: () => ToastProvider,
  Tooltip: () => Tooltip,
  TypingIndicator: () => TypingIndicator,
  VideoCard: () => VideoCard,
  VoiceTutor: () => VoiceTutor,
  WaterVessel: () => WaterVessel,
  WaypointMarker: () => WaypointMarker,
  Waypoints: () => Waypoints,
  WorkedExampleCard: () => WorkedExampleCard,
  color: () => color,
  dur: () => dur,
  font: () => font,
  fs: () => fs,
  fw: () => fw,
  h: () => h,
  icon: () => icon,
  iconNames: () => iconNames,
  lh: () => lh,
  paperElevation: () => paperElevation,
  paperTheme: () => paperTheme,
  r: () => r,
  sp: () => sp,
  useDragDrop: () => useDragDrop,
  useTheme: () => useTheme,
  useToast: () => useToast,
  voidElevation: () => voidElevation,
  voidTheme: () => voidTheme
});
module.exports = __toCommonJS(rn_exports);

// rn/ThemeContext.tsx
var import_react = require("react");

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
var import_jsx_runtime = require("react/jsx-runtime");
var ThemeContext = (0, import_react.createContext)({
  mode: "void",
  theme: voidTheme,
  elevation: voidElevation,
  setMode: () => {
  }
});
function ThemeProvider({ children, initial = "void" }) {
  const [mode, setMode] = (0, import_react.useState)(initial);
  const theme = mode === "void" ? voidTheme : paperTheme;
  const elevation = mode === "void" ? voidElevation : paperElevation;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, { value: { mode, theme, elevation, setMode }, children });
}
function useTheme() {
  return (0, import_react.useContext)(ThemeContext);
}

// rn/Icon.tsx
var import_react_native_svg = __toESM(require("react-native-svg"));
var import_jsx_runtime2 = require("react/jsx-runtime");
var paths = {
  "chevron-left": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Path, { d: `M${s * 0.6} ${s * 0.2}L${s * 0.3} ${s * 0.5}L${s * 0.6} ${s * 0.8}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }),
  "chevron-right": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Path, { d: `M${s * 0.4} ${s * 0.2}L${s * 0.7} ${s * 0.5}L${s * 0.4} ${s * 0.8}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }),
  "chevron-down": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Path, { d: `M${s * 0.2} ${s * 0.4}L${s * 0.5} ${s * 0.7}L${s * 0.8} ${s * 0.4}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }),
  "chevron-up": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Path, { d: `M${s * 0.2} ${s * 0.6}L${s * 0.5} ${s * 0.3}L${s * 0.8} ${s * 0.6}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }),
  "arrow-left": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Path, { d: `M${s * 0.55} ${s * 0.2}L${s * 0.25} ${s * 0.5}L${s * 0.55} ${s * 0.8}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Line, { x1: s * 0.25, y1: s * 0.5, x2: s * 0.8, y2: s * 0.5, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "arrow-right": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Path, { d: `M${s * 0.45} ${s * 0.2}L${s * 0.75} ${s * 0.5}L${s * 0.45} ${s * 0.8}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Line, { x1: s * 0.2, y1: s * 0.5, x2: s * 0.75, y2: s * 0.5, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "close": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Line, { x1: s * 0.25, y1: s * 0.25, x2: s * 0.75, y2: s * 0.75, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Line, { x1: s * 0.75, y1: s * 0.25, x2: s * 0.25, y2: s * 0.75, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "plus": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Line, { x1: s * 0.5, y1: s * 0.2, x2: s * 0.5, y2: s * 0.8, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Line, { x1: s * 0.2, y1: s * 0.5, x2: s * 0.8, y2: s * 0.5, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "minus": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Line, { x1: s * 0.2, y1: s * 0.5, x2: s * 0.8, y2: s * 0.5, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
  "check": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Path, { d: `M${s * 0.2} ${s * 0.5}L${s * 0.4} ${s * 0.7}L${s * 0.8} ${s * 0.25}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }),
  "search": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Circle, { cx: s * 0.42, cy: s * 0.42, r: s * 0.22, fill: "none", stroke: "currentColor", strokeWidth: 1.5 }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Line, { x1: s * 0.58, y1: s * 0.58, x2: s * 0.78, y2: s * 0.78, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "menu": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Line, { x1: s * 0.2, y1: s * 0.3, x2: s * 0.8, y2: s * 0.3, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Line, { x1: s * 0.2, y1: s * 0.5, x2: s * 0.8, y2: s * 0.5, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Line, { x1: s * 0.2, y1: s * 0.7, x2: s * 0.6, y2: s * 0.7, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "more": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Circle, { cx: s * 0.25, cy: s * 0.5, r: s * 0.06, fill: "currentColor" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Circle, { cx: s * 0.5, cy: s * 0.5, r: s * 0.06, fill: "currentColor" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Circle, { cx: s * 0.75, cy: s * 0.5, r: s * 0.06, fill: "currentColor" })
  ] }),
  "more-vertical": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Circle, { cx: s * 0.5, cy: s * 0.25, r: s * 0.06, fill: "currentColor" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Circle, { cx: s * 0.5, cy: s * 0.5, r: s * 0.06, fill: "currentColor" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Circle, { cx: s * 0.5, cy: s * 0.75, r: s * 0.06, fill: "currentColor" })
  ] }),
  "play": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Path, { d: `M${s * 0.3} ${s * 0.2}L${s * 0.8} ${s * 0.5}L${s * 0.3} ${s * 0.8}Z`, fill: "currentColor" }),
  "pause": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Rect, { x: s * 0.25, y: s * 0.2, width: s * 0.15, height: s * 0.6, rx: s * 0.04, fill: "currentColor" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Rect, { x: s * 0.6, y: s * 0.2, width: s * 0.15, height: s * 0.6, rx: s * 0.04, fill: "currentColor" })
  ] }),
  "expand": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Path, { d: `M${s * 0.2} ${s * 0.4}L${s * 0.5} ${s * 0.65}L${s * 0.8} ${s * 0.4}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }) }),
  "collapse": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Path, { d: `M${s * 0.2} ${s * 0.6}L${s * 0.5} ${s * 0.35}L${s * 0.8} ${s * 0.6}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }) }),
  "document": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Path, { d: `M${s * 0.25} ${s * 0.15}L${s * 0.55} ${s * 0.15}L${s * 0.75} ${s * 0.35}L${s * 0.75} ${s * 0.85}L${s * 0.25} ${s * 0.85}Z`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Path, { d: `M${s * 0.55} ${s * 0.15}L${s * 0.55} ${s * 0.35}L${s * 0.75} ${s * 0.35}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" })
  ] }),
  "link": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Path, { d: `M${s * 0.45} ${s * 0.55}L${s * 0.55} ${s * 0.45}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Path, { d: `M${s * 0.35} ${s * 0.5}L${s * 0.25} ${s * 0.6}A${s * 0.14} ${s * 0.14} 0 0 0 ${s * 0.4} ${s * 0.75}L${s * 0.5} ${s * 0.65}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Path, { d: `M${s * 0.65} ${s * 0.5}L${s * 0.75} ${s * 0.4}A${s * 0.14} ${s * 0.14} 0 0 0 ${s * 0.6} ${s * 0.25}L${s * 0.5} ${s * 0.35}`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] }),
  "info": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Circle, { cx: s * 0.5, cy: s * 0.5, r: s * 0.38, fill: "none", stroke: "currentColor", strokeWidth: 1.5 }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Line, { x1: s * 0.5, y1: s * 0.42, x2: s * 0.5, y2: s * 0.68, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Circle, { cx: s * 0.5, cy: s * 0.32, r: s * 0.04, fill: "currentColor" })
  ] }),
  "warning": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Path, { d: `M${s * 0.5} ${s * 0.15}L${s * 0.88} ${s * 0.8}L${s * 0.12} ${s * 0.8}Z`, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Line, { x1: s * 0.5, y1: s * 0.4, x2: s * 0.5, y2: s * 0.58, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Circle, { cx: s * 0.5, cy: s * 0.68, r: s * 0.04, fill: "currentColor" })
  ] }),
  "error": (s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Circle, { cx: s * 0.5, cy: s * 0.5, r: s * 0.38, fill: "none", stroke: "currentColor", strokeWidth: 1.5 }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Line, { x1: s * 0.35, y1: s * 0.35, x2: s * 0.65, y2: s * 0.65, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.Line, { x1: s * 0.65, y1: s * 0.35, x2: s * 0.35, y2: s * 0.65, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })
  ] })
};
function Icon({ name, size = icon.md, color: colorProp }) {
  const { theme } = useTheme();
  const c = colorProp || theme.fg;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_svg.default, { width: size, height: size, viewBox: `0 0 ${size} ${size}`, color: c, children: paths[name](size) });
}
var iconNames = Object.keys(paths);

// rn/Button.tsx
var import_react_native = require("react-native");
var import_jsx_runtime3 = require("react/jsx-runtime");
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
    ...import_react_native.Platform.OS === "web" ? { cursor: "inherit" } : {}
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    import_react_native.Pressable,
    {
      onPress,
      accessibilityRole: "button",
      accessibilityState: { disabled: disabled || loading },
      disabled: disabled || loading,
      style: ({ pressed, hovered }) => [
        containerStyle,
        pressed && !disabled && { opacity: 0.9, transform: [{ translateY: 0.5 }] },
        import_react_native.Platform.OS === "web" && { cursor: disabled || loading ? "not-allowed" : "pointer" }
      ],
      children: [
        loading && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          import_react_native.ActivityIndicator,
          {
            size: "small",
            color: disabled ? theme.fgFaint : fgMap[variant],
            style: { position: "absolute" }
          }
        ),
        leadingIcon && !loading && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_native.View, { style: { width: iconSizes[size], height: iconSizes[size], alignItems: "center", justifyContent: "center", overflow: "hidden" }, children: leadingIcon }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_native.Text, { style: textStyle, children }),
        trailingIcon && !loading && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_native.View, { style: { width: iconSizes[size], height: iconSizes[size], alignItems: "center", justifyContent: "center", overflow: "hidden" }, children: trailingIcon })
      ]
    }
  );
}

// rn/IconButton.tsx
var import_react_native2 = require("react-native");
var import_jsx_runtime4 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    import_react_native2.Pressable,
    {
      onPress,
      accessibilityRole: "button",
      accessibilityLabel,
      accessibilityState: disabled ? { disabled: true } : void 0,
      disabled,
      style: ({ pressed }) => [
        style,
        pressed && !disabled && { opacity: 0.9, transform: [{ translateY: 0.5 }] },
        import_react_native2.Platform.OS === "web" && { cursor: disabled ? "not-allowed" : "pointer" }
      ],
      children: disabled ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_native2.View, { style: { opacity: 0.3 }, children }) : children
    }
  );
}

// rn/Input.tsx
var import_react2 = require("react");
var import_react_native3 = require("react-native");
var import_jsx_runtime5 = require("react/jsx-runtime");
var Input = (0, import_react2.forwardRef)(({ label, error, helper, disabled, ...rest }, ref) => {
  const { theme } = useTheme();
  const [focused, setFocused] = (0, import_react2.useState)(false);
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
    minHeight: 40
  };
  const helperStyle = {
    fontFamily: font.sans,
    fontSize: fs[12],
    color: error ? theme.danger : theme.fgFaint,
    marginTop: sp[1]
  };
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_react_native3.View, { style: containerStyle, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react_native3.Text, { style: labelStyle, children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      import_react_native3.TextInput,
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
    (error || helper) && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react_native3.Text, { style: helperStyle, children: error || helper })
  ] });
});

// rn/Textarea.tsx
var import_react3 = require("react");
var import_react_native4 = require("react-native");
var import_jsx_runtime6 = require("react/jsx-runtime");
var Textarea = (0, import_react3.forwardRef)(({ label, error, helper, rows = 4, disabled, ...rest }, ref) => {
  const { theme } = useTheme();
  const [focused, setFocused] = (0, import_react3.useState)(false);
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_react_native4.View, { style: containerStyle, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react_native4.Text, { style: labelStyle, children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      import_react_native4.TextInput,
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
    (error || helper) && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react_native4.Text, { style: helperStyle, children: error || helper })
  ] });
});

// rn/Switch.tsx
var import_react4 = require("react");
var import_react_native5 = require("react-native");
var import_react_native_reanimated = __toESM(require("react-native-reanimated"));
var import_jsx_runtime7 = require("react/jsx-runtime");
var TRACK_W = 36;
var TRACK_H = 20;
var THUMB_SIZE = 16;
var THUMB_TRAVEL = TRACK_W - THUMB_SIZE - 4;
function Switch({ value, onValueChange, disabled, label }) {
  const { theme } = useTheme();
  const thumbX = (0, import_react_native_reanimated.useSharedValue)(value ? THUMB_TRAVEL : 0);
  const trackColor = (0, import_react_native_reanimated.useSharedValue)(value ? 1 : 0);
  (0, import_react4.useEffect)(() => {
    const config = { duration: dur[1], easing: import_react_native_reanimated.Easing.bezier(0.22, 0.61, 0.36, 1) };
    thumbX.value = (0, import_react_native_reanimated.withTiming)(value ? THUMB_TRAVEL : 0, config);
    trackColor.value = (0, import_react_native_reanimated.withTiming)(value ? 1 : 0, config);
  }, [value]);
  const trackStyle = (0, import_react_native_reanimated.useAnimatedStyle)(() => ({
    backgroundColor: (0, import_react_native_reanimated.interpolateColor)(trackColor.value, [0, 1], [theme.borderStrong, theme.accent])
  }));
  const thumbStyle = (0, import_react_native_reanimated.useAnimatedStyle)(() => ({
    backgroundColor: (0, import_react_native_reanimated.interpolateColor)(trackColor.value, [0, 1], [color.chalk[100], theme.accentFg]),
    transform: [{ translateX: thumbX.value }]
  }));
  const track = /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react_native5.View, { ...import_react_native5.Platform.OS === "web" ? { dataSet: { ltr: "" } } : {}, style: { width: TRACK_W }, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react_native_reanimated.default.View, { style: [{
    width: TRACK_W,
    height: TRACK_H,
    borderRadius: r.pill,
    justifyContent: "center",
    paddingHorizontal: 2,
    opacity: disabled ? 0.4 : 1
  }, trackStyle], children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react_native_reanimated.default.View, { style: [{
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2
  }, thumbStyle] }) }) });
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_react_native5.Pressable, { onPress: () => !disabled && onValueChange(!value), accessibilityRole: "switch", accessibilityState: { checked: value, disabled }, style: label ? { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: sp[3], width: "100%" } : void 0, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react_native5.Text, { style: { fontFamily: font.sans, fontSize: fs[14], color: disabled ? theme.fgFaint : theme.fg, flex: 1 }, children: label }),
    track
  ] });
}

// rn/Checkbox.tsx
var import_react_native6 = require("react-native");
var import_jsx_runtime8 = require("react/jsx-runtime");
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
  const box = /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_react_native6.View, { style: boxStyle, children: [
    checked && !indeterminate && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react_native6.View, { style: checkmarkStyle }),
    indeterminate && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react_native6.View, { style: dashStyle })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_react_native6.Pressable, { onPress: () => !disabled && onValueChange(!checked), accessibilityRole: "checkbox", accessibilityState: { checked, disabled }, style: label ? { flexDirection: "row", alignItems: "center", gap: sp[3] } : void 0, children: [
    box,
    label && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react_native6.Text, { style: { fontFamily: font.sans, fontSize: fs[14], color: disabled ? theme.fgFaint : theme.fg }, children: label })
  ] });
}

// rn/CheckboxGroup.tsx
var import_react_native7 = require("react-native");
var import_jsx_runtime9 = require("react/jsx-runtime");
function CheckboxGroup({ values, onChange, options, title, disabled }) {
  const { theme } = useTheme();
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_react_native7.View, { accessibilityRole: "none", style: { gap: sp[3] }, children: [
    title && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react_native7.Text, { style: { fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: theme.fgMuted, marginBottom: sp[2] }, children: title }),
    options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
var import_react_native8 = require("react-native");
var import_jsx_runtime10 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_react_native8.Pressable, { onPress: () => !disabled && onSelect(), accessibilityRole: "radio", accessibilityState: { selected, disabled }, style: label ? { flexDirection: "row", alignItems: "center", gap: sp[3] } : void 0, children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react_native8.View, { style: outerStyle }),
    label && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react_native8.Text, { style: { fontFamily: font.sans, fontSize: fs[14], color: disabled ? theme.fgFaint : theme.fg }, children: label })
  ] });
}

// rn/RadioGroup.tsx
var import_react_native9 = require("react-native");
var import_jsx_runtime11 = require("react/jsx-runtime");
function RadioGroup({ value, onChange, options, title, disabled }) {
  const { theme } = useTheme();
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_react_native9.View, { accessibilityRole: "radiogroup", style: { gap: sp[3] }, children: [
    title && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_react_native9.Text, { style: { fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: theme.fgMuted, marginBottom: sp[2] }, children: title }),
    options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
var import_react_native10 = require("react-native");
var import_jsx_runtime12 = require("react/jsx-runtime");
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
    ...import_react_native10.Platform.OS === "web" ? { userSelect: "none" } : {}
  };
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_react_native10.View, { style: { flexDirection: "row", alignItems: "center", gap: sp[2] }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react_native10.Pressable, { onPress: () => canDec && !disabled && onChange(value - step), style: btnStyle(canDec), accessibilityRole: "button", accessibilityLabel: "Decrease", accessibilityState: { disabled: !canDec || !!disabled }, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react_native10.Text, { style: btnText, children: "\u2212" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react_native10.Text, { style: valueStyle, accessibilityRole: "text", children: value }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react_native10.Pressable, { onPress: () => canInc && !disabled && onChange(value + step), style: btnStyle(canInc), accessibilityRole: "button", accessibilityLabel: "Increase", accessibilityState: { disabled: !canInc || !!disabled }, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react_native10.Text, { style: btnText, children: "+" }) })
  ] });
}

// rn/Segmented.tsx
var import_react_native11 = require("react-native");
var import_jsx_runtime13 = require("react/jsx-runtime");
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
    ...import_react_native11.Platform.OS === "web" ? { direction: "ltr" } : {}
  };
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_react_native11.View, { accessibilityRole: "radiogroup", style: trackStyle, children: options.map((opt, i) => {
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
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_react_native11.Pressable, { onPress: () => onSelect(i), style: btnStyle, accessibilityRole: "radio", accessibilityState: { selected: isOn }, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_react_native11.Text, { style: txtStyle, children: opt }) }, i);
  }) });
}

// rn/Card.tsx
var import_react5 = require("react");
var import_react_native13 = require("react-native");

// rn/Menu.tsx
var import_react_native12 = require("react-native");
var import_jsx_runtime14 = require("react/jsx-runtime");
function Menu({ visible, onClose, items, anchor }) {
  const { theme } = useTheme();
  const isRTL = import_react_native12.I18nManager.isRTL;
  const screenWidth = import_react_native12.Dimensions.get("window").width;
  const positionStyle = anchor ? { top: anchor.y, right: screenWidth - anchor.x - sp[4] } : { top: 100, ...isRTL ? { left: sp[5] } : { right: sp[5] } };
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_react_native12.Modal, { transparent: true, visible, animationType: "fade", onRequestClose: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_react_native12.Pressable, { style: { flex: 1 }, onPress: onClose, children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_react_native12.View, { style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(6,9,19,0.5)" } }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_react_native12.View, { accessibilityRole: "menu", style: {
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
    }, children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
      import_react_native12.Pressable,
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
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_react_native12.Text, { style: {
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
var import_jsx_runtime15 = require("react/jsx-runtime");
var CHECKBOX_SIZE = 20;
function Card({ title, subtitle, meta, thumbnail, actions, selectable, selected: selectedProp, loading, onPress, style }) {
  const { theme } = useTheme();
  const selected = selectable ? !!selectedProp : false;
  const indent = selectable ? CHECKBOX_SIZE + sp[3] : 0;
  const [menuOpen, setMenuOpen] = (0, import_react5.useState)(false);
  const [menuAnchor, setMenuAnchor] = (0, import_react5.useState)({ x: sp[4], y: 100 });
  const moreRef = (0, import_react5.useRef)(null);
  const handleMorePress = (0, import_react5.useCallback)(() => {
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
  const content = /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_jsx_runtime15.Fragment, { children: [
    thumbnail && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      import_react_native13.Image,
      {
        source: thumbnail,
        style: { width: "100%", aspectRatio: 16 / 9, backgroundColor: theme.hoverOverlay },
        resizeMode: "cover"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_react_native13.View, { style: { padding: sp[4], gap: sp[1] }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_react_native13.View, { style: { flexDirection: "row", alignItems: "flex-start", gap: sp[3] }, children: [
        selectable && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_react_native13.View, { style: {
          width: CHECKBOX_SIZE,
          height: CHECKBOX_SIZE,
          borderRadius: r[1],
          borderWidth: 1.5,
          marginTop: 1,
          borderColor: selected ? theme.accent : theme.borderStrong,
          backgroundColor: selected ? theme.accent : "transparent",
          alignItems: "center",
          justifyContent: "center"
        }, children: selected && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Icon, { name: "check", size: icon.sm, color: theme.accentFg }) }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_react_native13.Text, { style: { fontFamily: font.sans, fontSize: fs[15], fontWeight: fw[600], color: theme.fg, flex: 1 }, numberOfLines: 2, children: title }),
        actions && actions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          import_react_native13.Pressable,
          {
            onPress: (e) => {
              e.stopPropagation?.();
              handleMorePress();
            },
            hitSlop: 8,
            accessibilityRole: "button",
            accessibilityLabel: "More actions",
            style: { padding: sp[1] },
            children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_react_native13.View, { ref: moreRef, collapsable: false, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Icon, { name: "more-vertical", size: icon.lg, color: theme.fgMuted }) })
          }
        )
      ] }),
      subtitle && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_react_native13.Text, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginStart: indent }, numberOfLines: 1, children: subtitle }),
      meta && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_react_native13.Text, { style: { fontFamily: font.mono, fontSize: fs[11], color: theme.fgFaint, marginTop: sp[1], marginStart: indent }, children: meta })
    ] }),
    actions && actions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Menu, { visible: menuOpen, onClose: () => setMenuOpen(false), anchor: menuAnchor, items: actions.map((a) => ({ label: a.label, danger: a.danger, onPress: a.onPress })) })
  ] });
  if (onPress) {
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      import_react_native13.Pressable,
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
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_react_native13.View, { style: containerStyle, children: content });
}

// rn/Chip.tsx
var import_react_native14 = require("react-native");
var import_jsx_runtime16 = require("react/jsx-runtime");
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
  const content = /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_jsx_runtime16.Fragment, { children: [
    dot && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_react_native14.View, { style: dotStyle }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_react_native14.Text, { style: textStyle, children }),
    dismissable && !disabled && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_react_native14.Pressable, { onPress: onDismiss, hitSlop: 4, style: { marginLeft: sp[0.5], opacity: 0.6 }, accessibilityRole: "button", accessibilityLabel: `Remove ${children}`, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Icon, { name: "close", size: icon.sm, color: textColor }) })
  ] });
  if (onPress && !disabled) {
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_react_native14.Pressable, { onPress, accessibilityRole: "button", style: ({ pressed }) => [containerStyle, pressed && { backgroundColor: theme.border }], children: content });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_react_native14.View, { style: containerStyle, children: content });
}

// rn/Avatar.tsx
var import_react_native15 = require("react-native");
var import_jsx_runtime17 = require("react/jsx-runtime");
var sizes2 = { xs: 24, sm: 32, md: 40, lg: 56, xl: 72 };
var fontSizes2 = { xs: fs[11], sm: fs[13], md: fs[16], lg: fs[22], xl: fs[28] };
function Avatar({ initials, imageUri, size = "sm", color: color3 = "default", status }) {
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
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_react_native15.View, { style: containerStyle, children: [
    imageUri ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_react_native15.Image, { source: { uri: imageUri }, style: { width: dim - 2, height: dim - 2, borderRadius: (dim - 2) / 2 } }) : /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_react_native15.Text, { style: textStyle, children: initials }),
    status && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_react_native15.View, { style: statusStyle })
  ] });
}

// rn/Badge.tsx
var import_react_native16 = require("react-native");
var import_jsx_runtime18 = require("react/jsx-runtime");
function Badge({ children, variant = "default" }) {
  const { theme } = useTheme();
  if (variant === "dot") {
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_react_native16.View, { style: { width: sp[2], height: sp[2], borderRadius: r.pill, backgroundColor: theme.fg } });
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
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_react_native16.View, { style: containerStyle, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_react_native16.Text, { style: textStyle, children }) });
}

// rn/Table.tsx
var import_react6 = require("react");
var import_react_native17 = require("react-native");
var import_jsx_runtime19 = require("react/jsx-runtime");
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
  const columns = (0, import_react6.useMemo)(() => normalizeColumns(columnsProp), [columnsProp]);
  const rawRows = (0, import_react6.useMemo)(() => normalizeRows(rowsProp, columns), [rowsProp, columns]);
  const [intSortKey, setIntSortKey] = (0, import_react6.useState)();
  const [intSortDir, setIntSortDir] = (0, import_react6.useState)("asc");
  const sortKey = sortKeyProp ?? intSortKey;
  const sortDir = sortDirProp ?? intSortDir;
  const [intSelected, setIntSelected] = (0, import_react6.useState)([]);
  const selected = selectedProp ?? intSelected;
  const setSelected = onSelectionChange ?? setIntSelected;
  const rows = (0, import_react6.useMemo)(() => {
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
  const tableContent = /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_react_native17.View, { style: { minWidth }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_react_native17.View, { style: { flexDirection: "row", backgroundColor: theme.bgOverlay, borderBottomWidth: 1, borderBottomColor: theme.border }, children: [
      selectable && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_react_native17.View, { style: { ...cellPad, width: 44, alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Checkbox, { checked: allSelected, indeterminate: selected.length > 0 && !allSelected, onValueChange: toggleAll }) }),
      columns.map((col) => {
        const isSorted = sortKey === col.key;
        const arrow = isSorted ? sortDir === "asc" ? " \u2191" : " \u2193" : "";
        return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
          import_react_native17.Pressable,
          {
            onPress: col.sortable ? () => handleSort(col.key) : void 0,
            style: { ...cellPad, flex: col.width ? void 0 : 1, width: col.width, flexDirection: "row", alignItems: "center" },
            children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_react_native17.Text, { style: { ...headerTextStyle, textAlign: col.align || "left", color: isSorted ? theme.fg : theme.fgFaint }, children: [
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
      return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
        import_react_native17.Pressable,
        {
          onPress: onRowPress ? () => onRowPress(row, ri) : void 0,
          style: {
            flexDirection: "row",
            borderBottomWidth: ri < rows.length - 1 ? 1 : 0,
            borderBottomColor: theme.divider,
            backgroundColor: isSelected ? theme.selectedOverlay : "transparent"
          },
          children: [
            selectable && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_react_native17.View, { style: { ...cellPad, width: 44, alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Checkbox, { checked: isSelected, onValueChange: () => toggleRow(ri) }) }),
            columns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_react_native17.View, { style: { ...cellPad, flex: col.width ? void 0 : 1, width: col.width }, children: col.render ? col.render(row[col.key] ?? "", row, ri) : /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_react_native17.Text, { style: { ...bodyTextStyle, textAlign: col.align || "left" }, children: row[col.key] }) }, col.key))
          ]
        },
        ri
      );
    })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_react_native17.View, { style: { borderRadius: r[2], borderWidth: 1, borderColor: theme.border, overflow: "hidden" }, children: [
    minWidth ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_react_native17.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: { flexGrow: 0 }, children: tableContent }) : tableContent,
    selectable && selected.length > 0 && actionBar && /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_react_native17.View, { style: {
      flexDirection: "row",
      alignItems: "center",
      gap: sp[3],
      paddingVertical: sp[2],
      paddingHorizontal: sp[4],
      backgroundColor: theme.bgOverlay,
      borderTopWidth: 1,
      borderTopColor: theme.border
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_react_native17.Text, { style: { fontFamily: font.mono, fontSize: fs[10], color: theme.fgMuted }, children: [
        selected.length,
        " selected"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_react_native17.View, { style: { flex: 1 } }),
      actionBar(selected.length)
    ] })
  ] });
}

// rn/Pagination.tsx
var import_react_native18 = require("react-native");
var import_jsx_runtime20 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_react_native18.View, { style: { flexDirection: "row", alignItems: "center", gap: sp[1] }, children: [
    current > 1 && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(IconButton, { variant: "ghost", size: "sm", onPress: () => onPageChange(current - 1), accessibilityLabel: "Previous page", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Icon, { name: "chevron-left", size: 16, color: theme.fgMuted }) }),
    slots.map((slot, i) => {
      if (slot.type === "jump") {
        return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          IconButton,
          {
            variant: "ghost",
            size: "sm",
            onPress: () => onPageChange(Math.max(1, Math.min(total, current + (slot.dir === "prev" ? -JUMP : JUMP)))),
            accessibilityLabel: slot.dir === "prev" ? `Back ${JUMP} pages` : `Forward ${JUMP} pages`,
            children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_react_native18.Text, { style: { fontFamily: font.mono, fontSize: fs[12], color: theme.fgFaint }, children: "\xB7\xB7\xB7" })
          },
          `j${slot.dir}`
        );
      }
      const active = slot.page === current;
      return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
        IconButton,
        {
          variant: active ? "primary" : "ghost",
          size: "sm",
          onPress: () => onPageChange(slot.page),
          accessibilityLabel: `Page ${slot.page}`,
          children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_react_native18.Text, { style: { fontFamily: font.mono, fontSize: fs[12], fontWeight: active ? fw[700] : fw[500], color: active ? theme.accentFg : theme.fgMuted }, children: slot.page })
        },
        slot.page
      );
    }),
    current < total && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(IconButton, { variant: "ghost", size: "sm", onPress: () => onPageChange(current + 1), accessibilityLabel: "Next page", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Icon, { name: "chevron-right", size: 16, color: theme.fgMuted }) })
  ] });
}

// rn/Breadcrumbs.tsx
var import_react_native19 = require("react-native");
var import_jsx_runtime21 = require("react/jsx-runtime");
function Breadcrumbs({ items }) {
  const { theme } = useTheme();
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_react_native19.View, { style: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" }, accessibilityRole: "none", children: items.map((item, i) => {
    const isLast = i === items.length - 1;
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(import_react_native19.View, { style: { flexDirection: "row", alignItems: "center" }, children: [
      i > 0 && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_react_native19.Text, { style: { fontFamily: font.mono, fontSize: fs[11], color: theme.fgFaint, marginHorizontal: sp[2] }, children: "/" }),
      isLast ? /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_react_native19.Text, { style: { fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fg }, children: item.label }) : /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_react_native19.Pressable, { onPress: item.onPress, hitSlop: 4, children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_react_native19.Text, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }, children: item.label }) })
    ] }, i);
  }) });
}

// rn/Divider.tsx
var import_react_native20 = require("react-native");
var import_jsx_runtime22 = require("react/jsx-runtime");
function Divider() {
  const { theme } = useTheme();
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_react_native20.View, { style: { height: 1, backgroundColor: theme.divider } });
}

// rn/Skeleton.tsx
var import_react7 = require("react");
var import_react_native_reanimated2 = __toESM(require("react-native-reanimated"));
var import_jsx_runtime23 = require("react/jsx-runtime");
function Skeleton({ width = "100%", height = sp[4], circle, style }) {
  const { theme } = useTheme();
  const opacity = (0, import_react_native_reanimated2.useSharedValue)(0.3);
  (0, import_react7.useEffect)(() => {
    opacity.value = (0, import_react_native_reanimated2.withRepeat)(
      (0, import_react_native_reanimated2.withSequence)(
        (0, import_react_native_reanimated2.withTiming)(0.6, { duration: 800 }),
        (0, import_react_native_reanimated2.withTiming)(0.3, { duration: 800 })
      ),
      -1
    );
    return () => (0, import_react_native_reanimated2.cancelAnimation)(opacity);
  }, []);
  const animatedStyle = (0, import_react_native_reanimated2.useAnimatedStyle)(() => ({
    opacity: opacity.value
  }));
  const dim = circle ? typeof height === "number" ? height : 40 : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
    import_react_native_reanimated2.default.View,
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
var import_react_native21 = require("react-native");
var import_jsx_runtime24 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_react_native21.View, { style: containerStyle, children: [
    icon3,
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_react_native21.Text, { style: titleStyle, children: title }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_react_native21.Text, { style: bodyStyle, children: body }),
    actionLabel && onAction && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_react_native21.View, { style: { marginTop: sp[5] }, children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Button, { variant: "primary", onPress: onAction, children: actionLabel }) })
  ] });
}

// rn/Calendar.tsx
var import_react9 = require("react");
var import_react_native23 = require("react-native");

// rn/Waypoints.tsx
var import_react8 = __toESM(require("react"));
var import_react_native22 = require("react-native");
var import_react_native_reanimated3 = __toESM(require("react-native-reanimated"));
var import_react_native_svg2 = __toESM(require("react-native-svg"));
var import_jsx_runtime25 = require("react/jsx-runtime");
var DIAMOND_SIZE = 10;
function WaypointMarker({ state }) {
  const { theme } = useTheme();
  const isDone = state === "done" || state === "passed";
  const isCurrent = state === "current";
  const isArrived = state === "arrived";
  const isComplete = isDone || isArrived;
  const S = DIAMOND_SIZE;
  const ping = (0, import_react_native_reanimated3.useSharedValue)(0);
  (0, import_react8.useEffect)(() => {
    if (!isCurrent) return;
    ping.value = (0, import_react_native_reanimated3.withRepeat)(
      (0, import_react_native_reanimated3.withSequence)(
        (0, import_react_native_reanimated3.withTiming)(1, { duration: 1500, easing: import_react_native_reanimated3.Easing.out(import_react_native_reanimated3.Easing.ease) }),
        (0, import_react_native_reanimated3.withTiming)(0, { duration: 0 }),
        (0, import_react_native_reanimated3.withDelay)(1e3, (0, import_react_native_reanimated3.withTiming)(0, { duration: 0 }))
      ),
      -1
    );
    return () => {
      (0, import_react_native_reanimated3.cancelAnimation)(ping);
    };
  }, [isCurrent]);
  const pingAnimStyle = (0, import_react_native_reanimated3.useAnimatedStyle)(() => ({
    transform: [
      { rotate: "45deg" },
      { scale: (0, import_react_native_reanimated3.interpolate)(ping.value, [0, 1], [1, 2.8]) }
    ],
    opacity: (0, import_react_native_reanimated3.interpolate)(ping.value, [0, 0.2, 1], [0.6, 0.25, 0])
  }));
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_react_native22.View, { style: { width: S, height: S, alignItems: "center", justifyContent: "center" }, children: [
    isCurrent && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native_reanimated3.default.View, { style: [{
      position: "absolute",
      width: S,
      height: S,
      backgroundColor: theme.signalBright
    }, pingAnimStyle] }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_react_native22.View, { style: {
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
      isDone && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native22.View, { style: { width: 4, height: 4, borderRadius: 2, backgroundColor: theme.bg } }),
      isArrived && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native22.View, { style: { width: 0, height: 0, borderLeftWidth: 3, borderRightWidth: 3, borderBottomWidth: 5, borderLeftColor: "transparent", borderRightColor: "transparent", borderBottomColor: theme.bg, transform: [{ rotate: "-45deg" }], marginBottom: 1 } })
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
      return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(WaypointMarker, { state: step });
    }, renderLine2 = function(prevDone, isVertical) {
      const lineColor = prevDone ? theme.signalDim : theme.signalBorder;
      if (prevDone) {
        return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native22.View, { style: isVertical ? { width: 1, flex: 1, backgroundColor: lineColor } : { height: 1, width: "100%", backgroundColor: lineColor } });
      }
      return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native22.View, { style: isVertical ? { width: 0, flex: 1, borderLeftWidth: 1, borderLeftColor: lineColor, borderStyle: "dashed" } : { height: 0, width: "100%", borderTopWidth: 1, borderTopColor: lineColor, borderStyle: "dashed" } });
    };
    var stepState = stepState2, renderDiamond = renderDiamond2, renderLine = renderLine2;
    const S = 10;
    if (layout === "horizontal" || !layout) {
      const showAllLabels = labels && n <= 5;
      return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_react_native22.View, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native22.View, { style: { flexDirection: "row", alignItems: "flex-start", width: "100%", gap: 2, flexWrap: "nowrap", marginBottom: showAllLabels ? sp[5] : 0 }, children: steps.map((step, i) => {
          const prevDone = i > 0 && (steps[i - 1] === "done" || steps[i - 1] === "passed" || steps[i - 1] === "arrived");
          const { isDone, isCurrent, isArrived } = stepState2(step);
          const col = isArrived ? theme.accent : isCurrent ? theme.signalBright : isDone ? theme.signalDim : theme.fgFaint;
          return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_react8.default.Fragment, { children: [
            i > 0 && (() => {
              return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native22.View, { style: { flex: 1, justifyContent: "center", height: S, paddingHorizontal: 2 }, children: renderLine2(prevDone) });
            })(),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_react_native22.View, { style: { alignItems: "center", width: S, overflow: "visible" }, children: [
              renderDiamond2(step),
              showAllLabels && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native22.Text, { style: { fontFamily: font.mono, fontSize: fs[9], color: col, textAlign: "center", position: "absolute", top: S + sp[3] }, children: labels[i] })
            ] })
          ] }, i);
        }) }),
        labels && n > 5 && (() => {
          const idx = steps.findIndex((s) => s === "current" || s === "arrived");
          const pos = idx >= 0 ? idx + 1 : 1;
          const label = labels[idx >= 0 ? idx : 0] || "";
          return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_react_native22.Text, { style: { fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, marginTop: sp[3] }, children: [
            "Step ",
            pos,
            " of ",
            n,
            " \xB7 ",
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native22.Text, { style: { color: theme.signalBright }, children: label })
          ] });
        })()
      ] });
    }
    if (layout === "vertical") {
      const lineGap = 44;
      return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native22.View, { children: steps.map((step, i) => {
        const prevDone = i > 0 && (steps[i - 1] === "done" || steps[i - 1] === "passed" || steps[i - 1] === "arrived");
        const { isDone, isCurrent, isArrived } = stepState2(step);
        const col = isArrived ? theme.accent : isCurrent ? theme.signalBright : isDone ? theme.signalDim : theme.fgFaint;
        return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_react8.default.Fragment, { children: [
          i > 0 && (() => {
            return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native22.View, { style: { height: lineGap, alignItems: "center", marginLeft: S / 2 - 0.5, width: 1, paddingVertical: 3 }, children: renderLine2(prevDone, true) });
          })(),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_react_native22.View, { style: { flexDirection: "row", alignItems: "center", gap: sp[4] }, children: [
            renderDiamond2(step),
            labels && labels[i] && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native22.Text, { style: { fontFamily: font.mono, fontSize: fs[10], color: col }, children: labels[i] })
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
      return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_react_native22.View, { style: { width: w }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native_svg2.default, { width: w, height: totalH, children: pts.map(([x1, y1], i) => {
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
          return done ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native_svg2.Path, { d, fill: "none", stroke: theme.signal, strokeWidth: 1, strokeLinecap: "round" }, `p${i}`) : /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native_svg2.Path, { d, fill: "none", stroke: theme.signalBorder, strokeWidth: 1, strokeDasharray: "4 3", strokeLinecap: "round" }, `p${i}`);
        }) }),
        pts.map(([x, y], i) => /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native22.View, { style: { position: "absolute", left: x - S / 2, top: y - S / 2 }, children: renderDiamond2(steps[i]) }, `d${i}`)),
        labels && pts.map(([x, y], i) => {
          const { isDone, isCurrent, isArrived } = stepState2(steps[i]);
          const col = isArrived ? theme.accent : isCurrent ? theme.signalBright : isDone ? theme.signalDim : theme.fgFaint;
          const onLeft = x > w / 2;
          return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native22.View, { style: {
            position: "absolute",
            top: y - 7,
            left: onLeft ? void 0 : x + S + 6,
            right: onLeft ? w - x + S + 6 : void 0,
            flexDirection: "row",
            alignItems: "center",
            height: 14
          }, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native22.Text, { style: { fontFamily: font.mono, fontSize: fs[10], color: col }, children: labels[i] }) }, `l${i}`);
        })
      ] });
    }
  }
  return null;
}

// rn/Calendar.tsx
var import_jsx_runtime26 = require("react/jsx-runtime");
if (import_react_native23.Platform.OS === "android" && import_react_native23.UIManager.setLayoutAnimationEnabledExperimental) {
  import_react_native23.UIManager.setLayoutAnimationEnabledExperimental(true);
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
  const isRTL = import_react_native23.I18nManager.isRTL;
  const loc = localeProp === "ar" ? AR_LOCALE : localeProp || (isRTL ? AR_LOCALE : EN_LOCALE);
  const reorderedDayNames = (0, import_react9.useMemo)(() => {
    const arr = [...loc.dayNames];
    const start = loc.weekStart;
    return [...arr.slice(start), ...arr.slice(0, start)];
  }, [loc.dayNames, loc.weekStart]);
  const now = /* @__PURE__ */ new Date();
  const [internalSelected, setInternalSelected] = (0, import_react9.useState)(selectedProp || now);
  const [internalExpanded, setInternalExpanded] = (0, import_react9.useState)(false);
  const [viewMonth, setViewMonth] = (0, import_react9.useState)((selectedProp || now).getMonth());
  const [viewYear, setViewYear] = (0, import_react9.useState)((selectedProp || now).getFullYear());
  const sel = selectedProp || internalSelected;
  const isExpanded = expandedProp !== void 0 ? expandedProp : internalExpanded;
  const weeks = (0, import_react9.useMemo)(() => buildGrid(viewYear, viewMonth, loc.weekStart), [viewYear, viewMonth, loc.weekStart]);
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
    import_react_native23.LayoutAnimation.configureNext(import_react_native23.LayoutAnimation.create(200, "easeInEaseOut", "opacity"));
    if (onToggle) onToggle();
    else setInternalExpanded(!internalExpanded);
  }
  const panResponder = (0, import_react9.useRef)(import_react_native23.PanResponder.create({
    onMoveShouldSetPanResponder: (_, gs) => Math.abs(gs.dy) > 5,
    onPanResponderRelease: (_, gs) => {
      if (gs.dy > 20) {
        import_react_native23.LayoutAnimation.configureNext(import_react_native23.LayoutAnimation.create(200, "easeInEaseOut", "opacity"));
        if (onToggle) onToggle();
        else setInternalExpanded(true);
      } else if (gs.dy < -20) {
        import_react_native23.LayoutAnimation.configureNext(import_react_native23.LayoutAnimation.create(200, "easeInEaseOut", "opacity"));
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
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      import_react_native23.Pressable,
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
        children: /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_react_native23.View, { style: {
          width: DAY_SIZE,
          height: DAY_SIZE,
          borderRadius: DAY_SIZE / 2,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: dayBg,
          overflow: "visible"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_react_native23.Text, { style: {
            fontFamily: font.sans,
            fontSize: fs[14],
            fontWeight: selected || today ? fw[600] : fw[400],
            color: dayFg
          }, children: day.d }),
          evtCount > 0 && (() => {
            const dayDate = new Date(day.y, day.m, day.d);
            const isPast = dayDate < new Date(now.getFullYear(), now.getMonth(), now.getDate());
            return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_react_native23.View, { style: { position: "absolute", top: 0, right: 0, overflow: "visible", zIndex: 10 }, children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(WaypointMarker, { state: isPast ? "done" : "current" }) });
          })()
        ] })
      },
      di
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_react_native23.View, { style: { borderBottomWidth: 1, borderBottomColor: theme.border }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_react_native23.View, { style: { flexDirection: "row", alignItems: "center", paddingHorizontal: sp[5], paddingVertical: sp[3], minHeight: 56, gap: sp[3] }, children: [
      onBack && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_react_native23.Pressable, { onPress: onBack, hitSlop: 8, accessibilityRole: "button", accessibilityLabel: "Back", children: backIcon || /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(Icon, { name: isRTL ? "chevron-right" : "chevron-left", size: icon.lg, color: theme.fgMuted }) }),
      /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_react_native23.Text, { style: { fontFamily: font.sans, fontSize: fs[16], fontWeight: fw[600], color: theme.fg, flex: 1 }, numberOfLines: 1, children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_react_native23.View, { style: { flexDirection: "row", alignItems: "center", gap: sp[2] }, children: [
        !isTodaySelected && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(Button, { variant: "ghost", size: "sm", onPress: goToday, children: loc.today }),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(IconButton, { variant: "ghost", size: "sm", onPress: prev, accessibilityLabel: isExpanded ? "Previous month" : "Previous day", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(Icon, { name: isRTL ? "chevron-right" : "chevron-left", size: icon.md, color: theme.fgMuted }) }),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(IconButton, { variant: "ghost", size: "sm", onPress: next, accessibilityLabel: isExpanded ? "Next month" : "Next day", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(Icon, { name: isRTL ? "chevron-left" : "chevron-right", size: icon.md, color: theme.fgMuted }) }),
        rightAction
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_react_native23.View, { style: { flexDirection: "row", paddingHorizontal: sp[4] }, children: reorderedDayNames.map((d) => /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_react_native23.View, { style: { flex: 1, alignItems: "center", paddingVertical: sp[1] }, children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_react_native23.Text, { style: { fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, textTransform: "uppercase" }, children: d }) }, d)) }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_react_native23.View, { style: { paddingHorizontal: sp[4], overflow: "visible", zIndex: 5 }, children: weeks.map((week, wi) => {
      if (!isExpanded && wi !== shownWeekIdx) return null;
      return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_react_native23.View, { style: { flexDirection: "row" }, children: week.map((day, di) => renderDay(day, di)) }, wi);
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_react_native23.View, { ...panResponder.panHandlers, children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_react_native23.Pressable, { onPress: toggle, style: { alignItems: "center", paddingVertical: sp[3] }, accessibilityRole: "button", accessibilityLabel: "Toggle calendar view", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_react_native23.View, { style: { width: sp[7], height: 3, borderRadius: 1.5, backgroundColor: theme.fgFaint, opacity: 0.4 } }) }) })
  ] });
}

// rn/Tabs.tsx
var import_react_native24 = require("react-native");
var import_jsx_runtime27 = require("react/jsx-runtime");
function Tabs({ tabs, selected, onSelect }) {
  const { theme } = useTheme();
  const containerStyle = {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: theme.border
  };
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react_native24.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react_native24.View, { accessibilityRole: "tablist", style: containerStyle, children: tabs.map((tab, i) => {
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
    return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react_native24.Pressable, { onPress: () => onSelect(i), style: tabStyle, accessibilityRole: "tab", accessibilityState: { selected: isOn }, children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react_native24.Text, { style: txtStyle, children: tab }) }, i);
  }) }) });
}

// rn/BottomAction.tsx
var import_react10 = require("react");
var import_react_native25 = require("react-native");
var import_react_native_safe_area_context = require("react-native-safe-area-context");
var import_jsx_runtime28 = require("react/jsx-runtime");
function BottomAction({ icon: icon3, message, submessage, messageVariant = "default", primary, secondary }) {
  const { theme } = useTheme();
  const insets = (0, import_react10.useContext)(import_react_native_safe_area_context.SafeAreaInsetsContext) || { bottom: 0 };
  const messageColor = messageVariant === "accent" ? theme.accent : messageVariant === "danger" ? theme.danger : theme.fg;
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_react_native25.View, { style: {
    paddingHorizontal: sp[5],
    paddingTop: sp[4],
    paddingBottom: Math.max(sp[4], insets.bottom),
    borderTopWidth: 1,
    borderTopColor: theme.border,
    backgroundColor: theme.bgOverlay,
    gap: sp[3]
  }, children: [
    message && /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_react_native25.View, { style: { flexDirection: "row", alignItems: "flex-start", gap: sp[3] }, children: [
      icon3 && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(Icon, { name: icon3, size: icon.lg, color: messageColor }),
      /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_react_native25.View, { style: { flex: 1 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_react_native25.Text, { style: { fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[600], color: messageColor }, children: message }),
        submessage && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_react_native25.Text, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginTop: sp[0.5] }, children: submessage })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_react_native25.View, { style: { flexDirection: "row", gap: sp[3] }, children: [
      secondary && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_react_native25.View, { style: { flex: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(Button, { variant: secondary.variant || "secondary", fullWidth: true, disabled: secondary.disabled, onPress: secondary.onPress, children: secondary.label }) }),
      primary && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_react_native25.View, { style: { flex: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(Button, { variant: primary.variant || "primary", fullWidth: true, disabled: primary.disabled, onPress: primary.onPress, children: primary.label }) })
    ] })
  ] });
}

// rn/BottomNav.tsx
var import_react11 = __toESM(require("react"));
var import_react_native26 = require("react-native");
var import_react_native_safe_area_context2 = require("react-native-safe-area-context");
var import_jsx_runtime29 = require("react/jsx-runtime");
function BottomNav({ items, selected, onSelect, maxVisible = 4 }) {
  const { theme } = useTheme();
  const insets = import_react11.default.useContext(import_react_native_safe_area_context2.SafeAreaInsetsContext) || { bottom: 0 };
  const [moreOpen, setMoreOpen] = (0, import_react11.useState)(false);
  const needsMore = items.length > maxVisible;
  const visibleItems = needsMore ? items.slice(0, maxVisible - 1) : items;
  const overflowItems = needsMore ? items.slice(maxVisible - 1) : [];
  const isOverflowSelected = needsMore && selected >= maxVisible - 1;
  const barPaddingBottom = Math.max(sp[4], insets.bottom);
  function renderIcon(item, clr) {
    return typeof item.icon === "string" ? /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Icon, { name: item.icon, size: icon.tab, color: clr }) : item.icon(clr, icon.tab);
  }
  function renderTab(item, index, isOn) {
    const iconColor = isOn ? theme.accent : theme.fgSubtle;
    return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_react_native26.Pressable, { onPress: () => onSelect(index), style: { alignItems: "center", gap: sp[1], minWidth: 56, position: "relative" }, accessibilityRole: "tab", accessibilityState: { selected: isOn }, children: [
      isOn && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native26.View, { style: { position: "absolute", top: -sp[3] - sp[1], width: sp[6], height: sp[0.5], backgroundColor: theme.accent, borderBottomLeftRadius: r[1], borderBottomRightRadius: r[1], alignSelf: "center" } }),
      renderIcon(item, iconColor),
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native26.Text, { style: { fontFamily: font.sans, fontSize: fs[10], fontWeight: fw[600], letterSpacing: 0.8, textTransform: "uppercase", color: isOn ? theme.accent : theme.fgSubtle }, children: item.label }),
      item.badge != null && item.badge > 0 && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native26.View, { style: { position: "absolute", top: 0, right: sp[1], minWidth: 16, height: 16, borderRadius: 8, backgroundColor: theme.danger, alignItems: "center", justifyContent: "center", paddingHorizontal: 4 }, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native26.Text, { style: { fontFamily: font.mono, fontSize: fs[9], fontWeight: fw[500], color: color.chalk[100] }, children: item.badge }) })
    ] }, index);
  }
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_react_native26.View, { style: { position: "relative" }, children: [
    moreOpen && needsMore && /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_jsx_runtime29.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native26.Pressable, { onPress: () => setMoreOpen(false), style: { position: "absolute", top: -9999, left: 0, right: 0, bottom: 0, height: 1e4 } }),
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native26.View, { style: {
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
        return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
          import_react_native26.Pressable,
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
              /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native26.Text, { style: { fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: isOn ? theme.accent : theme.fg, flex: 1 }, children: item.label }),
              item.badge != null && item.badge > 0 && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native26.View, { style: { minWidth: 20, height: 20, borderRadius: 10, backgroundColor: theme.danger, alignItems: "center", justifyContent: "center", paddingHorizontal: 4 }, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native26.Text, { style: { fontFamily: font.mono, fontSize: fs[9], color: color.chalk[100] }, children: item.badge }) })
            ]
          },
          realIndex
        );
      }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_react_native26.View, { accessibilityRole: "tablist", style: {
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
      needsMore && /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_react_native26.Pressable, { onPress: () => setMoreOpen(!moreOpen), style: { alignItems: "center", gap: sp[1], minWidth: 56, position: "relative" }, children: [
        isOverflowSelected && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native26.View, { style: { position: "absolute", top: -sp[3] - sp[1], width: sp[6], height: sp[0.5], backgroundColor: theme.accent, borderBottomLeftRadius: r[1], borderBottomRightRadius: r[1], alignSelf: "center" } }),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Icon, { name: "more", size: icon.tab, color: isOverflowSelected ? theme.accent : theme.fgSubtle }),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native26.Text, { style: { fontFamily: font.sans, fontSize: fs[10], fontWeight: fw[600], letterSpacing: 0.8, textTransform: "uppercase", color: isOverflowSelected ? theme.accent : theme.fgSubtle }, children: "More" }),
        overflowItems.some((it) => it.badge && it.badge > 0) && !moreOpen && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native26.View, { style: { position: "absolute", top: 0, right: sp[1], width: 8, height: 8, borderRadius: 4, backgroundColor: theme.danger } })
      ] })
    ] })
  ] });
}

// rn/TitleBar.tsx
var import_react_native27 = require("react-native");
var import_jsx_runtime30 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(import_react_native27.View, { style: barStyle, children: [
    !isLarge && /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(import_jsx_runtime30.Fragment, { children: [
      onBack && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react_native27.Pressable, { onPress: onBack, hitSlop: 8, accessibilityRole: "button", accessibilityLabel: "Back", children: backIcon || /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Icon, { name: import_react_native27.I18nManager.isRTL ? "chevron-right" : "chevron-left", size: icon.lg, color: theme.fgMuted }) }),
      /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react_native27.Text, { style: titleStyle, numberOfLines: 1, children: title }),
      rightAction
    ] }),
    isLarge && /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(import_jsx_runtime30.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(import_react_native27.View, { style: { flexDirection: "row", alignItems: "center", gap: sp[3], width: "100%" }, children: [
        onBack && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react_native27.Pressable, { onPress: onBack, hitSlop: 8, accessibilityRole: "button", accessibilityLabel: "Back", children: backIcon || /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Icon, { name: import_react_native27.I18nManager.isRTL ? "chevron-right" : "chevron-left", size: icon.lg, color: theme.fgMuted }) }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react_native27.View, { style: { flex: 1 } }),
        rightAction
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react_native27.Text, { style: titleStyle, children: title }),
      subtitle && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react_native27.Text, { style: subStyle, children: subtitle })
    ] })
  ] });
}

// rn/FilterBar.tsx
var import_react_native28 = require("react-native");
var import_jsx_runtime31 = require("react/jsx-runtime");
function FilterBar({ items, onToggle }) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_react_native28.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: sp[2], paddingHorizontal: sp[4] }, children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
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
var import_react_native29 = require("react-native");
var import_jsx_runtime32 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(import_react_native29.View, { accessibilityRole: "alert", style: {
    flexDirection: "row",
    gap: sp[3],
    paddingVertical: sp[4],
    paddingHorizontal: sp[4],
    borderRadius: r[2],
    backgroundColor: s.bg,
    borderWidth: 1,
    borderColor: s.border
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(Icon, { name: icon3 || VARIANT_ICON[variant], size: icon.lg, color: s.iconColor }),
    /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(import_react_native29.View, { style: { flex: 1 }, children: [
      title && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_react_native29.Text, { style: { fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[600], color: s.titleColor }, children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_react_native29.Text, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginTop: title ? sp[0.5] : 0, lineHeight: fs[13] * 1.5 }, children })
    ] })
  ] });
}

// rn/Toast.tsx
var import_react12 = __toESM(require("react"));
var import_react_native30 = require("react-native");
var import_react_native_reanimated4 = __toESM(require("react-native-reanimated"));
var import_react_native_safe_area_context3 = require("react-native-safe-area-context");
var import_jsx_runtime33 = require("react/jsx-runtime");
function Toast({ message, variant = "info", visible, onDismiss, duration = 4e3 }) {
  const { theme } = useTheme();
  const insets = import_react12.default.useContext(import_react_native_safe_area_context3.SafeAreaInsetsContext) || { top: 0 };
  const translateY = (0, import_react_native_reanimated4.useSharedValue)(-40);
  const opacity = (0, import_react_native_reanimated4.useSharedValue)(0);
  const shown = (0, import_react12.useRef)(false);
  const dismiss = (0, import_react12.useCallback)(() => {
    const config = { duration: dur[1], easing: import_react_native_reanimated4.Easing.bezier(0.4, 0, 1, 1) };
    translateY.value = (0, import_react_native_reanimated4.withTiming)(-40, config);
    opacity.value = (0, import_react_native_reanimated4.withTiming)(0, config, () => {
      (0, import_react_native_reanimated4.runOnJS)(onDismiss)();
    });
  }, [onDismiss]);
  (0, import_react12.useEffect)(() => {
    if (visible && !shown.current) {
      shown.current = true;
      const config = { duration: dur[2], easing: import_react_native_reanimated4.Easing.bezier(0.22, 0.61, 0.36, 1) };
      translateY.value = (0, import_react_native_reanimated4.withTiming)(0, config);
      opacity.value = (0, import_react_native_reanimated4.withTiming)(1, config);
      const timer = setTimeout(() => dismiss(), duration);
      return () => clearTimeout(timer);
    }
    if (!visible && shown.current) {
      shown.current = false;
      translateY.value = -40;
      opacity.value = 0;
    }
  }, [visible]);
  const animatedStyle = (0, import_react_native_reanimated4.useAnimatedStyle)(() => ({
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
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_react_native_reanimated4.default.View, { accessibilityRole: "alert", accessibilityLiveRegion: "polite", style: [{
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
  }, animatedStyle], children: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
    import_react_native30.Pressable,
    {
      onPress: dismiss,
      accessibilityRole: "button",
      accessibilityLabel: "Dismiss",
      style: { flexDirection: "row", alignItems: "center", gap: sp[3], padding: sp[4] },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(Icon, { name: iconMap[variant], size: icon.lg, color: s.iconCol }),
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_react_native30.Text, { style: { fontFamily: font.sans, fontSize: fs[14], color: theme.fg, flex: 1 }, children: message })
      ]
    }
  ) });
}

// rn/ToastProvider.tsx
var import_react13 = require("react");
var import_jsx_runtime34 = require("react/jsx-runtime");
var ToastContext = (0, import_react13.createContext)({ show: () => {
} });
function useToast() {
  return (0, import_react13.useContext)(ToastContext);
}
function ToastProvider({ children }) {
  const [current, setCurrent] = (0, import_react13.useState)(null);
  const [visible, setVisible] = (0, import_react13.useState)(false);
  const queue = (0, import_react13.useRef)([]);
  const showNext = (0, import_react13.useCallback)(() => {
    if (queue.current.length > 0) {
      const next = queue.current.shift();
      setCurrent(next);
      setVisible(true);
    }
  }, []);
  const show = (0, import_react13.useCallback)((options) => {
    if (visible) {
      queue.current.push(options);
    } else {
      setCurrent(options);
      setVisible(true);
    }
  }, [visible]);
  const handleDismiss = (0, import_react13.useCallback)(() => {
    setVisible(false);
    setCurrent(null);
    setTimeout(showNext, dur[1]);
  }, [showNext]);
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(ToastContext.Provider, { value: { show }, children: [
    children,
    current && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
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
var import_react14 = require("react");
var import_react_native31 = require("react-native");
var import_react_native_reanimated5 = __toESM(require("react-native-reanimated"));
var import_jsx_runtime35 = require("react/jsx-runtime");
function Dialog({ visible, onClose, title, body, primaryLabel = "Confirm", secondaryLabel = "Cancel", onPrimary, onSecondary, danger }) {
  const { theme } = useTheme();
  const scale = (0, import_react_native_reanimated5.useSharedValue)(0.92);
  const contentOpacity = (0, import_react_native_reanimated5.useSharedValue)(0);
  (0, import_react14.useEffect)(() => {
    if (visible) {
      scale.value = 0.92;
      contentOpacity.value = 0;
      const config = { duration: dur[2], easing: import_react_native_reanimated5.Easing.bezier(0.22, 0.61, 0.36, 1) };
      scale.value = (0, import_react_native_reanimated5.withTiming)(1, config);
      contentOpacity.value = (0, import_react_native_reanimated5.withTiming)(1, config);
    }
  }, [visible]);
  const animatedStyle = (0, import_react_native_reanimated5.useAnimatedStyle)(() => ({
    transform: [{ scale: scale.value }],
    opacity: contentOpacity.value
  }));
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react_native31.Modal, { visible, transparent: true, animationType: "fade", onRequestClose: onClose, accessibilityViewIsModal: true, children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react_native31.KeyboardAvoidingView, { style: { flex: 1 }, behavior: import_react_native31.Platform.OS === "ios" ? "padding" : void 0, children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react_native31.Pressable, { style: { flex: 1, backgroundColor: "rgba(6,9,19,0.5)", justifyContent: "center", alignItems: "center", padding: sp[7] }, onPress: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react_native_reanimated5.default.View, { style: [{ width: "100%", maxWidth: 320 }, animatedStyle], children: /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(
    import_react_native31.Pressable,
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
        /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react_native31.Text, { style: { fontFamily: font.serif, fontSize: fs[24], fontWeight: fw[500], color: theme.fg, marginBottom: sp[2] }, children: title }),
        body && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react_native31.Text, { style: { fontFamily: font.sans, fontSize: fs[14], color: theme.fgMuted, lineHeight: fs[14] * 1.5, marginBottom: sp[5] }, children: body }),
        /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(import_react_native31.View, { style: { flexDirection: "row", gap: sp[3] }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react_native31.View, { style: { flex: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(Button, { variant: "ghost", onPress: onSecondary || onClose, children: secondaryLabel }) }),
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react_native31.View, { style: { flex: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(Button, { variant: danger ? "danger" : "primary", onPress: onPrimary || onClose, children: primaryLabel }) })
        ] })
      ]
    }
  ) }) }) }) });
}

// rn/BottomSheet.tsx
var import_react15 = __toESM(require("react"));
var import_react_native32 = require("react-native");
var import_react_native_safe_area_context4 = require("react-native-safe-area-context");
var import_jsx_runtime36 = require("react/jsx-runtime");
function BottomSheet({ visible, onClose, title, children, actions, full }) {
  const { theme } = useTheme();
  const insets = import_react15.default.useContext(import_react_native_safe_area_context4.SafeAreaInsetsContext) || { bottom: 0 };
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
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_react_native32.Modal, { visible, transparent: true, animationType: "slide", onRequestClose: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_react_native32.KeyboardAvoidingView, { style: { flex: 1 }, behavior: import_react_native32.Platform.OS === "ios" ? "padding" : void 0, children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_react_native32.Pressable, { style: scrimStyle, onPress: onClose, accessibilityRole: "none", children: /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(import_react_native32.Pressable, { style: sheetStyle, onPress: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_react_native32.View, { style: handleStyle }),
    title && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_react_native32.View, { style: { paddingHorizontal: sp[6], paddingBottom: sp[2] }, children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_react_native32.Text, { style: { fontFamily: font.serif, fontSize: fs[18], color: theme.fg }, children: title }) }),
    /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_react_native32.View, { style: { paddingHorizontal: sp[6], paddingBottom: actions ? sp[5] : Math.max(sp[5], insets.bottom), ...full ? { flex: 1 } : {} }, children }),
    actions && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_react_native32.View, { style: { borderTopWidth: 1, borderTopColor: theme.border, padding: sp[4], paddingBottom: Math.max(sp[4], insets.bottom), paddingHorizontal: sp[6] }, children: actions })
  ] }) }) }) });
}

// rn/FullSheet.tsx
var import_react16 = __toESM(require("react"));
var import_react_native33 = require("react-native");
var import_react_native_safe_area_context5 = require("react-native-safe-area-context");
var import_jsx_runtime37 = require("react/jsx-runtime");
function FullSheetContent({ onClose, title, children }) {
  const { theme } = useTheme();
  const insets = import_react16.default.useContext(import_react_native_safe_area_context5.SafeAreaInsetsContext) || { top: 0, bottom: 0 };
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(import_react_native33.View, { style: { flex: 1, backgroundColor: theme.bg, paddingTop: insets.top }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(import_react_native33.View, { style: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: sp[5], paddingVertical: sp[3], borderBottomWidth: 1, borderBottomColor: theme.divider }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_react_native33.Text, { style: { fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: theme.fg, flex: 1 }, numberOfLines: 1, children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_react_native33.Pressable, { onPress: onClose, hitSlop: 8, accessibilityRole: "button", accessibilityLabel: "Close", children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_react_native33.Text, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgSubtle }, children: "Close" }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_react_native33.ScrollView, { style: { flex: 1 }, contentContainerStyle: { padding: sp[5], paddingBottom: sp[5] + insets.bottom }, children })
  ] });
}
function FullSheet({ visible, onClose, title, children }) {
  if (!visible) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_react_native33.Modal, { visible, animationType: "slide", onRequestClose: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_react_native_safe_area_context5.SafeAreaProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(FullSheetContent, { onClose, title, children }) }) });
}

// rn/Tooltip.tsx
var import_react17 = require("react");
var import_react_native34 = require("react-native");
var import_jsx_runtime38 = require("react/jsx-runtime");
function Tooltip({ text, children }) {
  const { theme } = useTheme();
  const [visible, setVisible] = (0, import_react17.useState)(false);
  const [triggerWidth, setTriggerWidth] = (0, import_react17.useState)(0);
  const tipWidth = Math.max(100, Math.min(200, text.length * 7 + 24));
  const hideTimer = (0, import_react17.useRef)(null);
  const onLayout = (0, import_react17.useCallback)((e) => {
    setTriggerWidth(e.nativeEvent.layout.width);
  }, []);
  const show = (0, import_react17.useCallback)(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setVisible(true);
  }, []);
  const hide = (0, import_react17.useCallback)(() => {
    hideTimer.current = setTimeout(() => setVisible(false), 150);
  }, []);
  const autoHide = (0, import_react17.useCallback)(() => {
    hideTimer.current = setTimeout(() => setVisible(false), 3e3);
  }, []);
  const webHover = import_react_native34.Platform.OS === "web" ? {
    onMouseEnter: show,
    onMouseLeave: hide
  } : {};
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(import_react_native34.View, { style: { position: "relative" }, onLayout, ...webHover, children: [
    /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
      import_react_native34.Pressable,
      {
        onLongPress: () => {
          show();
          autoHide();
        },
        onPressOut: import_react_native34.Platform.OS !== "web" ? () => setVisible(false) : void 0,
        accessibilityRole: "button",
        children
      }
    ),
    visible && /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
      import_react_native34.View,
      {
        accessibilityRole: "tooltip",
        ...import_react_native34.Platform.OS === "web" ? { onMouseEnter: show, onMouseLeave: hide } : {},
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
          /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_react_native34.Text, { style: { fontFamily: font.mono, fontSize: fs[11], color: theme.bg, textAlign: "center" }, children: text }),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_react_native34.View, { style: { position: "absolute", bottom: -sp[1], alignSelf: "center", width: sp[2], height: sp[2], backgroundColor: theme.fg, transform: [{ rotate: "45deg" }] } })
        ]
      }
    )
  ] });
}

// rn/SessionBar.tsx
var import_react18 = require("react");
var import_react_native35 = require("react-native");
var import_jsx_runtime39 = require("react/jsx-runtime");
var heights2 = { sm: sp[1], md: sp[1], lg: sp[2] };
function SessionBar({ segments, size = "md", pageSize = 10 }) {
  const { theme } = useTheme();
  const totalPages = Math.ceil(segments.length / pageSize);
  const needsPaging = totalPages > 1;
  const currentIdx = segments.indexOf("current");
  const autoPage = currentIdx >= 0 ? Math.floor(currentIdx / pageSize) : 0;
  const [page, setPage] = (0, import_react18.useState)(autoPage);
  (0, import_react18.useEffect)(() => {
    setPage(autoPage);
  }, [autoPage]);
  const start = page * pageSize;
  const visibleSegs = (0, import_react18.useMemo)(() => segments.slice(start, start + pageSize), [segments, start, pageSize]);
  const canPrev = page > 0;
  const canNext = page < totalPages - 1;
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
  const h3 = heights2[size];
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(import_react_native35.View, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(import_react_native35.View, { style: { flexDirection: "row", alignItems: "center", gap: sp[1] }, children: [
      needsPaging && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(IconButton, { variant: "ghost", size: "sm", disabled: !canPrev, onPress: canPrev ? () => setPage((p) => p - 1) : void 0, accessibilityLabel: "Previous questions", children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(Icon, { name: "chevron-left", size: 14, color: theme.fgMuted }) }),
      /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_react_native35.View, { style: { flex: 1, flexDirection: "row", gap: sp[0.5], height: h3 }, children: visibleSegs.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_react_native35.View, { style: { flex: 1, borderRadius: r[1], backgroundColor: segColor(s) } }, start + i)) }),
      needsPaging && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(IconButton, { variant: "ghost", size: "sm", disabled: !canNext, onPress: canNext ? () => setPage((p) => p + 1) : void 0, accessibilityLabel: "Next questions", children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(Icon, { name: "chevron-right", size: 14, color: theme.fgMuted }) })
    ] }),
    !needsPaging && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_react_native35.Text, { style: { fontFamily: font.mono, fontSize: fs[9], color: theme.fgFaint, textAlign: "center", marginTop: sp[1] }, children: currentIdx >= 0 ? `Question ${currentIdx + 1} of ${segments.length}` : `${segments.length} questions` })
  ] });
}

// rn/Progress.tsx
var import_react_native36 = require("react-native");
var import_react_native_svg3 = __toESM(require("react-native-svg"));
var import_jsx_runtime40 = require("react/jsx-runtime");
function LinearProgress({ value, height = sp[1], color: color3 }) {
  const { theme } = useTheme();
  const pct = Math.max(0, Math.min(100, value));
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_react_native36.View, { accessibilityRole: "progressbar", accessibilityValue: { now: pct, min: 0, max: 100 }, style: { height, borderRadius: r.pill, backgroundColor: theme.border, overflow: "hidden" }, children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_react_native36.View, { style: { height: "100%", width: `${pct}%`, borderRadius: r.pill, backgroundColor: color3 || theme.accent } }) });
}
function CircularProgress({ value, size = sp[9], strokeWidth = 3, showValue, color: color3 }) {
  const { theme } = useTheme();
  const pct = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - pct / 100);
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(import_react_native36.View, { style: { width: size, height: size, alignItems: "center", justifyContent: "center" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(import_react_native_svg3.default, { width: size, height: size, style: { position: "absolute", transform: [{ rotate: "-90deg" }] }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_react_native_svg3.Circle, { cx: size / 2, cy: size / 2, r: radius, stroke: theme.border, strokeWidth, fill: "none" }),
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_react_native_svg3.Circle, { cx: size / 2, cy: size / 2, r: radius, stroke: color3 || theme.accent, strokeWidth, fill: "none", strokeLinecap: "round", strokeDasharray: circumference, strokeDashoffset })
    ] }),
    showValue && /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(import_react_native36.Text, { style: { fontFamily: font.mono, fontSize: fs[13], fontWeight: fw[500], color: theme.fg }, children: [
      Math.round(pct),
      "%"
    ] })
  ] });
}

// rn/SessionCard.tsx
var import_react_native37 = require("react-native");
var import_jsx_runtime41 = require("react/jsx-runtime");
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
      return /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(WaypointMarker, { state: isDoneAssessment ? "done" : "current" });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(import_react_native37.View, { style: {
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
    if (state === "live") return /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(import_react_native37.View, { style: { flexDirection: "row", alignItems: "center", gap: sp[2], height: 28, paddingHorizontal: sp[3], borderRadius: r[1], backgroundColor: theme.signalSoft, borderWidth: 1, borderColor: theme.signalBorder }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(import_react_native37.View, { style: { width: icon.xs, height: icon.xs, borderRadius: icon.xs / 2, backgroundColor: theme.signalBright } }),
      /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(import_react_native37.Text, { style: { fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: theme.signalBright }, children: "Live" })
    ] });
    if (state === "soon") return /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(import_react_native37.Text, { style: { fontFamily: font.mono, fontSize: fs[12], color: theme.signalBright }, children: "Soon" });
    if (state === "done") return /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(import_react_native37.Text, { style: { fontFamily: font.mono, fontSize: fs[12], color: theme.fgMuted }, children: "Ended" });
    if (state === "cancelled") return /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(import_react_native37.Text, { style: { fontFamily: font.mono, fontSize: fs[12], color: theme.danger }, children: "Cancelled" });
    return /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(import_react_native37.Text, { style: { fontFamily: font.mono, fontSize: fs[12], color: theme.fgMuted }, children: statusText || "" });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(import_react_native37.Pressable, { onPress, accessibilityRole: "button", style: ({ pressed }) => [containerStyle, pressed && { backgroundColor: theme.hoverOverlay }], children: [
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(import_react_native37.Text, { style: timeStyle, children: time }),
    assessment && renderIndicator(),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(import_react_native37.View, { style: { flex: 1 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(import_react_native37.Text, { style: titleStyle, children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(import_react_native37.Text, { style: metaStyle, children: meta })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(import_react_native37.View, { style: { minWidth: sp[9], alignItems: "flex-end" }, children: renderStatus() })
  ] });
}

// rn/HomeworkCard.tsx
var import_react_native38 = require("react-native");
var import_jsx_runtime42 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(import_react_native38.Pressable, { onPress, accessibilityRole: "button", style: ({ pressed }) => [{
    flexDirection: "row",
    alignItems: "center",
    gap: sp[4],
    paddingVertical: sp[4],
    paddingHorizontal: sp[5],
    borderBottomWidth: 1,
    borderBottomColor: theme.divider
  }, pressed && { backgroundColor: theme.hoverOverlay }], children: [
    /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(import_react_native38.View, { style: { flex: 1 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(import_react_native38.Text, { style: { fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: isDone ? theme.fgMuted : theme.fg }, children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(import_react_native38.Text, { style: { fontFamily: font.sans, fontSize: fs[12], color: theme.fgFaint, marginTop: sp[0.5] }, children: [
        subject,
        " \xB7 ",
        questions,
        " questions"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(import_react_native38.Text, { style: { fontFamily: font.mono, fontSize: fs[11], color: statusColor[status], fontWeight: isOverdue ? fw[600] : fw[500] }, children: statusLabel[status] })
  ] });
}

// rn/QuizOption.tsx
var import_react_native39 = require("react-native");
var import_jsx_runtime43 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(
    import_react_native39.Pressable,
    {
      onPress,
      disabled: state === "disabled" || state === "correct" || state === "incorrect",
      accessibilityRole: "button",
      accessibilityState: { selected: state === "selected", disabled: state === "disabled" },
      style: ({ pressed }) => [containerStyle, pressed && { backgroundColor: theme.hoverOverlay }],
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_react_native39.View, { style: labelStyle, children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_react_native39.Text, { style: labelTextStyle, children: label }) }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(import_react_native39.View, { style: { flex: 1 }, children: [
          image && /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_react_native39.View, { style: { width: 120, height: 120, borderRadius: r[1], overflow: "hidden", marginBottom: text ? sp[2] : 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_react_native39.Image, { source: image, style: { width: "100%", height: "100%" }, resizeMode: "cover" }) }),
          text ? /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_react_native39.Text, { style: optionTextStyle, children: text }) : null
        ] })
      ]
    }
  );
}

// rn/Question.tsx
var import_react_native49 = require("react-native");

// rn/MatchQuestion.tsx
var import_react23 = __toESM(require("react"));
var import_react_native44 = require("react-native");

// rn/DragItem.tsx
var import_react19 = require("react");
var import_react_native40 = require("react-native");
var import_react_native_gesture_handler = require("react-native-gesture-handler");
var import_react_native_reanimated6 = __toESM(require("react-native-reanimated"));
var import_jsx_runtime44 = require("react/jsx-runtime");
var TIMING_CONFIG = { duration: dur[2], easing: import_react_native_reanimated6.Easing.bezier(0.22, 0.61, 0.36, 1) };
var IMG_DEFAULT = 90;
function DragItemContent({ item, fontSize = fs[14] }) {
  const { theme } = useTheme();
  if (item.image) {
    const size = item.imageSize || IMG_DEFAULT;
    return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_react_native40.View, { style: { width: size, height: size, borderRadius: r[1], overflow: "hidden" }, children: /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_react_native40.Image, { source: item.image, style: { width: "100%", height: "100%" }, resizeMode: "cover" }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_react_native40.Text, { style: { fontFamily: font.sans, fontSize, fontWeight: fw[500], color: theme.fg, ...import_react_native40.Platform.OS === "web" ? { userSelect: "none" } : {} }, children: item.label });
}
function DragItem({ item, state = "idle", onDragStart, onDragMove, onDragEnd }) {
  const { theme } = useTheme();
  const translateX = (0, import_react_native_reanimated6.useSharedValue)(0);
  const translateY = (0, import_react_native_reanimated6.useSharedValue)(0);
  const scale = (0, import_react_native_reanimated6.useSharedValue)(1);
  const zIdx = (0, import_react_native_reanimated6.useSharedValue)(1);
  const isDragging = state === "dragging";
  const isPlaced = state === "placed" || state === "correct" || state === "incorrect";
  const isDisabled = state === "disabled";
  const isLocked = state === "correct" || state === "incorrect";
  const canDrag = !isDisabled && !isLocked;
  const cbRef = (0, import_react19.useRef)({ onDragStart, onDragMove, onDragEnd });
  cbRef.current = { onDragStart, onDragMove, onDragEnd };
  const gesture = import_react_native_gesture_handler.Gesture.Pan().enabled(canDrag).onStart(() => {
    zIdx.value = 100;
    scale.value = (0, import_react_native_reanimated6.withTiming)(1.05, TIMING_CONFIG);
    if (cbRef.current.onDragStart) (0, import_react_native_reanimated6.runOnJS)(cbRef.current.onDragStart)(item.id);
  }).onUpdate((e) => {
    translateX.value = e.translationX;
    translateY.value = e.translationY;
    if (cbRef.current.onDragMove) (0, import_react_native_reanimated6.runOnJS)(cbRef.current.onDragMove)(item.id, e.absoluteX, e.absoluteY);
  }).onEnd((e) => {
    if (cbRef.current.onDragEnd) (0, import_react_native_reanimated6.runOnJS)(cbRef.current.onDragEnd)(item.id, e.absoluteX, e.absoluteY);
    translateX.value = (0, import_react_native_reanimated6.withTiming)(0, TIMING_CONFIG);
    translateY.value = (0, import_react_native_reanimated6.withTiming)(0, TIMING_CONFIG);
    scale.value = (0, import_react_native_reanimated6.withTiming)(1, TIMING_CONFIG);
    zIdx.value = 1;
  }).onFinalize(() => {
    translateX.value = (0, import_react_native_reanimated6.withTiming)(0, TIMING_CONFIG);
    translateY.value = (0, import_react_native_reanimated6.withTiming)(0, TIMING_CONFIG);
    scale.value = (0, import_react_native_reanimated6.withTiming)(1, TIMING_CONFIG);
    zIdx.value = 1;
  });
  const animatedStyle = (0, import_react_native_reanimated6.useAnimatedStyle)(() => ({
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
    ...import_react_native40.Platform.OS === "web" ? { userSelect: "none", cursor: canDrag ? "grab" : "default" } : {}
  };
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_react_native_gesture_handler.GestureDetector, { gesture, children: /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_react_native_reanimated6.default.View, { style: [containerStyle, animatedStyle], children: /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(DragItemContent, { item }) }) });
}

// rn/DropZone.tsx
var import_react20 = __toESM(require("react"));
var import_react_native41 = require("react-native");
var import_jsx_runtime45 = require("react/jsx-runtime");
function DropZone({ id, label, state = "empty", children, onMeasure, minWidth, minHeight, inline, neutral }) {
  const { theme } = useTheme();
  const ref = (0, import_react20.useRef)(null);
  const onMeasureRef = (0, import_react20.useRef)(onMeasure);
  onMeasureRef.current = onMeasure;
  const measure = (0, import_react20.useCallback)(() => {
    setTimeout(() => {
      ref.current?.measureInWindow((x, y, width, height) => {
        if (width > 0 && height > 0) {
          onMeasureRef.current?.(id, { x, y, width, height });
        }
      });
    }, 50);
  }, [id]);
  import_react20.default.useEffect(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(import_react_native41.View, { ref, onLayout: handleLayout, style, collapsable: false, children: children || (label ? /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(import_react_native41.Text, { style: { fontFamily: font.sans, fontSize: fs[12], color: theme.fgFaint }, children: label }) : null) });
}

// rn/PlacedItem.tsx
var import_react21 = require("react");
var import_react_native42 = require("react-native");
var import_react_native_gesture_handler2 = require("react-native-gesture-handler");
var import_react_native_reanimated7 = __toESM(require("react-native-reanimated"));
var import_jsx_runtime46 = require("react/jsx-runtime");
var TIMING = { duration: dur[2], easing: import_react_native_reanimated7.Easing.bezier(0.22, 0.61, 0.36, 1) };
function PlacedItem({ item, itemState, zoneState, onDragStart, onDragMove, onDragEnd, theme, fontSize, compact }) {
  const tx = (0, import_react_native_reanimated7.useSharedValue)(0);
  const ty = (0, import_react_native_reanimated7.useSharedValue)(0);
  const scale = (0, import_react_native_reanimated7.useSharedValue)(1);
  const zIdx = (0, import_react_native_reanimated7.useSharedValue)(1);
  const isLocked = itemState === "correct" || itemState === "incorrect";
  const cbRef = (0, import_react21.useRef)({ onDragStart, onDragMove, onDragEnd });
  cbRef.current = { onDragStart, onDragMove, onDragEnd };
  const gesture = import_react_native_gesture_handler2.Gesture.Pan().enabled(!isLocked).onStart(() => {
    zIdx.value = 100;
    scale.value = (0, import_react_native_reanimated7.withTiming)(1.05, TIMING);
    if (cbRef.current.onDragStart) (0, import_react_native_reanimated7.runOnJS)(cbRef.current.onDragStart)(item.id);
  }).onUpdate((e) => {
    tx.value = e.translationX;
    ty.value = e.translationY;
    if (cbRef.current.onDragMove) (0, import_react_native_reanimated7.runOnJS)(cbRef.current.onDragMove)(item.id, e.absoluteX, e.absoluteY);
  }).onEnd((e) => {
    if (cbRef.current.onDragEnd) (0, import_react_native_reanimated7.runOnJS)(cbRef.current.onDragEnd)(item.id, e.absoluteX, e.absoluteY);
    tx.value = (0, import_react_native_reanimated7.withTiming)(0, TIMING);
    ty.value = (0, import_react_native_reanimated7.withTiming)(0, TIMING);
    scale.value = (0, import_react_native_reanimated7.withTiming)(1, TIMING);
    zIdx.value = 1;
  }).onFinalize(() => {
    tx.value = (0, import_react_native_reanimated7.withTiming)(0, TIMING);
    ty.value = (0, import_react_native_reanimated7.withTiming)(0, TIMING);
    scale.value = (0, import_react_native_reanimated7.withTiming)(1, TIMING);
    zIdx.value = 1;
  });
  const animStyle = (0, import_react_native_reanimated7.useAnimatedStyle)(() => ({
    transform: [{ translateX: tx.value }, { translateY: ty.value }, { scale: scale.value }],
    zIndex: zIdx.value
  }));
  const isHovered = zoneState === "hovering";
  const isDrag = itemState === "dragging";
  const bg = isHovered ? theme.accentSoft : theme.bgRaised;
  const border = itemState === "correct" ? theme.accent : itemState === "incorrect" ? theme.danger : isDrag ? theme.accent : isHovered ? theme.accent : theme.borderStrong;
  const borderStyle = isHovered ? "dashed" : "solid";
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(import_react_native_gesture_handler2.GestureDetector, { gesture, children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(import_react_native_reanimated7.default.View, { style: [{
    backgroundColor: bg,
    borderRadius: r[2],
    borderWidth: 1.5,
    borderStyle,
    borderColor: border,
    paddingVertical: item.image ? 0 : compact ? sp[0.5] : sp[2],
    paddingHorizontal: item.image ? 0 : compact ? sp[2] : sp[3],
    alignItems: "center",
    overflow: "hidden",
    ...import_react_native42.Platform.OS === "web" ? { userSelect: "none", cursor: isLocked ? "default" : "grab" } : {}
  }, animStyle], children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(DragItemContent, { item, fontSize }) }) });
}

// rn/useDragDrop.ts
var import_react22 = require("react");
function useDragDrop({ items, zones, correctMapping, allowMultiplePerZone, showZoneResults, onAnswer }) {
  const onAnswerRef = (0, import_react22.useRef)(onAnswer);
  onAnswerRef.current = onAnswer;
  const zoneBounds = (0, import_react22.useRef)({});
  const [draggingId, setDraggingId] = (0, import_react22.useState)(null);
  const [hoveringZone, setHoveringZone] = (0, import_react22.useState)(null);
  const [state, setState] = (0, import_react22.useState)(() => ({
    itemStates: Object.fromEntries(items.map((i) => [i.id, "idle"])),
    zoneStates: Object.fromEntries(zones.map((z) => [z, "empty"])),
    placements: {},
    submitted: false
  }));
  const registerZone = (0, import_react22.useCallback)((id, bounds) => {
    zoneBounds.current[id] = bounds;
  }, []);
  const findZoneAt = (0, import_react22.useCallback)((x, y) => {
    for (const [id, b] of Object.entries(zoneBounds.current)) {
      if (x >= b.x && x <= b.x + b.width && y >= b.y && y <= b.y + b.height) {
        return id;
      }
    }
    return null;
  }, []);
  const onDragStart = (0, import_react22.useCallback)((id) => {
    if (state.submitted) return;
    setDraggingId(id);
    setState((prev) => ({
      ...prev,
      itemStates: { ...prev.itemStates, [id]: "dragging" }
    }));
  }, [state.submitted]);
  const onDragMove = (0, import_react22.useCallback)((id, x, y) => {
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
  const onDragEnd = (0, import_react22.useCallback)((id, x, y) => {
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
  const reveal = (0, import_react22.useCallback)((results) => {
    setState((prev) => {
      const nextItemStates = { ...prev.itemStates };
      for (const [itemId, isCorrect] of Object.entries(results)) {
        nextItemStates[itemId] = isCorrect ? "correct" : "incorrect";
      }
      return { ...prev, itemStates: nextItemStates, submitted: true };
    });
  }, []);
  const submit = (0, import_react22.useCallback)(() => {
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
  const reset = (0, import_react22.useCallback)(() => {
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
var import_react_native43 = require("react-native");
var import_jsx_runtime47 = require("react/jsx-runtime");
function QuestionFrame({ instruction, children, options, optionsPosition = "bottom", showButtons = true, submitted, allPlaced, onSubmit, onReset }) {
  return /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(import_react_native43.View, { style: { gap: sp[4], overflow: "visible" }, children: [
    instruction && /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(import_react_native43.Text, { style: { fontFamily: font.sans, fontSize: fs[13] }, children: instruction }),
    optionsPosition === "top" && options,
    children,
    optionsPosition === "bottom" && options,
    showButtons && /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(import_react_native43.View, { style: { flexDirection: "row", gap: sp[3] }, children: [
      !submitted && onSubmit && /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(Button, { variant: "primary", size: "sm", disabled: !allPlaced, onPress: onSubmit, children: "Check" }),
      submitted && onReset && /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(Button, { variant: "secondary", size: "sm", onPress: onReset, children: "Try again" })
    ] })
  ] });
}

// rn/MatchQuestion.tsx
var import_jsx_runtime48 = require("react/jsx-runtime");
function MatchQuestion({ items, targets, correctMapping, instruction, optionsPosition, showButtons, onAnswer, onReady }) {
  const { theme } = useTheme();
  const dd = useDragDrop({ items, zones: targets.map((t) => t.id), correctMapping, onAnswer });
  const onReadyRef = import_react23.default.useRef(onReady);
  onReadyRef.current = onReady;
  import_react23.default.useEffect(() => {
    onReadyRef.current?.({ submit: dd.submit, reset: dd.reset, allPlaced: dd.allPlaced, submitted: dd.submitted });
  }, [dd.allPlaced, dd.submitted]);
  const itemInZone = (zoneId) => {
    const entry = Object.entries(dd.placements).find(([_, zid]) => zid === zoneId);
    return entry ? items.find((i) => i.id === entry[0]) : void 0;
  };
  const sourceItems = !dd.submitted ? /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_react_native44.View, { style: { flexDirection: "row", flexWrap: "wrap", gap: sp[2], alignItems: "flex-start", minHeight: sp[2], overflow: "visible" }, children: items.filter((item) => !dd.placements[item.id]).map((item) => /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(DragItem, { item, state: dd.itemStates[item.id], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd }, item.id)) }) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(QuestionFrame, { instruction: instruction || "Drag each item to its match", optionsPosition, options: sourceItems, showButtons, submitted: dd.submitted, allPlaced: dd.allPlaced, onSubmit: dd.submit, onReset: dd.reset, children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_react_native44.View, { style: { gap: sp[3], overflow: "visible" }, children: targets.map((target) => {
    const placed = itemInZone(target.id);
    const isActive = placed && dd.itemStates[placed.id] === "dragging";
    return /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(import_react_native44.View, { style: { flexDirection: "row", alignItems: "center", gap: sp[3], overflow: "visible", zIndex: isActive ? 100 : 1 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_react_native44.Text, { style: { fontFamily: font.sans, fontSize: fs[14], color: theme.fg, flex: 1 }, children: target.label }),
      /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(DropZone, { id: target.id, state: dd.zoneStates[target.id], onMeasure: dd.registerZone, minWidth: 100, inline: true, children: placed && /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(PlacedItem, { item: placed, itemState: dd.itemStates[placed.id], zoneState: dd.zoneStates[target.id], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd, theme }) })
    ] }, target.id);
  }) }) });
}

// rn/CategorizeQuestion.tsx
var import_react24 = __toESM(require("react"));
var import_react_native45 = require("react-native");
var import_jsx_runtime49 = require("react/jsx-runtime");
function CategorizeQuestion({ items, categories, correctMapping, instruction, optionsPosition, showButtons, onAnswer, onReady }) {
  const { theme } = useTheme();
  const dd = useDragDrop({ items, zones: categories.map((c) => c.id), correctMapping, allowMultiplePerZone: true, onAnswer });
  const onReadyRef = import_react24.default.useRef(onReady);
  onReadyRef.current = onReady;
  import_react24.default.useEffect(() => {
    onReadyRef.current?.({ submit: dd.submit, reset: dd.reset, allPlaced: dd.allPlaced, submitted: dd.submitted });
  }, [dd.allPlaced, dd.submitted]);
  const itemsInZone = (zoneId) => {
    return Object.entries(dd.placements).filter(([_, zid]) => zid === zoneId).map(([iid]) => items.find((i) => i.id === iid)).filter(Boolean);
  };
  const sourceItems = !dd.submitted ? /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(import_react_native45.View, { style: { flexDirection: "row", flexWrap: "wrap", gap: sp[2], alignItems: "flex-start", minHeight: sp[2], overflow: "visible" }, children: items.filter((item) => !dd.placements[item.id]).map((item) => /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(DragItem, { item, state: dd.itemStates[item.id], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd }, item.id)) }) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(QuestionFrame, { instruction: instruction || "Drag each item into the correct category", optionsPosition, options: sourceItems, showButtons, submitted: dd.submitted, allPlaced: dd.allPlaced, onSubmit: dd.submit, onReset: dd.reset, children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(import_react_native45.View, { style: { flexDirection: "row", gap: sp[3], overflow: "visible" }, children: categories.map((cat) => {
    const placed = itemsInZone(cat.id);
    return /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(import_react_native45.View, { style: { flex: 1, overflow: "visible" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(import_react_native45.Text, { style: { fontFamily: font.mono, fontSize: fs[11], fontWeight: fw[600], color: theme.fgMuted, marginBottom: sp[2], textAlign: "center" }, children: cat.label }),
      /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(DropZone, { id: cat.id, state: dd.zoneStates[cat.id], onMeasure: dd.registerZone, minHeight: 80, neutral: true, children: placed.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(import_react_native45.View, { style: { flexDirection: "row", flexWrap: "wrap", gap: sp[2], alignItems: "flex-start", padding: sp[1] }, children: placed.map((p) => /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(DragItem, { item: p, state: dd.itemStates[p.id], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd }, p.id)) }) })
    ] }, cat.id);
  }) }) });
}

// rn/OrderQuestion.tsx
var import_react25 = __toESM(require("react"));
var import_react_native46 = require("react-native");
var import_jsx_runtime50 = require("react/jsx-runtime");
function OrderQuestion({ items, correctOrder, instruction, optionsPosition, showButtons, onAnswer, onReady }) {
  const { theme } = useTheme();
  const zones = correctOrder.map((_, i) => `slot-${i}`);
  const correctMapping = Object.fromEntries(correctOrder.map((id, i) => [id, `slot-${i}`]));
  const dd = useDragDrop({ items, zones, correctMapping, showZoneResults: true, onAnswer });
  const onReadyRef = import_react25.default.useRef(onReady);
  onReadyRef.current = onReady;
  import_react25.default.useEffect(() => {
    onReadyRef.current?.({ submit: dd.submit, reset: dd.reset, allPlaced: dd.allPlaced, submitted: dd.submitted });
  }, [dd.allPlaced, dd.submitted]);
  const itemInZone = (zoneId) => {
    const entry = Object.entries(dd.placements).find(([_, zid]) => zid === zoneId);
    return entry ? items.find((i) => i.id === entry[0]) : void 0;
  };
  const sourceItems = !dd.submitted ? /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(import_react_native46.View, { style: { flexDirection: "row", flexWrap: "wrap", gap: sp[2], alignItems: "flex-start", minHeight: sp[2], overflow: "visible" }, children: items.filter((item) => !dd.placements[item.id]).map((item) => /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(DragItem, { item, state: dd.itemStates[item.id], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd }, item.id)) }) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(QuestionFrame, { instruction: instruction || "Drag items into the correct order", optionsPosition, options: sourceItems, showButtons, submitted: dd.submitted, allPlaced: dd.allPlaced, onSubmit: dd.submit, onReset: dd.reset, children: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(import_react_native46.View, { style: { gap: sp[2], overflow: "visible" }, children: zones.map((zoneId, i) => {
    const placed = itemInZone(zoneId);
    const isActive = placed && dd.itemStates[placed.id] === "dragging";
    return /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)(import_react_native46.View, { style: { flexDirection: "row", alignItems: "center", gap: sp[3], overflow: "visible", zIndex: isActive ? 100 : 1 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(import_react_native46.Text, { style: { fontFamily: font.mono, fontSize: fs[13], fontWeight: fw[600], color: theme.fgFaint, minWidth: 24, textAlign: "center" }, children: i + 1 }),
      /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(import_react_native46.View, { style: { flex: 1, overflow: "visible" }, children: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(DropZone, { id: zoneId, state: dd.zoneStates[zoneId], onMeasure: dd.registerZone, minHeight: 40, inline: true, children: placed && /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(PlacedItem, { item: placed, itemState: dd.itemStates[placed.id], zoneState: dd.zoneStates[zoneId], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd, theme, fontSize: fs[13] }) }) })
    ] }, zoneId);
  }) }) });
}

// rn/FillBlanksQuestion.tsx
var import_react26 = __toESM(require("react"));
var import_react_native47 = require("react-native");
var import_jsx_runtime51 = require("react/jsx-runtime");
function FillBlanksQuestion({ sentence, items, correctMapping, instruction, optionsPosition, showButtons, onAnswer, onReady }) {
  const { theme } = useTheme();
  const blankIds = sentence.match(/\{\{(\w+)\}\}/g)?.map((m) => m.slice(2, -2)) || [];
  const dd = useDragDrop({ items, zones: blankIds, correctMapping, onAnswer });
  const onReadyRef = import_react26.default.useRef(onReady);
  onReadyRef.current = onReady;
  import_react26.default.useEffect(() => {
    onReadyRef.current?.({ submit: dd.submit, reset: dd.reset, allPlaced: dd.allPlaced, submitted: dd.submitted });
  }, [dd.allPlaced, dd.submitted]);
  const itemInZone = (zoneId) => {
    const entry = Object.entries(dd.placements).find(([_, zid]) => zid === zoneId);
    return entry ? items.find((i) => i.id === entry[0]) : void 0;
  };
  const parts = sentence.split(/(\{\{\w+\}\})/g);
  const sourceItems = !dd.submitted ? /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(import_react_native47.View, { style: { flexDirection: "row", flexWrap: "wrap", gap: sp[2], alignItems: "flex-start", minHeight: sp[2], overflow: "visible" }, children: items.filter((item) => !dd.placements[item.id]).map((item) => /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(DragItem, { item, state: dd.itemStates[item.id], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd }, item.id)) }) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(QuestionFrame, { instruction: instruction || "Drag words into the blanks", optionsPosition, options: sourceItems, showButtons, submitted: dd.submitted, allPlaced: dd.allPlaced, onSubmit: dd.submit, onReset: dd.reset, children: /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(import_react_native47.View, { style: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: sp[1], overflow: "visible" }, children: parts.map((part, i) => {
    const blankMatch = part.match(/^\{\{(\w+)\}\}$/);
    if (blankMatch) {
      const blankId = blankMatch[1];
      const placed = itemInZone(blankId);
      return /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(DropZone, { id: blankId, state: dd.zoneStates[blankId], onMeasure: dd.registerZone, minWidth: 60, minHeight: 32, inline: true, children: placed && /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(PlacedItem, { item: placed, itemState: dd.itemStates[placed.id], zoneState: dd.zoneStates[blankId], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd, theme }) }, i);
    }
    if (!part) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(import_react_native47.Text, { style: { fontFamily: font.sans, fontSize: fs[14], color: theme.fg, lineHeight: sp[7] }, children: part }, i);
  }) }) });
}

// rn/HotspotQuestion.tsx
var import_react27 = __toESM(require("react"));
var import_react_native48 = require("react-native");
var import_react_native_reanimated8 = __toESM(require("react-native-reanimated"));
var import_jsx_runtime52 = require("react/jsx-runtime");
var TIMING2 = { duration: dur[2], easing: import_react_native_reanimated8.Easing.bezier(0.22, 0.61, 0.36, 1) };
var MARKER_SIZE = 12;
var MARKER_ACTIVE = 28;
var MARKER_HOVER = 48;
function HotspotMarker({ state, isDragging, theme }) {
  const isHovering = state === "hovering";
  const scale = (0, import_react_native_reanimated8.useSharedValue)(1);
  import_react27.default.useEffect(() => {
    const target = isHovering ? MARKER_HOVER / MARKER_SIZE : isDragging ? MARKER_ACTIVE / MARKER_SIZE : 1;
    scale.value = (0, import_react_native_reanimated8.withTiming)(target, TIMING2);
  }, [isHovering, isDragging]);
  const ringStyle = (0, import_react_native_reanimated8.useAnimatedStyle)(() => ({
    transform: [{ scale: scale.value }]
  }));
  return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(import_react_native48.View, { style: { alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }, children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(import_react_native_reanimated8.default.View, { style: [{
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
  const onReadyRef = import_react27.default.useRef(onReady);
  onReadyRef.current = onReady;
  import_react27.default.useEffect(() => {
    onReadyRef.current?.({ submit: dd.submit, reset: dd.reset, allPlaced: dd.allPlaced, submitted: dd.submitted });
  }, [dd.allPlaced, dd.submitted]);
  const itemInZone = (zoneId) => {
    const entry = Object.entries(dd.placements).find(([_, zid]) => zid === zoneId);
    return entry ? items.find((i) => i.id === entry[0]) : void 0;
  };
  const sourceItems = !dd.submitted ? /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(import_react_native48.View, { style: { flexDirection: "row", flexWrap: "wrap", gap: sp[2], alignItems: "flex-start", minHeight: sp[2], overflow: "visible" }, children: items.filter((item) => !dd.placements[item.id]).map((item) => /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(DragItem, { item, state: dd.itemStates[item.id], onDragStart: dd.onDragStart, onDragMove: dd.onDragMove, onDragEnd: dd.onDragEnd }, item.id)) }) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(QuestionFrame, { instruction: instruction || "Drag items to the correct regions", optionsPosition, options: sourceItems, showButtons, submitted: dd.submitted, allPlaced: dd.allPlaced, onSubmit: dd.submit, onReset: dd.reset, children: /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)(import_react_native48.View, { style: { width: "100%", aspectRatio: imageAspectRatio, borderRadius: r[2], overflow: "visible", borderWidth: 1, borderColor: theme.border }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(import_react_native48.Image, { source: image, style: { width: "100%", height: "100%", borderRadius: r[2] - 1 }, resizeMode: "cover" }),
    zones.map((zone) => {
      const placed = itemInZone(zone.id);
      return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(import_react_native48.View, { style: { position: "absolute", left: `${zone.x}%`, top: `${zone.y}%`, width: `${zone.width}%`, height: `${zone.height}%`, overflow: "visible", zIndex: placed && dd.itemStates[placed.id] === "dragging" ? 100 : 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(DropZone, { id: zone.id, state: dd.zoneStates[zone.id], onMeasure: dd.registerZone, minWidth: 0, minHeight: 0, inline: true, children: placed ? /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
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
      ) : /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(HotspotMarker, { state: dd.zoneStates[zone.id], isDragging: !!dd.draggingId, theme }) }) }, zone.id);
    })
  ] }) });
}

// rn/Question.tsx
var import_jsx_runtime53 = require("react/jsx-runtime");
var TYPE_INSTRUCTIONS = {
  choice: "Select the correct answer",
  match: "Drag each item to its match",
  categorize: "Drag each item into the correct category",
  order: "Drag items into the correct order",
  fillblanks: "Drag words into the blanks",
  hotspot: "Drag items to the correct regions"
};
function ChoiceAnswer({ options, selected, correctIndex, submitted, onSelect }) {
  return /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(import_react_native49.View, { style: { gap: sp[2] }, children: options.map((opt, i) => {
    let state = "default";
    if (submitted && correctIndex !== void 0) {
      if (i === correctIndex) state = "correct";
      else if (i === selected) state = "incorrect";
      else state = "disabled";
    } else if (i === selected) {
      state = "selected";
    }
    return /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)(import_react_native49.View, { style: { gap: sp[4] }, children: [
    (text || image) && /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)(import_react_native49.View, { style: { gap: sp[3] }, children: [
      image && /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(
        import_react_native49.Image,
        {
          source: image,
          style: { width: "100%", aspectRatio: imageAspectRatio, borderRadius: r[2], backgroundColor: theme.hoverOverlay },
          resizeMode: "cover"
        }
      ),
      text && /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(import_react_native49.Text, { style: { fontFamily: font.sans, fontSize: fs[16], fontWeight: fw[600], color: theme.fg }, children: text }),
      /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(import_react_native49.Text, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }, children: inst })
    ] }),
    type === "choice" && choiceProps && /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(ChoiceAnswer, { ...choiceProps }),
    type === "match" && matchProps && /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(MatchQuestion, { optionsPosition, showButtons, onAnswer, onReady, ...matchProps }),
    type === "categorize" && categorizeProps && /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(CategorizeQuestion, { optionsPosition, showButtons, onAnswer, onReady, ...categorizeProps }),
    type === "order" && orderProps && /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(OrderQuestion, { optionsPosition, showButtons, onAnswer, onReady, ...orderProps }),
    type === "fillblanks" && fillBlanksProps && /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(FillBlanksQuestion, { optionsPosition, showButtons, onAnswer, onReady, ...fillBlanksProps }),
    type === "hotspot" && hotspotProps && /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(HotspotQuestion, { optionsPosition, showButtons, onAnswer, onReady, ...hotspotProps })
  ] });
}

// rn/Interstitial.tsx
var import_react28 = require("react");
var import_react_native50 = require("react-native");
var import_react_native_reanimated9 = __toESM(require("react-native-reanimated"));
var import_jsx_runtime54 = require("react/jsx-runtime");
var CONFETTI_COLORS = [color.noon[400], color.gold[200], color.gold[400], color.noon[200], color.chalk[100]];
function ConfettiParticle({ delay, color: c }) {
  const left = (0, import_react28.useRef)(Math.random() * 100).current;
  const size = (0, import_react28.useRef)(3 + Math.random() * 5).current;
  const isRect = (0, import_react28.useRef)(Math.random() > 0.5).current;
  const duration = (0, import_react28.useRef)(1500 + Math.random() * 1500).current;
  const translateY = (0, import_react_native_reanimated9.useSharedValue)(-10);
  const opacity = (0, import_react_native_reanimated9.useSharedValue)(1);
  (0, import_react28.useEffect)(() => {
    translateY.value = (0, import_react_native_reanimated9.withDelay)(delay, (0, import_react_native_reanimated9.withTiming)(700, { duration }));
    opacity.value = (0, import_react_native_reanimated9.withDelay)(delay + duration * 0.5, (0, import_react_native_reanimated9.withTiming)(0, { duration: duration * 0.5 }));
    return () => {
      (0, import_react_native_reanimated9.cancelAnimation)(translateY);
      (0, import_react_native_reanimated9.cancelAnimation)(opacity);
    };
  }, []);
  const style = (0, import_react_native_reanimated9.useAnimatedStyle)(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }]
  }));
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_react_native_reanimated9.default.View, { style: [{
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
  const rotation = (0, import_react_native_reanimated9.useSharedValue)(0);
  const scale = (0, import_react_native_reanimated9.useSharedValue)(0);
  const opacity = (0, import_react_native_reanimated9.useSharedValue)(0);
  (0, import_react28.useEffect)(() => {
    opacity.value = (0, import_react_native_reanimated9.withTiming)(1, { duration: 400 });
    rotation.value = (0, import_react_native_reanimated9.withTiming)(360, { duration: 600, easing: import_react_native_reanimated9.Easing.out(import_react_native_reanimated9.Easing.cubic) });
    scale.value = (0, import_react_native_reanimated9.withTiming)(1, { duration: 500, easing: import_react_native_reanimated9.Easing.out(import_react_native_reanimated9.Easing.cubic) });
    const timeout = setTimeout(() => {
      scale.value = (0, import_react_native_reanimated9.withRepeat)((0, import_react_native_reanimated9.withSequence)(
        (0, import_react_native_reanimated9.withTiming)(1.03, { duration: 1500 }),
        (0, import_react_native_reanimated9.withTiming)(1, { duration: 1500 })
      ), -1);
    }, 700);
    return () => {
      (0, import_react_native_reanimated9.cancelAnimation)(rotation);
      (0, import_react_native_reanimated9.cancelAnimation)(scale);
      (0, import_react_native_reanimated9.cancelAnimation)(opacity);
      clearTimeout(timeout);
    };
  }, []);
  const style = (0, import_react_native_reanimated9.useAnimatedStyle)(() => ({
    opacity: opacity.value,
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }]
  }));
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_react_native_reanimated9.default.View, { style: [{ marginBottom: sp[6], zIndex: 2 }, style], children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_react_native50.Text, { style: { fontSize: 72, color: color.gold[300] }, children: "\u2605" }) });
}
function ExamHero({ score }) {
  const dim = 72;
  const scale = (0, import_react_native_reanimated9.useSharedValue)(0.85);
  const opacity = (0, import_react_native_reanimated9.useSharedValue)(0);
  const waterPct = (0, import_react_native_reanimated9.useSharedValue)(0);
  (0, import_react28.useEffect)(() => {
    opacity.value = (0, import_react_native_reanimated9.withTiming)(1, { duration: 300 });
    scale.value = (0, import_react_native_reanimated9.withTiming)(1, { duration: 400, easing: import_react_native_reanimated9.Easing.out(import_react_native_reanimated9.Easing.cubic) });
    waterPct.value = (0, import_react_native_reanimated9.withDelay)(400, (0, import_react_native_reanimated9.withTiming)(score, { duration: 1200, easing: import_react_native_reanimated9.Easing.out(import_react_native_reanimated9.Easing.cubic) }));
    return () => {
      (0, import_react_native_reanimated9.cancelAnimation)(scale);
      (0, import_react_native_reanimated9.cancelAnimation)(opacity);
      (0, import_react_native_reanimated9.cancelAnimation)(waterPct);
    };
  }, []);
  const containerStyle = (0, import_react_native_reanimated9.useAnimatedStyle)(() => ({ opacity: opacity.value, transform: [{ scale: scale.value }] }));
  const waterStyle = (0, import_react_native_reanimated9.useAnimatedStyle)(() => ({ height: `${waterPct.value}%` }));
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_react_native_reanimated9.default.View, { style: [{ marginBottom: sp[6], zIndex: 2, alignItems: "center" }, containerStyle], children: /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(import_react_native50.View, { style: {
    width: dim,
    height: dim,
    transform: [{ rotate: "45deg" }],
    borderWidth: 2,
    borderColor: color.noon[400],
    borderRadius: r[2],
    backgroundColor: color.void[300],
    overflow: "hidden",
    shadowColor: color.noon[400],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 12
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_react_native50.View, { style: { position: "absolute", top: -(dim * 0.25), left: -(dim * 0.25), width: dim * 1.5, height: dim * 1.5, transform: [{ rotate: "-45deg" }], justifyContent: "flex-end" }, children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_react_native_reanimated9.default.View, { style: [{ backgroundColor: color.blue[400], opacity: 0.3 }, waterStyle] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_react_native50.View, { style: { flex: 1, alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(import_react_native50.Text, { style: { transform: [{ rotate: "-45deg" }], fontFamily: font.mono, fontSize: fs[18], fontWeight: fw[700], color: color.noon[400] }, children: [
      score,
      "%"
    ] }) })
  ] }) });
}
function ProgressHero() {
  const opacity = (0, import_react_native_reanimated9.useSharedValue)(0);
  const translateY = (0, import_react_native_reanimated9.useSharedValue)(12);
  (0, import_react28.useEffect)(() => {
    opacity.value = (0, import_react_native_reanimated9.withTiming)(1, { duration: 400, easing: import_react_native_reanimated9.Easing.out(import_react_native_reanimated9.Easing.cubic) });
    translateY.value = (0, import_react_native_reanimated9.withTiming)(0, { duration: 400, easing: import_react_native_reanimated9.Easing.out(import_react_native_reanimated9.Easing.cubic) });
    return () => {
      (0, import_react_native_reanimated9.cancelAnimation)(opacity);
      (0, import_react_native_reanimated9.cancelAnimation)(translateY);
    };
  }, []);
  const style = (0, import_react_native_reanimated9.useAnimatedStyle)(() => ({ opacity: opacity.value, transform: [{ translateY: translateY.value }] }));
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_react_native_reanimated9.default.View, { style: [{ marginBottom: sp[6], zIndex: 2, width: 220 }, style], children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Waypoints, { steps: ["done", "done", "done", "current", "incomplete"] }) });
}
function CompleteHero() {
  const scale = (0, import_react_native_reanimated9.useSharedValue)(0.9);
  const opacity = (0, import_react_native_reanimated9.useSharedValue)(0);
  (0, import_react28.useEffect)(() => {
    opacity.value = (0, import_react_native_reanimated9.withTiming)(1, { duration: 400 });
    scale.value = (0, import_react_native_reanimated9.withTiming)(1, { duration: 400, easing: import_react_native_reanimated9.Easing.out(import_react_native_reanimated9.Easing.cubic) });
    return () => {
      (0, import_react_native_reanimated9.cancelAnimation)(scale);
      (0, import_react_native_reanimated9.cancelAnimation)(opacity);
    };
  }, []);
  const style = (0, import_react_native_reanimated9.useAnimatedStyle)(() => ({ opacity: opacity.value, transform: [{ scale: scale.value }] }));
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_react_native_reanimated9.default.View, { style: [{ marginBottom: sp[6], zIndex: 2, width: 220 }, style], children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Waypoints, { steps: ["done", "done", "done", "done", "arrived"] }) });
}
function Interstitial({ title, body, buttonLabel, onPress, variant = "mastery", score = 91, hero, confetti: confettiProp }) {
  const { theme } = useTheme();
  const showConfetti = confettiProp ?? (variant === "mastery" || variant === "complete");
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(import_react_native50.View, { style: { flex: 1, backgroundColor: theme.bg, alignItems: "center", justifyContent: "center", padding: sp[6] }, children: [
    showConfetti && /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_react_native50.View, { style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden", zIndex: 1 }, pointerEvents: "none", children: Array.from({ length: 60 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(ConfettiParticle, { delay: Math.random() * 2500, color: CONFETTI_COLORS[i % CONFETTI_COLORS.length] }, i)) }),
    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_react_native50.View, { style: { flex: 1 } }),
    hero ? /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_react_native50.View, { style: { marginBottom: sp[6], zIndex: 2 }, children: hero }) : /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(import_jsx_runtime54.Fragment, { children: [
      variant === "mastery" && /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(MasteryHero, {}),
      variant === "exam" && /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(ExamHero, { score }),
      variant === "progress" && /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(ProgressHero, {}),
      variant === "complete" && /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(CompleteHero, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_react_native50.Text, { style: { fontFamily: font.serif, fontSize: fs[32], fontWeight: fw[500], color: theme.fg, textAlign: "center", marginBottom: sp[3], zIndex: 2 }, children: title }),
    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_react_native50.Text, { style: { fontFamily: font.sans, fontSize: fs[15], color: theme.fgSubtle, textAlign: "center", maxWidth: 280, lineHeight: fs[15] * 1.5, zIndex: 2 }, children: body }),
    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_react_native50.View, { style: { flex: 1 } }),
    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_react_native50.View, { style: { width: "100%", maxWidth: 280, zIndex: 2, paddingBottom: sp[6] }, children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Button, { variant: "primary", fullWidth: true, onPress, children: buttonLabel }) })
  ] });
}

// rn/Oasis.tsx
var import_react_native51 = require("react-native");
var import_jsx_runtime55 = require("react/jsx-runtime");
var SIZES = { sm: 28, md: 40, lg: 56, xl: 72 };
var FONT_SIZES = { sm: fs[9], md: fs[11], lg: fs[14], xl: fs[16] };
function borderCol(status, theme) {
  switch (status) {
    case "complete":
    case "strong":
      return color.noon[400];
    case "weak":
      return color.terra[400];
    case "current":
      return color.gold[300];
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
  const labelColor = isCurrent ? color.gold[300] : isPast ? border : theme.fgFaint;
  return /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(import_react_native51.View, { style: { alignItems: "center" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(import_react_native51.View, { style: {
      width: dim,
      height: dim,
      transform: [{ rotate: "45deg" }],
      borderWidth: isCurrent ? 2.5 : 1.5,
      borderColor: border,
      borderStyle: isDashed ? "dashed" : "solid",
      backgroundColor: color.void[300],
      overflow: "hidden",
      ...isCurrent ? {
        shadowColor: color.gold[300],
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 6
      } : {}
    }, children: [
      clampedLevel > 0 && /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(import_react_native51.View, { style: {
        position: "absolute",
        top: -(dim * 0.25),
        left: -(dim * 0.25),
        width: dim * 1.5,
        height: dim * 1.5,
        transform: [{ rotate: "-45deg" }],
        justifyContent: "flex-end"
      }, children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(import_react_native51.View, { style: { height: `${clampedLevel}%`, backgroundColor: color.blue[400], opacity: 0.3 } }) }),
      /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(import_react_native51.View, { style: { flex: 1, alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(import_react_native51.Text, { style: {
        transform: [{ rotate: "-45deg" }],
        fontFamily: font.mono,
        fontSize: FONT_SIZES[size],
        fontWeight: fw[600],
        color: labelColor
      }, children: displayLabel }) })
    ] }),
    meta && /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(import_react_native51.Text, { style: {
      fontFamily: font.mono,
      fontSize: fs[9],
      color: isCurrent ? color.gold[300] : isPast ? theme.fgMuted : theme.fgFaint,
      marginTop: dim * 0.2 + sp[2],
      textAlign: "center"
    }, children: meta })
  ] });
}

// rn/RouteMap.tsx
var import_react_native52 = require("react-native");
var import_jsx_runtime56 = require("react/jsx-runtime");
function mc(s) {
  return s === "mapped" ? color.noon[400] : s === "exploring" ? color.gold[300] : s === "needs-attention" ? color.terra[300] : "rgba(232,228,220,0.35)";
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
  const { theme } = useTheme();
  const isPast = (ch) => ch.status === "complete" || ch.status === "strong" || ch.status === "weak";
  const isCurr = (ch) => ch.id === currentChapter;
  const currentIdx = chapters.findIndex((ch) => ch.id === currentChapter);
  const progressPct = currentIdx >= 0 ? Math.round((chapters.length - currentIdx) / chapters.length * 100) : 0;
  return /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(import_react_native52.View, { style: { position: "relative" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react_native52.View, { style: { position: "absolute", top: 0, bottom: 0, left: "50%", width: 1, marginLeft: -0.5, backgroundColor: "rgba(232,228,220,0.06)" } }),
    progressPct > 0 && /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react_native52.View, { style: { position: "absolute", bottom: 0, left: "50%", marginLeft: -0.5, width: 1, height: `${progressPct}%`, backgroundColor: color.noon[400], opacity: 0.25 } }),
    chapters.map((ch, ci) => {
      const past = isPast(ch);
      const current = isCurr(ch);
      const future = ch.status === "upcoming" || ch.status === "locked";
      const distant = ch.status === "locked";
      const dimSize = current ? 44 : 36;
      const mapped = ch.markers.filter((m) => m.status === "mapped").length;
      const total = ch.markers.length;
      const hdrColor = current ? color.gold[300] : ch.status === "weak" ? color.terra[300] : past ? color.noon[400] : theme.fgFaint;
      return /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(import_react_native52.View, { style: { paddingTop: ci === 0 ? sp[2] : sp[6] }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react_native52.Pressable, { onPress: () => onChapterPress?.(ch), style: { alignItems: "center", zIndex: 5 }, children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react_native52.View, { style: {
          width: dimSize,
          height: dimSize,
          transform: [{ rotate: "45deg" }],
          borderWidth: current ? 2.5 : 1.5,
          borderColor: hdrColor,
          borderStyle: future ? "dashed" : "solid",
          backgroundColor: color.void[300],
          ...current ? { shadowColor: color.gold[300], shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 14, elevation: 6 } : {},
          ...distant ? { opacity: 0.5 } : {}
        }, children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react_native52.View, { style: { flex: 1, alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react_native52.Text, { style: {
          transform: [{ rotate: "-45deg" }],
          fontFamily: font.mono,
          fontSize: fs[11],
          fontWeight: fw[600],
          color: current ? color.gold[300] : past ? hdrColor : theme.fgFaint
        }, children: past ? `${ch.level}%` : "\u2014" }) }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(import_react_native52.View, { style: { alignItems: "center", marginTop: sp[4], marginBottom: sp[3], paddingHorizontal: sp[4] }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react_native52.Text, { style: {
            fontFamily: font.serif,
            fontSize: current ? fs[18] : fs[15],
            fontWeight: fw[500],
            textAlign: "center",
            color: current ? theme.fg : distant ? theme.fgSubtle : theme.fgMuted,
            ...distant ? { opacity: 0.5 } : {}
          }, children: ch.title }),
          past && /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(import_react_native52.Text, { style: { fontFamily: font.mono, fontSize: fs[9], color: mapped === total ? color.noon[400] : color.terra[300], marginTop: sp[1] }, children: [
            mapped,
            "/",
            total,
            " mastered"
          ] }),
          current && /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react_native52.Text, { style: { fontFamily: font.mono, fontSize: fs[9], color: color.gold[300], marginTop: sp[1] }, children: "Next exam \xB7 9 days" })
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
          return /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(import_react_native52.View, { style: { flexDirection: "row", marginTop: sp[1], alignItems: "center" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react_native52.View, { style: { width: "50%", flexDirection: "row", alignItems: "center" }, children: isLeft && /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(import_jsx_runtime56.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(
                import_react_native52.Pressable,
                {
                  onPress: () => onMarkerPress?.(marker, ch),
                  style: { flex: 1, marginLeft: EP, flexDirection: "row-reverse", alignItems: "center", gap: sp[2], paddingVertical: sp[2], paddingHorizontal: sp[3], backgroundColor: bg, borderWidth: 1, borderColor: bdr, borderRadius: r[2] },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react_native52.View, { style: {
                      width: 10,
                      height: 10,
                      transform: [{ rotate: "45deg" }],
                      borderWidth: 1.5,
                      borderColor: mCol,
                      borderStyle: dashed ? "dashed" : "solid",
                      backgroundColor: mBgCol,
                      ...marker.status === "mapped" ? { shadowColor: color.noon[400], shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 4 } : {}
                    } }),
                    /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(import_react_native52.View, { style: { flex: 1 }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react_native52.Text, { style: { fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: dashed ? theme.fgMuted : theme.fg, textAlign: "right" }, numberOfLines: 1, children: marker.label }),
                      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react_native52.Text, { style: { fontFamily: font.mono, fontSize: fs[9], color: mCol, letterSpacing: 1, textTransform: "uppercase", marginTop: 2, textAlign: "right" }, children: sub })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react_native52.View, { style: { width: CW, height: 1, backgroundColor: connCol, opacity: connOp } })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react_native52.View, { style: { width: "50%", flexDirection: "row", alignItems: "center" }, children: !isLeft && /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(import_jsx_runtime56.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react_native52.View, { style: { width: CW, height: 1, backgroundColor: connCol, opacity: connOp } }),
              /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(
                import_react_native52.Pressable,
                {
                  onPress: () => onMarkerPress?.(marker, ch),
                  style: { flex: 1, marginRight: EP, flexDirection: "row", alignItems: "center", gap: sp[2], paddingVertical: sp[2], paddingHorizontal: sp[3], backgroundColor: bg, borderWidth: 1, borderColor: bdr, borderRadius: r[2] },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react_native52.View, { style: {
                      width: 10,
                      height: 10,
                      transform: [{ rotate: "45deg" }],
                      borderWidth: 1.5,
                      borderColor: mCol,
                      borderStyle: dashed ? "dashed" : "solid",
                      backgroundColor: mBgCol,
                      ...marker.status === "mapped" ? { shadowColor: color.noon[400], shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 4 } : {}
                    } }),
                    /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(import_react_native52.View, { style: { flex: 1 }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react_native52.Text, { style: { fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: dashed ? theme.fgMuted : theme.fg }, numberOfLines: 1, children: marker.label }),
                      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react_native52.Text, { style: { fontFamily: font.mono, fontSize: fs[9], color: mCol, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }, children: sub })
                    ] })
                  ]
                }
              )
            ] }) })
          ] }, marker.id);
        }),
        current && /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(import_react_native52.View, { style: { alignItems: "center", marginTop: sp[4] }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react_native52.View, { style: { width: 28, height: 28, borderRadius: 14, backgroundColor: "rgba(107,163,255,0.12)", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react_native52.View, { style: { width: 12, height: 12, borderRadius: 6, backgroundColor: color.blue[400], borderWidth: 2, borderColor: color.chalk[100], shadowColor: color.blue[400], shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 6 } }) }),
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_react_native52.Text, { style: { fontFamily: font.mono, fontSize: fs[9], fontWeight: fw[600], color: color.blue[400], letterSpacing: 1.5, textTransform: "uppercase", marginTop: sp[1] }, children: "You are here" })
        ] })
      ] }, ch.id);
    })
  ] });
}

// rn/GridPaper.tsx
var import_react_native53 = require("react-native");
var import_react_native_svg4 = __toESM(require("react-native-svg"));
var import_jsx_runtime57 = require("react/jsx-runtime");
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
      lines.push(/* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_react_native_svg4.Line, { x1: x, y1: 0, x2: x, y2: height, stroke: lineColor, strokeWidth: 0.5 }, `v${x}`));
    }
    for (let y = 0; y <= height; y += step) {
      lines.push(/* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_react_native_svg4.Line, { x1: 0, y1: y, x2: width, y2: y, stroke: lineColor, strokeWidth: 0.5 }, `h${y}`));
    }
  } else if (variant === "major") {
    const minor = 8;
    const major = 64;
    for (let x = 0; x <= width; x += minor) {
      const isMajor = x % major === 0;
      lines.push(/* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_react_native_svg4.Line, { x1: x, y1: 0, x2: x, y2: height, stroke: isMajor ? goldColor : lineColor, strokeWidth: 0.5 }, `v${x}`));
    }
    for (let y = 0; y <= height; y += minor) {
      const isMajor = y % major === 0;
      lines.push(/* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_react_native_svg4.Line, { x1: 0, y1: y, x2: width, y2: y, stroke: isMajor ? goldColor : lineColor, strokeWidth: 0.5 }, `h${y}`));
    }
  } else {
    const step = 24;
    for (let x = 0; x <= width; x += step) {
      lines.push(/* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_react_native_svg4.Line, { x1: x, y1: 0, x2: x, y2: height, stroke: canvasColor, strokeWidth: 0.5 }, `v${x}`));
    }
    for (let y = 0; y <= height; y += step) {
      lines.push(/* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_react_native_svg4.Line, { x1: 0, y1: y, x2: width, y2: y, stroke: canvasColor, strokeWidth: 0.5 }, `h${y}`));
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_react_native53.View, { style: [{ width, height, backgroundColor: theme.bg }, style], children: /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_react_native_svg4.default, { width, height, style: { position: "absolute" }, children: lines }) });
}

// rn/WaterVessel.tsx
var import_react_native54 = require("react-native");
var import_react_native_svg5 = __toESM(require("react-native-svg"));
var import_jsx_runtime58 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(import_react_native54.View, { style: { flexDirection: "row", alignItems: "center", gap: sp[5] }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(import_react_native_svg5.default, { width: dim, height: h3, viewBox: "0 0 40 56", children: [
      /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(import_react_native_svg5.Defs, { children: /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(import_react_native_svg5.ClipPath, { id: "vc", children: /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(import_react_native_svg5.Path, { d: VESSEL_PATH }) }) }),
      pct > 0 && /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(import_react_native_svg5.Rect, { x: 4, y: waterTop, width: 32, height: 57 - waterTop, fill: wc, opacity: 0.45, clipPath: "url(#vc)" }),
      pct > 0 && !overflow && /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(import_react_native_svg5.Line, { x1: 6, y1: waterTop, x2: 34, y2: waterTop, stroke: wc, strokeWidth: 1.5, opacity: 0.7, clipPath: "url(#vc)" }),
      /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(import_react_native_svg5.Path, { d: VESSEL_PATH, stroke: theme.fgMuted, strokeWidth: 1.5, strokeLinejoin: "round", fill: "none" }),
      overflow && /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(import_jsx_runtime58.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(import_react_native_svg5.Circle, { cx: 36, cy: 10, r: 1.5, fill: wc, opacity: 0.5 }),
        /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(import_react_native_svg5.Circle, { cx: 38, cy: 16, r: 1, fill: wc, opacity: 0.4 })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(import_react_native54.View, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(import_react_native54.View, { style: { flexDirection: "row", alignItems: "baseline", gap: sp[2] }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(import_react_native54.Text, { style: { fontFamily: font.serif, fontSize: size === "lg" ? fs[32] : fs[24], fontWeight: fw[500], color: theme.fg }, children: fill }),
        /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(import_react_native54.Text, { style: { fontFamily: font.mono, fontSize: fs[11], color: theme.fgFaint }, children: [
          "/ ",
          capacity
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(import_react_native54.Text, { style: { fontFamily: font.mono, fontSize: fs[11], color: wc, marginTop: sp[1] }, children: status })
    ] })
  ] });
}

// rn/TerrainPattern.tsx
var import_react29 = require("react");
var import_react_native55 = require("react-native");
var import_react_native_svg6 = __toESM(require("react-native-svg"));
var import_jsx_runtime59 = require("react/jsx-runtime");
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
  const paths2 = (0, import_react29.useMemo)(
    () => generateContours(width, height, variant, isVoid, 42),
    [width, height, variant, isVoid]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_react_native55.View, { style: [{ width, height, backgroundColor: theme.bg, overflow: "hidden" }, style], children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_react_native_svg6.default, { width, height, style: { position: "absolute", opacity }, children: paths2.map((entry, i) => {
    const [d, stroke] = entry.split("|");
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_react_native_svg6.Path, { d, stroke, strokeWidth: 0.8, fill: "none" }, i);
  }) }) });
}

// rn/DunePattern.tsx
var import_react30 = __toESM(require("react"));
var import_react_native56 = require("react-native");
var import_react_native_svg7 = __toESM(require("react-native-svg"));
var import_jsx_runtime60 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(import_react_native56.View, { style: [{ width: w, height: h3, overflow: "hidden" }, style], children: /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(import_react_native_svg7.default, { width: w, height: h3, style: { position: "absolute", opacity }, children: layers.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)(import_react30.default.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(import_react_native_svg7.Path, { d: l.shadow, fill: l.sCol, fillOpacity: l.sOp }),
    /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(import_react_native_svg7.Path, { d: l.lit, fill: l.lCol, fillOpacity: l.lOp })
  ] }, i)) }) });
}

// rn/ConstellationPattern.tsx
var import_react31 = __toESM(require("react"));
var import_react_native57 = require("react-native");
var import_react_native_svg8 = __toESM(require("react-native-svg"));
var import_jsx_runtime61 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(import_react_native57.View, { style: [{ width: w, height: h3, backgroundColor: theme.bg }, style], children: /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(import_react_native_svg8.default, { width: w, height: h3, style: { opacity }, children: [
    Array.from({ length: 40 }, (_, i) => {
      const sx = (i * 97.3 + 13) % w;
      const sy = (i * 53.7 + 7) % (h3 * 0.5);
      const sr = 0.4 + i % 3 * 0.3;
      return /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(import_react_native_svg8.Circle, { cx: sx, cy: sy, r: sr, fill: color.gold[300], opacity: 0.1 + i % 4 * 0.08 }, `s${i}`);
    }),
    triangles.map((t, i) => {
      const a = allNodes[t[0]], b = allNodes[t[1]], c = allNodes[t[2]];
      const op = (triOpacity[i] || 0.2) * (isVoid ? 1 : 0.6);
      const isTerra = i === 2 || i === 6 || i === 9;
      return /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(import_react_native_svg8.Path, { d: `M${a.x},${a.y} L${b.x},${b.y} L${c.x},${c.y} Z`, fill: isTerra ? theme.terra : theme.iris, fillOpacity: isTerra ? op * 0.7 : op }, `t${i}`);
    }),
    connections.map(([a, b], i) => /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(
      import_react_native_svg8.Line,
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
    allNodes.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(import_react31.default.Fragment, { children: [
      n.bright && /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(import_react_native_svg8.Circle, { cx: n.x, cy: n.y, r: n.r + 8, fill: color.gold[300], opacity: isVoid ? 0.06 : 0.04 }),
      n.bright && /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(import_react_native_svg8.Circle, { cx: n.x, cy: n.y, r: n.r + 4, fill: color.gold[300], opacity: isVoid ? 0.12 : 0.08 }),
      /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(import_react_native_svg8.Circle, { cx: n.x, cy: n.y, r: n.r, fill: n.bright ? color.gold[300] : color.gold[400], opacity: n.bright ? isVoid ? 0.85 : 0.6 : isVoid ? 0.45 : 0.3 })
    ] }, `n${i}`))
  ] }) });
}

// rn/Slider.tsx
var import_react32 = require("react");
var import_react_native58 = require("react-native");
var import_jsx_runtime62 = require("react/jsx-runtime");
function Slider({ value, min, max, step = 0.01, label, showValue = true, onValueChange }) {
  const { theme } = useTheme();
  const trackRef = (0, import_react32.useRef)(null);
  const widthRef = (0, import_react32.useRef)(0);
  const pct = Math.max(0, Math.min(100, (value - min) / (max - min) * 100));
  const onLayout = (0, import_react32.useCallback)((e) => {
    widthRef.current = e.nativeEvent.layout.width;
  }, []);
  if (import_react_native58.Platform.OS === "web") {
    return /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(import_react_native58.View, { style: { gap: sp[2] }, children: [
      (label || showValue) && /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(import_react_native58.View, { style: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, children: [
        label && /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_react_native58.Text, { style: { fontFamily: font.mono, fontSize: fs[10], color: theme.fgSubtle, letterSpacing: 0.8, textTransform: "uppercase" }, children: label }),
        showValue && /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_react_native58.Text, { style: { fontFamily: font.mono, fontSize: fs[10], color: theme.fg }, children: value.toFixed(step < 1 ? 2 : 0) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
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
  const handlePress = (0, import_react32.useCallback)((e) => {
    const w = widthRef.current;
    if (w <= 0) return;
    const x = e.nativeEvent.locationX;
    const raw = min + x / w * (max - min);
    const stepped = Math.round(raw / step) * step;
    onValueChange(Math.max(min, Math.min(max, stepped)));
  }, [min, max, step, onValueChange]);
  return /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(import_react_native58.View, { style: { gap: sp[2] }, children: [
    (label || showValue) && /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(import_react_native58.View, { style: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_react_native58.Text, { style: { fontFamily: font.mono, fontSize: fs[10], color: theme.fgSubtle, letterSpacing: 0.8, textTransform: "uppercase" }, children: label }),
      showValue && /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_react_native58.Text, { style: { fontFamily: font.mono, fontSize: fs[10], color: theme.fg }, children: value.toFixed(step < 1 ? 2 : 0) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
      import_react_native58.Pressable,
      {
        onPress: handlePress,
        onLayout,
        ref: trackRef,
        style: { height: 24, justifyContent: "center" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_react_native58.View, { style: { height: 2, backgroundColor: theme.borderStrong, borderRadius: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_react_native58.View, { style: { height: 2, width: `${pct}%`, backgroundColor: theme.accent, borderRadius: 1 } }) }),
          /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_react_native58.View, { style: {
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
var import_react33 = __toESM(require("react"));
var import_react_native59 = require("react-native");
var import_jsx_runtime63 = require("react/jsx-runtime");
var SkiaAvailable = false;
var SkiaCanvas = null;
var Skia = null;
try {
  const S = require("@shopify/react-native-skia");
  SkiaCanvas = S.Canvas;
  Skia = S.Skia;
  SkiaAvailable = true;
} catch {
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
  const canvasRef = import_react33.default.useRef(null);
  const frameRef = import_react33.default.useRef(0);
  const dataRef = import_react33.default.useRef(null);
  const ctrlRef = import_react33.default.useRef({ wind, shimmer, contrast });
  ctrlRef.current = { wind, shimmer, contrast };
  import_react33.default.useEffect(() => {
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
      ctx.fillStyle = "#0a0f1a";
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
  return /* @__PURE__ */ (0, import_jsx_runtime63.jsx)("canvas", { ref: canvasRef, style: { width: W, height: H, display: "block" } });
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
  if (import_react_native59.Platform.OS === "web") {
    return /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(import_react_native59.View, { style: [{ width, height, overflow: "hidden" }, style], children: /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(DuneCanvasWeb, { width, height, layers, wind, density, shimmer, contrast }) });
  }
  if (!SkiaAvailable) {
    const Text60 = require("react-native").Text;
    return /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(import_react_native59.View, { style: [{ width, height, backgroundColor: color.void[300], alignItems: "center", justifyContent: "center" }, style], children: /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(Text60, { style: { color: "rgba(232,228,220,0.5)", textAlign: "center", padding: 20 }, children: "Requires @shopify/react-native-skia \u2014 rebuild with native modules." }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(import_react_native59.View, { style: [{ width, height, backgroundColor: color.void[300] }, style], children: /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(SkiaCanvas, { style: { width, height } }) });
}

// rn/StarsDynamic.tsx
var import_react34 = __toESM(require("react"));
var import_react_native60 = require("react-native");
var import_jsx_runtime64 = require("react/jsx-runtime");
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
function StarsCanvasWeb({ width: W, height: H, density, twinkle, halo: haloI, lines: linesI }) {
  const canvasRef = import_react34.default.useRef(null);
  const frameRef = import_react34.default.useRef(0);
  const ctrlRef = import_react34.default.useRef({ twinkle, haloI, linesI });
  ctrlRef.current = { twinkle, haloI, linesI };
  import_react34.default.useEffect(() => {
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
    const particles = [];
    const buckets = Array.from({ length: ALPHA_BUCKETS2 }, () => []);
    const halos = [];
    let clusters = [];
    let spikes = [];
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
      ctx.fillStyle = "#0a0f1a";
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
  return /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("canvas", { ref: canvasRef, style: { width: W, height: H, display: "block" } });
}
function StarsDynamic({ width, height, density = 1, twinkle = 1, halo = 1, lines = 1, style }) {
  if (import_react_native60.Platform.OS === "web") {
    return /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(import_react_native60.View, { style: [{ width, height, overflow: "hidden" }, style], children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(StarsCanvasWeb, { width, height, density, twinkle, halo, lines }) });
  }
  const Text60 = require("react-native").Text;
  return /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(import_react_native60.View, { style: [{ width, height, backgroundColor: color.void[300], alignItems: "center", justifyContent: "center" }, style], children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(Text60, { style: { color: "rgba(232,228,220,0.5)", textAlign: "center", padding: 20 }, children: "Requires native build with @shopify/react-native-skia." }) });
}

// rn/TerrainDynamic.tsx
var import_react35 = __toESM(require("react"));
var import_react_native61 = require("react-native");
var import_jsx_runtime65 = require("react/jsx-runtime");
var INK3 = { r: 232, g: 228, b: 220 };
function TerrainCanvasWeb({ width: W, height: H, scale, detail, relief, contrast, tilt, showRoute }) {
  const canvasRef = import_react35.default.useRef(null);
  const frameRef = import_react35.default.useRef(0);
  import_react35.default.useEffect(() => {
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
      ctx.fillStyle = "#0a0f1a";
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
  return /* @__PURE__ */ (0, import_jsx_runtime65.jsx)("canvas", { ref: canvasRef, style: { width: W, height: H, display: "block" } });
}
function TerrainDynamic({ width, height, scale = 0.7, detail = 1, relief = 1, contrast = 1, tilt = 0, showRoute = false, style }) {
  if (import_react_native61.Platform.OS === "web") {
    return /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(import_react_native61.View, { style: [{ width, height, overflow: "hidden" }, style], children: /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(TerrainCanvasWeb, { width, height, scale, detail, relief, contrast, tilt, showRoute }) });
  }
  const Text60 = require("react-native").Text;
  return /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(import_react_native61.View, { style: [{ width, height, backgroundColor: color.void[300], alignItems: "center", justifyContent: "center" }, style], children: /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(Text60, { style: { color: "rgba(232,228,220,0.5)", textAlign: "center", padding: 20 }, children: "Requires native build with @shopify/react-native-skia." }) });
}

// rn/VoiceTutor.tsx
var import_react36 = require("react");
var import_react_native62 = require("react-native");
var import_react_native_reanimated10 = __toESM(require("react-native-reanimated"));
var import_jsx_runtime66 = require("react/jsx-runtime");
function VoiceTutor({ state = "idle", size = 160 }) {
  const { theme } = useTheme();
  const anim = (0, import_react_native_reanimated10.useSharedValue)(0);
  const orbit = (0, import_react_native_reanimated10.useSharedValue)(0);
  const errorAura = (0, import_react_native_reanimated10.useSharedValue)(0);
  (0, import_react36.useEffect)(() => {
    (0, import_react_native_reanimated10.cancelAnimation)(anim);
    (0, import_react_native_reanimated10.cancelAnimation)(orbit);
    (0, import_react_native_reanimated10.cancelAnimation)(errorAura);
    anim.value = 0;
    orbit.value = 0;
    errorAura.value = 0;
    if (state === "idle") {
      anim.value = (0, import_react_native_reanimated10.withRepeat)(
        (0, import_react_native_reanimated10.withTiming)(1, { duration: 4e3, easing: import_react_native_reanimated10.Easing.inOut(import_react_native_reanimated10.Easing.sin) }),
        -1
      );
    } else if (state === "listening") {
      anim.value = (0, import_react_native_reanimated10.withRepeat)(
        (0, import_react_native_reanimated10.withTiming)(1, { duration: 3e3, easing: import_react_native_reanimated10.Easing.inOut(import_react_native_reanimated10.Easing.sin) }),
        -1
      );
    } else if (state === "thinking") {
      anim.value = (0, import_react_native_reanimated10.withRepeat)(
        (0, import_react_native_reanimated10.withTiming)(1, { duration: 2e3, easing: import_react_native_reanimated10.Easing.inOut(import_react_native_reanimated10.Easing.sin) }),
        -1
      );
      orbit.value = (0, import_react_native_reanimated10.withRepeat)(
        (0, import_react_native_reanimated10.withTiming)(1, { duration: 2e3, easing: import_react_native_reanimated10.Easing.linear }),
        -1
      );
    } else if (state === "speaking") {
      anim.value = (0, import_react_native_reanimated10.withRepeat)(
        (0, import_react_native_reanimated10.withTiming)(1, { duration: 400, easing: import_react_native_reanimated10.Easing.inOut(import_react_native_reanimated10.Easing.sin) }),
        -1
      );
    } else if (state === "error") {
      anim.value = (0, import_react_native_reanimated10.withRepeat)(
        (0, import_react_native_reanimated10.withSequence)(
          (0, import_react_native_reanimated10.withTiming)(1, { duration: 100 }),
          (0, import_react_native_reanimated10.withTiming)(0, { duration: 100 }),
          (0, import_react_native_reanimated10.withTiming)(0.7, { duration: 80 }),
          (0, import_react_native_reanimated10.withTiming)(0, { duration: 200 }),
          (0, import_react_native_reanimated10.withDelay)(1500, (0, import_react_native_reanimated10.withTiming)(0, { duration: 0 }))
        ),
        -1
      );
      errorAura.value = (0, import_react_native_reanimated10.withSequence)(
        (0, import_react_native_reanimated10.withTiming)(1, { duration: 80 }),
        (0, import_react_native_reanimated10.withTiming)(0.5, { duration: 60 }),
        (0, import_react_native_reanimated10.withTiming)(0.8, { duration: 80 }),
        (0, import_react_native_reanimated10.withTiming)(0, { duration: 300, easing: import_react_native_reanimated10.Easing.bezier(0.4, 0, 1, 1) })
      );
    }
    return () => {
      (0, import_react_native_reanimated10.cancelAnimation)(anim);
      (0, import_react_native_reanimated10.cancelAnimation)(orbit);
      (0, import_react_native_reanimated10.cancelAnimation)(errorAura);
    };
  }, [state]);
  const isError = state === "error";
  const core = { idle: 32, listening: 44, thinking: 24, speaking: 44, error: 22 }[state];
  const auraBase = { idle: 0, listening: 80, thinking: 50, speaking: 90, error: 50 }[state];
  const coreAnimStyle = (0, import_react_native_reanimated10.useAnimatedStyle)(() => {
    const coreScale = state === "listening" ? (0, import_react_native_reanimated10.interpolate)(anim.value, [0, 0.5, 1], [0.9, 1.12, 0.9]) : state === "speaking" ? (0, import_react_native_reanimated10.interpolate)(anim.value, [0, 0.5, 1], [0.94, 1.06, 0.94]) : state === "thinking" ? (0, import_react_native_reanimated10.interpolate)(anim.value, [0, 0.5, 1], [0.96, 1.04, 0.96]) : (0, import_react_native_reanimated10.interpolate)(anim.value, [0, 0.5, 1], [0.92, 1.08, 0.92]);
    const errorFlash = (0, import_react_native_reanimated10.interpolate)(anim.value, [0, 1], [1, 0.4]);
    return {
      transform: [{ scale: coreScale }],
      opacity: isError ? errorFlash : 1
    };
  });
  const auraAnimStyle = (0, import_react_native_reanimated10.useAnimatedStyle)(() => {
    const auraScale = state === "listening" ? (0, import_react_native_reanimated10.interpolate)(anim.value, [0, 0.5, 1], [0.85, 1.15, 0.85]) : state === "speaking" ? (0, import_react_native_reanimated10.interpolate)(anim.value, [0, 0.5, 1], [0.9, 1.1, 0.9]) : (0, import_react_native_reanimated10.interpolate)(anim.value, [0, 0.5, 1], [0.95, 1.05, 0.95]);
    return {
      transform: [{ scale: isError ? 1 : auraScale }],
      opacity: isError ? errorAura.value : 1
    };
  });
  const orbitAnimStyle = (0, import_react_native_reanimated10.useAnimatedStyle)(() => {
    const rotate = (0, import_react_native_reanimated10.interpolate)(orbit.value, [0, 1], [0, 360]);
    return {
      transform: [{ rotate: `${rotate}deg` }]
    };
  });
  const coreColor = isError ? color.danger[300] : theme.iris;
  const auraColor = isError ? "rgba(249,176,138,0.12)" : theme.irisSoft;
  return /* @__PURE__ */ (0, import_jsx_runtime66.jsxs)(import_react_native62.View, { style: { alignItems: "center" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime66.jsxs)(import_react_native62.View, { style: { width: size, height: size, alignItems: "center", justifyContent: "center" }, children: [
      auraBase > 0 && /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(import_react_native_reanimated10.default.View, { style: [{
        position: "absolute",
        width: auraBase,
        height: auraBase,
        borderRadius: auraBase / 2,
        backgroundColor: auraColor
      }, auraAnimStyle] }),
      state === "thinking" && /* @__PURE__ */ (0, import_jsx_runtime66.jsxs)(import_react_native_reanimated10.default.View, { style: [{ position: "absolute", width: 70, height: 70 }, orbitAnimStyle], children: [
        /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(import_react_native62.View, { style: { position: "absolute", top: 0, left: 32, width: 5, height: 5, borderRadius: 2.5, backgroundColor: theme.irisDot } }),
        /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(import_react_native62.View, { style: { position: "absolute", bottom: 0, left: 32, width: 4, height: 4, borderRadius: 2, backgroundColor: theme.irisBorder } }),
        /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(import_react_native62.View, { style: { position: "absolute", top: 32, right: 0, width: 3, height: 3, borderRadius: 1.5, backgroundColor: theme.irisBorder } })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(import_react_native_reanimated10.default.View, { style: [{
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
    /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(import_react_native62.Text, { style: {
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
var import_react_native63 = require("react-native");
var import_jsx_runtime67 = require("react/jsx-runtime");
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
    if (uri) import_react_native63.Linking.openURL(uri);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)(
    import_react_native63.Pressable,
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
        /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)(import_react_native63.View, { style: {
          aspectRatio: 16 / 9,
          backgroundColor: theme.hoverOverlay,
          alignItems: "center",
          justifyContent: "center"
        }, children: [
          thumbSource && /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(import_react_native63.Image, { source: thumbSource, style: { position: "absolute", width: "100%", height: "100%" }, resizeMode: "cover" }),
          /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(import_react_native63.View, { style: {
            width: sp[9],
            height: sp[9],
            borderRadius: sp[9] / 2,
            backgroundColor: theme.accent,
            alignItems: "center",
            justifyContent: "center"
          }, children: /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(Icon, { name: "play", size: icon.lg, color: theme.accentFg }) }),
          duration && /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(import_react_native63.View, { style: {
            position: "absolute",
            bottom: sp[2],
            right: sp[2],
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: r[1],
            paddingHorizontal: sp[1],
            paddingVertical: 1
          }, children: /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(import_react_native63.Text, { style: { fontFamily: font.mono, fontSize: fs[10], color: color.chalk[100] }, children: duration }) })
        ] }),
        (title || attribution) && /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)(import_react_native63.View, { style: { padding: sp[3], paddingHorizontal: sp[4] }, children: [
          title ? /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(import_react_native63.Text, { style: { fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fg }, children: title }) : null,
          attribution && /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(import_react_native63.Text, { style: { fontFamily: font.sans, fontSize: fs[11], color: theme.fgFaint, marginTop: sp[0.5] }, children: attribution })
        ] })
      ]
    }
  );
}

// rn/ChatMessage.tsx
var import_react_native65 = require("react-native");

// rn/TypingIndicator.tsx
var import_react37 = require("react");
var import_react_native64 = require("react-native");
var import_react_native_reanimated11 = __toESM(require("react-native-reanimated"));
var import_jsx_runtime68 = require("react/jsx-runtime");
var DOT_SIZE = sp[1];
var DOT_BOUNCE = -sp[1];
var DOT_DURATION = 300;
var DOT_STAGGER = 150;
function Dot({ index }) {
  const { theme } = useTheme();
  const translateY = (0, import_react_native_reanimated11.useSharedValue)(0);
  (0, import_react37.useEffect)(() => {
    translateY.value = (0, import_react_native_reanimated11.withDelay)(
      index * DOT_STAGGER,
      (0, import_react_native_reanimated11.withRepeat)(
        (0, import_react_native_reanimated11.withSequence)(
          (0, import_react_native_reanimated11.withTiming)(DOT_BOUNCE, { duration: DOT_DURATION, easing: import_react_native_reanimated11.Easing.inOut(import_react_native_reanimated11.Easing.sin) }),
          (0, import_react_native_reanimated11.withTiming)(0, { duration: DOT_DURATION, easing: import_react_native_reanimated11.Easing.inOut(import_react_native_reanimated11.Easing.sin) }),
          (0, import_react_native_reanimated11.withDelay)((2 - index) * DOT_STAGGER, (0, import_react_native_reanimated11.withTiming)(0, { duration: 0 }))
        ),
        -1
      )
    );
    return () => (0, import_react_native_reanimated11.cancelAnimation)(translateY);
  }, []);
  const animStyle = (0, import_react_native_reanimated11.useAnimatedStyle)(() => ({
    transform: [{ translateY: translateY.value }]
  }));
  return /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(import_react_native_reanimated11.default.View, { style: [{
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: theme.irisDot
  }, animStyle] });
}
function TypingIndicator() {
  return /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)(import_react_native64.View, { style: { flexDirection: "row", gap: sp[1], paddingVertical: sp[1], alignSelf: "flex-start" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(Dot, { index: 0 }),
    /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(Dot, { index: 1 }),
    /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(Dot, { index: 2 })
  ] });
}

// rn/ChatMessage.tsx
var import_jsx_runtime69 = require("react/jsx-runtime");
function ChatMessage({ children, from, confirmed = true, thinking, revealedLength }) {
  const { theme, mode } = useTheme();
  const isVoid = mode === "void";
  if (from === "tutor" && thinking) {
    return /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(import_react_native65.View, { style: { alignSelf: "flex-start", paddingStart: sp[4] }, children: /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(TypingIndicator, {}) });
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
    return /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(import_react_native65.View, { style: { borderStartWidth: 2, borderStartColor: theme.irisBorder, paddingStart: sp[4], alignSelf: "flex-start", maxWidth: "80%" }, children: /* @__PURE__ */ (0, import_jsx_runtime69.jsxs)(import_react_native65.Text, { style: { fontFamily: font.sans, fontSize: fs[14], lineHeight: fs[14] * 1.5 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(import_react_native65.Text, { style: { color: theme.fg }, children: revealed }),
      unrevealed ? /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(import_react_native65.Text, { style: { color: theme.fgFaint }, children: unrevealed }) : null
    ] }) });
  }
  const accentRGB = isVoid ? "rgba(100,216,174," : "rgba(42,138,106,";
  const chalkRGB = isVoid ? "rgba(232,228,220," : "rgba(10,15,26,";
  return /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(import_react_native65.View, { style: {
    borderEndWidth: 2,
    borderEndColor: confirmed ? `${accentRGB}0.4)` : `${accentRGB}0.1)`,
    paddingVertical: sp[3],
    paddingHorizontal: sp[4],
    backgroundColor: confirmed ? theme.hoverOverlay : `${chalkRGB}0.02)`,
    borderTopStartRadius: r[2],
    borderBottomStartRadius: r[2],
    alignSelf: "flex-end",
    maxWidth: "80%"
  }, children: /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(import_react_native65.Text, { style: {
    fontFamily: font.sans,
    fontSize: fs[14],
    color: confirmed ? theme.fg : theme.fgFaint,
    lineHeight: fs[14] * 1.5,
    textAlign: "right",
    fontStyle: confirmed ? "normal" : "italic"
  }, children }) });
}

// rn/BreakdownCard.tsx
var import_react_native66 = require("react-native");
var import_jsx_runtime70 = require("react/jsx-runtime");
function BreakdownCard({ title, points }) {
  const { theme } = useTheme();
  return /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)(import_react_native66.View, { style: { backgroundColor: theme.inputBg, borderRadius: r[2], padding: sp[4] }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(import_react_native66.Text, { style: { fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[600], color: theme.fg, marginBottom: sp[3] }, children: title }),
    points.map((point, i) => /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)(import_react_native66.View, { style: { flexDirection: "row", gap: sp[2], marginBottom: sp[2] }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(import_react_native66.View, { style: { width: 4, height: 4, borderRadius: 1, backgroundColor: theme.irisDot, marginTop: 6, flexShrink: 0 } }),
      /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(import_react_native66.Text, { style: { flex: 1, fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5 }, children: point })
    ] }, i))
  ] });
}

// rn/ActivityCard.tsx
var import_react_native67 = require("react-native");
var import_jsx_runtime71 = require("react/jsx-runtime");
function ActivityCard({ title, description, buttonLabel = "Start", complete, score, onPress }) {
  const { theme } = useTheme();
  return /* @__PURE__ */ (0, import_jsx_runtime71.jsxs)(import_react_native67.View, { accessibilityRole: "none", style: { backgroundColor: theme.inputBg, borderRadius: r[2], borderWidth: 1, borderColor: complete ? theme.accentBorder : theme.border, padding: sp[4] }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(import_react_native67.Text, { style: { fontFamily: font.mono, fontSize: fs[10], letterSpacing: 1, textTransform: "uppercase", fontWeight: fw[600], color: theme.irisLabel, marginBottom: sp[2] }, children: "Activity" }),
    /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(import_react_native67.Text, { style: { fontFamily: font.serif, fontSize: fs[15], color: theme.fg, marginBottom: description ? sp[1] : sp[3] }, children: title }),
    description && /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(import_react_native67.Text, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgSubtle, marginBottom: sp[3] }, children: description }),
    complete ? /* @__PURE__ */ (0, import_jsx_runtime71.jsxs)(import_react_native67.View, { style: { flexDirection: "row", alignItems: "center", gap: sp[2], marginTop: description ? 0 : sp[2] }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(import_react_native67.Text, { style: { fontFamily: font.mono, fontSize: fs[11], fontWeight: fw[600], color: theme.accent }, children: "Complete" }),
      score && /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(import_react_native67.Text, { style: { fontFamily: font.mono, fontSize: fs[11], color: theme.accent }, children: score })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(Button, { variant: "primary", size: "sm", onPress, children: buttonLabel })
  ] });
}

// rn/ResourceList.tsx
var import_react38 = require("react");
var import_react_native68 = require("react-native");
var import_jsx_runtime72 = require("react/jsx-runtime");
function ResourceList({ title = "Resources", links }) {
  const { theme } = useTheme();
  const [openIdx, setOpenIdx] = (0, import_react38.useState)(null);
  return /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(import_jsx_runtime72.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(import_react_native68.View, { style: { backgroundColor: theme.inputBg, borderRadius: r[2], padding: sp[4] }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_react_native68.Text, { style: { fontFamily: font.mono, fontSize: fs[10], letterSpacing: 1, textTransform: "uppercase", fontWeight: fw[600], color: theme.fgFaint, marginBottom: sp[3] }, children: title }),
      links.map((link, i) => /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_react_native68.Pressable, { accessibilityRole: "link", onPress: () => {
        if (link.onPress) return link.onPress();
        if (link.content) setOpenIdx(i);
      }, children: /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_react_native68.Text, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.accent, marginBottom: sp[2] }, children: link.label }) }, i))
    ] }),
    openIdx !== null && links[openIdx]?.content && /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(FullSheet, { visible: true, onClose: () => setOpenIdx(null), title: links[openIdx].label, children: links[openIdx].content })
  ] });
}

// rn/SlidesCard.tsx
var import_react39 = require("react");
var import_react_native69 = require("react-native");
var import_jsx_runtime73 = require("react/jsx-runtime");
function SlidesCard({ title, attribution, slides, onPress }) {
  const { theme } = useTheme();
  const [open, setOpen] = (0, import_react39.useState)(false);
  const [current, setCurrent] = (0, import_react39.useState)(0);
  const handlePress = () => {
    if (onPress) return onPress();
    if (slides.length) setOpen(true);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)(import_jsx_runtime73.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
      import_react_native69.Pressable,
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
        children: /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)(import_react_native69.View, { style: { flexDirection: "row", padding: sp[3], gap: sp[3], alignItems: "center" }, children: [
          slides.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
            import_react_native69.Image,
            {
              source: slides[0],
              style: { width: 56, height: 36, borderRadius: r[1], backgroundColor: theme.hoverOverlay },
              resizeMode: "cover"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)(import_react_native69.View, { style: { flex: 1 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(import_react_native69.Text, { style: { fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fg }, children: title }),
            /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)(import_react_native69.Text, { style: { fontFamily: font.sans, fontSize: fs[11], color: theme.fgFaint, marginTop: sp[0.5] }, children: [
              attribution ? `${attribution} \xB7 ` : "",
              slides.length,
              " slide",
              slides.length !== 1 ? "s" : ""
            ] })
          ] })
        ] })
      }
    ),
    slides.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)(FullSheet, { visible: open, onClose: () => setOpen(false), title: `${title} \xB7 ${current + 1}/${slides.length}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
        import_react_native69.Image,
        {
          source: slides[current],
          style: { width: "100%", aspectRatio: 16 / 9, borderRadius: r[2], marginBottom: sp[5] },
          resizeMode: "contain"
        }
      ),
      slides.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)(import_react_native69.View, { style: { flexDirection: "row", gap: sp[3] }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(Button, { variant: "secondary", size: "sm", disabled: current === 0, onPress: () => setCurrent(current - 1), children: "Prev" }),
        /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(Button, { variant: "secondary", size: "sm", disabled: current === slides.length - 1, onPress: () => setCurrent(current + 1), children: "Next" })
      ] })
    ] })
  ] });
}

// rn/WorkedExampleCard.tsx
var import_react40 = require("react");
var import_react_native70 = require("react-native");
var import_jsx_runtime74 = require("react/jsx-runtime");
function WorkedExampleCard({ title, steps, onPress }) {
  const { theme } = useTheme();
  const [open, setOpen] = (0, import_react40.useState)(false);
  const handlePress = () => {
    if (onPress) return onPress();
    if (steps?.length) setOpen(true);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)(import_jsx_runtime74.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(
      import_react_native70.Pressable,
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
        children: /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)(import_react_native70.View, { style: { flexDirection: "row", padding: sp[4], gap: sp[3], alignItems: "center" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(import_react_native70.View, { style: {
            width: 32,
            height: 32,
            borderRadius: r[1],
            backgroundColor: theme.irisSoft,
            borderWidth: 1,
            borderColor: theme.irisBorder,
            alignItems: "center",
            justifyContent: "center"
          }, children: /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(import_react_native70.Text, { style: { fontFamily: font.mono, fontSize: fs[12], fontWeight: fw[600], color: theme.iris }, children: steps?.length || "?" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)(import_react_native70.View, { style: { flex: 1 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(import_react_native70.Text, { style: { fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fg }, children: title }),
            /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)(import_react_native70.Text, { style: { fontFamily: font.sans, fontSize: fs[11], color: theme.fgFaint, marginTop: sp[0.5] }, children: [
              steps?.length || 0,
              " step worked example"
            ] })
          ] })
        ] })
      }
    ),
    steps && steps.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(FullSheet, { visible: open, onClose: () => setOpen(false), title: "Worked example", children: steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)(import_react_native70.View, { style: { flexDirection: "row", gap: sp[4], marginBottom: sp[6] }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(import_react_native70.View, { style: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: theme.irisSoft,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: 2
      }, children: /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(import_react_native70.Text, { style: { fontFamily: font.mono, fontSize: fs[11], fontWeight: fw[600], color: theme.iris }, children: i + 1 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)(import_react_native70.View, { style: { flex: 1 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(import_react_native70.Text, { style: { fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[600], color: theme.fg, marginBottom: sp[2] }, children: step.title }),
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(import_react_native70.Text, { style: { fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.6 }, children: step.content })
      ] })
    ] }, i)) })
  ] });
}

// rn/Identity.tsx
var import_react_native71 = require("react-native");
var import_jsx_runtime75 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime75.jsxs)(import_react_native71.View, { style: { flexDirection: "row", alignItems: "center", gap: sp[3] }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(Avatar, { initials, imageUri, size: avatarSize, color: avatarColor, status }),
    /* @__PURE__ */ (0, import_jsx_runtime75.jsxs)(import_react_native71.View, { style: { flex: 1 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime75.jsxs)(import_react_native71.View, { style: { flexDirection: "row", alignItems: "center", gap: sp[2] }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(import_react_native71.Text, { style: { fontFamily: font.sans, fontSize: nameFs, fontWeight: fw[600], color: theme.fg }, numberOfLines: 1, children: name }),
        badge !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(Badge, { variant: "accent", children: String(badge) })
      ] }),
      role && /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(import_react_native71.Text, { style: { fontFamily: font.mono, fontSize: fs[11], color: theme.fgSubtle, marginTop: sp[0.5] }, children: role }),
      meta && /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(import_react_native71.Text, { style: { fontFamily: font.sans, fontSize: fs[12], color: theme.fgFaint, marginTop: sp[0.5] }, children: meta })
    ] }),
    right
  ] });
}

// rn/CardGrid.tsx
var import_react41 = __toESM(require("react"));
var import_react_native72 = require("react-native");
var import_jsx_runtime76 = require("react/jsx-runtime");
function CardGrid({ children, columns = 2 }) {
  const items = import_react41.default.Children.toArray(children);
  const rows = [];
  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns));
  }
  return /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(import_react_native72.View, { style: { gap: sp[4] }, children: rows.map((row, ri) => /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)(import_react_native72.View, { style: { flexDirection: "row", gap: sp[4] }, children: [
    row.map((item, ci) => /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(import_react_native72.View, { style: { flex: 1 }, children: item }, ci)),
    row.length < columns && Array.from({ length: columns - row.length }).map((_, fi) => /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(import_react_native72.View, { style: { flex: 1 } }, `fill-${fi}`))
  ] }, ri)) });
}

// rn/Leaderboard.tsx
var import_react42 = require("react");
var import_react_native73 = require("react-native");
var import_jsx_runtime77 = require("react/jsx-runtime");
function Leaderboard({ entries, label = "Rank", unit = "jugs" }) {
  const { theme } = useTheme();
  const renderItem = (0, import_react42.useCallback)(({ item, index }) => {
    const rank = index + 1;
    const isTop3 = rank <= 3;
    const rankColors = [color.gold[400], color.chalk[300], color.gold[500]];
    return /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)(import_react_native73.View, { style: {
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
      /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(import_react_native73.Text, { style: {
        fontFamily: font.mono,
        fontSize: fs[12],
        fontWeight: fw[700],
        color: isTop3 ? rankColors[rank - 1] : theme.fgFaint,
        minWidth: 20,
        textAlign: "center"
      }, children: rank }),
      /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(Avatar, { initials: item.initials, size: "sm", color: item.avatarColor }),
      /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(import_react_native73.Text, { style: {
        fontFamily: font.sans,
        fontSize: fs[14],
        fontWeight: item.isCurrent ? fw[600] : fw[400],
        color: theme.fg,
        flex: 1
      }, numberOfLines: 1, children: item.name }),
      /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(import_react_native73.Text, { style: {
        fontFamily: font.mono,
        fontSize: fs[13],
        fontWeight: fw[600],
        color: isTop3 ? rankColors[rank - 1] : theme.fgMuted
      }, children: item.score })
    ] });
  }, [theme]);
  const keyExtractor = (0, import_react42.useCallback)((_, i) => String(i), []);
  return /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(
    import_react_native73.FlatList,
    {
      data: entries,
      renderItem,
      keyExtractor,
      scrollEnabled: false
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActivityCard,
  Alert,
  Avatar,
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
  ChatMessage,
  Checkbox,
  CheckboxGroup,
  Chip,
  CircularProgress,
  ConstellationPattern,
  Dialog,
  Divider,
  DragItem,
  DragItemContent,
  DropZone,
  DuneDynamic,
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
  Pagination,
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
  Slider,
  SlidesCard,
  StarsDynamic,
  Stepper,
  Switch,
  Table,
  Tabs,
  TerrainDynamic,
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
});
//# sourceMappingURL=index.js.map