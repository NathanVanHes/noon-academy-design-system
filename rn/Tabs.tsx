/**
 * Tabs — horizontal tab bar with active indicator.
 */
import React from 'react';
import { View, Pressable, Text, ScrollView, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font } from './tokens';

interface TabsProps {
  tabs: string[];
  selected: number;
  onSelect: (index: number) => void;
}

export function Tabs({ tabs, selected, onSelect }: TabsProps) {
  const { theme } = useTheme();

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={containerStyle}>
        {tabs.map((tab, i) => {
          const isOn = i === selected;
          const tabStyle: ViewStyle = {
            paddingVertical: sp[3],
            paddingHorizontal: sp[4],
            borderBottomWidth: 2,
            borderBottomColor: isOn ? theme.accent : 'transparent',
          };
          // CSS: .tab { fs-12, uppercase, caps spacing, fw-600 }
          const txtStyle: TextStyle = {
            fontFamily: font.sans,
            fontSize: fs[12],
            fontWeight: fw[600],
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: isOn ? theme.fg : theme.fgSubtle,
          };
          return (
            <Pressable key={i} onPress={() => onSelect(i)} style={tabStyle}>
              <Text style={txtStyle}>{tab}</Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
