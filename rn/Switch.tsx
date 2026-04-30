/**
 * Switch — toggle between on/off states.
 * Thumb slides with 120ms ease animation (dur-1).
 */
import React, { useEffect } from 'react';
import { Pressable, Text, Platform } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor, Easing } from 'react-native-reanimated';
import { useTheme } from './ThemeContext';
import { sp, r, fs, font, dur, color } from './tokens';

interface SwitchProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
  disabled?: boolean;
  label?: string;
}

const TRACK_W = 36;
const TRACK_H = 20;
const THUMB_SIZE = 16;
const THUMB_TRAVEL = TRACK_W - THUMB_SIZE - 4;

export function Switch({ value, onValueChange, disabled, label }: SwitchProps) {
  const { theme } = useTheme();
  const thumbX = useSharedValue(value ? THUMB_TRAVEL : 0);
  const trackColor = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    const config = { duration: dur[1], easing: Easing.bezier(0.22, 0.61, 0.36, 1) };
    thumbX.value = withTiming(value ? THUMB_TRAVEL : 0, config);
    trackColor.value = withTiming(value ? 1 : 0, config);
  }, [value]);

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(trackColor.value, [0, 1], [theme.borderStrong, theme.accent]),
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(trackColor.value, [0, 1], [color.chalk[100], theme.accentFg]),
    transform: [{ translateX: thumbX.value }],
  }));

  const track = (
    <Animated.View style={[{
        width: TRACK_W,
        height: TRACK_H,
        borderRadius: r.pill,
        justifyContent: 'center',
        paddingHorizontal: 2,
        opacity: disabled ? 0.4 : 1,
        ...(Platform.OS === 'web' ? { direction: 'ltr' } : {}),
      } as any, trackStyle]}>
        <Animated.View style={[{
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          borderRadius: THUMB_SIZE / 2,
        }, thumbStyle]} />
    </Animated.View>
  );

  return (
    <Pressable onPress={() => !disabled && onValueChange(!value)} accessibilityRole="switch" accessibilityState={{ checked: value, disabled }} style={label ? { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: sp[3], width: '100%' } : undefined}>
      {label && <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: disabled ? theme.fgFaint : theme.fg, flex: 1 }}>{label}</Text>}
      {track}
    </Pressable>
  );
}
