/**
 * PhoneInput — phone number field with a fixed country code prefix.
 *
 * Saudi-first: defaults to +966. Digits are always LTR, even in RTL layouts.
 */
import React, { forwardRef, useState } from 'react';
import { View, TextInput, Text, I18nManager, type TextInputProps } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font } from './tokens';

interface PhoneInputProps extends Omit<TextInputProps, 'style' | 'value' | 'onChangeText' | 'keyboardType'> {
  value: string;
  onChangeText: (digits: string) => void;
  label?: string;
  error?: string;
  helper?: string;
  disabled?: boolean;
  /** Fixed dialing prefix shown before the number */
  countryCode?: string;
}

export const PhoneInput = forwardRef<TextInput, PhoneInputProps>(({
  value, onChangeText, label, error, helper, disabled, countryCode = '+966', ...rest
}, ref) => {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);
  const isRTL = I18nManager.isRTL;

  const borderColor = error ? theme.danger : focused ? theme.accent : theme.borderStrong;

  return (
    <View style={{ opacity: disabled ? 0.4 : 1 }}>
      {label && (
        <Text style={{ fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: theme.fgMuted, marginBottom: sp[1] }}>{label}</Text>
      )}
      <View style={{
        // Phone numbers read LTR everywhere — reverse the row in RTL so prefix stays leading.
        flexDirection: isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
        backgroundColor: theme.inputBg,
        borderWidth: 1, borderColor, borderRadius: r[2],
        minHeight: 40,
      }}>
        <View style={{ paddingHorizontal: sp[3], alignSelf: 'stretch', justifyContent: 'center', borderRightWidth: isRTL ? 0 : 1, borderLeftWidth: isRTL ? 1 : 0, borderColor: theme.divider }}>
          <Text style={{ fontFamily: font.mono, fontSize: fs[14], color: theme.fgMuted }}>{countryCode}</Text>
        </View>
        <TextInput
          ref={ref}
          {...rest}
          value={value}
          onChangeText={(t) => onChangeText(t.replace(/\D/g, '').slice(0, 12))}
          editable={!disabled}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          autoComplete="tel"
          accessibilityLabel={label || 'Phone number'}
          placeholderTextColor={theme.fgFaint}
          onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); rest.onBlur?.(e); }}
          style={{
            flex: 1,
            fontFamily: font.sans, fontSize: fs[16], color: theme.fg,
            paddingHorizontal: sp[3], paddingVertical: sp[2],
            textAlign: 'left', writingDirection: 'ltr',
          }}
        />
      </View>
      {(error || helper) && (
        <Text style={{ fontFamily: font.sans, fontSize: fs[12], color: error ? theme.danger : theme.fgFaint, marginTop: sp[1] }}>{error || helper}</Text>
      )}
    </View>
  );
});
