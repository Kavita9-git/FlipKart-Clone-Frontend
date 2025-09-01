module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
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
      [
        '@babel/plugin-proposal-class-properties',
        { loose: true }, // ✅ Keep loose mode consistent
      ],
      [
        '@babel/plugin-proposal-private-methods',
        { loose: true }, // ✅ Same loose mode
      ],
      [
        '@babel/plugin-proposal-private-property-in-object',
        { loose: true }, // ✅ Same loose mode
      ],
      'react-native-reanimated/plugin', // ✅ MUST be last
    ],
  };
};
