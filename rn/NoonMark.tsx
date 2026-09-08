/**
 * NoonMark — the noon green circle with its smile, taken apart from the
 * full noon wordmark SVG (second "o" + smile, exact path data).
 * Brand mark for shell chrome.
 */
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from './ThemeContext';

export function NoonMark({ size = 36 }: { size?: number }) {
  const { theme } = useTheme();
  return (
    <Svg width={size} height={size} viewBox="46.2 20.7 23.2 23.2" fill="none">
      {/* The green "o" */}
      <Path
        d="M57.2692 21.2108C51.415 21.2108 46.6638 25.962 46.6638 31.8162C46.6638 37.6704 51.415 42.4217 57.2692 42.4217C63.1234 42.4217 67.8747 37.6704 67.8747 31.8162C67.8747 25.962 63.1234 21.2108 57.2692 21.2108Z"
        fill={theme.accent}
      />
      {/* The smile */}
      <Path
        d="M57.0995 36.9068C60.3236 40.046 65.6263 40.046 68.8503 36.9068C69.3594 36.3978 68.511 35.7614 68.0868 36.2281C65.2869 38.9855 60.7478 38.9855 57.9056 36.2281C57.4389 35.7614 56.5905 36.3978 57.0995 36.9068Z"
        fill={theme.fg}
      />
    </Svg>
  );
}
