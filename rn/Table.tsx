/**
 * Table — simple data table with header and rows.
 */
import React from 'react';
import { View, Text, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font } from './tokens';

interface TableProps {
  columns: string[];
  rows: string[][];
}

export function Table({ columns, rows }: TableProps) {
  const { theme } = useTheme();

  const cellStyle: ViewStyle = { flex: 1, paddingVertical: sp[2], paddingHorizontal: sp[3] };
  const headerText: TextStyle = { fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: theme.fgFaint, letterSpacing: 0.8, textTransform: 'uppercase' };
  const bodyText: TextStyle = { fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted };

  return (
    <View style={{ borderRadius: r[2], borderWidth: 1, borderColor: theme.border, overflow: 'hidden' }}>
      <View style={{ flexDirection: 'row', backgroundColor: theme.bgOverlay, borderBottomWidth: 1, borderBottomColor: theme.border }}>
        {columns.map((col, i) => (
          <View key={i} style={cellStyle}><Text style={headerText}>{col}</Text></View>
        ))}
      </View>
      {rows.map((row, ri) => (
        <View key={ri} style={{ flexDirection: 'row', borderBottomWidth: ri < rows.length - 1 ? 1 : 0, borderBottomColor: theme.divider }}>
          {row.map((cell, ci) => (
            <View key={ci} style={cellStyle}><Text style={bodyText}>{cell}</Text></View>
          ))}
        </View>
      ))}
    </View>
  );
}
