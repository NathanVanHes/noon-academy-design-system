/**
 * SessionCard — list-item for scheduled classes.
 * States: upcoming, soon, live, done, cancelled.
 */
import React from 'react';
import { View, Text, Pressable, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { Chip } from './Chip';
import { sp, fs, fw, font, r } from './tokens';

type State = 'upcoming' | 'soon' | 'live' | 'done' | 'cancelled';

interface SessionCardProps {
  time: string;
  title: string;
  meta: string;
  state?: State;
  statusText?: string;
  onPress?: () => void;
}

export function SessionCard({ time, title, meta, state = 'upcoming', statusText, onPress }: SessionCardProps) {
  const { theme } = useTheme();

  const indicatorColor: Record<State, string> = {
    upcoming: theme.border,
    soon: theme.signalBright,
    live: theme.accent,
    done: theme.fgFaint,
    cancelled: theme.danger,
  };

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sp[4],
    paddingVertical: sp[4],
    paddingHorizontal: sp[5],
    borderBottomWidth: 1,
    borderBottomColor: theme.divider,
  };

  const timeStyle: TextStyle = {
    fontFamily: font.mono,
    fontSize: fs[12],
    color: theme.fgFaint,
    minWidth: 40,
  };

  const indicatorStyle: ViewStyle = {
    width: sp[1],
    height: sp[1],
    borderRadius: r.pill,
    backgroundColor: indicatorColor[state],
  };

  const titleStyle: TextStyle = {
    fontFamily: font.sans,
    fontSize: fs[14],
    fontWeight: fw[500],
    color: state === 'done' ? theme.fgMuted : theme.fg,
  };

  const metaStyle: TextStyle = {
    fontFamily: font.sans,
    fontSize: fs[12],
    color: theme.fgFaint,
    marginTop: sp[0.5],
  };

  function renderStatus() {
    if (state === 'live') return <Chip variant="signal" dot>Live</Chip>;
    if (state === 'soon') return <Text style={{ fontFamily: font.mono, fontSize: fs[12], color: theme.signalBright }}>Soon</Text>;
    if (state === 'done') return <Text style={{ fontFamily: font.mono, fontSize: fs[12], color: theme.fgMuted }}>Ended</Text>;
    if (state === 'cancelled') return <Text style={{ fontFamily: font.mono, fontSize: fs[12], color: theme.danger }}>Cancelled</Text>;
    return <Text style={{ fontFamily: font.mono, fontSize: fs[12], color: theme.fgMuted }}>{statusText || ''}</Text>;
  }

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [containerStyle, pressed && { backgroundColor: theme.hoverOverlay }]}>
      <Text style={timeStyle}>{time}</Text>
      <View style={indicatorStyle} />
      <View style={{ flex: 1 }}>
        <Text style={titleStyle}>{title}</Text>
        <Text style={metaStyle}>{meta}</Text>
      </View>
      <View style={{ minWidth: sp[9], alignItems: 'flex-end' }}>
        {renderStatus()}
      </View>
    </Pressable>
  );
}
