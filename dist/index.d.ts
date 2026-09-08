import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';
import { Theme } from './tokens.js';
export { bp, color, dur, font, fs, fw, h, icon, layout, lh, paperElevation, paperTheme, r, sp, voidElevation, voidTheme } from './tokens.js';
import { TextInputProps, TextInput, ImageSourcePropType, ViewStyle } from 'react-native';

type ThemeMode = 'void' | 'paper';
interface ThemeCtx {
    mode: ThemeMode;
    theme: Theme;
    elevation: Record<number, Record<string, any>>;
    setMode: (mode: ThemeMode) => void;
}
declare function ThemeProvider({ children, initial }: {
    children: React.ReactNode;
    initial?: ThemeMode;
}): react_jsx_runtime.JSX.Element;
declare function useTheme(): ThemeCtx;

type IconName = 'chevron-left' | 'chevron-right' | 'chevron-down' | 'chevron-up' | 'arrow-left' | 'arrow-right' | 'close' | 'plus' | 'minus' | 'check' | 'search' | 'menu' | 'more' | 'more-vertical' | 'play' | 'pause' | 'expand' | 'collapse' | 'document' | 'link' | 'info' | 'warning' | 'error' | 'keyboard' | 'bell' | 'mic' | 'mic-off' | 'camera' | 'camera-off' | 'hand' | 'send' | 'chat' | 'leave' | 'home' | 'user' | 'book' | 'globe' | 'volume' | 'map' | 'video' | 'tutor';
interface IconProps {
    name: IconName;
    size?: number;
    color?: string;
}
declare function Icon({ name, size, color: colorProp }: IconProps): react_jsx_runtime.JSX.Element;
/** All available icon names */
declare const iconNames: IconName[];

type Variant$8 = 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-solid' | 'signal' | 'tutor';
type Size$2 = 'sm' | 'md' | 'lg';
interface ButtonProps {
    children: string;
    variant?: Variant$8;
    size?: Size$2;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    onPress?: () => void;
}
declare function Button({ children, variant, size, disabled, loading, fullWidth, leadingIcon, trailingIcon, onPress }: ButtonProps): react_jsx_runtime.JSX.Element;

type Variant$7 = 'default' | 'primary' | 'ghost' | 'danger';
type Size$1 = 'sm' | 'md' | 'lg';
interface IconButtonProps {
    children: React.ReactNode;
    variant?: Variant$7;
    size?: Size$1;
    disabled?: boolean;
    onPress?: () => void;
    accessibilityLabel?: string;
}
declare function IconButton({ children, variant, size, disabled, onPress, accessibilityLabel }: IconButtonProps): react_jsx_runtime.JSX.Element;

/**
 * Input — text input with label, error state, helper text.
 */

