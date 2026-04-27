/**
 * Every component page for the RN explorer.
 * Each exports a function component that renders the full page with all variants, states, specs, rules.
 */
import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  useTheme, Button, IconButton, Card, Chip, Avatar, Badge, Alert,
  SessionCard, SessionBar, RouteSteps, QuizOption, Tooltip,
  Input, Textarea, Switch, Checkbox, Radio, Stepper, Segmented,
  Tabs, BottomNav, TitleBar, FilterBar, Divider, Skeleton, EmptyState, Table,
  LinearProgress, CircularProgress, Toast, Dialog, BottomSheet,
  sp, fs, fw, font, color, r, h, icon, lh,
} from '../../rn';

// ─── Shell components ───
function S({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <View style={{ marginBottom: sp[7] }}>
      <Text style={{ fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: theme.fgFaint, letterSpacing: 2, textTransform: 'uppercase', marginBottom: sp[3], paddingBottom: sp[2], borderBottomWidth: 1, borderBottomColor: theme.divider }}>{title}</Text>
      {desc ? <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgSubtle, marginBottom: sp[4] }}>{desc}</Text> : null}
      {children}
    </View>
  );
}
function L({ children }: { children: string }) {
  const { theme } = useTheme();
  return <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, marginBottom: sp[1], marginTop: sp[4] }}>{children}</Text>;
}
function R({ children }: { children: React.ReactNode }) {
  return <View style={{ flexDirection: 'row', gap: sp[2], flexWrap: 'wrap', alignItems: 'center', marginBottom: sp[2] }}>{children}</View>;
}
function C({ label, children }: { label: string; children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <View style={{ backgroundColor: theme.bgRaised, borderRadius: r[2], borderWidth: 1, borderColor: theme.border, padding: sp[4], marginBottom: sp[3] }}>
      <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, marginBottom: sp[2] }}>{label}</Text>
      {children}
    </View>
  );
}
function Sp({ label, value }: { label: string; value: string }) {
  const { theme } = useTheme();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: sp[1], borderBottomWidth: 1, borderBottomColor: theme.divider }}>
      <Text style={{ fontFamily: font.sans, fontSize: fs[12], color: theme.fgMuted }}>{label}</Text>
      <Text style={{ fontFamily: font.mono, fontSize: fs[12], color: theme.fg }}>{value}</Text>
    </View>
  );
}
function Rl({ children }: { children: string }) {
  const { theme } = useTheme();
  return <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5, paddingVertical: sp[2] }}>{children}</Text>;
}
function Gap({ s }: { s?: number }) { return <View style={{ height: s ?? sp[3] }} />; }

function Import({ children }: { children: string }) {
  const { theme } = useTheme();
  return (
    <View style={{ backgroundColor: theme.bgRaised, borderRadius: r[2], borderWidth: 1, borderColor: theme.border, padding: sp[3], marginBottom: sp[5] }}>
      <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.accent }}>{children}</Text>
    </View>
  );
}

function Prop({ name, type, def, desc }: { name: string; type: string; def?: string; desc?: string }) {
  const { theme } = useTheme();
  return (
    <View style={{ flexDirection: 'row', paddingVertical: sp[2], borderBottomWidth: 1, borderBottomColor: theme.divider, gap: sp[2] }}>
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
      <Text style={{ fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: theme.fgFaint, letterSpacing: 2, textTransform: 'uppercase', marginBottom: sp[2] }}>Props</Text>
      {children}
    </View>
  );
}

// ═══════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════

export function ButtonsPage() {
  const { theme } = useTheme();
  const V: Array<'primary'|'secondary'|'ghost'|'danger'|'danger-solid'|'signal'> = ['primary','secondary','ghost','danger','danger-solid','signal'];

  return <>
    <Import>{"import { Button } from '@noon/design-system';"}</Import>

    <Props>
      <Prop name="children" type="string" desc="Button label text" />
      <Prop name="variant" type="'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-solid' | 'signal'" def="'primary'" />
      <Prop name="size" type="'sm' | 'md' | 'lg'" def="'md'" desc="32 / 40 / 48 height" />
      <Prop name="disabled" type="boolean" desc="Grey bg + grey text, not interactive" />
      <Prop name="loading" type="boolean" desc="Shows spinner, hides text, disables interaction" />
      <Prop name="block" type="boolean" desc="Full width" />
      <Prop name="icon" type="ReactNode" desc="Renders before text" />
      <Prop name="onPress" type="() => void" />
    </Props>

    <S title="Variants">
      <R>{V.map(v => <Button key={v} variant={v}>{v}</Button>)}</R>
    </S>

    <S title="Sizes">
      <R><Button size="sm">Small</Button><Button size="md">Medium</Button><Button size="lg">Large</Button></R>
    </S>

    <S title="Disabled">
      <R>{V.map(v => <Button key={v} variant={v} disabled>{v}</Button>)}</R>
    </S>

    <S title="Loading">
      <R>{V.map(v => <Button key={v} variant={v} loading>{v}</Button>)}</R>
    </S>

    <S title="Block">
      {V.map(v => <View key={v} style={{ marginBottom: sp[2] }}><Button variant={v} block>{v}</Button></View>)}
    </S>

    <S title="With Icon">
      <R>
        <Button variant="primary" icon={<Text style={{ color: theme.accentFg }}>+</Text>}>Add</Button>
        <Button variant="secondary" icon={<Text style={{ color: theme.fg }}>\u2190</Text>}>Back</Button>
      </R>
    </S>
  </>;
}

