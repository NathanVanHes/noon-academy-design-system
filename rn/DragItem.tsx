/**
 * DragItem — draggable piece for question types.
 * Uses react-native-gesture-handler + react-native-reanimated for smooth cross-platform drag.
 * States: idle, dragging, placed, correct, incorrect, disabled.
 */
import React, { useRef } from 'react';
import { Image, Text, Platform, type ViewStyle, type ImageSourcePropType } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS } from 'react-native-reanimated';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font, dur } from './tokens';

const TIMING_CONFIG = { duration: dur[2], easing: Easing.bezier(0.22, 0.61, 0.36, 1) };

export type DragItemState = 'idle' | 'dragging' | 'placed' | 'correct' | 'incorrect' | 'disabled';

export interface DragItemData {
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

const IMG_MIN = 32;
const IMG_MAX = 80;

/** Renders the content of a drag item — text or image. Reused by zone item renderers. */
export function DragItemContent({ item, fontSize = fs[14] }: { item: DragItemData; fontSize?: number }) {
  const { theme } = useTheme();
  const imgSize = Math.min(IMG_MAX, Math.max(IMG_MIN, item.imageSize || 48));
  if (item.image) {
    return <Image source={item.image} style={{ width: imgSize, height: imgSize, borderRadius: r[1] }} resizeMode="contain" />;
  }
  return <Text style={{ fontFamily: font.sans, fontSize, fontWeight: fw[500], color: theme.fg, ...(Platform.OS === 'web' ? { userSelect: 'none' } : {}) } as any}>{item.label}</Text>;
}

export function DragItem({ item, state = 'idle', onDragStart, onDragMove, onDragEnd }: DragItemProps) {
  const { theme } = useTheme();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const zIdx = useSharedValue(1);
  const isDragging = state === 'dragging';
  const isPlaced = state === 'placed' || state === 'correct' || state === 'incorrect';
  const isDisabled = state === 'disabled';
  const isLocked = state === 'correct' || state === 'incorrect';
  const canDrag = !isDisabled && !isLocked;

  // Store callbacks in ref so gesture handler always uses latest
  const cbRef = useRef({ onDragStart, onDragMove, onDragEnd });
  cbRef.current = { onDragStart, onDragMove, onDragEnd };

  const gesture = Gesture.Pan()
    .enabled(canDrag)
    .onStart(() => {
      zIdx.value = 100;
      scale.value = withTiming(1.05, TIMING_CONFIG);
      if (cbRef.current.onDragStart) runOnJS(cbRef.current.onDragStart)(item.id);
    })
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
      if (cbRef.current.onDragMove) runOnJS(cbRef.current.onDragMove)(item.id, e.absoluteX, e.absoluteY);
    })
    .onEnd((e) => {
      if (cbRef.current.onDragEnd) runOnJS(cbRef.current.onDragEnd)(item.id, e.absoluteX, e.absoluteY);
      translateX.value = withTiming(0, TIMING_CONFIG);
      translateY.value = withTiming(0, TIMING_CONFIG);
      scale.value = withTiming(1, TIMING_CONFIG);
      zIdx.value = 1;
    })
    .onFinalize(() => {
      translateX.value = withTiming(0, TIMING_CONFIG);
      translateY.value = withTiming(0, TIMING_CONFIG);
      scale.value = withTiming(1, TIMING_CONFIG);
      zIdx.value = 1;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    zIndex: zIdx.value,
    shadowOpacity: zIdx.value > 1 ? 0.25 : 0,
  }));

  const bgMap: Record<DragItemState, string> = {
    idle: theme.bgRaised,
    dragging: theme.bgOverlay,
    placed: theme.bgRaised,
    correct: theme.accentSoft,
    incorrect: theme.dangerSoft,
    disabled: theme.bgRaised,
  };

  const borderMap: Record<DragItemState, string> = {
    idle: theme.borderStrong,
    dragging: theme.accent,
    placed: theme.borderStrong,
    correct: theme.accentBorder,
    incorrect: theme.dangerBorder,
    disabled: theme.border,
  };

  const imgSize = Math.min(IMG_MAX, Math.max(IMG_MIN, item.imageSize || 48));

  const containerStyle: ViewStyle = {
    backgroundColor: bgMap[state],
    borderRadius: r[2],
    borderWidth: 1,
    borderColor: borderMap[state],
    paddingVertical: sp[2],
    paddingHorizontal: item.image ? sp[2] : sp[3],
    opacity: isDisabled ? 0.4 : 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 8,
    ...(Platform.OS === 'web' ? { userSelect: 'none', cursor: canDrag ? 'grab' : 'default' } : {}),
  } as ViewStyle;

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[containerStyle, animatedStyle]}>
        {item.image ? (
          <Image source={item.image} style={{ width: imgSize, height: imgSize, borderRadius: r[1] }} resizeMode="contain" />
        ) : (
          <Text style={{ fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: theme.fg, ...(Platform.OS === 'web' ? { userSelect: 'none' } : {}) } as any}>{item.label}</Text>
        )}
      </Animated.View>
    </GestureDetector>
  );
}
