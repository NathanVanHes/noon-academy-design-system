/**
 * Radio — circular selection indicator.
 */
import React from 'react';
import { Pressable, View, Text, type ViewStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, font } from './tokens';

interface RadioProps {
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  label?: string;
}

const SIZE = 18;

export function Radio({ selected, onSelect, disabled, label }: RadioProps) {
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
    <Pressable onPress={() => !disabled && onSelect()} accessibilityRole="radio" accessibilityState={{ selected, disabled }} style={label ? { flexDirection: 'row', alignItems: 'center', gap: sp[3] } : undefined}>
      <View style={outerStyle} />
      {label && <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: disabled ? theme.fgFaint : theme.fg }}>{label}</Text>}
    </Pressable>
  );
}
