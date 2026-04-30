/**
 * useDragDrop — shared hook for all drag-and-drop question types.
 * Manages item states, zone bounds, hit detection, and answer tracking.
 */
import { useState, useCallback, useRef } from 'react';
import type { DragItemState, DragItemData } from './DragItem';
import type { DropZoneState, DropZoneBounds } from './DropZone';

interface UseDragDropOptions {
  items: DragItemData[];
  zones: string[];
  correctMapping?: Record<string, string>; // itemId → zoneId
  allowMultiplePerZone?: boolean;
  showZoneResults?: boolean; // apply correct/incorrect to zones on submit (for Order)
  onAnswer?: (placements: Record<string, string>) => void;
}

interface DragDropState {
  itemStates: Record<string, DragItemState>;
  zoneStates: Record<string, DropZoneState>;
  placements: Record<string, string>; // itemId → zoneId
  submitted: boolean;
}

export function useDragDrop({ items, zones, correctMapping, allowMultiplePerZone, showZoneResults, onAnswer }: UseDragDropOptions) {
  const onAnswerRef = useRef(onAnswer);
  onAnswerRef.current = onAnswer;
  const zoneBounds = useRef<Record<string, DropZoneBounds>>({});
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [hoveringZone, setHoveringZone] = useState<string | null>(null);

  const [state, setState] = useState<DragDropState>(() => ({
    itemStates: Object.fromEntries(items.map(i => [i.id, 'idle' as DragItemState])),
    zoneStates: Object.fromEntries(zones.map(z => [z, 'empty' as DropZoneState])),
    placements: {},
    submitted: false,
  }));

  const registerZone = useCallback((id: string, bounds: DropZoneBounds) => {
    zoneBounds.current[id] = bounds;
  }, []);

  const findZoneAt = useCallback((x: number, y: number): string | null => {
    for (const [id, b] of Object.entries(zoneBounds.current)) {
      if (x >= b.x && x <= b.x + b.width && y >= b.y && y <= b.y + b.height) {
        return id;
      }
    }
    return null;
  }, []);

  const onDragStart = useCallback((id: string) => {
    if (state.submitted) return;
    setDraggingId(id);
    // Only update the item state to dragging — keep placement intact
    // so the component stays mounted. Placement is resolved in onDragEnd.
    setState(prev => ({
      ...prev,
      itemStates: { ...prev.itemStates, [id]: 'dragging' },
    }));
  }, [state.submitted]);

  const onDragMove = useCallback((id: string, x: number, y: number) => {
    if (state.submitted) return;
    const zone = findZoneAt(x, y);
    setHoveringZone(zone);
    setState(prev => {
      const nextZoneStates = { ...prev.zoneStates };
      // Reset all zones to their base state
      const draggingFromZone = prev.placements[id];
      for (const zid of zones) {
        if (zid === draggingFromZone) {
          nextZoneStates[zid] = 'filled';
        } else if (Object.values(prev.placements).some(pzid => pzid === zid)) {
          nextZoneStates[zid] = 'filled';
        } else {
          nextZoneStates[zid] = 'empty';
        }
      }
      // Set hovering zone if it's different from the source
      if (zone && zone !== draggingFromZone) {
        nextZoneStates[zone] = 'hovering';
      }
      return { ...prev, zoneStates: nextZoneStates };
    });
  }, [findZoneAt, zones, state.submitted, allowMultiplePerZone]);

  const onDragEnd = useCallback((id: string, x: number, y: number) => {
    if (state.submitted) return;
    const zone = findZoneAt(x, y);
    setDraggingId(null);
    setHoveringZone(null);

    setState(prev => {
      const next = { ...prev };
      next.itemStates = { ...prev.itemStates };
      next.zoneStates = { ...prev.zoneStates };
      next.placements = { ...prev.placements };

      // Clear old placement if item was previously placed
      const oldZone = prev.placements[id];
      if (oldZone) {
        delete next.placements[id];
      }

      if (zone) {
        // If zone is occupied (and not multi), swap: move existing item to where dragged item came from
        if (!allowMultiplePerZone) {
          const existingItem = Object.entries(prev.placements).find(([iid, zid]) => zid === zone && iid !== id);
          if (existingItem) {
            if (oldZone) {
              // True swap — existing item goes to the dragged item's old zone
              next.placements[existingItem[0]] = oldZone;
              next.itemStates[existingItem[0]] = 'placed';
              next.zoneStates[oldZone] = 'filled';
            } else {
              // Dragged from source — existing item goes back to idle
              next.itemStates[existingItem[0]] = 'idle';
              delete next.placements[existingItem[0]];
            }
          }
        }
        next.placements[id] = zone;
        next.itemStates[id] = 'placed';
        next.zoneStates[zone] = 'filled';
      } else {
        // Dropped outside any zone — return to idle
        next.itemStates[id] = 'idle';
        delete next.placements[id];
      }

      // Reset non-filled zones
      for (const zid of zones) {
        if (!Object.values(next.placements).includes(zid)) {
          next.zoneStates[zid] = 'empty';
        }
      }

      // Notify parent of current placements
      onAnswerRef.current?.(next.placements);
      return next;
    });
  }, [findZoneAt, zones, state.submitted, allowMultiplePerZone]);

  // Reveal results externally (teacher-driven, delayed feedback)
  const reveal = useCallback((results: Record<string, boolean>) => {
    setState(prev => {
      const nextItemStates = { ...prev.itemStates };
      for (const [itemId, isCorrect] of Object.entries(results)) {
        nextItemStates[itemId] = isCorrect ? 'correct' : 'incorrect';
      }
      return { ...prev, itemStates: nextItemStates, submitted: true };
    });
  }, []);

  const submit = useCallback(() => {
    if (!correctMapping) return;
    setState(prev => {
      const nextItemStates = { ...prev.itemStates };

      const nextZoneStates = showZoneResults ? { ...prev.zoneStates } : prev.zoneStates;
      for (const [itemId, zoneId] of Object.entries(prev.placements)) {
        const isCorrect = correctMapping[itemId] === zoneId;
        nextItemStates[itemId] = isCorrect ? 'correct' : 'incorrect';
        if (showZoneResults) nextZoneStates[zoneId] = isCorrect ? 'correct' : 'incorrect';
      }

      // Unplaced items are incorrect
      for (const item of items) {
        if (!prev.placements[item.id]) {
          nextItemStates[item.id] = 'incorrect';
        }
      }

      return { ...prev, itemStates: nextItemStates, ...(showZoneResults ? { zoneStates: nextZoneStates } : {}), submitted: true };
    });
  }, [correctMapping, items, showZoneResults]);

  const reset = useCallback(() => {
    setState({
      itemStates: Object.fromEntries(items.map(i => [i.id, 'idle' as DragItemState])),
      zoneStates: Object.fromEntries(zones.map(z => [z, 'empty' as DropZoneState])),
      placements: {},
      submitted: false,
    });
  }, [items, zones]);

  const allPlaced = items.length > 0 && items.every(i => state.placements[i.id]);

  return {
    ...state,
    draggingId,
    hoveringZone,
    allPlaced,
    registerZone,
    onDragStart,
    onDragMove,
    onDragEnd,
    submit,
    reveal,
    reset,
  };
}