export function InputsPage() {
  return <>
    <Import>{"import { Input, Textarea } from '@noon/design-system';"}</Import>

    <Props>
      <Prop name="label" type="string" desc="Label above input" />
      <Prop name="placeholder" type="string" />
      <Prop name="value" type="string" />
      <Prop name="error" type="string" desc="Error message, red border" />
      <Prop name="helper" type="string" desc="Help text below input" />
      <Prop name="disabled" type="boolean" />
      <Prop name="onChangeText" type="(text: string) => void" />
    </Props>

    <S title="States">
      <C label="Default"><Input placeholder="Enter text" /></C>
      <C label="With label"><Input label="Name" placeholder="Your name" /></C>
      <C label="Error"><Input label="Email" error="Invalid email" /></C>
      <C label="Disabled"><Input label="Locked" disabled /></C>
    </S>

    <S title="Textarea">
      <C label="Default"><Textarea placeholder="Write..." rows={3} /></C>
      <C label="With error"><Textarea label="Notes" error="Required" /></C>
    </S>
  </>;
}

export function ControlsPage() {
  const [sw, setSw] = useState(true);
  const [ch, setCh] = useState(true);
  const [rad, setRad] = useState(0);
  const [step, setStep] = useState(3);
  const [seg, setSeg] = useState(0);
  return <>
    <Import>{"import { Switch, Checkbox, Radio, Stepper, Segmented } from '@noon/design-system';"}</Import>

    <S title="Switch">
      <Props>
        <Prop name="value" type="boolean" />
        <Prop name="onValueChange" type="(val: boolean) => void" />
        <Prop name="disabled" type="boolean" />
      </Props>
      <R><Switch value={sw} onValueChange={setSw} /><Switch value={false} onValueChange={() => {}} /><Switch value={true} onValueChange={() => {}} disabled /></R>
    </S>

    <S title="Checkbox">
      <Props>
        <Prop name="checked" type="boolean" />
        <Prop name="onValueChange" type="(val: boolean) => void" />
        <Prop name="disabled" type="boolean" />
        <Prop name="indeterminate" type="boolean" />
      </Props>
      <R><Checkbox checked={ch} onValueChange={setCh} /><Checkbox checked={false} onValueChange={() => {}} /><Checkbox checked={true} onValueChange={() => {}} disabled /><Checkbox checked={false} onValueChange={() => {}} indeterminate /></R>
    </S>

    <S title="Radio">
      <Props>
        <Prop name="selected" type="boolean" />
        <Prop name="onSelect" type="() => void" />
        <Prop name="disabled" type="boolean" />
      </Props>
      <R><Radio selected={rad===0} onSelect={() => setRad(0)} /><Radio selected={rad===1} onSelect={() => setRad(1)} /><Radio selected={false} onSelect={() => {}} disabled /></R>
    </S>

    <S title="Stepper">
      <Props>
        <Prop name="value" type="number" />
        <Prop name="min / max" type="number" def="0 / 100" />
        <Prop name="onChange" type="(val: number) => void" />
      </Props>
      <Stepper value={step} min={0} max={10} onChange={setStep} />
    </S>

    <S title="Segmented">
      <Props>
        <Prop name="options" type="string[]" />
        <Prop name="selected" type="number" />
        <Prop name="onSelect" type="(index: number) => void" />
      </Props>
      <Segmented options={['Day', 'Week', 'Month']} selected={seg} onSelect={setSeg} />
    </S>
  </>;
}

