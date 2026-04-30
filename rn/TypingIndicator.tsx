/**
 * TypingIndicator — three bouncing dots for thinking/typing state.
 * Used in voice tutor chat when the tutor is processing.
 */
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, withDelay, cancelAnimation, Easing } from 'react-native-reanimated';
import { useTheme } from './ThemeContext';
import { sp, r, dur } from './tokens';

const DOT_SIZE = sp[1];
const DOT_BOUNCE = -sp[1];
const DOT_DURATION = 300;
const DOT_STAGGER = 150;

function Dot({ index }: { index: number }) {
  const { theme } = useTheme();
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      index * DOT_STAGGER,
      withRepeat(
        withSequence(
          withTiming(DOT_BOUNCE, { duration: DOT_DURATION, easing: Easing.inOut(Easing.sin) }),
          withTiming(0, { duration: DOT_DURATION, easing: Easing.inOut(Easing.sin) }),
          withDelay((2 - index) * DOT_STAGGER, withTiming(0, { duration: 0 })),
        ),
        -1,
      ),
    );
    return () => cancelAnimation(translateY);
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[{
      width: DOT_SIZE,
      height: DOT_SIZE,
      borderRadius: DOT_SIZE / 2,
      backgroundColor: theme.irisDot,
    }, animStyle]} />
  );
}

export function TypingIndicator() {
  return (
    <View style={{ flexDirection: 'row', gap: sp[1], paddingVertical: sp[1], alignSelf: 'flex-start' }}>
      <Dot index={0} />
      <Dot index={1} />
      <Dot index={2} />
    </View>
  );
}
