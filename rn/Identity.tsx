/**
 * Identity — user profile display combining Avatar, name, role, and metadata.
 * Used in crew lists, leaderboards, and session participant views.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeContext';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { sp, fs, fw, font } from './tokens';

interface IdentityProps {
  initials: string;
  name: string;
  role?: string;
  meta?: string;
  avatarColor?: 'default' | 'noon' | 'blue';
  star?: boolean;
  status?: 'online' | 'busy';
  badge?: string | number;
  right?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Identity({
  initials, name, role, meta, avatarColor, star, status, badge, right, size = 'md',
}: IdentityProps) {
  const { theme } = useTheme();
  const avatarSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md';
  const nameFs = size === 'sm' ? fs[13] : size === 'lg' ? fs[16] : fs[14];

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3] }}>
      <Avatar initials={initials} size={avatarSize} color={avatarColor} star={star} status={status} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[2] }}>
          <Text style={{ fontFamily: font.sans, fontSize: nameFs, fontWeight: fw[600], color: theme.fg }} numberOfLines={1}>{name}</Text>
          {badge !== undefined && <Badge variant="accent">{String(badge)}</Badge>}
        </View>
        {role && <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.fgSubtle, marginTop: sp[0.5] }}>{role}</Text>}
        {meta && <Text style={{ fontFamily: font.sans, fontSize: fs[12], color: theme.fgFaint, marginTop: sp[0.5] }}>{meta}</Text>}
      </View>
      {right}
    </View>
  );
}
