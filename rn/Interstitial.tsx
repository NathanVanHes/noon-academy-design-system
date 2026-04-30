/**
 * Interstitial — full-screen mastery celebration.
 * Title, description, button. Confetti rains over everything.
 */
import React, { useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, withRepeat, withSequence, cancelAnimation } from 'react-native-reanimated';
import { useTheme } from './ThemeContext';
import { Button } from './Button';
import { sp, fs, fw, font, r, color } from './tokens';

interface InterstitialProps {
  title: string;
  body: string;
  buttonLabel: string;
  onPress: () => void;
}

const CONFETTI_COLORS = [color.noon[400], color.gold[200], color.gold[400], color.noon[200], color.chalk[100]];
const PARTICLE_COUNT = 80;

function ConfettiParticle({ delay, color: c }: { delay: number; color: string }) {
  const left = useRef(Math.random() * 100).current;
  const size = useRef(3 + Math.random() * 5).current;
  const isRect = useRef(Math.random() > 0.5).current;
  const duration = useRef(1500 + Math.random() * 1500).current;

  const translateY = useSharedValue(-10);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateY.value = withDelay(delay, withTiming(700, { duration }));
    opacity.value = withDelay(delay + duration * 0.5, withTiming(0, { duration: duration * 0.5 }));
    return () => {
      cancelAnimation(translateY);
      cancelAnimation(opacity);
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[{
        position: 'absolute',
        left: `${left}%`,
        top: -10,
        width: size,
        height: isRect ? size * 0.4 : size,
        borderRadius: isRect ? 1 : size / 2,
        backgroundColor: c,
      }, animatedStyle]}
    />
  );
}

export function Interstitial({ title, body, buttonLabel, onPress }: InterstitialProps) {
  const { theme } = useTheme();
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.06, { duration: 1000 }),
        withTiming(1, { duration: 1000 }),
      ),
      -1,
    );
    return () => cancelAnimation(pulseScale);
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => (
    <ConfettiParticle key={i} delay={Math.random() * 3000} color={CONFETTI_COLORS[i % CONFETTI_COLORS.length]} />
  ));

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, alignItems: 'center', justifyContent: 'center', padding: sp[6] }}>
      {/* Confetti layer */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', zIndex: 1 }} pointerEvents="none">
        {particles}
      </View>

      <View style={{ flex: 1 }} />

      {/* Star */}
      <Animated.View style={[{
        width: 120, height: 120, borderRadius: 60,
        backgroundColor: theme.accentSoft,
        alignItems: 'center', justifyContent: 'center',
        marginBottom: sp[6],
        zIndex: 2,
      }, pulseStyle]}>
        <Text style={{ fontSize: fs[48] }}>★</Text>
      </Animated.View>

      {/* Copy */}
      <Text style={{ fontFamily: font.serif, fontSize: fs[32], fontWeight: fw[500], color: theme.fg, textAlign: 'center', marginBottom: sp[3], zIndex: 2 }}>{title}</Text>
      <Text style={{ fontFamily: font.sans, fontSize: fs[15], color: theme.fgSubtle, textAlign: 'center', maxWidth: 280, lineHeight: fs[15] * 1.5, zIndex: 2 }}>{body}</Text>

      <View style={{ flex: 1 }} />

      {/* CTA */}
      <View style={{ width: '100%', maxWidth: 280, zIndex: 2, paddingBottom: sp[6] }}>
        <Button variant="primary" fullWidth onPress={onPress}>{buttonLabel}</Button>
      </View>
    </View>
  );
}
