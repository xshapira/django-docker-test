/* eslint-disable node/no-unpublished-require */
/* eslint-disable global-require */
const { src, dest, series, parallel } = require('gulp');
const del = require('del'); // Cleaning build/dist for fresh export
const sass = require('gulp-sass')(require('sass')); // Compiling SASS files
const postcss = require('gulp-postcss'); // Compiling tailwind utilities with tailwind config
const concat = require('gulp-concat'); // Concatenating js,css files
const uglify = require('gulp-terser'); // Minify JS files
const imagemin = require('gulp-imagemin'); // Optimize Images
const cleanCSS = require('gulp-clean-css'); // Minify CSS files
const htmlMinimizer = require('gulp-html-minimizer'); // Minify HTML files
const purgecss = require('gulp-purgecss'); // Remove Unused CSS from Styles

// Note : Webp still not supported in major browsers including firefox
// const webp = require('gulp-webp'); //Converting images to WebP format
// const replace = require('gulp-replace'); //Replacing img formats to webp in html
const logSymbols = require('log-symbols'); // Symbolic Console logs
const options = require('./config'); // Paths and other options from config.js

// Development Tasks
function devHTML() {
  return src(`${options.paths.src.html}/**/*.html`).pipe(
    dest(options.paths.dist.html)
  );
}

function devStyles() {
  const tailwindcss = require('tailwindcss');
  return src(`${options.paths.src.css}/**/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(options.paths.src.css))
    .pipe(
      postcss([tailwindcss(options.config.tailwindjs), require('autoprefixer')])
    )
    .pipe(concat({ path: 'style.css' }))
    .pipe(dest(options.paths.dist.css));
}

function devScripts() {
  return src(`${options.paths.src.js}/**/*.js`)
    .pipe(concat({ path: 'index.js' }))
    .pipe(dest(options.paths.dist.js));
}

function devImages() {
  return src(`${options.paths.src.img}/**/*`).pipe(
    dest(options.paths.dist.img)
  );
}

function devClean() {
  console.log(
    `\n\t${logSymbols.info}`,
    'Cleaning dist folder for fresh start.\n'
  );
  return del([options.paths.dist.base]);
}

// Production Tasks (Optimized Build for Live/Production Sites)
function prodHTML() {
  return src(`${options.paths.src.html}/**/*.html`)
    .pipe(
      htmlMinimizer({
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyURLs: true,
        minifyCSS: true,
        continueOnParseError: true,
        html5: true,
      })
    )
    .pipe(dest(options.paths.build.html));
}

function prodStyles() {
  return src(`${options.paths.dist.css}/**/*`)
    .pipe(
      purgecss({
        content: ['./assets/**/*.{js}', './templates/local/**/*.{html}'],
        defaultExtractor: content => {
          const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
          const innerMatches =
            content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
          return broadMatches.concat(innerMatches);
        },
      })
    )
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest(options.paths.build.css));
}

function prodScripts() {
  return src(`${options.paths.src.js}/**/*.js`)
    .pipe(concat({ path: 'index.js' }))
    .pipe(uglify())
    .pipe(dest(options.paths.build.js));
}

function prodImages() {
  return src(`${options.paths.src.img}/**/*`)
    .pipe(imagemin())
    .pipe(dest(options.paths.build.img));
}

function prodClean() {
  console.log(
    `\n\t${logSymbols.info}`,
    'Cleaning build folder for fresh start.\n'
  );
  return del([options.paths.build.base]);
}

function buildFinish(done) {
  console.log(
    `\n\t${logSymbols.info}`,
    `Production build is complete. Files are located at ${options.paths.build.base}\n`
  );
  done();
}

exports.default = series(
  devClean, // Clean Dist Folder
  parallel(devStyles, devScripts, devImages, devHTML) // Run All tasks in parallel
);

exports.prod = series(
  prodClean, // Clean Build Folder
  parallel(prodStyles, prodScripts, prodImages, prodHTML), // Run All tasks in parallel
  buildFinish
);
