/**
 * FullSheet — full-screen modal with close button.
 * Dark background, "Close" text top-right, content fills below.
 */
import React from 'react';
import { View, Text, Pressable, Modal, ScrollView } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from './ThemeContext';
import { sp, fs, fw, font } from './tokens';

interface FullSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

function FullSheetContent({ onClose, title, children }: Omit<FullSheetProps, 'visible'>) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, paddingTop: insets.top }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: sp[5], paddingVertical: sp[3], borderBottomWidth: 1, borderBottomColor: theme.divider }}>
        <Text style={{ fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: theme.fg, flex: 1 }} numberOfLines={1}>{title}</Text>
        <Pressable onPress={onClose} hitSlop={8} accessibilityRole="button" accessibilityLabel="Close">
          <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgSubtle }}>Close</Text>
        </Pressable>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: sp[5], paddingBottom: sp[5] + insets.bottom }}>
        {children}
      </ScrollView>
    </View>
  );
}

export function FullSheet({ visible, onClose, title, children }: FullSheetProps) {
  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaProvider>
        <FullSheetContent onClose={onClose} title={title}>{children}</FullSheetContent>
      </SafeAreaProvider>
    </Modal>
  );
}
