/**
 * Progress — linear bar and circular ring.
 */
import React from 'react';
import { View, Text, type ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font } from './tokens';

/* ─── Linear ─── */
interface LinearProps {
  value: number; // 0-100
  height?: number;
  color?: string;
}

export function LinearProgress({ value, height = sp[1], color }: LinearProps) {
  const { theme } = useTheme();
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View style={{ height, borderRadius: r.pill, backgroundColor: theme.border, overflow: 'hidden' }}>
      <View style={{ height: '100%', width: `${pct}%`, borderRadius: r.pill, backgroundColor: color || theme.accent }} />
    </View>
  );
}

/* ─── Circular ─── */
interface CircularProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
  color?: string;
}

export function CircularProgress({ value, size = sp[9], strokeWidth = 3, showValue, color }: CircularProps) {
  const { theme } = useTheme();
  const pct = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - pct / 100);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={size / 2} cy={size / 2} r={radius} stroke={theme.border} strokeWidth={strokeWidth} fill="none" />
        <Circle cx={size / 2} cy={size / 2} r={radius} stroke={color || theme.accent} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
      </Svg>
      {showValue && (
        <Text style={{ fontFamily: font.mono, fontSize: fs[13], fontWeight: fw[500], color: theme.fg }}>{Math.round(pct)}%</Text>
      )}
    </View>
  );
}
