/**
 * Every page for the RN explorer.
 * Mirrors the information architecture of index.html exactly.
 * Each exports a function component: Import → Props → Live examples.
 */
import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Animated, Easing, Image, Modal, Platform, useWindowDimensions, I18nManager } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Defs, LinearGradient, RadialGradient, Stop, Rect, Ellipse } from 'react-native-svg';
import {
  useTheme, Button, IconButton, Card, Chip, Avatar, Badge, Alert,
  SessionCard, HomeworkCard, SessionBar, QuizOption, Tooltip,
  Input, Textarea, Switch, Checkbox, Radio, Stepper, Segmented,
  Tabs, BottomNav, BottomAction, TitleBar, FilterBar, Divider, Skeleton, EmptyState, Table, type TableColumn, Pagination, Breadcrumbs,
  LinearProgress, CircularProgress, Toast, Dialog, BottomSheet, FullSheet, Interstitial,
  RadioGroup, CheckboxGroup,
  Icon, iconNames,
  GridPaper, Waypoints, WaypointMarker, WaterVessel, TerrainPattern, DunePattern, ConstellationPattern, VoiceTutor, Calendar,
  Identity, Menu, CardGrid, Leaderboard, VideoCard,
  ChatMessage, TypingIndicator, BreakdownCard, ActivityCard, ResourceList, SlidesCard, WorkedExampleCard,
  Oasis, RouteMap, type RouteChapter, type RouteMarker,
  DuneDynamic, StarsDynamic, TerrainDynamic, Slider,
  MatchQuestion, CategorizeQuestion, OrderQuestion, FillBlanksQuestion, HotspotQuestion,
  sp, fs, fw, font, color, r, h, icon, lh, dur,
} from '../../rn';

// ─── Playground — live preview + knobs, mirrors index.html .play ───
function Playground({ children, knobs }: { children: React.ReactNode; knobs: React.ReactNode }) {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const wide = width >= 768;
  // Always edge-to-edge. On wide screens: knobs on right. On narrow: knobs below.
  const pad = wide ? sp[7] : sp[5];
  return (
    <View style={{
      marginBottom: sp[5],
      marginTop: wide ? -sp[7] : -sp[5],
      marginHorizontal: -pad,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      ...(wide ? { flexDirection: 'row', minHeight: 360, alignItems: 'stretch' } : { minHeight: 200 }),
    }}>
      {/* Canvas */}
      <View style={{ backgroundColor: theme.bg, padding: pad, alignItems: 'center', justifyContent: 'center', minHeight: wide ? 260 : 140, flex: wide ? 1 : undefined }}>
        <View style={{ width: '100%', maxWidth: wide ? 480 : undefined, alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </View>
      </View>
      {/* Knobs */}
      <View style={{
        backgroundColor: theme.bgSunken,
        padding: sp[5],
        ...(wide
          ? { width: 300, borderStartWidth: 1, borderStartColor: theme.border, height: '100%' } as any
          : { borderTopWidth: 1, borderTopColor: theme.border }),
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[2], marginBottom: sp[4] }}>
          <View style={{ width: 6, height: 6, backgroundColor: theme.accent, transform: [{ rotate: '45deg' }] }} />
          <Text style={{ fontFamily: font.sans, fontSize: fs[10], letterSpacing: 2, textTransform: 'uppercase', fontWeight: fw[600], color: theme.fgFaint }}>Controls</Text>
        </View>
        {knobs}
      </View>
    </View>
  );
}

function KnobSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const { theme } = useTheme();
  return (
    <View style={{ marginBottom: sp[5] }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: sp[2] }}>
        <Text style={{ fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: theme.fgMuted }}>{label}</Text>
        <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint }}>{value}</Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, backgroundColor: theme.bg, padding: 2, borderRadius: r[2], borderWidth: 1, borderColor: theme.border }}>
        {options.map(opt => (
          <Pressable key={opt} onPress={() => onChange(opt)} style={{ flexGrow: 1, flexBasis: options.length <= 3 ? 0 : '30%', minWidth: 40, paddingVertical: 5, paddingHorizontal: 8, borderRadius: r[1], backgroundColor: value === opt ? theme.bgRaised : 'transparent', borderWidth: value === opt ? 1 : 0, borderColor: theme.borderStrong }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: value === opt ? theme.fg : theme.fgSubtle, textAlign: 'center' }}>{opt}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function KnobToggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  const { theme } = useTheme();
  return (
    <View style={{ marginBottom: sp[4] }}>
      <Pressable onPress={() => onChange(!value)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontFamily: font.sans, fontSize: fs[12], color: theme.fgMuted }}>{label}</Text>
        <Switch value={value} onValueChange={onChange} />
      </Pressable>
      <View style={{ marginTop: sp[3] }}><Divider /></View>
    </View>
  );
}

function KnobText({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const { theme } = useTheme();
  return (
    <View style={{ marginBottom: sp[5] }}>
      <Text style={{ fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: theme.fgMuted, marginBottom: sp[2] }}>{label}</Text>
      <Input value={value} onChangeText={onChange} placeholder={label} />
    </View>
  );
}

function KnobSlider({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void }) {
  return (
    <View style={{ marginBottom: sp[3] }}>
      <Slider label={label} value={value} min={min} max={max} step={step} onValueChange={onChange} />
    </View>
  );
}

// ─── Shell components ───
const dir = () => I18nManager.isRTL ? 'rtl' as const : 'ltr' as const;
const align = () => I18nManager.isRTL ? 'right' as const : 'left' as const;

function S({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <View style={{ marginBottom: sp[7] }}>
      <Text style={{ fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: theme.fgFaint, letterSpacing: 2, textTransform: 'uppercase', marginBottom: sp[3], paddingBottom: sp[2], borderBottomWidth: 1, borderBottomColor: theme.divider, textAlign: align(), writingDirection: dir() }}>{title}</Text>
      {desc ? <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgSubtle, marginBottom: sp[4], textAlign: align(), writingDirection: dir() }}>{desc}</Text> : null}
      {children}
    </View>
  );
}
function R({ children }: { children: React.ReactNode }) {
  return <View style={{ flexDirection: 'row', gap: sp[2], flexWrap: 'wrap', alignItems: 'center', marginBottom: sp[2] }}>{children}</View>;
}
function C({ label, children }: { label: string; children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <View style={{ backgroundColor: theme.bgRaised, borderRadius: r[2], borderWidth: 1, borderColor: theme.border, padding: sp[4], marginBottom: sp[3] }}>
      <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, marginBottom: sp[2], textAlign: align(), writingDirection: dir() }}>{label}</Text>
      {children}
    </View>
  );
}
function Rl({ children }: { children: string }) {
  const { theme } = useTheme();
  return <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5, paddingVertical: sp[2], textAlign: align(), writingDirection: dir() }}>{children}</Text>;
}
function Import({ children }: { children: string }) {
  const { theme } = useTheme();
  return (
    <View {...{ dataSet: { ltr: '' } }} style={{ backgroundColor: theme.bgRaised, borderRadius: r[2], borderWidth: 1, borderColor: theme.border, padding: sp[3], marginBottom: sp[5] }}>
      <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.accent }}>{children}</Text>
    </View>
  );
}
function Prop({ name, type, def, desc }: { name: string; type: string; def?: string; desc?: string }) {
  const { theme } = useTheme();
  return (
    <View {...{ dataSet: { ltr: '' } }} style={{ flexDirection: 'row', paddingVertical: sp[2], borderBottomWidth: 1, borderBottomColor: theme.divider, gap: sp[2] }}>
      <Text style={{ fontFamily: font.mono, fontSize: fs[12], color: theme.accent, minWidth: 80 }}>{name}</Text>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.fgMuted }}>{type}{def ? `  = ${def}` : ''}</Text>
        {desc ? <Text style={{ fontFamily: font.sans, fontSize: fs[11], color: theme.fgFaint, marginTop: sp[0.5] }}>{desc}</Text> : null}
      </View>
    </View>
  );
}
function Props({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <View style={{ marginBottom: sp[5] }}>
      <Text style={{ fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: theme.fgFaint, letterSpacing: 2, textTransform: 'uppercase', marginBottom: sp[2], textAlign: align(), writingDirection: dir() }}>Props</Text>
      {children}
    </View>
  );
}

// ═══════════════════════════════════════════════
// FOUNDATION
// ═══════════════════════════════════════════════

function NoonLogo({ fg, accent }: { fg: string; accent: string }) {
  return (
    <Svg width={200} height={92} viewBox="0 0 140 64" fill="none">
      <Path d="M82.7222 21.2108C76.868 21.2108 72.1168 25.962 72.1168 31.8162C72.1168 37.6704 76.868 42.4217 82.7222 42.4217C88.5764 42.4217 93.3277 37.6704 93.3277 31.8162C93.3277 25.962 88.5764 21.2108 82.7222 21.2108ZM82.7222 38.9007C78.8194 38.9007 75.6378 35.719 75.6378 31.8162C75.6378 27.9134 78.8194 24.7318 82.7222 24.7318C86.625 24.7318 89.8067 27.9134 89.8067 31.8162C89.8067 35.719 86.625 38.9007 82.7222 38.9007Z" fill={fg} />
      <Path d="M57.2692 21.2108C51.415 21.2108 46.6638 25.962 46.6638 31.8162C46.6638 37.6704 51.415 42.4217 57.2692 42.4217C63.1234 42.4217 67.8747 37.6704 67.8747 31.8162C67.8747 25.962 63.1234 21.2108 57.2692 21.2108Z" fill={accent} />
      <Path d="M31.8162 21.2108C25.962 21.2108 21.2108 25.962 21.2108 31.8162V41.149C21.2108 41.6156 21.5926 41.9974 22.0592 41.9974H23.8834C24.35 41.9974 24.7318 41.6156 24.7318 41.149V31.8162C24.7318 27.9134 27.9134 24.7318 31.8162 24.7318C35.719 24.7318 38.9007 27.9134 38.9007 31.8162V41.149C38.9007 41.6156 39.2824 41.9974 39.7491 41.9974H41.5732C42.0399 41.9974 42.4217 41.6156 42.4217 41.149V31.8162C42.4217 25.962 37.6704 21.2108 31.8162 21.2108Z" fill={fg} />
      <Path d="M108.175 21.2108C102.321 21.2108 97.5698 25.962 97.5698 31.8162V41.149C97.5698 41.6156 97.9516 41.9974 98.4183 41.9974H100.242C100.709 41.9974 101.091 41.6156 101.091 41.149V31.8162C101.091 27.9134 104.272 24.7318 108.175 24.7318C112.078 24.7318 115.26 27.9134 115.26 31.8162V41.149C115.26 41.6156 115.641 41.9974 116.108 41.9974H117.932C118.399 41.9974 118.781 41.6156 118.781 41.149V31.8162C118.781 25.962 114.029 21.2108 108.175 21.2108Z" fill={fg} />
      <Path d="M57.0995 36.9068C60.3236 40.046 65.6263 40.046 68.8503 36.9068C69.3594 36.3978 68.511 35.7614 68.0868 36.2281C65.2869 38.9855 60.7478 38.9855 57.9056 36.2281C57.4389 35.7614 56.5905 36.3978 57.0995 36.9068Z" fill={fg} />
    </Svg>
  );
}

export function OverviewPage() {
  const { theme } = useTheme();
  return <>
    <View style={{ marginBottom: sp[7] }}>
      <View style={{ marginBottom: sp[5] }}>
        <NoonLogo fg={theme.fg} accent={color.noon[400]} />
      </View>
      <Text style={{ fontFamily: font.serif, fontSize: fs[16], color: theme.fgMuted, lineHeight: fs[16] * 1.5 }}>Saudi-native visual language rooted in Empty Quarter geometry, surveyor's-notebook craft and cartographic precision. Void-first. Paper sparingly. Gold is journey signal only.</Text>
    </View>
    <S title="Setup">
      <Import>{"import { ThemeProvider, Button, Card, Chip } from '@noon/design-system';\nimport { sp, fs, fw, font, color } from '@noon/design-system/tokens';\n\nexport default function App() {\n  return (\n    <ThemeProvider initial=\"void\">\n      <Button variant=\"primary\" onPress={() => {}}>\n        Get started\n      </Button>\n    </ThemeProvider>\n  );\n}"}</Import>
    </S>
    <S title="What's Included">
      <C label="30 Components">
        <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>Button, Card, Chip, Avatar, Badge, Alert, Input, Switch, Checkbox, Radio, Stepper, Segmented, Tabs, BottomNav, TitleBar, Calendar, FilterBar, SessionCard, SessionBar, Waypoints, QuizOption, Dialog, BottomSheet, Toast, Tooltip, Progress, Skeleton, EmptyState, Table, Divider, Interstitial</Text>
      </C>
      <C label="Dependencies">
        <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>react-native-svg (circular progress only). No reanimated, no gesture handler. Pure RN 0.71+. Void and paper themes via ThemeProvider.</Text>
      </C>
    </S>
  </>;
}

export function BrandPage() {
  const { theme } = useTheme();
  const rule = (label: string, text: string) => (
    <View key={label} style={{ marginBottom: sp[4] }}>
      <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.accent, marginBottom: sp[1] }}>{label}</Text>
      <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5 }}>{text}</Text>
    </View>
  );
  return <>
    <S title="Voice" desc="Quiet authority. The surveyor who has walked this route before, not the hype coach.">
      {rule('Pronoun', 'Second person singular: "you", "your crew". Never "we" addressing the student.')}
      {rule('Naming', 'Outcome-named, not process-named. "You\'re on pace for 92" not "keep going." "Begin today\'s route" not "Start lesson."')}
      {rule('Tense', 'Present tense, short clauses. Surveyor telegrams, not motivational speeches.')}
      {rule('Certainty', '"The difficult passages are real" — admit the work. "If you follow the routes, you\'ll get there" — promise the outcome.')}
      {rule('Forbidden', 'No exclamation points. No emoji. No "keep exploring." No "you\'ve got this." No "great job."')}
    </S>
    <S title="Examples">
      <View style={{ borderStartWidth: 3, borderStartColor: theme.accent, borderRadius: r[1], paddingStart: sp[4], marginBottom: sp[4] } as any}>
        <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.accent, marginBottom: sp[2] }}>Do</Text>
        <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginBottom: sp[1] }}>"You're on pace for 92."</Text>
        <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginBottom: sp[1] }}>"Sarah cleared this last Thursday — she can walk you through it."</Text>
        <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>"18 jugs filled. Minimum 12 — you've done your part, and more."</Text>
      </View>
      <View style={{ borderStartWidth: 3, borderStartColor: theme.danger, borderRadius: r[1], paddingStart: sp[4] } as any}>
        <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.danger, marginBottom: sp[2] }}>Don't</Text>
        <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginBottom: sp[1] }}>"Keep crushing it!"</Text>
        <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginBottom: sp[1] }}>"Great job"</Text>
        <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>"Continue your learning journey"</Text>
      </View>
    </S>
    <S title="Key Terms" desc="These words are load-bearing — use them consistently.">
      {rule('Routes', 'Proven paths — structural, rarely named in UI directly.')}
      {rule('Terrain', 'Abstract brand surface evoking journey, progress, and destination. Not a literal map.')}
      {rule('Crew', '5-8 students who travel together under one facilitator.')}
      {rule('Passage', 'A single hard problem or topic.')}
      {rule('Water / Jugs', 'Proof of work + proof of helping others.')}
      {rule('Arrival', 'Destination — 90+ on Qudrat/Tahsili, university admission.')}
      {rule('Star Teacher', 'Remote subject expert.')}
      {rule('Facilitator', 'On-campus crew lead.')}
    </S>
    <S title="Visual Principles">
      <C label="Material Craft"><Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>Graph paper and grid notebooks, not ancient parchment. Modern precision hinting at physical — not skeuomorphism.</Text></C>
      <C label="Progress = Position"><Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>Diamond waypoints mark position on the route. Steps and bars are used but styled with the brand's cartographic visual language.</Text></C>
      <C label="Routes = Invisible Infrastructure"><Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>Golden pathways connecting students who should travel together. Show outcomes not mechanics.</Text></C>
      <C label="Difficult But Conquerable"><Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>Terrain is genuinely challenging. But difficult passages become manageable with the right teammates.</Text></C>
    </S>
    <S title="Colour Rules" desc="Every colour has one job. Follow semantic token roles — see Colors page for full definitions.">
      <Rl>Green is action. Purple is tutor. Gold is journey. Terra is place.</Rl>
      <Rl>Never swap roles. Gold on a button is wrong. Purple on a card is wrong.</Rl>
      <Rl>Use semantic tokens (theme.accent, theme.iris) not primitives (color.noon[400]).</Rl>
      <Rl>Colours adapt per theme — don't hardcode values.</Rl>
    </S>
    <S title="Non-Negotiables">
      <Rl>No emoji. No illustrated characters. No mascots.</Rl>
      <Rl>No pure black or pure white — always ink and paper.</Rl>
      <Rl>No gradients in chrome. No glassmorphism.</Rl>
      <Rl>No third-party icon CDNs (Lucide, Heroicons, etc).</Rl>
      <Rl>Gold is journey signal only — never used for general interface elements.</Rl>
    </S>
  </>;
}

export function ColorsPage() {
  const { theme } = useTheme();
  const swatch = (c: string, name: string) => (
    <View key={name} {...{ dataSet: { ltr: '' } }} style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3], marginBottom: sp[2] }}>
      <View style={{ width: sp[7], height: sp[7], borderRadius: r[2], backgroundColor: c, borderWidth: 1, borderColor: theme.border }} />
      <View>
        <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.fg }}>{name}</Text>
        <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint }}>{c}</Text>
      </View>
    </View>
  );
  const scaleRow = (name: string, scale: Record<string, string>) => (
    <View key={name} {...{ dataSet: { ltr: '' } }} style={{ marginBottom: sp[5] }}>
      <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.fgMuted, marginBottom: sp[2] }}>{name}</Text>
      <View style={{ flexDirection: 'row', gap: sp[1], flexWrap: 'wrap' }}>
        {Object.entries(scale).map(([step, hex]) => (
          <View key={step} style={{ alignItems: 'center', gap: sp[1] }}>
            <View style={{ width: 40, height: 40, borderRadius: r[1], backgroundColor: hex, borderWidth: 1, borderColor: theme.border }} />
            <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgFaint }}>{step}</Text>
          </View>
        ))}
      </View>
    </View>
  );
  return <>
    <Import>{"import { color, voidTheme, paperTheme } from '@noon/design-system/tokens';"}</Import>
    <S title="Semantic — Surfaces" desc="Background layers. Sunken for sidebars, raised for cards, overlay for modals.">
      {swatch(theme.bg, 'bg')}{swatch(theme.bgSunken, 'bgSunken')}{swatch(theme.bgRaised, 'bgRaised')}{swatch(theme.bgOverlay, 'bgOverlay')}{swatch(theme.inputBg, 'inputBg')}
    </S>
    <S title="Semantic — Foreground" desc="Text hierarchy. fg for primary, muted for secondary, faint for labels, disabled for inactive.">
      {swatch(theme.fg, 'fg')}{swatch(theme.fgMuted, 'fgMuted')}{swatch(theme.fgSubtle, 'fgSubtle')}{swatch(theme.fgFaint, 'fgFaint')}{swatch(theme.fgDisabled, 'fgDisabled')}{swatch(theme.fgInverse, 'fgInverse')}
    </S>
    <S title="Semantic — Borders" desc="Container edges and dividers. border for cards, borderStrong for inputs, divider for list separators.">
      {swatch(theme.border, 'border')}{swatch(theme.borderStrong, 'borderStrong')}{swatch(theme.divider, 'divider')}
    </S>
    <S title="Semantic — Accent" desc="Action and interaction. Primary CTA, buttons, active states, confirmations. The teal green.">
      {swatch(theme.accent, 'accent')}{swatch(theme.accentFg, 'accentFg')}{swatch(theme.accentSoft, 'accentSoft')}{swatch(theme.accentBorder, 'accentBorder')}
    </S>
    <S title="Semantic — Signal" desc="Journey and progress. Waypoints, achievements, route markers. Gold is journey signal only.">
      {swatch(theme.signal, 'signal')}{swatch(theme.signalBright, 'signalBright')}{swatch(theme.signalSoft, 'signalSoft')}{swatch(theme.signalBorder, 'signalBorder')}
    </S>
    <S title="Semantic — Danger" desc="Destructive actions, errors, validation failures.">
      {swatch(theme.danger, 'danger')}{swatch(theme.dangerSoft, 'dangerSoft')}{swatch(theme.dangerBorder, 'dangerBorder')}
    </S>
    <S title="Semantic — Iris" desc="Voice tutor exclusively. Regal and authoritative — the respected guide. Reserved for the AI presence.">
      {swatch(theme.iris, 'iris')}{swatch(theme.irisSoft, 'irisSoft')}{swatch(theme.irisBorder, 'irisBorder')}{swatch(theme.irisLabel, 'irisLabel')}{swatch(theme.irisDot, 'irisDot')}
    </S>
    <S title="Semantic — Terra" desc="Warmth and place. Saudi dunes after rain. Classroom content, physical space, secondary highlights.">
      {swatch(theme.terra, 'terra')}{swatch(theme.terraSoft, 'terraSoft')}{swatch(theme.terraBorder, 'terraBorder')}
    </S>
    <S title="Semantic — Overlays" desc="Interactive state layers. Hover for mouseover, active for pressed, selected for chosen items.">
      {swatch(theme.hoverOverlay, 'hoverOverlay')}{swatch(theme.activeOverlay, 'activeOverlay')}{swatch(theme.selectedOverlay, 'selectedOverlay')}{swatch(theme.accentGlow, 'accentGlow')}
    </S>
    <S title="Primitive Scales" desc="Raw colour values. Use semantic tokens above — primitives are for reference only.">
      {scaleRow('void', color.void)}{scaleRow('chalk', color.chalk)}{scaleRow('paper', color.paper)}
      {scaleRow('noon', color.noon)}{scaleRow('gold', color.gold)}{scaleRow('iris', color.iris)}
      {scaleRow('blue', color.blue)}{scaleRow('danger', color.danger)}{scaleRow('warn', color.warn)}{scaleRow('terra', color.terra)}
    </S>
    <S title="Physical to Digital" desc="The digital system mirrors the physical classroom palette.">
      <Image source={require('../../reference/classroom-palette.png')} style={{ width: 340, height: 340 * (1196 / 1686), borderRadius: r[2], marginBottom: sp[4] }} resizeMode="cover" />
      <View style={{ gap: sp[3] }}>
        {([
          ['Teal Upholstery', theme.accent, 'noon accent'],
          ['Terracotta', theme.terra, 'terra'],
        ] as const).map(([material, c, token]) => (
          <View key={material} style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3] }}>
            <View style={{ width: sp[7], height: sp[7], borderRadius: r[2], backgroundColor: c, borderWidth: 1, borderColor: theme.border }} />
            <Text style={{ fontFamily: font.sans, fontSize: fs[12], color: theme.fgMuted }}><Text style={{ color: theme.fg }}>{material}</Text> → {token}</Text>
          </View>
        ))}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3] }}>
          <View style={{ width: sp[7], height: sp[7], borderRadius: r[2], backgroundColor: theme.bg, borderWidth: 1, borderColor: theme.border, overflow: 'hidden' }}>
            {[1,2,3].map(i => <View key={`h${i}`} style={{ position: 'absolute', top: `${i * 25}%`, left: 2, right: 2, height: 1, backgroundColor: theme.border }} />)}
            {[1,2,3].map(i => <View key={`v${i}`} style={{ position: 'absolute', left: `${i * 25}%`, top: 2, bottom: 2, width: 1, backgroundColor: theme.border }} />)}
          </View>
          <Text style={{ fontFamily: font.sans, fontSize: fs[12], color: theme.fgMuted }}><Text style={{ color: theme.fg }}>Textured Rug</Text> → paper + grid</Text>
        </View>
        {([
          ['Concrete', color.chalk[300], 'chalk'],
          ['Light Oak', color.paper[200], 'paper surfaces'],
          ['Glass Glazing', theme.bgOverlay, 'elevation + overlays'],
        ] as const).map(([material, c, token]) => (
          <View key={material} style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3] }}>
            <View style={{ width: sp[7], height: sp[7], borderRadius: r[2], backgroundColor: c, borderWidth: 1, borderColor: theme.border }} />
            <Text style={{ fontFamily: font.sans, fontSize: fs[12], color: theme.fgMuted }}><Text style={{ color: theme.fg }}>{material}</Text> → {token}</Text>
          </View>
        ))}
      </View>
    </S>
  </>;
}

export function TypographyPage() {
  const { theme } = useTheme();
  const sample = (family: string, label: string, displayName: string) => (
    <View key={displayName} style={{ marginBottom: sp[5] }}>
      <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, marginBottom: sp[2] }}>{displayName}</Text>
      <Text style={{ fontFamily: family, fontSize: fs[24], color: theme.fg }}>{label}</Text>
      <Text style={{ fontFamily: family, fontSize: fs[15], color: theme.fgMuted, marginTop: sp[1] }}>The surveyor who has walked this route before, not the hype coach.</Text>
    </View>
  );
  return <>
    <Import>{"import { font, fs, fw, lh } from '@noon/design-system/tokens';"}</Import>
    <S title="Type Families">
      {sample(font.serif, 'Crimson Pro', 'font.serif — CrimsonPro')}
      {sample(font.sans, 'Vazirmatn', 'font.sans — Vazirmatn')}
      {sample(font.mono, 'JetBrains Mono', 'font.mono — JetBrainsMono')}
    </S>
    <S title="Font Size Scale" desc="Every size rendered at actual pixels.">
      {Object.entries(fs).map(([k, v]) => (
        <View key={k} {...{ dataSet: { ltr: '' } }} style={{ flexDirection: 'row', alignItems: 'baseline', gap: sp[3], marginBottom: sp[2] }}>
          <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, minWidth: 48, textAlign: 'right' }}>fs-{k}</Text>
          <Text style={{ fontFamily: font.sans, fontSize: v as number, color: theme.fg }}>{v}px</Text>
        </View>
      ))}
    </S>
    <S title="Font Weights">
      {([
        ['300', 'Vazirmatn-Light'],
        ['400', 'Vazirmatn'],
        ['500', 'Vazirmatn-Medium'],
        ['600', 'Vazirmatn-SemiBold'],
        ['700', 'Vazirmatn-Bold'],
      ] as const).map(([k, family]) => (
        <View key={k} {...{ dataSet: { ltr: '' } }} style={{ flexDirection: 'row', alignItems: 'baseline', gap: sp[3], marginBottom: sp[2] }}>
          <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, minWidth: 48, textAlign: 'right' }}>fw-{k}</Text>
          <Text style={{ fontFamily: family, fontSize: fs[16], color: theme.fg }}>The quick brown fox</Text>
        </View>
      ))}
    </S>
    <S title="Line Heights">
      {Object.entries(lh).map(([k, v]) => (
        <View key={k} style={{ marginBottom: sp[4] }}>
          <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, marginBottom: sp[1] }}>lh.{k} = {v}</Text>
          <View style={{ backgroundColor: theme.bgRaised, borderRadius: r[2], borderWidth: 1, borderColor: theme.border, padding: sp[3] }}>
            <Text style={{ fontFamily: font.sans, fontSize: fs[14], lineHeight: Math.round(fs[14] * Math.max(v, 1.3)), color: theme.fgMuted }}>Line height {k} ({v}). Two lines of text to demonstrate vertical rhythm and spacing between baselines.</Text>
          </View>
        </View>
      ))}
    </S>
  </>;
}

export function SpacingPage() {
  const { theme } = useTheme();
  return <>
    <Import>{"import { sp, icon, h } from '@noon/design-system/tokens';"}</Import>
    <S title="Spacing Scale" desc="Used for padding, margins, and gaps.">
      {Object.entries(sp).map(([k, v]) => (
        <View key={k} {...{ dataSet: { ltr: '' } }} style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3], marginBottom: sp[2] }}>
          <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.fgFaint, minWidth: 48, textAlign: 'right' }}>sp-{k}</Text>
          <View style={{ height: 20, width: v as number, backgroundColor: theme.accentSoft, borderRadius: r[1], borderWidth: 1, borderColor: theme.accentBorder, minWidth: v === 0 ? 2 : undefined }} />
          <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint }}>{v}px</Text>
        </View>
      ))}
    </S>
    <S title="Icon Sizes">
      {Object.entries(icon).map(([k, v]) => (
        <View key={k} {...{ dataSet: { ltr: '' } }} style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3], marginBottom: sp[3] }}>
          <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.fgFaint, minWidth: 52, textAlign: 'right' }}>icon-{k}</Text>
          <View style={{ width: v as number, height: v as number, borderRadius: r[1], backgroundColor: theme.accent }} />
          <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint }}>{v}px</Text>
        </View>
      ))}
    </S>
    <S title="Component Heights">
      {Object.entries(h).map(([k, v]) => (
        <View key={k} {...{ dataSet: { ltr: '' } }} style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3], marginBottom: sp[2] }}>
          <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.fgFaint, minWidth: 40, textAlign: 'right' }}>h-{k}</Text>
          <View style={{ width: 120, height: v as number, backgroundColor: theme.bgRaised, borderRadius: r[2], borderWidth: 1, borderColor: theme.border, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint }}>{v}px</Text>
          </View>
        </View>
      ))}
    </S>
  </>;
}

