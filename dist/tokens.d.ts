/**
 * Noon Academy — React Native Design Tokens
 * Single source of truth. Import this in every component.
 */
declare const color: {
    readonly void: {
        readonly 50: "#3A3E47";
        readonly 100: "#2F333B";
        readonly 200: "#26282E";
        readonly 300: "#161A21";
        readonly 400: "#0D1016";
    };
    readonly chalk: {
        readonly 100: "#f5f1e8";
        readonly 200: "#e8e4dc";
        readonly 300: "#c9c4b8";
        readonly 400: "#8e8a80";
    };
    readonly paper: {
        readonly 100: "#FFFFFF";
        readonly 200: "#f5f1e8";
        readonly 300: "#e8e4dc";
    };
    readonly fog: {
        readonly 100: "#EFF1EE";
    };
    readonly plaster: {
        readonly 100: "#F1EBDD";
        readonly 200: "#EFE7D5";
    };
    readonly ink: {
        readonly 400: "#26282E";
        readonly 500: "#161A21";
        readonly 600: "#0D1016";
    };
    readonly clay: {
        readonly 200: "#CB7A50";
        readonly 300: "#BC5A37";
        readonly 400: "#A94E2A";
        readonly 500: "#96431F";
    };
    readonly teal: {
        readonly 300: "#5E8C7F";
        readonly 500: "#4F6157";
    };
    readonly water: {
        readonly 300: "#7C99B4";
        readonly 500: "#4A6B8A";
    };
    readonly oak: {
        readonly 200: "#E2D6BE";
        readonly 400: "#BC9F7B";
    };
    readonly sky: {
        readonly 300: "#B7CEDD";
        readonly 400: "#86A7BE";
        readonly 500: "#5C7E96";
    };
    readonly saffron: {
        readonly 300: "#EFD9A0";
        readonly 400: "#DDBA62";
        readonly 500: "#A8873E";
    };
    readonly rose: {
        readonly 300: "#E7B9B4";
        readonly 400: "#C98A87";
        readonly 500: "#9C5F5E";
    };
    readonly sage: {
        readonly 300: "#C6CCAA";
        readonly 400: "#9FAA7D";
        readonly 500: "#6F7C52";
    };
    readonly plum: {
        readonly 300: "#D3B4C4";
        readonly 400: "#AC7F97";
        readonly 500: "#7D5468";
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
    readonly bg: "#161A21";
    readonly bgSunken: "#0D1016";
    readonly bgRaised: "#26282E";
    readonly bgOverlay: "#2F333B";
    readonly fg: "rgba(241,235,221,1)";
    readonly fgMuted: "rgba(241,235,221,0.70)";
    readonly fgSubtle: "rgba(241,235,221,0.55)";
    readonly fgFaint: "rgba(241,235,221,0.35)";
    readonly fgDisabled: "rgba(241,235,221,0.45)";
    readonly fgInverse: "#161A21";
    readonly border: "rgba(241,235,221,0.10)";
    readonly borderStrong: "rgba(241,235,221,0.22)";
    readonly divider: "rgba(241,235,221,0.06)";
    readonly hoverOverlay: "rgba(241,235,221,0.04)";
    readonly activeOverlay: "rgba(241,235,221,0.08)";
    readonly selectedOverlay: "rgba(241,235,221,0.06)";
    readonly inputBg: "#0D1016";
    readonly accent: "#64D8AE";
    readonly accentHover: "#7FE3BE";
    readonly accentActive: "#3FAE87";
    readonly accentFg: "#161A21";
    readonly accentSoft: "rgba(100,216,174,0.14)";
    readonly accentBorder: "rgba(100,216,174,0.35)";
    readonly accentGlow: "rgba(100,216,174,0.15)";
    readonly accentText: "#64D8AE";
    readonly signal: "#c9a227";
    readonly signalDim: "#8e7019";
    readonly signalBright: "#e0b83a";
    readonly signalSoft: "rgba(201,162,39,0.12)";
    readonly signalBorder: "rgba(201,162,39,0.35)";
    readonly signalText: "#e0b83a";
    readonly danger: "#c55a4e";
    readonly dangerSoft: "rgba(197,90,78,0.10)";
    readonly dangerBorder: "rgba(197,90,78,0.40)";
    readonly iris: "#9D8CFF";
    readonly irisBright: "#9D8CFF";
    readonly irisGlow: "rgba(157,140,255,0.10)";
    readonly irisSoft: "rgba(157,140,255,0.10)";
    readonly irisBorder: "rgba(157,140,255,0.40)";
    readonly irisLabel: "rgba(157,140,255,0.60)";
    readonly irisDot: "rgba(157,140,255,0.50)";
    readonly terra: "#E8663A";
    readonly terraSoft: "rgba(232,102,58,0.10)";
    readonly terraBorder: "rgba(232,102,58,0.35)";
    readonly intel: "#5E8C7F";
    readonly intelSoft: "rgba(94,140,127,0.14)";
    readonly intelBorder: "rgba(94,140,127,0.40)";
    readonly water: "#7C99B4";
    readonly waterSoft: "rgba(124,153,180,0.14)";
    readonly waterBorder: "rgba(124,153,180,0.40)";
};
declare const paperTheme: {
    readonly bg: "#f5f1e8";
    readonly bgSunken: "#e8e4dc";
    readonly bgRaised: "#FFFFFF";
    readonly bgOverlay: "#FFFFFF";
    readonly fg: "#26282E";
    readonly fgMuted: "rgba(38,40,46,0.72)";
    readonly fgSubtle: "rgba(38,40,46,0.55)";
    readonly fgFaint: "rgba(38,40,46,0.38)";
    readonly fgDisabled: "rgba(38,40,46,0.45)";
    readonly fgInverse: "#F1EBDD";
    readonly border: "rgba(38,40,46,0.10)";
    readonly borderStrong: "rgba(38,40,46,0.22)";
    readonly divider: "rgba(38,40,46,0.06)";
    readonly hoverOverlay: "rgba(38,40,46,0.04)";
    readonly activeOverlay: "rgba(38,40,46,0.08)";
    readonly selectedOverlay: "rgba(38,40,46,0.06)";
    readonly inputBg: "#FFFFFF";
    readonly accent: "#6BAE93";
    readonly accentHover: "#61A188";
    readonly accentActive: "#54927A";
    readonly accentFg: "#26282E";
    readonly accentSoft: "rgba(107,174,147,0.14)";
    readonly accentBorder: "rgba(107,174,147,0.35)";
    readonly accentGlow: "rgba(107,174,147,0.15)";
    readonly accentText: "#1F6B52";
    readonly signal: "#c9a227";
    readonly signalDim: "rgba(201,162,39,0.70)";
    readonly signalBright: "#c9a227";
    readonly signalSoft: "rgba(201,162,39,0.12)";
    readonly signalBorder: "rgba(201,162,39,0.30)";
    readonly signalText: "#7A6414";
    readonly danger: "#9a4339";
    readonly dangerSoft: "rgba(154,67,57,0.10)";
    readonly dangerBorder: "rgba(154,67,57,0.30)";
    readonly iris: "#5A4A7D";
    readonly irisBright: "#8E63E0";
    readonly irisGlow: "rgba(142,99,224,0.14)";
    readonly irisSoft: "rgba(90,74,125,0.10)";
    readonly irisBorder: "rgba(90,74,125,0.35)";
    readonly irisLabel: "rgba(90,74,125,0.55)";
    readonly irisDot: "rgba(90,74,125,0.45)";
    readonly terra: "#BC5A37";
    readonly terraSoft: "rgba(188,90,55,0.12)";
    readonly terraBorder: "rgba(188,90,55,0.35)";
    readonly intel: "#4F6157";
    readonly intelSoft: "rgba(79,97,87,0.12)";
    readonly intelBorder: "rgba(79,97,87,0.35)";
    readonly water: "#4A6B8A";
    readonly waterSoft: "rgba(74,107,138,0.12)";
    readonly waterBorder: "rgba(74,107,138,0.35)";
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
 * Breakpoints — device classes for cross-device layout.
 * mobile < 768 ≤ tablet < 1024 ≤ desktop (window width, dp).
 */
declare const bp: {
    readonly tablet: 768;
    readonly desktop: 1024;
};
/**
 * Screen layout — container and column rules per device class.
 * Content lives in a centered container capped at containerMax; inside it,
 * desktop uses 12 columns, tablet 8, mobile a single column.
 * Navigation: bottom bar on mobile, left rail on tablet, left sidebar on desktop.
 */
declare const layout: {
    readonly containerMax: 1200;
    readonly readingMax: 720;
    readonly cols: {
        readonly mobile: 1;
        readonly tablet: 8;
        readonly desktop: 12;
    };
    readonly gutter: {
        readonly mobile: 20;
        readonly tablet: 32;
        readonly desktop: 40;
    };
    readonly colGap: 16;
};
/**
 * Elevation — platform-aware depth tokens.
 * Void: depth via brighter borders (inset borders in CSS → borderWidth/borderColor in RN).
 * Paper: depth via real drop shadows (iOS shadowX props, Android elevation).
 * Each level returns a style object spread-compatible with View style.
 */
declare const voidElevation: Record<number, Record<string, any>>;
declare const paperElevation: Record<number, Record<string, any>>;

export { type Theme, bp, color, dur, font, fs, fw, h, icon, layout, lh, paperElevation, paperTheme, r, sp, voidElevation, voidTheme };
