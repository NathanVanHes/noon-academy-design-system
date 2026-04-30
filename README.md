# Proven Routes — Noon Academy Design System

Saudi-native React Native design system. Empty Quarter geometry, surveyor's-notebook craft, cartographic precision. Void-first. Paper sparingly. Gold is journey signal only.

## Install

```bash
npm install @noon/design-system
```

Peer dependencies:

```bash
npm install react-native-svg react-native-safe-area-context
```

## Setup

```tsx
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, Button } from '@noon/design-system';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider initial="void">
        <Button variant="primary" onPress={() => {}}>Get started</Button>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
```

## Explorer

Browse all components, tokens, and documentation:

```bash
cd preview && npx expo start
```

Toggle Void/Paper theme and RTL from the top bar.

## What's included

**40+ components** across inputs, display, navigation, feedback, progress, and graphical categories. Two themes (Void and Paper). Full token system for colour, spacing, typography, radii, elevation, and motion.

**RTL-aware.** Calendar, TitleBar, and Menu respond to `I18nManager.isRTL`. Calendar accepts a `locale` prop with built-in Arabic support.

**Safe area handling** built into Toast, BottomSheet, BottomNav, and FullSheet. Keyboard avoidance built into Dialog and BottomSheet.

**Accessibility** across all interactive components — roles, states, and labels for VoiceOver and TalkBack.

## Build

```bash
npm run build       # tsup → dist/ (CJS + ESM + DTS)
npm run typecheck   # tsc --noEmit
```

## Structure

```
rn/           Components + tokens (production source)
dist/         Built output
preview/      Expo explorer app
```

## Colour roles

- **Green (accent)** — action, CTA, confirmations
- **Gold (signal)** — journey, progress, waypoints
- **Iris (purple)** — voice tutor exclusively
- **Terra (terracotta)** — warmth, place, classroom
- **Danger (red)** — errors, destructive actions

## Typography

- **Vazirmatn** — body (Arabic + Latin)
- **Crimson Pro** — serif headings
- **JetBrains Mono** — code and labels
