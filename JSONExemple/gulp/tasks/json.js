const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rigger = require('gulp-rigger');

module.exports = function json() {
    return gulp.src('src/js/*.json')
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest('dist/js'));
};