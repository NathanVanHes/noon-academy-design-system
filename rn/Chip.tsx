/**
 * Chip — matches CSS: height 28, r-1 radius, inset border, fs-12 fw-500.
 * Variants: default, accent (is-on), signal, danger, ok.
 */
import React from 'react';
import { View, Text, Pressable, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font, icon, color } from './tokens';

type Variant = 'default' | 'accent' | 'signal' | 'danger' | 'ok';

interface ChipProps {
  children: string;
  variant?: Variant;
  interactive?: boolean;
  dot?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

export function Chip({ children, variant = 'default', interactive, dot, disabled, onPress }: ChipProps) {
  const { theme } = useTheme();

  const bgMap: Record<Variant, string> = {
    default: theme.selectedOverlay, // bg
    accent: theme.accentSoft,
    signal: theme.signalSoft,
    danger: theme.dangerSoft,
    ok: 'rgba(122,142,100,0.14)',
  };

  const fgMap: Record<Variant, string> = {
    default: theme.fg,
    accent: theme.accent,
    signal: theme.signalBright,
    danger: theme.danger,
    ok: color.ok[300],
  };

  const borderMap: Record<Variant, string> = {
    default: theme.border,
    accent: theme.accentBorder,
    signal: theme.signalBorder,
    danger: theme.dangerBorder,
    ok: 'rgba(122,142,100,0.40)', // ok-border not yet in theme
  };

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sp[2], // CSS: gap: sp-2
    height: 28,
    paddingHorizontal: sp[3],
    borderRadius: r[1],
    backgroundColor: bgMap[variant],
    borderWidth: 1,
    borderColor: borderMap[variant],
    opacity: disabled ? 0.4 : 1,
  };

  const textStyle: TextStyle = {
    fontFamily: font.sans,
    fontSize: fs[12],
    fontWeight: fw[500],
    color: fgMap[variant],
  };

  const dotStyle: ViewStyle = {
    width: icon.xs,
    height: icon.xs,
    backgroundColor: fgMap[variant],
    transform: [{ rotate: '45deg' }],
  };

  if (interactive && !disabled) {
    return (
      <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => [containerStyle, pressed && { backgroundColor: theme.border }]}>
        {dot && <View style={dotStyle} />}
        <Text style={textStyle}>{children}</Text>
      </Pressable>
    );
  }

  return (
    <View style={containerStyle}>
      {dot && <View style={dotStyle} />}
      <Text style={textStyle}>{children}</Text>
    </View>
  );
}
