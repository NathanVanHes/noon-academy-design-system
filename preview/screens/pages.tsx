/**
 * Every page for the RN explorer.
 * Mirrors the information architecture of index.html exactly.
 * Each exports a function component: Import → Props → Live examples.
 */
import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Animated, Easing, Image, useWindowDimensions, I18nManager } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {
  useTheme, Button, IconButton, Card, Chip, Avatar, Badge, Alert,
  SessionCard, HomeworkCard, SessionBar, QuizOption, Tooltip,
  Input, Textarea, Switch, Checkbox, Radio, Stepper, Segmented,
  Tabs, BottomNav, BottomAction, TitleBar, FilterBar, Divider, Skeleton, EmptyState, Table,
  LinearProgress, CircularProgress, Toast, Dialog, BottomSheet, FullSheet, Interstitial,
  RadioGroup, CheckboxGroup,
  Icon, iconNames,
  GridPaper, Waypoints, WaypointMarker, WaterVessel, TerrainPattern, DunePattern, VoiceTutor, Calendar,
  Identity, Menu, CardGrid, Leaderboard, VideoCard,
  ChatMessage, TypingIndicator, BreakdownCard, ActivityCard, ResourceList, SlidesCard, WorkedExampleCard,
  Oasis, RouteMap, type RouteChapter, type RouteMarker,
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
        {(anim) => <Animated.View style={{ backgroundColor: theme.accentSoft, borderRadius: r[2], padding: sp[3], borderWidth: 1, borderColor: theme.accentBorder, transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }], opacity: anim }}><Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fg }}>Session saved</Text></Animated.View>}
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

  const iconColor = disabled ? theme.fgFaint : { primary: theme.accentFg, secondary: theme.fg, ghost: theme.fgMuted, danger: color.danger[300], 'danger-solid': color.chalk[100], signal: theme.bg }[variant] || theme.fg;
  const demoIcon = <Icon name="arrow-right" size={14} color={iconColor} />;
  const V: Array<'primary'|'secondary'|'ghost'|'danger'|'danger-solid'|'signal'> = ['primary','secondary','ghost','danger','danger-solid','signal'];
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="Variant" value={variant} options={['primary','secondary','ghost','danger','danger-solid','signal']} onChange={setVariant} />
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
  const [star, setStar] = useState(false);
  const [status, setStatus] = useState('none');
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="Size" value={size} options={['xs','sm','md','lg','xl']} onChange={setSize} />
        <KnobSelect label="Color" value={clr} options={['default','noon','blue']} onChange={setClr} />
        <KnobToggle label="Star" value={star} onChange={setStar} />
        <KnobSelect label="Status" value={status} options={['none','online','busy']} onChange={setStatus} />
      </>}
    >
      <Avatar initials="S" size={size as any} color={clr as any} star={star} status={status === 'none' ? undefined : status as any} />
    </Playground>

    <Import>{"import { Avatar } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="initials" type="string" />
      <Prop name="size" type="'xs' | 'sm' | 'md' | 'lg' | 'xl'" def="'sm'" desc="24 / 32 / 40 / 56 / 72" />
      <Prop name="color" type="'default' | 'noon' | 'blue'" def="'default'" />
      <Prop name="star" type="boolean" desc="Gold diamond indicator" />
      <Prop name="status" type="'online' | 'busy'" />
    </Props>
    <S title="All Sizes"><R><Avatar initials="S" size="xs" /><Avatar initials="S" size="sm" /><Avatar initials="S" size="md" /><Avatar initials="S" size="lg" /><Avatar initials="S" size="xl" /></R></S>
  </>;
}

