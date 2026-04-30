import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'rn/index.ts',
    tokens: 'rn/tokens.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-native',
    'react-native-svg',
    'react-native-safe-area-context',
  ],
  jsx: 'automatic',
});
