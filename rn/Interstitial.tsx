/**
 * Interstitial — full-screen celebration / transition screen.
 *
 * Variants:
 *   mastery  — spinning gold star + confetti (topic mastered)
 *   exam     — Oasis diamond xl with score (exam result)
 *   progress — Waypoints row showing partial journey (making progress)
 *   complete — Waypoints row all done, arrived state (journey complete)
 */
import React, { useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle,
  withTiming, withDelay, withRepeat, withSequence, withSpring,
  cancelAnimation, Easing,
} from 'react-native-reanimated';
import { useTheme } from './ThemeContext';
import { Button } from './Button';
import { Waypoints } from './Waypoints';
import { sp, fs, fw, font, r, color } from './tokens';

type InterstitialVariant = 'mastery' | 'exam' | 'progress' | 'complete';

interface InterstitialProps {
  title: string;
  body: string;
  buttonLabel: string;
  onPress: () => void;
  /** Built-in hero graphic variant */
  variant?: InterstitialVariant;
  /** Exam score for 'exam' variant (0-100) */
  score?: number;
  /** Custom hero element — overrides variant when provided (image, animation, etc.) */
  hero?: React.ReactNode;
  /** Show confetti */
  confetti?: boolean;
}

const CONFETTI_COLORS = [color.noon[400], color.gold[200], color.gold[400], color.noon[200], color.chalk[100]];

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
    return () => { cancelAnimation(translateY); cancelAnimation(opacity); };
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[{
      position: 'absolute', left: `${left}%`, top: -10,
      width: size, height: isRect ? size * 0.4 : size,
      borderRadius: isRect ? 1 : size / 2, backgroundColor: c,
    }, style]} />
  );
}

/** Mastery — gold star, eases in with subtle rotation */
function MasteryHero() {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 400 });
    rotation.value = withTiming(360, { duration: 600, easing: Easing.out(Easing.cubic) });
    scale.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.cubic) });
    const timeout = setTimeout(() => {
      scale.value = withRepeat(withSequence(
        withTiming(1.03, { duration: 1500 }),
        withTiming(1, { duration: 1500 }),
      ), -1);
    }, 700);
    return () => { cancelAnimation(rotation); cancelAnimation(scale); cancelAnimation(opacity); clearTimeout(timeout); };
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
  }));

  return (
    <Animated.View style={[{ marginBottom: sp[6], zIndex: 2 }, style]}>
      <Text style={{ fontSize: 72, color: color.gold[300] }}>{'★'}</Text>
    </Animated.View>
  );
}

/** Exam — diamond with water that fills up to the score */
function ExamHero({ score }: { score: number }) {
  const dim = 72; // xl size
  const scale = useSharedValue(0.85);
  const opacity = useSharedValue(0);
  const waterPct = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
    scale.value = withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) });
    // Water fills up after a short delay
    waterPct.value = withDelay(400, withTiming(score, { duration: 1200, easing: Easing.out(Easing.cubic) }));
    return () => { cancelAnimation(scale); cancelAnimation(opacity); cancelAnimation(waterPct); };
  }, []);

  const containerStyle = useAnimatedStyle(() => ({ opacity: opacity.value, transform: [{ scale: scale.value }] }));
  const waterStyle = useAnimatedStyle(() => ({ height: `${waterPct.value}%` }));

  return (
    <Animated.View style={[{ marginBottom: sp[6], zIndex: 2, alignItems: 'center' }, containerStyle]}>
      <View style={{
        width: dim, height: dim, transform: [{ rotate: '45deg' }],
        borderWidth: 2, borderColor: color.noon[400], borderRadius: r[2],
        backgroundColor: color.void[300], overflow: 'hidden',
        shadowColor: color.noon[400], shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.25, shadowRadius: 12,
      }}>
        {/* Water — counter-rotated, animates up */}
        <View style={{ position: 'absolute', top: -(dim * 0.25), left: -(dim * 0.25), width: dim * 1.5, height: dim * 1.5, transform: [{ rotate: '-45deg' }], justifyContent: 'flex-end' }}>
          <Animated.View style={[{ backgroundColor: color.blue[400], opacity: 0.3 }, waterStyle]} />
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ transform: [{ rotate: '-45deg' }], fontFamily: font.mono, fontSize: fs[18], fontWeight: fw[700], color: color.noon[400] }}>{score}%</Text>
        </View>
      </View>
    </Animated.View>
  );
}

/** Progress — Waypoints row partway through, no labels */
function ProgressHero() {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(12);
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) });
    translateY.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.cubic) });
    return () => { cancelAnimation(opacity); cancelAnimation(translateY); };
  }, []);
  const style = useAnimatedStyle(() => ({ opacity: opacity.value, transform: [{ translateY: translateY.value }] }));

  return (
    <Animated.View style={[{ marginBottom: sp[6], zIndex: 2, width: 220 }, style]}>
      <Waypoints steps={['done', 'done', 'done', 'current', 'incomplete']} />
    </Animated.View>
  );
}

/** Complete — all arrived, no labels */
function CompleteHero() {
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 400 });
    scale.value = withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) });
    return () => { cancelAnimation(scale); cancelAnimation(opacity); };
  }, []);
  const style = useAnimatedStyle(() => ({ opacity: opacity.value, transform: [{ scale: scale.value }] }));

  return (
    <Animated.View style={[{ marginBottom: sp[6], zIndex: 2, width: 220 }, style]}>
      <Waypoints steps={['done', 'done', 'done', 'done', 'arrived']} />
    </Animated.View>
  );
}

export function Interstitial({ title, body, buttonLabel, onPress, variant = 'mastery', score = 91, hero, confetti: confettiProp }: InterstitialProps) {
  const { theme } = useTheme();
  const showConfetti = confettiProp ?? (variant === 'mastery' || variant === 'complete');

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, alignItems: 'center', justifyContent: 'center', padding: sp[6] }}>
      {/* Confetti — only on mastery and complete */}
      {showConfetti && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', zIndex: 1 }} pointerEvents="none">
          {Array.from({ length: 60 }, (_, i) => (
            <ConfettiParticle key={i} delay={Math.random() * 2500} color={CONFETTI_COLORS[i % CONFETTI_COLORS.length]} />
          ))}
        </View>
      )}

      <View style={{ flex: 1 }} />

      {/* Hero graphic — custom or built-in variant */}
      {hero ? (
        <View style={{ marginBottom: sp[6], zIndex: 2 }}>{hero}</View>
      ) : (
        <>
          {variant === 'mastery' && <MasteryHero />}
          {variant === 'exam' && <ExamHero score={score} />}
          {variant === 'progress' && <ProgressHero />}
          {variant === 'complete' && <CompleteHero />}
        </>
      )}

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
