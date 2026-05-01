/**
 * RouteMap — vertical journey with central spine.
 * Oasis checkpoints on the spine, topic markers branching left/right.
 * Spine runs down the centre, markers alternate sides with connector lines.
 */
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from './ThemeContext';
import { WaypointMarker } from './Waypoints';
import { Oasis } from './Oasis';
import { sp, r, fs, fw, font, color } from './tokens';

type MarkerStatus = 'mapped' | 'exploring' | 'not-started' | 'needs-attention' | 'unmapped';

export interface RouteMarker {
  id: string;
  label: string;
  status: MarkerStatus;
}

export interface RouteChapter {
  id: string;
  label: string;
  title: string;
  date?: string;
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

function markerToWaypoint(status: MarkerStatus): 'done' | 'passed' | 'current' | 'arrived' | 'incomplete' {
  switch (status) { case 'mapped': return 'done'; case 'exploring': return 'current'; case 'needs-attention': return 'passed'; default: return 'incomplete'; }
}

function statusColor(status: MarkerStatus): string {
  switch (status) { case 'mapped': return color.noon[400]; case 'exploring': return color.gold[400]; case 'needs-attention': return color.terra[400]; default: return 'rgba(232,228,220,0.35)'; }
}

function statusLabel(status: MarkerStatus): string {
  switch (status) { case 'mapped': return 'Mapped'; case 'exploring': return 'Exploring'; case 'not-started': return 'Not started'; case 'needs-attention': return 'Needs attention'; case 'unmapped': return 'Unmapped'; }
}

const SPINE_LINE_H = 6;
const CONNECTOR_W = 16;

function SpineLine({ done, height, gap }: { done: boolean; height?: number; gap?: boolean }) {
  const { theme } = useTheme();
  const col = done ? theme.signalDim : theme.border;
  return (
    <View style={{ width: 1, height: gap ? sp[7] : (height || SPINE_LINE_H), alignSelf: 'center', backgroundColor: done ? col : undefined, borderLeftWidth: done ? 0 : 1, borderLeftColor: col, borderStyle: done ? undefined : 'dashed' }} />
  );
}

function ConnectorLine({ done, side }: { done: boolean; side: 'left' | 'right' }) {
  const { theme } = useTheme();
  const col = done ? theme.signalDim : theme.border;
  return (
    <View style={{ width: CONNECTOR_W, height: 1, backgroundColor: done ? col : undefined, borderTopWidth: done ? 0 : 1, borderTopColor: col, borderStyle: done ? undefined : 'dashed' }} />
  );
}

export function RouteMap({ chapters, currentChapter, onChapterPress, onMarkerPress }: RouteMapProps) {
  const { theme } = useTheme();

  const isPast = (ch: RouteChapter) => ch.status === 'complete' || ch.status === 'strong' || ch.status === 'weak';
  const isCurrent = (ch: RouteChapter) => ch.id === currentChapter;

  return (
    <View style={{ alignItems: 'center' }}>
      {chapters.map((ch, ci) => {
        const chPast = isPast(ch);
        const chCurrent = isCurrent(ch);

        return (
          <View key={ch.id} style={{ alignItems: 'center', width: '100%' }}>
            {/* Spine line into oasis */}
            {ci > 0 && <SpineLine done={chPast || chCurrent} height={sp[5]} />}

            {/* Oasis centred with title below */}
            <Pressable onPress={() => onChapterPress?.(ch)} accessibilityRole="button" accessibilityLabel={ch.title} style={{ alignItems: 'center' }}>
              <Oasis level={ch.level} status={ch.status} label={ch.label} size={chCurrent ? 'lg' : 'md'} meta={ch.result || ch.date} />
              <Text style={{ fontFamily: font.serif, fontSize: chCurrent ? fs[16] : fs[14], fontWeight: fw[500], color: chCurrent ? theme.fg : chPast ? theme.fgMuted : theme.fgSubtle, marginTop: sp[2], textAlign: 'center' }}>{ch.title}</Text>
            </Pressable>

            {/* Topic markers alternating left/right from spine */}
            {ch.markers.map((marker, mi) => {
              const isLeft = mi % 2 === 0;
              const wpState = markerToWaypoint(marker.status);
              const col = statusColor(marker.status);
              const markerDone = marker.status === 'mapped';
              const lineDone = chPast || (chCurrent && mi === 0);

              return (
                <View key={marker.id} style={{ width: '100%' }}>
                  {/* Spine segment */}
                  <SpineLine done={lineDone || markerDone} height={SPINE_LINE_H} />

                  {/* Marker row — spine centre, card branches to side */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: sp[4] }}>
                    {/* Left card */}
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                      {isLeft && (
                        <>
                          <Pressable
                            onPress={() => onMarkerPress?.(marker, ch)}
                            accessibilityRole="button"
                            accessibilityLabel={`${marker.label} — ${statusLabel(marker.status)}`}
                            style={{
                              flex: 1, maxWidth: 160,
                              paddingVertical: sp[2], paddingHorizontal: sp[3],
                              backgroundColor: marker.status === 'exploring' ? 'rgba(100,216,174,0.05)' : theme.bgRaised,
                              borderWidth: 1,
                              borderColor: marker.status === 'exploring' ? 'rgba(100,216,174,0.25)' : theme.border,
                              borderRadius: r[2],
                              alignItems: 'flex-end',
                            }}
                          >
                            <Text style={{ fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: marker.status === 'unmapped' || marker.status === 'not-started' ? theme.fgMuted : theme.fg, textAlign: 'right' }} numberOfLines={1}>{marker.label}</Text>
                            <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: col, letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 2, textAlign: 'right' }}>{statusLabel(marker.status)}</Text>
                          </Pressable>
                          <ConnectorLine done={markerDone} side="left" />
                        </>
                      )}
                    </View>

                    {/* Diamond on spine */}
                    <WaypointMarker state={wpState} />

                    {/* Right card */}
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                      {!isLeft && (
                        <>
                          <ConnectorLine done={markerDone} side="right" />
                          <Pressable
                            onPress={() => onMarkerPress?.(marker, ch)}
                            accessibilityRole="button"
                            accessibilityLabel={`${marker.label} — ${statusLabel(marker.status)}`}
                            style={{
                              flex: 1, maxWidth: 160,
                              paddingVertical: sp[2], paddingHorizontal: sp[3],
                              backgroundColor: marker.status === 'exploring' ? 'rgba(100,216,174,0.05)' : theme.bgRaised,
                              borderWidth: 1,
                              borderColor: marker.status === 'exploring' ? 'rgba(100,216,174,0.25)' : theme.border,
                              borderRadius: r[2],
                            }}
                          >
                            <Text style={{ fontFamily: font.sans, fontSize: fs[12], fontWeight: fw[500], color: marker.status === 'unmapped' || marker.status === 'not-started' ? theme.fgMuted : theme.fg }} numberOfLines={1}>{marker.label}</Text>
                            <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: col, letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 2 }}>{statusLabel(marker.status)}</Text>
                          </Pressable>
                        </>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        );
      })}
      {/* Final spine tail */}
      <SpineLine done={false} />
    </View>
  );
}
