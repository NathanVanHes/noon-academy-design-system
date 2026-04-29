# Noon Academy — Design System

**The Proven Routes.** An atlas guiding students through the challenging terrain of Qudrat, Tahsili and the selective universities that follow. Thousands have crossed before. The routes are engineered and reliable. You travel with a crew. You will get there.

This design system replaces Noon's pre-2023 consumer-app aesthetic (bright, playful, illustrated characters, global-generic) with a **purposeful, Saudi-native** visual language rooted in Empty Quarter geometry, surveyor's-notebook craft and cartographic precision.

## Sources given

- Rebrand brief provided in the project composer (full text archived as `BRIEF.md` is not stored — the brief was pasted directly into chat and contains context, principles, color palette, typography, imagery moodboard).
- Current public site: https://www.noonacademy.com/ — referenced as what we are **moving away from**, not toward.
- Moodboard: Empty Quarter dune ridges, surveyor's field notebooks, graph paper, Islamic geometric patterns, Saudi students in contemporary dress at campfire/basecamp scenes. (Images were referenced in the brief; not imported as files.)

No codebase or Figma was attached. All assets are crafted in-system from the brief's directives.

---

## Content Fundamentals

**Voice: quiet authority.** We're the surveyor who has walked this route before, not the hype coach.

**Rules of the voice:**
- Second person singular: "you", "your crew". Never "we" addressing the student (reserve "we" for institutional statements).
- **Outcome-named, not process-named.** "You're on pace for 92" beats "keep going." "Begin today's route" beats "Start lesson." "Arrived" beats "Complete."
- **Certainty, never vagueness.** "The difficult passages are real" — admit the work. "If you follow the routes, you'll get there" — promise the outcome.
- **Present tense, short clauses.** Surveyor telegrams, not motivational speeches.
- **No exclamation points.** No emoji. No "keep exploring" language. No "you've got this."
- **Names over roles.** "Sarah can help Farida with this passage" — not "a peer can help you."
- Casing: sentence case for everything, EXCEPT surveyor's-caps labels (`ELEV 412M`, `ROUTE · DAY 14/28`), which use ALL CAPS with `0.14em` tracking.

**Key terms are load-bearing — use them consistently.**
- **Routes** (proven paths — structural; rarely named in UI directly)
- **Terrain** (topics and mastery as topography)
- **Crew** (the 5–8 students who travel together under one facilitator)
- **Passage** (a single hard problem / topic)
- **Water / jugs** (proof of work + proof of helping others)
- **Arrival** (destination — 90+ on Qudrat/Tahsili, university admission)
- **Star Teacher** (remote subject expert), **Facilitator** (on-campus crew lead)

**Examples:**

> ✓ "You're on pace for 92." "Sarah cleared this last Thursday — she can walk you through it." "18 jugs filled. Minimum 12 — you've done your part, and more." "Three students stuck on analogy #4. Open as a crew discussion."
> 
> ✗ "Keep crushing it!" "Great job 🎉" "Continue your learning journey" "You're on fire!"

---

## Visual Foundations

**Color vibe.** Void-first (pre-dawn desert), chalk foreground, **Noon green `#64D8AE` is the primary UI accent** (the heritage brand color, used on primary buttons and active states). **Signal Gold (`#c9a227`) is reserved for journey semantics only** — routes drawn on terrain, waypoints, current position, arrival moments. Gold is never used as UI chrome, never on buttons, never on chips. All darks are blue-cast ink (`#0a0f1a`) — never pure black. All lights are cream (`#e8e4dc`) — never pure white. Red (`#c55a4e`) is rare; green-earned (`#7a8e64`) is desaturated. Heliotrope `#B08AF9` is a secondary accent used sparingly.

**Type.** Crimson Pro serif for display and short headings (authority, the scholar's notebook). Work Sans humanist for body, UI, and all interface text (clarity, the surveyor's legible hand). JetBrains Mono for coordinates, IDs, and numeric annotation. Noto Naskh Arabic for RTL — modern, fluid, confident. Ink color on text, never `#000`.

**Spacing.** 8px grid unit — the grid-paper module. All cards, rails, and gaps snap to it; surfaces carry a visible 8px faint-grid pattern with 64px major lines as a subtle paper texture.

**Backgrounds.**
- Paper surfaces: warm cream with a baked-in 8px grid-paper pattern, plus 64px major rules.
- Void surfaces: deep indigo with the same grid in gold at 5–10% opacity, used for focus modes, passage drill-ins, and hero cinematics.
- **No gradients in UI chrome.** Gradients allowed only in full-bleed brand imagery (hero landscape, dawn skies).
- Full-bleed imagery is rare and reserved for brand moments (login, celebration, section covers). Interior screens are always grid paper.
- **Never repeating illustration patterns of characters or doodles.** The 8-point Islamic star is the only ornamental pattern, used sparingly as paper watermark.

