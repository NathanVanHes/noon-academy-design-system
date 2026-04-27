/**
 * Switch — toggle between on/off states.
 */
import React from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r } from './tokens';

interface SwitchProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
  disabled?: boolean;
}

const TRACK_W = 36;
const TRACK_H = 20;
const THUMB_SIZE = 16;
const THUMB_TRAVEL = TRACK_W - THUMB_SIZE - 4;

export function Switch({ value, onValueChange, disabled }: SwitchProps) {
  const { theme } = useTheme();

  const trackStyle: ViewStyle = {
    width: TRACK_W,
    height: TRACK_H,
    borderRadius: r.pill,
    backgroundColor: value ? theme.accent : theme.border,
    justifyContent: 'center',
    paddingHorizontal: 2,
    opacity: disabled ? 0.4 : 1,
  };

  const thumbStyle: ViewStyle = {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: value ? theme.accentFg : '#e8e4dc',
    transform: [{ translateX: value ? THUMB_TRAVEL : 0 }],
  };

  return (
    <Pressable onPress={() => !disabled && onValueChange(!value)} accessibilityRole="switch" accessibilityState={{ checked: value, disabled }} style={trackStyle}>
      <View style={thumbStyle} />
    </Pressable>
  );
}