export function RadiiPage() {
  const { theme } = useTheme();
  return <>
    <Import>{"import { r } from '@noon/design-system/tokens';"}</Import>
    <S title="Radius Scale" desc="Applied consistently by component type.">
      <View style={{ flexDirection: 'row', gap: sp[4], flexWrap: 'wrap' }}>
        {Object.entries(r).map(([k, v]) => (
          <View key={k} style={{ alignItems: 'center', gap: sp[2] }}>
            <View style={{ width: 72, height: 72, backgroundColor: theme.bgRaised, borderWidth: 1.5, borderColor: theme.accentBorder, borderRadius: v as number, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.fgFaint }}>r-{k}</Text>
            </View>
            <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint }}>{v}px</Text>
          </View>
        ))}
      </View>
    </S>
    <S title="Usage Guide">
      <Rl>r-0 (0) — No rounding. Table cells, flush edges.</Rl>
      <Rl>r-1 (2px) — Micro. Tags, tiny pills, inset elements.</Rl>
      <Rl>r-2 (4px) — Default. Buttons, inputs, chips, cards.</Rl>
      <Rl>r-3 (6px) — Medium. Larger cards, containers.</Rl>
      <Rl>r-4 (8px) — Large. Modals, sheets, prominent cards.</Rl>
      <Rl>r-pill (999px) — Fully rounded. Avatars, status dots, pills.</Rl>
    </S>
  </>;
}

export function ElevationPage() {
  const { theme, elevation } = useTheme();
  const levels = [
    { z: 0, label: 'Flat', desc: 'Page background. No border, no shadow.' },
    { z: 1, label: 'Card', desc: 'Resting cards, list items, input containers.' },
    { z: 2, label: 'Raised', desc: 'Active selections, raised cards.' },
    { z: 3, label: 'Popover', desc: 'Dropdown menus, popovers, tooltips.' },
    { z: 4, label: 'Modal', desc: 'Full modals and command palettes.' },
  ];
  return <>
    <Import>{"import { useTheme } from '@noon/design-system';\nconst { elevation } = useTheme();\n// <View style={[styles.card, elevation[1]]} />"}</Import>
    <S title="Elevation Levels" desc="Toggle theme to compare void (borders) vs paper (shadows).">
      {levels.map(({ z, label, desc }) => (
        <View key={z} style={[{ backgroundColor: z >= 3 ? theme.bgOverlay : z >= 1 ? theme.bgRaised : theme.bg, borderRadius: r[3], padding: sp[5], marginBottom: sp[4] }, elevation[z]]}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: sp[2], marginBottom: sp[1] }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[14], color: theme.fg }}>z{z}</Text>
            <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.fgFaint }}>{label}</Text>
          </View>
          <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>{desc}</Text>
        </View>
      ))}
    </S>
    <S title="Nested Context" desc="Each level nests inside the one below.">
      <View style={[{ backgroundColor: theme.bg, borderRadius: r[3], padding: sp[4] }, elevation[0]]}>
        <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, marginBottom: sp[3] }}>z0 — Page</Text>
        <View style={[{ backgroundColor: theme.bgRaised, borderRadius: r[2], padding: sp[4] }, elevation[1]]}>
          <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, marginBottom: sp[3] }}>z1 — Card</Text>
          <View style={[{ backgroundColor: theme.bgOverlay, borderRadius: r[2], padding: sp[4] }, elevation[3]]}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, marginBottom: sp[3] }}>z3 — Popover</Text>
            <View style={[{ backgroundColor: theme.bgOverlay, borderRadius: r[2], padding: sp[4] }, elevation[4]]}>
              <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint }}>z4 — Modal</Text>
            </View>
          </View>
        </View>
      </View>
    </S>
  </>;
}

function MotionDemo({ label, spec, desc, children }: { label: string; spec: string; desc: string; children: (anim: Animated.Value) => React.ReactNode }) {
  const { theme } = useTheme();
  const anim = React.useRef(new Animated.Value(0)).current;
  const play = () => {
    anim.setValue(0);
    Animated.timing(anim, { toValue: 1, duration: 320, easing: Easing.bezier(0.22, 0.61, 0.36, 1), useNativeDriver: false }).start();
  };
  React.useEffect(() => { play(); }, []);
  return (
    <Pressable onPress={play}>
      <View style={{ backgroundColor: theme.bgRaised, borderRadius: r[2], borderWidth: 1, borderColor: theme.border, padding: sp[4], marginBottom: sp[3] }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: sp[3] }}>
          <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.accent }}>{label}</Text>
          <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint }}>{spec}</Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', minHeight: 48, marginBottom: sp[2] }}>
          {children(anim)}
        </View>
        <Text style={{ fontFamily: font.sans, fontSize: fs[11], color: theme.fgFaint }}>{desc}</Text>
      </View>
    </Pressable>
  );
}

function MotionToggleDemo() {
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    const t = setInterval(() => setOn(v => !v), 1500);
    return () => clearInterval(t);
  }, []);
  return <View style={{ flexDirection: 'row', gap: sp[4] }}><Switch value={on} onValueChange={() => {}} /><Checkbox checked={on} onValueChange={() => {}} /></View>;
}

function MotionStaggerDemo({ count, stagger, duration, shape }: { count: number; stagger: number; duration: number; shape: 'diamond' | 'dot' }) {
  const { theme } = useTheme();
  const anims = React.useRef(Array.from({ length: count }, () => new Animated.Value(0))).current;
  const play = () => {
    anims.forEach(a => a.setValue(0));
    Animated.stagger(stagger, anims.map(a =>
      Animated.timing(a, { toValue: 1, duration, easing: Easing.bezier(0.22, 0.61, 0.36, 1), useNativeDriver: false })
    )).start();
  };
  React.useEffect(() => { play(); }, []);
  return (
    <Pressable onPress={play}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[2] }}>
        {anims.map((a, i) => (
          <Animated.View key={i} style={{
            width: shape === 'diamond' ? 12 : 8,
            height: shape === 'diamond' ? 12 : 8,
            backgroundColor: i < count - 1 ? color.gold[400] : color.noon[400],
            borderRadius: shape === 'dot' ? 999 : 0,
            transform: shape === 'diamond' ? [{ rotate: '45deg' }, { scale: a }] : [{ scale: a }],
            opacity: a,
          }} />
        ))}
      </View>
    </Pressable>
  );
}

function EasingDemo({ label, code, desc, easing, duration }: { label: string; code: string; desc: string; easing: (t: number) => number; duration: number }) {
  const { theme } = useTheme();
  const anim = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration, easing, useNativeDriver: false }),
        Animated.delay(400),
        Animated.timing(anim, { toValue: 0, duration: duration * 0.5, easing: Easing.bezier(0.4, 0, 1, 1), useNativeDriver: false }),
        Animated.delay(400),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);
  const width = anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  return (
    <View style={{ marginBottom: sp[5] }}>
      <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.accent, marginBottom: sp[1] }}>{label}</Text>
      <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, marginBottom: sp[3] }}>{code}</Text>
      <View style={{ height: 4, backgroundColor: theme.accentSoft, borderRadius: 999, overflow: 'hidden' }}>
        <Animated.View style={{ width, height: '100%', backgroundColor: theme.accent, borderRadius: 999 }} />
      </View>
      <Text style={{ fontFamily: font.sans, fontSize: fs[11], color: theme.fgFaint, marginTop: sp[2] }}>{desc}</Text>
    </View>
  );
}

export function MotionPage() {
  const { theme } = useTheme();
  return <>
    <Import>{"import { dur } from '@noon/design-system/tokens';\nimport { Animated, Easing } from 'react-native';"}</Import>

    <S title="Principles" desc="Motion should feel purposeful and calm — the surveyor, not the showman.">
      <C label="Meaningful"><Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>Every animation communicates something — entry direction, state change, spatial relationship. Never animate just because you can.</Text></C>
      <C label="Quick"><Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>Interactions respond immediately. Most transitions 120-200ms. Longer (300ms+) reserved for page-level entrances and celebrations.</Text></C>
      <C label="Consistent"><Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>Same type of motion = same curve and duration everywhere. A bottom sheet always slides the same way.</Text></C>
      <C label="Reducible"><Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>All animations must respect reduced-motion. Replace with instant state changes — never remove the state change itself.</Text></C>
    </S>

    <S title="Easing Curves" desc="Live animated demos. Watch the bar move with each curve.">
      <EasingDemo label="Ease — default for everything" code="Easing.bezier(0.22, 0.61, 0.36, 1)" desc="Fast start, gentle deceleration. Entries, toggles, expansions." easing={Easing.bezier(0.22, 0.61, 0.36, 1)} duration={2000} />
      <EasingDemo label="Ease-In — exits only" code="Easing.bezier(0.4, 0, 1, 1)" desc="Slow start, accelerates away. Dismissals, close, slide-out." easing={Easing.bezier(0.4, 0, 1, 1)} duration={2000} />
      <EasingDemo label="Spring — celebrations" code="Easing.bezier(0.34, 1.56, 0.64, 1)" desc="Overshoots then settles. Mastery stamp, confetti, achievements only." easing={Easing.bezier(0.34, 1.56, 0.64, 1)} duration={2000} />
      <EasingDemo label="Linear — progress bars" code="Easing.linear" desc="Constant speed. Only for progress fills and loading indicators." easing={Easing.linear} duration={2000} />
    </S>

    <S title="Durations">
      <View style={{ flexDirection: 'row', gap: sp[3], marginBottom: sp[4] }}>
        {[{ ms: 120, label: 'FAST', desc: 'Toggles, focus, color' }, { ms: 200, label: 'NORMAL', desc: 'Tabs, chips, expand' }, { ms: 320, label: 'SLOW', desc: 'Sheets, modals, pages' }, { ms: 600, label: 'DRAMATIC', desc: 'Confetti, counters' }, { ms: 1500, label: 'AMBIENT', desc: 'Ping, pulse, presence' }].map(d => (
          <View key={d.ms} style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[22], fontWeight: fw[600], color: theme.fg }}>{d.ms >= 600 ? d.ms + '+' : d.ms}</Text>
            <Text style={{ fontFamily: font.mono, fontSize: fs[9], fontWeight: fw[600], letterSpacing: 2, color: theme.fgFaint, marginTop: sp[1] }}>{d.label}</Text>
            <Text style={{ fontFamily: font.sans, fontSize: fs[10], color: theme.fgFaint, marginTop: sp[1], textAlign: 'center' }}>{d.desc}</Text>
          </View>
        ))}
      </View>
    </S>

    <S title="Component Motion" desc="Tap each demo to replay. Duration is always one of the 4 tokens. Stagger is the delay before the next item starts.">
      <MotionDemo label="Button press" spec="Ease · 120ms" desc="Scale to 0.97, opacity 0.9">
        {(anim) => <Animated.View style={{ transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.97] }) }], opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.9] }) }}><Button>Label</Button></Animated.View>}
      </MotionDemo>
      <MotionDemo label="Card press" spec="Ease · 120ms" desc="Opacity 0.9, translateY 0.5">
        {(anim) => <Animated.View style={{ width: '100%', transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.5] }) }], opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.9] }) }}><Card title="Card content" subtitle="Press feedback demo" /></Animated.View>}
      </MotionDemo>
      <MotionDemo label="Switch / Checkbox" spec="Ease · 120ms" desc="Thumb slides, check scales in">
        {() => <MotionToggleDemo />}
      </MotionDemo>
      <MotionDemo label="Dialog / Modal" spec="Ease · 200ms" desc="Scale from 0.95 + fade in">
        {(anim) => <Animated.View style={{ width: '100%', backgroundColor: theme.bgOverlay, borderRadius: r[3], padding: sp[5], borderWidth: 1, borderColor: theme.border, transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) }], opacity: anim }}><Text style={{ fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[600], color: theme.fg, marginBottom: sp[1] }}>Are you sure?</Text><Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>This action cannot be undone.</Text></Animated.View>}
      </MotionDemo>
      <MotionDemo label="Toast" spec="Ease · 200ms" desc="Slide down from top, auto-dismiss with Ease-In">
        {(anim) => <Animated.View style={{ backgroundColor: theme.bgRaised, borderRadius: r[2], padding: sp[3], borderWidth: 1, borderColor: theme.accentBorder, flexDirection: 'row', alignItems: 'center', gap: sp[2], transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }], opacity: anim }}><Icon name="check" size={icon.lg} color={color.noon[400]} /><Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fg }}>Session saved</Text></Animated.View>}
      </MotionDemo>
      <MotionDemo label="Menu" spec="Ease · 200ms" desc="Scale from 0.9 + fade, anchored to trigger">
        {(anim) => <Animated.View style={{ backgroundColor: theme.bgOverlay, borderRadius: r[2], padding: sp[2], borderWidth: 1, borderColor: theme.border, minWidth: 160, transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) }], opacity: anim }}>{['Edit', 'Duplicate', 'Delete'].map(item => <Text key={item} style={{ fontFamily: font.sans, fontSize: fs[13], color: item === 'Delete' ? theme.danger : theme.fg, paddingVertical: sp[2], paddingHorizontal: sp[3] }}>{item}</Text>)}</Animated.View>}
      </MotionDemo>
      <MotionDemo label="BottomSheet" spec="Ease · 320ms" desc="Slide up from bottom, fade overlay">
        {(anim) => <Animated.View style={{ width: '100%', backgroundColor: theme.bgOverlay, borderTopLeftRadius: r[4], borderTopRightRadius: r[4], padding: sp[5], borderWidth: 1, borderColor: theme.border, transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [60, 0] }) }], opacity: anim }}><View style={{ width: 32, height: 4, borderRadius: 2, backgroundColor: theme.fgFaint, alignSelf: 'center', marginBottom: sp[3] }} /><Text style={{ fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[600], color: theme.fg }}>Session details</Text></Animated.View>}
      </MotionDemo>
      <MotionDemo label="Progress bar" spec="Linear · 320ms" desc="Fill width animates to new value">
        {(anim) => <View style={{ height: 4, backgroundColor: theme.accentSoft, borderRadius: 999, overflow: 'hidden', width: '100%' }}><Animated.View style={{ width: anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '76%'] }), height: '100%', backgroundColor: theme.accent, borderRadius: 999 }} /></View>}
      </MotionDemo>
      <MotionDemo label="Mastery star" spec="Spring · 600ms" desc="Overshoot bounce, then settle">
        {(anim) => <Animated.View style={{ transform: [{ scale: anim.interpolate({ inputRange: [0, 0.6, 1], outputRange: [0, 1.3, 1] }) }, { rotate: anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '72deg'] }) }], opacity: anim }}><Text style={{ fontSize: 32, color: color.gold[300] }}>{'★'}</Text></Animated.View>}
      </MotionDemo>
      <MotionDemo label="Waypoint ping" spec="Ease-Out · 1500ms + 1s pause" desc="Diamond expands and fades — signals current position">
        {() => <WaypointMarker state="current" />}
      </MotionDemo>
    </S>

    <S title="RN Implementation">
      <Rl>Use Animated.timing for most transitions. Animated.spring for celebrations (damping: 12, stiffness: 180).</Rl>
      <Rl>Always animate transform and opacity on native thread (useNativeDriver: true). Never animate layout properties (width, height, padding).</Rl>
      <Rl>Reduced motion: check AccessibilityInfo.isReduceMotionEnabled(). Set all durations to 0, keep state changes.</Rl>
      <Rl>Bottom sheet drag: use PanResponder or react-native-gesture-handler with velocity-based snap points.</Rl>
    </S>
  </>;
}

export function IconsPage() {
  const { theme } = useTheme();
  const [selectedIcon, setSelectedIcon] = useState('chevron-right');
  const [iconSize, setIconSize] = useState('md');
  const sizeMap: Record<string, number> = { xs: 6, sm: 10, md: 14, lg: 18, xl: 20, '2xl': 28 };
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="Size" value={iconSize} options={['xs', 'sm', 'md', 'lg', 'xl', '2xl']} onChange={setIconSize} />
      </>}
    >
      <Icon name={selectedIcon as any} size={sizeMap[iconSize]} color={theme.fg} />
    </Playground>

    <Import>{"import { Icon } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="name" type="IconName" desc="Icon identifier" />
      <Prop name="size" type="number" def="14 (icon.md)" desc="Pixel size. Use icon tokens." />
      <Prop name="color" type="string" def="theme.fg" desc="Inherits from context. Match parent component colour." />
    </Props>

    <S title="All Icons" desc="Tap to preview in the playground above.">
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: sp[3] }}>
        {iconNames.map(name => (
          <Pressable key={name} onPress={() => setSelectedIcon(name)} style={{ alignItems: 'center', gap: sp[1], padding: sp[3], borderRadius: r[2], backgroundColor: selectedIcon === name ? theme.activeOverlay : 'transparent', borderWidth: selectedIcon === name ? 1 : 0, borderColor: theme.border, minWidth: 64 }}>
            <Icon name={name} size={18} color={selectedIcon === name ? theme.fg : theme.fgMuted} />
            <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgFaint }}>{name}</Text>
          </Pressable>
        ))}
      </View>
    </S>

    <S title="Sizes" desc="Use icon tokens for consistent sizing across components.">
      <View style={{ gap: sp[3] }}>
        {Object.entries(sizeMap).map(([name, size]) => (
          <View key={name} {...{ dataSet: { ltr: '' } }} style={{ flexDirection: 'row', alignItems: 'center', gap: sp[4] }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.fgFaint, minWidth: 40, textAlign: 'right' }}>icon.{name}</Text>
            <Icon name="chevron-right" size={size} color={theme.fg} />
            <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint }}>{size}px</Text>
          </View>
        ))}
      </View>
    </S>

    <S title="Usage in Components" desc="Icons inherit colour from their parent. The component constrains the size.">
      <Rl>Button: leadingIcon / trailingIcon — constrained to 14/16/18px per sm/md/lg.</Rl>
      <Rl>IconButton: children — fills the button. Use icon.md (14) for sm, icon.lg (18) for md/lg.</Rl>
      <Rl>Calendar: uses IconButton ghost sm for navigation chevrons.</Rl>
      <Rl>TitleBar: back icon via backIcon prop.</Rl>
      <Rl>BottomNav: icon per tab item.</Rl>
    </S>

    <S title="Rules">
      <Rl>All icons are custom SVG. No third-party icon libraries.</Rl>
      <Rl>Stroke-based, 1.5px weight, round caps and joins.</Rl>
      <Rl>Colour always from theme tokens — never hardcoded.</Rl>
      <Rl>Size always from icon tokens — never hardcoded pixel values.</Rl>
    </S>
  </>;
}

export function GridSystemPage() {
  const { theme } = useTheme();
  return <>
    <S title="Grid System" desc="Layout primitives for RN. No CSS grid — use flexbox with token spacing.">
      <C label="Row with gap">
        <View style={{ flexDirection: 'row', gap: sp[3] }}>
          <View style={{ flex: 1, height: 40, backgroundColor: theme.accentSoft, borderRadius: r[2], borderWidth: 1, borderColor: theme.accentBorder }} />
          <View style={{ flex: 1, height: 40, backgroundColor: theme.accentSoft, borderRadius: r[2], borderWidth: 1, borderColor: theme.accentBorder }} />
          <View style={{ flex: 1, height: 40, backgroundColor: theme.accentSoft, borderRadius: r[2], borderWidth: 1, borderColor: theme.accentBorder }} />
        </View>
      </C>
      <C label="Column with gap">
        <View style={{ gap: sp[3] }}>
          <View style={{ height: 32, backgroundColor: theme.accentSoft, borderRadius: r[2], borderWidth: 1, borderColor: theme.accentBorder }} />
          <View style={{ height: 32, backgroundColor: theme.accentSoft, borderRadius: r[2], borderWidth: 1, borderColor: theme.accentBorder }} />
        </View>
      </C>
      <C label="2-column layout">
        <View style={{ flexDirection: 'row', gap: sp[4] }}>
          <View style={{ flex: 2, height: 80, backgroundColor: theme.bgRaised, borderRadius: r[2], borderWidth: 1, borderColor: theme.border }} />
          <View style={{ flex: 1, height: 80, backgroundColor: theme.bgRaised, borderRadius: r[2], borderWidth: 1, borderColor: theme.border }} />
        </View>
      </C>
    </S>
    <S title="Spacing Scale">
      <View style={{ gap: sp[2] }}>
        {([['0', 0], ['0.5', 2], ['1', 4], ['2', 8], ['3', 12], ['4', 16], ['5', 20], ['6', 24], ['7', 32], ['8', 40], ['9', 48], ['10', 64], ['11', 80], ['12', 96]] as const).map(([key, val]) => (
          <View key={key} {...{ dataSet: { ltr: '' } }} style={{ flexDirection: 'row', alignItems: 'center', gap: sp[4] }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.fgFaint, width: 48, textAlign: 'right' }}>sp[{key}]</Text>
            <View style={{ height: 20, width: val, backgroundColor: theme.accentSoft, borderRadius: r[1], borderWidth: 1, borderColor: theme.accentBorder }} />
            <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint }}>{val}px</Text>
          </View>
        ))}
      </View>
    </S>
    <S title="Rules">
      <Rl>8px base unit. All spacing snaps to the sp token scale (4, 8, 12, 16, 20, 24, 32…).</Rl>
      <Rl>Always use sp tokens for gap, padding, margin. Never hardcode pixel values.</Rl>
      <Rl>Use flexDirection: 'row' for horizontal, default (column) for vertical.</Rl>
      <Rl>Screen edge padding: sp[5] (20px) on phone, sp[7] (32px) on tablet.</Rl>
    </S>
  </>;
}

// ═══════════════════════════════════════════════
// ACTIONS
// ═══════════════════════════════════════════════

export function ButtonsPage() {
  const { theme } = useTheme();
  const [variant, setVariant] = useState('primary');
  const [size, setSize] = useState('md');
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [hasLeading, setHasLeading] = useState(false);
  const [hasTrailing, setHasTrailing] = useState(false);
  const [label, setLabel] = useState('Label');

  const iconColor = disabled ? theme.fgFaint : { primary: theme.accentFg, secondary: theme.fg, ghost: theme.fgMuted, danger: color.danger[300], 'danger-solid': color.chalk[100], signal: theme.bg, tutor: color.iris[800] }[variant] || theme.fg;
  const demoIcon = <Icon name="arrow-right" size={14} color={iconColor} />;
  const V: Array<'primary'|'secondary'|'ghost'|'danger'|'danger-solid'|'signal'|'tutor'> = ['primary','secondary','ghost','danger','danger-solid','signal','tutor'];
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="Variant" value={variant} options={['primary','secondary','ghost','danger','danger-solid','signal','tutor']} onChange={setVariant} />
        <KnobSelect label="Size" value={size} options={['sm','md','lg']} onChange={setSize} />
        <KnobToggle label="Disabled" value={disabled} onChange={setDisabled} />
        <KnobToggle label="Loading" value={loading} onChange={setLoading} />
        <KnobToggle label="Full Width" value={fullWidth} onChange={setFullWidth} />
        <KnobToggle label="Leading Icon" value={hasLeading} onChange={setHasLeading} />
        <KnobToggle label="Trailing Icon" value={hasTrailing} onChange={setHasTrailing} />
        <KnobText label="Label" value={label} onChange={setLabel} />
      </>}
    >
      <View style={fullWidth ? { width: '100%' } : {}}>
        <Button variant={variant as any} size={size as any} disabled={disabled} loading={loading} fullWidth={fullWidth} leadingIcon={hasLeading ? demoIcon : undefined} trailingIcon={hasTrailing ? demoIcon : undefined}>{label}</Button>
      </View>
    </Playground>

    <Import>{"import { Button } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="children" type="string" desc="Button label text" />
      <Prop name="variant" type="'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-solid' | 'signal'" def="'primary'" />
      <Prop name="size" type="'sm' | 'md' | 'lg'" def="'md'" desc="32 / 40 / 48 height" />
      <Prop name="disabled" type="boolean" desc="Grey bg + grey text" />
      <Prop name="loading" type="boolean" desc="Spinner, hides text" />
      <Prop name="fullWidth" type="boolean" desc="Stretches to fill container" />
      <Prop name="leadingIcon" type="ReactNode" desc="Icon before text. Constrained to 14/16/18px per sm/md/lg." />
      <Prop name="trailingIcon" type="ReactNode" desc="Icon after text. Constrained to 14/16/18px per sm/md/lg." />
      <Prop name="onPress" type="() => void" />
    </Props>
    <S title="All Variants"><R>{V.map(v => <Button key={v} variant={v}>{v}</Button>)}</R></S>
    <S title="Disabled" desc="Grey bg + grey text for ALL variants. Not opacity of original colour."><R>{V.map(v => <Button key={v} variant={v} disabled>{v}</Button>)}</R></S>
    <S title="Variant Guide">
      <Rl>primary: main action on screen. One per view. Accent fill.</Rl>
      <Rl>secondary: supporting action. Outline with border.</Rl>
      <Rl>ghost: tertiary / inline. No border, muted text, minimal padding.</Rl>
      <Rl>danger: destructive outline. Red border, red text.</Rl>
      <Rl>danger-solid: irreversible destructive. Red fill, white text.</Rl>
      <Rl>signal: journey milestone / gold moment. Gold fill, dark text. Use sparingly.</Rl>
      <Rl>tutor: voice tutor actions. Iris purple fill, white text. Exclusively for tutor interactions.</Rl>
    </S>
    <S title="Icon Sizes" desc="Icons are constrained per button size. Pass any ReactNode — the button clips it to fit.">
      <Rl>sm (32px button) → 14×14px icon</Rl>
      <Rl>md (40px button) → 16×16px icon</Rl>
      <Rl>lg (48px button) → 18×18px icon</Rl>
      <Rl>Icon colour should match the button text colour for the variant.</Rl>
    </S>
    <S title="Rules">
      <Rl>One primary per view. Multiple secondaries are fine.</Rl>
      <Rl>Ghost is for inline actions (cancel, back, skip) — never the main CTA.</Rl>
      <Rl>Signal is gold — reserved for journey moments only, never general UI.</Rl>
      <Rl>Loading hides text but keeps button dimensions stable.</Rl>
      <Rl>For icon-only actions, use IconButton — not Button with empty text.</Rl>
    </S>
  </>;
}

export function IconButtonPage() {
  const { theme } = useTheme();
  const [variant, setVariant] = useState('default');
  const [size, setSize] = useState('md');
  const [disabled, setDisabled] = useState(false);

  const ico = (v: string, dis?: boolean) => <Icon name="close" size={14} color={dis ? theme.fgFaint : v === 'primary' ? theme.accentFg : theme.fg} />;
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="Variant" value={variant} options={['default','primary','ghost','danger']} onChange={setVariant} />
        <KnobSelect label="Size" value={size} options={['sm','md','lg']} onChange={setSize} />
        <KnobToggle label="Disabled" value={disabled} onChange={setDisabled} />
      </>}
    >
      <IconButton variant={variant as any} size={size as any} disabled={disabled}>{ico(variant, disabled)}</IconButton>
    </Playground>

    <Import>{"import { IconButton } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="children" type="ReactNode" desc="Icon element" />
      <Prop name="variant" type="'default' | 'primary' | 'ghost' | 'danger'" def="'default'" />
      <Prop name="size" type="'sm' | 'md' | 'lg'" def="'md'" desc="32 / 40 / 48" />
      <Prop name="disabled" type="boolean" />
      <Prop name="onPress" type="() => void" />
    </Props>
    <S title="All Variants"><R>
      <IconButton>{ico('default')}</IconButton>
      <IconButton variant="primary">{ico('primary')}</IconButton>
      <IconButton variant="ghost">{ico('ghost')}</IconButton>
      <IconButton variant="danger">{ico('danger')}</IconButton>
    </R></S>
  </>;
}

// ═══════════════════════════════════════════════
// INPUTS
// ═══════════════════════════════════════════════

