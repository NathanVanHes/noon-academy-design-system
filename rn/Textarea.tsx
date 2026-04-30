/**
 * Textarea — multi-line text input.
 */
import React, { forwardRef, useState } from 'react';
import { View, TextInput, Text, type ViewStyle, type TextStyle, type TextInputProps } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font } from './tokens';

interface TextareaProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  rows?: number;
  disabled?: boolean;
}

export const Textarea = forwardRef<TextInput, TextareaProps>(({ label, error, rows = 4, disabled, ...rest }, ref) => {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error ? theme.danger : focused ? theme.accent : theme.borderStrong;

  const inputStyle: TextStyle = {
    fontFamily: font.sans,
    fontSize: fs[15],
    color: theme.fg,
    backgroundColor: theme.bgOverlay,
    borderWidth: 1,
    borderColor,
    borderRadius: r[2],
    paddingHorizontal: sp[3],
    paddingVertical: sp[2],
    minHeight: rows * 24,
    textAlignVertical: 'top',
  };

  return (
    <View style={{ opacity: disabled ? 0.4 : 1 }}>
      {label && <Text style={{ fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: theme.fgMuted, marginBottom: sp[1] }}>{label}</Text>}
      <TextInput
        ref={ref}
        {...rest}
        multiline
        numberOfLines={rows}
        editable={!disabled}
        accessibilityLabel={label}
        placeholderTextColor={theme.fgFaint}
        onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); rest.onBlur?.(e); }}
        style={inputStyle}
      />
      {error && <Text style={{ fontFamily: font.sans, fontSize: fs[12], color: theme.danger, marginTop: sp[1] }}>{error}</Text>}
    </View>
  );
});
