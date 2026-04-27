/**
 * Radio — circular selection indicator.
 */
import React from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { r } from './tokens';

interface RadioProps {
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

const SIZE = 18;

export function Radio({ selected, onSelect, disabled }: RadioProps) {
  const { theme } = useTheme();

  const outerStyle: ViewStyle = {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: selected ? 5 : 1,
    borderColor: selected ? theme.accent : theme.borderStrong,
    backgroundColor: selected ? "transparent" : theme.inputBg,
    opacity: disabled ? 0.4 : 1,
  };

  return (
    <Pressable onPress={() => !disabled && onSelect()} accessibilityRole="radio" accessibilityState={{ selected, disabled }} style={outerStyle} />
  );
}
