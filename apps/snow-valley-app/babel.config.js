const path = require('path');

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
          alias: {
            // For development, we want to alias the library to the source
            'snow-valley-ui': path.join(__dirname, '../../packages/snow-valley-ui/src'),
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
