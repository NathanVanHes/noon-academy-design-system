/**
 * Slider — continuous range input.
 * Web: native <input type="range"> for best UX.
 * Native: custom track + thumb with PanResponder.
 */
import React, { useRef, useCallback } from 'react';
import { View, Text, Platform, Pressable, type LayoutChangeEvent } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font } from './tokens';

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  onValueChange: (value: number) => void;
}

export function Slider({ value, min, max, step = 0.01, label, showValue = true, onValueChange }: SliderProps) {
  const { theme } = useTheme();
  const trackRef = useRef<View>(null);
  const widthRef = useRef(0);

  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    widthRef.current = e.nativeEvent.layout.width;
  }, []);

  // Web: native range input styled to match
  if (Platform.OS === 'web') {
    return (
      <View style={{ gap: sp[2] }}>
        {(label || showValue) && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {label && <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgSubtle, letterSpacing: 0.8, textTransform: 'uppercase' }}>{label}</Text>}
            {showValue && <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fg }}>{value.toFixed(step < 1 ? 2 : 0)}</Text>}
          </View>
        )}
        <input
          type="range"
          min={min} max={max} step={step}
          value={value}
          onChange={(e: any) => onValueChange(parseFloat(e.target.value))}
          style={{
            width: '100%', height: 1, appearance: 'none', WebkitAppearance: 'none',
            background: theme.borderStrong, outline: 'none', cursor: 'pointer',
            accentColor: theme.accent,
          } as any}
        />
      </View>
    );
  }

  // Native: custom track + pressable regions
  const handlePress = useCallback((e: any) => {
    const w = widthRef.current;
    if (w <= 0) return;
    const x = e.nativeEvent.locationX;
    const raw = min + (x / w) * (max - min);
    const stepped = Math.round(raw / step) * step;
    onValueChange(Math.max(min, Math.min(max, stepped)));
  }, [min, max, step, onValueChange]);

  return (
    <View style={{ gap: sp[2] }}>
      {(label || showValue) && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          {label && <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgSubtle, letterSpacing: 0.8, textTransform: 'uppercase' }}>{label}</Text>}
          {showValue && <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fg }}>{value.toFixed(step < 1 ? 2 : 0)}</Text>}
        </View>
      )}
      <Pressable onPress={handlePress} onLayout={onLayout} ref={trackRef as any}
        style={{ height: 24, justifyContent: 'center' }}>
        <View style={{ height: 2, backgroundColor: theme.borderStrong, borderRadius: 1 }}>
          <View style={{ height: 2, width: `${pct}%`, backgroundColor: theme.accent, borderRadius: 1 }} />
        </View>
        <View style={{
          position: 'absolute', left: `${pct}%`, marginLeft: -6,
          width: 12, height: 12, borderRadius: 6,
          backgroundColor: theme.accent,
          shadowColor: theme.accent, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 4,
        }} />
      </Pressable>
    </View>
  );
}