export function ChipsPage() {
  return <>
    <Import>{"import { Chip } from '@noon/design-system';"}</Import>

    <Props>
      <Prop name="children" type="string" desc="Chip label" />
      <Prop name="variant" type="'default' | 'accent' | 'signal' | 'danger' | 'ok'" def="'default'" />
      <Prop name="interactive" type="boolean" desc="Tappable" />
      <Prop name="dot" type="boolean" desc="Diamond dot before label" />
      <Prop name="disabled" type="boolean" />
      <Prop name="onPress" type="() => void" />
    </Props>

    <S title="Variants">
      <R><Chip>Default</Chip><Chip variant="accent">Accent</Chip><Chip variant="signal" dot>Signal</Chip><Chip variant="danger">Danger</Chip><Chip variant="ok">OK</Chip></R>
    </S>

    <S title="Interactive">
      <R><Chip interactive onPress={() => {}}>Tap me</Chip><Chip disabled>Disabled</Chip></R>
    </S>
  </>;
}

export function AvatarsPage() {
  return <>
    <Import>{"import { Avatar, Badge } from '@noon/design-system';"}</Import>

    <Props>
      <Prop name="initials" type="string" />
      <Prop name="size" type="'xs' | 'sm' | 'md' | 'lg' | 'xl'" def="'sm'" desc="24 / 32 / 40 / 56 / 72" />
      <Prop name="color" type="'default' | 'noon' | 'iris'" def="'default'" />
      <Prop name="star" type="boolean" desc="Gold diamond indicator" />
      <Prop name="status" type="'online' | 'busy'" desc="Status dot" />
    </Props>

    <S title="Sizes">
      <R><Avatar initials="S" size="xs" /><Avatar initials="S" size="sm" /><Avatar initials="S" size="md" /><Avatar initials="S" size="lg" /><Avatar initials="S" size="xl" /></R>
    </S>

    <S title="Colors">
      <R><Avatar initials="S" size="md" /><Avatar initials="S" size="md" color="noon" /><Avatar initials="F" size="md" color="iris" /></R>
    </S>

    <S title="Indicators">
      <R><Avatar initials="S" size="md" color="noon" star /><Avatar initials="O" size="md" status="online" /><Avatar initials="A" size="md" status="busy" /></R>
    </S>

    <S title="Badge">
      <R><Badge>3</Badge><Badge variant="accent">12</Badge><Badge variant="danger">!</Badge><Badge variant="dot" /></R>
    </S>
  </>;
}

export function CardsPage() {
  const { theme } = useTheme();
  return <>
    <Import>{"import { Card } from '@noon/design-system';"}</Import>

    <Props>
      <Prop name="children" type="ReactNode" />
      <Prop name="interactive" type="boolean" desc="Press feedback" />
      <Prop name="selected" type="boolean" desc="Accent border" />
      <Prop name="error" type="boolean" desc="Danger border" />
      <Prop name="live" type="boolean" desc="Accent start border" />
      <Prop name="loading" type="boolean" desc="0.6 opacity" />
      <Prop name="onPress" type="() => void" />
    </Props>

    <S title="Default">
      <Card><Text style={{ fontFamily: font.serif, fontSize: fs[18], color: theme.fg }}>Card title</Text></Card>
    </S>

    <S title="Interactive">
      <Card interactive onPress={() => {}}><Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fg }}>Press me</Text></Card>
    </S>

    <S title="States">
      <C label="Selected"><Card selected><Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fg }}>Selected</Text></Card></C>
      <C label="Error"><Card error><Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fg }}>Error</Text></Card></C>
      <C label="Live"><Card live><Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fg }}>Live</Text></Card></C>
      <C label="Loading"><Card loading><Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fg }}>Loading</Text></Card></C>
    </S>
  </>;
}

export function AlertsPage() {
  return <>
    <Import>{"import { Alert } from '@noon/design-system';"}</Import>

    <Props>
      <Prop name="children" type="string" desc="Alert body text" />
      <Prop name="variant" type="'info' | 'ok' | 'warn' | 'danger'" def="'info'" />
      <Prop name="title" type="string" desc="Optional bold title" />
    </Props>

    <S title="Variants">
      <C label="Info"><Alert variant="info" title="Info">General information.</Alert></C>
      <C label="OK"><Alert variant="ok" title="Success">Session completed.</Alert></C>
      <C label="Warn"><Alert variant="warn">Exam in 2 days.</Alert></C>
      <C label="Danger"><Alert variant="danger" title="Error">Something went wrong.</Alert></C>
    </S>
  </>;
}

