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

// ═══════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════

export function ButtonsPage() {
  const { theme } = useTheme();
  const variants: Array<{ v: 'primary'|'secondary'|'ghost'|'danger'|'danger-solid'|'signal'; label: string }> = [
    { v: 'primary', label: 'Primary' },
    { v: 'secondary', label: 'Secondary' },
    { v: 'ghost', label: 'Ghost' },
    { v: 'danger', label: 'Danger' },
    { v: 'danger-solid', label: 'Danger Solid' },
    { v: 'signal', label: 'Signal' },
  ];
  const sizes: Array<'sm'|'md'|'lg'> = ['sm', 'md', 'lg'];
  const sizeLabels = { sm: 'Small (32)', md: 'Medium (40)', lg: 'Large (48)' };
  const arrow = <Text style={{ color: theme.fgMuted, fontSize: fs[14] }}>←</Text>;
  const plus = <Text style={{ fontSize: fs[14] }}>+</Text>;

  return <>
    {/* Every variant at default size */}
    <S title="Variants" desc="Primary for main action. Secondary for alternatives. Ghost for low-emphasis. Danger for destructive. Signal for journey actions ONLY.">
      {variants.map(({ v, label }) => (
        <C key={v} label={label}>
          <Button variant={v}>{label}</Button>
        </C>
      ))}
    </S>

    {/* Every variant × every size */}
    <S title="All Sizes" desc="Every variant shown at sm (32px), md (40px), lg (48px).">
      {variants.map(({ v, label }) => (
        <C key={v} label={label}>
          <R>
            {sizes.map(s => <Button key={s} variant={v} size={s}>{sizeLabels[s]}</Button>)}
          </R>
        </C>
      ))}
    </S>

    {/* Disabled state for every variant */}
    <S title="Disabled" desc="Every variant in disabled state.">
      <R>
        {variants.map(({ v, label }) => <Button key={v} variant={v} disabled>{label}</Button>)}
      </R>
    </S>

    {/* Loading state for every variant */}
    <S title="Loading" desc="Spinner replaces text. Button stays interactive-looking but disabled.">
      <R>
        {variants.map(({ v, label }) => <Button key={v} variant={v} loading>{label}</Button>)}
      </R>
    </S>

    {/* Block — every variant full width */}
    <S title="Block (Full Width)" desc="Every variant at full width.">
      {variants.map(({ v, label }) => (
        <View key={v} style={{ marginBottom: sp[2] }}>
          <Button variant={v} block>Full width {label.toLowerCase()}</Button>
        </View>
      ))}
    </S>

    {/* With icon */}
    <S title="With Icon" desc="Icon renders before text. For icon-only square buttons, use IconButton component.">
      <R>
        <Button variant="primary" icon={<Text style={{ color: theme.accentFg }}>+</Text>}>Add topic</Button>
        <Button variant="secondary" icon={<Text style={{ color: theme.fg }}>←</Text>}>Back</Button>
        <Button variant="ghost" icon={<Text style={{ color: theme.fgMuted }}>⋮</Text>}>More</Button>
      </R>
    </S>

    {/* Icon Buttons (separate component) */}
    <S title="Icon Button (separate component)" desc="Standalone icon-only pressable. Default has border, ghost has none.">
      <L>Variants</L>
      <R>
        <IconButton>{arrow}</IconButton>
        <IconButton variant="primary"><Text style={{ color: theme.accentFg }}>+</Text></IconButton>
        <IconButton variant="ghost"><Text style={{ color: theme.fgMuted }}>⋮</Text></IconButton>
        <IconButton variant="danger"><Text style={{ color: theme.danger }}>✕</Text></IconButton>
      </R>
      <L>Sizes</L>
      <R>
        <IconButton size="sm">{arrow}</IconButton>
        <IconButton size="md">{arrow}</IconButton>
        <IconButton size="lg"><Text style={{ color: theme.fgMuted, fontSize: fs[18] }}>←</Text></IconButton>
      </R>
      <L>Disabled</L>
      <R>
        <IconButton disabled>{arrow}</IconButton>
        <IconButton variant="primary" disabled><Text style={{ color: theme.accentFg }}>+</Text></IconButton>
      </R>
    </S>

    {/* Specs */}
    <S title="Specs">
      <Sp label="Height sm / md / lg" value="32 / 40 / 48" />
      <Sp label="Padding sm / md / lg" value="12 / 20 / 24" />
      <Sp label="Ghost padding" value="12 (tighter)" />
      <Sp label="Icon-only width" value="= height (square)" />
      <Sp label="Border radius" value="r-2 (4px)" />
      <Sp label="Font" value="sans, fs-14, fw-600" />
      <Sp label="Letter spacing" value="-0.07 (tr-snug)" />
      <Sp label="Press feedback" value="opacity 0.9, translateY 0.5" />
      <Sp label="Outline border" value="1px border-strong (secondary) / danger-border (danger)" />
    </S>

    {/* Rules */}
    <S title="Rules">
      <Rl>Primary for the single most important action on screen. One primary per view.</Rl>
      <Rl>Secondary for alternatives — "Cancel", "Back", "Skip".</Rl>
      <Rl>Ghost for low-emphasis actions in toolbars, cards, and inline contexts.</Rl>
      <Rl>Danger outline for reversible destructive actions. Danger solid for irreversible — always behind a confirmation dialog.</Rl>
      <Rl>Signal (gold) is ONLY for journey waypoint actions: mark arrival, confirm route, current position. Never for general UI.</Rl>
      <Rl>Icon-only buttons need an accessibilityLabel since there's no visible text.</Rl>
      <Rl>Loading state disables interaction and shows spinner. Text becomes transparent but keeps layout.</Rl>
    </S>
  </>;
}

