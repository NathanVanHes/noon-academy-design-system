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
  | 'keyboard'
  | 'bell'
  | 'mic' | 'mic-off' | 'camera' | 'camera-off'
  | 'hand' | 'send' | 'chat' | 'leave'
  | 'home' | 'user' | 'book' | 'globe' | 'volume' | 'map' | 'video'
  | 'tutor';

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
  'bell': (s) => <>
    <Path d={`M${s*0.3} ${s*0.62}L${s*0.3} ${s*0.42}A${s*0.2} ${s*0.2} 0 0 1 ${s*0.7} ${s*0.42}L${s*0.7} ${s*0.62}L${s*0.78} ${s*0.72}L${s*0.22} ${s*0.72}Z`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
    <Path d={`M${s*0.42} ${s*0.8}A${s*0.09} ${s*0.09} 0 0 0 ${s*0.58} ${s*0.8}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </>,
  'mic': (s) => <>
    <Rect x={s*0.4} y={s*0.12} width={s*0.2} height={s*0.38} rx={s*0.1} fill="none" stroke="currentColor" strokeWidth={1.5} />
    <Path d={`M${s*0.28} ${s*0.42}L${s*0.28} ${s*0.47}A${s*0.22} ${s*0.22} 0 0 0 ${s*0.72} ${s*0.47}L${s*0.72} ${s*0.42}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <Line x1={s*0.5} y1={s*0.69} x2={s*0.5} y2={s*0.84} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </>,
  'mic-off': (s) => <>
    <Rect x={s*0.4} y={s*0.12} width={s*0.2} height={s*0.38} rx={s*0.1} fill="none" stroke="currentColor" strokeWidth={1.5} />
    <Path d={`M${s*0.28} ${s*0.42}L${s*0.28} ${s*0.47}A${s*0.22} ${s*0.22} 0 0 0 ${s*0.72} ${s*0.47}L${s*0.72} ${s*0.42}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <Line x1={s*0.5} y1={s*0.69} x2={s*0.5} y2={s*0.84} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <Line x1={s*0.18} y1={s*0.15} x2={s*0.82} y2={s*0.85} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </>,
  'camera': (s) => <>
    <Rect x={s*0.1} y={s*0.28} width={s*0.5} height={s*0.44} rx={s*0.08} fill="none" stroke="currentColor" strokeWidth={1.5} />
    <Path d={`M${s*0.6} ${s*0.44}L${s*0.86} ${s*0.32}L${s*0.86} ${s*0.68}L${s*0.6} ${s*0.56}Z`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
  </>,
  'camera-off': (s) => <>
    <Rect x={s*0.1} y={s*0.28} width={s*0.5} height={s*0.44} rx={s*0.08} fill="none" stroke="currentColor" strokeWidth={1.5} />
    <Path d={`M${s*0.6} ${s*0.44}L${s*0.86} ${s*0.32}L${s*0.86} ${s*0.68}L${s*0.6} ${s*0.56}Z`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
    <Line x1={s*0.14} y1={s*0.14} x2={s*0.86} y2={s*0.86} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </>,
  'hand': (s) => <>
    <Path d={`M${s*0.32} ${s*0.52}L${s*0.32} ${s*0.28}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <Path d={`M${s*0.46} ${s*0.48}L${s*0.46} ${s*0.16}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <Path d={`M${s*0.6} ${s*0.52}L${s*0.6} ${s*0.22}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <Path d={`M${s*0.32} ${s*0.5}L${s*0.32} ${s*0.62}A${s*0.19} ${s*0.19} 0 0 0 ${s*0.7} ${s*0.62}L${s*0.7} ${s*0.4}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </>,
  'send': (s) => <Path d={`M${s*0.15} ${s*0.5}L${s*0.85} ${s*0.18}L${s*0.62} ${s*0.85}L${s*0.46} ${s*0.58}Z`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />,
  'chat': (s) => <>
    <Rect x={s*0.15} y={s*0.18} width={s*0.7} height={s*0.48} rx={s*0.1} fill="none" stroke="currentColor" strokeWidth={1.5} />
    <Path d={`M${s*0.32} ${s*0.66}L${s*0.32} ${s*0.82}L${s*0.48} ${s*0.66}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
  </>,
  'leave': (s) => <>
    <Path d={`M${s*0.45} ${s*0.15}L${s*0.18} ${s*0.15}L${s*0.18} ${s*0.85}L${s*0.45} ${s*0.85}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Line x1={s*0.38} y1={s*0.5} x2={s*0.8} y2={s*0.5} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <Path d={`M${s*0.65} ${s*0.35}L${s*0.8} ${s*0.5}L${s*0.65} ${s*0.65}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </>,
  'home': (s) => <>
    <Path d={`M${s*0.2} ${s*0.45}L${s*0.5} ${s*0.2}L${s*0.8} ${s*0.45}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d={`M${s*0.28} ${s*0.42}V${s*0.78}H${s*0.72}V${s*0.42}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </>,
  'user': (s) => <>
    <Circle cx={s*0.5} cy={s*0.36} r={s*0.16} fill="none" stroke="currentColor" strokeWidth={1.5} />
    <Path d={`M${s*0.22} ${s*0.8}C${s*0.22} ${s*0.63} ${s*0.34} ${s*0.58} ${s*0.5} ${s*0.58}C${s*0.66} ${s*0.58} ${s*0.78} ${s*0.63} ${s*0.78} ${s*0.8}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </>,
  'book': (s) => <>
    <Path d={`M${s*0.5} ${s*0.28}C${s*0.42} ${s*0.2} ${s*0.28} ${s*0.2} ${s*0.2} ${s*0.24}V${s*0.74}C${s*0.28} ${s*0.7} ${s*0.42} ${s*0.7} ${s*0.5} ${s*0.78}C${s*0.58} ${s*0.7} ${s*0.72} ${s*0.7} ${s*0.8} ${s*0.74}V${s*0.24}C${s*0.72} ${s*0.2} ${s*0.58} ${s*0.2} ${s*0.5} ${s*0.28}Z`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
    <Line x1={s*0.5} y1={s*0.28} x2={s*0.5} y2={s*0.78} stroke="currentColor" strokeWidth={1.5} />
  </>,
  'globe': (s) => <>
    <Circle cx={s*0.5} cy={s*0.5} r={s*0.3} fill="none" stroke="currentColor" strokeWidth={1.5} />
    <Line x1={s*0.2} y1={s*0.5} x2={s*0.8} y2={s*0.5} stroke="currentColor" strokeWidth={1.5} />
    <Path d={`M${s*0.5} ${s*0.2}C${s*0.62} ${s*0.32} ${s*0.62} ${s*0.68} ${s*0.5} ${s*0.8}C${s*0.38} ${s*0.68} ${s*0.38} ${s*0.32} ${s*0.5} ${s*0.2}Z`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
  </>,
  'volume': (s) => <>
    <Path d={`M${s*0.2} ${s*0.4}H${s*0.34}L${s*0.5} ${s*0.25}V${s*0.75}L${s*0.34} ${s*0.6}H${s*0.2}Z`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
    <Path d={`M${s*0.62} ${s*0.38}C${s*0.68} ${s*0.44} ${s*0.68} ${s*0.56} ${s*0.62} ${s*0.62}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <Path d={`M${s*0.7} ${s*0.3}C${s*0.8} ${s*0.4} ${s*0.8} ${s*0.6} ${s*0.7} ${s*0.7}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </>,
  'map': (s) => <>
    <Path d={`M${s*0.2} ${s*0.28}L${s*0.4} ${s*0.2}L${s*0.6} ${s*0.28}L${s*0.8} ${s*0.2}V${s*0.72}L${s*0.6} ${s*0.8}L${s*0.4} ${s*0.72}L${s*0.2} ${s*0.8}Z`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
    <Line x1={s*0.4} y1={s*0.2} x2={s*0.4} y2={s*0.72} stroke="currentColor" strokeWidth={1.5} />
    <Line x1={s*0.6} y1={s*0.28} x2={s*0.6} y2={s*0.8} stroke="currentColor" strokeWidth={1.5} />
  </>,
  'video': (s) => <>
    <Rect x={s*0.18} y={s*0.3} width={s*0.42} height={s*0.4} rx={s*0.06} fill="none" stroke="currentColor" strokeWidth={1.5} />
    <Path d={`M${s*0.6} ${s*0.45}L${s*0.82} ${s*0.33}V${s*0.67}L${s*0.6} ${s*0.55}`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
  </>,
  'tutor': (s) => <>
    <Circle cx={s*0.5} cy={s*0.5} r={s*0.38} fill="#B08AF9" />
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
