/**
 * IconButton — icon-only pressable with variants.
 */
import React from 'react';
import { Pressable, type ViewStyle } from 'react-native';
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

  const bgMap: Record<Variant, string> = {
    default: 'transparent',
    primary: theme.accent,
    ghost: 'transparent',
    danger: 'transparent',
  };

  const dim = sizes[size];

  const style: ViewStyle = {
    width: dim,
    height: dim,
    borderRadius: r[2],
    backgroundColor: bgMap[variant],
    borderWidth: variant === 'default' ? 1 : variant === 'danger' ? 1 : 0,
    borderColor: variant === 'danger' ? theme.dangerSoft : theme.border,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.4 : 1,
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [style, pressed && { opacity: 0.7 }]}
    >
      {children}
    </Pressable>
  );
}