interface InputProps extends Omit<TextInputProps, 'style'> {
    label?: string;
    error?: string;
    helper?: string;
    disabled?: boolean;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<TextInput>>;

interface SelectOption {
    label: string;
    value: string;
}
interface SelectProps {
    options: SelectOption[];
    value?: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    error?: string;
    helper?: string;
    disabled?: boolean;
    /** BottomSheet title; defaults to label. */
    sheetTitle?: string;
}
declare function Select({ options, value, onChange, label, placeholder, error, helper, disabled, sheetTitle }: SelectProps): react_jsx_runtime.JSX.Element;

/**
 * Textarea — multi-line text input.
 * Same visual treatment as Input: inputBg, fs[14], helper text support.
 */

interface TextareaProps extends Omit<TextInputProps, 'style'> {
    label?: string;
    error?: string;
    helper?: string;
    rows?: number;
    disabled?: boolean;
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<TextInput>>;

interface SwitchProps {
    value: boolean;
    onValueChange: (val: boolean) => void;
    disabled?: boolean;
    label?: string;
}
declare function Switch({ value, onValueChange, disabled, label }: SwitchProps): react_jsx_runtime.JSX.Element;

interface CheckboxProps {
    checked: boolean;
    onValueChange: (checked: boolean) => void;
    disabled?: boolean;
    indeterminate?: boolean;
    label?: string;
}
declare function Checkbox({ checked, onValueChange, disabled, indeterminate, label }: CheckboxProps): react_jsx_runtime.JSX.Element;

interface CheckboxGroupProps {
    values: string[];
    onChange: (values: string[]) => void;
    options: {
        value: string;
        label: string;
    }[];
    title?: string;
    disabled?: boolean;
}
declare function CheckboxGroup({ values, onChange, options, title, disabled }: CheckboxGroupProps): react_jsx_runtime.JSX.Element;

interface RadioProps {
    selected: boolean;
    onSelect: () => void;
    disabled?: boolean;
    label?: string;
}
declare function Radio({ selected, onSelect, disabled, label }: RadioProps): react_jsx_runtime.JSX.Element;

interface RadioGroupProps {
    value: string;
    onChange: (value: string) => void;
    options: {
        value: string;
        label: string;
    }[];
    title?: string;
    disabled?: boolean;
}
declare function RadioGroup({ value, onChange, options, title, disabled }: RadioGroupProps): react_jsx_runtime.JSX.Element;

interface StepperProps {
    value: number;
    min?: number;
    max?: number;
    step?: number;
    onChange: (value: number) => void;
    disabled?: boolean;
}
declare function Stepper({ value, min, max, step, onChange, disabled }: StepperProps): react_jsx_runtime.JSX.Element;

interface SegmentedProps {
    options: string[];
    selected: number;
    onSelect: (index: number) => void;
    size?: 'sm' | 'md';
}
declare function Segmented({ options, selected, onSelect, size }: SegmentedProps): react_jsx_runtime.JSX.Element;

/**
 * SearchInput — a pill field that means "find", not "fill in".
 *
 * Search icon leads, clear button appears once there's text.
 * For forms, use Input; this is for filtering and lookup.
 */

interface SearchInputProps extends Omit<TextInputProps, 'style'> {
    value: string;
    onChangeText: (text: string) => void;
    disabled?: boolean;
}
declare const SearchInput: React.ForwardRefExoticComponent<SearchInputProps & React.RefAttributes<TextInput>>;

interface PinInputProps {
    length?: number;
    value: string;
    onChange: (value: string) => void;
    /** Fires once when all boxes are filled */
    onComplete?: (value: string) => void;
    error?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
}
declare function PinInput({ length, value, onChange, onComplete, error, disabled, autoFocus }: PinInputProps): react_jsx_runtime.JSX.Element;

/**
 * PhoneInput — phone number field with a fixed country code prefix.
 *
 * Saudi-first: defaults to +966. Digits are always LTR, even in RTL layouts.
 */

interface PhoneInputProps extends Omit<TextInputProps, 'style' | 'value' | 'onChangeText' | 'keyboardType'> {
    value: string;
    onChangeText: (digits: string) => void;
    label?: string;
    error?: string;
    helper?: string;
    disabled?: boolean;
    /** Fixed dialing prefix shown before the number */
    countryCode?: string;
}
declare const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps & React.RefAttributes<TextInput>>;

interface ListRowProps {
    label: string;
    /** Leading icon */
    icon?: IconName;
    /** Trailing value text, e.g. "Grade 11" */
    value?: string;
    /** Trailing custom node (e.g. a Switch). Replaces value + chevron. */
    right?: React.ReactNode;
    /** Danger rows (log out, delete) — terra-free, uses theme.danger */
    danger?: boolean;
    /** Hide the chevron on pressable rows */
    chevron?: boolean;
    /** Hide the bottom divider (use on the last row) */
    divider?: boolean;
    disabled?: boolean;
    onPress?: () => void;
}
declare function ListRow({ label, icon, value, right, danger, chevron, divider, disabled, onPress }: ListRowProps): react_jsx_runtime.JSX.Element;

type UploadTileState = 'idle' | 'uploading' | 'uploaded' | 'error';
interface UploadTileProps {
    state?: UploadTileState;
    /** e.g. "Add your homework" */
    label?: string;
    /** e.g. "PDF or photo, up to 10 MB" */
    hint?: string;
    fileName?: string;
    /** e.g. "2.4 MB" */
    fileMeta?: string;
    /** 0–100, for uploading state */
    progress?: number;
    errorMessage?: string;
    onPress?: () => void;
    onRemove?: () => void;
    onRetry?: () => void;
    disabled?: boolean;
}
declare function UploadTile({ state, label, hint, fileName, fileMeta, progress, errorMessage, onPress, onRemove, onRetry, disabled, }: UploadTileProps): react_jsx_runtime.JSX.Element;

interface RatingProps {
    /** 0..max */
    value: number;
    onChange?: (value: number) => void;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
}
declare function Rating({ value, onChange, max, size }: RatingProps): react_jsx_runtime.JSX.Element;

interface CardAction {
    label: string;
    danger?: boolean;
    onPress: () => void;
}
interface CardProps {
    title: string;
    subtitle?: string;
    meta?: string;
    thumbnail?: ImageSourcePropType;
    /** Thumbnail crop — only these two, keeps grids tidy */
    thumbnailRatio?: '16:9' | '1:1';
    actions?: CardAction[];
    selectable?: boolean;
    selected?: boolean;
    loading?: boolean;
    spotlight?: 'terra' | 'teal';
    pattern?: boolean;
    /** 'auto' = full width of parent (default), 'fill' = share row space equally, 'hug' = shrink to content */
    sizing?: 'auto' | 'fill' | 'hug';
    onPress?: () => void;
    style?: ViewStyle;
}
declare function Card({ title, subtitle, meta, thumbnail, thumbnailRatio, actions, selectable, selected: selectedProp, loading, spotlight, pattern, sizing, onPress, style }: CardProps): react_jsx_runtime.JSX.Element;

interface HeroCardProps {
    title: string;
    kicker?: string;
    subtitle?: string;
    meta?: string;
    tone?: 'terra' | 'teal' | 'raised' | 'sunken';
    /** 'auto' = full width of parent (default), 'fill' = share row space equally, 'hug' = shrink to content */
    sizing?: 'auto' | 'fill' | 'hug';
    onPress?: () => void;
    style?: ViewStyle;
}
declare function HeroCard({ title, kicker, subtitle, meta, tone, sizing, onPress, style }: HeroCardProps): react_jsx_runtime.JSX.Element;

type Variant$6 = 'default' | 'accent';
interface ChipProps {
    children: string;
    variant?: Variant$6;
    dismissable?: boolean;
    dot?: boolean;
    disabled?: boolean;
    onPress?: () => void;
    onDismiss?: () => void;
}
declare function Chip({ children, variant, dismissable, dot, disabled, onPress, onDismiss }: ChipProps): react_jsx_runtime.JSX.Element;

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ColorVariant = 'default' | 'noon' | 'blue';
type StatusType = 'online' | 'busy';
interface AvatarProps {
    initials: string;
    imageUri?: string;
    size?: Size;
    color?: ColorVariant;
    status?: StatusType;
}
declare function Avatar({ initials, imageUri, size, color, status }: AvatarProps): react_jsx_runtime.JSX.Element;

interface AvatarGroupItem {
    initials: string;
    imageUri?: string;
}
interface AvatarGroupProps {
    items: AvatarGroupItem[];
    /** Faces shown before collapsing to "+N" (default 4) */
    max?: number;
    size?: 'xs' | 'sm' | 'md';
    /** True headcount when `items` is a sample (e.g. 3 faces of 128 in class) */
    total?: number;
}
declare function AvatarGroup({ items, max, size, total }: AvatarGroupProps): react_jsx_runtime.JSX.Element;

interface StatCardProps {
    label: string;
    value: string;
    /** Small unit after the value, e.g. "%", "min" */
    unit?: string;
    /** e.g. "+4% this week" */
    delta?: string;
    deltaDirection?: 'up' | 'down' | 'flat';
    meta?: string;
    /** 'auto' = full width of parent (default), 'fill' = share row space equally, 'hug' = shrink to content */
    sizing?: 'auto' | 'fill' | 'hug';
    onPress?: () => void;
    style?: ViewStyle;
}
declare function StatCard({ label, value, unit, delta, deltaDirection, meta, sizing, onPress, style }: StatCardProps): react_jsx_runtime.JSX.Element;

type Variant$5 = 'default' | 'accent' | 'danger' | 'dot';
interface BadgeProps {
    children?: string | number;
    variant?: Variant$5;
}
declare function Badge({ children, variant }: BadgeProps): react_jsx_runtime.JSX.Element;

interface TableColumn {
    key: string;
    label: string;
    width?: number;
    align?: 'left' | 'center' | 'right';
    sortable?: boolean;
    render?: (value: string, row: Record<string, string>, rowIndex: number) => React.ReactNode;
}
interface TableProps {
    /** Column definitions. For simple usage, pass string[] and it auto-converts. */
    columns: TableColumn[] | string[];
    /** Row data. For simple usage, pass string[][] keyed by column index. */
    rows: Record<string, string>[] | string[][];
    /** Enable row checkboxes */
    selectable?: boolean;
    /** Controlled selected row indices */
    selected?: number[];
    /** Called when selection changes */
    onSelectionChange?: (indices: number[]) => void;
    /** Called when a row is pressed (non-checkbox tap) */
    onRowPress?: (row: Record<string, string>, index: number) => void;
    /** Sort state — controlled */
    sortKey?: string;
    sortDir?: 'asc' | 'desc';
    onSort?: (key: string, dir: 'asc' | 'desc') => void;
    /** Minimum table width — enables horizontal scroll when exceeded */
    minWidth?: number;
    /** Action bar content shown when rows are selected */
    actionBar?: (selectedCount: number) => React.ReactNode;
}
declare function Table({ columns: columnsProp, rows: rowsProp, selectable, selected: selectedProp, onSelectionChange, onRowPress, sortKey: sortKeyProp, sortDir: sortDirProp, onSort, minWidth, actionBar, }: TableProps): react_jsx_runtime.JSX.Element;

interface PaginationProps {
    total: number;
    current: number;
    onPageChange: (page: number) => void;
}
declare function Pagination({ total, current, onPageChange }: PaginationProps): react_jsx_runtime.JSX.Element | null;

interface BreadcrumbItem {
    label: string;
    onPress?: () => void;
}
interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}
declare function Breadcrumbs({ items }: BreadcrumbsProps): react_jsx_runtime.JSX.Element;

declare function Divider(): react_jsx_runtime.JSX.Element;

interface SkeletonProps {
    width?: number | string;
    height?: number;
    circle?: boolean;
    style?: ViewStyle;
}
declare function Skeleton({ width, height, circle, style }: SkeletonProps): react_jsx_runtime.JSX.Element;

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    body: string;
    actionLabel?: string;
    onAction?: () => void;
}
declare function EmptyState({ icon, title, body, actionLabel, onAction }: EmptyStateProps): react_jsx_runtime.JSX.Element;

