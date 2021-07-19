const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');


module.exports = function imgMin() {
    return gulp.src('src/images/**/*.{gif,png,jpg,svg,webp}')
    .pipe(cache(imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({
          quality: 75,
          progressive: true
        }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: true },
            { cleanupIDs: false }
          ]
        })]
    )))
    .pipe(gulp.dest('dist/images'))
}