export function InputPage() {
  const [hasLabel, setHasLabel] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [placeholder, setPlaceholder] = useState('Enter text');
  const [helper, setHelper] = useState(false);
  return <>
    <Playground
      knobs={<>
        <KnobToggle label="Label" value={hasLabel} onChange={setHasLabel} />
        <KnobToggle label="Error" value={hasError} onChange={setHasError} />
        <KnobToggle label="Disabled" value={isDisabled} onChange={setIsDisabled} />
        <KnobText label="placeholder" value={placeholder} onChange={setPlaceholder} />
        <KnobToggle label="helper" value={helper} onChange={setHelper} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <Input label={hasLabel ? 'Email' : undefined} placeholder={placeholder} error={hasError ? 'Invalid email' : undefined} disabled={isDisabled} helper={helper ? 'We will never share your email' : undefined} />
      </View>
    </Playground>

    <Import>{"import { Input } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="label" type="string" />
      <Prop name="placeholder" type="string" />
      <Prop name="value" type="string" />
      <Prop name="error" type="string" desc="Error message, red border" />
      <Prop name="helper" type="string" desc="Help text below" />
      <Prop name="disabled" type="boolean" />
      <Prop name="onChangeText" type="(text: string) => void" />
    </Props>
    <S title="Keyboard">
      <Rl>Input does not include KeyboardAvoidingView. Wrap your screen in KeyboardAvoidingView or use a ScrollView with keyboardShouldPersistTaps="handled".</Rl>
      <Rl>Supports forwardRef — pass a ref to programmatically focus or blur.</Rl>
    </S>
  </>;
}

export function TextareaPage() {
  const [hasLabel, setHasLabel] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [placeholder, setPlaceholder] = useState('Write...');
  const [rowsSel, setRowsSel] = useState('3');
  return <>
    <Playground
      knobs={<>
        <KnobToggle label="Label" value={hasLabel} onChange={setHasLabel} />
        <KnobToggle label="Error" value={hasError} onChange={setHasError} />
        <KnobToggle label="Disabled" value={isDisabled} onChange={setIsDisabled} />
        <KnobText label="placeholder" value={placeholder} onChange={setPlaceholder} />
        <KnobSelect label="rows" value={rowsSel} options={['2','3','4','6']} onChange={setRowsSel} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <Textarea label={hasLabel ? 'Notes' : undefined} placeholder={placeholder} rows={parseInt(rowsSel)} error={hasError ? 'Required' : undefined} disabled={isDisabled} />
      </View>
    </Playground>

    <Import>{"import { Textarea } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="label" type="string" />
      <Prop name="placeholder" type="string" />
      <Prop name="rows" type="number" def="3" />
      <Prop name="error" type="string" />
      <Prop name="disabled" type="boolean" />
      <Prop name="onChangeText" type="(text: string) => void" />
    </Props>
    <S title="Keyboard">
      <Rl>Same as Input — wrap your screen in KeyboardAvoidingView. Supports forwardRef.</Rl>
    </S>
  </>;
}

export function StepperPage() {
  const [val, setVal] = useState(3);
  const [disabled, setDisabled] = useState(false);
  const [min, setMin] = useState('0');
  const [max, setMax] = useState('10');
  const [stepSel, setStepSel] = useState('1');
  return <>
    <Playground
      knobs={<>
        <KnobToggle label="Disabled" value={disabled} onChange={setDisabled} />
        <KnobSelect label="Min" value={min} options={['0', '1', '5']} onChange={setMin} />
        <KnobSelect label="Max" value={max} options={['5', '10', '20', '100']} onChange={setMax} />
        <KnobSelect label="step" value={stepSel} options={['1','2','5','10']} onChange={setStepSel} />
      </>}
    >
      <Stepper value={val} min={parseInt(min)} max={parseInt(max)} step={parseInt(stepSel)} onChange={setVal} disabled={disabled} />
    </Playground>

    <Import>{"import { Stepper } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="value" type="number" />
      <Prop name="min" type="number" def="0" />
      <Prop name="max" type="number" def="100" />
      <Prop name="step" type="number" def="1" />
      <Prop name="onChange" type="(val: number) => void" />
      <Prop name="disabled" type="boolean" />
    </Props>
    <S title="Rules">
      <Rl>Use for small numeric inputs (quantities, counts). Not for large ranges — use a slider or Input.</Rl>
      <Rl>Buttons disable at min/max bounds.</Rl>
    </S>
  </>;
}

export function CheckboxPage() {
  const [mode, setMode] = useState('single');
  const [ch, setCh] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [label, setLabel] = useState('I agree to the terms');
  const [vals, setVals] = useState(['reading']);
  const [showGroupTitle, setShowGroupTitle] = useState(true);
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="Component" value={mode} options={['single', 'group']} onChange={setMode} />
        <KnobToggle label="Disabled" value={disabled} onChange={setDisabled} />
        {mode === 'single' && <KnobToggle label="Indeterminate" value={indeterminate} onChange={setIndeterminate} />}
        {mode === 'single' && <KnobText label="Label" value={label} onChange={setLabel} />}
        {mode === 'group' && <KnobToggle label="Title" value={showGroupTitle} onChange={setShowGroupTitle} />}
      </>}
    >
      {mode === 'single' ? (
        <Checkbox checked={ch} onValueChange={setCh} disabled={disabled} indeterminate={indeterminate} label={label || undefined} />
      ) : (
        <CheckboxGroup title={showGroupTitle ? 'Select subjects' : undefined} values={vals} onChange={setVals} disabled={disabled} options={[
          { value: 'reading', label: 'Reading' },
          { value: 'math', label: 'Math' },
          { value: 'verbal', label: 'Verbal' },
        ]} />
      )}
    </Playground>

    <Import>{"import { Checkbox, CheckboxGroup } from '@noon/design-system';"}</Import>
    <S title="Checkbox" desc="Single toggle. Use standalone or inside a form.">
      <Props>
        <Prop name="checked" type="boolean" />
        <Prop name="onValueChange" type="(val: boolean) => void" />
        <Prop name="label" type="string" />
        <Prop name="disabled" type="boolean" />
        <Prop name="indeterminate" type="boolean" />
      </Props>
    </S>
    <S title="CheckboxGroup" desc="Multi-select from a list. Manages checked state via values array.">
      <Props>
        <Prop name="title" type="string" desc="Group heading above the options" />
        <Prop name="values" type="string[]" desc="Currently checked values" />
        <Prop name="onChange" type="(values: string[]) => void" />
        <Prop name="options" type="{ value: string; label: string }[]" />
        <Prop name="disabled" type="boolean" />
      </Props>
    </S>
  </>;
}

export function RadioPage() {
  const [sel, setSel] = useState('a');
  const [disabled, setDisabled] = useState(false);
  const [showTitle, setShowTitle] = useState(true);
  return <>
    <Playground
      knobs={<>
        <KnobToggle label="Disabled" value={disabled} onChange={setDisabled} />
        <KnobToggle label="Title" value={showTitle} onChange={setShowTitle} />
      </>}
    >
      <RadioGroup title={showTitle ? 'Difficulty level' : undefined} value={sel} onChange={setSel} disabled={disabled} options={[
        { value: 'a', label: 'Beginner' },
        { value: 'b', label: 'Intermediate' },
        { value: 'c', label: 'Advanced' },
      ]} />
    </Playground>

    <Import>{"import { RadioGroup } from '@noon/design-system';"}</Import>
    <S title="RadioGroup" desc="Single-select from a list. Only one option active at a time.">
      <Props>
        <Prop name="title" type="string" desc="Group heading above the options" />
        <Prop name="value" type="string" desc="Currently selected value" />
        <Prop name="onChange" type="(value: string) => void" />
        <Prop name="options" type="{ value: string; label: string }[]" />
        <Prop name="disabled" type="boolean" />
      </Props>
    </S>
  </>;
}

export function SwitchPage() {
  const [on, setOn] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [hasLabel, setHasLabel] = useState(true);
  const [labelText, setLabelText] = useState('Notifications');
  return <>
    <Playground
      knobs={<>
        <KnobToggle label="Label" value={hasLabel} onChange={setHasLabel} />
        {hasLabel && <KnobText label="Label text" value={labelText} onChange={setLabelText} />}
        <KnobToggle label="Disabled" value={disabled} onChange={setDisabled} />
      </>}
    >
      <Switch value={on} onValueChange={setOn} disabled={disabled} label={hasLabel ? labelText : undefined} />
    </Playground>

    <Import>{"import { Switch } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="value" type="boolean" />
      <Prop name="onValueChange" type="(val: boolean) => void" />
      <Prop name="label" type="string" desc="Label on the left, switch on the right" />
      <Prop name="disabled" type="boolean" />
    </Props>
  </>;
}

export function SegmentedPage() {
  const [sel, setSel] = useState(0);
  const [sgCount, setSgCount] = useState('3');
  const [sgSize, setSgSize] = useState('md');
  const allOpts = ['Day', 'Week', 'Month', 'Year', 'All'];
  const opts = allOpts.slice(0, parseInt(sgCount));
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="Options" value={sgCount} options={['2', '3', '4', '5']} onChange={(v) => { setSgCount(v); setSel(0); }} />
        <KnobSelect label="Size" value={sgSize} options={['sm', 'md']} onChange={setSgSize} />
      </>}
    >
      <Segmented options={opts} selected={sel} onSelect={setSel} size={sgSize as any} />
    </Playground>

    <Import>{"import { Segmented } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="options" type="string[]" />
      <Prop name="selected" type="number" />
      <Prop name="onSelect" type="(index: number) => void" />
      <Prop name="size" type="'sm' | 'md'" def="'md'" desc="sm: compact, content-width buttons" />
    </Props>
    <S title="Rules">
      <Rl>2-5 options max. For more, use Tabs or FilterBar.</Rl>
      <Rl>Labels should be short — one or two words. Truncates if too long.</Rl>
      <Rl>Use for mutually exclusive views of the same content, not for navigation.</Rl>
    </S>
  </>;
}

export function SliderPage() {
  const [val, setVal] = useState(50);
  const [showLabel, setShowLabel] = useState(true);
  const [showValue, setShowValue] = useState(true);
  return <>
    <Playground knobs={<>
      <KnobToggle label="Label" value={showLabel} onChange={setShowLabel} />
      <KnobToggle label="Show value" value={showValue} onChange={setShowValue} />
    </>}>
      <View style={{ width: '100%' }}>
        <Slider label={showLabel ? 'Volume' : undefined} value={val} min={0} max={100} step={1} showValue={showValue} onValueChange={setVal} />
      </View>
    </Playground>
    <Import>{"import { Slider } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="value" type="number" desc="Current value" />
      <Prop name="min" type="number" desc="Minimum value" />
      <Prop name="max" type="number" desc="Maximum value" />
      <Prop name="step" type="number" def="0.01" desc="Step increment" />
      <Prop name="label" type="string" desc="Label text above the track" />
      <Prop name="showValue" type="boolean" def="true" desc="Show current value number" />
      <Prop name="onValueChange" type="(value: number) => void" />
    </Props>
    <S title="Examples">
      <View style={{ gap: sp[5] }}>
        <Slider label="Opacity" value={75} min={0} max={100} step={1} onValueChange={() => {}} />
        <Slider label="Speed" value={1.5} min={0} max={3} step={0.1} onValueChange={() => {}} />
        <Slider value={30} min={0} max={100} step={1} showValue={false} onValueChange={() => {}} />
      </View>
    </S>
    <S title="When to use">
      <Rl>Continuous ranges — volume, opacity, speed, density. Not for discrete choices (use Segmented or Stepper).</Rl>
      <Rl>Web: renders native input[type=range] for best accessibility and UX.</Rl>
      <Rl>Native: custom track with pressable regions. For drag support, wrap with GestureHandler PanGesture.</Rl>
    </S>
  </>;
}

// ═══════════════════════════════════════════════
// SELECTION
// ═══════════════════════════════════════════════

export function ChipsPage() {
  const [variant, setVariant] = useState('default');
  const [dot, setDot] = useState(false);
  const [dismissable, setDismissable] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [label, setLabel] = useState('Label');
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="Variant" value={variant} options={['default','accent']} onChange={setVariant} />
        <KnobToggle label="Dot" value={dot} onChange={setDot} />
        <KnobToggle label="Dismissable" value={dismissable} onChange={setDismissable} />
        <KnobToggle label="Disabled" value={disabled} onChange={setDisabled} />
        <KnobText label="Label" value={label} onChange={setLabel} />
      </>}
    >
      <Chip variant={variant as any} dot={dot} dismissable={dismissable} disabled={disabled} onPress={() => {}} onDismiss={() => {}}>{label}</Chip>
    </Playground>

    <Import>{"import { Chip } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="children" type="string" />
      <Prop name="variant" type="'default' | 'accent'" def="'default'" desc="default: neutral. accent: selected/active." />
      <Prop name="dismissable" type="boolean" desc="Shows × to remove the chip" />
      <Prop name="dot" type="boolean" desc="Diamond dot before label" />
      <Prop name="disabled" type="boolean" />
      <Prop name="onPress" type="() => void" desc="Tap the chip (e.g. toggle filter)" />
      <Prop name="onDismiss" type="() => void" desc="Tap the × to dismiss" />
    </Props>
    <S title="Examples"><R>
      <Chip>Default</Chip>
      <Chip variant="accent">Active</Chip>
      <Chip dot>With dot</Chip>
      <Chip dismissable onDismiss={() => {}}>Dismissable</Chip>
      <Chip variant="accent" dismissable onDismiss={() => {}}>Active + dismiss</Chip>
    </R></S>
  </>;
}

export function QuizPage() {
  const [state, setState] = useState('default');
  const [hasImage, setHasImage] = useState(false);
  const [optText, setOptText] = useState('There is hidden potential despite appearances');
  const [label, setLabel] = useState('B');
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="State" value={state} options={['default','selected','correct','incorrect','disabled']} onChange={setState} />
        <KnobToggle label="Image" value={hasImage} onChange={setHasImage} />
        <KnobText label="Text" value={optText} onChange={setOptText} />
        <KnobText label="label" value={label} onChange={setLabel} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <QuizOption label={label} text={optText || undefined} image={hasImage ? require('../../reference/Tester.png') : undefined} state={state as any} />
      </View>
    </Playground>

    <Import>{"import { QuizOption } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="label" type="string" desc="A, B, C, D" />
      <Prop name="text" type="string" desc="Option text — wraps if long" />
      <Prop name="image" type="ImageSourcePropType" desc="Option image — renders above text" />
      <Prop name="state" type="'default' | 'selected' | 'correct' | 'incorrect' | 'disabled'" def="'default'" />
      <Prop name="onPress" type="() => void" />
    </Props>
    <S title="All States">
      <C label="Default"><QuizOption label="A" text="The land is completely useless" /></C>
      <C label="Selected"><QuizOption label="B" text="There is hidden potential" state="selected" /></C>
      <C label="Correct"><QuizOption label="B" text="There is hidden potential" state="correct" /></C>
      <C label="Incorrect"><QuizOption label="D" text="The landscape will change soon" state="incorrect" /></C>
      <C label="Image only"><QuizOption label="C" image={require('../../reference/Tester.png')} /></C>
      <C label="Image + text"><QuizOption label="A" text="The door is described as ajar" image={require('../../reference/Tester.png')} /></C>
    </S>
  </>;
}

export function MatchPage() {
  const { theme } = useTheme();
  const [hasImage, setHasImage] = useState(false);
  const [optPos, setOptPos] = useState('bottom');
  const [showBtns, setShowBtns] = useState(true);
  const [key, setKey] = useState(0);
  const [controls, setControls] = useState<any>(null);
  return <>
    <Playground
      knobs={<>
        <KnobToggle label="items (images)" value={hasImage} onChange={(v) => { setHasImage(v); setKey(k => k + 1); }} />
        <KnobSelect label="optionsPosition" value={optPos} options={['top', 'bottom']} onChange={(v) => { setOptPos(v); setKey(k => k + 1); }} />
        <KnobToggle label="showButtons" value={showBtns} onChange={(v) => { setShowBtns(v); setKey(k => k + 1); }} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <MatchQuestion
          key={key}
          optionsPosition={optPos as any}
          showButtons={showBtns}
          onReady={setControls}
          items={hasImage ? [
            { id: 'a', image: require('../../reference/Tester.png') },
            { id: 'b', image: require('../../reference/Tester.png') },
            { id: 'c', image: require('../../reference/Tester.png') },
          ] : [
            { id: 'a', label: 'Summarise' },
            { id: 'b', label: 'Infer' },
            { id: 'c', label: 'Compare' },
          ]}
          targets={[
            { id: 't1', label: 'Give a brief overview of the main points' },
            { id: 't2', label: 'Draw a conclusion from the evidence' },
            { id: 't3', label: 'Identify similarities and differences' },
          ]}
          correctMapping={{ a: 't1', b: 't2', c: 't3' }}
        />
      </View>
    </Playground>
    <Import>{"import { MatchQuestion } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="items" type="DragItemData[]" desc="{ id, label?, image?, imageSize? }" />
      <Prop name="targets" type="{ id, label }[]" desc="Drop targets — one per item" />
      <Prop name="correctMapping" type="Record<string, string>" desc="itemId → targetId" />
      <Prop name="optionsPosition" type="'top' | 'bottom'" def="'bottom'" desc="Where source items render relative to drop zones" />
      <Prop name="onReady" type="(controls) => void" desc="Receives { submit, reset, allPlaced, submitted }" />
      <Prop name="onAnswer" type="(placements) => void" desc="Called on every placement change" />
    </Props>
    <S title="Custom layout">
      <Rl>For custom layouts, compose with the primitives: useDragDrop + DragItem + DropZone + PlacedItem + QuestionFrame.</Rl>
    </S>
  </>;
}

export function CategorizePage() {
  const [hasImage, setHasImage] = useState(false);
  const [optPos, setOptPos] = useState('bottom');
  const [showBtns, setShowBtns] = useState(true);
  const [key, setKey] = useState(0);
  const [controls, setControls] = useState<any>(null);
  return <>
    <Playground
      knobs={<>

        <KnobToggle label="items (images)" value={hasImage} onChange={(v) => { setHasImage(v); setKey(k => k + 1); }} />
        <KnobSelect label="optionsPosition" value={optPos} options={['top', 'bottom']} onChange={(v) => { setOptPos(v); setKey(k => k + 1); }} />
        <KnobToggle label="showButtons" value={showBtns} onChange={(v) => { setShowBtns(v); setKey(k => k + 1); }} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <CategorizeQuestion
          key={key}
          optionsPosition={optPos as any}
          showButtons={showBtns}
          onReady={setControls}
          items={hasImage ? [
            { id: 'a', image: require('../../reference/Tester.png') },
            { id: 'b', image: require('../../reference/Tester.png') },
            { id: 'c', image: require('../../reference/Tester.png') },
            { id: 'd', image: require('../../reference/Tester.png') },
          ] : [
            { id: 'a', label: 'Triangle' },
            { id: 'b', label: 'Square' },
            { id: 'c', label: 'Circle' },
            { id: 'd', label: 'Rectangle' },
          ]}
          categories={[
            { id: 'curved', label: 'Curved' },
            { id: 'straight', label: 'Straight edges' },
          ]}
          correctMapping={{ a: 'straight', b: 'straight', c: 'curved', d: 'straight' }}
        />
      </View>
    </Playground>
    <Import>{"import { CategorizeQuestion } from '@noon/design-system';"}</Import>
    <Props>

      <Prop name="items" type="DragItemData[]" desc="Items to categorize" />
      <Prop name="categories" type="{ id, label }[]" desc="Category buckets" />
      <Prop name="correctMapping" type="Record<string, string>" desc="itemId → categoryId" />
      <Prop name="mode" type="'practice' | 'exam' | 'review'" def="'practice'" />
      <Prop name="optionsPosition" type="'top' | 'bottom'" def="'bottom'" desc="Where source items render relative to drop zones" />
      <Prop name="onAnswer" type="(placements) => void" desc="Called on every placement change" />
    </Props>
    <S title="Custom layout">
      <Rl>For custom layouts, compose with the primitives: useDragDrop + DragItem + DropZone (neutral) + PlacedItem.</Rl>
    </S>
  </>;
}

export function OrderPage() {
  const [hasImage, setHasImage] = useState(false);
  const [optPos, setOptPos] = useState('bottom');
  const [showBtns, setShowBtns] = useState(true);
  const [key, setKey] = useState(0);
  const [controls, setControls] = useState<any>(null);
  return <>
    <Playground
      knobs={<>

        <KnobToggle label="items (images)" value={hasImage} onChange={(v) => { setHasImage(v); setKey(k => k + 1); }} />
        <KnobSelect label="optionsPosition" value={optPos} options={['top', 'bottom']} onChange={(v) => { setOptPos(v); setKey(k => k + 1); }} />
        <KnobToggle label="showButtons" value={showBtns} onChange={(v) => { setShowBtns(v); setKey(k => k + 1); }} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <OrderQuestion
          key={key}
          optionsPosition={optPos as any}
          showButtons={showBtns}
          onReady={setControls}
          items={hasImage ? [
            { id: 'c', image: require('../../reference/Tester.png') },
            { id: 'a', image: require('../../reference/Tester.png') },
            { id: 'b', image: require('../../reference/Tester.png') },
          ] : [
            { id: 'c', label: 'Review your answers' },
            { id: 'a', label: 'Read the passage' },
            { id: 'b', label: 'Answer the questions' },
          ]}
          correctOrder={['a', 'b', 'c']}
        />
      </View>
    </Playground>
    <Import>{"import { OrderQuestion } from '@noon/design-system';"}</Import>
    <Props>

      <Prop name="items" type="DragItemData[]" desc="Items to order (shown shuffled)" />
      <Prop name="correctOrder" type="string[]" desc="Item IDs in correct sequence" />
      <Prop name="mode" type="'practice' | 'exam' | 'review'" def="'practice'" />
      <Prop name="optionsPosition" type="'top' | 'bottom'" def="'bottom'" desc="Where source items render relative to drop zones" />
      <Prop name="onAnswer" type="(placements) => void" desc="Called on every placement change" />
    </Props>
    <S title="Custom layout">
      <Rl>For custom layouts, compose with the primitives: useDragDrop + DragItem + DropZone (inline) + PlacedItem.</Rl>
    </S>
  </>;
}

export function FillBlanksPage() {
  const [optPos, setOptPos] = useState('bottom');
  const [showBtns, setShowBtns] = useState(true);
  const [key, setKey] = useState(0);
  const [controls, setControls] = useState<any>(null);
  return <>
    <Playground
      knobs={<>

        <KnobSelect label="optionsPosition" value={optPos} options={['top', 'bottom']} onChange={(v) => { setOptPos(v); setKey(k => k + 1); }} />
        <KnobToggle label="showButtons" value={showBtns} onChange={(v) => { setShowBtns(v); setKey(k => k + 1); }} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <FillBlanksQuestion
          key={key}
          optionsPosition={optPos as any}
          showButtons={showBtns}
          onReady={setControls}
          sentence="A {{b1}} is a word that describes a {{b2}}, while an {{b3}} describes a verb."
          items={[
            { id: 'w1', label: 'noun' },
            { id: 'w2', label: 'adjective' },
            { id: 'w3', label: 'adverb' },
          ]}
          correctMapping={{ w2: 'b1', w1: 'b2', w3: 'b3' }}
        />
      </View>
    </Playground>
    <Import>{"import { FillBlanksQuestion } from '@noon/design-system';"}</Import>
    <Props>

      <Prop name="sentence" type="string" desc="Use {{blankId}} for drop zones" />
      <Prop name="items" type="DragItemData[]" desc="Words to drag into blanks" />
      <Prop name="correctMapping" type="Record<string, string>" desc="itemId → blankId" />
      <Prop name="mode" type="'practice' | 'exam' | 'review'" def="'practice'" />
      <Prop name="optionsPosition" type="'top' | 'bottom'" def="'bottom'" desc="Where source items render relative to drop zones" />
      <Prop name="onAnswer" type="(placements) => void" desc="Called on every placement change" />
    </Props>
    <S title="Custom layout">
      <Rl>For custom sentence rendering, parse the sentence yourself and compose DropZone + PlacedItem inline.</Rl>
    </S>
  </>;
}

export function HotspotPage() {
  const [optPos, setOptPos] = useState('bottom');
  const [showBtns, setShowBtns] = useState(true);
  const [key, setKey] = useState(0);
  const [controls, setControls] = useState<any>(null);
  return <>
    <Playground
      knobs={<>

        <KnobSelect label="optionsPosition" value={optPos} options={['top', 'bottom']} onChange={(v) => { setOptPos(v); setKey(k => k + 1); }} />
        <KnobToggle label="showButtons" value={showBtns} onChange={(v) => { setShowBtns(v); setKey(k => k + 1); }} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <HotspotQuestion
          key={key}
          optionsPosition={optPos as any}
          showButtons={showBtns}
          onReady={setControls}
          image={require('../../reference/Tester.png')}
          imageAspectRatio={1}
          zones={[
            { id: 'z1', x: 15, y: 25, width: 25, height: 25 },
            { id: 'z2', x: 55, y: 45, width: 25, height: 25 },
          ]}
          items={[
            { id: 'i1', label: 'Riyadh' },
            { id: 'i2', label: 'Jeddah' },
          ]}
          correctMapping={{ i1: 'z1', i2: 'z2' }}
        />
      </View>
    </Playground>
    <Import>{"import { HotspotQuestion } from '@noon/design-system';"}</Import>
    <Props>

      <Prop name="image" type="ImageSource" desc="Background image" />
      <Prop name="imageAspectRatio" type="number" def="16/9" />
      <Prop name="zones" type="{ id, x, y, width, height }[]" desc="Drop regions as % of image size" />
      <Prop name="items" type="DragItemData[]" desc="Labels to drag onto zones" />
      <Prop name="correctMapping" type="Record<string, string>" desc="itemId → zoneId" />
      <Prop name="mode" type="'practice' | 'exam' | 'review'" def="'practice'" />
      <Prop name="optionsPosition" type="'top' | 'bottom'" def="'bottom'" desc="Where source items render relative to drop zones" />
      <Prop name="onAnswer" type="(placements) => void" desc="Called on every placement change" />
    </Props>
    <S title="Custom layout">
      <Rl>For custom layouts, compose with useDragDrop + DropZone + PlacedItem and position zones over the image.</Rl>
    </S>
  </>;
}

export function FilterBarPage() {
  const [count, setCount] = useState('4');
  const allLabels = ['All', 'Reading', 'Math', 'Verbal', 'Writing', 'Science'];
  const [items, setItems] = useState(allLabels.slice(0, 4).map((l, i) => ({ label: l, active: i === 0 })));
  const updateCount = (c: string) => {
    setCount(c);
    setItems(allLabels.slice(0, parseInt(c)).map((l, i) => ({ label: l, active: i === 0 })));
  };
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="Items" value={count} options={['2','3','4','5','6']} onChange={updateCount} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <FilterBar items={items} onToggle={(i) => setItems(items.map((f, idx) => ({ ...f, active: idx === i })))} />
      </View>
    </Playground>

    <Import>{"import { FilterBar } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="items" type="{ label: string; active: boolean }[]" />
      <Prop name="onToggle" type="(index: number) => void" desc="Tap a pill to activate it. You control the logic — single or multi select." />
    </Props>
    <S title="Rules">
      <Rl>Horizontal scrolling pill row. First item is usually "All".</Rl>
      <Rl>Engineer controls selection logic in onToggle — single select (deactivate others) or multi select (toggle independently).</Rl>
      <Rl>Use above content lists to narrow results. Not for navigation — use Tabs for that.</Rl>
    </S>
  </>;
}

// ═══════════════════════════════════════════════
// DISPLAY
// ═══════════════════════════════════════════════

export function CardsPage() {
  const { theme } = useTheme();
  const [hasSubtitle, setHasSubtitle] = useState(true);
  const [hasActions, setHasActions] = useState(true);
  const [hasMeta, setHasMeta] = useState(true);
  const [pressable, setPressable] = useState(true);
  const [selectable, setSelectable] = useState(false);
  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasThumbnail, setHasThumbnail] = useState(false);
  const demoActions = [{ label: 'Edit', onPress: () => {} }, { label: 'Remove', danger: true, onPress: () => {} }];
  return <>
    <Playground
      knobs={<>
        <KnobToggle label="Subtitle" value={hasSubtitle} onChange={setHasSubtitle} />
        <KnobToggle label="Actions menu" value={hasActions} onChange={setHasActions} />
        <KnobToggle label="Meta" value={hasMeta} onChange={setHasMeta} />
        <KnobToggle label="Pressable" value={pressable} onChange={setPressable} />
        <KnobToggle label="Selectable" value={selectable} onChange={setSelectable} />
        {selectable && <KnobToggle label="Selected" value={selected} onChange={setSelected} />}
        <KnobToggle label="Loading" value={loading} onChange={setLoading} />
        <KnobToggle label="thumbnail" value={hasThumbnail} onChange={setHasThumbnail} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <Card
          title="Qudrat Reading"
          subtitle={hasSubtitle ? 'Mr. Hassan · Comprehension' : undefined}
          actions={hasActions ? demoActions : undefined}
          meta={hasMeta ? '4 of 8 sessions' : undefined}
          thumbnail={hasThumbnail ? require('../../reference/Tester.png') : undefined}
          selectable={selectable}
          selected={selected}
          loading={loading}
          onPress={pressable || selectable ? () => {} : undefined}
        />
      </View>
    </Playground>

    <Import>{"import { Card, CardGrid } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="title" type="string" desc="Primary text (required)" />
      <Prop name="subtitle" type="string" desc="Secondary line — teacher, subject" />
      <Prop name="actions" type="{ label: string; danger?: boolean; onPress }[]" desc="Ellipsis menu items" />
      <Prop name="meta" type="string" desc="Tertiary info — count, progress" />
      <Prop name="thumbnail" type="ImageSource" desc="Full-width image above content" />
      <Prop name="selectable" type="boolean" desc="Shows checkbox, accent border when selected" />
      <Prop name="selected" type="boolean" desc="Checked state (requires selectable)" />
      <Prop name="loading" type="boolean" desc="0.6 opacity, disabled" />
      <Prop name="onPress" type="() => void" desc="Makes card pressable" />
    </Props>

    <S title="Minimal">
      <Card title="Mathematics 101" subtitle="Dr. Al-Rashid" onPress={() => {}} />
    </S>

    <S title="With actions">
      <Card title="Physics — Mechanics" subtitle="Mr. Omar" meta="Session 4 of 8" actions={[{ label: 'Edit', onPress: () => {} }, { label: 'Remove', danger: true, onPress: () => {} }]} onPress={() => {}} />
    </S>

    <S title="Selectable">
      <View style={{ gap: sp[3] }}>
        <Card title="Qudrat Reading" subtitle="Comprehension" selectable selected onPress={() => {}} />
        <Card title="Mathematics" subtitle="Algebra" selectable onPress={() => {}} />
      </View>
    </S>

    <S title="Card grid">
      <CardGrid>
        <Card title="Qudrat Reading" subtitle="Mr. Hassan" onPress={() => {}} />
        <Card title="Mathematics" subtitle="Dr. Al-Rashid" actions={[{ label: 'Remove', danger: true, onPress: () => {} }]} onPress={() => {}} />
        <Card title="Physics" subtitle="Mr. Omar" onPress={() => {}} />
        <Card title="Chemistry" subtitle="Ms. Fatima" meta="3 sessions" onPress={() => {}} />
      </CardGrid>
    </S>

    <S title="Rules">
      <Rl>All content via props — the card controls the layout.</Rl>
      <Rl>title is required. subtitle, actions, meta, thumbnail are optional.</Rl>
      <Rl>actions renders an ellipsis icon that opens a Menu with the given items.</Rl>
      <Rl>selectable adds a checkbox and accent border when selected.</Rl>
      <Rl>Wrap in CardGrid for responsive 2-column layout.</Rl>
    </S>
  </>;
}

export function AvatarsPage() {
  const [size, setSize] = useState('md');
  const [clr, setClr] = useState('default');
  const [useImage, setUseImage] = useState(false);
  const [status, setStatus] = useState('none');
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="Size" value={size} options={['xs','sm','md','lg','xl']} onChange={setSize} />
        <KnobSelect label="Color" value={clr} options={['default','noon','blue']} onChange={setClr} />
        <KnobToggle label="Image (SSO)" value={useImage} onChange={setUseImage} />
        <KnobSelect label="Status" value={status} options={['none','online','busy']} onChange={setStatus} />
      </>}
    >
      <Avatar initials="SA" imageUri={useImage ? 'https://i.pravatar.cc/150?u=sarah' : undefined} size={size as any} color={clr as any} status={status === 'none' ? undefined : status as any} />
    </Playground>

    <Import>{"import { Avatar } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="initials" type="string" desc="Fallback when no image" />
      <Prop name="imageUri" type="string" desc="Profile photo URL (e.g. from Google SSO). Falls back to initials." />
      <Prop name="size" type="'xs' | 'sm' | 'md' | 'lg' | 'xl'" def="'sm'" desc="24 / 32 / 40 / 56 / 72" />
      <Prop name="color" type="'default' | 'noon' | 'blue'" def="'default'" />
      <Prop name="status" type="'online' | 'busy'" desc="Status dot — scales with avatar size." />
    </Props>
    <S title="All Sizes"><R><Avatar initials="S" size="xs" /><Avatar initials="SA" size="sm" /><Avatar initials="SA" size="md" /><Avatar initials="SA" size="lg" /><Avatar initials="SA" size="xl" /></R></S>
    <S title="With image"><R><Avatar initials="SA" imageUri="https://i.pravatar.cc/150?u=sarah" size="sm" /><Avatar initials="SA" imageUri="https://i.pravatar.cc/150?u=sarah" size="md" /><Avatar initials="SA" imageUri="https://i.pravatar.cc/150?u=sarah" size="lg" status="online" /><Avatar initials="SA" imageUri="https://i.pravatar.cc/150?u=sarah" size="xl" status="busy" /></R></S>
    <S title="Status scaling"><R><Avatar initials="S" size="xs" status="online" /><Avatar initials="SA" size="sm" status="online" /><Avatar initials="SA" size="md" status="busy" /><Avatar initials="SA" size="lg" status="online" /><Avatar initials="SA" size="xl" status="busy" /></R></S>
  </>;
}

export function BadgesPage() {
  const [variant, setVariant] = useState('default');
  const [text, setText] = useState('3');
  return <>
    <Playground knobs={<>
      <KnobSelect label="Variant" value={variant} options={['default', 'accent', 'danger', 'dot']} onChange={setVariant} />
      <KnobText label="Text" value={text} onChange={setText} />
    </>}>
      <Badge variant={variant as any}>{variant === 'dot' ? undefined : text}</Badge>
    </Playground>
    <Import>{"import { Badge } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="children" type="string" desc="Badge text (number or symbol)" />
      <Prop name="variant" type="'default' | 'accent' | 'danger' | 'dot'" def="'default'" />
    </Props>
    <S title="Variants"><R><Badge>3</Badge><Badge variant="accent">12</Badge><Badge variant="danger">!</Badge><Badge variant="dot" /></R></S>
    <S title="With avatars"><R>
      <View style={{ position: 'relative' }}><Avatar initials="SA" size="md" /><View style={{ position: 'absolute', top: -2, right: -4 }}><Badge variant="danger">2</Badge></View></View>
      <View style={{ position: 'relative' }}><Avatar initials="OK" size="md" color="noon" /><View style={{ position: 'absolute', top: -2, right: -4 }}><Badge variant="accent">5</Badge></View></View>
    </R></S>
  </>;
}

export function TablePage() {
  const { theme } = useTheme();
  const [selectable, setSelectable] = useState(true);
  const [sortable, setSortable] = useState(true);
  const [scrollable, setScrollable] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  const columns: TableColumn[] = [
    { key: 'name', label: 'Student', sortable },
    { key: 'score', label: 'Score', sortable, align: 'right' as const, width: 70 },
    { key: 'status', label: 'Status', sortable },
    { key: 'chapter', label: 'Chapter', sortable },
    ...(scrollable ? [{ key: 'date', label: 'Date', width: 100 }, { key: 'attempt', label: 'Attempt', width: 80, align: 'right' as const }] as TableColumn[] : []),
  ];

  const rows = [
    { name: 'Sarah A.', score: '92', status: 'Mastered', chapter: 'Algebra I', date: '12 Jan', attempt: '3rd' },
    { name: 'Omar K.', score: '61', status: 'Exploring', chapter: 'Geometry', date: '14 Jan', attempt: '1st' },
    { name: 'Farida M.', score: '78', status: 'Exploring', chapter: 'Algebra I', date: '11 Jan', attempt: '2nd' },
    { name: 'Ahmed R.', score: '45', status: 'Uncertain', chapter: 'Ratios', date: '10 Jan', attempt: '2nd' },
    { name: 'Layla S.', score: '88', status: 'Mastered', chapter: 'Number Sense', date: '8 Jan', attempt: '1st' },
    { name: 'Yusuf H.', score: '33', status: 'Uncertain', chapter: 'Algebra II', date: '15 Jan', attempt: '1st' },
    { name: 'Nora T.', score: '95', status: 'Mastered', chapter: 'Statistics', date: '13 Jan', attempt: '2nd' },
    { name: 'Khalid B.', score: '71', status: 'Exploring', chapter: 'Geometry', date: '9 Jan', attempt: '3rd' },
  ];

  return <>
    <Playground knobs={<>
      <KnobToggle label="Selectable" value={selectable} onChange={setSelectable} />
      <KnobToggle label="Sortable" value={sortable} onChange={setSortable} />
      <KnobToggle label="Horizontal scroll" value={scrollable} onChange={setScrollable} />
    </>}>
      <View style={{ width: '100%' }}>
        <Table
          columns={columns}
          rows={rows}
          selectable={selectable}
          selected={selected}
          onSelectionChange={setSelected}
          minWidth={scrollable ? 600 : undefined}
          actionBar={(count) => (
            <View style={{ flexDirection: 'row', gap: sp[2] }}>
              <Button size="sm" variant="ghost" onPress={() => setSelected([])}>Clear</Button>
              <Button size="sm" variant="primary" onPress={() => setSelected([])}>Message {count}</Button>
            </View>
          )}
        />
      </View>
    </Playground>

    <Import>{"import { Table, type TableColumn } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="columns" type="TableColumn[] | string[]" desc="Column defs with key, label, width, align, sortable, render" />
      <Prop name="rows" type="Record<string, string>[] | string[][]" />
      <Prop name="selectable" type="boolean" desc="Show row checkboxes" />
      <Prop name="selected" type="number[]" />
      <Prop name="onSelectionChange" type="(indices: number[]) => void" />
      <Prop name="sortKey / sortDir / onSort" type="string / 'asc'|'desc' / fn" desc="Controlled sorting" />
      <Prop name="minWidth" type="number" desc="Enables horizontal scroll" />
      <Prop name="actionBar" type="(count) => ReactNode" desc="Shown when rows selected" />
    </Props>

    <S title="Simple (string arrays)">
      <Table columns={['Name', 'Score', 'Status']} rows={[['Sarah A.', '92', 'Mastered'], ['Omar K.', '61', 'Exploring'], ['Farida M.', '78', 'Close']]} />
    </S>

    <S title="Rules">
      <Rl>Header: mono fs[10], uppercase, fgFaint. Rows: sans fs[13], fgMuted.</Rl>
      <Rl>Sortable columns show arrow on tap. Toggle between asc/desc.</Rl>
      <Rl>Selectable adds a checkbox column. Header checkbox toggles all.</Rl>
      <Rl>Action bar appears at bottom when rows are selected — use for bulk actions.</Rl>
      <Rl>Set minWidth to enable horizontal scroll on narrow screens.</Rl>
    </S>
  </>;
}

export function SessionCardPage() {
  const [state, setState] = useState('upcoming');
  const [assessment, setAssessment] = useState(false);
  const [title, setTitle] = useState('Inference & Implied Meaning');
  const [meta, setMeta] = useState('Qudrat Reading — Mr. Hassan');
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="State" value={state} options={['live','soon','upcoming','done','cancelled']} onChange={setState} />
        <KnobToggle label="Assessment" value={assessment} onChange={setAssessment} />
        <KnobText label="title" value={title} onChange={setTitle} />
        <KnobText label="meta" value={meta} onChange={setMeta} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <SessionCard time="10:00" title={title} meta={meta} state={state as any} assessment={assessment} statusText={state === 'upcoming' ? '45 min' : undefined} />
      </View>
    </Playground>

    <Import>{"import { SessionCard } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="time" type="string" />
      <Prop name="title" type="string" />
      <Prop name="meta" type="string" />
      <Prop name="state" type="'live' | 'soon' | 'upcoming' | 'done' | 'cancelled'" />
      <Prop name="statusText" type="string" />
      <Prop name="assessment" type="boolean" desc="Gold left border — signals assessment/exam" />
    </Props>
    <S title="All States">
      <C label="Live"><SessionCard time="8:30" title="Storytelling" meta="Digital Media — Ms. Al-Harbi" state="live" /></C>
      <C label="Soon"><SessionCard time="10:00" title="Inference & implied meaning" meta="Qudrat Reading — Mr. Hassan" state="soon" /></C>
      <C label="Upcoming"><SessionCard time="11:30" title="Quantitative reasoning" meta="Qudrat Math — Ms. Noor" state="upcoming" statusText="3:00" /></C>
      <C label="Ended"><SessionCard time="7:00" title="Reading comprehension" meta="Qudrat Reading — Mr. Hassan" state="done" /></C>
      <C label="Assessment"><SessionCard time="9:00" title="Qudrat Mock Exam" meta="Full practice — 120 min" state="upcoming" assessment statusText="2:00" /></C>
    </S>
  </>;
}

// ═══════════════════════════════════════════════
export function HomeworkCardPage() {
  const [status, setStatus] = useState('due-soon');
  const [hwTitle, setHwTitle] = useState('Practice worksheet');
  const [subj, setSubj] = useState('Qudrat Math');
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="Status" value={status} options={['due-soon', 'complete', 'overdue']} onChange={setStatus} />
        <KnobText label="title" value={hwTitle} onChange={setHwTitle} />
        <KnobText label="subject" value={subj} onChange={setSubj} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <HomeworkCard title={hwTitle} subject={subj} due={status === 'overdue' ? '2 days overdue' : 'Due in 4h'} status={status as any} />
      </View>
    </Playground>

    <Import>{"import { HomeworkCard } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="title" type="string" />
      <Prop name="subject" type="string" />
      <Prop name="due" type="string" desc="Relative time, e.g. 'Due in 4h', '2 days overdue'" />
      <Prop name="questions" type="number" def="10" />
      <Prop name="status" type="'due-soon' | 'complete' | 'overdue'" def="'due-soon'" />
      <Prop name="onPress" type="() => void" />
    </Props>
    <S title="All States">
      <HomeworkCard title="Vocab practice" subject="Qudrat Reading" due="Due in 4h" status="due-soon" />
      <HomeworkCard title="Trig exercises" subject="Qudrat Math" due="Due tomorrow" status="due-soon" />
      <HomeworkCard title="Inference worksheet" subject="Qudrat Reading" due="" status="complete" />
      <HomeworkCard title="Grammar review" subject="Qudrat Verbal" due="2 days overdue" status="overdue" />
    </S>
  </>;
}

// ═══════════════════════════════════════════════
// PROGRESS
// ═══════════════════════════════════════════════


export function SessionBarPage() {
  const [count, setCount] = useState('10');
  const [progressPct, setProgressPct] = useState('40');
  const n = parseInt(count);
  const p = Math.max(1, Math.min(n, Math.round(n * parseInt(progressPct) / 100)));
  const segs = Array.from({ length: n }, (_, i) => {
    if (i < p - 1) return i % 3 === 2 ? 'incorrect' as const : 'correct' as const;
    if (i === p - 1) return 'current' as const;
    return 'pending' as const;
  });
  return <>
    <Playground knobs={<>
      <KnobSelect label="Questions" value={count} options={['5', '10', '15', '20', '30', '50']} onChange={setCount} />
      <KnobSelect label="Progress" value={progressPct} options={['10', '25', '40', '50', '75', '90', '100']} onChange={setProgressPct} />
    </>}>
      <View style={{ width: '100%' }}><SessionBar segments={segs} /></View>
    </Playground>
    <Import>{"import { SessionBar } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="segments" type="('correct' | 'incorrect' | 'current' | 'pending')[]" />
      <Prop name="size" type="'sm' | 'md' | 'lg'" def="'md'" />
      <Prop name="pageSize" type="number" def="10" desc="Segments per page. Pages with dots appear when exceeded." />
    </Props>
    <S title="States">
      <C label="Mixed"><SessionBar segments={['correct','correct','incorrect','correct','pending','pending','pending','pending','pending','pending']} /></C>
      <C label="All correct"><SessionBar segments={['correct','correct','correct','correct','correct']} size="lg" /></C>
      <C label="Early"><SessionBar segments={['current','pending','pending','pending','pending','pending','pending','pending']} size="sm" /></C>
    </S>
  </>;
}

export function LinearProgressPage() {
  const [val, setVal] = useState('76');
  const [clr, setClr] = useState('green');
  const num = Math.max(0, Math.min(100, parseInt(val) || 0));
  const colorMap: Record<string, string> = { green: color.noon[400], blue: color.blue[400], red: color.danger[400] };
  return <>
    <Playground knobs={<>
      <KnobSelect label="Value" value={val} options={['0','10','25','50','76','90','100']} onChange={setVal} />
      <KnobSelect label="Color" value={clr} options={['green', 'blue', 'red']} onChange={setClr} />
    </>}>
      <View style={{ width: '100%' }}><LinearProgress value={num} color={colorMap[clr]} /></View>
    </Playground>
    <Import>{"import { LinearProgress } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="value" type="number" desc="0-100" />
      <Prop name="color" type="string" desc="Fill color" />
      <Prop name="height" type="number" desc="Track height. Default sp[1] (4px)." />
    </Props>
    <S title="Colors">
      <C label="Green (mastery)"><LinearProgress value={76} color={color.noon[400]} /></C>
      <C label="Blue (progress)"><LinearProgress value={50} color={color.blue[400]} /></C>
      <C label="Red (warning)"><LinearProgress value={25} color={color.danger[400]} /></C>
    </S>
    <S title="When to use">
      <Rl>Upload/download progress, form completion, loading states.</Rl>
      <Rl>Use for inline, horizontal progress within a content area.</Rl>
      <Rl>For a single stat or score, use CircularProgress instead.</Rl>
      <Rl>For question-by-question results, use SessionBar.</Rl>
    </S>
  </>;
}

export function CircularProgressPage() {
  const [val, setVal] = useState('76');
  const [clr, setClr] = useState('green');
  const [showVal, setShowVal] = useState(true);
  const [sizeSel, setSizeSel] = useState('120');
  const num = Math.max(0, Math.min(100, parseInt(val) || 0));
  const colorMap: Record<string, string> = { green: color.noon[400], blue: color.blue[400], red: color.danger[400] };
  return <>
    <Playground knobs={<>
      <KnobSelect label="Value" value={val} options={['0','10','25','50','76','90','100']} onChange={setVal} />
      <KnobSelect label="Color" value={clr} options={['green', 'blue', 'red']} onChange={setClr} />
      <KnobToggle label="Show value" value={showVal} onChange={setShowVal} />
      <KnobSelect label="Size" value={sizeSel} options={['80','120','160']} onChange={setSizeSel} />
    </>}>
      <CircularProgress value={num} showValue={showVal} color={colorMap[clr]} size={parseInt(sizeSel)} />
    </Playground>
    <Import>{"import { CircularProgress } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="value" type="number" desc="0-100" />
      <Prop name="color" type="string" desc="Ring color" />
      <Prop name="size" type="number" desc="Diameter. Default sp[9] (48px)." />
      <Prop name="strokeWidth" type="number" def="3" />
      <Prop name="showValue" type="boolean" desc="Show percentage text in centre." />
    </Props>
    <S title="Colors"><R>
      <CircularProgress value={76} showValue color={color.noon[400]} />
      <CircularProgress value={50} showValue color={color.blue[400]} />
      <CircularProgress value={25} showValue color={color.danger[400]} />
    </R></S>
    <S title="When to use">
      <Rl>Exam readiness, score display, completion percentage — anywhere a single stat is the hero.</Rl>
      <Rl>Use for standalone metrics in cards or dashboards.</Rl>
      <Rl>For inline/horizontal progress (loading, uploads), use LinearProgress.</Rl>
      <Rl>For question-by-question results, use SessionBar.</Rl>
    </S>
  </>;
}

export function ProgressPage() { return <LinearProgressPage />; }

// ═══════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════

export function TitleBarPage() {
  const { theme } = useTheme();
  const [showBack, setShowBack] = useState(true);
  const [showRight, setShowRight] = useState(false);
  const [tbTitle, setTbTitle] = useState('Session details');
  return <>
    <Playground knobs={<>
      <KnobText label="Title" value={tbTitle} onChange={setTbTitle} />
      <KnobToggle label="Back button" value={showBack} onChange={setShowBack} />
      <KnobToggle label="Right action" value={showRight} onChange={setShowRight} />
    </>}>
      <View style={{ width: '100%' }}>
        <TitleBar title={tbTitle} onBack={showBack ? () => {} : undefined} rightAction={showRight ? <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.accent }}>Today</Text> : undefined} />
      </View>
    </Playground>
    <Import>{"import { TitleBar } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="title" type="string" />
      <Prop name="subtitle" type="string" />
      <Prop name="variant" type="'default' | 'large' | 'transparent' | 'overlay'" def="'default'" />
      <Prop name="onBack" type="() => void" desc="Shows back arrow when provided" />
      <Prop name="rightAction" type="ReactNode" desc="Right-side content" />
    </Props>
    <S title="Variants">
      <C label="Default"><TitleBar title="Atlas" /></C>
      <C label="With back"><TitleBar title="Session" onBack={() => {}} /></C>
      <C label="With right"><TitleBar title="Schedule" rightAction={<Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.accent }}>Today</Text>} /></C>
      <C label="Back + right"><TitleBar title="Quiz" onBack={() => {}} rightAction={<Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.fgMuted }}>3/10</Text>} /></C>
    </S>
  </>;
}

export function TabsPage() {
  const [tab, setTab] = useState(0);
  const [countStr, setCountStr] = useState('4');
  const allTabs = ['Atlas', 'Schedule', 'Crew', 'Water', 'Settings', 'Profile'];
  const tabs = allTabs.slice(0, parseInt(countStr));
  return <>
    <Playground knobs={<>
      <KnobSelect label="Tab count" value={countStr} options={['2', '3', '4', '5', '6']} onChange={(v) => { setCountStr(v); setTab(0); }} />
    </>}>
      <View style={{ width: '100%' }}>
        <Tabs tabs={tabs} selected={tab} onSelect={setTab} />
      </View>
    </Playground>
    <Import>{"import { Tabs } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="tabs" type="string[]" />
      <Prop name="selected" type="number" />
      <Prop name="onSelect" type="(index: number) => void" />
    </Props>
    <S title="Rules">
      <Rl>2-5 tabs. More than 5 should scroll horizontally.</Rl>
      <Rl>Tabs switch content within the same screen. For app-level nav, use BottomNav.</Rl>
      <Rl>Active: accent underline + fg text. Inactive: fgMuted.</Rl>
    </S>
  </>;
}

export function BottomNavPage() {
  const [sel, setSel] = useState(0);
  const [itemCount, setItemCount] = useState('6');
  const [showBadge, setShowBadge] = useState(true);
  const allItems = [
    { label: 'Atlas', icon: 'search' as const },
    { label: 'Schedule', icon: 'document' as const },
    { label: 'Crew', icon: 'menu' as const },
    { label: 'Water', icon: 'expand' as const },
    { label: 'Practice', icon: 'play' as const },
    { label: 'Profile', icon: 'check' as const },
  ];
  const items = allItems.slice(0, parseInt(itemCount)).map((item, i) => ({
    ...item,
    ...(showBadge && i === 1 ? { badge: 3 } : {}),
  }));
  return <>
    <Playground knobs={<>
      <KnobSelect label="Items" value={itemCount} options={['3', '4', '5', '6']} onChange={(v) => { setItemCount(v); setSel(0); }} />
      <KnobToggle label="Badge on 2nd" value={showBadge} onChange={setShowBadge} />
    </>}>
      <View style={{ width: '100%' }}>
        <BottomNav items={items} selected={sel} onSelect={setSel} />
      </View>
    </Playground>
    <Import>{"import { BottomNav } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="items" type="{ label: string; icon: IconName | (color, size) => ReactNode; badge?: number }[]" />
      <Prop name="selected" type="number" />
      <Prop name="onSelect" type="(index: number) => void" />
    </Props>
    <S title="Rules">
      <Rl>3-5 items max. App-level destinations only.</Rl>
      <Rl>Active: accent icon + label. Inactive: fgSubtle.</Rl>
      <Rl>Badge renders as a small number above the icon.</Rl>
      <Rl>On tablet/desktop, replace with SideNav.</Rl>
    </S>
  </>;
}

// ═══════════════════════════════════════════════
// FEEDBACK
// ═══════════════════════════════════════════════

export function AlertsPage() {
  const [variant, setVariant] = useState('info');
  const [hasTitle, setHasTitle] = useState(true);
  const [children, setChildren] = useState('This is the alert body text.');
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="Variant" value={variant} options={['info','success','warn','danger']} onChange={setVariant} />
        <KnobToggle label="Title" value={hasTitle} onChange={setHasTitle} />
        <KnobText label="children" value={children} onChange={setChildren} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <Alert variant={variant as any} title={hasTitle ? 'Alert title' : undefined}>{children}</Alert>
      </View>
    </Playground>

    <Import>{"import { Alert } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="children" type="string" desc="Body text" />
      <Prop name="variant" type="'info' | 'success' | 'warn' | 'danger'" def="'info'" />
      <Prop name="title" type="string" />
    </Props>
    <S title="All Variants">
      <C label="Info"><Alert variant="info" title="Info">General information.</Alert></C>
      <C label="OK"><Alert variant="success" title="Success">Session completed.</Alert></C>
      <C label="Warn"><Alert variant="warn">Exam in 2 days.</Alert></C>
      <C label="Danger"><Alert variant="danger" title="Error">Something went wrong.</Alert></C>
    </S>
    <S title="When to use">
      <Rl>Alert is inline — it stays on screen as part of the page content.</Rl>
      <Rl>Use for persistent messages the user needs to read: validation errors, warnings before an exam, info banners.</Rl>
      <Rl>For temporary notifications that auto-dismiss, use Toast instead.</Rl>
      <Rl>For actions requiring confirmation, use Dialog.</Rl>
    </S>
  </>;
}

export function ToastPage() {
  const [vis, setVis] = useState(false);
  const [variant, setVariant] = useState('success');
  const [durationSel, setDurationSel] = useState('4000');
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="Variant" value={variant} options={['info', 'success', 'warn', 'danger']} onChange={setVariant} />
        <KnobSelect label="duration" value={durationSel} options={['2000','4000','8000']} onChange={setDurationSel} />
      </>}
    >
      <Button variant="secondary" onPress={() => setVis(true)}>Show Toast</Button>
    </Playground>

    <Import>{"import { Toast } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="message" type="string" />
      <Prop name="variant" type="'info' | 'success' | 'warn' | 'danger'" def="'info'" />
      <Prop name="visible" type="boolean" />
      <Prop name="onDismiss" type="() => void" />
      <Prop name="duration" type="number" def="4000" desc="Auto-dismiss ms" />
    </Props>
    <Toast message={variant === 'success' ? 'Practice session saved' : variant === 'danger' ? 'Something went wrong' : variant === 'warn' ? 'Exam in 2 days' : 'Session starts in 10 minutes'} variant={variant as any} visible={vis} onDismiss={() => setVis(false)} duration={parseInt(durationSel)} />
    <S title="When to use">
      <Rl>Toast is temporary — it auto-dismisses after a few seconds.</Rl>
      <Rl>Use for confirmations after an action: "Practice saved", "Homework submitted".</Rl>
      <Rl>For persistent messages the user needs to read, use Alert instead.</Rl>
      <Rl>For actions requiring confirmation, use Dialog.</Rl>
      <Rl>Top inset handled automatically. Toast clears the notch/Dynamic Island.</Rl>
    </S>
  </>;
}

export function DialogPage() {
  const [vis, setVis] = useState(false);
  const [preset, setPreset] = useState('confirm');

  const presets: Record<string, { title: string; body: string; danger: boolean; primary: string; secondary: string }> = {
    confirm: { title: 'Are you sure?', body: 'This action cannot be undone.', danger: false, primary: 'Confirm', secondary: 'Cancel' },
    delete: { title: 'Delete topic?', body: 'All practice history will be permanently removed.', danger: true, primary: 'Delete', secondary: 'Keep' },
    leave: { title: 'Leave session?', body: 'Your progress on this question won\'t be saved.', danger: true, primary: 'Leave', secondary: 'Stay' },
    discard: { title: 'Discard changes?', body: 'You have unsaved changes that will be lost.', danger: true, primary: 'Discard', secondary: 'Keep editing' },
    submit: { title: 'Submit homework?', body: 'You answered 8 of 10 questions. Submit now or keep working.', danger: false, primary: 'Submit', secondary: 'Keep working' },
    logout: { title: 'Log out?', body: 'You\'ll need to sign in again to access your account.', danger: false, primary: 'Log out', secondary: 'Cancel' },
  };

  const p = presets[preset];

  return <>
    <Playground
      knobs={<>
        <KnobSelect label="Scenario" value={preset} options={Object.keys(presets)} onChange={setPreset} />
      </>}
    >
      <Button variant={p.danger ? 'danger' : 'secondary'} onPress={() => setVis(true)}>{p.primary}</Button>
    </Playground>

    <Import>{"import { Dialog } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="visible" type="boolean" />
      <Prop name="onClose" type="() => void" />
      <Prop name="title" type="string" />
      <Prop name="body" type="string" />
      <Prop name="danger" type="boolean" desc="Red primary button for destructive actions" />
      <Prop name="primaryLabel" type="string" def="'Confirm'" />
      <Prop name="secondaryLabel" type="string" def="'Cancel'" />
      <Prop name="onPrimary" type="() => void" />
      <Prop name="onSecondary" type="() => void" />
    </Props>
    <S title="Rules">
      <Rl>Confirmation: neutral primary. "Are you sure?" pattern.</Rl>
      <Rl>Danger: red primary. Destructive actions (delete, leave, discard).</Rl>
      <Rl>Always provide a cancel/secondary option. Never auto-dismiss.</Rl>
    </S>
    <Dialog visible={vis} onClose={() => setVis(false)} title={p.title} body={p.body} danger={p.danger} primaryLabel={p.primary} secondaryLabel={p.secondary} onPrimary={() => setVis(false)} />
  </>;
}

export function BottomSheetPage() {
  const { theme } = useTheme();
  const [vis, setVis] = useState(false);
  const [withActions, setWithActions] = useState(false);
  return <>
    <Playground knobs={<>
      <KnobToggle label="With actions" value={withActions} onChange={setWithActions} />
    </>}>
      <Button variant="secondary" onPress={() => setVis(true)}>Open Sheet</Button>
    </Playground>
    <Import>{"import { BottomSheet } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="visible" type="boolean" />
      <Prop name="onClose" type="() => void" />
      <Prop name="title" type="string" />
      <Prop name="children" type="ReactNode" />
      <Prop name="actions" type="ReactNode" desc="Fixed bottom action buttons" />
    </Props>
    <BottomSheet visible={vis} onClose={() => setVis(false)} title="Session details"
      actions={withActions ? <Button variant="primary" onPress={() => setVis(false)}>Join session</Button> : undefined}>
      <View style={{ gap: sp[3] }}>
        <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fg, fontWeight: fw[500] }}>Inference & implied meaning</Text>
        <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>Qudrat Reading — Mr. Hassan</Text>
        <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.fgFaint }}>10:00 — 10:45 · 12 students</Text>
      </View>
    </BottomSheet>
    <S title="When to use">
      <Rl>Quick actions, short forms, detail previews — anything that doesn't need full screen.</Rl>
      <Rl>Slides up from bottom, scrim behind. Tap scrim or swipe down to dismiss.</Rl>
      <Rl>For full-screen content (reading, browsing), use FullSheet instead.</Rl>
      <Rl>For confirmation prompts, use Dialog instead.</Rl>
    </S>
  </>;
}

export function FullSheetPage() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  return <>
    <Playground knobs={<></>}>
      <Button variant="secondary" onPress={() => setOpen(true)}>Open Full Sheet</Button>
    </Playground>
    <Import>{"import { FullSheet } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="visible" type="boolean" />
      <Prop name="onClose" type="() => void" />
      <Prop name="title" type="string" />
      <Prop name="children" type="ReactNode" />
    </Props>
    <FullSheet visible={open} onClose={() => setOpen(false)} title="Worked example">
      <View style={{ gap: sp[4] }}>
        <Text style={{ fontFamily: font.serif, fontSize: fs[18], color: theme.fg }}>Solving quadratic equations</Text>
        <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fgMuted, lineHeight: fs[14] * 1.6 }}>Step 1: Write the equation in standard form ax² + bx + c = 0{'\n\n'}Step 2: Identify a, b, and c{'\n\n'}Step 3: Apply the quadratic formula{'\n\n'}Step 4: Simplify</Text>
      </View>
    </FullSheet>
    <S title="When to use">
      <Rl>Full-screen focus — worked examples, slide decks, resource reading.</Rl>
      <Rl>Has a title bar with close button. Content scrolls.</Rl>
      <Rl>For quick actions or short content, use BottomSheet.</Rl>
    </S>
  </>;
}

export function TooltipPage() {
  return <>
    <Playground knobs={<></>}>
      <View style={{ flexDirection: 'row', gap: sp[4] }}>
        <Tooltip text="This is a tooltip"><Button variant="secondary">Hover or hold</Button></Tooltip>
        <Tooltip text="Score: 92%"><Button variant="ghost">Result</Button></Tooltip>
      </View>
    </Playground>
    <Import>{"import { Tooltip } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="text" type="string" desc="Tooltip content" />
      <Prop name="children" type="ReactNode" desc="Trigger element" />
    </Props>
    <S title="Behaviour">
      <Rl>Desktop: hover to show, mouse-leave to hide.</Rl>
      <Rl>Mobile: long-press to show, auto-dismisses after 3 seconds.</Rl>
      <Rl>Positions above the trigger with an arrow pointing down.</Rl>
    </S>
    <S title="When to use">
      <Rl>Short helper text — labels, abbreviations, score breakdowns.</Rl>
      <Rl>For rich content, use BottomSheet. For action lists, use Menu.</Rl>
    </S>
  </>;
}

// ═══════════════════════════════════════════════
// LAYOUT
// ═══════════════════════════════════════════════

export function InterstitialPage() {
  const [open, setOpen] = useState(false);
  const [scenario, setScenario] = useState('mastery');
  const scenarios: Record<string, { title: string; body: string; btn: string; variant: string }> = {
    mastery: { title: 'Topic mastered!', body: 'Triangles & angles is now mapped.', btn: 'Back to journey', variant: 'mastery' },
    exam: { title: 'Chapter complete', body: 'You passed the Algebra I exam with 91%.', btn: 'See results', variant: 'exam' },
    progress: { title: 'Keep going!', body: 'You\'re 3 of 5 topics through this chapter.', btn: 'Next topic', variant: 'progress' },
    complete: { title: 'You\'ve arrived!', body: 'All topics mastered. You\'re ready for the assessment.', btn: 'View results', variant: 'complete' },
  };
  const s = scenarios[scenario];
  return <>
    <Playground knobs={<>
      <KnobSelect label="Scenario" value={scenario} options={Object.keys(scenarios)} onChange={setScenario} />
    </>}>
      <Button variant="primary" onPress={() => setOpen(true)}>Show Interstitial</Button>
    </Playground>
    <Modal visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
      <Interstitial title={s.title} body={s.body} buttonLabel={s.btn} variant={s.variant as any} onPress={() => setOpen(false)} />
    </Modal>
    <Import>{"import { Interstitial } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="title" type="string" />
      <Prop name="body" type="string" />
      <Prop name="buttonLabel" type="string" />
      <Prop name="onPress" type="() => void" />
      <Prop name="variant" type="'mastery' | 'exam' | 'progress' | 'complete'" def="'mastery'" desc="Built-in hero graphic" />
      <Prop name="score" type="number" desc="Exam score for 'exam' variant" />
      <Prop name="hero" type="ReactNode" desc="Custom hero — overrides variant. Use for images, Lottie, etc." />
      <Prop name="confetti" type="boolean" desc="Override confetti. Defaults to true for mastery + complete." />
    </Props>
    <S title="When to use">
      <Rl>Full-screen celebration after meaningful achievements.</Rl>
      <Rl>mastery: spinning gold star + confetti — topic mastered.</Rl>
      <Rl>exam: Oasis diamond with score — chapter exam result.</Rl>
      <Rl>progress: Waypoints row partway through — making progress.</Rl>
      <Rl>complete: Waypoints row all arrived + confetti — journey done.</Rl>
      <Rl>hero prop: pass any custom element (Image, Lottie, etc.) to override built-in graphics.</Rl>
      <Rl>Use sparingly — only for moments that deserve a pause.</Rl>
    </S>
  </>;
}

export function EmptyStatePage() {
  const [esTitle, setEsTitle] = useState('No sessions today');
  const [esBody, setEsBody] = useState('Check back tomorrow for your schedule.');
  const [hasAction, setHasAction] = useState(true);
  return <>
    <Playground knobs={<>
      <KnobText label="Title" value={esTitle} onChange={setEsTitle} />
      <KnobText label="Body" value={esBody} onChange={setEsBody} />
      <KnobToggle label="Action button" value={hasAction} onChange={setHasAction} />
    </>}>
      <EmptyState title={esTitle} body={esBody} actionLabel={hasAction ? 'Browse topics' : undefined} onAction={hasAction ? () => {} : undefined} />
    </Playground>
    <Import>{"import { EmptyState } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="icon" type="ReactNode" desc="Optional icon above title" />
      <Prop name="title" type="string" />
      <Prop name="body" type="string" />
      <Prop name="actionLabel" type="string" />
      <Prop name="onAction" type="() => void" />
    </Props>
  </>;
}

export function SkeletonPage() {
  const [shape, setShape] = useState('text');
  return <>
    <Playground knobs={<>
      <KnobSelect label="Shape" value={shape} options={['text', 'avatar', 'card']} onChange={setShape} />
    </>}>
      {shape === 'text' && <View style={{ width: '100%', gap: sp[2] }}><Skeleton width="60%" height={sp[3]} /><Skeleton width="90%" height={sp[2]} /><Skeleton width="40%" height={sp[2]} /></View>}
      {shape === 'avatar' && <R><Skeleton circle height={sp[8]} /><View style={{ flex: 1, gap: sp[2] }}><Skeleton width="50%" height={sp[3]} /><Skeleton width="30%" height={sp[2]} /></View></R>}
      {shape === 'card' && <View style={{ width: '100%', gap: sp[3] }}><Skeleton height={120} /><Skeleton height={sp[3]} /><Skeleton width="70%" height={sp[2]} /></View>}
    </Playground>
    <Import>{"import { Skeleton } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="width" type="number | string" desc="Default '100%'" />
      <Prop name="height" type="number" />
      <Prop name="circle" type="boolean" desc="Makes it round (width = height)" />
    </Props>
  </>;
}

export function DividerPage() {
  const { theme } = useTheme();
  return <>
    <Playground knobs={<></>}>
      <View style={{ width: '100%' }}>
        <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginBottom: sp[3] }}>Content above</Text>
        <Divider />
        <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginTop: sp[3] }}>Content below</Text>
      </View>
    </Playground>
    <Import>{"import { Divider } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="spacing" type="number" desc="Vertical margin above and below" />
    </Props>
    <S title="Usage">
      <Rl>Uses theme.divider — 6% opacity, not a full border.</Rl>
      <Rl>Use between content groups, not between every list item.</Rl>
    </S>
  </>;
}

// ═══════════════════════════════════════════════
// REFERENCE PAGES (web explorer parity — no RN component)
// ═══════════════════════════════════════════════

function Ref({ text }: { text: string }) {
  const { theme } = useTheme();
  return <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5 }}>{text}</Text>;
}

export function GridPaperPage() {
  const { theme } = useTheme();
  const [variant, setVariant] = useState<'standard' | 'major' | 'canvas'>('standard');
  return <>
    <Playground knobs={<></>}>
      <DynamicFullscreen
        controls={<>
          <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgSubtle, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: sp[3], paddingBottom: sp[2], borderBottomWidth: 1, borderBottomColor: theme.divider }}>Grid</Text>
          <KnobSelect label="Variant" value={variant} options={['standard', 'major', 'canvas']} onChange={(v: any) => setVariant(v)} />
        </>}
      >{(w, h) => <GridPaper variant={variant} width={w} height={h} />}</DynamicFullscreen>
    </Playground>
    <Import>{"import { GridPaper } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="variant" type="'standard' | 'major' | 'canvas'" def="'standard'" />
      <Prop name="width" type="number" />
      <Prop name="height" type="number" />
      <Prop name="style" type="ViewStyle" />
    </Props>
    <S title="Specs">
      <Rl>Standard: 16px × 16px. 0.5px lines. Chalk at 4% on void, ink at 5% on paper.</Rl>
      <Rl>Major + minor: 64px gold at 6% over 8px chalk at 4%. Atlas and terrain views only.</Rl>
      <Rl>Canvas: 24px × 24px at 1.5%. Component preview surfaces only.</Rl>
    </S>
    <S title="When to Use">
      <Rl>Journey / route overview screens</Rl>
      <Rl>In-class slides presented by the teacher</Rl>
      <Rl>Atlas and terrain map backgrounds</Rl>
    </S>
    <S title="Rules">
      <Rl>Grid is the material, not decoration. If you wouldn't draw grid lines on graph paper in that context, don't use it.</Rl>
      <Rl>Two densities: brand grid (16px, 4%) for surfaces, canvas grid (24px, 1.5%) for alignment only.</Rl>
    </S>
  </>;
}

export function WaypointsPage() {
  const { theme } = useTheme();
  const [useCase, setUseCase] = useState('journey');
  const [eventComponent, setEventComponent] = useState('calendar');
  const [layout, setLayout] = useState('horizontal');
  const [position, setPosition] = useState(3);
  const [showLabels, setShowLabels] = useState(false);
  const [total, setTotal] = useState(5);
  const pos = Math.max(0, Math.min(total - 1, position - 1));
  const steps = Array.from({ length: total }, (_, i) => {
    if (i < pos) return 'done';
    if (i === pos && pos === total - 1) return 'arrived';
    if (i === pos) return 'current';
    return 'incomplete';
  }) as any;
  const midLabels = ['Vocab', 'Inference', 'Analogy', 'Reading', 'Quant', 'Grammar', 'Comprehension', 'Review'];
  const labelList = ['Start', ...midLabels.slice(0, total - 2), 'Arrival'];

  return <>
    <Playground
      knobs={<>
        <KnobSelect label="Use" value={useCase} options={['journey', 'events']} onChange={setUseCase} />
        {useCase === 'journey' && <>
          <KnobSelect label="Layout" value={layout} options={['horizontal', 'vertical', 'path']} onChange={setLayout} />
          <View style={{ marginBottom: sp[4] }}>
            <Text style={{ fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: theme.fgMuted, marginBottom: sp[2] }}>Steps</Text>
            <Stepper value={total} min={2} max={10} onChange={(v) => { setTotal(v); setPosition(Math.min(position, v)); }} />
          </View>
          <View style={{ marginBottom: sp[4] }}>
            <Text style={{ fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: theme.fgMuted, marginBottom: sp[2] }}>Position</Text>
            <Stepper value={position} min={1} max={total} onChange={setPosition} />
          </View>
          <KnobToggle label="Labels" value={showLabels} onChange={setShowLabels} />
        </>}
        {useCase === 'events' && <KnobSelect label="Component" value={eventComponent} options={['calendar', 'session card']} onChange={setEventComponent} />}
      </>}
    >
      {useCase === 'journey' ? (
        <View style={{ width: '100%', alignItems: layout === 'vertical' ? 'center' : undefined }}>
          <Waypoints layout={layout as any} steps={steps} labels={showLabels ? labelList : undefined} />
        </View>
      ) : eventComponent === 'calendar' ? (() => {
        const t = new Date();
        const dow = t.getDay();
        const mon = new Date(t.getFullYear(), t.getMonth(), t.getDate() - (dow === 0 ? 6 : dow - 1));
        return (
          <View style={{ width: '100%' }}>
            <Calendar events={{
              [`${mon.getFullYear()}-${mon.getMonth()}-${mon.getDate()}`]: { count: 1, assessment: true },
              [`${t.getFullYear()}-${t.getMonth()}-${t.getDate()}`]: { count: 2 },
            }} />
          </View>
        );
      })() : (
        <View style={{ width: '100%' }}>
          <SessionCard time="9:00" title="Qudrat Mock Exam" meta="Full practice — 120 min" state="upcoming" assessment statusText="2:00" />
        </View>
      )}
    </Playground>

    <Import>{"import { Waypoints } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="steps" type="('done' | 'current' | 'arrived' | 'incomplete')[]" />
      <Prop name="labels" type="string[]" desc="Up to 5 shown under each step. 6+ shows current step name." />
      <Prop name="layout" type="'horizontal' | 'vertical' | 'path'" def="'horizontal'" />
    </Props>

    <S title="Marker Types" desc="Each state has a distinct visual treatment. Uses the actual WaypointMarker component.">
      <View style={{ gap: sp[4] }}>
        {([
          ['done', 'Done', 'Muted gold, center dot. Past steps.'],
          ['current', 'Current', 'Bright gold, solid fill. Your position.'],
          ['arrived', 'Arrived', 'Green, triangle inside. Auto-applied to final step.'],
          ['incomplete', 'Incomplete', 'Faint outline. Steps ahead.'],
        ] as const).map(([state, name, desc]) => (
          <View key={state} style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3] }}>
            <WaypointMarker state={state} />
            <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}><Text style={{ color: theme.fg }}>{name}</Text> — {desc}</Text>
          </View>
        ))}
      </View>
    </S>

    <S title="Event Indicators" desc="The diamond shape signals important events across the system.">
      <View style={{ gap: sp[4] }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3] }}>
          <View style={{ width: icon.sm, height: icon.sm, backgroundColor: theme.signal, transform: [{ rotate: '45deg' }] }} />
          <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, flex: 1 }}><Text style={{ color: theme.fg }}>Calendar</Text> — gold diamond inside the date circle for assessment days</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3] }}>
          <View style={{ width: icon.sm, height: icon.sm, backgroundColor: theme.signal, transform: [{ rotate: '45deg' }] }} />
          <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, flex: 1 }}><Text style={{ color: theme.fg }}>Session Card</Text> — replaces the status dot + gold left border for assessments</Text>
        </View>
      </View>
      <View style={{ marginTop: sp[4] }}>
        <Rl>Switch to "events" in the playground above to see both in action.</Rl>
      </View>
    </S>

    <S title="Rules">
      <Rl>Diamonds are reserved for journey and important events. Never decoration.</Rl>
      <Rl>Circles are used for status indicators (chips, live dots).</Rl>
      <Rl>Gold is the route colour. Green only appears on arrival.</Rl>
      <Rl>Maximum 10 steps recommended.</Rl>
    </S>
  </>;
}

export function WaterVesselPage() {
  const [fill, setFill] = useState('14');
  const [size, setSize] = useState('lg');
  const fillNum = Math.max(0, Math.min(18, parseInt(fill) || 0));
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="Fill" value={fill} options={['0','3','6','9','12','14','16','18']} onChange={setFill} />
        <KnobSelect label="Size" value={size} options={['sm', 'md', 'lg']} onChange={setSize} />
      </>}
    >
      <WaterVessel fill={fillNum} size={size as any} />
    </Playground>

    <Import>{"import { WaterVessel } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="fill" type="number" desc="Jugs filled" />
      <Prop name="capacity" type="number" def="18" />
      <Prop name="minimum" type="number" def="12" />
      <Prop name="size" type="'sm' | 'md' | 'lg'" def="'lg'" />
    </Props>
    <S title="States" desc="The vessel fills as students complete passages and help teammates.">
      <C label="Empty"><WaterVessel fill={0} size="md" /></C>
      <C label="Below minimum (red)"><WaterVessel fill={6} size="md" /></C>
      <C label="Above minimum (blue)"><WaterVessel fill={14} size="md" /></C>
      <C label="Full / overflow"><WaterVessel fill={18} size="md" /></C>
    </S>
    <S title="Sizes" desc="sm for crew lists, md for cards, lg for profile/hero."><R>
      <WaterVessel fill={14} size="sm" />
      <WaterVessel fill={14} size="md" />
      <WaterVessel fill={14} size="lg" />
    </R></S>
    <S title="What Fills It">
      <Rl>Completing passages (proof of work)</Rl>
      <Rl>Helping teammates (proof of helping)</Rl>
      <Rl>Overflow excess goes to crew pool</Rl>
    </S>
    <S title="Water Color">
      <Rl>Blue (#6BA3FF) when above minimum threshold</Rl>
      <Rl>Red (#c55a4e) when below minimum</Rl>
      <Rl>Color transitions instantly when fill crosses the minimum</Rl>
    </S>
    <S title="Animation">
      <Rl>Fill rise: water level climbs with 320ms ease. Surface line appears at the new level.</Rl>
      <Rl>Overflow: drip circles appear outside the vessel.</Rl>
      <Rl>Contribution: brief pulse of brightness at the water surface, then settle.</Rl>
    </S>
    <S title="Rules">
      <Rl>One continuous outline path. Cap, neck, and body. No inner detail.</Rl>
      <Rl>Same shape at every size.</Rl>
      <Rl>Show as fraction (14/18) not percentage.</Rl>
      <Rl>No sparkles or trophies. The fill is the reward.</Rl>
    </S>
  </>;
}

export function ContoursPage() {
  const [variant, setVariant] = useState('standard');
  const [opStr, setOpStr] = useState('100');
  return <>
    <Playground knobs={<>
      <KnobSelect label="Variant" value={variant} options={['standard', 'dense']} onChange={setVariant} />
      <KnobSelect label="Opacity %" value={opStr} options={['30', '50', '70', '100']} onChange={setOpStr} />
    </>}>
      <View style={{ width: '100%', overflow: 'hidden', borderRadius: r[2] }}>
        <TerrainPattern width={800} height={240} variant={variant as any} opacity={parseInt(opStr) / 100} />
      </View>
    </Playground>
    <Import>{"import { TerrainPattern } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="width" type="number" />
      <Prop name="height" type="number" />
      <Prop name="variant" type="'standard' | 'dense'" def="'standard'" desc="Standard = wider gaps for background. Dense = tight for hero areas." />
      <Prop name="opacity" type="number" def="1" />
      <Prop name="style" type="ViewStyle" />
    </Props>
    <S title="What it is">
      <Rl>Topographic contour lines — the cartographic notation for terrain. Lines flow coherently, bunching at elevation changes and spreading on flat ground.</Rl>
      <Rl>Think: the lines on a hiking map. This is the map, not the land.</Rl>
    </S>
    <S title="When to use">
      <Rl>Journey backgrounds — route map, chapter areas, behind the spine.</Rl>
      <Rl>Section headers — dense variant at 50-70% opacity behind text.</Rl>
      <Rl>Anywhere you want cartographic texture without a specific landscape.</Rl>
    </S>
    <S title="How it relates to Dune Pattern">
      <Rl>Terrain Lines = the map notation (contours). Dune Pattern = the landscape (ridgelines).</Rl>
      <Rl>Layer terrain lines over dune pattern for the complete picture — map drawn on the land.</Rl>
      <Rl>Both use the same generation system (sine waves + seeded noise) so they harmonise.</Rl>
    </S>
  </>;
}

export function DunePatternPage() {
  const [opStr, setOpStr] = useState('100');
  return <>
    <Playground knobs={<>
      <KnobSelect label="Opacity %" value={opStr} options={['30', '50', '70', '100']} onChange={setOpStr} />
    </>}>
      <View style={{ overflow: 'hidden', borderRadius: r[2] }}>
        <DunePattern width={800} height={300} opacity={parseInt(opStr) / 100} />
      </View>
    </Playground>
    <Import>{"import { DunePattern } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="width" type="number" />
      <Prop name="height" type="number" />
      <Prop name="opacity" type="number" def="1" />
      <Prop name="style" type="ViewStyle" />
    </Props>
    <S title="What it is">
      <Rl>Bold geometric dune ridges layered front to back. Each dune is a large angular form — gold on the sunlit face, terracotta/void on the shadow face. Sharp ridge peaks, flat fills, no soft curves.</Rl>
      <Rl>Like a low-poly desert mountain range at golden hour. Dramatic, Saudi, grounded.</Rl>
    </S>
    <S title="When to use">
      <Rl>Journey backgrounds — base camp zone, chapter transitions, lower portions of route map.</Rl>
      <Rl>Onboarding — the "crossing the desert" metaphor.</Rl>
      <Rl>Section dividers — a warm break between content zones.</Rl>
    </S>
    <S title="How it relates to Terrain Lines">
      <Rl>Same generation system — sine waves + seeded noise. Same family, different render.</Rl>
      <Rl>Terrain Lines = the map notation (strokes). Dune Pattern = the landscape (filled planes).</Rl>
      <Rl>Layer terrain lines over dune pattern for the complete picture.</Rl>
    </S>
    <S title="Rules">
      <Rl>Always behind content. Reduce opacity or ridges if text sits on top.</Rl>
      <Rl>Gold edges = sunlit. Terracotta fills = shadow. Light comes from the upper right.</Rl>
      <Rl>Clip to container. Partial reveals at the bottom of screens work best.</Rl>
    </S>
  </>;
}

export function ConstellationPage() {
  return <>
    <Playground knobs={<></>}>
      <View style={{ width: '100%', overflow: 'hidden', borderRadius: r[2] }}>
        <ConstellationPattern width={800} height={300} />
      </View>
    </Playground>
    <Import>{"import { ConstellationPattern } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="width" type="number" />
      <Prop name="height" type="number" />
      <Prop name="opacity" type="number" def="1" />
      <Prop name="style" type="ViewStyle" />
    </Props>
    <S title="What it is">
      <Rl>A geometric starfield with connected gold nodes and thin lines forming constellations. Triangular planes in iris purple and terracotta fill between nodes for depth. Small scattered stars in the background.</Rl>
      <Rl>Represents the night sky above the desert — the celestial canopy you navigate by.</Rl>
    </S>
    <S title="When to use">
      <Rl>Hero sections and headers — achievement screens, welcome back, goal overview.</Rl>
      <Rl>Celebration backgrounds — behind interstitials, mastery moments.</Rl>
      <Rl>Marketing — landing pages, feature highlights.</Rl>
    </S>
    <S title="How it relates to other surfaces">
      <Rl>Constellation = sky above. Dune = ground below. They pair naturally on journey screens (sky at top, dunes at bottom).</Rl>
      <Rl>Terrain Lines = the map between them. Grid Paper = precision/data contexts.</Rl>
      <Rl>Constellation is the most decorative surface — use it sparingly for high-impact moments.</Rl>
    </S>
    <S title="Rules">
      <Rl>Always behind content. Reduce opacity when text overlays.</Rl>
      <Rl>Gold nodes are the signal colour — warm, intentional, not decorative.</Rl>
      <Rl>Iris triangles add depth but should never overpower. Keep fill opacity low.</Rl>
    </S>
  </>;
}

export function VoiceTutorPage() {
  const [vtState, setVtState] = useState('idle');
  const [vtSizeSel, setVtSizeSel] = useState('160');
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="State" value={vtState} options={['idle','listening','thinking','speaking','error']} onChange={setVtState} />
        <KnobSelect label="size" value={vtSizeSel} options={['80','120','160','200']} onChange={setVtSizeSel} />
      </>}
    >
      <VoiceTutor state={vtState as any} size={parseInt(vtSizeSel)} />
    </Playground>

    <Import>{"import { VoiceTutor } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="state" type="'idle' | 'listening' | 'thinking' | 'speaking' | 'error'" def="'idle'" />
      <Prop name="size" type="number" def="160" desc="Container size" />
    </Props>
    <S title="All States"><R>
      <VoiceTutor state="idle" size={100} />
      <VoiceTutor state="listening" size={100} />
      <VoiceTutor state="thinking" size={100} />
      <VoiceTutor state="speaking" size={100} />
      <VoiceTutor state="error" size={100} />
    </R></S>
    <S title="Identity" desc="The voice tutor is a living, breathing guide — not an assistant, not a chatbot.">
      <Rl>Color: Iris. Exclusively the voice tutor. No other component uses it. Adapts per theme.</Rl>
      <Rl>Shape: asymmetric aura with directed beam. Not a symmetric orb — it has a facing, a direction.</Rl>
      <Rl>Warmth: never cold or clinical. The purple is warm, the glow spills onto surrounding UI.</Rl>
      <Rl>Aliveness: never fully static. Even idle breathes slowly (4s cycle). Micro-animations signal "I'm here" without demanding attention.</Rl>
    </S>
    <S title="State Behaviour" desc="Each state must be instantly distinguishable. Not subtle opacity shifts — fundamentally different motion and form.">
      <Rl>Idle: small core, slow breathe. 4s cycle. Minimal presence.</Rl>
      <Rl>Listening: core swells large and bright on inhale, contracts on exhale. 3s cycle. Calm, receptive.</Rl>
      <Rl>Thinking: small particles orbit a contracted core. Energy gathering inward. "Processing."</Rl>
      <Rl>Speaking: core is largest and brightest. Fast speech-cadence pulse (400ms). Full presence.</Rl>
      <Rl>Error: core shrinks and shifts warm/amber. Quick flicker. Aura collapses. "Something broke."</Rl>
    </S>
    <S title="Rules">
      <Rl>Iris purple exclusively. No other component or context uses it.</Rl>
      <Rl>The tutor is a presence in the space, not a button you tap.</Rl>
      <Rl>No avatar, no face, no character. Just light and motion.</Rl>
      <Rl>Must respect reduced-motion: replace animations with static state indicators.</Rl>
    </S>
  </>;
}

export function MenuPage() {
  const [vis, setVis] = useState(false);
  const [count, setCount] = useState('3');
  const [hasDanger, setHasDanger] = useState(true);
  const [anchor, setAnchor] = useState<{ x: number; y: number } | undefined>();
  const triggerRef = React.useRef<View>(null);
  const baseItems = ['Edit', 'Duplicate', 'Share', 'Archive'];
  const items = baseItems.slice(0, parseInt(count) - (hasDanger ? 1 : 0));
  const menuItems = [
    ...items.map(l => ({ label: l, onPress: () => setVis(false) })),
    ...(hasDanger ? [{ label: 'Delete', danger: true, onPress: () => setVis(false) }] : []),
  ];
  const openMenu = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ x: x + width, y: y + height + 4 });
      setVis(true);
    });
  };
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="items" value={count} options={['2','3','4','5']} onChange={setCount} />
        <KnobToggle label="danger item" value={hasDanger} onChange={setHasDanger} />
      </>}
    >
      <View ref={triggerRef} collapsable={false}>
        <Button variant="secondary" onPress={openMenu}>Open menu</Button>
      </View>
    </Playground>

    <Import>{"import { Menu } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="visible" type="boolean" />
      <Prop name="onClose" type="() => void" />
      <Prop name="items" type="{ label: string; danger?: boolean; onPress: () => void }[]" />
      <Prop name="anchor" type="{ x: number; y: number }" desc="Position near trigger — use measureInWindow" />
    </Props>
    <Menu visible={vis} onClose={() => setVis(false)} items={menuItems} anchor={anchor} />
    <S title="Rules">
      <Rl>Triggered by IconButton or long-press. Positioned near trigger.</Rl>
      <Rl>Destructive items use danger colour.</Rl>
      <Rl>Dismisses on backdrop tap or item selection.</Rl>
    </S>
  </>;
}

export function CalendarPage() {
  const [expanded, setExpanded] = useState(false);
  const [showEvents, setShowEvents] = useState(true);
  const [localeSel, setLocaleSel] = useState('default');
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  const sampleEvents = showEvents ? {
    [`${monday.getFullYear()}-${monday.getMonth()}-${monday.getDate()}`]: { count: 1, assessment: true },
    [`${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`]: { count: 3 },
    [`${today.getFullYear()}-${today.getMonth()}-10`]: { count: 1 },
    [`${today.getFullYear()}-${today.getMonth()}-15`]: { count: 2 },
  } : {};
  return <>
    <Playground
      knobs={<>
        <KnobToggle label="Expanded" value={expanded} onChange={setExpanded} />
        <KnobToggle label="Event dots" value={showEvents} onChange={setShowEvents} />
        <KnobSelect label="locale" value={localeSel} options={['default','ar']} onChange={setLocaleSel} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <Calendar expanded={expanded} onToggle={() => setExpanded(!expanded)} events={sampleEvents} locale={localeSel === 'ar' ? 'ar' : undefined} />
      </View>
    </Playground>

    <Import>{"import { Calendar } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="selected" type="Date" desc="Currently selected date" />
      <Prop name="onSelect" type="(date: Date) => void" />
      <Prop name="events" type="Record<string, { count?; assessment? }>" desc="Keyed by 'year-month-day'. assessment: true gives gold treatment." />
      <Prop name="expanded" type="boolean" desc="Full month view. Default: week strip." />
      <Prop name="onToggle" type="() => void" desc="Tap or drag handle to expand/collapse" />
      <Prop name="backIcon" type="ReactNode" desc="Back arrow — same as TitleBar" />
      <Prop name="onBack" type="() => void" desc="Back navigation — same as TitleBar" />
      <Prop name="rightAction" type="ReactNode" desc="Right-side content — same as TitleBar" />
      <Prop name="locale" type="CalendarLocale | 'ar'" desc="Locale config: day names, months, week start day. Pass 'ar' for built-in Arabic." />
    </Props>
    <S title="Rules">
      <Rl>Week strip by default. Drag handle expands to full month.</Rl>
      <Rl>Selected day: accent bg, pill radius, accentFg text.</Rl>
      <Rl>Today: accentSoft bg when not selected.</Rl>
      <Rl>Event dots: up to 3 dots below the day number. Accent colour.</Rl>
      <Rl>Outside days (prev/next month) shown faint.</Rl>
      <Rl>Arrows navigate weeks (collapsed) or months (expanded).</Rl>
    </S>
    <S title="Locale">
      <Rl>Pass locale="ar" for Arabic (Saturday-first week, Arabic day/month names).</Rl>
      <Rl>Or pass a custom CalendarLocale object: dayNames (7), months (12), fullDays (7), weekStart (0=Sun, 6=Sat), today (label).</Rl>
      <Rl>Chevrons flip automatically when I18nManager.isRTL is true.</Rl>
    </S>
  </>;
}

export function CardGridPage() {
  const { theme } = useTheme();
  return <>
    <Import>{"import { CardGrid, Card } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="children" type="ReactNode" desc="Card components" />
      <Prop name="columns" type="number" def="2" />
    </Props>
    <S title="2 columns">
      <CardGrid>
        <Card title="Qudrat Reading" subtitle="Mr. Hassan" onPress={() => {}} />
        <Card title="Mathematics" subtitle="Dr. Al-Rashid" tag="New" tagVariant="accent" onPress={() => {}} />
        <Card title="Physics" subtitle="Mr. Omar" onPress={() => {}} />
        <Card title="Chemistry" subtitle="Ms. Fatima" meta="3 sessions" onPress={() => {}} />
      </CardGrid>
    </S>
    <S title="Rules">
      <Rl>sp[4] gap between cards. Cards fill available width within the grid.</Rl>
      <Rl>2 columns on phone, 3 on tablet. Last row pads empty cells.</Rl>
    </S>
  </>;
}

export function IdentityPage() {
  const [size, setSize] = useState('md');
  const [clr, setClr] = useState('default');
  const [useImage, setUseImage] = useState(false);
  const [status, setStatus] = useState('none');
  const [hasBadge, setHasBadge] = useState(false);
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="Size" value={size} options={['sm', 'md', 'lg']} onChange={setSize} />
        <KnobSelect label="Color" value={clr} options={['default', 'noon', 'blue']} onChange={setClr} />
        <KnobToggle label="Image (SSO)" value={useImage} onChange={setUseImage} />
        <KnobSelect label="Status" value={status} options={['none', 'online', 'busy']} onChange={setStatus} />
        <KnobToggle label="Badge" value={hasBadge} onChange={setHasBadge} />
      </>}
    >
      <Identity initials="SA" imageUri={useImage ? 'https://i.pravatar.cc/150?u=sarah' : undefined} name="Sarah Al-Rashid" role="Crew Alpha" avatarColor={clr as any} status={status === 'none' ? undefined : status as any} size={size as any} badge={hasBadge ? 3 : undefined} />
    </Playground>

    <Import>{"import { Identity } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="initials" type="string" desc="Fallback when no image" />
      <Prop name="imageUri" type="string" desc="Profile photo URL (e.g. Google SSO)" />
      <Prop name="name" type="string" />
      <Prop name="role" type="string" desc="Mono text below name" />
      <Prop name="meta" type="string" desc="Faint text below role" />
      <Prop name="avatarColor" type="'default' | 'noon' | 'blue'" />
      <Prop name="status" type="'online' | 'busy'" />
      <Prop name="badge" type="string | number" />
      <Prop name="right" type="ReactNode" desc="Right-side content" />
      <Prop name="size" type="'sm' | 'md' | 'lg'" def="'md'" />
    </Props>
    <S title="Examples">
      <C label="With photo"><Identity initials="SA" imageUri="https://i.pravatar.cc/150?u=sarah" name="Sarah Al-Rashid" role="Crew Alpha" meta="Joined 3 weeks ago" status="online" /></C>
      <C label="Initials fallback"><Identity initials="SA" name="Sarah Al-Rashid" role="Crew Alpha" avatarColor="noon" /></C>
      <C label="Teacher"><Identity initials="H" name="Mr. Hassan" role="Teacher" avatarColor="blue" /></C>
      <C label="With badge"><Identity initials="O" name="Omar K." role="Facilitator" status="online" badge={3} /></C>
    </S>
  </>;
}

export function VideoPage() {
  const [vtTitle, setVtTitle] = useState('How to spot implied meaning');
  const [vtAttr, setVtAttr] = useState('Star Teacher — Ms. Al-Harbi');
  const [vtDur, setVtDur] = useState('2:34');
  return <>
    <Playground
      knobs={<>
        <KnobText label="Title" value={vtTitle} onChange={setVtTitle} />
        <KnobText label="Attribution" value={vtAttr} onChange={setVtAttr} />
        <KnobText label="Duration" value={vtDur} onChange={setVtDur} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <VideoCard title={vtTitle} attribution={vtAttr || undefined} duration={vtDur || undefined} />
      </View>
    </Playground>

    <Import>{"import { VideoCard } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="title" type="string" />
      <Prop name="attribution" type="string" desc="Speaker or source" />
      <Prop name="duration" type="string" desc="e.g. '2:34'" />
      <Prop name="uri" type="string" desc="Video URL — CDN, YouTube, or any link. Opens in native player." />
      <Prop name="thumbnail" type="ImageSourcePropType" desc="Preview frame. Auto-fetched for YouTube URLs." />
      <Prop name="onPress" type="() => void" desc="Overrides default Linking.openURL behaviour" />
    </Props>
    <S title="Player Specs" desc="Use expo-av or react-native-video for playback. VideoCard is the thumbnail — onPress should launch the player.">
      <Rl>Default: opens fullscreen player. Use StatusBar hidden + safe area insets.</Rl>
      <Rl>Controls bar: sp[4] padding, fs[11] mono timestamps.</Rl>
      <Rl>Progress bar: sp[1] height, pill radius, accent fill.</Rl>
      <Rl>Overlay controls fade in on tap, auto-hide after 3s.</Rl>
      <Rl>In voice chat: can also play inline within the conversation flow.</Rl>
    </S>
  </>;
}

export function BottomActionPage() {
  const [hasMessage, setHasMessage] = useState(true);
  const [hasSubmessage, setHasSubmessage] = useState(true);
  const [hasIcon, setHasIcon] = useState(true);
  const [msgVariant, setMsgVariant] = useState('accent');
  const [hasSecondary, setHasSecondary] = useState(false);
  const [primaryDisabled, setPrimaryDisabled] = useState(false);
  const msgText = msgVariant === 'accent' ? 'Correct!' : msgVariant === 'danger' ? 'Incorrect' : 'Answer submitted';
  const subText = msgVariant === 'accent' ? 'The answer is B — plentiful' : msgVariant === 'danger' ? 'The correct answer was B' : 'Your response has been recorded';
  const iconName = msgVariant === 'accent' ? 'check' : msgVariant === 'danger' ? 'close' : 'info';
  return <>
    <Playground
      knobs={<>
        <KnobToggle label="message" value={hasMessage} onChange={setHasMessage} />
        {hasMessage && <KnobToggle label="submessage" value={hasSubmessage} onChange={setHasSubmessage} />}
        {hasMessage && <KnobToggle label="icon" value={hasIcon} onChange={setHasIcon} />}
        {hasMessage && <KnobSelect label="messageVariant" value={msgVariant} options={['default', 'accent', 'danger']} onChange={setMsgVariant} />}
        <KnobToggle label="secondary" value={hasSecondary} onChange={setHasSecondary} />
        <KnobToggle label="primary disabled" value={primaryDisabled} onChange={setPrimaryDisabled} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <BottomAction
          icon={hasMessage && hasIcon ? iconName as any : undefined}
          message={hasMessage ? msgText : undefined}
          submessage={hasMessage && hasSubmessage ? subText : undefined}
          messageVariant={msgVariant as any}
          primary={{ label: 'Next', onPress: () => {}, disabled: primaryDisabled }}
          secondary={hasSecondary ? { label: 'Skip', onPress: () => {} } : undefined}
        />
      </View>
    </Playground>
    <Import>{"import { BottomAction } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="icon" type="IconName" desc="Icon next to message" />
      <Prop name="message" type="string" desc="Feedback heading" />
      <Prop name="submessage" type="string" desc="Detail text below message" />
      <Prop name="messageVariant" type="'default' | 'accent' | 'danger'" def="'default'" desc="Message + icon colour" />
      <Prop name="primary" type="{ label, onPress, disabled?, variant? }" desc="Primary action button" />
      <Prop name="secondary" type="{ label, onPress, disabled?, variant? }" desc="Secondary action button" />
    </Props>
    <S title="When to use">
      <Rl>Task screens: quiz answers, form submission, checkout, confirmations.</Rl>
      <Rl>Never on screens with BottomNav — BottomAction replaces it for the duration of the task.</Rl>
      <Rl>Place at the bottom of the screen layout, below a ScrollView.</Rl>
      <Rl>Safe area handled automatically — clears the home indicator.</Rl>
    </S>
    <S title="Quiz flow">
      <Rl>Before answer: primary disabled ("Check"), no message.</Rl>
      <Rl>After correct: message "Correct!" (accent), primary "Next".</Rl>
      <Rl>After incorrect: message "Incorrect" (danger), primary "Next", secondary "Try again".</Rl>
    </S>
  </>;
}

export function BreadcrumbsPage() {
  return <>
    <Playground knobs={<></>}>
      <Breadcrumbs items={[{ label: 'Home', onPress: () => {} }, { label: 'Qudrat Math', onPress: () => {} }, { label: 'Geometry' }]} />
    </Playground>
    <Import>{"import { Breadcrumbs } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="items" type="{ label: string; onPress?: () => void }[]" desc="Path segments. Last item is current (no onPress)." />
    </Props>
    <S title="Deep path">
      <Breadcrumbs items={[{ label: 'Home', onPress: () => {} }, { label: 'Courses', onPress: () => {} }, { label: 'Qudrat', onPress: () => {} }, { label: 'Math', onPress: () => {} }, { label: 'Geometry & Measurement' }]} />
    </S>
    <S title="Two levels">
      <Breadcrumbs items={[{ label: 'Dashboard', onPress: () => {} }, { label: 'Settings' }]} />
    </S>
    <S title="Usage">
      <Rl>Web and tablet only. On mobile, use TitleBar with back button instead.</Rl>
      <Rl>Separator is / in mono. Current page (last item) is bold fg, ancestors are fgMuted and tappable.</Rl>
    </S>
  </>;
}

export function PaginationPage() {
  const [page, setPage] = useState(4);
  const [totalStr, setTotalStr] = useState('12');
  return <>
    <Playground knobs={<>
      <KnobSelect label="Total pages" value={totalStr} options={['3', '5', '8', '12', '20', '50']} onChange={(v) => { setTotalStr(v); setPage(1); }} />
    </>}>
      <Pagination total={parseInt(totalStr)} current={page} onPageChange={setPage} />
    </Playground>
    <Import>{"import { Pagination } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="total" type="number" desc="Total number of pages" />
      <Prop name="current" type="number" desc="Currently active page (1-indexed)" />
      <Prop name="onPageChange" type="(page: number) => void" />
    </Props>
    <S title="Examples">
      <C label="Start"><Pagination total={12} current={1} onPageChange={() => {}} /></C>
      <C label="Middle"><Pagination total={12} current={6} onPageChange={() => {}} /></C>
      <C label="End"><Pagination total={12} current={12} onPageChange={() => {}} /></C>
      <C label="Few pages"><Pagination total={4} current={2} onPageChange={() => {}} /></C>
    </S>
    <S title="Usage">
      <Rl>Web and tablet only. On mobile, use infinite scroll or load-more.</Rl>
      <Rl>Always 7 page slots — first, last, current + neighbours, ellipsis where needed. No layout shift.</Rl>
      <Rl>Arrows dim at boundaries.</Rl>
    </S>
  </>;
}

export function SideNavPage() {
  const { theme } = useTheme();
  const [active, setActive] = useState('atlas');
  const groups = [
    { title: 'Main', items: [{ id: 'atlas', label: 'Atlas' }, { id: 'schedule', label: 'Schedule' }, { id: 'crew', label: 'Crew' }] },
    { title: 'Learn', items: [{ id: 'homework', label: 'Homework' }, { id: 'sessions', label: 'Sessions' }] },
    { title: 'Account', items: [{ id: 'settings', label: 'Settings' }, { id: 'profile', label: 'Profile' }] },
  ];
  return <>
    <S title="Side Nav" desc="Desktop/tablet only. Replaces BottomNav on wider screens.">
      <View style={{ width: 220, borderWidth: 1, borderColor: theme.border, borderRadius: r[2], overflow: 'hidden', backgroundColor: theme.bgSunken }}>
        {groups.map(g => (
          <View key={g.title} style={{ paddingHorizontal: sp[3], paddingVertical: sp[3] }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgFaint, letterSpacing: 1.5, textTransform: 'uppercase', paddingHorizontal: sp[3], marginBottom: sp[2] }}>{g.title}</Text>
            {g.items.map(item => (
              <Pressable key={item.id} onPress={() => setActive(item.id)} style={{ paddingVertical: sp[2], paddingHorizontal: sp[3], borderRadius: r[1], backgroundColor: active === item.id ? theme.activeOverlay : 'transparent', marginBottom: 1 }}>
                <Text style={{ fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: active === item.id ? theme.fg : theme.fgMuted }}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    </S>
    <S title="Specs">
      <Rl>Width: 220-280px. Grouped items with uppercase mono headers.</Rl>
      <Rl>Active item: activeOverlay bg, fg text. Inactive: fgMuted.</Rl>
      <Rl>Item padding: sp[2] vertical, sp[3] horizontal, r[1] radius.</Rl>
      <Rl>Desktop/tablet only. On mobile, use BottomNav.</Rl>
    </S>
  </>;
}

export function ModalPage() {
  const [vis, setVis] = useState(false);
  return <>
    <Playground knobs={<></>}>
      <Button variant="secondary" onPress={() => setVis(true)}>Open Modal</Button>
    </Playground>
    <Dialog visible={vis} onClose={() => setVis(false)} title="Confirm action" body="This is a modal dialog — the same Dialog component with controlled visibility." primaryLabel="OK" onPrimary={() => setVis(false)} />
    <Import>{"import { Dialog } from '@noon/design-system';"}</Import>
    <S title="Implementation">
      <Rl>Modal = Dialog with visible + onClose. No separate component needed.</Rl>
      <Rl>Centered on screen with scrim behind. Tap scrim to dismiss.</Rl>
    </S>
    <S title="When to use">
      <Rl>Confirmation prompts, destructive actions, simple decisions.</Rl>
      <Rl>For rich content (forms, lists), use BottomSheet instead.</Rl>
      <Rl>For full-screen content, use FullSheet.</Rl>
    </S>
  </>;
}

export function PopoversPage() {
  return <>
    <S title="Popovers" desc="Contextual content anchored to a trigger.">
      <Rl>On mobile, popovers are unreliable to position. Use these alternatives:</Rl>
    </S>
    <S title="Alternatives by use case">
      <Rl>Short helper text → <Text style={{ fontWeight: fw[600] }}>Tooltip</Text> (hover on web, long-press on mobile)</Rl>
      <Rl>Rich content preview → <Text style={{ fontWeight: fw[600] }}>BottomSheet</Text></Rl>
      <Rl>Action list → <Text style={{ fontWeight: fw[600] }}>Menu</Text></Rl>
      <Rl>Confirmation → <Text style={{ fontWeight: fw[600] }}>Dialog</Text></Rl>
    </S>
    <S title="On web/tablet">
      <Rl>If you need a true popover on web, position a View absolutely relative to the trigger using onLayout measurements — same pattern as Tooltip but with custom content.</Rl>
    </S>
  </>;
}

export function FormStackPage() {
  const [ch, setCh] = useState(false);
  return <>
    <S title="Form Stack" desc="Vertical layout pattern for form fields. Not a component — a convention.">
      <View style={{ gap: sp[5] }}>
        <Input label="Name" placeholder="Your name" />
        <Input label="Email" placeholder="you@noon.com" />
        <Textarea label="Notes" placeholder="Anything else..." rows={3} />
        <Checkbox checked={ch} onValueChange={setCh} label="I agree to the terms" />
        <Button fullWidth>Submit</Button>
      </View>
    </S>
    <S title="Rules">
      <Rl>sp[5] gap between fields. Labels above each field.</Rl>
      <Rl>Submit button at bottom, full width (fullWidth).</Rl>
      <Rl>Error states inline — show error prop on the field that failed.</Rl>
    </S>
  </>;
}

export function DropzonePage() {
  const { theme } = useTheme();
  const [state, setState] = useState('default');
  const [acceptText, setAcceptText] = useState('PDF, PNG, JPG');

  const isDisabled = state === 'disabled';
  const isDragging = state === 'hovering';
  const hasFile = state === 'uploaded';
  const isError = state === 'error';

  const borderColor = isDragging ? theme.accent : isError ? theme.danger : hasFile ? theme.accentBorder : theme.borderStrong;
  const bgColor = isDragging ? theme.accentSoft : hasFile ? theme.accentSoft : 'transparent';

  return <>
    <Playground knobs={<>
      <KnobSelect label="State" value={state} options={['default', 'hovering', 'uploaded', 'error', 'disabled']} onChange={setState} />
      <KnobText label="Accept" value={acceptText} onChange={setAcceptText} />
    </>}>
      <View style={{ width: '100%' }}>
        {hasFile ? (
          <View style={{
            borderWidth: 1, borderRadius: r[2], borderColor, backgroundColor: bgColor,
            paddingVertical: sp[4], paddingHorizontal: sp[4],
            flexDirection: 'row', alignItems: 'center', gap: sp[3],
          }}>
            <View style={{ width: 40, height: 40, borderRadius: r[2], backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="document" size={20} color={theme.accentFg} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: theme.fg }}>homework_week4.pdf</Text>
              <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgFaint, marginTop: 2 }}>2.4 MB · PDF</Text>
            </View>
            <Pressable onPress={() => setState('default')} hitSlop={8}>
              <Icon name="close" size={16} color={theme.fgMuted} />
            </Pressable>
          </View>
        ) : (
          <View style={{
            borderWidth: 2, borderStyle: 'dashed', borderRadius: r[2],
            borderColor: isError ? theme.danger : borderColor,
            backgroundColor: isDragging ? bgColor : 'transparent',
            paddingVertical: sp[7], paddingHorizontal: sp[5], alignItems: 'center', gap: sp[2],
            opacity: isDisabled ? 0.4 : 1,
          }}>
            <Icon name={isError ? 'error' : 'plus'} size={28} color={isDragging ? theme.accent : isError ? theme.danger : theme.fgFaint} />
            <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: isError ? theme.danger : isDragging ? theme.accent : theme.fgMuted, textAlign: 'center' }}>
              {isError ? 'Upload failed' : isDragging ? 'Drop to upload' : 'Tap or drag to upload'}
            </Text>
            {!isError && !isDragging && (
              <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgFaint, letterSpacing: 1, textTransform: 'uppercase' }}>{acceptText}</Text>
            )}
          </View>
        )}
      </View>
    </Playground>

    <Props>
      <Prop name="state" type="'default' | 'hovering' | 'uploaded' | 'error' | 'disabled'" desc="Visual state of the zone" />
      <Prop name="accept" type="string" desc="Accepted file types hint, e.g. 'PDF, PNG, JPG'" />
      <Prop name="fileName" type="string" desc="Name of uploaded file" />
      <Prop name="fileSize" type="string" desc="Size of uploaded file, e.g. '2.4 MB'" />
      <Prop name="onPress" type="() => void" desc="Tap handler — trigger file picker" />
      <Prop name="onDrop" type="(file) => void" desc="Web drag-and-drop handler" />
      <Prop name="onRemove" type="() => void" desc="Clear uploaded file" />
    </Props>

    <S title="Implementation">
      <Rl>Composition pattern — not a standalone component. Build with Pressable, Icon, Text.</Rl>
      <Rl>Web: add onDragOver, onDragLeave, onDrop to the Pressable.</Rl>
      <Rl>Mobile: onPress triggers expo-document-picker or expo-image-picker.</Rl>
    </S>
  </>;
}

export function VoiceChatPage() {
  const sampleText = 'Read the passage again and focus on what the author doesn\'t say directly. The door being described as ajar tells us something important.';
  const [msgFrom, setMsgFrom] = useState('tutor');
  const [msgThinking, setMsgThinking] = useState(false);
  const [msgConfirmed, setMsgConfirmed] = useState(true);
  const [msgText, setMsgText] = useState(sampleText);
  const [revealPct, setRevealPct] = useState('100');
  const revealLen = msgFrom === 'tutor' ? Math.round((parseInt(revealPct) / 100) * msgText.length) : undefined;
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="from" value={msgFrom} options={['tutor', 'student']} onChange={setMsgFrom} />
        {msgFrom === 'tutor' && <KnobToggle label="thinking" value={msgThinking} onChange={setMsgThinking} />}
        {msgFrom === 'student' && <KnobToggle label="confirmed" value={msgConfirmed} onChange={setMsgConfirmed} />}
        {msgFrom === 'tutor' && !msgThinking && <KnobSelect label="revealedLength" value={revealPct} options={['0', '25', '50', '75', '100']} onChange={setRevealPct} />}
        <KnobText label="children" value={msgText} onChange={setMsgText} />
      </>}
    >
      <ChatMessage from={msgFrom as any} confirmed={msgFrom === 'student' ? msgConfirmed : true} thinking={msgFrom === 'tutor' ? msgThinking : undefined} revealedLength={revealLen}>{msgText}</ChatMessage>
    </Playground>

    <Import>{"import { ChatMessage } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="children" type="string" desc="Message text" />
      <Prop name="from" type="'tutor' | 'student'" />
      <Prop name="confirmed" type="boolean" def="true" desc="Student only — false while speech is being recognized" />
      <Prop name="thinking" type="boolean" desc="Tutor only — shows bouncing dots instead of text" />
      <Prop name="revealedLength" type="number" desc="Tutor only — characters revealed so far. Unrevealed text shows in fgFaint." />
    </Props>
    <S title="Tutor — thinking">
      <ChatMessage from="tutor" thinking>Thinking...</ChatMessage>
    </S>
    <S title="Tutor — progressive reveal">
      <View style={{ gap: sp[4] }}>
        <ChatMessage from="tutor" revealedLength={0}>The full response is visible but nothing has been spoken yet.</ChatMessage>
        <ChatMessage from="tutor" revealedLength={24}>The full response is visible but nothing has been spoken yet.</ChatMessage>
        <ChatMessage from="tutor">The full response is visible but nothing has been spoken yet.</ChatMessage>
      </View>
    </S>
    <S title="Student states">
      <View style={{ gap: sp[4] }}>
        <ChatMessage from="student" confirmed={false}>I think the character feels trapped?</ChatMessage>
        <ChatMessage from="student">I think the character feels trapped?</ChatMessage>
      </View>
    </S>
  </>;
}

export function BreakdownPage() {
  const [bdTitle, setBdTitle] = useState('Key signals');
  const [bdCount, setBdCount] = useState('3');
  const allPoints = ['Door described as "ajar" not "open"', 'Room dimensions mentioned three times', 'Light from one direction only', 'Character never looks outside', 'Silence described as "heavy"'];
  return <>
    <Playground
      knobs={<>
        <KnobText label="Title" value={bdTitle} onChange={setBdTitle} />
        <KnobSelect label="Points" value={bdCount} options={['1','2','3','4','5']} onChange={setBdCount} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <BreakdownCard title={bdTitle} points={allPoints.slice(0, parseInt(bdCount))} />
      </View>
    </Playground>
    <Import>{"import { BreakdownCard } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="title" type="string" />
      <Prop name="points" type="string[]" desc="2-5 bullet points" />
    </Props>
    <S title="Rules">
      <Rl>Iris dots mark each point. 2-5 points max.</Rl>
      <Rl>Used when the tutor breaks a concept into key parts.</Rl>
    </S>
  </>;
}

export function ActivityCardPage() {
  const [acTitle, setAcTitle] = useState('Identify the implied meaning');
  const [acDesc, setAcDesc] = useState('Select which emotion the author implies.');
  const [acBtn, setAcBtn] = useState('Start');
  const [acComplete, setAcComplete] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { theme } = useTheme();
  return <>
    <Playground
      knobs={<>
        <KnobText label="Title" value={acTitle} onChange={setAcTitle} />
        <KnobText label="Description" value={acDesc} onChange={setAcDesc} />
        <KnobText label="Button Label" value={acBtn} onChange={setAcBtn} />
        <KnobToggle label="Complete" value={acComplete} onChange={setAcComplete} />
        <KnobToggle label="score" value={showScore} onChange={setShowScore} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <ActivityCard title={acTitle} description={acDesc || undefined} buttonLabel={acBtn || undefined} complete={acComplete} score={showScore ? '9/10' : undefined} onPress={acComplete ? undefined : () => setSheetOpen(true)} />
      </View>
    </Playground>
    <Import>{"import { ActivityCard } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="title" type="string" />
      <Prop name="description" type="string" />
      <Prop name="buttonLabel" type="string" def="'Start'" />
      <Prop name="complete" type="boolean" desc="Replaces button with 'Complete' label" />
      <Prop name="score" type="string" desc="Shown when complete" />
      <Prop name="onPress" type="() => void" />
    </Props>
    <S title="Rules">
      <Rl>One CTA per card. Opens a FullSheet or inline exercise.</Rl>
      <Rl>Complete state: green accent border, no button, optional score.</Rl>
    </S>
    <FullSheet visible={sheetOpen} onClose={() => setSheetOpen(false)} title="Identify the implied meaning">
      <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fgFaint, textAlign: 'center', marginTop: sp[5] }}>Content will appear here</Text>
    </FullSheet>
  </>;
}

export function WorkedExamplePage() {
  const [weTitle, setWeTitle] = useState('Finding the missing side');
  const [sheetOpen, setSheetOpen] = useState(false);
  const { theme } = useTheme();
  return <>
    <Playground
      knobs={<>
        <KnobText label="Title" value={weTitle} onChange={setWeTitle} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <WorkedExampleCard title={weTitle} onPress={() => setSheetOpen(true)} />
      </View>
    </Playground>
    <Import>{"import { WorkedExampleCard } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="title" type="string" />
      <Prop name="steps" type="{ title: string; content: string }[]" desc="Opens FullSheet with numbered steps" />
      <Prop name="onPress" type="() => void" desc="Custom handler" />
    </Props>
    <S title="Rules">
      <Rl>Opens in a FullSheet titled "Worked example".</Rl>
      <Rl>Steps are numbered with iris accent circles.</Rl>
    </S>
    <FullSheet visible={sheetOpen} onClose={() => setSheetOpen(false)} title="Worked example">
      <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fgFaint, textAlign: 'center', marginTop: sp[5] }}>Content will appear here</Text>
    </FullSheet>
  </>;
}

export function SlidesCardPage() {
  const [scTitle, setScTitle] = useState('Trigonometry fundamentals');
  const [scAttr, setScAttr] = useState('Ms. Al-Harbi');
  const [sheetOpen, setSheetOpen] = useState(false);
  const { theme } = useTheme();
  return <>
    <Playground
      knobs={<>
        <KnobText label="Title" value={scTitle} onChange={setScTitle} />
        <KnobText label="Attribution" value={scAttr} onChange={setScAttr} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <SlidesCard title={scTitle} attribution={scAttr || undefined} onPress={() => setSheetOpen(true)} slides={[
          require('../../reference/Tester.png'),
        ]} />
      </View>
    </Playground>
    <Import>{"import { SlidesCard } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="title" type="string" />
      <Prop name="attribution" type="string" />
      <Prop name="slides" type="ImageSourcePropType[]" desc="Array of slide images" />
      <Prop name="onPress" type="() => void" desc="Custom handler" />
    </Props>
    <S title="Rules">
      <Rl>Thumbnail shows first slide image.</Rl>
      <Rl>Opens in a FullSheet with prev/next navigation.</Rl>
    </S>
    <FullSheet visible={sheetOpen} onClose={() => setSheetOpen(false)} title="Trigonometry fundamentals">
      <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fgFaint, textAlign: 'center', marginTop: sp[5] }}>Content will appear here</Text>
    </FullSheet>
  </>;
}

export function ResourceListPage() {
  const [rlTitle, setRlTitle] = useState('Resources');
  const [rlCount, setRlCount] = useState('2');
  const [sheetOpen, setSheetOpen] = useState<string | null>(null);
  const { theme } = useTheme();
  const allLinks = [
    'Inference practice worksheet',
    'Reading comprehension guide',
    'SOH CAH TOA decision tree',
    'Quick reference card',
    'Past exam questions',
  ];
  const links = allLinks.slice(0, parseInt(rlCount)).map(label => ({
    label,
    onPress: () => setSheetOpen(label),
  }));
  return <>
    <Playground
      knobs={<>
        <KnobText label="Title" value={rlTitle} onChange={setRlTitle} />
        <KnobSelect label="Links" value={rlCount} options={['1','2','3','4','5']} onChange={setRlCount} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <ResourceList title={rlTitle || undefined} links={links} />
      </View>
    </Playground>
    <Import>{"import { ResourceList } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="title" type="string" def="'Resources'" />
      <Prop name="links" type="{ label: string; content?; onPress? }[]" />
    </Props>
    <S title="Rules">
      <Rl>Each link can have content that opens in a FullSheet, or a custom onPress.</Rl>
      <Rl>Uses fgFaint header (external content, not tutor-generated).</Rl>
    </S>
    <FullSheet visible={!!sheetOpen} onClose={() => setSheetOpen(null)} title={sheetOpen || ''}>
      <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fgFaint, textAlign: 'center', marginTop: sp[5] }}>Content will appear here</Text>
    </FullSheet>
  </>;
}

export function LeaderboardPage() {
  return <>
    <Import>{"import { Leaderboard } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="entries" type="{ initials: string; name: string; score: number; isCurrent?: boolean }[]" />
      <Prop name="label" type="string" def="'Rank'" />
      <Prop name="unit" type="string" def="'jugs'" />
    </Props>
    <S title="Crew leaderboard">
      <Leaderboard entries={[
        { initials: 'S', name: 'Sarah Al-Rashid', score: 18, avatarColor: 'noon' as any },
        { initials: 'F', name: 'Farida M.', score: 14 },
        { initials: 'A', name: 'Ahmed R.', score: 12, isCurrent: true },
        { initials: 'O', name: 'Omar K.', score: 8 },
        { initials: 'N', name: 'Noor H.', score: 6 },
      ]} />
    </S>
    <S title="Rules">
      <Rl>Top 3 highlighted with gold/chalk rank colours.</Rl>
      <Rl>Current user row gets selectedOverlay background.</Rl>
      <Rl>#1 uses noon avatar color to stand out.</Rl>
      <Rl>Score displayed in mono, right-aligned.</Rl>
    </S>
  </>;
}

// ═══════════════════════════════════════════════
// EXPERIMENTAL
// ═══════════════════════════════════════════════

export function OasisPage() {
  const [level, setLevel] = useState('50');
  const [status, setStatus] = useState('current');
  const [size, setSize] = useState('lg');
  const [lbl, setLbl] = useState('');
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="level" value={level} options={['0', '25', '35', '50', '75', '90', '100']} onChange={setLevel} />
        <KnobSelect label="status" value={status} options={['complete', 'strong', 'weak', 'current', 'upcoming', 'locked']} onChange={setStatus} />
        <KnobSelect label="size" value={size} options={['sm', 'md', 'lg', 'xl']} onChange={setSize} />
        <KnobText label="label (blank = auto %)" value={lbl} onChange={setLbl} />
      </>}
    >
      <Oasis level={parseInt(level)} status={status as any} label={lbl || undefined} size={size as any} meta="Algebra II" />
    </Playground>
    <Import>{"import { Oasis } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="level" type="number" desc="Water fill 0–100. Water rises from bottom of the diamond." />
      <Prop name="status" type="'complete' | 'strong' | 'weak' | 'current' | 'upcoming' | 'locked'" def="'upcoming'" desc="Border colour: green (complete/strong), terra (weak), gold (current), grey (upcoming), faint (locked)." />
      <Prop name="label" type="string" desc="Text inside the diamond. Auto-generates percentage from level if omitted." />
      <Prop name="size" type="'sm' | 'md' | 'lg' | 'xl'" def="'md'" desc="sm=28, md=40, lg=56, xl=72" />
      <Prop name="meta" type="string" desc="Caption text below the diamond." />
    </Props>
    <S title="All statuses">
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: sp[5], alignItems: 'flex-end' }}>
        <Oasis level={95} status="complete" size="md" meta="Passed" />
        <Oasis level={82} status="strong" size="md" meta="Strong" />
        <Oasis level={45} status="weak" size="md" meta="Weak" />
        <Oasis level={35} status="current" size="lg" meta="Current" />
        <Oasis level={0} status="upcoming" size="md" meta="Upcoming" />
        <Oasis level={0} status="locked" size="sm" meta="Locked" />
      </View>
    </S>
    <S title="Sizes">
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: sp[5], alignItems: 'flex-end' }}>
        <Oasis level={60} status="current" size="sm" meta="sm" />
        <Oasis level={60} status="current" size="md" meta="md" />
        <Oasis level={60} status="current" size="lg" meta="lg" />
        <Oasis level={60} status="current" size="xl" meta="xl" />
      </View>
    </S>
    <S title="Water levels">
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: sp[4], alignItems: 'flex-end' }}>
        {[0, 25, 50, 75, 100].map(l => (
          <Oasis key={l} level={l} status="strong" size="md" meta={`${l}%`} />
        ))}
      </View>
    </S>
    <S title="Custom labels">
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: sp[5], alignItems: 'flex-end' }}>
        <Oasis level={0} status="upcoming" label="—" size="md" meta="Empty" />
        <Oasis level={58} status="weak" label="58%" size="lg" meta="Exam score" />
        <Oasis level={100} status="complete" label="A+" size="lg" meta="Perfect" />
      </View>
    </S>
    <S title="Usage">
      <Rl>Use Oasis for major milestones — exam checkpoints, end-of-course goals.</Rl>
      <Rl>Use WaypointMarker (small diamond) for topic-level status indicators.</Rl>
      <Rl>Border colour signals status: green = passed, orange = weak, gold = active, grey = future.</Rl>
      <Rl>Water level is independent of status — it represents readiness or score.</Rl>
      <Rl>Label auto-generates from level (e.g. "50%") if not provided. Pass "—" for empty.</Rl>
    </S>
  </>;
}

function DynamicFullscreen({ children, controls }: { children: (w: number, h: number) => React.ReactNode; controls: React.ReactNode }) {
  const { theme } = useTheme();
  const { width: W, height: H } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  return <>
    <Button variant="primary" onPress={() => setOpen(true)}>Launch fullscreen</Button>
    <Modal visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
      <View style={{ flex: 1, backgroundColor: color.void[300] }}>
        {children(W, H)}
        <View style={{ position: 'absolute', bottom: Math.max(insets.bottom, sp[5]), left: sp[5], padding: sp[4], backgroundColor: theme.bgOverlay, borderRadius: r[2], borderWidth: 1, borderColor: theme.border, minWidth: 220 }}>
          {controls}
        </View>
        <View style={{ position: 'absolute', top: Math.max(insets.top, sp[5]), right: sp[5] }}>
          <IconButton variant="default" size="sm" onPress={() => setOpen(false)} accessibilityLabel="Close">
            <Icon name="close" size={16} color={theme.fgMuted} />
          </IconButton>
        </View>
      </View>
    </Modal>
  </>;
}

export function DuneDynamicPage() {
  const { theme } = useTheme();
  const [layers, setLayers] = useState(8);
  const [wind, setWind] = useState(3);
  const [densityD, setDensityD] = useState(1);
  const [shimmer, setShimmer] = useState(0.65);
  const [contrastD, setContrastD] = useState(1.6);
  return <>
    <Playground knobs={<></>}>
      <DynamicFullscreen
        controls={<>
          <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgSubtle, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: sp[3], paddingBottom: sp[2], borderBottomWidth: 1, borderBottomColor: theme.divider }}>Atmosphere</Text>
          <KnobSlider label="Layers" value={layers} min={3} max={10} step={1} onChange={setLayers} />
          <KnobSlider label="Wind" value={wind} min={0} max={3} step={0.05} onChange={setWind} />
          <KnobSlider label="Density" value={densityD} min={0.4} max={1.6} step={0.05} onChange={setDensityD} />
          <KnobSlider label="Shimmer" value={shimmer} min={0} max={3} step={0.05} onChange={setShimmer} />
          <KnobSlider label="Contrast" value={contrastD} min={0.4} max={1.8} step={0.05} onChange={setContrastD} />
        </>}
      >{(w, h) => <DuneDynamic width={w} height={h} layers={Math.round(layers)} wind={wind} density={densityD} shimmer={shimmer} contrast={contrastD} />}</DynamicFullscreen>
    </Playground>
    <View style={{ padding: sp[4], borderRadius: r[2], backgroundColor: 'rgba(224,184,58,0.06)', borderWidth: 1, borderColor: 'rgba(224,184,58,0.25)', marginBottom: sp[4] }}>
      <Text style={{ fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: color.gold[300], textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: sp[1] }}>Web Preview</Text>
      <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5 }}>Fullscreen uses HTML Canvas. Native production uses @shopify/react-native-skia. Same math, same output.</Text>
    </View>
    <Import>{"import { DuneDynamic } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="width" type="number" />
      <Prop name="height" type="number" />
      <Prop name="layers" type="number" def="4" desc="Dune ridges back to front" />
      <Prop name="wind" type="number" def="3" desc="Drift intensity" />
      <Prop name="density" type="number" def="1" desc="Particle density multiplier" />
      <Prop name="shimmer" type="number" def="1" desc="Perpendicular wobble" />
      <Prop name="contrast" type="number" def="1" desc="Atmospheric depth bias" />
    </Props>
    <S title="What it is">
      <Rl>Animated particle dune field — thousands of stippled chalk grains forming layered desert ridges.</Rl>
      <Rl>Each particle drifts on its own clock. Ridge shapes from 3 sine harmonics. Density profile creates shadow under ridges, lit face mid-way, deep valley at base.</Rl>
    </S>
    <S title="Brand meaning">
      <Rl>The desert expanse — vast, patient, shaped by forces larger than you. Learning is the same: knowledge accumulates grain by grain, shaped by practice over time.</Rl>
      <Rl>Wind and sand form natural structures without instruction. Dunes are self-organising complexity — like the patterns that emerge when a student masters enough connected concepts.</Rl>
      <Rl>The stippled particles represent individual moments of practice. Alone they're tiny. Together they form something unmistakable.</Rl>
    </S>
    <S title="Performance">
      <Rl>Phone (390×844): 4 layers, density 1 → ~8k particles. Smooth on most devices.</Rl>
      <Rl>Tablet (1024×768): 5 layers, density 1 → ~15k particles. Fine.</Rl>
      <Rl>Desktop (1920×1080): 6–8 layers, density 1 → ~30k particles. Smooth.</Rl>
      <Rl>If frame rate drops, reduce layers first, then density. Fall back to static DunePattern (SVG) on low-end devices.</Rl>
    </S>
    <S title="Pairing">
      <Rl>Dunes = the ground. Stars = the sky. Terrain = the map between them.</Rl>
      <Rl>Use dunes where the feeling should be grounded, warm, expansive — the journey itself.</Rl>
      <Rl>Fall back to static DunePattern (SVG) where animation isn't appropriate or performant.</Rl>
    </S>
  </>;
}

export function StarsDynamicPage() {
  const { theme } = useTheme();
  const [densityS, setDensityS] = useState(1);
  const [twinkle, setTwinkle] = useState(1);
  const [haloS, setHaloS] = useState(1);
  const [linesS, setLinesS] = useState(1);
  return <>
    <Playground knobs={<></>}>
      <DynamicFullscreen
        controls={<>
          <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgSubtle, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: sp[3], paddingBottom: sp[2], borderBottomWidth: 1, borderBottomColor: theme.divider }}>Sky</Text>
          <KnobSlider label="Density" value={densityS} min={0.4} max={2} step={0.05} onChange={setDensityS} />
          <KnobSlider label="Twinkle" value={twinkle} min={0} max={2} step={0.05} onChange={setTwinkle} />
          <KnobSlider label="Halo" value={haloS} min={0} max={2} step={0.05} onChange={setHaloS} />
          <KnobSlider label="Lines" value={linesS} min={0} max={2} step={0.05} onChange={setLinesS} />
        </>}
      >{(w, h) => <StarsDynamic width={w} height={h} density={densityS} twinkle={twinkle} halo={haloS} lines={linesS} />}</DynamicFullscreen>
    </Playground>
    <View style={{ padding: sp[4], borderRadius: r[2], backgroundColor: 'rgba(224,184,58,0.06)', borderWidth: 1, borderColor: 'rgba(224,184,58,0.25)', marginBottom: sp[4] }}>
      <Text style={{ fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: color.gold[300], textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: sp[1] }}>Web Preview</Text>
      <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5 }}>Fullscreen uses HTML Canvas. Native production uses @shopify/react-native-skia. Same math, same output.</Text>
    </View>
    <Import>{"import { StarsDynamic } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="width" type="number" />
      <Prop name="height" type="number" />
      <Prop name="density" type="number" def="1" />
      <Prop name="twinkle" type="number" def="1" desc="Radius twinkle intensity" />
      <Prop name="halo" type="number" def="1" desc="Glow halos + diffraction spikes" />
      <Prop name="lines" type="number" def="1" desc="Constellation connection lines" />
    </Props>
    <S title="What it is">
      <Rl>Animated starfield with procedural constellations. Power-law magnitude distribution. Brightest stars get diffraction spikes and radial halos.</Rl>
      <Rl>Constellations via MST on regional brightest stars. Tapered gradient lines fade at endpoints.</Rl>
    </S>
    <S title="Brand meaning">
      <Rl>Connected learning — the constellation lines represent neural pathways forming between concepts. Stars are individual ideas. Lines are the connections your brain builds when you study.</Rl>
      <Rl>No fixed constellations — every regeneration creates new groupings. Like learning itself: the connections you make are unique to you, not prescribed.</Rl>
      <Rl>Brighter stars are anchor concepts. Fainter ones are supporting details. The brightest get halos — mastery glows.</Rl>
    </S>
    <S title="Performance">
      <Rl>Phone: density 0.6–0.8 → ~2k stars. Twinkle is cheap (radius only, no regen).</Rl>
      <Rl>Tablet: density 1 → ~4k stars. Halos and spikes are the expensive passes — reduce halo first.</Rl>
      <Rl>Desktop: density 1–1.5. No issues.</Rl>
      <Rl>Fall back to static ConstellationPattern (SVG) on low-end devices.</Rl>
    </S>
    <S title="Pairing">
      <Rl>Stars = the sky, aspiration, what you're reaching for. Dunes = the ground beneath you.</Rl>
      <Rl>Use stars where the feeling should be expansive, aspirational, cerebral — the destination, not the journey.</Rl>
      <Rl>Fall back to static ConstellationPattern (SVG) where animation isn't appropriate.</Rl>
    </S>
  </>;
}

