/**
 * EmptyState — shown when a screen or section has no content.
 */
import React from 'react';
import { View, Text, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { Button } from './Button';
import { sp, fs, fw, font } from './tokens';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, body, actionLabel, onAction }: EmptyStateProps) {
  const { theme } = useTheme();

  const containerStyle: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: sp[10],
    paddingHorizontal: sp[6],
  };

  const titleStyle: TextStyle = {
    fontFamily: font.serif,
    fontSize: fs[18],
    fontWeight: fw[500],
    color: theme.fg,
    marginTop: icon ? sp[4] : 0,
    marginBottom: sp[2],
    textAlign: 'center',
  };

  const bodyStyle: TextStyle = {
    fontFamily: font.sans,
    fontSize: fs[14],
    color: theme.fgMuted,
    lineHeight: fs[14] * 1.5,
    textAlign: 'center',
    maxWidth: 280,
  };

  return (
    <View style={containerStyle}>
      {icon}
      <Text style={titleStyle}>{title}</Text>
      <Text style={bodyStyle}>{body}</Text>
      {actionLabel && onAction && (
        <View style={{ marginTop: sp[5] }}>
          <Button variant="primary" onPress={onAction}>{actionLabel}</Button>
        </View>
      )}
    </View>
  );
}
