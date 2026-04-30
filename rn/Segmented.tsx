/**
 * Segmented — matches CSS exactly.
 * Track: input-bg, inset border, r-2, 2px padding.
 * Active: bg-overlay, fg, inset border-strong.
 * Inactive: transparent, fg-subtle.
 */
import React from 'react';
import { View, Pressable, Text, Platform, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font } from './tokens';

interface SegmentedProps {
  options: string[];
  selected: number;
  onSelect: (index: number) => void;
  size?: 'sm' | 'md';
}

export function Segmented({ options, selected, onSelect, size = 'md' }: SegmentedProps) {
  const { theme } = useTheme();
  const sm = size === 'sm';

  const trackStyle: ViewStyle = {
    flexDirection: 'row',
    backgroundColor: theme.inputBg,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: r[sm ? 1 : 2],
    padding: 2,
    ...(Platform.OS === 'web' ? { direction: 'ltr' } : {}),
  } as ViewStyle;

  return (
    <View accessibilityRole="radiogroup" style={trackStyle}>
      {options.map((opt, i) => {
        const isOn = i === selected;
        const btnStyle: ViewStyle = {
          flex: sm ? undefined : 1,
          paddingVertical: sm ? 3 : 6,
          paddingHorizontal: sm ? 8 : 14,
          borderRadius: r[1],
          backgroundColor: isOn ? theme.bgOverlay : 'transparent',
          borderWidth: isOn ? 1 : 0,
          borderColor: isOn ? theme.borderStrong : 'transparent',
          alignItems: 'center',
        };
        const txtStyle: TextStyle = {
          fontFamily: font.mono,
          fontSize: sm ? fs[10] : fs[13],
          fontWeight: fw[sm ? 600 : 500],
          color: isOn ? theme.fg : theme.fgSubtle,
        };
        return (
          <Pressable key={i} onPress={() => onSelect(i)} style={btnStyle} accessibilityRole="radio" accessibilityState={{ selected: isOn }}>
            <Text style={txtStyle}>{opt}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
