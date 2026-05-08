/**
 * RouteRedesign — clean journey with brand visual layer.
 *
 * Core structure stays simple (list, readiness card, collapsible chapters).
 * Brand elements layered in:
 *   - WaypointMarker diamonds on topic rows (replaces plain dots)
 *   - Diamond exam markers on chapter headers (replaces accent bars)
 *   - TerrainPattern as subtle page background texture
 *   - GridPaper behind the readiness card
 *   - DunePattern as section divider between past/current/future
 */
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import Svg, { Circle as SvgCircle } from 'react-native-svg';
import {
  useTheme, Segmented, BottomSheet, Button,
  WaypointMarker, TerrainPattern, GridPaper,
  sp, fs, fw, font, r, color,
} from '../../rn';

// ── Data ──

type Status = 'mastered' | 'exploring' | 'not-started' | 'uncertain';

interface Topic {
  id: string;
  name: string;
  status: Status;
  detail?: string;
}

interface Chapter {
  id: string;
  title: string;
  when: string;
  examScore?: number;
  phase: 'done' | 'current' | 'upcoming' | 'locked';
  topics: Topic[];
}

const CHAPTERS: Chapter[] = [
  { id: '8', title: 'Mock & Review', when: 'in 7 weeks', phase: 'locked', topics: [
    { id: 'mock', name: 'Full mock paper', status: 'not-started' },
    { id: 'weak', name: 'Weak-area review', status: 'not-started' },
  ]},
  { id: '7', title: 'Probability & Combinatorics', when: 'in 5 weeks', phase: 'upcoming', topics: [
    { id: 'counting', name: 'Counting principles', status: 'not-started' },
    { id: 'perms', name: 'Permutations', status: 'not-started' },
    { id: 'prob', name: 'Probability basics', status: 'not-started' },
  ]},
  { id: '6', title: 'Statistics & Data', when: 'in 3 weeks', phase: 'upcoming', topics: [
    { id: 'mmm', name: 'Mean, median, mode', status: 'not-started' },
    { id: 'tables', name: 'Reading data tables', status: 'not-started' },
    { id: 'stddev', name: 'Standard deviation', status: 'not-started' },
  ]},
  { id: '5', title: 'Geometry & Measurement', when: 'exam in 9 days', phase: 'current', topics: [
    { id: 'tri', name: 'Triangles & angles', status: 'exploring', detail: 'Last practiced today' },
    { id: 'area', name: 'Area & perimeter', status: 'exploring', detail: 'Started' },
    { id: 'vol', name: 'Volume & surface', status: 'exploring' },
    { id: 'coord', name: 'Coordinate geometry', status: 'not-started' },
  ]},
  { id: '4', title: 'Algebra II', when: '11 days ago', phase: 'done', examScore: 58, topics: [
    { id: 'linear', name: 'Linear equations', status: 'mastered' },
    { id: 'quad', name: 'Quadratic equations', status: 'uncertain', detail: 'Still uncertain' },
    { id: 'ineq', name: 'Inequalities', status: 'mastered' },
    { id: 'func', name: 'Functions', status: 'uncertain', detail: 'Still uncertain' },
  ]},
  { id: '3', title: 'Algebra I', when: '25 days ago', phase: 'done', examScore: 91, topics: [
    { id: 'vars', name: 'Variables & expressions', status: 'mastered' },
    { id: 'solve', name: 'Solving equations', status: 'mastered' },
    { id: 'words', name: 'Word problems', status: 'mastered' },
  ]},
  { id: '2', title: 'Ratios & Proportions', when: '39 days ago', phase: 'done', examScore: 95, topics: [
    { id: 'ratios', name: 'Ratios', status: 'mastered' },
    { id: 'pct', name: 'Percentages', status: 'mastered' },
    { id: 'rates', name: 'Rates', status: 'mastered' },
  ]},
  { id: '1', title: 'Number Sense', when: '53 days ago', phase: 'done', examScore: 95, topics: [
    { id: 'int', name: 'Integers & fractions', status: 'mastered' },
    { id: 'dec', name: 'Decimals', status: 'mastered' },
    { id: 'order', name: 'Order of operations', status: 'mastered' },
  ]},
];

