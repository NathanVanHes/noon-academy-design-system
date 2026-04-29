/**
 * Chip — compact label for filtering, tags, and status.
 * Variants: default (neutral), accent (selected/active).
 * Dismissable: adds × button to remove.
 */
import React from 'react';
import { View, Text, Pressable, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font, icon } from './tokens';

type Variant = 'default' | 'accent';

interface ChipProps {
  children: string;
  variant?: Variant;
  dismissable?: boolean;
  dot?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  onDismiss?: () => void;
}

export function Chip({ children, variant = 'default', dismissable, dot, disabled, onPress, onDismiss }: ChipProps) {
  const { theme } = useTheme();

  const isAccent = variant === 'accent';

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sp[2],
    height: 28,
    paddingHorizontal: sp[3],
    borderRadius: r[1],
    backgroundColor: isAccent ? theme.accentSoft : theme.selectedOverlay,
    borderWidth: 1,
    borderColor: isAccent ? theme.accentBorder : theme.border,
    opacity: disabled ? 0.4 : 1,
  };

  const textColor = isAccent ? theme.accent : theme.fg;

  const textStyle: TextStyle = {
    fontFamily: font.sans,
    fontSize: fs[12],
    fontWeight: fw[500],
    color: textColor,
  };

  const dotStyle: ViewStyle = {
    width: icon.xs,
    height: icon.xs,
    borderRadius: icon.xs / 2,
    backgroundColor: textColor,
  };

  const content = (
    <>
      {dot && <View style={dotStyle} />}
      <Text style={textStyle}>{children}</Text>
      {dismissable && !disabled && (
        <Pressable onPress={onDismiss} hitSlop={4} style={{ marginLeft: sp[0.5] }}>
          <Text style={{ fontFamily: font.sans, fontSize: fs[11], color: textColor, opacity: 0.6 }}>×</Text>
        </Pressable>
      )}
    </>
  );

  if (onPress && !disabled) {
    return (
      <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => [containerStyle, pressed && { backgroundColor: theme.border }]}>
        {content}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{content}</View>;
}
