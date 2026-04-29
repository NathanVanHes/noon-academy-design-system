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

type WaypointState = 'done' | 'passed' | 'current' | 'arrived' | 'incomplete';

interface WaypointsProps {
  steps: WaypointState[];
  labels?: string[];
  layout?: 'horizontal' | 'vertical' | 'path';
}

function Marker({ cx, cy, state, fg }: { cx: number; cy: number; state: WaypointState; fg: string }) {
  const d = 4; // half-width of diamond
  if (state === 'passed' || state === 'done') {
    return <>
      <Rect x={cx - d} y={cy - d} width={d * 2} height={d * 2} rotation={45} origin={`${cx},${cy}`} fill={theme.signal} />
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

export function Waypoints({ steps: stepsProp, labels, layout = 'horizontal' }: WaypointsProps) {
  const { theme } = useTheme();
  // Last step is always 'arrived' when it's done/passed
  const steps = stepsProp.map((s, i) => i === stepsProp.length - 1 && (s === 'done' || s === 'passed') ? 'arrived' : s);
  const n = steps.length;

  // Main rendering — dashed future lines, crosshair spikes on current/arrived, center dot on done
  {
    const S = 10;
    const spike = 7;

    function stepState(step: WaypointState) {
      const isDone = step === 'done' || step === 'passed';
      const isCurrent = step === 'current';
      const isArrived = step === 'arrived';
      return { isDone, isCurrent, isArrived, isComplete: isDone || isArrived };
    }

    function renderDiamond(step: WaypointState) {
      const { isDone, isCurrent, isArrived, isComplete } = stepState(step);
      return (
        <View style={{ width: S, height: S, alignItems: 'center', justifyContent: 'center' }}>
          {(isCurrent || isArrived) && (
            <>
              <View style={{ position: 'absolute', top: -spike, width: 1, height: spike, backgroundColor: isCurrent ? theme.signalBright : theme.accent }} />
              <View style={{ position: 'absolute', bottom: -spike, width: 1, height: spike, backgroundColor: isCurrent ? theme.signalBright : theme.accent }} />
              <View style={{ position: 'absolute', left: -spike, height: 1, width: spike, backgroundColor: isCurrent ? theme.signalBright : theme.accent }} />
              <View style={{ position: 'absolute', right: -spike, height: 1, width: spike, backgroundColor: isCurrent ? theme.signalBright : theme.accent }} />
            </>
          )}
          <View style={{
            width: S, height: S,
            transform: [{ rotate: '45deg' }],
            backgroundColor: isArrived ? theme.accent : isDone ? theme.signalDim : isCurrent ? theme.signalBright : 'transparent',
            borderWidth: !isComplete && !isCurrent ? 1 : 0,
            borderColor: theme.fgMuted,
            opacity: !isComplete && !isCurrent ? 0.55 : 1,
            alignItems: 'center', justifyContent: 'center',
          }}>
            {isDone && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: theme.bg }} />}
            {isArrived && <View style={{ width: 0, height: 0, borderLeftWidth: 3, borderRightWidth: 3, borderBottomWidth: 5, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: theme.bg, transform: [{ rotate: '-45deg' }], marginBottom: 1 }} />}
          </View>
        </View>
      );
    }

    function renderLine(prevDone: boolean, isVertical?: boolean) {
      const lineColor = prevDone ? theme.signalDim : theme.signalBorder;
      if (prevDone) {
        return <View style={isVertical
          ? { width: 1, flex: 1, backgroundColor: lineColor }
          : { height: 1, width: '100%', backgroundColor: lineColor }
        } />;
      }
      // Incomplete: dashed
      return <View style={isVertical
        ? { width: 0, flex: 1, borderLeftWidth: 1, borderLeftColor: lineColor, borderStyle: 'dashed' }
        : { height: 0, width: '100%', borderTopWidth: 1, borderTopColor: lineColor, borderStyle: 'dashed' }
      } />;
    }

    // Horizontal
    if (layout === 'horizontal' || !layout) {
      const showAllLabels = labels && n <= 5;
      return (
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%', gap: 2, flexWrap: 'nowrap', marginBottom: showAllLabels ? sp[5] : 0 }}>
            {steps.map((step, i) => {
              const prevDone = i > 0 && (steps[i - 1] === 'done' || steps[i - 1] === 'passed' || steps[i - 1] === 'arrived');
              const { isDone, isCurrent, isArrived } = stepState(step);
              const col = isArrived ? theme.accent : isCurrent ? theme.signalBright : isDone ? theme.signalDim : theme.fgFaint;
              return (
                <React.Fragment key={i}>
                  {i > 0 && (() => {
                    const prevHasSpikes = steps[i - 1] === 'current' || steps[i - 1] === 'arrived';
                    const thisHasSpikes = isCurrent || isArrived;
                    const padLeft = prevHasSpikes ? spike + 1 : 2;
                    const padRight = thisHasSpikes ? spike + 1 : 2;
                    return <View style={{ flex: 1, justifyContent: 'center', height: S, paddingLeft: padLeft, paddingRight: padRight }}>{renderLine(prevDone)}</View>;
                  })()}
                  <View style={{ alignItems: 'center', width: S, overflow: 'visible' }}>
                    {renderDiamond(step)}
                    {showAllLabels && <Text style={{ fontFamily: font.mono, fontSize: fs[9], color: col, textAlign: 'center', position: 'absolute', top: S + sp[3] }}>{labels[i]}</Text>}
                  </View>
                </React.Fragment>
              );
            })}
          </View>
          {labels && n > 5 && (() => {
            const idx = steps.findIndex(s => s === 'current' || s === 'arrived');
            const pos = idx >= 0 ? idx + 1 : 1;
            const label = labels[idx >= 0 ? idx : 0] || '';
            return (
              <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint, marginTop: sp[3] }}>
                Step {pos} of {n} · <Text style={{ color: theme.signalBright }}>{label}</Text>
              </Text>
            );
          })()}
        </View>
      );
    }

    // Vertical
    if (layout === 'vertical') {
      const lineGap = 44;
      return (
        <View>
          {steps.map((step, i) => {
            const prevDone = i > 0 && (steps[i - 1] === 'done' || steps[i - 1] === 'passed' || steps[i - 1] === 'arrived');
            const { isDone, isCurrent, isArrived } = stepState(step);
            const col = isArrived ? theme.accent : isCurrent ? theme.signalBright : isDone ? theme.signalDim : theme.fgFaint;
            return (
              <React.Fragment key={i}>
                {i > 0 && (() => {
                  const prevHasSpikes = steps[i - 1] === 'current' || steps[i - 1] === 'arrived';
                  const thisHasSpikes = isCurrent || isArrived;
                  const padTop = prevHasSpikes ? spike + 3 : 3;
                  const padBottom = thisHasSpikes ? spike + 3 : 3;
                  return <View style={{ height: lineGap, alignItems: 'center', marginLeft: S / 2 - 0.5, width: 1, paddingTop: padTop, paddingBottom: padBottom }}>{renderLine(prevDone, true)}</View>;
                })()}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[4] }}>
                  {renderDiamond(step)}
                  {labels && labels[i] && <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: col }}>{labels[i]}</Text>}
                </View>
              </React.Fragment>
            );
          })}
        </View>
      );
    }

    // Path — S-curve
    if (layout === 'path') {
      const w = 280, padY = 30;
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
        <View style={{ width: w }}>
          <Svg width={w} height={totalH}>
            {pts.map(([x1, y1], i) => {
              if (i >= n - 1) return null;
              const [x2, y2] = pts[i + 1];
              const dist = Math.hypot(x2 - x1, y2 - y1);
              const ux = (x2 - x1) / dist, uy = (y2 - y1) / dist;
              const gap = 12;
              const sx = x1 + ux * gap, sy = y1 + uy * gap;
              const ex = x2 - ux * gap, ey = y2 - uy * gap;
              const cpx1 = x1 + (x2 - x1) * 0.1, cpy1 = y1 + (y2 - y1) * 0.5;
              const cpx2 = x2 - (x2 - x1) * 0.1, cpy2 = y2 - (y2 - y1) * 0.5;
              const done = steps[i] === 'passed' || steps[i] === 'done' || steps[i] === 'arrived';
              const d = `M${sx},${sy} C${cpx1},${cpy1} ${cpx2},${cpy2} ${ex},${ey}`;
              return done
                ? <Path key={`p${i}`} d={d} fill="none" stroke={theme.signal} strokeWidth={1} strokeLinecap="round" />
                : <Path key={`p${i}`} d={d} fill="none" stroke={theme.signalBorder} strokeWidth={1} strokeDasharray="4 3" strokeLinecap="round" />;
            })}
          </Svg>
          {/* Overlay diamonds using absolute positioning */}
          {pts.map(([x, y], i) => (
            <View key={`d${i}`} style={{ position: 'absolute', left: x - S / 2, top: y - S / 2 }}>
              {renderDiamond(steps[i])}
            </View>
          ))}
          {labels && pts.map(([x, y], i) => {
            const { isDone, isCurrent, isArrived } = stepState(steps[i]);
            const col = isArrived ? theme.accent : isCurrent ? theme.signalBright : isDone ? theme.signalDim : theme.fgFaint;
            const onLeft = x > w / 2;
            return (
              <View key={`l${i}`} style={{
                position: 'absolute',
                top: y - 7,
                left: onLeft ? undefined : x + S + 6,
                right: onLeft ? (w - x) + S + 6 : undefined,
                flexDirection: 'row', alignItems: 'center', height: 14,
              }}>
                <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: col }}>{labels[i]}</Text>
              </View>
            );
          })}
        </View>
      );
    }
  }

  return null;
}
