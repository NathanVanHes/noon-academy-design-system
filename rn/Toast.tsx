/**
 * Toast — temporary notification that auto-dismisses.
 * Slides in from top with 200ms ease, fades out with 120ms ease-in.
 */
import React, { useEffect, useRef, useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS } from 'react-native-reanimated';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { useTheme } from './ThemeContext';
import { Icon, type IconName } from './Icon';
import { sp, r, fs, font, dur, color, icon as iconTokens } from './tokens';

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
  const insets = React.useContext(SafeAreaInsetsContext) || { top: 0 };
  const translateY = useSharedValue(-40);
  const opacity = useSharedValue(0);
  const shown = useRef(false);

  const dismiss = useCallback(() => {
    const config = { duration: dur[1], easing: Easing.bezier(0.4, 0, 1, 1) };
    translateY.value = withTiming(-40, config);
    opacity.value = withTiming(0, config, () => {
      runOnJS(onDismiss)();
    });
  }, [onDismiss]);

  useEffect(() => {
    if (visible && !shown.current) {
      shown.current = true;
      const config = { duration: dur[2], easing: Easing.bezier(0.22, 0.61, 0.36, 1) };
      translateY.value = withTiming(0, config);
      opacity.value = withTiming(1, config);
      const timer = setTimeout(() => dismiss(), duration);
      return () => clearTimeout(timer);
    }
    if (!visible && shown.current) {
      shown.current = false;
      translateY.value = -40;
      opacity.value = 0;
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  if (!visible && !shown.current) return null;

  // Solid bg — matches Alert styling exactly
  const styles: Record<Variant, { bg: string; border: string; iconCol: string }> = {
    info: { bg: theme.bgRaised, border: theme.borderStrong, iconCol: theme.fgMuted },
    success: { bg: theme.bgRaised, border: theme.accentBorder, iconCol: color.noon[400] },
    warn: { bg: theme.bgRaised, border: theme.signalBorder, iconCol: color.gold[300] },
    danger: { bg: theme.bgRaised, border: theme.dangerBorder, iconCol: color.danger[400] },
  };
  const s = styles[variant];

  const iconMap: Record<Variant, IconName> = { info: 'info', success: 'check', warn: 'warning', danger: 'error' };

  return (
    <Animated.View accessibilityRole="alert" accessibilityLiveRegion="polite" style={[{
      position: 'absolute',
      top: insets.top + sp[4],
      left: sp[4],
      right: sp[4],
      backgroundColor: s.bg,
      borderRadius: r[2],
      borderWidth: 1,
      borderColor: s.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
      zIndex: 999,
    }, animatedStyle]}>
      <Pressable onPress={dismiss} accessibilityRole="button" accessibilityLabel="Dismiss"
        style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3], padding: sp[4] }}>
        <Icon name={iconMap[variant]} size={iconTokens.lg} color={s.iconCol} />
        <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fg, flex: 1 }}>{message}</Text>
      </Pressable>
    </Animated.View>
  );
}
