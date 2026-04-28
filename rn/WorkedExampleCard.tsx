/**
 * WorkedExampleCard — opens a step-by-step worked example in a BottomSheet.
 */
import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useTheme } from './ThemeContext';
import { FullSheet } from './FullSheet';
import { sp, r, fs, fw, font } from './tokens';

interface Step {
  title: string;
  content: string;
}

interface WorkedExampleCardProps {
  title: string;
  steps?: Step[];
  onPress?: () => void;
}

export function WorkedExampleCard({ title, steps, onPress }: WorkedExampleCardProps) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  const handlePress = () => {
    if (onPress) return onPress();
    if (steps?.length) setOpen(true);
  };

  return (
    <>
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
        <View style={{ flexDirection: 'row', padding: sp[4], gap: sp[3], alignItems: 'center' }}>
          <View style={{
            width: 32, height: 32, borderRadius: r[1],
            backgroundColor: theme.irisSoft,
            borderWidth: 1, borderColor: theme.irisBorder,
            alignItems: 'center', justifyContent: 'center',
          }}>
            <Text style={{ fontFamily: font.mono, fontSize: fs[12], fontWeight: fw[600], color: theme.iris }}>{steps?.length || '?'}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: font.sans, fontSize: fs[13], fontWeight: fw[500], color: theme.fg }}>{title}</Text>
            <Text style={{ fontFamily: font.sans, fontSize: fs[11], color: theme.fgFaint, marginTop: sp[0.5] }}>
              {steps?.length || 0} step worked example
            </Text>
          </View>
        </View>
      </Pressable>

      {steps && steps.length > 0 && (
        <FullSheet visible={open} onClose={() => setOpen(false)} title="Worked example">
          {steps.map((step, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: sp[4], marginBottom: sp[6] }}>
              <View style={{
                width: 24, height: 24, borderRadius: 12,
                backgroundColor: theme.irisSoft,
                alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2,
              }}>
                <Text style={{ fontFamily: font.mono, fontSize: fs[11], fontWeight: fw[600], color: theme.iris }}>{i + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[600], color: theme.fg, marginBottom: sp[2] }}>{step.title}</Text>
                <Text style={{ fontFamily: font.sans, fontSize: fs[13], color: theme.fgMuted, lineHeight: fs[13] * 1.6 }}>{step.content}</Text>
              </View>
            </View>
          ))}
        </FullSheet>
      )}
    </>
  );
}
