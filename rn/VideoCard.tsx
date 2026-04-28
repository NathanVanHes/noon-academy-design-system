/**
 * VideoCard — video thumbnail card with 16:9 preview.
 * Shows a thumbnail image with play button overlay.
 * On press, opens the video URL in the native player (iOS/Android).
 */
import React from 'react';
import { View, Text, Image, Pressable, Linking, type ImageSourcePropType } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font } from './tokens';

interface VideoCardProps {
  title: string;
  attribution?: string;
  duration?: string;
  uri?: string;
  thumbnail?: ImageSourcePropType;
  onPress?: () => void;
}

function getYouTubeThumbnail(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : null;
}

export function VideoCard({ title, attribution, duration, uri, thumbnail, onPress }: VideoCardProps) {
  const { theme } = useTheme();

  const autoThumb = uri ? getYouTubeThumbnail(uri) : null;
  const thumbSource = thumbnail || (autoThumb ? { uri: autoThumb } : null);

  const handlePress = () => {
    if (onPress) return onPress();
    if (uri) Linking.openURL(uri);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => ({
        backgroundColor: theme.bgRaised,
        borderRadius: r[2],
        borderWidth: 1,
        borderColor: theme.border,
        overflow: 'hidden',
        opacity: pressed ? 0.9 : 1,
      })}
    >
      {/* Thumbnail — 16:9 */}
      <View style={{
        aspectRatio: 16 / 9,
        backgroundColor: theme.hoverOverlay,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {thumbSource && (
          <Image source={thumbSource} style={{ position: 'absolute', width: '100%', height: '100%' }} resizeMode="cover" />
        )}
        <View style={{
          width: sp[9], height: sp[9], borderRadius: sp[9] / 2,
          backgroundColor: theme.accent,
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Text style={{ color: theme.accentFg, fontSize: fs[16], marginLeft: 2 }}>{'▶'}</Text>
        </View>
        {duration && (
          <View style={{
            position: 'absolute', bottom: sp[2], right: sp[2],
            backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: r[1],
            paddingHorizontal: sp[1], paddingVertical: 1,
          }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: '#fff' }}>{duration}</Text>
          </View>
        )}
      </View>
      {/* Info — hidden when no title and no attribution */}
      {(title || attribution) && (
        <View style={{ padding: sp[3], paddingHorizontal: sp[4] }}>
          {title ? <Text style={{ fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fg }}>{title}</Text> : null}
          {attribution && (
            <Text style={{ fontFamily: font.sans, fontSize: fs[11], color: theme.fgFaint, marginTop: sp[0.5] }}>{attribution}</Text>
          )}
        </View>
      )}
    </Pressable>
  );
}
