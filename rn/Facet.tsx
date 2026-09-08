/**
 * Facet — faceted terracotta wall for arrival moments and hero surfaces.
 *
 * A noise-jittered triangular mesh, each facet filled from a 4-step ramp.
 * Two voices: 'dunes' (terracotta/clay) and 'plaster' (quiet cream relief).
 * Mode-agnostic — the same material in void and paper.
 * Renders as 4 fill paths (one per shade) + 1 stroke overlay — cheap everywhere.
 * Motion: slow lighting drift — per-shade opacity breathes ±0.06, phase-offset.
 */
import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
  useReducedMotion,
} from 'react-native-reanimated';
import { makeNoise2D } from './labNoise';

const SCALES = {
  lg: { cell: 72, sw: 1.4 },
  md: { cell: 44, sw: 1.0 },
  sm: { cell: 26, sw: 0.7 },
} as const;

// Facet does not adapt to theme mode — the terracotta and plaster surfaces
// are the material itself, identical in void and paper.
const RAMPS = {
  dunes: { fills: ['#CB7A50', '#BC5A37', '#A94E2A', '#96431F'], stroke: 'rgba(241,235,221,0.35)' },
  plaster: { fills: ['#F5EFE3', '#F1EBDD', '#EFE7D5', '#E9DFC9'], stroke: 'rgba(255,255,255,0.5)' },
} as const;

interface FacetProps {
  width: number;
  height: number;
  voice?: 'dunes' | 'plaster';
  scale?: 'sm' | 'md' | 'lg';
  seed?: number;
  animated?: boolean;
  style?: ViewStyle;
}

export function Facet({
  width: w,
  height: h,
  voice = 'dunes',
  scale = 'md',
  seed = 7,
  animated = true,
  style,
}: FacetProps) {
  const reducedMotion = useReducedMotion();
  const effective = animated && !reducedMotion;
  const S = SCALES[scale];
  const ramp = RAMPS[voice];

  // Geometry — 4 concatenated d-strings (one per shade) + full mesh for strokes.
  const { shadeDs, allD } = useMemo(() => {
    const jitterNoise = makeNoise2D(seed);
    const shadeNoise = makeNoise2D(seed + 101);
    const cols = Math.max(1, Math.round(w / S.cell));
    const rows = Math.max(1, Math.round(h / S.cell));
    const cw = w / cols;
    const ch = h / rows;
    const amp = Math.min(cw, ch) * 0.36;

    // Jittered vertex grid — edges pinned so the mesh fills the frame exactly.
    const vx: number[] = [];
    const vy: number[] = [];
    for (let j = 0; j <= rows; j++) {
      for (let i = 0; i <= cols; i++) {
        let x = i * cw;
        let y = j * ch;
        if (i > 0 && i < cols) x += jitterNoise(i * 0.83 + 11.3, j * 0.71 + 5.7) * amp;
        if (j > 0 && j < rows) y += jitterNoise(i * 0.67 + 41.9, j * 0.91 + 23.1) * amp;
        vx.push(x);
        vy.push(y);
      }
    }

    const ds = ['', '', '', ''];
    const stride = cols + 1;
    const f = (n: number) => Math.round(n * 10) / 10;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const a = j * stride + i;
        const b = a + 1;
        const c = a + stride;
        const d = c + 1;
        // Diagonal flip from noise for an irregular, hand-set feel.
        const flip = jitterNoise(i * 0.53 + 91.7, j * 0.59 + 67.3) > 0;
        const tris = flip ? [[a, b, d], [a, d, c]] : [[a, b, c], [b, d, c]];
        for (const t of tris) {
          const cx = (vx[t[0]] + vx[t[1]] + vx[t[2]]) / 3;
          const cy = (vy[t[0]] + vy[t[1]] + vy[t[2]]) / 3;
          const n = shadeNoise((cx / S.cell) * 0.7, (cy / S.cell) * 0.7);
          const idx = Math.min(3, Math.max(0, Math.floor((n * 0.5 + 0.5) * 4)));
          ds[idx] += `M${f(vx[t[0]])} ${f(vy[t[0]])}L${f(vx[t[1]])} ${f(vy[t[1]])}L${f(vx[t[2]])} ${f(vy[t[2]])}Z`;
        }
      }
    }
    return { shadeDs: ds, allD: ds.join('') };
  }, [w, h, scale, seed]);

  // Lighting drift — one shared value, four phase-offset opacity breathers.
  const t = useSharedValue(0);
  useEffect(() => {
    if (!effective) {
      t.value = 0;
      return;
    }
    t.value = withRepeat(
      withTiming(1, { duration: 6000, easing: Easing.linear }),
      -1,
    );
    return () => {
      cancelAnimation(t);
    };
  }, [effective]);

  // Style-based opacity (Animated.View) — reliable on web, iOS, and Android,
  // unlike animatedProps on SVG nodes which react-native-web drops.
  const g0 = useAnimatedStyle(() => ({
    opacity: effective ? 0.9 + 0.1 * Math.sin(2 * Math.PI * t.value) : 1,
  }));
  const g1 = useAnimatedStyle(() => ({
    opacity: effective ? 0.9 + 0.1 * Math.sin(2 * Math.PI * (t.value + 0.25)) : 1,
  }));
  const g2 = useAnimatedStyle(() => ({
    opacity: effective ? 0.9 + 0.1 * Math.sin(2 * Math.PI * (t.value + 0.5)) : 1,
  }));
  const g3 = useAnimatedStyle(() => ({
    opacity: effective ? 0.9 + 0.1 * Math.sin(2 * Math.PI * (t.value + 0.75)) : 1,
  }));
  const groupStyles = [g0, g1, g2, g3];

  const fill = { position: 'absolute' as const, top: 0, left: 0 };
  return (
    <View style={[{ width: w, height: h, overflow: 'hidden', backgroundColor: ramp.fills[1] }, style]} pointerEvents="none">
      {shadeDs.map((d, i) => (
        <Animated.View key={i} style={[fill, groupStyles[i]]}>
          <Svg width={w} height={h}>
            <Path d={d} fill={ramp.fills[i]} />
          </Svg>
        </Animated.View>
      ))}
      <Svg width={w} height={h} style={fill}>
        <Path d={allD} fill="none" stroke={ramp.stroke} strokeWidth={S.sw} strokeLinejoin="round" />
      </Svg>
    </View>
  );
}
