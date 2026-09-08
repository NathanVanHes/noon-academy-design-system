/**
 * NavRail — vertical navigation rail for tablet and desktop shells.
 *
 * Each item is icon with the page title below, like a button.
 * labels=false collapses to icon-only (tablet rail).
 * header sits at the top (brand mark); footer is pinned to the bottom
 * (avatar as the entrance to Profile).
 */
import React from 'react';
import { View, Text, Pressable, I18nManager } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font, icon as iconTokens } from './tokens';
import { Icon, type IconName } from './Icon';

interface NavRailItem {
  label: string;
  icon: IconName | ((color: string, size: number) => React.ReactNode);
}

interface NavRailProps {
  items: NavRailItem[];
  selected: number;
  onSelect: (index: number) => void;
  labels?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function NavRail({ items, selected, onSelect, labels = true, header, footer }: NavRailProps) {
  const { theme } = useTheme();
  const isRTL = I18nManager.isRTL;
  return (
    <View style={{
      width: labels ? 84 : 64,
      backgroundColor: theme.bgRaised,
      [isRTL ? 'borderLeftWidth' : 'borderRightWidth']: 1,
      [isRTL ? 'borderLeftColor' : 'borderRightColor']: theme.border,
      alignItems: 'center', paddingVertical: sp[5], gap: sp[2],
    }}>
      {header && <View style={{ marginBottom: sp[4] }}>{header}</View>}
      <View accessibilityRole="tablist" style={{ flex: 1, alignItems: 'center', gap: sp[1] }}>
        {items.map((item, i) => {
          const on = i === selected;
          const c = on ? theme.accent : theme.fgSubtle;
          return (
            <Pressable
              key={item.label}
              onPress={() => onSelect(i)}
              accessibilityRole="tab"
              accessibilityState={{ selected: on }}
              style={{
                alignItems: 'center', justifyContent: 'center', gap: sp[2],
                paddingVertical: sp[2],
                width: labels ? 68 : 44,
                height: labels ? undefined : 44,
                borderRadius: r[2],
                backgroundColor: on ? theme.selectedOverlay : 'transparent',
              }}
            >
              {typeof item.icon === 'string' ? <Icon name={item.icon} size={iconTokens.tab} color={c} /> : item.icon(c, iconTokens.tab)}
              {labels && (
                <Text style={{ fontFamily: font.sans, fontSize: fs[11], fontWeight: fw[500], color: c }}>
                  {item.label}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
      {footer && <View style={{ marginTop: sp[4] }}>{footer}</View>}
    </View>
  );
}
