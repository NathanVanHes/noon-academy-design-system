/**
 * ClassToolbar — the floating in-class action pill: raise hand, mic, chat, leave.
 *
 * Icon circles only — labels live in accessibilityLabel. Active state is
 * accent; the leave action is the only danger. Floats above the stage.
 */
import React from 'react';
import { View, Pressable } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, icon as iconTokens, color } from './tokens';
import { Icon, type IconName } from './Icon';

export interface ClassToolbarItem {
  id: string;
  icon: IconName;
  /** Accessibility label — required, there is no visible text */
  label: string;
  active?: boolean;
  variant?: 'default' | 'danger';
  /** Unread dot (e.g. chat) */
  badge?: boolean;
}

interface ClassToolbarProps {
  items: ClassToolbarItem[];
  onPress: (id: string) => void;
}

export function ClassToolbar({ items, onPress }: ClassToolbarProps) {
  const { theme } = useTheme();

  return (
    <View style={{
      alignSelf: 'center', flexDirection: 'row', gap: sp[2],
      padding: sp[2], borderRadius: 999,
      backgroundColor: theme.bgOverlay, borderWidth: 1, borderColor: theme.borderStrong,
      shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 8,
    }}>
      {items.map(it => {
        const danger = it.variant === 'danger';
        const bg = danger ? theme.danger : it.active ? theme.accent : 'transparent';
        const fg = danger ? color.chalk[100] : it.active ? theme.accentFg : theme.fgMuted;
        return (
          <Pressable
            key={it.id}
            onPress={() => onPress(it.id)}
            accessibilityRole="button"
            accessibilityLabel={it.label}
            accessibilityState={{ selected: !!it.active }}
            style={({ pressed }) => ({
              width: 48, height: 48, borderRadius: 24,
              alignItems: 'center', justifyContent: 'center',
              backgroundColor: pressed && bg === 'transparent' ? theme.hoverOverlay : bg,
            })}
          >
            <Icon name={it.icon} size={iconTokens['2xl'] - 6} color={fg} />
            {it.badge && (
              <View style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: theme.danger }} />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
