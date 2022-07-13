module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-typescript': {
          optimizeConstEnums: true,
        },
      },
    ],
  ],
};