type StreakDay = 'done' | 'missed' | 'today' | 'upcoming';
interface StreakTrackerProps {
    /** Days in a row */
    count: number;
    /** The week, oldest first */
    days: StreakDay[];
    /** One letter per day, same order as days */
    labels?: string[];
}
declare function StreakTracker({ count, days, labels }: StreakTrackerProps): react_jsx_runtime.JSX.Element;

interface CalendarLocale {
    dayNames: string[];
    months: string[];
    fullDays: string[];
    weekStart: number;
    today: string;
}
interface CalendarProps {
    selected?: Date;
    onSelect?: (date: Date) => void;
    events?: Record<string, {
        count?: number;
        assessment?: boolean;
    }>;
    expanded?: boolean;
    onToggle?: () => void;
    backIcon?: React.ReactNode;
    onBack?: () => void;
    rightAction?: React.ReactNode;
    locale?: CalendarLocale | 'ar';
    /** Hide the built-in title/controls row — when the page owns the title (e.g. date as page title). */
    hideHeader?: boolean;
}
declare function Calendar({ selected: selectedProp, onSelect, events, expanded: expandedProp, onToggle, backIcon, onBack, rightAction, locale: localeProp, hideHeader }: CalendarProps): react_jsx_runtime.JSX.Element;

interface TabsProps {
    tabs: string[];
    selected: number;
    onSelect: (index: number) => void;
}
declare function Tabs({ tabs, selected, onSelect }: TabsProps): react_jsx_runtime.JSX.Element;

interface ActionButton {
    label: string;
    onPress: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'tutor';
}
interface BottomActionProps {
    icon?: IconName;
    message?: string;
    submessage?: string;
    messageVariant?: 'default' | 'accent' | 'danger';
    primary?: ActionButton;
    secondary?: ActionButton;
}
declare function BottomAction({ icon, message, submessage, messageVariant, primary, secondary }: BottomActionProps): react_jsx_runtime.JSX.Element;

interface NavItem {
    label: string;
    icon: IconName | ((color: string, size: number) => React.ReactNode);
    badge?: number;
}
interface BottomNavProps {
    items: NavItem[];
    selected: number;
    onSelect: (index: number) => void;
    maxVisible?: number;
}
declare function BottomNav({ items, selected, onSelect, maxVisible }: BottomNavProps): react_jsx_runtime.JSX.Element;

interface NavRailItem {
    label: string;
    icon: IconName | ((color: string, size: number) => React.ReactNode);
}
interface NavRailProps {
    items: NavRailItem[];
    selected: number;
    onSelect: (index: number) => void;
    labels?: boolean;
    header?: React.ReactNode;
    footer?: React.ReactNode;
}
declare function NavRail({ items, selected, onSelect, labels, header, footer }: NavRailProps): react_jsx_runtime.JSX.Element;

