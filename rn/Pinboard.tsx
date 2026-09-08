/**
 * Pinboard — dot grid for maps and presence.
 *
 * Dots are binary: full strength or absent — never faded (no fade prop exists).
 * Active pins are green (#6BAE93). When animated, green pins light up over
 * noise-picked dots, hold, then vanish and light up elsewhere — presence
 * moving around the map. The base grid itself never moves; all static dots
 * render as a single Path of circle arcs.
 */
import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  interpolate,
  Easing,
  cancelAnimation,
  useReducedMotion,
} from 'react-native-reanimated';
import { useTheme } from './ThemeContext';
import { makeNoise2D } from './labNoise';

const SCALES = {
  xs: { r: 1.1, gap: 9 },
  sm: { r: 1.9, gap: 15 },
  md: { r: 2.2, gap: 17 },
  lg: { r: 3.2, gap: 26 },
} as const;

const ACTIVE = '#6BAE93';
const BLINK_COUNT = 22;

interface BlinkSpec {
  x: number;
  y: number;
  delay: number; // ms before this dot's clock starts
  period: number; // ms for one full off→on→off cycle
  onStart: number; // fraction of cycle where the dot snaps in
  onEnd: number; // fraction of cycle where the dot snaps out
}

/** One sporadic dot — off most of its cycle, snaps in, holds, snaps out. */
function BlinkDot({ spec, r, color }: { spec: BlinkSpec; r: number; color: string }) {
  const p = useSharedValue(0);

  useEffect(() => {
    p.value = 0;
    p.value = withDelay(
      spec.delay,
      withRepeat(withTiming(1, { duration: spec.period, easing: Easing.linear }), -1),
    );
    return () => {
      cancelAnimation(p);
    };
  }, [spec]);

  // Fast 120ms-ish ramps relative to period — reads as appear/disappear, not fade.
  const ramp = Math.min(0.06, 150 / spec.period);
  const animStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      p.value,
      [0, spec.onStart, spec.onStart + ramp, spec.onEnd - ramp, spec.onEnd, 1],
      [0, 0, 1, 1, 0, 0],
    ),
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: spec.x - r,
          top: spec.y - r,
          width: r * 2,
          height: r * 2,
          borderRadius: r,
          backgroundColor: color,
        },
        animStyle,
      ]}
    />
  );
}

interface PinboardProps {
  width: number;
  height: number;
  scale?: 'xs' | 'sm' | 'md' | 'lg';
  active?: Array<[number, number]>;
  seed?: number;
  animated?: boolean;
  style?: ViewStyle;
}

export function Pinboard({
  width: w,
  height: h,
  scale = 'md',
  active = [],
  seed = 3,
  animated = true,
  style,
}: PinboardProps) {
  const { mode } = useTheme();
  const reducedMotion = useReducedMotion();
  const effective = animated && !reducedMotion;
  const S = SCALES[scale];
  const isVoid = mode === 'void';
  const dotColor = isVoid ? 'rgba(241,235,221,0.35)' : 'rgba(188,90,55,0.38)';

  const { staticD, activeDots, blinkDots } = useMemo(() => {
    const noise = makeNoise2D(seed);
    const cols = Math.floor(w / S.gap);
    const rows = Math.floor(h / S.gap);
    const activeKeys = new Set(active.map(([c, rw]) => `${c},${rw}`));

    // Noise-pick spots where green pins blink in and out over the base grid.
    const blinks: BlinkSpec[] = [];
    if (effective) {
      const candidates: Array<{ key: string; x: number; y: number; v: number }> = [];
      for (let rw = 0; rw < rows; rw++) {
        for (let c = 0; c < cols; c++) {
          const key = `${c},${rw}`;
          if (activeKeys.has(key)) continue;
          candidates.push({
            key,
            x: S.gap / 2 + c * S.gap,
            y: S.gap / 2 + rw * S.gap,
            v: noise(c * 0.73 + 3.1, rw * 0.67 + 8.9),
          });
        }
      }
      candidates.sort((a, b) => b.v - a.v);
      candidates.slice(0, BLINK_COUNT).forEach((cand, i) => {
        // Deterministic per-dot rhythm from noise — every dot on its own clock.
        const r1 = noise(i * 1.37 + 51.2, 17.9) * 0.5 + 0.5;
        const r2 = noise(i * 2.11 + 93.4, 71.3) * 0.5 + 0.5;
        const r3 = noise(i * 3.71 + 29.8, 43.7) * 0.5 + 0.5;
        // Short staggered clocks so at any moment some pins are going dark
        // while others light up elsewhere — presence moving around the map.
        const onStart = 0.05 + r3 * 0.3;
        blinks.push({
          x: cand.x,
          y: cand.y,
          delay: Math.round((i / BLINK_COUNT) * 1800 + r1 * 600),
          period: Math.round(1800 + r2 * 2200), // 1.8–4s cycles
          onStart,
          onEnd: onStart + 0.35 + r1 * 0.25, // lit 35–60% of the cycle
        });
      });
    }

    let d = '';
    const acts: Array<{ x: number; y: number }> = [];
    const f = (n: number) => Math.round(n * 10) / 10;
    const r = S.r;
    for (let rw = 0; rw < rows; rw++) {
      for (let c = 0; c < cols; c++) {
        const key = `${c},${rw}`;
        const x = S.gap / 2 + c * S.gap;
        const y = S.gap / 2 + rw * S.gap;
        if (activeKeys.has(key)) {
          acts.push({ x, y });
          continue;
        }
        d += `M${f(x - r)} ${f(y)}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;
      }
    }
    return { staticD: d, activeDots: acts, blinkDots: blinks };
  }, [w, h, scale, seed, active, effective]);

  return (
    <View style={[{ width: w, height: h, overflow: 'hidden' }, style]} pointerEvents="none">
      <Svg width={w} height={h}>
        <Path d={staticD} fill={dotColor} />
        {activeDots.map((dot, i) => (
          <Circle key={`a${i}`} cx={dot.x} cy={dot.y} r={S.r * 1.4} fill={ACTIVE} />
        ))}
      </Svg>
      {blinkDots.map((spec, i) => (
        <BlinkDot key={`b${i}`} spec={spec} r={S.r * 1.4} color={ACTIVE} />
      ))}
    </View>
  );
}
