/**
 * Oasis — circular water pool checkpoint with palm frond detail.
 * Water level = readiness/mastery. Border signals chapter status.
 * Uses system colour roles: accent (green) for strong, terra for weak, fgFaint for future.
 * Gold is NOT used here — gold is journey signal only (waypoints, path).
 */
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font, color } from './tokens';

type OasisStatus = 'complete' | 'strong' | 'weak' | 'current' | 'upcoming' | 'locked';

interface OasisProps {
  level: number;
  status?: OasisStatus;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  meta?: string;
}

const SIZES = { sm: 36, md: 48, lg: 64 };

function borderColor(status: OasisStatus, theme: any): string {
  switch (status) {
    case 'complete': return color.noon[400];
    case 'strong': return color.noon[400];
    case 'weak': return color.terra[400];
    case 'current': return theme.accent;
    case 'upcoming': return theme.fgFaint;
    case 'locked': return theme.border;
  }
}

export function Oasis({ level, status = 'upcoming', label, size = 'md', meta }: OasisProps) {
  const { theme } = useTheme();
  const dim = SIZES[size];
  const isCurrent = status === 'current';
  const isDashed = status === 'upcoming' || status === 'locked';
  const isPast = status === 'complete' || status === 'strong' || status === 'weak';
  const border = borderColor(status, theme);
  const clampedLevel = Math.max(0, Math.min(100, level));

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{
          width: dim, height: dim, borderRadius: dim / 2,
          borderWidth: isCurrent ? 2 : 1.5,
          borderColor: border,
          borderStyle: isDashed ? 'dashed' : 'solid',
          overflow: 'hidden',
          backgroundColor: theme.bg,
          ...(isCurrent ? {
            shadowColor: theme.accent,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 6,
          } : {}),
        }}>
          {/* Water */}
          {clampedLevel > 0 && (
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${clampedLevel}%` }}>
              <View style={{ flex: 1, backgroundColor: color.blue[400], opacity: 0.35 }} />
              <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, backgroundColor: color.chalk[100], opacity: 0.2 }} />
            </View>
          )}
          {/* Label */}
          {label && (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{
                fontFamily: font.mono,
                fontSize: size === 'lg' ? fs[16] : size === 'md' ? fs[13] : fs[11],
                fontWeight: fw[700],
                color: isCurrent ? theme.accent : isPast ? theme.fg : theme.fgFaint,
              }}>{label}</Text>
            </View>
          )}
        </View>

      {/* Readiness */}
      <View style={{ marginTop: sp[1], paddingHorizontal: sp[2], paddingVertical: 1, borderRadius: r[1], backgroundColor: theme.bgRaised }}>
        <Text style={{
          fontFamily: font.mono, fontSize: fs[9], fontWeight: fw[600],
          color: clampedLevel >= 90 ? theme.accent : clampedLevel > 0 ? theme.fgMuted : theme.fgFaint,
        }}>{clampedLevel >= 90 ? 'FULL' : clampedLevel === 0 ? 'EMPTY' : `${clampedLevel}%`}</Text>
      </View>

      {/* Meta — date or result */}
      {meta && (
        <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: isCurrent ? theme.accent : isPast ? theme.fgMuted : theme.fgFaint, marginTop: sp[0.5] }}>{meta}</Text>
      )}
    </View>
  );
}
