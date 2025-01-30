const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = (async () => {
  const {
    resolver: { sourceExts }
  } = await getDefaultConfig();
  return {
    resolver: {
      sourceExts,
      extraNodeModules: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  };
})();

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
