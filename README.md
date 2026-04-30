# Proven Routes — Noon Academy Design System

A fully tokenised React Native design system for Noon Academy. Saudi-native visual language rooted in Empty Quarter geometry, surveyor's-notebook craft, and cartographic precision.

## Install

```bash
npm install @noon/design-system
```

Peer dependencies — install these in your app:

```bash
npm install react-native-svg react-native-safe-area-context
```

## Quick start

```tsx
import { ThemeProvider, Button, Card, Chip } from '@noon/design-system';
import { sp, fs, fw, font } from '@noon/design-system/tokens';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider initial="void">
        <Button variant="primary" onPress={() => {}}>
          Get started
        </Button>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
```

## Toast system

Wrap your app in `ToastProvider` for imperative toasts from anywhere:

```tsx
import { ToastProvider, useToast } from '@noon/design-system';

// In your root
<ToastProvider>
  <App />
</ToastProvider>

// In any component
const toast = useToast();
toast.show({ message: 'Saved', variant: 'success' });
```

Variants: `info`, `success`, `warn`, `danger`. Toasts queue automatically.

## RTL and locale

Components respond to `I18nManager.isRTL` automatically:
- Calendar, TitleBar, and Menu chevrons flip direction
- Calendar defaults to Arabic locale (Arabic day/month names, Sunday-first week) when RTL is active

Pass a locale explicitly:

```tsx
<Calendar locale="ar" />
// or custom
<Calendar locale={{ dayNames: [...], months: [...], fullDays: [...], weekStart: 0, today: 'Today' }} />
```

## Safe areas

These components handle safe area insets internally — no wrapper needed:
- **Toast** — clears the notch/Dynamic Island at the top
- **BottomSheet** — content and actions clear the home indicator
- **BottomNav** — bottom padding clears the home indicator
- **FullSheet** — top and bottom insets handled

**TitleBar** does not handle safe areas — the parent screen should provide `SafeAreaView` or `useSafeAreaInsets`.

## Keyboard

**Dialog** and **BottomSheet** include `KeyboardAvoidingView` — they shift up when the software keyboard opens on iOS.

For screens with **Input** or **Textarea**, wrap your screen in `KeyboardAvoidingView` or use a `ScrollView` with `keyboardShouldPersistTaps="handled"`. Both support `forwardRef` for programmatic `.focus()`.

## Explorer

Browse all components, tokens, and documentation interactively:

```bash
cd preview && npx expo start
```

Press `w` for web, `i` for iOS simulator, or scan QR for Expo Go. Toggle **Void/Paper** theme and **RTL** from the top bar.

## Structure

```
rn/                    — React Native components (production)
  tokens.ts            — Colour, spacing, typography, and theme tokens
  ThemeContext.tsx      — Void/Paper theme provider
  ToastProvider.tsx     — Imperative toast system with queue
  Icon.tsx             — Custom SVG icon set (21 icons)
  Calendar.tsx         — Week/month calendar with locale support
  index.ts             — Public API barrel export
  ...40+ components

preview/               — Expo explorer app
  App.tsx              — Explorer shell with sidebar, RTL toggle
  screens/pages.tsx    — All component documentation pages

dist/                  — Built output (CJS + ESM + DTS)
```

## Build

```bash
npm run build          # tsup → dist/
npm run typecheck      # tsc --noEmit
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

## Typography

- **Body:** Vazirmatn (Arabic + Latin)
- **Serif headings:** Crimson Pro
- **Monospace:** JetBrains Mono

## Components

**Inputs:** Button, IconButton, Input, Textarea, Switch, Checkbox, CheckboxGroup, Radio, RadioGroup, Stepper, Segmented

**Selection:** Chip, QuizOption, FilterBar, Menu, Calendar

**Display:** Card, CardGrid, Avatar, Identity, Badge, Table, SessionCard, HomeworkCard, VideoCard, Divider, Skeleton, EmptyState

**Progress:** Waypoints, WaypointMarker, WaterVessel, SessionBar, LinearProgress, CircularProgress

**Navigation:** TitleBar, Tabs, BottomNav

**Feedback:** Alert, Toast, ToastProvider, Dialog, BottomSheet, FullSheet, Tooltip, Interstitial

**Graphical:** GridPaper, TerrainPattern, DunePattern, VoiceTutor, Icon

**Voice Tutor:** ChatMessage, BreakdownCard, ActivityCard, WorkedExampleCard, SlidesCard, ResourceList

**Composition:** Leaderboard, ButtonGroup
