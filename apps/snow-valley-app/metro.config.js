const path = require('path');
const escape = require('escape-string-regexp');
const { getDefaultConfig } = require('@expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const pak = require('../../packages/snow-valley-ui/package.json');

const root = path.resolve(__dirname, '..');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const modules = Object.keys({
  ...pak.peerDependencies,
});

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  ...defaultConfig,
  // projectRoot: __dirname,
  watchFolders: [workspaceRoot],

  // We need to make sure that only one version is loaded for peerDependencies
  // So we block them at the root, and alias them to the versions in example's node_modules
  resolver: {
    ...defaultConfig.resolver,
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
    disableHierarchicalLookup: true,
    // blacklistRE: exclusionList(
    //   modules.map((m) => new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`))
    // ),
    //
    // extraNodeModules: modules.reduce((acc, name) => {
    //   acc[name] = path.join(__dirname, 'node_modules', name);
    //   return acc;
    // }, {}),
  },
};