**Corners.** 0 for cartographic elements (waypoints, the map frame itself). 2px for chips, inputs, buttons. 4px for cards. 8px **max** for anything soft. Nothing above 8px. No full-pill buttons except for avatars.

**Borders.** 1px hairlines at `#c9c3b3` (rule) for ambient separation. 1px `#a39d8c` (rule-strong) for inputs and primary edges. 1px ink (`#15171c`) for emphatic outlines and surveyor rules. Left-accent borders (3px) are used ONLY for "now"/"live" states — a currently-active session, a live star-teacher block — not as decorative color coding.

**Shadows.** Three levels only.
- `paper` (resting card): `0 1px 0 rgba(21,23,28,.04), 0 6px 18px -10px rgba(21,23,28,.18)` — quiet lift off the grid.
- `lifted` (hover, modals): `0 2px 0 rgba(21,23,28,.05), 0 18px 40px -20px rgba(21,23,28,.28)`.
- `void` (night surfaces): `0 30px 60px -30px rgba(0,0,0,.65)` — sharp directional.
No soft glows, no diffused ambient shadows, no "glassmorphism" in chrome. Shadow direction is always +Y (hard sun overhead), never radial.

**Hover states.** Buttons darken to full ink on hover (primary) or invert fg/bg (ghost). Cards gain the `lifted` shadow; no color shift. Links reveal a 1px ink underline. Hover transitions are 120–200ms on `cubic-bezier(0.22, 0.61, 0.36, 1)` — no bounce, no overshoot.

**Press states.** Buttons lose shadow and darken one step. No scale transforms on press. The discipline: motion is purposeful; jelly-feel is forbidden.

**Animation philosophy.** **Light reveals, it does not glow.** Transitions fade in with slight upward translate (4–6px). Progress updates tick, they don't swoop. Route lines draw from start waypoint to current position at 320ms. No springs, no bounces, no parallax. Entries use `--ease` (`cubic-bezier(0.22, 0.61, 0.36, 1)`); exits use `--ease-in` (`cubic-bezier(0.55, 0, 0.8, 0.3)`).

**Transparency & blur.** Rarely used. **No frosted glass** in nav or cards — it reads as consumer app. Transparency is permitted only for (a) topographic zone overlays (green/red mastery regions at 10–15% alpha over contour lines) and (b) dark-surface scrims over hero photography.

**Layout rules.**
- Content width max 680px for reading, 1200px for dashboard grids.
- Fixed tab bar at bottom of mobile (22px bottom safe area above home indicator).
- Headers have generous top padding (68px on mobile) — the page breathes like an open field notebook.
- Rails of data stack vertically; never tables wider than the viewport.

**Protection gradients vs capsules.** When placing text on photography, we use **soft black-to-transparent linear gradients** (protection scrims) from the bottom 40% of the image. Never full-image darkening. Never a colored capsule behind text — text sits in the scrim, respecting the terrain.

**Imagery color vibe.** Warm. Golden-hour directional light. Harsh sun, hard shadows, clear edges. Rim light on dune faces. Never b&w. Never cool-toned. Never dreamy, never diffused. Never heavy grain (slight paper tooth is fine). Photography, when used, of Saudi students in contemporary clothing in warm desert light or warm indoor campfire/study settings. **Never** flowing robes, antique traveler aesthetic, or Silicon Valley illustration.

**Cards.** 4px radius, 1px rule border, cream-lifted background (`#fbf8ef`), 8px grid-paper watermark at ~7% opacity inside the card. Surveyor caps in the header, serif in the body, mono for stats and coordinates in the footer. Hover: no color shift, only the lifted shadow.

**Iconography.** See the ICONOGRAPHY section below.

---

## Iconography

**No emoji. No mascots. No illustrated characters.** The brand's visual vocabulary is cartographic:

- **Waypoints** — 12×12px diamonds with a center dot. Gold for start, red (with crosshair) for current position, green (with upward triangle) for arrival.
- **Tick marks** — 1px, 6–8px long, used on rules, tracks and dials.
- **Crosshairs** — thin (0.75px) N/S/E/W radials around position markers.
- **Contour lines** — thin (0.7–1px) curving paths representing elevation.
- **Compass rose** — used in brand moments (login, section dividers), not in UI chrome.

