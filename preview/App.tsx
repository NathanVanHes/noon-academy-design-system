import React, { useState, useRef } from 'react';
import { ScrollView, View, Text, StatusBar, Pressable, Animated, Modal, Dimensions, useWindowDimensions, I18nManager, Platform } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { CrimsonPro_300Light, CrimsonPro_400Regular, CrimsonPro_500Medium, CrimsonPro_600SemiBold, CrimsonPro_700Bold } from '@expo-google-fonts/crimson-pro';
import { JetBrainsMono_300Light, JetBrainsMono_400Regular, JetBrainsMono_500Medium, JetBrainsMono_600SemiBold, JetBrainsMono_700Bold } from '@expo-google-fonts/jetbrains-mono';
import { Vazirmatn_300Light, Vazirmatn_400Regular, Vazirmatn_500Medium, Vazirmatn_600SemiBold, Vazirmatn_700Bold } from '@expo-google-fonts/vazirmatn';
import { ThemeProvider, useTheme, Segmented, sp, fs, fw, font, r } from '../rn';
import {
  // Foundation
  OverviewPage, BrandPage, ColorsPage, TypographyPage, SpacingPage, RadiiPage, ElevationPage, MotionPage, GridSystemPage,
  // Graphical
  IconsPage, GridPaperPage, WaypointsPage, WaterVesselPage, ContoursPage, DunePatternPage, VoiceTutorPage,
  // Actions
  ButtonsPage, IconButtonPage,
  // Inputs
  InputPage, TextareaPage, StepperPage, CheckboxPage, RadioPage, SwitchPage, SegmentedPage,
  // Selection
  ChipsPage, QuizPage, FilterBarPage, MenuPage, CalendarPage,
  // Questions
  MatchPage, CategorizePage, OrderPage, FillBlanksPage, HotspotPage,
  // Display
  CardsPage, AvatarsPage, IdentityPage, BadgesPage, TablePage, SessionCardPage, HomeworkCardPage, VideoPage,
  // Progress
  SessionBarPage, ProgressPage,
  // Navigation
  TitleBarPage, TabsPage, BottomNavPage, BottomActionPage, BreadcrumbsPage, PaginationPage, SideNavPage,
  // Feedback
  AlertsPage, ToastPage, DialogPage, ModalPage, BottomSheetPage, FullSheetPage, TooltipPage, PopoversPage,
  // Layout
  InterstitialPage, FormStackPage, EmptyStatePage, SkeletonPage, DropzonePage, DividerPage,
  // Patterns
  VoiceChatPage, LeaderboardPage, OasisPage, RouteMapPage,
  BreakdownPage, ActivityCardPage, WorkedExamplePage, SlidesCardPage, ResourceListPage,
} from './screens/pages';
import { VoiceTutorSession } from './screens/VoiceTutorSession';
import { JourneyPage } from './screens/JourneyPage';