interface NotificationBellProps {
    count?: number;
    onPress: () => void;
}
declare function NotificationBell({ count, onPress }: NotificationBellProps): react_jsx_runtime.JSX.Element;

interface BackButtonProps {
    onPress: () => void;
}
declare function BackButton({ onPress }: BackButtonProps): react_jsx_runtime.JSX.Element;

declare function NoonMark({ size }: {
    size?: number;
}): react_jsx_runtime.JSX.Element;

type Variant$4 = 'default' | 'large' | 'transparent' | 'overlay';
interface TitleBarProps {
    title: string;
    subtitle?: string;
    variant?: Variant$4;
    backIcon?: React.ReactNode;
    onBack?: () => void;
    rightAction?: React.ReactNode;
}
declare function TitleBar({ title, subtitle, variant, backIcon, onBack, rightAction }: TitleBarProps): react_jsx_runtime.JSX.Element;

interface FilterItem {
    label: string;
    active?: boolean;
}
interface FilterBarProps {
    items: FilterItem[];
    onToggle: (index: number) => void;
}
declare function FilterBar({ items, onToggle }: FilterBarProps): react_jsx_runtime.JSX.Element;

type Variant$3 = 'info' | 'success' | 'warn' | 'danger';
interface AlertProps {
    title?: string;
    children: string;
    variant?: Variant$3;
    icon?: IconName;
}
declare function Alert({ title, children, variant, icon }: AlertProps): react_jsx_runtime.JSX.Element;

type Variant$2 = 'info' | 'success' | 'warn' | 'danger';
interface ToastProps {
    message: string;
    variant?: Variant$2;
    visible: boolean;
    onDismiss: () => void;
    duration?: number;
}
declare function Toast({ message, variant, visible, onDismiss, duration }: ToastProps): react_jsx_runtime.JSX.Element | null;

type Variant$1 = 'info' | 'success' | 'warn' | 'danger';
interface ToastOptions {
    message: string;
    variant?: Variant$1;
    duration?: number;
}
interface ToastApi {
    show: (options: ToastOptions) => void;
}
declare function useToast(): ToastApi;
declare function ToastProvider({ children }: {
    children: React.ReactNode;
}): react_jsx_runtime.JSX.Element;

interface DialogProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    body?: string;
    primaryLabel?: string;
    secondaryLabel?: string;
    onPrimary?: () => void;
    onSecondary?: () => void;
    danger?: boolean;
}
declare function Dialog({ visible, onClose, title, body, primaryLabel, secondaryLabel, onPrimary, onSecondary, danger }: DialogProps): react_jsx_runtime.JSX.Element;

interface BottomSheetProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
    full?: boolean;
}
declare function BottomSheet({ visible, onClose, title, children, actions, full }: BottomSheetProps): react_jsx_runtime.JSX.Element;

interface FullSheetProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    closeLabel?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}
declare function FullSheet({ visible, onClose, title, closeLabel, children, footer }: FullSheetProps): react_jsx_runtime.JSX.Element | null;

interface TooltipProps {
    text: string;
    children: React.ReactNode;
}
declare function Tooltip({ text, children }: TooltipProps): react_jsx_runtime.JSX.Element;

type SegState = 'correct' | 'incorrect' | 'current' | 'pending';
interface SessionBarProps {
    segments: SegState[];
    size?: 'sm' | 'md' | 'lg';
    /** Max segments per page. Default 10. */
    pageSize?: number;
}
declare function SessionBar({ segments, size, pageSize }: SessionBarProps): react_jsx_runtime.JSX.Element;

interface LinearProps {
    value: number;
    height?: number;
    color?: string;
}
declare function LinearProgress({ value, height, color }: LinearProps): react_jsx_runtime.JSX.Element;
interface CircularProps {
    value: number;
    size?: number;
    strokeWidth?: number;
    showValue?: boolean;
    color?: string;
}
declare function CircularProgress({ value, size, strokeWidth, showValue, color }: CircularProps): react_jsx_runtime.JSX.Element;

interface TimerProps {
    /** Starting value in seconds */
    seconds: number;
    /** Ticks while true (default true) */
    running?: boolean;
    /** Switch to warn colour at this many seconds left (default 10) */
    warnAt?: number;
    onComplete?: () => void;
    size?: 'sm' | 'md' | 'lg';
    /** 'pill' wraps the digits in a soft capsule */
    variant?: 'plain' | 'pill';
}
declare function Timer({ seconds, running, warnAt, onComplete, size, variant }: TimerProps): react_jsx_runtime.JSX.Element;

type State$1 = 'upcoming' | 'soon' | 'live' | 'done' | 'cancelled';
interface SessionCardProps {
    time: string;
    title: string;
    meta: string;
    state?: State$1;
    statusText?: string;
    assessment?: boolean;
    onPress?: () => void;
}
declare function SessionCard({ time, title, meta, state, statusText, assessment, onPress }: SessionCardProps): react_jsx_runtime.JSX.Element;

type Status = 'due-soon' | 'complete' | 'overdue';
interface HomeworkCardProps {
    title: string;
    subject: string;
    /** Relative time e.g. "Due in 4h", "Due tomorrow", "2 days overdue" */
    due: string;
    /** Number of questions */
    questions?: number;
    status?: Status;
    onPress?: () => void;
}
declare function HomeworkCard({ title, subject, due, questions, status, onPress }: HomeworkCardProps): react_jsx_runtime.JSX.Element;

type State = 'default' | 'selected' | 'correct' | 'incorrect' | 'disabled';
interface QuizOptionProps {
    label: string;
    text?: string;
    image?: ImageSourcePropType;
    state?: State;
    onPress?: () => void;
}
declare function QuizOption({ label, text, image, state, onPress }: QuizOptionProps): react_jsx_runtime.JSX.Element;

