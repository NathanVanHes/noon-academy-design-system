/**
 * Breadcrumbs — horizontal path trail for web/tablet navigation.
 * Not applicable on mobile — use TitleBar with back button instead.
 */
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, fs, fw, font } from './tokens';

interface BreadcrumbItem {
  label: string;
  onPress?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { theme } = useTheme();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }} accessibilityRole="none">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
            {i > 0 && (
              <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.fgFaint, marginHorizontal: sp[2] }}>/</Text>
            )}
            {isLast ? (
              <Text style={{ fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fg }}>{item.label}</Text>
            ) : (
              <Pressable onPress={item.onPress} hitSlop={4}>
                <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>{item.label}</Text>
              </Pressable>
            )}
          </View>
        );
      })}
    </View>
  );
}
