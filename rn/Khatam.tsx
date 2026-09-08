/**
 * Khatam — eight-point star lattice for earned moments.
 *
 * The classic khatam construction: a square rotated over a diamond, tiled.
 * Line only, never filled — there is deliberately no fill prop.
 * Reserved for certificates, milestones, and finals — never everyday wallpaper.
 * Deliberately still — an earned moment doesn't need to move.
 */
import React, { useMemo } from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from './ThemeContext';

const SCALES = {
  lg: { tile: 132, sw: 1.2 },
  md: { tile: 88, sw: 1.0 },
  sm: { tile: 48, sw: 0.8 },
} as const;

interface KhatamProps {
  width: number;
  height: number;
  scale?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export function Khatam({
  width: w,
  height: h,
  scale = 'md',
  style,
}: KhatamProps) {
  const { mode } = useTheme();
  const S = SCALES[scale];
  const stroke = mode === 'void' ? 'rgba(241,235,221,0.18)' : 'rgba(38,40,46,0.22)';

  // Manual tiling — two concatenated d-strings (squares, diamonds) keeps node count at 2.
  const { squaresD, diamondsD } = useMemo(() => {
    const k = S.tile / 96;
    const cols = Math.ceil(w / S.tile) + 1;
    const rows = Math.ceil(h / S.tile) + 1;
    let sq = '';
    let di = '';
    const f = (n: number) => Math.round(n * 10) / 10;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const tx = i * S.tile;
        const ty = j * S.tile;
        const x = tx + 14 * k;
        const y = ty + 14 * k;
        const s = 68 * k;
        sq += `M${f(x)} ${f(y)}h${f(s)}v${f(s)}h${f(-s)}Z`;
        di += `M${f(tx + 48 * k)} ${f(ty)}L${f(tx + 96 * k)} ${f(ty + 48 * k)}L${f(tx + 48 * k)} ${f(ty + 96 * k)}L${f(tx)} ${f(ty + 48 * k)}Z`;
      }
    }
    return { squaresD: sq, diamondsD: di };
  }, [w, h, scale]);

  return (
    <View style={[{ width: w, height: h, overflow: 'hidden' }, style]} pointerEvents="none">
      <Svg width={w} height={h}>
        <Path d={squaresD} fill="none" stroke={stroke} strokeWidth={S.sw} />
        <Path d={diamondsD} fill="none" stroke={stroke} strokeWidth={S.sw} strokeLinejoin="round" />
      </Svg>
    </View>
  );
}
