/**
 * StarsDynamic — exact port of reference/stars.html.
 *
 * Starfield with magnitude distribution, radius twinkle.
 * Native: @shopify/react-native-skia with animated Path per alpha bucket.
 * Web: raw <canvas> with identical draw loop.
 */
import React, { useMemo, useRef, useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import type { ViewStyle } from 'react-native';
import { color } from './tokens';

let SkiaAvailable = false;
let SK: any = null;

try {
  SK = require('@shopify/react-native-skia');
  SkiaAvailable = true;
} catch (e: any) { console.warn('[StarsDynamic] Skia load failed:', e?.message); }

interface StarsDynamicProps {
  width: number;
  height: number;
  density?: number;
  twinkle?: number;
  halo?: number;
  lines?: number;
  style?: ViewStyle;
}

const TAU = Math.PI * 2;
const ALPHA_BUCKETS = 12;
const INK = { r: 232, g: 228, b: 220 };

function sizeFromMag(mag: number) { return 0.30 + 2.30 * Math.exp(-mag * 0.50); }
function alphaFromMag(mag: number) { return Math.min(0.95, 0.18 + 0.78 * Math.exp(-mag * 0.55)); }

function mst(stars: any[]) {
  if (stars.length < 2) return [];
  const inTree = new Set([0]);
  const edges: [any, any][] = [];
  while (inTree.size < stars.length) {
    let bi = -1, bj = -1, bd = Infinity;
    for (const i of inTree) {
      for (let j = 0; j < stars.length; j++) {
        if (inTree.has(j)) continue;
        const d = Math.hypot(stars[j].x - stars[i].x, stars[j].y - stars[i].y);
        if (d < bd) { bd = d; bi = i; bj = j; }
      }
    }
    if (bj === -1) break;
    edges.push([stars[bi], stars[bj]]);
    inTree.add(bj);
  }
  return edges;
}

function generateStars(W: number, H: number, density: number) {
  const particles: any[] = [];
  const buckets: any[][] = Array.from({ length: ALPHA_BUCKETS }, () => []);
  const count = Math.floor((W * H) / 380 * density);
  for (let i = 0; i < count; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const mag = Math.pow(Math.random(), 0.45) * 7.5;
    const r = sizeFromMag(mag);
    const a = alphaFromMag(mag);
    const isBright = mag < 2.5;
    const star = {
      x, y, r, alpha: a, mag,
      freq: isBright ? 0.00020 + Math.random() * 0.00040 : 0.00050 + Math.random() * 0.00200,
      phase: Math.random() * TAU,
      twinkleAmt: isBright ? 0.06 + Math.random() * 0.10 : 0.12 + Math.random() * 0.28,
    };
    particles.push(star);
    buckets[Math.min(ALPHA_BUCKETS - 1, Math.floor(a * ALPHA_BUCKETS))].push(star);
  }
  return { particles, buckets };
}

function StarsCanvasWeb({ width: W, height: H, density, twinkle, halo: haloI, lines: linesI }: Required<Omit<StarsDynamicProps, 'style'>>) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const frameRef = React.useRef<number>(0);
  const ctrlRef = React.useRef({ twinkle, haloI, linesI });
  ctrlRef.current = { twinkle, haloI, linesI };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const { particles, buckets } = generateStars(W, H, density);
    const halos: any[] = [];
    let clusters: any[] = [];
    let spikes: any[] = [];

    const bright = particles.filter(p => p.mag < 2.2);
    if (bright.length >= 8) {
      const cols = 3, rows = 2;
      const seeds: any[] = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const xMin = (col / cols) * W, xMax = ((col + 1) / cols) * W;
          const yMin = (row / rows) * H, yMax = ((row + 1) / rows) * H;
          const region = bright.filter(s => s.x >= xMin && s.x < xMax && s.y >= yMin && s.y < yMax);
          if (!region.length) continue;
          region.sort((a: any, b: any) => a.mag - b.mag);
          seeds.push(region[0]);
        }
      }
      for (const seed of seeds) {
        const k = 3 + Math.floor(Math.random() * 3);
        const pool = bright.filter(s => s !== seed)
          .map(s => ({ s, d: Math.hypot(s.x - seed.x, s.y - seed.y) }))
          .sort((a, b) => a.d - b.d).slice(0, k * 2)
          .filter(() => Math.random() > 0.30).slice(0, k).map(o => o.s);
        if (!pool.length) continue;
        const stars = [seed, ...pool];
        const edges = mst(stars);
        clusters.push({ stars, edges });
        for (const s of stars) {
          halos.push({ x: s.x, y: s.y, r: s.r * 4.5, baseA: 0.07 });
          halos.push({ x: s.x, y: s.y, r: s.r * 10, baseA: 0.025 });
        }
      }
    }

    const sorted = [...particles].sort((a, b) => a.mag - b.mag);
    spikes = sorted.slice(0, 8);

    function draw(t: number) {
      ctx.fillStyle = '#0a0f1a';
      ctx.fillRect(0, 0, W, H);

      if (ctrlRef.current.linesI > 0.001) {
        ctx.lineWidth = 0.7; ctx.lineCap = 'round';
        for (const cl of clusters) {
          for (const [a, b] of cl.edges) {
            const dist = Math.hypot(b.x - a.x, b.y - a.y);
            const peak = 0.34 * ctrlRef.current.linesI * Math.exp(-dist / 320);
            if (peak < 0.005) continue;
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, `rgba(${INK.r},${INK.g},${INK.b},0)`);
            grad.addColorStop(0.18, `rgba(${INK.r},${INK.g},${INK.b},${(peak * 0.85).toFixed(3)})`);
            grad.addColorStop(0.50, `rgba(${INK.r},${INK.g},${INK.b},${peak.toFixed(3)})`);
            grad.addColorStop(0.82, `rgba(${INK.r},${INK.g},${INK.b},${(peak * 0.85).toFixed(3)})`);
            grad.addColorStop(1, `rgba(${INK.r},${INK.g},${INK.b},0)`);
            ctx.strokeStyle = grad;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }

      if (ctrlRef.current.haloI > 0.001) {
        for (const h of halos) {
          const a = h.baseA * ctrlRef.current.haloI;
          if (a < 0.002) continue;
          const grad = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, h.r);
          grad.addColorStop(0, `rgba(${INK.r},${INK.g},${INK.b},${a.toFixed(3)})`);
          grad.addColorStop(0.55, `rgba(${INK.r},${INK.g},${INK.b},${(a * 0.35).toFixed(3)})`);
          grad.addColorStop(1, `rgba(${INK.r},${INK.g},${INK.b},0)`);
          ctx.fillStyle = grad;
          ctx.beginPath(); ctx.arc(h.x, h.y, h.r, 0, TAU); ctx.fill();
        }
      }

      if (ctrlRef.current.haloI > 0.001) {
        ctx.lineWidth = 0.5; ctx.lineCap = 'round';
        for (const p of spikes) {
          const len = p.r * 9;
          const peak = 0.22 * ctrlRef.current.haloI;
          let grad = ctx.createLinearGradient(p.x, p.y - len, p.x, p.y + len);
          grad.addColorStop(0, `rgba(${INK.r},${INK.g},${INK.b},0)`);
          grad.addColorStop(0.5, `rgba(${INK.r},${INK.g},${INK.b},${peak.toFixed(3)})`);
          grad.addColorStop(1, `rgba(${INK.r},${INK.g},${INK.b},0)`);
          ctx.strokeStyle = grad;
          ctx.beginPath(); ctx.moveTo(p.x, p.y - len); ctx.lineTo(p.x, p.y + len); ctx.stroke();
          grad = ctx.createLinearGradient(p.x - len, p.y, p.x + len, p.y);
          grad.addColorStop(0, `rgba(${INK.r},${INK.g},${INK.b},0)`);
          grad.addColorStop(0.5, `rgba(${INK.r},${INK.g},${INK.b},${peak.toFixed(3)})`);
          grad.addColorStop(1, `rgba(${INK.r},${INK.g},${INK.b},0)`);
          ctx.strokeStyle = grad;
          ctx.beginPath(); ctx.moveTo(p.x - len, p.y); ctx.lineTo(p.x + len, p.y); ctx.stroke();
        }
      }

      for (let bi = 0; bi < ALPHA_BUCKETS; bi++) {
        const bucket = buckets[bi];
        if (!bucket.length) continue;
        const a = (bi + 0.5) / ALPHA_BUCKETS;
        ctx.fillStyle = `rgba(${INK.r},${INK.g},${INK.b},${a.toFixed(3)})`;
        ctx.beginPath();
        for (const p of bucket) {
          const pulse = 1 + Math.sin(t * p.freq + p.phase) * p.twinkleAmt * ctrlRef.current.twinkle;
          const r = p.r * pulse;
          ctx.moveTo(p.x + r, p.y); ctx.arc(p.x, p.y, r, 0, TAU);
        }
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    }

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [W, H, density]);

  return <canvas ref={canvasRef as any} style={{ width: W, height: H, display: 'block' }} />;
}

