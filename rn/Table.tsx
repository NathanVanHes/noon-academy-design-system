/**
 * Table — data table with sorting, selection, checkboxes, and mobile scroll.
 *
 * Features:
 *   - Typed columns with width, alignment, sortable flag
 *   - Row selection (single/multi via checkboxes)
 *   - Sort by column (asc/desc toggle)
 *   - Horizontal scroll when columns overflow on mobile
 *   - Sticky header
 *   - Action bar at bottom when rows are selected
 */
import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { Checkbox } from './Checkbox';
import { sp, r, fs, fw, font, color } from './tokens';

export interface TableColumn {
  key: string;
  label: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: string, row: Record<string, string>, rowIndex: number) => React.ReactNode;
}

interface TableProps {
  /** Column definitions. For simple usage, pass string[] and it auto-converts. */
  columns: TableColumn[] | string[];
  /** Row data. For simple usage, pass string[][] keyed by column index. */
  rows: Record<string, string>[] | string[][];
  /** Enable row checkboxes */
  selectable?: boolean;
  /** Controlled selected row indices */
  selected?: number[];
  /** Called when selection changes */
  onSelectionChange?: (indices: number[]) => void;
  /** Called when a row is pressed (non-checkbox tap) */
  onRowPress?: (row: Record<string, string>, index: number) => void;
  /** Sort state — controlled */
  sortKey?: string;
  sortDir?: 'asc' | 'desc';
  onSort?: (key: string, dir: 'asc' | 'desc') => void;
  /** Minimum table width — enables horizontal scroll when exceeded */
  minWidth?: number;
  /** Action bar content shown when rows are selected */
  actionBar?: (selectedCount: number) => React.ReactNode;
}

function normalizeColumns(cols: TableColumn[] | string[]): TableColumn[] {
  if (cols.length === 0) return [];
  if (typeof cols[0] === 'string') return (cols as string[]).map((label, i) => ({ key: String(i), label }));
  return cols as TableColumn[];
}

function normalizeRows(rows: Record<string, string>[] | string[][], cols: TableColumn[]): Record<string, string>[] {
  if (rows.length === 0) return [];
  if (Array.isArray(rows[0])) return (rows as string[][]).map(row => {
    const obj: Record<string, string> = {};
    cols.forEach((col, i) => { obj[col.key] = row[i] ?? ''; });
    return obj;
  });
  return rows as Record<string, string>[];
}