// ─── Nav structure — mirrors index.html exactly ───
const NAV = [
  { group: 'Foundation', items: [
    { id: 'overview', label: 'Overview' },
    { id: 'brand', label: 'Brand' },
    { id: 'colors', label: 'Colors' },
    { id: 'typography', label: 'Typography' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'radii', label: 'Radii' },
    { id: 'elevation', label: 'Elevation' },
    { id: 'motion', label: 'Motion' },
    { id: 'gridsystem', label: 'Grid System' },
    { id: 'icons', label: 'Icons' },
  ]},
  { group: 'Surfaces', items: [
    { id: 'gridpaper', label: 'Grid Paper' },
    { id: 'contours', label: 'Terrain Patterns' },
    { id: 'dunepattern', label: 'Dune Pattern' },
  ]},
  { group: 'Actions', items: [
    { id: 'buttons', label: 'Buttons' },
    { id: 'iconbtn', label: 'Icon Button' },
  ]},
  { group: 'Inputs', items: [
    { id: 'inputs', label: 'Text Input' },
    { id: 'textarea', label: 'Textarea' },
    { id: 'stepper', label: 'Stepper' },
    { id: 'checkbox', label: 'Checkbox' },
    { id: 'radio', label: 'Radio' },
    { id: 'switch', label: 'Switch' },
    { id: 'segmented', label: 'Segmented' },
  ]},
  { group: 'Selection', items: [
    { id: 'chips', label: 'Chips' },
    { id: 'filterbar', label: 'Filter Bar' },
    { id: 'menu', label: 'Menu' },
    { id: 'calendar', label: 'Calendar' },
  ]},
  { group: 'Questions', items: [
    { id: 'quizoption', label: 'Multiple Choice' },
    { id: 'match', label: 'Match' },
    { id: 'categorize', label: 'Categorize' },
    { id: 'order', label: 'Order' },
    { id: 'fillblanks', label: 'Fill Blanks' },
    { id: 'hotspot', label: 'Image Hotspot' },
  ]},
  { group: 'Display', items: [
    { id: 'cards', label: 'Cards' },
{ id: 'avatars', label: 'Avatars' },
    { id: 'identity', label: 'Identity' },
    { id: 'badges', label: 'Badges' },
    { id: 'tables', label: 'Tables' },
    { id: 'sessioncard', label: 'Session Card' },
    { id: 'homeworkcard', label: 'Homework Card' },
    { id: 'video', label: 'Video Card' },
  ]},
  { group: 'Progress', items: [
    { id: 'waypoints', label: 'Waypoints' },
    { id: 'watervessel', label: 'Water Vessel' },
    { id: 'sessionbar', label: 'Session Bar' },
    { id: 'progress', label: 'Linear & Circular' },
  ]},
  { group: 'Navigation', items: [
    { id: 'titlebar', label: 'Title Bar' },
    { id: 'tabs', label: 'Tabs' },
    { id: 'bottomnav', label: 'Bottom Nav' },
    { id: 'bottomaction', label: 'Bottom Action' },
    { id: 'breadcrumbs', label: 'Breadcrumbs' },
    { id: 'pagination', label: 'Pagination' },
    { id: 'sidenav', label: 'Side Nav' },
  ]},
  { group: 'Feedback', items: [
    { id: 'alerts', label: 'Alerts' },
    { id: 'toasts', label: 'Toasts' },
    { id: 'dialogs', label: 'Dialogs' },
    { id: 'modal', label: 'Modal' },
    { id: 'bottomsheet', label: 'Bottom Sheet' },
    { id: 'fullsheet', label: 'Full Sheet' },
    { id: 'tooltips', label: 'Tooltips' },
    { id: 'popovers', label: 'Popovers' },
  ]},
  { group: 'Layout', items: [
    { id: 'interstitial', label: 'Interstitial' },
    { id: 'formstack', label: 'Form Stack' },
    { id: 'empty', label: 'Empty State' },
    { id: 'skeleton', label: 'Skeleton' },
    { id: 'dropzone', label: 'Dropzone' },
    { id: 'divider', label: 'Divider' },
  ]},
  { group: 'Voice Tutor', items: [
    { id: 'voicetutor', label: 'Tutor Aura' },
    { id: 'voicechat', label: 'Chat Transcript' },
    { id: 'breakdown', label: 'Breakdown' },
    { id: 'activitycard', label: 'Activity' },
    { id: 'workedexample', label: 'Worked Example' },
    { id: 'slidescard', label: 'Slides' },
    { id: 'resourcelist', label: 'Resources' },
    { id: 'vtsession', label: 'Live Demo' },
  ]},
  { group: 'Patterns', items: [
    { id: 'leaderboard', label: 'Leaderboard' },
  ]},
  { group: 'Experimental', items: [
    { id: 'oasis', label: 'Oasis' },
    { id: 'routemap', label: 'Route Map' },
  ]},
  { group: 'Pages', items: [
    { id: 'journey', label: 'Journey' },
  ]},
];

