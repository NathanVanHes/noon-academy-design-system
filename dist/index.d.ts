import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';
import { Theme } from './tokens.js';
export { color, dur, font, fs, fw, h, icon, lh, paperElevation, paperTheme, r, sp, voidElevation, voidTheme } from './tokens.js';
import { TextInputProps, TextInput, ViewStyle, ImageSourcePropType } from 'react-native';

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

type IconName = 'chevron-left' | 'chevron-right' | 'chevron-down' | 'chevron-up' | 'arrow-left' | 'arrow-right' | 'close' | 'plus' | 'minus' | 'check' | 'search' | 'menu' | 'more' | 'play' | 'pause' | 'expand' | 'collapse' | 'document' | 'link' | 'info' | 'warning' | 'error';
interface IconProps {
    name: IconName;
    size?: number;
    color?: string;
}
declare function Icon({ name, size, color: colorProp }: IconProps): react_jsx_runtime.JSX.Element;
/** All available icon names */
declare const iconNames: IconName[];

type Variant$9 = 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-solid' | 'signal';
type Size$2 = 'sm' | 'md' | 'lg';
interface ButtonProps {
    children: string;
    variant?: Variant$9;
    size?: Size$2;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    onPress?: () => void;
}
declare function Button({ children, variant, size, disabled, loading, fullWidth, leadingIcon, trailingIcon, onPress }: ButtonProps): react_jsx_runtime.JSX.Element;

