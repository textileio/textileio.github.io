const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

function browserSyncTask() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    notify: false
  });
}

function sassTask() {
  return src('./sass/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(csso())
    .pipe(dest('./css'))
    .pipe(browserSync.stream());
}

function watchTask() {
  watch('./sass/**/*.scss', series(sassTask));
  watch('./**/*.html').on('change', browserSync.reload);
}

exports.sassTask = sassTask;
exports.browserSyncTask = browserSyncTask;
exports.default = parallel(watchTask, browserSyncTask);