/**
 * Skeleton — loading placeholder with shimmer.
 */
import React, { useEffect, useRef } from 'react';
import { View, Animated, type ViewStyle } from 'react-native';
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
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.6, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, []);

  const dim = circle ? (typeof height === 'number' ? height : 40) : undefined;

  return (
    <Animated.View
      style={[
        {
          width: circle ? dim : width,
          height: circle ? dim : height,
          borderRadius: circle ? (dim! / 2) : r[2],
          backgroundColor: theme.border,
          opacity,
        },
        style,
      ]}
    />
  );
}
