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

The workflow: **clone the repo, run your AI tool inside it, and build.** The AI then works against the actual component source in `rn/` — not from memory — and `AGENTS.md` at the repo root gives it the rules automatically.

```bash
git clone https://github.com/NathanVanHes/noon-academy-design-system
cd noon-academy-design-system
claude        # Claude Code — or open the folder in Cursor
```

Then just ask for what you want:

> Build a leaderboard screen for Grade 11 Qudrat students — podium for the top 3, my rank pinned, weekly/all-time toggle. Put it in the explorer so I can preview it.

What makes this work:

- **`AGENTS.md`** is read automatically by Claude Code and Cursor. It carries the rules, token scales, theme roles, and the component inventory — and instructs the AI to open the real component files for props instead of guessing.
- **Every component is one file in `rn/`** — `rn/Button.tsx`, `rn/Card.tsx`, `rn/QuizOption.tsx`. The AI (and you) read these for the actual props.
- **Templates are real source to copy.** The six full screens live in `preview/screens/pages.tsx` (`LoginTemplate`, `HomeTemplate`, `QuizTemplate`, `ProfileTemplate`, `SessionDetailTemplate`, `JourneyTemplate`). Say *"start from HomeTemplate and swap the homework section for X"*.
- **Preview instantly.** A screen registered in `preview/App.tsx` (import → `NAV` → `PAGES`) shows up in the explorer on web, iOS, and Android via `npx expo start`.

Using a tool that can't see your files (claude.ai, ChatGPT)? Paste the prompt from the explorer's Build with AI page (`#aiprompt`) as the system prompt instead — it's the same content as `AGENTS.md`.

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
