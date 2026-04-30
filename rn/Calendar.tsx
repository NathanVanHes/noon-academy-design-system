/**
 * Calendar — week strip by default, drag handle to expand to full month.
 * Fully self-contained, no third-party dependencies.
 * RTL-aware: respects I18nManager.isRTL for layout direction.
 * Locale: pass `locale` prop to override day/month names and week start.
 */
import React, { useState, useMemo, useRef } from 'react';
import { View, Text, Pressable, PanResponder, LayoutAnimation, Platform, UIManager, I18nManager } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font, icon, dur } from './tokens';
import { Button } from './Button';
import { IconButton } from './IconButton';
import { Icon } from './Icon';
import { WaypointMarker } from './Waypoints';

const EN_DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const EN_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const EN_FULL_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const AR_DAY_NAMES = ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'];
const AR_MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
const AR_FULL_DAYS = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

export interface CalendarLocale {
  dayNames: string[];
  months: string[];
  fullDays: string[];
  weekStart: number;
  today: string;
}

const EN_LOCALE: CalendarLocale = { dayNames: EN_DAY_NAMES, months: EN_MONTHS, fullDays: EN_FULL_DAYS, weekStart: 0, today: 'Today' };
const AR_LOCALE: CalendarLocale = { dayNames: AR_DAY_NAMES, months: AR_MONTHS, fullDays: AR_FULL_DAYS, weekStart: 0, today: 'اليوم' };

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
  locale?: CalendarLocale | 'ar';
}

function buildGrid(year: number, month: number, weekStart: number = 0) {
  const firstDow = new Date(year, month, 1).getDay();
  const offset = (firstDow - weekStart + 7) % 7;
  const dim = new Date(year, month + 1, 0).getDate();
  const prevDim = new Date(year, month, 0).getDate();
  const days: { d: number; m: number; y: number; outside: boolean }[] = [];
  for (let i = offset - 1; i >= 0; i--) days.push({ d: prevDim - i, m: month - 1, y: year, outside: true });
  for (let d = 1; d <= dim; d++) days.push({ d, m: month, y: year, outside: false });
  while (days.length % 7 !== 0) days.push({ d: days.length - offset - dim + 1, m: month + 1, y: year, outside: true });
  const weeks: typeof days[] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return weeks;
}

function dateKey(d: number, m: number, y: number) { return `${y}-${m}-${d}`; }