const STATUS_COLOR: Record<Status, string> = {
  mastered: color.noon[400],
  exploring: color.gold[300],
  uncertain: color.terra[300],
  'not-started': 'rgba(232,228,220,0.25)',
};

const STATUS_LABEL: Record<Status, string> = {
  mastered: 'Mastered',
  exploring: 'Exploring',
  uncertain: 'Still uncertain',
  'not-started': 'Not started',
};

function toWaypoint(s: Status): 'done' | 'passed' | 'current' | 'incomplete' {
  return s === 'mastered' ? 'done' : s === 'exploring' ? 'current' : s === 'uncertain' ? 'passed' : 'incomplete';
}

// ── Progress Ring ──

function ProgressRing({ percent, size = 120 }: { percent: number; size?: number }) {
  const stroke = 6;
  const rad = (size - stroke) / 2;
  const circ = 2 * Math.PI * rad;
  const filled = (percent / 100) * circ;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <SvgCircle cx={size / 2} cy={size / 2} r={rad} stroke="rgba(232,228,220,0.06)" strokeWidth={stroke} fill="none" />
        <SvgCircle cx={size / 2} cy={size / 2} r={rad} stroke={color.noon[400]} strokeWidth={stroke} fill="none"
          strokeDasharray={`${filled} ${circ - filled}`} strokeDashoffset={circ * 0.25} strokeLinecap="round" opacity={0.8} />
      </Svg>
    </View>
  );
}

// ── Topic Row (with WaypointMarker) ──

function TopicRow({ topic, onPress }: { topic: Topic; onPress: () => void }) {
  const { theme } = useTheme();
  const col = STATUS_COLOR[topic.status];
  const isDim = topic.status === 'not-started';
  return (
    <Pressable onPress={onPress} style={{
      flexDirection: 'row', alignItems: 'center', gap: sp[3],
      paddingVertical: sp[3], paddingHorizontal: sp[4],
      borderBottomWidth: 1, borderBottomColor: theme.divider,
    }}>
      <WaypointMarker state={toWaypoint(topic.status)} />
      <Text style={{ flex: 1, fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: isDim ? theme.fgSubtle : theme.fg }} numberOfLines={1}>{topic.name}</Text>
      <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: col, letterSpacing: 1, textTransform: 'uppercase' }}>{topic.detail || STATUS_LABEL[topic.status]}</Text>
    </Pressable>
  );
}

// ── Chapter Section (with diamond exam marker) ──

function ChapterSection({ chapter, expanded, onToggle, onTopicPress }: {
  chapter: Chapter; expanded: boolean; onToggle: () => void; onTopicPress: (topic: Topic) => void;
}) {
  const { theme } = useTheme();
  const isCurrent = chapter.phase === 'current';
  const isDone = chapter.phase === 'done';
  const isLocked = chapter.phase === 'locked';
  const mastered = chapter.topics.filter(t => t.status === 'mastered').length;
  const total = chapter.topics.length;

  const borderCol = isCurrent ? color.gold[300] : isDone ? (chapter.examScore != null && chapter.examScore < 80 ? color.terra[300] : color.noon[400]) : theme.fgFaint;
  const dimSize = 20;

  return (
    <View style={{
      marginBottom: sp[2], borderRadius: r[3], overflow: 'hidden',
      borderWidth: isCurrent ? 1 : 0,
      borderColor: isCurrent ? 'rgba(201,162,39,0.2)' : 'transparent',
      backgroundColor: isCurrent ? 'rgba(201,162,39,0.03)' : 'transparent',
      ...(isLocked ? { opacity: 0.4 } : {}),
    }}>
      <Pressable onPress={onToggle} style={{
        flexDirection: 'row', alignItems: 'center', gap: sp[3],
        paddingVertical: sp[4], paddingHorizontal: sp[4],
      }}>
        {/* Diamond exam marker — small, on the left */}
        <View style={{
          width: dimSize, height: dimSize, transform: [{ rotate: '45deg' }],
          borderWidth: 1.5, borderColor: borderCol,
          borderStyle: chapter.phase === 'upcoming' || isLocked ? 'dashed' : 'solid',
          backgroundColor: isDone ? borderCol : color.void[300],
          alignItems: 'center', justifyContent: 'center',
        }}>
          {isDone && chapter.examScore != null && (
            <Text style={{ transform: [{ rotate: '-45deg' }], fontFamily: font.mono, fontSize: 7, fontWeight: fw[700], color: color.void[300] }}>{Math.round(chapter.examScore / 10)}</Text>
          )}
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: font.serif, fontSize: fs[16], fontWeight: fw[500], color: isLocked ? theme.fgSubtle : theme.fg }} numberOfLines={1}>{chapter.title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[2], marginTop: 2 }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: borderCol, letterSpacing: 1, textTransform: 'uppercase' }}>{chapter.when}</Text>
            {isDone && (
              <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: mastered === total ? color.noon[400] : color.terra[300] }}>{mastered}/{total}</Text>
            )}
            {isDone && chapter.examScore != null && (
              <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: chapter.examScore >= 80 ? color.noon[400] : color.terra[300] }}>{chapter.examScore}%</Text>
            )}
          </View>
        </View>

        {!isLocked && (
          <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.fgFaint, transform: [{ rotate: expanded ? '90deg' : '0deg' }] }}>{'>'}</Text>
        )}
      </Pressable>

      {expanded && !isLocked && (
        <View style={{ borderTopWidth: 1, borderTopColor: theme.divider }}>
          {chapter.topics.map(topic => (
            <TopicRow key={topic.id} topic={topic} onPress={() => onTopicPress(topic)} />
          ))}
        </View>
      )}
    </View>
  );
}

