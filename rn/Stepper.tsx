/**
 * Stepper — numeric increment/decrement control.
 */
import React from 'react';
import { View, Pressable, Text, Platform, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font, h } from './tokens';

interface StepperProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function Stepper({ value, min = 0, max = 100, step = 1, onChange, disabled }: StepperProps) {
  const { theme } = useTheme();

  const canDec = value > min;
  const canInc = value < max;

  const btnStyle = (enabled: boolean): ViewStyle => ({
    width: h.sm,
    height: h.sm,
    borderRadius: r[2],
    backgroundColor: theme.bgOverlay,
    borderWidth: 1,
    borderColor: theme.border,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: enabled && !disabled ? 1 : 0.4,
  });

  const btnText: TextStyle = {
    fontFamily: font.mono,
    fontSize: fs[16],
    color: theme.fg,
  };

  const valueStyle: TextStyle = {
    fontFamily: font.mono,
    fontSize: fs[16],
    fontWeight: fw[600],
    color: theme.fg,
    minWidth: h.md,
    textAlign: 'center',
    ...(Platform.OS === 'web' ? { userSelect: 'none' } : {}),
  } as TextStyle;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[2] }}>
      <Pressable onPress={() => canDec && !disabled && onChange(value - step)} style={btnStyle(canDec)} accessibilityRole="button" accessibilityLabel="Decrease" accessibilityState={{ disabled: !canDec || !!disabled }}>
        <Text style={btnText}>−</Text>
      </Pressable>
      <Text style={valueStyle} accessibilityRole="text">{value}</Text>
      <Pressable onPress={() => canInc && !disabled && onChange(value + step)} style={btnStyle(canInc)} accessibilityRole="button" accessibilityLabel="Increase" accessibilityState={{ disabled: !canInc || !!disabled }}>
        <Text style={btnText}>+</Text>
      </Pressable>
    </View>
  );
}
