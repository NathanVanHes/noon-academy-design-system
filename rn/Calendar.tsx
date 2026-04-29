/**
 * Calendar — week strip by default, drag handle to expand to full month.
 * Fully self-contained, no third-party dependencies.
 */
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, Pressable, Animated, PanResponder, Easing, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font, icon, dur } from './tokens';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const FULL_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const DAY_SIZE = 40;

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  events?: Record<string, { count?: number; assessment?: boolean }>;
  expanded?: boolean;
  onToggle?: () => void;
  backIcon?: React.ReactNode;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

function buildGrid(year: number, month: number) {
  const first = new Date(year, month, 1).getDay();
  const dim = new Date(year, month + 1, 0).getDate();
  const prevDim = new Date(year, month, 0).getDate();
  const days: { d: number; m: number; y: number; outside: boolean }[] = [];
  for (let i = first - 1; i >= 0; i--) days.push({ d: prevDim - i, m: month - 1, y: year, outside: true });
  for (let d = 1; d <= dim; d++) days.push({ d, m: month, y: year, outside: false });
  while (days.length % 7 !== 0) days.push({ d: days.length - first - dim + 1, m: month + 1, y: year, outside: true });
  const weeks: typeof days[] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return weeks;
}

function dateKey(d: number, m: number, y: number) { return `${y}-${m}-${d}`; }

