/**
 * GridPaper — signature background texture from the surveyor's field notebook.
 * Renders a tiling grid pattern as an SVG overlay.
 * Variants: standard (16px), major (64px gold over 8px chalk), canvas (24px faint).
 */
import React from 'react';
import { View, type ViewStyle } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { useTheme } from './ThemeContext';

type Variant = 'standard' | 'major' | 'canvas';

interface GridPaperProps {
  variant?: Variant;
  width: number;
  height: number;
  style?: ViewStyle;
}

export function GridPaper({ variant = 'standard', width, height, style }: GridPaperProps) {
  const { theme, mode } = useTheme();

  const isVoid = mode === 'void';
  const lineColor = isVoid ? 'rgba(232,228,220,0.08)' : 'rgba(10,15,26,0.08)';
  const goldColor = isVoid ? 'rgba(201,162,39,0.10)' : 'rgba(122,96,20,0.10)';
  const canvasColor = isVoid ? 'rgba(232,228,220,0.025)' : 'rgba(10,15,26,0.03)';

  const lines: React.ReactElement[] = [];

  if (variant === 'standard') {
    const step = 16;
    for (let x = 0; x <= width; x += step) {
      lines.push(<Line key={`v${x}`} x1={x} y1={0} x2={x} y2={height} stroke={lineColor} strokeWidth={0.5} />);
    }
    for (let y = 0; y <= height; y += step) {
      lines.push(<Line key={`h${y}`} x1={0} y1={y} x2={width} y2={y} stroke={lineColor} strokeWidth={0.5} />);
    }
  } else if (variant === 'major') {
    const minor = 8;
    const major = 64;
    for (let x = 0; x <= width; x += minor) {
      const isMajor = x % major === 0;
      lines.push(<Line key={`v${x}`} x1={x} y1={0} x2={x} y2={height} stroke={isMajor ? goldColor : lineColor} strokeWidth={0.5} />);
    }
    for (let y = 0; y <= height; y += minor) {
      const isMajor = y % major === 0;
      lines.push(<Line key={`h${y}`} x1={0} y1={y} x2={width} y2={y} stroke={isMajor ? goldColor : lineColor} strokeWidth={0.5} />);
    }
  } else {
    const step = 24;
    for (let x = 0; x <= width; x += step) {
      lines.push(<Line key={`v${x}`} x1={x} y1={0} x2={x} y2={height} stroke={canvasColor} strokeWidth={0.5} />);
    }
    for (let y = 0; y <= height; y += step) {
      lines.push(<Line key={`h${y}`} x1={0} y1={y} x2={width} y2={y} stroke={canvasColor} strokeWidth={0.5} />);
    }
  }

  return (
    <View style={[{ width, height, backgroundColor: theme.bg }, style]}>
      <Svg width={width} height={height} style={{ position: 'absolute' }}>
        {lines}
      </Svg>
    </View>
  );
}