export function TerrainDynamicPage() {
  const { theme } = useTheme();
  const [scaleT, setScaleT] = useState(1.5);
  const [detailT, setDetailT] = useState(1.55);
  const [reliefT, setReliefT] = useState(1.2);
  const [contrastT, setContrastT] = useState(0.7);
  const [tiltT, setTiltT] = useState(0.22);
  const [routeT, setRouteT] = useState(true);
  return <>
    <Playground knobs={<></>}>
      <DynamicFullscreen
        controls={<>
          <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgSubtle, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: sp[3], paddingBottom: sp[2], borderBottomWidth: 1, borderBottomColor: theme.divider }}>Survey</Text>
          <KnobSlider label="Scale" value={scaleT} min={0.2} max={1.5} step={0.02} onChange={setScaleT} />
          <KnobSlider label="Detail" value={detailT} min={0.5} max={2} step={0.05} onChange={setDetailT} />
          <KnobSlider label="Relief" value={reliefT} min={0.4} max={1.8} step={0.05} onChange={setReliefT} />
          <KnobSlider label="Contrast" value={contrastT} min={0.4} max={2} step={0.05} onChange={setContrastT} />
          <KnobSlider label="Tilt" value={tiltT} min={0} max={0.7} step={0.02} onChange={setTiltT} />
          <KnobToggle label="Route" value={routeT} onChange={setRouteT} />
        </>}
      >{(w, h) => <TerrainDynamic width={w} height={h} scale={scaleT} detail={detailT} relief={reliefT} contrast={contrastT} tilt={tiltT} showRoute={routeT} />}</DynamicFullscreen>
    </Playground>
    <View style={{ padding: sp[4], borderRadius: r[2], backgroundColor: 'rgba(224,184,58,0.06)', borderWidth: 1, borderColor: 'rgba(224,184,58,0.25)', marginBottom: sp[4] }}>
      <Text style={{ fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: color.gold[300], textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: sp[1] }}>Web Preview</Text>
      <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5 }}>Fullscreen uses HTML Canvas. Native production uses @shopify/react-native-skia. Same math, same output.</Text>
    </View>
    <Import>{"import { TerrainDynamic } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="width" type="number" />
      <Prop name="height" type="number" />
      <Prop name="scale" type="number" def="0.7" desc="Heightmap spatial frequency" />
      <Prop name="detail" type="number" def="1" desc="Contour density" />
      <Prop name="relief" type="number" def="1" desc="Heightmap amplitude" />
      <Prop name="contrast" type="number" def="1" desc="Major/minor alpha contrast" />
      <Prop name="tilt" type="number" def="0" desc="Oblique projection (0=top-down, 0.7=max)" />
    </Props>
    <S title="What it is">
      <Rl>Topographic contour map via marching squares on a sine-noise heightmap. Major contours every 5th are bolder. Elevation-based alpha.</Rl>
      <Rl>Optional tilt for oblique projection with per-contour elevation lift.</Rl>
    </S>
    <S title="Brand meaning">
      <Rl>The route through difficulty — contour lines crowd where the terrain is steep, spread where it's easy. Density IS difficulty. A student sees at a glance where the hard parts are.</Rl>
      <Rl>The route overlay traces the path of least resistance through valleys — the proven route a tutor would recommend. Not the shortest path, the smartest one.</Rl>
      <Rl>Major contours (every 5th, bolder) are milestones. Minor contours are the incremental steps between them. Progress is visible in the spacing.</Rl>
    </S>
    <S title="Performance">
      <Rl>Terrain uses marching squares on a grid — cost scales with canvas area ÷ grid size (11px cells).</Rl>
      <Rl>Phone: detail 0.8, scale 0.7 → ~30 contours, ~5k segments. Smooth.</Rl>
      <Rl>Desktop: detail 1.5, scale 1.5 → ~60 contours. Fine.</Rl>
      <Rl>Tilt adds per-contour projection — marginally more expensive but negligible.</Rl>
      <Rl>Fall back to static TerrainPattern (SVG) on low-end devices.</Rl>
    </S>
    <S title="Pairing">
      <Rl>Terrain = the map. Dunes = the land. Stars = the sky. Terrain sits between them — the notation layer.</Rl>
      <Rl>Use terrain where the feeling should be navigational, structured, purposeful — you know where you're going.</Rl>
      <Rl>Fall back to static TerrainPattern (SVG) where animation isn't appropriate.</Rl>
    </S>
  </>;
}

