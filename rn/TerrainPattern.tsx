/**
 * TerrainPattern — topographic contour lines as brand texture.
 * Lines flow coherently — each follows the one above with slight drift.
 * Density bunches at elevation changes, spreads on flat ground.
 */
import React, { useMemo } from 'react';
import { View, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from './ThemeContext';

interface TerrainPatternProps {
  width: number;
  height: number;
  variant?: 'standard' | 'dense';
  opacity?: number;
  style?: ViewStyle;
}

function seeded(s: number) {
  return () => { s = Math.sin(s) * 10000; return s - Math.floor(s); };
}

function generateContours(w: number, h: number, variant: string, isVoid: boolean, seed: number): string[] {
  const gaps = variant === 'dense'
    ? [4, 4, 3, 3, 3, 3, 4, 5, 7, 10, 7, 5, 3, 3, 3, 4, 5, 8, 12, 8, 5, 3, 3, 3, 4, 5, 7, 10, 14, 10, 7, 4, 3, 3, 3, 4, 5]
    : [7, 9, 6, 5, 4, 3, 3, 3, 4, 5, 7, 10, 16, 24, 18, 12, 8, 6, 4, 3, 3, 4, 6, 9, 14, 20, 14, 8, 5, 4, 3, 3, 4, 6, 9];

  const maxGap = variant === 'dense' ? 14 : 24;
  const baseOpacity = isVoid ? 0.05 : 0.06;
  const opacityRange = isVoid ? 0.2 : 0.24;
  const pts = 20;
  const step = w / (pts - 1);

  // Build base terrain shape
  const rng = seeded(seed);
  let baseShape: number[] = [];
  for (let p = 0; p < pts; p++) {
    const s1 = Math.sin(p * 0.18 + 1.2) * 8;
    const s2 = Math.sin(p * 0.42 + 3.8) * 4;
    const s3 = Math.sin(p * 0.85 + 0.5) * 2;
    baseShape.push(s1 + s2 + s3 + (rng() - 0.5) * 5);
  }
  // Smooth
  for (let pass = 0; pass < 2; pass++) {
    const smoothed: number[] = [];
    for (let p = 0; p < pts; p++) {
      const prev = p > 0 ? baseShape[p - 1] : baseShape[p];
      const next = p < pts - 1 ? baseShape[p + 1] : baseShape[p];
      smoothed.push(prev * 0.25 + baseShape[p] * 0.5 + next * 0.25);
    }
    baseShape = smoothed;
  }
  const mean = baseShape.reduce((a, b) => a + b, 0) / baseShape.length;
  baseShape = baseShape.map(v => v - mean);

  // Extend gaps to fill height
  const extGaps: number[] = [];
  let total = 0;
  while (total < h + 80) {
    for (const g of gaps) { extGaps.push(g); total += g; }
  }

  const paths: string[] = [];
  let y = 0;
  for (let i = 0; i < extGaps.length && y < h + 10; i++) {
    const nextGap = extGaps[Math.min(i + 1, extGaps.length - 1)];
    const a = baseOpacity + (nextGap / maxGap) * opacityRange;
    const lineRng = seeded(seed + i * 3.7);
    const drift = (lineRng() - 0.5) * 3;

    const coords: [number, number][] = [];
    for (let p = 0; p < pts; p++) {
      const x = p * step;
      const lineNoise = (lineRng() - 0.5) * 1.5;
      const diverge = Math.sin(p * 0.3 + i * 0.4) * (1.5 + i * 0.12);
      coords.push([Math.round(x * 10) / 10, Math.round((y + baseShape[p] + diverge + drift + lineNoise) * 10) / 10]);
    }

    let d = `M${coords[0][0]},${coords[0][1]}`;
    for (let j = 1; j < coords.length; j++) {
      const cpx = (coords[j - 1][0] + coords[j][0]) / 2;
      d += ` C${cpx},${coords[j - 1][1]} ${cpx},${coords[j][1]} ${coords[j][0]},${coords[j][1]}`;
    }

    const strokeColor = isVoid
      ? `rgba(232,228,220,${a.toFixed(3)})`
      : `rgba(10,15,26,${a.toFixed(3)})`;

    paths.push(`${d}|${strokeColor}`);
    y += extGaps[i];
  }
  return paths;
}

export function TerrainPattern({ width, height, variant = 'standard', opacity = 1, style }: TerrainPatternProps) {
  const { theme, mode } = useTheme();
  const isVoid = mode === 'void';

  const paths = useMemo(
    () => generateContours(width, height, variant, isVoid, 42),
    [width, height, variant, isVoid]
  );

  return (
    <View style={[{ width, height, backgroundColor: theme.bg, overflow: 'hidden' }, style]}>
      <Svg width={width} height={height} style={{ position: 'absolute', opacity }}>
        {paths.map((entry, i) => {
          const [d, stroke] = entry.split('|');
          return <Path key={i} d={d} stroke={stroke} strokeWidth={0.8} fill="none" />;
        })}
      </Svg>
    </View>
  );
}
