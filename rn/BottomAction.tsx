/**
 * BottomAction — fixed bottom tray for primary actions.
 * Supports feedback message with subtitle and icon, plus primary/secondary buttons.
 *
 * <BottomAction
 *   icon="check"
 *   message="Correct!"
 *   submessage="The answer is B — plentiful"
 *   messageVariant="accent"
 *   primary={{ label: 'Next', onPress: next }}
 * />
 */
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { useTheme } from './ThemeContext';
import { Button } from './Button';
import { Icon, type IconName } from './Icon';
import { sp, fs, fw, font, icon as iconTokens } from './tokens';

interface ActionButton {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
}

interface BottomActionProps {
  icon?: IconName;
  message?: string;
  submessage?: string;
  messageVariant?: 'default' | 'accent' | 'danger';
  primary?: ActionButton;
  secondary?: ActionButton;
}

export function BottomAction({ icon, message, submessage, messageVariant = 'default', primary, secondary }: BottomActionProps) {
  const { theme } = useTheme();
  const insets = useContext(SafeAreaInsetsContext) || { bottom: 0 };

  const messageColor = messageVariant === 'accent' ? theme.accent : messageVariant === 'danger' ? theme.danger : theme.fg;

  return (
    <View style={{
      paddingHorizontal: sp[5],
      paddingTop: sp[4],
      paddingBottom: Math.max(sp[4], insets.bottom),
      borderTopWidth: 1,
      borderTopColor: theme.border,
      backgroundColor: theme.bgOverlay,
      gap: sp[3],
    }}>
      {message && (
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: sp[3] }}>
          {icon && <Icon name={icon} size={iconTokens.lg} color={messageColor} />}
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[600], color: messageColor }}>{message}</Text>
            {submessage && <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginTop: sp[0.5] }}>{submessage}</Text>}
          </View>
        </View>
      )}
      <View style={{ flexDirection: 'row', gap: sp[3] }}>
        {secondary && (
          <View style={{ flex: 1 }}>
            <Button variant={secondary.variant || 'secondary'} fullWidth disabled={secondary.disabled} onPress={secondary.onPress}>{secondary.label}</Button>
          </View>
        )}
        {primary && (
          <View style={{ flex: 1 }}>
            <Button variant={primary.variant || 'primary'} fullWidth disabled={primary.disabled} onPress={primary.onPress}>{primary.label}</Button>
          </View>
        )}
      </View>
    </View>
  );
}
