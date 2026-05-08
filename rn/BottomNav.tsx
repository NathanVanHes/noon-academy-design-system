/**
 * BottomNav — mobile tab bar with overflow "More" popup.
 *
 * When more than `maxVisible` items, the last slot becomes "More".
 * Tapping More opens an inline menu directly above the nav bar.
 */
import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font, icon as iconTokens, color } from './tokens';
import { Icon, type IconName } from './Icon';

interface NavItem {
  label: string;
  icon: IconName | ((color: string, size: number) => React.ReactNode);
  badge?: number;
}

interface BottomNavProps {
  items: NavItem[];
  selected: number;
  onSelect: (index: number) => void;
  maxVisible?: number;
}

export function BottomNav({ items, selected, onSelect, maxVisible = 4 }: BottomNavProps) {
  const { theme } = useTheme();
  const insets = React.useContext(SafeAreaInsetsContext) || { bottom: 0 };
  const [moreOpen, setMoreOpen] = useState(false);

  const needsMore = items.length > maxVisible;
  const visibleItems = needsMore ? items.slice(0, maxVisible - 1) : items;
  const overflowItems = needsMore ? items.slice(maxVisible - 1) : [];
  const isOverflowSelected = needsMore && selected >= maxVisible - 1;

  const barPaddingBottom = Math.max(sp[4], insets.bottom);

  function renderIcon(item: NavItem, clr: string) {
    return typeof item.icon === 'string' ? <Icon name={item.icon} size={iconTokens.tab} color={clr} /> : item.icon(clr, iconTokens.tab);
  }

  function renderTab(item: NavItem, index: number, isOn: boolean) {
    const iconColor = isOn ? theme.accent : theme.fgSubtle;
    return (
      <Pressable key={index} onPress={() => onSelect(index)} style={{ alignItems: 'center', gap: sp[1], minWidth: 56, position: 'relative' }} accessibilityRole="tab" accessibilityState={{ selected: isOn }}>
        {isOn && <View style={{ position: 'absolute', top: -sp[3] - sp[1], width: sp[6], height: sp[0.5], backgroundColor: theme.accent, borderBottomLeftRadius: r[1], borderBottomRightRadius: r[1], alignSelf: 'center' }} />}
        {renderIcon(item, iconColor)}
        <Text style={{ fontFamily: font.sans, fontSize: fs[10], fontWeight: fw[600], letterSpacing: 0.8, textTransform: 'uppercase', color: isOn ? theme.accent : theme.fgSubtle }}>{item.label}</Text>
        {item.badge != null && item.badge > 0 && (
          <View style={{ position: 'absolute', top: 0, right: sp[1], minWidth: 16, height: 16, borderRadius: 8, backgroundColor: theme.danger, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[9], fontWeight: fw[500], color: color.chalk[100] }}>{item.badge}</Text>
          </View>
        )}
      </Pressable>
    );
  }

  return (
    <View style={{ position: 'relative' }}>
      {/* Overflow menu — rises above the bar */}
      {moreOpen && needsMore && (
        <>
          {/* Scrim */}
          <Pressable onPress={() => setMoreOpen(false)} style={{ position: 'absolute', top: -9999, left: 0, right: 0, bottom: 0, height: 10000 }} />

          {/* Menu panel — full width, connected to nav */}
          <View style={{
            position: 'absolute', bottom: '100%', left: 0, right: 0,
            backgroundColor: theme.bgOverlay,
            borderTopWidth: 1, borderTopColor: theme.border,
            shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.12, shadowRadius: 8, elevation: 8,
          }}>
            {overflowItems.map((item, i) => {
              const realIndex = maxVisible - 1 + i;
              const isOn = realIndex === selected;
              return (
                <Pressable key={realIndex} onPress={() => { onSelect(realIndex); setMoreOpen(false); }}
                  style={({ pressed }) => ({
                    flexDirection: 'row', alignItems: 'center', gap: sp[3],
                    paddingVertical: sp[3], paddingHorizontal: sp[4],
                    backgroundColor: isOn ? theme.activeOverlay : pressed ? theme.hoverOverlay : 'transparent',
                    borderBottomWidth: i < overflowItems.length - 1 ? 1 : 0,
                    borderBottomColor: theme.divider,
                  })}>
                  {renderIcon(item, isOn ? theme.accent : theme.fgMuted)}
                  <Text style={{ fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: isOn ? theme.accent : theme.fg, flex: 1 }}>{item.label}</Text>
                  {item.badge != null && item.badge > 0 && (
                    <View style={{ minWidth: 20, height: 20, borderRadius: 10, backgroundColor: theme.danger, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 }}>
                      <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: color.chalk[100] }}>{item.badge}</Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        </>
      )}

      {/* Nav bar */}
      <View accessibilityRole="tablist" style={{
        flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start',
        paddingTop: sp[3], paddingBottom: barPaddingBottom,
        backgroundColor: theme.bgOverlay, borderTopWidth: 1, borderTopColor: theme.border,
      }}>
        {visibleItems.map((item, i) => renderTab(item, i, i === selected))}

        {needsMore && (
          <Pressable onPress={() => setMoreOpen(!moreOpen)} style={{ alignItems: 'center', gap: sp[1], minWidth: 56, position: 'relative' }}>
            {isOverflowSelected && <View style={{ position: 'absolute', top: -sp[3] - sp[1], width: sp[6], height: sp[0.5], backgroundColor: theme.accent, borderBottomLeftRadius: r[1], borderBottomRightRadius: r[1], alignSelf: 'center' }} />}
            <Icon name="more" size={iconTokens.tab} color={isOverflowSelected ? theme.accent : theme.fgSubtle} />
            <Text style={{ fontFamily: font.sans, fontSize: fs[10], fontWeight: fw[600], letterSpacing: 0.8, textTransform: 'uppercase', color: isOverflowSelected ? theme.accent : theme.fgSubtle }}>More</Text>
            {overflowItems.some(it => it.badge && it.badge > 0) && !moreOpen && (
              <View style={{ position: 'absolute', top: 0, right: sp[1], width: 8, height: 8, borderRadius: 4, backgroundColor: theme.danger }} />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}
