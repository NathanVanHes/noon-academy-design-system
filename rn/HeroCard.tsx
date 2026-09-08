/**
 * HeroCard — large emphasis block for landing pages (Today, dashboards).
 *
 * Mono uppercase kicker, serif title, then supporting copy. Four tones:
 * terra and teal are the spotlight surfaces, raised is the everyday card,
 * sunken sits a step below the ground for quieter stats.
 *
 * <HeroCard kicker="Next up" title="Physics Live" subtitle="Mr. Omar · 4:00 PM" tone="terra" onPress={...} />
 */
import React from 'react';
import { Text, Pressable, View, type ViewStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font, color } from './tokens';

interface HeroCardProps {
  title: string;
  kicker?: string;
  subtitle?: string;
  meta?: string;
  tone?: 'terra' | 'teal' | 'raised' | 'sunken';
  /** 'auto' = full width of parent (default), 'fill' = share row space equally, 'hug' = shrink to content */
  sizing?: 'auto' | 'fill' | 'hug';
  onPress?: () => void;
  style?: ViewStyle;
}

export function HeroCard({ title, kicker, subtitle, meta, tone = 'raised', sizing = 'auto', onPress, style }: HeroCardProps) {
  const { theme, mode } = useTheme();

  const surface = {
    terra: {
      // Hero fills use the clay ramp, not the Heat signal — cream stays AA on the deep clay.
      bg: mode === 'void' ? theme.terra : color.clay[400],
      fg: mode === 'void' ? theme.accentFg : theme.fgInverse,
      border: 'rgba(0,0,0,0.08)',
    },
    // Teal = Future teal (theme.intel), the brand's intelligent layer — not noon green.
    teal: {
      bg: theme.intel,
      fg: mode === 'void' ? theme.accentFg : theme.fgInverse, // mid teal on ink → ink text; deep teal on fog → cream
      border: 'rgba(0,0,0,0.08)',
    },
    raised: { bg: theme.bgRaised, fg: theme.fg, border: theme.border },
    sunken: { bg: theme.bgSunken, fg: theme.fg, border: theme.border },
  }[tone];
  const muted = tone === 'raised' || tone === 'sunken';

  const body = (
    <>
      {kicker && (
        <Text style={{ fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], letterSpacing: 1, textTransform: 'uppercase', color: surface.fg, opacity: muted ? 0.55 : 0.75 }}>
          {kicker}
        </Text>
      )}
      <Text style={{ fontFamily: font.serif, fontSize: fs[22], fontWeight: fw[600], color: surface.fg, marginTop: kicker ? sp[2] : 0 }} numberOfLines={2}>
        {title}
      </Text>
      {subtitle && (
        <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: muted ? theme.fgMuted : surface.fg, opacity: muted ? 1 : 0.85, marginTop: sp[1] }} numberOfLines={2}>
          {subtitle}
        </Text>
      )}
      {meta && (
        <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: muted ? theme.fgFaint : surface.fg, opacity: muted ? 1 : 0.7, marginTop: 'auto', paddingTop: sp[3] }}>
          {meta}
        </Text>
      )}
    </>
  );

  const containerStyle: ViewStyle = {
    backgroundColor: surface.bg,
    borderRadius: r[3],
    borderWidth: 1,
    borderColor: surface.border,
    padding: sp[5],
    minHeight: 140,
    ...(sizing === 'fill' ? { flex: 1 } : sizing === 'hug' ? { alignSelf: 'flex-start' as const } : null),
    ...style,
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={title}
        style={({ pressed }) => [containerStyle, pressed && { borderColor: theme.borderStrong }]}
      >
        {body}
      </Pressable>
    );
  }
  return <View style={containerStyle}>{body}</View>;
}
