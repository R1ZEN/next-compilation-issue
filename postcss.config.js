module.exports = {
  plugins: [
    ['postcss-import', { path: ['.'] }],
    'tailwindcss/nesting',
    'postcss-nesting',
    'tailwindcss',
    'autoprefixer',
  ],
};
