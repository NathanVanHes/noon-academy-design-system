/**
 * DuneDynamic — exact port of reference/dunes.html.
 *
 * Particle dune field: layered ridges, stippled shading, wind drift.
 * Native: @shopify/react-native-skia with animated Path per alpha bucket.
 * Web: raw <canvas> with identical draw loop.
 */
import React, { useMemo, useRef, useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import type { ViewStyle } from 'react-native';
import { color } from './tokens';

// ── Skia (native) ──
let SkiaAvailable = false;
let S: any = null;

try {
  S = require('@shopify/react-native-skia');
  SkiaAvailable = true;
} catch (e: any) { console.warn('[DuneDynamic] Skia load failed:', e?.message); }

// ── Types ──
interface DuneDynamicProps {
  width: number;
  height: number;
  layers?: number;
  wind?: number;
  density?: number;
  shimmer?: number;
  contrast?: number;
  style?: ViewStyle;
}

const TAU = Math.PI * 2;
const ALPHA_BUCKETS = 10;
const INK = { r: 232, g: 228, b: 220 };

function buildDunes(count: number) {
  const yMin = Math.max(0.10, 0.34 - count * 0.022);
  const yMax = 0.78;
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const y = yMin + (yMax - yMin) * (t * t * 0.6 + t * 0.4);
    return {
      y, amp: 12 + t * 72, freq: 0.0038 - t * 0.0018,
      phase: (i * 1.731 + 0.4) % TAU,
      density: 0.65 + t * 1.55, drift: 0.18 + t * 0.85,
      alphaMul: 0.18 + Math.pow(t, 0.85) * 0.55,
      sizeMul: 0.80 + t * 0.32,
    };
  });
}

function ridgeY(x: number, dune: any, H: number) {
  let y = dune.y * H;
  y += Math.sin(x * dune.freq + dune.phase) * dune.amp;
  y += Math.sin(x * dune.freq * 2.3 + dune.phase * 1.5) * dune.amp * 0.36;
  y += Math.sin(x * dune.freq * 5.7 + dune.phase * 0.4) * dune.amp * 0.13;
  return y;
}

function ridgeTangent(x: number, dune: any, H: number) {
  const dx = 4;
  return Math.atan2(ridgeY(x + dx, dune, H) - ridgeY(x - dx, dune, H), dx * 2);
}

function clusterField(x: number, y: number) {
  return 0.5 + (Math.sin(x * 0.018 + y * 0.014 + 1.3) * 0.50 +
    Math.sin(x * 0.061 + y * 0.047 + 4.2) * 0.32 +
    Math.sin(x * 0.157 + y * 0.121 + 0.9) * 0.18) * 0.5;
}

function densityProfile(t: number) {
  if (t < 0 || t > 1) return 0;
  const shadow = Math.exp(-Math.pow((t - 0.07) / 0.045, 2)) * 1.25;
  const mid = Math.exp(-Math.pow((t - 0.28) / 0.14, 2)) * 0.45;
  const highlight = Math.exp(-Math.pow((t - 0.50) / 0.18, 2)) * 0.50;
  const bottom = Math.pow(Math.max(0, t - 0.55), 1.4) * 1.45;
  return Math.max(0.05, shadow + mid + bottom - highlight);
}

interface Particle {
  bx: number; by: number; r: number; alpha: number; layer: number;
  ph: number; ph2: number; phP: number;
  freqA: number; freqB: number; freqP: number;
  ax: number; ay: number; cosA: number; sinA: number;
}

