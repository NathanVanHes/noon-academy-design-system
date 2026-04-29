/**
 * Button — production component.
 * Variants: primary, secondary, ghost, danger, danger-solid, signal.
 * Sizes: sm (32px), md (40px default), lg (48px).
 * States: disabled (greyed out, opacity 0.4), loading, fullWidth (full width).
 * For icon-only buttons, use IconButton component.
 */
import React from 'react';
import { Pressable, View, Text, ActivityIndicator, Platform, type ViewStyle, type TextStyle } from 'react-native';
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
  fullWidth?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  onPress?: () => void;
}

const heights: Record<Size, number> = { sm: h.sm, md: h.md, lg: h.lg };
const paddings: Record<Size, number> = { sm: sp[3], md: sp[5], lg: sp[6] };
const fontSizes: Record<Size, number> = { sm: fs[13], md: fs[14], lg: fs[15] };

export function Button({ children, variant = 'primary', size = 'md', disabled, loading, fullWidth, leadingIcon, trailingIcon, onPress }: ButtonProps) {
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

  const isOutline = variant === 'secondary' || variant === 'danger';
  const borderColor = variant === 'secondary' ? theme.borderStrong
    : variant === 'danger' ? theme.dangerBorder
    : 'transparent';

  const containerStyle: ViewStyle = {
    height: heights[size],
    paddingHorizontal: variant === 'ghost' ? sp[3] : paddings[size],
    borderRadius: r[2],
    // Disabled: grey bg + grey text for ALL variants
    backgroundColor: disabled ? theme.border : bgMap[variant],
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: sp[2],
    ...(fullWidth ? { width: '100%' } : {}),
    ...(isOutline && !disabled ? { borderWidth: 1, borderColor } : {}),
  };

  const textStyle: TextStyle = {
    fontFamily: font.sans,
    fontSize: fontSizes[size],
    fontWeight: fw[600],
    letterSpacing: -0.07,
    color: loading ? 'transparent' : disabled ? theme.fgFaint : fgMap[variant],
    ...(Platform.OS === 'web' ? { cursor: 'inherit' } : {}),
  } as TextStyle;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      disabled={disabled || loading}
      style={({ pressed, hovered }: any) => [
        containerStyle,
        pressed && !disabled && { opacity: 0.9, transform: [{ translateY: 0.5 }] },
        Platform.OS === 'web' && { cursor: disabled || loading ? 'not-allowed' : 'pointer' },
      ]}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={disabled ? theme.fgFaint : fgMap[variant]}
          style={{ position: 'absolute' }}
        />
      )}
      {leadingIcon && !loading && <View>{leadingIcon}</View>}
      <Text style={textStyle}>{children}</Text>
      {trailingIcon && !loading && <View>{trailingIcon}</View>}
    </Pressable>
  );
}
