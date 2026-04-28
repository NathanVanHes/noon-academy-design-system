/**
 * Waypoints — cartographic route visualization with diamond markers.
 * Enhanced version of RouteSteps with crosshairs, arrived state, and labels.
 * Markers: passed (dim gold), current (bright gold + crosshairs), arrived (green + crosshairs), incomplete (outline).
 */
import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Rect, Circle, Line, Polygon, Path } from 'react-native-svg';
import { useTheme } from './ThemeContext';
import { sp, fs, fw, font, color } from './tokens';

type WaypointState = 'passed' | 'current' | 'arrived' | 'incomplete';

interface WaypointsProps {
  steps: WaypointState[];
  labels?: string[];
  layout?: 'horizontal' | 'vertical' | 'path';
}

function Marker({ cx, cy, state, fg }: { cx: number; cy: number; state: WaypointState; fg: string }) {
  const d = 4; // half-width of diamond
  if (state === 'passed') {
    return <>
      <Rect x={cx - d} y={cy - d} width={d * 2} height={d * 2} rotation={45} origin={`${cx},${cy}`} fill={color.gold[500]} />
      <Circle cx={cx} cy={cy} r={1.5} fill={fg} />
    </>;
  }
  if (state === 'current') {
    return <>
      <Rect x={cx - d} y={cy - d} width={d * 2} height={d * 2} rotation={45} origin={`${cx},${cy}`} fill={color.gold[400]} />
      <Line x1={cx} y1={cy - 10} x2={cx} y2={cy - 5} stroke={color.gold[400]} strokeWidth={0.75} />
      <Line x1={cx} y1={cy + 5} x2={cx} y2={cy + 10} stroke={color.gold[400]} strokeWidth={0.75} />
      <Line x1={cx - 10} y1={cy} x2={cx - 5} y2={cy} stroke={color.gold[400]} strokeWidth={0.75} />
      <Line x1={cx + 5} y1={cy} x2={cx + 10} y2={cy} stroke={color.gold[400]} strokeWidth={0.75} />
    </>;
  }
  if (state === 'arrived') {
    return <>
      <Rect x={cx - d} y={cy - d} width={d * 2} height={d * 2} rotation={45} origin={`${cx},${cy}`} fill={color.noon[400]} />
      <Polygon points={`${cx},${cy - 3} ${cx + 2.5},${cy + 1.5} ${cx - 2.5},${cy + 1.5}`} fill={fg} />
      <Line x1={cx} y1={cy - 10} x2={cx} y2={cy - 5} stroke={color.noon[400]} strokeWidth={0.75} />
      <Line x1={cx} y1={cy + 5} x2={cx} y2={cy + 10} stroke={color.noon[400]} strokeWidth={0.75} />
      <Line x1={cx - 10} y1={cy} x2={cx - 5} y2={cy} stroke={color.noon[400]} strokeWidth={0.75} />
      <Line x1={cx + 5} y1={cy} x2={cx + 10} y2={cy} stroke={color.noon[400]} strokeWidth={0.75} />
    </>;
  }
  // incomplete
  return (
    <Rect x={cx - d} y={cy - d} width={d * 2} height={d * 2} rotation={45} origin={`${cx},${cy}`} fill="none" stroke="rgba(232,228,220,0.55)" strokeWidth={1} />
  );
}

