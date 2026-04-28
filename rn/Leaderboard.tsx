/**
 * Leaderboard — ranked list of crew members by score.
 * Top 3 highlighted. Current user always visible.
 * Uses Avatar + score + rank display.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeContext';
import { Avatar } from './Avatar';
import { sp, fs, fw, font, color, r } from './tokens';

interface LeaderboardEntry {
  initials: string;
  name: string;
  score: number;
  isCurrent?: boolean;
  avatarColor?: 'default' | 'noon' | 'iris';
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  label?: string;
  unit?: string;
}

export function Leaderboard({ entries, label = 'Rank', unit = 'jugs' }: LeaderboardProps) {
  const { theme } = useTheme();

  return (
    <View>
      {entries.map((entry, i) => {
        const rank = i + 1;
        const isTop3 = rank <= 3;
        const rankColors = [color.gold[400], color.chalk[300], color.gold[500]];

        return (
          <View key={i} style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: sp[3],
            paddingVertical: sp[3],
            paddingHorizontal: sp[3],
            borderBottomWidth: 1,
            borderBottomColor: theme.divider,
            backgroundColor: entry.isCurrent ? theme.selectedOverlay : 'transparent',
            borderRadius: entry.isCurrent ? r[2] : 0,
          }}>
            <Text style={{
              fontFamily: font.mono,
              fontSize: fs[12],
              fontWeight: fw[700],
              color: isTop3 ? rankColors[rank - 1] : theme.fgFaint,
              minWidth: 20,
              textAlign: 'center',
            }}>{rank}</Text>
            <Avatar initials={entry.initials} size="sm" color={entry.avatarColor} star={isTop3 && rank === 1} />
            <Text style={{
              fontFamily: font.sans,
              fontSize: fs[14],
              fontWeight: entry.isCurrent ? fw[600] : fw[400],
              color: theme.fg,
              flex: 1,
            }} numberOfLines={1}>{entry.name}</Text>
            <Text style={{
              fontFamily: font.mono,
              fontSize: fs[13],
              fontWeight: fw[600],
              color: isTop3 ? rankColors[rank - 1] : theme.fgMuted,
            }}>{entry.score}</Text>
          </View>
        );
      })}
    </View>
  );
}
