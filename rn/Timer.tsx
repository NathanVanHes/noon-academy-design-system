/**
 * Timer — self-ticking countdown for quizzes, live polls, and session starts.
 *
 * Mono digits. Goes terra when `warnAt` seconds remain.
 * Fires `onComplete` once when it hits zero.
 */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, fs, fw, font } from './tokens';

interface TimerProps {
  /** Starting value in seconds */
  seconds: number;
  /** Ticks while true (default true) */
  running?: boolean;
  /** Switch to warn colour at this many seconds left (default 10) */
  warnAt?: number;
  onComplete?: () => void;
  size?: 'sm' | 'md' | 'lg';
  /** 'pill' wraps the digits in a soft capsule */
  variant?: 'plain' | 'pill';
}

const FONT: Record<string, number> = { sm: fs[13], md: fs[18], lg: fs[28] };

function fmt(total: number) {
  const t = Math.max(0, total);
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

export function Timer({ seconds, running = true, warnAt = 10, onComplete, size = 'md', variant = 'plain' }: TimerProps) {
  const { theme } = useTheme();
  const [remaining, setRemaining] = useState(seconds);
  const done = useRef(false);

  // Reset when the starting value changes
  useEffect(() => { setRemaining(seconds); done.current = false; }, [seconds]);

  useEffect(() => {
    if (!running || remaining <= 0) return;
    const id = setInterval(() => setRemaining(v => v - 1), 1000);
    return () => clearInterval(id);
  }, [running, remaining > 0]);

  useEffect(() => {
    if (remaining <= 0 && !done.current) { done.current = true; onComplete?.(); }
  }, [remaining]);

  const warn = remaining <= warnAt;
  const digits = (
    <Text style={{
      fontFamily: font.mono, fontSize: FONT[size], fontWeight: fw[600],
      color: warn ? theme.terra : theme.fg,
      fontVariant: ['tabular-nums'],
    }}>{fmt(remaining)}</Text>
  );

  if (variant === 'pill') {
    return (
      <View style={{
        flexDirection: 'row', paddingHorizontal: sp[3], paddingVertical: sp[1],
        borderRadius: 999, borderWidth: 1,
        backgroundColor: warn ? theme.terraSoft : theme.bgSunken,
        borderColor: warn ? theme.terraBorder : theme.border,
      }}>{digits}</View>
    );
  }
  return digits;
}
