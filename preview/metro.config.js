const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '..');
const previewModules = path.resolve(projectRoot, 'node_modules');

// Allow importing from ../rn
config.watchFolders = [monorepoRoot];

// Preview's node_modules takes priority
config.resolver.nodeModulesPaths = [
  previewModules,
  path.resolve(monorepoRoot, 'node_modules'),
];

// Force these packages to ALWAYS resolve from preview/node_modules
// even when imported from ../rn/ files
const nativeModules = [
  'react-native-reanimated',
  'react-native-safe-area-context',
  'react-native-gesture-handler',
  'react-native-screens',
  'react-native-svg',
  'react-native-worklets',
  'react-native',
  'react',
  'react-dom',
  '@shopify/react-native-skia',
];

config.resolver.extraNodeModules = {};
for (const mod of nativeModules) {
  config.resolver.extraNodeModules[mod] = path.resolve(previewModules, mod);
}

// Also block the parent copies so they're never accidentally loaded
const escaped = monorepoRoot.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&');
const blockPatterns = nativeModules.map(
  (mod) => new RegExp(`${escaped}\\/node_modules\\/${mod.replace('/', '\\/')}\\/.*`)
);

config.resolver.blockList = [
  ...(Array.isArray(config.resolver.blockList) ? config.resolver.blockList : config.resolver.blockList ? [config.resolver.blockList] : []),
  ...blockPatterns,
];

module.exports = config;
