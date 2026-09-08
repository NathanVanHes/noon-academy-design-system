/**
 * VideoTile — the in-class video surface: teacher stage or student tile.
 *
 * Always dark, regardless of theme — video sits on void.
 * States: live (accent dot), muted (mic-off), reconnecting (dimmed),
 * audio-only (avatar, no video). Pass the real video node as children.
 */
import React from 'react';
import { View, Text, type ViewStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font, icon, color } from './tokens';
import { Icon } from './Icon';
import { Avatar } from './Avatar';

type VideoTileState = 'live' | 'muted' | 'reconnecting' | 'audio-only';

interface VideoTileProps {
  name: string;
  /** e.g. "Teacher" */
  role?: string;
  state?: VideoTileState;
  /** Fallback face for audio-only */
  initials?: string;
  /** The actual video surface (RTC view, Image, …) — fills the tile */
  children?: React.ReactNode;
  /** Default 16/9 */
  aspectRatio?: number;
  style?: ViewStyle;
}

const CREAM = color.chalk[100];

export function VideoTile({ name, role, state = 'live', initials, children, aspectRatio = 16 / 9, style }: VideoTileProps) {
  const { theme } = useTheme();
  const showVideo = state !== 'audio-only' && children;

  return (
    <View style={[{
      aspectRatio, borderRadius: r[3], overflow: 'hidden',
      backgroundColor: color.void[400],
      alignItems: 'center', justifyContent: 'center',
    }, style]}>
      {showVideo && <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>{children}</View>}

      {state === 'audio-only' && (
        <Avatar initials={initials || name.slice(0, 2).toUpperCase()} size="lg" />
      )}

      {state === 'reconnecting' && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(13,16,22,0.7)', alignItems: 'center', justifyContent: 'center', gap: sp[2] }}>
          <Text style={{ fontFamily: font.mono, fontSize: fs[11], letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(241,235,221,0.7)' }}>Reconnecting…</Text>
        </View>
      )}

      {/* Name strap */}
      <View style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        flexDirection: 'row', alignItems: 'center', gap: sp[2],
        paddingHorizontal: sp[3], paddingVertical: sp[2],
        backgroundColor: 'rgba(13,16,22,0.72)',
      }}>
        {state === 'muted'
          ? <Icon name="mic-off" size={icon.md} color={theme.terra} />
          : state === 'live'
            ? <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: theme.accent }} />
            : null}
        <Text style={{ fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: CREAM, flex: 1 }} numberOfLines={1}>{name}</Text>
        {role ? <Text style={{ fontFamily: font.mono, fontSize: fs[9], letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(241,235,221,0.55)' }}>{role}</Text> : null}
      </View>
    </View>
  );
}
