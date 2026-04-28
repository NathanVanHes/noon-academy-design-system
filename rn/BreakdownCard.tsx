/**
 * BreakdownCard — bulleted summary points card.
 * Iris dots, 2-5 points. Used when the tutor breaks down a concept.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font } from './tokens';

interface BreakdownCardProps {
  title: string;
  points: string[];
}

export function BreakdownCard({ title, points }: BreakdownCardProps) {
  const { theme } = useTheme();

  return (
    <View style={{ backgroundColor: theme.inputBg, borderRadius: r[2], padding: sp[4] }}>
      <Text style={{ fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[600], color: theme.fg, marginBottom: sp[3] }}>{title}</Text>
      {points.map((point, i) => (
        <View key={i} style={{ flexDirection: 'row', gap: sp[2], marginBottom: sp[2] }}>
          <View style={{ width: 4, height: 4, borderRadius: 1, backgroundColor: theme.irisDot, marginTop: 6, flexShrink: 0 }} />
          <Text style={{ flex: 1, fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5 }}>{point}</Text>
        </View>
      ))}
    </View>
  );
}
