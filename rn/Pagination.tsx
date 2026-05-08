/**
 * Pagination — page navigation for web/tablet.
 * Ant Design algorithm: buffer-based sliding window.
 * No spacer padding — content naturally sized.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeContext';
import { IconButton } from './IconButton';
import { Icon } from './Icon';
import { sp, fs, fw, font } from './tokens';

interface PaginationProps {
  total: number;
  current: number;
  onPageChange: (page: number) => void;
}

const BUFFER = 2;
const JUMP = 5;

type Slot = { type: 'page'; page: number } | { type: 'jump'; dir: 'prev' | 'next' };

function buildSlots(total: number, current: number): Slot[] {
  if (total <= 3 + BUFFER * 2) {
    return Array.from({ length: total }, (_, i) => ({ type: 'page' as const, page: i + 1 }));
  }

  let left = Math.max(1, current - BUFFER);
  let right = Math.min(current + BUFFER, total);
  if (current - 1 <= BUFFER) right = 1 + BUFFER * 2;
  if (total - current <= BUFFER) left = total - BUFFER * 2;

  const slots: Slot[] = [];
  if (left > 1) slots.push({ type: 'page', page: 1 });
  if (left > 2) slots.push({ type: 'jump', dir: 'prev' });
  for (let i = left; i <= right; i++) slots.push({ type: 'page', page: i });
  if (right < total - 1) slots.push({ type: 'jump', dir: 'next' });
  if (right < total) slots.push({ type: 'page', page: total });
  return slots;
}

export function Pagination({ total, current, onPageChange }: PaginationProps) {
  const { theme } = useTheme();
  if (total <= 1) return null;

  const slots = buildSlots(total, current);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[1] }}>
      {current > 1 && (
        <IconButton variant="ghost" size="sm" onPress={() => onPageChange(current - 1)} accessibilityLabel="Previous page">
          <Icon name="chevron-left" size={16} color={theme.fgMuted} />
        </IconButton>
      )}

      {slots.map((slot, i) => {
        if (slot.type === 'jump') {
          return (
            <IconButton key={`j${slot.dir}`} variant="ghost" size="sm"
              onPress={() => onPageChange(Math.max(1, Math.min(total, current + (slot.dir === 'prev' ? -JUMP : JUMP))))}
              accessibilityLabel={slot.dir === 'prev' ? `Back ${JUMP} pages` : `Forward ${JUMP} pages`}>
              <Text style={{ fontFamily: font.mono, fontSize: fs[12], color: theme.fgFaint }}>···</Text>
            </IconButton>
          );
        }
        const active = slot.page === current;
        return (
          <IconButton key={slot.page} variant={active ? 'primary' : 'ghost'} size="sm"
            onPress={() => onPageChange(slot.page)} accessibilityLabel={`Page ${slot.page}`}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[12], fontWeight: active ? fw[700] : fw[500], color: active ? theme.accentFg : theme.fgMuted }}>{slot.page}</Text>
          </IconButton>
        );
      })}

      {current < total && (
        <IconButton variant="ghost" size="sm" onPress={() => onPageChange(current + 1)} accessibilityLabel="Next page">
          <Icon name="chevron-right" size={16} color={theme.fgMuted} />
        </IconButton>
      )}
    </View>
  );
}
