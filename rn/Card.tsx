/**
 * Card — matches CSS exactly.
 * bg: card-bg (bg-raised), border: inset 1px border, radius: r-2, padding: sp-5 sp-6.
 * Interactive: press deepens shadow. Selected/error/live per CSS spec.
 */
import React from 'react';
import { View, Pressable, type ViewStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r } from './tokens';

interface CardProps {
  children: React.ReactNode;
  interactive?: boolean;
  selected?: boolean;
  loading?: boolean;
  error?: boolean;
  live?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export function Card({ children, interactive, selected, loading, error, live, onPress, style }: CardProps) {
  const { theme } = useTheme();

  // CSS: .card { background: var(--card-bg); box-shadow: inset 0 0 0 1px var(--border); border-radius: r-2; padding: sp-5 sp-6; }
  const baseStyle: ViewStyle = {
    backgroundColor: theme.bgRaised,
    borderRadius: r[2],
    borderWidth: 1,
    borderColor: selected ? theme.accentSoft : error ? theme.dangerSoft : theme.border,
    paddingVertical: sp[5],
    paddingHorizontal: sp[6],
    opacity: loading ? 0.6 : 1,
    // CSS: .card.is-live { border-inline-start: var(--border-live); }
    ...(live ? { borderStartWidth: 3, borderStartColor: theme.accent } : {}),
    ...style,
  };

  if (interactive) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        disabled={loading}
        style={({ pressed }) => [baseStyle, pressed && { borderColor: theme.borderStrong }]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={baseStyle}>{children}</View>;
}