const PAGES: Record<string, { component: React.FC<any>; desc: string; fullscreen?: boolean }> = {
  overview:     { component: OverviewPage, desc: 'The Proven Routes — a Saudi-native design system.' },
  brand:        { component: BrandPage, desc: 'The core principles that govern every design decision.' },
  colors:       { component: ColorsPage, desc: 'Primitives are raw values; semantics map intent to surface.' },
  typography:   { component: TypographyPage, desc: 'Four typefaces, each with a clear role.' },
  spacing:      { component: SpacingPage, desc: 'The spatial scale for padding, margins, and gaps.' },
  radii:        { component: RadiiPage, desc: 'Corner radius values by component type.' },
  elevation:    { component: ElevationPage, desc: 'Visual depth levels via borders and shadows.' },
  motion:       { component: MotionPage, desc: 'Curves, durations, and animation principles.' },
  gridsystem:   { component: GridSystemPage, desc: 'Layout primitives using flexbox and token spacing.' },
  icons:        { component: IconsPage, desc: 'Custom SVG icon set with size and colour tokens.' },
  gridpaper:    { component: GridPaperPage, desc: 'Dotted grid background surface texture.' },
  waypoints:    { component: WaypointsPage, desc: 'Diamond-shaped markers for routes, progress, and important events.' },
  watervessel:  { component: WaterVesselPage, desc: 'Visual metaphor for proof-of-work.' },
  contours:     { component: ContoursPage, desc: 'Topographic contour lines for difficulty and mastery.' },
  dunepattern:  { component: DunePatternPage, desc: 'Geometric desert ridgelines with gold gradients.' },
  voicetutor:   { component: VoiceTutorPage, desc: 'Iris presence indicator — breathing, listening, speaking states.' },
  buttons:      { component: ButtonsPage, desc: 'Primary action triggers with six variants.' },
  iconbtn:      { component: IconButtonPage, desc: 'Square icon-only pressable.' },
  inputs:       { component: InputPage, desc: 'Single-line text entry with label and validation.' },
  textarea:     { component: TextareaPage, desc: 'Multi-line text entry.' },
  stepper:      { component: StepperPage, desc: 'Increment and decrement a numeric value.' },
  checkbox:     { component: CheckboxPage, desc: 'Binary toggle with indeterminate state.' },
  radio:        { component: RadioPage, desc: 'Single selection from a group.' },
  switch:       { component: SwitchPage, desc: 'On/off toggle.' },
  segmented:    { component: SegmentedPage, desc: 'Mutually exclusive options in a row.' },
  chips:        { component: ChipsPage, desc: 'Compact labels for filtering and status.' },
  quizoption:   { component: QuizPage, desc: 'Single or multiple answer selection with correct/incorrect feedback.' },
  match:        { component: MatchPage, desc: 'Drag items to their matching targets (1:1).' },
  categorize:   { component: CategorizePage, desc: 'Drag items into category buckets (many:1).' },
  order:        { component: OrderPage, desc: 'Drag items into the correct sequence.' },
  fillblanks:   { component: FillBlanksPage, desc: 'Drag words into blanks within a sentence.' },
  hotspot:      { component: HotspotPage, desc: 'Drag labels onto marked regions of an image.' },
  filterbar:    { component: FilterBarPage, desc: 'Horizontal filter pills.' },
  menu:         { component: MenuPage, desc: 'Contextual dropdown menu.' },
  calendar:     { component: CalendarPage, desc: 'Date picker with day grid.' },
  cards:        { component: CardsPage, desc: 'Container for grouped content.' },
avatars:      { component: AvatarsPage, desc: 'User identity with initials and indicators.' },
  identity:     { component: IdentityPage, desc: 'User profile display with avatar and metadata.' },
  badges:       { component: BadgesPage, desc: 'Numeric or dot indicator.' },
  tables:       { component: TablePage, desc: 'Columnar data display.' },
  sessioncard:  { component: SessionCardPage, desc: 'Scheduled session with live/soon/done states.' },
  homeworkcard: { component: HomeworkCardPage, desc: 'Homework assignment with due date, status, and question count.' },
  video:        { component: VideoPage, desc: 'Thumbnail card for video content with play button and attribution.' },
  sessionbar:   { component: SessionBarPage, desc: 'Question-by-question results bar.' },
  progress:     { component: ProgressPage, desc: 'Linear and circular progress indicators.' },
  titlebar:     { component: TitleBarPage, desc: 'Screen header with back and actions.' },
  tabs:         { component: TabsPage, desc: 'Horizontal tab navigation.' },
  bottomnav:    { component: BottomNavPage, desc: 'App-level bottom navigation.' },
  bottomaction: { component: BottomActionPage, desc: 'Fixed bottom tray for primary actions.' },
  breadcrumbs:  { component: BreadcrumbsPage, desc: 'Horizontal path trail — web/tablet only.' },
  pagination:   { component: PaginationPage, desc: 'Page number navigation — web/tablet only.' },
  sidenav:      { component: SideNavPage, desc: 'Persistent sidebar — desktop/tablet only.' },
  alerts:       { component: AlertsPage, desc: 'Inline status messages.' },
  toasts:       { component: ToastPage, desc: 'Temporary notification overlay.' },
  dialogs:      { component: DialogPage, desc: 'Confirmation and destructive action modals.' },
  modal:        { component: ModalPage, desc: 'Full-screen overlay wrapping Dialog.' },
  bottomsheet:  { component: BottomSheetPage, desc: 'Slide-up content panel.' },
  fullsheet:    { component: FullSheetPage, desc: 'Full-screen modal with close button.' },
  tooltips:     { component: TooltipPage, desc: 'Contextual help on long press.' },
  popovers:     { component: PopoversPage, desc: 'Contextual content anchored to trigger.' },
  interstitial: { component: InterstitialPage, desc: 'Full-screen transition or celebration.' },
  formstack:    { component: FormStackPage, desc: 'Vertical form field layout pattern.' },
  empty:        { component: EmptyStatePage, desc: 'Placeholder when no content is available.' },
  skeleton:     { component: SkeletonPage, desc: 'Loading placeholder shapes.' },
  dropzone:     { component: DropzonePage, desc: 'Drag-and-drop upload — web only.' },
  divider:      { component: DividerPage, desc: 'Horizontal rule between content.' },
  voicechat:    { component: VoiceChatPage, desc: 'Tutor and student message bubbles for voice conversations.' },
  breakdown:    { component: BreakdownPage, desc: 'Bulleted summary card with iris dots.' },
  activitycard: { component: ActivityCardPage, desc: 'CTA card for launching exercises.' },
  workedexample:{ component: WorkedExamplePage, desc: 'Step-by-step walkthrough that opens in a FullSheet.' },
  slidescard:   { component: SlidesCardPage, desc: 'Class slide viewer with prev/next navigation.' },
  resourcelist: { component: ResourceListPage, desc: 'Link list for external materials.' },
  vtsession:    { component: VoiceTutorSession, desc: 'Animated trig session demo.', fullscreen: true },
  leaderboard:  { component: LeaderboardPage, desc: 'Ranked crew member list.' },
  oasis:        { component: OasisPage, desc: 'Water pool checkpoint — replaces WaterVessel for journey metaphor.' },
  routemap:     { component: RouteMapPage, desc: 'Vertical journey with central spine, oases, and topic markers.', fullscreen: true },
  journey:      { component: JourneyPage, desc: 'Qudrat exam journey visualisation.', fullscreen: true },
};

