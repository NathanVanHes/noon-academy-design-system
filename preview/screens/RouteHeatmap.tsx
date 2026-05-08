/**
 * RouteHeatmap — topics as a coloured grid, chapters as rows.
 *
 * Think GitHub contribution graph meets exam prep.
 * Each cell = one topic. Colour = status. Tap to drill in.
 * Chapters stack vertically. You see everything at once.
 * Strong at a glance — you instantly spot green (mastered),
 * gold (in progress), orange (weak), and grey (not started).
 */
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, useWindowDimensions } from 'react-native';
import {
  useTheme, BottomSheet, Button, Segmented, WaypointMarker,
  sp, fs, fw, font, r, color,
} from '../../rn';

type Status = 'mastered' | 'exploring' | 'not-started' | 'uncertain';

interface Topic { id: string; name: string; status: Status; detail?: string; }
interface Chapter { id: string; title: string; when: string; examScore?: number; phase: 'done' | 'current' | 'upcoming' | 'locked'; topics: Topic[]; }

const CHAPTERS: Chapter[] = [
  { id: '1', title: 'Number Sense', when: '53 days ago', phase: 'done', examScore: 95, topics: [
    { id: 'int', name: 'Integers & fractions', status: 'mastered' },
    { id: 'dec', name: 'Decimals', status: 'mastered' },
    { id: 'order', name: 'Order of operations', status: 'mastered' },
  ]},
  { id: '2', title: 'Ratios & Proportions', when: '39 days ago', phase: 'done', examScore: 95, topics: [
    { id: 'ratios', name: 'Ratios', status: 'mastered' },
    { id: 'pct', name: 'Percentages', status: 'mastered' },
    { id: 'rates', name: 'Rates', status: 'mastered' },
  ]},
  { id: '3', title: 'Algebra I', when: '25 days ago', phase: 'done', examScore: 91, topics: [
    { id: 'vars', name: 'Variables & expressions', status: 'mastered' },
    { id: 'solve', name: 'Solving equations', status: 'mastered' },
    { id: 'words', name: 'Word problems', status: 'mastered' },
  ]},
  { id: '4', title: 'Algebra II', when: '11 days ago', phase: 'done', examScore: 58, topics: [
    { id: 'linear', name: 'Linear equations', status: 'mastered' },
    { id: 'quad', name: 'Quadratic equations', status: 'uncertain', detail: 'Still uncertain' },
    { id: 'ineq', name: 'Inequalities', status: 'mastered' },
    { id: 'func', name: 'Functions', status: 'uncertain', detail: 'Still uncertain' },
  ]},
  { id: '5', title: 'Geometry', when: 'exam in 9 days', phase: 'current', topics: [
    { id: 'tri', name: 'Triangles & angles', status: 'exploring', detail: 'Today' },
    { id: 'area', name: 'Area & perimeter', status: 'exploring', detail: 'Started' },
    { id: 'vol', name: 'Volume & surface', status: 'exploring' },
    { id: 'coord', name: 'Coordinate geometry', status: 'not-started' },
  ]},
  { id: '6', title: 'Statistics', when: 'in 3 weeks', phase: 'upcoming', topics: [
    { id: 'mmm', name: 'Mean, median, mode', status: 'not-started' },
    { id: 'tables', name: 'Data tables', status: 'not-started' },
    { id: 'stddev', name: 'Standard deviation', status: 'not-started' },
  ]},
  { id: '7', title: 'Probability', when: 'in 5 weeks', phase: 'upcoming', topics: [
    { id: 'counting', name: 'Counting', status: 'not-started' },
    { id: 'perms', name: 'Permutations', status: 'not-started' },
    { id: 'prob', name: 'Probability', status: 'not-started' },
  ]},
  { id: '8', title: 'Mock & Review', when: 'in 7 weeks', phase: 'locked', topics: [
    { id: 'mock', name: 'Mock paper', status: 'not-started' },
    { id: 'weak', name: 'Weak review', status: 'not-started' },
  ]},
];

const CELL_COLORS: Record<Status, string> = {
  mastered: color.noon[400],
  exploring: color.gold[300],
  uncertain: color.terra[300],
  'not-started': 'rgba(232,228,220,0.06)',
};

const STATUS_LABEL: Record<Status, string> = {
  mastered: 'Mastered',
  exploring: 'Exploring',
  uncertain: 'Still uncertain',
  'not-started': 'Not started',
};

