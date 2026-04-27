/**
 * SessionBar — question-by-question results. Each segment = one question.
 */
import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r } from './tokens';

type SegState = 'correct' | 'incorrect' | 'current' | 'pending';

interface SessionBarProps {
  segments: SegState[];
  size?: 'sm' | 'md' | 'lg';
}

const heights = { sm: sp[1], md: sp[1], lg: sp[2] };

export function SessionBar({ segments, size = 'md' }: SessionBarProps) {
  const { theme } = useTheme();

  const barStyle: ViewStyle = {
    flexDirection: 'row',
    gap: sp[0.5],
    height: heights[size],
  };

  function segColor(state: SegState): string {
    switch (state) {
      case 'correct': return theme.accent;
      case 'incorrect': return theme.danger;
      case 'current': return theme.signalBright;
      default: return theme.border;
    }
  }

  return (
    <View style={barStyle}>
      {segments.map((s, i) => (
        <View
          key={i}
          style={{
            flex: 1,
            borderRadius: r[1],
            backgroundColor: segColor(s),
          }}
        />
      ))}
    </View>
  );
}