export function SessionCardsPage() {
  return <>
    <S title="All States">
      <C label="Live"><SessionCard time="8:30" title="Storytelling" meta="Digital Media — Ms. Al-Harbi" state="live" /></C>
      <C label="Soon"><SessionCard time="10:00" title="Inference & implied meaning" meta="Qudrat Reading — Mr. Hassan" state="soon" /></C>
      <C label="Upcoming"><SessionCard time="11:30" title="Quantitative reasoning" meta="Qudrat Math — Ms. Noor" state="upcoming" statusText="3:00" /></C>
      <C label="Ended"><SessionCard time="7:00" title="Reading comprehension" meta="Qudrat Reading — Mr. Hassan" state="done" /></C>
      <C label="Cancelled"><SessionCard time="14:30" title="Crew discussion" meta="Facilitated — Omar's crew" state="cancelled" /></C>
    </S>
    <S title="Rules">
      <Rl>Live: accent dot + chip. Soon: signal-bright text. Ended: fg-muted title.</Rl>
      <Rl>Press opens bottom sheet with session details.</Rl>
    </S>
  </>;
}

export function ProgressPage() {
  return <>
    <S title="Session Bar" desc="Question-by-question results. Each segment = one question.">
      <C label="Mixed results"><SessionBar segments={['correct','correct','incorrect','correct','pending','pending','pending','pending','pending','pending']} /></C>
      <C label="All correct (large)"><SessionBar segments={['correct','correct','correct','correct','correct']} size="lg" /></C>
      <C label="Small"><SessionBar segments={['correct','incorrect','correct','correct','incorrect','correct','correct','correct']} size="sm" /></C>
    </S>
    <S title="Route Steps" desc="Diamond waypoints showing journey position.">
      <C label="In progress (3 of 5)"><RouteSteps steps={['done','done','current','incomplete','incomplete']} /></C>
      <C label="Complete"><RouteSteps steps={['done','done','done','done','done']} /></C>
      <C label="Just started (1 of 7)"><RouteSteps steps={['current','incomplete','incomplete','incomplete','incomplete','incomplete','incomplete']} /></C>
    </S>
    <S title="Linear Progress">
      <C label="76%"><LinearProgress value={76} /></C>
      <C label="100% accent"><LinearProgress value={100} color={color.noon[400]} /></C>
      <C label="25% danger"><LinearProgress value={25} color={color.danger[400]} /></C>
    </S>
    <S title="Circular Progress">
      <R><CircularProgress value={76} showValue /><CircularProgress value={100} showValue color={color.noon[400]} /><CircularProgress value={25} showValue color={color.danger[400]} /><CircularProgress value={0} showValue /></R>
    </S>
  </>;
}

export function QuizPage() {
  return <>
    <S title="All States">
      <C label="Default"><QuizOption label="A" text="The land is completely useless" /></C>
      <C label="Selected (blue — not green)"><QuizOption label="B" text="There is hidden potential despite appearances" state="selected" /></C>
      <C label="Correct (green)"><QuizOption label="B" text="There is hidden potential despite appearances" state="correct" /></C>
      <C label="Incorrect (red)"><QuizOption label="D" text="The landscape will change soon" state="incorrect" /></C>
      <C label="Disabled"><QuizOption label="C" text="The author dislikes the setting" state="disabled" /></C>
    </S>
    <S title="Rules">
      <Rl>Selected is BLUE, not green. Green = correct answer revealed.</Rl>
      <Rl>After answering, other options become disabled.</Rl>
    </S>
  </>;
}

export function TabsPage() {
  const [tab, setTab] = useState(0);
  const [seg, setSeg] = useState(0);
  const [filters, setFilters] = useState([{ label: 'All', active: true }, { label: 'Reading', active: false }, { label: 'Math', active: false }]);
  return <>
    <S title="Tabs"><Tabs tabs={['Atlas', 'Schedule', 'Crew', 'Water']} selected={tab} onSelect={setTab} /></S>
    <S title="Segmented"><Segmented options={['LTR', 'RTL']} selected={seg} onSelect={setSeg} /></S>
    <S title="Filter Bar"><FilterBar items={filters} onToggle={(i) => setFilters(filters.map((f, idx) => ({ ...f, active: idx === i })))} /></S>
  </>;
}

export function TablePage() {
  return <>
    <S title="Table">
      <Table columns={['Name', 'Score', 'Status']} rows={[['Sarah A.', '92', 'Mastered'], ['Omar K.', '61', 'In progress'], ['Farida M.', '78', 'Close'], ['Ahmed R.', '55', 'Behind']]} />
    </S>
  </>;
}

