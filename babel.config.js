module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // ✅ Use expo preset for Expo projects
    plugins: [
      // ✅ Module resolver for path aliases
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

      // ✅ Fix private methods (#methodName) issue
      '@babel/plugin-transform-private-methods',

      // ✅ Must be LAST
      'react-native-reanimated/plugin',
    ],
  };
};
