/**
 * LivePrompt — a question the teacher pushes mid-class.
 *
 * Frame only: kicker + optional Timer + question, options go in as
 * children (QuizOption etc). Overlay it above the stage; one at a time.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font } from './tokens';
import { Timer } from './Timer';

interface LivePromptProps {
  question: string;
  /** Countdown — omit for untimed prompts */
  seconds?: number;
  onExpire?: () => void;
  /** Default "Live question" */
  kicker?: string;
  /** Answer options — QuizOption, Slider, … */
  children: React.ReactNode;
}

export function LivePrompt({ question, seconds, onExpire, kicker = 'Live question', children }: LivePromptProps) {
  const { theme } = useTheme();

  return (
    <View style={{
      backgroundColor: theme.bgRaised, borderWidth: 1, borderColor: theme.accentBorder,
      borderRadius: r[3], padding: sp[4], gap: sp[3],
      shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.18, shadowRadius: 24, elevation: 10,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[2] }}>
        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: theme.accent }} />
        <Text style={{ fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], letterSpacing: 1, textTransform: 'uppercase', color: theme.accentText, flex: 1 }}>
          {kicker}
        </Text>
        {seconds != null && <Timer seconds={seconds} size="sm" variant="pill" onComplete={onExpire} />}
      </View>
      <Text style={{ fontFamily: font.serif, fontSize: fs[18], fontWeight: fw[500], color: theme.fg, lineHeight: fs[18] * 1.4 }}>
        {question}
      </Text>
      <View style={{ gap: sp[2] }}>{children}</View>
    </View>
  );
}
