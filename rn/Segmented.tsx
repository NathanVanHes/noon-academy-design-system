/**
 * Segmented — matches CSS exactly.
 * Track: input-bg, inset border, r-2, 2px padding.
 * Active: bg-overlay, fg, inset border-strong.
 * Inactive: transparent, fg-subtle.
 */
import React from 'react';
import { View, Pressable, Text, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font } from './tokens';

interface SegmentedProps {
  options: string[];
  selected: number;
  onSelect: (index: number) => void;
}

export function Segmented({ options, selected, onSelect }: SegmentedProps) {
  const { theme } = useTheme();

  // CSS: .seg { background: var(--input-bg); box-shadow: inset 0 0 0 1px var(--border); border-radius: r-2; padding: 2px; }
  const trackStyle: ViewStyle = {
    flexDirection: 'row',
    backgroundColor: theme.inputBg, // --input-bg approximation
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: r[2],
    padding: sp[0.5],
  };

  return (
    <View style={trackStyle}>
      {options.map((opt, i) => {
        const isOn = i === selected;
        // CSS: .seg button { padding: 6px 14px; border-radius: r-1; font-size: fs-13; fw-500; }
        // CSS: .seg button.is-on { background: bg-overlay; color: fg; box-shadow: inset border-strong; }
        const btnStyle: ViewStyle = {
          flex: 1,
          paddingVertical: 6,
          paddingHorizontal: 14,
          borderRadius: r[1],
          backgroundColor: isOn ? theme.bgOverlay : 'transparent',
          borderWidth: isOn ? 1 : 0,
          borderColor: isOn ? theme.borderStrong : 'transparent',
          alignItems: 'center',
        };
        const txtStyle: TextStyle = {
          fontFamily: font.sans,
          fontSize: fs[13],
          fontWeight: fw[500],
          color: isOn ? theme.fg : theme.fgSubtle,
        };
        return (
          <Pressable key={i} onPress={() => onSelect(i)} style={btnStyle} accessibilityRole="button">
            <Text style={txtStyle}>{opt}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
