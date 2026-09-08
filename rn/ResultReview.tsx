/**
 * ResultReview — the post-quiz breakdown: every question, its verdict.
 *
 * Interstitial celebrates the score; this shows the work.
 * Tap a row to reopen that question.
 */
import React from 'react';
import { View, Text, Pressable, I18nManager } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font, icon } from './tokens';
import { Icon } from './Icon';

export interface ResultReviewItem {
  question: string;
  correct: boolean;
  /** e.g. "You said 14 · correct is 12" */
  meta?: string;
}

interface ResultReviewProps {
  items: ResultReviewItem[];
  onPressItem?: (index: number) => void;
}

export function ResultReview({ items, onPressItem }: ResultReviewProps) {
  const { theme } = useTheme();
  const isRTL = I18nManager.isRTL;

  return (
    <View style={{ backgroundColor: theme.bgRaised, borderWidth: 1, borderColor: theme.border, borderRadius: r[3], overflow: 'hidden' }}>
      {items.map((it, i) => {
        const row = (
          <>
            <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, width: 24 }}>Q{i + 1}</Text>
            <View style={{
              width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
              backgroundColor: it.correct ? theme.accentSoft : theme.dangerSoft,
            }}>
              <Icon name={it.correct ? 'check' : 'close'} size={icon.md} color={it.correct ? theme.accentText : theme.danger} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: theme.fg }} numberOfLines={2}>{it.question}</Text>
              {it.meta ? <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, marginTop: 2 }}>{it.meta}</Text> : null}
            </View>
            {onPressItem && <Icon name={isRTL ? 'chevron-left' : 'chevron-right'} size={icon.md} color={theme.fgFaint} />}
          </>
        );
        const rowStyle = {
          flexDirection: 'row' as const, alignItems: 'center' as const, gap: sp[3],
          padding: sp[4],
          borderBottomWidth: i < items.length - 1 ? 1 : 0, borderBottomColor: theme.divider,
        };
        return onPressItem ? (
          <Pressable key={i} onPress={() => onPressItem(i)} accessibilityRole="button"
            style={({ pressed }) => [rowStyle, pressed && { backgroundColor: theme.hoverOverlay }]}>
            {row}
          </Pressable>
        ) : (
          <View key={i} style={rowStyle}>{row}</View>
        );
      })}
    </View>
  );
}