export function Calendar({ selected: selectedProp, onSelect, events, expanded: expandedProp, onToggle, backIcon, onBack, rightAction, locale: localeProp }: CalendarProps) {
  const { theme } = useTheme();
  const isRTL = I18nManager.isRTL;
  const loc: CalendarLocale = localeProp === 'ar' ? AR_LOCALE : localeProp || (isRTL ? AR_LOCALE : EN_LOCALE);
  const reorderedDayNames = useMemo(() => {
    const arr = [...loc.dayNames];
    const start = loc.weekStart;
    return [...arr.slice(start), ...arr.slice(0, start)];
  }, [loc.dayNames, loc.weekStart]);
  const now = new Date();
  const [internalSelected, setInternalSelected] = useState(selectedProp || now);
  const [internalExpanded, setInternalExpanded] = useState(false);
  const [viewMonth, setViewMonth] = useState((selectedProp || now).getMonth());
  const [viewYear, setViewYear] = useState((selectedProp || now).getFullYear());

  const sel = selectedProp || internalSelected;
  const isExpanded = expandedProp !== undefined ? expandedProp : internalExpanded;

  const weeks = useMemo(() => buildGrid(viewYear, viewMonth, loc.weekStart), [viewYear, viewMonth, loc.weekStart]);

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
    if (isExpanded) {
      const newMonth = viewMonth === 0 ? 11 : viewMonth - 1;
      const newYear = viewMonth === 0 ? viewYear - 1 : viewYear;
      setViewMonth(newMonth);
      setViewYear(newYear);
      const d = new Date(newYear, newMonth, 1);
      if (onSelect) onSelect(d);
      else setInternalSelected(d);
    } else {
      const d = new Date(sel.getFullYear(), sel.getMonth(), sel.getDate() - 1);
      if (onSelect) onSelect(d);
      else setInternalSelected(d);
      setViewMonth(d.getMonth());
      setViewYear(d.getFullYear());
    }
  }

  function next() {
    if (isExpanded) {
      const newMonth = viewMonth === 11 ? 0 : viewMonth + 1;
      const newYear = viewMonth === 11 ? viewYear + 1 : viewYear;
      setViewMonth(newMonth);
      setViewYear(newYear);
      const d = new Date(newYear, newMonth, 1);
      if (onSelect) onSelect(d);
      else setInternalSelected(d);
    } else {
      const d = new Date(sel.getFullYear(), sel.getMonth(), sel.getDate() + 1);
      if (onSelect) onSelect(d);
      else setInternalSelected(d);
      setViewMonth(d.getMonth());
      setViewYear(d.getFullYear());
    }
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
        LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'));
        if (onToggle) onToggle();
        else setInternalExpanded(true);
      } else if (gs.dy < -20) {
        LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'));
        if (onToggle) onToggle();
        else setInternalExpanded(false);
      }
    },
  })).current;

  const title = isExpanded
    ? `${loc.months[viewMonth]} ${viewYear}`
    : `${loc.fullDays[sel.getDay()]}, ${loc.months[sel.getMonth()]} ${sel.getDate()}`;

  const isTodaySelected = sel.getDate() === now.getDate() && sel.getMonth() === now.getMonth() && sel.getFullYear() === now.getFullYear();

  function renderDay(day: { d: number; m: number; y: number; outside: boolean }, di: number) {
    const today = isToday(day.d, day.m);
    const selected = isSelected(day.d, day.m);
    const evt = events?.[dateKey(day.d, day.m, day.y)];
    const evtCount = evt?.count || 0;
    const isAssessment = evt?.assessment || false;

    // Day cell colours — assessment signalled by diamond only, not bg/fg tint
    const dayBg = selected ? theme.accent : today ? theme.accentSoft : 'transparent';
    const dayFg = selected ? theme.accentFg : day.outside ? theme.fgFaint : today ? theme.accent : theme.fg;

    return (
      <Pressable
        key={di}
        onPress={() => handleSelect(day.d, day.m)}
        accessibilityRole="button"
        accessibilityState={{ selected }}
        style={{
          flex: 1, alignItems: 'center', justifyContent: 'center',
          height: DAY_SIZE + sp[2],
        }}
      >
        <View style={{
          width: DAY_SIZE, height: DAY_SIZE, borderRadius: DAY_SIZE / 2,
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: dayBg, overflow: 'visible',
        }}>
          <Text style={{
            fontFamily: font.sans, fontSize: fs[14],
            fontWeight: selected || today ? fw[600] : fw[400],
            color: dayFg,
          }}>{day.d}</Text>
          {/* Event diamond — uses WaypointMarker directly */}
          {evtCount > 0 && (() => {
            const dayDate = new Date(day.y, day.m, day.d);
            const isPast = dayDate < new Date(now.getFullYear(), now.getMonth(), now.getDate());
            return (
              <View style={{ position: 'absolute', top: 0, right: 0, overflow: 'visible', zIndex: 10 }}>
                <WaypointMarker state={isPast ? 'done' : 'current'} />
              </View>
            );
          })()}
        </View>
      </Pressable>
    );
  }

  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: theme.border }}>
      {/* Header — matches TitleBar: sp[5] horizontal, sp[3] vertical, minHeight 56, font.sans fs[16] fw[600] */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: sp[5], paddingVertical: sp[3], minHeight: 56, gap: sp[3] }}>
        {onBack && (
          <Pressable onPress={onBack} hitSlop={8} accessibilityRole="button" accessibilityLabel="Back">
            {backIcon || <Icon name={isRTL ? 'chevron-right' : 'chevron-left'} size={icon.lg} color={theme.fgMuted} />}
          </Pressable>
        )}
        <Text style={{ fontFamily: font.sans, fontSize: fs[16], fontWeight: fw[600], color: theme.fg, flex: 1 }} numberOfLines={1}>{title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[2] }}>
          {!isTodaySelected && (
            <Button variant="ghost" size="sm" onPress={goToday}>{loc.today}</Button>
          )}
          <IconButton variant="ghost" size="sm" onPress={prev} accessibilityLabel={isExpanded ? 'Previous month' : 'Previous day'}>
            <Icon name={isRTL ? 'chevron-right' : 'chevron-left'} size={icon.md} color={theme.fgMuted} />
          </IconButton>
          <IconButton variant="ghost" size="sm" onPress={next} accessibilityLabel={isExpanded ? 'Next month' : 'Next day'}>
            <Icon name={isRTL ? 'chevron-left' : 'chevron-right'} size={icon.md} color={theme.fgMuted} />
          </IconButton>
          {rightAction}
        </View>
      </View>

      {/* Weekday headers */}
      <View style={{ flexDirection: 'row', paddingHorizontal: sp[4] }}>
        {reorderedDayNames.map(d => (
          <View key={d} style={{ flex: 1, alignItems: 'center', paddingVertical: sp[1] }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, textTransform: 'uppercase' }}>{d}</Text>
          </View>
        ))}
      </View>

      {/* Day grid */}
      <View style={{ paddingHorizontal: sp[4], overflow: 'visible', zIndex: 5 }}>
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
        <Pressable onPress={toggle} style={{ alignItems: 'center', paddingVertical: sp[3] }} accessibilityRole="button" accessibilityLabel="Toggle calendar view">
          <View style={{ width: sp[7], height: 3, borderRadius: 1.5, backgroundColor: theme.fgFaint, opacity: 0.4 }} />
        </Pressable>
      </View>
    </View>
  );
}
