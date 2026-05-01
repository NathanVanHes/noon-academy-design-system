/**
 * Journey Page — desert path from camp to dawn.
 * S-curve path with chapter exam diamonds and topic diamonds branching left/right.
 * Topics connect to the path via horizontal lines. WaypointMarker for all diamonds.
 */
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, Dimensions } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Rect, Ellipse, Line } from 'react-native-svg';
import {
  useTheme, BottomSheet, Button, Segmented, WaypointMarker, TerrainPattern,
  sp, fs, fw, font, r, color,
} from '../../rn';

const { width: SCREEN_W } = Dimensions.get('window');
const CANVAS_W = Math.min(SCREEN_W, 480);
const TOTAL_CHAPTERS = 8;
const CURRENT_CHAPTER = 4; // 0-indexed in CHAPTERS array
const DAYS_TO_EXAM = 67;

// Each topic row is ~52px, chapter header ~100px, gaps ~40px
const TOPIC_ROW_H = 52;
const CHAPTER_HEADER_H = 100;
const CHAPTER_GAP = 40;
function chapterHeight(topicCount: number) { return CHAPTER_HEADER_H + topicCount * (TOPIC_ROW_H + 10) + CHAPTER_GAP; }

const CHAPTERS = [
  { id: 8, title: 'Advanced Inference', date: 'Jun 15–22', status: 'future' as const, readiness: 0, topics: ['Implied meaning', 'Author intent', 'Unstated assumptions'] },
  { id: 7, title: 'Comparative Analysis', date: 'Jun 8–14', status: 'future' as const, readiness: 0, topics: ['Passage comparison', 'Evidence weighing'] },
  { id: 6, title: 'Data Interpretation', date: 'Jun 1–7', status: 'future' as const, readiness: 0, topics: ['Charts & tables', 'Statistical reasoning', 'Data inference'] },
  { id: 5, title: 'Critical Reading', date: 'May 25–31', status: 'current' as const, readiness: 35, topics: ['Tone analysis', 'Main idea extraction', 'Supporting detail'] },
  { id: 4, title: 'Vocabulary in Context', date: 'May 18–24', status: 'past-strong' as const, readiness: 82, result: '82%', topics: ['Word meaning', 'Contextual clues'] },
  { id: 3, title: 'Sentence Completion', date: 'May 11–17', status: 'past-strong' as const, readiness: 91, result: '91%', topics: ['Grammar patterns', 'Logical connectors', 'Transition words'] },
  { id: 2, title: 'Reading Comprehension', date: 'May 4–10', status: 'past-weak' as const, readiness: 45, result: '45%', topics: ['Passage structure', 'Detail recall', 'Inference basics'] },
  { id: 1, title: 'Foundations', date: 'Apr 27–May 3', status: 'past-strong' as const, readiness: 95, result: '95%', topics: ['Basic vocab', 'Sentence types'] },
];

type TopicState = 'mastered' | 'progressing' | 'attention' | 'unstudied' | 'here';
const TOPIC_STATES: Record<string, TopicState> = {
  'Implied meaning': 'unstudied', 'Author intent': 'unstudied', 'Unstated assumptions': 'unstudied',
  'Passage comparison': 'unstudied', 'Evidence weighing': 'unstudied',
  'Charts & tables': 'unstudied', 'Statistical reasoning': 'unstudied', 'Data inference': 'unstudied',
  'Tone analysis': 'here', 'Main idea extraction': 'progressing', 'Supporting detail': 'unstudied',
  'Word meaning': 'mastered', 'Contextual clues': 'mastered',
  'Grammar patterns': 'mastered', 'Logical connectors': 'mastered', 'Transition words': 'mastered',
  'Passage structure': 'attention', 'Detail recall': 'attention', 'Inference basics': 'progressing',
  'Basic vocab': 'mastered', 'Sentence types': 'mastered',
};

// Compute Y positions
const CITY_H = 350;
const CAMP_H = 250;
let _y = CITY_H;
const CHAPTER_Y: number[] = [];
CHAPTERS.forEach(ch => { CHAPTER_Y.push(_y); _y += chapterHeight(ch.topics.length); });
const CANVAS_H = _y + CAMP_H;

// Path X — the curve weaves left and right of centre
const PATH_CX = CANVAS_W / 2;
const PATH_AMPLITUDE = CANVAS_W * 0.18;

function pathX(chapterIdx: number) {
  return PATH_CX + (chapterIdx % 2 === 0 ? -1 : 1) * PATH_AMPLITUDE;
}

