/**
 * RadioGroup — single selection from a list of labeled options.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeContext';
import { Radio } from './Radio';
import { sp, fs, fw, font } from './tokens';

interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  title?: string;
  disabled?: boolean;
}

export function RadioGroup({ value, onChange, options, title, disabled }: RadioGroupProps) {
  const { theme } = useTheme();
  return (
    <View style={{ gap: sp[3] }}>
      {title && <Text style={{ fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: theme.fgMuted, marginBottom: sp[2] }}>{title}</Text>}
      {options.map(opt => (
        <Radio
          key={opt.value}
          selected={value === opt.value}
          onSelect={() => onChange(opt.value)}
          label={opt.label}
          disabled={disabled}
        />
      ))}
    </View>
  );
}
