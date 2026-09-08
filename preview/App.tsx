import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, StatusBar, Pressable, Animated, Modal, Dimensions, useWindowDimensions, I18nManager, Platform } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { CrimsonPro_300Light, CrimsonPro_400Regular, CrimsonPro_500Medium, CrimsonPro_600SemiBold, CrimsonPro_700Bold } from '@expo-google-fonts/crimson-pro';
import { JetBrainsMono_300Light, JetBrainsMono_400Regular, JetBrainsMono_500Medium, JetBrainsMono_600SemiBold, JetBrainsMono_700Bold } from '@expo-google-fonts/jetbrains-mono';
import { Vazirmatn_300Light, Vazirmatn_400Regular, Vazirmatn_500Medium, Vazirmatn_600SemiBold, Vazirmatn_700Bold } from '@expo-google-fonts/vazirmatn';
import { ThemeProvider, useTheme, Segmented, sp, fs, fw, font, r } from '../rn';
import {
  // Foundation
  OverviewPage, BrandPage, ColorsPage, TypographyPage, SpacingPage, RadiiPage, ElevationPage, MotionPage, GridSystemPage, ScreenLayoutPage,
  // Graphical
  IconsPage, GridPaperPage, WaypointsPage, ContoursPage, DunePatternPage, ConstellationPage, DuneDynamicPage, StarsDynamicPage, TerrainDynamicPage, VoiceTutorPage,
  FacetPage, KhatamPage, PinboardPage,
  // Actions
  ButtonsPage, IconButtonPage,
  // Inputs
  InputPage, TextareaPage, StepperPage, CheckboxPage, RadioPage, SwitchPage, SegmentedPage, SliderPage, SearchInputPage, PinInputPage, RatingPage,
  // Selection
  ChipsPage, QuizPage, FilterBarPage, MenuPage, CalendarPage,
  // Questions
  MatchPage, CategorizePage, OrderPage, FillBlanksPage, HotspotPage, ResultReviewPage,
  // Display
  CardsPage, HeroCardPage, StatCardPage, AvatarsPage, AvatarGroupPage, IdentityPage, BadgesPage, TablePage, SessionCardPage, HomeworkCardPage, VideoPage,
  // Progress
  SessionBarPage, ProgressPage, LinearProgressPage, CircularProgressPage, TimerPage, StreakPage,
  // In class
  VideoTilePage, ClassToolbarPage, LivePromptPage, ChatComposerPage,
  // Navigation
  TitleBarPage, TabsPage, BottomNavPage, BottomActionPage, BreadcrumbsPage, PaginationPage, NavRailPage, NotificationBellPage, BackButtonPage,
  // Feedback
  AlertsPage, ToastPage, DialogPage, ModalPage, BottomSheetPage, FullSheetPage, TooltipPage, PopoversPage,
  // Layout
  InterstitialPage, FormStackPage, EmptyStatePage, SkeletonPage, DropzonePage, DividerPage,
  // Patterns
  VoiceChatPage, LeaderboardPage, OasisPage, RouteMapPage,
  BreakdownPage, ActivityCardPage, WorkedExamplePage, SlidesCardPage, ResourceListPage,
  // New
  ListRowPage, PhoneInputPage, SelectPage, TemplatesPage, AIPromptPage,
} from './screens/pages';
import { VoiceTutorSession } from './screens/VoiceTutorSession';

