/**
 * Dialog — centered modal for confirmations and decisions.
 * Overlay fades in, content scales up with 200ms ease.
 */
import React, { useEffect, useRef } from 'react';
import { View, Text, Modal, Pressable, Animated, Easing } from 'react-native';
import { useTheme } from './ThemeContext';
import { Button } from './Button';
import { sp, r, fs, fw, font, dur } from './tokens';

interface DialogProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  body?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  danger?: boolean;
}

export function Dialog({ visible, onClose, title, body, primaryLabel = 'Confirm', secondaryLabel = 'Cancel', onPrimary, onSecondary, danger }: DialogProps) {
  const { theme } = useTheme();
  const scale = useRef(new Animated.Value(0.92)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      scale.setValue(0.92);
      contentOpacity.setValue(0);
      Animated.parallel([
        Animated.timing(scale, { toValue: 1, duration: dur[2], easing: Easing.bezier(0.22, 0.61, 0.36, 1), useNativeDriver: true }),
        Animated.timing(contentOpacity, { toValue: 1, duration: dur[2], easing: Easing.bezier(0.22, 0.61, 0.36, 1), useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={{ flex: 1, backgroundColor: 'rgba(6,9,19,0.5)', justifyContent: 'center', alignItems: 'center', padding: sp[7] }} onPress={onClose}>
        <Animated.View style={{ transform: [{ scale }], opacity: contentOpacity, width: '100%', maxWidth: 320 }}>
          <Pressable
            style={{
              backgroundColor: theme.bgRaised,
              borderRadius: r[3],
              padding: sp[7],
              shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 24, elevation: 8,
            }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontFamily: font.serif, fontSize: fs[24], fontWeight: fw[500], color: theme.fg, marginBottom: sp[2] }}>{title}</Text>
            {body && <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fgMuted, lineHeight: fs[14] * 1.5, marginBottom: sp[5] }}>{body}</Text>}
            <View style={{ flexDirection: 'row', gap: sp[3] }}>
              <View style={{ flex: 1 }}>
                <Button variant="ghost" onPress={onSecondary || onClose}>{secondaryLabel}</Button>
              </View>
              <View style={{ flex: 1 }}>
                <Button variant={danger ? 'danger' : 'primary'} onPress={onPrimary || onClose}>{primaryLabel}</Button>
              </View>
            </View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
