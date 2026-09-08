/**
 * Noon Academy — React Native Design System
 *
 * Usage:
 *   import { Button, Card, Chip, Avatar } from '@noon/design-system';
 *   import { sp, fs, fw, r, font, voidTheme } from '@noon/design-system/tokens';
 *
 * Wrap app:
 *   <ThemeProvider initial="void"><App /></ThemeProvider>
 */

// Theme
export { ThemeProvider, useTheme } from './ThemeContext';

// Tokens
export { color, voidTheme, paperTheme, voidElevation, paperElevation, sp, icon, r, h, fs, fw, lh, font, dur, bp, layout } from './tokens';
export type { Theme } from './tokens';

// Inputs
export { Icon, iconNames } from './Icon';
export type { IconName } from './Icon';
export { Button } from './Button';
export { IconButton } from './IconButton';
export { Input } from './Input';
export { Select } from './Select';
export type { SelectOption } from './Select';
export { Textarea } from './Textarea';
export { Switch } from './Switch';
export { Checkbox } from './Checkbox';
export { CheckboxGroup } from './CheckboxGroup';
export { Radio } from './Radio';
export { RadioGroup } from './RadioGroup';
export { Stepper } from './Stepper';
export { Segmented } from './Segmented';
export { SearchInput } from './SearchInput';
export { PinInput } from './PinInput';
export { PhoneInput } from './PhoneInput';
export { ListRow } from './ListRow';
export { UploadTile } from './UploadTile';
export type { UploadTileState } from './UploadTile';
export { Rating } from './Rating';

// Display
export { Card } from './Card';
export { HeroCard } from './HeroCard';
export { Chip } from './Chip';
export { Avatar } from './Avatar';
export { AvatarGroup } from './AvatarGroup';
export { StatCard } from './StatCard';
export { Badge } from './Badge';
export { Table, type TableColumn } from './Table';
export { Pagination } from './Pagination';
export { Breadcrumbs } from './Breadcrumbs';
export { Divider } from './Divider';
export { Skeleton } from './Skeleton';
export { EmptyState } from './EmptyState';
export { StreakTracker } from './StreakTracker';
export type { StreakDay } from './StreakTracker';

// Navigation
export { Calendar } from './Calendar';
export type { CalendarLocale } from './Calendar';
export { Tabs } from './Tabs';
export { BottomAction } from './BottomAction';
export { BottomNav } from './BottomNav';
export { NavRail } from './NavRail';
export { NotificationBell } from './NotificationBell';
export { BackButton } from './BackButton';
export { NoonMark } from './NoonMark';
export { TitleBar } from './TitleBar';
export { FilterBar } from './FilterBar';

// Feedback
export { Alert } from './Alert';
export { Toast } from './Toast';
export { ToastProvider, useToast } from './ToastProvider';
export { Dialog } from './Dialog';
export { BottomSheet } from './BottomSheet';
export { FullSheet } from './FullSheet';
export { Tooltip } from './Tooltip';

// Progress
export { SessionBar } from './SessionBar';
export { LinearProgress, CircularProgress } from './Progress';
export { Timer } from './Timer';

// Patterns
export { SessionCard } from './SessionCard';
export { HomeworkCard } from './HomeworkCard';
export { QuizOption } from './QuizOption';
export { Question } from './Question';
export { DragItem, DragItemContent } from './DragItem';
export type { DragItemData, DragItemState } from './DragItem';
export { DropZone } from './DropZone';
export type { DropZoneState, DropZoneBounds } from './DropZone';
export { useDragDrop } from './useDragDrop';
export { QuestionFrame } from './QuestionFrame';
export { MatchQuestion } from './MatchQuestion';
export { CategorizeQuestion } from './CategorizeQuestion';
export { OrderQuestion } from './OrderQuestion';
export { FillBlanksQuestion } from './FillBlanksQuestion';
export { HotspotQuestion } from './HotspotQuestion';
export { PlacedItem } from './PlacedItem';
export { Interstitial } from './Interstitial';
export { ResultReview } from './ResultReview';
export type { ResultReviewItem } from './ResultReview';

// In class
export { VideoTile } from './VideoTile';
export { ClassToolbar } from './ClassToolbar';
export type { ClassToolbarItem } from './ClassToolbar';
export { LivePrompt } from './LivePrompt';
export { ChatComposer } from './ChatComposer';

// Experimental
export { Oasis } from './Oasis';
export { RouteMap } from './RouteMap';
export type { RouteChapter, RouteMarker } from './RouteMap';

// Graphical
export { GridPaper } from './GridPaper';
export { Waypoints, WaypointMarker } from './Waypoints';
export { TerrainPattern } from './TerrainPattern';
export { DunePattern } from './DunePattern';
export { Facet } from './Facet';
export { Khatam } from './Khatam';
export { Pinboard } from './Pinboard';
export { ConstellationPattern } from './ConstellationPattern';
export { Slider } from './Slider';
export { DuneDynamic } from './DuneDynamic';
export { StarsDynamic } from './StarsDynamic';
export { TerrainDynamic } from './TerrainDynamic';
export { VoiceTutor } from './VoiceTutor';

// Media
export { VideoCard } from './VideoCard';

// Voice Chat
export { ChatMessage } from './ChatMessage';
export { TypingIndicator } from './TypingIndicator';
export { BreakdownCard } from './BreakdownCard';
export { ActivityCard } from './ActivityCard';
export { ResourceList } from './ResourceList';
export { SlidesCard } from './SlidesCard';
export { WorkedExampleCard } from './WorkedExampleCard';

// Composition
export { Identity } from './Identity';
export { Menu } from './Menu';
export { CardGrid } from './CardGrid';
export { Leaderboard } from './Leaderboard';
