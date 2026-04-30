/**
 * QuestionFrame — shared wrapper for all question types.
 * Renders question text, content area, and submit/reset actions.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeContext';
import { Button } from './Button';
import { sp, r, fs, fw, font } from './tokens';

type QuestionMode = 'practice' | 'exam' | 'review';

interface QuestionFrameProps {
  question: string;
  instruction?: string;
  children: React.ReactNode;
  mode?: QuestionMode;
  submitted?: boolean;
  allPlaced?: boolean;
  onSubmit?: () => void;
  onReset?: () => void;
}

export function QuestionFrame({ question, instruction, children, mode = 'practice', submitted, allPlaced, onSubmit, onReset }: QuestionFrameProps) {
  const { theme } = useTheme();

  return (
    <View style={{ gap: sp[4], overflow: 'visible' }}>
      {(question || instruction) && (
        <View>
          {question ? <Text style={{ fontFamily: font.sans, fontSize: fs[16], fontWeight: fw[600], color: theme.fg }}>{question}</Text> : null}
          {instruction && <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginTop: question ? sp[1] : 0 }}>{instruction}</Text>}
        </View>
      )}
      {children}
      {mode === 'practice' && (
        <View style={{ flexDirection: 'row', gap: sp[3] }}>
          {!submitted && onSubmit && (
            <Button variant="primary" size="sm" disabled={!allPlaced} onPress={onSubmit}>Check</Button>
          )}
          {onReset && (
            <Button variant={submitted ? 'secondary' : 'ghost'} size="sm" onPress={onReset}>{submitted ? 'Try again' : 'Reset'}</Button>
          )}
        </View>
      )}
    </View>
  );
}