type DragItemState = 'idle' | 'dragging' | 'placed' | 'correct' | 'incorrect' | 'disabled';
interface DragItemData {
    id: string;
    label?: string;
    image?: ImageSourcePropType;
    imageSize?: number;
}
interface DragItemProps {
    item: DragItemData;
    state?: DragItemState;
    onDragStart?: (id: string) => void;
    onDragMove?: (id: string, x: number, y: number) => void;
    onDragEnd?: (id: string, x: number, y: number) => void;
}
/** Renders the content of a drag item — text or image. Reused by zone item renderers. */
declare function DragItemContent({ item, fontSize }: {
    item: DragItemData;
    fontSize?: number;
}): react_jsx_runtime.JSX.Element;
declare function DragItem({ item, state, onDragStart, onDragMove, onDragEnd }: DragItemProps): react_jsx_runtime.JSX.Element;

interface ChoiceOption {
    label: string;
    text?: string;
    image?: ImageSourcePropType;
}
interface ChoiceProps {
    options: ChoiceOption[];
    selected?: number;
    correctIndex?: number;
    submitted?: boolean;
    onSelect?: (index: number) => void;
}
interface MatchProps {
    items: DragItemData[];
    targets: {
        id: string;
        label: string;
    }[];
    correctMapping: Record<string, string>;
}
interface CategorizeProps {
    items: DragItemData[];
    categories: {
        id: string;
        label: string;
    }[];
    correctMapping: Record<string, string>;
}
interface OrderProps {
    items: DragItemData[];
    correctOrder: string[];
}
interface FillBlanksProps {
    sentence: string;
    items: DragItemData[];
    correctMapping: Record<string, string>;
}
interface HotspotProps {
    image: ImageSourcePropType;
    imageAspectRatio?: number;
    zones: {
        id: string;
        label?: string;
        x: number;
        y: number;
        width: number;
        height: number;
    }[];
    items: DragItemData[];
    correctMapping: Record<string, string>;
}
type QuestionType = 'choice' | 'match' | 'categorize' | 'order' | 'fillblanks' | 'hotspot';
interface QuestionProps {
    text?: string;
    image?: ImageSourcePropType;
    imageAspectRatio?: number;
    instruction?: string;
    optionsPosition?: 'top' | 'bottom';
    showButtons?: boolean;
    onAnswer?: (placements: Record<string, string>) => void;
    onReady?: (controls: {
        submit: () => void;
        reset: () => void;
        allPlaced: boolean;
        submitted: boolean;
    }) => void;
    type: QuestionType;
    choiceProps?: ChoiceProps;
    matchProps?: MatchProps;
    categorizeProps?: CategorizeProps;
    orderProps?: OrderProps;
    fillBlanksProps?: FillBlanksProps;
    hotspotProps?: HotspotProps;
}
declare function Question({ text, image, imageAspectRatio, instruction, optionsPosition, showButtons, onAnswer, onReady, type, choiceProps, matchProps, categorizeProps, orderProps, fillBlanksProps, hotspotProps }: QuestionProps): react_jsx_runtime.JSX.Element;

type DropZoneState = 'empty' | 'hovering' | 'filled' | 'correct' | 'incorrect';
interface DropZoneBounds {
    x: number;
    y: number;
    width: number;
    height: number;
}
interface DropZoneProps {
    id: string;
    label?: string;
    state?: DropZoneState;
    children?: React.ReactNode;
    onMeasure?: (id: string, bounds: DropZoneBounds) => void;
    minWidth?: number;
    minHeight?: number;
    /** When true and filled, zone hides its own border/bg — the child replaces it visually */
    inline?: boolean;
    /** When true, zone keeps its empty dashed style regardless of state (for category buckets) */
    neutral?: boolean;
}
declare function DropZone({ id, label, state, children, onMeasure, minWidth, minHeight, inline, neutral }: DropZoneProps): react_jsx_runtime.JSX.Element;

interface UseDragDropOptions {
    items: DragItemData[];
    zones: string[];
    correctMapping?: Record<string, string>;
    allowMultiplePerZone?: boolean;
    showZoneResults?: boolean;
    onAnswer?: (placements: Record<string, string>) => void;
}
declare function useDragDrop({ items, zones, correctMapping, allowMultiplePerZone, showZoneResults, onAnswer }: UseDragDropOptions): {
    draggingId: string | null;
    hoveringZone: string | null;
    allPlaced: boolean;
    registerZone: (id: string, bounds: DropZoneBounds) => void;
    onDragStart: (id: string) => void;
    onDragMove: (id: string, x: number, y: number) => void;
    onDragEnd: (id: string, x: number, y: number) => void;
    submit: () => void;
    reveal: (results: Record<string, boolean>) => void;
    reset: () => void;
    itemStates: Record<string, DragItemState>;
    zoneStates: Record<string, DropZoneState>;
    placements: Record<string, string>;
    submitted: boolean;
};

interface QuestionFrameProps {
    instruction?: string;
    children: React.ReactNode;
    options?: React.ReactNode;
    optionsPosition?: 'top' | 'bottom';
    showButtons?: boolean;
    submitted?: boolean;
    allPlaced?: boolean;
    onSubmit?: () => void;
    onReset?: () => void;
}
declare function QuestionFrame({ instruction, children, options, optionsPosition, showButtons, submitted, allPlaced, onSubmit, onReset }: QuestionFrameProps): react_jsx_runtime.JSX.Element;

interface MatchTarget {
    id: string;
    label: string;
}
interface MatchQuestionProps {
    items: DragItemData[];
    targets: MatchTarget[];
    correctMapping: Record<string, string>;
    instruction?: string;
    optionsPosition?: 'top' | 'bottom';
    showButtons?: boolean;
    onAnswer?: (placements: Record<string, string>) => void;
    onReady?: (controls: {
        submit: () => void;
        reset: () => void;
        allPlaced: boolean;
        submitted: boolean;
    }) => void;
}
declare function MatchQuestion({ items, targets, correctMapping, instruction, optionsPosition, showButtons, onAnswer, onReady }: MatchQuestionProps): react_jsx_runtime.JSX.Element;

