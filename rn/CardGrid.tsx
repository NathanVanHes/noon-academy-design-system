/**
 * CardGrid — responsive grid layout for Card components.
 * 2 columns on phone. Uses sp[4] gap. Cards fill available width.
 */
import React from 'react';
import { View } from 'react-native';
import { sp } from './tokens';

interface CardGridProps {
  children: React.ReactNode;
  columns?: number;
}

export function CardGrid({ children, columns = 2 }: CardGridProps) {
  const items = React.Children.toArray(children);
  const rows: React.ReactNode[][] = [];

  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns));
  }

  return (
    <View style={{ gap: sp[4] }}>
      {rows.map((row, ri) => (
        <View key={ri} style={{ flexDirection: 'row', gap: sp[4] }}>
          {row.map((item, ci) => (
            <View key={ci} style={{ flex: 1 }}>{item}</View>
          ))}
          {row.length < columns && Array.from({ length: columns - row.length }).map((_, fi) => (
            <View key={`fill-${fi}`} style={{ flex: 1 }} />
          ))}
        </View>
      ))}
    </View>
  );
}
