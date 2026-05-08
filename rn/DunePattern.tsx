/**
 * DunePattern — sweeping desert dune ridges.
 *
 * Hand-crafted composition of full-width dune curves layered front to back.
 * Each dune has a lit face (gold) and shadow face (terra/void) split at the ridge.
 * Light comes from the right. Far dunes are faint, near dunes are bold.
 */
import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from './ThemeContext';
import { color } from './tokens';
import type { ViewStyle } from 'react-native';

interface DunePatternProps {
  width: number;
  height: number;
  opacity?: number;
  style?: ViewStyle;
}

export function DunePattern({ width: w, height: h, opacity = 1, style }: DunePatternProps) {
  const { mode } = useTheme();
  const v = mode === 'void';
  const B = h + 10; // bottom bleed

  // Each ridge: a bezier curve spanning full width, with a shadow fill below
  // and a separate lit fill on the right side of the peak.
  // Defined as: { ridge path, shadow color, shadow opacity, lit path, lit color, lit opacity }

  const layers = [
    // Layer 1 — farthest, high gentle ridge
    {
      ridge: `M0,${h * 0.55} Q${w * 0.25},${h * 0.28} ${w * 0.50},${h * 0.38} Q${w * 0.75},${h * 0.48} ${w},${h * 0.42}`,
      shadow: `M0,${h * 0.55} Q${w * 0.25},${h * 0.28} ${w * 0.50},${h * 0.38} L${w * 0.50},${B} L0,${B} Z`,
      lit: `M${w * 0.50},${h * 0.38} Q${w * 0.75},${h * 0.48} ${w},${h * 0.42} L${w},${B} L${w * 0.50},${B} Z`,
      sCol: v ? color.void[100] : color.chalk[300],
      sOp: v ? 0.06 : 0.03,
      lCol: color.gold[400],
      lOp: v ? 0.05 : 0.03,
    },
    // Layer 2 — mid-far, sweeps left
    {
      ridge: `M0,${h * 0.50} Q${w * 0.15},${h * 0.35} ${w * 0.35},${h * 0.42} Q${w * 0.60},${h * 0.52} ${w},${h * 0.55}`,
      shadow: `M0,${h * 0.50} Q${w * 0.15},${h * 0.35} ${w * 0.35},${h * 0.42} L${w * 0.35},${B} L0,${B} Z`,
      lit: `M${w * 0.35},${h * 0.42} Q${w * 0.60},${h * 0.52} ${w},${h * 0.55} L${w},${B} L${w * 0.35},${B} Z`,
      sCol: v ? color.terra[800] : color.terra[200],
      sOp: v ? 0.08 : 0.04,
      lCol: color.gold[300],
      lOp: v ? 0.08 : 0.05,
    },
    // Layer 3 — middle, bold peak right of center
    {
      ridge: `M0,${h * 0.70} Q${w * 0.30},${h * 0.40} ${w * 0.58},${h * 0.48} Q${w * 0.80},${h * 0.55} ${w},${h * 0.52}`,
      shadow: `M0,${h * 0.70} Q${w * 0.30},${h * 0.40} ${w * 0.58},${h * 0.48} L${w * 0.58},${B} L0,${B} Z`,
      lit: `M${w * 0.58},${h * 0.48} Q${w * 0.80},${h * 0.55} ${w},${h * 0.52} L${w},${B} L${w * 0.58},${B} Z`,
      sCol: v ? color.void[200] : color.terra[300],
      sOp: v ? 0.10 : 0.06,
      lCol: color.gold[200],
      lOp: v ? 0.12 : 0.07,
    },
    // Layer 4 — near, wide dune sweeping right
    {
      ridge: `M0,${h * 0.75} Q${w * 0.20},${h * 0.55} ${w * 0.45},${h * 0.62} Q${w * 0.70},${h * 0.68} ${w},${h * 0.60}`,
      shadow: `M0,${h * 0.75} Q${w * 0.20},${h * 0.55} ${w * 0.45},${h * 0.62} L${w * 0.45},${B} L0,${B} Z`,
      lit: `M${w * 0.45},${h * 0.62} Q${w * 0.70},${h * 0.68} ${w},${h * 0.60} L${w},${B} L${w * 0.45},${B} Z`,
      sCol: v ? color.terra[700] : color.terra[400],
      sOp: v ? 0.10 : 0.06,
      lCol: color.gold[300],
      lOp: v ? 0.14 : 0.08,
    },
    // Layer 5 — nearest, low foreground ridge
    {
      ridge: `M0,${h * 0.88} Q${w * 0.35},${h * 0.72} ${w * 0.65},${h * 0.78} Q${w * 0.85},${h * 0.82} ${w},${h * 0.76}`,
      shadow: `M0,${h * 0.88} Q${w * 0.35},${h * 0.72} ${w * 0.65},${h * 0.78} L${w * 0.65},${B} L0,${B} Z`,
      lit: `M${w * 0.65},${h * 0.78} Q${w * 0.85},${h * 0.82} ${w},${h * 0.76} L${w},${B} L${w * 0.65},${B} Z`,
      sCol: v ? color.void[100] : color.chalk[300],
      sOp: v ? 0.08 : 0.04,
      lCol: color.gold[400],
      lOp: v ? 0.10 : 0.06,
    },
  ];

  return (
    <View style={[{ width: w, height: h, overflow: 'hidden' }, style]}>
      <Svg width={w} height={h} style={{ position: 'absolute', opacity }}>
        {layers.map((l, i) => (
          <React.Fragment key={i}>
            <Path d={l.shadow} fill={l.sCol} fillOpacity={l.sOp} />
            <Path d={l.lit} fill={l.lCol} fillOpacity={l.lOp} />
          </React.Fragment>
        ))}
      </Svg>
    </View>
  );
}
