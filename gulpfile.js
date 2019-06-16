const { dest, parallel, series, src, watch } = require("gulp");
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const cssnano = require('cssnano');
const del = require('del');
const log = require('fancy-log');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const uglifyjs = require('gulp-uglify');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
  scripts: {
    dest: './static/js',
    js: './assets/js/**/*.js'
  },
  styles: {
    dest: './static/css',
    sass: './assets/sass/**/*.scss'
  }
};

function deleteDevelopmentCss() {
  return del([paths.styles.dest]);
}

function deleteDevelopmentJs() {
  return del([paths.scripts.dest]);
}

function errorHandler(error) {
  log.error(error.message);
  this.emit('end');
}

function generateDevelopmentCss() {
  return src(paths.styles.sass)
    .pipe(plumber(errorHandler))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(plumber.stop())
    .pipe(dest(paths.styles.dest))
}

function generateProductionCss() {
  return src(paths.styles.sass)
    .pipe(plumber(errorHandler))
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename({suffix: '.min'}))
    .pipe(plumber.stop())
    .pipe(dest(paths.styles.dest))
}

function transpileDevelopmentJs() {
  return src(paths.scripts.js)
    .pipe(plumber(errorHandler))
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['@babel/preset-env']}))
    .pipe(sourcemaps.write('.'))
    .pipe(plumber.stop())
    .pipe(dest(paths.scripts.dest))
}

function transpileProductionJs() {
  return src(paths.scripts.js)
    .pipe(plumber(errorHandler))
    .pipe(babel({presets: ['@babel/preset-env']}))
    .pipe(uglifyjs())
    .pipe(rename('app.js'))
    .pipe(plumber.stop())
    .pipe(dest(paths.scripts.dest))
}

function watchCss() {
  watch(paths.styles.sass, series(generateDevelopmentCss));
}

function watchJs() {
  watch(paths.scripts.js, series(transpileDevelopmentJs));
}

exports.build = series(deleteDevelopmentCss, deleteDevelopmentJs, generateProductionCss, transpileProductionJs);
exports.build_dev = series(generateDevelopmentCss, transpileDevelopmentJs);
exports.clean = parallel(deleteDevelopmentCss, deleteDevelopmentJs);
exports.default = series(generateDevelopmentCss, transpileDevelopmentJs, parallel(watchCss, watchJs));
exports.watch = series(generateDevelopmentCss, transpileDevelopmentJs, parallel(watchCss, watchJs));
exports.watchcss = series(generateDevelopmentCss, watchCss);
exports.watchjs = series(transpileDevelopmentJs, watchJs);
