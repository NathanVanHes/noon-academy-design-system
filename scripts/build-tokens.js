#!/usr/bin/env node
/**
 * Noon Academy — Token Build Script
 * Reads tokens/design-tokens.json → outputs:
 *   dist/tokens.css        (CSS custom properties)
 *   dist/tokens.scss       (SCSS variables)
 *   dist/tokens.js         (ES module)
 *   dist/tokens.native.ts  (React Native StyleSheet-ready)
 */

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'tokens', 'design-tokens.json');
const DIST = path.join(__dirname, '..', 'dist');

const tokens = JSON.parse(fs.readFileSync(SRC, 'utf8'));

fs.mkdirSync(DIST, { recursive: true });

// ─── Helpers ────────────────────────────────────────────────────────────────

function resolveRef(val, root) {
  if (typeof val !== 'string') return val;
  return val.replace(/\{([^}]+)\}/g, (_, ref) => {
    const parts = ref.split('.');
    let cur = root;
    for (const p of parts) { cur = cur?.[p]; }
    return cur?.$value ?? cur ?? val;
  });
}

function camelToKebab(s) {
  return s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// ─── CSS ────────────────────────────────────────────────────────────────────

function buildCSS() {
  const lines = [];
  lines.push(`/* Noon Academy — Design Tokens (generated) */`);
  lines.push(`@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Work+Sans:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap');`);
  lines.push('');
  lines.push(':root {');

  // Color primitives
  lines.push('  /* ── Color Primitives ── */');
  for (const [scale, shades] of Object.entries(tokens.color.primitive)) {
    for (const [step, obj] of Object.entries(shades)) {
      lines.push(`  --${scale}-${step}: ${obj.$value};`);
    }
  }
  lines.push('');

  // Alpha
  lines.push('  /* ── Alpha ── */');
  for (const [step, obj] of Object.entries(tokens.color.alpha)) {
    lines.push(`  --a-${step}: ${obj.$value};`);
  }
  lines.push('');

  // Typography
  lines.push('  /* ── Typography ── */');
  for (const [k, obj] of Object.entries(tokens.typography.fontFamily)) {
    lines.push(`  --font-${camelToKebab(k)}: ${obj.$value};`);
  }
  lines.push('');
  for (const [k, obj] of Object.entries(tokens.typography.fontSize)) {
    lines.push(`  --fs-${k}: ${obj.$value}px;`);
  }
  lines.push('');
  for (const [k, obj] of Object.entries(tokens.typography.fontWeight)) {
    lines.push(`  --fw-${k.slice(0, 3) === 'lig' ? '300' : k.slice(0, 3) === 'reg' ? '400' : k.slice(0, 3) === 'med' ? '500' : k.slice(0, 3) === 'sem' ? '600' : '700'}: ${obj.$value};`);
  }
  lines.push('');
  lines.push(`  --lh-tight: ${tokens.typography.lineHeight.tight.$value};`);
  lines.push(`  --lh-snug: ${tokens.typography.lineHeight.snug.$value};`);
  lines.push(`  --lh-normal: ${tokens.typography.lineHeight.normal.$value};`);
  lines.push(`  --lh-loose: ${tokens.typography.lineHeight.loose.$value};`);
  lines.push('');
  lines.push(`  --tr-tight: -0.015em;`);
  lines.push(`  --tr-caps: 0.14em;`);
  lines.push('');

  // Spacing
  lines.push('  /* ── Spacing ── */');
  for (const [k, obj] of Object.entries(tokens.spacing)) {
    if (k.startsWith('$')) continue;
    lines.push(`  --sp-${k}: ${obj.$value === 0 ? '0' : obj.$value + 'px'};`);
  }
  lines.push('');

  // Radii
  lines.push('  /* ── Radii ── */');
  for (const [k, obj] of Object.entries(tokens.radius)) {
    lines.push(`  --r-${k}: ${obj.$value === 0 ? '0' : obj.$value + 'px'};`);
  }
  lines.push('');

  // Sizes
  lines.push('  /* ── Control Heights ── */');
  for (const [k, obj] of Object.entries(tokens.size)) {
    if (k.startsWith('$')) continue;
    lines.push(`  --h-${k}: ${obj.$value}px;`);
  }
  lines.push('');

  // Void theme semantic tokens
  lines.push('  /* ── Semantic (void theme — default) ── */');
  const voidTheme = tokens.themes.void;
  for (const [group, vals] of Object.entries(voidTheme)) {
    if (group.startsWith('$')) continue;
    for (const [k, obj] of Object.entries(vals)) {
      const resolved = resolveRef(obj.$value, tokens);
      lines.push(`  --${camelToKebab(k)}: ${resolved};`);
    }
  }
  lines.push('');

  // Focus ring
  lines.push('  --focus-ring: 0 0 0 3px rgba(107, 163, 255, 0.24);');
  lines.push('  --focus-ring-inset: inset 0 0 0 1px var(--blue-400);');
  lines.push('');

  // Interaction (void theme — default)
  lines.push('  /* ── Interaction (void) ── */');
  for (const [k, obj] of Object.entries(tokens.interaction.void)) {
    lines.push(`  --${camelToKebab(k)}: ${obj.$value};`);
  }
  lines.push('');

  // Elevation
  lines.push('  /* ── Elevation ── */');
  for (const [k, obj] of Object.entries(tokens.elevation)) {
    lines.push(`  --${k}: ${obj.$value};`);
  }
  lines.push('');

  // Motion
  lines.push('  /* ── Motion ── */');
  lines.push(`  --ease: ${tokens.motion.ease.$value};`);
  lines.push(`  --ease-in: ${tokens.motion.easeIn.$value};`);
  lines.push(`  --dur-1: ${tokens.motion.duration.fast.$value}ms;`);
  lines.push(`  --dur-2: ${tokens.motion.duration.normal.$value}ms;`);
  lines.push(`  --dur-3: ${tokens.motion.duration.slow.$value}ms;`);

  lines.push('}');
  lines.push('');

  // Paper theme
  lines.push('/* ── Paper Theme ── */');
  lines.push('.paper {');
  const paperTheme = tokens.themes.paper;
  for (const [group, vals] of Object.entries(paperTheme)) {
    if (group.startsWith('$')) continue;
    for (const [k, obj] of Object.entries(vals)) {
      const resolved = resolveRef(obj.$value, tokens);
      lines.push(`  --${camelToKebab(k)}: ${resolved};`);
    }
  }
  // Interaction (paper theme)
  for (const [k, obj] of Object.entries(tokens.interaction.paper)) {
    lines.push(`  --${camelToKebab(k)}: ${obj.$value};`);
  }
  lines.push('}');
  lines.push('');

  // Base reset
  lines.push('/* ── Base ── */');
  lines.push('html, body { background: var(--bg); color: var(--fg); font-family: var(--font-sans); font-size: var(--fs-16); line-height: var(--lh-normal); -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; margin: 0; }');
  lines.push('*, *::before, *::after { box-sizing: border-box; }');
  lines.push('[dir="rtl"] body, body.rtl, .arabic { font-family: var(--font-arabic); line-height: var(--lh-loose); }');

  return lines.join('\n');
}

// ─── SCSS ───────────────────────────────────────────────────────────────────

function buildSCSS() {
  const lines = [];
  lines.push('// Noon Academy — Design Tokens (SCSS, generated)');
  lines.push('');

  lines.push('// Colors');
  for (const [scale, shades] of Object.entries(tokens.color.primitive)) {
    for (const [step, obj] of Object.entries(shades)) {
      lines.push(`$${scale}-${step}: ${obj.$value};`);
    }
  }
  lines.push('');

  lines.push('// Typography');
  for (const [k, obj] of Object.entries(tokens.typography.fontFamily)) {
    lines.push(`$font-${camelToKebab(k)}: ${obj.$value};`);
  }
  lines.push('');
  for (const [k, obj] of Object.entries(tokens.typography.fontSize)) {
    lines.push(`$fs-${k}: ${obj.$value}px;`);
  }
  lines.push('');

  lines.push('// Spacing');
  for (const [k, obj] of Object.entries(tokens.spacing)) {
    if (k.startsWith('$')) continue;
    lines.push(`$sp-${k}: ${obj.$value === 0 ? '0' : obj.$value + 'px'};`);
  }
  lines.push('');

  lines.push('// Radii');
  for (const [k, obj] of Object.entries(tokens.radius)) {
    lines.push(`$r-${k}: ${obj.$value === 0 ? '0' : obj.$value + 'px'};`);
  }
  lines.push('');

  lines.push('// Control Heights');
  for (const [k, obj] of Object.entries(tokens.size)) {
    if (k.startsWith('$')) continue;
    lines.push(`$h-${k}: ${obj.$value}px;`);
  }

  return lines.join('\n');
}

// ─── JS (ES module) ────────────────────────────────────────────────────────

function buildJS() {
  const lines = [];
  lines.push('// Noon Academy — Design Tokens (ES module, generated)');
  lines.push('');

  // Flatten color primitives
  lines.push('export const color = {');
  for (const [scale, shades] of Object.entries(tokens.color.primitive)) {
    lines.push(`  ${scale}: {`);
    for (const [step, obj] of Object.entries(shades)) {
      lines.push(`    '${step}': '${obj.$value}',`);
    }
    lines.push('  },');
  }
  lines.push('};');
  lines.push('');

  lines.push('export const typography = {');
  lines.push('  fontFamily: {');
  for (const [k, obj] of Object.entries(tokens.typography.fontFamily)) {
    lines.push(`    ${k}: "${obj.$value}",`);
  }
  lines.push('  },');
  lines.push('  fontSize: {');
  for (const [k, obj] of Object.entries(tokens.typography.fontSize)) {
    lines.push(`    '${k}': ${obj.$value},`);
  }
  lines.push('  },');
  lines.push('  fontWeight: {');
  for (const [k, obj] of Object.entries(tokens.typography.fontWeight)) {
    lines.push(`    ${k}: '${obj.$value}',`);
  }
  lines.push('  },');
  lines.push('  lineHeight: {');
  for (const [k, obj] of Object.entries(tokens.typography.lineHeight)) {
    lines.push(`    ${k}: ${obj.$value},`);
  }
  lines.push('  },');
  lines.push('};');
  lines.push('');

  lines.push('export const spacing = {');
  for (const [k, obj] of Object.entries(tokens.spacing)) {
    if (k.startsWith('$')) continue;
    lines.push(`  '${k}': ${obj.$value},`);
  }
  lines.push('};');
  lines.push('');

  lines.push('export const radius = {');
  for (const [k, obj] of Object.entries(tokens.radius)) {
    lines.push(`  '${k}': ${obj.$value},`);
  }
  lines.push('};');
  lines.push('');

  lines.push('export const size = {');
  for (const [k, obj] of Object.entries(tokens.size)) {
    if (k.startsWith('$')) continue;
    lines.push(`  ${k}: ${obj.$value},`);
  }
  lines.push('};');
  lines.push('');

  lines.push('export const motion = {');
  lines.push(`  ease: '${tokens.motion.ease.$value}',`);
  lines.push(`  easeIn: '${tokens.motion.easeIn.$value}',`);
  lines.push('  duration: {');
  for (const [k, obj] of Object.entries(tokens.motion.duration)) {
    lines.push(`    ${k}: ${obj.$value},`);
  }
  lines.push('  },');
  lines.push('};');

  return lines.join('\n');
}

// ─── React Native ───────────────────────────────────────────────────────────

function buildNative() {
  const lines = [];
  lines.push(`/**`);
  lines.push(` * Noon Academy — Design Tokens for React Native`);
  lines.push(` * Generated from tokens/design-tokens.json`);
  lines.push(` * Usage: import { tokens, voidTheme, paperTheme } from './tokens.native';`);
  lines.push(` */`);
  lines.push('');

  // Color primitives
  lines.push('export const color = {');
  for (const [scale, shades] of Object.entries(tokens.color.primitive)) {
    lines.push(`  ${scale}: {`);
    for (const [step, obj] of Object.entries(shades)) {
      lines.push(`    '${step}': '${obj.$value}',`);
    }
    lines.push('  },');
  }
  lines.push('} as const;');
  lines.push('');

  // Void theme resolved
  lines.push('export const voidTheme = {');
  const voidTheme = tokens.themes.void;
  for (const [group, vals] of Object.entries(voidTheme)) {
    if (group.startsWith('$')) continue;
    for (const [k, obj] of Object.entries(vals)) {
      const resolved = resolveRef(obj.$value, tokens);
      lines.push(`  ${k}: '${resolved}',`);
    }
  }
  lines.push('} as const;');
  lines.push('');

  // Paper theme resolved
  lines.push('export const paperTheme = {');
  const paperTheme = tokens.themes.paper;
  for (const [group, vals] of Object.entries(paperTheme)) {
    if (group.startsWith('$')) continue;
    for (const [k, obj] of Object.entries(vals)) {
      const resolved = resolveRef(obj.$value, tokens);
      lines.push(`  ${k}: '${resolved}',`);
    }
  }
  lines.push('} as const;');
  lines.push('');

  // Interaction tokens (void)
  lines.push('export const voidInteraction = {');
  for (const [k, obj] of Object.entries(tokens.interaction.void)) {
    lines.push(`  ${k}: '${obj.$value}',`);
  }
  lines.push('} as const;');
  lines.push('');

  // Interaction tokens (paper)
  lines.push('export const paperInteraction = {');
  for (const [k, obj] of Object.entries(tokens.interaction.paper)) {
    lines.push(`  ${k}: '${obj.$value}',`);
  }
  lines.push('} as const;');
  lines.push('');

  // Typography (native font families — no fallbacks)
  lines.push('export const typography = {');
  lines.push('  fontFamily: {');
  for (const [k, obj] of Object.entries(tokens.typography.fontFamilyNative)) {
    lines.push(`    ${k}: '${obj.$value}',`);
  }
  lines.push('  },');
  lines.push('  fontSize: {');
  for (const [k, obj] of Object.entries(tokens.typography.fontSize)) {
    lines.push(`    '${k}': ${obj.$value},`);
  }
  lines.push('  },');
  lines.push('  fontWeight: {');
  for (const [k, obj] of Object.entries(tokens.typography.fontWeight)) {
    lines.push(`    ${k}: '${obj.$value}' as const,`);
  }
  lines.push('  },');
  lines.push('  lineHeight: {');
  for (const [k, obj] of Object.entries(tokens.typography.lineHeight)) {
    // RN lineHeight is absolute, multiply by base font size (16)
    lines.push(`    ${k}: ${obj.$value},`);
  }
  lines.push('  },');
  lines.push('  letterSpacing: {');
  for (const [k, obj] of Object.entries(tokens.typography.letterSpacing)) {
    if (k.startsWith('$')) continue;
    lines.push(`    ${k}: ${obj.$value},`);
  }
  lines.push('  },');
  lines.push('} as const;');
  lines.push('');

  // Spacing
  lines.push('export const spacing = {');
  for (const [k, obj] of Object.entries(tokens.spacing)) {
    if (k.startsWith('$')) continue;
    lines.push(`  '${k}': ${obj.$value},`);
  }
  lines.push('} as const;');
  lines.push('');

  // Radius
  lines.push('export const radius = {');
  for (const [k, obj] of Object.entries(tokens.radius)) {
    lines.push(`  '${k}': ${obj.$value},`);
  }
  lines.push('} as const;');
  lines.push('');

  // Control heights
  lines.push('export const size = {');
  for (const [k, obj] of Object.entries(tokens.size)) {
    if (k.startsWith('$')) continue;
    lines.push(`  ${k}: ${obj.$value},`);
  }
  lines.push('} as const;');
  lines.push('');

  // Elevation (native shadows)
  lines.push('export const elevation = {');
  for (const [k, obj] of Object.entries(tokens.elevationNative)) {
    if (k.startsWith('$')) continue;
    const v = obj.$value;
    lines.push(`  ${k}: {`);
    lines.push(`    shadowColor: '${v.shadowColor}',`);
    lines.push(`    shadowOffset: { width: ${v.shadowOffset.width}, height: ${v.shadowOffset.height} },`);
    lines.push(`    shadowOpacity: ${v.shadowOpacity},`);
    lines.push(`    shadowRadius: ${v.shadowRadius},`);
    lines.push(`    elevation: ${v.elevation},`);
    lines.push('  },');
  }
  lines.push('} as const;');
  lines.push('');

  // Motion (RN Animated durations)
  lines.push('export const motion = {');
  lines.push('  duration: {');
  for (const [k, obj] of Object.entries(tokens.motion.duration)) {
    lines.push(`    ${k}: ${obj.$value},`);
  }
  lines.push('  },');
  lines.push('} as const;');
  lines.push('');

  // Convenience: combined tokens object
  lines.push('export const tokens = { color, voidTheme, paperTheme, voidInteraction, paperInteraction, typography, spacing, radius, size, elevation, motion } as const;');
  lines.push('export type NoonTokens = typeof tokens;');

  return lines.join('\n');
}

// ─── Write all outputs ──────────────────────────────────────────────────────

fs.writeFileSync(path.join(DIST, 'tokens.css'), buildCSS());
fs.writeFileSync(path.join(DIST, 'tokens.scss'), buildSCSS());
fs.writeFileSync(path.join(DIST, 'tokens.js'), buildJS());
fs.writeFileSync(path.join(DIST, 'tokens.native.ts'), buildNative());

console.log('Built:');
console.log('  dist/tokens.css');
console.log('  dist/tokens.scss');
console.log('  dist/tokens.js');
console.log('  dist/tokens.native.ts');
