/**
 * RadioGroup — single selection from a list of labeled options.
 */
import React from 'react';
import { View } from 'react-native';
import { Radio } from './Radio';
import { sp } from './tokens';

interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
}

export function RadioGroup({ value, onChange, options, disabled }: RadioGroupProps) {
  return (
    <View style={{ gap: sp[3] }}>
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