export function BadgesPage() {
  return <>
    <Import>{"import { Badge } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="children" type="string" desc="Badge text (number or symbol)" />
      <Prop name="variant" type="'default' | 'accent' | 'danger' | 'dot'" def="'default'" />
    </Props>
    <S title="Variants"><R><Badge>3</Badge><Badge variant="accent">12</Badge><Badge variant="danger">!</Badge><Badge variant="dot" /></R></S>
  </>;
}

export function TablePage() {
  return <>
    <Import>{"import { Table } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="columns" type="string[]" />
      <Prop name="rows" type="string[][]" />
    </Props>
    <S title="Default"><Table columns={['Name', 'Score', 'Status']} rows={[['Sarah A.', '92', 'Mastered'], ['Omar K.', '61', 'In progress'], ['Farida M.', '78', 'Close'], ['Ahmed R.', '55', 'Behind']]} /></S>
    <S title="Rules">
      <Rl>Header: mono fs[11], uppercase, fgFaint. Rows: sans fs[13], fgMuted.</Rl>
      <Rl>Rows separated by divider lines. No zebra striping.</Rl>
      <Rl>For complex data (sorting, pagination, selection), build a custom list — Table is for static display.</Rl>
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
  const [status, setStatus] = useState('pending');
  const [hwTitle, setHwTitle] = useState('Practice worksheet');
  const [questionsSel, setQuestionsSel] = useState('8');
  const [showScore, setShowScore] = useState(false);
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="Status" value={status} options={['pending', 'in-progress', 'submitted', 'overdue', 'graded']} onChange={setStatus} />
        <KnobText label="title" value={hwTitle} onChange={setHwTitle} />
        <KnobSelect label="questions" value={questionsSel} options={['4','6','8','10']} onChange={setQuestionsSel} />
        <KnobToggle label="score" value={showScore} onChange={setShowScore} />
      </>}
    >
      <View style={{ width: '100%' }}>
        <HomeworkCard title={hwTitle} subject="Qudrat Math" dueDate="May 1" questions={parseInt(questionsSel)} status={status as any} score={showScore && status === 'graded' ? '7/8' : undefined} />
      </View>
    </Playground>

    <Import>{"import { HomeworkCard } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="title" type="string" />
      <Prop name="subject" type="string" />
      <Prop name="dueDate" type="string" />
      <Prop name="questions" type="number" />
      <Prop name="status" type="'pending' | 'in-progress' | 'submitted' | 'overdue' | 'graded'" def="'pending'" />
      <Prop name="score" type="string" desc="Shown when graded, e.g. '7/8'" />
      <Prop name="onPress" type="() => void" />
    </Props>
    <S title="All States">
      <HomeworkCard title="Vocab practice" subject="Qudrat Reading" dueDate="Apr 28" questions={12} status="pending" />
      <HomeworkCard title="Inference worksheet" subject="Qudrat Reading" dueDate="Apr 27" questions={6} status="in-progress" />
      <HomeworkCard title="Trig exercises" subject="Qudrat Math" dueDate="Apr 25" questions={10} status="submitted" />
      <HomeworkCard title="Grammar review" subject="Qudrat Verbal" dueDate="Apr 24" questions={15} status="overdue" />
      <HomeworkCard title="Reading comprehension" subject="Qudrat Reading" dueDate="Apr 20" questions={8} status="graded" score="6/8" />
    </S>
  </>;
}

// ═══════════════════════════════════════════════
// PROGRESS
// ═══════════════════════════════════════════════


export function SessionBarPage() {
  return <>
    <Import>{"import { SessionBar } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="segments" type="('correct' | 'incorrect' | 'current' | 'pending')[]" />
      <Prop name="size" type="'sm' | 'md' | 'lg'" def="'md'" />
    </Props>
    <S title="States">
      <C label="Mixed"><SessionBar segments={['correct','correct','incorrect','correct','pending','pending','pending','pending','pending','pending']} /></C>
      <C label="All correct (lg)"><SessionBar segments={['correct','correct','correct','correct','correct']} size="lg" /></C>
      <C label="Small"><SessionBar segments={['correct','incorrect','correct','correct','incorrect','correct','correct','correct']} size="sm" /></C>
    </S>
  </>;
}

export function ProgressPage() {
  const [val, setVal] = useState('76');
  const [clr, setClr] = useState('default');
  const [showVal, setShowVal] = useState(true);
  const [sizeSel, setSizeSel] = useState('120');
  const num = Math.max(0, Math.min(100, parseInt(val) || 0));
  const progressColor = clr === 'accent' ? color.noon[400] : clr === 'danger' ? color.danger[400] : undefined;
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="Value" value={val} options={['0','10','25','50','76','90','100']} onChange={setVal} />
        <KnobSelect label="Color" value={clr} options={['default', 'accent', 'danger']} onChange={setClr} />
        <KnobToggle label="Show Value" value={showVal} onChange={setShowVal} />
        <KnobSelect label="size" value={sizeSel} options={['80','120','160']} onChange={setSizeSel} />
      </>}
    >
      <View style={{ width: '100%', alignItems: 'center', gap: sp[5] }}>
        <View style={{ width: '100%' }}><LinearProgress value={num} color={progressColor} /></View>
        <CircularProgress value={num} showValue={showVal} color={progressColor} size={parseInt(sizeSel)} />
      </View>
    </Playground>

    <Import>{"import { LinearProgress, CircularProgress } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="value" type="number" desc="0-100" />
      <Prop name="color" type="string" desc="Track fill color" />
      <Prop name="height" type="number" desc="Linear only, default sp[1]" />
      <Prop name="size" type="number" desc="Circular only, default sp[9]" />
      <Prop name="strokeWidth" type="number" def="3" desc="Circular only" />
      <Prop name="showValue" type="boolean" desc="Circular only, show % text" />
    </Props>
    <S title="Linear Examples">
      <C label="76%"><LinearProgress value={76} /></C>
      <C label="100% accent"><LinearProgress value={100} color={color.noon[400]} /></C>
      <C label="25% danger"><LinearProgress value={25} color={color.danger[400]} /></C>
    </S>
    <S title="Circular Examples"><R>
      <CircularProgress value={76} showValue />
      <CircularProgress value={100} showValue color={color.noon[400]} />
      <CircularProgress value={25} showValue color={color.danger[400]} />
      <CircularProgress value={0} showValue />
    </R></S>
  </>;
}

// ═══════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════

export function TitleBarPage() {
  const { theme } = useTheme();
  return <>
    <Import>{"import { TitleBar } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="title" type="string" />
      <Prop name="subtitle" type="string" />
      <Prop name="variant" type="'default' | 'large' | 'transparent' | 'overlay'" def="'default'" />
      <Prop name="backIcon" type="ReactNode" desc="Back arrow element" />
      <Prop name="onBack" type="() => void" />
      <Prop name="rightAction" type="ReactNode" desc="Right-side content" />
    </Props>
    <S title="Default"><TitleBar title="Atlas" /></S>
    <S title="With back"><TitleBar title="Session details" onBack={() => {}} /></S>
    <S title="With right action"><TitleBar title="Schedule" rightAction={<Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.accent }}>Today</Text>} /></S>
    <S title="Safe area">
      <Rl>TitleBar does not handle safe area insets — the parent screen should wrap it in a SafeAreaView or apply paddingTop from useSafeAreaInsets.</Rl>
    </S>
  </>;
}

export function TabsPage() {
  const [tab, setTab] = useState(0);
  const [tab2, setTab2] = useState(0);
  return <>
    <Import>{"import { Tabs } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="tabs" type="string[]" />
      <Prop name="selected" type="number" />
      <Prop name="onSelect" type="(index: number) => void" />
    </Props>
    <S title="4 tabs"><Tabs tabs={['Atlas', 'Schedule', 'Crew', 'Water']} selected={tab} onSelect={setTab} /></S>
    <S title="2 tabs"><Tabs tabs={['Upcoming', 'Past']} selected={tab2} onSelect={setTab2} /></S>
    <S title="Rules">
      <Rl>2-5 tabs. More than 5 should scroll horizontally.</Rl>
      <Rl>Tabs switch content views on the same screen. For app-level navigation, use BottomNav.</Rl>
      <Rl>Active tab: accent underline + fg text. Inactive: fgMuted, no underline.</Rl>
    </S>
  </>;
}

export function BottomNavPage() {
  const [sel, setSel] = useState(0);
  return <>
    <Import>{"import { BottomNav } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="items" type="{ label: string; icon: IconName | (color, size) => ReactNode; badge?: number }[]" />
      <Prop name="selected" type="number" />
      <Prop name="onSelect" type="(index: number) => void" />
    </Props>
    <S title="Default">
      <BottomNav
        items={[
          { label: 'Atlas', icon: 'search' },
          { label: 'Schedule', icon: 'document' },
          { label: 'Crew', icon: 'menu' },
          { label: 'Water', icon: 'expand' },
        ]}
        selected={sel}
        onSelect={setSel}
      />
    </S>
    <S title="With badge">
      <BottomNav
        items={[
          { label: 'Atlas', icon: 'search' },
          { label: 'Schedule', icon: 'document', badge: 3 },
          { label: 'Crew', icon: 'menu' },
          { label: 'Water', icon: 'expand' },
        ]}
        selected={1}
        onSelect={() => {}}
      />
    </S>
    <S title="Rules">
      <Rl>3-5 items max. App-level destinations only.</Rl>
      <Rl>Pass icon as an IconName string — colour and size (icon.tab = 22px) are set automatically.</Rl>
      <Rl>Active: accent icon + accent label. Inactive: fgSubtle icon + fgSubtle label.</Rl>
      <Rl>For custom icons, pass a render function: (color, size) => ReactNode — use the provided colour.</Rl>
      <Rl>Badge count renders as a small number above the icon.</Rl>
      <Rl>On tablet/desktop, replace with SideNav.</Rl>
    </S>
    <S title="Safe area">
      <Rl>Bottom inset handled automatically via useSafeAreaInsets. No wrapper needed.</Rl>
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
    <S title="Safe area">
      <Rl>Top inset handled automatically via useSafeAreaInsets. Toast clears the notch/Dynamic Island.</Rl>
    </S>
  </>;
}

export function DialogPage() {
  const [vis, setVis] = useState(false);
  const [danger, setDanger] = useState(false);
  const [primaryLabel, setPrimaryLabel] = useState('Confirm');
  const [secondaryLabel, setSecondaryLabel] = useState('Cancel');
  return <>
    <Playground
      knobs={<>
        <KnobToggle label="Danger" value={danger} onChange={setDanger} />
        <KnobText label="primaryLabel" value={primaryLabel} onChange={setPrimaryLabel} />
        <KnobText label="secondaryLabel" value={secondaryLabel} onChange={setSecondaryLabel} />
      </>}
    >
      <Button variant={danger ? 'danger' : 'secondary'} onPress={() => setVis(true)}>{danger ? 'Delete Dialog' : 'Open Dialog'}</Button>
    </Playground>

    <Import>{"import { Dialog } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="visible" type="boolean" />
      <Prop name="onClose" type="() => void" />
      <Prop name="title" type="string" />
      <Prop name="body" type="string" />
      <Prop name="danger" type="boolean" />
      <Prop name="primaryLabel" type="string" def="'Confirm'" />
      <Prop name="secondaryLabel" type="string" def="'Cancel'" />
      <Prop name="onPrimary" type="() => void" />
      <Prop name="onSecondary" type="() => void" />
    </Props>
    <S title="Rules">
      <Rl>Confirmation: neutral primary button. "Are you sure?" pattern.</Rl>
      <Rl>Danger: red primary button. Destructive actions (delete, leave, remove).</Rl>
      <Rl>Always provide a cancel/secondary option. Never auto-dismiss.</Rl>
    </S>
    <S title="Keyboard">
      <Rl>KeyboardAvoidingView built in. Dialog shifts up when the software keyboard opens on iOS.</Rl>
    </S>
    <Dialog visible={vis} onClose={() => setVis(false)} title={danger ? 'Delete topic?' : 'Are you sure?'} body={danger ? 'All practice history will be removed.' : 'This action cannot be undone.'} danger={danger} primaryLabel={primaryLabel} secondaryLabel={secondaryLabel} onPrimary={() => setVis(false)} />
  </>;
}

export function BottomSheetPage() {
  const { theme } = useTheme();
  const [vis, setVis] = useState(false);
  return <>
    <Import>{"import { BottomSheet } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="visible" type="boolean" />
      <Prop name="onClose" type="() => void" />
      <Prop name="title" type="string" />
      <Prop name="children" type="ReactNode" />
      <Prop name="actions" type="ReactNode" desc="Bottom action buttons" />
      <Prop name="full" type="boolean" desc="Full screen height" />
    </Props>
    <S title="Default"><C label="Auto-size"><Button variant="secondary" onPress={() => setVis(true)}>Open Sheet</Button></C></S>
    <BottomSheet visible={vis} onClose={() => setVis(false)} title="Session details">
      <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fgMuted }}>Inference & implied meaning{'\n'}Qudrat Reading — Mr. Hassan{'\n'}10:00 — 10:45</Text>
    </BottomSheet>
    <S title="Safe area">
      <Rl>Bottom inset handled automatically. Content and actions clear the home indicator.</Rl>
    </S>
    <S title="Keyboard">
      <Rl>KeyboardAvoidingView built in. Sheet shifts up when the software keyboard opens on iOS.</Rl>
    </S>
  </>;
}

export function FullSheetPage() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  return <>
    <Import>{"import { FullSheet } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="visible" type="boolean" />
      <Prop name="onClose" type="() => void" />
      <Prop name="title" type="string" />
      <Prop name="children" type="ReactNode" />
    </Props>
    <S title="Default">
      <Button variant="secondary" onPress={() => setOpen(true)}>Open Full Sheet</Button>
      <FullSheet visible={open} onClose={() => setOpen(false)} title="Session details">
        <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fgMuted, lineHeight: fs[14] * 1.6 }}>{'Full-screen modal with dark background, title bar, and close button.\n\nUsed for worked examples, slide viewers, resource content, and any deep-dive material that needs the full screen.\n\nContent scrolls automatically. Safe area insets are handled.'}</Text>
      </FullSheet>
    </S>
    <S title="When to use">
      <Rl>Deep-dive content — worked examples, slide decks, resources.</Rl>
      <Rl>Content that needs full screen focus, not a partial overlay.</Rl>
      <Rl>BottomSheet for quick actions and short content. FullSheet for reading and browsing.</Rl>
    </S>
    <S title="Safe area">
      <Rl>Top and bottom insets handled automatically. Header clears the notch, scroll content clears the home indicator.</Rl>
    </S>
  </>;
}

export function TooltipPage() {
  return <>
    <Import>{"import { Tooltip } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="children" type="ReactNode" desc="Trigger element" />
      <Prop name="text" type="string" />
    </Props>
    <S title="Default"><C label="Long press to show"><Tooltip text="This is a tooltip"><Button variant="secondary">Hold me</Button></Tooltip></C></S>
    <S title="Rules">
      <Rl>Triggered by long-press on mobile (no hover). Shows above the trigger.</Rl>
      <Rl>Short, plain text only. For rich content, use BottomSheet. For actions, use Menu.</Rl>
      <Rl>Auto-dismisses after 3s or on tap outside.</Rl>
    </S>
  </>;
}

// ═══════════════════════════════════════════════
// LAYOUT
// ═══════════════════════════════════════════════

export function InterstitialPage() {
  return <>
    <Import>{"import { Interstitial } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="title" type="string" />
      <Prop name="body" type="string" />
      <Prop name="buttonLabel" type="string" />
      <Prop name="onPress" type="() => void" />
    </Props>
    <S title="Default"><Interstitial title="Session complete" body="You answered 8 of 10 correctly." buttonLabel="Continue" onPress={() => {}} /></S>
  </>;
}

export function EmptyStatePage() {
  return <>
    <Import>{"import { EmptyState } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="icon" type="ReactNode" desc="Optional icon above title" />
      <Prop name="title" type="string" />
      <Prop name="body" type="string" />
      <Prop name="actionLabel" type="string" />
      <Prop name="onAction" type="() => void" />
    </Props>
    <S title="States">
      <C label="With action"><EmptyState title="No sessions today" body="Check back tomorrow for your schedule." actionLabel="Browse topics" onAction={() => {}} /></C>
      <C label="Without action"><EmptyState title="No results" body="Try adjusting your filters." /></C>
    </S>
  </>;
}

export function SkeletonPage() {
  return <>
    <Import>{"import { Skeleton } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="width" type="number | string" />
      <Prop name="height" type="number" />
      <Prop name="circle" type="boolean" />
    </Props>
    <S title="Examples">
      <C label="Avatar + text"><R><Skeleton circle height={sp[8]} /><View style={{ flex: 1, gap: sp[2] }}><Skeleton width="60%" height={sp[3]} /><Skeleton width="90%" height={sp[2]} /><Skeleton width="40%" height={sp[2]} /></View></R></C>
      <C label="Card skeleton"><View style={{ gap: sp[3] }}><Skeleton height={sp[4]} /><Skeleton height={sp[2]} /><Skeleton width="70%" height={sp[2]} /></View></C>
    </S>
  </>;
}

export function DividerPage() {
  const { theme } = useTheme();
  return <>
    <Import>{"import { Divider } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="spacing" type="number" desc="Vertical margin above and below" />
    </Props>
    <S title="Default">
      <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginBottom: sp[3] }}>Content above</Text>
      <Divider />
      <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginTop: sp[3] }}>Content below</Text>
    </S>
    <S title="Rules">
      <Rl>Uses theme.divider color — 6% opacity, not a full border.</Rl>
      <Rl>Use between content groups, not between every item in a list.</Rl>
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
  return <>
    <Import>{"import { GridPaper } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="variant" type="'standard' | 'major' | 'canvas'" def="'standard'" />
      <Prop name="width" type="number" />
      <Prop name="height" type="number" />
      <Prop name="style" type="ViewStyle" />
    </Props>
    <S title="Standard — 16px" desc="The graph paper texture. Used on journey screens, in-class slides, atlas views. This is the brand surface.">
      <View style={{ overflow: 'hidden', borderRadius: r[2] }}><GridPaper variant="standard" width={800} height={200} /></View>
    </S>
    <S title="Major + Minor — atlas surfaces" desc="64px gold major lines over 8px chalk minor lines. For atlas and terrain views only.">
      <View style={{ overflow: 'hidden', borderRadius: r[2] }}><GridPaper variant="major" width={800} height={200} /></View>
    </S>
    <S title="Canvas — 24px faint" desc="Barely visible alignment aid. Not a brand surface — just spatial awareness.">
      <View style={{ overflow: 'hidden', borderRadius: r[2] }}><GridPaper variant="canvas" width={800} height={200} /></View>
    </S>
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
    <S title="When NOT to Use">
      <Rl>Quiz / practice sessions — competes with readability</Rl>
      <Rl>Cards and raised surfaces — grid is baked into the base, not overlaid</Rl>
      <Rl>Schedule / session lists — too busy behind row content</Rl>
      <Rl>Heatmap / mastery grids — tile colours are the data, don't add noise</Rl>
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
  return <>
    <Import>{"import { TerrainPattern } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="width" type="number" />
      <Prop name="height" type="number" />
      <Prop name="variant" type="'standard' | 'dense'" def="'standard'" />
      <Prop name="opacity" type="number" def="1" />
      <Prop name="style" type="ViewStyle" />
    </Props>
    <S title="Standard" desc="Lines flow together — each follows the one above with slight drift, like real topographic contours. They bunch at elevation changes and spread on flat ground.">
      <View style={{ overflow: 'hidden', borderRadius: r[2] }}><TerrainPattern width={800} height={220} /></View>
    </S>
    <S title="Dense — hero backgrounds" desc="Tighter spacing for headers and hero sections. More lines, higher contrast, same coherent flow.">
      <View style={{ overflow: 'hidden', borderRadius: r[2] }}><TerrainPattern width={800} height={220} variant="dense" /></View>
    </S>
    <S title="Low opacity — behind content" desc="When text sits on top, reduce terrain opacity to 50-70% so it stays as texture.">
      <View style={{ overflow: 'hidden', borderRadius: r[2] }}><TerrainPattern width={800} height={160} variant="dense" opacity={0.5} /></View>
    </S>
    <S title="How It Works">
      <Rl>Coherent flow: all lines share a base terrain profile (layered sine waves). Each line adds tiny per-line drift and phase shift.</Rl>
      <Rl>Density = elevation: tight clusters (3-4px) = steep slopes. Wide gaps (16-24px) = ridges/plateaus. The eye reads this as topography.</Rl>
      <Rl>Opacity varies: darker lines where gaps are wider (isolated = prominent). Lighter where clustered (many lines fade together).</Rl>
      <Rl>Smoothing: 20 control points per line, cubic bezier interpolation. 0.8px stroke.</Rl>
    </S>
    <S title="When to Use">
      <Rl>Section headers and hero backgrounds</Rl>
      <Rl>Marketing and onboarding screens</Rl>
      <Rl>Atlas overview / route map backgrounds</Rl>
      <Rl>Interstitial / celebration backgrounds</Rl>
    </S>
    <S title="When NOT to Use">
      <Rl>Behind quiz options or practice content — competes with readability</Rl>
      <Rl>On cards, buttons, or interactive chrome — terrain is texture, not UI</Rl>
      <Rl>Schedule / session lists — too busy behind row content</Rl>
      <Rl>Heatmap / mastery grids — tile colours are the data, don't add noise</Rl>
    </S>
    <S title="Rules">
      <Rl>Abstract symbolism. Represents the journey, not a literal map. Don't make routes follow the contours.</Rl>
      <Rl>Clip to container. Partial reveals are more powerful than showing the full pattern.</Rl>
      <Rl>Single colour. Chalk on void, ink on paper. No gradient fills, no coloured lines.</Rl>
    </S>
  </>;
}

export function DunePatternPage() {
  const [variant, setVariant] = useState('constellation');
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="Variant" value={variant} options={['constellation', 'horizon']} onChange={setVariant} />
      </>}
    >
      <View style={{ width: '100%', overflow: 'hidden', borderRadius: r[2] }}>
        <DunePattern width={800} height={300} variant={variant as any} />
      </View>
    </Playground>

    <Import>{"import { DunePattern } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="width" type="number" />
      <Prop name="height" type="number" />
      <Prop name="variant" type="'constellation' | 'horizon'" def="'constellation'" />
      <Prop name="style" type="ViewStyle" />
    </Props>
    <S title="Constellation" desc="Connected node network with gold dots and thin lines. Geometric triangle planes between nodes.">
      <View style={{ overflow: 'hidden', borderRadius: r[2] }}><DunePattern width={800} height={240} variant="constellation" /></View>
    </S>
    <S title="Horizon" desc="Converging planes from a central vanishing point. Gold and shadow faces.">
      <View style={{ overflow: 'hidden', borderRadius: r[2] }}><DunePattern width={800} height={240} variant="horizon" /></View>
    </S>
    <S title="When to Use">
      <Rl>Hero sections and onboarding screens</Rl>
      <Rl>Marketing and landing pages</Rl>
      <Rl>Achievement and celebration backgrounds</Rl>
      <Rl>Atlas overview headers</Rl>
    </S>
    <S title="Rules">
      <Rl>Always behind content, never competing with it. Reduce opacity if text sits on top.</Rl>
      <Rl>Gold gradients are journey signal — same rules as gold tokens.</Rl>
      <Rl>Clip to container. Partial reveals are more powerful than showing the full pattern.</Rl>
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
  const [star, setStar] = useState(false);
  const [status, setStatus] = useState('none');
  const [hasBadge, setHasBadge] = useState(false);
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="Size" value={size} options={['sm', 'md', 'lg']} onChange={setSize} />
        <KnobSelect label="Color" value={clr} options={['default', 'noon', 'blue']} onChange={setClr} />
        <KnobToggle label="Star" value={star} onChange={setStar} />
        <KnobSelect label="Status" value={status} options={['none', 'online', 'busy']} onChange={setStatus} />
        <KnobToggle label="badge" value={hasBadge} onChange={setHasBadge} />
      </>}
    >
      <Identity initials="S" name="Sarah Al-Rashid" role="Crew Alpha" avatarColor={clr as any} star={star} status={status === 'none' ? undefined : status as any} size={size as any} badge={hasBadge ? 3 : undefined} />
    </Playground>

    <Import>{"import { Identity } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="initials" type="string" />
      <Prop name="name" type="string" />
      <Prop name="role" type="string" desc="Mono text below name" />
      <Prop name="meta" type="string" desc="Faint text below role" />
      <Prop name="avatarColor" type="'default' | 'noon' | 'blue'" />
      <Prop name="star" type="boolean" />
      <Prop name="status" type="'online' | 'busy'" />
      <Prop name="badge" type="string | number" />
      <Prop name="right" type="ReactNode" desc="Right-side content" />
      <Prop name="size" type="'sm' | 'md' | 'lg'" def="'md'" />
    </Props>
    <S title="Examples">
      <C label="Student"><Identity initials="S" name="Sarah Al-Rashid" role="Crew Alpha" meta="Joined 3 weeks ago" avatarColor="noon" /></C>
      <C label="Star teacher"><Identity initials="H" name="Mr. Hassan" role="Star Teacher" avatarColor="blue" star /></C>
      <C label="With badge + status"><Identity initials="O" name="Omar K." role="Facilitator" status="online" badge={3} /></C>
    </S>
    <S title="Rules">
      <Rl>Used in crew lists, leaderboards, session participant views.</Rl>
      <Rl>Name truncates with ellipsis. Role in mono. Meta in faint.</Rl>
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
    <S title="Breadcrumbs" desc="Web/tablet only. Not applicable on mobile.">
      <Rl>Horizontal path trail with chevron separators.</Rl>
      <Rl>On mobile, use TitleBar with back navigation instead.</Rl>
      <Rl>Current page is fg color, ancestors are fgMuted with onPress.</Rl>
    </S>
  </>;
}

export function PaginationPage() {
  return <>
    <S title="Pagination" desc="Web/tablet only. Not applicable on mobile.">
      <Rl>Page buttons: sp[7] × sp[7], r[2], mono fs[13].</Rl>
      <Rl>Active page: accentSoft bg, accent text.</Rl>
      <Rl>On mobile, use FlatList infinite scroll or load-more pattern instead.</Rl>
    </S>
  </>;
}

export function SideNavPage() {
  return <>
    <S title="Side Nav" desc="Desktop/tablet only. Not applicable on mobile.">
      <Rl>Persistent sidebar with grouped navigation items.</Rl>
      <Rl>Item: sp[2] sp[3] padding, r[2], fs[14] fw[500].</Rl>
      <Rl>Active: activeOverlay bg, fg color. Inactive: fgMuted.</Rl>
      <Rl>On mobile, use BottomNav for primary navigation.</Rl>
    </S>
  </>;
}

export function ModalPage() {
  return <>
    <S title="Modal" desc="Full-screen overlay wrapping Dialog.">
      <Import>{"import { Dialog } from '@noon/design-system';\n// Modal = Dialog with visible/onClose props.\n// For complex content, use BottomSheet instead."}</Import>
      <Rl>Uses the same Dialog component. No separate Modal component needed.</Rl>
      <Rl>For rich content (forms, lists, media), prefer BottomSheet — it scrolls and has actions.</Rl>
    </S>
  </>;
}

export function PopoversPage() {
  return <>
    <S title="Popovers" desc="Contextual content anchored to a trigger.">
      <Rl>On mobile, popovers are hard to position reliably. Use alternatives:</Rl>
      <Rl>Simple text → Tooltip (long-press to show)</Rl>
      <Rl>Rich content → BottomSheet</Rl>
      <Rl>Action list → Menu</Rl>
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
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3] }}>
          <Checkbox checked={ch} onValueChange={setCh} />
          <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: useTheme().theme.fgMuted }}>I agree to the terms</Text>
        </View>
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
  return <>
    <S title="Dropzone" desc="Web only. Not applicable on mobile.">
      <Rl>Drag-and-drop file upload area. CSS-only dashed border.</Rl>
      <Rl>On mobile, use expo-document-picker or expo-image-picker instead.</Rl>
      <Rl>Trigger via Button ("Upload file") or inline in form flow.</Rl>
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
      <Rl>#1 gets star indicator on avatar.</Rl>
      <Rl>Score displayed in mono, right-aligned.</Rl>
    </S>
  </>;
}

