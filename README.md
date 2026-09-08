# Proven Routes — Noon Academy Design System

Saudi-native React Native design system. Empty Quarter geometry, surveyor's-notebook craft, cartographic precision. Void-first. Paper sparingly. Gold is journey signal only.

## Install

```bash
npm install @noon/design-system
```

Peer dependencies:

```bash
npm install react-native-svg react-native-safe-area-context react-native-gesture-handler react-native-reanimated
```

## Setup

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, Button } from '@noon/design-system';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider initial="void">
          <Button variant="primary" onPress={() => {}}>Get started</Button>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
```

## Explorer

Hosted preview (no setup): **https://noon-design-system-nathan-noonacademys-projects.vercel.app**

Toggle Void/Paper theme and RTL from the top bar. Pages are deep-linkable on web via URL hash (e.g. `#aiprompt`, `#templates`).

Start with **Build with AI** (`#aiprompt`) — a copy-paste system prompt for AI builders (also mirrored in `AGENTS.md` at the repo root) — and **Templates** (`#templates`) — full screens (Login, Home, Quiz, Profile, Session detail, Journey) assembled from system components.

## Run it locally

```bash
git clone https://github.com/NathanVanHes/noon-academy-design-system
cd noon-academy-design-system/preview
npm install
npx expo start
```

Then, from the Expo dev server:

- **Web** — press `w` (opens in your browser)
- **iOS** — press `i` (needs Xcode + an iOS Simulator installed), or scan the QR code with the Expo Go app on your iPhone
- **Android** — press `a` (needs Android Studio + an emulator running), or scan the QR code with Expo Go on your device

## Build layouts with AI

The fastest way to go from idea to screen:

1. **Clone the repo and open it in Claude Code or Cursor.** Both pick up `AGENTS.md` automatically — no setup. Or, in any other AI tool, paste the prompt from the explorer's Build with AI page (`#aiprompt`) as your system prompt.
2. **Ask for a screen.** e.g. *"Build a leaderboard screen for Grade 11 Qudrat students with a podium, my rank pinned, and a weekly/all-time toggle."* The instructions steer the AI to real components (`rn/*.tsx`), real tokens, and the system's rules — no invented colours or props.
3. **Start from a template when one is close.** The full screens on the Templates page live in `preview/screens/pages.tsx` (search `LoginTemplate`, `HomeTemplate`, `QuizTemplate`, `ProfileTemplate`, `SessionDetailTemplate`, `JourneyTemplate`). Tell the AI to copy one and adapt it.
4. **Check props in the source.** Every component is a single file in `rn/` — e.g. `rn/Button.tsx`, `rn/Card.tsx`. The AI is instructed to read these instead of guessing; you can too.
5. **Preview your screen.** Drop it into `preview/screens/`, register it in `preview/App.tsx` (import → `NAV` entry → `PAGES` entry), and it appears in the explorer nav on web, iOS, and Android.

## What's included

**80+ components** across inputs, display, navigation, feedback, progress, learning, in-class, voice-tutor, and graphical categories. Two themes (Void and Paper). Full token system for colour, spacing, typography, radii, elevation, and motion.

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
- **Gold (signal)** — earned things only (streaks, milestones)
- **Iris (purple)** — AI tutor exclusively
- **Terra (terracotta)** — heat and urgency, never failure
- **Danger (red)** — errors, destructive actions
- **Teal (intel)** — Future teal, intelligence
- **Blue (water)** — selection and "current"

Green or gold **text** uses `theme.accentText` / `theme.signalText`; plain `accent`/`signal` are fills and borders only.

## Typography

- **Vazirmatn** — body (Arabic + Latin)
- **Crimson Pro** — serif headings
- **JetBrains Mono** — code and labels
