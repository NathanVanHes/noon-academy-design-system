/**
 * AvatarGroup — overlapping faces with a "+N" overflow chip.
 *
 * Who's in class, who's in this group, who reacted.
 * RTL-safe: overlap uses marginStart, so the stack mirrors with direction.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeContext';
import { fs, fw, font } from './tokens';
import { Avatar } from './Avatar';

interface AvatarGroupItem {
  initials: string;
  imageUri?: string;
}

interface AvatarGroupProps {
  items: AvatarGroupItem[];
  /** Faces shown before collapsing to "+N" (default 4) */
  max?: number;
  size?: 'xs' | 'sm' | 'md';
  /** True headcount when `items` is a sample (e.g. 3 faces of 128 in class) */
  total?: number;
}

const DIMS: Record<string, number> = { xs: 24, sm: 32, md: 40 };
const COUNT_FONT: Record<string, number> = { xs: fs[9], sm: fs[10], md: fs[11] };

export function AvatarGroup({ items, max = 4, size = 'sm', total }: AvatarGroupProps) {
  const { theme } = useTheme();
  const dim = DIMS[size];
  const headcount = total ?? items.length;
  const shown = items.slice(0, headcount > max ? max - 1 : max);
  const rest = headcount - shown.length;
  const overlap = Math.round(dim / 3);
  const ring = { borderWidth: 2, borderColor: theme.bg, borderRadius: 999 };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }} accessibilityLabel={`${headcount} people`}>
      {shown.map((it, i) => (
        <View key={i} style={[ring, { marginStart: i === 0 ? 0 : -overlap, zIndex: i + 1 }]}>
          <Avatar initials={it.initials} imageUri={it.imageUri} size={size} />
        </View>
      ))}
      {rest > 0 && (
        <View style={[ring, {
          marginStart: shown.length === 0 ? 0 : -overlap, zIndex: shown.length + 1,
          width: dim + 4, height: dim + 4, alignItems: 'center', justifyContent: 'center',
          backgroundColor: theme.bgSunken,
        }]}>
          <Text style={{ fontFamily: font.mono, fontSize: COUNT_FONT[size], fontWeight: fw[600], color: theme.fgMuted }}>+{rest}</Text>
        </View>
      )}
    </View>
  );
}
