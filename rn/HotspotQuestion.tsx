/**
 * HotspotQuestion — drag items onto marked zones on an image.
 * Same drag pattern as Match — placed items are draggable from zones.
 */
import React from 'react';
import { View, Image, type ImageSourcePropType } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useTheme } from './ThemeContext';
import { DragItem, type DragItemData } from './DragItem';
import { DropZone } from './DropZone';
import { PlacedItem } from './PlacedItem';
import { useDragDrop } from './useDragDrop';
import { QuestionFrame } from './QuestionFrame';
import { sp, r, fs, dur } from './tokens';
import type { Theme } from './tokens';

const TIMING = { duration: dur[2], easing: Easing.bezier(0.22, 0.61, 0.36, 1) };

interface HotspotZone {
  id: string;
  label?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface HotspotQuestionProps {
  question: string;
  instruction?: string;
  image: ImageSourcePropType;
  imageAspectRatio?: number;
  zones: HotspotZone[];
  items: DragItemData[];
  correctMapping: Record<string, string>;
  mode?: 'practice' | 'exam' | 'review';
  onAnswer?: (placements: Record<string, string>) => void;
}

const MARKER_SIZE = 12;
const MARKER_ACTIVE = 28;
const MARKER_HOVER = 48;

function HotspotMarker({ state, isDragging, theme }: { state: string; isDragging: boolean; theme: Theme }) {
  const isHovering = state === 'hovering';
  const scale = useSharedValue(1);

  React.useEffect(() => {
    const target = isHovering ? MARKER_HOVER / MARKER_SIZE : isDragging ? MARKER_ACTIVE / MARKER_SIZE : 1;
    scale.value = withTiming(target, TIMING);
  }, [isHovering, isDragging]);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <Animated.View style={[{
        width: MARKER_SIZE,
        height: MARKER_SIZE,
        borderRadius: MARKER_SIZE / 2,
        backgroundColor: isHovering ? theme.accent : theme.accentSoft,
        borderWidth: 1.5,
        borderColor: theme.accent,
        opacity: isHovering ? 0.5 : isDragging ? 0.4 : 0.6,
      }, ringStyle]} />
    </View>
  );
}

export function HotspotQuestion({ question, instruction, image, imageAspectRatio = 16 / 9, zones, items, correctMapping, mode, onAnswer }: HotspotQuestionProps) {
  const { theme } = useTheme();
  const dd = useDragDrop({ items, zones: zones.map(z => z.id), correctMapping, onAnswer });

  const itemInZone = (zoneId: string): DragItemData | undefined => {
    const entry = Object.entries(dd.placements).find(([_, zid]) => zid === zoneId);
    return entry ? items.find(i => i.id === entry[0]) : undefined;
  };

  return (
    <QuestionFrame question={question} instruction={instruction || 'Drag items to the correct regions'} mode={mode} submitted={dd.submitted} allPlaced={dd.allPlaced} onSubmit={dd.submit} onReset={dd.reset}>
      {/* Image with overlay zones */}
      <View style={{ width: '100%', aspectRatio: imageAspectRatio, borderRadius: r[2], overflow: 'visible', borderWidth: 1, borderColor: theme.border }}>
        <Image source={image} style={{ width: '100%', height: '100%', borderRadius: r[2] - 1 }} resizeMode="cover" />
        {zones.map(zone => {
          const placed = itemInZone(zone.id);
          return (
            <View key={zone.id} style={{ position: 'absolute', left: `${zone.x}%`, top: `${zone.y}%`, width: `${zone.width}%`, height: `${zone.height}%`, overflow: 'visible', zIndex: placed && dd.itemStates[placed.id] === 'dragging' ? 100 : 1 }}>
              <DropZone id={zone.id} state={dd.zoneStates[zone.id]} onMeasure={dd.registerZone} minWidth={0} minHeight={0} inline>
                {placed ? (
                  <PlacedItem
                    item={placed}
                    itemState={dd.itemStates[placed.id]}
                    zoneState={dd.zoneStates[zone.id]}
                    onDragStart={dd.onDragStart}
                    onDragMove={dd.onDragMove}
                    onDragEnd={dd.onDragEnd}
                    theme={theme}
                    fontSize={fs[13]}
                  />
                ) : (
                  <HotspotMarker state={dd.zoneStates[zone.id]} isDragging={!!dd.draggingId} theme={theme} />
                )}
              </DropZone>
            </View>
          );
        })}
      </View>

      {/* Source items — only show unplaced */}
      {!dd.submitted && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: sp[2], alignItems: 'flex-start', minHeight: sp[2], overflow: 'visible' }}>
          {items.filter(item => !dd.placements[item.id]).map(item => (
            <DragItem
              key={item.id}
              item={item}
              state={dd.itemStates[item.id]}
              onDragStart={dd.onDragStart}
              onDragMove={dd.onDragMove}
              onDragEnd={dd.onDragEnd}
            />
          ))}
        </View>
      )}
    </QuestionFrame>
  );
}
