/**
 * Theme provider — wraps app, provides void or paper theme to all components.
 */
import React, { createContext, useContext, useState } from 'react';
import { voidTheme, paperTheme, voidElevation, paperElevation, type Theme } from './tokens';
type ThemeMode = 'void' | 'paper';

interface ThemeCtx {
  mode: ThemeMode;
  theme: Theme;
  elevation: Record<number, Record<string, any>>;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeCtx>({
  mode: 'void',
  theme: voidTheme,
  elevation: voidElevation,
  setMode: () => {},
});

export function ThemeProvider({ children, initial = 'void' }: { children: React.ReactNode; initial?: ThemeMode }) {
  const [mode, setMode] = useState<ThemeMode>(initial);
  const theme = mode === 'void' ? voidTheme : paperTheme;
  const elevation = mode === 'void' ? voidElevation : paperElevation;
  return (
    <ThemeContext.Provider value={{ mode, theme, elevation, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
