/**
 * Card — structured content card with consistent layout.
 * All content via props — the card controls the layout.
 *
 * <Card title="Qudrat Reading" subtitle="Mr. Hassan" meta="4 of 8" onPress={...} />
 * <Card title="..." actions={[{ label: 'Remove', danger: true, onPress: ... }]} />
 */
import React, { useState, useRef, useCallback } from 'react';
import { View, Text, Image, Pressable, type ViewStyle, type ImageSourcePropType } from 'react-native';
import { useTheme } from './ThemeContext';
import type { Theme } from './tokens';
import { sp, r, fs, fw, font, icon } from './tokens';
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
  actions?: CardAction[];
  selectable?: boolean;
  selected?: boolean;
  loading?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

const CHECKBOX_SIZE = 20;

export function Card({ title, subtitle, meta, thumbnail, actions, selectable, selected: selectedProp, loading, onPress, style }: CardProps) {
  const { theme } = useTheme();
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
    backgroundColor: theme.bgRaised,
    borderRadius: r[2],
    borderWidth: 1,
    borderColor: selected ? theme.accentBorder : theme.border,
    overflow: 'hidden',
    opacity: loading ? 0.6 : 1,
    ...style,
  };

  const content = (
    <>
      {thumbnail && (
        <Image
          source={thumbnail}
          style={{ width: '100%', aspectRatio: 16 / 9, backgroundColor: theme.hoverOverlay }}
          resizeMode="cover"
        />
      )}
      <View style={{ padding: sp[4], gap: sp[1] }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: sp[3] }}>
          {selectable && (
            <View style={{
              width: CHECKBOX_SIZE, height: CHECKBOX_SIZE, borderRadius: r[1], borderWidth: 1.5, marginTop: 1,
              borderColor: selected ? theme.accent : theme.borderStrong,
              backgroundColor: selected ? theme.accent : 'transparent',
              alignItems: 'center', justifyContent: 'center',
            }}>
              {selected && <Icon name="check" size={icon.sm} color={theme.accentFg} />}
            </View>
          )}
          <Text style={{ fontFamily: font.sans, fontSize: fs[15], fontWeight: fw[600], color: theme.fg, flex: 1 }} numberOfLines={2}>{title}</Text>
          {actions && actions.length > 0 && (
            <Pressable
              onPress={(e) => { e.stopPropagation?.(); handleMorePress(); }}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="More actions"
              style={{ padding: sp[1] }}
            >
              <View ref={moreRef} collapsable={false}>
                <Icon name="more-vertical" size={icon.lg} color={theme.fgMuted} />
              </View>
            </Pressable>
          )}
        </View>
        {subtitle && <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, marginStart: indent }} numberOfLines={1}>{subtitle}</Text>}
        {meta && <Text style={{ fontFamily: font.mono, fontSize: fs[11], color: theme.fgFaint, marginTop: sp[1], marginStart: indent }}>{meta}</Text>}
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

  return <View style={containerStyle}>{content}</View>;
}
