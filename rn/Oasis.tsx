/**
 * Oasis — major milestone diamond with water fill.
 *
 * A larger diamond waypoint that fills with water from bottom to top.
 * Border color signals status (green/terra/gold/grey).
 * Shows a label inside (percentage or dash). Water level is independent.
 *
 * Use alongside WaypointMarker (small topic-level diamonds) — Oasis is the
 * chapter/exam-level checkpoint.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font, color } from './tokens';

type OasisStatus = 'complete' | 'strong' | 'weak' | 'current' | 'upcoming' | 'locked';

interface OasisProps {
  /** Water level 0–100 */
  level: number;
  /** Border color intent */
  status?: OasisStatus;
  /** Text inside the diamond (e.g. "95%", "—") */
  label?: string;
  /** sm=28, md=40, lg=56, xl=72 */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Caption below */
  meta?: string;
}

const SIZES = { sm: 28, md: 40, lg: 56, xl: 72 };
const FONT_SIZES: Record<string, number> = { sm: fs[9], md: fs[11], lg: fs[14], xl: fs[16] };

function borderCol(status: OasisStatus, theme: any): string {
  switch (status) {
    case 'complete': case 'strong': return color.noon[400];
    case 'weak': return color.terra[400];
    case 'current': return color.gold[300];
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
  const border = borderCol(status, theme);
  const clampedLevel = Math.max(0, Math.min(100, level));

  // Auto-label: show percentage if level > 0, otherwise dash
  const displayLabel = label ?? (clampedLevel > 0 ? `${clampedLevel}%` : '—');

  // Label color follows border
  const labelColor = isCurrent ? color.gold[300] : isPast ? border : theme.fgFaint;

  return (
    <View style={{ alignItems: 'center' }}>
      {/* Diamond container */}
      <View style={{
        width: dim, height: dim,
        transform: [{ rotate: '45deg' }],
        borderWidth: isCurrent ? 2.5 : 1.5,
        borderColor: border,
        borderStyle: isDashed ? 'dashed' : 'solid',
        backgroundColor: color.void[300],
        overflow: 'hidden',
        ...(isCurrent ? {
          shadowColor: color.gold[300],
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.35,
          shadowRadius: 12,
          elevation: 6,
        } : {}),
      }}>
        {/* Water fill — counter-rotated so it rises bottom-to-top visually */}
        {/* Water fill */}
        {clampedLevel > 0 && (
          <View style={{
            position: 'absolute',
            top: -(dim * 0.25), left: -(dim * 0.25),
            width: dim * 1.5, height: dim * 1.5,
            transform: [{ rotate: '-45deg' }],
            justifyContent: 'flex-end',
          }}>
            <View style={{ height: `${clampedLevel}%`, backgroundColor: color.blue[400], opacity: 0.3 }} />
          </View>
        )}

        {/* Label inside diamond */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{
            transform: [{ rotate: '-45deg' }],
            fontFamily: font.mono,
            fontSize: FONT_SIZES[size],
            fontWeight: fw[600],
            color: labelColor,
          }}>{displayLabel}</Text>
        </View>
      </View>

      {/* Meta caption */}
      {meta && (
        <Text style={{
          fontFamily: font.mono, fontSize: fs[9],
          color: isCurrent ? color.gold[300] : isPast ? theme.fgMuted : theme.fgFaint,
          marginTop: dim * 0.2 + sp[2], textAlign: 'center',
        }}>{meta}</Text>
      )}
    </View>
  );
}
