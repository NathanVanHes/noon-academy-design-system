/**
 * Badge — notification count or status dot.
 */
import React from 'react';
import { View, Text, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font, color } from './tokens';

type Variant = 'default' | 'accent' | 'danger' | 'dot';

interface BadgeProps {
  children?: string | number;
  variant?: Variant;
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const { theme } = useTheme();

  if (variant === 'dot') {
    return (
      <View style={{ width: sp[2], height: sp[2], borderRadius: r.pill, backgroundColor: theme.fg }} />
    );
  }

  const bgMap: Record<string, string> = {
    default: theme.fg,
    accent: theme.accent,
    danger: color.danger[400],
  };

  const fgMap: Record<string, string> = {
    default: theme.fgInverse,
    accent: theme.accentFg,
    danger: color.chalk[100],
  };

  const containerStyle: ViewStyle = {
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: r[4],
    backgroundColor: bgMap[variant],
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textStyle: TextStyle = {
    fontFamily: font.mono,
    fontSize: fs[10],
    fontWeight: fw[500],
    color: fgMap[variant],
    lineHeight: 18,
  };

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{children}</Text>
    </View>
  );
}
