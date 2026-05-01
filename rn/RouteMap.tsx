/**
 * RouteMap — central spine journey. Direct translation of riyadh-to-moon layout.
 * Spine at 50%, oasis checkpoints centred, topics branch left/right alternating.
 */
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from './ThemeContext';
import { Oasis } from './Oasis';
import { sp, r, fs, fw, font, color } from './tokens';

type MarkerStatus = 'mapped' | 'exploring' | 'not-started' | 'needs-attention' | 'unmapped';

export interface RouteMarker {
  id: string;
  label: string;
  sublabel?: string;
  status: MarkerStatus;
}

export interface RouteChapter {
  id: string;
  label: string;
  title: string;
  eyebrow?: string;
  result?: string;
  status: 'complete' | 'strong' | 'weak' | 'current' | 'upcoming' | 'locked';
  level: number;
  markers: RouteMarker[];
}

interface RouteMapProps {
  chapters: RouteChapter[];
  currentChapter?: string;
  onChapterPress?: (chapter: RouteChapter) => void;
  onMarkerPress?: (marker: RouteMarker, chapter: RouteChapter) => void;
}

function markerColor(status: MarkerStatus): string {
  switch (status) { case 'mapped': return color.noon[400]; case 'exploring': return color.gold[400]; case 'needs-attention': return color.terra[400]; default: return 'rgba(232,228,220,0.35)'; }
}

function markerBg(status: MarkerStatus): string {
  switch (status) { case 'mapped': return color.noon[400]; case 'exploring': return 'transparent'; case 'needs-attention': return 'rgba(212,149,110,0.18)'; default: return 'transparent'; }
}

function sublabel(status: MarkerStatus): string {
  switch (status) { case 'mapped': return 'Mapped'; case 'exploring': return 'Exploring'; case 'not-started': return 'Not started'; case 'needs-attention': return 'Needs attention'; case 'unmapped': return 'Unmapped'; }
}

