/**
 * Theme provider — wraps app, provides void or paper theme to all components.
 */
import React, { createContext, useContext, useState } from 'react';
import { voidTheme, paperTheme, type Theme } from './tokens';

type ThemeMode = 'void' | 'paper';

interface ThemeCtx {
  mode: ThemeMode;
  theme: Theme;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeCtx>({
  mode: 'void',
  theme: voidTheme,
  setMode: () => {},
});

export function ThemeProvider({ children, initial = 'void' }: { children: React.ReactNode; initial?: ThemeMode }) {
  const [mode, setMode] = useState<ThemeMode>(initial);
  const theme = mode === 'void' ? voidTheme : paperTheme;
  return (
    <ThemeContext.Provider value={{ mode, theme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
