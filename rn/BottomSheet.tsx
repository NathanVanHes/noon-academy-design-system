/**
 * BottomSheet — slides up from bottom. Drag to dismiss.
 * Requires react-native-reanimated + react-native-gesture-handler.
 */
import React from 'react';
import { View, Pressable, Text, Modal, type ViewStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, font } from './tokens';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  full?: boolean;
}

export function BottomSheet({ visible, onClose, title, children, actions, full }: BottomSheetProps) {
  const { theme } = useTheme();

  const scrimStyle: ViewStyle = {
    flex: 1,
    backgroundColor: 'rgba(6,9,19,0.5)',
    justifyContent: 'flex-end',
  };

  const sheetStyle: ViewStyle = {
    backgroundColor: theme.bgOverlay,
    borderTopLeftRadius: r[4],
    borderTopRightRadius: r[4],
    maxHeight: full ? '90%' : undefined,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  };

  const handleStyle: ViewStyle = {
    alignSelf: 'center',
    width: 32,
    height: sp[1],
    borderRadius: r.pill,
    backgroundColor: theme.fgFaint,
    opacity: 0.3,
    marginTop: sp[3],
    marginBottom: sp[2],
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={scrimStyle} onPress={onClose}>
        <Pressable style={sheetStyle} onPress={(e) => e.stopPropagation()}>
          <View style={handleStyle} />
          {title && (
            <View style={{ paddingHorizontal: sp[6], paddingBottom: sp[2] }}>
              <Text style={{ fontFamily: font.serif, fontSize: fs[18], color: theme.fg }}>{title}</Text>
            </View>
          )}
          <View style={{ paddingHorizontal: sp[6], paddingBottom: sp[5], ...(full ? { flex: 1 } : {}) }}>
            {children}
          </View>
          {actions && (
            <View style={{ borderTopWidth: 1, borderTopColor: theme.border, padding: sp[4], paddingHorizontal: sp[6] }}>
              {actions}
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
