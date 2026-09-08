/**
 * StatCard — one number that matters: readiness %, minutes learned, rank.
 *
 * Serif value, mono label. Delta colours: up = accent text, down = terra.
 * For big landing blocks use HeroCard; this is the dense dashboard tile.
 */
import React from 'react';
import { View, Text, Pressable, type ViewStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font } from './tokens';

interface StatCardProps {
  label: string;
  value: string;
  /** Small unit after the value, e.g. "%", "min" */
  unit?: string;
  /** e.g. "+4% this week" */
  delta?: string;
  deltaDirection?: 'up' | 'down' | 'flat';
  meta?: string;
  /** 'auto' = full width of parent (default), 'fill' = share row space equally, 'hug' = shrink to content */
  sizing?: 'auto' | 'fill' | 'hug';
  onPress?: () => void;
  style?: ViewStyle;
}

export function StatCard({ label, value, unit, delta, deltaDirection = 'flat', meta, sizing = 'auto', onPress, style }: StatCardProps) {
  const { theme } = useTheme();
  const deltaColor = deltaDirection === 'up' ? theme.accentText : deltaDirection === 'down' ? theme.terra : theme.fgMuted;
  const arrow = deltaDirection === 'up' ? '↑ ' : deltaDirection === 'down' ? '↓ ' : '';

  const body = (
    <>
      <Text style={{ fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], letterSpacing: 1, textTransform: 'uppercase', color: theme.fgFaint }}>
        {label}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: sp[1], marginTop: sp[2] }}>
        <Text style={{ fontFamily: font.serif, fontSize: fs[32], fontWeight: fw[600], color: theme.fg }}>{value}</Text>
        {unit ? <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fgMuted }}>{unit}</Text> : null}
      </View>
      {delta ? (
        <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: deltaColor, marginTop: sp[1] }}>{arrow}{delta}</Text>
      ) : null}
      {meta ? (
        <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, marginTop: sp[2] }}>{meta}</Text>
      ) : null}
    </>
  );

  const base: ViewStyle = {
    backgroundColor: theme.bgRaised, borderWidth: 1, borderColor: theme.border,
    borderRadius: r[3], padding: sp[4],
    ...(sizing === 'fill' ? { flex: 1 } : sizing === 'hug' ? { alignSelf: 'flex-start' as const } : null),
  };

  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="button"
        style={({ pressed }) => [base, pressed && { backgroundColor: theme.hoverOverlay }, style]}>
        {body}
      </Pressable>
    );
  }
  return <View style={[base, style]}>{body}</View>;
}
