/**
 * Card — structured content card with consistent layout.
 * All content via props — the card controls the layout.
 *
 * <Card title="Qudrat Reading" subtitle="Mr. Hassan" meta="4 of 8" onPress={...} />
 * <Card title="..." actions={[{ label: 'Remove', danger: true, onPress: ... }]} />
 */
import React, { useState, useRef, useCallback, useMemo } from 'react';
import { View, Text, Image, Pressable, I18nManager, type LayoutChangeEvent, type ViewStyle, type ImageSourcePropType } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from './ThemeContext';
import type { Theme } from './tokens';
import { sp, r, fs, fw, font, icon, color } from './tokens';
import { Icon } from './Icon';
import { Menu } from './Menu';

interface CardAction {
  label: string;
  danger?: boolean;
  onPress: () => void;
}

interface CardProps {
  title: string;
  subtitle?: string;
  meta?: string;
  thumbnail?: ImageSourcePropType;
  /** Thumbnail crop — only these two, keeps grids tidy */
  thumbnailRatio?: '16:9' | '1:1';
  actions?: CardAction[];
  selectable?: boolean;
  selected?: boolean;
  loading?: boolean;
  spotlight?: 'terra' | 'teal';
  pattern?: boolean;
  /** 'auto' = full width of parent (default), 'fill' = share row space equally, 'hug' = shrink to content */
  sizing?: 'auto' | 'fill' | 'hug';
  onPress?: () => void;
  style?: ViewStyle;
}

const CHECKBOX_SIZE = 20;

/**
 * Spotlight card patterns — tinted with the card's text colour and faded
 * to nothing on the text side so they never sit under copy.
 * Terra carries the Facet language (filled triangle mesh); teal carries the
 * Khatam lattice (line-only). Per-element opacity fakes the gradient —
 * SVG gradient fills/strokes are unreliable on react-native-web.
 */
const fract = (n: number) => n - Math.floor(n);
const hash2 = (i: number, j: number, k: number) => fract(Math.abs(Math.sin(i * 127.1 + j * 311.7 + k * 74.7) * 43758.5453));

function FacetSpot({ w, h, tint }: { w: number; h: number; tint: string }) {
  const tris = useMemo(() => {
    const cell = 34;
    const cols = Math.ceil(w / cell);
    const rows = Math.ceil(h / cell);
    const f = (n: number) => Math.round(n * 10) / 10;
    // Jittered vertex grid, edges pinned
    const vx = (i: number, j: number) => {
      const px = i === 0 || i === cols ? i * cell : i * cell + (hash2(i, j, 1) - 0.5) * cell * 0.55;
      const py = j === 0 || j === rows ? j * cell : j * cell + (hash2(i, j, 2) - 0.5) * cell * 0.55;
      return [px, py] as const;
    };
    const out: Array<{ d: string; o: number }> = [];
    for (let i = 0; i < cols; i++) {
      const fade = Math.pow((i + 1) / cols, 2); // 0 at text side → 1 at trailing edge
      for (let j = 0; j < rows; j++) {
        const a = vx(i, j), b = vx(i + 1, j), c = vx(i, j + 1), d = vx(i + 1, j + 1);
        const flip = hash2(i, j, 3) > 0.5;
        const t1 = flip ? [a, b, c] : [a, b, d];
        const t2 = flip ? [b, d, c] : [a, d, c];
        for (const [tri, k] of [[t1, 4], [t2, 5]] as const) {
          const shade = 0.05 + hash2(i, j, k) * 0.13;
          out.push({
            d: `M${f(tri[0][0])} ${f(tri[0][1])}L${f(tri[1][0])} ${f(tri[1][1])}L${f(tri[2][0])} ${f(tri[2][1])}Z`,
            o: shade * fade,
          });
        }
      }
    }
    return out;
  }, [w, h]);
  return (
    <Svg width={w} height={h}>
      {tris.map((t, i) => (
        <Path key={i} d={t.d} fill={tint} fillOpacity={t.o} />
      ))}
    </Svg>
  );
}

function KhatamSpot({ w, h, tint }: { w: number; h: number; tint: string }) {
  const columns = useMemo(() => {
    const tile = 48;
    const k = tile / 96;
    const f = (n: number) => Math.round(n * 10) / 10;
    const cols = Math.ceil(w / tile) + 1;
    const rows = Math.ceil(h / tile) + 1;
    const out: Array<{ d: string; o: number }> = [];
    for (let i = 0; i < cols; i++) {
      let d = '';
      const tx = i * tile;
      for (let j = 0; j < rows; j++) {
        const ty = j * tile;
        // Khatam unit — square + diamond, line only
        d += `M${f(tx + 14 * k)} ${f(ty + 14 * k)}h${f(68 * k)}v${f(68 * k)}h${f(-68 * k)}Z`;
        d += `M${f(tx + 48 * k)} ${f(ty)}L${f(tx + 96 * k)} ${f(ty + 48 * k)}L${f(tx + 48 * k)} ${f(ty + 96 * k)}L${f(tx)} ${f(ty + 48 * k)}Z`;
      }
      const t = (i + 1) / cols;
      out.push({ d, o: t * t * 0.45 });
    }
    return out;
  }, [w, h]);
  return (
    <Svg width={w} height={h}>
      {columns.map((c, i) => (
        <Path key={i} d={c.d} fill="none" stroke={tint} strokeOpacity={c.o} strokeWidth={1.1} strokeLinejoin="round" />
      ))}
    </Svg>
  );
}