export function RouteMap({ chapters, currentChapter, onChapterPress, onMarkerPress }: RouteMapProps) {
  const { theme } = useTheme();

  const isPast = (ch: RouteChapter) => ch.status === 'complete' || ch.status === 'strong' || ch.status === 'weak';
  const isCurr = (ch: RouteChapter) => ch.id === currentChapter;

  // Find where progress spine reaches (from bottom)
  const currentIdx = chapters.findIndex(ch => ch.id === currentChapter);

  return (
    <View style={{ position: 'relative' }}>
      {/* Spine background — full height, dashed */}
      <View style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, marginLeft: -0.5, backgroundColor: theme.borderStrong }} />

      {/* Chapters */}
      {chapters.map((ch, ci) => {
        const past = isPast(ch);
        const current = isCurr(ch);
        const isHere = current;

        return (
          <View key={ch.id} style={{ paddingVertical: sp[5] }}>
            {/* Oasis centred on spine */}
            <Pressable onPress={() => onChapterPress?.(ch)} accessibilityRole="button" accessibilityLabel={ch.title} style={{ alignItems: 'center', zIndex: 5 }}>
              <Oasis level={ch.level} status={ch.status} label={ch.label} size={current ? 'lg' : 'md'} meta={ch.result || ch.eyebrow} />
            </Pressable>

            {/* Title below oasis */}
            <View style={{ alignItems: 'center', marginTop: sp[2], marginBottom: sp[4], paddingHorizontal: sp[5] }}>
              <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: current ? theme.accent : past ? markerColor('mapped') : theme.fgFaint, letterSpacing: 1.5, textTransform: 'uppercase', textAlign: 'center' }}>
                {current ? 'You are here' : ch.eyebrow || `Chapter ${ch.label}`}
              </Text>
              <Text style={{ fontFamily: font.serif, fontSize: current ? fs[18] : fs[16], fontWeight: fw[500], color: current ? theme.fg : past ? theme.fgMuted : theme.fgSubtle, marginTop: sp[1], textAlign: 'center' }}>{ch.title}</Text>
              {ch.result && <Text style={{ fontFamily: font.serif, fontSize: fs[12], fontStyle: 'italic', color: ch.status === 'weak' ? color.terra[300] : color.noon[300], marginTop: sp[0.5] }}>{ch.result}</Text>}
            </View>

            {/* Topics — alternating left/right */}
            {ch.markers.map((marker, mi) => {
              const isLeft = mi % 2 === 0;
              const mc = markerColor(marker.status);
              const mb = markerBg(marker.status);
              const isDashed = marker.status === 'unmapped' || marker.status === 'not-started';
              const isHereMarker = marker.status === 'exploring' && current;
              const sub = marker.sublabel || sublabel(marker.status);

              return (
                <View key={marker.id} style={{ flexDirection: 'row', marginVertical: sp[1] }}>
                  {/* Left side */}
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    {isLeft && (
                      <Pressable
                        onPress={() => onMarkerPress?.(marker, ch)}
                        accessibilityRole="button"
                        accessibilityLabel={`${marker.label} — ${sub}`}
                        style={{
                          flex: 1, marginLeft: sp[4], marginRight: 0,
                          flexDirection: 'row-reverse', alignItems: 'center', gap: sp[3],
                          paddingVertical: sp[3], paddingHorizontal: sp[3],
                          backgroundColor: isHereMarker ? 'rgba(100,216,174,0.06)' : 'rgba(16,23,42,0.45)',
                          borderWidth: 1,
                          borderColor: isHereMarker ? 'rgba(100,216,174,0.3)' : theme.border,
                          borderRadius: r[2],
                        }}
                      >
                        {/* Diamond marker */}
                        <View style={{
                          width: isHereMarker ? 14 : 12, height: isHereMarker ? 14 : 12,
                          transform: [{ rotate: '45deg' }],
                          borderWidth: 1.5, borderColor: mc, borderStyle: isDashed ? 'dashed' : 'solid',
                          backgroundColor: mb,
                          ...(isHereMarker ? { shadowColor: color.noon[400], shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 8, elevation: 4 } : {}),
                        }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: marker.status === 'unmapped' || marker.status === 'not-started' ? theme.fgMuted : theme.fg, textAlign: 'right' }} numberOfLines={1}>{marker.label}</Text>
                          <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: mc, letterSpacing: 1, textTransform: 'uppercase', marginTop: 2, textAlign: 'right' }}>{sub}</Text>
                        </View>
                      </Pressable>
                    )}
                  </View>

                  {/* Connector + spine centre point */}
                  <View style={{ width: sp[5] * 2, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '100%', height: 1, backgroundColor: theme.fgFaint, opacity: 0.4 }} />
                  </View>

                  {/* Right side */}
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    {!isLeft && (
                      <Pressable
                        onPress={() => onMarkerPress?.(marker, ch)}
                        accessibilityRole="button"
                        accessibilityLabel={`${marker.label} — ${sub}`}
                        style={{
                          flex: 1, marginRight: sp[4], marginLeft: 0,
                          flexDirection: 'row', alignItems: 'center', gap: sp[3],
                          paddingVertical: sp[3], paddingHorizontal: sp[3],
                          backgroundColor: isHereMarker ? 'rgba(100,216,174,0.06)' : 'rgba(16,23,42,0.45)',
                          borderWidth: 1,
                          borderColor: isHereMarker ? 'rgba(100,216,174,0.3)' : theme.border,
                          borderRadius: r[2],
                        }}
                      >
                        <View style={{
                          width: isHereMarker ? 14 : 12, height: isHereMarker ? 14 : 12,
                          transform: [{ rotate: '45deg' }],
                          borderWidth: 1.5, borderColor: mc, borderStyle: isDashed ? 'dashed' : 'solid',
                          backgroundColor: mb,
                          ...(isHereMarker ? { shadowColor: color.noon[400], shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 8, elevation: 4 } : {}),
                        }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: marker.status === 'unmapped' || marker.status === 'not-started' ? theme.fgMuted : theme.fg }} numberOfLines={1}>{marker.label}</Text>
                          <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: mc, letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 }}>{sub}</Text>
                        </View>
                      </Pressable>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}
