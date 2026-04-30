/**
 * Alert — matches CSS exactly.
 * bg-raised, inset 1px border (all sides), r-2, sp-4/sp-5 padding.
 * Variants change border color only. Background stays bg-raised.
 */
import React from 'react';
import { View, Text, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font, color } from './tokens';

type Variant = 'info' | 'success' | 'warn' | 'danger';

interface AlertProps {
  title?: string;
  children: string;
  variant?: Variant;
}

export function Alert({ title, children, variant = 'info' }: AlertProps) {
  const { theme } = useTheme();

  // CSS: box-shadow: inset 0 0 0 1px var(--xxx-border) — RN: borderWidth + borderColor
  const borderMap: Record<Variant, string> = {
    info: theme.borderStrong,
    success: theme.accentBorder,
    warn: theme.signalBorder,
    danger: theme.dangerBorder,
  };

  // CSS: .alert { background: var(--bg-raised); } — same for ALL variants
  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    gap: sp[3],
    paddingVertical: sp[4],
    paddingHorizontal: sp[5],
    borderRadius: r[2],
    backgroundColor: theme.bgRaised,
    borderWidth: 1,
    borderColor: borderMap[variant],
  };

  // CSS: .alert__title { font-weight: fw-600; color: fg; font-size: fs-14; }
  const titleStyle: TextStyle = {
    fontFamily: font.sans,
    fontSize: fs[14],
    fontWeight: fw[600],
    color: theme.fg,
  };

  // CSS: .alert__body { color: fg-muted; font-size: fs-13; margin: 2px 0 0; }
  const bodyStyle: TextStyle = {
    fontFamily: font.sans,
    fontSize: fs[13],
    color: theme.fgMuted,
    marginTop: sp[0.5],
    lineHeight: fs[13] * 1.5,
  };

  return (
    <View accessibilityRole="alert" style={containerStyle}>
      <View style={{ flex: 1 }}>
        {title && <Text style={titleStyle}>{title}</Text>}
        <Text style={bodyStyle}>{children}</Text>
      </View>
    </View>
  );
}