const allItems = NAV.flatMap(g => g.items);
function labelFor(id: string) { return allItems.find(i => i.id === id)?.label ?? id; }
function groupFor(id: string) { return NAV.find(g => g.items.some(i => i.id === id))?.group ?? ''; }

// ─── Nav List (shared between sidebar and drawer) ───
function NavList({ current, onSelect, rtl }: { current: string; onSelect: (id: string) => void; rtl: boolean }) {
  const { theme } = useTheme();
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: sp[10] }}>
      {NAV.map(group => (
        <View key={group.group} style={{ paddingHorizontal: sp[3], marginBottom: sp[4] }}>
          <Text style={{ fontFamily: font.sans, fontSize: fs[10], letterSpacing: 2, textTransform: 'uppercase', fontWeight: fw[600], color: theme.fgFaint, paddingHorizontal: sp[3], paddingBottom: sp[2], textAlign: rtl ? 'right' : 'left' }}>{group.group}</Text>
          {group.items.map(item => (
            <Pressable
              key={item.id}
              onPress={() => onSelect(item.id)}
              style={{
                paddingVertical: sp[2],
                paddingHorizontal: sp[3],
                borderRadius: r[1],
                backgroundColor: item.id === current ? theme.activeOverlay : 'transparent',
                marginBottom: 1,
              }}
            >
              <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: item.id === current ? theme.fg : theme.fgMuted, textAlign: rtl ? 'right' : 'left' }}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

// ─── Nav Drawer (mobile) ───
function NavDrawer({ current, onSelect, onClose, rtl }: { current: string; onSelect: (id: string) => void; onClose: () => void; rtl: boolean }) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={{ flex: 1, flexDirection: 'row' }} onPress={onClose}>
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{
            width: 280,
            backgroundColor: theme.bgSunken,
            paddingTop: insets.top + sp[3],
            ...(rtl
              ? { borderLeftWidth: 1, borderLeftColor: theme.border }
              : { borderRightWidth: 1, borderRightColor: theme.border }),
          }}
        >
          <View style={{ paddingHorizontal: sp[5], paddingBottom: sp[5], borderBottomWidth: 1, borderBottomColor: theme.border, marginBottom: sp[4] }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: sp[2] }}>
              <Text style={{ fontFamily: font.serif, fontWeight: fw[500], fontSize: fs[20], color: theme.fg, letterSpacing: -0.3 }}>Proven Routes</Text>
              <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.fgFaint }}>v1.0</Text>
            </View>
          </View>
          <NavList current={current} onSelect={(id) => { onSelect(id); onClose(); }} rtl={rtl} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// ─── Sidebar (web/wide) ───
