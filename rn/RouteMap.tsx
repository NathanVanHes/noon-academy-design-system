/**
 * RouteMap — simplified desert journey.
 *
 * Stripped back to essentials:
 *   - Chapter = small title on spine
 *   - Topics = boxes branching left/right with status diamond
 *   - Blue dot = you are here
 *   - That's it. No big diamonds, no scores, no extra labels.
 *
 * The oasis + water count lives in the page wrapper, not here.
 */
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from './ThemeContext';
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

function mc(s: MarkerStatus) { return s === 'mapped' ? color.noon[400] : s === 'exploring' ? color.gold[300] : s === 'needs-attention' ? color.terra[300] : 'rgba(232,228,220,0.35)'; }
function mb(s: MarkerStatus) { return s === 'mapped' ? color.noon[400] : s === 'needs-attention' ? 'rgba(212,149,110,0.18)' : 'transparent'; }
function ml(s: MarkerStatus) { return s === 'mapped' ? 'Mastered' : s === 'exploring' ? 'Exploring' : s === 'not-started' ? 'Not started' : s === 'needs-attention' ? 'Still uncertain' : 'Not started'; }

const CW = 24;
const EP = 16;

export function RouteMap({ chapters, currentChapter, onChapterPress, onMarkerPress }: RouteMapProps) {
  const { theme } = useTheme();
  const isPast = (ch: RouteChapter) => ch.status === 'complete' || ch.status === 'strong' || ch.status === 'weak';
  const isCurr = (ch: RouteChapter) => ch.id === currentChapter;
  const currentIdx = chapters.findIndex(ch => ch.id === currentChapter);
  const progressPct = currentIdx >= 0 ? Math.round(((chapters.length - currentIdx) / chapters.length) * 100) : 0;

  return (
    <View style={{ position: 'relative' }}>
      {/* Spine */}
      <View style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, marginLeft: -0.5, backgroundColor: 'rgba(232,228,220,0.06)' }} />
      {progressPct > 0 && (
        <View style={{ position: 'absolute', bottom: 0, left: '50%', marginLeft: -0.5, width: 1, height: `${progressPct}%`, backgroundColor: color.noon[400], opacity: 0.25 }} />
      )}

      {chapters.map((ch, ci) => {
        const past = isPast(ch);
        const current = isCurr(ch);
        const future = ch.status === 'upcoming' || ch.status === 'locked';
        const distant = ch.status === 'locked';
        const dimSize = current ? 44 : 36;
        const mapped = ch.markers.filter(m => m.status === 'mapped').length;
        const total = ch.markers.length;

        const hdrColor = current ? color.gold[300] : ch.status === 'weak' ? color.terra[300] : past ? color.noon[400] : theme.fgFaint;

        return (
          <View key={ch.id} style={{ paddingTop: ci === 0 ? sp[2] : sp[6] }}>

            {/* ── Exam diamond ── */}
            <Pressable onPress={() => onChapterPress?.(ch)} style={{ alignItems: 'center', zIndex: 5 }}>
              <View style={{
                width: dimSize, height: dimSize,
                transform: [{ rotate: '45deg' }],
                borderWidth: current ? 2.5 : 1.5, borderColor: hdrColor,
                borderStyle: future ? 'dashed' : 'solid',
                backgroundColor: color.void[300],
                ...(current ? { shadowColor: color.gold[300], shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 14, elevation: 6 } : {}),
                ...(distant ? { opacity: 0.5 } : {}),
              }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{
                    transform: [{ rotate: '-45deg' }],
                    fontFamily: font.mono, fontSize: fs[11], fontWeight: fw[600],
                    color: current ? color.gold[300] : past ? hdrColor : theme.fgFaint,
                  }}>{past ? `${ch.level}%` : '—'}</Text>
                </View>
              </View>
            </Pressable>

            {/* ── Label ── */}
            <View style={{ alignItems: 'center', marginTop: sp[4], marginBottom: sp[3], paddingHorizontal: sp[4] }}>
              <Text style={{
                fontFamily: font.serif, fontSize: current ? fs[18] : fs[15], fontWeight: fw[500], textAlign: 'center',
                color: current ? theme.fg : distant ? theme.fgSubtle : theme.fgMuted,
                ...(distant ? { opacity: 0.5 } : {}),
              }}>{ch.title}</Text>
              {past && (
                <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: mapped === total ? color.noon[400] : color.terra[300], marginTop: sp[1] }}>{mapped}/{total} mastered</Text>
              )}
              {current && (
                <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: color.gold[300], marginTop: sp[1] }}>Next exam · 9 days</Text>
              )}
            </View>

            {/* ── Topics ── */}
            {ch.markers.map((marker, mi) => {
              const isLeft = mi % 2 === 0;
              const mCol = mc(marker.status);
              const mBgCol = mb(marker.status);
              const dashed = marker.status === 'unmapped' || marker.status === 'not-started';
              const isCurrCh = current;
              const sub = marker.sublabel || ml(marker.status);

              const bdr = marker.status === 'mapped' ? 'rgba(100,216,174,0.2)' : marker.status === 'needs-attention' ? 'rgba(212,149,110,0.25)' : marker.status === 'exploring' ? 'rgba(201,162,39,0.2)' : isCurrCh ? 'rgba(100,216,174,0.15)' : theme.border;
              const bg = isCurrCh && marker.status !== 'mapped' ? 'rgba(100,216,174,0.03)' : 'rgba(16,23,42,0.55)';
              const connCol = marker.status === 'mapped' ? color.noon[400] : theme.fgFaint;
              const connOp = marker.status === 'mapped' ? 0.3 : 0.3;

              return (
                <View key={marker.id} style={{ flexDirection: 'row', marginTop: sp[1], alignItems: 'center' }}>
                  <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                    {isLeft && (<>
                      <Pressable onPress={() => onMarkerPress?.(marker, ch)}
                        style={{ flex: 1, marginLeft: EP, flexDirection: 'row-reverse', alignItems: 'center', gap: sp[2], paddingVertical: sp[2], paddingHorizontal: sp[3], backgroundColor: bg, borderWidth: 1, borderColor: bdr, borderRadius: r[2] }}>
                        <View style={{ width: 10, height: 10, transform: [{ rotate: '45deg' }], borderWidth: 1.5, borderColor: mCol, borderStyle: dashed ? 'dashed' : 'solid', backgroundColor: mBgCol,
                          ...(marker.status === 'mapped' ? { shadowColor: color.noon[400], shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 4 } : {}),
                        }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: dashed ? theme.fgMuted : theme.fg, textAlign: 'right' }} numberOfLines={1}>{marker.label}</Text>
                          <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: mCol, letterSpacing: 1, textTransform: 'uppercase', marginTop: 2, textAlign: 'right' }}>{sub}</Text>
                        </View>
                      </Pressable>
                      <View style={{ width: CW, height: 1, backgroundColor: connCol, opacity: connOp }} />
                    </>)}
                  </View>
                  <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                    {!isLeft && (<>
                      <View style={{ width: CW, height: 1, backgroundColor: connCol, opacity: connOp }} />
                      <Pressable onPress={() => onMarkerPress?.(marker, ch)}
                        style={{ flex: 1, marginRight: EP, flexDirection: 'row', alignItems: 'center', gap: sp[2], paddingVertical: sp[2], paddingHorizontal: sp[3], backgroundColor: bg, borderWidth: 1, borderColor: bdr, borderRadius: r[2] }}>
                        <View style={{ width: 10, height: 10, transform: [{ rotate: '45deg' }], borderWidth: 1.5, borderColor: mCol, borderStyle: dashed ? 'dashed' : 'solid', backgroundColor: mBgCol,
                          ...(marker.status === 'mapped' ? { shadowColor: color.noon[400], shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 4 } : {}),
                        }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: dashed ? theme.fgMuted : theme.fg }} numberOfLines={1}>{marker.label}</Text>
                          <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: mCol, letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 }}>{sub}</Text>
                        </View>
                      </Pressable>
                    </>)}
                  </View>
                </View>
              );
            })}

            {/* ── Blue dot — you are here ── */}
            {current && (
              <View style={{ alignItems: 'center', marginTop: sp[4] }}>
                <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(107,163,255,0.12)', alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: color.blue[400], borderWidth: 2, borderColor: color.chalk[100], shadowColor: color.blue[400], shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 6 }} />
                </View>
                <Text style={{ fontFamily: font.mono, fontSize: fs[9], fontWeight: fw[600], color: color.blue[400], letterSpacing: 1.5, textTransform: 'uppercase', marginTop: sp[1] }}>You are here</Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