export function InputsPage() {
  return <>
    <S title="Text Input">
      <C label="Default"><Input placeholder="Enter text" /></C>
      <C label="With label"><Input label="Name" placeholder="Your name" /></C>
      <C label="With value"><Input label="Email" value="nathan@noon.com" /></C>
      <C label="Error"><Input label="Email" placeholder="email@noon.com" error="Invalid email address" /></C>
      <C label="Helper text"><Input label="Password" placeholder="••••••••" helper="At least 8 characters" /></C>
      <C label="Disabled"><Input label="Locked" placeholder="Can't edit" disabled /></C>
    </S>
    <S title="Textarea">
      <C label="Default"><Textarea placeholder="Write something..." rows={3} /></C>
      <C label="With label + error"><Textarea label="Notes" placeholder="..." error="Required field" /></C>
    </S>
    <S title="Specs">
      <Sp label="Height" value="40px (input-h)" />
      <Sp label="Padding" value="sp-3 horizontal" />
      <Sp label="Border" value="1px border-strong, accent on focus" />
      <Sp label="Radius" value="r-2 (4px)" />
      <Sp label="Font" value="sans, fs-15" />
      <Sp label="Label" value="sans, fs-12, fw-500, fg-muted" />
      <Sp label="Error" value="sans, fs-12, danger" />
    </S>
  </>;
}

export function ControlsPage() {
  const [sw, setSw] = useState(true);
  const [ch, setCh] = useState(true);
  const [ch2, setCh2] = useState(false);
  const [rad, setRad] = useState(0);
  const [step, setStep] = useState(3);
  const [seg, setSeg] = useState(0);
  return <>
    <S title="Switch">
      <C label="On"><Switch value={sw} onValueChange={setSw} /></C>
      <C label="Off"><Switch value={false} onValueChange={() => {}} /></C>
      <C label="Disabled"><Switch value={true} onValueChange={() => {}} disabled /></C>
    </S>
    <S title="Checkbox">
      <R>
        <C label="Checked"><Checkbox checked={ch} onValueChange={setCh} /></C>
        <C label="Unchecked"><Checkbox checked={ch2} onValueChange={setCh2} /></C>
        <C label="Disabled"><Checkbox checked={true} onValueChange={() => {}} disabled /></C>
        <C label="Indeterminate"><Checkbox checked={false} onValueChange={() => {}} indeterminate /></C>
      </R>
    </S>
    <S title="Radio">
      <R>
        <C label="Option 1"><Radio selected={rad===0} onSelect={() => setRad(0)} /></C>
        <C label="Option 2"><Radio selected={rad===1} onSelect={() => setRad(1)} /></C>
        <C label="Disabled"><Radio selected={false} onSelect={() => {}} disabled /></C>
      </R>
    </S>
    <S title="Stepper"><Stepper value={step} min={0} max={10} onChange={setStep} /></S>
    <S title="Segmented"><Segmented options={['Day', 'Week', 'Month']} selected={seg} onSelect={setSeg} /></S>
  </>;
}

