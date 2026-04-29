/**
 * CheckboxGroup — multi-selection from a list of labeled options.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeContext';
import { Checkbox } from './Checkbox';
import { sp, fs, fw, font } from './tokens';

interface CheckboxGroupProps {
  values: string[];
  onChange: (values: string[]) => void;
  options: { value: string; label: string }[];
  title?: string;
  disabled?: boolean;
}

export function CheckboxGroup({ values, onChange, options, title, disabled }: CheckboxGroupProps) {
  const { theme } = useTheme();
  return (
    <View style={{ gap: sp[3] }}>
      {title && <Text style={{ fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: theme.fgMuted, marginBottom: sp[2] }}>{title}</Text>}
      {options.map(opt => (
        <Checkbox
          key={opt.value}
          checked={values.includes(opt.value)}
          onValueChange={(checked) => {
            onChange(checked ? [...values, opt.value] : values.filter(v => v !== opt.value));
          }}
          label={opt.label}
          disabled={disabled}
        />
      ))}
    </View>
  );
}
