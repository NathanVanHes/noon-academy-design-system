/**
 * WaterVessel — proof-of-work canteen visualization.
 * Blue above minimum, red below. Shows fill level as fraction.
 */
import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Rect, Line, Circle, ClipPath, Defs } from 'react-native-svg';
import { useTheme } from './ThemeContext';
import { sp, fs, fw, font, color } from './tokens';

interface WaterVesselProps {
  fill: number;
  capacity?: number;
  minimum?: number;
  size?: 'sm' | 'md' | 'lg';
}

const VESSEL_PATH = 'M15,4 L25,4 C27,4 28,5 28,7 L28,12 C28,13 27,14 26,14 L26,18 C32,20 34,26 34,34 C34,42 34,48 32,51 C30,54 26,55 20,55 C14,55 10,54 8,51 C6,48 6,42 6,34 C6,26 8,20 14,18 L14,14 C13,14 12,13 12,12 L12,7 C12,5 13,4 15,4 Z';
const SIZES = { sm: 40, md: 72, lg: 110 };

export function WaterVessel({ fill, capacity = 18, minimum = 12, size = 'lg' }: WaterVesselProps) {
  const { theme } = useTheme();
  const dim = SIZES[size];
  const h = Math.round(dim * 1.4);

  const pct = Math.min(fill / capacity, 1);
  const met = fill >= minimum;
  const overflow = pct >= 1;
  const wc = met ? color.blue[400] : color.danger[400];

  // Water fills from y=52 (bottom) to y=20 (top of body)
  const fillRange = 32; // 52 - 20
  const waterTop = 52 - pct * fillRange;

  const status = fill >= capacity ? 'Overflowing' : met ? 'Minimum met' : `${minimum - fill} more needed`;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[5] }}>
      <Svg width={dim} height={h} viewBox="0 0 40 56">
        <Defs>
          <ClipPath id="vc">
            <Path d={VESSEL_PATH} />
          </ClipPath>
        </Defs>
        {pct > 0 && (
          <Rect x={4} y={waterTop} width={32} height={57 - waterTop} fill={wc} opacity={0.45} clipPath="url(#vc)" />
        )}
        {pct > 0 && !overflow && (
          <Line x1={6} y1={waterTop} x2={34} y2={waterTop} stroke={wc} strokeWidth={1.5} opacity={0.7} clipPath="url(#vc)" />
        )}
        <Path d={VESSEL_PATH} stroke={theme.fgMuted} strokeWidth={1.5} strokeLinejoin="round" fill="none" />
        {overflow && <>
          <Circle cx={36} cy={10} r={1.5} fill={wc} opacity={0.5} />
          <Circle cx={38} cy={16} r={1} fill={wc} opacity={0.4} />
        </>}
      </Svg>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: sp[2] }}>
          <Text style={{ fontFamily: font.serif, fontSize: size === 'lg' ? fs[32] : fs[24], fontWeight: fw[500], color: theme.fg }}>{fill}</Text>
          <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.fgFaint }}>/ {capacity}</Text>
        </View>
        <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: wc, marginTop: sp[1] }}>{status}</Text>
      </View>
    </View>
  );
}