**Icon rules.**
- Stroke: 1.5px default, 1.25px for small (16–18px) marks, 1px for hairline/technical detail.
- Join: miter (sharp), never round. Except pills where cap is round.
- Fill: mostly outlined. Solid fills only for state markers (current position) and waypoints.
- Color: `--fg` (ink) on paper, `--chalk` on void. Never neutral grays — if an icon is "disabled" it fades via opacity, not color shift.
- Size tiers: 16 (inline), 22 (tab bar), 32 (primary action), 40+ (brand).

**Where they live.**
- `assets/compass.svg` — compass rose
- `assets/water-vessel.svg` — jug (functional, not ornamental)
- `assets/pattern-star.svg` — 8-point Islamic star watermark
- `assets/topo-contour.svg` — atlas contour page sample
- `assets/atlas-page.svg` — grid notebook page with peak/route annotation
- `assets/terrain-ridges.svg` — stylized dune silhouette
- `assets/hero-landscape.svg` — full-bleed dawn landscape with golden route
- `assets/logo-mark.svg` / `logo-wordmark.svg` / `logo-wordmark-void.svg`

Inline cartographic glyphs (tab-bar icons, waypoint markers, etc.) are drawn in SVG directly in components (`primitives.jsx`, screen files) so they inherit `currentColor` and scale crisply — see `TabGlyph` in `ui_kits/student_app/primitives.jsx` for the pattern.

**No third-party icon CDNs.** We explicitly reject Lucide, Heroicons, Feather, Material, etc. — their rounded, generic vocabulary undermines the surveyor aesthetic. All glyphs are hand-drawn to the system's stroke/join/size rules.

---

## Font substitution notes

- **Crimson Pro** — loaded from Google Fonts. Serviceable match for "GT Super" which the brief lists as preferred. If the team licenses GT Super, swap via the `--font-serif` variable.
- **Work Sans** — from Google Fonts. Fulfills the "humanist sans" role; `Inter` is listed as fallback.
- **Noto Naskh Arabic** — from Google Fonts. Modern naskh, RTL-ready. If a licensed Arabic type is preferred (e.g. 29LT Bukra, TPTQ Arabic), swap via `--font-arabic`.
- **JetBrains Mono** — for annotations/coordinates. No conflict with the brief; utility typeface.

**Flagged for user:** confirm font licensing — all four fonts above are free/open, but the brief mentions "GT Super" which is a commercial face. See **Ask below**.

---

## Index

- `colors_and_type.css` — tokens (CSS custom properties) + base element styles
- `assets/` — logos, cartographic glyphs, terrain + landscape SVGs, 8-point star pattern
- `preview/` — the 21 design-system preview cards registered in the Design System tab
- `ui_kits/student_app/` — mobile student app UI kit (Atlas, Today, Crew, Water, Passage screens + primitives)
- `SKILL.md` — Agent Skill entrypoint for re-using this system in other projects

---

## Caveats

1. **No codebase or Figma was shared** — the system was built from brief directives alone. When real product code or Figma lands, we should reconcile component structures (especially the mastery heatmap + water ledger, which are described conceptually but not diagrammed).
2. **Photography is deliberately absent** — brand guidance calls for Saudi students in golden-hour light, but I haven't generated or sourced photography. The `hero-landscape.svg` is a stylized stand-in. **Photo direction and sourcing is a next step.**
3. **Arabic specimens are limited** — the one RTL sample demonstrates the typeface. Full Arabic UI translation needs a native review pass; I haven't pressure-tested line-height or diacritic alignment in running components.
4. **Only one UI kit (student mobile) was built** — facilitator dashboard, star-teacher broadcast console, and admin/parent surfaces are described in the brief and would each benefit from their own kit.
5. **Motion is described but not demonstrated** — animation rules are in the README; interactive motion specimens should come next.

---

## Ask

**Please help me iterate toward perfect.** I'd love your input on:

1. **The atlas / mastery-heatmap visualization.** Is the topographic metaphor reading correctly as "position on known terrain" — or does it still feel chart-like? See `preview/components-progress.html` and the Atlas screen.
2. **The water-jug ledger.** Does it feel like proof-of-work rather than gamified points? See `preview/brand-marks.html` (vessel glyph) and the Water screen.
3. **Photography direction.** Can you share 3–5 reference photos (from your moodboard or brand shoots) so I can commit to a specific look for hero imagery?
4. **Arabic specimens.** Would you like me to produce a full RTL pass on one screen (Atlas)?
5. **Next surface to build.** Facilitator dashboard, star-teacher broadcast view, or parent/admin?
6. **Font licensing.** Is the team planning to license GT Super or equivalent, or should we commit to Crimson Pro as the production serif?
