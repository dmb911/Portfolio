const gulp = require('gulp');

module.exports = function jquery() {
  return gulp.src('src/jquery/*.js')
    .pipe(gulp.dest('dist/js'));
};