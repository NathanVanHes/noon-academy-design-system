/**
 * Icon — custom SVG icon set for the design system.
 * All icons render at the size passed via `size` prop, defaulting to icon.md (14px).
 * Colour inherits from `color` prop, defaulting to theme.fg.
 *
 * Usage: <Icon name="chevron-left" size={18} color={theme.fgMuted} />
 */
import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Line, Rect } from 'react-native-svg';
import { useTheme } from './ThemeContext';
import { icon as iconTokens } from './tokens';

export type IconName =
  | 'chevron-left' | 'chevron-right' | 'chevron-down' | 'chevron-up'
  | 'arrow-left' | 'arrow-right'
  | 'close' | 'plus' | 'minus' | 'check'
  | 'search' | 'menu' | 'more' | 'more-vertical'
  | 'play' | 'pause'
  | 'expand' | 'collapse'
  | 'document' | 'link'
  | 'info' | 'warning' | 'error'
  | 'keyboard';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

const paths: Record<IconName, (s: number) => React.ReactElement> = {
  'chevron-left': (s) => <Path d={`M${s*0.6} ${s*0.2}L${s*0.3} ${s*0.5}L${s*0.6} ${s*0.8}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />,
  'chevron-right': (s) => <Path d={`M${s*0.4} ${s*0.2}L${s*0.7} ${s*0.5}L${s*0.4} ${s*0.8}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />,
  'chevron-down': (s) => <Path d={`M${s*0.2} ${s*0.4}L${s*0.5} ${s*0.7}L${s*0.8} ${s*0.4}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />,
  'chevron-up': (s) => <Path d={`M${s*0.2} ${s*0.6}L${s*0.5} ${s*0.3}L${s*0.8} ${s*0.6}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />,
  'arrow-left': (s) => <>
    <Path d={`M${s*0.55} ${s*0.2}L${s*0.25} ${s*0.5}L${s*0.55} ${s*0.8}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Line x1={s*0.25} y1={s*0.5} x2={s*0.8} y2={s*0.5} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </>,
  'arrow-right': (s) => <>
    <Path d={`M${s*0.45} ${s*0.2}L${s*0.75} ${s*0.5}L${s*0.45} ${s*0.8}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Line x1={s*0.2} y1={s*0.5} x2={s*0.75} y2={s*0.5} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </>,
  'close': (s) => <>
    <Line x1={s*0.25} y1={s*0.25} x2={s*0.75} y2={s*0.75} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <Line x1={s*0.75} y1={s*0.25} x2={s*0.25} y2={s*0.75} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </>,
  'plus': (s) => <>
    <Line x1={s*0.5} y1={s*0.2} x2={s*0.5} y2={s*0.8} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <Line x1={s*0.2} y1={s*0.5} x2={s*0.8} y2={s*0.5} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </>,
  'minus': (s) => <Line x1={s*0.2} y1={s*0.5} x2={s*0.8} y2={s*0.5} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />,
  'check': (s) => <Path d={`M${s*0.2} ${s*0.5}L${s*0.4} ${s*0.7}L${s*0.8} ${s*0.25}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />,
  'search': (s) => <>
    <Circle cx={s*0.42} cy={s*0.42} r={s*0.22} fill="none" stroke="currentColor" strokeWidth={1.5} />
    <Line x1={s*0.58} y1={s*0.58} x2={s*0.78} y2={s*0.78} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </>,
  'menu': (s) => <>
    <Line x1={s*0.2} y1={s*0.3} x2={s*0.8} y2={s*0.3} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <Line x1={s*0.2} y1={s*0.5} x2={s*0.8} y2={s*0.5} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <Line x1={s*0.2} y1={s*0.7} x2={s*0.6} y2={s*0.7} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </>,
  'more': (s) => <>
    <Circle cx={s*0.25} cy={s*0.5} r={s*0.06} fill="currentColor" />
    <Circle cx={s*0.5} cy={s*0.5} r={s*0.06} fill="currentColor" />
    <Circle cx={s*0.75} cy={s*0.5} r={s*0.06} fill="currentColor" />
  </>,
  'more-vertical': (s) => <>
    <Circle cx={s*0.5} cy={s*0.25} r={s*0.06} fill="currentColor" />
    <Circle cx={s*0.5} cy={s*0.5} r={s*0.06} fill="currentColor" />
    <Circle cx={s*0.5} cy={s*0.75} r={s*0.06} fill="currentColor" />
  </>,
  'play': (s) => <Path d={`M${s*0.3} ${s*0.2}L${s*0.8} ${s*0.5}L${s*0.3} ${s*0.8}Z`} fill="currentColor" />,
  'pause': (s) => <>
    <Rect x={s*0.25} y={s*0.2} width={s*0.15} height={s*0.6} rx={s*0.04} fill="currentColor" />
    <Rect x={s*0.6} y={s*0.2} width={s*0.15} height={s*0.6} rx={s*0.04} fill="currentColor" />
  </>,
  'expand': (s) => <>
    <Path d={`M${s*0.2} ${s*0.4}L${s*0.5} ${s*0.65}L${s*0.8} ${s*0.4}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </>,
  'collapse': (s) => <>
    <Path d={`M${s*0.2} ${s*0.6}L${s*0.5} ${s*0.35}L${s*0.8} ${s*0.6}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </>,
  'document': (s) => <>
    <Path d={`M${s*0.25} ${s*0.15}L${s*0.55} ${s*0.15}L${s*0.75} ${s*0.35}L${s*0.75} ${s*0.85}L${s*0.25} ${s*0.85}Z`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
    <Path d={`M${s*0.55} ${s*0.15}L${s*0.55} ${s*0.35}L${s*0.75} ${s*0.35}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
  </>,
  'link': (s) => <>
    <Path d={`M${s*0.45} ${s*0.55}L${s*0.55} ${s*0.45}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <Path d={`M${s*0.35} ${s*0.5}L${s*0.25} ${s*0.6}A${s*0.14} ${s*0.14} 0 0 0 ${s*0.4} ${s*0.75}L${s*0.5} ${s*0.65}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <Path d={`M${s*0.65} ${s*0.5}L${s*0.75} ${s*0.4}A${s*0.14} ${s*0.14} 0 0 0 ${s*0.6} ${s*0.25}L${s*0.5} ${s*0.35}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </>,
  'info': (s) => <>
    <Circle cx={s*0.5} cy={s*0.5} r={s*0.38} fill="none" stroke="currentColor" strokeWidth={1.5} />
    <Line x1={s*0.5} y1={s*0.42} x2={s*0.5} y2={s*0.68} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <Circle cx={s*0.5} cy={s*0.32} r={s*0.04} fill="currentColor" />
  </>,
  'warning': (s) => <>
    <Path d={`M${s*0.5} ${s*0.15}L${s*0.88} ${s*0.8}L${s*0.12} ${s*0.8}Z`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
    <Line x1={s*0.5} y1={s*0.4} x2={s*0.5} y2={s*0.58} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <Circle cx={s*0.5} cy={s*0.68} r={s*0.04} fill="currentColor" />
  </>,
  'error': (s) => <>
    <Circle cx={s*0.5} cy={s*0.5} r={s*0.38} fill="none" stroke="currentColor" strokeWidth={1.5} />
    <Line x1={s*0.35} y1={s*0.35} x2={s*0.65} y2={s*0.65} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <Line x1={s*0.65} y1={s*0.35} x2={s*0.35} y2={s*0.65} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </>,
  'keyboard': (s) => <>
    <Rect x={s*0.12} y={s*0.25} width={s*0.76} height={s*0.5} rx={s*0.06} fill="none" stroke="currentColor" strokeWidth={1.5} />
    <Line x1={s*0.25} y1={s*0.4} x2={s*0.35} y2={s*0.4} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <Line x1={s*0.45} y1={s*0.4} x2={s*0.55} y2={s*0.4} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <Line x1={s*0.65} y1={s*0.4} x2={s*0.75} y2={s*0.4} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <Line x1={s*0.35} y1={s*0.6} x2={s*0.65} y2={s*0.6} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </>,
};

export function Icon({ name, size = iconTokens.md, color: colorProp }: IconProps) {
  const { theme } = useTheme();
  const c = colorProp || theme.fg;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} color={c}>
      {paths[name](size)}
    </Svg>
  );
}

/** All available icon names */
export const iconNames: IconName[] = Object.keys(paths) as IconName[];
