/**
 * RouteSteps — diamond waypoints showing journey progress.
 */
import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, icon, r } from './tokens';

type DotState = 'done' | 'current' | 'incomplete';

interface RouteStepsProps {
  steps: DotState[];
}

export function RouteSteps({ steps }: RouteStepsProps) {
  const { theme } = useTheme();

  function dotStyle(state: DotState): ViewStyle {
    const base: ViewStyle = {
      width: icon.sm,
      height: icon.sm,
      transform: [{ rotate: '45deg' }],
    };
    switch (state) {
      case 'done':
        return { ...base, backgroundColor: theme.signal };
      case 'current':
        return { ...base, backgroundColor: theme.signalBright, shadowColor: theme.signalBright, shadowOpacity: 0.3, shadowRadius: 6, elevation: 3 };
      default:
        return { ...base, backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.fgMuted, opacity: 0.55 };
    }
  }

  function lineStyle(beforeState: DotState): ViewStyle {
    return {
      width: sp[6],
      height: 1.5,
      backgroundColor: beforeState === 'done' ? theme.signal : theme.border,
    };
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          {i > 0 && <View style={lineStyle(steps[i - 1])} />}
          <View style={dotStyle(step)} />
        </React.Fragment>
      ))}
    </View>
  );
}