type Variant$8 = 'default' | 'primary' | 'ghost' | 'danger';
type Size$1 = 'sm' | 'md' | 'lg';
interface IconButtonProps {
    children: React.ReactNode;
    variant?: Variant$8;
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

/**
 * Textarea — multi-line text input.
 */

interface TextareaProps extends Omit<TextInputProps, 'style'> {
    label?: string;
    error?: string;
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

interface CardProps {
    children: React.ReactNode;
    interactive?: boolean;
    selected?: boolean;
    loading?: boolean;
    error?: boolean;
    live?: boolean;
    onPress?: () => void;
    style?: ViewStyle;
}
declare function Card({ children, interactive, selected, loading, error, live, onPress, style }: CardProps): react_jsx_runtime.JSX.Element;

type Variant$7 = 'default' | 'accent';
interface ChipProps {
    children: string;
    variant?: Variant$7;
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
    size?: Size;
    color?: ColorVariant;
    star?: boolean;
    status?: StatusType;
}
declare function Avatar({ initials, size, color, star, status }: AvatarProps): react_jsx_runtime.JSX.Element;

type Variant$6 = 'default' | 'accent' | 'danger' | 'dot';
interface BadgeProps {
    children?: string | number;
    variant?: Variant$6;
}
declare function Badge({ children, variant }: BadgeProps): react_jsx_runtime.JSX.Element;

interface TableProps {
    columns: string[];
    rows: string[][];
}
declare function Table({ columns, rows }: TableProps): react_jsx_runtime.JSX.Element;

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
}
declare function Calendar({ selected: selectedProp, onSelect, events, expanded: expandedProp, onToggle, backIcon, onBack, rightAction, locale: localeProp }: CalendarProps): react_jsx_runtime.JSX.Element;

interface TabsProps {
    tabs: string[];
    selected: number;
    onSelect: (index: number) => void;
}
declare function Tabs({ tabs, selected, onSelect }: TabsProps): react_jsx_runtime.JSX.Element;

interface NavItem {
    label: string;
    icon: IconName | ((color: string, size: number) => React.ReactNode);
    badge?: number;
}
interface BottomNavProps {
    items: NavItem[];
    selected: number;
    onSelect: (index: number) => void;
}
declare function BottomNav({ items, selected, onSelect }: BottomNavProps): react_jsx_runtime.JSX.Element;

type Variant$5 = 'default' | 'large' | 'transparent' | 'overlay';
interface TitleBarProps {
    title: string;
    subtitle?: string;
    variant?: Variant$5;
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

type Variant$4 = 'info' | 'success' | 'warn' | 'danger';
interface AlertProps {
    title?: string;
    children: string;
    variant?: Variant$4;
}
declare function Alert({ title, children, variant }: AlertProps): react_jsx_runtime.JSX.Element;

type Variant$3 = 'info' | 'success' | 'warn' | 'danger';
interface ToastProps {
    message: string;
    variant?: Variant$3;
    visible: boolean;
    onDismiss: () => void;
    duration?: number;
}
declare function Toast({ message, variant, visible, onDismiss, duration }: ToastProps): react_jsx_runtime.JSX.Element | null;

type Variant$2 = 'info' | 'success' | 'warn' | 'danger';
interface ToastOptions {
    message: string;
    variant?: Variant$2;
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
    children: React.ReactNode;
}
declare function FullSheet({ visible, onClose, title, children }: FullSheetProps): react_jsx_runtime.JSX.Element;

interface TooltipProps {
    text: string;
    children: React.ReactNode;
}
declare function Tooltip({ text, children }: TooltipProps): react_jsx_runtime.JSX.Element;

type SegState = 'correct' | 'incorrect' | 'current' | 'pending';
interface SessionBarProps {
    segments: SegState[];
    size?: 'sm' | 'md' | 'lg';
}
declare function SessionBar({ segments, size }: SessionBarProps): react_jsx_runtime.JSX.Element;

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

type Status = 'pending' | 'in-progress' | 'submitted' | 'overdue' | 'graded';
interface HomeworkCardProps {
    title: string;
    subject: string;
    dueDate: string;
    questions: number;
    status?: Status;
    score?: string;
    onPress?: () => void;
}
declare function HomeworkCard({ title, subject, dueDate, questions, status, score, onPress }: HomeworkCardProps): react_jsx_runtime.JSX.Element;

type State = 'default' | 'selected' | 'correct' | 'incorrect' | 'disabled';
interface QuizOptionProps {
    label: string;
    text?: string;
    image?: ImageSourcePropType;
    state?: State;
    onPress?: () => void;
}
declare function QuizOption({ label, text, image, state, onPress }: QuizOptionProps): react_jsx_runtime.JSX.Element;

interface InterstitialProps {
    title: string;
    body: string;
    buttonLabel: string;
    onPress: () => void;
}
declare function Interstitial({ title, body, buttonLabel, onPress }: InterstitialProps): react_jsx_runtime.JSX.Element;

type Variant$1 = 'standard' | 'major' | 'canvas';
interface GridPaperProps {
    variant?: Variant$1;
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

interface WaterVesselProps {
    fill: number;
    capacity?: number;
    minimum?: number;
    size?: 'sm' | 'md' | 'lg';
}
declare function WaterVessel({ fill, capacity, minimum, size }: WaterVesselProps): react_jsx_runtime.JSX.Element;

interface TerrainPatternProps {
    width: number;
    height: number;
    variant?: 'standard' | 'dense';
    opacity?: number;
    style?: ViewStyle;
}
declare function TerrainPattern({ width, height, variant, opacity, style }: TerrainPatternProps): react_jsx_runtime.JSX.Element;

type Variant = 'constellation' | 'horizon';
interface DunePatternProps {
    width: number;
    height: number;
    variant?: Variant;
    style?: ViewStyle;
}
declare function DunePattern({ width, height, variant, style }: DunePatternProps): react_jsx_runtime.JSX.Element;

type VoiceTutorState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';
interface VoiceTutorProps {
    state?: VoiceTutorState;
    size?: number;
}
declare function VoiceTutor({ state, size }: VoiceTutorProps): react_jsx_runtime.JSX.Element;

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
}
declare function ChatMessage({ children, from, confirmed }: ChatMessageProps): react_jsx_runtime.JSX.Element;

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
    name: string;
    role?: string;
    meta?: string;
    avatarColor?: 'default' | 'noon' | 'blue';
    star?: boolean;
    status?: 'online' | 'busy';
    badge?: string | number;
    right?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
}
declare function Identity({ initials, name, role, meta, avatarColor, star, status, badge, right, size, }: IdentityProps): react_jsx_runtime.JSX.Element;

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
}
declare function Menu({ visible, onClose, items }: MenuProps): react_jsx_runtime.JSX.Element;

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

export { ActivityCard, Alert, Avatar, Badge, BottomNav, BottomSheet, BreakdownCard, Button, Calendar, type CalendarLocale, Card, CardGrid, ChatMessage, Checkbox, CheckboxGroup, Chip, CircularProgress, Dialog, Divider, DunePattern, EmptyState, FilterBar, FullSheet, GridPaper, HomeworkCard, Icon, IconButton, type IconName, Identity, Input, Interstitial, Leaderboard, LinearProgress, Menu, QuizOption, Radio, RadioGroup, ResourceList, Segmented, SessionBar, SessionCard, Skeleton, SlidesCard, Stepper, Switch, Table, Tabs, TerrainPattern, Textarea, Theme, ThemeProvider, TitleBar, Toast, ToastProvider, Tooltip, VideoCard, VoiceTutor, WaterVessel, WaypointMarker, Waypoints, WorkedExampleCard, iconNames, useTheme, useToast };
