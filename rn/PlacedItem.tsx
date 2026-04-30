/**
 * PlacedItem — shared draggable item rendered inside a DropZone.
 * Used by Match, Order, FillBlanks, and Hotspot for placed items.
 * Supports text and image items via DragItemContent.
 */
import React, { useRef } from 'react';
import { Platform } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS } from 'react-native-reanimated';
import { DragItemContent, type DragItemData, type DragItemState } from './DragItem';
import type { DropZoneState } from './DropZone';
import { sp, r, dur } from './tokens';
import type { Theme } from './tokens';

const TIMING = { duration: dur[2], easing: Easing.bezier(0.22, 0.61, 0.36, 1) };

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

export function PlacedItem({ item, itemState, zoneState, onDragStart, onDragMove, onDragEnd, theme, fontSize, compact }: PlacedItemProps) {
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);
  const scale = useSharedValue(1);
  const zIdx = useSharedValue(1);
  const isLocked = itemState === 'correct' || itemState === 'incorrect';

  const cbRef = useRef({ onDragStart, onDragMove, onDragEnd });
  cbRef.current = { onDragStart, onDragMove, onDragEnd };

  const gesture = Gesture.Pan()
    .enabled(!isLocked)
    .onStart(() => {
      zIdx.value = 100;
      scale.value = withTiming(1.05, TIMING);
      if (cbRef.current.onDragStart) runOnJS(cbRef.current.onDragStart)(item.id);
    })
    .onUpdate((e) => {
      tx.value = e.translationX;
      ty.value = e.translationY;
      if (cbRef.current.onDragMove) runOnJS(cbRef.current.onDragMove)(item.id, e.absoluteX, e.absoluteY);
    })
    .onEnd((e) => {
      if (cbRef.current.onDragEnd) runOnJS(cbRef.current.onDragEnd)(item.id, e.absoluteX, e.absoluteY);
      tx.value = withTiming(0, TIMING);
      ty.value = withTiming(0, TIMING);
      scale.value = withTiming(1, TIMING);
      zIdx.value = 1;
    })
    .onFinalize(() => {
      tx.value = withTiming(0, TIMING);
      ty.value = withTiming(0, TIMING);
      scale.value = withTiming(1, TIMING);
      zIdx.value = 1;
    });

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }, { translateY: ty.value }, { scale: scale.value }],
    zIndex: zIdx.value,
  }));

  const isHovered = zoneState === 'hovering';
  const isDrag = itemState === 'dragging';
  const bg = isHovered ? theme.accentSoft : theme.bgRaised;
  const border = itemState === 'correct' ? theme.accent : itemState === 'incorrect' ? theme.danger : isDrag ? theme.accent : isHovered ? theme.accent : theme.borderStrong;
  const borderStyle = isHovered ? 'dashed' : 'solid';

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[{
        backgroundColor: bg,
        borderRadius: r[2],
        borderWidth: 1.5,
        borderStyle,
        borderColor: border,
        paddingVertical: item.image ? 0 : (compact ? sp[0.5] : sp[2]),
        paddingHorizontal: item.image ? 0 : (compact ? sp[2] : sp[3]),
        alignItems: 'center',
        overflow: 'hidden',
        ...(Platform.OS === 'web' ? { userSelect: 'none', cursor: isLocked ? 'default' : 'grab' } : {}),
      } as any, animStyle]}>
        <DragItemContent item={item} fontSize={fontSize} />
      </Animated.View>
    </GestureDetector>
  );
}