interface Category {
    id: string;
    label: string;
}
interface CategorizeQuestionProps {
    items: DragItemData[];
    categories: Category[];
    correctMapping: Record<string, string>;
    instruction?: string;
    optionsPosition?: 'top' | 'bottom';
    showButtons?: boolean;
    onAnswer?: (placements: Record<string, string>) => void;
    onReady?: (controls: {
        submit: () => void;
        reset: () => void;
        allPlaced: boolean;
        submitted: boolean;
    }) => void;
}
declare function CategorizeQuestion({ items, categories, correctMapping, instruction, optionsPosition, showButtons, onAnswer, onReady }: CategorizeQuestionProps): react_jsx_runtime.JSX.Element;

interface OrderQuestionProps {
    items: DragItemData[];
    correctOrder: string[];
    instruction?: string;
    optionsPosition?: 'top' | 'bottom';
    showButtons?: boolean;
    onAnswer?: (placements: Record<string, string>) => void;
    onReady?: (controls: {
        submit: () => void;
        reset: () => void;
        allPlaced: boolean;
        submitted: boolean;
    }) => void;
}
declare function OrderQuestion({ items, correctOrder, instruction, optionsPosition, showButtons, onAnswer, onReady }: OrderQuestionProps): react_jsx_runtime.JSX.Element;

interface FillBlanksQuestionProps {
    sentence: string;
    items: DragItemData[];
    correctMapping: Record<string, string>;
    instruction?: string;
    optionsPosition?: 'top' | 'bottom';
    showButtons?: boolean;
    onAnswer?: (placements: Record<string, string>) => void;
    onReady?: (controls: {
        submit: () => void;
        reset: () => void;
        allPlaced: boolean;
        submitted: boolean;
    }) => void;
}
declare function FillBlanksQuestion({ sentence, items, correctMapping, instruction, optionsPosition, showButtons, onAnswer, onReady }: FillBlanksQuestionProps): react_jsx_runtime.JSX.Element;

interface HotspotZone {
    id: string;
    label?: string;
    x: number;
    y: number;
    width: number;
    height: number;
}
interface HotspotQuestionProps {
    image: ImageSourcePropType;
    imageAspectRatio?: number;
    zones: HotspotZone[];
    items: DragItemData[];
    correctMapping: Record<string, string>;
    instruction?: string;
    optionsPosition?: 'top' | 'bottom';
    showButtons?: boolean;
    onAnswer?: (placements: Record<string, string>) => void;
    onReady?: (controls: {
        submit: () => void;
        reset: () => void;
        allPlaced: boolean;
        submitted: boolean;
    }) => void;
}
declare function HotspotQuestion({ image, imageAspectRatio, zones, items, correctMapping, instruction, optionsPosition, showButtons, onAnswer, onReady }: HotspotQuestionProps): react_jsx_runtime.JSX.Element;

interface PlacedItemProps {
    item: DragItemData;
    itemState: DragItemState;
    zoneState: DropZoneState;
    onDragStart: (id: string) => void;
    onDragMove: (id: string, x: number, y: number) => void;
    onDragEnd: (id: string, x: number, y: number) => void;
    theme: Theme;
    fontSize?: number;
    compact?: boolean;
}
declare function PlacedItem({ item, itemState, zoneState, onDragStart, onDragMove, onDragEnd, theme, fontSize, compact }: PlacedItemProps): react_jsx_runtime.JSX.Element;

type InterstitialVariant = 'mastery' | 'exam' | 'progress' | 'complete';
interface InterstitialProps {
    title: string;
    body: string;
    buttonLabel: string;
    onPress: () => void;
    /** Built-in hero graphic variant */
    variant?: InterstitialVariant;
    /** Exam score for 'exam' variant (0-100) */
    score?: number;
    /** Custom hero element — overrides variant when provided (image, animation, etc.) */
    hero?: React.ReactNode;
    /** Show confetti */
    confetti?: boolean;
}
declare function Interstitial({ title, body, buttonLabel, onPress, variant, score, hero, confetti: confettiProp }: InterstitialProps): react_jsx_runtime.JSX.Element;

interface ResultReviewItem {
    question: string;
    correct: boolean;
    /** e.g. "You said 14 · correct is 12" */
    meta?: string;
}
interface ResultReviewProps {
    items: ResultReviewItem[];
    onPressItem?: (index: number) => void;
}
declare function ResultReview({ items, onPressItem }: ResultReviewProps): react_jsx_runtime.JSX.Element;

type VideoTileState = 'live' | 'muted' | 'reconnecting' | 'audio-only';
interface VideoTileProps {
    name: string;
    /** e.g. "Teacher" */
    role?: string;
    state?: VideoTileState;
    /** Fallback face for audio-only */
    initials?: string;
    /** The actual video surface (RTC view, Image, …) — fills the tile */
    children?: React.ReactNode;
    /** Default 16/9 */
    aspectRatio?: number;
    style?: ViewStyle;
}
declare function VideoTile({ name, role, state, initials, children, aspectRatio, style }: VideoTileProps): react_jsx_runtime.JSX.Element;

interface ClassToolbarItem {
    id: string;
    icon: IconName;
    /** Accessibility label — required, there is no visible text */
    label: string;
    active?: boolean;
    variant?: 'default' | 'danger';
    /** Unread dot (e.g. chat) */
    badge?: boolean;
}
interface ClassToolbarProps {
    items: ClassToolbarItem[];
    onPress: (id: string) => void;
}
declare function ClassToolbar({ items, onPress }: ClassToolbarProps): react_jsx_runtime.JSX.Element;

interface LivePromptProps {
    question: string;
    /** Countdown — omit for untimed prompts */
    seconds?: number;
    onExpire?: () => void;
    /** Default "Live question" */
    kicker?: string;
    /** Answer options — QuizOption, Slider, … */
    children: React.ReactNode;
}
declare function LivePrompt({ question, seconds, onExpire, kicker, children }: LivePromptProps): react_jsx_runtime.JSX.Element;

