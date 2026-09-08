/**
 * BackButton — the one way back from a pushed (takeover) page.
 *
 * Standard: pushed pages hide primary nav; BackButton sits at the start of
 * the title row, where the nav would have been. RTL-aware chevron, icon only.
 */
import React from 'react';
import { Pressable, I18nManager } from 'react-native';
import { useTheme } from './ThemeContext';
import { icon, r } from './tokens';
import { Icon } from './Icon';

interface BackButtonProps {
  onPress: () => void;
}

export function BackButton({ onPress }: BackButtonProps) {
  const { theme } = useTheme();
  const isRTL = I18nManager.isRTL;
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel="Back"
      style={({ pressed }) => ({
        alignItems: 'center', justifyContent: 'center',
        minWidth: 40, minHeight: 40,
        borderRadius: r[2],
        backgroundColor: pressed ? theme.hoverOverlay : 'transparent',
      })}
    >
      <Icon name={isRTL ? 'chevron-right' : 'chevron-left'} size={icon.lg} color={theme.fg} />
    </Pressable>
  );
}
