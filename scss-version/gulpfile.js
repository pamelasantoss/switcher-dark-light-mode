'use strict';

const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const del = require('del');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const path = require('path');
const browserSync = require('browser-sync').create();

// Set the browser that you want to supoprt
const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

//the title and icon that will be used for the Grunt notifications
var notifyInfo = {
  title: 'Gulp',
  icon: path.join(__dirname, 'gulp.png')
};

//error notification settings for plumber
const plumberErrorHandler = {
  errorHandler: notify.onError({
    title: notifyInfo.title,
    icon: notifyInfo.icon,
    message: "Error: <%= error.message %>"
  })
};

sass.compiler = require("node-sass");

// Gulp task to minify JavaScript files
gulp.task('scripts', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(plumber(plumberErrorHandler))
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest('./dist/js'))
});

// Clean output directory
gulp.task('clean', () => del(['dist']));

gulp.task('sass', function() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(plumber(plumberErrorHandler))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', () => {
  gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('./src/js/**/*.js', gulp.series('scripts'));
});

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    open: false,
    ui: {
      port: 3000
    },
    server: {
      baseDir: "./"
    }
  });
});

// Gulp task to minify all files
gulp.task('default', gulp.series('clean', gulp.parallel('watch', 'scripts', 'sass', 'browser-sync')));