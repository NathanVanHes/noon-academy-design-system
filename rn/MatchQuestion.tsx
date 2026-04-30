/**
 * MatchQuestion — drag items to their matching targets (1:1).
 * All items draggable from source or from zones.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './ThemeContext';
import { DragItem, type DragItemData } from './DragItem';
import { DropZone } from './DropZone';
import { PlacedItem } from './PlacedItem';
import { useDragDrop } from './useDragDrop';
import { QuestionFrame } from './QuestionFrame';
import { sp, fs, font } from './tokens';

interface MatchTarget {
  id: string;
  label: string;
}

interface MatchQuestionProps {
  items: DragItemData[];
  targets: MatchTarget[];
  correctMapping: Record<string, string>;
  instruction?: string;
  optionsPosition?: 'top' | 'bottom';
  showButtons?: boolean;
  onAnswer?: (placements: Record<string, string>) => void;
  onReady?: (controls: { submit: () => void; reset: () => void; allPlaced: boolean; submitted: boolean }) => void;
}

export function MatchQuestion({ items, targets, correctMapping, instruction, optionsPosition, showButtons, onAnswer, onReady }: MatchQuestionProps) {
  const { theme } = useTheme();
  const dd = useDragDrop({ items, zones: targets.map(t => t.id), correctMapping, onAnswer });

  const onReadyRef = React.useRef(onReady);
  onReadyRef.current = onReady;

  React.useEffect(() => {
    onReadyRef.current?.({ submit: dd.submit, reset: dd.reset, allPlaced: dd.allPlaced, submitted: dd.submitted });
  }, [dd.allPlaced, dd.submitted]);

  const itemInZone = (zoneId: string): DragItemData | undefined => {
    const entry = Object.entries(dd.placements).find(([_, zid]) => zid === zoneId);
    return entry ? items.find(i => i.id === entry[0]) : undefined;
  };

  const sourceItems = !dd.submitted ? (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: sp[2], alignItems: 'flex-start', minHeight: sp[2], overflow: 'visible' }}>
      {items.filter(item => !dd.placements[item.id]).map(item => (
        <DragItem key={item.id} item={item} state={dd.itemStates[item.id]} onDragStart={dd.onDragStart} onDragMove={dd.onDragMove} onDragEnd={dd.onDragEnd} />
      ))}
    </View>
  ) : null;

  return (
    <QuestionFrame instruction={instruction || 'Drag each item to its match'} optionsPosition={optionsPosition} options={sourceItems} showButtons={showButtons} submitted={dd.submitted} allPlaced={dd.allPlaced} onSubmit={dd.submit} onReset={dd.reset}>
      <View style={{ gap: sp[3], overflow: 'visible' }}>
        {targets.map(target => {
          const placed = itemInZone(target.id);
          const isActive = placed && dd.itemStates[placed.id] === 'dragging';
          return (
            <View key={target.id} style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3], overflow: 'visible', zIndex: isActive ? 100 : 1 }}>
              <Text style={{ fontFamily: font.sans, fontSize: fs[14], color: theme.fg, flex: 1 }}>{target.label}</Text>
              <DropZone id={target.id} state={dd.zoneStates[target.id]} onMeasure={dd.registerZone} minWidth={100} inline>
                {placed && (
                  <PlacedItem item={placed} itemState={dd.itemStates[placed.id]} zoneState={dd.zoneStates[target.id]} onDragStart={dd.onDragStart} onDragMove={dd.onDragMove} onDragEnd={dd.onDragEnd} theme={theme} />
                )}
              </DropZone>
            </View>
          );
        })}
      </View>
    </QuestionFrame>
  );
}
