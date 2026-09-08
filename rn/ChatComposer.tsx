/**
 * ChatComposer — the message input row for class chat and tutor chat.
 *
 * Grows to ~4 lines, send disabled while empty. RTL mirrors the plane.
 */
import React from 'react';
import { View, TextInput, Pressable, I18nManager } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, font, icon } from './tokens';
import { Icon } from './Icon';

interface ChatComposerProps {
  value: string;
  onChangeText: (v: string) => void;
  onSend: (v: string) => void;
  /** Default "Message…" */
  placeholder?: string;
  disabled?: boolean;
}

export function ChatComposer({ value, onChangeText, onSend, placeholder = 'Message…', disabled }: ChatComposerProps) {
  const { theme } = useTheme();
  const canSend = !disabled && value.trim().length > 0;
  const send = () => { if (canSend) onSend(value.trim()); };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: sp[2] }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.fgFaint}
        editable={!disabled}
        multiline
        style={{
          flex: 1, minHeight: 40, maxHeight: 104,
          paddingHorizontal: sp[3], paddingVertical: sp[2] + 1,
          backgroundColor: theme.inputBg, borderWidth: 1, borderColor: theme.border, borderRadius: r[3],
          fontFamily: font.sans, fontSize: fs[14], color: theme.fg,
          textAlignVertical: 'center',
        }}
      />
      <Pressable
        onPress={send}
        disabled={!canSend}
        accessibilityRole="button"
        accessibilityLabel="Send"
        style={{
          width: 40, height: 40, borderRadius: 20,
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: canSend ? theme.accent : theme.bgSunken,
        }}
      >
        <View style={{ transform: I18nManager.isRTL ? [{ scaleX: -1 }] : undefined }}>
          <Icon name="send" size={icon.lg} color={canSend ? theme.accentFg : theme.fgFaint} />
        </View>
      </Pressable>
    </View>
  );
}