interface ChatComposerProps {
    value: string;
    onChangeText: (v: string) => void;
    onSend: (v: string) => void;
    /** Default "Message…" */
    placeholder?: string;
    disabled?: boolean;
}
declare function ChatComposer({ value, onChangeText, onSend, placeholder, disabled }: ChatComposerProps): react_jsx_runtime.JSX.Element;

type OasisStatus = 'complete' | 'strong' | 'weak' | 'current' | 'upcoming' | 'locked';
interface OasisProps {
    /** Water level 0–100 */
    level: number;
    /** Border color intent */
    status?: OasisStatus;
    /** Text inside the diamond (e.g. "95%", "—") */
    label?: string;
    /** sm=28, md=40, lg=56, xl=72 */
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /** Caption below */
    meta?: string;
}
declare function Oasis({ level, status, label, size, meta }: OasisProps): react_jsx_runtime.JSX.Element;

type MarkerStatus = 'mapped' | 'exploring' | 'not-started' | 'needs-attention' | 'unmapped';
interface RouteMarker {
    id: string;
    label: string;
    sublabel?: string;
    status: MarkerStatus;
}
interface RouteChapter {
    id: string;
    label: string;
    title: string;
    eyebrow?: string;
    result?: string;
    status: 'complete' | 'strong' | 'weak' | 'current' | 'upcoming' | 'locked';
    level: number;
    markers: RouteMarker[];
}
interface RouteMapProps {
    chapters: RouteChapter[];
    currentChapter?: string;
    onChapterPress?: (chapter: RouteChapter) => void;
    onMarkerPress?: (marker: RouteMarker, chapter: RouteChapter) => void;
}
declare function RouteMap({ chapters, currentChapter, onChapterPress, onMarkerPress }: RouteMapProps): react_jsx_runtime.JSX.Element;

type Variant = 'standard' | 'major' | 'canvas';
interface GridPaperProps {
    variant?: Variant;
    width: number;
    height: number;
    style?: ViewStyle;
}
declare function GridPaper({ variant, width, height, style }: GridPaperProps): react_jsx_runtime.JSX.Element;

type WaypointState = 'done' | 'passed' | 'current' | 'arrived' | 'incomplete';
/** Standalone diamond marker — use this anywhere the diamond shape is needed. */
declare function WaypointMarker({ state }: {
    state: WaypointState;
}): react_jsx_runtime.JSX.Element;
interface WaypointsProps {
    steps: WaypointState[];
    labels?: string[];
    layout?: 'horizontal' | 'vertical' | 'path';
}
declare function Waypoints({ steps: stepsProp, labels, layout }: WaypointsProps): react_jsx_runtime.JSX.Element | null;

interface TerrainPatternProps {
    width: number;
    height: number;
    variant?: 'standard' | 'dense';
    opacity?: number;
    style?: ViewStyle;
}
declare function TerrainPattern({ width, height, variant, opacity, style }: TerrainPatternProps): react_jsx_runtime.JSX.Element;

interface DunePatternProps {
    width: number;
    height: number;
    opacity?: number;
    style?: ViewStyle;
}
declare function DunePattern({ width: w, height: h, opacity, style }: DunePatternProps): react_jsx_runtime.JSX.Element;

interface FacetProps {
    width: number;
    height: number;
    voice?: 'dunes' | 'plaster';
    scale?: 'sm' | 'md' | 'lg';
    seed?: number;
    animated?: boolean;
    style?: ViewStyle;
}
declare function Facet({ width: w, height: h, voice, scale, seed, animated, style, }: FacetProps): react_jsx_runtime.JSX.Element;

interface KhatamProps {
    width: number;
    height: number;
    scale?: 'sm' | 'md' | 'lg';
    style?: ViewStyle;
}
declare function Khatam({ width: w, height: h, scale, style, }: KhatamProps): react_jsx_runtime.JSX.Element;

interface PinboardProps {
    width: number;
    height: number;
    scale?: 'xs' | 'sm' | 'md' | 'lg';
    active?: Array<[number, number]>;
    seed?: number;
    animated?: boolean;
    style?: ViewStyle;
}
declare function Pinboard({ width: w, height: h, scale, active, seed, animated, style, }: PinboardProps): react_jsx_runtime.JSX.Element;

interface ConstellationPatternProps {
    width: number;
    height: number;
    opacity?: number;
    style?: ViewStyle;
}
declare function ConstellationPattern({ width: w, height: h, opacity, style }: ConstellationPatternProps): react_jsx_runtime.JSX.Element;

interface SliderProps {
    value: number;
    min: number;
    max: number;
    step?: number;
    label?: string;
    showValue?: boolean;
    onValueChange: (value: number) => void;
}
declare function Slider({ value, min, max, step, label, showValue, onValueChange }: SliderProps): react_jsx_runtime.JSX.Element;

interface DuneDynamicProps {
    width: number;
    height: number;
    layers?: number;
    wind?: number;
    density?: number;
    shimmer?: number;
    contrast?: number;
    style?: ViewStyle;
}
declare function DuneDynamic({ width, height, layers, wind, density, shimmer, contrast, style, }: DuneDynamicProps): react_jsx_runtime.JSX.Element;

interface StarsDynamicProps {
    width: number;
    height: number;
    density?: number;
    twinkle?: number;
    halo?: number;
    lines?: number;
    style?: ViewStyle;
}
declare function StarsDynamic({ width, height, density, twinkle, halo, lines, style }: StarsDynamicProps): react_jsx_runtime.JSX.Element;

interface TerrainDynamicProps {
    width: number;
    height: number;
    scale?: number;
    detail?: number;
    relief?: number;
    contrast?: number;
    tilt?: number;
    showRoute?: boolean;
    style?: ViewStyle;
}
declare function TerrainDynamic({ width, height, scale, detail, relief, contrast, tilt, showRoute, style }: TerrainDynamicProps): react_jsx_runtime.JSX.Element;

