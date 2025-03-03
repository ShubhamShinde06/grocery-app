module.exports = {
  plugins: [
    require('postcss-import'), // Ensure postcss-import is first
    require('tailwindcss'),
    require('autoprefixer'),
  ]
};