export function OverlaysPage() {
  const { theme } = useTheme();
  const [dialog, setDialog] = useState(false);
  const [dangerDialog, setDangerDialog] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [toast, setToast] = useState(false);
  return <>
    <S title="Dialog">
      <C label="Confirmation"><Button variant="secondary" onPress={() => setDialog(true)}>Open Dialog</Button></C>
      <C label="Danger"><Button variant="danger" onPress={() => setDangerDialog(true)}>Delete Dialog</Button></C>
    </S>
    <S title="Bottom Sheet">
      <C label="Auto-size"><Button variant="secondary" onPress={() => setSheet(true)}>Open Sheet</Button></C>
    </S>
    <S title="Toast">
      <C label="Success (4s auto-dismiss)"><Button variant="secondary" onPress={() => setToast(true)}>Show Toast</Button></C>
    </S>
    <Dialog visible={dialog} onClose={() => setDialog(false)} title="Are you sure?" body="This action cannot be undone." />
    <Dialog visible={dangerDialog} onClose={() => setDangerDialog(false)} title="Delete topic?" body="All practice history will be removed." danger primaryLabel="Delete" onPrimary={() => setDangerDialog(false)} />
    <BottomSheet visible={sheet} onClose={() => setSheet(false)} title="Session details">
      <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fgMuted }}>Inference & implied meaning{'\n'}Qudrat Reading — Mr. Hassan{'\n'}10:00 — 10:45</Text>
    </BottomSheet>
    <Toast message="Practice session saved" variant="ok" visible={toast} onDismiss={() => setToast(false)} />
  </>;
}

export function SkeletonPage() {
  return <>
    <S title="Skeleton Loading">
      <C label="Avatar + text">
        <R><Skeleton circle height={sp[8]} /><View style={{ flex: 1, gap: sp[2] }}><Skeleton width="60%" height={sp[3]} /><Skeleton width="90%" height={sp[2]} /><Skeleton width="40%" height={sp[2]} /></View></R>
      </C>
      <C label="Card skeleton">
        <View style={{ gap: sp[3] }}><Skeleton height={sp[4]} /><Skeleton height={sp[2]} /><Skeleton width="70%" height={sp[2]} /></View>
      </C>
    </S>
  </>;
}

export function EmptyStatePage() {
  return <>
    <S title="Empty State">
      <C label="With action"><EmptyState title="No sessions today" body="Check back tomorrow for your schedule." actionLabel="Browse topics" onAction={() => {}} /></C>
      <C label="Without action"><EmptyState title="No results" body="Try adjusting your filters." /></C>
    </S>
  </>;
}

export function TokensPage() {
  const { theme } = useTheme();
  const swatch = (c: string, name: string) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3], marginBottom: sp[2] }}>
      <View style={{ width: sp[7], height: sp[7], borderRadius: r[2], backgroundColor: c, borderWidth: 1, borderColor: theme.border }} />
      <View>
        <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.fg }}>{name}</Text>
        <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint }}>{c}</Text>
      </View>
    </View>
  );
  return <>
    <S title="Theme Colors">
      {swatch(theme.bg, 'bg')}
      {swatch(theme.bgRaised, 'bgRaised')}
      {swatch(theme.bgOverlay, 'bgOverlay')}
      {swatch(theme.fg, 'fg')}
      {swatch(theme.fgMuted, 'fgMuted')}
      {swatch(theme.fgSubtle, 'fgSubtle')}
      {swatch(theme.fgFaint, 'fgFaint')}
      {swatch(theme.accent, 'accent')}
      {swatch(theme.signal, 'signal')}
      {swatch(theme.signalBright, 'signalBright')}
      {swatch(theme.danger, 'danger')}
      {swatch(theme.border, 'border')}
      {swatch(theme.borderStrong, 'borderStrong')}
      {swatch(theme.divider, 'divider')}
    </S>
    <S title="Spacing">
      {Object.entries(sp).map(([k, v]) => <Sp key={k} label={`sp-${k}`} value={`${v}px`} />)}
    </S>
    <S title="Icon Sizes">
      {Object.entries(icon).map(([k, v]) => <Sp key={k} label={`icon-${k}`} value={`${v}px`} />)}
    </S>
    <S title="Radii">
      {Object.entries(r).map(([k, v]) => <Sp key={k} label={`r-${k}`} value={`${v}px`} />)}
    </S>
    <S title="Font Sizes">
      {Object.entries(fs).map(([k, v]) => <Sp key={k} label={`fs-${k}`} value={`${v}`} />)}
    </S>
  </>;
}
