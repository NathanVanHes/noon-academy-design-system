/**
 * ListRow — settings/profile row: icon + label + value + chevron.
 *
 * The workhorse of Settings, Profile, and resource screens.
 * Stack rows inside a Card-like surface or plain list; rows draw their own divider.
 */
import React from 'react';
import { View, Text, Pressable, I18nManager } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, fs, fw, font, icon as iconTokens } from './tokens';
import { Icon, type IconName } from './Icon';

interface ListRowProps {
  label: string;
  /** Leading icon */
  icon?: IconName;
  /** Trailing value text, e.g. "Grade 11" */
  value?: string;
  /** Trailing custom node (e.g. a Switch). Replaces value + chevron. */
  right?: React.ReactNode;
  /** Danger rows (log out, delete) — terra-free, uses theme.danger */
  danger?: boolean;
  /** Hide the chevron on pressable rows */
  chevron?: boolean;
  /** Hide the bottom divider (use on the last row) */
  divider?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

export function ListRow({ label, icon, value, right, danger, chevron = true, divider = true, disabled, onPress }: ListRowProps) {
  const { theme } = useTheme();
  const isRTL = I18nManager.isRTL;
  const fg = danger ? theme.danger : theme.fg;

  const content = (
    <>
      {icon && <Icon name={icon} size={iconTokens.lg} color={danger ? theme.danger : theme.fgMuted} />}
      <Text style={{ fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: fg, flex: 1 }} numberOfLines={1}>{label}</Text>
      {right ?? (
        <>
          {value && <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }} numberOfLines={1}>{value}</Text>}
          {onPress && chevron && <Icon name={isRTL ? 'chevron-left' : 'chevron-right'} size={iconTokens.md} color={theme.fgFaint} />}
        </>
      )}
    </>
  );

  const rowStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: sp[3],
    minHeight: 52,
    paddingVertical: sp[3],
    borderBottomWidth: divider ? 1 : 0,
    borderBottomColor: theme.divider,
    opacity: disabled ? 0.4 : 1,
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label}
        style={({ pressed }) => [rowStyle, pressed && { backgroundColor: theme.hoverOverlay }]}
      >
        {content}
      </Pressable>
    );
  }
  return <View style={rowStyle}>{content}</View>;
}