export function ChipsPage() {
  return <>
    <S title="Variants">
      <C label="Default"><Chip>Topic name</Chip></C>
      <C label="Accent (active)"><Chip variant="accent">Active filter</Chip></C>
      <C label="Signal (with dot)"><Chip variant="signal" dot>Live</Chip></C>
      <C label="Danger"><Chip variant="danger">Overdue</Chip></C>
      <C label="OK"><Chip variant="ok">Completed</Chip></C>
    </S>
    <S title="States">
      <C label="Interactive"><R><Chip interactive onPress={() => {}}>Tap me</Chip><Chip variant="accent" interactive onPress={() => {}}>Active</Chip></R></C>
      <C label="Disabled"><Chip disabled>Disabled</Chip></C>
      <C label="Wrapping"><R>{'ABCDEFGH'.split('').map(c => <Chip key={c} interactive onPress={() => {}}>Topic {c}</Chip>)}</R></C>
    </S>
    <S title="Specs">
      <Sp label="Height" value="28px" />
      <Sp label="Padding" value="sp-3 (12px)" />
      <Sp label="Gap" value="sp-2 (8px)" />
      <Sp label="Radius" value="r-1 (2px)" />
      <Sp label="Font" value="sans, fs-12, fw-500" />
      <Sp label="Border" value="1px inset, colored per variant" />
    </S>
  </>;
}

export function AvatarsPage() {
  return <>
    <S title="Sizes">
      <R><Avatar initials="S" size="xs" /><Avatar initials="S" size="sm" /><Avatar initials="S" size="md" /><Avatar initials="S" size="lg" /><Avatar initials="S" size="xl" /></R>
      <Sp label="xs / sm / md / lg / xl" value="24 / 32 / 40 / 56 / 72" />
    </S>
    <S title="Color Variants">
      <R><Avatar initials="S" size="md" /><Avatar initials="S" size="md" color="noon" /><Avatar initials="F" size="md" color="iris" /></R>
    </S>
    <S title="Indicators">
      <C label="Star (mastery)"><Avatar initials="S" size="md" color="noon" star /></C>
      <C label="Online"><Avatar initials="O" size="md" status="online" /></C>
      <C label="Busy"><Avatar initials="A" size="md" status="busy" /></C>
    </S>
    <S title="Badges">
      <R><Badge>3</Badge><Badge variant="accent">12</Badge><Badge variant="danger">!</Badge><Badge variant="dot" /></R>
    </S>
  </>;
}

export function CardsPage() {
  const { theme } = useTheme();
  const t = (s: string) => <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fg }}>{s}</Text>;
  return <>
    <S title="Variants">
      <C label="Default"><Card><Text style={{ fontFamily: font.serif, fontSize: fs[18], color: theme.fg }}>Card title</Text><Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginTop: sp[1] }}>Body text.</Text></Card></C>
      <C label="Interactive">{<Card interactive onPress={() => {}}>{t('Press for feedback')}</Card>}</C>
    </S>
    <S title="States">
      <C label="Selected"><Card selected>{t('Selected')}</Card></C>
      <C label="Error"><Card error>{t('Error')}</Card></C>
      <C label="Live"><Card live>{t('Live (accent start border)')}</Card></C>
      <C label="Loading"><Card loading>{t('Loading (0.6 opacity)')}</Card></C>
    </S>
    <S title="Specs">
      <Sp label="Background" value="bg-raised" />
      <Sp label="Border" value="1px border" />
      <Sp label="Radius" value="r-2 (4px)" />
      <Sp label="Padding" value="sp-5 / sp-6 (20 / 24)" />
    </S>
  </>;
}

export function AlertsPage() {
  return <>
    <S title="All Variants">
      <C label="Info"><Alert variant="info" title="Information">General info message.</Alert></C>
      <C label="OK / Success"><Alert variant="ok" title="Success">Session completed.</Alert></C>
      <C label="Warning"><Alert variant="warn" title="Warning">Exam in 2 days.</Alert></C>
      <C label="Danger"><Alert variant="danger" title="Error">Something went wrong.</Alert></C>
    </S>
    <S title="Without title"><Alert variant="warn">Your exam is in 2 days.</Alert></S>
    <S title="Rules">
      <Rl>Background is always bg-raised. Variant only changes border color.</Rl>
      <Rl>Title optional. Body required.</Rl>
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
