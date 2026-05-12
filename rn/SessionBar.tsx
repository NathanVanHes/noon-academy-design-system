/**
 * SessionBar — question-by-question results.
 *
 * Up to `pageSize` segments visible at once (default 10).
 * When there are more, left/right arrows appear at the edges to page through.
 * Auto-focuses the page containing the current question.
 */
import React, { useMemo, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeContext';
import { IconButton } from './IconButton';
import { Icon } from './Icon';
import { sp, r, fs, fw, font, color } from './tokens';

type SegState = 'correct' | 'incorrect' | 'current' | 'pending';

interface SessionBarProps {
  segments: SegState[];
  size?: 'sm' | 'md' | 'lg';
  /** Max segments per page. Default 10. */
  pageSize?: number;
}

const heights = { sm: sp[1], md: sp[1], lg: sp[2] };

export function SessionBar({ segments, size = 'md', pageSize = 10 }: SessionBarProps) {
  const { theme } = useTheme();
  const totalPages = Math.ceil(segments.length / pageSize);
  const needsPaging = totalPages > 1;

  const currentIdx = segments.indexOf('current');
  const autoPage = currentIdx >= 0 ? Math.floor(currentIdx / pageSize) : 0;
  const [page, setPage] = useState(autoPage);

  useEffect(() => { setPage(autoPage); }, [autoPage]);

  const start = page * pageSize;
  const visibleSegs = useMemo(() => segments.slice(start, start + pageSize), [segments, start, pageSize]);

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  function segColor(state: SegState): string {
    switch (state) {
      case 'correct': return theme.accent;
      case 'incorrect': return theme.danger;
      case 'current': return color.blue[400];
      default: return theme.border;
    }
  }

  const h = heights[size];

  const questionLabel = currentIdx >= 0
    ? `${currentIdx + 1} of ${segments.length}`
    : `${segments.length}`;

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[2] }}>
        {needsPaging && canPrev && (
          <IconButton variant="ghost" size="sm" onPress={() => setPage(p => p - 1)} accessibilityLabel="Previous questions">
            <Icon name="chevron-left" size={14} color={theme.fgMuted} />
          </IconButton>
        )}

        {/* Segments */}
        <View style={{ flex: 1, flexDirection: 'row', gap: sp[0.5], height: h }}>
          {visibleSegs.map((s, i) => (
            <View key={start + i} style={{ flex: 1, borderRadius: r[1], backgroundColor: segColor(s) }} />
          ))}
        </View>

        {needsPaging && canNext && (
          <IconButton variant="ghost" size="sm" onPress={() => setPage(p => p + 1)} accessibilityLabel="Next questions">
            <Icon name="chevron-right" size={14} color={theme.fgMuted} />
          </IconButton>
        )}

        {/* Question number */}
        <Text style={{ fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: theme.fgFaint, minWidth: 28, textAlign: 'right' }}>
          {questionLabel}
        </Text>
      </View>
    </View>
  );
}
