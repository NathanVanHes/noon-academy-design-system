/**
 * SearchInput — a pill field that means "find", not "fill in".
 *
 * Search icon leads, clear button appears once there's text.
 * For forms, use Input; this is for filtering and lookup.
 */
import React, { forwardRef, useState } from 'react';
import { View, TextInput, Pressable, type TextInputProps } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, fs, font, icon } from './tokens';
import { Icon } from './Icon';

interface SearchInputProps extends Omit<TextInputProps, 'style'> {
  value: string;
  onChangeText: (text: string) => void;
  disabled?: boolean;
}

export const SearchInput = forwardRef<TextInput, SearchInputProps>(
  ({ value, onChangeText, disabled, placeholder = 'Search', ...rest }, ref) => {
    const { theme } = useTheme();
    const [focused, setFocused] = useState(false);

    return (
      <View style={{
        flexDirection: 'row', alignItems: 'center', gap: sp[2],
        backgroundColor: theme.inputBg,
        borderWidth: 1, borderColor: focused ? theme.accent : theme.borderStrong,
        borderRadius: 999, paddingHorizontal: sp[3], minHeight: 40,
        opacity: disabled ? 0.4 : 1,
      }}>
        <Icon name="search" size={icon.lg} color={theme.fgFaint} />
        <TextInput
          ref={ref}
          {...rest}
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          placeholder={placeholder}
          placeholderTextColor={theme.fgFaint}
          accessibilityRole="search"
          returnKeyType="search"
          onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); rest.onBlur?.(e); }}
          style={{ flex: 1, fontFamily: font.sans, fontSize: fs[16], color: theme.fg, paddingVertical: sp[2] }}
        />
        {value.length > 0 && (
          <Pressable
            onPress={() => onChangeText('')}
            accessibilityRole="button" accessibilityLabel="Clear search"
            hitSlop={8}
            style={({ pressed }) => ({
              width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
              backgroundColor: pressed ? theme.hoverOverlay : theme.bgSunken,
            })}
          >
            <Icon name="close" size={icon.sm} color={theme.fgMuted} />
          </Pressable>
        )}
      </View>
    );
  }
);
