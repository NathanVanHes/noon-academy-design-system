/**
 * FilterBar — horizontal scrollable row of filter chips.
 */
import React from 'react';
import { ScrollView } from 'react-native';
import { Chip } from './Chip';
import { sp } from './tokens';

interface FilterItem {
  label: string;
  active?: boolean;
}

interface FilterBarProps {
  items: FilterItem[];
  onToggle: (index: number) => void;
}

export function FilterBar({ items, onToggle }: FilterBarProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: sp[2], paddingHorizontal: sp[4] }}>
      {items.map((item, i) => (
        <Chip
          key={i}
          variant={item.active ? 'accent' : 'default'}
          onPress={() => onToggle(i)}
        >
          {item.label}
        </Chip>
      ))}
    </ScrollView>
  );
}
