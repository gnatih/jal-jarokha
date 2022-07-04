const { defineConfig } = require('vite');
const { eleventyPlugin } = require('vite-plugin-eleventy');
const path = require('path');

module.exports = defineConfig({
  root: 'src',
  server: {
    hot: true,
    open: true,
  },
  build: {
    outDir: '../public',
    emptyOutDir: true,
  },
  plugins: [eleventyPlugin()],
  resolve: {
    alias: {
      '~bootstrap': path.join(__dirname, './node_modules/bootstrap'),
    },
  },
});
