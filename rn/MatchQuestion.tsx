/**
 * MatchQuestion — drag items to their matching targets (1:1).
 * All items draggable from source or from zones.
 * Filled zones are the drag handle — same size always.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeContext';
import { DragItem, type DragItemData } from './DragItem';
import { DropZone } from './DropZone';
import { PlacedItem } from './PlacedItem';
import { useDragDrop } from './useDragDrop';
import { QuestionFrame } from './QuestionFrame';
import { sp, fs, fw, font } from './tokens';

interface MatchTarget {
  id: string;
  label: string;
}

interface MatchQuestionProps {
  question: string;
  instruction?: string;
  items: DragItemData[];
  targets: MatchTarget[];
  correctMapping: Record<string, string>;
  mode?: 'practice' | 'exam' | 'review';
  onAnswer?: (placements: Record<string, string>) => void;
}

export function MatchQuestion({ question, instruction, items, targets, correctMapping, mode, onAnswer }: MatchQuestionProps) {
  const { theme } = useTheme();
  const dd = useDragDrop({ items, zones: targets.map(t => t.id), correctMapping, onAnswer });

  const itemInZone = (zoneId: string): DragItemData | undefined => {
    const entry = Object.entries(dd.placements).find(([_, zid]) => zid === zoneId);
    return entry ? items.find(i => i.id === entry[0]) : undefined;
  };

  return (
    <QuestionFrame question={question} instruction={instruction || 'Drag each item to its match'} mode={mode} submitted={dd.submitted} allPlaced={dd.allPlaced} onSubmit={dd.submit} onReset={dd.reset}>
      {/* Targets with drop zones */}
      <View style={{ gap: sp[3], overflow: 'visible' }}>
        {targets.map(target => {
          const placed = itemInZone(target.id);
          const isActive = placed && dd.itemStates[placed.id] === 'dragging';
          return (
            <View key={target.id} style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3], overflow: 'visible', zIndex: isActive ? 100 : 1 }}>
              <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fg, flex: 1 }}>{target.label}</Text>
              <DropZone id={target.id} state={dd.zoneStates[target.id]} onMeasure={dd.registerZone} minWidth={100} inline>
                {placed && (
                  <PlacedItem
                    item={placed}
                    itemState={dd.itemStates[placed.id]}
                    zoneState={dd.zoneStates[target.id]}
                    onDragStart={dd.onDragStart}
                    onDragMove={dd.onDragMove}
                    onDragEnd={dd.onDragEnd}
                    theme={theme}
                  />
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
