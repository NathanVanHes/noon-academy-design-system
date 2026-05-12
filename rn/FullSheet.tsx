/**
 * FullSheet — full-screen modal with close button.
 * Dark background, "Close" text top-right, content fills below.
 */
import React from 'react';
import { View, Text, Pressable, Modal, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { useTheme } from './ThemeContext';
import { sp, fs, fw, font } from './tokens';

interface FullSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  closeLabel?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

function FullSheetContent({ onClose, title, closeLabel, children, footer }: Omit<FullSheetProps, 'visible'>) {
  const { theme } = useTheme();
  const insets = React.useContext(SafeAreaInsetsContext) || { top: 0, bottom: 0 };

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, paddingTop: insets.top }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: sp[5], paddingVertical: sp[3], borderBottomWidth: 1, borderBottomColor: theme.divider }}>
        <Text style={{ fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: theme.fg, flex: 1 }} numberOfLines={1}>{title}</Text>
        <Pressable onPress={onClose} hitSlop={8} accessibilityRole="button" accessibilityLabel="Close">
          <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgSubtle }}>{closeLabel || 'Close'}</Text>
        </Pressable>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: footer ? sp[10] : (sp[5] + insets.bottom) }}>
        {children}
      </ScrollView>
      {footer}
    </View>
  );
}

export function FullSheet({ visible, onClose, title, closeLabel, children, footer }: FullSheetProps) {
  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaProvider>
        <FullSheetContent onClose={onClose} title={title} closeLabel={closeLabel} footer={footer}>{children}</FullSheetContent>
      </SafeAreaProvider>
    </Modal>
  );
}