function Sidebar({ current, onSelect, rtl }: { current: string; onSelect: (id: string) => void; rtl: boolean }) {
  const { theme } = useTheme();
  return (
    <View style={{
      width: 256,
      backgroundColor: theme.bgSunken,
      ...(rtl
        ? { borderLeftWidth: 1, borderLeftColor: theme.border }
        : { borderRightWidth: 1, borderRightColor: theme.border }),
    }}>
      <View style={{ paddingHorizontal: sp[5], paddingTop: sp[6], paddingBottom: sp[5], borderBottomWidth: 1, borderBottomColor: theme.border, marginBottom: sp[4] }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: sp[2] }}>
          <Text style={{ fontFamily: font.serif, fontWeight: fw[500], fontSize: fs[20], color: theme.fg, letterSpacing: -0.3 }}>Proven Routes</Text>
          <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.fgFaint }}>v1.0</Text>
        </View>
      </View>
      <NavList current={current} onSelect={onSelect} rtl={rtl} />
    </View>
  );
}

// ─── RTL toggle pill ───
function RTLToggle({ isRTL, onToggle }: { isRTL: boolean; onToggle: () => void }) {
  const { theme } = useTheme();
  return (
    <Pressable onPress={onToggle} style={{ paddingVertical: 3, paddingHorizontal: 8, borderRadius: r[1], borderWidth: 1, borderColor: isRTL ? theme.accent : theme.border, backgroundColor: isRTL ? theme.accentSoft : 'transparent' }}>
      <Text style={{ fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: isRTL ? theme.accent : theme.fgSubtle }}>RTL</Text>
    </Pressable>
  );
}

