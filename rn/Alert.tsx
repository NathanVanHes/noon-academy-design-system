/**
 * Alert — status messages with icon, coloured text, solid background.
 * Uses the same Icon component as BottomAction for consistency.
 */
import React from 'react';
import { View, Text, type ViewStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { Icon, type IconName } from './Icon';
import { sp, r, fs, fw, font, color, icon as iconTokens } from './tokens';

type Variant = 'info' | 'success' | 'warn' | 'danger';

interface AlertProps {
  title?: string;
  children: string;
  variant?: Variant;
  icon?: IconName;
}

const VARIANT_ICON: Record<Variant, IconName> = {
  info: 'info',
  success: 'check',
  warn: 'warning',
  danger: 'error',
};

const VARIANT_COLOR = (variant: Variant) => {
  return variant === 'success' ? color.noon[400] : variant === 'warn' ? color.gold[300] : variant === 'danger' ? color.danger[400] : undefined;
};

export function Alert({ title, children, variant = 'info', icon }: AlertProps) {
  const { theme } = useTheme();

  const styles: Record<Variant, { bg: string; border: string; titleColor: string; iconColor: string }> = {
    info: { bg: theme.bgRaised, border: theme.borderStrong, titleColor: theme.fg, iconColor: theme.fgMuted },
    success: { bg: theme.bgRaised, border: theme.accentBorder, titleColor: color.noon[400], iconColor: color.noon[400] },
    warn: { bg: theme.bgRaised, border: theme.signalBorder, titleColor: color.gold[300], iconColor: color.gold[300] },
    danger: { bg: theme.bgRaised, border: theme.dangerBorder, titleColor: color.danger[400], iconColor: color.danger[400] },
  };

  const s = styles[variant];

  return (
    <View accessibilityRole="alert" style={{
      flexDirection: 'row', gap: sp[3],
      paddingVertical: sp[4], paddingHorizontal: sp[4],
      borderRadius: r[2], backgroundColor: s.bg,
      borderWidth: 1, borderColor: s.border,
    }}>
      <Icon name={icon || VARIANT_ICON[variant]} size={iconTokens.lg} color={s.iconColor} />
      <View style={{ flex: 1 }}>
        {title && <Text style={{ fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[600], color: s.titleColor }}>{title}</Text>}
        <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginTop: title ? sp[0.5] : 0, lineHeight: fs[13] * 1.5 }}>{children}</Text>
      </View>
    </View>
  );
}
