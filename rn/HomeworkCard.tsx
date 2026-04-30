/**
 * HomeworkCard — list-item for homework assignments.
 * Shows due date, title, subject, question count, and status.
 */
import React from 'react';
import { View, Text, Pressable, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, fs, fw, font, r } from './tokens';

type Status = 'pending' | 'in-progress' | 'submitted' | 'overdue' | 'graded';

interface HomeworkCardProps {
  title: string;
  subject: string;
  dueDate: string;
  questions: number;
  status?: Status;
  score?: string;
  onPress?: () => void;
}

export function HomeworkCard({ title, subject, dueDate, questions, status = 'pending', score, onPress }: HomeworkCardProps) {
  const { theme } = useTheme();

  const statusColor: Record<Status, string> = {
    pending: theme.fgFaint,
    'in-progress': theme.signalBright,
    submitted: theme.accent,
    overdue: theme.danger,
    graded: theme.accent,
  };

  const statusLabel: Record<Status, string> = {
    pending: 'Pending',
    'in-progress': 'In progress',
    submitted: 'Submitted',
    overdue: 'Overdue',
    graded: score ? `Graded · ${score}` : 'Graded',
  };

  const isOverdue = status === 'overdue';
  const isDone = status === 'submitted' || status === 'graded';

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sp[4],
    paddingVertical: sp[4],
    paddingHorizontal: sp[5],
    borderBottomWidth: 1,
    borderBottomColor: theme.divider,
  };

  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => [containerStyle, pressed && { backgroundColor: theme.hoverOverlay }]}>
      {/* Due date */}
      <View style={{ minWidth: 40 }}>
        <Text style={{ fontFamily: font.mono, fontSize: fs[12], color: isOverdue ? theme.danger : theme.fgFaint }}>{dueDate}</Text>
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: isDone ? theme.fgMuted : theme.fg }}>{title}</Text>
        <Text style={{ fontFamily: font.sans, fontSize: fs[12], color: theme.fgFaint, marginTop: sp[0.5] }}>{subject} · {questions} question{questions !== 1 ? 's' : ''}</Text>
      </View>

      {/* Status */}
      <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: statusColor[status] }}>{statusLabel[status]}</Text>
    </Pressable>
  );
}