export function RouteMapPage({ onClose }: { onClose?: () => void }) {
  const { theme } = useTheme();
  const { width: SCREEN_W } = useWindowDimensions();
  const CANVAS_W = Math.min(SCREEN_W, 480);

  const sampleChapters: RouteChapter[] = [
    { id: 'ch8', label: '8', title: 'Mock & Review', eyebrow: 'Chapter 8 · in 7 weeks', status: 'locked', level: 0, markers: [
      { id: 'mock', label: 'Full mock paper', sublabel: 'Locked', status: 'unmapped' },
      { id: 'weakreview', label: 'Weak-area review', sublabel: 'Locked', status: 'unmapped' },
    ]},
    { id: 'ch7', label: '7', title: 'Probability & Combinatorics', eyebrow: 'Chapter 7 · in 5 weeks', status: 'upcoming', level: 0, markers: [
      { id: 'counting', label: 'Counting principles', status: 'unmapped' },
      { id: 'perms', label: 'Permutations', status: 'unmapped' },
      { id: 'prob', label: 'Probability basics', status: 'unmapped' },
    ]},
    { id: 'ch6', label: '6', title: 'Statistics & Data', eyebrow: 'Chapter 6 · in 3 weeks', status: 'upcoming', level: 0, markers: [
      { id: 'mmm', label: 'Mean, median, mode', status: 'unmapped' },
      { id: 'tables', label: 'Reading data tables', status: 'unmapped' },
      { id: 'stddev', label: 'Standard deviation', status: 'unmapped' },
    ]},
    { id: 'ch5', label: '5', title: 'Geometry & Measurement', eyebrow: 'You are here · in 9 days', status: 'current', level: 35, markers: [
      { id: 'triangles', label: 'Triangles & angles', sublabel: 'Last practiced today', status: 'exploring' },
      { id: 'area', label: 'Area & perimeter', sublabel: 'Started', status: 'exploring' },
      { id: 'volume', label: 'Volume & surface', status: 'exploring' },
      { id: 'coord', label: 'Coordinate geometry', status: 'not-started' },
    ]},
    { id: 'ch4', label: '4', title: 'Algebra II', eyebrow: 'Exam · 11 days ago', status: 'weak', level: 58, markers: [
      { id: 'linear', label: 'Linear equations', status: 'mapped' },
      { id: 'quadratic', label: 'Quadratic equations', sublabel: 'Still uncertain', status: 'needs-attention' },
      { id: 'inequalities', label: 'Inequalities', status: 'mapped' },
      { id: 'functions', label: 'Functions', sublabel: 'Still uncertain', status: 'needs-attention' },
    ]},
    { id: 'ch3', label: '3', title: 'Algebra I', eyebrow: 'Exam · 25 days ago', status: 'strong', level: 91, markers: [
      { id: 'variables', label: 'Variables & expressions', status: 'mapped' },
      { id: 'solving', label: 'Solving equations', status: 'mapped' },
      { id: 'words', label: 'Word problems', status: 'mapped' },
    ]},
    { id: 'ch2', label: '2', title: 'Ratios & Proportions', eyebrow: 'Exam · 39 days ago', status: 'strong', level: 95, markers: [
      { id: 'ratios', label: 'Ratios', status: 'mapped' },
      { id: 'percent', label: 'Percentages', status: 'mapped' },
      { id: 'rates', label: 'Rates', status: 'mapped' },
    ]},
    { id: 'ch1', label: '1', title: 'Number Sense', eyebrow: 'Exam · 53 days ago', status: 'complete', level: 95, markers: [
      { id: 'integers', label: 'Integers & fractions', status: 'mapped' },
      { id: 'decimals', label: 'Decimals', status: 'mapped' },
      { id: 'order', label: 'Order of operations', status: 'mapped' },
    ]},
  ];

  // Concept data per topic
  const concepts: Record<string, { name: string; state: string; from?: string }[]> = {
    triangles: [{ name: 'Triangle types', state: 'mapped' }, { name: 'Angle sum theorem', state: 'exploring' }, { name: 'Similar triangles', state: 'exploring' }, { name: 'Pythagorean theorem', state: 'unmapped' }],
    area: [{ name: 'Area of polygons', state: 'mapped' }, { name: 'Area of circles', state: 'needs-attention' }, { name: 'Composite shapes', state: 'needs-attention' }, { name: 'Perimeter from coordinates', state: 'needs-attention', from: 'Coordinate geometry' }],
    volume: [{ name: 'Volume of prisms', state: 'exploring' }, { name: 'Volume of cylinders & cones', state: 'exploring' }, { name: 'Surface area', state: 'unmapped' }],
    coord: [{ name: 'Plotting points', state: 'unmapped' }, { name: 'Distance formula', state: 'unmapped', from: 'Also in Algebra II' }, { name: 'Slope of a line', state: 'unmapped' }, { name: 'Perimeter from coords', state: 'unmapped', from: 'Area & perimeter' }],
    linear: [{ name: 'Slope-intercept form', state: 'mapped' }, { name: 'Solving linear eqs', state: 'mapped' }, { name: 'Graphing lines', state: 'mapped', from: 'Also in Functions' }],
    quadratic: [{ name: 'Solving by factoring', state: 'mapped' }, { name: 'Quadratic formula', state: 'needs-attention' }, { name: 'Discriminant', state: 'needs-attention' }, { name: 'Distance formula', state: 'needs-attention', from: 'Also in ch 5' }],
    inequalities: [{ name: 'Linear inequalities', state: 'mapped' }, { name: 'Compound inequalities', state: 'mapped' }, { name: 'Absolute value', state: 'mapped' }],
    functions: [{ name: 'Function notation', state: 'mapped' }, { name: 'Domain & range', state: 'needs-attention' }, { name: 'Graphing functions', state: 'needs-attention', from: 'Also in Algebra I' }],
    variables: [{ name: 'Expressions', state: 'mapped' }, { name: 'Substitution', state: 'mapped' }],
    solving: [{ name: 'One-step equations', state: 'mapped' }, { name: 'Multi-step equations', state: 'mapped' }],
    words: [{ name: 'Translate to algebra', state: 'mapped' }, { name: 'Multi-step problems', state: 'mapped' }],
    ratios: [{ name: 'Simplifying ratios', state: 'mapped' }, { name: 'Proportional reasoning', state: 'mapped' }],
    percent: [{ name: 'Percentage of', state: 'mapped' }, { name: 'Percentage change', state: 'mapped' }],
    rates: [{ name: 'Unit rates', state: 'mapped' }, { name: 'Speed/distance/time', state: 'mapped' }],
    integers: [{ name: 'Integer operations', state: 'mapped' }, { name: 'Fraction operations', state: 'mapped' }],
    decimals: [{ name: 'Decimal arithmetic', state: 'mapped' }, { name: 'Rounding', state: 'mapped' }],
    order: [{ name: 'BODMAS/PEMDAS', state: 'mapped' }, { name: 'Nested expressions', state: 'mapped' }],
  };

  const scrollRef = React.useRef<ScrollView>(null);
  const didScroll = React.useRef(false);
  const [stream, setStream] = useState(0);
  const [sheetChapter, setSheetChapter] = useState<RouteChapter | null>(null);
  const [sheetMarker, setSheetMarker] = useState<{ marker: RouteMarker; chapter: RouteChapter } | null>(null);
  const [showKey, setShowKey] = useState(false);
  const examDates = ['23 Shaban · 14 Mar', '15 Ramadan · 28 Mar'];
  const examNames = ['Kammi', 'Lafthi'];
  const examDays = [49, 63];
  const MAX_W = 480;

  const mColor = (s: string) => s === 'mapped' ? color.noon[400] : s === 'exploring' ? color.gold[300] : s === 'needs-attention' ? color.terra[300] : 'rgba(232,228,220,0.35)';
  const mBg = (s: string) => s === 'mapped' ? color.noon[400] : s === 'needs-attention' ? 'rgba(212,149,110,0.18)' : 'transparent';
  const mLabel = (s: string) => s === 'mapped' ? 'Mastered' : s === 'exploring' ? 'Exploring' : s === 'not-started' ? 'Not started' : s === 'needs-attention' ? 'Still uncertain' : 'Not started';

  // Estimate total content height for SVG background
  const SUNRISE_H = 300;
  const ROUTE_H = sampleChapters.reduce((h, ch) => h + 130 + ch.markers.length * 52 + 40, 0);
  const HOME_H = 240;
  const TOTAL_H = SUNRISE_H + ROUTE_H + HOME_H;
  const W = SCREEN_W;

  return (
    <View style={{ flex: 1, backgroundColor: color.void[400] }}>
      {/* ── Fixed header bar ── */}
      <View style={{
        position: 'relative', zIndex: 50, backgroundColor: color.void[400],
        paddingHorizontal: sp[4], paddingVertical: sp[3],
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        borderBottomWidth: 1, borderBottomColor: theme.border,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[2] }}>
          <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: color.gold[300], shadowColor: color.gold[300], shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 8 }} />
          <View>
            <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgFaint, letterSpacing: 1.6, textTransform: 'uppercase' }}>Final Exam</Text>
            <Text style={{ fontFamily: font.serif, fontSize: fs[16], fontWeight: fw[500], color: theme.fg }}>{examNames[stream]} Assessment</Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontFamily: font.serif, fontSize: fs[22], fontWeight: fw[500], color: color.gold[300] }}>{examDays[stream]}</Text>
          <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgFaint, letterSpacing: 1.4, textTransform: 'uppercase', marginTop: 2 }}>days</Text>
        </View>
      </View>

      {/* ── Stream tabs ── */}
      <View style={{ position: 'relative', zIndex: 40, paddingHorizontal: sp[4], paddingVertical: sp[2] }}>
        <Segmented options={['Kammi', 'Lafthi']} selected={stream} onSelect={setStream} />
      </View>

      <ScrollView ref={scrollRef} style={{ flex: 1 }} onLayout={() => {
        if (!didScroll.current) {
          didScroll.current = true;
          const currentY = SUNRISE_H + sampleChapters.slice(0, 3).reduce((h, ch) => h + 130 + ch.markers.length * 52 + 40, 0);
          setTimeout(() => scrollRef.current?.scrollTo({ y: currentY - 80, animated: false }), 100);
        }
      }}>
        <View style={{ position: 'relative', width: W, minHeight: TOTAL_H }}>

        {/* ── SVG atmosphere ── */}
        <Svg width={W} height={TOTAL_H} style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <Defs>
            {/* Desert journey: warm terra (bottom/city) → dark void (desert night) → hint of green (oasis) */}
            <LinearGradient id="rmSky" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={color.noon[700]} stopOpacity="0.08" />
              <Stop offset="0.06" stopColor={color.void[300]} stopOpacity="1" />
              <Stop offset="0.3" stopColor={color.void[400]} stopOpacity="1" />
              <Stop offset="0.7" stopColor={color.void[400]} stopOpacity="1" />
              <Stop offset="0.88" stopColor={color.void[300]} stopOpacity="1" />
              <Stop offset="0.95" stopColor={color.terra[800]} stopOpacity="0.2" />
              <Stop offset="1" stopColor={color.terra[700]} stopOpacity="0.12" />
            </LinearGradient>
          </Defs>

          <Rect x="0" y="0" width={W} height={TOTAL_H} fill="url(#rmSky)" />

          {/* Stars — concentrated in the middle (desert night), sparse near top/bottom */}
          {Array.from({ length: 60 }, (_, i) => {
            const x = (i * 73 + 17) % W;
            const rawY = (i * 97 + 31) % TOTAL_H;
            const y = TOTAL_H * 0.15 + (rawY % (TOTAL_H * 0.6));
            const distFromCenter = Math.abs(y - TOTAL_H * 0.45) / (TOTAL_H * 0.35);
            const fade = Math.max(0, 1 - distFromCenter);
            const bright = i % 9 === 0;
            return (
              <Circle key={`s${i}`} cx={x} cy={y}
                r={bright ? 1.5 : i % 4 === 0 ? 1 : 0.6}
                fill={color.chalk[100]}
                opacity={(bright ? 0.55 : i % 4 === 0 ? 0.18 : 0.07) * fade} />
            );
          })}

          {/* Vertical flow lines — direction of travel, bottom to top */}
          {[0.15, 0.25, 0.35, 0.5, 0.65, 0.75, 0.85].map((xPct, i) => {
            const x = W * xPct;
            const amp = 8 + (i % 3) * 6;
            const startY = TOTAL_H * 0.9;
            const endY = TOTAL_H * 0.1;
            const pts = 8;
            let d = `M ${x} ${startY}`;
            for (let p = 1; p <= pts; p++) {
              const t = p / pts;
              const py = startY + (endY - startY) * t;
              const sway = Math.sin(t * Math.PI * 2 + i * 1.3) * amp;
              const cpY = startY + (endY - startY) * (t - 0.5 / pts);
              d += ` S ${x + sway} ${cpY}, ${x + sway} ${py}`;
            }
            return (
              <Path key={`vflow${i}`} d={d}
                stroke={color.chalk[100]} strokeWidth={0.5} strokeOpacity={0.04 + (i % 2) * 0.02} fill="none" />
            );
          })}

          {/* Horizontal terrain contours — cross the vertical flow */}
          {[0.25, 0.4, 0.55, 0.7, 0.82].map((t, i) => {
            const y = TOTAL_H * t;
            const amp = 10 + (i % 3) * 6;
            const off = (i % 2) * W * 0.15;
            return (
              <Path key={`hterr${i}`}
                d={`M 0 ${y} Q ${W * 0.25 + off} ${y - amp} ${W * 0.55 + off * 0.5} ${y - amp * 0.3} T ${W} ${y + amp * 0.3}`}
                stroke={color.terra[700]} strokeWidth={0.5} strokeOpacity={0.05 + (i % 2) * 0.03} fill="none" />
            );
          })}

          {/* Grid — lower portion near Riyadh (cartographic feel) */}
          {Array.from({ length: Math.floor(W / 24) + 1 }, (_, i) => (
            <Rect key={`gv${i}`} x={i * 24} y={TOTAL_H * 0.7} width={0.5} height={TOTAL_H * 0.3}
              fill={color.chalk[100]} opacity={0.02} />
          ))}
          {Array.from({ length: Math.floor(TOTAL_H * 0.3 / 24) + 1 }, (_, i) => (
            <Rect key={`gh${i}`} x={0} y={TOTAL_H * 0.7 + i * 24} width={W} height={0.5}
              fill={color.chalk[100]} opacity={0.02} />
          ))}

          {/* Sandy dune fills near base camp */}
          <Path d={`M 0 ${TOTAL_H - 100} Q ${W * 0.3} ${TOTAL_H - 130} ${W * 0.6} ${TOTAL_H - 105} T ${W} ${TOTAL_H - 80} L ${W} ${TOTAL_H} L 0 ${TOTAL_H} Z`}
            fill={color.terra[800]} opacity={0.1} />
          <Path d={`M 0 ${TOTAL_H - 50} Q ${W * 0.45} ${TOTAL_H - 75} ${W * 0.7} ${TOTAL_H - 55} T ${W} ${TOTAL_H - 30} L ${W} ${TOTAL_H} L 0 ${TOTAL_H} Z`}
            fill={color.terra[700]} opacity={0.07} />

          {/* Riyadh skyline — base camp city */}
          <Path d={`M 0 ${TOTAL_H - 8} L 0 ${TOTAL_H - 24} L ${W * 0.05} ${TOTAL_H - 24} L ${W * 0.05} ${TOTAL_H - 34} L ${W * 0.1} ${TOTAL_H - 34} L ${W * 0.1} ${TOTAL_H - 28} L ${W * 0.15} ${TOTAL_H - 28} L ${W * 0.15} ${TOTAL_H - 42} L ${W * 0.18} ${TOTAL_H - 42} L ${W * 0.18} ${TOTAL_H - 50} L ${W * 0.19} ${TOTAL_H - 50} L ${W * 0.19} ${TOTAL_H - 42} L ${W * 0.24} ${TOTAL_H - 42} L ${W * 0.24} ${TOTAL_H - 34} L ${W * 0.3} ${TOTAL_H - 34} L ${W * 0.3} ${TOTAL_H - 48} L ${W * 0.33} ${TOTAL_H - 48} L ${W * 0.33} ${TOTAL_H - 56} L ${W * 0.34} ${TOTAL_H - 56} L ${W * 0.34} ${TOTAL_H - 48} L ${W * 0.39} ${TOTAL_H - 48} L ${W * 0.39} ${TOTAL_H - 34} L ${W * 0.45} ${TOTAL_H - 34} L ${W * 0.45} ${TOTAL_H - 40} L ${W * 0.5} ${TOTAL_H - 40} L ${W * 0.5} ${TOTAL_H - 30} L ${W * 0.55} ${TOTAL_H - 30} L ${W * 0.55} ${TOTAL_H - 44} L ${W * 0.58} ${TOTAL_H - 44} L ${W * 0.58} ${TOTAL_H - 52} L ${W * 0.59} ${TOTAL_H - 52} L ${W * 0.59} ${TOTAL_H - 44} L ${W * 0.64} ${TOTAL_H - 44} L ${W * 0.64} ${TOTAL_H - 34} L ${W * 0.7} ${TOTAL_H - 34} L ${W * 0.7} ${TOTAL_H - 28} L ${W * 0.76} ${TOTAL_H - 28} L ${W * 0.76} ${TOTAL_H - 34} L ${W * 0.82} ${TOTAL_H - 34} L ${W * 0.82} ${TOTAL_H - 28} L ${W * 0.88} ${TOTAL_H - 28} L ${W * 0.88} ${TOTAL_H - 24} L ${W * 0.94} ${TOTAL_H - 24} L ${W * 0.94} ${TOTAL_H - 20} L ${W} ${TOTAL_H - 20} L ${W} ${TOTAL_H} L 0 ${TOTAL_H} Z`}
            fill={color.chalk[100]} opacity={0.1} />
        </Svg>

        {/* ── Terrain contour lines — visible topographic texture ── */}
        <View style={{ position: 'absolute', top: TOTAL_H * 0.15, left: 0, right: 0, height: TOTAL_H * 0.7 }} pointerEvents="none">
          <TerrainPattern width={W} height={TOTAL_H * 0.7} variant="standard" opacity={0.3} />
        </View>

        {/* ── All content constrained to MAX_W ── */}
        <View style={{ maxWidth: MAX_W, width: '100%', alignSelf: 'center' }}>

          {/* ── The Oasis — destination ── */}
          {(() => {
            const allMarkers = sampleChapters.flatMap(ch => ch.markers);
            const mapped = allMarkers.filter(m => m.status === 'mapped').length;
            const total = allMarkers.length;
            const oasisLevel = Math.round((mapped / total) * 100);
            const ow = Math.min(W, MAX_W);
            return (
              <View style={{ paddingTop: sp[8], paddingBottom: sp[6] }}>
                <Pressable onPress={() => {}} style={{ alignItems: 'center' }}>
                  <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgFaint, letterSpacing: 1.6, textTransform: 'uppercase' }}>{examNames[stream]} Assessment · {examDays[stream]} days</Text>

                  {/* Large diamond matching exam checkpoints — but this is THE exam */}
                  <View style={{ marginTop: sp[5], alignItems: 'center' }}>
                    <View style={{
                      width: 72, height: 72,
                      transform: [{ rotate: '45deg' }],
                      borderWidth: 2, borderColor: color.noon[400],
                      borderStyle: 'dashed',
                      backgroundColor: color.void[300],
                      overflow: 'hidden',
                      shadowColor: color.noon[400],
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.15,
                      shadowRadius: 12,
                    }}>
                      {/* Water fill — bottom to top */}
                      <View style={{
                        position: 'absolute', top: -(72 * 0.25), left: -(72 * 0.25),
                        width: 72 * 1.5, height: 72 * 1.5,
                        transform: [{ rotate: '-45deg' }], justifyContent: 'flex-end',
                      }}>
                        <View style={{ height: `${oasisLevel}%`, backgroundColor: color.blue[400], opacity: 0.3 }} />
                      </View>
                      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ transform: [{ rotate: '-45deg' }], fontFamily: font.mono, fontSize: fs[14], fontWeight: fw[600], color: color.noon[400] }}>{oasisLevel}%</Text>
                      </View>
                    </View>
                  </View>

                  <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fg, marginTop: sp[4], textAlign: 'center', paddingHorizontal: sp[4] }}>
                    <Text style={{ color: color.noon[400], fontWeight: fw[600] }}>{mapped}</Text> of {total} topics mastered
                  </Text>
                  <Text style={{ fontFamily: font.sans, fontSize: fs[12], color: theme.fgSubtle, marginTop: sp[1], textAlign: 'center' }}>Each one fills your oasis. Master them all to be ready.</Text>
                </Pressable>
              </View>
            );
          })()}

          {/* ── Route Map ── */}
          <RouteMap
            chapters={sampleChapters}
            currentChapter="ch5"
            onChapterPress={setSheetChapter}
            onMarkerPress={(marker, chapter) => setSheetMarker({ marker, chapter })}
          />

          {/* ── Riyadh / Base Camp ── */}
          <View style={{ paddingTop: sp[10], paddingBottom: sp[12], alignItems: 'center' }}>
            <View style={{ width: '60%', height: 1, marginBottom: sp[6] }}>
              <View style={{ flex: 1, backgroundColor: theme.borderStrong }} />
            </View>
            <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: color.terra[400], letterSpacing: 2, textTransform: 'uppercase' }}>Base Camp</Text>
            <Text style={{ fontFamily: font.serif, fontSize: fs[22], fontWeight: fw[500], color: theme.fg, marginTop: sp[1] }}>Riyadh</Text>
            <Text style={{ fontFamily: font.sans, fontSize: fs[12], fontStyle: 'italic', color: theme.fgSubtle, marginTop: sp[2] }}>Where you began · Sept 2025</Text>
          </View>

        </View>
        </View>
      </ScrollView>

      {/* ── Floating action buttons ── */}
      <View style={{ position: 'absolute', bottom: sp[5], right: sp[4], gap: sp[2], zIndex: 10 }}>
        <Pressable
          onPress={() => {
            const currentY = SUNRISE_H + sampleChapters.slice(0, 3).reduce((h, ch) => h + 130 + ch.markers.length * 52 + 40, 0);
            scrollRef.current?.scrollTo({ y: currentY - 80, animated: true });
          }}
          style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: theme.bgOverlay, borderWidth: 1, borderColor: theme.border, alignItems: 'center', justifyContent: 'center' }}
        >
          {/* Location pin icon */}
          <Svg width={18} height={18} viewBox="0 0 24 24">
            <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" fill={color.gold[400]} /></Svg>
        </Pressable>
        <Pressable
          onPress={() => setShowKey(true)}
          style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: theme.bgOverlay, borderWidth: 1, borderColor: theme.border, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontFamily: font.mono, fontSize: fs[13], fontWeight: fw[700], color: theme.fgMuted }}>?</Text>
        </Pressable>
      </View>

      {/* ── Key sheet ── */}
      <BottomSheet visible={showKey} onClose={() => setShowKey(false)} title="Key">
        <View style={{ gap: sp[5] }}>
          <View style={{ gap: sp[2] }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: theme.fgFaint, textTransform: 'uppercase', letterSpacing: 1 }}>The route</Text>
            <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5 }}>A proven path from base camp to sunrise. The green line marks where you've been. The faint line shows what's ahead.</Text>
          </View>
          <View style={{ gap: sp[2] }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: theme.fgFaint, textTransform: 'uppercase', letterSpacing: 1 }}>Exam diamonds</Text>
            <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5 }}>Chapter checkpoints. Water level shows your exam result.</Text>
          </View>
          <View style={{ gap: sp[3] }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: theme.fgFaint, textTransform: 'uppercase', letterSpacing: 1 }}>Topic markers</Text>
            {[
              { label: 'Mastered', desc: 'You\'ve got this. Adds water to the oasis.', col: color.noon[400], fill: true },
              { label: 'Exploring', desc: 'Currently working through this topic.', col: color.gold[300], fill: false },
              { label: 'Still uncertain', desc: 'Exam passed but concepts here remain weak.', col: color.terra[300], fill: false },
              { label: 'Unmapped', desc: 'Not visited yet.', col: theme.fgFaint, fill: false, dashed: true },
            ].map(item => (
              <View key={item.label} style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3] }}>
                <View style={{ width: 12, height: 12, transform: [{ rotate: '45deg' }], borderWidth: 1.5, borderColor: item.col, borderStyle: item.dashed ? 'dashed' : 'solid', backgroundColor: item.fill ? item.col : 'transparent' }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fg }}>{item.label}</Text>
                  <Text style={{ fontFamily: font.sans, fontSize: fs[11], color: theme.fgMuted, marginTop: 1 }}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </BottomSheet>

      {/* ── Chapter sheet ── */}
      <BottomSheet visible={!!sheetChapter} onClose={() => setSheetChapter(null)} title={sheetChapter?.title || ''}>
        {sheetChapter && (() => {
          const ch = sheetChapter;
          const lvl = Math.max(0, Math.min(100, ch.level));
          const mapped = ch.markers.filter(m => m.status === 'mapped').length;
          const attention = ch.markers.filter(m => m.status === 'needs-attention').length;
          const exploring = ch.markers.filter(m => m.status === 'exploring').length;
          const unmapped = ch.markers.filter(m => m.status === 'unmapped' || m.status === 'not-started').length;
          return (
            <View style={{ gap: sp[4] }}>
              <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, textTransform: 'uppercase', letterSpacing: 1.4 }}>{ch.status === 'current' ? 'In progress' : ch.status === 'upcoming' || ch.status === 'locked' ? 'Upcoming' : 'Completed'}</Text>
              {lvl > 0 && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3] }}>
                  <Text style={{ fontFamily: font.mono, fontSize: fs[24], fontWeight: fw[700], color: theme.fg }}>{lvl}%</Text>
                  <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, flex: 1 }}>Your exam result.</Text>
                </View>
              )}
              {/* Water earned from this chapter */}
              {(() => {
                const chMapped = ch.markers.filter(m => m.status === 'mapped').length;
                const chTotal = ch.markers.length;
                return (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3], padding: sp[3], backgroundColor: 'rgba(100,216,174,0.06)', borderRadius: r[2], borderWidth: 1, borderColor: 'rgba(100,216,174,0.15)' }}>
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: color.blue[400], opacity: 0.7 }} />
                    <Text style={{ fontFamily: font.sans, fontSize: fs[12], color: theme.fgMuted, flex: 1 }}><Text style={{ color: color.noon[400], fontWeight: fw[600] }}>{chMapped}/{chTotal}</Text> topics mapped — water earned for the oasis.</Text>
                  </View>
                );
              })()}
              <View style={{ flexDirection: 'row', gap: sp[2] }}>
                {mapped > 0 && <View style={{ flex: 1, padding: sp[2], backgroundColor: theme.bgRaised, borderRadius: r[1], alignItems: 'center' }}><Text style={{ fontFamily: font.serif, fontSize: fs[18], color: color.noon[400] }}>{mapped}</Text><Text style={{ fontFamily: font.mono, fontSize: fs[8], color: theme.fgFaint, textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 }}>Mapped</Text></View>}
                {exploring > 0 && <View style={{ flex: 1, padding: sp[2], backgroundColor: theme.bgRaised, borderRadius: r[1], alignItems: 'center' }}><Text style={{ fontFamily: font.serif, fontSize: fs[18], color: color.gold[300] }}>{exploring}</Text><Text style={{ fontFamily: font.mono, fontSize: fs[8], color: theme.fgFaint, textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 }}>Exploring</Text></View>}
                {attention > 0 && <View style={{ flex: 1, padding: sp[2], backgroundColor: theme.bgRaised, borderRadius: r[1], alignItems: 'center' }}><Text style={{ fontFamily: font.serif, fontSize: fs[18], color: color.terra[300] }}>{attention}</Text><Text style={{ fontFamily: font.mono, fontSize: fs[8], color: theme.fgFaint, textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 }}>Attention</Text></View>}
                {unmapped > 0 && <View style={{ flex: 1, padding: sp[2], backgroundColor: theme.bgRaised, borderRadius: r[1], alignItems: 'center' }}><Text style={{ fontFamily: font.serif, fontSize: fs[18], color: theme.fgFaint }}>{unmapped}</Text><Text style={{ fontFamily: font.mono, fontSize: fs[8], color: theme.fgFaint, textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 }}>Unmapped</Text></View>}
              </View>
              <View style={{ gap: sp[2] }}>
                <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgFaint, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: sp[1] }}>Topics</Text>
                {ch.markers.map(m => (
                  <View key={m.id} style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3], padding: sp[2], backgroundColor: theme.bgRaised, borderRadius: r[1], borderWidth: 1, borderColor: theme.border }}>
                    <View style={{ width: 10, height: 10, transform: [{ rotate: '45deg' }], borderWidth: 1.2, borderColor: mColor(m.status), backgroundColor: mBg(m.status) }} />
                    <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fg, flex: 1 }}>{m.label}</Text>
                    <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: mColor(m.status), textTransform: 'uppercase', letterSpacing: 0.8 }}>{m.sublabel || mLabel(m.status)}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })()}
      </BottomSheet>

      {/* ── Topic sheet — rich like v4 ── */}
      <BottomSheet visible={!!sheetMarker} onClose={() => setSheetMarker(null)} title={sheetMarker?.marker.label || ''}>
        {sheetMarker && (() => {
          const { marker, chapter } = sheetMarker;
          const mc = mColor(marker.status);
          const s = marker.status;
          const pct = s === 'mapped' ? 100 : s === 'exploring' ? 45 : s === 'needs-attention' ? 25 : 0;
          const currLvl = s === 'mapped' ? 'Mapped' : s === 'exploring' ? 'Exploring' : s === 'needs-attention' ? 'Uncertain' : 'Not started';
          const nextLvl = s === 'mapped' ? 'Stay sharp' : s === 'exploring' ? 'Mapped' : 'Exploring';
          const pctColor = s === 'mapped' ? color.noon[400] : s === 'needs-attention' ? color.terra[400] : color.gold[400];
          const actionBg = s === 'needs-attention' ? 'rgba(212,149,110,0.06)' : s === 'exploring' ? 'rgba(224,184,58,0.06)' : 'rgba(100,216,174,0.06)';
          const actionBorder = s === 'needs-attention' ? 'rgba(212,149,110,0.25)' : s === 'exploring' ? 'rgba(224,184,58,0.25)' : 'rgba(100,216,174,0.25)';
          const actionLabel = s === 'mapped' ? 'Quick refresh' : s === 'exploring' ? 'Continue practice' : s === 'needs-attention' ? 'Strengthen now' : 'Begin';
          const actionDesc = s === 'mapped' ? 'A short refresher keeps it fresh.' : s === 'exploring' ? 'Mixed set covering concepts you\'ve been working on.' : s === 'needs-attention' ? 'Targeted practice on weak concepts — worked examples first.' : 'Start with core ideas, then a few easy questions.';
          return (
            <View style={{ gap: sp[4] }}>
              {/* Status */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[2] }}>
                <View style={{ width: 12, height: 12, transform: [{ rotate: '45deg' }], borderWidth: 1.5, borderColor: mc, backgroundColor: mBg(marker.status) }} />
                <Text style={{ fontFamily: font.mono, fontSize: fs[11], fontWeight: fw[600], color: mc, textTransform: 'uppercase' }}>{marker.sublabel || mLabel(marker.status)}</Text>
              </View>

              {/* Progress bar */}
              <View>
                <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgFaint, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: sp[2] }}>Progress to next level</Text>
                <View style={{ height: 8, backgroundColor: theme.bgSunken, borderRadius: r.pill, overflow: 'hidden' }}>
                  <View style={{ height: '100%', width: `${pct}%`, backgroundColor: pctColor, borderRadius: r.pill }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: sp[1] }}>
                  <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fg }}>{currLvl}</Text>
                  <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: mc }}>{nextLvl} →</Text>
                </View>
              </View>

              {/* Water connection — explicit */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3], padding: sp[3], backgroundColor: s === 'mapped' ? 'rgba(100,216,174,0.06)' : 'rgba(232,228,220,0.03)', borderRadius: r[2], borderWidth: 1, borderColor: s === 'mapped' ? 'rgba(100,216,174,0.2)' : theme.border }}>
                <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: s === 'mapped' ? color.blue[400] : 'transparent', borderWidth: s === 'mapped' ? 0 : 1, borderColor: theme.fgFaint, opacity: s === 'mapped' ? 0.7 : 0.4 }} />
                <Text style={{ fontFamily: font.sans, fontSize: fs[12], color: s === 'mapped' ? color.noon[400] : theme.fgMuted, flex: 1 }}>
                  {s === 'mapped' ? 'Water earned — this topic fills the oasis.' : 'Map this topic to earn water for the oasis.'}
                </Text>
              </View>

              {/* Concepts inside this topic */}
              {concepts[marker.id] && (
                <View>
                  <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: theme.fgFaint, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: sp[2] }}>Concepts inside ({concepts[marker.id].length})</Text>
                  <View style={{ gap: sp[1] }}>
                    {concepts[marker.id].map((c, ci) => (
                      <View key={ci} style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3], paddingVertical: sp[2], paddingHorizontal: sp[3], backgroundColor: theme.bgRaised, borderRadius: r[1], borderWidth: 1, borderColor: theme.border }}>
                        <View style={{ width: 9, height: 9, transform: [{ rotate: '45deg' }], borderWidth: 1.2, borderColor: mColor(c.state as MarkerStatus), backgroundColor: mBg(c.state as MarkerStatus) }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: c.state === 'unmapped' ? theme.fgMuted : theme.fg }}>{c.name}</Text>
                          {c.from && <Text style={{ fontFamily: font.mono, fontSize: fs[8], color: color.iris[400], letterSpacing: 0.8, marginTop: 1 }}>{c.from}</Text>}
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Action card */}
              <View style={{ padding: sp[4], borderRadius: r[2], backgroundColor: actionBg, borderWidth: 1, borderColor: actionBorder }}>
                <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: mc, letterSpacing: 1.8, textTransform: 'uppercase', marginBottom: sp[2] }}>What's next</Text>
                <Text style={{ fontFamily: font.serif, fontSize: fs[16], fontWeight: fw[500], color: theme.fg, marginBottom: sp[1] }}>{actionLabel}</Text>
                <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5 }}>{actionDesc}</Text>
              </View>

              <Button variant="primary" onPress={() => setSheetMarker(null)}>{s === 'mapped' ? 'Quick refresh' : s === 'exploring' ? 'Continue' : s === 'needs-attention' ? 'Strengthen' : 'Begin'}</Button>
            </View>
          );
        })()}
      </BottomSheet>
    </View>
  );
}