export function Waypoints({ steps, labels, layout = 'horizontal' }: WaypointsProps) {
  const { theme } = useTheme();
  const n = steps.length;

  if (layout === 'vertical') {
    const gap = 50;
    const svgH = (n - 1) * gap + 40;
    const cx = labels ? 30 : 20;
    return (
      <View>
        <Svg width={labels ? 200 : 40} height={svgH}>
          {steps.map((_, i) => {
            if (i >= n - 1) return null;
            const y1 = 20 + gap * i + 6;
            const y2 = 20 + gap * (i + 1) - 6;
            const done = steps[i] === 'passed' || steps[i] === 'arrived';
            return done
              ? <Line key={`l${i}`} x1={cx} y1={y1} x2={cx} y2={y2} stroke={color.gold[400]} strokeWidth={2} opacity={0.85} />
              : <Line key={`l${i}`} x1={cx} y1={y1} x2={cx} y2={y2} stroke={color.gold[400]} strokeWidth={1} opacity={0.4} strokeDasharray="4 3" />;
          })}
          {steps.map((state, i) => (
            <Marker key={`m${i}`} cx={cx} cy={20 + gap * i} state={state} fg={theme.bg} />
          ))}
        </Svg>
        {labels && (
          <View style={{ position: 'absolute', left: labels ? 52 : 0, top: 0 }}>
            {steps.map((state, i) => {
              const col = state === 'arrived' ? color.noon[400] : state === 'current' ? color.gold[400] : state === 'passed' ? color.gold[500] : theme.fgFaint;
              return (
                <Text key={i} style={{ position: 'absolute', top: 20 + gap * i - 6, fontFamily: font.mono, fontSize: fs[10], color: col }}>
                  {labels[i] || ''}
                </Text>
              );
            })}
          </View>
        )}
      </View>
    );
  }

  if (layout === 'path') {
    const w = 280, padX = 40, padY = 30;
    const totalH = n * 56;
    const pts: [number, number][] = [];
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const y = totalH - padY - t * (totalH - padY * 2);
      const sway = Math.sin(t * Math.PI * 2) * 60;
      const x = w / 2 + sway;
      pts.push([x, y]);
    }
    return (
      <View>
        <Svg width={w} height={totalH}>
          {pts.map(([x1, y1], i) => {
            if (i >= n - 1) return null;
            const [x2, y2] = pts[i + 1];
            const dist = Math.hypot(x2 - x1, y2 - y1);
            const ux = (x2 - x1) / dist, uy = (y2 - y1) / dist;
            const sx = x1 + ux * 7, sy = y1 + uy * 7;
            const ex = x2 - ux * 7, ey = y2 - uy * 7;
            const cpx1 = x1 + (x2 - x1) * 0.1, cpy1 = y1 + (y2 - y1) * 0.5;
            const cpx2 = x2 - (x2 - x1) * 0.1, cpy2 = y2 - (y2 - y1) * 0.5;
            const done = steps[i] === 'passed' || steps[i] === 'arrived';
            const d = `M${sx},${sy} C${cpx1},${cpy1} ${cpx2},${cpy2} ${ex},${ey}`;
            return done
              ? <Path key={`p${i}`} d={d} fill="none" stroke={color.gold[400]} strokeWidth={2} opacity={0.85} strokeLinecap="round" />
              : <Path key={`p${i}`} d={d} fill="none" stroke={color.gold[400]} strokeWidth={1} opacity={0.4} strokeDasharray="4 3" strokeLinecap="round" />;
          })}
          {steps.map((state, i) => (
            <Marker key={`m${i}`} cx={pts[i][0]} cy={pts[i][1]} state={state} fg={theme.bg} />
          ))}
        </Svg>
        {labels && (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            {pts.map(([x, y], i) => {
              const state = steps[i];
              const col = state === 'arrived' ? color.noon[400] : state === 'current' ? color.gold[400] : state === 'passed' ? color.gold[500] : theme.fgFaint;
              const side = x > w / 2 ? -1 : 1;
              return (
                <Text key={i} style={{ position: 'absolute', top: y - 6, left: side > 0 ? x + 16 : undefined, right: side < 0 ? w - x + 16 : undefined, fontFamily: font.mono, fontSize: fs[9], color: col }}>
                  {labels[i] || ''}
                </Text>
              );
            })}
          </View>
        )}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: sp[2] }}>
          <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint }}>{steps.filter(s => s === 'passed' || s === 'current' || s === 'arrived').length} of {n}</Text>
          <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: steps[n - 1] === 'arrived' ? color.noon[400] : theme.fgFaint }}>{steps[n - 1] === 'arrived' ? 'Arrived' : 'In progress'}</Text>
        </View>
      </View>
    );
  }

  // Horizontal
  const svgW = 500;
  const pad = 20;
  const spacing = n > 1 ? (svgW - pad * 2) / (n - 1) : 0;
  const svgH = labels ? 60 : 40;
  const cy = 20;

  return (
    <View>
      <Svg width="100%" height={svgH} viewBox={`0 0 ${svgW} ${svgH}`}>
        {steps.map((_, i) => {
          if (i >= n - 1) return null;
          const x1 = pad + spacing * i + 6;
          const x2 = pad + spacing * (i + 1) - 6;
          const done = steps[i] === 'passed' || steps[i] === 'arrived';
          return done
            ? <Line key={`l${i}`} x1={x1} y1={cy} x2={x2} y2={cy} stroke={color.gold[400]} strokeWidth={2} opacity={0.85} />
            : <Line key={`l${i}`} x1={x1} y1={cy} x2={x2} y2={cy} stroke={color.gold[400]} strokeWidth={1} opacity={0.4} strokeDasharray="4 3" />;
        })}
        {steps.map((state, i) => (
          <Marker key={`m${i}`} cx={pad + spacing * i} cy={cy} state={state} fg={theme.bg} />
        ))}
      </Svg>
      {labels && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: pad - 10, marginTop: -4 }}>
          {labels.map((label, i) => {
            const state = steps[i];
            const col = state === 'arrived' ? color.noon[400] : state === 'current' ? color.gold[400] : state === 'passed' ? color.gold[500] : theme.fgFaint;
            return <Text key={i} style={{ fontFamily: font.mono, fontSize: fs[9], color: col, textAlign: 'center', width: 40 }}>{label}</Text>;
          })}
        </View>
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: sp[2] }}>
        <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint }}>{steps.filter(s => s === 'passed' || s === 'current' || s === 'arrived').length} of {n}</Text>
        <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: steps[n - 1] === 'arrived' ? color.noon[400] : theme.fgFaint }}>{steps[n - 1] === 'arrived' ? 'Arrived' : 'In progress'}</Text>
      </View>
    </View>
  );
}
