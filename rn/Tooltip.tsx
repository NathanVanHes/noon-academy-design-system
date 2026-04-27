/**
 * Tooltip — small popup on long press. Arrow is a rotated View (no pseudo-elements).
 * Centers above the trigger using onLayout measurement.
 */
import React, { useState, useRef } from 'react';
import { View, Text, Pressable, type ViewStyle, type TextStyle, type LayoutChangeEvent } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, font } from './tokens';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const TIP_WIDTH = 120;

export function Tooltip({ text, children }: TooltipProps) {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState(0);

  function onLayout(e: LayoutChangeEvent) {
    setTriggerWidth(e.nativeEvent.layout.width);
  }

  const tipStyle: ViewStyle = {
    position: 'absolute',
    bottom: '100%',
    left: (triggerWidth - TIP_WIDTH) / 2,
    marginBottom: sp[2],
    backgroundColor: theme.fg,
    borderRadius: r[2],
    paddingVertical: sp[1],
    paddingHorizontal: sp[2],
    width: TIP_WIDTH,
    alignItems: 'center',
    zIndex: 100,
  };

  const arrowStyle: ViewStyle = {
    position: 'absolute',
    bottom: -sp[1],
    alignSelf: 'center',
    width: sp[2],
    height: sp[2],
    backgroundColor: theme.fg,
    transform: [{ rotate: '45deg' }],
  };

  const textStyle: TextStyle = {
    fontFamily: font.mono,
    fontSize: fs[11],
    color: theme.bg,
    textAlign: 'center',
  };

  return (
    <View style={{ position: 'relative' }} onLayout={onLayout}>
      <Pressable onLongPress={() => setVisible(true)} onPressOut={() => setVisible(false)}>
        {children}
      </Pressable>
      {visible && (
        <View style={tipStyle}>
          <Text style={textStyle}>{text}</Text>
          <View style={arrowStyle} />
        </View>
      )}
    </View>
  );
}
