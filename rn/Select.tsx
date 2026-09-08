/**
 * Select — single-choice form field.
 * Field chrome matches Input (label, error, helper, disabled).
 * Options open in a BottomSheet; selected option shows a check.
 */
import React, { useState } from 'react';
import { View, Text, Pressable, type TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { BottomSheet } from './BottomSheet';
import { Icon } from './Icon';
import { sp, r, fs, fw, font } from './tokens';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  helper?: string;
  disabled?: boolean;
  /** BottomSheet title; defaults to label. */
  sheetTitle?: string;
}

export function Select({ options, value, onChange, label, placeholder = 'Select…', error, helper, disabled, sheetTitle }: SelectProps) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);
  const borderColor = error ? theme.danger : open ? theme.accent : theme.borderStrong;

  const labelStyle: TextStyle = {
    fontFamily: font.sans,
    fontSize: fs[12],
    fontWeight: fw[500],
    color: theme.fgMuted,
    marginBottom: sp[1],
  };

  const helperStyle: TextStyle = {
    fontFamily: font.sans,
    fontSize: fs[12],
    color: error ? theme.danger : theme.fgFaint,
    marginTop: sp[1],
  };

  return (
    <View style={{ opacity: disabled ? 0.4 : 1 }}>
      {label && <Text style={labelStyle}>{label}</Text>}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label || placeholder}
        accessibilityValue={selected ? { text: selected.label } : undefined}
        accessibilityState={{ disabled, expanded: open }}
        disabled={disabled}
        onPress={() => setOpen(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: sp[2],
          backgroundColor: theme.inputBg,
          borderWidth: 1,
          borderColor,
          borderRadius: r[2],
          paddingHorizontal: sp[3],
          paddingVertical: sp[2],
          minHeight: 40,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            fontFamily: font.sans,
            fontSize: fs[16],
            color: selected ? theme.fg : theme.fgFaint,
          }}
        >
          {selected ? selected.label : placeholder}
        </Text>
        <Icon name="chevron-down" size={16} color={theme.fgMuted} />
      </Pressable>
      {(error || helper) && <Text style={helperStyle}>{error || helper}</Text>}

      <BottomSheet visible={open} onClose={() => setOpen(false)} title={sheetTitle || label}>
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="menuitem"
              accessibilityState={{ selected: isSelected }}
              onPress={() => { onChange(option.value); setOpen(false); }}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                gap: sp[3],
                minHeight: 48,
                paddingVertical: sp[3],
                backgroundColor: pressed ? theme.activeOverlay : 'transparent',
              })}
            >
              <Text style={{
                flex: 1,
                fontFamily: font.sans,
                fontSize: fs[15],
                fontWeight: isSelected ? fw[600] : fw[400],
                color: theme.fg,
              }}>{option.label}</Text>
              {isSelected && <Icon name="check" size={18} color={theme.accentText} />}
            </Pressable>
          );
        })}
      </BottomSheet>
    </View>
  );
}
