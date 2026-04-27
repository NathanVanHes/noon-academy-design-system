/**
 * Shared explorer layout components used by every screen.
 */
import React from 'react';
import { View, Text, ScrollView, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme, sp, fs, fw, font, r } from '../../rn';

export function Screen({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={{ padding: sp[5], paddingBottom: sp[12] }}
    >
      {children}
    </ScrollView>
  );
}

export function PageHeader({ title, desc }: { title: string; desc: string }) {
  const { theme } = useTheme();
  return (
    <View style={{ marginBottom: sp[6], paddingBottom: sp[5], borderBottomWidth: 1, borderBottomColor: theme.border }}>
      <Text style={{ fontFamily: font.serif, fontSize: fs[28], fontWeight: fw[400], color: theme.fg, letterSpacing: -0.5 }}>{title}</Text>
      <Text style={{ fontFamily: font.serif, fontSize: fs[14], fontStyle: 'italic', color: theme.fgSubtle, marginTop: sp[1] }}>{desc}</Text>
    </View>
  );
}

export function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <View style={{ marginBottom: sp[7] }}>
      <Text style={{ fontFamily: font.mono, fontSize: fs[10], fontWeight: fw[600], color: theme.fgFaint, letterSpacing: 2, textTransform: 'uppercase', marginBottom: sp[3], paddingBottom: sp[2], borderBottomWidth: 1, borderBottomColor: theme.divider }}>{title}</Text>
      {desc && <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgSubtle, marginBottom: sp[4], maxWidth: 400 }}>{desc}</Text>}
      {children}
    </View>
  );
}

export function Label({ children }: { children: string }) {
  const { theme } = useTheme();
  return <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, marginBottom: sp[1], marginTop: sp[4] }}>{children}</Text>;
}

export function Row({ children, gap: g }: { children: React.ReactNode; gap?: number }) {
  return <View style={{ flexDirection: 'row', gap: g ?? sp[2], flexWrap: 'wrap', alignItems: 'center', marginBottom: sp[2] }}>{children}</View>;
}

export function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <View style={{ backgroundColor: theme.bgRaised, borderRadius: r[2], borderWidth: 1, borderColor: theme.border, padding: sp[4], marginBottom: sp[3] }}>
      <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, marginBottom: sp[2] }}>{label}</Text>
      {children}
    </View>
  );
}

export function Rule({ children }: { children: string }) {
  const { theme } = useTheme();
  return (
    <View style={{ paddingVertical: sp[2] }}>
      <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.5 }}>{children}</Text>
    </View>
  );
}

export function Spec({ label, value }: { label: string; value: string }) {
  const { theme } = useTheme();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: sp[1], borderBottomWidth: 1, borderBottomColor: theme.divider }}>
      <Text style={{ fontFamily: font.sans, fontSize: fs[12], color: theme.fgMuted }}>{label}</Text>
      <Text style={{ fontFamily: font.mono, fontSize: fs[12], color: theme.fg }}>{value}</Text>
    </View>
  );
}