// ═══════════════════════════════════════════════
// EXPERIMENTAL
// ═══════════════════════════════════════════════

export function OasisPage() {
  const [level, setLevel] = useState('35');
  const [status, setStatus] = useState('current');
  const [size, setSize] = useState('md');
  return <>
    <Playground
      knobs={<>
        <KnobSelect label="level" value={level} options={['0', '25', '35', '50', '75', '90', '100']} onChange={setLevel} />
        <KnobSelect label="status" value={status} options={['complete', 'strong', 'weak', 'current', 'upcoming', 'locked']} onChange={setStatus} />
        <KnobSelect label="size" value={size} options={['sm', 'md', 'lg']} onChange={setSize} />
      </>}
    >
      <Oasis level={parseInt(level)} status={status as any} label="5" size={size as any} />
    </Playground>
    <Import>{"import { Oasis } from '@noon/design-system';"}</Import>
    <Props>
      <Prop name="level" type="number" desc="Water fill 0–100" />
      <Prop name="status" type="'complete' | 'strong' | 'weak' | 'current' | 'upcoming' | 'locked'" def="'upcoming'" />
      <Prop name="label" type="string" desc="Text inside the pool (chapter number)" />
      <Prop name="size" type="'sm' | 'md' | 'lg'" def="'md'" />
    </Props>
    <S title="All statuses">
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: sp[5], alignItems: 'flex-end' }}>
        <Oasis level={95} status="complete" label="1" size="sm" />
        <Oasis level={82} status="strong" label="3" />
        <Oasis level={45} status="weak" label="2" />
        <Oasis level={35} status="current" label="5" size="lg" />
        <Oasis level={0} status="upcoming" label="6" />
        <Oasis level={0} status="locked" label="8" size="sm" />
      </View>
    </S>
  </>;
}

