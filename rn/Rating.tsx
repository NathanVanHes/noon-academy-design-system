/**
 * Rating — five stars for "how was class?".
 *
 * Filled stars are gold (signal) — a rating given is a small earned thing.
 * Whole stars only; pass onChange to make it interactive.
 */
import React from 'react';
import { View, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from './ThemeContext';
import { sp } from './tokens';

interface RatingProps {
  /** 0..max */
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

const DIMS = { sm: 16, md: 24, lg: 32 };

function starPath(s: number): string {
  // 5-point star centred in an s×s box
  const cx = s / 2, cy = s / 2, R = s * 0.46, ri = R * 0.42;
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? R : ri;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join('L')}Z`;
}

export function Rating({ value, onChange, max = 5, size = 'md' }: RatingProps) {
  const { theme } = useTheme();
  const dim = DIMS[size];
  const d = starPath(dim);

  return (
    <View
      style={{ flexDirection: 'row', gap: sp[1] }}
      accessibilityRole={onChange ? undefined : 'text'}
      accessibilityLabel={`${value} of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < value;
        const star = (
          <Svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`}>
            <Path
              d={d}
              fill={filled ? theme.signalBright : 'none'}
              stroke={filled ? theme.signalBright : theme.borderStrong}
              strokeWidth={1.5}
              strokeLinejoin="round"
            />
          </Svg>
        );
        return onChange ? (
          <Pressable
            key={i}
            onPress={() => onChange(i + 1)}
            accessibilityRole="button"
            accessibilityLabel={`${i + 1} star${i === 0 ? '' : 's'}`}
            hitSlop={4}
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
          >
            {star}
          </Pressable>
        ) : (
          <View key={i}>{star}</View>
        );
      })}
    </View>
  );
}
