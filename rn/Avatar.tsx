/**
 * Avatar — sizes xs-xl, noon/blue variants, status indicators, optional image.
 */
import React from 'react';
import { View, Text, Image, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, fs, fw, font, r, icon, color as colorTokens } from './tokens';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ColorVariant = 'default' | 'noon' | 'blue';
type StatusType = 'online' | 'busy';

interface AvatarProps {
  initials: string;
  imageUri?: string;
  size?: Size;
  color?: ColorVariant;
  status?: StatusType;
}

// Matches CSS: avatar--xs through avatar--xl
const sizes: Record<Size, number> = { xs: 24, sm: 32, md: 40, lg: 56, xl: 72 };
const fontSizes: Record<Size, number> = { xs: fs[11], sm: fs[13], md: fs[16], lg: fs[22], xl: fs[28] };

export function Avatar({ initials, imageUri, size = 'sm', color = 'default', status }: AvatarProps) {
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
    blue: colorTokens.chalk[100],
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

  // Status dot — scales with avatar size
  const statusDim = Math.max(8, Math.round(dim * 0.28));
  const statusBorder = Math.max(2, Math.round(dim * 0.06));
  const statusStyle: ViewStyle = {
    position: 'absolute',
    right: -Math.round(statusBorder / 2),
    bottom: -Math.round(statusBorder / 2),
    width: statusDim,
    height: statusDim,
    borderRadius: statusDim / 2,
    backgroundColor: status === 'online' ? theme.accent : colorTokens.danger[400],
    borderWidth: statusBorder,
    borderColor: theme.bg,
  };

  return (
    <View style={containerStyle}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={{ width: dim - 2, height: dim - 2, borderRadius: (dim - 2) / 2 }} />
      ) : (
        <Text style={textStyle}>{initials}</Text>
      )}
      {status && <View style={statusStyle} />}
    </View>
  );
}
