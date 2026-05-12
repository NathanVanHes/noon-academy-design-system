const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// Watch the parent rn/ directory so `../rn` imports resolve
config.watchFolders = [workspaceRoot];

// Make sure Metro can resolve modules from both node_modules trees
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Ensure the prototype's node_modules takes priority for duplicate packages
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
