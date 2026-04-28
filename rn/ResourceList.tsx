/**
 * ResourceList — link list card for external materials.
 * Each link can have content that opens in a FullSheet, or a custom onPress.
 */
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from './ThemeContext';
import { FullSheet } from './FullSheet';
import { sp, r, fs, fw, font } from './tokens';

interface ResourceLink {
  label: string;
  content?: React.ReactNode;
  onPress?: () => void;
}

interface ResourceListProps {
  title?: string;
  links: ResourceLink[];
}

export function ResourceList({ title = 'Resources', links }: ResourceListProps) {
  const { theme } = useTheme();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <>
      <View style={{ backgroundColor: theme.inputBg, borderRadius: r[2], padding: sp[4] }}>
        <Text style={{ fontFamily: font.mono, fontSize: fs[10], letterSpacing: 1, textTransform: 'uppercase', fontWeight: fw[600], color: theme.fgFaint, marginBottom: sp[3] }}>{title}</Text>
        {links.map((link, i) => (
          <Pressable key={i} onPress={() => {
            if (link.onPress) return link.onPress();
            if (link.content) setOpenIdx(i);
          }}>
            <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.accent, marginBottom: sp[2] }}>{link.label}</Text>
          </Pressable>
        ))}
      </View>
      {openIdx !== null && links[openIdx]?.content && (
        <FullSheet visible onClose={() => setOpenIdx(null)} title={links[openIdx].label}>
          {links[openIdx].content}
        </FullSheet>
      )}
    </>
  );
}
