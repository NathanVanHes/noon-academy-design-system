/**
 * CheckboxGroup — multi-selection from a list of labeled options.
 */
import React from 'react';
import { View } from 'react-native';
import { Checkbox } from './Checkbox';
import { sp } from './tokens';

interface CheckboxGroupProps {
  values: string[];
  onChange: (values: string[]) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
}

export function CheckboxGroup({ values, onChange, options, disabled }: CheckboxGroupProps) {
  return (
    <View style={{ gap: sp[3] }}>
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