export function RouteHeatmapPage() {
  const { theme } = useTheme();
  const { width: W } = useWindowDimensions();
  const [stream, setStream] = useState(0);
  const [sheetTopic, setSheetTopic] = useState<{ topic: Topic; chapter: Chapter } | null>(null);
  const [sheetChapter, setSheetChapter] = useState<Chapter | null>(null);

  const allTopics = CHAPTERS.flatMap(ch => ch.topics);
  const mastered = allTopics.filter(t => t.status === 'mastered').length;
  const total = allTopics.length;
  const pct = Math.round((mastered / total) * 100);

  const examNames = ['Kammi', 'Lafthi'];
  const examDays = [49, 63];

  // Max topics in any chapter — for grid alignment
  const maxTopics = Math.max(...CHAPTERS.map(ch => ch.topics.length));
  const contentW = Math.min(W - sp[5] * 2, 440);
  const cellGap = 4;
  const cellSize = Math.floor((contentW - (maxTopics - 1) * cellGap) / maxTopics);
  const clampedCell = Math.min(cellSize, 56);

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: sp[12] }}>

        {/* Header */}
        <View style={{ paddingHorizontal: sp[5], paddingTop: sp[6], paddingBottom: sp[4] }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View>
              <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgFaint, letterSpacing: 1.6, textTransform: 'uppercase' }}>Your journey</Text>
              <Text style={{ fontFamily: font.serif, fontSize: fs[28], fontWeight: fw[500], color: theme.fg, marginTop: sp[1] }}>{examNames[stream]}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontFamily: font.serif, fontSize: fs[28], fontWeight: fw[500], color: color.gold[300] }}>{examDays[stream]}</Text>
              <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgFaint, letterSpacing: 1.4, textTransform: 'uppercase' }}>days left</Text>
            </View>
          </View>
          <View style={{ marginTop: sp[3] }}>
            <Segmented options={['Kammi', 'Lafthi']} selected={stream} onSelect={setStream} size="sm" />
          </View>
        </View>

        {/* Summary bar */}
        <View style={{ paddingHorizontal: sp[5], marginBottom: sp[5] }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3], marginBottom: sp[2] }}>
            <Text style={{ fontFamily: font.serif, fontSize: fs[22], fontWeight: fw[500], color: theme.fg }}>{pct}%</Text>
            <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>ready</Text>
            <View style={{ flex: 1 }} />
            <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: color.noon[400] }}>{mastered}/{total} mastered</Text>
          </View>
          {/* Full-width progress bar */}
          <View style={{ height: 4, backgroundColor: 'rgba(232,228,220,0.06)', borderRadius: r.pill, overflow: 'hidden' }}>
            <View style={{ height: '100%', width: `${pct}%`, backgroundColor: color.noon[400], borderRadius: r.pill, opacity: 0.7 }} />
          </View>
        </View>

        {/* Legend */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: sp[4], marginBottom: sp[4] }}>
          {[
            { label: 'Mastered', col: color.noon[400] },
            { label: 'Exploring', col: color.gold[300] },
            { label: 'Uncertain', col: color.terra[300] },
            { label: 'Not started', col: 'rgba(232,228,220,0.15)' },
          ].map(item => (
            <View key={item.label} style={{ flexDirection: 'row', alignItems: 'center', gap: sp[1] }}>
              <View style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: item.col }} />
              <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgMuted }}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Heatmap grid */}
        <View style={{ paddingHorizontal: sp[5] }}>
          {CHAPTERS.map(ch => {
            const isCurrent = ch.phase === 'current';
            const isLocked = ch.phase === 'locked';

            return (
              <View key={ch.id} style={{ marginBottom: sp[4], ...(isLocked ? { opacity: 0.35 } : {}) }}>
                {/* Chapter label row */}
                <Pressable onPress={() => setSheetChapter(ch)} style={{ flexDirection: 'row', alignItems: 'center', gap: sp[2], marginBottom: sp[2] }}>
                  <Text style={{
                    fontFamily: font.mono, fontSize: fs[9], color: isCurrent ? color.gold[300] : theme.fgFaint,
                    letterSpacing: 1, textTransform: 'uppercase', flex: 1,
                  }} numberOfLines={1}>{ch.title}</Text>
                  {ch.examScore != null && (
                    <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: ch.examScore >= 80 ? color.noon[400] : color.terra[300] }}>{ch.examScore}%</Text>
                  )}
                  {isCurrent && (
                    <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: color.gold[300] }}>now</Text>
                  )}
                </Pressable>

                {/* Topic cells */}
                <View style={{ flexDirection: 'row', gap: cellGap, flexWrap: 'wrap' }}>
                  {ch.topics.map(topic => {
                    const bg = CELL_COLORS[topic.status];
                    const isMastered = topic.status === 'mastered';
                    return (
                      <Pressable
                        key={topic.id}
                        onPress={() => setSheetTopic({ topic, chapter: ch })}
                        style={{
                          width: clampedCell, height: clampedCell,
                          borderRadius: r[1],
                          backgroundColor: bg,
                          borderWidth: isCurrent && topic.status !== 'not-started' ? 1 : 0,
                          borderColor: isCurrent ? 'rgba(201,162,39,0.3)' : 'transparent',
                          alignItems: 'center', justifyContent: 'center',
                          ...(isMastered ? { shadowColor: color.noon[400], shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, shadowRadius: 4 } : {}),
                        }}
                      >
                        {/* Topic initial */}
                        <Text style={{
                          fontFamily: font.mono, fontSize: fs[9], fontWeight: fw[600],
                          color: isMastered ? color.void[300] : topic.status === 'not-started' ? theme.fgFaint : color.void[300],
                          opacity: topic.status === 'not-started' ? 0.5 : 1,
                        }}>{topic.name.charAt(0)}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>

        {/* Footer */}
        <View style={{ alignItems: 'center', paddingTop: sp[6] }}>
          <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgFaint, letterSpacing: 1.5, textTransform: 'uppercase' }}>Started Sept 2025</Text>
        </View>

      </ScrollView>

      {/* Topic sheet */}
      <BottomSheet visible={!!sheetTopic} onClose={() => setSheetTopic(null)} title={sheetTopic?.topic.name || ''}>
        {sheetTopic && (() => {
          const { topic, chapter } = sheetTopic;
          const col = CELL_COLORS[topic.status];
          return (
            <View style={{ gap: sp[4] }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[2] }}>
                <WaypointMarker state={topic.status === 'mastered' ? 'done' : topic.status === 'exploring' ? 'current' : topic.status === 'uncertain' ? 'passed' : 'incomplete'} />
                <Text style={{ fontFamily: font.mono, fontSize: fs[11], fontWeight: fw[600], color: col, textTransform: 'uppercase' }}>{STATUS_LABEL[topic.status]}</Text>
              </View>
              <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5 }}>
                Part of <Text style={{ color: theme.fg, fontWeight: fw[500] }}>{chapter.title}</Text>.
                {topic.status === 'mastered' ? ' This topic counts toward your readiness.' : ' Master it to increase your readiness.'}
              </Text>
              {topic.status !== 'mastered' && <Button variant="primary" onPress={() => setSheetTopic(null)}>{topic.status === 'not-started' ? 'Start' : topic.status === 'uncertain' ? 'Revisit' : 'Continue'}</Button>}
              {topic.status === 'mastered' && <Button variant="ghost" onPress={() => setSheetTopic(null)}>Quick refresh</Button>}
            </View>
          );
        })()}
      </BottomSheet>

      {/* Chapter sheet */}
      <BottomSheet visible={!!sheetChapter} onClose={() => setSheetChapter(null)} title={sheetChapter?.title || ''}>
        {sheetChapter && (() => {
          const ch = sheetChapter;
          const m = ch.topics.filter(t => t.status === 'mastered').length;
          return (
            <View style={{ gap: sp[3] }}>
              <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, textTransform: 'uppercase', letterSpacing: 1.4 }}>{ch.when}</Text>
              {ch.examScore != null && (
                <Text style={{ fontFamily: font.serif, fontSize: fs[22], color: theme.fg }}>{ch.examScore}% <Text style={{ fontSize: fs[13], color: theme.fgMuted }}>exam result</Text></Text>
              )}
              <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>{m}/{ch.topics.length} topics mastered</Text>
              <View style={{ gap: sp[2], marginTop: sp[2] }}>
                {ch.topics.map(t => (
                  <View key={t.id} style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3], paddingVertical: sp[1] }}>
                    <View style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: CELL_COLORS[t.status] }} />
                    <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fg, flex: 1 }}>{t.name}</Text>
                    <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: CELL_COLORS[t.status], textTransform: 'uppercase' }}>{STATUS_LABEL[t.status]}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })()}
      </BottomSheet>
    </View>
  );
}
