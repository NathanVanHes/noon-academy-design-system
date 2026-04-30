/**
 * Waypoints — cartographic route visualization with diamond markers.
 * Enhanced version of RouteSteps with crosshairs, arrived state, and labels.
 * Markers: passed (dim gold), current (bright gold + crosshairs), arrived (green + crosshairs), incomplete (outline).
 */
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  Easing,
  interpolate,
  cancelAnimation,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from './ThemeContext';
import { sp, fs, fw, font } from './tokens';

type WaypointState = 'done' | 'passed' | 'current' | 'arrived' | 'incomplete';

const DIAMOND_SIZE = 10;

/** Standalone diamond marker — use this anywhere the diamond shape is needed. */
export function WaypointMarker({ state }: { state: WaypointState }) {
  const { theme } = useTheme();
  const isDone = state === 'done' || state === 'passed';
  const isCurrent = state === 'current';
  const isArrived = state === 'arrived';
  const isComplete = isDone || isArrived;
  const S = DIAMOND_SIZE;

  // Ping flash on current — diamond shape expands and fades like a lighthouse
  const ping = useSharedValue(0);
  useEffect(() => {
    if (!isCurrent) return;
    ping.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500, easing: Easing.out(Easing.ease) }),
        withTiming(0, { duration: 0 }),
        withDelay(1000, withTiming(0, { duration: 0 })),
      ),
      -1
    );
    return () => {
      cancelAnimation(ping);
    };
  }, [isCurrent]);

  const pingAnimStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: '45deg' },
      { scale: interpolate(ping.value, [0, 1], [1, 2.8]) },
    ],
    opacity: interpolate(ping.value, [0, 0.2, 1], [0.6, 0.25, 0]),
  }));

  return (
    <View style={{ width: S, height: S, alignItems: 'center', justifyContent: 'center' }}>
      {/* Ping flash — diamond shape radiates outward */}
      {isCurrent && (
        <Animated.View style={[{
          position: 'absolute',
          width: S, height: S,
          backgroundColor: theme.signalBright,
        }, pingAnimStyle]} />
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

interface WaypointsProps {
  steps: WaypointState[];
  labels?: string[];
  layout?: 'horizontal' | 'vertical' | 'path';
}


export function Waypoints({ steps: stepsProp, labels, layout = 'horizontal' }: WaypointsProps) {
  const { theme } = useTheme();
  // Last step is always 'arrived' when it's done/passed
  const steps = stepsProp.map((s, i) => i === stepsProp.length - 1 && (s === 'done' || s === 'passed') ? 'arrived' : s);
  const n = steps.length;

  // Main rendering — dashed future lines, center dot on done, triangle on arrived
  {
    const S = 10;

    function stepState(step: WaypointState) {
      const isDone = step === 'done' || step === 'passed';
      const isCurrent = step === 'current';
      const isArrived = step === 'arrived';
      return { isDone, isCurrent, isArrived, isComplete: isDone || isArrived };
    }

    function renderDiamond(step: WaypointState) {
      return <WaypointMarker state={step} />;
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
                    return <View style={{ flex: 1, justifyContent: 'center', height: S, paddingHorizontal: 2 }}>{renderLine(prevDone)}</View>;
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
                  return <View style={{ height: lineGap, alignItems: 'center', marginLeft: S / 2 - 0.5, width: 1, paddingVertical: 3 }}>{renderLine(prevDone, true)}</View>;
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
        const t = n > 1 ? i / (n - 1) : 0;
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