function generateParticles(W: number, H: number, dunes: any[], densityMul: number) {
  const particles: Particle[] = [];
  const buckets: Particle[][] = Array.from({ length: ALPHA_BUCKETS }, () => []);
  const baseCount = Math.min(Math.floor((W * H) / 64), 40000);

  for (let li = 0; li < dunes.length; li++) {
    const dune = dunes[li];
    const next = dunes[li + 1] || null;
    const attempts = Math.floor(baseCount * dune.density * densityMul);

    for (let i = 0; i < attempts; i++) {
      const x = Math.random() * W;
      const y0 = ridgeY(x, dune, H);
      const y1 = next ? ridgeY(x, next, H) : H + 60;
      if (y1 <= y0) continue;

      const local = Math.random() * (y1 - y0);
      const y = y0 + local;
      const t = local / (y1 - y0);

      const baseD = densityProfile(t);
      const cluster = clusterField(x, y);
      if (Math.random() > baseD * (0.55 + cluster * 0.7)) continue;

      const shadowness = Math.exp(-Math.pow((t - 0.07) / 0.10, 2));
      const alpha = Math.min(0.98, (0.22 + Math.random() * 0.45 + shadowness * 0.15) * dune.alphaMul);
      const r = (0.26 + Math.random() * 0.55 + shadowness * 0.18) * dune.sizeMul;

      const tang = ridgeTangent(x, dune, H);
      const ang = tang + (Math.random() - 0.5) * 1.3;

      const p: Particle = {
        bx: x, by: y, r, alpha, layer: li,
        ph: Math.random() * TAU, ph2: Math.random() * TAU, phP: Math.random() * TAU,
        freqA: 0.00010 + Math.random() * 0.00022,
        freqB: 0.00018 + Math.random() * 0.00032,
        freqP: 0.00014 + Math.random() * 0.00024,
        ax: 0.4 + Math.random() * 1.3, ay: 0.18 + Math.random() * 0.6,
        cosA: Math.cos(ang), sinA: Math.sin(ang),
      };

      particles.push(p);
      buckets[Math.min(ALPHA_BUCKETS - 1, Math.floor(alpha * ALPHA_BUCKETS))].push(p);
    }
  }

  return { particles, buckets };
}

// ── Web: use raw <canvas> with identical draw loop ──
function DuneCanvasWeb({ width: W, height: H, layers, wind, density, shimmer, contrast }: Required<Omit<DuneDynamicProps, 'style'>>) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const frameRef = React.useRef<number>(0);
  const dataRef = React.useRef<{ dunes: any[]; particles: Particle[]; buckets: Particle[][] } | null>(null);
  const ctrlRef = React.useRef({ wind, shimmer, contrast });
  ctrlRef.current = { wind, shimmer, contrast };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const dunes = buildDunes(layers);
    dunes.forEach((d) => { d.density = d.density * density; });
    const { particles, buckets } = generateParticles(W, H, dunes, 1);
    dataRef.current = { dunes, particles, buckets };

    function draw(t: number) {
      if (!dataRef.current) return;
      const { dunes: dd, buckets: bb } = dataRef.current;

      ctx.fillStyle = '#0a0f1a';
      ctx.fillRect(0, 0, W, H);

      const { wind: w2, shimmer: sh2, contrast: c2 } = ctrlRef.current;
      const windPulse = w2 * (0.75 + Math.sin(t * 0.0001) * 0.35);

      for (let bi = 0; bi < ALPHA_BUCKETS; bi++) {
        const bucket = bb[bi];
        if (!bucket.length) continue;

        const baseA = (bi + 0.5) / ALPHA_BUCKETS;
        const a = Math.max(0.02, Math.min(1.0, 0.5 + (baseA - 0.5) * c2));
        ctx.fillStyle = `rgba(${INK.r},${INK.g},${INK.b},${a.toFixed(3)})`;
        ctx.beginPath();

        for (let i = 0, n = bucket.length; i < n; i++) {
          const p = bucket[i];
          const dune = dd[p.layer];
          const driftMag = (Math.sin(t * p.freqA + p.ph) + Math.sin(t * p.freqB + p.ph2) * 0.45) * p.ax * windPulse * dune.drift * 5.5;
          const perpMag = Math.sin(t * p.freqP + p.phP) * p.ay * sh2 * 0.5;
          const dx = p.cosA * driftMag - p.sinA * perpMag;
          const dy = p.sinA * driftMag + p.cosA * perpMag;
          const x = p.bx + dx;
          const y = p.by + dy;
          ctx.moveTo(x + p.r, y);
          ctx.arc(x, y, p.r, 0, TAU);
        }
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    }

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [W, H, layers, density]);

  return <canvas ref={canvasRef as any} style={{ width: W, height: H, display: 'block' }} />;
}

