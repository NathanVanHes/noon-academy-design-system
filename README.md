# Proven Routes — Noon Academy Design System

A fully tokenised React Native design system for Noon Academy. Saudi-native visual language rooted in Empty Quarter geometry, surveyor's-notebook craft, and cartographic precision.

## Quick start

```tsx
import { ThemeProvider, Button, Card, Chip } from '@noon/design-system';
import { sp, fs, fw, font } from '@noon/design-system/tokens';

export default function App() {
  return (
    <ThemeProvider initial="void">
      <Button variant="primary" onPress={() => {}}>
        Get started
      </Button>
    </ThemeProvider>
  );
}
```

## Explorer

Run the interactive explorer to browse all components, tokens, and documentation:

```bash
cd preview && npx expo start
```

Press `w` for web, `i` for iOS simulator, or scan QR for Expo Go.

## Structure

```
rn/                    — React Native components (production)
  tokens.ts            — Colour, spacing, typography, and theme tokens
  ThemeContext.tsx      — Void/Paper theme provider
  Icon.tsx             — Custom SVG icon set (21 icons)
  Button.tsx           — And 40+ more components
  Waypoints.tsx        — Diamond markers + WaypointMarker
  Calendar.tsx         — Week/month calendar with assessment support

preview/               — Expo explorer app
  App.tsx              — Explorer shell with sidebar, playground, pages
  screens/pages.tsx    — All component documentation pages
  screens/VoiceTutorSession.tsx — Live voice tutor demo

reference/             — Design reference images

web/                   — Legacy HTML/CSS explorer (not RN)
  index.html           — Original web explorer
  project/             — CSS tokens and components
  dist/                — Generated token outputs
```

## Themes

Two themes: **Void** (dark) and **Paper** (light). All components adapt automatically via semantic tokens.

## Colour roles

- **Green (accent)** — action, CTA, confirmations
- **Gold (signal)** — journey, progress, waypoints
- **Iris (purple)** — voice tutor exclusively
- **Terra (terracotta)** — warmth, place, classroom
- **Danger (red)** — errors, destructive actions
- **Warn (amber)** — caution, rare UI warnings

## Key patterns

- Diamond markers for journey progress and important events
- Grid paper texture for brand surfaces
- Terrain contour lines for abstract backgrounds
- Voice tutor iris aura with state-based animations

## Typography

- **Body:** Vazirmatn (Arabic + Latin)
- **Serif headings:** Crimson Pro (Latin), Noto Naskh Arabic (Arabic)
- **Monospace:** JetBrains Mono
