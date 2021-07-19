const gulp = require('gulp');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const rigger = require('gulp-rigger');

module.exports = function script() {
  return gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(rigger())
    .pipe(babel({
      presets: ['@babel/env']
     }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
};