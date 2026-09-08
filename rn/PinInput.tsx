/**
 * PinInput — digit boxes for OTP codes and class join PINs.
 *
 * One hidden TextInput drives the whole thing; the boxes are display only.
 * Digits always read left-to-right, even in RTL — codes are numbers, not prose.
 */
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, I18nManager } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font } from './tokens';

interface PinInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  /** Fires once when all boxes are filled */
  onComplete?: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
}

export function PinInput({ length = 6, value, onChange, onComplete, error, disabled, autoFocus }: PinInputProps) {
  const { theme } = useTheme();
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const isRTL = I18nManager.isRTL;

  const handleChange = (raw: string) => {
    const next = raw.replace(/[^0-9]/g, '').slice(0, length);
    onChange(next);
    if (next.length === length && value.length !== length) onComplete?.(next);
  };

  const activeIndex = Math.min(value.length, length - 1);

  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      disabled={disabled}
      accessibilityLabel={`${length} digit code, ${value.length} of ${length} entered`}
      style={{ opacity: disabled ? 0.4 : 1 }}
    >
      {/* RN flips row order in RTL; reverse it back so digits stay LTR */}
      <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', gap: sp[2] }}>
        {Array.from({ length }).map((_, i) => {
          const filled = i < value.length;
          const isActive = focused && !disabled && i === activeIndex && value.length < length;
          return (
            <View key={i} style={{
              flex: 1, maxWidth: 52, height: 56,
              alignItems: 'center', justifyContent: 'center',
              backgroundColor: theme.inputBg,
              borderWidth: isActive ? 1.5 : 1,
              borderColor: error ? theme.danger : isActive ? theme.water : filled ? theme.borderStrong : theme.border,
              borderRadius: r[2],
            }}>
              <Text style={{ fontFamily: font.mono, fontSize: fs[22], fontWeight: fw[600], color: theme.fg, fontVariant: ['tabular-nums'] }}>
                {value[i] ?? ''}
              </Text>
            </View>
          );
        })}
      </View>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        editable={!disabled}
        autoFocus={autoFocus}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        caretHidden
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.01 }}
      />
    </Pressable>
  );
}
