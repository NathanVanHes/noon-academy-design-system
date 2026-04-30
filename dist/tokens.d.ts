/**
 * Noon Academy — React Native Design Tokens
 * Single source of truth. Import this in every component.
 */
declare const color: {
    readonly void: {
        readonly 50: "#232c43";
        readonly 100: "#1a2236";
        readonly 200: "#10172a";
        readonly 300: "#0a0f1a";
        readonly 400: "#060913";
    };
    readonly chalk: {
        readonly 100: "#f5f1e8";
        readonly 200: "#e8e4dc";
        readonly 300: "#c9c4b8";
        readonly 400: "#8e8a80";
    };
    readonly paper: {
        readonly 100: "#fbf8ef";
        readonly 200: "#f2ece0";
        readonly 300: "#e8e1d2";
    };
    readonly noon: {
        readonly 100: "#c8f4e2";
        readonly 200: "#9EEACB";
        readonly 300: "#7FE3BE";
        readonly 400: "#64D8AE";
        readonly 500: "#3FAE87";
        readonly 600: "#2A8A6A";
        readonly 700: "#194d3b";
        readonly 800: "#0a3326";
    };
    readonly gold: {
        readonly 200: "#f0cf5a";
        readonly 300: "#e0b83a";
        readonly 400: "#c9a227";
        readonly 500: "#8e7019";
        readonly 600: "#5a4610";
    };
    readonly iris: {
        readonly 300: "#C7A8FF";
        readonly 400: "#B08AF9";
        readonly 500: "#8E63E0";
        readonly 600: "#6B3FA8";
        readonly 700: "#5C3D8F";
        readonly 800: "#3D2460";
    };
    readonly blue: {
        readonly 300: "#96BCFF";
        readonly 400: "#6BA3FF";
        readonly 500: "#4881E0";
    };
    readonly danger: {
        readonly 300: "#e58a7f";
        readonly 400: "#c55a4e";
        readonly 500: "#9a4339";
    };
    readonly warn: {
        readonly 300: "#F5C456";
        readonly 400: "#E8A830";
        readonly 500: "#C48A20";
    };
    readonly terra: {
        readonly 200: "#E8B49A";
        readonly 300: "#D4956E";
        readonly 400: "#C07A4E";
        readonly 500: "#A5633A";
        readonly 600: "#8A4E2A";
        readonly 700: "#6B3A1E";
        readonly 800: "#4A2812";
    };
};
declare const voidTheme: {
    readonly bg: "#0a0f1a";
    readonly bgSunken: "#060913";
    readonly bgRaised: "#10172a";
    readonly bgOverlay: "#1a2236";
    readonly fg: "rgba(232,228,220,1)";
    readonly fgMuted: "rgba(232,228,220,0.70)";
    readonly fgSubtle: "rgba(232,228,220,0.55)";
    readonly fgFaint: "rgba(232,228,220,0.35)";
    readonly fgDisabled: "rgba(232,228,220,0.45)";
    readonly fgInverse: "#0a0f1a";
    readonly border: "rgba(232,228,220,0.10)";
    readonly borderStrong: "rgba(232,228,220,0.22)";
    readonly divider: "rgba(232,228,220,0.06)";
    readonly hoverOverlay: "rgba(232,228,220,0.04)";
    readonly activeOverlay: "rgba(232,228,220,0.08)";
    readonly selectedOverlay: "rgba(232,228,220,0.06)";
    readonly inputBg: "rgba(232,228,220,0.03)";
    readonly accent: "#64D8AE";
    readonly accentHover: "#7FE3BE";
    readonly accentActive: "#3FAE87";
    readonly accentFg: "#0a3326";
    readonly accentSoft: "rgba(100,216,174,0.14)";
    readonly accentBorder: "rgba(100,216,174,0.35)";
    readonly accentGlow: "rgba(100,216,174,0.15)";
    readonly signal: "#c9a227";
    readonly signalDim: "#8e7019";
    readonly signalBright: "#e0b83a";
    readonly signalSoft: "rgba(201,162,39,0.12)";
    readonly signalBorder: "rgba(201,162,39,0.35)";
    readonly danger: "#c55a4e";
    readonly dangerSoft: "rgba(197,90,78,0.10)";
    readonly dangerBorder: "rgba(197,90,78,0.40)";
    readonly iris: "#B08AF9";
    readonly irisSoft: "rgba(176,138,249,0.10)";
    readonly irisBorder: "rgba(176,138,249,0.40)";
    readonly irisLabel: "rgba(176,138,249,0.60)";
    readonly irisDot: "rgba(176,138,249,0.50)";
    readonly terra: "#8A4E2A";
    readonly terraSoft: "rgba(138,78,42,0.10)";
    readonly terraBorder: "rgba(138,78,42,0.35)";
};
declare const paperTheme: {
    readonly bg: "#f2ece0";
    readonly bgSunken: "#e8e1d2";
    readonly bgRaised: "#fbf8ef";
    readonly bgOverlay: "#fbf8ef";
    readonly fg: "#0a0f1a";
    readonly fgMuted: "rgba(10,15,26,0.72)";
    readonly fgSubtle: "rgba(10,15,26,0.55)";
    readonly fgFaint: "rgba(10,15,26,0.38)";
    readonly fgDisabled: "rgba(10,15,26,0.45)";
    readonly fgInverse: "#f5f1e8";
    readonly border: "rgba(10,15,26,0.10)";
    readonly borderStrong: "rgba(10,15,26,0.22)";
    readonly divider: "rgba(10,15,26,0.06)";
    readonly hoverOverlay: "rgba(10,15,26,0.04)";
    readonly activeOverlay: "rgba(10,15,26,0.08)";
    readonly selectedOverlay: "rgba(10,15,26,0.06)";
    readonly inputBg: "rgba(10,15,26,0.02)";
    readonly accent: "#2A8A6A";
    readonly accentHover: "#238060";
    readonly accentActive: "#1a6048";
    readonly accentFg: "#fbf8ef";
    readonly accentSoft: "rgba(25,110,82,0.10)";
    readonly accentBorder: "rgba(25,110,82,0.30)";
    readonly accentGlow: "rgba(25,110,82,0.12)";
    readonly signal: "#c9a227";
    readonly signalDim: "rgba(201,162,39,0.70)";
    readonly signalBright: "#c9a227";
    readonly signalSoft: "rgba(201,162,39,0.12)";
    readonly signalBorder: "rgba(201,162,39,0.30)";
    readonly danger: "#9a4339";
    readonly dangerSoft: "rgba(154,67,57,0.10)";
    readonly dangerBorder: "rgba(154,67,57,0.30)";
    readonly iris: "#8E63E0";
    readonly irisSoft: "rgba(142,99,224,0.10)";
    readonly irisBorder: "rgba(142,99,224,0.35)";
    readonly irisLabel: "rgba(142,99,224,0.55)";
    readonly irisDot: "rgba(142,99,224,0.45)";
    readonly terra: "#C07A4E";
    readonly terraSoft: "rgba(192,122,78,0.12)";
    readonly terraBorder: "rgba(192,122,78,0.35)";
};
type Theme = {
    [K in keyof typeof voidTheme]: string;
};
declare const sp: {
    readonly 0: 0;
    readonly 0.5: 2;
    readonly 1: 4;
    readonly 2: 8;
    readonly 3: 12;
    readonly 4: 16;
    readonly 5: 20;
    readonly 6: 24;
    readonly 7: 32;
    readonly 8: 40;
    readonly 9: 48;
    readonly 10: 64;
    readonly 11: 80;
    readonly 12: 96;
};
declare const icon: {
    readonly xs: 6;
    readonly sm: 10;
    readonly md: 14;
    readonly lg: 18;
    readonly xl: 20;
    readonly tab: 22;
    readonly '2xl': 28;
};
declare const r: {
    readonly 0: 0;
    readonly 1: 2;
    readonly 2: 4;
    readonly 3: 6;
    readonly 4: 8;
    readonly pill: 999;
};
declare const h: {
    readonly xs: 24;
    readonly sm: 32;
    readonly md: 40;
    readonly lg: 48;
    readonly xl: 56;
};
declare const fs: {
    readonly 9: 9;
    readonly 10: 10;
    readonly 11: 11;
    readonly 12: 12;
    readonly 13: 13;
    readonly 14: 14;
    readonly 15: 15;
    readonly 16: 16;
    readonly 18: 18;
    readonly 20: 20;
    readonly 22: 22;
    readonly 24: 24;
    readonly 28: 28;
    readonly 32: 32;
    readonly 40: 40;
    readonly 48: 48;
};
declare const fw: {
    300: "300";
    400: "400";
    500: "500";
    600: "600";
    700: "700";
};
declare const lh: {
    readonly tight: 1.05;
    readonly snug: 1.2;
    readonly normal: 1.5;
    readonly loose: 1.7;
};
declare const font: {
    readonly serif: "CrimsonPro";
    readonly sans: "Vazirmatn";
    readonly mono: "JetBrainsMono";
    readonly arabic: "NotoNaskhArabic";
};
declare const dur: {
    readonly 1: 120;
    readonly 2: 200;
    readonly 3: 320;
};
/**
 * Elevation — platform-aware depth tokens.
 * Void: depth via brighter borders (inset borders in CSS → borderWidth/borderColor in RN).
 * Paper: depth via real drop shadows (iOS shadowX props, Android elevation).
 * Each level returns a style object spread-compatible with View style.
 */
declare const voidElevation: Record<number, Record<string, any>>;
declare const paperElevation: Record<number, Record<string, any>>;

export { type Theme, color, dur, font, fs, fw, h, icon, lh, paperElevation, paperTheme, r, sp, voidElevation, voidTheme };
