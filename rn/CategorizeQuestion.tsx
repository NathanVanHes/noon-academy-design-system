/**
 * CategorizeQuestion — drag items into category buckets (many:1).
 * Buckets keep their dashed style always. Only items show correct/incorrect.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeContext';
import { DragItem, type DragItemData } from './DragItem';
import { DropZone } from './DropZone';
import { useDragDrop } from './useDragDrop';
import { QuestionFrame } from './QuestionFrame';
import { sp, fs, fw, font } from './tokens';

interface Category {
  id: string;
  label: string;
}

interface CategorizeQuestionProps {
  question: string;
  instruction?: string;
  items: DragItemData[];
  categories: Category[];
  correctMapping: Record<string, string>;
  mode?: 'practice' | 'exam' | 'review';
  onAnswer?: (placements: Record<string, string>) => void;
}

export function CategorizeQuestion({ question, instruction, items, categories, correctMapping, mode, onAnswer }: CategorizeQuestionProps) {
  const { theme } = useTheme();
  const dd = useDragDrop({ items, zones: categories.map(c => c.id), correctMapping, allowMultiplePerZone: true, onAnswer });

  const itemsInZone = (zoneId: string): DragItemData[] => {
    return Object.entries(dd.placements)
      .filter(([_, zid]) => zid === zoneId)
      .map(([iid]) => items.find(i => i.id === iid)!)
      .filter(Boolean);
  };

  return (
    <QuestionFrame question={question} instruction={instruction || 'Drag each item into the correct category'} mode={mode} submitted={dd.submitted} allPlaced={dd.allPlaced} onSubmit={dd.submit} onReset={dd.reset}>
      {/* Category buckets */}
      <View style={{ flexDirection: 'row', gap: sp[3], overflow: 'visible' }}>
        {categories.map(cat => {
          const placed = itemsInZone(cat.id);
          return (
            <View key={cat.id} style={{ flex: 1, overflow: 'visible' }}>
              <Text style={{ fontFamily: font.mono, fontSize: fs[11], fontWeight: fw[600], color: theme.fgMuted, marginBottom: sp[2], textAlign: 'center' }}>{cat.label}</Text>
              <DropZone id={cat.id} state={dd.zoneStates[cat.id]} onMeasure={dd.registerZone} minHeight={80} neutral>
                {placed.length > 0 && (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: sp[2], alignItems: 'flex-start', padding: sp[1] }}>
                    {placed.map(p => (
                      <DragItem
                        key={p.id}
                        item={p}
                        state={dd.itemStates[p.id]}
                        onDragStart={dd.onDragStart}
                        onDragMove={dd.onDragMove}
                        onDragEnd={dd.onDragEnd}
                      />
                    ))}
                  </View>
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
