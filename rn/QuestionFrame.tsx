/**
 * QuestionFrame — layout wrapper for answer mechanisms.
 * Renders instruction, answer zones, source options, and optional submit/reset buttons.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { Button } from './Button';
import { sp, fs, font } from './tokens';

interface QuestionFrameProps {
  instruction?: string;
  children: React.ReactNode;
  options?: React.ReactNode;
  optionsPosition?: 'top' | 'bottom';
  showButtons?: boolean;
  submitted?: boolean;
  allPlaced?: boolean;
  onSubmit?: () => void;
  onReset?: () => void;
}

export function QuestionFrame({ instruction, children, options, optionsPosition = 'bottom', showButtons = true, submitted, allPlaced, onSubmit, onReset }: QuestionFrameProps) {
  return (
    <View style={{ gap: sp[4], overflow: 'visible' }}>
      {instruction && (
        <Text style={{ fontFamily: font.sans, fontSize: fs[13] }}>{instruction}</Text>
      )}
      {optionsPosition === 'top' && options}
      {children}
      {optionsPosition === 'bottom' && options}
      {showButtons && (
        <View style={{ flexDirection: 'row', gap: sp[3] }}>
          {!submitted && onSubmit && (
            <Button variant="primary" size="sm" disabled={!allPlaced} onPress={onSubmit}>Check</Button>
          )}
          {submitted && onReset && (
            <Button variant="secondary" size="sm" onPress={onReset}>Try again</Button>
          )}
        </View>
      )}
    </View>
  );
}
