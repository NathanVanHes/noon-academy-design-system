/**
 * Menu — contextual dropdown.
 * Pass `anchor` ({ x, y }) to position near a trigger element.
 * Without anchor, defaults to top-right of screen.
 */
import React from 'react';
import { View, Text, Pressable, Modal, I18nManager, Dimensions } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, fs, fw, font, r, color } from './tokens';

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  danger?: boolean;
  onPress: () => void;
}

interface MenuProps {
  visible: boolean;
  onClose: () => void;
  items: MenuItem[];
  anchor?: { x: number; y: number };
}

export function Menu({ visible, onClose, items, anchor }: MenuProps) {
  const { theme } = useTheme();
  const isRTL = I18nManager.isRTL;

  // Anchored: align menu's trailing edge with the trigger icon.
  // Unanchored: default to top-right (or top-left in RTL).
  const screenWidth = Dimensions.get('window').width;
  const positionStyle = anchor
    ? { top: anchor.y, right: screenWidth - anchor.x - sp[4] }
    : { top: 100, ...(isRTL ? { left: sp[5] } : { right: sp[5] }) };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={{ flex: 1 }} onPress={onClose}>
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(6,9,19,0.5)' }} />
        <View accessibilityRole="menu" style={{
          position: 'absolute',
          ...positionStyle,
          backgroundColor: theme.bgOverlay,
          borderRadius: r[3],
          borderWidth: 1,
          borderColor: theme.borderStrong,
          minWidth: 180,
          paddingVertical: sp[1],
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 16,
          shadowOpacity: 0.3,
          elevation: 8,
        }}>
          {items.map((item, i) => (
            <Pressable
              key={i}
              accessibilityRole="menuitem"
              onPress={() => { item.onPress(); onClose(); }}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                gap: sp[3],
                paddingVertical: sp[3],
                paddingHorizontal: sp[4],
                backgroundColor: pressed ? theme.activeOverlay : 'transparent',
              })}
            >
              {item.icon}
              <Text style={{
                fontFamily: font.sans,
                fontSize: fs[14],
                fontWeight: fw[500],
                color: item.danger ? color.danger[300] : theme.fg,
              }}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}