// ── Native: Skia with animated paths ──
function DuneCanvasNative({ width: W, height: H, layers, wind, density, shimmer, contrast, style }: Required<Omit<DuneDynamicProps, 'style'>> & { style?: ViewStyle }) {
  const dunesData = useMemo(() => {
    const dunes = buildDunes(layers);
    dunes.forEach((d) => { d.density = d.density * density; });
    const { buckets } = generateParticles(W, H, dunes, 1);
    return { dunes, buckets };
  }, [W, H, layers, density]);

  const ctrlRef = useRef({ wind, shimmer, contrast });
  ctrlRef.current = { wind, shimmer, contrast };

  // Build Skia paths per bucket, updated each frame
  const [paths, setPaths] = useState<{ path: any; color: string }[]>([]);

  useEffect(() => {
    if (!S) return;
    const start = Date.now();
    let raf = 0;
    const FRAME_INTERVAL = 50; // ~20fps
    let lastFrame = 0;

    function tick() {
      const now = Date.now();
      if (now - lastFrame < FRAME_INTERVAL) {
        raf = requestAnimationFrame(tick);
        return;
      }
      lastFrame = now;

      const t = now - start;
      const { wind: w2, shimmer: sh2, contrast: c2 } = ctrlRef.current;
      const windPulse = w2 * (0.75 + Math.sin(t * 0.0001) * 0.35);
      const { dunes, buckets } = dunesData;

      const newPaths: { path: any; color: string }[] = [];

      for (let bi = 0; bi < ALPHA_BUCKETS; bi++) {
        const bucket = buckets[bi];
        if (!bucket.length) continue;

        const baseA = (bi + 0.5) / ALPHA_BUCKETS;
        const a = Math.max(0.02, Math.min(1.0, 0.5 + (baseA - 0.5) * c2));
        const col = `rgba(${INK.r},${INK.g},${INK.b},${a.toFixed(3)})`;

        const path = S.Skia.Path.Make();
        for (let i = 0, n = bucket.length; i < n; i++) {
          const p = bucket[i];
          const dune = dunes[p.layer];
          if (!dune) continue;
          const driftMag = (Math.sin(t * p.freqA + p.ph) + Math.sin(t * p.freqB + p.ph2) * 0.45) * p.ax * windPulse * dune.drift * 5.5;
          const perpMag = Math.sin(t * p.freqP + p.phP) * p.ay * sh2 * 0.5;
          const dx = p.cosA * driftMag - p.sinA * perpMag;
          const dy = p.sinA * driftMag + p.cosA * perpMag;
          path.addCircle(p.bx + dx, p.by + dy, p.r);
        }
        newPaths.push({ path, color: col });
      }

      setPaths(newPaths);
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [dunesData]);

  if (!S) return null;

  return (
    <View style={[{ width: W, height: H, backgroundColor: color.void[300] }, style]}>
      <S.Canvas style={{ width: W, height: H }}>
        <S.Fill color="#0a0f1a" />
        {paths.map((p, i) => (
          <S.Path key={i} path={p.path} color={p.color} />
        ))}
      </S.Canvas>
    </View>
  );
}

// ── Main export ──
export function DuneDynamic({
  width, height, layers = 4, wind = 3, density = 1, shimmer = 1, contrast = 1, style,
}: DuneDynamicProps) {
  if (Platform.OS === 'web') {
    return (
      <View style={[{ width, height, overflow: 'hidden' }, style]}>
        <DuneCanvasWeb width={width} height={height} layers={layers} wind={wind} density={density} shimmer={shimmer} contrast={contrast} />
      </View>
    );
  }

  if (!SkiaAvailable) {
    const Text = require('react-native').Text;
    return (
      <View style={[{ width, height, backgroundColor: color.void[300], alignItems: 'center', justifyContent: 'center' }, style]}>
        <Text style={{ color: 'rgba(232,228,220,0.5)', textAlign: 'center', padding: 20 }}>
          Requires @shopify/react-native-skia — rebuild with native modules.
        </Text>
      </View>
    );
  }

  return (
    <DuneCanvasNative width={width} height={height} layers={layers} wind={wind} density={density} shimmer={shimmer} contrast={contrast} style={style} />
  );
}
