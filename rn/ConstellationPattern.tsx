/**
 * ConstellationPattern — geometric starfield with connected nodes and triangular planes.
 *
 * Gold nodes connected by thin lines form constellations. Triangular planes in
 * iris purple and terracotta fill between nodes for depth. Scattered small stars
 * in the background. Used for sky/celestial contexts — headers, hero areas,
 * achievement screens.
 */
import React from 'react';
import { View, type ViewStyle } from 'react-native';
import Svg, { Path, Line, Circle } from 'react-native-svg';
import { useTheme } from './ThemeContext';
import { color } from './tokens';

interface ConstellationPatternProps {
  width: number;
  height: number;
  opacity?: number;
  style?: ViewStyle;
}

export function ConstellationPattern({ width: w, height: h, opacity = 1, style }: ConstellationPatternProps) {
  const { theme, mode } = useTheme();
  const isVoid = mode === 'void';

  const hubs = [
    { x: w * 0.72, y: h * 0.62, r: 3.5, bright: true },
    { x: w * 0.32, y: h * 0.58, r: 3, bright: true },
  ];

  const secondaryNodes = [
    { x: w * 0.95, y: h * 0.45 }, { x: w * 0.88, y: h * 0.78 },
    { x: w * 0.6, y: h * 0.42 }, { x: w * 0.82, y: h * 0.35 },
    { x: w * 0.55, y: h * 0.75 }, { x: w * 0.98, y: h * 0.62 },
    { x: w * 0.75, y: h * 0.88 }, { x: w * 0.65, y: h * 0.52 },
    { x: w * 0.08, y: h * 0.48 }, { x: w * 0.15, y: h * 0.72 },
    { x: w * 0.42, y: h * 0.4 }, { x: w * 0.2, y: h * 0.38 },
    { x: w * 0.05, y: h * 0.65 }, { x: w * 0.38, y: h * 0.82 },
    { x: w * 0.48, y: h * 0.68 },
    { x: w * 0.5, y: h * 0.55 },
  ];

  const allNodes = [...hubs, ...secondaryNodes.map(n => ({ ...n, r: 1 + Math.random() * 1.5, bright: Math.random() > 0.5 }))];

  const connections: [number, number][] = [];
  for (let i = 2; i <= 9; i++) connections.push([0, i]);
  for (let i = 10; i <= 16; i++) connections.push([1, i]);
  connections.push([0, 17], [1, 17], [0, 1]);
  connections.push([4, 7], [5, 6], [10, 12], [11, 14], [2, 3], [6, 16], [9, 15]);

  const triangles: [number, number, number][] = [
    [0, 2, 3], [0, 3, 7], [0, 7, 5], [0, 5, 6],
    [1, 10, 11], [1, 11, 14], [1, 14, 16],
    [0, 17, 7], [1, 17, 14], [0, 1, 17],
    [1, 10, 12], [0, 2, 5],
  ];

  const triOpacity = [0.35, 0.2, 0.28, 0.15, 0.3, 0.18, 0.25, 0.22, 0.2, 0.32, 0.12, 0.18];

  return (
    <View style={[{ width: w, height: h, backgroundColor: theme.bg }, style]}>
      <Svg width={w} height={h} style={{ opacity }}>
        {Array.from({ length: 40 }, (_, i) => {
          const sx = (i * 97.3 + 13) % w;
          const sy = (i * 53.7 + 7) % (h * 0.5);
          const sr = 0.4 + (i % 3) * 0.3;
          return <Circle key={`s${i}`} cx={sx} cy={sy} r={sr} fill={color.gold[300]} opacity={0.1 + (i % 4) * 0.08} />;
        })}

        {triangles.map((t, i) => {
          const a = allNodes[t[0]], b = allNodes[t[1]], c = allNodes[t[2]];
          const op = (triOpacity[i] || 0.2) * (isVoid ? 1 : 0.6);
          const isTerra = i === 2 || i === 6 || i === 9;
          return <Path key={`t${i}`} d={`M${a.x},${a.y} L${b.x},${b.y} L${c.x},${c.y} Z`} fill={isTerra ? theme.terra : theme.iris} fillOpacity={isTerra ? op * 0.7 : op} />;
        })}

        {connections.map(([a, b], i) => (
          <Line key={`c${i}`} x1={allNodes[a].x} y1={allNodes[a].y} x2={allNodes[b].x} y2={allNodes[b].y}
            stroke={color.gold[400]} strokeWidth={0.75} strokeOpacity={isVoid ? 0.45 : 0.25} />
        ))}

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
