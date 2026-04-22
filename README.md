# Proven Routes — Noon Academy Design System

A fully tokenised design system for Noon Academy, built for web and React Native.

## Quick start

Open `index.html` for the interactive explorer with all components, tokens, and documentation.

## Structure

```
project/
  tokens.css          — CSS custom properties (L1 primitives → L2 semantic → L3 component)
  components.css      — Fully tokenised component library (0 hardcoded colours)
tokens/
  design-tokens.json  — JSON source of truth for all tokens
dist/
  tokens.css          — Generated CSS output
  tokens.scss         — Generated SCSS output
  tokens.js           — Generated JS output
  tokens.native.ts    — Generated React Native TypeScript output
scripts/
  build-tokens.js     — Token build pipeline (JSON → CSS/SCSS/JS/RN)
pages/
  heatmap-existing.html  — Mastery heatmap (existing Noon palette)
  heatmap.html           — Mastery heatmap (void/dark theme)
  heatmap-paper.html     — Mastery heatmap (paper/light theme)
  schedule.html          — Schedule page prototype
  voice-tutor.html       — Voice tutor session prototype
index.html            — Interactive design system explorer
```

## Themes

- **Void** (dark) — default
- **Paper** (light) — add `.paper` class to root element

Both themes are WCAG AA compliant.

## Tokens

Single source of truth in `tokens/design-tokens.json`. Run `npm run build` to generate outputs for CSS, SCSS, JS, and React Native TypeScript.

## Typography

- **Body (Arabic + Latin):** Vazirmatn
- **Serif headings (Arabic):** Noto Naskh Arabic
- **Serif headings (Latin):** Crimson Pro
- **Monospace:** JetBrains Mono + Vazirmatn fallback

## Components

All components are interactive and production-ready. The explorer (`index.html`) documents every state, variant, and token used. Components include:

Buttons, Icon Buttons, Button Groups, Text Inputs, Textareas, Steppers, Checkboxes, Radios, Switches, Segmented Controls, Chips, Filter Bars, Menus, Calendar, Cards, Card Grids, Avatars, Identity, Badges, Tables, Route Steps, Session Bars, Linear & Circular Progress, Tabs, Bottom Nav, Breadcrumbs, Pagination, Side Nav, Alerts, Toasts, Dialogs, Modals, Bottom Sheets, Tooltips, Popovers, Form Stacks, Empty States, Skeletons, Dropzones, Voice Tutor, Voice Chat, Crew Progress, Leaderboard.

## React Native

`dist/tokens.native.ts` exports all tokens with native font family names, iOS shadow objects, and theme objects (void + paper). Components are designed with RN portability in mind — clean state models, no DOM hacks.
