/**
 * Skeleton — loading placeholder with shimmer.
 */
import React, { useEffect } from 'react';
import { type ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, cancelAnimation } from 'react-native-reanimated';
import { useTheme } from './ThemeContext';
import { r, sp } from './tokens';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  circle?: boolean;
  style?: ViewStyle;
}

export function Skeleton({ width = '100%', height = sp[4], circle, style }: SkeletonProps) {
  const { theme } = useTheme();
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 800 }),
        withTiming(0.3, { duration: 800 }),
      ),
      -1,
    );
    return () => cancelAnimation(opacity);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const dim = circle ? (typeof height === 'number' ? height : 40) : undefined;

  return (
    <Animated.View
      style={[
        {
          width: circle ? dim : width,
          height: circle ? dim : height,
          borderRadius: circle ? (dim! / 2) : r[2],
          backgroundColor: theme.border,
        } as any,
        animatedStyle,
        style,
      ]}
    />
  );
}
