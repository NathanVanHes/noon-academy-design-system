/**
 * Toast — temporary notification that auto-dismisses.
 */
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font } from './tokens';

type Variant = 'info' | 'ok' | 'warn' | 'danger';

interface ToastProps {
  message: string;
  variant?: Variant;
  visible: boolean;
  onDismiss: () => void;
  duration?: number;
}

export function Toast({ message, variant = 'info', visible, onDismiss, duration = 4000 }: ToastProps) {
  const { theme } = useTheme();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration]);

  if (!visible) return null;

  const bgMap: Record<Variant, string> = {
    info: theme.bgOverlay,
    ok: theme.accentSoft,
    warn: theme.signalSoft,
    danger: theme.dangerSoft,
  };

  const style: ViewStyle = {
    position: 'absolute',
    top: sp[10],
    left: sp[4],
    right: sp[4],
    backgroundColor: bgMap[variant],
    borderRadius: r[2],
    padding: sp[4],
    borderWidth: 1,
    borderColor: theme.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    zIndex: 999,
  };

  return (
    <Pressable onPress={onDismiss} style={style}>
      <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fg }}>{message}</Text>
    </Pressable>
  );
}