type VoiceTutorState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';
interface VoiceTutorProps {
    state?: VoiceTutorState;
    size?: number;
    hideLabel?: boolean;
}
declare function VoiceTutor({ state, size, hideLabel }: VoiceTutorProps): react_jsx_runtime.JSX.Element;

interface VideoCardProps {
    title: string;
    attribution?: string;
    duration?: string;
    uri?: string;
    thumbnail?: ImageSourcePropType;
    onPress?: () => void;
}
declare function VideoCard({ title, attribution, duration, uri, thumbnail, onPress }: VideoCardProps): react_jsx_runtime.JSX.Element;

interface ChatMessageProps {
    children: string;
    from: 'tutor' | 'student';
    confirmed?: boolean;
    /** Tutor only — shows bouncing dots instead of text */
    thinking?: boolean;
    /** Tutor only — characters revealed so far. Unrevealed text shows in fgFaint. Omit for fully revealed. */
    revealedLength?: number;
    /** Override RTL direction — useful when not using I18nManager */
    rtl?: boolean;
}
declare function ChatMessage({ children, from, confirmed, thinking, revealedLength, rtl }: ChatMessageProps): react_jsx_runtime.JSX.Element;

declare function TypingIndicator(): react_jsx_runtime.JSX.Element;

interface BreakdownCardProps {
    title: string;
    points: string[];
}
declare function BreakdownCard({ title, points }: BreakdownCardProps): react_jsx_runtime.JSX.Element;

interface ActivityCardProps {
    title: string;
    description?: string;
    buttonLabel?: string;
    complete?: boolean;
    score?: string;
    onPress?: () => void;
}
declare function ActivityCard({ title, description, buttonLabel, complete, score, onPress }: ActivityCardProps): react_jsx_runtime.JSX.Element;

interface ResourceLink {
    label: string;
    content?: React.ReactNode;
    onPress?: () => void;
}
interface ResourceListProps {
    title?: string;
    links: ResourceLink[];
}
declare function ResourceList({ title, links }: ResourceListProps): react_jsx_runtime.JSX.Element;

interface SlidesCardProps {
    title: string;
    attribution?: string;
    slides: ImageSourcePropType[];
    onPress?: () => void;
}
declare function SlidesCard({ title, attribution, slides, onPress }: SlidesCardProps): react_jsx_runtime.JSX.Element;

interface Step {
    title: string;
    content: string;
}
interface WorkedExampleCardProps {
    title: string;
    steps?: Step[];
    onPress?: () => void;
}
declare function WorkedExampleCard({ title, steps, onPress }: WorkedExampleCardProps): react_jsx_runtime.JSX.Element;

interface IdentityProps {
    initials: string;
    imageUri?: string;
    name: string;
    role?: string;
    meta?: string;
    avatarColor?: 'default' | 'noon' | 'blue';
    status?: 'online' | 'busy';
    badge?: string | number;
    right?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
}
declare function Identity({ initials, imageUri, name, role, meta, avatarColor, status, badge, right, size, }: IdentityProps): react_jsx_runtime.JSX.Element;

interface MenuItem {
    label: string;
    icon?: React.ReactNode;
    danger?: boolean;
    onPress: () => void;
}
interface MenuProps {
    visible: boolean;
    onClose: () => void;
    items: MenuItem[];
    anchor?: {
        x: number;
        y: number;
    };
}
declare function Menu({ visible, onClose, items, anchor }: MenuProps): react_jsx_runtime.JSX.Element;

interface CardGridProps {
    children: React.ReactNode;
    columns?: number;
}
declare function CardGrid({ children, columns }: CardGridProps): react_jsx_runtime.JSX.Element;

interface LeaderboardEntry {
    initials: string;
    name: string;
    score: number;
    isCurrent?: boolean;
    avatarColor?: 'default' | 'noon' | 'blue';
}
interface LeaderboardProps {
    entries: LeaderboardEntry[];
    label?: string;
    unit?: string;
}
declare function Leaderboard({ entries, label, unit }: LeaderboardProps): react_jsx_runtime.JSX.Element;

export { ActivityCard, Alert, Avatar, AvatarGroup, BackButton, Badge, BottomAction, BottomNav, BottomSheet, Breadcrumbs, BreakdownCard, Button, Calendar, type CalendarLocale, Card, CardGrid, CategorizeQuestion, ChatComposer, ChatMessage, Checkbox, CheckboxGroup, Chip, CircularProgress, ClassToolbar, type ClassToolbarItem, ConstellationPattern, Dialog, Divider, DragItem, DragItemContent, type DragItemData, type DragItemState, DropZone, type DropZoneBounds, type DropZoneState, DuneDynamic, DunePattern, EmptyState, Facet, FillBlanksQuestion, FilterBar, FullSheet, GridPaper, HeroCard, HomeworkCard, HotspotQuestion, Icon, IconButton, type IconName, Identity, Input, Interstitial, Khatam, Leaderboard, LinearProgress, ListRow, LivePrompt, MatchQuestion, Menu, NavRail, NoonMark, NotificationBell, Oasis, OrderQuestion, Pagination, PhoneInput, PinInput, Pinboard, PlacedItem, Question, QuestionFrame, QuizOption, Radio, RadioGroup, Rating, ResourceList, ResultReview, type ResultReviewItem, type RouteChapter, RouteMap, type RouteMarker, SearchInput, Segmented, Select, type SelectOption, SessionBar, SessionCard, Skeleton, Slider, SlidesCard, StarsDynamic, StatCard, Stepper, type StreakDay, StreakTracker, Switch, Table, type TableColumn, Tabs, TerrainDynamic, TerrainPattern, Textarea, Theme, ThemeProvider, Timer, TitleBar, Toast, ToastProvider, Tooltip, TypingIndicator, UploadTile, type UploadTileState, VideoCard, VideoTile, VoiceTutor, WaypointMarker, Waypoints, WorkedExampleCard, iconNames, useDragDrop, useTheme, useToast };