export function Table({
  columns: columnsProp, rows: rowsProp,
  selectable, selected: selectedProp, onSelectionChange, onRowPress,
  sortKey: sortKeyProp, sortDir: sortDirProp, onSort,
  minWidth, actionBar,
}: TableProps) {
  const { theme } = useTheme();
  const columns = useMemo(() => normalizeColumns(columnsProp), [columnsProp]);
  const rawRows = useMemo(() => normalizeRows(rowsProp, columns), [rowsProp, columns]);

  // Internal sort state (uncontrolled fallback)
  const [intSortKey, setIntSortKey] = useState<string | undefined>();
  const [intSortDir, setIntSortDir] = useState<'asc' | 'desc'>('asc');
  const sortKey = sortKeyProp ?? intSortKey;
  const sortDir = sortDirProp ?? intSortDir;

  // Internal selection state (uncontrolled fallback)
  const [intSelected, setIntSelected] = useState<number[]>([]);
  const selected = selectedProp ?? intSelected;
  const setSelected = onSelectionChange ?? setIntSelected;

  // Sort rows
  const rows = useMemo(() => {
    if (!sortKey) return rawRows;
    const sorted = [...rawRows].sort((a, b) => {
      const av = a[sortKey] ?? '';
      const bv = b[sortKey] ?? '';
      const numA = Number(av), numB = Number(bv);
      const cmp = !isNaN(numA) && !isNaN(numB) ? numA - numB : av.localeCompare(bv);
      return sortDir === 'desc' ? -cmp : cmp;
    });
    return sorted;
  }, [rawRows, sortKey, sortDir]);

  function handleSort(key: string) {
    const newDir = sortKey === key && sortDir === 'asc' ? 'desc' : 'asc';
    if (onSort) { onSort(key, newDir); } else { setIntSortKey(key); setIntSortDir(newDir); }
  }

  function toggleRow(idx: number) {
    const next = selected.includes(idx) ? selected.filter(i => i !== idx) : [...selected, idx];
    setSelected(next);
  }

  function toggleAll() {
    setSelected(selected.length === rows.length ? [] : rows.map((_, i) => i));
  }

  const allSelected = rows.length > 0 && selected.length === rows.length;

  const cellPad: ViewStyle = { paddingVertical: sp[3], paddingHorizontal: sp[3] };
  const headerTextStyle: TextStyle = { fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: theme.fgFaint, letterSpacing: 0.8, textTransform: 'uppercase' };
  const bodyTextStyle: TextStyle = { fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted };

  const tableContent = (
    <View style={{ minWidth }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', backgroundColor: theme.bgOverlay, borderBottomWidth: 1, borderBottomColor: theme.border }}>
        {selectable && (
          <View style={{ ...cellPad, width: 44, alignItems: 'center', justifyContent: 'center' }}>
            <Checkbox checked={allSelected} indeterminate={selected.length > 0 && !allSelected} onValueChange={toggleAll} />
          </View>
        )}
        {columns.map(col => {
          const isSorted = sortKey === col.key;
          const arrow = isSorted ? (sortDir === 'asc' ? ' ↑' : ' ↓') : '';
          return (
            <Pressable key={col.key} onPress={col.sortable ? () => handleSort(col.key) : undefined}
              style={{ ...cellPad, flex: col.width ? undefined : 1, width: col.width, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ ...headerTextStyle, textAlign: col.align || 'left', color: isSorted ? theme.fg : theme.fgFaint }}>{col.label}{arrow}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* Rows */}
      {rows.map((row, ri) => {
        const isSelected = selected.includes(ri);
        return (
          <Pressable key={ri} onPress={onRowPress ? () => onRowPress(row, ri) : undefined}
            style={{
              flexDirection: 'row', borderBottomWidth: ri < rows.length - 1 ? 1 : 0, borderBottomColor: theme.divider,
              backgroundColor: isSelected ? theme.selectedOverlay : 'transparent',
            }}>
            {selectable && (
              <View style={{ ...cellPad, width: 44, alignItems: 'center', justifyContent: 'center' }}>
                <Checkbox checked={isSelected} onValueChange={() => toggleRow(ri)} />
              </View>
            )}
            {columns.map(col => (
              <View key={col.key} style={{ ...cellPad, flex: col.width ? undefined : 1, width: col.width }}>
                {col.render ? col.render(row[col.key] ?? '', row, ri) : (
                  <Text style={{ ...bodyTextStyle, textAlign: col.align || 'left' }}>{row[col.key]}</Text>
                )}
              </View>
            ))}
          </Pressable>
        );
      })}
    </View>
  );

  return (
    <View style={{ borderRadius: r[2], borderWidth: 1, borderColor: theme.border, overflow: 'hidden' }}>
      {minWidth ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }}>
          {tableContent}
        </ScrollView>
      ) : tableContent}

      {/* Action bar — fixed at bottom when rows selected */}
      {selectable && selected.length > 0 && actionBar && (
        <View style={{
          flexDirection: 'row', alignItems: 'center', gap: sp[3],
          paddingVertical: sp[2], paddingHorizontal: sp[4],
          backgroundColor: theme.bgOverlay, borderTopWidth: 1, borderTopColor: theme.border,
        }}>
          <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgMuted }}>{selected.length} selected</Text>
          <View style={{ flex: 1 }} />
          {actionBar(selected.length)}
        </View>
      )}
    </View>
  );
}