export function JourneyPage({ onClose }: { onClose?: () => void }) {
  const { theme } = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const [stream, setStream] = useState(0);
  const [sheetChapter, setSheetChapter] = useState<typeof CHAPTERS[0] | null>(null);
  const [sheetTopic, setSheetTopic] = useState<string | null>(null);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ y: CHAPTER_Y[CURRENT_CHAPTER] - 80, animated: false });
    }, 100);
  }, []);

  // Build the S-curve SVG path through chapter positions
  const pathD = useMemo(() => {
    const pts = [{ x: PATH_CX, y: CITY_H - 60 }];
    CHAPTERS.forEach((_, i) => pts.push({ x: pathX(i), y: CHAPTER_Y[i] + 50 }));
    pts.push({ x: PATH_CX, y: CANVAS_H - CAMP_H / 2 });
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const p = pts[i - 1], c = pts[i], my = (p.y + c.y) / 2;
      d += ` C ${p.x} ${my}, ${c.x} ${my}, ${c.x} ${c.y}`;
    }
    return d;
  }, []);

  function waypointState(status: string): 'done' | 'passed' | 'current' | 'arrived' | 'incomplete' {
    switch (status) { case 'past-strong': return 'done'; case 'past-weak': return 'passed'; case 'current': return 'current'; default: return 'incomplete'; }
  }

  function topicWaypointState(state: TopicState): 'done' | 'passed' | 'current' | 'arrived' | 'incomplete' {
    switch (state) { case 'mastered': return 'done'; case 'progressing': return 'passed'; case 'here': return 'current'; case 'attention': return 'passed'; default: return 'incomplete'; }
  }

  function topicColor(state: TopicState) {
    switch (state) { case 'mastered': return color.noon[400]; case 'progressing': return color.gold[400]; case 'attention': return color.terra[400]; case 'here': return color.noon[400]; default: return theme.fgFaint; }
  }

  function topicLabel(state: TopicState) {
    switch (state) { case 'mastered': return 'MASTERED'; case 'progressing': return 'PROGRESSING'; case 'attention': return 'NEEDS WORK'; case 'here': return 'HERE'; default: return 'UNMAPPED'; }
  }

  function oasisBorder(status: string) {
    switch (status) { case 'past-strong': return color.noon[400]; case 'past-weak': return color.terra[400]; case 'current': return color.gold[400]; default: return theme.fgFaint; }
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* Stream toggle */}
      <View style={{ position: 'absolute', top: sp[10], left: 0, right: 0, zIndex: 10, alignItems: 'center' }}>
        <Segmented options={['Verbal', 'Quant']} selected={stream} onSelect={setStream} size="sm" />
      </View>

      <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ width: CANVAS_W, alignSelf: 'center' }}>
        {/* SVG background */}
        <Svg width={CANVAS_W} height={CANVAS_H} style={{ position: 'absolute', top: 0, left: 0 }}>
          <Defs>
            <LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={color.gold[300]} stopOpacity="0.3" />
              <Stop offset="0.08" stopColor={color.gold[400]} stopOpacity="0.12" />
              <Stop offset="0.18" stopColor={color.iris[700]} stopOpacity="0.12" />
              <Stop offset="0.4" stopColor={color.void[200]} stopOpacity="1" />
              <Stop offset="0.7" stopColor={color.void[300]} stopOpacity="1" />
              <Stop offset="0.9" stopColor={color.terra[800]} stopOpacity="0.15" />
              <Stop offset="1" stopColor={color.terra[700]} stopOpacity="0.1" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width={CANVAS_W} height={CANVAS_H} fill="url(#sky)" />

          {/* Stars */}
          {Array.from({ length: 40 }, (_, i) => (
            <Circle key={`s${i}`} cx={(i * 73 + 17) % CANVAS_W} cy={(i * 137 + 43) % (CANVAS_H * 0.35)}
              r={i % 5 === 0 ? 2 : 1} fill={color.chalk[100]}
              opacity={(0.2 + (i % 4) * 0.2) * Math.max(0, 1 - ((i * 137 + 43) % (CANVAS_H * 0.35)) / (CANVAS_H * 0.3))} />
          ))}

          {/* Dune ridges */}
          <Path d={`M 0 ${CANVAS_H - 160} Q ${CANVAS_W * 0.25} ${CANVAS_H - 210} ${CANVAS_W * 0.55} ${CANVAS_H - 175} T ${CANVAS_W} ${CANVAS_H - 140} L ${CANVAS_W} ${CANVAS_H} L 0 ${CANVAS_H} Z`}
            fill={color.terra[800]} opacity={0.12} />
          <Path d={`M 0 ${CANVAS_H - 90} Q ${CANVAS_W * 0.4} ${CANVAS_H - 130} ${CANVAS_W * 0.7} ${CANVAS_H - 95} T ${CANVAS_W} ${CANVAS_H - 60} L ${CANVAS_W} ${CANVAS_H} L 0 ${CANVAS_H} Z`}
            fill={color.terra[700]} opacity={0.1} />

          {/* Future path — dashed */}
          <Path d={pathD} stroke={color.chalk[100]} strokeWidth={1} strokeOpacity={0.15} strokeDasharray="4,6" fill="none" />
          {/* Past path — solid gold */}
          <Path d={pathD} stroke={color.gold[400]} strokeWidth={2} fill="none" strokeOpacity={0.4}
            strokeDasharray={`0,${CHAPTER_Y[CURRENT_CHAPTER]},${CANVAS_H}`}
            strokeDashoffset={-CHAPTER_Y[CURRENT_CHAPTER]} />

          {/* Footprints along past path */}
          {Array.from({ length: 25 }, (_, i) => {
            const t = i / 25;
            const y = CHAPTER_Y[CURRENT_CHAPTER] + t * (CANVAS_H - CAMP_H / 2 - CHAPTER_Y[CURRENT_CHAPTER]);
            // Approximate x along the curve
            const closestChapter = CHAPTERS.findIndex((_, ci) => CHAPTER_Y[ci] >= y) - 1;
            const ci = Math.max(0, Math.min(closestChapter, TOTAL_CHAPTERS - 1));
            const localT = CHAPTER_Y[ci + 1] ? (y - CHAPTER_Y[ci]) / (CHAPTER_Y[ci + 1] - CHAPTER_Y[ci]) : 0.5;
            const x1 = pathX(ci), x2 = ci < TOTAL_CHAPTERS - 1 ? pathX(ci + 1) : PATH_CX;
            const x = x1 + (x2 - x1) * Math.min(1, localT);
            const isLeft = i % 2 === 0;
            return <Ellipse key={`fp${i}`} cx={x + (isLeft ? -5 : 5)} cy={y} rx={3} ry={5} fill={color.gold[400]} opacity={0.25 * (1 - t * 0.6)} rotation={isLeft ? -10 : 10} origin={`${x + (isLeft ? -5 : 5)}, ${y}`} />;
          })}

          {/* Topic connector lines — from path to topic cards */}
          {CHAPTERS.map((ch, ci) => ch.topics.map((_, ti) => {
            const topicY = CHAPTER_Y[ci] + CHAPTER_HEADER_H + ti * (TOPIC_ROW_H + 10) + TOPIC_ROW_H / 2;
            const px = pathX(ci);
            const isLeft = ti % 2 === 0;
            const cardEdge = isLeft ? sp[4] + (CANVAS_W / 2 - 24) : CANVAS_W / 2 + 24;
            return <Line key={`cl-${ci}-${ti}`} x1={px} y1={topicY} x2={isLeft ? cardEdge : cardEdge} y2={topicY}
              stroke={theme.fgFaint} strokeWidth={0.5} strokeOpacity={0.4} />;
          }))}
        </Svg>

        {/* Terrain contours around chapters */}
        {CHAPTERS.map((ch, i) => {
          const isCurrent = ch.status === 'current';
          const isPast = ch.status === 'past-strong' || ch.status === 'past-weak';
          return (
            <View key={`t${i}`} style={{ position: 'absolute', top: CHAPTER_Y[i] - 30, left: 0, width: CANVAS_W, height: chapterHeight(ch.topics.length) + 60, opacity: isCurrent ? 0.12 : isPast ? 0.06 : 0.03 }} pointerEvents="none">
              <TerrainPattern width={CANVAS_W} height={chapterHeight(ch.topics.length) + 60} variant={isCurrent ? 'dense' : 'standard'} />
            </View>
          );
        })}

        {/* ═══ Dawn / Final Exam ═══ */}
        <Pressable onPress={() => setSheetChapter({ id: 0, title: 'Final Exam', date: 'Jul 20', status: 'future', readiness: 0, topics: [] })} style={{ height: CITY_H, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: font.serif, fontSize: fs[32], fontWeight: fw[500], color: color.gold[300] }}>Final Exam</Text>
          <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: color.gold[400], marginTop: sp[2] }}>The sun rises in {DAYS_TO_EXAM} days</Text>
          <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgFaint, marginTop: sp[3], textTransform: 'uppercase', letterSpacing: 2 }}>Tap to view</Text>
        </Pressable>

        {/* ═══ Chapters ═══ */}
        {CHAPTERS.map((ch, ci) => {
          const isCurrent = ch.status === 'current';
          const isPast = ch.status === 'past-strong' || ch.status === 'past-weak';
          const px = pathX(ci);
          const oasisSize = isCurrent ? 44 : 36;

          return (
            <View key={ch.id} style={{ height: chapterHeight(ch.topics.length) }}>
              {/* Chapter exam diamond on the path */}
              <Pressable onPress={() => setSheetChapter(ch)} style={{ position: 'absolute', top: 30, left: px - oasisSize / 2, alignItems: 'center', zIndex: 5 }}>
                {/* Oasis circle with water */}
                <View style={{
                  width: oasisSize, height: oasisSize, borderRadius: oasisSize / 2,
                  borderWidth: isCurrent ? 2.5 : 1.5, borderColor: oasisBorder(ch.status),
                  borderStyle: ch.status === 'future' ? 'dashed' : 'solid',
                  overflow: 'hidden', backgroundColor: theme.bg,
                  ...(isCurrent ? { shadowColor: color.gold[400], shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 6 } : {}),
                }}>
                  <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${ch.readiness}%` }}>
                    <View style={{ flex: 1, backgroundColor: color.blue[400], opacity: 0.4 }} />
                  </View>
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: font.mono, fontSize: fs[11], fontWeight: fw[700], color: isCurrent ? color.gold[300] : isPast ? theme.fg : theme.fgFaint }}>{ch.id}</Text>
                  </View>
                </View>
                {/* Chapter label */}
                <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: isCurrent ? color.gold[400] : theme.fgFaint, marginTop: sp[1], textAlign: 'center' }}>
                  {isCurrent ? 'YOU ARE HERE' : `CH ${ch.id}`}
                </Text>
              </Pressable>

              {/* Chapter title — centred */}
              <View style={{ position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center' }}>
                <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: isCurrent ? color.gold[300] : isPast ? oasisBorder(ch.status) : theme.fgFaint, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                  {ch.date}
                </Text>
                <Text style={{ fontFamily: font.serif, fontSize: isCurrent ? fs[18] : fs[15], fontWeight: fw[500], color: isCurrent ? theme.fg : isPast ? theme.fgMuted : theme.fgSubtle, marginTop: sp[0.5] }}>{ch.title}</Text>
                {ch.result && <Text style={{ fontFamily: font.serif, fontSize: fs[13], fontStyle: 'italic', color: ch.status === 'past-weak' ? color.terra[400] : color.noon[400], marginTop: sp[0.5] }}>{ch.result}</Text>}
              </View>

              {/* Topics — alternating left/right from the path */}
              {ch.topics.map((topic, ti) => {
                const state = TOPIC_STATES[topic] || 'unstudied';
                const isLeft = ti % 2 === 0;
                const topicY = CHAPTER_HEADER_H + ti * (TOPIC_ROW_H + 10);
                const cardW = CANVAS_W / 2 - 36;

                return (
                  <Pressable key={topic} onPress={() => setSheetTopic(topic)} style={{
                    position: 'absolute',
                    top: topicY,
                    ...(isLeft ? { left: sp[4] } : { right: sp[4] }),
                    width: cardW,
                    flexDirection: isLeft ? 'row' : 'row-reverse',
                    alignItems: 'center', gap: sp[2],
                    paddingVertical: sp[3], paddingHorizontal: sp[3],
                    backgroundColor: state === 'here' ? 'rgba(100,216,174,0.06)' : theme.bgRaised,
                    borderWidth: 1,
                    borderColor: state === 'here' ? 'rgba(100,216,174,0.3)' : theme.border,
                    borderRadius: r[2],
                  }}>
                    <WaypointMarker state={topicWaypointState(state)} />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: state === 'unstudied' ? theme.fgMuted : theme.fg, textAlign: isLeft ? 'left' : 'right' }} numberOfLines={1}>{topic}</Text>
                      <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: topicColor(state), letterSpacing: 1, textTransform: 'uppercase', marginTop: sp[0.5], textAlign: isLeft ? 'left' : 'right' }}>{topicLabel(state)}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          );
        })}

        {/* ═══ Camp ═══ */}
        <View style={{ height: CAMP_H, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: color.terra[500], letterSpacing: 2, textTransform: 'uppercase' }}>Where you began</Text>
          <Text style={{ fontFamily: font.serif, fontSize: fs[18], color: color.terra[400], marginTop: sp[1] }}>Base Camp</Text>
          <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, marginTop: sp[1] }}>Apr 27</Text>
        </View>
      </ScrollView>

      {/* Bottom dock */}
      <View style={{ position: 'absolute', bottom: sp[5], left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: sp[3], zIndex: 10 }}>
        <Pressable onPress={() => scrollRef.current?.scrollTo({ y: CHAPTER_Y[CURRENT_CHAPTER] - 80, animated: true })}
          style={{ flexDirection: 'row', alignItems: 'center', gap: sp[2], paddingVertical: sp[2], paddingHorizontal: sp[4], borderRadius: r.pill, backgroundColor: theme.bgOverlay, borderWidth: 1, borderColor: theme.border }}>
          <View style={{ width: sp[2], height: sp[2], borderRadius: sp[1], backgroundColor: color.gold[400] }} />
          <Text style={{ fontFamily: font.mono, fontSize: fs[11], fontWeight: fw[600], color: theme.fgMuted }}>Go to current</Text>
        </Pressable>
        <Pressable onPress={() => setShowKey(true)}
          style={{ paddingVertical: sp[2], paddingHorizontal: sp[4], borderRadius: r.pill, backgroundColor: theme.bgOverlay, borderWidth: 1, borderColor: theme.border }}>
          <Text style={{ fontFamily: font.mono, fontSize: fs[11], fontWeight: fw[600], color: theme.fgMuted }}>Key</Text>
        </Pressable>
      </View>

      {/* Key sheet */}
      <BottomSheet visible={showKey} onClose={() => setShowKey(false)} title="Key">
        <View style={{ gap: sp[4] }}>
          <View style={{ gap: sp[2] }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: theme.fgFaint, textTransform: 'uppercase', letterSpacing: 1 }}>The route</Text>
            <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5 }}>A proven path. The gold line marks where you've been. The dashed line shows what's ahead.</Text>
          </View>
          <View style={{ gap: sp[2] }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: theme.fgFaint, textTransform: 'uppercase', letterSpacing: 1 }}>Oases</Text>
            <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5 }}>Chapter checkpoints. Water level = your readiness for that exam.</Text>
          </View>
          <View style={{ gap: sp[2] }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: theme.fgFaint, textTransform: 'uppercase', letterSpacing: 1 }}>Topic markers</Text>
            {[
              { label: 'Mastered', col: color.noon[400] },
              { label: 'Progressing', col: color.gold[400] },
              { label: 'Needs work', col: color.terra[400] },
              { label: 'Here — current focus', col: color.noon[400] },
              { label: 'Unmapped', col: theme.fgFaint },
            ].map(item => (
              <View key={item.label} style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3] }}>
                <View style={{ width: 10, height: 10, transform: [{ rotate: '45deg' }], borderWidth: 1.5, borderColor: item.col, backgroundColor: item.label === 'Unmapped' ? 'transparent' : item.col }} />
                <Text style={{ fontFamily: font.sans, fontSize: fs[12], color: theme.fgMuted }}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </BottomSheet>

      {/* Chapter sheet */}
      <BottomSheet visible={!!sheetChapter} onClose={() => setSheetChapter(null)} title={sheetChapter?.title}>
        {sheetChapter && (
          <View style={{ gap: sp[3] }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.fgFaint }}>{sheetChapter.status === 'current' ? 'In progress' : sheetChapter.status === 'future' ? 'Upcoming' : 'Completed'}</Text>
            {sheetChapter.readiness > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3] }}>
                <Text style={{ fontFamily: font.mono, fontSize: fs[24], fontWeight: fw[700], color: theme.fg }}>{sheetChapter.readiness}%</Text>
                <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, flex: 1 }}>Water rises with each concept you master.</Text>
              </View>
            )}
          </View>
        )}
      </BottomSheet>

      {/* Topic sheet */}
      <BottomSheet visible={!!sheetTopic} onClose={() => setSheetTopic(null)} title={sheetTopic || ''}>
        {sheetTopic && (() => {
          const state = TOPIC_STATES[sheetTopic] || 'unstudied';
          return (
            <View style={{ gap: sp[3] }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[2] }}>
                <WaypointMarker state={topicWaypointState(state)} />
                <Text style={{ fontFamily: font.mono, fontSize: fs[11], fontWeight: fw[600], color: topicColor(state), textTransform: 'uppercase' }}>{topicLabel(state)}</Text>
              </View>
              <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fgMuted, lineHeight: fs[14] * 1.5 }}>Master this topic's concepts to fill the chapter oasis.</Text>
              {state !== 'mastered' && <Button variant="primary" onPress={() => setSheetTopic(null)}>Start practising</Button>}
            </View>
          );
        })()}
      </BottomSheet>
    </View>
  );
}
