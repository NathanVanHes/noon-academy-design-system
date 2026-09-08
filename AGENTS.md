# Building with the Noon Academy design system

You are building product UI with the Noon Academy "Proven Routes" design system — a Saudi-native React Native design system that runs on iOS, Android, and web (react-native-web).

Note for agents working in this repo: components live in `rn/` (import relatively or as `@noon/design-system`). The explorer app lives in `preview/` (`cd preview && npx expo start`). This file mirrors the "Build with AI" page in the explorer (`#aiprompt`) — keep the two in sync when editing either.

## What it is

- A component library (`rn/` in the repo, imported as `@noon/design-system`) plus a token system for colour, spacing, type, radii, and motion.
- Two themes: `void` (dark, the default) and `paper` (light). Components read colours from context — never hardcode a colour.
- Arabic-first and fully RTL-aware. Type: Vazirmatn (sans, UI), Crimson Pro (serif, headlines and big numbers), JetBrains Mono (mono, labels and meta).

## Setup

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@noon/design-system';
// Wrap the app: GestureHandlerRootView > SafeAreaProvider > ThemeProvider initial="void"
```

## Hard rules

1. Never hardcode colours, spacing, font sizes, or radii. Tokens: `sp` (spacing), `fs` (font size), `fw` (weight), `r` (radius), `icon` (icon sizes), `dur` (motion), `bp`/`layout` (breakpoints). Colours only via `useTheme().theme.*` (or `color.*` primitives when a rule explicitly says so).
2. Green or gold TEXT must use `theme.accentText` / `theme.signalText`. Plain `theme.accent` / `theme.signal` are for fills and borders only.
3. Colour meaning: terra (orange) = heat and urgency, never failure. danger (red) = errors and destructive actions. gold/signal = earned things only (streaks, milestones). iris (purple) = the AI tutor. blue/water = selection and "current".
4. One component per role — never rebuild these: answer verdicts → BottomAction (`messageVariant` accent/danger); quiz progress → SessionBar; settings rows → ListRow; back navigation → BackButton (icon-only); file upload → UploadTile.
5. Quiz answer states: selected = blue, correct = green, incorrect = red. QuizOption handles all of it.
6. Cards: Card = list/grid item, HeroCard = landing emphasis, StatCard = one number. All accept `sizing` `'auto' | 'fill' | 'hug'`. Card thumbnails are 16:9 or 1:1 only.
7. Graphic patterns: Facet = arrival/hero surfaces, max one per screen. Khatam = earned moments only, line-only, never filled. Pinboard = maps/presence, dots are binary (full strength or absent). Never mix pattern languages on one surface. Never set text directly on a pattern.
8. RTL: use `I18nManager.isRTL`. Chevrons, back, and send mirror. Digits (phone numbers, PINs, timers) always read LTR — PhoneInput and PinInput handle this.
9. Shell: BottomNav on mobile, NavRail on tablet/desktop. Pushed child pages hide the nav; BackButton sits where the nav was. Nav labels are sentence case.
10. Accessibility: every interactive element gets accessibilityRole and accessibilityLabel; minimum touch target 40px; honour reduced motion.

## Token scales (exact — do not invent steps)

- `sp`: 0, 0.5, 1..12 → 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96 px. Usage: `sp[4]` = 16.
- `fs`: 9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 28, 32, 40, 48. Usage: `fs[14]`.
- `fw`: 300, 400, 500, 600, 700 (`fw[600]`). `r`: 0, 1, 2, 3, 4, pill → 0, 2, 4, 6, 8, 999. `dur`: 1, 2, 3 → 120, 200, 320 ms.
- `bp`: tablet 768, desktop 1024. `layout`: containerMax 1200, readingMax 720.

## Theme roles (exact names on `useTheme().theme` — do not invent others)

- Surfaces: bg, bgSunken, bgRaised, bgOverlay, inputBg
- Text: fg, fgMuted, fgSubtle, fgFaint, fgDisabled, fgInverse
- Lines: border, borderStrong, divider; overlays: hoverOverlay, activeOverlay, selectedOverlay
- Accent (green): accent, accentHover, accentActive, accentFg, accentSoft, accentBorder, accentText
- Signal (gold): signal, signalDim, signalBright, signalSoft, signalBorder, signalText
- Others: danger + dangerSoft/dangerBorder; terra + terraSoft/terraBorder; iris + irisBright/irisSoft/irisBorder/irisGlow; intel (Future teal) + intelSoft/intelBorder; water (blue selection) + waterSoft/waterBorder
- Typical recipe: bgRaised card, border stroke, fg title, fgMuted body, fgFaint meta.

## Component inventory (`import { X } from '@noon/design-system'`)

- Inputs: Button (primary/secondary/ghost/danger/danger-solid/signal/tutor), IconButton, Input, Select, Textarea, SearchInput, PinInput, PhoneInput, Switch, Checkbox + CheckboxGroup, Radio + RadioGroup, Stepper, Segmented, Slider, UploadTile, Rating, Calendar
- Display: Card, HeroCard, StatCard, Chip, Avatar, AvatarGroup, Identity, Badge, Table, Divider, Skeleton, EmptyState, StreakTracker, ListRow, VideoCard
- Navigation: Tabs, BottomNav, NavRail, TitleBar, FilterBar, BackButton, Breadcrumbs, Pagination, NotificationBell, NoonMark
- Feedback: Alert, Toast (useToast), Dialog, BottomSheet, FullSheet, Tooltip, BottomAction
- Progress: SessionBar, LinearProgress, CircularProgress, Timer
- Learning: QuizOption, MatchQuestion, CategorizeQuestion, OrderQuestion, FillBlanksQuestion, HotspotQuestion, ResultReview, SessionCard, HomeworkCard, Interstitial
- In class: VideoTile, ClassToolbar, LivePrompt, ChatComposer
- Voice tutor: VoiceTutor, ChatMessage, TypingIndicator, BreakdownCard, ActivityCard, ResourceList, SlidesCard
- Patterns: Facet, Khatam, Pinboard, GridPaper, Waypoints, DuneDynamic, StarsDynamic, TerrainDynamic

## Which component when

- Inline status in the flow → Alert. Transient confirmation → Toast. Blocking decision → Dialog. Partial task over the screen → BottomSheet. Full task → FullSheet.
- One number that matters → StatCard. Big landing block → HeroCard. Everything else → Card.
- Status word → Chip. Count on a thing → Badge.
- Single choice, few visible options → RadioGroup. Single choice, many options or tight space → Select. Multi choice → CheckboxGroup.

## Source of truth

Component prop signatures live in the component files (`rn/*.tsx`) — read the file before using a component rather than guessing props. The explorer documents every component with live examples and rules.

## Start from a template

The explorer's Templates page has full screens (Login, Home dashboard, Quiz flow, Profile & settings) assembled entirely from system components — copy one and adapt it rather than starting blank.