// ── Terrain divider between journey phases ──

function PhaseDivider({ label }: { label: string }) {
  const { theme } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3], paddingHorizontal: sp[5], paddingVertical: sp[3] }}>
      <View style={{ flex: 1, height: 1, backgroundColor: theme.divider }} />
      <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgFaint, letterSpacing: 1.5, textTransform: 'uppercase' }}>{label}</Text>
      <View style={{ flex: 1, height: 1, backgroundColor: theme.divider }} />
    </View>
  );
}

// ── Page ──

export function RouteRedesignPage() {
  const { theme } = useTheme();
  const [stream, setStream] = useState(0);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ '5': true, '4': true });
  const [sheetTopic, setSheetTopic] = useState<Topic | null>(null);

  const allTopics = CHAPTERS.flatMap(ch => ch.topics);
  const mastered = allTopics.filter(t => t.status === 'mastered').length;
  const total = allTopics.length;
  const pct = Math.round((mastered / total) * 100);

  const examNames = ['Kammi', 'Lafthi'];
  const examDays = [49, 63];

  const upcoming = CHAPTERS.filter(ch => ch.phase === 'upcoming' || ch.phase === 'locked');
  const current = CHAPTERS.filter(ch => ch.phase === 'current');
  const done = CHAPTERS.filter(ch => ch.phase === 'done');

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* Terrain texture behind everything */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.04 }} pointerEvents="none">
        <TerrainPattern width={500} height={2000} variant="standard" />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: sp[12] }}>

        {/* ── Header ── */}
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

        {/* ── Readiness card (with grid bg) ── */}
        <View style={{
          marginHorizontal: sp[5], marginBottom: sp[5],
          borderRadius: r[3], overflow: 'hidden',
          borderWidth: 1, borderColor: theme.border,
        }}>
          {/* Grid paper behind */}
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.5 }}>
            <GridPaper variant="standard" width={500} height={200} />
          </View>

          <View style={{ padding: sp[5], flexDirection: 'row', alignItems: 'center', gap: sp[5] }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <ProgressRing percent={pct} size={88} />
              <View style={{ position: 'absolute', alignItems: 'center' }}>
                <Text style={{ fontFamily: font.serif, fontSize: fs[24], fontWeight: fw[500], color: theme.fg }}>{pct}%</Text>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: font.sans, fontSize: fs[16], fontWeight: fw[500], color: theme.fg }}>Exam readiness</Text>
              <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginTop: sp[1], lineHeight: fs[13] * 1.5 }}>
                <Text style={{ color: color.noon[400], fontWeight: fw[600] }}>{mastered}</Text> of {total} topics mastered.{'\n'}Each one gets you closer.
              </Text>
              <View style={{ flexDirection: 'row', gap: sp[3], marginTop: sp[3] }}>
                {([
                  { n: allTopics.filter(t => t.status === 'mastered').length, col: color.noon[400] },
                  { n: allTopics.filter(t => t.status === 'exploring').length, col: color.gold[300] },
                  { n: allTopics.filter(t => t.status === 'uncertain').length, col: color.terra[300] },
                  { n: allTopics.filter(t => t.status === 'not-started').length, col: theme.fgFaint },
                ] as const).filter(s => s.n > 0).map((s, i) => (
                  <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: s.col }} />
                    <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgMuted }}>{s.n}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* ── Upcoming chapters ── */}
        {upcoming.length > 0 && (
          <>
            <PhaseDivider label="Ahead" />
            <View style={{ paddingHorizontal: sp[4] }}>
              {upcoming.map(ch => (
                <ChapterSection key={ch.id} chapter={ch} expanded={!!expanded[ch.id]}
                  onToggle={() => setExpanded(prev => ({ ...prev, [ch.id]: !prev[ch.id] }))}
                  onTopicPress={setSheetTopic} />
              ))}
            </View>
          </>
        )}

        {/* ── Current chapter ── */}
        {current.length > 0 && (
          <>
            <PhaseDivider label="Now" />
            <View style={{ paddingHorizontal: sp[4] }}>
              {current.map(ch => (
                <ChapterSection key={ch.id} chapter={ch} expanded={!!expanded[ch.id]}
                  onToggle={() => setExpanded(prev => ({ ...prev, [ch.id]: !prev[ch.id] }))}
                  onTopicPress={setSheetTopic} />
              ))}
            </View>
          </>
        )}

        {/* ── Done chapters ── */}
        {done.length > 0 && (
          <>
            <PhaseDivider label="Completed" />
            <View style={{ paddingHorizontal: sp[4] }}>
              {done.map(ch => (
                <ChapterSection key={ch.id} chapter={ch} expanded={!!expanded[ch.id]}
                  onToggle={() => setExpanded(prev => ({ ...prev, [ch.id]: !prev[ch.id] }))}
                  onTopicPress={setSheetTopic} />
              ))}
            </View>
          </>
        )}

        {/* ── Footer ── */}
        <View style={{ alignItems: 'center', paddingTop: sp[8] }}>
          <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgFaint, letterSpacing: 1.5, textTransform: 'uppercase' }}>Started Sept 2025</Text>
        </View>

      </ScrollView>

      {/* ── Topic sheet ── */}
      <BottomSheet visible={!!sheetTopic} onClose={() => setSheetTopic(null)} title={sheetTopic?.name || ''}>
        {sheetTopic && (() => {
          const s = sheetTopic.status;
          const col = STATUS_COLOR[s];
          const pctVal = s === 'mastered' ? 100 : s === 'exploring' ? 45 : s === 'uncertain' ? 25 : 0;
          return (
            <View style={{ gap: sp[4] }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[2] }}>
                <WaypointMarker state={toWaypoint(s)} />
                <Text style={{ fontFamily: font.mono, fontSize: fs[11], fontWeight: fw[600], color: col, textTransform: 'uppercase' }}>{STATUS_LABEL[s]}</Text>
              </View>

              <View>
                <View style={{ height: 6, backgroundColor: theme.bgSunken, borderRadius: r.pill, overflow: 'hidden' }}>
                  <View style={{ height: '100%', width: `${pctVal}%`, backgroundColor: col, borderRadius: r.pill }} />
                </View>
              </View>

              {s === 'mastered' && <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5 }}>You've mastered this topic. It counts toward your exam readiness.</Text>}
              {s === 'exploring' && <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5 }}>You're making progress. Keep practising to master it.</Text>}
              {s === 'uncertain' && <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5 }}>You passed the exam but this topic is still shaky. Revisit it to lock it in.</Text>}
              {s === 'not-started' && <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5 }}>You haven't started this yet. Begin when you're ready.</Text>}

              {s !== 'mastered' && <Button variant="primary" onPress={() => setSheetTopic(null)}>{s === 'not-started' ? 'Start' : s === 'uncertain' ? 'Revisit' : 'Continue'}</Button>}
              {s === 'mastered' && <Button variant="ghost" onPress={() => setSheetTopic(null)}>Quick refresh</Button>}
            </View>
          );
        })()}
      </BottomSheet>
    </View>
  );
}
