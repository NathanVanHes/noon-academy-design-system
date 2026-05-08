/**
 * Tooltip — hover on web, long press on mobile.
 * Shows a small text popup above the trigger.
 */
import React, { useState, useRef, useCallback } from 'react';
import { View, Text, Pressable, Platform, type LayoutChangeEvent } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, font } from './tokens';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export function Tooltip({ text, children }: TooltipProps) {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState(0);
  const tipWidth = Math.max(100, Math.min(200, text.length * 7 + 24));
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setTriggerWidth(e.nativeEvent.layout.width);
  }, []);

  const show = useCallback(() => {
    if (hideTimer.current) { clearTimeout(hideTimer.current); hideTimer.current = null; }
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    hideTimer.current = setTimeout(() => setVisible(false), 150);
  }, []);

  const autoHide = useCallback(() => {
    hideTimer.current = setTimeout(() => setVisible(false), 3000);
  }, []);

  // Web hover props
  const webHover = Platform.OS === 'web' ? {
    onMouseEnter: show,
    onMouseLeave: hide,
  } : {};

  return (
    <View style={{ position: 'relative' }} onLayout={onLayout} {...webHover as any}>
      <Pressable
        onLongPress={() => { show(); autoHide(); }}
        onPressOut={Platform.OS !== 'web' ? () => setVisible(false) : undefined}
        accessibilityRole="button"
      >
        {children}
      </Pressable>
      {visible && (
        <View
          accessibilityRole={"tooltip" as any}
          {...(Platform.OS === 'web' ? { onMouseEnter: show, onMouseLeave: hide } as any : {})}
          style={{
            position: 'absolute', bottom: '100%',
            left: (triggerWidth - tipWidth) / 2,
            marginBottom: sp[2],
            backgroundColor: theme.fg, borderRadius: r[2],
            paddingVertical: sp[2], paddingHorizontal: sp[3],
            width: tipWidth, alignItems: 'center', zIndex: 100,
          }}
        >
          <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.bg, textAlign: 'center' }}>{text}</Text>
          <View style={{ position: 'absolute', bottom: -sp[1], alignSelf: 'center', width: sp[2], height: sp[2], backgroundColor: theme.fg, transform: [{ rotate: '45deg' }] }} />
        </View>
      )}
    </View>
  );
}