export function Calendar({ selected: selectedProp, onSelect, events, expanded: expandedProp, onToggle, backIcon, onBack, rightAction }: CalendarProps) {
  const { theme } = useTheme();
  const now = new Date();
  const [internalSelected, setInternalSelected] = useState(selectedProp || now);
  const [internalExpanded, setInternalExpanded] = useState(false);
  const [viewMonth, setViewMonth] = useState((selectedProp || now).getMonth());
  const [viewYear, setViewYear] = useState((selectedProp || now).getFullYear());

  const sel = selectedProp || internalSelected;
  const isExpanded = expandedProp !== undefined ? expandedProp : internalExpanded;

  const weeks = useMemo(() => buildGrid(viewYear, viewMonth), [viewYear, viewMonth]);

  const activeWeekIdx = weeks.findIndex(w =>
    w.some(d => !d.outside && d.d === sel.getDate() && d.m === sel.getMonth() && d.y === sel.getFullYear())
  );
  const todayWeekIdx = weeks.findIndex(w =>
    w.some(d => !d.outside && d.d === now.getDate() && d.m === now.getMonth() && d.y === now.getFullYear())
  );
  const shownWeekIdx = Math.max(0, activeWeekIdx >= 0 ? activeWeekIdx : todayWeekIdx);

  const isToday = (d: number, m: number) => d === now.getDate() && m === now.getMonth() && viewYear === now.getFullYear();
  const isSelected = (d: number, m: number) => d === sel.getDate() && m === sel.getMonth() && viewYear === sel.getFullYear();

  function handleSelect(d: number, m: number) {
    const date = new Date(viewYear, m, d);
    if (onSelect) onSelect(date);
    else setInternalSelected(date);
    if (m < viewMonth) prev();
    else if (m > viewMonth) next();
  }

  function prev() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  }

  function next() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  }

  function goToday() {
    setViewMonth(now.getMonth());
    setViewYear(now.getFullYear());
    if (onSelect) onSelect(now);
    else setInternalSelected(now);
  }

  function toggle() {
    LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'));
    if (onToggle) onToggle();
    else setInternalExpanded(!internalExpanded);
  }

  // Drag to expand/collapse
  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: (_, gs) => Math.abs(gs.dy) > 5,
    onPanResponderRelease: (_, gs) => {
      if (gs.dy > 20) {
        // Drag down = expand
        LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'));
        if (onToggle) onToggle();
        else setInternalExpanded(true);
      } else if (gs.dy < -20) {
        // Drag up = collapse
        LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'));
        if (onToggle) onToggle();
        else setInternalExpanded(false);
      }
    },
  })).current;

  const title = isExpanded
    ? `${MONTHS[viewMonth]} ${viewYear}`
    : `${FULL_DAYS[sel.getDay()]}, ${MONTHS[sel.getMonth()]} ${sel.getDate()}`;

  const isTodaySelected = sel.getDate() === now.getDate() && sel.getMonth() === now.getMonth() && sel.getFullYear() === now.getFullYear();

  function renderDay(day: { d: number; m: number; y: number; outside: boolean }, di: number) {
    const today = isToday(day.d, day.m);
    const selected = isSelected(day.d, day.m);
    const evt = events?.[dateKey(day.d, day.m, day.y)];
    const evtCount = evt?.count || 0;
    const isAssessment = evt?.assessment || false;

    // Assessment days get gold treatment, regular selected gets accent
    const dayBg = selected
      ? (isAssessment ? theme.signal : theme.accent)
      : today
        ? (isAssessment ? theme.signalBorder : theme.accentSoft)
        : isAssessment
          ? theme.signalBorder
          : 'transparent';

    const dayFg = selected
      ? (isAssessment ? theme.fg : theme.accentFg)
      : day.outside
        ? theme.fgFaint
        : today
          ? (isAssessment ? theme.signal : theme.accent)
          : isAssessment
            ? theme.signal
            : theme.fg;

    return (
      <Pressable
        key={di}
        onPress={() => handleSelect(day.d, day.m)}
        style={{
          flex: 1, alignItems: 'center', justifyContent: 'center',
          height: DAY_SIZE + sp[2],
        }}
      >
        <View style={{
          width: DAY_SIZE, height: DAY_SIZE, borderRadius: DAY_SIZE / 2,
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: dayBg,
          ...(isAssessment && !selected ? { borderWidth: 1, borderColor: theme.signalBorder } : {}),
        }}>
          <Text style={{
            fontFamily: font.sans, fontSize: fs[14],
            fontWeight: selected || today || isAssessment ? fw[600] : fw[400],
            color: dayFg,
          }}>{day.d}</Text>
          {/* Event diamond — inside circle, top right. icon.sm matching RouteSteps. */}
          {evtCount > 0 && (
            <View style={{
              position: 'absolute', top: 1, right: 1,
              width: icon.sm, height: icon.sm,
              backgroundColor: theme.signal,
              transform: [{ rotate: '45deg' }],
            }} />
          )}
        </View>
      </Pressable>
    );
  }

  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: theme.border }}>
      {/* Header — matches TitleBar: sp[5] horizontal, sp[3] vertical, minHeight 56, font.sans fs[16] fw[600] */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: sp[5], paddingVertical: sp[3], minHeight: 56, gap: sp[3] }}>
        {onBack && (
          <Pressable onPress={onBack} hitSlop={8}>
            {backIcon || <Text style={{ fontSize: fs[20], color: theme.fgMuted }}>‹</Text>}
          </Pressable>
        )}
        <Text style={{ fontFamily: font.sans, fontSize: fs[16], fontWeight: fw[600], color: theme.fg, flex: 1 }} numberOfLines={1}>{title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[2] }}>
          {!isTodaySelected && (
            <Pressable onPress={goToday} style={{ paddingHorizontal: sp[3], paddingVertical: sp[1], borderRadius: r[1], borderWidth: 1, borderColor: theme.border }}>
              <Text style={{ fontFamily: font.sans, fontSize: fs[11], color: theme.fgMuted }}>Today</Text>
            </Pressable>
          )}
          <Pressable onPress={prev} hitSlop={4} style={{ padding: sp[1] }}>
            <Text style={{ fontSize: fs[18], color: theme.fgMuted }}>‹</Text>
          </Pressable>
          <Pressable onPress={next} hitSlop={4} style={{ padding: sp[1] }}>
            <Text style={{ fontSize: fs[18], color: theme.fgMuted }}>›</Text>
          </Pressable>
          {rightAction}
        </View>
      </View>

      {/* Weekday headers */}
      <View style={{ flexDirection: 'row', paddingHorizontal: sp[4] }}>
        {DAY_NAMES.map(d => (
          <View key={d} style={{ flex: 1, alignItems: 'center', paddingVertical: sp[1] }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, textTransform: 'uppercase' }}>{d}</Text>
          </View>
        ))}
      </View>

      {/* Day grid */}
      <View style={{ paddingHorizontal: sp[4], overflow: 'hidden' }}>
        {weeks.map((week, wi) => {
          if (!isExpanded && wi !== shownWeekIdx) return null;
          return (
            <View key={wi} style={{ flexDirection: 'row' }}>
              {week.map((day, di) => renderDay(day, di))}
            </View>
          );
        })}
      </View>

      {/* Drag handle */}
      <View {...panResponder.panHandlers}>
        <Pressable onPress={toggle} style={{ alignItems: 'center', paddingVertical: sp[3] }}>
          <View style={{ width: sp[7], height: 3, borderRadius: 1.5, backgroundColor: theme.fgFaint, opacity: 0.4 }} />
        </Pressable>
      </View>
    </View>
  );
}
