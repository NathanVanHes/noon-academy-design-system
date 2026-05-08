/**
 * TerrainDynamic — exact port of reference/terrain.html.
 *
 * Topographic contour lines via marching squares on a sine-noise heightmap.
 * Major contours every 5th interval are bolder. Elevation-based alpha.
 * Optional tilt (oblique projection) and route overlay.
 * Web: raw <canvas> with identical draw loop.
 * Native: TODO Skia imperative onDraw.
 */
import React, { useMemo } from 'react';
import { View, Platform } from 'react-native';
import type { ViewStyle } from 'react-native';
import { color } from './tokens';

let SkiaAvailable = false;
try { require('@shopify/react-native-skia'); SkiaAvailable = true; } catch {}

interface TerrainDynamicProps {
  width: number;
  height: number;
  scale?: number;
  detail?: number;
  relief?: number;
  contrast?: number;
  tilt?: number;
  showRoute?: boolean;
  style?: ViewStyle;
}

const INK = { r: 232, g: 228, b: 220 };

function TerrainCanvasWeb({ width: W, height: H, scale, detail, relief, contrast, tilt, showRoute }: Required<Omit<TerrainDynamicProps, 'style'>>) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const frameRef = React.useRef<number>(0);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const GRID = 11;
    const MAJOR_EVERY = 5;
    const BASE_INTERVAL = 0.045;
    const MAX_CONTOURS = 80;
    const ALPHA_MINOR = 0.16;
    const ALPHA_MAJOR = 0.50;
    const WIDTH_MINOR = 0.55;
    const WIDTH_MAJOR = 1.10;

    function height(x: number, y: number) {
      const sx = x / W, sy = y / H, s = scale;
      let h = 0;
      h += Math.sin(sx * 2.5 * s + 0.4) * Math.cos(sy * 2.0 * s + 1.2) * 0.55;
      h += Math.sin(sx * 5.5 * s + 1.7) * Math.cos(sy * 4.5 * s + 0.4) * 0.35;
      h += Math.sin(sx * 10.0 * s + 2.3) * Math.cos(sy * 8.5 * s + 3.1) * 0.18;
      h += Math.sin(sx * 18.0 * s + 0.9) * Math.cos(sy * 15.0 * s + 1.4) * 0.07;
      h += Math.sin(sx * 32.0 * s + 1.5) * Math.cos(sy * 28.0 * s + 2.7) * 0.03;
      h += Math.sin((sx + sy * 0.35) * 5.0 * s + 0.5) * 0.13;
      h += Math.sin((sx - sy * 0.45) * 11.0 * s + 1.9) * 0.06;
      return h * relief;
    }

    // Generate contours via marching squares
    const gs = GRID;
    const gw = Math.ceil(W / gs) + 2;
    const gh = Math.ceil(H / gs) + 2;
    const heights = new Float32Array(gw * gh);
    let hMin = Infinity, hMax = -Infinity;

    for (let j = 0; j < gh; j++) {
      for (let i = 0; i < gw; i++) {
        const v = height(i * gs, j * gs);
        heights[j * gw + i] = v;
        if (v < hMin) hMin = v;
        if (v > hMax) hMax = v;
      }
    }

    const range = hMax - hMin;
    if (range < 0.001) return;

    const baseInterval = BASE_INTERVAL / detail;
    const minInterval = range / MAX_CONTOURS;
    const interval = Math.max(baseInterval, minInterval);
    const startLevel = Math.ceil(hMin / interval) * interval;

    interface Contour { normH: number; isMajor: boolean; segs: number[] }
    const contours: Contour[] = [];
    let levelIdx = 0;

    for (let level = startLevel; level <= hMax; level += interval) {
      const normH = (level - hMin) / range;
      const isMajor = levelIdx % MAJOR_EVERY === 0;
      levelIdx++;
      const segs: number[] = [];

      for (let j = 0; j < gh - 1; j++) {
        for (let i = 0; i < gw - 1; i++) {
          const tl = heights[j * gw + i];
          const tr = heights[j * gw + i + 1];
          const br = heights[(j + 1) * gw + i + 1];
          const bl = heights[(j + 1) * gw + i];
          let idx = 0;
          if (tl > level) idx |= 1;
          if (tr > level) idx |= 2;
          if (br > level) idx |= 4;
          if (bl > level) idx |= 8;
          if (idx === 0 || idx === 15) continue;

          const x0 = i * gs, y0 = j * gs, x1 = x0 + gs, y1 = y0 + gs;
          const lerp = (a: number, b: number) => { const d = b - a; return Math.abs(d) < 1e-6 ? 0.5 : (level - a) / d; };
          const xt = x0 + lerp(tl, tr) * gs;
          const yr = y0 + lerp(tr, br) * gs;
          const xb = x0 + lerp(bl, br) * gs;
          const yl = y0 + lerp(tl, bl) * gs;

          switch (idx) {
            case 1: case 14: segs.push(x0, yl, xt, y0); break;
            case 2: case 13: segs.push(xt, y0, x1, yr); break;
            case 3: case 12: segs.push(x0, yl, x1, yr); break;
            case 4: case 11: segs.push(x1, yr, xb, y1); break;
            case 6: case 9:  segs.push(xt, y0, xb, y1); break;
            case 7: case 8:  segs.push(x0, yl, xb, y1); break;
            case 5: {
              const avg = (tl + tr + br + bl) * 0.25;
              if (avg > level) { segs.push(x0, yl, xt, y0); segs.push(x1, yr, xb, y1); }
              else { segs.push(x0, yl, xb, y1); segs.push(xt, y0, x1, yr); }
              break;
            }
            case 10: {
              const avg = (tl + tr + br + bl) * 0.25;
              if (avg > level) { segs.push(xt, y0, x1, yr); segs.push(x0, yl, xb, y1); }
              else { segs.push(x0, yl, xt, y0); segs.push(x1, yr, xb, y1); }
              break;
            }
          }
        }
      }
      if (segs.length > 0) contours.push({ normH, isMajor, segs });
    }

    // Route — greedy pathfinder from upper-left to lower-right through valleys
    let route: { x: number; y: number; normH: number }[] = [];
    {
      const idx = (x: number, y: number) => y * gw + x;
      let cx = Math.floor(gw * 0.08), cy = Math.floor(gh * 0.20);
      const endX = Math.floor(gw * 0.92), endY = Math.floor(gh * 0.80);
      const visited = new Uint8Array(gw * gh);
      const grid: [number, number][] = [];
      visited[idx(cx, cy)] = 1; grid.push([cx, cy]);
      for (let step = 0; step < (gw + gh) * 2; step++) {
        const dx = endX - cx, dy = endY - cy, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1.5) break;
        const tx = dx / dist, ty = dy / dist;
        let bx = -1, by = -1, bs = Infinity;
        for (let oy = -1; oy <= 1; oy++) for (let ox = -1; ox <= 1; ox++) {
          if (!ox && !oy) continue;
          const nx = cx + ox, ny = cy + oy;
          if (nx < 0 || nx >= gw || ny < 0 || ny >= gh || visited[idx(nx, ny)]) continue;
          const dot = (ox * tx + oy * ty) / Math.sqrt(ox * ox + oy * oy);
          if (dot < -0.1) continue;
          const score = heights[idx(nx, ny)] * 5 - dot;
          if (score < bs) { bs = score; bx = nx; by = ny; }
        }
        if (bx === -1) break;
        cx = bx; cy = by; visited[idx(cx, cy)] = 1; grid.push([cx, cy]);
      }
      let path = grid.map(([gx, gy]) => ({ x: gx * gs, y: gy * gs, normH: (heights[idx(gx, gy)] - hMin) / range }));
      for (let pass = 0; pass < 3; pass++) {
        if (path.length < 3) break;
        const next = [path[0]];
        for (let i = 1; i < path.length - 1; i++) next.push({ x: (path[i-1].x + path[i].x * 2 + path[i+1].x) / 4, y: (path[i-1].y + path[i].y * 2 + path[i+1].y) / 4, normH: (path[i-1].normH + path[i].normH * 2 + path[i+1].normH) / 4 });
        next.push(path[path.length - 1]); path = next;
      }
      route = path;
    }

    function drawRoute(yCompress: number, yShift: number, elevLift: number) {
      if (!showRoute || route.length < 2) return;
      ctx.strokeStyle = 'rgba(201,162,39,0.85)'; ctx.lineWidth = 1.6; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath();
      for (let i = 0; i < route.length; i++) {
        const p = route[i]; const yProj = p.y * yCompress + yShift - p.normH * elevLift;
        if (i === 0) ctx.moveTo(p.x, yProj); else ctx.lineTo(p.x, yProj);
      }
      ctx.stroke();
      ctx.fillStyle = 'rgba(201,162,39,0.95)';
      for (const i of [0, route.length - 1]) {
        const p = route[i]; const yProj = p.y * yCompress + yShift - p.normH * elevLift;
        ctx.beginPath(); ctx.arc(p.x, yProj, 3.5, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = 'rgba(201,162,39,0.18)';
      for (const i of [0, route.length - 1]) {
        const p = route[i]; const yProj = p.y * yCompress + yShift - p.normH * elevLift;
        ctx.beginPath(); ctx.arc(p.x, yProj, 9, 0, Math.PI * 2); ctx.fill();
      }
    }

    function strokePass(isMajor: boolean, baseAlpha: number, lineWidth: number, yCompress: number, yShift: number, elevLift: number) {
      ctx.lineWidth = lineWidth; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      for (const c of contours) {
        if (c.isMajor !== isMajor) continue;
        const elevAlpha = 0.30 + 0.70 * c.normH;
        const alpha = baseAlpha * elevAlpha;
        ctx.strokeStyle = `rgba(${INK.r},${INK.g},${INK.b},${alpha.toFixed(3)})`;
        ctx.beginPath();
        const yOffset = yShift - c.normH * elevLift;
        const s = c.segs;
        for (let i = 0, n = s.length; i < n; i += 4) {
          ctx.moveTo(s[i], s[i + 1] * yCompress + yOffset);
          ctx.lineTo(s[i + 2], s[i + 3] * yCompress + yOffset);
        }
        ctx.stroke();
      }
    }

    function draw(t: number) {
      ctx.fillStyle = '#0a0f1a';
      ctx.fillRect(0, 0, W, H);

      const breath = 0.93 + Math.sin(t * 0.0001) * 0.07;
      const cMin = ALPHA_MINOR * (1 / Math.sqrt(contrast)) * breath;
      const cMaj = ALPHA_MAJOR * Math.sqrt(contrast) * breath;
      const yCompress = 1 - tilt * 0.5;
      const yShift = tilt * H * 0.25;
      const elevLift = tilt * H * 0.35 * relief;

      strokePass(false, cMin, WIDTH_MINOR, yCompress, yShift, elevLift);
      strokePass(true, cMaj, WIDTH_MAJOR, yCompress, yShift, elevLift);
      drawRoute(yCompress, yShift, elevLift);

      frameRef.current = requestAnimationFrame(draw);
    }

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [W, H, scale, detail, relief, contrast, tilt, showRoute]);

  return <canvas ref={canvasRef as any} style={{ width: W, height: H, display: 'block' }} />;
}