export function RouteMapPage({ onClose }: { onClose?: () => void }) {
  const { theme } = useTheme();
  const sampleChapters: RouteChapter[] = [
    { id: 'ch8', label: '8', title: 'Advanced Inference', date: 'in 32 days', status: 'locked', level: 0, markers: [
      { id: 'implied', label: 'Implied meaning', status: 'unmapped' },
      { id: 'intent', label: 'Author intent', status: 'unmapped' },
    ]},
    { id: 'ch7', label: '7', title: 'Comparative Analysis', date: 'in 25 days', status: 'upcoming', level: 0, markers: [
      { id: 'comparison', label: 'Passage comparison', status: 'unmapped' },
      { id: 'evidence', label: 'Evidence weighing', status: 'unmapped' },
    ]},
    { id: 'ch6', label: '6', title: 'Data Interpretation', date: 'in 18 days', status: 'upcoming', level: 0, markers: [
      { id: 'charts', label: 'Charts & tables', status: 'unmapped' },
      { id: 'stats', label: 'Statistical reasoning', status: 'unmapped' },
      { id: 'datainf', label: 'Data inference', status: 'unmapped' },
    ]},
    { id: 'ch5', label: '5', title: 'Critical Reading', date: 'in 4 days', status: 'current', level: 35, markers: [
      { id: 'tone', label: 'Tone analysis', status: 'exploring' },
      { id: 'mainidea', label: 'Main idea extraction', status: 'exploring' },
      { id: 'support', label: 'Supporting detail', status: 'not-started' },
    ]},
    { id: 'ch4', label: '4', title: 'Vocabulary in Context', result: '82%', status: 'strong', level: 82, markers: [
      { id: 'wordmeaning', label: 'Word meaning', status: 'mapped' },
      { id: 'contextclues', label: 'Contextual clues', status: 'mapped' },
    ]},
    { id: 'ch3', label: '3', title: 'Sentence Completion', result: '91%', status: 'strong', level: 91, markers: [
      { id: 'grammar', label: 'Grammar patterns', status: 'mapped' },
      { id: 'connectors', label: 'Logical connectors', status: 'mapped' },
      { id: 'transitions', label: 'Transition words', status: 'mapped' },
    ]},
    { id: 'ch2', label: '2', title: 'Reading Comprehension', result: '45%', status: 'weak', level: 45, markers: [
      { id: 'structure', label: 'Passage structure', status: 'needs-attention' },
      { id: 'recall', label: 'Detail recall', status: 'needs-attention' },
      { id: 'infbasics', label: 'Inference basics', status: 'mapped' },
    ]},
    { id: 'ch1', label: '1', title: 'Foundations', result: '95%', status: 'complete', level: 95, markers: [
      { id: 'vocab', label: 'Basic vocabulary', status: 'mapped' },
      { id: 'sentences', label: 'Sentence types', status: 'mapped' },
    ]},
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: sp[5], paddingTop: sp[10], paddingBottom: sp[12] }}>
        <RouteMap chapters={sampleChapters} currentChapter="ch5" />
      </ScrollView>
    </View>
  );
}
