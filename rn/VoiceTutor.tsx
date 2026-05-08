/**
 * VoiceTutor — AI conversational guide presence indicator.
 * Uses React Native's built-in Animated API for cross-platform compatibility.
 */
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, fs, fw, font, color } from './tokens';

type VoiceTutorState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';

interface VoiceTutorProps {
  state?: VoiceTutorState;
  size?: number;
}

export function VoiceTutor({ state = 'idle', size = 160 }: VoiceTutorProps) {
  const { theme } = useTheme();
  const anim = useRef(new Animated.Value(0)).current;
  const orbit = useRef(new Animated.Value(0)).current;
  const errorAura = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    anim.stopAnimation();
    orbit.stopAnimation();
    errorAura.stopAnimation();
    anim.setValue(0);
    orbit.setValue(0);
    errorAura.setValue(0);

    let animation: Animated.CompositeAnimation;

    if (state === 'idle') {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: 1, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      );
      animation.start();
    } else if (state === 'listening') {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      );
      animation.start();
    } else if (state === 'thinking') {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: 1, duration: 1000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0, duration: 1000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      );
      animation.start();
      Animated.loop(
        Animated.timing(orbit, { toValue: 1, duration: 2000, easing: Easing.linear, useNativeDriver: true })
      ).start();
    } else if (state === 'speaking') {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: 1, duration: 200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0, duration: 200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      );
      animation.start();
    } else if (state === 'error') {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: 1, duration: 100, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0, duration: 100, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0.7, duration: 80, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0, duration: 200, useNativeDriver: true }),
          Animated.delay(1500),
        ])
      );
      animation.start();
      Animated.sequence([
        Animated.timing(errorAura, { toValue: 1, duration: 80, useNativeDriver: true }),
        Animated.timing(errorAura, { toValue: 0.5, duration: 60, useNativeDriver: true }),
        Animated.timing(errorAura, { toValue: 0.8, duration: 80, useNativeDriver: true }),
        Animated.timing(errorAura, { toValue: 0, duration: 300, easing: Easing.bezier(0.4, 0, 1, 1), useNativeDriver: true }),
      ]).start();
    }

    return () => {
      anim.stopAnimation();
      orbit.stopAnimation();
      errorAura.stopAnimation();
    };
  }, [state]);

  const isError = state === 'error';
  const core = { idle: 32, listening: 44, thinking: 24, speaking: 44, error: 22 }[state]!;
  const auraBase = { idle: 0, listening: 80, thinking: 50, speaking: 90, error: 50 }[state]!;
  const coreColor = isError ? color.danger[300] : theme.iris;
  const auraColor = isError ? 'rgba(249,176,138,0.12)' : theme.irisSoft;

  const coreScale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: state === 'listening' ? [0.9, 1.12]
      : state === 'speaking' ? [0.94, 1.06]
      : state === 'thinking' ? [0.96, 1.04]
      : [0.92, 1.08],
  });

  const coreOpacity = isError
    ? anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.4] })
    : 1;

  const auraScale = isError ? 1 : anim.interpolate({
    inputRange: [0, 1],
    outputRange: state === 'listening' ? [0.85, 1.15]
      : state === 'speaking' ? [0.9, 1.1]
      : [0.95, 1.05],
  });

  const auraOpacity = isError ? errorAura : 1;

  const orbitRotate = orbit.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        {auraBase > 0 && (
          <Animated.View style={{
            position: 'absolute',
            width: auraBase, height: auraBase, borderRadius: auraBase / 2,
            backgroundColor: auraColor,
            transform: [{ scale: auraScale as any }],
            opacity: auraOpacity as any,
          }} />
        )}

        {state === 'thinking' && (
          <Animated.View style={{ position: 'absolute', width: 70, height: 70, transform: [{ rotate: orbitRotate }] }}>
            <View style={{ position: 'absolute', top: 0, left: 32, width: 5, height: 5, borderRadius: 2.5, backgroundColor: theme.irisDot }} />
            <View style={{ position: 'absolute', bottom: 0, left: 32, width: 4, height: 4, borderRadius: 2, backgroundColor: theme.irisBorder }} />
            <View style={{ position: 'absolute', top: 32, right: 0, width: 3, height: 3, borderRadius: 1.5, backgroundColor: theme.irisBorder }} />
          </Animated.View>
        )}

        <Animated.View style={{
          width: core, height: core, borderRadius: core / 2,
          backgroundColor: coreColor,
          shadowColor: coreColor,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: state === 'speaking' ? 0.6 : state === 'listening' ? 0.4 : 0.2,
          shadowRadius: state === 'speaking' ? 30 : state === 'listening' ? 20 : 12,
          elevation: 6,
          transform: [{ scale: coreScale }],
          opacity: coreOpacity as any,
        }} />
      </View>

      <Text style={{
        marginTop: sp[3],
        fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600],
        letterSpacing: 2, textTransform: 'uppercase',
        color: isError ? color.danger[300] : theme.iris,
      }}>{state}</Text>
    </View>
  );
}
