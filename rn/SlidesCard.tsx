/**
 * SlidesCard — class slide viewer. Shows thumbnail of first slide, opens FullSheet to browse.
 * Slides are images from the class (not PDFs).
 */
import React, { useState } from 'react';
import { View, Text, Pressable, Image, type ImageSourcePropType } from 'react-native';
import { useTheme } from './ThemeContext';
import { FullSheet } from './FullSheet';
import { Button } from './Button';
import { sp, r, fs, fw, font } from './tokens';

interface SlidesCardProps {
  title: string;
  attribution?: string;
  slides: ImageSourcePropType[];
  onPress?: () => void;
}

export function SlidesCard({ title, attribution, slides, onPress }: SlidesCardProps) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const handlePress = () => {
    if (onPress) return onPress();
    if (slides.length) setOpen(true);
  };

  return (
    <>
      <Pressable
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={`${title} — ${slides.length} slide${slides.length !== 1 ? 's' : ''}`}
        style={({ pressed }) => ({
          backgroundColor: theme.bgRaised,
          borderRadius: r[2],
          borderWidth: 1,
          borderColor: theme.border,
          overflow: 'hidden',
          opacity: pressed ? 0.9 : 1,
        })}
      >
        <View style={{ flexDirection: 'row', padding: sp[3], gap: sp[3], alignItems: 'center' }}>
          {/* Thumbnail of first slide */}
          <Image
            source={slides[0]}
            style={{ width: 56, height: 36, borderRadius: r[1], backgroundColor: theme.hoverOverlay }}
            resizeMode="cover"
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fg }}>{title}</Text>
            <Text style={{ fontFamily: font.sans, fontSize: fs[11], color: theme.fgFaint, marginTop: sp[0.5] }}>
              {attribution ? `${attribution} · ` : ''}{slides.length} slide{slides.length !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>
      </Pressable>

      {slides.length > 0 && (
        <FullSheet visible={open} onClose={() => setOpen(false)} title={`${title} · ${current + 1}/${slides.length}`}>
          <Image
            source={slides[current]}
            style={{ width: '100%', aspectRatio: 16 / 9, borderRadius: r[2], marginBottom: sp[5] }}
            resizeMode="contain"
          />
          {slides.length > 1 && (
            <View style={{ flexDirection: 'row', gap: sp[3] }}>
              <Button variant="secondary" size="sm" disabled={current === 0} onPress={() => setCurrent(current - 1)}>Prev</Button>
              <Button variant="secondary" size="sm" disabled={current === slides.length - 1} onPress={() => setCurrent(current + 1)}>Next</Button>
            </View>
          )}
        </FullSheet>
      )}
    </>
  );
}
