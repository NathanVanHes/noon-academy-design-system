/**
 * OrderQuestion — drag items into the correct sequence.
 * Items sit inside slots cleanly. Zones keep dashed style until submitted.
 * On submit, zone borders show correct/incorrect.
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

interface OrderQuestionProps {
  question: string;
  instruction?: string;
  items: DragItemData[];
  correctOrder: string[];
  mode?: 'practice' | 'exam' | 'review';
  onAnswer?: (placements: Record<string, string>) => void;
}

export function OrderQuestion({ question, instruction, items, correctOrder, mode, onAnswer }: OrderQuestionProps) {
  const { theme } = useTheme();
  const zones = correctOrder.map((_, i) => `slot-${i}`);
  const correctMapping = Object.fromEntries(correctOrder.map((id, i) => [id, `slot-${i}`]));
  const dd = useDragDrop({ items, zones, correctMapping, showZoneResults: true, onAnswer });

  const itemInZone = (zoneId: string): DragItemData | undefined => {
    const entry = Object.entries(dd.placements).find(([_, zid]) => zid === zoneId);
    return entry ? items.find(i => i.id === entry[0]) : undefined;
  };

  return (
    <QuestionFrame question={question} instruction={instruction || 'Drag items into the correct order'} mode={mode} submitted={dd.submitted} allPlaced={dd.allPlaced} onSubmit={dd.submit} onReset={dd.reset}>
      {/* Numbered slots */}
      <View style={{ gap: sp[2], overflow: 'visible' }}>
        {zones.map((zoneId, i) => {
          const placed = itemInZone(zoneId);
          const isActive = placed && (dd.itemStates[placed.id] === 'dragging');
          return (
            <View key={zoneId} style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3], overflow: 'visible', zIndex: isActive ? 100 : 1 }}>
              <Text style={{ fontFamily: font.mono, fontSize: fs[13], fontWeight: fw[600], color: theme.fgFaint, minWidth: 24, textAlign: 'center' }}>{i + 1}</Text>
              <View style={{ flex: 1, overflow: 'visible' }}>
                <DropZone id={zoneId} state={dd.zoneStates[zoneId]} onMeasure={dd.registerZone} minHeight={40} inline>
                  {placed && (
                    <PlacedItem
                      item={placed}
                      itemState={dd.itemStates[placed.id]}
                      zoneState={dd.zoneStates[zoneId]}
                      onDragStart={dd.onDragStart}
                      onDragMove={dd.onDragMove}
                      onDragEnd={dd.onDragEnd}
                      theme={theme}
                      fontSize={fs[13]}
                    />
                  )}
                </DropZone>
              </View>
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
