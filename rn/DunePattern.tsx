/**
 * DunePattern — geometric desert brand pattern.
 * Variants: ridgeline (bold gold dune planes), constellation (gold nodes + purple planes), horizon (converging lit faces).
 */
import React from 'react';
import { View, type ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path, Line, Circle } from 'react-native-svg';
import { useTheme } from './ThemeContext';
import { color } from './tokens';

type Variant = 'constellation' | 'horizon';

interface DunePatternProps {
  width: number;
  height: number;
  variant?: Variant;
  style?: ViewStyle;
}

export function DunePattern({ width, height, variant = 'constellation', style }: DunePatternProps) {
  const { theme, mode } = useTheme();
  const isVoid = mode === 'void';


  if (variant === 'constellation') {
    const w = width, h = height;

    // Two hub nodes with many spokes, plus scattered secondary nodes
    const hubs = [
      { x: w * 0.72, y: h * 0.62, r: 3.5, bright: true },  // right hub
      { x: w * 0.32, y: h * 0.58, r: 3, bright: true },     // left hub
    ];

    const secondaryNodes = [
      // Spokes from right hub
      { x: w * 0.95, y: h * 0.45 }, { x: w * 0.88, y: h * 0.78 },
      { x: w * 0.6, y: h * 0.42 }, { x: w * 0.82, y: h * 0.35 },
      { x: w * 0.55, y: h * 0.75 }, { x: w * 0.98, y: h * 0.62 },
      { x: w * 0.75, y: h * 0.88 }, { x: w * 0.65, y: h * 0.52 },
      // Spokes from left hub
      { x: w * 0.08, y: h * 0.48 }, { x: w * 0.15, y: h * 0.72 },
      { x: w * 0.42, y: h * 0.4 }, { x: w * 0.2, y: h * 0.38 },
      { x: w * 0.05, y: h * 0.65 }, { x: w * 0.38, y: h * 0.82 },
      { x: w * 0.48, y: h * 0.68 },
      // Cross connections
      { x: w * 0.5, y: h * 0.55 },
    ];

    const allNodes = [...hubs, ...secondaryNodes.map(n => ({ ...n, r: 1 + Math.random() * 1.5, bright: Math.random() > 0.5 }))];

    // Connect hubs to their spokes + some cross links
    const connections: [number, number][] = [];
    // Right hub (0) to its spokes (2-9)
    for (let i = 2; i <= 9; i++) connections.push([0, i]);
    // Left hub (1) to its spokes (10-16)
    for (let i = 10; i <= 16; i++) connections.push([1, i]);
    // Hub to hub via middle nodes
    connections.push([0, 17], [1, 17], [0, 1]);
    // Cross connections
    connections.push([4, 7], [5, 6], [10, 12], [11, 14], [2, 3], [6, 16], [9, 15]);

    // Triangles — key visible planes
    const triangles: [number, number, number][] = [
      [0, 2, 3], [0, 3, 7], [0, 7, 5], [0, 5, 6],   // right hub fan
      [1, 10, 11], [1, 11, 14], [1, 14, 16],          // left hub fan
      [0, 17, 7], [1, 17, 14], [0, 1, 17],            // bridge
      [1, 10, 12], [0, 2, 5],                          // extra depth
    ];

    // Opacity levels for triangles — vary for depth
    const triOpacity = [0.35, 0.2, 0.28, 0.15, 0.3, 0.18, 0.25, 0.22, 0.2, 0.32, 0.12, 0.18];

    return (
      <View style={[{ width: w, height: h, backgroundColor: theme.bg }, style]}>
        <Svg width={w} height={h}>
          {/* Scatter stars */}
          {Array.from({ length: 40 }, (_, i) => {
            const sx = (i * 97.3 + 13) % w;
            const sy = (i * 53.7 + 7) % (h * 0.5);
            const sr = 0.4 + (i % 3) * 0.3;
            return <Circle key={`s${i}`} cx={sx} cy={sy} r={sr} fill={color.gold[300]} opacity={0.1 + (i % 4) * 0.08} />;
          })}

          {/* Triangle planes — iris purple with terracotta warm accents */}
          {triangles.map((t, i) => {
            const a = allNodes[t[0]], b = allNodes[t[1]], c = allNodes[t[2]];
            const op = (triOpacity[i] || 0.2) * (isVoid ? 1 : 0.6);
            const isTerra = i === 2 || i === 6 || i === 9; // some triangles get terracotta
            return <Path key={`t${i}`} d={`M${a.x},${a.y} L${b.x},${b.y} L${c.x},${c.y} Z`} fill={isTerra ? theme.terra : theme.iris} fillOpacity={isTerra ? op * 0.7 : op} />;
          })}

          {/* Connection lines — thin gold */}
          {connections.map(([a, b], i) => (
            <Line key={`c${i}`} x1={allNodes[a].x} y1={allNodes[a].y} x2={allNodes[b].x} y2={allNodes[b].y}
              stroke={color.gold[400]} strokeWidth={0.75} strokeOpacity={isVoid ? 0.45 : 0.25} />
          ))}

          {/* Nodes — gold dots with glow halos */}
          {allNodes.map((n, i) => (
            <React.Fragment key={`n${i}`}>
              {n.bright && <Circle cx={n.x} cy={n.y} r={n.r + 8} fill={color.gold[300]} opacity={isVoid ? 0.06 : 0.04} />}
              {n.bright && <Circle cx={n.x} cy={n.y} r={n.r + 4} fill={color.gold[300]} opacity={isVoid ? 0.12 : 0.08} />}
              <Circle cx={n.x} cy={n.y} r={n.r} fill={n.bright ? color.gold[300] : color.gold[400]} opacity={n.bright ? (isVoid ? 0.85 : 0.6) : (isVoid ? 0.45 : 0.3)} />
            </React.Fragment>
          ))}
        </Svg>
      </View>
    );
  }

  // horizon — bold converging lit faces like the dune reference
  const w = width, h = height;
  const cx = w * 0.45;
  const cy = h * 0.5;
  return (
    <View style={[{ width: w, height: h, backgroundColor: theme.bg }, style]}>
      <Svg width={w} height={h}>
        <Defs>
          <LinearGradient id="hGoldBright" x1="0.4" y1="0.3" x2="1" y2="0.7">
            <Stop offset="0" stopColor={color.gold[200]} stopOpacity={isVoid ? 0.95 : 0.7} />
            <Stop offset="0.5" stopColor={color.gold[300]} stopOpacity={isVoid ? 0.8 : 0.55} />
            <Stop offset="1" stopColor={color.gold[400]} stopOpacity={isVoid ? 0.5 : 0.35} />
          </LinearGradient>
          <LinearGradient id="hGoldWarm" x1="0.3" y1="0.5" x2="0.8" y2="1">
            <Stop offset="0" stopColor={color.terra[isVoid ? 500 : 300]} stopOpacity={isVoid ? 0.4 : 0.3} />
            <Stop offset="0.5" stopColor={color.gold[300]} stopOpacity={isVoid ? 0.5 : 0.35} />
            <Stop offset="1" stopColor={color.gold[500]} stopOpacity={isVoid ? 0.15 : 0.08} />
          </LinearGradient>
          <LinearGradient id="hShadowL" x1="0" y1="0" x2="0.6" y2="1">
            <Stop offset="0" stopColor={isVoid ? color.void[100] : color.terra[200]} stopOpacity={isVoid ? 0.5 : 0.2} />
            <Stop offset="1" stopColor={theme.bg} stopOpacity={0} />
          </LinearGradient>
          <LinearGradient id="hShadowDeep" x1="0.2" y1="0" x2="0.5" y2="1">
            <Stop offset="0" stopColor={isVoid ? color.void[200] : color.paper[300]} stopOpacity={isVoid ? 0.35 : 0.15} />
            <Stop offset="1" stopColor={theme.bg} stopOpacity={0} />
          </LinearGradient>
          <LinearGradient id="hGlow" x1="0.5" y1="0.5" x2="0.5" y2="0">
            <Stop offset="0" stopColor={color.gold[200]} stopOpacity={isVoid ? 0.3 : 0.2} />
            <Stop offset="1" stopColor={color.gold[300]} stopOpacity={0} />
          </LinearGradient>
        </Defs>

        {/* Light glow behind vanishing point */}
        <Circle cx={cx} cy={cy} r={h * 0.4} fill="url(#hGlow)" />

        {/* Left shadow planes */}
        <Path d={`M0,${h * 0.35} L${cx},${cy} L0,${h * 0.75} Z`} fill="url(#hShadowL)" />
        <Path d={`M0,${h * 0.55} L${cx},${cy} L0,${h * 0.9} Z`} fill="url(#hShadowDeep)" />

        {/* Right gold plane — the main lit face */}
        <Path d={`M${w},${h * 0.2} L${cx},${cy} L${w},${h * 0.7} Z`} fill="url(#hGoldBright)" />

        {/* Ground plane — warm gold-to-terracotta */}
        <Path d={`M0,${h} L${cx},${cy} L${w},${h} Z`} fill="url(#hGoldWarm)" />

        {/* Terracotta warm face — lower left */}
        <Path d={`M0,${h * 0.75} L${cx},${cy} L0,${h} Z`} fill={color.terra[isVoid ? 600 : 400]} fillOpacity={isVoid ? 0.12 : 0.1} />

        {/* Left foreground dune curve */}
        <Path d={`M0,${h * 0.8} Q${w * 0.2},${h * 0.65} ${cx},${cy}`} fill="none" stroke={color.gold[400]} strokeWidth={1} strokeOpacity={isVoid ? 0.35 : 0.2} />

        {/* Ridge lines */}
        <Line x1={0} y1={h * 0.35} x2={cx} y2={cy} stroke={theme.borderStrong} strokeWidth={0.75} />
        <Line x1={cx} y1={cy} x2={w} y2={h * 0.2} stroke={color.gold[300]} strokeWidth={1.5} strokeOpacity={isVoid ? 0.5 : 0.35} />
        <Line x1={cx} y1={cy} x2={w} y2={h * 0.7} stroke={color.gold[400]} strokeWidth={0.75} strokeOpacity={isVoid ? 0.3 : 0.2} />
        <Line x1={0} y1={h * 0.75} x2={cx} y2={cy} stroke={theme.border} strokeWidth={0.5} />

        {/* Vanishing point */}
        <Circle cx={cx} cy={cy} r={2.5} fill={color.gold[200]} opacity={isVoid ? 0.8 : 0.5} />
      </Svg>
    </View>
  );
}
