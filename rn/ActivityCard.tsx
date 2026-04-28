/**
 * ActivityCard — CTA card for launching exercises mid-conversation.
 * States: default (Start button), complete (green "Complete" replaces button).
 * Same layout in both states — just the action area changes.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font } from './tokens';
import { Button } from './Button';

interface ActivityCardProps {
  title: string;
  description?: string;
  buttonLabel?: string;
  complete?: boolean;
  score?: string;
  onPress?: () => void;
}

export function ActivityCard({ title, description, buttonLabel = 'Start', complete, score, onPress }: ActivityCardProps) {
  const { theme } = useTheme();
  return (
    <View style={{ backgroundColor: theme.inputBg, borderRadius: r[2], borderWidth: 1, borderColor: complete ? theme.accentBorder : theme.border, padding: sp[4] }}>
      <Text style={{ fontFamily: font.mono, fontSize: fs[10], letterSpacing: 1, textTransform: 'uppercase', fontWeight: fw[600], color: theme.irisLabel, marginBottom: sp[2] }}>Activity</Text>
      <Text style={{ fontFamily: font.serif, fontSize: fs[15], color: theme.fg, marginBottom: description ? sp[1] : sp[3] }}>{title}</Text>
      {description && <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgSubtle, marginBottom: sp[3] }}>{description}</Text>}
      {complete ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[2], marginTop: description ? 0 : sp[2] }}>
          <Text style={{ fontFamily: font.mono, fontSize: fs[11], fontWeight: fw[600], color: theme.accent }}>Complete</Text>
          {score && <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.accent }}>{score}</Text>}
        </View>
      ) : (
        <Button variant="primary" size="sm" onPress={onPress}>{buttonLabel}</Button>
      )}
    </View>
  );
}
