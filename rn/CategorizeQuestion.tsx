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
  items: DragItemData[];
  categories: Category[];
  correctMapping: Record<string, string>;
  instruction?: string;
  optionsPosition?: 'top' | 'bottom';
  showButtons?: boolean;
  onAnswer?: (placements: Record<string, string>) => void;
  onReady?: (controls: { submit: () => void; reset: () => void; allPlaced: boolean; submitted: boolean }) => void;
}

export function CategorizeQuestion({ items, categories, correctMapping, instruction, optionsPosition, showButtons, onAnswer, onReady }: CategorizeQuestionProps) {
  const { theme } = useTheme();
  const dd = useDragDrop({ items, zones: categories.map(c => c.id), correctMapping, allowMultiplePerZone: true, onAnswer });

  const onReadyRef = React.useRef(onReady);
  onReadyRef.current = onReady;

  React.useEffect(() => {
    onReadyRef.current?.({ submit: dd.submit, reset: dd.reset, allPlaced: dd.allPlaced, submitted: dd.submitted });
  }, [dd.allPlaced, dd.submitted]);

  const itemsInZone = (zoneId: string): DragItemData[] => {
    return Object.entries(dd.placements)
      .filter(([_, zid]) => zid === zoneId)
      .map(([iid]) => items.find(i => i.id === iid)!)
      .filter(Boolean);
  };

  const sourceItems = !dd.submitted ? (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: sp[2], alignItems: 'flex-start', minHeight: sp[2], overflow: 'visible' }}>
      {items.filter(item => !dd.placements[item.id]).map(item => (
        <DragItem key={item.id} item={item} state={dd.itemStates[item.id]} onDragStart={dd.onDragStart} onDragMove={dd.onDragMove} onDragEnd={dd.onDragEnd} />
      ))}
    </View>
  ) : null;

  return (
    <QuestionFrame instruction={instruction || 'Drag each item into the correct category'} optionsPosition={optionsPosition} options={sourceItems} showButtons={showButtons} submitted={dd.submitted} allPlaced={dd.allPlaced} onSubmit={dd.submit} onReset={dd.reset}>
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
                      <DragItem key={p.id} item={p} state={dd.itemStates[p.id]} onDragStart={dd.onDragStart} onDragMove={dd.onDragMove} onDragEnd={dd.onDragEnd} />
                    ))}
                  </View>
                )}
              </DropZone>
            </View>
          );
        })}
      </View>
    </QuestionFrame>
  );
}
