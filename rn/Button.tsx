/**
 * Button — production component.
 * Variants: primary, secondary, ghost, danger, danger-solid, signal.
 * Sizes: sm (32px), md (40px default), lg (48px).
 * States: disabled, loading, block (full width).
 * For icon-only buttons, use IconButton component.
 */
import React from 'react';
import { Pressable, View, Text, ActivityIndicator, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font, h, color } from './tokens';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-solid' | 'signal';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: string;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  icon?: React.ReactNode;
  onPress?: () => void;
}

const heights: Record<Size, number> = { sm: h.sm, md: h.md, lg: h.lg };
const paddings: Record<Size, number> = { sm: sp[3], md: sp[5], lg: sp[6] };
const fontSizes: Record<Size, number> = { sm: fs[13], md: fs[14], lg: fs[15] };

export function Button({ children, variant = 'primary', size = 'md', disabled, loading, block, icon, onPress }: ButtonProps) {
  const { theme } = useTheme();

  const bgMap: Record<Variant, string> = {
    primary: theme.accent,
    secondary: 'transparent',
    ghost: 'transparent',
    danger: 'transparent',
    'danger-solid': color.danger[400],
    signal: color.gold[400],
  };

  const fgMap: Record<Variant, string> = {
    primary: theme.accentFg,
    secondary: theme.fg,
    ghost: theme.fgMuted,
    danger: color.danger[300],
    'danger-solid': color.chalk[100],
    signal: theme.bg,
  };

  const disabledBg: Record<Variant, string> = {
    primary: theme.accentSoft,
    secondary: 'transparent',
    ghost: 'transparent',
    danger: 'transparent',
    'danger-solid': theme.dangerSoft,
    signal: theme.signalSoft,
  };

  const isOutline = variant === 'secondary' || variant === 'danger';
  const borderColor = variant === 'secondary' ? theme.borderStrong
    : variant === 'danger' ? theme.dangerBorder
    : 'transparent';

  const containerStyle: ViewStyle = {
    height: heights[size],
    paddingHorizontal: variant === 'ghost' ? sp[3] : paddings[size],
    borderRadius: r[2],
    backgroundColor: disabled ? disabledBg[variant] : bgMap[variant],
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: sp[2],
    opacity: disabled && variant === 'ghost' ? 0.4 : 1,
    ...(block ? { width: '100%' } : {}),
    ...(isOutline ? { borderWidth: 1, borderColor: disabled ? theme.border : borderColor } : {}),
  };

  const textStyle: TextStyle = {
    fontFamily: font.sans,
    fontSize: fontSizes[size],
    fontWeight: fw[600],
    letterSpacing: -0.07,
    color: loading ? 'transparent' : (disabled ? theme.fgDisabled : fgMap[variant]),
  };

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      disabled={disabled || loading}
      style={({ pressed }) => [
        containerStyle,
        pressed && !disabled && { opacity: 0.9, transform: [{ translateY: 0.5 }] },
      ]}
    >
      {loading && (
        <ActivityIndicator
          size={size === 'sm' ? 'small' : 'small'}
          color={fgMap[variant]}
          style={{ position: 'absolute' }}
        />
      )}
      {icon && !loading && <View>{icon}</View>}
      <Text style={textStyle}>{children}</Text>
    </Pressable>
  );
}
