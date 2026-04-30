/**
 * QuizOption — A/B/C/D selector for quizzes.
 * States: default, selected (blue), correct (green), incorrect (red), disabled.
 */
import React from 'react';
import { Pressable, View, Text, Image, type ViewStyle, type TextStyle, type ImageSourcePropType } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font, icon } from './tokens';

type State = 'default' | 'selected' | 'correct' | 'incorrect' | 'disabled';

interface QuizOptionProps {
  label: string; // A, B, C, D
  text?: string;
  image?: ImageSourcePropType;
  state?: State;
  onPress?: () => void;
}

export function QuizOption({ label, text, image, state = 'default', onPress }: QuizOptionProps) {
  const { theme } = useTheme();

  const borderColorMap: Record<State, string> = {
    default: theme.border,
    selected: theme.accent,
    correct: theme.accent,
    incorrect: theme.danger,
    disabled: theme.border,
  };

  const bgMap: Record<State, string> = {
    default: 'transparent',
    selected: theme.accentSoft,
    correct: theme.accentSoft,
    incorrect: theme.dangerSoft,
    disabled: 'transparent',
  };

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sp[3],
    padding: sp[3],
    paddingEnd: sp[4],
    borderRadius: r[2],
    borderWidth: 1,
    borderColor: borderColorMap[state],
    backgroundColor: bgMap[state],
    opacity: state === 'disabled' ? 0.4 : 1,
  };

  const labelStyle: ViewStyle = {
    width: icon['2xl'],
    height: icon['2xl'],
    borderRadius: r[1],
    backgroundColor: state === 'default' ? theme.hoverOverlay : bgMap[state],
    alignItems: 'center',
    justifyContent: 'center',
  };

  const labelTextStyle: TextStyle = {
    fontFamily: font.mono,
    fontSize: fs[13],
    fontWeight: fw[600],
    color: state === 'default' ? theme.fgMuted : borderColorMap[state],
  };

  const optionTextStyle: TextStyle = {
    fontFamily: font.sans,
    fontSize: fs[15],
    color: theme.fg,
    lineHeight: fs[15] * 1.5,
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={state === 'disabled' || state === 'correct' || state === 'incorrect'}
      accessibilityRole="button"
      accessibilityState={{ selected: state === 'selected', disabled: state === 'disabled' }}
      style={({ pressed }) => [containerStyle, pressed && { backgroundColor: theme.hoverOverlay }]}
    >
      <View style={labelStyle}>
        <Text style={labelTextStyle}>{label}</Text>
      </View>
      <View style={{ flex: 1 }}>
        {image && <View style={{ width: 120, height: 120, borderRadius: r[1], overflow: 'hidden', marginBottom: text ? sp[2] : 0 }}><Image source={image} style={{ width: '100%', height: '100%' }} resizeMode="cover" /></View>}
        {text ? <Text style={optionTextStyle}>{text}</Text> : null}
      </View>
    </Pressable>
  );
}
