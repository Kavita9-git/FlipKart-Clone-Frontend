module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'], // ✅ or use 'babel-preset-expo' if using Expo
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './src/assets',
            '@modules': './src/modules',
            '@navigation': './src/navigation',
            '@store': './src/store',
            '@utils': './src/utils',
            '@components': './src/components',
            '@styles': './src/styles',
          },
        },
      ],
      'react-native-reanimated/plugin', // ✅ Always last
    ],
  };
};