// ─── Explorer ───
function Explorer() {
  const { theme, mode, setMode } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const wide = width >= 768;
  const [currentPage, setCurrentPage] = useState('overview');
  const [navOpen, setNavOpen] = useState(false);
  const [isRTL, setIsRTL] = useState(I18nManager.isRTL);

  // On web, document.dir='rtl' handles flex reversal automatically.
  // On native, I18nManager handles it. No manual row-reverse needed.
  const row = 'row' as const;
  const textAlign = isRTL ? 'right' as const : 'left' as const;

  function toggleRTL() {
    const next = !isRTL;
    setIsRTL(next);
    I18nManager.forceRTL(next);
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.documentElement.dir = next ? 'rtl' : 'ltr';
      // Inject global CSS to force all RN text elements to inherit direction
      let style = document.getElementById('rtl-override');
      if (next) {
        if (!style) {
          style = document.createElement('style');
          style.id = 'rtl-override';
          document.head.appendChild(style);
        }
        style.textContent = '[dir="rtl"] * { text-align: right !important; direction: rtl !important; } [dir="rtl"] [data-ltr], [dir="rtl"] [data-ltr] * { text-align: left !important; direction: ltr !important; }';
      } else if (style) {
        style.remove();
      }
    }
  }

  const page = PAGES[currentPage];
  const PageComponent = page?.component;
  const label = labelFor(currentPage);

  if (page?.fullscreen) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.bg }}>
        <StatusBar barStyle={mode === 'void' ? 'light-content' : 'dark-content'} />
        {PageComponent && <PageComponent onClose={() => setCurrentPage('voicetutor')} />}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, flexDirection: wide ? row : 'column', paddingTop: wide ? 0 : insets.top }}>
      <StatusBar barStyle={mode === 'void' ? 'light-content' : 'dark-content'} />

      {/* Sidebar on wide screens */}
      {wide && <Sidebar current={currentPage} onSelect={setCurrentPage} rtl={isRTL} />}

      {/* Main content */}
      <View style={{ flex: 1 }}>
        {/* Top bar */}
        {wide ? (
          <View style={{ flexDirection: row, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: sp[7], paddingVertical: sp[3], borderBottomWidth: 1, borderBottomColor: theme.border }}>
            <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted }}>{groupFor(currentPage)}</Text>
            <View style={{ flexDirection: row, alignItems: 'center', gap: sp[3] }}>
              <RTLToggle isRTL={isRTL} onToggle={toggleRTL} />
              <Segmented options={['Void', 'Paper']} selected={mode === 'void' ? 0 : 1} onSelect={(i) => setMode(i === 0 ? 'void' : 'paper')} size="sm" />
            </View>
          </View>
        ) : (
          <View style={{ flexDirection: row, alignItems: 'center', gap: sp[3], paddingHorizontal: sp[5], paddingVertical: sp[3], borderBottomWidth: 1, borderBottomColor: theme.border }}>
            <Pressable onPress={() => setNavOpen(true)} hitSlop={8}>
              <View style={{ width: 18, height: 14, justifyContent: 'space-between' }}>
                <View style={{ height: 1.5, backgroundColor: theme.fgMuted, borderRadius: 1 }} />
                <View style={{ height: 1.5, backgroundColor: theme.fgMuted, borderRadius: 1 }} />
                <View style={{ height: 1.5, backgroundColor: theme.fgMuted, borderRadius: 1, width: 12 }} />
              </View>
            </Pressable>
            <Text style={{ fontFamily: font.serif, fontSize: fs[18], color: theme.fg, flex: 1, letterSpacing: -0.3, textAlign }} numberOfLines={1}>
              {label}
            </Text>
            <RTLToggle isRTL={isRTL} onToggle={toggleRTL} />
            <Segmented options={['Void', 'Paper']} selected={mode === 'void' ? 0 : 1} onSelect={(i) => setMode(i === 0 ? 'void' : 'paper')} size="sm" />
          </View>
        )}

        {/* Page header */}
        <View style={{ paddingHorizontal: wide ? sp[7] : sp[5], paddingTop: sp[7], paddingBottom: sp[5], borderBottomWidth: 1, borderBottomColor: theme.border, ...(Platform.OS === 'web' ? { direction: isRTL ? 'rtl' : 'ltr' } : {}) } as any}>
          <Text style={{ fontFamily: font.serif, fontSize: fs[32], fontWeight: fw[400], color: theme.fg, letterSpacing: -0.5, marginBottom: sp[1], textAlign }}>{label}</Text>
          {page?.desc ? <Text style={{ fontFamily: font.serif, fontStyle: 'italic', color: theme.fgSubtle, fontSize: fs[14], textAlign }}>{page.desc}</Text> : null}
        </View>

        {/* Page content */}
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: wide ? sp[7] : sp[5], paddingBottom: sp[12], ...(Platform.OS === 'web' ? { direction: isRTL ? 'rtl' : 'ltr' } : {}) } as any}>
          {PageComponent && <PageComponent />}
        </ScrollView>
      </View>

      {/* Drawer on mobile */}
      {!wide && navOpen && <NavDrawer current={currentPage} onSelect={setCurrentPage} onClose={() => setNavOpen(false)} rtl={isRTL} />}
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    CrimsonPro: CrimsonPro_400Regular,
    'CrimsonPro-Light': CrimsonPro_300Light,
    'CrimsonPro-Medium': CrimsonPro_500Medium,
    'CrimsonPro-SemiBold': CrimsonPro_600SemiBold,
    'CrimsonPro-Bold': CrimsonPro_700Bold,
    Vazirmatn: Vazirmatn_400Regular,
    'Vazirmatn-Light': Vazirmatn_300Light,
    'Vazirmatn-Medium': Vazirmatn_500Medium,
    'Vazirmatn-SemiBold': Vazirmatn_600SemiBold,
    'Vazirmatn-Bold': Vazirmatn_700Bold,
    JetBrainsMono: JetBrainsMono_400Regular,
    'JetBrainsMono-Light': JetBrainsMono_300Light,
    'JetBrainsMono-Medium': JetBrainsMono_500Medium,
    'JetBrainsMono-SemiBold': JetBrainsMono_600SemiBold,
    'JetBrainsMono-Bold': JetBrainsMono_700Bold,
  });
  if (!fontsLoaded) return null;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider initial="void">
          <Explorer />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
