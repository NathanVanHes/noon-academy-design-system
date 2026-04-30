/**
 * Textarea — multi-line text input.
 * Same visual treatment as Input: inputBg, fs[14], helper text support.
 */
import React, { forwardRef, useState } from 'react';
import { View, TextInput, Text, type ViewStyle, type TextStyle, type TextInputProps } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font } from './tokens';

interface TextareaProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  helper?: string;
  rows?: number;
  disabled?: boolean;
}

export const Textarea = forwardRef<TextInput, TextareaProps>(({ label, error, helper, rows = 4, disabled, ...rest }, ref) => {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error ? theme.danger : focused ? theme.accent : theme.borderStrong;

  const containerStyle: ViewStyle = { opacity: disabled ? 0.4 : 1 };

  const labelStyle: TextStyle = {
    fontFamily: font.sans,
    fontSize: fs[12],
    fontWeight: fw[500],
    color: theme.fgMuted,
    marginBottom: sp[1],
  };

  const inputStyle: TextStyle = {
    fontFamily: font.sans,
    fontSize: fs[14],
    color: theme.fg,
    backgroundColor: theme.inputBg,
    borderWidth: 1,
    borderColor,
    borderRadius: r[2],
    paddingHorizontal: sp[3],
    paddingVertical: sp[2],
    minHeight: rows * 24,
    textAlignVertical: 'top',
  };

  const helperStyle: TextStyle = {
    fontFamily: font.sans,
    fontSize: fs[12],
    color: error ? theme.danger : theme.fgFaint,
    marginTop: sp[1],
  };

  return (
    <View style={containerStyle}>
      {label && <Text style={labelStyle}>{label}</Text>}
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
      {(error || helper) && <Text style={helperStyle}>{error || helper}</Text>}
    </View>
  );
});
