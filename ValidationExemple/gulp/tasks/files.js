const gulp = require('gulp');

module.exports = function jquery() {
  return gulp.src('src/files/*')
    .pipe(gulp.dest('dist/files'));
};