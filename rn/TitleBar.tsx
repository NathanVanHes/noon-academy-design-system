/**
 * TitleBar — top navigation bar.
 * Variants: default, large, transparent, overlay.
 */
import React from 'react';
import { View, Text, Pressable, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font, h } from './tokens';

type Variant = 'default' | 'large' | 'transparent' | 'overlay';

interface TitleBarProps {
  title: string;
  subtitle?: string;
  variant?: Variant;
  backIcon?: React.ReactNode;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export function TitleBar({ title, subtitle, variant = 'default', backIcon, onBack, rightAction }: TitleBarProps) {
  const { theme } = useTheme();

  const isLarge = variant === 'large';
  const isTransparent = variant === 'transparent' || variant === 'overlay';

  const barStyle: ViewStyle = {
    flexDirection: isLarge ? 'column' : 'row',
    alignItems: isLarge ? 'flex-start' : 'center',
    paddingHorizontal: sp[5],
    paddingVertical: sp[3],
    minHeight: isLarge ? 64 : 56,
    backgroundColor: isTransparent ? 'transparent' : theme.bgOverlay,
    borderBottomWidth: isTransparent ? 0 : 1,
    borderBottomColor: theme.border,
    gap: isLarge ? sp[1] : sp[3],
  };

  const titleStyle: TextStyle = {
    fontFamily: isLarge ? font.serif : font.sans,
    fontSize: isLarge ? fs[20] : fs[16],
    fontWeight: isLarge ? fw[500] : fw[600],
    color: theme.fg,
    flex: isLarge ? undefined : 1,
  };

  const subStyle: TextStyle = {
    fontFamily: font.sans,
    fontSize: fs[12],
    color: theme.fgMuted,
  };

  return (
    <View style={barStyle}>
      {!isLarge && (
        <>
          {onBack && (
            <Pressable onPress={onBack} hitSlop={8}>
              {backIcon || <Text style={{ fontSize: fs[20], color: theme.fgMuted }}>‹</Text>}
            </Pressable>
          )}
          <Text style={titleStyle} numberOfLines={1}>{title}</Text>
          {rightAction}
        </>
      )}
      {isLarge && (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3], width: '100%' }}>
            {onBack && (
              <Pressable onPress={onBack} hitSlop={8}>
                {backIcon || <Text style={{ fontSize: fs[20], color: theme.fgMuted }}>‹</Text>}
              </Pressable>
            )}
            <View style={{ flex: 1 }} />
            {rightAction}
          </View>
          <Text style={titleStyle}>{title}</Text>
          {subtitle && <Text style={subStyle}>{subtitle}</Text>}
        </>
      )}
    </View>
  );
}
