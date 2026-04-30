/**
 * VoiceTutor — AI conversational guide presence indicator.
 * Simple: one aura circle + one core circle per state. Matches index.html exactly.
 */
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  Easing,
  interpolate,
  cancelAnimation,
} from 'react-native-reanimated';
import { useTheme } from './ThemeContext';
import { sp, fs, fw, font, color } from './tokens';

type VoiceTutorState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';

interface VoiceTutorProps {
  state?: VoiceTutorState;
  size?: number;
}

// IRIS resolved per-theme in the component body

export function VoiceTutor({ state = 'idle', size = 160 }: VoiceTutorProps) {
  const { theme } = useTheme();
  const anim = useSharedValue(0);
  const orbit = useSharedValue(0);
  const errorAura = useSharedValue(0);

  useEffect(() => {
    // Reset values
    cancelAnimation(anim);
    cancelAnimation(orbit);
    cancelAnimation(errorAura);
    anim.value = 0;
    orbit.value = 0;
    errorAura.value = 0;

    if (state === 'idle') {
      anim.value = withRepeat(
        withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.sin) }),
        -1
      );
    } else if (state === 'listening') {
      anim.value = withRepeat(
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.sin) }),
        -1
      );
    } else if (state === 'thinking') {
      anim.value = withRepeat(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
        -1
      );
      orbit.value = withRepeat(
        withTiming(1, { duration: 2000, easing: Easing.linear }),
        -1
      );
    } else if (state === 'speaking') {
      anim.value = withRepeat(
        withTiming(1, { duration: 400, easing: Easing.inOut(Easing.sin) }),
        -1
      );
    } else if (state === 'error') {
      // Core flickers on loop
      anim.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 100 }),
          withTiming(0, { duration: 100 }),
          withTiming(0.7, { duration: 80 }),
          withTiming(0, { duration: 200 }),
          withDelay(1500, withTiming(0, { duration: 0 })),
        ),
        -1
      );
      // Aura: flicker then disappear (plays once)
      errorAura.value = withSequence(
        withTiming(1, { duration: 80 }),
        withTiming(0.5, { duration: 60 }),
        withTiming(0.8, { duration: 80 }),
        withTiming(0, { duration: 300, easing: Easing.bezier(0.4, 0, 1, 1) }),
      );
    }

    return () => {
      cancelAnimation(anim);
      cancelAnimation(orbit);
      cancelAnimation(errorAura);
    };
  }, [state]);

  const isError = state === 'error';

  const core = { idle: 32, listening: 44, thinking: 24, speaking: 44, error: 22 }[state];

  // Aura: none for idle, grows for listening/speaking, small for thinking, collapses for error
  const auraBase = { idle: 0, listening: 80, thinking: 50, speaking: 90, error: 50 }[state];

  const coreAnimStyle = useAnimatedStyle(() => {
    const coreScale = state === 'listening'
      ? interpolate(anim.value, [0, 0.5, 1], [0.9, 1.12, 0.9])
      : state === 'speaking'
      ? interpolate(anim.value, [0, 0.5, 1], [0.94, 1.06, 0.94])
      : state === 'thinking'
      ? interpolate(anim.value, [0, 0.5, 1], [0.96, 1.04, 0.96])
      : interpolate(anim.value, [0, 0.5, 1], [0.92, 1.08, 0.92]); // idle: slow visible breathe

    const errorFlash = interpolate(anim.value, [0, 1], [1, 0.4]);

    return {
      transform: [{ scale: coreScale }],
      opacity: isError ? errorFlash : 1,
    };
  });

  const auraAnimStyle = useAnimatedStyle(() => {
    const auraScale = state === 'listening'
      ? interpolate(anim.value, [0, 0.5, 1], [0.85, 1.15, 0.85])
      : state === 'speaking'
      ? interpolate(anim.value, [0, 0.5, 1], [0.9, 1.1, 0.9])
      : interpolate(anim.value, [0, 0.5, 1], [0.95, 1.05, 0.95]);

    return {
      transform: [{ scale: isError ? 1 : auraScale }],
      opacity: isError ? errorAura.value : 1,
    };
  });

  const orbitAnimStyle = useAnimatedStyle(() => {
    const rotate = interpolate(orbit.value, [0, 1], [0, 360]);
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  const coreColor = isError ? color.danger[300] : theme.iris;
  const auraColor = isError ? 'rgba(249,176,138,0.12)' : theme.irisSoft;

  return (
    <View style={{ alignItems: 'center' }}>
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* Aura — only visible for listening, speaking, thinking, error */}
      {auraBase > 0 && (
        <Animated.View style={[{
          position: 'absolute',
          width: auraBase, height: auraBase, borderRadius: auraBase / 2,
          backgroundColor: auraColor,
        }, auraAnimStyle]} />
      )}

      {/* Thinking: orbiting dots */}
      {state === 'thinking' && (
        <Animated.View style={[{ position: 'absolute', width: 70, height: 70 }, orbitAnimStyle]}>
          <View style={{ position: 'absolute', top: 0, left: 32, width: 5, height: 5, borderRadius: 2.5, backgroundColor: theme.irisDot }} />
          <View style={{ position: 'absolute', bottom: 0, left: 32, width: 4, height: 4, borderRadius: 2, backgroundColor: theme.irisBorder }} />
          <View style={{ position: 'absolute', top: 32, right: 0, width: 3, height: 3, borderRadius: 1.5, backgroundColor: theme.irisBorder }} />
        </Animated.View>
      )}

      {/* Core */}
      <Animated.View style={[{
        width: core, height: core, borderRadius: core / 2,
        backgroundColor: coreColor,
        shadowColor: coreColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: state === 'speaking' ? 0.6 : state === 'listening' ? 0.4 : 0.2,
        shadowRadius: state === 'speaking' ? 30 : state === 'listening' ? 20 : 12,
        elevation: 6,
      }, coreAnimStyle]} />

    </View>
      {/* State label — outside the aura container */}
      <Text style={{
        marginTop: sp[3],
        fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600],
        letterSpacing: 2, textTransform: 'uppercase',
        color: isError ? color.danger[300] : theme.iris,
      }}>{state}</Text>
    </View>
  );
}
