/**
 * StreakTracker — days-in-a-row, this week at a glance.
 *
 * Gold (signal) diamonds — a streak is something earned.
 * Today in progress is water; missed days stay quiet, not shameful.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font } from './tokens';

export type StreakDay = 'done' | 'missed' | 'today' | 'upcoming';

interface StreakTrackerProps {
  /** Days in a row */
  count: number;
  /** The week, oldest first */
  days: StreakDay[];
  /** One letter per day, same order as days */
  labels?: string[];
}

const D = 10;

export function StreakTracker({ count, days, labels }: StreakTrackerProps) {
  const { theme } = useTheme();

  const diamond = (day: StreakDay) => {
    const base = { width: D, height: D, transform: [{ rotate: '45deg' }] as any };
    switch (day) {
      case 'done': return { ...base, backgroundColor: theme.signal };
      case 'today': return { ...base, borderWidth: 1.5, borderColor: theme.water };
      case 'missed': return { ...base, borderWidth: 1, borderColor: theme.fgFaint, opacity: 0.5 };
      case 'upcoming': return { ...base, borderWidth: 1, borderColor: theme.border, borderStyle: 'dashed' as const };
    }
  };

  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', gap: sp[5],
      backgroundColor: theme.bgRaised, borderWidth: 1, borderColor: theme.border,
      borderRadius: r[3], padding: sp[4],
    }}>
      <View>
        <Text style={{ fontFamily: font.serif, fontSize: fs[28], fontWeight: fw[600], color: theme.signalText }}>{count}</Text>
        <Text style={{ fontFamily: font.mono, fontSize: fs[9], letterSpacing: 1, textTransform: 'uppercase', color: theme.fgFaint }}>day streak</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        {days.map((day, i) => (
          <View key={i} style={{ alignItems: 'center', gap: sp[2], width: 20 }}>
            <View style={{ height: D + 4, justifyContent: 'center' }}>
              <View style={diamond(day)} />
            </View>
            {labels?.[i] ? <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgFaint }}>{labels[i]}</Text> : null}
          </View>
        ))}
      </View>
    </View>
  );
}