// ── Native: Skia with animated paths ──
function StarsCanvasNative({ width: W, height: H, density, twinkle, style }: Required<Omit<StarsDynamicProps, 'style'>> & { style?: ViewStyle }) {
  const ctrlRef = useRef({ twinkle });
  ctrlRef.current = { twinkle };

  const data = useMemo(() => generateStars(W, H, density), [W, H, density]);

  const [paths, setPaths] = useState<{ path: any; color: string }[]>([]);

  useEffect(() => {
    if (!SK) return;
    const start = Date.now();
    let raf = 0;
    const FRAME_INTERVAL = 50;
    let lastFrame = 0;

    function tick() {
      const now = Date.now();
      if (now - lastFrame < FRAME_INTERVAL) {
        raf = requestAnimationFrame(tick);
        return;
      }
      lastFrame = now;

      const t = now - start;
      const { twinkle: tw } = ctrlRef.current;
      const { buckets } = data;

      const newPaths: { path: any; color: string }[] = [];

      for (let bi = 0; bi < ALPHA_BUCKETS; bi++) {
        const bucket = buckets[bi];
        if (!bucket.length) continue;

        const a = (bi + 0.5) / ALPHA_BUCKETS;
        const col = `rgba(${INK.r},${INK.g},${INK.b},${a.toFixed(3)})`;

        const path = SK.Skia.Path.Make();
        for (const p of bucket) {
          const pulse = 1 + Math.sin(t * p.freq + p.phase) * p.twinkleAmt * tw;
          const r = p.r * pulse;
          path.addCircle(p.x, p.y, r);
        }
        newPaths.push({ path, color: col });
      }

      setPaths(newPaths);
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [data]);

  if (!SK) return null;

  return (
    <View style={[{ width: W, height: H, backgroundColor: color.void[300] }, style]}>
      <SK.Canvas style={{ width: W, height: H }}>
        <SK.Fill color="#0a0f1a" />
        {paths.map((p, i) => (
          <SK.Path key={i} path={p.path} color={p.color} />
        ))}
      </SK.Canvas>
    </View>
  );
}

export function StarsDynamic({ width, height, density = 1, twinkle = 1, halo = 1, lines = 1, style }: StarsDynamicProps) {
  if (Platform.OS === 'web') {
    return (
      <View style={[{ width, height, overflow: 'hidden' }, style]}>
        <StarsCanvasWeb width={width} height={height} density={density} twinkle={twinkle} halo={halo} lines={lines} />
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

  return <StarsCanvasNative width={width} height={height} density={density} twinkle={twinkle} halo={halo} lines={lines} style={style} />;
}
