/**
 * Interstitial — full-screen mastery celebration.
 * Image, title, description, button. Confetti rains over everything.
 */
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { Button } from './Button';
import { sp, fs, fw, font, r, color } from './tokens';

interface InterstitialProps {
  title: string;
  body: string;
  buttonLabel: string;
  onPress: () => void;
}

const CONFETTI_COLORS = [color.noon[400], color.gold[200], color.gold[400], color.noon[200], '#fff'];
const PARTICLE_COUNT = 80;

function ConfettiParticle({ delay, color: c }: { delay: number; color: string }) {
  const translateY = useRef(new Animated.Value(-10)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const left = useRef(Math.random() * 100).current;
  const size = useRef(3 + Math.random() * 5).current;
  const isRect = useRef(Math.random() > 0.5).current;

  useEffect(() => {
    const duration = 1500 + Math.random() * 1500;
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(translateY, { toValue: 700, duration, useNativeDriver: true }),
        Animated.sequence([
          Animated.delay(duration * 0.5),
          Animated.timing(opacity, { toValue: 0, duration: duration * 0.5, useNativeDriver: true }),
        ]),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: -10,
        width: size,
        height: isRect ? size * 0.4 : size,
        borderRadius: isRect ? 1 : size / 2,
        backgroundColor: c,
        opacity,
        transform: [{ translateY }],
      }}
    />
  );
}

export function Interstitial({ title, body, buttonLabel, onPress }: InterstitialProps) {
  const { theme } = useTheme();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.06, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

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
      <Animated.View style={{
        width: 120, height: 120, borderRadius: 60,
        backgroundColor: theme.accentSoft,
        alignItems: 'center', justifyContent: 'center',
        marginBottom: sp[6],
        transform: [{ scale: pulseAnim }],
        zIndex: 2,
      }}>
        <Text style={{ fontSize: 56 }}>★</Text>
      </Animated.View>

      {/* Copy */}
      <Text style={{ fontFamily: font.serif, fontSize: fs[32], fontWeight: fw[500], color: theme.fg, textAlign: 'center', marginBottom: sp[3], zIndex: 2 }}>{title}</Text>
      <Text style={{ fontFamily: font.sans, fontSize: fs[15], color: theme.fgSubtle, textAlign: 'center', maxWidth: 280, lineHeight: fs[15] * 1.5, zIndex: 2 }}>{body}</Text>

      <View style={{ flex: 1 }} />

      {/* CTA */}
      <View style={{ width: '100%', maxWidth: 280, zIndex: 2, paddingBottom: sp[6] }}>
        <Button variant="primary" block onPress={onPress}>{buttonLabel}</Button>
      </View>
    </View>
  );
}
