module.exports = {
  config: {
    tailwindjs: './tailwind.config.js',
  },
  paths: {
    root: './',
    src: {
      base: './assets',
      html: './templates/local',
      css: './assets/css',
      js: './assets/js',
      img: './assets/img',
    },
    dist: {
      base: './dist',
      html: './templates/local',
      css: './dist/css',
      js: './dist/js',
      img: './dist/img',
    },
    build: {
      base: './config/static',
      html: './templates/production',
      css: './config/static/css',
      js: './config/static/js',
      img: './config/static/img',
    },
  },
};
