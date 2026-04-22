---
name: noon-academy-design
description: Use this skill to generate well-branded interfaces and assets for Noon Academy, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

This is the "Proven Routes" design system for Noon Academy — a Saudi EdTech hybrid school network. The brand replaces a pre-2023 consumer-app aesthetic with a purposeful, Saudi-native surveyor's-notebook visual language: warm cream paper, pre-dawn void, golden cartography, Empty Quarter geometry.

## What's here

- `colors_and_type.css` — all tokens (colors, type, spacing, radii, shadows, motion) as CSS custom properties. Import this into any HTML artifact as the single source of truth.
- `assets/` — brand SVGs (logos, compass, water-vessel, 8-point star pattern, atlas page, contour map, terrain, hero landscape). **Copy these into your artifact directory, don't deep-link.**
- `ui_kits/student_app/` — mobile UI kit. `primitives.jsx` has `Caps`, `Mono`, `Serif`, `PrimaryBtn`, `Chip`, `Avatar`, `TabBar` plus the color + font tokens as JS objects. Copy + adapt for new screens.
- `preview/` — 21 reference cards (colors, type, spacing, components, brand) for pixel-perfect references.

## How to use

**If creating visual artifacts** (slides, mocks, throwaway prototypes, landing pages):
1. Copy `colors_and_type.css` and needed assets into your artifact's folder.
2. Build HTML with grid-paper backdrops on paper surfaces and gold-on-void for focus/brand moments.
3. Use the voice from README.md's Content Fundamentals — outcome language, no emoji, surveyor caps for labels.
4. Never invent new colors; use the tokens. Never use third-party icon CDNs; follow the cartographic glyph pattern.

**If working on production code:**
Read the README end-to-end. The Visual Foundations section is the checklist — color, type, spacing, shadows, motion rules. The Iconography section defines glyph rules (1.5px strokes, miter joins, no rounded consumer-app icons).

**If the user invokes this skill without other guidance**, ask what they want to build (landing page? slide? mobile screen? email?), ask 3–5 clarifying questions (target audience — student / facilitator / parent / investor? language — English / Arabic / both? tone — institutional / inviting to a new crew?), then produce an HTML artifact or production code using the tokens and assets.

## Non-negotiables

- No emoji. No illustrated characters. No mascots.
- No pure black (`#000`) or pure white (`#fff`) — always ink and paper.
- No gradients in chrome. No glassmorphism. No rounded-consumer-app icons.
- Progress is **position on terrain**, not a percent bar.
- The core metaphor is the atlas / proven route. If a design drifts toward "learning journey with sparkles," stop and re-read the brief summary in README.md.
