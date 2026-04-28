/**
 * ChatMessage — tutor and student message bubbles for voice chat transcript.
 * Tutor: iris left border, left-aligned, right margin.
 * Student confirmed: accent right border, right-aligned, left margin.
 * Student unconfirmed: faint border, italic, low opacity.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, font } from './tokens';

interface ChatMessageProps {
  children: string;
  from: 'tutor' | 'student';
  confirmed?: boolean;
}

export function ChatMessage({ children, from, confirmed = true }: ChatMessageProps) {
  const { theme, mode } = useTheme();
  const isVoid = mode === 'void';

  if (from === 'tutor') {
    return (
      <View style={{ borderLeftWidth: 2, borderLeftColor: theme.irisBorder, paddingLeft: sp[4], alignSelf: 'flex-start', maxWidth: '80%' }}>
        <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fg, lineHeight: fs[14] * 1.5 }}>{children}</Text>
      </View>
    );
  }

  const accentRGB = isVoid ? 'rgba(100,216,174,' : 'rgba(42,138,106,';
  const chalkRGB = isVoid ? 'rgba(232,228,220,' : 'rgba(10,15,26,';

  return (
    <View style={{
      borderRightWidth: 2,
      borderRightColor: confirmed ? `${accentRGB}0.4)` : `${accentRGB}0.1)`,
      paddingVertical: sp[3], paddingHorizontal: sp[4],
      backgroundColor: confirmed ? theme.hoverOverlay : `${chalkRGB}0.02)`,
      borderTopLeftRadius: r[2], borderBottomLeftRadius: r[2],
      alignSelf: 'flex-end', maxWidth: '80%',
    }}>
      <Text style={{
        fontFamily: font.sans, fontSize: fs[14],
        color: confirmed ? theme.fg : theme.fgFaint,
        lineHeight: fs[14] * 1.5, textAlign: 'right',
        fontStyle: confirmed ? 'normal' : 'italic',
      }}>{children}</Text>
    </View>
  );
}
