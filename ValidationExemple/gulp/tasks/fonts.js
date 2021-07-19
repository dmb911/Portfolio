const gulp = require('gulp');


module.exports = function imgMin() {
    return gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/fonts'))
}

