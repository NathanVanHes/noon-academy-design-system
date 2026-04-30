/**
 * FillBlanksQuestion — drag items into blanks within a sentence.
 * Same drag pattern as Match — placed items are draggable from their zone.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeContext';
import { DragItem, type DragItemData } from './DragItem';
import { DropZone } from './DropZone';
import { PlacedItem } from './PlacedItem';
import { useDragDrop } from './useDragDrop';
import { QuestionFrame } from './QuestionFrame';
import { sp, r, fs, font } from './tokens';

interface FillBlanksQuestionProps {
  question: string;
  instruction?: string;
  sentence: string;
  items: DragItemData[];
  correctMapping: Record<string, string>;
  mode?: 'practice' | 'exam' | 'review';
  onAnswer?: (placements: Record<string, string>) => void;
}

export function FillBlanksQuestion({ question, instruction, sentence, items, correctMapping, mode, onAnswer }: FillBlanksQuestionProps) {
  const { theme } = useTheme();
  const blankIds = sentence.match(/\{\{(\w+)\}\}/g)?.map(m => m.slice(2, -2)) || [];
  const dd = useDragDrop({ items, zones: blankIds, correctMapping, onAnswer });

  const itemInZone = (zoneId: string): DragItemData | undefined => {
    const entry = Object.entries(dd.placements).find(([_, zid]) => zid === zoneId);
    return entry ? items.find(i => i.id === entry[0]) : undefined;
  };

  const parts = sentence.split(/(\{\{\w+\}\})/g);

  return (
    <QuestionFrame question={question} instruction={instruction || 'Drag words into the blanks'} mode={mode} submitted={dd.submitted} allPlaced={dd.allPlaced} onSubmit={dd.submit} onReset={dd.reset}>
      {/* Sentence with inline blanks */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: sp[1], backgroundColor: theme.bgRaised, borderRadius: r[2], borderWidth: 1, borderColor: theme.border, padding: sp[4], overflow: 'visible' }}>
        {parts.map((part, i) => {
          const blankMatch = part.match(/^\{\{(\w+)\}\}$/);
          if (blankMatch) {
            const blankId = blankMatch[1];
            const placed = itemInZone(blankId);
            return (
              <DropZone key={i} id={blankId} state={dd.zoneStates[blankId]} onMeasure={dd.registerZone} minWidth={60} minHeight={32} inline>
                {placed && (
                  <PlacedItem
                    item={placed}
                    itemState={dd.itemStates[placed.id]}
                    zoneState={dd.zoneStates[blankId]}
                    onDragStart={dd.onDragStart}
                    onDragMove={dd.onDragMove}
                    onDragEnd={dd.onDragEnd}
                    theme={theme}
                    compact
                  />
                )}
              </DropZone>
            );
          }
          if (!part) return null;
          return <Text key={i} style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fg, lineHeight: 32 }}>{part}</Text>;
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