export function Card({ title, subtitle, meta, thumbnail, thumbnailRatio = '16:9', actions, selectable, selected: selectedProp, loading, spotlight, pattern, sizing = 'auto', onPress, style }: CardProps) {
  const { theme, mode } = useTheme();

  // Spotlight surfaces: solid terra/teal fills with a single text colour on top.
  const spot = spotlight ? {
    // Terra spotlight fills use the clay ramp — Heat (#BC5A37) is a signal, not a surface.
    // Teal = Future teal (theme.intel), the brand's intelligent layer — not noon green.
    bg: spotlight === 'terra' ? (mode === 'void' ? theme.terra : color.clay[400]) : theme.intel,
    // Void surfaces (bright orange / mid teal) take ink; paper surfaces (deep clay / deep teal) take cream.
    fg: mode === 'void' ? theme.accentFg : theme.fgInverse,
  } : null;
  const selected = selectable ? !!selectedProp : false;
  const indent = selectable ? CHECKBOX_SIZE + sp[3] : 0;
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<{ x: number; y: number }>({ x: sp[4], y: 100 });
  const moreRef = useRef<View>(null);

  const handleMorePress = useCallback(() => {
    moreRef.current?.measureInWindow((x, y, width, height) => {
      setMenuAnchor({ x, y: y + height + sp[1] });
      setMenuOpen(true);
    });
  }, []);

  const containerStyle: ViewStyle = {
    backgroundColor: spot ? spot.bg : theme.bgRaised,
    borderRadius: r[2],
    borderWidth: 1,
    borderColor: spot ? (selected ? spot.fg : 'rgba(0,0,0,0.08)') : selected ? theme.accentBorder : theme.border,
    overflow: 'hidden',
    opacity: loading ? 0.4 : 1,
    ...(sizing === 'fill' ? { flex: 1 } : sizing === 'hug' ? { alignSelf: 'flex-start' as const } : null),
    ...style,
  };

  const showPattern = !!(spot && pattern);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);
  const onLayout = showPattern
    ? (e: LayoutChangeEvent) => {
        const { width, height } = e.nativeEvent.layout;
        setBox(prev => (prev && prev.w === width && prev.h === height ? prev : { w: width, h: height }));
      }
    : undefined;

  const content = (
    <>
      {showPattern && box && (
        <View
          style={{
            position: 'absolute', top: 0, bottom: 0, width: box.w * 0.6,
            [I18nManager.isRTL ? 'left' : 'right']: 0,
            // Mirror in RTL so the fade still runs away from the text side.
            transform: I18nManager.isRTL ? [{ scaleX: -1 }] : undefined,
          }}
          pointerEvents="none"
        >
          {spotlight === 'terra'
            ? <FacetSpot w={box.w * 0.6} h={box.h} tint={spot!.fg} />
            : <KhatamSpot w={box.w * 0.6} h={box.h} tint={spot!.fg} />}
        </View>
      )}
      {thumbnail && (
        // Ratio lives on the wrapper — aspectRatio directly on Image loses to
        // the image's intrinsic size on react-native-web.
        <View style={{ width: '100%', aspectRatio: thumbnailRatio === '1:1' ? 1 : 16 / 9, backgroundColor: theme.hoverOverlay }}>
          <Image
            source={thumbnail}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>
      )}
      <View style={{ padding: sp[4], gap: sp[1] }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: sp[3] }}>
          {selectable && (
            <View style={{
              width: CHECKBOX_SIZE, height: CHECKBOX_SIZE, borderRadius: r[1], borderWidth: 1.5, marginTop: 1,
              borderColor: spot ? spot.fg : selected ? theme.accent : theme.borderStrong,
              backgroundColor: selected ? (spot ? spot.fg : theme.accent) : 'transparent',
              alignItems: 'center', justifyContent: 'center',
            }}>
              {selected && <Icon name="check" size={icon.sm} color={spot ? spot.bg : theme.accentFg} />}
            </View>
          )}
          <Text style={{ fontFamily: font.sans, fontSize: fs[15], fontWeight: fw[600], color: spot ? spot.fg : theme.fg, flex: 1 }} numberOfLines={2}>{title}</Text>
          {actions && actions.length > 0 && (
            <Pressable
              onPress={(e) => { e.stopPropagation?.(); handleMorePress(); }}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="More actions"
              style={{ padding: sp[1] }}
            >
              <View ref={moreRef} collapsable={false}>
                <Icon name="more-vertical" size={icon.lg} color={spot ? spot.fg : theme.fgMuted} />
              </View>
            </Pressable>
          )}
        </View>
        {subtitle && <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: spot ? spot.fg : theme.fgMuted, opacity: spot ? 0.85 : 1, marginStart: indent }} numberOfLines={1}>{subtitle}</Text>}
        {meta && <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: spot ? spot.fg : theme.fgFaint, opacity: spot ? 0.7 : 1, marginTop: sp[1], marginStart: indent }}>{meta}</Text>}
      </View>
      {actions && actions.length > 0 && (
        <Menu visible={menuOpen} onClose={() => setMenuOpen(false)} anchor={menuAnchor} items={actions.map(a => ({ label: a.label, danger: a.danger, onPress: a.onPress }))} />
      )}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        onLayout={onLayout}
        accessibilityRole={selectable ? 'checkbox' : 'button'}
        accessibilityState={selectable ? { checked: selected, disabled: !!loading } : loading ? { disabled: true } : undefined}
        accessibilityLabel={title}
        disabled={loading}
        style={({ pressed }) => [containerStyle, pressed && { borderColor: theme.borderStrong }]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={containerStyle} onLayout={onLayout}>{content}</View>;
}
