/**
 * DropZone — target area that accepts a DragItem.
 * States: empty, hovering, filled, correct, incorrect.
 * Measures its own position for hit detection on every layout change.
 */
import React, { useRef, useCallback } from 'react';
import { View, Text, type ViewStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, font } from './tokens';

export type DropZoneState = 'empty' | 'hovering' | 'filled' | 'correct' | 'incorrect';

export interface DropZoneBounds {
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

export function DropZone({ id, label, state = 'empty', children, onMeasure, minWidth, minHeight, inline, neutral }: DropZoneProps) {
  const { theme } = useTheme();
  const ref = useRef<View>(null);
  const onMeasureRef = useRef(onMeasure);
  onMeasureRef.current = onMeasure;

  const measure = useCallback(() => {
    setTimeout(() => {
      ref.current?.measureInWindow((x, y, width, height) => {
        if (width > 0 && height > 0) {
          onMeasureRef.current?.(id, { x, y, width, height });
        }
      });
    }, 50);
  }, [id]);

  // Re-measure when children change (e.g. item placed/removed causing reflow)
  React.useEffect(() => {
    measure();
  }, [children, state]);

  const handleLayout = measure;

  const bgMap: Record<DropZoneState, string> = {
    empty: 'transparent',
    hovering: theme.accentSoft,
    filled: theme.selectedOverlay,
    correct: theme.accentSoft,
    incorrect: theme.dangerSoft,
  };

  const borderMap: Record<DropZoneState, string> = {
    empty: theme.border,
    hovering: theme.accent,
    filled: theme.borderStrong,
    correct: theme.accentBorder,
    incorrect: theme.dangerBorder,
  };

  const hasContent = !!children;
  const showChrome = !inline || !hasContent;
  const isHovering = state === 'hovering';

  const style: ViewStyle = {
    minWidth: minWidth || 80,
    minHeight: showChrome ? (minHeight || 44) : undefined,
    backgroundColor: neutral ? (isHovering ? theme.accentSoft : 'transparent') : (showChrome ? bgMap[state] : 'transparent'),
    borderRadius: r[2],
    borderWidth: showChrome ? 1 : 0,
    borderStyle: neutral ? 'dashed' : (state === 'empty' || isHovering ? 'dashed' : 'solid'),
    borderColor: neutral ? (isHovering ? theme.accent : theme.border) : (showChrome ? borderMap[state] : 'transparent'),
    alignItems: 'center',
    justifyContent: 'center',
    padding: showChrome ? sp[2] : 0,
  };

  return (
    <View ref={ref} onLayout={handleLayout} style={style} collapsable={false}>
      {children || (
        label ? <Text style={{ fontFamily: font.sans, fontSize: fs[12], color: theme.fgFaint }}>{label}</Text> : null
      )}
    </View>
  );
}