// ─── Nav structure — mirrors index.html exactly ───
const NAV = [
  { group: 'Foundation', items: [
    { id: 'overview', label: 'Overview' },
    { id: 'aiprompt', label: 'Build with AI' },
    { id: 'brand', label: 'Brand' },
    { id: 'colors', label: 'Colors' },
    { id: 'typography', label: 'Typography' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'radii', label: 'Radii' },
    { id: 'elevation', label: 'Elevation' },
    { id: 'motion', label: 'Motion' },
    { id: 'gridsystem', label: 'Grid System' },
    { id: 'screenlayout', label: 'Screen Layout' },
    { id: 'icons', label: 'Icons' },
  ]},
  { group: 'Templates', items: [
    { id: 'templates', label: 'Templates' },
  ]},
  // { group: 'Textures', items: [
  //   { id: 'gridpaper', label: 'Grid Paper' },
  //   { id: 'contours', label: 'Terrain Lines' },
  // ]},
  { group: 'Patterns', items: [
    { id: 'gridpaper', label: 'Grid Paper' },
    { id: 'dunedynamic', label: 'Dune Field' },
    { id: 'starsdynamic', label: 'Star Field' },
    { id: 'terraindynamic', label: 'Terrain Field' },
    { id: 'facet', label: 'Facet' },
    { id: 'khatam', label: 'Khatam' },
    { id: 'pinboard', label: 'Pinboard' },
  ]},
  { group: 'Actions', items: [
    { id: 'buttons', label: 'Buttons' },
    { id: 'iconbtn', label: 'Icon Button' },
  ]},
  { group: 'Inputs', items: [
    { id: 'inputs', label: 'Text Input' },
    { id: 'select', label: 'Select' },
    { id: 'textarea', label: 'Textarea' },
    { id: 'stepper', label: 'Stepper' },
    { id: 'checkbox', label: 'Checkbox' },
    { id: 'radio', label: 'Radio' },
    { id: 'switch', label: 'Switch' },
    { id: 'segmented', label: 'Segmented' },
    { id: 'slider', label: 'Slider' },
    { id: 'searchinput', label: 'Search' },
    { id: 'pininput', label: 'PIN Input' },
    { id: 'phoneinput', label: 'Phone Input' },
    { id: 'rating', label: 'Rating' },
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
    { id: 'resultreview', label: 'Result Review' },
  ]},
  { group: 'Display', items: [
    { id: 'cards', label: 'Cards' },
    { id: 'herocard', label: 'Hero Card' },
    { id: 'statcard', label: 'Stat Card' },
    { id: 'avatars', label: 'Avatars' },
    { id: 'avatargroup', label: 'Avatar Group' },
    { id: 'identity', label: 'Identity' },
    { id: 'listrow', label: 'List Row' },
    { id: 'badges', label: 'Badges' },
    { id: 'tables', label: 'Tables' },
    { id: 'sessioncard', label: 'Session Card' },
    { id: 'homeworkcard', label: 'Homework Card' },
    { id: 'video', label: 'Video Card' },
  ]},
  { group: 'Progress', items: [
    { id: 'waypoints', label: 'Waypoints' },
    { id: 'oasis', label: 'Oasis' },
    { id: 'sessionbar', label: 'Session Bar' },
    { id: 'linearprogress', label: 'Linear Progress' },
    { id: 'circularprogress', label: 'Circular Progress' },
    { id: 'timer', label: 'Timer' },
    { id: 'streak', label: 'Streak' },
  ]},
  { group: 'In Class', items: [
    { id: 'videotile', label: 'Video Tile' },
    { id: 'classtoolbar', label: 'Class Toolbar' },
    { id: 'liveprompt', label: 'Live Prompt' },
    { id: 'chatcomposer', label: 'Chat Composer' },
  ]},
  { group: 'Navigation', items: [
    { id: 'titlebar', label: 'Title Bar' },
    { id: 'tabs', label: 'Tabs' },
    { id: 'bottomnav', label: 'Bottom Nav' },
    { id: 'bottomaction', label: 'Bottom Action' },
    { id: 'breadcrumbs', label: 'Breadcrumbs' },
    { id: 'pagination', label: 'Pagination' },
    { id: 'navrail', label: 'Nav Rail' },
    { id: 'notificationbell', label: 'Notifications' },
    { id: 'backbutton', label: 'Back Button' },
  ]},
  { group: 'Feedback', items: [
    { id: 'alerts', label: 'Alerts' },
    { id: 'toasts', label: 'Toasts' },
    { id: 'dialogs', label: 'Dialogs' },
    { id: 'bottomsheet', label: 'Bottom Sheet' },
    { id: 'fullsheet', label: 'Full Sheet' },
    { id: 'tooltips', label: 'Tooltips' },
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
  { group: 'Composition', items: [
    { id: 'leaderboard', label: 'Leaderboard' },
  ]},
];

const PAGES: Record<string, { component: React.FC<any>; desc: string; fullscreen?: boolean }> = {
  overview:     { component: OverviewPage, desc: 'The Proven Routes — a Saudi-native design system.' },
  aiprompt:     { component: AIPromptPage, desc: 'Copy-paste system prompt — everything an AI builder needs to use this system.' },
  brand:        { component: BrandPage, desc: 'The core principles that govern every design decision.' },
  colors:       { component: ColorsPage, desc: 'Primitives are raw values; semantics map intent to surface.' },
  typography:   { component: TypographyPage, desc: 'Four typefaces, each with a clear role.' },
  spacing:      { component: SpacingPage, desc: 'The spatial scale for padding, margins, and gaps.' },
  radii:        { component: RadiiPage, desc: 'Corner radius values by component type.' },
  elevation:    { component: ElevationPage, desc: 'Visual depth levels via borders and shadows.' },
  motion:       { component: MotionPage, desc: 'Curves, durations, and animation principles.' },
  gridsystem:   { component: GridSystemPage, desc: 'Layout primitives using flexbox and token spacing.' },
  screenlayout: { component: ScreenLayoutPage, desc: 'Cross-device reference — breakpoints, container, columns, nav placement, safe areas.' },
  icons:        { component: IconsPage, desc: 'Custom SVG icon set with size and colour tokens.' },
  gridpaper:    { component: GridPaperPage, desc: 'Dotted grid background surface texture.' },
  waypoints:    { component: WaypointsPage, desc: 'Diamond-shaped markers for routes, progress, and important events.' },
  contours:     { component: ContoursPage, desc: 'Topographic contour lines for difficulty and mastery.' },
  dunedynamic:    { component: DuneDynamicPage, desc: 'Animated particle dune field.' },
  starsdynamic:   { component: StarsDynamicPage, desc: 'Animated starfield with proximity connections.' },
  terraindynamic: { component: TerrainDynamicPage, desc: 'Animated topographic contour field.' },
  facet:        { component: FacetPage, desc: 'Faceted terracotta wall — arrival and hero surfaces.' },
  khatam:       { component: KhatamPage, desc: 'Eight-point star lattice — earned moments only.' },
  pinboard:     { component: PinboardPage, desc: 'Dot grid for maps and presence — dots are binary.' },
  voicetutor:   { component: VoiceTutorPage, desc: 'Iris presence indicator — breathing, listening, speaking states.' },
  buttons:      { component: ButtonsPage, desc: 'Primary action triggers with six variants.' },
  iconbtn:      { component: IconButtonPage, desc: 'Square icon-only pressable.' },
  inputs:       { component: InputPage, desc: 'Single-line text entry with label and validation.' },
  select:       { component: SelectPage, desc: 'Single-choice field — options open in a BottomSheet.' },
  textarea:     { component: TextareaPage, desc: 'Multi-line text entry.' },
  stepper:      { component: StepperPage, desc: 'Increment and decrement a numeric value.' },
  checkbox:     { component: CheckboxPage, desc: 'Binary toggle with indeterminate state.' },
  radio:        { component: RadioPage, desc: 'Single selection from a group.' },
  switch:       { component: SwitchPage, desc: 'On/off toggle.' },
  segmented:    { component: SegmentedPage, desc: 'Mutually exclusive options in a row.' },
  slider:       { component: SliderPage, desc: 'Continuous range input with label and value.' },
  searchinput:  { component: SearchInputPage, desc: 'Pill field that means find, not fill in.' },
  pininput:     { component: PinInputPage, desc: 'Digit boxes for OTP and class PINs — always LTR.' },
  phoneinput:   { component: PhoneInputPage, desc: 'Phone field with +966 prefix — the login field.' },
  listrow:      { component: ListRowPage, desc: 'Settings row — icon, label, value, chevron.' },
  templates:    { component: TemplatesPage, desc: 'Full screens built from system components — launch, then copy the source.' },
  rating:       { component: RatingPage, desc: 'Gold stars — how was class?' },
  chips:        { component: ChipsPage, desc: 'Compact labels for filtering and status.' },
  quizoption:   { component: QuizPage, desc: 'Single or multiple answer selection with correct/incorrect feedback.' },
  match:        { component: MatchPage, desc: 'Drag items to their matching targets (1:1).' },
  categorize:   { component: CategorizePage, desc: 'Drag items into category buckets (many:1).' },
  order:        { component: OrderPage, desc: 'Drag items into the correct sequence.' },
  fillblanks:   { component: FillBlanksPage, desc: 'Drag words into blanks within a sentence.' },
  hotspot:      { component: HotspotPage, desc: 'Drag labels onto marked regions of an image.' },
  resultreview: { component: ResultReviewPage, desc: 'Post-quiz breakdown — every question, its verdict.' },
  filterbar:    { component: FilterBarPage, desc: 'Horizontal filter pills.' },
  menu:         { component: MenuPage, desc: 'Contextual dropdown menu.' },
  calendar:     { component: CalendarPage, desc: 'Date picker with day grid.' },
  cards:        { component: CardsPage, desc: 'Container for grouped content.' },
  herocard:     { component: HeroCardPage, desc: 'Large emphasis blocks for landing pages — terra, teal, raised, sunken tones.' },
  statcard:     { component: StatCardPage, desc: 'One number that matters — readiness, minutes, rank.' },
  avatars:      { component: AvatarsPage, desc: 'User identity with initials and indicators.' },
  avatargroup:  { component: AvatarGroupPage, desc: 'Overlapping faces with +N overflow — presence, not identity.' },
  identity:     { component: IdentityPage, desc: 'User profile display with avatar and metadata.' },
  badges:       { component: BadgesPage, desc: 'Numeric or dot indicator.' },
  tables:       { component: TablePage, desc: 'Columnar data display.' },
  sessioncard:  { component: SessionCardPage, desc: 'Scheduled session with live/soon/done states.' },
  homeworkcard: { component: HomeworkCardPage, desc: 'Homework assignment with due date, status, and question count.' },
  video:        { component: VideoPage, desc: 'Thumbnail card for video content with play button and attribution.' },
  sessionbar:   { component: SessionBarPage, desc: 'Question-by-question results bar.' },
  linearprogress: { component: LinearProgressPage, desc: 'Horizontal bar for loading, uploads, and inline progress.' },
  circularprogress: { component: CircularProgressPage, desc: 'Ring for scores, readiness, and standalone metrics.' },
  timer:        { component: TimerPage, desc: 'Self-ticking countdown — mono digits, terra when time runs short.' },
  streak:       { component: StreakPage, desc: 'Days in a row — gold diamonds, no guilt.' },
  videotile:    { component: VideoTilePage, desc: 'Participant video — always dark, calm states.' },
  classtoolbar: { component: ClassToolbarPage, desc: 'Floating in-class controls — mic, camera, hand, leave.' },
  liveprompt:   { component: LivePromptPage, desc: 'Teacher-pushed question with optional countdown.' },
  chatcomposer: { component: ChatComposerPage, desc: 'Class chat input — send lights up with text.' },
  titlebar:     { component: TitleBarPage, desc: 'Screen header with back and actions.' },
  tabs:         { component: TabsPage, desc: 'Horizontal tab navigation.' },
  bottomnav:    { component: BottomNavPage, desc: 'App-level bottom navigation.' },
  bottomaction: { component: BottomActionPage, desc: 'Fixed bottom tray for primary actions.' },
  breadcrumbs:  { component: BreadcrumbsPage, desc: 'Horizontal path trail — web/tablet only.' },
  pagination:   { component: PaginationPage, desc: 'Page number navigation — web/tablet only.' },
  navrail:      { component: NavRailPage, desc: 'Vertical rail — icon + page title, NoonMark top, Avatar pinned bottom.' },
  notificationbell: { component: NotificationBellPage, desc: 'Bell with unread count — right-aligned on the page title row.' },
  backbutton:   { component: BackButtonPage, desc: 'Standard back for pushed pages — chevron where the nav was, RTL-aware.' },
  alerts:       { component: AlertsPage, desc: 'Inline status messages.' },
  toasts:       { component: ToastPage, desc: 'Temporary notification overlay.' },
  dialogs:      { component: DialogPage, desc: 'Confirmation and destructive action modals.' },
  bottomsheet:  { component: BottomSheetPage, desc: 'Slide-up content panel.' },
  fullsheet:    { component: FullSheetPage, desc: 'Full-screen modal with close button.' },
  tooltips:     { component: TooltipPage, desc: 'Contextual help on long press.' },
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
  oasis:        { component: OasisPage, desc: 'Water pool checkpoint for the journey metaphor.' },
  routemap:     { component: RouteMapPage, desc: 'Vertical journey with central spine, oases, and topic markers.', fullscreen: true },
};

const allItems = NAV.flatMap(g => g.items);
function labelFor(id: string) { return allItems.find(i => i.id === id)?.label ?? id; }
function groupFor(id: string) { return NAV.find(g => g.items.some(i => i.id === id))?.group ?? ''; }

// ─── Nav List (shared between sidebar and drawer) ───
function NavList({ current, onSelect, rtl }: { current: string; onSelect: (id: string) => void; rtl: boolean }) {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const groups = q
    ? NAV.map(g => ({ ...g, items: g.items.filter(i => i.label.toLowerCase().includes(q) || g.group.toLowerCase().includes(q)) })).filter(g => g.items.length > 0)
    : NAV;
  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: sp[3], paddingBottom: sp[3] }}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search…"
          placeholderTextColor={theme.fgFaint}
          style={{
            fontFamily: font.sans, fontSize: fs[13], color: theme.fg,
            backgroundColor: theme.inputBg, borderWidth: 1, borderColor: theme.border,
            borderRadius: r[2], paddingVertical: sp[2], paddingHorizontal: sp[3],
            textAlign: rtl ? 'right' : 'left',
            ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : {}),
          }}
        />
      </View>
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: sp[10] }}>
      {groups.length === 0 && (
        <Text style={{ fontFamily: font.sans, fontSize: fs[12], color: theme.fgFaint, paddingHorizontal: sp[6], paddingTop: sp[2] }}>No matches</Text>
      )}
      {groups.map(group => (
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
    </View>
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
            backgroundColor: theme.bgRaised,
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
      backgroundColor: theme.bgRaised,
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
  // Web: pages are deep-linkable via #pageId (e.g. /#aiprompt)
  const hashPage = Platform.OS === 'web' && typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
  const [currentPage, setCurrentPage] = useState(hashPage in PAGES ? hashPage : 'overview');
  const [navOpen, setNavOpen] = useState(false);

  function selectPage(id: string) {
    setCurrentPage(id);
    if (Platform.OS === 'web' && typeof window !== 'undefined') window.location.hash = id;
  }

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    const onHash = () => {
      const id = window.location.hash.slice(1);
      if (id in PAGES) setCurrentPage(id);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
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
      {wide && <Sidebar current={currentPage} onSelect={selectPage} rtl={isRTL} />}

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
      {!wide && navOpen && <NavDrawer current={currentPage} onSelect={selectPage} onClose={() => setNavOpen(false)} rtl={isRTL} />}
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
