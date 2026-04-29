/**
 * Avatar — sizes xs-xl, noon/blue variants, star + status indicators.
 */
import React from 'react';
import { View, Text, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, fs, fw, font, r, icon, color as colorTokens } from './tokens';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ColorVariant = 'default' | 'noon' | 'blue';
type StatusType = 'online' | 'busy';

interface AvatarProps {
  initials: string;
  size?: Size;
  color?: ColorVariant;
  star?: boolean;
  status?: StatusType;
}

// Matches CSS: avatar--xs through avatar--xl
const sizes: Record<Size, number> = { xs: 24, sm: 32, md: 40, lg: 56, xl: 72 };
const fontSizes: Record<Size, number> = { xs: fs[11], sm: fs[13], md: fs[16], lg: fs[22], xl: fs[28] };

export function Avatar({ initials, size = 'sm', color = 'default', star, status }: AvatarProps) {
  const { theme } = useTheme();
  const dim = sizes[size];

  const bgMap: Record<ColorVariant, string> = {
    default: theme.bgOverlay,
    noon: theme.accent,
    blue: colorTokens.blue[400],
  };

  const fgMap: Record<ColorVariant, string> = {
    default: theme.fgMuted,
    noon: theme.accentFg,
    blue: '#ffffff',
  };

  const containerStyle: ViewStyle = {
    width: dim,
    height: dim,
    borderRadius: dim / 2,
    backgroundColor: bgMap[color],
    alignItems: 'center',
    justifyContent: 'center',
    // CSS: box-shadow: inset 0 0 0 1px — approximated as borderWidth
    borderWidth: 1,
    borderColor: color === 'default' ? theme.borderStrong : bgMap[color],
    position: 'relative',
  };

  // CSS: font-family: font-serif; font-weight: fw-500;
  const textStyle: TextStyle = {
    fontFamily: font.serif,
    fontSize: fontSizes[size],
    fontWeight: fw[500],
    color: fgMap[color],
  };

  // CSS: .avatar__star — gold diamond at bottom-end
  const starStyle: ViewStyle = {
    position: 'absolute',
    right: -sp[0.5],
    bottom: -sp[0.5],
    width: icon.md,
    height: icon.md,
    backgroundColor: theme.signalBright,
    transform: [{ rotate: '45deg' }],
  };

  // CSS: .avatar__status — dot with bg ring
  const statusStyle: ViewStyle = {
    position: 'absolute',
    right: -1,
    bottom: -1,
    width: icon.sm,
    height: icon.sm,
    borderRadius: icon.sm / 2,
    backgroundColor: status === 'online' ? theme.accent : colorTokens.danger[400],
    borderWidth: sp[0.5],
    borderColor: theme.bg,
  };

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{initials}</Text>
      {star && <View style={starStyle} />}
      {status && <View style={statusStyle} />}
    </View>
  );
}
