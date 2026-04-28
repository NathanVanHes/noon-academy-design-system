/**
 * IconButton — square icon-only pressable. Matches CSS spec exactly.
 * Variants: default (border), primary (accent fill), ghost (no border), danger (danger border).
 * Sizes: sm (32), md (40), lg (48).
 * Disabled: grey bg + grey content, same as Button.
 */
import React from 'react';
import { Pressable, View, Platform, type ViewStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, h } from './tokens';

type Variant = 'default' | 'primary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface IconButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  onPress?: () => void;
}

const sizes: Record<Size, number> = { sm: h.sm, md: h.md, lg: h.lg };

export function IconButton({ children, variant = 'default', size = 'md', disabled, onPress }: IconButtonProps) {
  const { theme } = useTheme();

  const dim = sizes[size];
  const hasBorder = variant === 'default' || variant === 'danger';

  const style: ViewStyle = {
    width: dim,
    height: dim,
    borderRadius: r[2],
    backgroundColor: disabled ? theme.border
      : variant === 'primary' ? theme.accent
      : 'transparent',
    ...(hasBorder && !disabled ? {
      borderWidth: 1,
      borderColor: variant === 'danger' ? theme.dangerBorder : theme.border,
    } : {}),
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }: any) => [
        style,
        pressed && !disabled && { opacity: 0.9, transform: [{ translateY: 0.5 }] },
        Platform.OS === 'web' && { cursor: disabled ? 'not-allowed' : 'pointer' },
      ]}
    >
      {disabled ? <View style={{ opacity: 0.3 }}>{children}</View> : children}
    </Pressable>
  );
}
