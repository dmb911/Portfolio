const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rigger = require('gulp-rigger');
const fileinclude = require('gulp-file-include');

module.exports = function html() {
    return gulp.src('src/*.html')
      .pipe(plumber())
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(rigger())
      .pipe(gulp.dest('dist/'));
};