export function TerrainDynamic({ width, height, scale = 0.7, detail = 1, relief = 1, contrast = 1, tilt = 0, showRoute = false, style }: TerrainDynamicProps) {
  if (Platform.OS === 'web') {
    return (
      <View style={[{ width, height, overflow: 'hidden' }, style]}>
        <TerrainCanvasWeb width={width} height={height} scale={scale} detail={detail} relief={relief} contrast={contrast} tilt={tilt} showRoute={showRoute} />
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

  return <TerrainCanvasNative width={width} height={height} scale={scale} detail={detail} relief={relief} contrast={contrast} tilt={tilt} showRoute={showRoute} style={style} />;
}

function TerrainCanvasNative({ width: W, height: H, scale, detail, relief, contrast, tilt, showRoute, style }: Required<Omit<TerrainDynamicProps, 'style'>> & { style?: ViewStyle }) {
  const S = require('@shopify/react-native-skia');
  const [breath, setBreath] = React.useState(1);

  React.useEffect(() => {
    const start = Date.now();
    let raf = 0;
    function tick() {
      const t = Date.now() - start;
      setBreath(0.93 + Math.sin(t * 0.0001) * 0.07);
      raf = requestAnimationFrame(tick);
    }
    // Throttle to ~10fps for subtle breathing
    const iv = setInterval(() => { const t = Date.now() - start; setBreath(0.93 + Math.sin(t * 0.0001) * 0.07); }, 100);
    return () => clearInterval(iv);
  }, []);

  const INK_COL = { r: 232, g: 228, b: 220 };
  const GRID = 11;
  const MAJOR_EVERY = 5;
  const BASE_INTERVAL = 0.045;
  const MAX_CONTOURS = 80;

  const contourData = useMemo(() => {
    function heightFn(x: number, y: number) {
      const sx = x / W, sy = y / H, s = scale;
      let h = 0;
      h += Math.sin(sx * 2.5 * s + 0.4) * Math.cos(sy * 2.0 * s + 1.2) * 0.55;
      h += Math.sin(sx * 5.5 * s + 1.7) * Math.cos(sy * 4.5 * s + 0.4) * 0.35;
      h += Math.sin(sx * 10.0 * s + 2.3) * Math.cos(sy * 8.5 * s + 3.1) * 0.18;
      h += Math.sin(sx * 18.0 * s + 0.9) * Math.cos(sy * 15.0 * s + 1.4) * 0.07;
      h += Math.sin(sx * 32.0 * s + 1.5) * Math.cos(sy * 28.0 * s + 2.7) * 0.03;
      h += Math.sin((sx + sy * 0.35) * 5.0 * s + 0.5) * 0.13;
      h += Math.sin((sx - sy * 0.45) * 11.0 * s + 1.9) * 0.06;
      return h * relief;
    }

    const gs = GRID;
    const gw = Math.ceil(W / gs) + 2;
    const gh = Math.ceil(H / gs) + 2;
    const heights = new Float32Array(gw * gh);
    let hMin = Infinity, hMax = -Infinity;
    for (let j = 0; j < gh; j++) {
      for (let i = 0; i < gw; i++) {
        const v = heightFn(i * gs, j * gs);
        heights[j * gw + i] = v;
        if (v < hMin) hMin = v;
        if (v > hMax) hMax = v;
      }
    }

    const range = hMax - hMin;
    if (range < 0.001) return [];

    const baseInterval = BASE_INTERVAL / detail;
    const minInterval = range / MAX_CONTOURS;
    const interval = Math.max(baseInterval, minInterval);
    const startLevel = Math.ceil(hMin / interval) * interval;

    const result: { normH: number; isMajor: boolean; segs: number[] }[] = [];
    let levelIdx = 0;

    for (let level = startLevel; level <= hMax; level += interval) {
      const normH = (level - hMin) / range;
      const isMajor = levelIdx % MAJOR_EVERY === 0;
      levelIdx++;
      const segs: number[] = [];

      for (let j = 0; j < gh - 1; j++) {
        for (let i = 0; i < gw - 1; i++) {
          const tl = heights[j * gw + i];
          const tr = heights[j * gw + i + 1];
          const br = heights[(j + 1) * gw + i + 1];
          const bl = heights[(j + 1) * gw + i];
          let idx = 0;
          if (tl > level) idx |= 1;
          if (tr > level) idx |= 2;
          if (br > level) idx |= 4;
          if (bl > level) idx |= 8;
          if (idx === 0 || idx === 15) continue;

          const x0 = i * gs, y0 = j * gs, x1 = x0 + gs, y1 = y0 + gs;
          const lerp = (a: number, b: number) => { const d = b - a; return Math.abs(d) < 1e-6 ? 0.5 : (level - a) / d; };
          const xt = x0 + lerp(tl, tr) * gs;
          const yr = y0 + lerp(tr, br) * gs;
          const xb = x0 + lerp(bl, br) * gs;
          const yl = y0 + lerp(tl, bl) * gs;

          switch (idx) {
            case 1: case 14: segs.push(x0, yl, xt, y0); break;
            case 2: case 13: segs.push(xt, y0, x1, yr); break;
            case 3: case 12: segs.push(x0, yl, x1, yr); break;
            case 4: case 11: segs.push(x1, yr, xb, y1); break;
            case 6: case 9:  segs.push(xt, y0, xb, y1); break;
            case 7: case 8:  segs.push(x0, yl, xb, y1); break;
            case 5: {
              const avg = (tl + tr + br + bl) * 0.25;
              if (avg > level) { segs.push(x0, yl, xt, y0); segs.push(x1, yr, xb, y1); }
              else { segs.push(x0, yl, xb, y1); segs.push(xt, y0, x1, yr); }
              break;
            }
            case 10: {
              const avg = (tl + tr + br + bl) * 0.25;
              if (avg > level) { segs.push(xt, y0, x1, yr); segs.push(x0, yl, xb, y1); }
              else { segs.push(x0, yl, xt, y0); segs.push(x1, yr, xb, y1); }
              break;
            }
          }
        }
      }
      if (segs.length > 0) result.push({ normH, isMajor, segs });
    }
    return result;
  }, [W, H, scale, detail, relief]);

  const lines = useMemo(() => {
    const ALPHA_MINOR = 0.16;
    const ALPHA_MAJOR = 0.50;
    const WIDTH_MINOR = 0.55;
    const WIDTH_MAJOR = 1.10;
    const yCompress = 1 - tilt * 0.5;
    const yShift = tilt * H * 0.25;
    const elevLift = tilt * H * 0.35 * relief;
    const out: { p1x: number; p1y: number; p2x: number; p2y: number; color: string; width: number }[] = [];

    for (const c of contourData) {
      const baseAlpha = c.isMajor ? ALPHA_MAJOR : ALPHA_MINOR;
      const lineWidth = c.isMajor ? WIDTH_MAJOR : WIDTH_MINOR;
      const elevAlpha = 0.30 + 0.70 * c.normH;
      const alpha = baseAlpha * elevAlpha * Math.sqrt(contrast) * breath;
      const col = `rgba(${INK_COL.r},${INK_COL.g},${INK_COL.b},${alpha.toFixed(3)})`;
      const yOffset = yShift - c.normH * elevLift;
      const s = c.segs;
      for (let i = 0; i < s.length; i += 4) {
        out.push({
          p1x: s[i], p1y: s[i + 1] * yCompress + yOffset,
          p2x: s[i + 2], p2y: s[i + 3] * yCompress + yOffset,
          color: col, width: lineWidth,
        });
      }
    }
    return out;
  }, [contourData, contrast, tilt, H, relief, breath]);

  return (
    <View style={[{ width: W, height: H, backgroundColor: color.void[300] }, style]}>
      <S.Canvas style={{ width: W, height: H }}>
        <S.Fill color="#0a0f1a" />
        {lines.map((l, i) => (
          <S.Line key={i} p1={{ x: l.p1x, y: l.p1y }} p2={{ x: l.p2x, y: l.p2y }} color={l.color} strokeWidth={l.width} />
        ))}
      </S.Canvas>
    </View>
  );
}
