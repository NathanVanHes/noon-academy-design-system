/**
 * Divider — horizontal line separator.
 */
import React from 'react';
import { View } from 'react-native';
import { useTheme } from './ThemeContext';

export function Divider() {
  const { theme } = useTheme();
  return <View style={{ height: 1, backgroundColor: theme.divider }} />;
}
