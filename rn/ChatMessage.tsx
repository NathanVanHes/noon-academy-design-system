/**
 * ChatMessage — tutor and student message bubbles for voice chat transcript.
 * Tutor: iris left border, left-aligned. Supports progressive reveal via `revealedLength`.
 * Student confirmed: accent right border, right-aligned.
 * Student unconfirmed: faint border, italic, low opacity.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, font } from './tokens';
import { TypingIndicator } from './TypingIndicator';

interface ChatMessageProps {
  children: string;
  from: 'tutor' | 'student';
  confirmed?: boolean;
  /** Tutor only — shows bouncing dots instead of text */
  thinking?: boolean;
  /** Tutor only — characters revealed so far. Unrevealed text shows in fgFaint. Omit for fully revealed. */
  revealedLength?: number;
}

export function ChatMessage({ children, from, confirmed = true, thinking, revealedLength }: ChatMessageProps) {
  const { theme, mode } = useTheme();
  const isVoid = mode === 'void';

  if (from === 'tutor' && thinking) {
    return (
      <View style={{ alignSelf: 'flex-start', paddingStart: sp[4] } as any}>
        <TypingIndicator />
      </View>
    );
  }

  if (from === 'tutor') {
    // Snap to word boundary — never reveal half a word
    let splitAt = revealedLength !== undefined ? revealedLength : children.length;
    if (splitAt < children.length) {
      const nextSpace = children.indexOf(' ', splitAt);
      const prevSpace = children.lastIndexOf(' ', splitAt);
      // Snap to the nearest word boundary behind the cursor
      splitAt = prevSpace > 0 ? prevSpace : 0;
    }
    const revealed = children.slice(0, splitAt);
    const unrevealed = children.slice(splitAt);

    return (
      <View style={{ borderStartWidth: 2, borderStartColor: theme.irisBorder, paddingStart: sp[4], alignSelf: 'flex-start', maxWidth: '80%' } as any}>
        <Text style={{ fontFamily: font.sans, fontSize: fs[14], lineHeight: fs[14] * 1.5 }}>
          <Text style={{ color: theme.fg }}>{revealed}</Text>
          {unrevealed ? <Text style={{ color: theme.fgFaint }}>{unrevealed}</Text> : null}
        </Text>
      </View>
    );
  }

  const accentRGB = isVoid ? 'rgba(100,216,174,' : 'rgba(42,138,106,';
  const chalkRGB = isVoid ? 'rgba(232,228,220,' : 'rgba(10,15,26,';

  return (
    <View style={{
      borderEndWidth: 2,
      borderEndColor: confirmed ? `${accentRGB}0.4)` : `${accentRGB}0.1)`,
      paddingVertical: sp[3], paddingHorizontal: sp[4],
      backgroundColor: confirmed ? theme.hoverOverlay : `${chalkRGB}0.02)`,
      borderTopStartRadius: r[2], borderBottomStartRadius: r[2],
      alignSelf: 'flex-end', maxWidth: '80%',
    } as any}>
      <Text style={{
        fontFamily: font.sans, fontSize: fs[14],
        color: confirmed ? theme.fg : theme.fgFaint,
        lineHeight: fs[14] * 1.5, textAlign: 'right',
        fontStyle: confirmed ? 'normal' : 'italic',
      }}>{children}</Text>
    </View>
  );
}
