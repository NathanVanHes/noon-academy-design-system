/**
 * Toast — temporary notification that auto-dismisses.
 * Slides in from top with 200ms ease, fades out with 120ms ease-in.
 */
import React, { useEffect, useRef } from 'react';
import { Text, Pressable, Animated, Easing } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, font, dur } from './tokens';

type Variant = 'info' | 'success' | 'warn' | 'danger';

interface ToastProps {
  message: string;
  variant?: Variant;
  visible: boolean;
  onDismiss: () => void;
  duration?: number;
}

export function Toast({ message, variant = 'info', visible, onDismiss, duration = 4000 }: ToastProps) {
  const { theme } = useTheme();
  const translateY = useRef(new Animated.Value(-40)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const shown = useRef(false);

  useEffect(() => {
    if (visible && !shown.current) {
      shown.current = true;
      Animated.parallel([
        Animated.timing(translateY, { toValue: 0, duration: dur[2], easing: Easing.bezier(0.22, 0.61, 0.36, 1), useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: dur[2], easing: Easing.bezier(0.22, 0.61, 0.36, 1), useNativeDriver: true }),
      ]).start();
      const timer = setTimeout(() => dismiss(), duration);
      return () => clearTimeout(timer);
    }
    if (!visible && shown.current) {
      shown.current = false;
      translateY.setValue(-40);
      opacity.setValue(0);
    }
  }, [visible]);

  function dismiss() {
    Animated.parallel([
      Animated.timing(translateY, { toValue: -40, duration: dur[1], easing: Easing.bezier(0.4, 0, 1, 1), useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: dur[1], easing: Easing.bezier(0.4, 0, 1, 1), useNativeDriver: true }),
    ]).start(() => onDismiss());
  }

  if (!visible && !shown.current) return null;

  const bgMap: Record<Variant, string> = {
    info: theme.bgOverlay,
    success: theme.accentSoft,
    warn: theme.signalSoft,
    danger: theme.dangerSoft,
  };

  return (
    <Animated.View style={{
      position: 'absolute',
      top: sp[10],
      left: sp[4],
      right: sp[4],
      backgroundColor: bgMap[variant],
      borderRadius: r[2],
      padding: sp[4],
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
      zIndex: 999,
      transform: [{ translateY }],
      opacity,
    }}>
      <Pressable onPress={dismiss}>
        <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fg }}>{message}</Text>
      </Pressable>
    </Animated.View>
  );
}
