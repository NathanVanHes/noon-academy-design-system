/**
 * HomeworkCard — list-item for homework assignments.
 * States: due-soon, complete, overdue. No graded variant.
 * Shows title, subject, question count, and relative due time.
 */
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, fs, fw, font, r } from './tokens';

type Status = 'due-soon' | 'complete' | 'overdue';

interface HomeworkCardProps {
  title: string;
  subject: string;
  /** Relative time e.g. "Due in 4h", "Due tomorrow", "2 days overdue" */
  due: string;
  /** Number of questions */
  questions?: number;
  status?: Status;
  onPress?: () => void;
}

export function HomeworkCard({ title, subject, due, questions = 10, status = 'due-soon', onPress }: HomeworkCardProps) {
  const { theme } = useTheme();

  const statusColor: Record<Status, string> = {
    'due-soon': theme.signalBright,
    complete: theme.accent,
    overdue: theme.danger,
  };

  const statusLabel: Record<Status, string> = {
    'due-soon': due,
    complete: 'Complete',
    overdue: due,
  };

  const isDone = status === 'complete';
  const isOverdue = status === 'overdue';

  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => [{
      flexDirection: 'row', alignItems: 'center', gap: sp[4],
      paddingVertical: sp[4], paddingHorizontal: sp[5],
      borderBottomWidth: 1, borderBottomColor: theme.divider,
    }, pressed && { backgroundColor: theme.hoverOverlay }]}>
      {/* Content */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: isDone ? theme.fgMuted : theme.fg }}>{title}</Text>
        <Text style={{ fontFamily: font.sans, fontSize: fs[12], color: theme.fgFaint, marginTop: sp[0.5] }}>{subject} · {questions} questions</Text>
      </View>

      {/* Status / due */}
      <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: statusColor[status], fontWeight: isOverdue ? fw[600] : fw[500] }}>{statusLabel[status]}</Text>
    </Pressable>
  );
}
