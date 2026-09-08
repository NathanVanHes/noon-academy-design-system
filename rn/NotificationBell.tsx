/**
 * NotificationBell — bell icon with unread count, launches notifications.
 *
 * Sits right-aligned on the page title row. Count > 0 shows a danger badge
 * (caps at 9+). Count of 0 renders just the bell.
 *
 * <NotificationBell count={3} onPress={openNotifications} />
 */
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, fs, fw, font, icon, color } from './tokens';
import { Icon } from './Icon';

interface NotificationBellProps {
  count?: number;
  onPress: () => void;
}

export function NotificationBell({ count = 0, onPress }: NotificationBellProps) {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={count > 0 ? `Notifications — ${count} new` : 'Notifications'}
      style={{ padding: sp[1] }}
    >
      <Icon name="bell" size={icon.tab} color={theme.fgMuted} />
      {count > 0 && (
        <View style={{
          position: 'absolute', top: -2, right: -4,
          minWidth: 16, height: 16, borderRadius: 8,
          backgroundColor: theme.danger,
          alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4,
        }}>
          <Text style={{ fontFamily: font.mono, fontSize: fs[9], fontWeight: fw[500], color: color.chalk[100] }}>
            {count > 9 ? '9+' : count}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
