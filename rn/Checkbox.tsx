/**
 * Checkbox — square check with checkmark.
 */
import React from 'react';
import { Pressable, View, Text, type ViewStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, font, icon } from './tokens';

interface CheckboxProps {
  checked: boolean;
  onValueChange: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  label?: string;
}

const SIZE = 18;

export function Checkbox({ checked, onValueChange, disabled, indeterminate, label }: CheckboxProps) {
  const { theme } = useTheme();

  const boxStyle: ViewStyle = {
    width: SIZE,
    height: SIZE,
    borderRadius: r[1],
    borderWidth: checked || indeterminate ? 0 : 1.5,
    borderColor: theme.borderStrong,
    backgroundColor: checked || indeterminate ? theme.accent : theme.bg,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.4 : 1,
  };

  const checkmarkStyle: ViewStyle = {
    width: icon.sm,
    height: icon.xs,
    borderStartWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: theme.accentFg,
    transform: [{ rotate: '-45deg' }, { translateY: -1 }],
  };

  const dashStyle: ViewStyle = {
    width: sp[2],
    height: sp[0.5],
    backgroundColor: theme.accentFg,
  };

  const box = (
    <View style={boxStyle}>
      {checked && !indeterminate && <View style={checkmarkStyle} />}
      {indeterminate && <View style={dashStyle} />}
    </View>
  );

  return (
    <Pressable onPress={() => !disabled && onValueChange(!checked)} accessibilityRole="checkbox" accessibilityState={{ checked, disabled }} style={label ? { flexDirection: 'row', alignItems: 'center', gap: sp[3] } : undefined}>
      {box}
      {label && <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: disabled ? theme.fgFaint : theme.fg }}>{label}</Text>}
    </Pressable>
  );
}
