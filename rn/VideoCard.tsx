/**
 * VideoCard — video card with 16:9 preview.
 * On web: tapping play embeds the YouTube video inline via iframe.
 * On native: opens the video URL externally.
 */
import React, { useState } from 'react';
import { View, Text, Image, Pressable, Linking, Platform, type ImageSourcePropType } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font, icon, color } from './tokens';
import { Icon } from './Icon';

interface VideoCardProps {
  title: string;
  attribution?: string;
  duration?: string;
  uri?: string;
  thumbnail?: ImageSourcePropType;
  onPress?: () => void;
}

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

export function VideoCard({ title, attribution, duration, uri, thumbnail, onPress }: VideoCardProps) {
  const { theme } = useTheme();
  const [playing, setPlaying] = useState(false);

  const videoId = uri ? getYouTubeId(uri) : null;
  const autoThumb = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
  const thumbSource = thumbnail || (autoThumb ? { uri: autoThumb } : null);

  const handlePress = () => {
    if (onPress) return onPress();
    if (Platform.OS === 'web' && videoId) {
      setPlaying(true);
      return;
    }
    if (uri) Linking.openURL(uri);
  };

  return (
    <View
      accessibilityLabel={title}
      style={{
        backgroundColor: theme.bgRaised,
        borderRadius: r[2],
        borderWidth: 1,
        borderColor: theme.border,
        overflow: 'hidden',
      }}
    >
      {/* Video area — 16:9 */}
      <View style={{
        aspectRatio: 16 / 9,
        backgroundColor: theme.hoverOverlay,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {playing && videoId && Platform.OS === 'web' ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            style={{ width: '100%', height: '100%', border: 'none' } as any}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <Pressable onPress={handlePress} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            {thumbSource && (
              <Image source={thumbSource} style={{ position: 'absolute', width: '100%', height: '100%' }} resizeMode="cover" />
            )}
            <View style={{
              width: sp[9], height: sp[9], borderRadius: sp[9] / 2,
              backgroundColor: theme.accent,
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="play" size={icon.lg} color={theme.accentFg} />
            </View>
            {duration && (
              <View style={{
                position: 'absolute', bottom: sp[2], right: sp[2],
                backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: r[1],
                paddingHorizontal: sp[1], paddingVertical: 1,
              }}>
                <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: color.chalk[100] }}>{duration}</Text>
              </View>
            )}
          </Pressable>
        )}
      </View>
      {/* Info */}
      {(title || attribution) && (
        <View style={{ padding: sp[3], paddingHorizontal: sp[4] }}>
          {title ? <Text style={{ fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fg }}>{title}</Text> : null}
          {attribution && (
            <Text style={{ fontFamily: font.sans, fontSize: fs[11], color: theme.fgFaint, marginTop: sp[0.5] }}>{attribution}</Text>
          )}
        </View>
      )}
    </View>
  );
}
